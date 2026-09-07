'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hello! 👋 Welcome to klstr.ai. How can we help empower your enterprise with AI solutions today?'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "Thank you for reaching out! Our AI solutions team will get back to you shortly. You can also book a direct demo right away."
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#ffbf23] p-4 flex items-center justify-between border-b border-black/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[#ffbf23]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-black text-sm leading-tight">klstr.ai Assistant</h3>
                <span className="text-xs text-black/70 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/10 text-black transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-gray-50 text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="pt-2 flex flex-col gap-1.5">
                <Link
                  href="/contact-us"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold bg-[#ffbf23]/30 hover:bg-[#ffbf23] text-black px-3 py-1.5 rounded-lg border border-[#ffbf23] transition-colors text-left"
                >
                  🗓️ Book an Enterprise Demo
                </Link>
                <Link
                  href="/klstr-agentic-os"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-medium bg-white hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors text-left"
                >
                  ⚙️ Learn about Agentic OS
                </Link>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-black text-black"
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#ffbf23] hover:bg-[#f0b018] rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#ffbf23]/40"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-7 h-7 stroke-[2.5]" />
        ) : (
          <div className="relative">
            {/* Wix chat-like bubble icon */}
            <MessageSquare className="w-7 h-7 fill-transparent stroke-black stroke-[2.2]" />
            <div className="absolute top-[7px] left-[5px] w-4 h-[2px] bg-black"></div>
            <div className="absolute top-[12px] left-[5px] w-2.5 h-[2px] bg-black"></div>
          </div>
        )}
      </button>
    </div>
  );
}
