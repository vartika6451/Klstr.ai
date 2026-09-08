"use client";
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  recordCount: number;
  createdAt: string;
}

export function AuditManager() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/tenants/default-workspace/audit');
      if (res.ok) setLogs(await res.json());
    } catch (e) {}
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleForget = async () => {
    if (!confirm('Are you absolutely sure you want to hard-delete all your data from the server? This cannot be undone.')) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/tenants/default-workspace/forget', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert(`Successfully deleted ${data.deleted} items.`);
        await fetchLogs();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Data Privacy & Compliance</h2>
          <p className="text-sm text-gray-400">Manage your data footprint and audit logs</p>
        </div>
        <button 
          onClick={handleForget}
          disabled={loading}
          className="flex items-center gap-2 bg-red-600/20 text-red-500 hover:bg-red-600/30 border border-red-500/30 px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {loading ? 'Deleting...' : 'Forget my data'}
        </button>
      </div>

      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#0a0a0a] text-gray-300">
            <tr>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Records Affected</th>
              <th className="px-4 py-3 font-medium">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-600">No audit logs found.</td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} className="hover:bg-[#0a0a0a] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-blue-400">{log.action}</td>
                  <td className="px-4 py-3">{log.recordCount} records</td>
                  <td className="px-4 py-3">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
