import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FigureImage } from "@/components/FigureImage";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Talks & Presentations page metadata
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Talks & Presentations | James Merriman – Travel Writer",
  description:
    "Talks and presentations by travel writer James Merriman, drawing on first-hand travel experience, geography, and field research.",
  alternates: {
    canonical: `${config.baseUrl}/talks-presentations`,
  },
  openGraph: {
    type: "website",
    title: "Talks & Presentations | James Merriman",
    description:
      "Talks and illustrated presentations on travel, geography, and first-hand experience by James Merriman.",
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
    title: "Talks & Presentations | James Merriman",
    description: "Talks and presentations on travel and geography by James Merriman.",
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
        id="talks-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${config.baseUrl}/talks-presentations#collectionpage`,
                url: `${config.baseUrl}/talks-presentations`,
                name: "Talks & Presentations | James Merriman",
                description:
                  "Talks and illustrated presentations by British travel writer and photographer James Merriman, based on fieldwork and first-hand reporting.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                about: {
                  "@id": `${config.baseUrl}#person`,
                },
                mainEntity: {
                  "@type": "ItemList",
                  name: "Talks and presentations",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      item: {
                        "@id": `${config.baseUrl}/talks-presentations#rgs-south-west-afghanistan`,
                      },
                    },
                  ],
                },
                breadcrumb: {
                  "@id": `${config.baseUrl}/talks-presentations#breadcrumb`,
                },
              },
              {
                "@type": "Service",
                "@id": `${config.baseUrl}/talks-presentations#service`,
                name: "Talks and Illustrated Presentations",
                description:
                  "Illustrated talks and presentations on travel, geography and first-hand experience, delivered to specialist, academic and cultural audiences.",
                provider: {
                  "@id": `${config.baseUrl}#organization`,
                },
                areaServed: {
                  "@type": "Place",
                  name: "United Kingdom",
                },
                audience: {
                  "@type": "Audience",
                  audienceType:
                    "Academic institutions, cultural organisations, literary events and specialist societies",
                },
                mainEntityOfPage: {
                  "@id": `${config.baseUrl}/talks-presentations#collectionpage`,
                },
              },
              {
                "@type": "Event",
                "@id": `${config.baseUrl}/talks-presentations#rgs-south-west-afghanistan`,
                name: "Travel in Afghanistan",
                eventStatus: "https://schema.org/EventScheduled",
                startDate: "2026-04-08",
                endDate: "2026-04-08",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                offers: {
                  "@type": "Offer",
                  url: "https://www.rgs.org",
                  price: "0",
                  priceCurrency: "GBP",
                  availability: "https://schema.org/InStock",
                },
                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman.jpg`,
                  width: 1200,
                  height: 1600,
                },
                organizer: {
                  "@type": "Organization",
                  name: "Royal Geographical Society (South West)",
                  url: "https://www.rgs.org",
                },
                performer: {
                  "@id": `${config.baseUrl}#person`,
                  "@type": "Person",
                  name: "James Merriman",
                },
                location: {
                  "@type": "Place",
                  name: "Royal Geographical Society (South West)",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Exeter",
                    addressCountry: "GB",
                  },
                },
                description:
                  "A 15-minute illustrated presentation reflecting on first-hand travel in Afghanistan, focusing on movement, public life, and everyday experiences beyond media narratives.",
                about: {
                  "@type": "Place",
                  name: "Afghanistan",
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/talks-presentations#breadcrumb`,
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
                    name: "Talks & Presentations",
                    item: `${config.baseUrl}/talks-presentations`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Talks and Illustrated Presentations on Travel and Geography"
        description="llustrated talks and presentations by a travel writer, drawing on fieldwork, geography and first‑hand experience"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Talks & Presentations", href: "/talks-presentations" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none">
            <p>
              I give talks and presentations to groups and organisations on travel, geography, and
              first‑hand experience in lesser‑known and complex regions. Presentations combine
              narrative travel writing with geographic and cultural context.
            </p>
            <h2>Recent talks</h2>
            <article>
              <h3>Royal Geographical Society (South West)</h3>
              <p>
                <strong>Travel in Afghanistan</strong> — Illustrated talk reflecting on first‑hand
                travel and observation in Afghanistan, with a focus on walking, public life, and
                everyday encounters.
              </p>
            </article>
            <p>
              For detailed background on my work, see the <Link href="/about">about page</Link> or
              explore my <Link href="/publications">published writing</Link>. Information about
              commissioning new writing or photography projects is available on the{" "}
              <Link href="/commissions">commissions page</Link>.
            </p>
          </div>

          <div className="w-full lg:w-1/3 pt-8 lg:pt-0 lg:pl-8">
            <FigureImage
              src="/images/james-merriman-rgs-exeter.jpg"
              alt="James Merriman presenting to the Royal Geographical Society in Exeter"
              caption="James Merriman presenting to the Royal Geographical Society in Exeter"
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
