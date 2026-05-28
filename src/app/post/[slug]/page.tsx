export const revalidate = 60;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { BlogContent } from "@/components/BlogContent";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { getReadingTimeFromHtml } from "@/lib/readingTime";
import { wisp } from "@/lib/wisp";
import type { PostMetadata } from "@/types/post-metadata";

interface Params {
  slug: string;
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await props.params;
  const result = await wisp.getPost(slug);

  if (!result.post) return { title: "Page not found" };

  const canonicalUrl = `${config.baseUrl}/post/${slug}`;

  return {
    title: `${result.post.title} | James Merriman`,
    description:
      result.post.description ??
      `A narrative travel essay by James Merriman exploring ${result.post.title}.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${result.post.title} | James Merriman`,
      description: result.post.description ?? "",
      images: [result.post.image || getOgImageUrl(result.post.title)],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: result.post.title,
      description: result.post.description ?? "Travel writing by James Merriman.",
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

  if (!result.post) notFound();

  const readingTime = getReadingTimeFromHtml(result.post.content);
  const { title, publishedAt, updatedAt, image } = result.post;

  // ✅ Normalize CMS metadata ONCE
  const rawMetadata = result.post.metadata;

  const metadata: PostMetadata | undefined =
    rawMetadata && typeof rawMetadata === "object" ? (rawMetadata as PostMetadata) : undefined;

  const reviews = metadata?.reviews ?? [];
  const place = metadata?.place ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${config.baseUrl}/post/${slug}`,
        url: `${config.baseUrl}/post/${slug}`,
        name: title,
        isPartOf: { "@id": `${config.baseUrl}#website` },
        breadcrumb: { "@id": `${config.baseUrl}/post/${slug}#breadcrumb` },
        mainEntity: { "@id": `${config.baseUrl}/post/${slug}#article` },
        inLanguage: "en-GB",
      },
      {
        "@type": "BlogPosting",
        "@id": `${config.baseUrl}/post/${slug}#article`,
        url: `${config.baseUrl}/post/${slug}`,
        headline: title,
        description: result.post.description || undefined,
        image: image
          ? [
              {
                "@type": "ImageObject",
                url: image,
                width: 840,
                height: 630,
                creditText: "James Merriman",
                copyrightNotice: "© James Merriman",
                license: "https://www.jamesmerriman.co.uk/licencing",
                acquireLicensePage: "https://www.jamesmerriman.co.uk/licencing",
              },
            ]
          : undefined,
        datePublished: publishedAt ? new Date(publishedAt).toISOString() : undefined,
        dateModified: updatedAt ? new Date(updatedAt).toISOString() : undefined,
        author: {
          "@id": `${config.baseUrl}#person`,
          "@type": "Person",
          name: "James Merriman",
          url: config.baseUrl,
        },
        publisher: {
          "@id": `${config.baseUrl}#organization`,
        },
        mainEntityOfPage: {
          "@id": `${config.baseUrl}/post/${slug}`,
        },
        isPartOf: [{ "@id": `${config.baseUrl}#blog` }, { "@id": `${config.baseUrl}#website` }],
        inLanguage: "en-GB",
        timeRequired: `PT${readingTime}M`,
        wordCount: result.post.content.replace(/<[^>]+>/g, "").split(/\s+/).length,
        review:
          reviews.length > 0
            ? reviews.map((review) => ({
                "@type": "Review",
                reviewBody: review.reviewText,
                author: {
                  "@type": "Person",
                  name: review.reviewName,
                  jobTitle: review.reviewJobTitle,
                },
              }))
            : undefined,
        mentions: place
          ? [
              {
                "@type": "Place",
                name: place,
              },
            ]
          : undefined,
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${config.baseUrl}/post/${slug}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${config.baseUrl}/` },
      { "@type": "ListItem", position: 2, name: title, item: `${config.baseUrl}/post/${slug}` },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogContent
        post={{ ...result.post, metadata }}
        relatedPosts={related.posts}
        readingTime={readingTime}
      />
    </>
  );
}
