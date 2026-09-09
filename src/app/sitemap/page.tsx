import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cpu,
  Bot,
  Database,
  MessageSquare,
  BarChart3,
  Mail,
  Home,
  FileCode2,
  Compass,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Layers,
  Sparkles,
  Radio,
  Clock,
  TrendingUp,
  Activity,
  Stethoscope,
  ShoppingBag,
} from 'lucide-react';
import { INITIAL_DATASETS } from '@/data/datahub-datasets';

export const metadata: Metadata = {
  title: 'Sitemap | Site Directory & Architecture Overview',
  description:
    'Explore the complete structure of klstr.ai. Discover our AgenticOS multi-tier router, Enterprise GenAI private RAG, AIDataHub marketplace, interactive demos, and developer resources.',
  alternates: {
    canonical: '/sitemap',
  },
  openGraph: {
    title: 'Sitemap | klstr.ai Directory & Architecture',
    description:
      'Complete guide to all platforms, live tools, datasets, and resources across klstr.ai.',
    url: 'https://www.klstr.ai/sitemap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitemap | klstr.ai Directory & Architecture',
    description:
      'Complete guide to all platforms, live tools, datasets, and resources across klstr.ai.',
  },
};

const jsonLdSitemap = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.klstr.ai/sitemap#webpage',
      url: 'https://www.klstr.ai/sitemap',
      name: 'klstr.ai Sitemap & Directory',
      description:
        'Complete visual directory of platforms, interactive tools, datasets, and resources across klstr.ai.',
      isPartOf: {
        '@id': 'https://www.klstr.ai/#website',
      },
      about: {
        '@id': 'https://www.klstr.ai/#organization',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.klstr.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sitemap',
          item: 'https://www.klstr.ai/sitemap',
        },
      ],
    },
  ],
};

const datasetIcons: Record<string, any> = {
  'Financial Markets': TrendingUp,
  'Supply Chain': Compass,
  Healthcare: Stethoscope,
  'Energy & Grid': Activity,
  'E-Commerce & Retail': ShoppingBag,
  'Industrial IoT': Radio,
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#ffbf23] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSitemap) }}
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#121217] via-[#09090d] to-[#070709] py-16 sm:py-24">
        {/* Glow accent */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ffbf23]/10 rounded-full blur-[140px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ffbf23]/15 text-[#ffbf23] border border-[#ffbf23]/30 tracking-wide uppercase">
              <Compass className="w-3.5 h-3.5" />
              Site Directory & Architecture
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            klstr.ai <span className="text-[#ffbf23]">Sitemap</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Navigate through our vertical AI systems, zero-setup Enterprise RAG,
            telemetry dashboards, cleanroom dataset catalogs, and developer crawler feeds.
          </p>

          {/* Quick jump pills */}
          <div className="mt-8 flex flex-wrap gap-2 text-xs sm:text-sm">
            <a
              href="#core-platforms"
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors"
            >
              Core Platforms
            </a>
            <a
              href="#interactive-demos"
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors"
            >
              Interactive Demos & Telemetry
            </a>
            <a
              href="#dataset-catalog"
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors"
            >
              DataHub Catalog ({INITIAL_DATASETS.length} Datasets)
            </a>
            <a
              href="#company"
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors"
            >
              Company & Contact
            </a>
            <a
              href="#crawler-resources"
              className="px-3.5 py-1.5 rounded-lg bg-[#ffbf23]/10 hover:bg-[#ffbf23]/20 border border-[#ffbf23]/30 text-[#ffbf23] transition-colors"
            >
              XML Feeds & Crawlers
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Section 1: Core AI Platforms */}
        <section id="core-platforms" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#ffbf23]/10 text-[#ffbf23]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Core AI Platforms
              </h2>
              <p className="text-sm text-neutral-400">
                Enterprise infrastructure for autonomous routing, private knowledge bases, and cleanrooms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: AgenticOS */}
            <Link
              href="/klstr-agentic-os"
              className="group relative rounded-2xl border border-white/10 bg-[#0d0d12] p-6 hover:border-[#ffbf23]/50 hover:bg-[#121218] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    Router Engine
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ffbf23] transition-colors flex items-center gap-2">
                  klstrAgenticOS
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  Autonomous multi-tier model router orchestrating Tiny LMs, SLMs, frontier LLMs, and vector stores with sub-100ms latency routing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500">
                <span>Route: /klstr-agentic-os</span>
                <span className="text-neutral-400 font-mono">Priority: 0.9</span>
              </div>
            </Link>

            {/* Card 2: Enterprise GenAI */}
            <Link
              href="/klstr-enterprise-gen-ai"
              className="group relative rounded-2xl border border-white/10 bg-[#0d0d12] p-6 hover:border-[#ffbf23]/50 hover:bg-[#121218] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Bot className="w-6 h-6" />
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Zero-Setup RAG
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ffbf23] transition-colors flex items-center gap-2">
                  klstrEnterpriseGenAI
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  Private enterprise intelligence system with zero-setup document indexing, chunking, tenant isolation, and audit trails.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500">
                <span>Route: /klstr-enterprise-gen-ai</span>
                <span className="text-neutral-400 font-mono">Priority: 0.9</span>
              </div>
            </Link>

            {/* Card 3: AIDataHub */}
            <Link
              href="/klstr-ai-data-market"
              className="group relative rounded-2xl border border-white/10 bg-[#0d0d12] p-6 hover:border-[#ffbf23]/50 hover:bg-[#121218] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#ffbf23] border border-amber-500/20">
                    <Database className="w-6 h-6" />
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Data Cleanroom
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ffbf23] transition-colors flex items-center gap-2">
                  klstrAIDataHub
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  Enterprise data marketplace facilitating cleanroom exchanges, verified IoT telematics, financial order depth, and regulatory pipelines.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500">
                <span>Route: /klstr-ai-data-market</span>
                <span className="text-neutral-400 font-mono">Priority: 0.9</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Section 2: Interactive Demos & Telemetry */}
        <section id="interactive-demos" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#ffbf23]/10 text-[#ffbf23]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Interactive Demos & Live Telemetry
              </h2>
              <p className="text-sm text-neutral-400">
                Directly accessible test environments and runtime observability consoles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fullscreen Chat */}
            <Link
              href="/klstr-enterprise-gen-ai/chat"
              className="group rounded-2xl border border-white/10 bg-[#0d0d12] p-6 hover:border-[#ffbf23]/50 hover:bg-[#121218] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Interactive Console
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#ffbf23] transition-colors flex items-center gap-2">
                  Full-Screen Knowledge Base Chat
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  Dedicated conversational interface with stream parsing, citation chips, and zero-leakage enterprise verification.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>/klstr-enterprise-gen-ai/chat</span>
                <span className="text-emerald-400">Live Streaming</span>
              </div>
            </Link>

            {/* Usage Telemetry */}
            <Link
              href="/usage"
              className="group rounded-2xl border border-white/10 bg-[#0d0d12] p-6 hover:border-[#ffbf23]/50 hover:bg-[#121218] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    Observability
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#ffbf23] transition-colors flex items-center gap-2">
                  AgenticOS Routing Telemetry & Cost Analytics
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  Live dashboard monitoring query distribution, latency by model tier (TLM vs SLM vs Vector), and corporate cost savings.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>/usage</span>
                <span className="text-cyan-400">Real-time Metrics</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Section 3: DataHub Catalog Directory */}
        <section id="dataset-catalog" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#ffbf23]/10 text-[#ffbf23]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  DataHub Cleanroom Catalog
                </h2>
                <p className="text-sm text-neutral-400">
                  Standardized commercial datasets indexed for automated agent ingestion and cleanroom training.
                </p>
              </div>
            </div>
            <Link
              href="/klstr-ai-data-market"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffbf23] hover:underline"
            >
              Open DataHub Explorer <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INITIAL_DATASETS.map((dataset) => {
              const IconComponent = datasetIcons[dataset.category] || Database;
              return (
                <div
                  key={dataset.id}
                  className="rounded-xl border border-white/10 bg-[#0d0d12] p-5 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10">
                        <IconComponent className="w-3 h-3 text-[#ffbf23]" />
                        {dataset.category}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {dataset.format}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white leading-snug line-clamp-1">
                      {dataset.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {dataset.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>Quality: {dataset.qualityScore}%</span>
                    <span className="text-neutral-400 font-mono">{dataset.frequency}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Company & Engagement */}
        <section id="company" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#ffbf23]/10 text-[#ffbf23]">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Company & Engagement
              </h2>
              <p className="text-sm text-neutral-400">
                General information, corporate booking, and communication channels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-[#0d0d12] p-5 hover:border-[#ffbf23]/40 hover:bg-[#121218] transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Home className="w-5 h-5 text-[#ffbf23]" />
                <h3 className="font-semibold text-white">Home / About Us</h3>
              </div>
              <p className="text-xs text-neutral-400">
                Overview of klstr.ai, leadership vision, value proposition, and vertical AI solutions.
              </p>
              <div className="mt-3 text-[11px] font-mono text-neutral-500">Route: /</div>
            </Link>

            <Link
              href="/contact-us"
              className="rounded-xl border border-white/10 bg-[#0d0d12] p-5 hover:border-[#ffbf23]/40 hover:bg-[#121218] transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-[#ffbf23]" />
                <h3 className="font-semibold text-white">Contact Us & Book Demo</h3>
              </div>
              <p className="text-xs text-neutral-400">
                Schedule a consultation, request private cleanroom access, or partner with klstr.ai.
              </p>
              <div className="mt-3 text-[11px] font-mono text-neutral-500">Route: /contact-us</div>
            </Link>

            <Link
              href="/contact-us"
              className="rounded-xl border border-white/10 bg-[#0d0d12] p-5 hover:border-[#ffbf23]/40 hover:bg-[#121218] transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#ffbf23]" />
                <h3 className="font-semibold text-white">Careers & Opportunities</h3>
              </div>
              <p className="text-xs text-neutral-400">
                Join our research and engineering teams building autonomous AI routers and private RAG.
              </p>
              <div className="mt-3 text-[11px] font-mono text-neutral-500">Route: /contact-us</div>
            </Link>
          </div>
        </section>

        {/* Section 5: Machine-Readable Crawler Feeds */}
        <section
          id="crawler-resources"
          className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0d0d14] to-[#14141d] p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider mb-3">
                <FileCode2 className="w-3.5 h-3.5" />
                Search Crawler Endpoints
              </span>
              <h3 className="text-xl font-bold text-white">
                Machine-Readable Sitemap & Robots Directives
              </h3>
              <p className="mt-2 text-sm text-neutral-400 max-w-xl">
                Standardized XML protocol feeds consumed by search engines (Googlebot, Bingbot),
                indexers, and autonomous research agents.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ffbf23] hover:bg-[#e0a71f] text-black font-semibold text-sm transition-colors shadow-sm"
              >
                View XML Sitemap
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors border border-white/10"
              >
                View robots.txt
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
