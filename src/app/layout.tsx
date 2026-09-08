import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#ffbf23",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.klstr.ai"),
  title: {
    default: "klstr.ai | Innovating AI Solutions",
    template: "%s | klstr.ai",
  },
  description:
    "Transform Your Business with AI-Driven Digital Solutions. Enterprise AI, SLMs, Tiny LMs, Foundational Models, and Data Marketplaces supercharged by Artificial Intelligence.",
  keywords: [
    "Enterprise AI",
    "Agentic OS",
    "SLMs",
    "Small Language Models",
    "Tiny LMs",
    "Enterprise GenAI",
    "Data Marketplace",
    "DataHub",
    "Artificial Intelligence",
    "AI Orchestration",
    "Vertical AI",
  ],
  authors: [{ name: "klstr.ai", url: "https://www.klstr.ai" }],
  creator: "klstr.ai",
  publisher: "klstr.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.klstr.ai",
    siteName: "klstr.ai",
    title: "klstr.ai | Innovating AI Solutions",
    description:
      "Transform Your Business with AI-Driven Digital Solutions. Enterprise AI, SLMs, Tiny LMs, Foundational Models.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "klstr.ai - Transform Your Business with AI-Driven Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "klstr.ai | Innovating AI Solutions",
    description:
      "Transform Your Business with AI-Driven Digital Solutions. Enterprise AI, SLMs, Tiny LMs, Foundational Models.",
    images: ["/opengraph-image"],
    creator: "@klstrai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo-transparent.png",
    apple: "/images/logo-transparent.png",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.klstr.ai/#organization",
      name: "klstr.ai",
      url: "https://www.klstr.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://www.klstr.ai/images/logo.png",
        width: "330",
        height: "192",
      },
      description:
        "klstr.ai specializes in AI-driven solutions, empowering businesses with cutting-edge technology to innovate and thrive.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: "https://www.klstr.ai/contact-us",
      },
      sameAs: [
        "https://twitter.com/klstrai",
        "https://www.linkedin.com/company/klstr-ai",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.klstr.ai/#website",
      url: "https://www.klstr.ai",
      name: "klstr.ai",
      publisher: {
        "@id": "https://www.klstr.ai/#organization",
      },
      description: "Transform Your Business with AI-Driven Digital Solutions",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="bg-white text-[#111111] antialiased min-h-screen flex flex-col font-sans selection:bg-[#ffbf23] selection:text-black">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
