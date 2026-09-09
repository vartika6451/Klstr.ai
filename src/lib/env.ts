import { z } from 'zod';

const envSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  VOYAGE_API_KEY: z.string().min(1).optional(),
  GEMINI_API_KEY: z.string().min(1).optional(),
  GEMINI_EMBEDDING_MODEL: z.string().min(1).default('gemini-embedding-001'),
  GROQ_API_KEY: z.string().min(1).optional(),
  CHAT_MODEL: z.string().default('gemini-3.6-flash'),
  MAX_CHAT_TOKENS: z.coerce.number().default(8192),
  RETRIEVAL_TOP_K: z.coerce.number().default(6),
  RELEVANCE_THRESHOLD: z.coerce.number().default(0.35),
});

export class EnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvError';
  }
}

const clean = (val?: string) => val?.replace(/^["']|["']$/g, '').trim();
export function getEnv() {
  const parsed = envSchema.safeParse({
    ANTHROPIC_API_KEY: clean(process.env.ANTHROPIC_API_KEY),
    OPENAI_API_KEY: clean(process.env.OPENAI_API_KEY),
    VOYAGE_API_KEY: clean(process.env.VOYAGE_API_KEY),
    GEMINI_API_KEY: clean(process.env.GEMINI_API_KEY),
    GEMINI_EMBEDDING_MODEL: clean(process.env.GEMINI_EMBEDDING_MODEL),
    GROQ_API_KEY: clean(process.env.GROQ_API_KEY),
    CHAT_MODEL: clean(process.env.CHAT_MODEL),
    MAX_CHAT_TOKENS: process.env.MAX_CHAT_TOKENS,
    RETRIEVAL_TOP_K: process.env.RETRIEVAL_TOP_K,
    RELEVANCE_THRESHOLD: process.env.RELEVANCE_THRESHOLD,
  });

  if (!parsed.success) {
    throw new EnvError("Invalid environment configuration.");
  }

  const env = parsed.data;

  if (!env.ANTHROPIC_API_KEY && !env.OPENAI_API_KEY && !env.GEMINI_API_KEY && !env.GROQ_API_KEY) {
    throw new EnvError("LLM provider not configured. Set GEMINI_API_KEY, GROQ_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY in .env.local.");
  }

  return env;
}
