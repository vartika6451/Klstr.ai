import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight block mb-4">
              klstr<span className="text-blue-500">.ai</span>
            </Link>
            <p className="text-gray-400 mt-4 max-w-sm">
              Transform Your Business with AI-Driven Digital Solutions. Enterprise AI, SLMs, Tiny LMs, Foundational Models, Supercharged by Artificial Intelligence.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Careers</Link></li>
              <li><Link href="/contact-us" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/klstr-agentic-os" className="text-gray-400 hover:text-white transition">klstrAgenticOS</Link></li>
              <li><Link href="/klstr-enterprise-gen-ai" className="text-gray-400 hover:text-white transition">klstrEnterpriseGenAI</Link></li>
              <li><Link href="/klstr-ai-data-market" className="text-gray-400 hover:text-white transition">klstrAIDataHub</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 klstr.ai. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
