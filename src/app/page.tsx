export const revalidate = 60; // 1 minute

import { Metadata } from "next";

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";

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
      name: "James Merriman | Travel Writing and Photography",
      url: config.baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${config.baseUrl}/?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },

    // Person (Author / Publisher)
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${config.baseUrl}/about#author`,
      name: "James Merriman",
      url: `${config.baseUrl}/about`,
      image: "https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg",
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
      worksFor: {
        "@id": `${config.baseUrl}#website`,
      },
    },

    // Blog (content collection wrapper)
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${config.baseUrl}#blog`,
      name: "James Merriman – Travel Writing",
      url: config.baseUrl,
      publisher: {
        "@type": "Person",
        "@id": `${config.baseUrl}/about#author`,
        name: "James Merriman",
      },
      blogPost: result.posts.map((post) => ({
        "@id": `${config.baseUrl}/post/${post.slug}#article`,
      })),
    },

    // ItemList of recent BlogPosts
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${config.baseUrl}#latest-posts`,
      itemListElement: result.posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          "@id": `${config.baseUrl}/post/${post.slug}#article`,
          headline: post.title,
          description: post.description,
          url: `${config.baseUrl}/post/${post.slug}`,
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt || post.publishedAt || post.createdAt,

          author: {
            "@type": "Person",
            "@id": `${config.baseUrl}/about#author`,
            name: post.author?.name || "James Merriman",
          },

          publisher: {
            "@type": "Person",
            "@id": `${config.baseUrl}/about#author`,
            name: "James Merriman",
          },

          image: post.image ? [post.image] : undefined,

          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${config.baseUrl}/post/${post.slug}`,
          },

          isPartOf: [
            {
              "@type": "Blog",
              "@id": `${config.baseUrl}#blog`,
            },
            {
              "@type": "WebSite",
              "@id": `${config.baseUrl}#website`,
            },
          ],
        },
      })),
      numberOfItems: result.posts.length,
      mainEntityOfPage: config.baseUrl,
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
