import { NextRequest, NextResponse } from 'next/server';
import { getUsageForTenant } from '@/services/usage';

export async function GET(_request: NextRequest, context: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await context.params;
  if (!tenantId.trim()) return NextResponse.json({ error: 'Tenant ID is required.' }, { status: 400 });

  try {
    return NextResponse.json(await getUsageForTenant(tenantId));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load usage.' }, { status: 500 });
  }
}
