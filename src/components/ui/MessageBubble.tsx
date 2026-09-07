import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { SourceCitation } from './SourceCitation';

interface MessageBubbleProps {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  isError?: boolean;
  route?: 'TLM' | 'VECTOR';
  latencyMs?: number;
  fellBackFrom?: 'TLM';
}

export function MessageBubble({ id, role, content, sources, isError, route, latencyMs, fellBackFrom }: MessageBubbleProps) {
  const isUser = role === 'user';
  const [feedback, setFeedback] = useState<number | null>(null);

  const handleFeedback = async (rating: number) => {
    if (!id || feedback === rating) return;
    setFeedback(rating);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: id, rating, tenantId: 'default-workspace' })
      });
    } catch (e) {}
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[85%] rounded-2xl px-5 py-4 ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-[#111] text-gray-200 border border-gray-800 rounded-bl-none shadow-sm'
        } ${isError ? 'border-red-500 bg-red-900/20' : ''}`}
      >
        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed font-sans">
          {content}
        </div>
        {sources && sources.length > 0 && <SourceCitation sources={sources} />}
        {!isUser && route && !isError && (
          <div className={`mt-3 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] ${route === 'TLM' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300' : 'border-blue-500/30 bg-blue-500/10 text-blue-300'}`}>
            <span>{route === 'TLM' ? '⚡ Instant (TLM)' : '🔍 Searched documents (VECTOR)'}</span>
            {typeof latencyMs === 'number' && <span className="text-gray-400">· {latencyMs}ms</span>}
            {fellBackFrom && <span className="text-orange-300">· ↩ fell back from {fellBackFrom}</span>}
          </div>
        )}
        {isError && (
          <div className="text-red-400 text-xs mt-2">
            Something went wrong — please try again.
          </div>
        )}
        
        {!isUser && !isError && content.length > 0 && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-800/50">
            <button 
              onClick={() => handleFeedback(1)}
              className={`p-1.5 rounded hover:bg-gray-800 transition ${feedback === 1 ? 'text-green-500 bg-gray-800' : 'text-gray-500'}`}
              title="Helpful"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleFeedback(-1)}
              className={`p-1.5 rounded hover:bg-gray-800 transition ${feedback === -1 ? 'text-red-500 bg-gray-800' : 'text-gray-500'}`}
              title="Not helpful"
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
