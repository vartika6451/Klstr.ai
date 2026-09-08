import { prisma } from '@/lib/db';
import { randomUUID } from 'crypto';
import { getEnv } from '@/lib/env';

export type QueryRoute = 'TLM' | 'SLM' | 'VECTOR' | 'BLOCKED';

const TLM_TIMEOUT_MS = 5_000;
const SLM_TIMEOUT_MS = 10_000;
const VECTOR_COST_PER_TOKEN_USD = 0.00000035;
const SLM_COST_PER_TOKEN_USD = 0.00000005; // rough estimate for 8b instant
const TENANT_DAILY_LIMIT = process.env.TENANT_DAILY_LIMIT ? parseInt(process.env.TENANT_DAILY_LIMIT, 10) : 50;

export interface RagAnswer {
  stream: ReadableStream<string>;
  getSources: () => string[];
  getTokens: () => Promise<number>;
  getTopScore: () => Promise<number>;
}

export type AnswerFromRAG = (query: string, tenantId: string) => Promise<RagAnswer>;

export interface ExecuteQueryOptions {
  simulateTlmOutage?: boolean;
}

export interface QueryExecution {
  stream: ReadableStream<string>;
  route: QueryRoute;
  fellBackFrom?: 'TLM' | 'SLM';
}

interface StaticFactRow { id: string; tenantId: string; question: string; answer: string; }

async function findFacts(tenantId: string): Promise<StaticFactRow[]> {
  return prisma.$queryRaw<StaticFactRow[]>`SELECT id, tenantId, question, answer FROM StaticFact WHERE tenantId = ${tenantId}`;
}

async function logQuery(tenantId: string, route: QueryRoute, latencyMs: number, tokens: number, costUsd: number) {
  await prisma.$executeRaw`INSERT INTO QueryLog (id, tenantId, route, costUsd, latencyMs, tokens, createdAt) VALUES (${randomUUID()}, ${tenantId}, ${route}, ${costUsd}, ${latencyMs}, ${tokens}, CURRENT_TIMESTAMP)`;
}

async function logFallback(tenantId: string, fromRoute: string, reason: string) {
  await prisma.$executeRaw`INSERT INTO FallbackLog (id, tenantId, fromRoute, toRoute, reason, createdAt) VALUES (${randomUUID()}, ${tenantId}, ${fromRoute}, 'VECTOR', ${reason}, CURRENT_TIMESTAMP)`;
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

export async function decideRoute(query: string, tenantId: string): Promise<QueryRoute> {
  if (await findStaticFact(query, tenantId)) return 'TLM';
  
  const docKeywords = ['policy', 'contract', 'document', 'according to', 'clause', 'section', 'report', 'file', 'csv', 'excel', 'data', 'spreadsheet'];
  const lowerQuery = query.toLowerCase();
  const needsVector = docKeywords.some(kw => lowerQuery.includes(kw));
  
  return needsVector ? 'VECTOR' : 'SLM';
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out after ${timeoutMs / 1000} seconds.`)), timeoutMs);
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

async function runSlm(query: string) {
  const env = getEnv();
  if (env.GROQ_API_KEY) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: query }],
        max_tokens: env.MAX_CHAT_TOKENS,
      })
    });
    if (!res.ok) throw new Error(`SLM failed: ${res.status}`);
    const data = await res.json();
    return {
      text: data.choices?.[0]?.message?.content || '',
      tokens: data.usage?.total_tokens || 0,
    };
  }

  if (env.GEMINI_API_KEY) {
    const model = env.CHAT_MODEL === 'gemini-1.5-flash' ? 'gemini-flash-latest' : env.CHAT_MODEL;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: query }] }],
        generationConfig: { maxOutputTokens: env.MAX_CHAT_TOKENS },
      }),
    });
    if (!res.ok) throw new Error(`SLM failed: ${res.status}`);
    const data = await res.json();
    return {
      text: data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('') || '',
      tokens: data.usageMetadata?.totalTokenCount || 0,
    };
  }

  throw new Error('No fast chat provider configured.');
}

async function createVectorExecution(
  query: string,
  tenantId: string,
  answerFromRAG: AnswerFromRAG,
  startedAt: number,
  fellBackFrom?: 'TLM' | 'SLM',
): Promise<QueryExecution> {
  const ragAnswer = await answerFromRAG(query, tenantId);
  
  const topScore = await ragAnswer.getTopScore();
  if (topScore < 0.5) {
      await logFallback(tenantId, 'VECTOR', 'low_similarity');
      return { 
          stream: appendMetadata(textStream("I couldn't find a confident answer in your documents."), { route: 'VECTOR', grounded: false, fellBackFrom }), 
          route: 'VECTOR', 
          fellBackFrom 
      };
  }

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

export async function executeQuery(
  query: string,
  tenantId: string,
  answerFromRAG: AnswerFromRAG,
  options: ExecuteQueryOptions = {},
): Promise<QueryExecution> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dailyQueries = await prisma.queryLog.count({
    where: { tenantId, createdAt: { gte: today } }
  });

  if (dailyQueries >= TENANT_DAILY_LIMIT) {
    return {
      stream: appendMetadata(textStream("Daily query limit reached for this tenant."), { route: 'BLOCKED', blocked: true }),
      route: 'BLOCKED',
    };
  }

  const startedAt = Date.now();
  const route = await decideRoute(query, tenantId);

  if (route === 'VECTOR') {
    return createVectorExecution(query, tenantId, answerFromRAG, startedAt);
  }

  if (route === 'SLM') {
    try {
        const slmResult = await withTimeout((async () => {
            if (options.simulateTlmOutage) throw new Error('Simulated SLM outage.');
            return runSlm(query);
        })(), SLM_TIMEOUT_MS);
        
        const latencyMs = Date.now() - startedAt;
        const costUsd = slmResult.tokens * SLM_COST_PER_TOKEN_USD;
        await logQuery(tenantId, 'SLM', latencyMs, slmResult.tokens, costUsd);
        
        return {
            stream: appendMetadata(textStream(slmResult.text), { route: 'SLM', latencyMs }),
            route: 'SLM',
        };
    } catch (error) {
        const reason = error instanceof Error ? error.message : 'Unknown SLM failure.';
        await logFallback(tenantId, 'SLM', reason);
        return createVectorExecution(query, tenantId, answerFromRAG, startedAt, 'SLM');
    }
  }

  // TLM route
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
    await logFallback(tenantId, 'TLM', reason);
    return createVectorExecution(query, tenantId, answerFromRAG, startedAt, 'TLM');
  }
}
