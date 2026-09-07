import { prisma } from '@/lib/db';
import { randomUUID } from 'crypto';

export type QueryRoute = 'TLM' | 'VECTOR';

const TLM_TIMEOUT_MS = 5_000;
// A deliberately conservative blended estimate for the prototype dashboard.
// Swap this for provider/model-specific pricing before using it for billing.
const VECTOR_COST_PER_TOKEN_USD = 0.00000035;

export interface RagAnswer {
  stream: ReadableStream<string>;
  getSources: () => string[];
  getTokens: () => Promise<number>;
}

export type AnswerFromRAG = (query: string, tenantId: string) => Promise<RagAnswer>;

export interface ExecuteQueryOptions {
  simulateTlmOutage?: boolean;
}

export interface QueryExecution {
  stream: ReadableStream<string>;
  route: QueryRoute;
  fellBackFrom?: 'TLM';
}

interface StaticFactRow { id: string; tenantId: string; question: string; answer: string; }

// Small parameterized helpers over the Prisma-managed schema.
async function findFacts(tenantId: string): Promise<StaticFactRow[]> {
  return prisma.$queryRaw<StaticFactRow[]>`SELECT id, tenantId, question, answer FROM StaticFact WHERE tenantId = ${tenantId}`;
}

async function logQuery(tenantId: string, route: QueryRoute, latencyMs: number, tokens: number, costUsd: number) {
  await prisma.$executeRaw`INSERT INTO QueryLog (id, tenantId, route, costUsd, latencyMs, tokens, createdAt) VALUES (${randomUUID()}, ${tenantId}, ${route}, ${costUsd}, ${latencyMs}, ${tokens}, CURRENT_TIMESTAMP)`;
}

async function logFallback(tenantId: string, reason: string) {
  await prisma.$executeRaw`INSERT INTO FallbackLog (id, tenantId, fromRoute, toRoute, reason, createdAt) VALUES (${randomUUID()}, ${tenantId}, 'TLM', 'VECTOR', ${reason}, CURRENT_TIMESTAMP)`;
}

function normalizedWords(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !['what', 'when', 'where', 'which', 'does', 'have', 'with', 'from', 'your', 'about', 'the', 'and', 'for'].includes(word));
}

function isCloseKeywordMatch(query: string, factQuestion: string): boolean {
  const queryWords = normalizedWords(query);
  const factWords = new Set(normalizedWords(factQuestion));
  if (queryWords.length === 0) return false;

  const matches = queryWords.filter(word => factWords.has(word)).length;
  return matches === queryWords.length || (queryWords.length >= 3 && matches / queryWords.length >= 0.8);
}

async function findStaticFact(query: string, tenantId: string) {
  const facts = await findFacts(tenantId);
  return facts.find(fact => isCloseKeywordMatch(query, fact.question)) ?? null;
}

/** Rule-only route selection: this never calls an LLM. */
export async function decideRoute(query: string, tenantId: string): Promise<QueryRoute> {
  return (await findStaticFact(query, tenantId)) ? 'TLM' : 'VECTOR';
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`TLM timed out after ${timeoutMs / 1000} seconds.`)), timeoutMs);
    promise.then(
      value => { clearTimeout(timer); resolve(value); },
      error => { clearTimeout(timer); reject(error); },
    );
  });
}

function textStream(value: string): ReadableStream<string> {
  return new ReadableStream({ start(controller) { controller.enqueue(value); controller.close(); } });
}

function appendMetadata(stream: ReadableStream<string>, metadata: Record<string, unknown>): ReadableStream<string> {
  return stream.pipeThrough(new TransformStream<string, string>({
    transform(chunk, controller) { controller.enqueue(chunk); },
    flush(controller) { controller.enqueue(`\n\n__ROUTE__:${JSON.stringify(metadata)}`); },
  }));
}

async function createVectorExecution(
  query: string,
  tenantId: string,
  answerFromRAG: AnswerFromRAG,
  startedAt: number,
  fellBackFrom?: 'TLM',
): Promise<QueryExecution> {
  const ragAnswer = await answerFromRAG(query, tenantId);
  const stream = ragAnswer.stream.pipeThrough(new TransformStream<string, string>({
    transform(chunk, controller) { controller.enqueue(chunk); },
    async flush(controller) {
      const tokens = await ragAnswer.getTokens();
      const latencyMs = Date.now() - startedAt;
      const costUsd = tokens * VECTOR_COST_PER_TOKEN_USD;
      await logQuery(tenantId, 'VECTOR', latencyMs, tokens, costUsd);
      controller.enqueue(`\n\n__ROUTE__:${JSON.stringify({ route: 'VECTOR', latencyMs, fellBackFrom, sources: ragAnswer.getSources() })}`);
    },
  }));

  return { stream, route: 'VECTOR', fellBackFrom };
}

/**
 * Executes a query through the cheapest valid route. `answerFromRAG` is injected
 * so the existing RAG implementation remains a black box owned by the chat API.
 */
export async function executeQuery(
  query: string,
  tenantId: string,
  answerFromRAG: AnswerFromRAG,
  options: ExecuteQueryOptions = {},
): Promise<QueryExecution> {
  const startedAt = Date.now();
  const route = await decideRoute(query, tenantId);

  if (route === 'VECTOR') {
    return createVectorExecution(query, tenantId, answerFromRAG, startedAt);
  }

  try {
    const fact = await withTimeout((async () => {
      if (options.simulateTlmOutage) throw new Error('Simulated TLM outage.');
      const matchedFact = await findStaticFact(query, tenantId);
      if (!matchedFact) throw new Error('Static fact was unavailable after routing.');
      return matchedFact;
    })(), TLM_TIMEOUT_MS);

    const latencyMs = Date.now() - startedAt;
    await logQuery(tenantId, 'TLM', latencyMs, 0, 0);
    return {
      stream: appendMetadata(textStream(fact.answer), { route: 'TLM', latencyMs, sources: [] }),
      route: 'TLM',
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown TLM failure.';
    await logFallback(tenantId, reason);
    return createVectorExecution(query, tenantId, answerFromRAG, startedAt, 'TLM');
  }
}
