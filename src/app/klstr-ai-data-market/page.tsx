import Link from 'next/link';
import Image from 'next/image';
import { Database, ShieldCheck, TrendingUp, BarChart3, Users, DollarSign, ArrowRight } from 'lucide-react';

export default function DataMarketPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3 py-1 rounded-full mb-4">
              klstrAIDataHub
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.15] mb-6">
              The Premier Enterprise Data Marketplace
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-normal">
              A cutting-edge data marketplace connecting data buyers and sellers across industries, providing a secure, efficient, and scalable platform for verified data exchange.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-md font-bold text-base transition duration-150 inline-block shadow-sm"
              >
                Book a Demo
              </Link>
              <Link
                href="/klstr-agentic-os"
                className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3.5 rounded-md font-bold text-base transition duration-150 inline-flex items-center gap-2"
              >
                Explore Agentic OS <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-square">
              <Image
                src="/images/datahub.png"
                alt="DataHub Marketplace"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Marketplace Features (Black Section) */}
      <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#ffbf23] mb-4">
              Democratizing High-Quality Data
            </h2>
            <p className="text-gray-300 text-lg">
              Unlock the power of validated datasets with enterprise-level security, automated quality verification, and transparent exchange mechanisms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <Database className="w-8 h-8 text-[#ffbf23] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Public &amp; Synthetic Records</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Extensive multi-domain public data repositories cleaned, normalized, and formatted for direct AI consumption.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <TrendingUp className="w-8 h-8 text-[#ffbf23] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Real-Time Sensor &amp; IoT Feeds</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Continuous high-frequency streaming data from industrial sensors, logistics telematics, and weather stations.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <ShieldCheck className="w-8 h-8 text-[#ffbf23] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Secure Exchange Enclave</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Cleanroom data sharing preventing reverse-engineering and ensuring complete compliance with privacy laws.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <DollarSign className="w-8 h-8 text-[#ffbf23] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Flexible Monetization</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pay-per-query, recurring subscription, or bulk dataset licensing models tailored to buyers and sellers.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <BarChart3 className="w-8 h-8 text-[#ffbf23] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Quality &amp; Bias Controls</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Automated statistical profiling, drift detection, and schema validation before any dataset is listed.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
              <Users className="w-8 h-8 text-[#ffbf23] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Collaborative Workspaces</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Multi-party collaborative analytics pipelines directly attached to datasets with version-controlled forks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases (Yellow Section) */}
      <section className="bg-[#ffbf23] text-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Enterprise Data Use Cases
            </h2>
            <p className="text-black/80 text-lg">
              Empower your data science and business strategy teams with trusted datasets.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/10">
              <h3 className="font-bold text-lg text-black mb-2">AI Training</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                High-fidelity domain-specific training data to fine-tune SLMs, LLMs, and computer vision models.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/10">
              <h3 className="font-bold text-lg text-black mb-2">Market Research</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Aggregated consumer behavior, pricing trends, and supply chain telemetry for tactical decision making.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/10">
              <h3 className="font-bold text-lg text-black mb-2">Business Intelligence</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enrich internal reporting pipelines with verified macroeconomic and competitive industry datasets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/10">
              <h3 className="font-bold text-lg text-black mb-2">Predictive Analytics</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Feature-engineered historical datasets optimized for time-series forecasting and risk scoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Connect with DataHub
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Access certified data catalogs or monetize your enterprise proprietary datasets securely.
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
