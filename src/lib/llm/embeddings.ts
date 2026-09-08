import { getEnv } from '../env';

export interface EmbeddingOptions {
  input: string[];
  /** Gemini optimizes document and search-query vectors differently for RAG. */
  taskType?: 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY';
}

export async function generateEmbeddings(options: EmbeddingOptions): Promise<number[][]> {
  const env = getEnv();

  if (env.GEMINI_API_KEY) {
    const model = env.GEMINI_EMBEDDING_MODEL;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:batchEmbedContents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        requests: options.input.map(text => ({
          model: `models/${model}`,
          content: { parts: [{ text }] },
          taskType: options.taskType ?? 'RETRIEVAL_DOCUMENT',
          // The current Gemini model defaults to 3072 dimensions. 768 avoids
          // unnecessarily large local indexes and matches the old index size.
          outputDimensionality: 768,
        }))
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini Embedding API error for ${model}: ${res.status} - ${errorText}`);
    }

    const data = await res.json() as { embeddings?: Array<{ values?: number[] }> };
    if (!data.embeddings || data.embeddings.length !== options.input.length || data.embeddings.some(item => !item.values?.length)) {
      throw new Error(`Gemini Embedding API returned an invalid response for ${model}.`);
    }
    return data.embeddings.map(item => item.values!);
  }

  // If OPENAI_API_KEY is present, default to OpenAI text-embedding-3-small
  if (env.OPENAI_API_KEY) {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: options.input,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`OpenAI Embedding API error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data.data.map((item: any) => item.embedding);
  }

  // Fallback to Voyage AI if ANTHROPIC_API_KEY is present but OPENAI is not, as long as VOYAGE_API_KEY is there
  if (env.ANTHROPIC_API_KEY && env.VOYAGE_API_KEY) {
    const res = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.VOYAGE_API_KEY}`
      },
      body: JSON.stringify({
        model: 'voyage-3',
        input: options.input,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Voyage Embedding API error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data.data.map((item: any) => item.embedding);
  }

  throw new Error("No embedding provider configured. Set GEMINI_API_KEY, OPENAI_API_KEY, or VOYAGE_API_KEY.");
}
