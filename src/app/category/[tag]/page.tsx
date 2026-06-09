export const revalidate = 60; // 1 minute

import { Metadata } from "next";
import { redirect } from "next/navigation";
import Script from "next/script";

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { wisp } from "@/lib/wisp";

import { FilterBar } from "../../../components/FilterBar";
import { FullWidthHeader } from "../../../components/FullWidthHeader";
import { config } from "../../../config";

/**
 * Helper: capitalise first letter of a string
 */
const capitalise = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Metadata per category
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await props.params;
  const canonicalUrl = `${config.baseUrl}/category/${tag}`;

  const category = config.categories.find((c) => c.tag === tag);
  const label = category?.label ?? capitalise(tag);
  const description =
    category?.description ??
    `${label}-related travel writing exploring culture, place and lived experience.`;

  return {
    title: `${label} Travel Writing | James Merriman`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: `${label} Travel Writing | James Merriman`,
      description,
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
      title: `${label} Travel Writing | James Merriman`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page(props: {
  searchParams?: Promise<{ query: string; page: string }>;
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await props.params;
  const searchParams = await props.searchParams;

  const category = config.categories.find((c) => c.tag === tag);
  const label = category?.label ?? capitalise(tag);
  const description =
    category?.description ??
    `${label}-related travel writing exploring culture, place and lived experience.`;

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  if (page === 1 && searchParams?.page) {
    redirect(`/category/${tag}`);
  }

  const result = await wisp.getPosts({
    limit: 6,
    tags: [tag],
    query: searchParams?.query,
    page,
  });

  /**
   * Category schema
   */
  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${config.baseUrl}/category/${tag}#collectionpage`,
    url: `${config.baseUrl}/category/${tag}`,
    name: `${label} – Travel Writing and Photography | James Merriman`,
    description,
    isPartOf: {
      "@id": `${config.baseUrl}#website`,
    },
    about: {
      "@type": "DefinedTerm",
      "@id": `${config.baseUrl}/category/${tag}#term`,
      name: label,
      description,
      url: `${config.baseUrl}/category/${tag}`,
      inDefinedTermSet: `${config.baseUrl}/category`,
    },
    mainEntity: {
      "@type": "ItemList",
      name: `${label} articles`,
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
            "@id": `${config.baseUrl}#person`,
            "@type": "Person",
            name: "James Merriman",
            url: config.baseUrl,
          },
          publisher: {
            "@id": `${config.baseUrl}#organization`,
            "@type": "Organization",
            name: "James Merriman",
          },
          image: post.image ? [post.image] : undefined,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${config.baseUrl}/post/${post.slug}#webpage`,
          },
          isPartOf: [
            {
              "@type": "Blog",
              "@id": `${config.baseUrl}#blog`,
            },
            {
              "@id": `${config.baseUrl}/category/${tag}#collectionpage`,
            },
          ],
        },
      })),
    },
    breadcrumb: {
      "@id": `${config.baseUrl}/category/${tag}#breadcrumb`,
    },
  };

  /**
   * Breadcrumb schema
   */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${config.baseUrl}/category/${tag}#breadcrumb`,
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
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@graph": [categoryJsonLd, breadcrumbJsonLd],
          }),
        }}
      />

      <FullWidthHeader
        title={`${label} Writing and Documentary Photography from the Field`}
        description={description}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Category", href: "/category" },
          { label, href: `/category/${tag}` },
        ]}
      />

      <main className="container mx-auto px-4 max-w-6xl" id="main" tabIndex={-1}>
        {/* Editorial intro for SEO */}
        <p className="mx-auto max-w-4xl text-center text-lg my-8 prose">
          These {capitalise(tag)}‑related travel stories explore how place, culture and everyday
          life intersect on the road — from landscapes and local encounters to the quieter moments
          that reveal a destination beyond its surface.
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
