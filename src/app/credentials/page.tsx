import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { AuthorPortrait } from "@/components/ui/author-portrait";
import { config } from "@/config";

/**
 * Credentials page metadata
 */
const ogImage = "/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Credentials of James Merriman – Awards & Memberships",
  description:
    "Professional credentials of James Merriman, including awards, nominations, fellowships and professional memberships to published travel literature.",
  alternates: {
    canonical: `${config.baseUrl}/credentials`,
  },
  openGraph: {
    type: "profile",
    title: "Credentials of James Merriman – Travel Writer",
    description:
      "Awards, professional memberships and fellowships of UK-based travel writer James Merriman.",
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
      "Awards, professional memberships and fellowships of UK-based travel writer James Merriman.",
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
                  "Awards, professional memberships and fellowships of UK-based travel writer James Merriman.",
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
        title="Credentials of James Merriman"
        description="Awards, nominations and professional memberships as a travel writer and photographer"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Credentials", href: "/credentials" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none break-words blog-content">
            <p>
              This page outlines my professional credentials as a travel writer, including awards,
              nominations, and affiliations with industry and academic organisations. You can also
              explore a selection of <Link href="/publications">published work</Link> and{" "}
              <Link href="/talks-presentations">talks and presentations</Link> delivered to
              specialist and regional audiences.
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
          </div>
          <div className="w-full lg:w-1/3 pb-4 lg:pb-0 lg:pl-8">
            <AuthorPortrait />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
