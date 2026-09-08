"use client";
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { MessageBubble } from './ui/MessageBubble';
import { TypingIndicator } from './ui/TypingIndicator';

interface Message {
  id: string;
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

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [simulateTlmOutage, setSimulateTlmOutage] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('klstr_chat_messages');
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) {}
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem('klstr_chat_messages', JSON.stringify(messages));
    }
  }, [messages, isInitialized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Hide the floating widget if user is already inside the full-screen chat page
  if (pathname?.startsWith('/klstr-enterprise-gen-ai/chat')) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };
    
    setInput('');
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const assistantMsgId = (Date.now() + 1).toString();

    try {
      const history = messages
        .filter(m => !m.isError && m.content && m.content.trim().length > 0)
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.content,
          history,
          tenantId: 'default-workspace',
          simulateTlmOutage: process.env.NODE_ENV !== 'production' && simulateTlmOutage === true,
        }),
        signal: abortController.signal
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No readable stream available");

      setMessages(prev => [...prev, {
        id: assistantMsgId,
        role: 'assistant',
        content: ''
      }]);

      const decoder = new TextDecoder();
      let fullText = '';
      let sources: string[] = [];
      let routeMetadata: any = {};

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        fullText += decoder.decode(value, { stream: true });
        setIsTyping(false);

        const routeIdx = fullText.lastIndexOf('\n\n__ROUTE__:');
        let displayContent = fullText;
        if (routeIdx !== -1) {
          displayContent = fullText.slice(0, routeIdx);
          try {
            const parsed = JSON.parse(fullText.slice(routeIdx + '\n\n__ROUTE__:'.length));
            if (parsed.sources) sources = parsed.sources;
            routeMetadata = {
              route: parsed.route,
              latencyMs: parsed.latencyMs,
              fellBackFrom: parsed.fellBackFrom,
              grounded: parsed.grounded,
              blocked: parsed.blocked,
            };
          } catch (e) {}
        }

        setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: displayContent, sources, ...routeMetadata } : m));
      }
    } catch (e: any) {
      if (e.name === 'AbortError') return;
      setIsTyping(false);
      const errMsg = e.message || 'Something went wrong — please try again.';
      setMessages(prev => {
        const exists = prev.some(m => m.id === assistantMsgId);
        if (exists) {
          return prev.map(m => m.id === assistantMsgId ? { ...m, content: errMsg, isError: true } : m);
        }
        return [...prev, {
          id: assistantMsgId,
          role: 'assistant',
          content: errMsg,
          isError: true
        }];
      });
    } finally {
      abortControllerRef.current = null;
    }
  };

  return (
    <>
      <button 
        id="chat-launcher-bubble"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 group flex items-center gap-2.5 bg-black text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 border-2 border-[#ffbf23] transition-all duration-150 z-50 active:scale-95 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open RAG AI Assistant"
      >
        <div className="w-7 h-7 rounded-full bg-[#ffbf23] text-black flex items-center justify-center flex-shrink-0 font-bold">
          <MessageCircle className="w-4 h-4" />
        </div>
        <span className="font-bold text-sm tracking-tight pr-1">
          Ask AI
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[420px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[calc(100vh-5rem)] bg-[#0a0a0a] border border-neutral-800 border-t-4 border-t-[#ffbf23] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#111] border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ffbf23] text-black flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">Enterprise Assistant</h3>
                  <span className="text-[10px] font-bold bg-[#ffbf23] text-black px-1.5 py-0.2 rounded">RAG</span>
                </div>
                <p className="text-[11px] text-neutral-400">Grounded in indexed documents</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {process.env.NODE_ENV !== 'production' && (
                <button
                  onClick={() => setSimulateTlmOutage(value => !value)}
                  className={`rounded px-1.5 py-0.5 text-[9px] font-mono transition ${
                    simulateTlmOutage
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  TLM Outage: {simulateTlmOutage ? 'ON' : 'OFF'}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-[#070707]">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4 my-auto">
                <div className="w-12 h-12 bg-[#ffbf23]/10 border border-[#ffbf23]/30 rounded-2xl flex items-center justify-center mb-3 text-[#ffbf23]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base mb-1">Hello!</h4>
                <p className="text-neutral-400 text-xs max-w-xs leading-relaxed">
                  I can answer questions based on your internal uploaded documents and SOPs.
                </p>
              </div>
            )}
            
            {messages.map(m => (
              <MessageBubble
                key={m.id}
                id={m.id}
                role={m.role}
                content={m.content}
                sources={m.sources}
                isError={m.isError}
                route={m.route}
                latencyMs={m.latencyMs}
                fellBackFrom={m.fellBackFrom}
                grounded={m.grounded}
                blocked={m.blocked}
              />
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-3">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSubmit} className="p-3.5 border-t border-neutral-800 bg-[#0e0e0e] shrink-0">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about your documents..."
                className="w-full bg-[#161616] border border-neutral-700 text-white rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#ffbf23] focus:ring-1 focus:ring-[#ffbf23] transition-colors placeholder:text-neutral-500"
                maxLength={4000}
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="absolute right-2 w-8 h-8 flex items-center justify-center bg-[#ffbf23] hover:bg-[#f0b018] text-black font-bold rounded-lg disabled:opacity-25 transition-all duration-150 shadow active:scale-95"
                aria-label="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[10px] text-neutral-500 text-center mt-1.5">
              Secure RAG vector retrieval &bull; Workspace isolated
            </div>
          </form>
        </div>
      )}
    </>
  );
}
