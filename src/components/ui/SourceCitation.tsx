import { BookOpen } from 'lucide-react';

export function SourceCitation({ sources }: { sources: string[] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-3 pt-2.5 border-t border-neutral-800 text-xs text-neutral-400">
      <div className="flex items-center gap-1.5 font-semibold text-neutral-300 mb-2">
        <BookOpen className="w-3.5 h-3.5 text-[#ffbf23]" />
        <span>Grounded Sources:</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((src, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-700/80 text-neutral-200 px-2.5 py-1 rounded-md text-[11px] font-mono shadow-xs"
          >
            <span className="text-[#ffbf23]">📄</span> {src}
          </span>
        ))}
      </div>
    </div>
  );
}
