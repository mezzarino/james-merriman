export const revalidate = 60;

import { wisp } from "@/lib/wisp";
import Link from "next/link";
import { FullWidthHeader } from "../../components/FullWidthHeader";
import { Metadata } from "next";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";

const pageTitle = "Browse Travel Writing by Category | James Merriman";
const pageDescription =
  "Explore travel writing by category, from coastal walks and food to history, pilgrimage, and global travel stories.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${config.baseUrl}/category`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [getOgImageUrl(pageTitle)],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [getOgImageUrl(pageTitle)],
  },
};

export default async function Page() {
  const result = await wisp.getTags();

  return (
    <>
      <FullWidthHeader
        title="Browse Travel Writing by Category"
        description="Explore travel writing by category, from coastal walks and food to history, pilgrimage, and global travel stories."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/category" },
        ]}
      />

      <main className="container mx-auto px-4 mb-10 max-w-6xl">
        <p className="mb-6 text-base text-muted-foreground max-w-2xl">
          Browse travel writing by theme, from quiet English villages and coastal walks to food, history, and journeys through remote parts of the world.
        </p>

        <ul className="flex flex-wrap gap-3 text-xl">
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/category/${tag.name}`}
                className="inline-block px-3 py-1 rounded-md bg-muted hover:bg-muted/70 transition-colors"
              >
                #{tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}