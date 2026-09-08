import { useState } from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle, XOctagon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SourceCitation } from './SourceCitation';

interface MessageBubbleProps {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  isError?: boolean;
  route?: 'TLM' | 'SLM' | 'VECTOR' | 'BLOCKED';
  latencyMs?: number;
  fellBackFrom?: 'TLM' | 'SLM';
  grounded?: boolean;
  blocked?: boolean;
}

export function MessageBubble({ id, role, content, sources, isError, route, latencyMs, fellBackFrom, grounded, blocked }: MessageBubbleProps) {
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

  const getRouteBadge = () => {
    if (route === 'TLM') return <span className="border-yellow-500/30 bg-yellow-500/10 text-yellow-300 px-2 py-1 rounded-full border">⚡ Instant (TLM)</span>;
    if (route === 'SLM') return <span className="border-purple-500/30 bg-purple-500/10 text-purple-300 px-2 py-1 rounded-full border">🧠 Standard (SLM)</span>;
    if (route === 'VECTOR') return <span className="border-blue-500/30 bg-blue-500/10 text-blue-300 px-2 py-1 rounded-full border">🔍 Searched (VECTOR)</span>;
    if (route === 'BLOCKED') return <span className="border-red-500/30 bg-red-500/10 text-red-300 px-2 py-1 rounded-full border border-dashed flex items-center gap-1"><XOctagon className="w-3 h-3"/> Blocked</span>;
    return null;
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[85%] rounded-2xl px-5 py-4 ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-[#111] text-gray-200 border border-gray-800 rounded-bl-none shadow-sm'
        } ${isError || blocked ? 'border-red-500 bg-red-900/20' : ''} ${grounded === false ? 'border-orange-500/50 bg-orange-900/10' : ''}`}
      >
        {grounded === false && (
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold mb-3 bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
            <AlertTriangle className="w-4 h-4" />
            Ungrounded Response - No confident document match found
          </div>
        )}
        <div className={`prose prose-invert prose-sm max-w-none break-words leading-relaxed font-sans ${grounded === false ? 'text-gray-400' : ''}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
        {sources && sources.length > 0 && <SourceCitation sources={sources} />}
        
        {!isUser && route && !isError && (
          <div className="mt-3 flex items-center gap-2 text-[11px] flex-wrap">
            {getRouteBadge()}
            {typeof latencyMs === 'number' && <span className="text-gray-400 border border-gray-700 bg-gray-800/50 px-2 py-1 rounded-full">⏱ {latencyMs}ms</span>}
            {fellBackFrom && <span className="text-orange-300 border border-orange-700/50 bg-orange-900/30 px-2 py-1 rounded-full">↳ fell back from {fellBackFrom}</span>}
          </div>
        )}
        {isError && (
          <div className="text-red-400 text-xs mt-2">
            Something went wrong — please try again.
          </div>
        )}
        
        {!isUser && !isError && !blocked && content.length > 0 && (
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
