import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import * as fsLib from 'fs';
import * as path from 'path';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;

    let recordCount = 0;
    const dataDir = path.join(process.cwd(), '.data');
    const csvDir = path.join(dataDir, 'csvs');
    const vectorIndex = path.join(dataDir, 'vector-index');

    if (fsLib.existsSync(csvDir)) {
      const files = fsLib.readdirSync(csvDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          fsLib.unlinkSync(path.join(csvDir, file));
          recordCount++;
        }
      }
    }

    if (fsLib.existsSync(vectorIndex)) {
      const files = fsLib.readdirSync(vectorIndex);
      for (const file of files) {
        if (file !== '.gitignore' && file !== 'index.json') {
          fsLib.unlinkSync(path.join(vectorIndex, file));
          recordCount++;
        }
      }
      if (fsLib.existsSync(path.join(vectorIndex, 'index.json'))) {
        fsLib.unlinkSync(path.join(vectorIndex, 'index.json'));
        recordCount++;
      }
    }
    
    if (fsLib.existsSync(path.join(dataDir, 'documents.json'))) {
      fsLib.writeFileSync(path.join(dataDir, 'documents.json'), '[]');
      recordCount++;
    }

    await prisma.auditLog.create({
      data: {
        tenantId,
        action: 'FORGET',
        recordCount,
      }
    });

    return NextResponse.json({ success: true, deleted: recordCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error' }, { status: 500 });
  }
}
