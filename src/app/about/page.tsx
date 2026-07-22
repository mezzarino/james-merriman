import { Metadata } from "next";
import Link from "next/link";

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

const faqItems = [
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
];

const Page = async () => {
  return (
    <>
      {/* Structured data */}
      <script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                "@id": `${config.baseUrl}/about#aboutpage`,
                url: `${config.baseUrl}/about`,
                name: "About James Merriman: Travel Writer and Photographer",
                description:
                  "Personal background and fieldwork practice of a British and Irish travel writer and photographer documenting culture, geography and lived experience in over 160 countries.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                mainEntity: {
                  "@id": `${config.baseUrl}#person`,
                },
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman.jpg`,
                  contentUrl: `${config.baseUrl}/images/james-merriman.jpg`,
                  width: 1200,
                  height: 1600,
                },
                breadcrumb: {
                  "@id": `${config.baseUrl}/about#breadcrumb`,
                },
                speakable: {
                  "@type": "SpeakableSpecification",
                  cssSelector: ["#about-intro"],
                },
                publisher: {
                  "@id": `${config.baseUrl}#organization`,
                },
              },
              {
                "@type": "Person",
                "@id": `${config.baseUrl}#person`,
                name: "James Merriman",
                url: config.baseUrl,
                mainEntityOfPage: {
                  "@type": "AboutPage",
                  "@id": `${config.baseUrl}/about#aboutpage`,
                },
                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman.jpg`,
                  contentUrl: `${config.baseUrl}/images/james-merriman.jpg`,
                  width: 1200,
                  height: 1600,
                },
                description:
                  "British and Irish travel writer and photographer documenting culture, geography and lived experience in over 160 countries.",
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
                  "@id": `${config.baseUrl}#organization`,
                  "@type": "Organization",
                  name: "James Merriman",
                },
                affiliation: {
                  "@type": "Organization",
                  name: "Royal Geographical Society",
                },
                award: [
                  "Fellow of the Royal Geographical Society (FRGS)",
                  "NomadMania Verified Travel to 150+ UN Countries",
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
                  "https://mezzarino.substack.com",
                  "https://www.youtube.com/@jamesmerrimancouk",
                  "https://medium.com/@mezzarino",
                  "https://about.me/jamesmerriman",
                ],
                knowsAbout: [
                  "Travel Writing",
                  "Documentary Photography",
                  "Remote Travel",
                  "Cultural Geography",
                  "Walking and Exploration",
                ],
                subjectOf: [
                  {
                    "@type": "Article",
                    headline:
                      "James Merriman Visited 160 Countries Before He Realized That Wasn't the Point of Travel",
                    url: "https://intrepidtimes.com/2026/07/james-merriman-visited-160-countries-before-he-realized-that-wasnt-the-point-of-travel/",
                    publisher: {
                      "@type": "Organization",
                      name: "Intrepid Times",
                    },
                  },
                ],
              },
              {
                "@type": "WebSite",
                "@id": `${config.baseUrl}#website`,
                url: config.baseUrl,
                name: "James Merriman | Travel Writing and Photography",
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
        title="About James Merriman: Travel Writer and Photographer"
        description="Personal background and fieldwork practice of a British and Irish travel writer and photographer documenting culture and geography in over 160 countries."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none wrap-break-word blog-content">
            <p id="about-intro">
              I am a British and Irish travel writer and photographer based in Devon, England. A
              Fellow of the Royal Geographical Society, I have travelled to{" "}
              <strong>more than 160 countries across six continents</strong> and built a long-term
              body of work focused on geography, culture and lived experience.
            </p>

            <p>
              My travel record has been independently verified by{" "}
              <a
                href="https://nomadmania.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="James Merriman's travel record has been verified by NomadMania, one of the world's largest travel communities"
              >
                NomadMania
              </a>
              , one of the world&rsquo;s largest travel communities. After a detailed review of
              passport stamps, visas and supporting evidence, NomadMania verified my travel to more
              than 150 UN countries.
            </p>

            <p>
              My work ranges from long-form travel writing to documentary photography, often centred
              on overlooked or misunderstood places You can{" "}
              <Link href="/publications">read a selection of published writing</Link>,{" "}
              <Link href="/photography">explore my photography</Link> or{" "}
              <Link href="/credentials">learn more about my credentials</Link>.
            </p>

            <p>
              My work moves between remote island nations and post-conflict regions. I am primarily
              interested in how a specific geography dictates daily life. My writing relies on
              staying put and paying attention to the immediate surroundings. I document regional
              food cultures and record the everyday conversations that give a location its actual
              character.
            </p>
            <p>
              Based in the Devon countryside, I continue to explore the world with the same enduring
              curiosity that shapes both my journeys and my writing.
            </p>
            <p>
              My writing and photography have been independently verified as human-origin by{" "}
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
                One Planet Journey Deep Travel Ambassador
              </a>
              . Through my writing and photography, I aim to show that taking the time to build
              local relationships provides a more memorable experience than simply ticking off
              landmarks and guidebook checklists.{" "}
            </p>

            <h2>Interviews & Features</h2>

            <p>
              My work and approach to travel have also been featured in interviews and independent
              publications.
            </p>

            <ul>
              <li>
                <a
                  href="https://intrepidtimes.com/2026/07/james-merriman-visited-160-countries-before-he-realized-that-wasnt-the-point-of-travel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Listen to the Intrepid Times podcast"
                >
                  James Merriman Visited 160 Countries Before He Realized That Wasn&apos;t the Point
                  of Travel
                </a>{" "}
                — <em>Intrepid Times</em> (2026)
              </li>
            </ul>

            <p>
              I work on long-form travel features, essays and documentary photography projects. I am
              available for editorial commissions, talks and selected collaborations aligned with my
              work. Further information about commissioning new work is available on the{" "}
              <Link href="/commissions">commissions page</Link>. Details on photography usage and
              rights can be found on the <Link href="/licencing">licencing page</Link>.
            </p>

            <p>
              For all other enquiries, please <Link href="/contact">get in touch</Link>.
            </p>

            {/* Accessible, collapsible accordion (client component) */}
            {/* FAQ items are provided as plain data so the client component can render interactively */}
            <AccessibleAccordion items={faqItems} />

            {/* FAQPage structured data for Google */}
            <script
              id="about-faq-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqItems.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: item.answer,
                    },
                  })),
                }),
              }}
            />
          </div>
          <div className="w-full lg:w-1/3 pt-8 lg:pt-0 lg:pl-8">
            <FigureImage
              src="/images/james-merriman.jpg"
              alt="James Merriman, British and Irish travel writer and photographer"
              caption="James Merriman, British and Irish travel writer and photographer"
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
