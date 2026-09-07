'use client';

import { useEffect, useState } from 'react';

interface UsageData {
  totalQueries: number;
  routes: { TLM: number; VECTOR: number };
  actualCostUsd: number;
  baselineCostUsd: number;
  costSavedUsd: number;
  costSavedPercent: number;
  averageLatencyMs: { TLM: number; VECTOR: number };
}

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 });

export default function UsagePage() {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/usage/default-workspace')
      .then(async response => {
        if (!response.ok) throw new Error((await response.json()).error || 'Unable to load usage.');
        return response.json();
      })
      .then(setUsage)
      .catch(error => setError(error.message));
  }, []);

  if (error) return <main className="mx-auto max-w-4xl px-6 py-32 text-red-400">{error}</main>;
  if (!usage) return <main className="mx-auto max-w-4xl px-6 py-32 text-gray-500">Loading usage…</main>;

  const largestRoute = Math.max(usage.routes.TLM, usage.routes.VECTOR, 1);
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-28 text-white">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">AgenticOS demo</p>
      <h1 className="text-4xl font-bold">Routing usage</h1>
      <p className="mt-3 text-gray-400">Default workspace · {usage.totalQueries} total queries</p>

      <section className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8">
        <p className="text-sm font-medium text-emerald-300">ESTIMATED COST SAVED</p>
        <p className="mt-2 text-6xl font-bold text-white">{usage.costSavedPercent.toFixed(1)}%</p>
        <p className="mt-3 text-sm text-gray-300">{money.format(usage.costSavedUsd)} saved · {money.format(usage.actualCostUsd)} actual vs {money.format(usage.baselineCostUsd)} if every query used VECTOR.</p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-800 bg-[#0a0a0a] p-7">
        <h2 className="text-lg font-semibold">Route breakdown</h2>
        <div className="mt-6 space-y-5">
          {(['TLM', 'VECTOR'] as const).map(route => (
            <div key={route}>
              <div className="mb-2 flex justify-between text-sm"><span>{route === 'TLM' ? '⚡ Instant (TLM)' : '🔍 Searched documents (VECTOR)'}</span><span className="text-gray-400">{usage.routes[route]} queries</span></div>
              <div className="h-4 overflow-hidden rounded-full bg-gray-800"><div className={route === 'TLM' ? 'h-full bg-yellow-400' : 'h-full bg-blue-500'} style={{ width: `${(usage.routes[route] / largestRoute) * 100}%` }} /></div>
              <p className="mt-2 text-xs text-gray-500">Average latency: {usage.averageLatencyMs[route]}ms</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
