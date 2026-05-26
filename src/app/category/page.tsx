export const dynamic = "force-dynamic";
export const revalidate = 60;

import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { config } from "@/config";
import { wisp } from "@/lib/wisp";

import { FullWidthHeader } from "../../components/FullWidthHeader";

const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Browse Travel Writing Categories | James Merriman",
  description:
    "Browse travel writing by category, including walking, coastal journeys, food experiences, history and pilgrimage stories from the UK and beyond.",
  alternates: {
    canonical: `${config.baseUrl}/category`,
  },
  openGraph: {
    type: "website",
    title: "Browse Travel Writing Categories | James Merriman",
    description:
      "Browse travel writing by category, including walking, coastal journeys, food experiences, history and pilgrimage stories.",
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
    title: "Browse Travel Writing Categories | James Merriman",
    description:
      "Explore long-form travel writing organised by theme, including walking, food, coastal journeys and pilgrimage.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Page() {
  const result = await wisp.getTags();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${config.baseUrl}/category#collectionpage`,
        url: `${config.baseUrl}/category`,
        name: "Travel Writing Categories | James Merriman",
        description:
          "Browse travel writing categories by James Merriman, including walking, pilgrimage, culture, food and history.",
        isPartOf: {
          "@id": `${config.baseUrl}#website`,
        },
        publisher: {
          "@id": `${config.baseUrl}#organization`,
          "@type": "Organization",
          name: "James Merriman",
        },
        mainEntity: {
          "@type": "ItemList",
          name: "Travel writing categories",
          itemListElement: result.tags.map((tag, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "DefinedTerm",
              "@id": `${config.baseUrl}/category/${tag.name}#term`,
              name: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
              url: `${config.baseUrl}/category/${tag.name}`,
              inDefinedTermSet: `${config.baseUrl}/category`,
            },
          })),
        },
        mainEntityOfPage: {
          "@id": `${config.baseUrl}/category`,
        },
        breadcrumb: {
          "@id": `${config.baseUrl}/category#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${config.baseUrl}/category#breadcrumb`,
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
            name: "Categories",
            item: `${config.baseUrl}/category`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FullWidthHeader
        title="Travel Writing Organised by Theme and Subject"
        description="Long‑form travel writing organised by theme, including walking, food, coastal journeys and historical writing"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/category" },
        ]}
      />

      <div className="container mx-auto text-xl px-4 mb-10 max-w-6xl">
        <div className="w-full max-w-full prose prose-lg wrap-break-word blog-content">
          <p className="mx-auto max-w-4xl text-center text-lg mt-8">
            These categories organise long-form travel writing drawn from first-hand journeys across
            the UK, Europe and further afield. Themes range from walking and pilgrimage to food,
            culture and local history, reflecting a slow, place-focused approach to travel.
          </p>

          <ul className="mt-4 flex flex-wrap gap-3 list-none p-0 justify-center">
            {result.tags.map((tag) => {
              const label = tag.name.charAt(0).toUpperCase() + tag.name.slice(1);

              return (
                <li key={tag.id}>
                  <Link
                    href={`/category/${tag.name}`}
                    aria-label={`View ${label} travel writing`}
                    className="inline-block hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
