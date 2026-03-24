export const revalidate = 60; // 1 minute

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { FilterBar } from "../components/FilterBar";
import { FullWidthHeader } from "../components/FullWidthHeader";
import { config } from "../config";

const pageTitle = "James Merriman | Travel Writer & Photographer";
const pageDescription =
  "Travel writing and photography from remote, complex, and overlooked destinations across 160+ countries.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: config.baseUrl,
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

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const result = await wisp.getPosts({
    limit: 6,
    query: searchParams?.query,
    page,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: pageTitle,
    url: config.baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${config.baseUrl}/?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FullWidthHeader
        title="Travel Writer & Photographer"
        description="Stories and photography from remote, complex, and overlooked places."
      />

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