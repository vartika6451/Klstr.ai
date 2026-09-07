import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Database, Network, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

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
  return (
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.15] mb-6">
              Enterprise AI for Vertical &amp; Domain-Specific Infrastructure
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-normal">
              Plug &amp; play orchestration of static and dynamic knowledge for your industry with power of Tiny &amp; Small Language Models.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-md font-bold text-base transition duration-150 inline-block shadow-sm"
              >
                Book a Demo
              </Link>
              <Link
                href="/klstr-enterprise-gen-ai"
                className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3.5 rounded-md font-bold text-base transition duration-150 inline-flex items-center gap-2"
              >
                Explore Enterprise GenAI <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-square">
              <Image
                src="/images/agentic-os.png"
                alt="Agentic OS AI Orchestration"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Banner (Black with Yellow Accents) */}
      <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#ffbf23] mb-4">
              Generic AI isn&apos;t enough.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Your enterprise knowledge is complex, domain-specific, and must stay trusted. Teams waste hours searching policies, databases, and manuals. Generic LLMs hallucinate or can&apos;t plug into your real data. Vertical AI Infrastructure fixes this with safe, orchestrated, agentic workflows.
            </p>
          </div>

          {/* Architecture Pillars */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tiny LMs</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Purpose-trained for trusted static knowledge, instant offline verification, and deterministic accuracy.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Small LMs</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Cost-efficient dynamic reasoning calibrated to your specific regulatory, financial, or tech environment.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Vector DB</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Retrieve relevant enterprise chunks with semantic context, strict tenant isolation, and live indexing.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Agentic Orchestrator</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Intelligent query routing, automated task chaining, and tool calling across multi-agent workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for? (Yellow Section) */}
      <section className="bg-[#ffbf23] text-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Who is Agentic OS for?
          </h2>
          <p className="text-black/80 text-lg mb-12 max-w-2xl">
            Scalable from fast-growing startups to Fortune 500 multi-national corporations across regulated industries.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Enterprises', 'Mid Size Companies', 'Fintech & Lending', 'EdTech & Training'].map((audience, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-black mb-3" />
                <h3 className="font-bold text-lg text-black mb-2">{audience}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tailored SLM deployment and private knowledge graphs built around your exact business governance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Ready to orchestrate your enterprise AI?
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Experience our plug-and-play Agentic OS with a guided architecture walkthrough.
          </p>
          <Link
            href="/contact-us"
            className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-md font-bold text-base transition duration-150 inline-block"
          >
            Book a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
