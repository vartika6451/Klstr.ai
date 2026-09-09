import { searchChunks } from './src/lib/rag/store';
import { getEnv } from './src/lib/env';

async function testRAG() {
  const env = getEnv();
  console.log("Relevance threshold:", env.RELEVANCE_THRESHOLD);
  console.log("Top K:", env.RETRIEVAL_TOP_K);

  const queries = [
    "summarize resume",
    "in detail summary",
    "summary"
  ];

  for (const q of queries) {
    console.log(`\n=== Query: "${q}" ===`);
    const results = await searchChunks(q, 10);
    console.log(`Results count: ${results.length}`);
    for (const r of results) {
      console.log(`- Score: ${r.score.toFixed(4)} (Pass: ${r.score >= env.RELEVANCE_THRESHOLD}) | Chunk: ${r.item.chunkIndex} | Doc: ${r.item.docName} | Preview: ${r.item.text.slice(0, 120).replace(/\n/g, ' ')}`);
    }
  }
}

testRAG().catch(console.error);
