"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import type { GetPostsResult } from "@wisp-cms/client";
import { formatFullDate } from "@/lib/date";

export const BlogPostList = ({ posts }: { posts: GetPostsResult["posts"] }) => {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 px-4">
      {posts.map((post) => (
        <article key={post.id} className="break-words group">
          {/* Featured image */}
          <Link href={`/post/${post.slug}`} aria-label={`Read full post: ${post.title}`}>
            <AspectRatio ratio={16 / 9} className="relative w-full rounded-lg overflow-hidden">
              {post.image ? (
                <Image
                  alt={post.title}
                  src={post.image}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <Image
                  src="/placeholder.jpg"
                  alt="Placeholder image"
                  fill
                  className="object-cover object-center"
                />
              )}
            </AspectRatio>
          </Link>

          {/* Post content */}
          <div className="grid grid-cols-1 gap-3 mt-4">
            <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
              <Link href={`/post/${post.slug}`} aria-label={`Read full post: ${post.title}`}>
                {post.title}
              </Link>
            </h2>

            <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
              {post.description}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Image
                src={post.author.image || "/placeholder-author.jpg"}
                alt={post.author.name || "Author image"}
                width={30}
                height={30}
                className="rounded-full object-cover"
              />
              <div className="font-medium text-sm md:text-base text-muted-foreground">
                {post.author.name || "Unknown author"} | Published on{" "}
                {formatFullDate(post.publishedAt || post.createdAt)}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};