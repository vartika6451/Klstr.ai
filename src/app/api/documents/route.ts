import { NextRequest, NextResponse } from 'next/server';
import { getEnv, EnvError } from '@/lib/env';
import { uploadRateLimit } from '@/lib/rate-limit';
import { parseDocument } from '@/lib/rag/parse';
import { chunkText } from '@/lib/rag/chunk';
import { upsertDocument, deleteDocumentFromIndex } from '@/lib/rag/store';
import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const REGISTRY_PATH = path.join(process.cwd(), '.data', 'documents.json');

export interface DocumentRegistryEntry {
  id: string;
  name: string;
  chunkCount: number;
  sizeBytes: number;
  uploadedAt: string;
}

// Basic lock for registry writes
let isRegistryWriting = false;

async function withRegistryLock<T>(fn: () => Promise<T>): Promise<T> {
  while (isRegistryWriting) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  isRegistryWriting = true;
  try {
    return await fn();
  } finally {
    isRegistryWriting = false;
  }
}

async function getRegistry(): Promise<DocumentRegistryEntry[]> {
  if (!fs.existsSync(REGISTRY_PATH)) return [];
  const data = await fs.promises.readFile(REGISTRY_PATH, 'utf-8');
  return JSON.parse(data);
}

async function saveRegistry(registry: DocumentRegistryEntry[]) {
  if (!fs.existsSync(path.dirname(REGISTRY_PATH))) {
    await fs.promises.mkdir(path.dirname(REGISTRY_PATH), { recursive: true });
  }
  await fs.promises.writeFile(REGISTRY_PATH, JSON.stringify(registry, null, 2));
}

export async function GET(req: NextRequest) {
  try {
    getEnv(); // validate env
    const registry = await getRegistry();
    return NextResponse.json(registry);
  } catch (e: any) {
    if (e instanceof EnvError) {
      return NextResponse.json({ error: e.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    getEnv();
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await withRegistryLock(async () => {
      let registry = await getRegistry();
      registry = registry.filter(r => r.id !== id);
      await saveRegistry(registry);
      await deleteDocumentFromIndex(id);
      
      const csvFile = path.join(process.cwd(), '.data', 'csvs', `${id}.json`);
      if (fs.existsSync(csvFile)) fs.unlinkSync(csvFile);
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e instanceof EnvError) {
      return NextResponse.json({ error: e.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    getEnv();
    
    // Rate limit
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const limit = uploadRateLimit.limit(ip);
    if (!limit.success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429, headers: { 'Retry-After': limit.retryAfter.toString() } });
    }

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    
    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }
    
    if (files.length > 20) {
      return NextResponse.json({ error: "Max 20 files per request" }, { status: 400 });
    }

    const results = [];
    
    for (const file of files) {
      const fileName = file.name;
      
      if (file.size > MAX_FILE_SIZE) {
        results.push({ fileName, status: "failed", error: "File exceeds 15MB limit" });
        continue;
      }
      
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        let text = '';
        const docId = nanoid();
        let registryName = fileName;

        // Duplicate check
        const currentRegistry = await getRegistry();
        const existing = currentRegistry.filter(r => r.name.startsWith(fileName));
        if (existing.length > 0) {
           registryName = `${fileName} (${existing.length})`;
        }

        if (fileName.endsWith('.csv') || file.type === 'text/csv') {
           const Papa = require('papaparse');
           const csvText = buffer.toString('utf-8');
           const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
           
           const csvDir = path.join(process.cwd(), '.data', 'csvs');
           if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir, { recursive: true });
           fs.writeFileSync(path.join(csvDir, `${docId}.json`), JSON.stringify({ docName: registryName, data: parsed.data }));
           
           text = parsed.data.map((row: any, i: number) => `Row ${i+1}: ${JSON.stringify(row)}`).join('\n\n');
        } else {
           text = await parseDocument(buffer, file.type, fileName);
        }

        const chunks = chunkText(text);
        
        await upsertDocument(docId, registryName, chunks);
        
        await withRegistryLock(async () => {
          const registry = await getRegistry();
          registry.push({
            id: docId,
            name: registryName,
            chunkCount: chunks.length,
            sizeBytes: file.size,
            uploadedAt: new Date().toISOString()
          });
          await saveRegistry(registry);
        });
        
        results.push({ fileName, status: "indexed", chunkCount: chunks.length });
      } catch (e: any) {
        results.push({ fileName, status: "failed", error: e.message });
      }
    }
    
    return NextResponse.json({ results });
  } catch (e: any) {
    if (e instanceof EnvError) {
      return NextResponse.json({ error: e.message }, { status: 503 });
    }
    return NextResponse.json({ error: e.message || "Internal error" }, { status: 500 });
  }
}
