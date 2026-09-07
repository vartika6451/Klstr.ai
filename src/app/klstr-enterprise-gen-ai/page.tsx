import ChatWidget from '@/components/ChatWidget';
import { DocumentManager } from '@/components/DocumentManager';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function EnterpriseGenAIPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center min-h-[60vh] flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Enterprise GenAI</h1>
      <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
        An enterprise-grade conversational AI solution — similar to ChatGPT but purpose-built for secure deployment within an organization, fine-tuned on internal knowledge base, SOPs, and documents.
      </p>
      
      <div className="w-full max-w-3xl text-left mb-12">
        <DocumentManager />
      </div>

      <Link href="/klstr-enterprise-gen-ai/chat" className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold text-lg transition shadow-lg hover:shadow-xl mb-12">
        <MessageCircle className="w-5 h-5" />
        Open Full Screen Chat
      </Link>

      <ChatWidget />
    </div>
  );
}
