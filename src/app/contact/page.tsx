import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { ContactForm } from "@/components/ContactForm";
import { FigureImage } from "@/components/FigureImage";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Contact page metadata
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

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
                "@type": "ContactPage",
                "@id": `${config.baseUrl}/contact#contactpage`,
                url: `${config.baseUrl}/contact`,
                name: "Contact James Merriman | Travel Writer and Photographer",
                description:
                  "Contact information and social channels for British travel writer and photographer James Merriman.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                mainEntity: {
                  "@id": `${config.baseUrl}#person`,
                },
                breadcrumb: {
                  "@id": `${config.baseUrl}/contact#breadcrumb`,
                },
              },
              {
                "@type": "Person",
                "@id": `${config.baseUrl}#person`,
                name: "James Merriman",
                url: config.baseUrl,
                jobTitle: "Travel Writer and Photographer",
                sameAs: [
                  "https://x.com/mezzarino",
                  "https://linkedin.com/in/jamesmerriman",
                  "https://instagram.com/mezzarino",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Editorial enquiries",
                  availableLanguage: ["en-GB"],
                  url: `${config.baseUrl}/contact`,
                  email: "info@jamesmerriman.co.uk",
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/contact#breadcrumb`,
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
        title="Contact and Professional Enquiries for Writing, Photography and Speaking"
        description="Enquiries, collaborations and professional contact relating to travel writing, photography and speaking work"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none wrap-break-word blog-content">
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
            <FigureImage
              src="/images/james-merriman-norway.jpg"
              alt="James Merriman in a Norwegian winter"
              caption="James Merriman in a Norwegian winter"
              width={1200}
              height={1600}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
