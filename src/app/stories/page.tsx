import Link from "next/link";
import Script from "next/script";

import { config } from "@/config";

const stories = [
  {
    slug: "afghanistan-anxious-explorer",
    title: "Afghanistan",
    subtitle: "The Anxious Explorer",
    image:
      "https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/afghanistan/cover.jpg",
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
        url: "https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/afghanistan/cover.jpg",
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
      "https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/afghanistan/cover.jpg",
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
                "@id": `https://stories.jamesmerriman.co.uk/#collectionpage`,
                url: `https://stories.jamesmerriman.co.uk/`,
                name: "Stories | James Merriman",
                description: "Visual travel stories and narratives by James Merriman.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                about: {
                  "@id": `${config.baseUrl}#person`,
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
      <main
        style={{
          minHeight: "100vh",
          padding: "2rem",
          background: "#000",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Stories</h1>

        <p style={{ marginBottom: "2rem", opacity: 0.8 }}>Short visual travel narratives</p>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {stories.map((story) => (
            <Link key={story.slug} href={`/${story.slug}`}>
              <div
                style={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#111",
                }}
              >
                <div
                  style={{
                    aspectRatio: "9 / 16",
                    backgroundImage: `url('${story.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div style={{ padding: "0.75rem" }}>
                  <h2
                    style={{
                      fontSize: "1rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {story.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.7,
                    }}
                  >
                    {story.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
