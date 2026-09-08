"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Loader2, MessageSquare, Plus, Sparkles, ShieldCheck, Database } from 'lucide-react';
import { MessageBubble } from './ui/MessageBubble';
import { TypingIndicator } from './ui/TypingIndicator';
import Link from 'next/link';

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

export function FullScreenChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [simulateTlmOutage, setSimulateTlmOutage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const chatAreaRef = useRef<HTMLElement>(null);
  const shouldAutoScrollRef = useRef(true);
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
    const chatArea = chatAreaRef.current;
    if (!chatArea || !shouldAutoScrollRef.current) return;

    chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      const failed = data.results?.filter((r: any) => r.status === 'failed');
      if (failed && failed.length > 0) {
        alert(`Failed to upload: ${failed.map((f:any) => `${f.fileName} (${f.error})`).join(', ')}`);
      } else {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'assistant',
            content: `✅ Successfully uploaded and indexed **${files.length}** document(s). You can now ask questions about their content.`
        }]);
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    shouldAutoScrollRef.current = true;

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
      // Filter out any error messages or blank entries from history sent to LLM
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

  const samplePrompts = [
    "Summarize key insights from the uploaded documents",
    "What are the main findings and deliverables?",
    "List all compliance and security guidelines",
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col h-[100dvh] w-screen overflow-hidden bg-[#070707] text-white">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-3.5 bg-[#0c0c0c] border-b border-neutral-800 border-t-4 border-[#ffbf23] shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/klstr-enterprise-gen-ai"
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition"
            title="Back to Enterprise GenAI"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center font-bold text-sm shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-white text-base sm:text-lg tracking-tight leading-tight">
                  Enterprise Knowledge Assistant
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-2 py-0.5 rounded-full">
                  RAG Active
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Grounded securely in your local indexed documents &bull; Vector search enabled
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {process.env.NODE_ENV !== 'production' && (
            <button
              onClick={() => setSimulateTlmOutage(value => !value)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                simulateTlmOutage
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
              }`}
            >
              Simulate TLM Outage: {simulateTlmOutage ? 'ON' : 'OFF'}
            </button>
          )}
          <button
            onClick={() => {
              if (confirm('Clear current chat conversation?')) {
                setMessages([]);
                sessionStorage.removeItem('klstr_chat_messages');
              }
            }}
            className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-900 transition"
          >
            Clear Chat
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main
        ref={chatAreaRef}
        onScroll={e => {
          const chatArea = e.currentTarget;
          const distanceFromBottom = chatArea.scrollHeight - chatArea.scrollTop - chatArea.clientHeight;
          shouldAutoScrollRef.current = distanceFromBottom < 96;
        }}
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-[#070707]"
      >
        <div className="max-w-4xl mx-auto flex flex-col h-full justify-between">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 my-auto py-12">
              <div className="w-16 h-16 bg-[#ffbf23]/10 rounded-2xl flex items-center justify-center mb-5 border border-[#ffbf23]/30 text-[#ffbf23] shadow-lg">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                How can I help you today?
              </h2>
              <p className="max-w-lg text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
                Ask me anything about your uploaded documents. Responses are grounded strictly in your indexed enterprise vector store.
              </p>

              {/* Quick sample prompt pills */}
              <div className="flex flex-wrap justify-center gap-2.5 max-w-xl">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#ffbf23]/40 text-neutral-300 text-xs sm:text-sm px-4 py-2 rounded-xl transition text-left"
                  >
                    &ldquo;{prompt}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-2">
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
                <div className="flex justify-start mb-4">
                  <TypingIndicator />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 sm:p-5 bg-[#0c0c0c] border-t border-neutral-800 shrink-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            {/* Document Upload Button inside input */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              <label
                title="Upload document to Knowledge Base"
                className={`p-2 text-neutral-400 hover:text-[#ffbf23] hover:bg-neutral-800 rounded-lg transition cursor-pointer ${
                  isUploading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#ffbf23]" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
                <input 
                  type="file" 
                  multiple 
                  accept=".pdf,.docx,.txt,.md,.csv"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>

            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask questions about your uploaded documents..."
              className="w-full bg-[#141414] border border-neutral-700 text-white rounded-xl pl-12 pr-16 py-3.5 text-base sm:text-lg focus:outline-none focus:border-[#ffbf23] focus:ring-1 focus:ring-[#ffbf23] transition-colors placeholder:text-neutral-500 shadow-inner"
              maxLength={4000}
            />

            <button 
              type="submit" 
              disabled={!input.trim()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#ffbf23] hover:bg-[#f0b018] text-black font-bold rounded-lg disabled:opacity-20 disabled:hover:bg-[#ffbf23] transition-all duration-150 shadow-sm active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-center mt-2.5 text-[11px] text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ffbf23]" />
            <span>AI responses are grounded exclusively in your indexed workspace documents.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
