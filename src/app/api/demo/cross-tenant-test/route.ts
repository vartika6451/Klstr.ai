import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/services/router';
import { searchChunks } from '@/lib/rag/store';
import { streamText, tool } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { getEnv } from '@/lib/env';

// ** DEMO ONLY - NOT FOR PRODUCTION **
// This endpoint purposely bypasses standard UI auth wrappers to demonstrate cross-tenant query isolation.

export async function POST(req: NextRequest) {
  try {
    const { query, tenantId } = await req.json();
    if (!query || !tenantId) return NextResponse.json({ error: 'Missing query or tenantId' }, { status: 400 });

    const env = getEnv();

    const answerFromRAG = async (q: string, tId: string) => {
      const google = createGoogleGenerativeAI({ apiKey: env.GEMINI_API_KEY });
      const usedSources = new Set<string>();
      
      const fastResults = await searchChunks(q, 1);
      const topScore = fastResults.length > 0 ? fastResults[0].score : 0;
      
      const actualModel = env.CHAT_MODEL === 'gemini-1.5-flash' ? 'gemini-flash-latest' : env.CHAT_MODEL;

      const result = await streamText({
        model: google(actualModel),
        system: "You are an enterprise AI agent.",
        messages: [{ role: 'user', content: q }]});

      return {
        stream: result.textStream,
        getSources: () => Array.from(usedSources),
        getTokens: async () => {
          const usage = await result.usage;
          return (usage.inputTokens ?? 0) + (usage.outputTokens ?? 0);
        },
        getTopScore: async () => topScore,
      };
    };

    const execution = await executeQuery(query, tenantId, answerFromRAG, {});

    // For a simple raw result, we collect the stream instead of streaming it back to make it easier for testing tools
    const reader = execution.stream.getReader();
    let rawText = '';
    let done = false;
    while (!done) {
        const { value, done: isDone } = await reader.read();
        if (value) rawText += value;
        done = isDone;
    }

    // Just doing a raw searchChunks count to show "matches found"
    const results = await searchChunks(query, 10);

    return NextResponse.json({ 
        success: true, 
        tenantId, 
        route: execution.route, 
        rawText,
        matchesFound: results.length
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
