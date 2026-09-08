import { useState } from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle, XOctagon, Bot, User } from 'lucide-react';
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
    if (route === 'TLM') return <span className="border-[#ffbf23]/40 bg-[#ffbf23]/10 text-[#ffbf23] px-2.5 py-0.5 rounded-full border text-[11px] font-medium">⚡ Instant (TLM)</span>;
    if (route === 'SLM') return <span className="border-amber-500/30 bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded-full border text-[11px] font-medium">🧠 Standard (SLM)</span>;
    if (route === 'VECTOR') return <span className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 px-2.5 py-0.5 rounded-full border text-[11px] font-medium">🔍 Vector RAG</span>;
    if (route === 'BLOCKED') return <span className="border-rose-500/30 bg-rose-500/10 text-rose-300 px-2.5 py-0.5 rounded-full border border-dashed flex items-center gap-1 text-[11px] font-medium"><XOctagon className="w-3 h-3"/> Blocked</span>;
    return null;
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-5 items-start gap-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#ffbf23] text-black flex items-center justify-center flex-shrink-0 mt-1 shadow-sm font-bold">
          <Bot className="w-4 h-4" />
        </div>
      )}
      
      <div 
        className={`max-w-[85%] rounded-2xl px-5 py-4 ${
          isUser 
            ? 'bg-[#ffbf23] text-black font-medium rounded-tr-xs shadow-sm border border-[#e5a918]' 
            : 'bg-[#121212] text-neutral-100 border border-neutral-800 rounded-tl-xs shadow-sm'
        } ${isError || blocked ? 'border-rose-500 bg-rose-950/20 text-rose-200' : ''} ${grounded === false ? 'border-amber-500/40 bg-amber-950/20' : ''}`}
      >
        {grounded === false && (
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-3 bg-amber-500/10 p-2 rounded-lg border border-amber-500/30">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Ungrounded Response - No confident document match found
          </div>
        )}
        
        <div className={`prose ${isUser ? 'prose-neutral text-black' : 'prose-invert text-neutral-100'} prose-sm max-w-none break-words leading-relaxed font-sans`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
        
        {sources && sources.length > 0 && <SourceCitation sources={sources} />}
        
        {!isUser && route && !isError && (
          <div className="mt-3 flex items-center gap-2 text-[11px] flex-wrap">
            {getRouteBadge()}
            {typeof latencyMs === 'number' && <span className="text-neutral-400 border border-neutral-800 bg-neutral-900 px-2 py-0.5 rounded-full font-mono text-[10px]">⏱ {latencyMs}ms</span>}
            {fellBackFrom && <span className="text-amber-300 border border-amber-800/50 bg-amber-950/30 px-2 py-0.5 rounded-full text-[10px]">↳ fell back from {fellBackFrom}</span>}
          </div>
        )}
        
        {isError && (
          <div className="text-rose-400 text-xs mt-2 font-medium">
            Something went wrong — please try again.
          </div>
        )}
        
        {!isUser && !isError && !blocked && content.length > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-800/60">
            <button 
              onClick={() => handleFeedback(1)}
              className={`p-1.5 rounded hover:bg-neutral-800 transition ${feedback === 1 ? 'text-emerald-400 bg-neutral-800' : 'text-neutral-500 hover:text-neutral-300'}`}
              title="Helpful"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => handleFeedback(-1)}
              className={`p-1.5 rounded hover:bg-neutral-800 transition ${feedback === -1 ? 'text-rose-400 bg-neutral-800' : 'text-neutral-500 hover:text-neutral-300'}`}
              title="Not helpful"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
