import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messageId, tenantId, rating } = body;
    
    if (!messageId || typeof rating !== 'number') {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        messageId,
        tenantId: tenantId || 'default-tenant',
        rating
      }
    });

    return NextResponse.json({ success: true, feedback });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
