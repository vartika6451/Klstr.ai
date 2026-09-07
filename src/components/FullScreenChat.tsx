"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Loader2, MessageSquare } from 'lucide-react';
import { MessageBubble } from './ui/MessageBubble';
import { TypingIndicator } from './ui/TypingIndicator';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  isError?: boolean;
  route?: 'TLM' | 'VECTOR';
  latencyMs?: number;
  fellBackFrom?: 'TLM';
}

export function FullScreenChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [simulateTlmOutage, setSimulateTlmOutage] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, history, tenantId: 'default-workspace', simulateTlmOutage }),
        signal: abortController.signal
      });

      setIsTyping(false);

      if (!res.ok) {
        let errStr = "Something went wrong";
        try {
           const errData = await res.json();
           if (errData.error) errStr = errData.error;
        } catch {}
        setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: errStr, isError: true } : m));
        return;
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      
      let done = false;
      let fullText = '';
      let sources: string[] | undefined;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          fullText += chunk;

          const routeIdx = fullText.lastIndexOf('\n\n__ROUTE__:');
          let displayContent = fullText;
          let routeMetadata: { route?: 'TLM' | 'VECTOR'; latencyMs?: number; fellBackFrom?: 'TLM'; sources?: string[] } | undefined;
          if (routeIdx !== -1) {
            displayContent = fullText.slice(0, routeIdx);
            try {
              routeMetadata = JSON.parse(fullText.slice(routeIdx + '\n\n__ROUTE__:'.length));
              sources = routeMetadata?.sources;
            } catch (e) {}
          }

          setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: displayContent, sources, ...routeMetadata } : m));
        }
      }
    } catch (e: any) {
      if (e.name === 'AbortError') return;
      setIsTyping(false);
      setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, isError: true } : m));
    } finally {
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/klstr-enterprise-gen-ai" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-bold text-white text-xl">Enterprise Knowledge Assistant</h1>
            <p className="text-sm text-gray-400">Grounded securely in your uploaded documents</p>
            {process.env.NODE_ENV !== 'production' && <button onClick={() => setSimulateTlmOutage(value => !value)} className={`mt-2 rounded px-2 py-1 text-[10px] ${simulateTlmOutage ? 'bg-red-500/20 text-red-300' : 'bg-gray-800 text-gray-400'}`}>Simulate TLM outage: {simulateTlmOutage ? 'ON' : 'OFF'}</button>}
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#050505]">
        <div className="max-w-4xl mx-auto flex flex-col h-full">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-center">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800 shadow-xl">
                <MessageSquare className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">How can I help you today?</h2>
              <p className="max-w-md">
                Ask me anything. I will search the Knowledge Base you uploaded and provide answers directly from your secure documents.
              </p>
            </div>
          )}
          
          {messages.map(m => (
            <MessageBubble key={m.id} id={m.id} role={m.role} content={m.content} sources={m.sources} isError={m.isError} route={m.route} latencyMs={m.latencyMs} fellBackFrom={m.fellBackFrom} />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 sm:p-6 bg-[#0a0a0a] border-t border-gray-800 shrink-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Message Enterprise Assistant..."
              className="w-full bg-[#111] border border-gray-700 text-white rounded-xl pl-6 pr-16 py-4 text-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow shadow-inner"
              maxLength={4000}
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-500 transition-colors shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-3 text-xs text-gray-500">
            AI responses are grounded exclusively in your indexed workspace documents.
          </div>
        </div>
      </footer>
    </div>
  );
}
