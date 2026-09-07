import { prisma } from '@/lib/db';

const DEFAULT_VECTOR_QUERY_COST_USD = 0.00035;

interface QueryLogRow { route: string; costUsd: number; latencyMs: number; }

export async function getUsageForTenant(tenantId: string) {
  const logs = await prisma.$queryRaw<QueryLogRow[]>`SELECT route, costUsd, latencyMs FROM QueryLog WHERE tenantId = ${tenantId}`;
  const tlm = logs.filter(log => log.route === 'TLM');
  const vector = logs.filter(log => log.route === 'VECTOR');
  const actualCostUsd = logs.reduce((total, log) => total + log.costUsd, 0);
  const averageVectorCost = vector.length
    ? vector.reduce((total, log) => total + log.costUsd, 0) / vector.length
    : DEFAULT_VECTOR_QUERY_COST_USD;
  const baselineCostUsd = logs.length * averageVectorCost;
  const averageLatency = (items: typeof logs) => items.length
    ? Math.round(items.reduce((total, item) => total + item.latencyMs, 0) / items.length)
    : 0;

  return {
    tenantId,
    totalQueries: logs.length,
    routes: { TLM: tlm.length, VECTOR: vector.length },
    actualCostUsd,
    baselineCostUsd,
    costSavedUsd: Math.max(0, baselineCostUsd - actualCostUsd),
    costSavedPercent: baselineCostUsd > 0 ? ((baselineCostUsd - actualCostUsd) / baselineCostUsd) * 100 : 0,
    averageLatencyMs: { TLM: averageLatency(tlm), VECTOR: averageLatency(vector) },
  };
}
