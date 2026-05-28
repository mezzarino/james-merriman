"use client";

import dynamic from "next/dynamic";

import type { GetPostsResult } from "@/lib/wisp";

const PostPagination = dynamic(() => import("../PostPagination").then((m) => m.PostPagination), {
  ssr: false,
});

type Props = {
  pagination: GetPostsResult["pagination"];
  query?: string;
};

export function HomepagePagination({ pagination, query }: Props) {
  return (
    <PostPagination
      pagination={pagination}
      className="mt-6 pb-6 border-b border-border/50"
      query={query}
    />
  );
}
