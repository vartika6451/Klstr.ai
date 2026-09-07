import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Database,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  DollarSign,
  ArrowRight,
  Globe2,
  CheckCircle2,
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
      icon: <Database className="w-7 h-7 text-[#ffbf23]" />,
      title: 'Public Records',
      description:
        'Comprehensive multi-domain public data repositories pre-cleaned, normalized, and optimized for instant enterprise ingestion.',
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-[#ffbf23]" />,
      title: 'Sensor Data',
      description:
        'High-frequency real-time IoT feeds, telematics, geospatial mapping, and automated device telemetry streams.',
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#ffbf23]" />,
      title: 'Secure Exchange',
      description:
        'Hardware-backed cleanrooms and cryptographically secured transactions preventing unauthorized leaks or reverse engineering.',
    },
    {
      icon: <DollarSign className="w-7 h-7 text-[#ffbf23]" />,
      title: 'Flexible Pricing',
      description:
        'Pay-per-query, volume subscription tiers, and customized enterprise licensing models to fit every organizational budget.',
    },
    {
      icon: <Globe2 className="w-7 h-7 text-[#ffbf23]" />,
      title: 'Market Data',
      description:
        'Real-time financial tickers, commodities, order book snapshots, currency pairs, and macroeconomic indicators.',
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-[#ffbf23]" />,
      title: 'Quality Controls',
      description:
        'Automated schema validation, statistical outlier detection, drift tracking, and verifiable data lineage audits.',
    },
  ];

  const benefits = [
    {
      title: 'Innovation and Growth',
      description:
        'Supercharge machine learning models, SLMs, and predictive applications with verified, domain-calibrated external data.',
    },
    {
      title: 'Accelerated Decision Making',
      description:
        'Reduce data procurement cycles from months of negotiation to instant API-driven data delivery and integration.',
    },
    {
      title: 'Enhanced Collaboration',
      description:
        'Connect internal data scientists, engineers, and external data providers in unified, governed workspaces.',
    },
    {
      title: 'Cost Savings',
      description:
        'Eliminate duplicate licensing across departments and reduce internal data cleaning overhead by over 70%.',
    },
  ];

  const useCases = [
    {
      iconUrl: '/images/datahub/ai.png',
      title: 'AI Training',
      description:
        'High-fidelity domain-specific training data to train, fine-tune, and evaluate Large and Small Language Models.',
    },
    {
      iconUrl: '/images/datahub/market-research.png',
      title: 'Market Research',
      description:
        'Granular consumer sentiment, competitive pricing trends, and demographic behavior forecasting.',
    },
    {
      iconUrl: '/images/datahub/bi.png',
      title: 'Business Intelligence',
      description:
        'Deep operational enrichment to unlock unseen revenue drivers and supply chain efficiencies.',
    },
    {
      iconUrl: '/images/datahub/segmentation.png',
      title: 'Customer Segmentation',
      description:
        'Micro-behavioral clustering and cohort dynamics for hyper-personalized customer engagement.',
    },
    {
      iconUrl: '/images/datahub/descriptive.png',
      title: 'Descriptive Analytics',
      description:
        'Real-time operational dashboards summarizing historical trends and industry benchmark metrics.',
    },
    {
      iconUrl: '/images/datahub/diagnostic.png',
      title: 'Diagnostic Analytics',
      description:
        'Automated root-cause detection engines pinpointing operational anomalies and revenue margin shifts.',
    },
    {
      iconUrl: '/images/datahub/predictive.png',
      title: 'Predictive Analytics',
      description:
        'Machine learning models forecasting customer churn, demand surges, credit risks, and asset wear.',
    },
    {
      iconUrl: '/images/datahub/prescriptive.png',
      title: 'Prescriptive Analytics',
      description:
        'Automated decision recommendation engines delivering optimal next-best-action steps for teams.',
    },
  ];

  const frequencies = [
    {
      iconUrl: '/images/datahub/daily.png',
      title: 'Daily',
      description: 'Updated every 24 hours for daily market close, inventory balances, and reporting.',
    },
    {
      iconUrl: '/images/datahub/monthly.png',
      title: 'Monthly',
      description: 'Aggregated monthly cohorts, billing summaries, and regulatory compliance reports.',
    },
    {
      iconUrl: '/images/datahub/quarterly.png',
      title: 'Quarterly',
      description: 'Macroeconomic reviews, SEC filings, earnings benchmarks, and industry outlooks.',
    },
    {
      iconUrl: '/images/datahub/semi-annual.png',
      title: 'Semi Annually',
      description: 'Bi-annual economic assessments, policy audits, and demographic census updates.',
    },
    {
      iconUrl: '/images/datahub/annually.png',
      title: 'Annually',
      description: 'Comprehensive annual benchmark indexes, fiscal reviews, and longitudinal studies.',
    },
    {
      iconUrl: '/images/datahub/on-demand.png',
      title: 'On Demand',
      description: 'Instant real-time streaming, automated webhook pushes, and ad-hoc query execution.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDataHub) }}
      />

      {/* SECTION 1: HERO */}
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3.5 py-1 rounded-full mb-5">
              klstrAIDataHub
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.15] mb-6">
              Unlock the power of data with the world&apos;s most comprehensive data marketplace
            </h1>
            <p className="text-gray-800 text-lg sm:text-xl font-normal leading-relaxed mb-4 max-w-2xl">
              <strong>klstrAIDataHub</strong> is a cutting-edge data marketplace that connects data buyers and sellers from various industries, providing a secure, efficient, and scalable platform for data exchange.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
              Our mission is to democratize access to high-quality data, enabling businesses to make informed decisions, drive innovation, and gain a competitive edge.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-md font-bold text-base transition duration-150 inline-block shadow-sm active:scale-95"
              >
                Book a Demo
              </Link>
              <Link
                href="#use-cases"
                className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3.5 rounded-md font-bold text-base transition duration-150 inline-flex items-center gap-2"
              >
                Explore Use Cases <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-square">
              <Image
                src="/images/datahub.png"
                alt="klstrAIDataHub platform and data analytics"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURES (BLACK WITH YELLOW ACCENTS) */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-12 text-black block fill-current"
          aria-hidden="true"
        >
          <polygon points="0,45 1200,10 1200,45" />
        </svg>
      </div>

      <section id="features" className="bg-black text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ffbf23] block mb-2">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Features
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Enterprise-grade data infrastructure engineered for security, high-throughput delivery, and verified accuracy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-[#111] p-7 rounded-2xl border border-gray-800 hover:border-gray-700 hover:bg-[#161616] transition-all duration-200 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-black border border-gray-800 flex items-center justify-center mb-5 flex-shrink-0">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BENEFITS (SIGNATURE YELLOW BACKGROUND) */}
      <div className="w-full overflow-hidden leading-none -mb-1 bg-black">
        <svg
          viewBox="0 0 1200 50"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 text-[#ffbf23] block fill-current"
          aria-hidden="true"
        >
          <polygon points="0,50 1200,0 1200,50" />
        </svg>
      </div>

      <section id="benefits" className="bg-[#ffbf23] text-black pt-8 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-black/75 block mb-2">
              Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
              Benefits
            </h2>
            <p className="text-black/85 text-base sm:text-lg leading-relaxed font-normal">
              How klstrAIDataHub transforms external data discovery, procurement, and governance for modern organizations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl shadow-sm border border-black/10 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#ffbf23]/30 text-black flex items-center justify-center mb-4 font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-lg text-black mb-3 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {b.description}
                  </p>
                </div>
                <div className="pt-6 flex items-center gap-2 text-xs font-semibold text-black">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Verified Impact
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: USE CASES (CLEAN WHITE WITH AUTHENTIC ICONS) */}
      <section id="use-cases" className="bg-white py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3.5 py-1 rounded-full mb-3 inline-block">
            Applications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            Use Cases
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
            Powering advanced artificial intelligence, machine learning, and operational decision systems across enterprises.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((uc, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all duration-200 flex flex-col group"
            >
              <div className="relative w-12 h-12 mb-5 flex-shrink-0">
                <Image
                  src={uc.iconUrl}
                  alt={uc.title}
                  width={48}
                  height={48}
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-lg text-black mb-2 tracking-tight">
                {uc.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: DATA FREQUENCY (BLACK BACKGROUND WITH FREQUENCY ICONS) */}
      <section id="frequency" className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ffbf23] block mb-2">
              Ingestion Cadence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffbf23] mb-4 tracking-tight">
              Data Frequency
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Flexible delivery schedules designed to match the exact ingestion tempo of your production pipelines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frequencies.map((freq, idx) => (
              <div
                key={idx}
                className="bg-[#111] p-6 rounded-2xl border border-gray-800 hover:border-[#ffbf23]/50 transition-all duration-200 flex items-start gap-4"
              >
                <div className="relative w-12 h-12 rounded-xl bg-black border border-gray-800 flex items-center justify-center flex-shrink-0 p-2">
                  <Image
                    src={freq.iconUrl}
                    alt={freq.title}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1.5 tracking-tight">
                    {freq.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {freq.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: GROW YOUR VISION (WHITE CTA) */}
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
