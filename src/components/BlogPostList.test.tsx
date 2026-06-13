import { render, screen } from "@testing-library/react";
import type { GetPostsResult } from "@wisp-cms/client";
import React from "react";
import { describe, expect, it, vi } from "vitest";

/* -------------------------------------------------
 * next/image mock (typed, no any)
 * ------------------------------------------------- */
vi.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      src: string;
      alt: string;
      fill?: boolean;
      priority?: boolean;
      placeholder?: string;
      blurDataURL?: string;
    },
  ) => {
    const { src, alt, onLoad, ...imgProps } = props;

    return <img src={src} alt={alt} onLoad={onLoad} {...imgProps} />;
  },
}));

/* -------------------------------------------------
 * LazyRender mock
 * ------------------------------------------------- */
vi.mock("@/components/LazyRender", () => ({
  LazyRender: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { BlogPostList } from "./BlogPostList";

/* -------------------------------------------------
 * Typed test data
 * ------------------------------------------------- */
const posts: GetPostsResult["posts"] = [
  {
    id: "post-1",
    slug: "test-post",
    title: "Test Post",
    description: "A short description.",
    image: "/images/test-post.jpg",
    author: {
      name: "Jane Doe",
      image: "/images/jane.jpg",
    },
    publishedAt: new Date("2024-01-01"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    tags: [],
    teamId: "team",
    authorId: "author",
  },
];

/* -------------------------------------------------
 * Tests
 * ------------------------------------------------- */
describe("BlogPostList", () => {
  it("renders a list of posts with titles and author details", () => {
    render(<BlogPostList posts={posts} />);

    expect(screen.getByRole("heading", { name: /test post/i })).toBeInTheDocument();

    expect(screen.getByText(/a short description/i)).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /jane doe/i })).toBeInTheDocument();
  });
});
