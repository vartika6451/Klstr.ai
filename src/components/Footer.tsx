import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#ffbf23] text-black pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-14">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-40">
                <Image
                  src="/images/logo.png"
                  alt="klstr.ai"
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-black/85 text-[15px] leading-relaxed max-w-md font-normal">
              klstr.ai specializes in AI-driven solutions, empowering businesses with cutting-edge technology to innovate and thrive.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-black text-lg mb-4 tracking-tight">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <Link href="/" className="text-black/80 hover:text-black transition-colors font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-black/80 hover:text-black transition-colors font-medium">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-black/80 hover:text-black transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-black text-lg mb-4 tracking-tight">
              Products
            </h3>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <Link href="/klstr-agentic-os" className="text-black/80 hover:text-black transition-colors font-medium">
                  klstrAgenticOS
                </Link>
              </li>
              <li>
                <Link href="/klstr-enterprise-gen-ai" className="text-black/80 hover:text-black transition-colors font-medium">
                  klstrEnterpriseGenAI
                </Link>
              </li>
              <li>
                <Link href="/klstr-ai-data-market" className="text-black/80 hover:text-black transition-colors font-medium">
                  klstrAIDataHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center border-t border-black/10">
          <p className="text-black/75 text-sm font-normal">
            © 2025 klstr.ai. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
