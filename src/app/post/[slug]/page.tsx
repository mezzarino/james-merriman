export const revalidate = 60; // 1 minute

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { BlogContent } from "@/components/BlogContent";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { getReadingTimeFromHtml } from "@/lib/readingTime";
import { wisp } from "@/lib/wisp";

interface Params {
  slug: string;
}

/**
 * Article-level metadata (SEO + social)
 */
export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await props.params;

  const result = await wisp.getPost(slug);
  if (!result.post) {
    return { title: "Page not found" };
  }

  const canonicalUrl = `${config.baseUrl}/post/${slug}`;

  return {
    title: `${result.post.title} | James Merriman`,
    description:
      result.post.description ??
      `A narrative travel essay by James Merriman exploring ${result.post.title}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${result.post.title} | James Merriman`,
      description: result.post.description ?? "",
      images: [result.post.image || getOgImageUrl(result.post.title)],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: result.post.title,
      description: result.post.description ?? `Travel writing by James Merriman.`,
      images: [result.post.image || getOgImageUrl(result.post.title)],
    },
  };
}

export default async function BlogPost(props: { params: Promise<Params> }) {
  const { slug } = await props.params;

  const [result, related] = await Promise.all([
    wisp.getPost(slug),
    wisp.getRelatedPosts({ slug, limit: 4 }),
  ]);

  if (!result.post) {
    notFound();
  }

  const readingTime = getReadingTimeFromHtml(result.post.content);
  const { title, publishedAt, updatedAt, image } = result.post;

  /**
   * BlogPosting structured data
   */

  const place = (result.post.metadata as { place?: string } | null)?.place || null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    "@id": `${config.baseUrl}/post/${slug}#article`,
    url: `${config.baseUrl}/post/${slug}`,

    headline: title,
    description: result.post.description || undefined,

    image: image
      ? [
          {
            "@type": "ImageObject",
            "@id": `${config.baseUrl}/post/${slug}#primaryimage`,
            url: image,
          },
        ]
      : undefined,

    datePublished: publishedAt ? new Date(publishedAt).toISOString() : undefined,

    dateModified: updatedAt
      ? new Date(updatedAt).toISOString()
      : publishedAt
        ? new Date(publishedAt).toISOString()
        : undefined,

    author: {
      "@id": `${config.baseUrl}#person`,
    },

    publisher: {
      "@id": `${config.baseUrl}#person`,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${config.baseUrl}/post/${slug}`,
    },

    isPartOf: [
      {
        "@id": `${config.baseUrl}#blog`,
      },
      {
        "@id": `${config.baseUrl}#website`,
      },
    ],

    inLanguage: "en-GB",

    breadcrumb: {
      "@id": `${config.baseUrl}/post/${slug}#breadcrumb`,
    },

    timeRequired: Number.isFinite(readingTime) ? `PT${readingTime}M` : undefined,

    wordCount: result.post.content
      ? result.post.content.replace(/<[^>]+>/g, "").split(/\s+/).length
      : undefined,

    keywords: result.post.tags?.length ? result.post.tags.map((t) => t.name) : undefined,

    articleSection: result.post.tags?.[0]?.name,

    about: result.post.tags?.map((tag) => ({
      "@type": "DefinedTerm",
      "@id": `${config.baseUrl}/category/${tag.name}#term`,
      name: tag.name,
      url: `${config.baseUrl}/category/${tag.name}`,
      inDefinedTermSet: `${config.baseUrl}/category`,
    })),

    mentions: place
      ? [
          {
            "@type": "Place",
            "@id": `${config.baseUrl}/place/${place.toLowerCase().replace(/\s+/g, "-")}#place`,
            name: place,
          },
        ]
      : undefined,
  };

  /**
   * Breadcrumb structured data
   */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${config.baseUrl}/post/${slug}#breadcrumb`,
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
        name: title,
        item: `${config.baseUrl}/post/${slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <BlogContent post={result.post} relatedPosts={related.posts} readingTime={readingTime} />
    </>
  );
}
