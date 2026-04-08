export const revalidate = 60; // 1 minute

import { Metadata } from "next";

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";

import { FilterBar } from "../../../components/FilterBar";
import { FullWidthHeader } from "../../../components/FullWidthHeader";
import { config } from "../../../config";

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { tag } = params;
  const canonicalUrl = `${config.baseUrl}/category/${tag}`;

  return {
    title: `Explore ${tag} Adventures | Travel Blog by James Merriman`,
    description: `Discover James Merriman's immersive travel stories, photography and tips featuring ${tag}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Explore ${tag} Adventures | Travel Blog by James Merriman`,
      description: `Immersive travel stories, tips and photography featuring ${tag}.`,
      images: [getOgImageUrl(`${tag} travel`)],
    },
    twitter: {
      card: "summary_large_image",
      title: `Explore ${tag} Adventures | Travel Blog by James Merriman`,
      description: `Discover travel stories, photography and tips from James Merriman on ${tag}.`,
      images: [getOgImageUrl(`${tag} travel`)],
    },
  };
}

export default async function Page(props: {
  searchParams?: Promise<{ query: string; page: string }>;
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const { tag } = params;

  const searchParams = await props.searchParams;
  const category = config.categories.find((c) => c.tag === tag);
  const { label, description } = category || {
    label: `#${tag}`,
    description: `Immersive travel stories, tips and photography featuring ${tag}.`,
  };
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 6,
    tags: [tag],
    query: searchParams?.query,
    page,
  });

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${config.baseUrl}/category/${tag}`,
    url: `${config.baseUrl}/category/${tag}`,
    name: `${label} | James Merriman`,
    description,
    isPartOf: {
      "@type": "Blog",
      "@id": `${config.baseUrl}#blog`,
    },
    about: {
      "@type": "Thing",
      name: label.replace(/^#/, ""),
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: result.posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          "@id": `${config.baseUrl}/post/${post.slug}#article`,
          headline: post.title,
          url: `${config.baseUrl}/post/${post.slug}`,
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt || post.publishedAt || post.createdAt,

          author: {
            "@type": "Person",
            "@id": `${config.baseUrl}/about#author`,
            name: "James Merriman",
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
              "@type": "CollectionPage",
              "@id": `${config.baseUrl}/category/${tag}`,
            },
          ],
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${config.baseUrl}/category/${tag}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: config.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: `${config.baseUrl}/category`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${config.baseUrl}/category/${tag}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <FullWidthHeader
        title={label}
        description={description}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Category", href: `/category/` },
          { label, href: `/category/${tag}` },
        ]}
      />
      <main className="container mx-auto px-4 max-w-6xl" role="main">
        {/* Intro paragraph for SEO */}
        <p className="text-base text-muted-foreground px-4 my-8">
          Browse all blog posts tagged with {label}. Discover travel writing, stories and
          experiences covering walking, coastal, food, history, pilgrimage and global adventures.
        </p>

        <FilterBar active={tag} className="my-8 px-0" />
        <BlogPostList posts={result.posts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
          basePath={`/category/${tag}`}
        />
      </main>
    </>
  );
}
