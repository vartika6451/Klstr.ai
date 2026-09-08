export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { NextRequest, NextResponse } from 'next/server';
import { getEnv, EnvError } from '@/lib/env';
import { chatRateLimit } from '@/lib/rate-limit';
import { searchChunks } from '@/lib/rag/store';
import { executeQuery, type RagAnswer } from '@/services/router';
import { streamText, tool } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const DEMO_TENANT_ID = 'default-workspace';

// The installed AI SDK's v7 types no longer expose the legacy tool-loop
// options used by the existing RAG implementation, although the runtime API
// remains compatible. Keep that legacy boundary explicit and contained here.
interface LegacyRagStreamResult {
  textStream: ReadableStream<string>;
  usage: Promise<{ inputTokens?: number; outputTokens?: number }>;
}
const callLegacyRagStream = streamText as unknown as (options: object) => Promise<LegacyRagStreamResult>;
const legacyTool = tool as unknown as (definition: object) => unknown;

export async function POST(req: NextRequest) {
  try {
    const env = getEnv();

    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const limit = chatRateLimit.limit(ip);
    if (!limit.success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429, headers: { 'Retry-After': limit.retryAfter.toString() } });
    }

    const body = await req.json();
    const { message, history, tenantId, simulateTlmOutage } = body;

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    if (message.length > 4000) {
      return NextResponse.json({ error: "Message exceeds 4000 characters limit" }, { status: 400 });
    }

    // The router receives this existing RAG pipeline as a black-box callback.
    const answerFromRAG = async (query: string, _workspaceId: string): Promise<RagAnswer> => {
      const google = createGoogleGenerativeAI({ apiKey: env.GEMINI_API_KEY });
      const usedSources = new Set<string>();

      const fastResults = await searchChunks(query, 1);
      const topScore = fastResults.length > 0 ? fastResults[0].score : 0;
      
      const messages = [...(history || []), { role: 'user', content: query }];
      const actualModel = env.CHAT_MODEL === 'gemini-1.5-flash' ? 'gemini-flash-latest' : env.CHAT_MODEL;

      let generationFailed = false;
      const result = await callLegacyRagStream({
      model: google(actualModel),
      system: `You are an enterprise AI agent. You have tools to search the knowledge base and query structured data (CSVs).
ALWAYS use 'search_knowledge_base' to look up policies, documents, and unstructured text.
ALWAYS use 'query_structured_data' to lookup specific rows or search across uploaded CSV spreadsheets.
If a user asks a combined question, use BOTH tools before answering.
Synthesize the final answer clearly and include inline citations (e.g. "[Policy.pdf]").
Do not guess or use outside knowledge. If the tools don't return the answer, state that you don't know.`,
      messages,
      maxSteps: 5,
      onError: () => { generationFailed = true; },
      tools: {
          search_knowledge_base: legacyTool({
          description: 'Search internal documents, PDFs, and policies.',
          parameters: z.object({ query: z.string() }),
          execute: async ({ query }: { query: string }) => {
            const results = await searchChunks(query, env.RETRIEVAL_TOP_K);
            const relevant = results.filter(r => r.score >= env.RELEVANCE_THRESHOLD);
            relevant.forEach(r => usedSources.add(r.item.docName));
            return relevant.map(r => ({ doc: r.item.docName, text: r.item.text }));
          }
        }),
          query_structured_data: legacyTool({
          description: 'Query uploaded CSV files for specific rows or matching text.',
          parameters: z.object({
            search_term: z.string().optional().describe('Text to search across all rows (optional)'),
            row_index: z.number().optional().describe('Specific row number to fetch (1-indexed) (optional)')
          }),
          execute: async ({ search_term, row_index }: { search_term?: string, row_index?: number }) => {
            const csvDir = path.join(process.cwd(), '.data', 'csvs');
            if (!fs.existsSync(csvDir)) return { error: "No CSVs uploaded." };
            
            const files = fs.readdirSync(csvDir);
            const allResults = [];
            
            for (const file of files) {
               if (!file.endsWith('.json')) continue;
               const data = JSON.parse(fs.readFileSync(path.join(csvDir, file), 'utf8')) as { docName: string; data: unknown[] };
               usedSources.add(data.docName);
               
               let rows = data.data;
               if (row_index !== undefined) {
                 rows = rows.filter((_, i: number) => i + 1 === row_index);
               }
               if (search_term) {
                 const lowerTerm = search_term.toLowerCase();
                 rows = rows.filter(row => JSON.stringify(row).toLowerCase().includes(lowerTerm));
               }
               allResults.push({ file: data.docName, matches: rows.slice(0, 10) }); // limit to 10
            }
            return allResults;
          }
        })
      }
      });

      // Gemini can reject a streamed generation after the response starts (for
      // example, when its free-tier request quota is exhausted). Preserve a
      // useful document-grounded response instead of letting that stream error
      // turn into the generic client-side failure message.
      let usedDocumentFallback = false;
      const reader = result.textStream.getReader();
      let receivedModelText = false;
      const writeDocumentFallback = async (controller: ReadableStreamDefaultController<string>) => {
        usedDocumentFallback = true;
        try {
          const results = await searchChunks(query, env.RETRIEVAL_TOP_K);
          const relevant = results.filter(item => item.score >= env.RELEVANCE_THRESHOLD);
          relevant.forEach(item => usedSources.add(item.item.docName));
          if (relevant.length === 0) {
            controller.enqueue('The AI response service is temporarily unavailable, and no sufficiently relevant passages were found in your uploaded documents. Please try again shortly.');
          } else {
            const excerpts = relevant.slice(0, 3).map(item => `• [${item.item.docName}] ${item.item.text}`).join('\n\n');
            controller.enqueue(`The AI response service is temporarily unavailable, so here are the most relevant passages from your uploaded documents:\n\n${excerpts}`);
          }
        } catch {
          controller.enqueue('The AI response service is temporarily unavailable. Please try again after the provider quota resets.');
        }
      };
      const resilientStream = new ReadableStream<string>({
        async pull(controller) {
          try {
            const { value, done } = await reader.read();
            if (done) {
              if (generationFailed && !receivedModelText) await writeDocumentFallback(controller);
              controller.close();
              return;
            }
            receivedModelText = true;
            controller.enqueue(value);
          } catch {
            await writeDocumentFallback(controller);
            controller.close();
          }
        },
        async cancel() { await reader.cancel(); },
      });

      return {
        stream: resilientStream,
        getSources: () => Array.from(usedSources),
        getTokens: async () => {
          if (usedDocumentFallback) return 0;
          try {
            const usage = await result.usage;
            return (usage.inputTokens ?? 0) + (usage.outputTokens ?? 0);
          } catch {
            return 0;
          }
        },
        getTopScore: async () => topScore,
      };
    };

    const execution = await executeQuery(message, tenantId || DEMO_TENANT_ID, answerFromRAG, {
      simulateTlmOutage: process.env.NODE_ENV !== 'production' && simulateTlmOutage === true,
    });

    const encoder = new TextEncoder();
    const transform = new TransformStream<string, Uint8Array>({
      transform(chunk, controller) { controller.enqueue(encoder.encode(chunk)); },
    });

    return new Response(execution.stream.pipeThrough(transform), {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no'
      }
    });

  } catch (e: unknown) {
    if (e instanceof EnvError) {
      return NextResponse.json({ error: e.message }, { status: 503 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Internal error' }, { status: 500 });
  }
}
