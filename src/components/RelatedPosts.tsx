"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import type { GetRelatedPostsResult } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";

export function RelatedPosts({ posts }: { posts: GetRelatedPostsResult["posts"] }) {
  if (!posts?.length) return null;

  return (
    <section className="my-8">
      <h2 className="mb-6 text-lg font-semibold tracking-tight">Related Posts</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {posts.slice(0, 4).map((post) => (
          <article key={post.id} className="bg-muted overflow-hidden rounded-lg group">
            <Link href={`/post/${post.slug}`} className="block">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={`${post.title} – travel writing by James Merriman`}
                  width={358}
                  height={201}
                  quality={65}
                  sizes="(max-width: 640px) 179px, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQwIiBoZWlnaHQ9IjYzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODQwIiBoZWlnaHQ9IjYzMCIgZmlsbD0iI2VlZWVlZSIvPjwvc3ZnPg=="
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </AspectRatio>

              <div className="prose prose-sm dark:prose-invert p-4">
                <h3 className="line-clamp-2">{post.title}</h3>
                <p className="line-clamp-3">{post.description}</p>

                <span className="font-semibold inline-block mt-2">Read full story</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
