export const revalidate = 60; // 1 minute

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { wisp } from "@/lib/wisp";
import { BlogContent } from "@/components/BlogContent";
import type { BlogPosting, WithContext } from "schema-dts";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { getReadingTimeFromHtml } from "@/lib/readingTime";

interface Params {
  slug: string;
}

export async function generateMetadata(
  props: { params: Promise<Params> }
): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;

  const result = await wisp.getPost(slug);
  if (!result.post) {
    return { title: "Page not found" };
  }

  return {
    title: `${result.post.title} | James Merriman`,
    description: result.post.description ?? `Read travel insights from James Merriman about ${result.post.title}`,
    openGraph: {
      title: `${result.post.title} | James Merriman`,
      description: result.post.description ?? "",
      images: [result.post.image || getOgImageUrl(result.post.title)],
    },
  };
}

export default async function BlogPost(
  props: { params: Promise<Params> }
) {
  const params = await props.params;
  const { slug } = params;

  const [result, related] = await Promise.all([
    wisp.getPost(slug),
    wisp.getRelatedPosts({ slug, limit: 4 }),
  ]);

  if (!result.post) {
    notFound();
  }

  const readingTime = getReadingTimeFromHtml(result.post.content);
  const { title, publishedAt, updatedAt, author, image } = result.post;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    "@id": `${config.baseUrl}/post/${slug}#article`,

    headline: title,
    image: image || undefined,

    datePublished: publishedAt
      ? new Date(publishedAt).toISOString()
      : undefined,

    dateModified: updatedAt
      ? new Date(updatedAt).toISOString()
      : undefined,

    author: {
      "@type": "Person",
      "@id": `${config.baseUrl}/about#author`,
      name: "James Merriman",
      url: `${config.baseUrl}/about`,
      image: author?.image ?? undefined,
    },

    publisher: {
      "@type": "Organization",
      name: config.organization,
      url: config.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: config.logoUrl,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${config.baseUrl}/post/${slug}`,
    },

    isPartOf: {
      "@type": "WebSite",
      "@id": `${config.baseUrl}#website`,
    },

    inLanguage: "en-GB",

    timeRequired: Number.isFinite(readingTime)
      ? `PT${readingTime}M`
      : undefined,

    wordCount: result.post.content
      ? result.post.content.replace(/<[^>]+>/g, "").split(/\s+/).length
      : undefined,

    keywords: result.post.tags?.length
      ? result.post.tags.map((t) => t.name).join(", ")
      : undefined,

    articleSection: result.post.tags?.[0]?.name,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogContent post={result.post} relatedPosts={related.posts} readingTime={readingTime} />
    </>
  );
}