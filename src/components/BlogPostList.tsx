import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import type { GetPostsResult } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";

import { LazyRender } from "@/components/LazyRender";
import { formatFullDate } from "@/lib/date";

export const BlogPostList = ({ posts }: { posts: GetPostsResult["posts"] }) => {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 px-4 lg:px-0">
      {posts.map((post, index) => (
        <LazyRender
          key={post.id}
          placeholder={
            <div className="aspect-video rounded-lg bg-muted animate-pulse motion-reduce:animate-none" />
          }
        >
          <article className="break-words group content-visibility-auto">
            {/* Featured image */}
            <Link href={`/post/${post.slug}`} prefetch={false}>
              <AspectRatio ratio={16 / 9} className="relative w-full rounded-lg overflow-hidden">
                {post.image ? (
                  <Image
                    alt={post.title}
                    src={post.image}
                    width={544}
                    height={306}
                    quality={65}
                    sizes="(max-width: 640px) 264px, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTI4IiBoZWlnaHQ9IjI5NyIgZmlsbD0iI2VlZWVlZSIvPg=="
                    className="
                      object-cover object-center
                      transition-transform duration-300
                      group-hover:scale-105
                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                    priority={index === 0}
                  />
                ) : (
                  <Image
                    src="/james-merriman-travel-writer-placeholder.jpg"
                    alt="James Merriman"
                    fill
                    className="object-cover object-center"
                  />
                )}
              </AspectRatio>
            </Link>

            {/* Post content */}
            <div className="grid grid-cols-1 gap-3 mt-4">
              <h3 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
                <Link href={`/post/${post.slug}`} prefetch={false}>
                  {post.title}
                </Link>
              </h3>

              <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
                {post.description}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Image
                  src={post.author.image || "/placeholder-author.jpg"}
                  alt={post.author.name || "Author"}
                  width={30}
                  height={30}
                  loading="lazy"
                  className="rounded-full object-cover"
                />
                <div className="font-medium text-sm md:text-base text-muted-foreground">
                  {post.author.name || "Unknown author"} · Published on{" "}
                  {formatFullDate(post.publishedAt || post.createdAt)}
                </div>
              </div>
            </div>
          </article>
        </LazyRender>
      ))}
    </div>
  );
};
