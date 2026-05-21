import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AccessibleAccordion from "@/components/AccessibleAccordion";

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
            {/* Accessible, collapsible accordion (client component) */}
            {
              /* FAQ items are provided as plain data so the client component can render interactively */
            }
            <AccessibleAccordion
              items={[
                {
                  question:
                    "You have visited over 160 countries, yet you advocate for ‘Deep Travel’. How do those two concepts fit together?",
                  answer:
                    "When I first started exploring, the goal was sheer volume. I wanted to cover as much of the map as possible. Over time, that impulse completely faded. Visiting a vast number of places gave me a solid geographical baseline, but I found the best stories surfaced when I slowed down. Being a Deep Travel Ambassador is about advocating for that shift. The most rewarding material always comes from staying put, ordering a coffee and having a genuine conversation with the person next to you.",
                },
                {
                  question:
                    "Your work often takes you to post-conflict regions. What draws you to these specific areas?",
                  answer:
                    "I want to see what daily life looks like after the global news cycle moves on. Destinations like Afghanistan and Libya are often reduced to a single narrative of instability. Arriving on the ground usually reveals a completely different reality. You find normal routines, immense resilience and some of the most generous hospitality imaginable. I prefer writing about those human interactions over political analysis.",
                },
                {
                  question: "Do you consider yourself a writer who takes photos or a photographer who writes?",
                  answer:
                    "I see them as the same process. I always carry a camera alongside my notebook. Taking a photograph forces me to stand still and study the physical geometry of a place. Once I have framed the shot, I use the notebook to record the context. The image captures the light and the architecture, while the writing documents the dialogue. They rely entirely on each other.",
                },
                {
                  question: "Why choose to base yourself in Devon when you travel so extensively?",
                  answer:
                    "Fieldwork is intense. It involves constant observation, navigating unfamiliar logistics and carrying a lot of equipment. When an assignment finishes, I need a complete contrast. Coming back to the South West gives me the physical distance required to review my notes and actually piece a feature together. A long run in the Devon countryside is usually the easiest way to prepare for a challenging trip.",
                },
                {
                  question: "What is your best advice for people wanting to travel more meaningfully?",
                  answer:
                    "Leave empty space in your schedule. Over-planning kills spontaneity. If you map out every hour of a trip, you eliminate the chance for an unexpected detour or an unplanned meal with a local family. One of my favourite habits is waking up early to see how a city actually functions without the traffic or tourist numbers. Just get lost in a neighbourhood and see what happens.",
                },
              ]}
            />

            {/* FAQPage structured data for Google */}
            <Script
              id="about-faq-schema"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "You have visited over 160 countries, yet you advocate for ‘Deep Travel’. How do those two concepts fit together?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "When I first started exploring, the goal was sheer volume. I wanted to cover as much of the map as possible. Over time, that impulse completely faded. Visiting a vast number of places gave me a solid geographical baseline, but I found the best stories surfaced when I slowed down. Being a Deep Travel Ambassador is about advocating for that shift. The most rewarding material always comes from staying put, ordering a coffee and having a genuine conversation with the person next to you."
                      }
                    },
                    {
                      "@type": "Question",
                      name: "Your work often takes you to post-conflict regions. What draws you to these specific areas?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "I want to see what daily life looks like after the global news cycle moves on. Destinations like Afghanistan and Libya are often reduced to a single narrative of instability. Arriving on the ground usually reveals a completely different reality. You find normal routines, immense resilience and some of the most generous hospitality imaginable. I prefer writing about those human interactions over political analysis."
                      }
                    },
                    {
                      "@type": "Question",
                      name: "Do you consider yourself a writer who takes photos or a photographer who writes?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "I see them as the same process. I always carry a camera alongside my notebook. Taking a photograph forces me to stand still and study the physical geometry of a place. Once I have framed the shot, I use the notebook to record the context. The image captures the light and the architecture, while the writing documents the dialogue. They rely entirely on each other."
                      }
                    },
                    {
                      "@type": "Question",
                      name: "Why choose to base yourself in Devon when you travel so extensively?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Fieldwork is intense. It involves constant observation, navigating unfamiliar logistics and carrying a lot of equipment. When an assignment finishes, I need a complete contrast. Coming back to the South West gives me the physical distance required to review my notes and actually piece a feature together. A long run in the Devon countryside is usually the easiest way to prepare for a challenging trip."
                      }
                    },
                    {
                      "@type": "Question",
                      name: "What is your best advice for people wanting to travel more meaningfully?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Leave empty space in your schedule. Over-planning kills spontaneity. If you map out every hour of a trip, you eliminate the chance for an unexpected detour or an unplanned meal with a local family. One of my favourite habits is waking up early to see how a city actually functions without the traffic or tourist numbers. Just get lost in a neighbourhood and see what happens."
                      }
                    }
                  ]
                })
              }}
            />
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
