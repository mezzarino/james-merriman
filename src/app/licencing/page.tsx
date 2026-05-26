import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Licencing page metadata
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Photography Licencing | James Merriman",
  description:
    "Information about licencing photography by James Merriman for editorial and commercial use, including publications, journalism and selected commercial projects.",
  alternates: {
    canonical: `${config.baseUrl}/licencing`,
  },
  openGraph: {
    type: "website",
    title: "Photography Licencing | James Merriman",
    description:
      "Learn how to license photography by James Merriman for editorial and commercial use.",
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
    title: "Photography Licencing | James Merriman",
    description:
      "Information about licencing photography by James Merriman for editorial and commercial use.",
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
      {/* ✅ Structured data */}
      <Script
        id="licencing-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${config.baseUrl}/licencing#webpage`,
                url: `${config.baseUrl}/licencing`,
                name: "Photography Licencing",
                description:
                  "Information about licencing photography by James Merriman for editorial and commercial use.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                publisher: {
                  "@id": `${config.baseUrl}#entity`,
                },
                inLanguage: "en-GB",
                breadcrumb: {
                  "@id": `${config.baseUrl}/licencing#breadcrumb`,
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/licencing#breadcrumb`,
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
                    name: "Licencing",
                    item: `${config.baseUrl}/licencing`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Photography Licencing"
        description="Information on licencing photography for editorial and commercial use"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Licencing", href: "/licencing" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full prose prose-lg max-w-none wrap-break-word blog-content">
            <p>
              <strong>Last updated:</strong> 26th May 2026
            </p>

            <h2 className="mt-12 text-2xl font-semibold">Overview</h2>
            <p>
              All photographs published on this website are the original work of{" "}
              <strong>James Merriman</strong> and are available for editorial and commercial
              licencing.
            </p>
            <p>
              My photography is produced alongside long‑form travel writing and documentary
              fieldwork, often in remote, overlooked or post‑conflict regions. Images are created in
              context, with an emphasis on daily life, place and atmosphere rather than staged or
              illustrative scenes.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">Types of use</h2>
            <p>Photographs may be licenced for a range of uses, including:</p>

            <ul>
              <li>
                <strong>Editorial use:</strong> newspapers, magazines, books, online journalism,
                long‑form features, and educational or academic publications.
              </li>
              <li>
                <strong>Commercial use:</strong> brand storytelling, marketing campaigns, corporate
                publications, and cultural or destination projects.
              </li>
            </ul>

            <p>
              Licencing is offered on a <strong>case‑by‑case basis</strong>, depending on usage,
              territory, duration and exclusivity.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">Usage and attribution</h2>
            <p>Unless otherwise agreed, licenced images should be credited as:</p>
            <p>
              <strong>© James Merriman</strong>
            </p>
            <p>
              Images are not available for resale, redistribution, or inclusion in third‑party image
              libraries.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">AI and training datasets</h2>
            <p>
              My photographs may not be used for the training of artificial intelligence systems or
              machine‑learning datasets without explicit written permission.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">Enquiries</h2>
            <p>
              If you would like to discuss image licencing, usage, or availability, please{" "}
              <Link href="/contact">get in touch via the contact form</Link>.
            </p>
            <p>I am happy to advise on suitability, context and rights for specific projects.</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
