import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { AuthorPortrait } from "@/components/ui/author-portrait";
import { config } from "@/config";

/**
 * Talks & Presentations page metadata
 */
const ogImage = "/james-merriman-travel-writer.jpg";

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
                "@id": `${config.baseUrl}/talks-presentations`,
                url: `${config.baseUrl}/talks-presentations`,
                name: "Talks & Presentations | James Merriman",
                description:
                  "Talks and presentations by travel writer James Merriman, based on first-hand travel and field research.",
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
                jobTitle: "Travel Writer",
                sameAs: [
                  "https://x.com/mezzarino",
                  "https://linkedin.com/in/jamesmerriman",
                  "https://instagram.com/mezzarino",
                ],
              },

              {
                "@type": "Event",
                "@id": `${config.baseUrl}/talks#rgs-south-west-afghanistan`,
                name: "Travel in Afghanistan",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventCompleted",
                organizer: {
                  "@type": "Organization",
                  name: "Royal Geographical Society (South West)",
                },
                performer: {
                  "@id": `${config.baseUrl}#person`,
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
        title="Talks & Presentations"
        description="Talks and illustrated presentations by travel writer James Merriman, drawing on travel, geography, and first‑hand experience."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Talks & Presentations", href: "/talks-presentations" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl">
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
              explore my <Link href="/publications">published writing</Link>.
            </p>
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
