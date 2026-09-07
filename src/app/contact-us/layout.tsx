import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Book an Enterprise AI Demo',
  description:
    "Get in touch with klstr.ai's AI solutions architects. Schedule an enterprise demonstration of AgenticOS, Enterprise GenAI, or DataHub.",
  alternates: {
    canonical: '/contact-us',
  },
  openGraph: {
    title: 'Contact Us | klstr.ai - Book an Enterprise AI Demo',
    description:
      "Get in touch with klstr.ai's AI solutions architects. Schedule an enterprise demonstration of AgenticOS, Enterprise GenAI, or DataHub.",
    url: 'https://www.klstr.ai/contact-us',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | klstr.ai - Book an Enterprise AI Demo',
    description:
      "Get in touch with klstr.ai's AI solutions architects. Schedule an enterprise demonstration of AgenticOS, Enterprise GenAI, or DataHub.",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.klstr.ai"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Contact Us",
      "item": "https://www.klstr.ai/contact-us"
    }
  ]
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {children}
    </>
  );
}
