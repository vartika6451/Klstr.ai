import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Cpu,
  Zap,
  Database,
  Network,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Cloud,
  Sliders,
  RefreshCw,
  Building2,
  Briefcase,
  Layers3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AgenticOS | Enterprise Vertical AI Infrastructure',
  description:
    'Plug & play orchestration of static and dynamic knowledge for your industry with power of Tiny & Small Language Models (SLMs). Enterprise vertical AI infrastructure.',
  keywords: [
    'AgenticOS',
    'Enterprise AI',
    'SLMs',
    'Small Language Models',
    'Tiny Language Models',
    'AI Orchestrator',
    'Vertical AI Infrastructure',
    'Vector DB',
  ],
  alternates: {
    canonical: '/klstr-agentic-os',
  },
  openGraph: {
    title: 'AgenticOS | Enterprise Vertical AI Infrastructure - klstr.ai',
    description:
      'Plug & play orchestration of static and dynamic knowledge for your industry with power of Tiny & Small Language Models.',
    url: 'https://www.klstr.ai/klstr-agentic-os',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgenticOS | Enterprise Vertical AI Infrastructure',
    description:
      'Plug & play orchestration of static and dynamic knowledge for your industry with power of Tiny & Small Language Models.',
  },
};

const jsonLdAgenticOS = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "klstrAgenticOS",
      "operatingSystem": "Cloud, Private Cloud, On-Premise",
      "applicationCategory": "BusinessApplication",
      "description":
        "Enterprise AI for Vertical & Domain-Specific Infrastructure. Plug & play orchestration of static and dynamic knowledge.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
      },
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
          "name": "AgenticOS",
          "item": "https://www.klstr.ai/klstr-agentic-os",
        },
      ],
    },
  ],
};

export default function AgenticOSPage() {
  const businessTypes = ['Enterprises', 'Mid Size Enterprises', 'Small Enterprises', 'Startups'];
  const industries = [
    'Automotive',
    'BFSI',
    'Compliance',
    'Energy',
    'Food & FMCG',
    'Healthcare',
    'Manufacturing',
    'Media & Entertainment',
    'Oil & Gas',
    'Pharma',
    'Telecom',
    'More',
  ];
  const domains = [
    'Administration',
    'Audit',
    'Customer Care',
    'Finance',
    'Human Resources',
    'IT Helpdesk',
    'Legal',
    'Marketing',
    'R&D',
    'Sales',
    'Supply Chain',
    'More',
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION */}
      {/* ========================================================================= */}
      <section className="bg-white pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAgenticOS) }}
      />

      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3 py-1 rounded-full mb-4">
              klstrAgenticOS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.15] mb-6">
              Enterprise AI for Vertical &amp; Domain-Specific Infrastructure
            </h1>
            <p className="text-gray-800 text-base sm:text-lg lg:text-xl font-normal mb-8 max-w-2xl leading-relaxed">
              Plug &amp; play orchestration of static and dynamic knowledge for your industry with power of Tiny &amp; Small Language Models
            </p>

            <div className="mb-12">
              <Link
                href="/contact-us"
                className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-md font-bold text-base transition-all duration-150 inline-block shadow-sm active:scale-95"
              >
                Book a Demo
              </Link>
            </div>

            {/* 6 Feature Badges (3 Columns x 2 Rows) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 max-w-2xl pt-2">
              {/* Badge 1 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    unoptimized
                    src="/images/icon_1.svg"
                    alt="Experienced Team"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Experienced<br />Team
                </span>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    unoptimized
                    src="/images/icon_2.svg"
                    alt="Flexibility & Scalability"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Flexibility &amp;<br />Scalability
                </span>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#3940B2]" />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Secured<br />Architecture
                </span>
              </div>

              {/* Badge 4 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    unoptimized
                    src="/images/icon_4.svg"
                    alt="Speed"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Speed &amp;<br />Efficiency
                </span>
              </div>

              {/* Badge 5 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Trusted &amp;<br />Sovereign
                </span>
              </div>

              {/* Badge 6 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    unoptimized
                    src="/images/icon_6.svg"
                    alt="Proven Results"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Proven<br />Results
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-square">
              <Image
                src="/images/agentic-os.png"
                alt="Agentic OS AI Orchestration"
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
      {/* SECTION 2: THE PROBLEM (BLACK SECTION) */}
      {/* ========================================================================= */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-12 text-black block fill-current"
        >
          <polygon points="0,0 1200,28 1200,45 0,45" />
        </svg>
      </div>

      <section className="bg-black text-white pt-10 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ffbf23] block mb-2">
              Full-Stack AI Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#ffbf23] mb-5 tracking-tight leading-tight">
              Generic AI isn’t enough. Your enterprise knowledge is complex, domain-specific, and must stay trusted.
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal mb-8">
              Teams waste hours searching policies, databases, manuals. Generic LLMs hallucinate or can’t plug into your real data. Vertical AI Infrastructure fixes this with safe, orchestrated, agentic workflows.
            </p>
            <Link
              href="/contact-us"
              className="bg-[#ffbf23] hover:bg-[#f0b018] text-black px-7 py-3 rounded-md font-bold text-base transition-all duration-150 inline-block shadow active:scale-95"
            >
              Book a Demo
            </Link>
          </div>

          {/* Architecture Pillars: How It Works */}
          <div className="pt-10 border-t border-neutral-800">
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                How it works
              </h2>
              <p className="text-[#ffbf23] text-lg font-medium">
                Static + Dynamic Knowledge. Perfectly Orchestrated.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-5 font-bold">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Tiny Language Models
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    For trusted static knowledge, offline edge execution, deterministic verification, and lightning-fast compliance checks.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-5 font-bold">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Small Language Models
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    For dynamic content generation, contextual reasoning, and high-throughput vertical domain execution.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-5 font-bold">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Vector DB
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Retrieve relevant chunks with context, semantic embeddings, strict tenant isolation, and low-latency disk vectors.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-5 font-bold">
                    <Network className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Agentic Orchestrator
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Smart query routing across cached facts, SLMs, vector context, and external fallback providers based on confidence thresholds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: WHO IS IT FOR? */}
      {/* ========================================================================= */}
      <section className="bg-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3 py-1 rounded-full mb-3 inline-block">
            Target Audience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            Who is it for?
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Purpose-built infrastructure for diverse organizational tiers, industry sectors, and department workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1: Any Business */}
          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-[#3940B2]" />
              <h3 className="text-xl font-bold text-black tracking-tight">
                Any Business
              </h3>
            </div>
            <ul className="space-y-3">
              {businessTypes.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-gray-800 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffbf23]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Any Industry */}
          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-[#3940B2]" />
              <h3 className="text-xl font-bold text-black tracking-tight">
                Any Industry
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {industries.map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffbf23]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Any Domain */}
          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <Layers3 className="w-6 h-6 text-[#3940B2]" />
              <h3 className="text-xl font-bold text-black tracking-tight">
                Any Domain
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {domains.map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffbf23]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: BENEFITS */}
      {/* ========================================================================= */}
      <section className="bg-neutral-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#ffbf23] mb-4">
              Benefits
            </h2>
            <p className="text-neutral-300 text-lg">
              Enterprise AI that delivers tangible autonomy, predictability, and governance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/60 p-6 rounded-2xl border border-neutral-800">
              <div className="w-10 h-10 rounded-lg bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Agentic AI Orchestration
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Agentic AI orchestration layer purpose-engineered for multi-turn real enterprise workflows.
              </p>
            </div>

            <div className="bg-black/60 p-6 rounded-2xl border border-neutral-800">
              <div className="w-10 h-10 rounded-lg bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Cloud or On-Prem
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Deploy on cloud or on-prem — your choice, ensuring zero data leakage and total sovereignty.
              </p>
            </div>

            <div className="bg-black/60 p-6 rounded-2xl border border-neutral-800">
              <div className="w-10 h-10 rounded-lg bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Domain-Specific &amp; Easy
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Domain-specific, easy to train, and easy to manage with zero heavy machine learning overhead.
              </p>
            </div>

            <div className="bg-black/60 p-6 rounded-2xl border border-neutral-800">
              <div className="w-10 h-10 rounded-lg bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Memory Management
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Full lifecycle memory control to forget obsolete knowledge, update vectors, and retrain instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: WHAT OUR CLIENTS SAY (FULL YELLOW BACKGROUND) */}
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
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-black mb-12 tracking-tight">
            What our clients say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col justify-between">
              <p className="text-black/90 text-sm sm:text-[15px] leading-relaxed font-normal">
                &ldquo;klstr&apos;s enterprise ai platform has fundamentally changed how we deliver instant academic support. Our students and faculty now get precise answers on curriculum, deadlines, and policies — all driven by vertical GPT agents trained on our unique knowledge base.&rdquo;
              </p>
              <div className="mt-8 pt-2">
                <p className="text-black font-bold text-sm sm:text-[15px]">
                  CEO of an EdTech company in the USA
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <p className="text-black/90 text-sm sm:text-[15px] leading-relaxed font-normal">
                &ldquo;In digital lending, precision and compliance are non-negotiable. Klstr.ai&apos;s multi-SLM stack gave us domain-specific AI agents that securely connect with our CRM and underwriting engines. Our customer service wait times dropped by 35%.&rdquo;
              </p>
              <div className="mt-8 pt-2">
                <p className="text-black font-bold text-sm sm:text-[15px]">
                  VP of a leading digital lending company in the USA
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <p className="text-black/90 text-sm sm:text-[15px] leading-relaxed font-normal">
                &ldquo;For our multi-vendor marketplace, we needed AI that understands product categories, seller policies, and buyer interactions — all in local context. Klstr.ai&apos;s plug-and-play Agentic AI made it easy to deploy specialized LMs for each category.&rdquo;
              </p>
              <div className="mt-8 pt-2">
                <p className="text-black font-bold text-sm sm:text-[15px]">
                  Product Owner of a marketplace in India
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <p className="text-black/90 text-sm sm:text-[15px] leading-relaxed font-normal">
                &ldquo;We used Klstr.ai to build vertical AI agents for shipment tracking, customs queries, and fleet ops. Our operations desk now handles thousands of static and live questions automatically — reducing tickets by 50%.&rdquo;
              </p>
              <div className="mt-8 pt-2">
                <p className="text-black font-bold text-sm sm:text-[15px]">
                  Operations head of a Logistic Company in the USA
                </p>
              </div>
            </div>
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
            It&apos;s time to go to market. Contact us to get started today.
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
