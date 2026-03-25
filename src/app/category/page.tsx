export const dynamic = "force-dynamic";
export const revalidate = 60;

import { wisp } from "@/lib/wisp";
import Link from "next/link";
import { FullWidthHeader } from "../../components/FullWidthHeader";
import { Metadata } from "next";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";

export const metadata: Metadata = {
  title: `Browse Travel Blog Categories | James Merriman`,
  description: `Browse travel writing by category, including walking, coastal journeys, food experiences, history, and pilgrimage stories from the UK and beyond.`,
  keywords: [
    "travel writing",
    "travel blog categories",
    "walking routes UK",
    "coastal travel UK",
    "food travel writing",
    "historical travel",
    "pilgrimage journeys",
  ],
   alternates: {
    canonical: `${config.baseUrl}/category`,
  },
  openGraph: {
    type: "website",
    title: `Browse Travel Blog Categories | James Merriman`,
    description: `Browse travel writing by category, including walking, coastal journeys, food experiences, history, and pilgrimage stories.`,
    images: [getOgImageUrl("Blog Categories")],
  },
};

export default async function Page() {
  const result = await wisp.getTags();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Travel Blog Categories",
            description:
              "Browse travel writing by category including walking, food, coastal and historical journeys.",
            url: `${config.baseUrl}/category`,
          }),
        }}
      />

      <FullWidthHeader
        title="Browse Travel Writing by Category | James Merriman"
        description="Explore travel writing by category, including walking, food, coastal, and historical stories."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Category", href: `/category/` },
        ]}
      />
      <div className="container mx-auto text-xl px-4 mb-10 max-w-6xl">
        <div className="w-full max-w-full prose prose-lg break-words blog-content mt-8">
          <p>
            Browse travel writing by category, from coastal walks and countryside villages to food, history, and personal reflections. These pieces are drawn from journeys across the UK and further afield, each grounded in first-hand experience and a strong sense of place.
          </p>

          <ul className="mt-4 flex flex-wrap gap-3 list-none p-0">
            {result.tags.map((tag) => (
              <li key={tag.id}>
                <Link
                  href={`/category/${tag.name}`}
                  aria-label={`View articles in ${tag.name}`}
                  className="inline-block hover:underline"
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}