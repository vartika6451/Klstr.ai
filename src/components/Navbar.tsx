'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'About Us', href: '/' },
    { name: 'AgenticOS', href: '/klstr-agentic-os' },
    { name: 'EnterpriseGenAI', href: '/klstr-enterprise-gen-ai' },
    { name: 'DataHub', href: '/klstr-ai-data-market' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <nav className="w-full bg-[#ffbf23] border-b border-[#f0b018] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative h-14 w-36 sm:w-40">
                <Image
                  src="/images/logo.png"
                  alt="klstr.ai - Innovating AI Solutions"
                  fill
                  sizes="(max-width: 768px) 144px, 160px"
                  className="object-contain object-left group-hover:opacity-95 transition-opacity"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.name} className="flex items-center">
                    <Link
                      href={link.href}
                      className={`text-[15px] font-medium transition-opacity ${
                        isActive
                          ? 'text-black font-semibold'
                          : 'text-black/80 hover:text-black'
                      } px-3 py-1`}
                    >
                      {link.name}
                    </Link>
                    {idx < navLinks.length - 1 && (
                      <span className="text-black/40 text-sm select-none mx-0.5">|</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact-us"
              className="bg-black hover:bg-neutral-800 text-white px-5 py-2 rounded-md font-semibold text-sm transition-all duration-150 shadow-sm hover:shadow active:scale-95"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-black hover:bg-black/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ffbf23] border-t border-black/10 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? 'bg-black/10 text-black font-bold'
                  : 'text-black hover:bg-black/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-black text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow hover:bg-neutral-800 transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
