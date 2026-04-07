import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { SocialLinks } from "@/components/ui/social-links";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";

export const metadata: Metadata = {
  title: `About James Merriman | Travel Writer & Photographer`,
  description: `Learn about James Merriman, UK-based travel writer and photographer covering remote regions, conflict zones and cultural frontiers across 160+ countries.`,
  alternates: {
    canonical: `${config.baseUrl}/about`,
  },
  openGraph: {
    type: "profile",
    title: `About James Merriman | Travel Writer & Photographer`,
    description: `Learn about James Merriman, UK-based travel writer and photographer covering remote regions, conflict zones and cultural frontiers across 160+ countries.`,
    images: [getOgImageUrl("About James Merriman")],
  },
};

const Page = async () => {
  return (
    <>
      <Script
        id="about-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              // WebPage
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

              // Person (Author)
              {
                "@type": "Person",
                "@id": `${config.baseUrl}/about#author`,
                name: "James Merriman",
                url: `${config.baseUrl}/about`,

                image:
                  "https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg",

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

                alumniOf: {
                  "@type": "Organization",
                  name: "Royal Geographical Society",
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
                  "Conflict Zones",
                  "Cultural Geography",
                  "Walking and Exploration",
                ],

                award: ["Longlisted – Bradt Guides New Travel Writer of the Year 2026"],
              },

              // WebSite
              {
                "@type": "WebSite",
                "@id": `${config.baseUrl}#website`,
                url: config.baseUrl,
                name: "James Merriman | Travel Writing and Photography",
                publisher: {
                  "@id": `${config.baseUrl}/about#author`,
                },
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="About James Merriman | Travel Writer & Photographer"
        description=""
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />
      <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none break-words blog-content">
            <p>
              I am a British traveller, award-longlisted writer and lead web developer based in
              Devon, England. I am a Fellow of the Royal Geographical Society and have visited 164
              countries across six continents, driven by a deep curiosity for landscape, culture and
              the stories that shape place.
            </p>
            <p>
              My journeys have taken me from remote island nations to post-conflict regions,
              exploring how geography, history and community intersect. Through my writing, I
              reflect on the textures of travel — the light, the language, the food, the quiet human
              moments that define a destination beyond its map coordinates.
            </p>
            <p>
              Alongside my work in travel and writing, I bring 20 years of experience as a web
              developer, delivering digital projects for global brands including BP, Castrol, Legal
              & General, Wrigley, Thatchers, Freederm and holidaycottages.co.uk. My technical
              background underpins my storytelling, combining structure and creativity in equal
              measure.
            </p>
            <p>
              Based in beautiful countryside, I continue to explore the world — and the evolving
              landscape of technology — with the same enduring curiosity.
            </p>
            <h2>Awards &amp; Nominations</h2>
            <p>Longlisted - Bradt Guides New Travel Writer of the Year 2026.</p>
            <h3>Contact me</h3>
            <p>Please get in touch through any of the below channels.</p>
            <SocialLinks />
          </div>
          <div className="w-full lg:w-1/3 pb-4 lg:pb-0 lg:pl-8">
            <figure>
              <Image
                src="https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg"
                alt="James Merriman, UK travel writer and documentary photographer"
                width={1200}
                height={1600}
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 1024px) 100vw, 384px"
                preload={true}
              />
              <figcaption className="mt-2 text-sm text-gray-500 text-center">
                James Merriman, UK travel writer and documentary photographer
              </figcaption>
            </figure>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
