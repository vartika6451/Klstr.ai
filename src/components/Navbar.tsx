import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              klstr<span className="text-blue-500">.ai</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
              About Us
            </Link>
            <Link href="/klstr-agentic-os" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
              AgenticOS
            </Link>
            <Link href="/klstr-enterprise-gen-ai" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
              EnterpriseGenAI
            </Link>
            <Link href="/klstr-ai-data-market" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
              DataHub
            </Link>
            <Link href="/contact-us" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="hidden md:flex">
            <Link href="/contact-us" className="bg-white hover:bg-gray-200 text-black px-6 py-2.5 rounded-full font-medium transition duration-200">
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
