import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Publications page metadata
 */
const ogImage = "/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Publications | James Merriman – Travel Writer",
  description:
    "A selection of travel writing by James Merriman published in magazines and on external websites, including downloadable excerpts and links to commissioned work.",
  alternates: {
    canonical: `${config.baseUrl}/publications`,
  },
  openGraph: {
    type: "website",
    title: "Selected Publications | James Merriman",
    description:
      "Travel writing by James Merriman published in magazines and online, including selected excerpts and links to external publications.",
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
    title: "Selected Publications | James Merriman",
    description: "A selection of travel writing published in magazines and on external platforms.",
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
        id="publications-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${config.baseUrl}/publications`,
                url: `${config.baseUrl}/publications`,
                name: "Selected Publications | James Merriman",
                description:
                  "A selection of travel writing by James Merriman published in magazines and on external platforms.",
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
                sameAs: [
                  "https://x.com/mezzarino",
                  "https://linkedin.com/in/jamesmerriman",
                  "https://instagram.com/mezzarino",
                ],
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
                    name: "Publications",
                    item: `${config.baseUrl}/publications`,
                  },
                ],
              },

              /* ---------------------------
           Creative works
        ---------------------------- */

              {
                "@type": "CreativeWork",
                "@id": `${config.baseUrl}/publications#awakening-of-leptis-magna`,
                name: "The Awakening of Leptis Magna",
                author: {
                  "@id": `${config.baseUrl}#person`,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Globe Magazine",
                },
                datePublished: "2026-03",
                genre: ["Travel writing", "History", "Archaeology"],
                about: {
                  "@type": "Place",
                  name: "Leptis Magna",
                },
                isPartOf: {
                  "@type": "Periodical",
                  name: "Globe Magazine",
                },
                encoding: {
                  "@type": "MediaObject",
                  contentUrl: `${config.baseUrl}/publications/globe-magazine-spring-2026.pdf`,
                  encodingFormat: "application/pdf",
                },
              },

              {
                "@type": "CreativeWork",
                "@id": `${config.baseUrl}/publications#eating-my-way-around-nice`,
                name: "Eating My Way Around Nice",
                author: {
                  "@id": `${config.baseUrl}#person`,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Globe Magazine",
                },
                datePublished: "2025-12",
                genre: ["Travel writing", "Food", "City travel"],
                about: {
                  "@type": "Place",
                  name: "Nice",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "FR",
                  },
                },
                isPartOf: {
                  "@type": "Periodical",
                  name: "Globe Magazine",
                },
                encoding: {
                  "@type": "MediaObject",
                  contentUrl: `${config.baseUrl}/publications/globe-magazine-winter-2025.pdf`,
                  encodingFormat: "application/pdf",
                },
              },

              {
                "@type": "CreativeWork",
                "@id":
                  "https://www.jamesmerriman.co.uk/publications#my-tehran-beyond-the-headlines",
                name: "My Tehran: Beyond the Headlines",
                author: {
                  "@id": "https://www.jamesmerriman.co.uk#person",
                },
                isPartOf: {
                  "@type": "Book",
                  name: "The Kindness of Strangers",
                  publisher: {
                    "@type": "Organization",
                    name: "Bradt Guides",
                    url: "https://www.bradtguides.com/",
                  },
                  url: "https://www.bradtguides.com/product/the-kindness-of-strangers/",
                },
                genre: ["Travel writing", "City travel", "Culture"],
                about: {
                  "@type": "Place",
                  name: "Tehran",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "IR",
                  },
                },
                url: "https://www.bradtguides.com/product/the-kindness-of-strangers/",
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Selected Publications by James Merriman"
        description="A curated selection of travel writing published in magazines, books, and external platforms."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Publications", href: "/publications" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none break-words blog-content">
            <p>
              In addition to work published on this site, I also write for magazines and external
              platforms. This page brings together a selection of travel writing that has appeared
              elsewhere, including commissioned features and edited excerpts available to download
              as PDFs.
            </p>

            <p>
              The writing featured here reflects themes explored throughout my work, including
              walking, landscape, history, food, and place. For further context, see the{" "}
              <Link href="/about">about page</Link>, or browse articles published on this site by
              theme on the <Link href="/category">categories page</Link>.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">Books &amp; anthologies</h2>

            <article className="mb-10">
              <h3 className="text-xl font-semibold">The Kindness of Strangers</h3>

              <p className="text-sm text-gray-600 mt-1">
                Published by <em>Bradt Guides</em> · Travel anthology
              </p>

              <p className="mt-3">
                A collection of travel writing exploring encounters with generosity and hospitality
                around the world. The book includes my piece,
                <em>“My Tehran: Beyond the Headlines”</em>, a street‑level portrait of the city
                shaped by walking, conversation, and everyday life in Tehran.
              </p>

              <p className="mt-3">
                <a
                  href="https://www.bradtguides.com/product/the-kindness-of-strangers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Purchase the book The Kindness of Strangers from Bradt Guides"
                >
                  Purchase the book from Bradt Guides
                </a>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                This work appears as part of a commercially published anthology. All rights are
                retained by the publisher and respective authors.
              </p>
            </article>

            <h2 className="mt-12 text-2xl font-semibold">Magazine writing</h2>

            <article className="mb-10">
              <h3 className="text-xl font-semibold">The Awakening of Leptis Magna</h3>

              <p className="text-sm text-gray-600 mt-1">
                <em>Globe Magazine</em> · Spring 2026 · Commissioned feature
              </p>

              <p className="mt-3">
                Explore the spectacular ruins of Leptis Magna in Libya. Uncover the Arch of
                Septimius Severus, ancient trader forums and a grand Roman amphitheatre.
              </p>

              <p className="mt-3">
                <a
                  href="/publications/globe-magazine-spring-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download PDF excerpt of The Awakening of Leptis Magna"
                >
                  Download PDF excerpt (Leptis Magna)
                </a>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                © Original publication and layout remain the copyright of <em>Globe Magazine</em>.
                This edited excerpt is shared here for illustrative and portfolio purposes only.
              </p>
            </article>

            <article className="mb-10">
              <h3 className="text-xl font-semibold">Eating My Way Around Nice</h3>

              <p className="text-sm text-gray-600 mt-1">
                <em>Globe Magazine</em> · Winter 2025 · Commissioned feature
              </p>

              <p className="mt-3">
                A culinary journey through Nice, France — Cours Saleya market, socca, pan bagnat and
                classic Niçoise flavours along the Côte d’Azur.
              </p>

              <p className="mt-3">
                <a
                  href="/publications/globe-magazine-winter-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download PDF excerpt of Eating My Way Around Nice"
                >
                  Download PDF excerpt (Nice)
                </a>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                © Original publication and layout remain the copyright of <em>Globe Magazine</em>.
                This edited excerpt is shared here for illustrative and portfolio purposes only.
              </p>
            </article>
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
