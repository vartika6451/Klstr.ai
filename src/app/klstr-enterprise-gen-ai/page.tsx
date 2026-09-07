import Link from 'next/link';
import Image from 'next/image';
import { Shield, Lock, Server, Sparkles, ArrowRight } from 'lucide-react';

export default function EnterpriseGenAIPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3 py-1 rounded-full mb-4">
              klstrEnterpriseGenAI
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.15] mb-6">
              Enterprise GenAI for Vertical &amp; Domain-Specific Infrastructure
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-normal">
              Enterprise-grade conversational AI with uncompromised security, designed for enterprises. Similar to ChatGPT but purpose-built for secure deployment within your private organization.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-md font-bold text-base transition duration-150 inline-block shadow-sm"
              >
                Book a Demo
              </Link>
              <Link
                href="/klstr-ai-data-market"
                className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3.5 rounded-md font-bold text-base transition duration-150 inline-flex items-center gap-2"
              >
                Explore DataHub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-square">
              <Image
                src="/images/enterprise-genai.png"
                alt="Enterprise GenAI"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security & Features (Black Section with Yellow Highlights) */}
      <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#ffbf23] mb-4">
              Designed for Secured Enterprise Grade GenAI Deployments
            </h2>
            <p className="text-gray-300 text-lg">
              Empower every team member with conversational intelligence without risking IP leaks or compliance penalties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center flex-shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Private Cloud or On-Premise</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Runs directly inside your enterprise VPC, private cloud (AWS, Azure, GCP), or bare-metal environment — ensuring absolute data isolation and compliance with strict governance mandates.
                </p>
              </div>
            </div>

            <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Domain-Specific Fine-Tuning</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Fine-tune vertical models on your corporate manuals, internal wikis, code repositories, and customer conversation logs to deliver ultra-precise domain insights.
                </p>
              </div>
            </div>

            <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Enterprise SSO &amp; RBAC</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Granular role-based access control, Okta/Azure AD single sign-on integration, immutable audit logs, and prompt redacting filters to ensure zero credential leakage.
                </p>
              </div>
            </div>

            <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#ffbf23] text-black flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Seamless System Integration</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Native connector library for Salesforce, HubSpot, Jira, SAP, Slack, and internal REST APIs, letting conversational agents take direct action within your existing tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Benefits (Yellow Section) */}
      <section className="bg-[#ffbf23] text-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Real Impact for Knowledge Work
            </h2>
            <p className="text-black/80 text-lg">
              Boost organizational output while maintaining bank-grade security protocols.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/10">
              <div className="text-3xl font-extrabold text-black mb-2">35%</div>
              <h3 className="font-bold text-black text-base mb-2">Faster Resolution Times</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Automate complex customer support and internal helpdesk workflows with zero hallucinations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/10">
              <div className="text-3xl font-extrabold text-black mb-2">100%</div>
              <h3 className="font-bold text-black text-base mb-2">Data Privacy &amp; Ownership</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your enterprise data is never used to train external commercial models.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/10">
              <div className="text-3xl font-extrabold text-black mb-2">5x</div>
              <h3 className="font-bold text-black text-base mb-2">Employee Productivity</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Instant answers extracted directly from contracts, documentation, and operational protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Secure your enterprise conversational AI
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Speak with our AI security engineers and see Enterprise GenAI deployed in action.
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
