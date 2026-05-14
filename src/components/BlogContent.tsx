"use client";
import { Author, GetRelatedPostsResult, TagInPost } from "@wisp-cms/client";
import parse, { DOMNode, Element } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

import { config } from "@/config";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useShareAttribution } from "@/hooks/useShareAttribute";
import { formatFullDate } from "@/lib/date";

import { CommentSection } from "./CommentSection";
import { FullWidthHeader } from "./FullWidthHeader";
import { PostShare } from "./PostShare";
import { RelatedPosts } from "./RelatedPosts";
import { processTableOfContents } from "./TOC";
import { AboutCta } from "./ui/about-cta";

function isElement(node: unknown): node is Element {
  return (
    typeof node === "object" && node !== null && "type" in node && (node as DOMNode).type === "tag"
  );
}

export const BlogContent = ({
  post: { title, description, content, author, publishedAt, tags, slug },
  relatedPosts,
  readingTime,
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
  };
  relatedPosts: GetRelatedPostsResult["posts"];
  readingTime: string;
}) => {
  const { modifiedHtml } = processTableOfContents(content, {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
  });
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
        <div className="border-b border-border/50 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              {author.image && (
                <Image
                  src={author.image}
                  alt={author.name || ""}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              )}
              <div className="font-medium">
                <Link href="/about">{author.name}</Link>
              </div>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              <span>Published on {publishedAt ? formatFullDate(publishedAt) : "N/A"}</span>
              <span className="hidden sm:inline"> | </span>
              <span className="block sm:inline">{readingTime}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/4 prose prose-lg max-w-none my-6 break-words blog-content">
            {parse(modifiedHtml, {
              replace: (node: DOMNode) => {
                if (isElement(node)) {
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
                  if (node.name === "img") {
                    const { src, alt } = node.attribs ?? {};
                    if (!src) return;

                    return (
                      <figure className="my-6">
                        <Image
                          src={src}
                          alt={alt ?? ""}
                          width={840}
                          height={630}
                          quality={70}
                          sizes="
                          (max-width: 640px) 90vw,
                          (max-width: 1024px) 640px,
                          840px
                        "
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQwIiBoZWlnaHQ9IjYzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODQwIiBoZWlnaHQ9IjYzMCIgZmlsbD0iI2VlZWVlZSIvPjwvc3ZnPg=="
                          className="rounded-lg mx-auto"
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

                return;
              },
            })}
            <div className="mt-12 border-t pt-6">
              <PostShare url={postUrl} />
            </div>
          </div>
          <div className="w-full lg:w-1/4 lg:px-4">
            <AboutCta />
          </div>
        </div>
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
