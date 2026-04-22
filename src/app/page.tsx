export const revalidate = 60; // 1 minute

import { Metadata } from "next";
import Link from "next/link";

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { wisp } from "@/lib/wisp";

import { FilterBar } from "../components/FilterBar";
import { FullWidthHeader } from "../components/FullWidthHeader";
import { config } from "../config";

/**
 * SEO‑optimised homepage metadata
 */

const ogImage = "/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Travel Writing & Documentary Photography | James Merriman",
  description:
    "Award‑longlisted travel writer and photographer documenting remote, complex and overlooked destinations across the world.",
  alternates: {
    canonical: config.baseUrl,
  },
  openGraph: {
    title: "Travel Writing & Documentary Photography | James Merriman",
    description:
      "Explore travel stories, documentary photography and cultural journeys from remote and overlooked places worldwide.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Writing & Documentary Photography | James Merriman",
    description:
      "Travel writing and photography from remote, complex and overlooked destinations across 160+ countries.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    ],
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

  /**
   * Breadcrumbs (UI + schema)
   */
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Latest Writing", href: page > 1 ? `?page=${page}` : "/" },
  ];

  /**
   * Structured data (JSON‑LD)
   */
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
      image: "/james-merriman-travel-writer.jpg",
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

    // Blog wrapper
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

    // ItemList (latest writing)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${config.baseUrl}#latest-writing`,
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
            { "@type": "Blog", "@id": `${config.baseUrl}#blog` },
            { "@type": "WebSite", "@id": `${config.baseUrl}#website` },
          ],
        },
      })),
      numberOfItems: result.posts.length,
      mainEntityOfPage: config.baseUrl,
    },

    // ✅ BreadcrumbList schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: `${config.baseUrl}${item.href}`,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FullWidthHeader
        title="Travel Writing and Photography from Remote & Overlooked Places"
        description="Award‑longlisted travel writer and photographer documenting culture, history and landscapes across 160+ countries"
        breadcrumb={breadcrumb}
      />

      <section className="container mx-auto my-8 max-w-6xl px-4 prose">
        <p className="mx-auto max-w-4xl text-center text-lg">
          This site presents the writing and photographic work of travel writer James Merriman. For
          a personal background, visit{" "}
          <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
            my biography
          </Link>
          , explore{" "}
          <Link href="/credentials" className="underline underline-offset-4 hover:text-foreground">
            my professional credentials
          </Link>
          , or view a selection of{" "}
          <Link href="/publications" className="underline underline-offset-4 hover:text-foreground">
            publications and commissioned work
          </Link>
          published beyond this site.
        </p>
      </section>

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
