'use client';

import { useEffect, useState } from 'react';

interface UsageData {
  totalQueries: number;
  routes: { TLM: number; SLM: number; VECTOR: number; BLOCKED: number };
  actualCostUsd: number;
  baselineCostUsd: number;
  costSavedUsd: number;
  costSavedPercent: number;
  averageLatencyMs: { TLM: number; SLM: number; VECTOR: number };
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

  const largestRoute = Math.max(usage.routes.TLM, usage.routes.SLM, usage.routes.VECTOR, usage.routes.BLOCKED, 1);
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-28 text-white">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">AgenticOS demo</p>
      <h1 className="text-4xl font-bold">Routing usage</h1>
      <p className="mt-3 text-gray-400">Default workspace · {usage.totalQueries} total queries</p>



      <section className="mt-8 rounded-2xl border border-gray-800 bg-[#0a0a0a] p-7">
        <h2 className="text-lg font-semibold">Route breakdown</h2>
        <div className="mt-6 space-y-5">
          {(['TLM', 'SLM', 'VECTOR', 'BLOCKED'] as const).map(route => (
            <div key={route}>
              <div className="mb-2 flex justify-between text-sm"><span>{route === 'TLM' ? '⚡ Instant (TLM)' : route === 'SLM' ? '🧠 Standard (SLM)' : route === 'BLOCKED' ? '🛑 Blocked' : '🔍 Searched documents (VECTOR)'}</span><span className="text-gray-400">{usage.routes[route]} queries</span></div>
              <div className="h-4 overflow-hidden rounded-full bg-gray-800"><div className={route === 'TLM' ? 'h-full bg-yellow-400' : route === 'SLM' ? 'h-full bg-purple-500' : route === 'BLOCKED' ? 'h-full bg-red-500' : 'h-full bg-blue-500'} style={{ width: `${(usage.routes[route] / largestRoute) * 100}%` }} /></div>
              {route !== 'BLOCKED' && <p className="mt-2 text-xs text-gray-500">Average latency: {usage.averageLatencyMs[route as keyof typeof usage.averageLatencyMs]}ms</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
