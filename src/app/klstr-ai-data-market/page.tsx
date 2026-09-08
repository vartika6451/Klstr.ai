import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import DataHubExplorer from '@/components/DataHubExplorer';
import {
  Database,
  Radio,
  Lock,
  Tag,
  LineChart,
  CheckCheck,
  Sparkles,
  TrendingUp,
  Users2,
  PiggyBank,
  Brain,
  Search,
  PieChart,
  Target,
  BarChart2,
  Stethoscope,
  Activity,
  Compass,
  Calendar,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'DataHub | Enterprise AI Data Marketplace',
  description:
    "Unlock the power of data with the world's most comprehensive data marketplace. Connecting data buyers and sellers across industries with verified datasets, IoT feeds, and cleanroom exchange.",
  keywords: [
    'DataHub',
    'AI Data Marketplace',
    'Enterprise Data Exchange',
    'AI Training Data',
    'Public Records Data',
    'Sensor Data',
    'IoT Streams',
    'Market Data',
    'Predictive Analytics',
    'Data Monetization',
  ],
  alternates: {
    canonical: '/klstr-ai-data-market',
  },
  openGraph: {
    title: 'DataHub | Enterprise AI Data Marketplace - klstr.ai',
    description:
      "Unlock the power of data with the world's most comprehensive data marketplace. Connecting data buyers and sellers across industries.",
    url: 'https://www.klstr.ai/klstr-ai-data-market',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataHub | Enterprise AI Data Marketplace',
    description:
      "Unlock the power of data with the world's most comprehensive data marketplace. Connecting data buyers and sellers across industries.",
  },
};

const jsonLdDataHub = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "klstrAIDataHub",
      "serviceType": "Data Marketplace & Exchange",
      "description":
        "A cutting-edge data marketplace that connects data buyers and sellers from various industries, providing a secure, efficient, and scalable platform for data exchange.",
      "provider": {
        "@type": "Organization",
        "name": "klstr.ai",
        "url": "https://www.klstr.ai",
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.klstr.ai",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "DataHub",
          "item": "https://www.klstr.ai/klstr-ai-data-market",
        },
      ],
    },
  ],
};

export default function DataMarketPage() {
  const features = [
    {
      title: 'Public Records',
      description: 'Standardized and verified multi-jurisdiction public registries, legal filings, and macro telemetry.',
      icon: Database,
    },
    {
      title: 'Sensor Data',
      description: 'Continuous streaming feeds from industrial IoT nodes, fleet telematics, and environmental sensors.',
      icon: Radio,
    },
    {
      title: 'Secure Exchange',
      description: 'Cryptographic enclave access protecting intellectual property with automated zero-knowledge proofs.',
      icon: Lock,
    },
    {
      title: 'Flexible Pricing',
      description: 'On-demand per-query micropayments, bulk tier packages, or recurring volume subscriptions.',
      icon: Tag,
    },
    {
      title: 'Market Data',
      description: 'High-frequency order books, commodity pricing, supply-chain indices, and sentiment feeds.',
      icon: LineChart,
    },
    {
      title: 'Quality Controls',
      description: 'Automated drift detection, completeness benchmarking, schema enforcement, and noise reduction.',
      icon: CheckCheck,
    },
  ];

  const benefits = [
    {
      title: 'Innovation and Growth',
      description: 'Accelerate your product roadmap by leveraging enriched foundational datasets without the multi-month acquisition cycle.',
      icon: Sparkles,
    },
    {
      title: 'Accelerated Decision Making',
      description: 'Empower executive and trading teams with verified market signals and real-time operational feeds.',
      icon: TrendingUp,
    },
    {
      title: 'Enhanced Collaboration',
      description: 'Connect data scientists, business analysts, and external partners in secure data cleanrooms.',
      icon: Users2,
    },
    {
      title: 'Cost Savings',
      description: 'Dramatically reduce data engineering, cleaning, and reconciliation overhead with pre-formatted datasets.',
      icon: PiggyBank,
    },
  ];

  const useCases = [
    {
      title: 'AI Training',
      description: 'High-fidelity training data for SLMs, LLMs, and computer vision models.',
      icon: Brain,
    },
    {
      title: 'Market Research',
      description: 'Consumer trends, pricing telemetry, and competitor movements.',
      icon: Search,
    },
    {
      title: 'Business Intelligence',
      description: 'Enrich internal dashboards with macro industry metrics.',
      icon: PieChart,
    },
    {
      title: 'Customer Segmentation',
      description: 'Behavioral profiling and demographic clustering.',
      icon: Target,
    },
    {
      title: 'Descriptive Analytics',
      description: 'Comprehensive historical event logs and operational records.',
      icon: BarChart2,
    },
    {
      title: 'Diagnostic Analytics',
      description: 'Root cause exploration and anomaly correlation datasets.',
      icon: Stethoscope,
    },
    {
      title: 'Predictive Analytics',
      description: 'Feature-engineered historical data for time-series forecasting.',
      icon: Activity,
    },
    {
      title: 'Prescriptive Analytics',
      description: 'Simulation scenario matrices and automated decision trees.',
      icon: Compass,
    },
  ];

  const frequencies = [
    'Daily',
    'Monthly',
    'Semi Annually',
    'Annually',
    'Quarterly',
    'On Demand',
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDataHub) }}
      />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO */}
      {/* ========================================================================= */}
      <section className="bg-white pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3 py-1 rounded-full mb-4">
              klstrAIDataHub
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.15] mb-6">
              klstrAIDataHub
            </h1>
            <p className="text-gray-800 text-base sm:text-lg lg:text-xl font-normal mb-4 max-w-2xl leading-relaxed">
              klstrAIDataHub is a cutting-edge data marketplace that connects data buyers and sellers from various industries, providing a secure, efficient, and scalable platform for data exchange.
            </p>
            <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-2xl leading-relaxed font-normal">
              Our mission is to democratize access to high-quality data, enabling businesses to make informed decisions, drive innovation, and gain a competitive edge.
            </p>
            <p className="text-black font-semibold text-base sm:text-lg mb-8">
              Unlock the power of data with the world&apos;s most comprehensive data marketplace
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#marketplace"
                className="bg-[#ffbf23] hover:bg-[#f0b018] text-black px-7 py-3.5 rounded-md font-bold text-base transition-all duration-150 inline-flex items-center gap-2 shadow-sm active:scale-95"
              >
                <span>Explore Marketplace</span>
                <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
              </a>
              <a
                href="#query-sandbox"
                className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 px-6 py-3.5 rounded-md font-bold text-base transition-all duration-150 inline-flex items-center gap-2 shadow-sm active:scale-95"
              >
                <span>SQL Sandbox</span>
              </a>
              <Link
                href="/contact-us"
                className="bg-black hover:bg-neutral-800 text-white px-7 py-3.5 rounded-md font-bold text-base transition-all duration-150 inline-block shadow-sm active:scale-95"
              >
                Book a Demo
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-square">
              <Image
                src="/images/datahub.png"
                alt="klstrAIDataHub"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION DIVIDER: WHITE HERO INTO DARK DATAHUB */}
      {/* ========================================================================= */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-12 text-[#0a0a0a] block fill-current"
        >
          <polygon points="0,0 1200,28 1200,45 0,45" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DATAHUB MARKETPLACE EXPLORER */}
      {/* ========================================================================= */}
      <DataHubExplorer />

      {/* ========================================================================= */}
      {/* SECTION 2: FEATURES (BLACK SECTION) */}
      {/* ========================================================================= */}
      <section className="bg-black text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ffbf23] block mb-2">
              Marketplace Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white mb-4 tracking-tight">
              Features
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed font-normal">
              State-of-the-art cataloging, validation, and exchange mechanisms built for enterprise grade transactions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-[#111] p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: BENEFITS (WHITE SECTION) */}
      {/* ========================================================================= */}
      <section className="bg-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3 py-1 rounded-full mb-3 inline-block">
            Value Proposition
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            Benefits
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Direct business impact through democratized high-quality data access.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-black text-[#ffbf23] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: USE CASES (YELLOW SECTION) */}
      {/* ========================================================================= */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        <svg
          viewBox="0 0 1200 50"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 text-[#ffbf23] block fill-current"
        >
          <polygon points="0,40 1200,0 1200,50 0,50" />
        </svg>
      </div>

      <section className="bg-[#ffbf23] text-black pt-6 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-black mb-4 tracking-tight">
              Use Cases
            </h2>
            <p className="text-black/85 text-lg">
              Empowering diverse analytics, artificial intelligence, and strategic operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-black/10 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ffbf23]/20 text-black flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-black mb-2">{uc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{uc.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DATA FREQUENCY (DARK SECTION) */}
      {/* ========================================================================= */}
      <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Data Frequency
            </h2>
            <p className="text-gray-400 text-lg">
              Synchronize at the exact cadence required by your operational workflows and machine learning pipelines.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {frequencies.map((freq) => (
              <div
                key={freq}
                className="bg-[#111] border border-neutral-800 rounded-xl p-5 text-center hover:border-[#ffbf23] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#ffbf23]/20 text-[#ffbf23] flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-white font-bold text-base block">{freq}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: GROW YOUR VISION */}
      {/* ========================================================================= */}
      <section className="bg-white py-20 sm:py-24 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4 tracking-tight">
            Grow Your Vision
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-8 font-normal">
            Connect with us today.
          </p>
          <Link
            href="/contact-us"
            className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-md font-bold text-base transition-all duration-150 inline-block shadow-sm active:scale-95"
          >
            Book a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
