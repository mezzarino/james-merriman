import Script from "next/script";

import { config } from "@/config";

const stories = [
  {
    slug: "afghanistan-anxious-explorer",
    title: "Afghanistan",
    subtitle: "The Anxious Explorer",
    image:
      "https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/cover.jpg",
  },
];

export const metadata = {
  title: "Stories | James Merriman",
  description: "Visual travel narratives by James Merriman.",

  openGraph: {
    title: "Stories | James Merriman",
    description: "Visual travel narratives by James Merriman.",
    url: "https://stories.jamesmerriman.co.uk/",
    siteName: "James Merriman",
    images: [
      {
        url: "https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/cover.jpg",
        width: 720,
        height: 1280,
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://stories.jamesmerriman.co.uk/",
  },

  twitter: {
    card: "summary_large_image",
    title: "Stories | James Merriman",
    description: "Visual travel narratives by James Merriman.",
    images: [
      "https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/cover.jpg",
    ],
  },
};

export default function StoriesPage() {
  return (
    <>
      {/* ✅ Structured Data */}
      <Script
        id="stories-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://stories.jamesmerriman.co.uk/#collectionpage",
                url: "https://stories.jamesmerriman.co.uk/",
                name: "Stories | James Merriman",
                description: "Visual travel stories and narratives by James Merriman.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                about: {
                  "@id": `${config.baseUrl}#person`,
                },
                publisher: {
                  "@id": `${config.baseUrl}#organization`,
                },
                mainEntity: {
                  "@type": "ItemList",
                  name: "Stories",
                  itemListElement: stories.map((story, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@id": `https://stories.jamesmerriman.co.uk/${story.slug}#article`,
                      url: `https://stories.jamesmerriman.co.uk/${story.slug}`,
                      name: `${story.title} — ${story.subtitle}`,
                    },
                  })),
                },
              },
            ],
          }),
        }}
      />

      {/* ✅ UI */}
      <main className="min-h-screen bg-linear-to-r from-blue-900 to-gray-900 text-white p-8">
        {/* Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-3">Visual Travel Stories</h1>
          <p className="text-white/80 text-base sm:text-lg">
            Documentary-style visual narratives from remote and complex destinations, captured by
            travel writer James Merriman.
          </p>
        </header>

        {/* Stories grid */}
        <section
          aria-label="Stories"
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {stories.map((story) => (
            <a key={story.slug} href={`/${story.slug}`} className="group focus:outline-none">
              <article className="relative rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm transition transform group-hover:-translate-y-1 group-hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-white/70">
                {/* Image */}
                <div
                  className="aspect-9/16 bg-cover bg-center"
                  style={{ backgroundImage: `url(${story.image})` }}
                />

                {/* ✅ Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="text-sm font-semibold leading-tight mb-1">{story.title}</h2>
                  <p className="text-xs text-white/80 mb-2">{story.subtitle}</p>

                  {/* ✅ Micro‑CTA */}
                  <span className="text-xs text-white/60 group-hover:text-white transition">
                    View story →
                  </span>
                </div>
              </article>
            </a>
          ))}
        </section>
      </main>
    </>
  );
}
