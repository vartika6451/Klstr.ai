'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner / Hero */}
      <section className="bg-white pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#ffbf23] text-black px-3 py-1 rounded-full mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-4">
            Let&apos;s get together
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl font-normal leading-relaxed">
            Project Enquiries? Questions? Comments? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-[#ffbf23]/30 text-black rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">Thank you for reaching out!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We have received your message and a member of our AI solutions team will get in touch with you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-colors mt-4 inline-block"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your business goals or AI requirements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-md font-bold text-base transition-all duration-150 shadow-sm active:scale-95"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Illustration & Info Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative w-full max-w-[420px] aspect-square mx-auto">
              <Image
                src="/images/contact-illustration.png"
                alt="Let's get together"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-contain"
                priority
              />
            </div>

            <div className="bg-[#ffbf23] rounded-2xl p-6 sm:p-8 text-black space-y-4">
              <h3 className="text-xl font-bold text-black tracking-tight">
                Enterprise AI Partnerships
              </h3>
              <p className="text-black/85 text-sm leading-relaxed">
                Connect with our vertical AI solution architects to schedule a custom product demonstration or discuss architecture integration.
              </p>
              <div className="pt-2 space-y-3 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-black" />
                  <span>contact@klstr.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-black" />
                  <span>San Francisco, CA &amp; Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
