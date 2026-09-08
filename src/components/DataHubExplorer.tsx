"use client";

import { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Filter,
  Download,
  Code2,
  Play,
  Check,
  Copy,
  Plus,
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  X,
  FileSpreadsheet,
  Activity,
  Layers,
  ChevronRight,
  Radio,
  CheckCircle2,
  Loader2,
  ExternalLink,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { INITIAL_DATASETS, Dataset } from '@/data/datahub-datasets';

export default function DataHubExplorer() {
  const [datasets, setDatasets] = useState<Dataset[]>(INITIAL_DATASETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('All');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [inspectorTab, setInspectorTab] = useState<'preview' | 'schema' | 'api' | 'rag'>('preview');
  
  // Sandbox State
  const [sandboxDatasetId, setSandboxDatasetId] = useState<string>(INITIAL_DATASETS[0].id);
  const [sandboxFilter, setSandboxFilter] = useState('');
  const [sandboxResults, setSandboxResults] = useState<any[] | null>(INITIAL_DATASETS[0].sampleRows);
  const [sandboxExecutionMs, setSandboxExecutionMs] = useState<number | null>(12);

  // Ingestion State
  const [ingestingId, setIngestingId] = useState<string | null>(null);
  const [ingestedIds, setIngestedIds] = useState<Set<string>>(new Set());

  // Publish Modal State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishForm, setPublishForm] = useState({
    title: '',
    category: 'Financial Markets' as Dataset['category'],
    frequency: 'Daily' as Dataset['frequency'],
    format: 'JSON' as Dataset['format'],
    description: '',
    tags: '',
  });

  // Code snippet language
  const [codeLang, setCodeLang] = useState<'curl' | 'python' | 'node'>('curl');
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = [
    'All',
    'Financial Markets',
    'Supply Chain',
    'Healthcare',
    'Energy & Grid',
    'E-Commerce & Retail',
    'Industrial IoT',
  ];

  const frequencies = [
    'All',
    'Real-Time Streaming',
    'Hourly',
    'Daily',
    'Weekly',
    'Monthly',
    'On Demand',
  ];

  // Filtered datasets
  const filteredDatasets = useMemo(() => {
    return datasets.filter(d => {
      const matchCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const matchFrequency = selectedFrequency === 'All' || d.frequency === selectedFrequency;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || (
        d.title.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q)) ||
        d.provider.toLowerCase().includes(q)
      );
      return matchCategory && matchFrequency && matchQuery;
    });
  }, [datasets, selectedCategory, selectedFrequency, searchQuery]);

  // Handle RAG Ingestion
  const handleIngestRag = async (dataset: Dataset) => {
    setIngestingId(dataset.id);
    try {
      const res = await fetch('/api/datahub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ingest_rag',
          datasetId: dataset.id
        })
      });
      const data = await res.json();
      if (data.success) {
        setIngestedIds(prev => new Set(prev).add(dataset.id));
      } else {
        alert(data.error || 'Failed to ingest dataset');
      }
    } catch (err: any) {
      alert(err.message || 'Error ingesting dataset');
    } finally {
      setIngestingId(null);
    }
  };

  // Run Sandbox Query
  const runSandboxQuery = () => {
    const start = performance.now();
    const currentDs = datasets.find(d => d.id === sandboxDatasetId) || datasets[0];
    let rows = currentDs.sampleRows;

    if (sandboxFilter.trim()) {
      const term = sandboxFilter.toLowerCase().trim();
      rows = rows.filter(r => JSON.stringify(r).toLowerCase().includes(term));
    }

    const elapsed = Math.round(performance.now() - start + Math.random() * 8 + 4);
    setSandboxResults(rows);
    setSandboxExecutionMs(elapsed);
  };

  // Download Sample as JSON
  const downloadSample = (dataset: Dataset) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataset.sampleRows, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${dataset.id}-sample.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Handle Publish Form
  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!publishForm.title.trim() || !publishForm.description.trim()) return;

    const newId = `pub-${Date.now().toString(36)}`;
    const newDataset: Dataset = {
      id: newId,
      title: publishForm.title.trim(),
      subtitle: `${publishForm.category} verified custom telemetry feed`,
      category: publishForm.category,
      frequency: publishForm.frequency,
      format: publishForm.format,
      provider: 'Enterprise Custom Provider',
      license: 'Enterprise Cleanroom',
      recordCount: '500,000+ rows',
      sizeBytes: '48 MB',
      qualityScore: 99.8,
      lastUpdated: 'Just now',
      pricingModel: 'Open Cleanroom',
      description: publishForm.description.trim(),
      tags: publishForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      columns: [
        { name: 'id', type: 'STRING', nullable: false, description: 'Unique record identifier' },
        { name: 'timestamp', type: 'TIMESTAMP', nullable: false, description: 'Telemetry recorded time' },
        { name: 'metric_value', type: 'NUMBER', nullable: false, description: 'Observed measurement value' },
        { name: 'status', type: 'STRING', nullable: false, description: 'Health assessment tag' },
      ],
      sampleRows: [
        { id: 'REC-001', timestamp: new Date().toISOString(), metric_value: 142.8, status: 'NOMINAL' },
        { id: 'REC-002', timestamp: new Date().toISOString(), metric_value: 168.4, status: 'ELEVATED' },
        { id: 'REC-003', timestamp: new Date().toISOString(), metric_value: 139.1, status: 'NOMINAL' },
      ],
      apiEndpoint: `https://api.klstr.ai/v1/datahub/custom/${newId}`
    };

    setDatasets(prev => [newDataset, ...prev]);
    setIsPublishModalOpen(false);
    setPublishForm({
      title: '',
      category: 'Financial Markets',
      frequency: 'Daily',
      format: 'JSON',
      description: '',
      tags: '',
    });
  };

  // Generate Integration Snippet
  const getCodeSnippet = (dataset: Dataset, lang: 'curl' | 'python' | 'node') => {
    if (lang === 'curl') {
      return `curl -X GET "${dataset.apiEndpoint}?limit=100" \\
  -H "Authorization: Bearer YOUR_KLSTR_API_KEY" \\
  -H "Accept: application/json"`;
    }
    if (lang === 'python') {
      return `import requests
import pandas as pd

url = "${dataset.apiEndpoint}"
headers = {
    "Authorization": "Bearer YOUR_KLSTR_API_KEY",
    "Accept": "application/json"
}

params = {"limit": 100}
response = requests.get(url, headers=headers, params=params)
data = response.json()

# Load directly into pandas DataFrame for analysis
df = pd.DataFrame(data["records"])
print(df.head())`;
    }
    return `import fetch from 'node-fetch';

async function fetchTelemetry() {
  const res = await fetch('${dataset.apiEndpoint}?limit=100', {
    headers: {
      'Authorization': 'Bearer YOUR_KLSTR_API_KEY',
      'Accept': 'application/json'
    }
  });

  const data = await res.json();
  console.log('Indexed records:', data.records);
}

fetchTelemetry();`;
  };

  return (
    <div id="marketplace" className="w-full bg-[#0a0a0a] text-white border-t border-neutral-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ========================================================================= */}
        {/* HEADER & METRICS BAR */}
        {/* ========================================================================= */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="bg-[#ffbf23] text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Live Enterprise Marketplace
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Enclave
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                klstrAIDataHub Explorer
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg mt-2 max-w-2xl leading-relaxed">
                Discover, query, and subscribe to verified high-frequency feeds, industrial IoT telemetry, and multimodal research cleanrooms.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsPublishModalOpen(true)}
                className="flex items-center gap-2 bg-[#ffbf23] hover:bg-[#f0b018] text-black font-bold px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 text-sm"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Publish Dataset</span>
              </button>
            </div>
          </div>

          {/* Telemetry Stat Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#121212] border border-neutral-800 p-4 rounded-xl">
              <div className="text-xs text-neutral-400 font-medium mb-1">Catalog Feeds</div>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <span>{datasets.length} Active</span>
                <Database className="w-4 h-4 text-[#ffbf23]" />
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 p-4 rounded-xl">
              <div className="text-xs text-neutral-400 font-medium mb-1">Indexed Records</div>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <span>22.8M+</span>
                <Layers className="w-4 h-4 text-[#ffbf23]" />
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 p-4 rounded-xl">
              <div className="text-xs text-neutral-400 font-medium mb-1">P99 REST / WSS Latency</div>
              <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2 font-mono">
                <span>14 ms</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 p-4 rounded-xl">
              <div className="text-xs text-neutral-400 font-medium mb-1">Schema Quality Benchmark</div>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <span>99.8%</span>
                <ShieldCheck className="w-4 h-4 text-[#ffbf23]" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CONTROLS: SEARCH & CATEGORY TABS */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search datasets by keywords, ticker, port, indication, provider, or tags..."
                className="w-full bg-[#141414] border border-neutral-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#ffbf23] focus:ring-1 focus:ring-[#ffbf23] transition placeholder:text-neutral-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Frequency Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-neutral-400 font-medium hidden md:inline">Cadence:</span>
              <select
                value={selectedFrequency}
                onChange={e => setSelectedFrequency(e.target.value)}
                className="bg-[#141414] border border-neutral-700 text-white text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#ffbf23] transition cursor-pointer"
              >
                {frequencies.map(f => (
                  <option key={f} value={f}>{f === 'All' ? 'All Frequencies' : f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#ffbf23] text-black shadow-sm font-bold'
                      : 'bg-[#141414] text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DATASET CARDS GRID */}
        {/* ========================================================================= */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-400">
              Showing <span className="font-bold text-white">{filteredDatasets.length}</span> verified enterprise datasets
            </span>
          </div>

          {filteredDatasets.length === 0 ? (
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-12 text-center my-6">
              <Database className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No datasets matched your criteria</h3>
              <p className="text-neutral-400 text-sm max-w-sm mx-auto mb-6">
                Try clearing your search query or switching industry categories.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedFrequency('All'); }}
                className="bg-[#ffbf23] text-black font-bold px-4 py-2 rounded-lg text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDatasets.map(dataset => {
                const isIngested = ingestedIds.has(dataset.id);
                const isIngesting = ingestingId === dataset.id;

                return (
                  <div
                    key={dataset.id}
                    className="bg-[#111111] border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 group hover:shadow-xl hover:shadow-black/60"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-[#ffbf23]/15 text-[#ffbf23] border border-[#ffbf23]/30 px-2.5 py-0.5 rounded-full">
                          {dataset.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                          {dataset.frequency === 'Real-Time Streaming' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                              Streaming
                            </span>
                          ) : (
                            <span>{dataset.frequency}</span>
                          )}
                          <span>&bull;</span>
                          <span className="text-neutral-300 font-semibold">{dataset.format}</span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-bold text-white group-hover:text-[#ffbf23] transition-colors line-clamp-1">
                        {dataset.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 mb-3 line-clamp-2 leading-relaxed">
                        {dataset.subtitle}
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800/80 my-3 text-center bg-[#0c0c0c] rounded-xl px-2">
                        <div>
                          <div className="text-[10px] text-neutral-500 uppercase font-semibold">Volume</div>
                          <div className="text-xs font-bold text-neutral-200 font-mono">{dataset.recordCount}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-neutral-500 uppercase font-semibold">Payload</div>
                          <div className="text-xs font-bold text-neutral-200 font-mono">{dataset.sizeBytes}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-neutral-500 uppercase font-semibold">QA Score</div>
                          <div className="text-xs font-bold text-emerald-400 font-mono">{dataset.qualityScore}%</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {dataset.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2 border-t border-neutral-800/60">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setSelectedDataset(dataset);
                            setInspectorTab('preview');
                          }}
                          className="flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 py-2 rounded-xl text-xs font-semibold transition"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#ffbf23]" />
                          <span>Inspect</span>
                        </button>

                        <button
                          onClick={() => {
                            setSandboxDatasetId(dataset.id);
                            const element = document.getElementById('query-sandbox');
                            element?.scrollIntoView({ behavior: 'smooth' });
                            runSandboxQuery();
                          }}
                          className="flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 py-2 rounded-xl text-xs font-semibold transition"
                        >
                          <Play className="w-3 h-3 text-[#ffbf23]" />
                          <span>Query</span>
                        </button>
                      </div>

                      {/* Ingest to RAG Button */}
                      <button
                        onClick={() => handleIngestRag(dataset)}
                        disabled={isIngesting || isIngested}
                        className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition ${
                          isIngested
                            ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/60 cursor-default'
                            : 'bg-[#ffbf23] hover:bg-[#f0b018] text-black active:scale-95'
                        }`}
                      >
                        {isIngesting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Indexing into RAG...</span>
                          </>
                        ) : isIngested ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Ingested to RAG Assistant</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Ingest to RAG Engine</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SQL & QUERY SANDBOX */}
        {/* ========================================================================= */}
        <div id="query-sandbox" className="bg-[#111111] border border-neutral-800 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#ffbf23] text-black font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Data Playground
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Interactive Query Sandbox</h3>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Test low-latency query filters against live DataHub schemas without issuing API credentials.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sandboxDatasetId}
                onChange={e => {
                  const newId = e.target.value;
                  setSandboxDatasetId(newId);
                  const found = datasets.find(d => d.id === newId);
                  if (found) {
                    setSandboxResults(found.sampleRows);
                    setSandboxExecutionMs(8);
                  }
                }}
                className="bg-[#1a1a1a] border border-neutral-700 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#ffbf23]"
              >
                {datasets.map(d => (
                  <option key={d.id} value={d.id}>{d.title}</option>
                ))}
              </select>

              <button
                onClick={runSandboxQuery}
                className="flex items-center gap-1.5 bg-[#ffbf23] hover:bg-[#f0b018] text-black font-bold px-4 py-2.5 rounded-xl text-xs transition active:scale-95 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Execute Query</span>
              </button>
            </div>
          </div>

          {/* Query Filter Input Bar */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-xs">
                FILTER WHERE
              </div>
              <input
                type="text"
                value={sandboxFilter}
                onChange={e => setSandboxFilter(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runSandboxQuery()}
                placeholder="text keyword or symbol (e.g. 'NVDA', 'Shanghai', 'KRAS', 'California', 'B0CHX1W28Z')"
                className="w-full bg-[#181818] border border-neutral-700 text-white font-mono text-xs rounded-xl pl-32 pr-4 py-3 focus:outline-none focus:border-[#ffbf23] focus:ring-1 focus:ring-[#ffbf23]"
              />
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-neutral-500 font-mono">
              <span>Quick Presets:</span>
              <button onClick={() => { setSandboxFilter('NVDA'); runSandboxQuery(); }} className="hover:text-[#ffbf23] underline">NVDA</button>
              <span>&bull;</span>
              <button onClick={() => { setSandboxFilter('Shanghai'); runSandboxQuery(); }} className="hover:text-[#ffbf23] underline">Shanghai Port</button>
              <span>&bull;</span>
              <button onClick={() => { setSandboxFilter('KRAS'); runSandboxQuery(); }} className="hover:text-[#ffbf23] underline">KRAS Target</button>
              <span>&bull;</span>
              <button onClick={() => { setSandboxFilter('California'); runSandboxQuery(); }} className="hover:text-[#ffbf23] underline">CAISO Grid</button>
            </div>
          </div>

          {/* Results Output */}
          {sandboxResults && (
            <div className="mt-4 border border-neutral-800 rounded-xl overflow-hidden bg-[#0c0c0c]">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-neutral-800 text-xs">
                <span className="text-neutral-400 font-mono">
                  Result rows: <span className="text-white font-bold">{sandboxResults.length}</span>
                </span>
                {sandboxExecutionMs && (
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Execution time: {sandboxExecutionMs}ms
                  </span>
                )}
              </div>

              <div className="overflow-x-auto max-h-72">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#161616] text-neutral-400 border-b border-neutral-800">
                    <tr>
                      {Object.keys(sandboxResults[0] || {}).map((col, idx) => (
                        <th key={idx} className="p-3 text-neutral-300 font-semibold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-200">
                    {sandboxResults.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-neutral-900/60 transition">
                        {Object.values(row).map((val: any, cIdx) => (
                          <td key={cIdx} className="p-3 whitespace-nowrap">
                            {typeof val === 'boolean' ? (val ? 'TRUE' : 'FALSE') : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: DATASET INSPECTOR & SCHEMA VIEWER */}
      {/* ========================================================================= */}
      {selectedDataset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#0e0e0e] border border-neutral-700 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#141414] border-b border-neutral-800 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-2.5 py-0.5 rounded-full">
                    {selectedDataset.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    ID: {selectedDataset.id}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{selectedDataset.title}</h3>
                <p className="text-sm text-neutral-400 mt-1 max-w-2xl">{selectedDataset.description}</p>
              </div>

              <button
                onClick={() => setSelectedDataset(null)}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800 bg-[#121212]">
              <button
                onClick={() => setInspectorTab('preview')}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 border-b-2 transition ${
                  inspectorTab === 'preview'
                    ? 'border-[#ffbf23] text-[#ffbf23]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Live Data Preview</span>
              </button>

              <button
                onClick={() => setInspectorTab('schema')}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 border-b-2 transition ${
                  inspectorTab === 'schema'
                    ? 'border-[#ffbf23] text-[#ffbf23]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Schema Dictionary ({selectedDataset.columns.length})</span>
              </button>

              <button
                onClick={() => setInspectorTab('api')}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 border-b-2 transition ${
                  inspectorTab === 'api'
                    ? 'border-[#ffbf23] text-[#ffbf23]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>API Integration</span>
              </button>

              <button
                onClick={() => setInspectorTab('rag')}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 border-b-2 transition ${
                  inspectorTab === 'rag'
                    ? 'border-[#ffbf23] text-[#ffbf23]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>RAG Ingestion</span>
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a]">
              
              {/* TAB 1: PREVIEW */}
              {inspectorTab === 'preview' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-mono">
                      Showing {selectedDataset.sampleRows.length} recent telemetry records
                    </span>
                    <button
                      onClick={() => downloadSample(selectedDataset)}
                      className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      <Download className="w-3.5 h-3.5 text-[#ffbf23]" />
                      <span>Download Sample JSON</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-neutral-800 rounded-xl">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#141414] text-neutral-400 border-b border-neutral-800">
                        <tr>
                          {selectedDataset.columns.map(col => (
                            <th key={col.name} className="p-3 font-semibold text-neutral-300">
                              <div>{col.name}</div>
                              <span className="text-[10px] text-[#ffbf23] font-normal">{col.type}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900 text-neutral-200">
                        {selectedDataset.sampleRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-neutral-900/50">
                            {selectedDataset.columns.map(col => (
                              <td key={col.name} className="p-3 whitespace-nowrap">
                                {typeof row[col.name] === 'boolean'
                                  ? (row[col.name] ? 'TRUE' : 'FALSE')
                                  : String(row[col.name] ?? '-')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: SCHEMA */}
              {inspectorTab === 'schema' && (
                <div className="border border-neutral-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#141414] text-neutral-400 border-b border-neutral-800">
                      <tr>
                        <th className="p-3 font-semibold text-white">Column</th>
                        <th className="p-3 font-semibold text-white">Data Type</th>
                        <th className="p-3 font-semibold text-white">Nullable</th>
                        <th className="p-3 font-semibold text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 text-neutral-300 font-mono text-xs">
                      {selectedDataset.columns.map(col => (
                        <tr key={col.name} className="hover:bg-neutral-900/40">
                          <td className="p-3 font-bold text-white">{col.name}</td>
                          <td className="p-3 text-[#ffbf23]">{col.type}</td>
                          <td className="p-3 text-neutral-400">{col.nullable ? 'YES' : 'NO'}</td>
                          <td className="p-3 font-sans text-neutral-300">{col.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 3: API CODE SNIPPET */}
              {inspectorTab === 'api' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCodeLang('curl')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          codeLang === 'curl' ? 'bg-[#ffbf23] text-black' : 'bg-neutral-900 text-neutral-400'
                        }`}
                      >
                        cURL
                      </button>
                      <button
                        onClick={() => setCodeLang('python')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          codeLang === 'python' ? 'bg-[#ffbf23] text-black' : 'bg-neutral-900 text-neutral-400'
                        }`}
                      >
                        Python (Pandas)
                      </button>
                      <button
                        onClick={() => setCodeLang('node')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          codeLang === 'node' ? 'bg-[#ffbf23] text-black' : 'bg-neutral-900 text-neutral-400'
                        }`}
                      >
                        Node.js
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getCodeSnippet(selectedDataset, codeLang));
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded-lg transition"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Snippet'}</span>
                    </button>
                  </div>

                  <pre className="bg-[#121212] border border-neutral-800 p-4 rounded-xl text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed">
                    <code>{getCodeSnippet(selectedDataset, codeLang)}</code>
                  </pre>
                </div>
              )}

              {/* TAB 4: RAG INGESTION */}
              {inspectorTab === 'rag' && (
                <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center font-bold shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Index Directly into Enterprise RAG Knowledge Base</h4>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        Pushing this dataset into your Klstr Knowledge Base enables the Enterprise AI Assistant to query and cite live records from this feed whenever answering queries in chat.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div className="text-xs text-neutral-400">
                      Target Destination: <span className="font-mono text-white">.data/csvs/{selectedDataset.id}.json</span>
                    </div>

                    <button
                      onClick={() => handleIngestRag(selectedDataset)}
                      disabled={ingestingId === selectedDataset.id || ingestedIds.has(selectedDataset.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow ${
                        ingestedIds.has(selectedDataset.id)
                          ? 'bg-emerald-900 text-emerald-300 cursor-default'
                          : 'bg-[#ffbf23] hover:bg-[#f0b018] text-black active:scale-95'
                      }`}
                    >
                      {ingestingId === selectedDataset.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Ingesting...</span>
                        </>
                      ) : ingestedIds.has(selectedDataset.id) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Ingested & Grounded</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Confirm & Ingest</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#141414] border-t border-neutral-800 flex items-center justify-between">
              <div className="text-xs text-neutral-500 font-mono">
                Provider: <span className="text-neutral-300">{selectedDataset.provider}</span> &bull; {selectedDataset.license}
              </div>
              <button
                onClick={() => setSelectedDataset(null)}
                className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PUBLISH DATASET */}
      {/* ========================================================================= */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#0e0e0e] border border-neutral-700 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ffbf23] text-black flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Publish New Dataset</h3>
                  <p className="text-xs text-neutral-400">List an enterprise feed on klstrAIDataHub</p>
                </div>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Dataset Title</label>
                <input
                  type="text"
                  required
                  value={publishForm.title}
                  onChange={e => setPublishForm({ ...publishForm, title: e.target.value })}
                  placeholder="e.g. European Aviation Fleet Telemetry"
                  className="w-full bg-[#161616] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffbf23]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Category</label>
                  <select
                    value={publishForm.category}
                    onChange={e => setPublishForm({ ...publishForm, category: e.target.value as any })}
                    className="w-full bg-[#161616] border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffbf23]"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Frequency</label>
                  <select
                    value={publishForm.frequency}
                    onChange={e => setPublishForm({ ...publishForm, frequency: e.target.value as any })}
                    className="w-full bg-[#161616] border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffbf23]"
                  >
                    {frequencies.filter(f => f !== 'All').map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={publishForm.description}
                  onChange={e => setPublishForm({ ...publishForm, description: e.target.value })}
                  placeholder="Describe your telemetry feed, schema coverage, and sample parameters..."
                  className="w-full bg-[#161616] border border-neutral-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ffbf23]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={publishForm.tags}
                  onChange={e => setPublishForm({ ...publishForm, tags: e.target.value })}
                  placeholder="Aviation, Sensors, GPS, Fleet"
                  className="w-full bg-[#161616] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffbf23]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#ffbf23] hover:bg-[#f0b018] text-black font-bold px-6 py-2.5 rounded-xl text-xs transition active:scale-95 shadow"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
