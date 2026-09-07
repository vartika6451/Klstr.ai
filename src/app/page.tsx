import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* SECTION 1: HERO SECTION */}
      <section className="bg-white pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.15] mb-6">
              Transform Your<br />
              Business with <span className="font-extrabold text-black">AI-Driven</span><br />
              Digital Solutions
            </h1>
            <p className="text-gray-800 text-base sm:text-lg lg:text-xl font-normal mb-8 max-w-xl leading-relaxed">
              Enterprise AI, SLMs ,Tiny LMs, Foundational Models, Supercharged by Artificial Intelligence.
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
              {/* Feature 1 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/images/icon_1.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Experienced<br />Team
                </span>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/images/icon_2.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Flexibility &amp;<br />Scalability
                </span>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/images/icon_3.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Personalized<br />Solutions
                </span>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/images/icon_4.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Speed &amp;<br />Security
                </span>
              </div>

              {/* Feature 5 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/images/icon_5.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-black text-xs sm:text-sm font-medium leading-tight">
                  Affordable<br />Packages
                </span>
              </div>

              {/* Feature 6 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/images/icon_6.svg"
                    alt=""
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

          {/* Right Column: Isometric 3D Brain Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image
                src="/images/hero-brain.png"
                alt="AI Digital Solutions"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INNOVATION PARTNER (BLACK WITH YELLOW ACCENTS) */}
      <div className="w-full overflow-hidden leading-none bg-white">
        {/* Top angled yellow transition wedge */}
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-12 text-[#ffbf23] block fill-current"
        >
          <polygon points="0,0 1200,28 1200,45 0,45" />
        </svg>
      </div>

      <section className="bg-black text-white pt-14 pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            {/* Left Column: Team Illustration */}
            <div className="md:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3]">
                <Image
                  src="/images/innovation-team.png"
                  alt="Innovation Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Column: Copy & Yellow CTA */}
            <div className="md:col-span-6">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#ffbf23] mb-6 leading-tight tracking-tight">
                We are your trusted<br />Innovation partner
              </h2>
              <p className="text-gray-200 text-base sm:text-lg mb-4 leading-relaxed max-w-xl font-normal">
                We help companies of all sizes by providing them with Enterprise grade AI solutions.
              </p>
              <p className="text-gray-200 text-base sm:text-lg mb-8 leading-relaxed max-w-xl font-normal">
                We build flexible solutions that work for our customers&apos; unique needs, giving them an edge in their business.
              </p>
              <Link
                href="/contact-us"
                className="bg-[#ffbf23] hover:bg-[#f0b018] text-black px-7 py-3 rounded-md font-bold text-base transition-all duration-150 inline-block shadow active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Iconic Centered Wavy Lines Graphic at Section Bottom */}
        <div className="absolute left-1/2 -bottom-12 sm:-bottom-14 -translate-x-1/2 z-20 pointer-events-none">
          <div className="relative w-36 sm:w-44 h-24 sm:h-28">
            <Image
              src="/images/icon_7.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE OFFER (WHITE BACKGROUND) */}
      <section className="bg-white pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 tracking-tight">
            What We Offer
          </h2>
          <p className="text-gray-700 text-base sm:text-lg max-w-4xl leading-relaxed font-normal">
            We design AI solutions tailored to address your business challenges. Our full stack enterprise AI encompass the entire product lifecycle, blending strategic insight with digital expertise to deliver market-ready digital products and platforms.
          </p>
        </div>

        {/* 3 Offerings Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {/* Card 1: Agentic OS */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200">
            <div className="relative w-44 h-44 mb-6 flex-shrink-0">
              <Image
                src="/images/agentic-os.png"
                alt="Agentic OS"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">
              Agentic OS
            </h3>
            <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed mb-8 flex-grow">
              Enterprise AI for Vertical &amp; Domain-Specific Infrastructure.
              <br /><br />
              Plug &amp; play orchestration of static and dynamic knowledge for your industry with power of Tiny &amp; Small Language Models
            </p>
            <Link
              href="/klstr-agentic-os"
              className="w-full max-w-[200px] bg-black hover:bg-neutral-800 text-white py-2.5 px-6 rounded-md font-bold text-sm transition-all duration-150 inline-block shadow-sm active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Card 2: Enterprise GenAI */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200">
            <div className="relative w-44 h-44 mb-6 flex-shrink-0">
              <Image
                src="/images/enterprise-genai.png"
                alt="Enterprise GenAI"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">
              Enterprise GenAI
            </h3>
            <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed mb-8 flex-grow">
              Is an advanced, enterprise-grade conversational AI solution — similar to ChatGPT but purpose-built for secure deployment within your organization. It enables teams to access the power of generative AI for knowledge work, process automation, and customer interaction — all within a secured and compliant environment.
            </p>
            <Link
              href="/klstr-enterprise-gen-ai"
              className="w-full max-w-[200px] bg-black hover:bg-neutral-800 text-white py-2.5 px-6 rounded-md font-bold text-sm transition-all duration-150 inline-block shadow-sm active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Card 3: DataHub */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200">
            <div className="relative w-44 h-44 mb-6 flex-shrink-0">
              <Image
                src="/images/datahub.png"
                alt="DataHub"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">
              DataHub
            </h3>
            <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed mb-8 flex-grow">
              DataHub is a cutting-edge data marketplace that connects data buyers and sellers from various industries, providing a secure, efficient, and scalable platform for data exchange.
              <br /><br />
              Our mission is to democratize access to high-quality data, enabling businesses to make informed decisions, drive innovation, and gain a competitive edge.
            </p>
            <Link
              href="/klstr-ai-data-market"
              className="w-full max-w-[200px] bg-black hover:bg-neutral-800 text-white py-2.5 px-6 rounded-md font-bold text-sm transition-all duration-150 inline-block shadow-sm active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT OUR CLIENTS SAY (FULL YELLOW BACKGROUND) */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        {/* Angled top slope from left to right */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {/* Testimonial 1 */}
            <div className="flex flex-col justify-between">
              <p className="text-black/90 text-sm sm:text-[15px] leading-relaxed font-normal">
                &ldquo;klstr&apos;s enterprise ai platform has fundamentally changed how we deliver instant academic support. Our students and faculty now get precise answers on curriculum, deadlines, and policies — all driven by vertical GPT agents trained on our unique knowledge base. It&apos;s like having a dedicated academic assistant for every student, at scale.&rdquo;
              </p>
              <div className="mt-8 pt-2">
                <p className="text-black font-bold text-sm sm:text-[15px] leading-snug">
                  CEO of an EdTech company in the USA
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex flex-col justify-between">
              <p className="text-black/90 text-sm sm:text-[15px] leading-relaxed font-normal">
                &ldquo;In digital lending, precision and compliance are non-negotiable. Klstr.ai&apos;s multi-SLM stack gave us domain-specific AI agents that securely connect with our CRM and underwriting engines. Our customer service wait times dropped by 35%, and agents now handle policy, eligibility, and dynamic queries end-to-end. This is vertical AI done right.&rdquo;
              </p>
              <div className="mt-8 pt-2">
                <p className="text-black font-bold text-sm sm:text-[15px] leading-snug">
                  VP of a leading digital lending company in the USA
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex flex-col justify-between">
              <p className="text-black/90 text-sm sm:text-[15px] leading-relaxed font-normal">
                &ldquo;For our multi-vendor marketplace, we needed AI that understands product categories, seller policies, and buyer interactions — all in local context. Klstr.ai&apos;s plug-and-play Agentic AI made it easy to deploy specialized LMs for each category. The result? Faster dispute resolutions, better buyer FAQs, and sellers love the automation too!&rdquo;
              </p>
              <div className="mt-8 pt-2">
                <p className="text-black font-bold text-sm sm:text-[15px] leading-snug">
                  Product Owner of a marketplace in India
                </p>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="flex flex-col justify-between">
              <p className="text-black/90 text-sm sm:text-[15px] leading-relaxed font-normal">
                &ldquo;We used Klstr.ai to build vertical AI agents for shipment tracking, customs queries, and fleet ops. Our operations desk now handles thousands of static and live questions automatically — reducing tickets by 50% and boosting SLA compliance. The fact that we control data flows with vector stores and API calls sealed the deal for us.&rdquo;
              </p>
              <div className="mt-8 pt-2">
                <p className="text-black font-bold text-sm sm:text-[15px] leading-snug">
                  Operations head of a Logistic Company in the USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: GROW YOUR VISION (WHITE CTA) */}
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
