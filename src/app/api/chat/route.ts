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

      // 1. Fetch Vector Chunks
      const vectorResults = await searchChunks(query, env.RETRIEVAL_TOP_K);
      const relevantVectors = vectorResults.filter(r => r.score >= env.RELEVANCE_THRESHOLD);
      const topScore = vectorResults.length > 0 ? vectorResults[0].score : 0;
      
      let documentContext = "";
      if (relevantVectors.length > 0) {
        documentContext += "DOCUMENT EXCERPTS:\n";
        relevantVectors.forEach((r, idx) => {
           usedSources.add(r.item.docName);
           documentContext += `--- Excerpt ${idx + 1} [${r.item.docName}] ---\n${r.item.text}\n\n`;
        });
      }

      // 2. Fetch CSV Data (Keyword Match)
      let csvContext = "";
      const csvDir = require('path').join(process.cwd(), '.data', 'csvs');
      if (require('fs').existsSync(csvDir)) {
         const files = require('fs').readdirSync(csvDir);
         for (const file of files) {
            if (!file.endsWith('.json')) continue;
            const data = JSON.parse(require('fs').readFileSync(require('path').join(csvDir, file), 'utf8'));
            const lowerQuery = query.toLowerCase();
            const matchedRows = data.data.filter((row: any) => JSON.stringify(row).toLowerCase().includes(lowerQuery) || lowerQuery.includes(data.docName.toLowerCase().replace('.csv','')));
            
            if (matchedRows.length > 0) {
               usedSources.add(data.docName);
               csvContext += `--- CSV Data [${data.docName}] ---\n`;
               csvContext += JSON.stringify(matchedRows.slice(0, 10)) + "\n\n";
            }
         }
      }
      
      const combinedContext = documentContext + csvContext;

      const messages = [...(history || []), { role: 'user', content: query }];
      let actualModel = env.CHAT_MODEL || 'gemini-flash-latest';
      if (actualModel === 'gemini-1.5-flash' || actualModel === 'gemini-1.5-flash-latest' || actualModel.includes('2.5')) {
          actualModel = 'gemini-flash-latest';
      }

      let generationFailed = false;
      const result = await callLegacyRagStream({
        model: google(actualModel),
        system: `You are an expert enterprise AI assistant. Your goal is to provide intelligent, synthesized, and highly readable answers based ONLY on the provided knowledge base and data context.
When asked a question:
1. Read the provided DOCUMENT EXCERPTS and CSV DATA carefully.
2. SYNTHESIZE the information into a smart, well-structured, comprehensive answer. Answer the user's question directly. DO NOT just copy-paste raw excerpts or strings of text.
3. Use markdown formatting (bullet points, bold text, tables) to make your answer professional and easy to read.
4. Always include inline citations (e.g., "[Policy.pdf]") when referencing facts.
5. If the provided context does not contain the answer, clearly state that you don't have the information. DO NOT guess or hallucinate.

PROVIDED CONTEXT:
${combinedContext || 'No relevant documents or data found for this query.'}`,
        messages,
        onError: (err: any) => { 
          console.error("AI SDK StreamText onError triggered! Error details:", err);
          generationFailed = true; 
        }
      });

      let usedDocumentFallback = false;
      const reader = result.textStream.getReader();
      let receivedModelText = false;
      const writeDocumentFallback = async (controller: ReadableStreamDefaultController<string>) => {
        usedDocumentFallback = true;
        try {
          if (relevantVectors.length === 0) {
            controller.enqueue('The AI response service is temporarily unavailable, and no sufficiently relevant passages were found in your uploaded documents. Please try again shortly.');
          } else {
            const excerpts = relevantVectors.slice(0, 3).map(item => `• [${item.item.docName}] ${item.item.text}`).join('\n\n');
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
          } catch (error) {
            console.error("StreamText Pull Error:", error);
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
