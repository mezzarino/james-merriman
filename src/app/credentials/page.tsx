import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Credentials page metadata
 */
const ogImage = "/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Credentials of James Merriman – Awards, Memberships & Publications",
  description:
    "Professional credentials of James Merriman, including awards, nominations, fellowships, professional memberships and selected contributions to published travel literature.",
  alternates: {
    canonical: `${config.baseUrl}/credentials`,
  },
  openGraph: {
    type: "profile",
    title: "Credentials of James Merriman – Travel Writer",
    description:
      "Awards, professional memberships, fellowships and selected publications of UK-based travel writer James Merriman.",
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
    title: "Credentials of James Merriman – Travel Writer",
    description:
      "Awards, professional memberships, fellowships and selected publications of UK-based travel writer James Merriman.",
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
        id="credentials-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfilePage",
                "@id": `${config.baseUrl}/credentials`,
                url: `${config.baseUrl}/credentials`,
                name: "Credentials of James Merriman",
                description:
                  "Awards, professional memberships, fellowships and selected publications of UK-based travel writer James Merriman.",
                mainEntity: {
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
                description:
                  "UK-based travel writer and photographer documenting remote regions, cultural frontiers and human experience worldwide.",
                jobTitle: "Travel Writer and Photographer",
                nationality: "British",
                knowsLanguage: ["en-GB"],
                affiliation: [
                  { "@type": "Organization", name: "Royal Geographical Society" },
                  {
                    "@type": "Organization",
                    name: "International Travel Writers Alliance",
                  },
                  { "@type": "Organization", name: "The Globetrotters Club" },
                  { "@type": "Organization", name: "TravMedia – United Kingdom" },
                  {
                    "@type": "Organization",
                    name: "International Bank Note Society",
                  },
                ],
                award: ["Longlisted – Bradt Guides New Travel Writer of the Year (2026)"],
                sameAs: [
                  "https://x.com/mezzarino",
                  "https://linkedin.com/in/jamesmerriman",
                  "https://instagram.com/mezzarino",
                ],
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
                    name: "Credentials",
                    item: `${config.baseUrl}/credentials`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Credentials"
        description="Awards, nominations, professional memberships and selected publications"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Credentials", href: "/credentials" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none break-words blog-content">
            <p>
              This page outlines my professional credentials as a travel writer, including awards
              and nominations, selected publications, and affiliations with industry and academic
              organisations. If you’re looking for a more personal background and an overview of my
              travels and interests, you can read more <Link href="/about">About me</Link>.
            </p>

            <h2>Awards &amp; Nominations</h2>
            <ul>
              <li>
                <strong>Longlisted</strong> -{" "}
                <em>Bradt Guides New Travel Writer of the Year 2026</em>
              </li>
            </ul>
            <h2>Professional Memberships &amp; Fellowships</h2>
            <ul>
              <li>
                <strong>Fellow</strong> -{" "}
                <a
                  href="https://www.rgs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View The Royal Geographical Society website"
                >
                  The Royal Geographical Society <em>(FRGS)</em>
                </a>
              </li>
              <li>
                <strong>Member</strong> -{" "}
                <a
                  href="https://www.internationaltravelwritersalliance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View the International Travel Writers Alliance website"
                >
                  International Travel Writers Alliance
                </a>
              </li>
              <li>
                <strong>Member</strong> -{" "}
                <a
                  href="https://globetrotters.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View The Globetrotters Club website"
                >
                  The Globetrotters Club
                </a>
              </li>
              <li>
                <strong>Member</strong> -{" "}
                <a
                  href="https://travmedia.com/Client/MyProfile/363286"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View the profile of James Merriman on the TravMedia UK website"
                >
                  TravMedia - United Kingdom
                </a>
              </li>
              <li>
                <strong>Member</strong> -{" "}
                <a
                  href="https://www.theibns.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View the International Bank Note Society website"
                >
                  International Bank Note Society
                </a>
              </li>
            </ul>
            <h2>Selected Publications & Contributions</h2>
            <p>
              Alongside my long‑form travel writing, I contribute to published travel literature
              that explores curiosity, connection and human experience on the road.
            </p>
            <ul>
              <li>
                <strong>Contributor</strong> –{" "}
                <a
                  href="https://www.bradtguides.com/product/the-kindness-of-strangers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View The Kindness of Strangers by Bradt Guides"
                >
                  <em>The Kindness of Strangers</em>, Bradt Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/3 pb-4 lg:pb-0 lg:pl-8">
            <figure>
              <Image
                src="https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg"
                alt="James Merriman, UK travel writer and photographer"
                width={1200}
                height={1600}
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 1024px) 100vw, 384px"
                preload={true}
              />
              <figcaption className="mt-2 text-sm text-gray-500 text-center">
                James Merriman - travel writer &amp; photographer
              </figcaption>
            </figure>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
