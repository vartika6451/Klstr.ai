"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileUp, Trash2, Loader2, FileText, MessageCircle } from 'lucide-react';

export interface DocumentRegistryEntry {
  id: string;
  name: string;
  chunkCount: number;
  sizeBytes: number;
  uploadedAt: string;
}

export function DocumentManager() {
  const router = useRouter();
  const [documents, setDocuments] = useState<DocumentRegistryEntry[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasUploadedDocuments, setHasUploadedDocuments] = useState(false);

  const fetchDocs = async () => {
    try {
      const res = await fetch('/api/documents');
      if (!res.ok) throw new Error("Failed to fetch documents");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDocuments(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setError(null);
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
        setError(`Failed to upload: ${failed.map((f:any) => `${f.fileName} (${f.error})`).join(', ')}`);
      }
      
      await fetchDocs();
      if (!failed || failed.length === 0) {
        setHasUploadedDocuments(true);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDocuments(docs => docs.filter(d => d.id !== id));
      const res = await fetch(`/api/documents?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchDocs();
    } catch (e: any) {
      setError(e.message);
      await fetchDocs();
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-xl w-full">
      <h2 className="text-xl font-bold text-white mb-4">Knowledge Base</h2>
      
      <div className="relative border-2 border-dashed border-gray-700 hover:border-gray-500 transition-colors rounded-xl p-8 text-center cursor-pointer mb-6">
        <input 
          type="file" 
          multiple 
          accept=".pdf,.docx,.txt,.md,.csv"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
        />
        <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
          {isUploading ? <Loader2 className="w-8 h-8 animate-spin text-blue-500" /> : <FileUp className="w-8 h-8" />}
          <span className="font-medium text-sm">
            {isUploading ? "Uploading & Indexing..." : "Click or drag files to upload"}
          </span>
          <span className="text-xs text-gray-600">Supports .pdf, .docx, .txt, .md, .csv (Max 15MB)</span>
        </div>
      </div>

      {hasUploadedDocuments && (
        <button
          type="button"
          onClick={() => router.push('/klstr-enterprise-gen-ai/chat')}
          className="w-full mb-6 inline-flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-500 px-5 py-3 rounded-xl font-semibold transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Chat with your documents
        </button>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Indexed Documents</h3>
        {loading ? (
          <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-gray-500" /></div>
        ) : documents.length === 0 ? (
          <div className="text-center p-6 bg-[#111] rounded-xl border border-gray-800 text-gray-500 text-sm">
            No documents indexed yet. Upload a document to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between bg-[#111] border border-gray-800 p-3 rounded-xl hover:border-gray-700 transition">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                  <div className="truncate">
                    <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.chunkCount} chunks • {(doc.sizeBytes / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
