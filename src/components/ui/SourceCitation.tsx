export function SourceCitation({ sources }: { sources: string[] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-2 text-xs text-gray-400 border-t border-gray-700 pt-2">
      <span className="font-semibold text-gray-300">Sources used:</span>
      <ul className="list-disc list-inside mt-1">
        {sources.map((src, i) => (
          <li key={i}>{src}</li>
        ))}
      </ul>
    </div>
  );
}
