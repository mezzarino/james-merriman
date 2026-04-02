export const revalidate = 60; // 1 minute

import { Metadata } from "next";

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";

import { FilterBar } from "../../../components/FilterBar";
import { FullWidthHeader } from "../../../components/FullWidthHeader";
import { config } from "../../../config";

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { tag } = params;

  return {
    title: `Explore ${tag} Adventures | Travel Blog by James Merriman`,
    description: `Discover James Merriman's immersive travel stories, photography and tips featuring ${tag}.`,
    openGraph: {
      title: `Explore ${tag} Adventures | Travel Blog by James Merriman`,
      description: `Immersive travel stories, tips and photography featuring ${tag}.`,
      images: [getOgImageUrl(`${tag} travel`)],
    },
    twitter: {
      card: "summary_large_image",
      title: `Explore ${tag} Adventures | Travel Blog by James Merriman`,
      description: `Discover travel stories, photography and tips from James Merriman on ${tag}.`,
      images: [getOgImageUrl(`${tag} travel`)],
    },
  };
}

export default async function Page(props: {
  searchParams?: Promise<{ query: string; page: string }>;
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const { tag } = params;

  const searchParams = await props.searchParams;
  const category = config.categories.find((c) => c.tag === tag);
  const { label, description } = category || {
    label: `#${tag}`,
    description: `Immersive travel stories, tips and photography featuring ${tag}.`,
  };
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 6,
    tags: [tag],
    query: searchParams?.query,
    page,
  });

  return (
    <>
      <FullWidthHeader
        title={label}
        description={description}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Category", href: `/category/` },
          { label, href: `/category/${tag}` },
        ]}
      />
      <main className="container mx-auto px-4 max-w-6xl" role="main">
        {/* Intro paragraph for SEO */}
        <p className="text-base text-muted-foreground px-4 my-8">
          Browse all blog posts tagged with {label}. Discover travel writing, stories and
          experiences covering walking, coastal, food, history, pilgrimage and global adventures.
        </p>

        <FilterBar active={tag} className="my-8 px-0" />
        <BlogPostList posts={result.posts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
          basePath={`/category/${tag}`}
        />
      </main>
    </>
  );
}
