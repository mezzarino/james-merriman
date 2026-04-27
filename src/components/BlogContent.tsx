"use client";
import { Author, GetRelatedPostsResult, TagInPost } from "@wisp-cms/client";
import parse, { DOMNode, Element } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

import { config } from "@/config";
import { formatFullDate } from "@/lib/date";

import { CommentSection } from "./CommentSection";
import { FullWidthHeader } from "./FullWidthHeader";
import { PostShare } from "./PostShare";
import { RelatedPosts } from "./RelatedPosts";
import { processTableOfContents } from "./TOC";
import { AboutCta } from "./ui/about-cta";

export const BlogContent = ({
  post: { title, content, author, publishedAt, tags, slug },
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
  return (
    <>
      <FullWidthHeader
        title={title}
        description=""
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: title, href: "" },
        ]}
      />
      <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
        <div className="flex items-center gap-2">
          <Image
            src={author.image || ""}
            alt={author.name || ""}
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="font-medium">{author.name}</div> |
          <div>
            Published on {publishedAt ? formatFullDate(publishedAt) : "N/A"} | {readingTime}
          </div>
        </div>
        <PostShare url={postUrl} />
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/4 prose prose-lg max-w-none my-6 break-words blog-content">
            {parse(modifiedHtml, {
              replace: (node: DOMNode) => {
                if (node.type === "tag" && (node as Element).name === "img") {
                  const { src, alt } = (node as Element).attribs ?? {};
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
        <div className="my-8 space-x-2">
          {tags.map((tag) => (
            <Link href={`/category/${tag.name}`} key={tag.id}>
              #{tag.name}
            </Link>
          ))}
        </div>
        <CommentSection slug={slug} />
        <RelatedPosts posts={relatedPosts} />
      </main>
    </>
  );
};
