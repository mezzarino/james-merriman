import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { ContactForm } from "@/components/ContactForm";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { AuthorPortrait } from "@/components/ui/author-portrait";
import { config } from "@/config";

/**
 * Contact page metadata
 */
const ogImage = "/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Contact James Merriman – Travel Writer & Photographer",
  description:
    "Contact details and social channels for James Merriman, a UK-based travel writer and photographer.",
  alternates: {
    canonical: `${config.baseUrl}/contact`,
  },
  openGraph: {
    type: "profile",
    title: "Contact James Merriman – Travel Writer & Photographer",
    description: "Get in touch with UK-based travel writer and photographer James Merriman.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact James Merriman – Travel Writer & Photographer",
    description: "Get in touch with UK-based travel writer and photographer James Merriman.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Page = async () => {
  return (
    <>
      {/* Structured data */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${config.baseUrl}/contact`,
                url: `${config.baseUrl}/contact`,
                name: "Contact James Merriman",
                description:
                  "Contact details and social channels for UK-based travel writer and photographer James Merriman.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                about: {
                  "@id": `${config.baseUrl}#person`,
                },
              },
              {
                "@type": "Person",
                "@id": `${config.baseUrl}#person`,
                name: "James Merriman",
                url: config.baseUrl,
                image: {
                  "@type": "ImageObject",
                  url: "https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg",
                  width: 1200,
                  height: 1600,
                },
                jobTitle: "Travel Writer and Photographer",
                nationality: {
                  "@type": "Country",
                  name: "United Kingdom",
                },
                knowsLanguage: ["en-GB"],
                sameAs: [
                  "https://x.com/mezzarino",
                  "https://linkedin.com/in/jamesmerriman",
                  "https://instagram.com/mezzarino",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Professional enquiries",
                  availableLanguage: ["en-GB"],
                  sameAs: [
                    "https://x.com/mezzarino",
                    "https://linkedin.com/in/jamesmerriman",
                    "https://instagram.com/mezzarino",
                  ],
                },
              },
              {
                "@type": "WebSite",
                "@id": `${config.baseUrl}#website`,
                url: config.baseUrl,
                name: "James Merriman | Travel Writing and Photography",
                publisher: {
                  "@id": `${config.baseUrl}#person`,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${config.baseUrl}/`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Contact",
                    item: `${config.baseUrl}/contact`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Contact James Merriman"
        description="Enquiries, collaborations and professional contact with a travel writer and photographer"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none break-words blog-content">
            <p>
              If you’d like more background on my work, you can read{" "}
              <Link href="/about">my biography</Link>, view{" "}
              <Link href="/credentials">my professional credentials</Link>, explore{" "}
              <Link href="/publications">published writing</Link>, or learn more about{" "}
              <Link href="/talks-presentations">talks and presentations</Link>.
            </p>

            <p>Please get in touch using the contact form below.</p>
            <ContactForm />
          </div>
          <div className="w-full lg:w-1/3 pt-8 lg:pt-0 lg:pl-8">
            <AuthorPortrait />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
