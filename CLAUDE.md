@AGENTS.md


## Chatbot Architecture

We have built a completely local-infra (zero-setup) RAG chatbot for the \EnterpriseGenAI\ product page.
- **Provider Abstraction:** \/src/lib/llm/provider.ts\ and \embeddings.ts\ abstract over OpenAI, Anthropic, and Voyage. They use native \etch\ (no heavy SDK dependencies).
- **Vector Store:** \/src/lib/rag/store.ts\ uses \ectra\ to store vectors on disk in \.data/vector-index\.
  - **Scaling limitation:** \ectra\ is file-based and single-process. The current code uses a simple in-memory mutex to prevent concurrent corruption during uploads, but this will fail in a serverless or multi-instance environment. For production, swap this wrapper for pgvector, Pinecone, or Weaviate.
- **Rate limiting:** \/src/lib/rate-limit.ts\ is currently an in-memory sliding window. Swap for Redis/Upstash for production.
- **API Routes:** \/api/documents\ (upload/list/delete) and \/api/chat\ (streaming).
- **UI:** \DocumentManager.tsx\ and \ChatWidget.tsx\ using \lucide-react\ icons. Chat uses native \etch\ with stream parsing.
