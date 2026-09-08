import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DocumentManager } from '@/components/DocumentManager';
import { AuditManager } from '@/components/AuditManager';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  FileText,
  Sliders,
  RefreshCw,
  Server,
  Cloud,
  Layers,
  ArrowRight,
  MessageCircle,
  Building2,
  Briefcase,
  Layers3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise GenAI | Secured Conversational AI Platform',
  description:
    'Enterprise-grade conversational AI with uncompromised security and privacy. Deployed on private cloud or on-premise with fine-tuning on proprietary enterprise knowledge.',
  keywords: [
    'Enterprise GenAI',
    'Private Conversational AI',
    'Enterprise LLM',
    'Private Cloud AI',
    'On-Premise GenAI',
    'Secure Enterprise AI',
    'SSO AI Compliance',
  ],
  alternates: {
    canonical: '/klstr-enterprise-gen-ai',
  },
  openGraph: {
    title: 'Enterprise GenAI | Secured Conversational AI Platform - klstr.ai',
    description:
      'Enterprise-grade conversational AI with uncompromised security. Private cloud, on-premise deployment, and domain fine-tuning.',
    url: 'https://www.klstr.ai/klstr-enterprise-gen-ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise GenAI | Secured Conversational AI Platform',
    description:
      'Enterprise-grade conversational AI with uncompromised security. Private cloud, on-premise deployment, and domain fine-tuning.',
  },
};

const jsonLdEnterpriseGenAI = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "klstrEnterpriseGenAI",
      "operatingSystem": "Cloud, Private Cloud, On-Premise",
      "applicationCategory": "BusinessApplication",
      "description":
        "Enterprise-grade conversational AI solution purpose-built for secure private deployment within your organization.",
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
          "name": "Enterprise GenAI",
          "item": "https://www.klstr.ai/klstr-enterprise-gen-ai",
        },
      ],
    },
  ],
};

export default function EnterpriseGenAIPage() {

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEnterpriseGenAI) }}
      />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION */}
      {/* ========================================================================= */}
      <section className="bg-white pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3 py-1 rounded-full mb-4">
              klstrEnterpriseGenAI
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.15] mb-6">
              Enterprise GenAI for Vertical &amp; Domain-Specific Infrastructure
            </h1>
            <p className="text-gray-800 text-base sm:text-lg lg:text-xl font-normal mb-4 max-w-2xl leading-relaxed">
              Enterprise-grade conversational AI with uncompromised security, designed for enterprises.
            </p>
            <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-2xl leading-relaxed font-normal">
              Similar to ChatGPT but with enterprise-level privacy, it empowers your teams to harness generative AI for knowledge work, automation, and secure collaboration.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/klstr-enterprise-gen-ai/chat"
                className="bg-[#ffbf23] hover:bg-[#f0b018] text-black px-7 py-3.5 rounded-md font-bold text-base transition-all duration-150 inline-flex items-center gap-2 shadow active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Open Full Screen Chat
              </Link>
              <a
                href="#knowledge-base"
                className="bg-black hover:bg-neutral-800 text-white px-7 py-3.5 rounded-md font-bold text-base transition-all duration-150 inline-flex items-center gap-2 shadow-sm active:scale-95"
              >
                <FileText className="w-5 h-5" />
                Knowledge Base &amp; Upload
              </a>
              <Link
                href="/contact-us"
                className="bg-neutral-100 hover:bg-neutral-200 text-black px-6 py-3.5 rounded-md font-bold text-base transition-all duration-150 inline-block shadow-xs active:scale-95"
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
                  Trusted &amp;<br />Compliant
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
            <div className="relative w-full max-w-[460px] aspect-square">
              <Image
                src="/images/enterprise-genai.png"
                alt="Enterprise GenAI Platform"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LIVE RAG KNOWLEDGE BASE & DOCUMENT MANAGER (ALWAYS VISIBLE) */}
      {/* ========================================================================= */}
      <section id="knowledge-base" className="bg-neutral-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-y-4 border-[#ffbf23]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
            <div>
              <span className="text-xs uppercase font-bold text-[#ffbf23] tracking-wider">
                Live RAG Knowledge Base Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Enterprise Knowledge Base &amp; Document Ingestion
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                Upload internal PDFs, Word documents, or spreadsheets to index into your private vector store and query via the AI chatbot.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/klstr-enterprise-gen-ai/chat"
                className="inline-flex items-center gap-2 bg-[#ffbf23] hover:bg-[#f0b018] text-black px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Launch Full Screen Chat
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <DocumentManager />
            <AuditManager />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800 text-sm text-neutral-400">
              <span>
                Tip: Use the floating <strong className="text-[#ffbf23]">Ask AI</strong> bubble on the bottom right to query indexed documents anywhere on the site.
              </span>
              <Link
                href="/klstr-enterprise-gen-ai/chat"
                className="text-[#ffbf23] hover:underline font-semibold inline-flex items-center gap-1"
              >
                Open dedicated chat workspace &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: HOW IT WORKS (BLACK SECTION) */}
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
              Architecture &amp; Deployments
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white mb-4 tracking-tight">
              How it works
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed font-normal">
              Designed for secured enterprise grade GenAI deployments with uncompromising sovereignty and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-5 font-bold">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Enterprise Infrastructure
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Runs on enterprise infrastructure or your preferred private cloud — ensuring data privacy, compliance, and complete control over sensitive information.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-5 font-bold">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Fine-Tuned on Knowledge
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Fine-tune the AI on your internal knowledge base, SOPs, documents, and workflows to deliver highly relevant and verified responses.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-5 font-bold">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Enterprise Governance
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Role-based access controls (RBAC), single sign-on (SSO), immutable audit logs, and robust multi-tenant administrator controls.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center mb-5 font-bold">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  System Integrations
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Easily integrates with your existing enterprise toolchains, intranets, CRMs, ERPs, and ticketing platforms via native REST APIs.
                </p>
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
            Scalable conversational AI tailored to every business size, industry vertical, and operational domain.
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
              Designed from the ground up for compliance, precision, and operational autonomy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/60 p-6 rounded-2xl border border-neutral-800">
              <div className="w-10 h-10 rounded-lg bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Train Any Kind of Documents
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Native parsing for PDFs, DOCX, CSVs, and markdown with automatic chunking and indexing.
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
                Deploy in your own VPC or bare-metal environment to satisfy strict sovereign data residency rules.
              </p>
            </div>

            <div className="bg-black/60 p-6 rounded-2xl border border-neutral-800">
              <div className="w-10 h-10 rounded-lg bg-[#ffbf23] text-black flex items-center justify-center mb-4">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Easy to Train &amp; Manage
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Zero-setup provider abstraction supporting Gemini, Claude, Groq, and local SLM embeddings.
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
                Full control to forget, update, retrain, and delete obsolete chunks with complete audit trails.
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
            Contact us to get started today.
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
