export const revalidate = 60; // 1 minute

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { FilterBar } from "../components/FilterBar";
import { FullWidthHeader } from "../components/FullWidthHeader";
import { config } from "../config";

export const metadata: Metadata = {
  title: `James Merriman Blog | Travel Writing & Photography`,
  description: `Explore travel stories, photography and insights from James Merriman, covering remote destinations and cultural journeys worldwide.`,
  alternates: {
    canonical: config.baseUrl,
  },
  openGraph: {
    title: `James Merriman Blog | Travel Writing & Photography`,
    description: `Explore travel stories, photography and insights from James Merriman.`,
    images: [getOgImageUrl("James Merriman Blog")],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `James Merriman Blog | Travel Writing & Photography`,
    description: `Travel writing and photography from remote, complex and overlooked destinations across 160+ countries.`,
    images: [getOgImageUrl("James Merriman Blog")],
  },
};

export default async function Page(props: {
  searchParams?: Promise<{ query: string; page: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const result = await wisp.getPosts({
    limit: 6,
    query: searchParams?.query,
    page,
  });

  // Breadcrumb array for UI & JSON-LD — only Home + Latest
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Latest", href: page > 1 ? `?page=${page}` : "/" },
  ];

  const jsonLd = [
    // WebSite
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
    // Person
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
    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        item: `${config.baseUrl}${crumb.href}`,
      })),
    },
    // ItemList + BlogPosting + Pagination
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: result.posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${config.baseUrl}/post/${post.slug}`,
        item: {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: `${config.baseUrl}/post/${post.slug}`,
          datePublished: post.publishedAt || post.createdAt,
          dateModified:
            post.updatedAt || post.publishedAt || post.createdAt,
          author: {
            "@type": "Person",
            name: post.author?.name || "James Merriman",
          },
          image: post.image
            ? [post.image]
            : [`${config.baseUrl}/placeholder.jpg`],
          mainEntityOfPage: `${config.baseUrl}/post/${post.slug}`,
        },
      })),
      numberOfItems: result.posts.length,
      mainEntityOfPage: `${config.baseUrl}${page > 1 ? `?page=${page}` : ""}`,
      ...(result.pagination.nextPage && {
        nextPage: `${config.baseUrl}?page=${result.pagination.nextPage}`,
      }),
      ...(result.pagination.prevPage && {
        previousPage: `${config.baseUrl}?page=${result.pagination.prevPage}`,
      }),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FullWidthHeader
        title={config.title}
        description={config.description}
        breadcrumb={breadcrumb}
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