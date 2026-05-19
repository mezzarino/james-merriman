import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FigureImage } from "@/components/FigureImage";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * About page metadata
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "About James Merriman, Travel Writer & Photographer",
  description:
    "Biography and personal background of James Merriman, a UK-based travel writer exploring culture, geography and human experience across the world.",
  alternates: {
    canonical: `${config.baseUrl}/about`,
  },
  openGraph: {
    type: "profile",
    title: "About James Merriman, Travel Writer & Photographer",
    description: "Biography and personal background of UK-based travel writer James Merriman.",
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
    title: "About James Merriman – Travel Writer & Photographer",
    description: "Biography and personal background of UK-based travel writer James Merriman.",
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
        id="about-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                "@id": `${config.baseUrl}/about#aboutpage`,
                url: `${config.baseUrl}/about`,
                name: "About James Merriman",
                description:
                  "Biography and personal background of James Merriman, a UK-based travel writer exploring culture, geography and human experience worldwide.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                mainEntity: {
                  "@id": `${config.baseUrl}#entity`,
                },
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: "https://www.jamesmerriman.co.uk/images/james-merriman.jpg",
                  width: 1200,
                  height: 1600,
                },
                breadcrumb: {
                  "@id": `${config.baseUrl}/about#breadcrumb`,
                },
              },
              {
                "@type": ["Person", "Organization"],
                "@id": `${config.baseUrl}#entity`,
                name: "James Merriman",
                url: config.baseUrl,
                mainEntityOfPage: {
                  "@type": "AboutPage",
                  "@id": `${config.baseUrl}/about#aboutpage`,
                },
                image: {
                  "@type": "ImageObject",
                  url: "/images/james-merriman.jpg",
                  width: 1200,
                  height: 1600,
                },
                description:
                  "UK-based travel writer and photographer documenting remote regions, cultural frontiers and human experience worldwide.",
                jobTitle: "Travel Writer and Photographer",
                hasOccupation: {
                  "@type": "Occupation",
                  name: "Travel Writer",
                  occupationLocation: {
                    "@type": "Country",
                    name: "Worldwide",
                  },
                },
                worksFor: {
                  "@id": `${config.baseUrl}#website`,
                },
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
                knowsAbout: [
                  "Travel Writing",
                  "Documentary Photography",
                  "Remote Travel",
                  "Cultural Geography",
                  "Walking and Exploration",
                ],
              },
              {
                "@type": "WebSite",
                "@id": `${config.baseUrl}#website`,
                url: config.baseUrl,
                name: "James Merriman | Travel Writing and Photography",
                publisher: {
                  "@id": `${config.baseUrl}#entity`,
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/about#breadcrumb`,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${config.baseUrl}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "About",
                    item: `${config.baseUrl}/about`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Biography and Background of Travel Writer James Merriman"
        description="Personal background and working practice of a British travel writer exploring culture, geography and human experience"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none wrap-break-word blog-content">
            <p>
              I am a British traveller and travel writer based in Devon, England. A Fellow of the
              Royal Geographical Society, I have travelled to{" "}
              <strong>164 countries across six continents</strong>, driven by a deep curiosity for
              landscape, culture and the stories that shape the world around us.{" "}
              <Link href="/credentials">View my professional credentials</Link>, read a selection of{" "}
              <Link href="/publications">published writing</Link>, or learn more about{" "}
              <Link href="/talks-presentations">talks and presentations</Link> drawn from field
              experience.
            </p>

            <p>
              My journeys have taken me from remote island nations to post‑conflict regions,
              exploring how geography, history and community intersect. Through my writing, I
              reflect on the textures of travel - the light, the language, the food, and the quiet
              human moments that define a destination beyond its map coordinates.
            </p>
            <p>
              Based in the Devon countryside, I continue to explore the world with the same enduring
              curiosity that shapes both my journeys and my writing.
            </p>
            <p>
              My writing and photography has been has been independently verified as human-origin by{" "}
              <a
                href="https://www.proudlyhuman.org/certified/james-merriman"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View the ProudlyHuman™ verification certificate for James Merriman"
              >
                ProudlyHuman™
              </a>
              .
            </p>
            <p>
              I am proud to be a{" "}
              <a
                href="https://oneplanetjourney.com/about/deep-travel-ambassadors/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Find out more about James Merriman's role as a One Planet Journey - Deep Travel Ambassador"
              >
                One Planet Journey - Deep Travel Ambassador
              </a>
              . Through my writing and my photography, I aim to show that taking the time to build
              local relationships provides a much more memorable experience than simply ticking off
              landmarks and guidebook checklists.{" "}
            </p>
          </div>
          <div className="w-full lg:w-1/3 pt-8 lg:pt-0 lg:pl-8">
            <FigureImage
              src="/images/james-merriman.jpg"
              alt="James Merriman, UK travel writer and photographer"
              caption="James Merriman, UK travel writer and photographer"
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
