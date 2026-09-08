import { LocalIndex } from 'vectra';
import { generateEmbeddings } from '../llm/embeddings';
import path from 'path';
import fs from 'fs';

const indexPath = path.join(process.cwd(), '.data', 'vector-index');

// Setup index directory synchronously on module load
if (!fs.existsSync(indexPath)) {
  fs.mkdirSync(indexPath, { recursive: true });
}

export interface ChunkMetadata {
  docId: string;
  docName: string;
  chunkIndex: number;
  uploadedAt: string;
  text: string;
}

// Basic lock to prevent corruption since vectra is file-based and not safe for concurrent writes
let isWriting = false;

async function withLock<T>(fn: () => Promise<T>): Promise<T> {
  while (isWriting) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  isWriting = true;
  try {
    return await fn();
  } finally {
    isWriting = false;
  }
}

export async function upsertDocument(docId: string, docName: string, chunks: string[]) {
  const index = new LocalIndex(indexPath);
  if (!(await index.isIndexCreated())) {
    await index.createIndex();
  }

  // Batch embeddings
  const batchSize = 50;
  const allVectors: number[][] = [];
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const vectors = await generateEmbeddings({ input: batch, taskType: 'RETRIEVAL_DOCUMENT' });
    allVectors.push(...vectors);
  }

  const uploadedAt = new Date().toISOString();

  await withLock(async () => {
    // Add new items
    for (let i = 0; i < chunks.length; i++) {
      await index.insertItem({
        vector: allVectors[i],
        metadata: {
          docId,
          docName,
          chunkIndex: i,
          uploadedAt,
          text: chunks[i]
        }
      });
    }
  });
}

export async function deleteDocumentFromIndex(docId: string) {
  const index = new LocalIndex(indexPath);
  if (!(await index.isIndexCreated())) return;

  await withLock(async () => {
    const items = await index.listItems();
    for (const item of items) {
      if (item.metadata.docId === docId) {
        await index.deleteItem(item.id);
      }
    }
  });
}

export async function searchChunks(query: string, topK: number = 8) {
  const index = new LocalIndex(indexPath);
  if (!(await index.isIndexCreated())) return [];

  // 1. Vector Search (fetch more candidates for hybrid reranking)
  const [queryVector] = await generateEmbeddings({ input: [query], taskType: 'RETRIEVAL_QUERY' });
  const results = await index.queryItems(queryVector, query, topK * 4);
  
  // 2. Keyword Search (hybrid scoring)
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\W+/).filter(t => t.length > 2);
  
  const hybridResults = results.map(r => {
    const text = (r.item.metadata.text as string).toLowerCase();
    let keywordScore = 0;
    
    // Term frequency scoring
    for (const term of queryTerms) {
      if (text.includes(term)) {
         const count = (text.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
         keywordScore += count;
      }
    }
    
    // Boost vector score based on keyword density
    const termBoost = Math.min(keywordScore * 0.04, 0.3);
    
    // Exact phrase match bonus (if the query is short enough to be a meaningful phrase)
    let phraseBoost = 0;
    if (queryLower.length > 5 && queryLower.length < 100 && text.includes(queryLower)) {
      phraseBoost = 0.15;
    }
    
    return {
      item: r.item.metadata as unknown as ChunkMetadata,
      score: r.score + termBoost + phraseBoost
    };
  });

  // 3. Re-rank, filter noise, and slice
  hybridResults.sort((a, b) => b.score - a.score);
  
  // Filter out very low scoring results (noise)
  const filtered = hybridResults.filter(r => r.score >= 0.15);
  
  return filtered.slice(0, topK);
}

