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
  { params }: { params: Params }
): Promise<Metadata> {
  const { slug } = params;

  const result = await wisp.getPost(slug);

  if (!result.post) {
    return {
      title: "Page not found",
    };
  }

  const image = result.post.image || getOgImageUrl(result.post.title);

  return {
    title: result.post.title,
    description: result.post.description,
    alternates: {
      canonical: `${config.baseUrl}/post/${slug}`,
    },
    openGraph: {
      title: result.post.title,
      description: result.post.description ?? "",
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: result.post.title,
      description: result.post.description ?? "",
      images: [image],
    },
  };
}

export default async function BlogPost(
  { params }: { params: Params }
) {
  const { slug } = params;

  const [result, related] = await Promise.all([
    wisp.getPost(slug),
    wisp.getRelatedPosts({ slug, limit: 4 }),
  ]);

  if (!result.post) {
    notFound();
  }

  const post = result.post;

  const readingTime = getReadingTimeFromHtml(post.content);
  const { title, publishedAt, updatedAt, author, image } = post;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image || undefined,
    datePublished: publishedAt?.toString(),
    dateModified: updatedAt?.toString(),
    mainEntityOfPage: `${config.baseUrl}/post/${slug}`,
    timeRequired: `${readingTime} min read`,
    author: {
      "@type": "Person",
      name: author?.name || undefined,
      image: author?.image || undefined,
      url: config.baseUrl || undefined,
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogContent
        post={post}
        relatedPosts={related.posts}
        readingTime={readingTime}
      />
    </>
  );
}