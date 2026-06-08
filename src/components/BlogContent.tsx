"use client";

import { Author, GetRelatedPostsResult, TagInPost } from "@wisp-cms/client";
import parse, { DOMNode, Element } from "html-react-parser";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { config } from "@/config";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useShareAttribution } from "@/hooks/useShareAttribute";
import { formatFullDate } from "@/lib/date";
import type { PostMetadata, Review } from "@/types/post-metadata";

import { FullWidthHeader } from "./FullWidthHeader";
import { processTableOfContents } from "./TOC";
import { AboutCta } from "./ui/about-cta";

function isElement(node: unknown): node is Element {
  return (
    typeof node === "object" && node !== null && "type" in node && (node as DOMNode).type === "tag"
  );
}

const CommentSection = dynamic(() => import("./CommentSection").then((m) => m.CommentSection), {
  ssr: false,
});

const RelatedPosts = dynamic(() => import("./RelatedPosts").then((m) => m.RelatedPosts), {
  ssr: false,
});

const PostShare = dynamic(() => import("./PostShare").then((m) => m.PostShare), { ssr: false });

export const BlogContent = ({
  post,
  relatedPosts,
  readingTime,
  reviews = [],
}: {
  post: {
    id: string;
    createdAt: Date;
    teamId: string;
    description: string | null;
    title: string;
    content: string;
    slug: string;
    image: string | null;
    authorId: string;
    updatedAt: Date;
    publishedAt: Date | null;
    tags: TagInPost[];
    author: Author;
    metadata?: PostMetadata;
  };
  relatedPosts: GetRelatedPostsResult["posts"];
  readingTime: string;
  reviews?: Review[];
}) => {
  const { title, description, content, author, publishedAt, tags, slug } = post;

  const { modifiedHtml } = useMemo(
    () =>
      processTableOfContents(content, {
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
      }),
    [content],
  );

  const firstImageSrc = useMemo(() => {
    const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match?.[1] ?? null;
  }, [content]);

  const parsedContent = useMemo(
    () =>
      parse(modifiedHtml, {
        replace: (node: DOMNode) => {
          if (isElement(node)) {
            // Strip unwanted injected paragraphs
            if (
              node.name === "p" &&
              node.children?.some((child) => {
                if (!isElement(child)) return false;

                return (
                  child.name === "small" &&
                  child.children?.some((sub) => {
                    if (!isElement(sub)) return false;
                    return sub.name === "a" && sub.attribs?.href?.includes("synscribe.com");
                  })
                );
              })
            ) {
              return <></>;
            }

            // ✅ Rewrite YouTube iframe → youtube-nocookie
            if (
              node.name === "iframe" &&
              typeof node.attribs?.src === "string" &&
              node.attribs.src.includes("youtube.com/embed/")
            ) {
              const src = node.attribs.src.replace(
                "https://www.youtube.com/embed/",
                "https://www.youtube-nocookie.com/embed/",
              );

              return (
                <iframe
                  {...node.attribs}
                  src={src}
                  title={node.attribs.title || `YouTube video embedded in article`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) as unknown as Element;
            }

            // Replace <img> with next/image
            if (node.name === "img") {
              const { src, alt } = node.attribs ?? {};
              if (!src) return;

              const isFirstImage = src === firstImageSrc;

              return (
                <figure className="my-6">
                  <Image
                    src={src}
                    alt={alt ?? ""}
                    width={840}
                    height={630}
                    quality={70}
                    sizes="(max-width: 640px) 90vw,
                   (max-width: 1024px) 640px,
                   840px"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQwIiBoZWlnaHQ9IjYzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODQwIiBoZWlnaHQ9IjYzMCIgZmlsbD0iI2VlZWVlZSIvPjwvc3ZnPg=="
                    className="rounded-lg mx-auto"
                    priority={isFirstImage}
                  />
                  {alt && (
                    <figcaption className="mt-2 text-sm text-gray-500 text-center">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              ) as unknown as Element;
            }
          }
        },
      }),
    [modifiedHtml, firstImageSrc],
  );

  const postUrl = `${config.baseUrl}/post/${slug}`;

  useScrollTracking();
  useShareAttribution();

  return (
    <>
      <FullWidthHeader
        title={title}
        description={description?.trim().replace(/\.$/, "")}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: title, href: "" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        {/* Meta header */}
        <div className="border-b border-border/50 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 leading-none">
              {author.image && (
                <Image
                  src={author.image}
                  alt={author.name || ""}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              )}
              <div className="font-medium leading-none">
                <Link href="/about">{author.name}</Link>
              </div>
            </div>

            <div className="text-sm text-muted-foreground leading-none sm:leading-normal">
              <span>Published on {publishedAt ? formatFullDate(publishedAt) : "N/A"}</span>
              <span className="mx-2">|</span>
              <span>{readingTime}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main content */}
          <div className="w-full lg:w-3/4 prose prose-lg max-w-none my-6 wrap-break-word blog-content">
            {parsedContent}

            {/* ✅ Critical reception */}
            {reviews.length > 0 && (
              <section aria-labelledby="review-heading" className="mt-12 border-t pt-6">
                <h2 id="review-heading" className="text-base font-semibold">
                  Critical reception
                </h2>

                {reviews.map((review, index) => (
                  <blockquote key={index} className="mt-4 border-l-2 pl-4 text-sm">
                    <p>{review.reviewText}</p>
                    <footer className="mt-2 text-xs not-italic text-muted-foreground">
                      — {review.reviewName}
                      {review.reviewJobTitle && `, ${review.reviewJobTitle}`}
                    </footer>
                  </blockquote>
                ))}
              </section>
            )}

            {/* Licensing + share */}
            <div className="mt-12 border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Photographs accompanying this article are available for editorial and commercial
                licence. Further details are available on the{" "}
                <Link href="/licencing" className="underline hover:no-underline">
                  licencing page
                </Link>
                .
              </p>

              <div className="mt-4">
                <PostShare url={postUrl} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/4 lg:px-4">
            <AboutCta />
          </div>
        </div>

        {/* Tags + comments */}
        <ul className="mt-4 mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link href={`/category/${tag.name}`} className="hover:underline">
                #{tag.name}
              </Link>
            </li>
          ))}
        </ul>

        <CommentSection slug={slug} />
        <RelatedPosts posts={relatedPosts} />
      </main>
    </>
  );
};
