import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { SocialLinks } from "@/components/ui/social-links";
import { config } from "@/config";

/**
 * About page metadata
 */
const ogImage = "/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "About James Merriman, Travel Writer & Photographer",
  description:
    "Learn about James Merriman, UK-based travel writer and photographer covering remote regions, conflict zones and cultural frontiers across 160+ countries.",
  alternates: {
    canonical: `${config.baseUrl}/about`,
  },
  openGraph: {
    type: "profile",
    title: "About James Merriman, Travel Writer & Photographer",
    description:
      "Biography, awards and professional background of UK-based travel writer and photographer James Merriman.",
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
    description:
      "Biography, awards and professional background of UK-based travel writer and photographer James Merriman.",
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
                "@type": "WebPage",
                "@id": `${config.baseUrl}/about`,
                url: `${config.baseUrl}/about`,
                name: "About James Merriman",
                description:
                  "Learn about James Merriman, UK-based travel writer and photographer covering remote regions, conflict zones and cultural frontiers across 160+ countries.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                about: {
                  "@id": `${config.baseUrl}/about#author`,
                },
                mainEntity: {
                  "@id": `${config.baseUrl}/about#author`,
                },
              },

              {
                "@type": "Person",
                "@id": `${config.baseUrl}/about#author`,
                name: "James Merriman",
                url: `${config.baseUrl}/about`,
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `${config.baseUrl}/about`,
                },
                image: {
                  "@type": "ImageObject",
                  url: "https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg",
                  width: 1200,
                  height: 1600,
                },
                description:
                  "UK-based travel writer and photographer documenting remote regions, conflict zones and cultural frontiers worldwide.",
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
                memberOf: [
                  {
                    "@type": "Organization",
                    name: "Royal Geographical Society",
                  },
                ],
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
                  "Conflict Zones",
                  "Cultural Geography",
                  "Walking and Exploration",
                ],
                award: {
                  "@type": "Award",
                  name: "Longlisted - Bradt Guides New Travel Writer of the Year",
                  awardDate: "2026",
                },
              },

              {
                "@type": "WebSite",
                "@id": `${config.baseUrl}#website`,
                url: config.baseUrl,
                name: "James Merriman | Travel Writing and Photography",
                publisher: {
                  "@id": `${config.baseUrl}/about#author`,
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
        title="About James Merriman, Travel Writer & Photographer"
        description="Biography, awards and professional background"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none break-words blog-content">
            <p>
              I am a British traveller and award‑longlisted travel writer based in Devon, England. A
              Fellow of the Royal Geographical Society, I have travelled to{" "}
              <strong>164 countries across six continents</strong>, driven by a deep curiosity for
              landscape, culture and the stories that shape the world around us.
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
            <h2>Awards, Nominations &amp; Professional Affiliations</h2>
            <h3>Awards &amp; Nominations</h3>
            <ul>
              <li>
                <strong>Longlisted</strong> -{" "}
                <em>Bradt Guides New Travel Writer of the Year 2026</em>
              </li>
            </ul>
            <h3>Professional Memberships &amp; Fellowships</h3>
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
            <h3>Selected Publications & Contributions</h3>
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
            <h4>Contact me</h4>
            <p>Please get in touch through any of the channels below.</p>
            <SocialLinks />
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
