"use client";
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
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
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-black border border-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
            <div>
              <h3 className="font-bold text-white">Enterprise Assistant</h3>
              <p className="text-xs text-gray-400">Secure knowledge base chat</p>
              {process.env.NODE_ENV !== 'production' && <button onClick={() => setSimulateTlmOutage(value => !value)} className={`mt-2 rounded px-2 py-1 text-[10px] ${simulateTlmOutage ? 'bg-red-500/20 text-red-300' : 'bg-gray-800 text-gray-400'}`}>Simulate TLM outage: {simulateTlmOutage ? 'ON' : 'OFF'}</button>}
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-center px-4">
                <MessageCircle className="w-12 h-12 mb-4 opacity-20" />
                <p>Hello! I can answer questions based on your internal documents.</p>
              </div>
            )}
            
            {messages.map(m => (
              <MessageBubble key={m.id} id={m.id} role={m.role} content={m.content} sources={m.sources} isError={m.isError} route={m.route} latencyMs={m.latencyMs} fellBackFrom={m.fellBackFrom} grounded={m.grounded} blocked={m.blocked} />
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-gray-900/50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about your documents..."
                className="w-full bg-[#111] border border-gray-700 text-white rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                maxLength={4000}
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="absolute right-2 top-2 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full disabled:opacity-50 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
