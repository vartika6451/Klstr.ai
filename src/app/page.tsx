import Link from 'next/link';
import { ArrowRight, CheckCircle2, Bot, Database, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto">
          Transform Your Business with AI-Driven Digital Solutions
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Enterprise AI, SLMs, Tiny LMs, Foundational Models, Supercharged by Artificial Intelligence.
        </p>
        <div className="flex justify-center">
          <Link href="/contact-us" className="bg-white hover:bg-gray-200 text-black px-8 py-3.5 rounded-full font-bold text-lg transition duration-200 flex items-center gap-2">
            Book a Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features List */}
      <section className="bg-[#0a0a0a] py-12 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-300 font-medium">
            {[
              "Experienced Team",
              "Flexibility & Scalability",
              "Personalized Solutions",
              "Speed & Security",
              "Affordable Packages",
              "Proven Results"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              We are your trusted Innovation partner
            </h2>
            <p className="text-lg text-gray-400 mb-4">
              We help companies of all sizes by providing them with Enterprise grade AI solutions.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              We build flexible solutions that work for our customers&apos; unique needs, giving them an edge in their business.
            </p>
            <Link href="/contact-us" className="text-blue-500 font-semibold hover:text-blue-400 flex items-center gap-2 text-lg transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="bg-[#111] rounded-3xl h-96 w-full flex items-center justify-center border border-gray-800">
            {/* Placeholder for an image */}
            <span className="text-gray-600">Innovation Image</span>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What We Offer</h2>
            <p className="text-lg text-gray-400">
              We design AI solutions tailored to address your business challenges. Our full stack enterprise AI encompass the entire product lifecycle, blending strategic insight with digital expertise to deliver market-ready digital products and platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Agentic OS */}
            <div className="bg-black p-8 rounded-2xl shadow-sm border border-gray-800 hover:border-gray-700 transition">
              <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Agentic OS</h3>
              <p className="text-gray-400 mb-6 flex-grow">
                Enterprise AI for Vertical & Domain-Specific Infrastructure. Plug & play orchestration of static and dynamic knowledge for your industry with power of Tiny & Small Language Models
              </p>
              <Link href="/klstr-agentic-os" className="text-blue-500 font-semibold hover:text-blue-400 flex items-center gap-2 mt-auto transition-colors">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Enterprise GenAI */}
            <div className="bg-black p-8 rounded-2xl shadow-sm border border-gray-800 hover:border-gray-700 transition">
              <div className="w-12 h-12 bg-purple-900/30 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Enterprise GenAI</h3>
              <p className="text-gray-400 mb-6 flex-grow">
                Is an advanced, enterprise-grade conversational AI solution — similar to ChatGPT but purpose-built for secure deployment within your organization. It enables teams to access the power of generative AI for knowledge work, process automation, and customer interaction — all within a secured and compliant environment.
              </p>
              <Link href="/klstr-enterprise-gen-ai" className="text-blue-500 font-semibold hover:text-blue-400 flex items-center gap-2 mt-auto transition-colors">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* DataHub */}
            <div className="bg-black p-8 rounded-2xl shadow-sm border border-gray-800 hover:border-gray-700 transition">
              <div className="w-12 h-12 bg-emerald-900/30 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">DataHub</h3>
              <p className="text-gray-400 mb-6 flex-grow">
                DataHub is a cutting-edge data marketplace that connects data buyers and sellers from various industries, providing a secure, efficient, and scalable platform for data exchange. Our mission is to democratize access to high-quality data, enabling businesses to make informed decisions, drive innovation, and gain a competitive edge.
              </p>
              <Link href="/klstr-ai-data-market" className="text-blue-500 font-semibold hover:text-blue-400 flex items-center gap-2 mt-auto transition-colors">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">What our clients say</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "CEO of an EdTech company in the USA",
              "VP of a leading digital lending company in the USA",
              "Product Owner of a marketplace in India",
              "Operations head of a Logistic Company in the USA"
            ].map((client, i) => (
              <div key={i} className="bg-[#111] border border-gray-800 p-6 rounded-2xl">
                <p className="text-white font-medium text-lg">"{client}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-black text-white text-center border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Grow Your Vision</h2>
          <p className="text-xl mb-10 text-blue-200">Contact us to get started today.</p>
          <Link href="/contact-us" className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold text-lg transition duration-200 shadow-lg shadow-white/10">
            Book a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
