export const revalidate = 60; // 1 minute

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination, getPaginationJsonLd } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { FilterBar } from "../components/FilterBar";
import { FullWidthHeader } from "../components/FullWidthHeader";
import { config } from "../config";

export const metadata: Metadata = {
  title: `James Merriman Blog | Travel Writing & Photography`,
  description: `Explore travel stories, photography, and insights from James Merriman, covering remote destinations and cultural journeys worldwide.`,
  alternates: {
    canonical: config.baseUrl,
  },
  openGraph: {
    title: `James Merriman Blog | Travel Writing & Photography`,
    description: `Explore travel stories, photography, and insights from James Merriman.`,
    images: [getOgImageUrl("James Merriman Blog")],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `James Merriman Blog | Travel Writing & Photography`,
    description: `Travel writing and photography from remote, complex, and overlooked destinations across 160+ countries.`,
    images: [getOgImageUrl("James Merriman Blog")],
  },
};

export default async function Page(
  props: {
    searchParams?: Promise<{ query: string; page: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 6,
    query: searchParams?.query,
    page,
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${config.baseUrl}#website`,
      name: "James Merriman | Travel Writing & Photography",
      url: config.baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${config.baseUrl}/?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${config.baseUrl}/about#author`,
      name: "James Merriman",
      url: `${config.baseUrl}/about`,
      image:
        "https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg",
      sameAs: [
        "https://x.com/mezzarino",
        "https://linkedin.com/in/jamesmerriman",
        "https://instagram.com/mezzarino",
      ],
      jobTitle: "Travel Writer & Photographer",
      knowsAbout: [
        "Travel Writing",
        "Documentary Photography",
        "Remote Travel",
        "Conflict Zones",
        "Cultural Geography",
        "Walking",
      ],
    },
    // ✅ Pagination structured data
    getPaginationJsonLd({
      pagination: result.pagination,
      basePath: "/",
      query: searchParams?.query,
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FullWidthHeader title={config.title} description={config.description} />
      <main className="container mx-auto max-w-6xl" role="main">
        <FilterBar active="latest" className="my-8" />
        <BlogPostList posts={result.posts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
        />
      </main>
    </>
  );
}