import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FigureImage } from "@/components/FigureImage";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Publications page metadata
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Publications | James Merriman - Travel Writer",
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

const publications = [
  { id: "buzkashi-the-rules-of-the-game" },
  { id: "awakening-of-leptis-magna" },
  { id: "eating-my-way-around-nice" },
  { id: "my-tehran-beyond-the-headlines" },
  {
    id: "guardian-beach-bars",
    external: true,
    url: "https://www.theguardian.com/travel/2026/may/08/readers-tips-favourite-beach-bars-uk-and-europe#james-merriman",
  },
  {
    id: "afghanistan-adventure-dust-mountains-and-buzkashi",
    external: true,
    url: "https://lupinetravel.co.uk/afghanistan-adventure-dust-mountains-and-buzkashi/",
  },
];

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
              // ✅ Collection page
              {
                "@type": "CollectionPage",
                "@id": `${config.baseUrl}/publications#collectionpage`,
                url: `${config.baseUrl}/publications`,
                name: "Selected Publications | James Merriman",
                description:
                  "A selection of travel writing, reportage and fieldwork by British and Irish travel writer James Merriman, published in international magazines, guidebooks and national newspapers.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                about: {
                  "@id": `${config.baseUrl}#person`,
                },
                publisher: {
                  "@id": `${config.baseUrl}#organization`,
                  "@type": "Organization",
                  name: "James Merriman",
                },
                mainEntity: {
                  "@type": "ItemList",
                  name: "Publications by James Merriman",
                  itemListElement: publications.map((pub, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@id": pub.external ? pub.url : `${config.baseUrl}/publications#${pub.id}`,
                    },
                  })),
                },
                mainEntityOfPage: {
                  "@id": `${config.baseUrl}/publications#collectionpage`,
                },
                breadcrumb: {
                  "@id": `${config.baseUrl}/publications#breadcrumb`,
                },
              },

              // ✅ Breadcrumbs
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/publications#breadcrumb`,
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

              // ✅ Article (Globe Magazine - Summer 2026)
              {
                "@type": "Article",
                "@id": `${config.baseUrl}/publications#buzkashi-the-rules-of-the-game`,
                headline: "Buzkashi: the rules of the game",
                name: "Buzkashi: the rules of the game",

                author: {
                  "@id": `${config.baseUrl}#person`,
                  "@type": "Person",
                  name: "James Merriman",
                  url: config.baseUrl,
                },

                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  contentUrl: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  width: 1200,
                  height: 630,
                },

                publisher: {
                  "@type": "Organization",
                  name: "Globe Magazine",
                  url: "https://globetrotters.co.uk/members/globe.html",
                },
                datePublished: "2026-07-05T00:00:00+00:00",
                about: {
                  "@type": "Place",
                  name: "Mazar-e-Sharif",
                },
                isPartOf: {
                  "@type": "PublicationIssue",
                  name: "Globe Magazine – Summer 2026",
                  isPartOf: {
                    "@type": "Periodical",
                    name: "Globe Magazine",
                  },
                },
                mainEntityOfPage: {
                  "@id": `${config.baseUrl}/publications#collectionpage`,
                },
                encoding: {
                  "@type": "MediaObject",
                  contentUrl: `${config.baseUrl}/publications/globe-magazine-summer-2026.pdf`,
                  encodingFormat: "application/pdf",
                },
              },

              // ✅ Article (Globe Magazine - Spring 2026)
              {
                "@type": "Article",
                "@id": `${config.baseUrl}/publications#awakening-of-leptis-magna`,
                headline: "The Awakening of Leptis Magna",
                name: "The Awakening of Leptis Magna",

                author: {
                  "@id": `${config.baseUrl}#person`,
                  "@type": "Person",
                  name: "James Merriman",
                  url: config.baseUrl,
                },

                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  contentUrl: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  width: 1200,
                  height: 630,
                },

                publisher: {
                  "@type": "Organization",
                  name: "Globe Magazine",
                  url: "https://globetrotters.co.uk/members/globe.html",
                },
                datePublished: "2026-03-01T00:00:00+00:00",
                about: {
                  "@type": "Place",
                  name: "Leptis Magna",
                },
                isPartOf: {
                  "@type": "PublicationIssue",
                  name: "Globe Magazine – Spring 2026",
                  isPartOf: {
                    "@type": "Periodical",
                    name: "Globe Magazine",
                  },
                },
                mainEntityOfPage: {
                  "@id": `${config.baseUrl}/publications#collectionpage`,
                },
                encoding: {
                  "@type": "MediaObject",
                  contentUrl: `${config.baseUrl}/publications/globe-magazine-spring-2026.pdf`,
                  encodingFormat: "application/pdf",
                },
              },

              // ✅ Article (Globe Magazine - Winter 2025)
              {
                "@type": "Article",
                "@id": `${config.baseUrl}/publications#eating-my-way-around-nice`,
                headline: "Eating My Way Around Nice",
                name: "Eating My Way Around Nice",

                author: {
                  "@id": `${config.baseUrl}#person`,
                  "@type": "Person",
                  name: "James Merriman",
                  url: config.baseUrl,
                },

                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  contentUrl: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  width: 1200,
                  height: 630,
                },

                publisher: {
                  "@type": "Organization",
                  name: "Globe Magazine",
                  url: "https://globetrotters.co.uk/members/globe.html",
                },
                datePublished: "2025-12-01T00:00:00+00:00",
                about: {
                  "@type": "Place",
                  name: "Nice",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "FR",
                  },
                },
                isPartOf: {
                  "@type": "PublicationIssue",
                  name: "Globe Magazine – Winter 2025",
                  isPartOf: {
                    "@type": "Periodical",
                    name: "Globe Magazine",
                  },
                },
                mainEntityOfPage: {
                  "@id": `${config.baseUrl}/publications#collectionpage`,
                },
                encoding: {
                  "@type": "MediaObject",
                  contentUrl: `${config.baseUrl}/publications/globe-magazine-winter-2025.pdf`,
                  encodingFormat: "application/pdf",
                },
              },

              // ✅ Chapter (Bradt book)
              {
                "@type": "Chapter",
                "@id": `${config.baseUrl}/publications#my-tehran-beyond-the-headlines`,
                name: "My Tehran: Beyond the Headlines",
                headline: "My Tehran: Beyond the Headlines",

                author: {
                  "@id": `${config.baseUrl}#person`,
                  "@type": "Person",
                  name: "James Merriman",
                  url: config.baseUrl,
                },

                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  contentUrl: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  width: 1200,
                  height: 630,
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

              // ✅ NewsArticle (Lupine Travel)
              {
                "@type": "NewsArticle",
                "@id": "https://lupinetravel.co.uk/afghanistan-adventure-dust-mountains-and-buzkashi/",
                headline: "Afghanistan Adventure: Dust, Mountains and Buzkashi",
                name: "Afghanistan Adventure: Dust, Mountains and Buzkashi",

                author: {
                  "@id": `${config.baseUrl}#person`,
                  "@type": "Person",
                  name: "James Merriman",
                  url: config.baseUrl,
                },

                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  contentUrl: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  width: 1200,
                  height: 630,
                },

                publisher: {
                  "@type": "Organization",
                  name: "Lupine Travel",
                  url: "https://lupinetravel.co.uk/",
                },
                datePublished: "2026-07-22T00:00:00+00:00",
                about: {
                  "@type": "Place",
                  name: "Afghanistan",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "AF",
                  },
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": "https://lupinetravel.co.uk/afghanistan-adventure-dust-mountains-and-buzkashi/",
                },
                url: "https://lupinetravel.co.uk/afghanistan-adventure-dust-mountains-and-buzkashi/",
              },

              // ✅ NewsArticle (Guardian)
              {
                "@type": "NewsArticle",
                "@id":
                  "https://www.theguardian.com/travel/2026/may/08/readers-tips-favourite-beach-bars-uk-and-europe#james-merriman",
                headline: "Readers' favourite beach bars in Europe",
                name: "Readers' favourite beach bars in Europe",

                author: {
                  "@id": `${config.baseUrl}#person`,
                  "@type": "Person",
                  name: "James Merriman",
                  url: config.baseUrl,
                },

                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  contentUrl: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  width: 1200,
                  height: 630,
                },

                publisher: {
                  "@type": "Organization",
                  name: "The Guardian",
                  url: "https://www.theguardian.com/",
                },
                datePublished: "2026-05-08T00:00:00+00:00",
                about: {
                  "@type": "Place",
                  name: "Matala, Crete",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "GR",
                  },
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id":
                    "https://www.theguardian.com/travel/2026/may/08/readers-tips-favourite-beach-bars-uk-and-europe",
                },
                url: "https://www.theguardian.com/travel/2026/may/08/readers-tips-favourite-beach-bars-uk-and-europe",
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Travel Writing Published in Books, Magazines and Journals"
        description="A selected body of travel writing published internationally across magazines, books and specialist platforms"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Publications", href: "/publications" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none wrap-break-word blog-content">
            <p>
              In addition to work published on this site, I also write for magazines and external
              platforms. This page brings together a selection of travel writing that has appeared
              elsewhere, including commissioned features and edited excerpts available to download
              as PDFs.
            </p>

            <p>
              The writing featured here reflects themes explored throughout my work, including
              walking, landscape, history, food and place. For further context, see the{" "}
              <Link href="/about">about page</Link>, or browse articles published on this site by
              theme on the <Link href="/category">categories page</Link>.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">Websites &amp; online platforms</h2>

            <article className="mb-10">
              <h3 className="text-xl font-semibold">Afghanistan Adventure: Dust, Mountains and Buzkashi</h3>

              <p className="text-sm text-gray-600 mt-1">
                <em>Lupine Travel</em> · July 2026 · Published feature
              </p>

              <p className="mt-3">
                A first-hand account of travel through Afghanistan, tracing the country’s dust,
                mountain landscapes and the intensity of buzkashi as both spectacle and cultural
                ritual.
              </p>

              <p className="mt-3">
                <a
                  href="https://lupinetravel.co.uk/afghanistan-adventure-dust-mountains-and-buzkashi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Read the article on Lupine Travel website"
                >
                  Read the article on Lupine Travel
                </a>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                © Original publication remains the copyright of <em>Lupine Travel</em>.
              </p>
            </article>

            <h2 className="mt-12 text-2xl font-semibold">Newspapers</h2>

            <article className="mb-10">
              <h3 className="text-xl font-semibold">
                Readers&apos; favourite beach bars in Europe
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                <em>The Guardian</em> · May 2026 · Featured contribution
              </p>

              <p className="mt-3">
                A published contribution detailing the atmosphere, local food and sunset views at
                Petra &amp; Votsalo taverna in Matala on the southern coast of Crete.
              </p>

              <p className="mt-3">
                <a
                  href="https://www.theguardian.com/travel/2026/may/08/readers-tips-favourite-beach-bars-uk-and-europe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Read the article on The Guardian website"
                >
                  Read the feature on The Guardian
                </a>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                © Original publication remains the copyright of{" "}
                <em>Guardian News &amp; Media Limited</em>.
              </p>
            </article>

            <h2 className="mt-12 text-2xl font-semibold">Books &amp; anthologies</h2>

            <article className="mb-10">
              <h3 className="text-xl font-semibold">The Kindness of Strangers</h3>

              <p className="text-sm text-gray-600 mt-1">
                Published by <em>Bradt Guides</em> · Travel anthology
              </p>

              <p className="mt-3">
                A collection of travel writing exploring encounters with generosity and hospitality
                around the world. The book includes my piece,{" "}
                <Link href="/post/my-tehran-beyond-the-headlines">
                  <em>“My Tehran: Beyond the Headlines”</em>
                </Link>
                , a street-level portrait of the city shaped by walking, conversation and everyday
                life in Tehran.
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
              <h3 className="text-xl font-semibold">Buzkashi: the rules of the game</h3>

              <p className="text-sm text-gray-600 mt-1">
                <em>Globe Magazine</em> · Summer 2026 · Commissioned feature
              </p>

              <p className="mt-3">
                Experience the intensity of Buzkashi, Afghanistan’s national sport, as riders battle
                on horseback through dust, chaos and fierce competition in a vivid first-hand
                account from Mazar-e-Sharif.
              </p>

              <p className="mt-3">
                <a
                  href="/publications/globe-magazine-summer-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Download PDF excerpt of Buzkashi: the rules of the game"
                >
                  Download PDF excerpt (Mazar-e-Sharif)
                </a>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                © Original publication and layout remain the copyright of <em>Globe Magazine</em>.
                The PDF excerpt is shared for portfolio purposes. The blog version is an adapted
                author’s cut.
              </p>
            </article>

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
                  className="block"
                  aria-label="Download PDF excerpt of The Awakening of Leptis Magna"
                >
                  Download PDF excerpt (Leptis Magna)
                </a>

                <Link
                  href="/post/the-awakening-of-leptis-magna"
                  aria-label="Read The Awakening of Leptis Magna on the blog"
                  className="block"
                >
                  Read my Leptis Magna feature
                </Link>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                © Original publication and layout remain the copyright of <em>Globe Magazine</em>.
                The PDF excerpt is shared for portfolio purposes. The blog version is an adapted
                author’s cut.
              </p>
            </article>

            <article className="mb-10">
              <h3 className="text-xl font-semibold">Eating My Way Around Nice</h3>

              <p className="text-sm text-gray-600 mt-1">
                <em>Globe Magazine</em> · Winter 2025 · Commissioned feature
              </p>

              <p className="mt-3">
                A culinary journey through Nice, France: Cours Saleya market, socca, pan bagnat and
                classic Niçoise flavours along the Côte d’Azur.
              </p>

              <p className="mt-3">
                <a
                  href="/publications/globe-magazine-winter-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Download PDF excerpt of Eating My Way Around Nice"
                >
                  Download PDF excerpt (Nice)
                </a>
                <Link
                  href="/post/eating-my-way-through-nice"
                  aria-label="Read Eating My Way Around Nice on the blog"
                  className="block"
                >
                  Read my culinary journey through Nice
                </Link>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                © Original publication and layout remain the copyright of <em>Globe Magazine</em>.
                The PDF excerpt is shared for portfolio purposes. The blog version is an adapted
                author’s cut.
              </p>
            </article>
          </div>
          <div className="w-full lg:w-1/3 pt-8 lg:pt-0 lg:pl-8">
            <FigureImage
              src="/images/james-merriman-afghanistan.jpg"
              alt="James Merriman in Afghanistan, near Mazar-e-Sharif"
              caption="James Merriman in Afghanistan, near Mazar-e-Sharif"
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
