import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { AuthorPortrait } from "@/components/ui/author-portrait";
import { config } from "@/config";

/**
 * About page metadata
 */
const ogImage = "/james-merriman-travel-writer.jpg";

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
                "@type": "ProfilePage",
                "@id": `${config.baseUrl}/about`,
                url: `${config.baseUrl}/about`,
                name: "About James Merriman",
                description:
                  "Biography and personal background of James Merriman, a UK-based travel writer exploring culture, geography and human experience worldwide.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                mainEntity: {
                  "@id": `${config.baseUrl}#person`,
                },
              },
              {
                "@type": "Person",
                "@id": `${config.baseUrl}#person`,
                name: "James Merriman",
                url: config.baseUrl,
                mainEntityOfPage: {
                  "@type": "ProfilePage",
                  "@id": `${config.baseUrl}/about`,
                },
                image: {
                  "@type": "ImageObject",
                  url: "https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg",
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
        title="About James Merriman — Travel Writer & Photographer"
        description="Biography and personal background of a British travel writer exploring culture, geography and human experience"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none break-words blog-content">
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
