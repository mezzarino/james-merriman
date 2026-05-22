import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, className, width, height, onLoad }: any) => (
    <img src={src} alt={alt} className={className} width={width} height={height} onLoad={onLoad} />
  ),
}));

vi.mock("@/components/LazyRender", () => ({
  LazyRender: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { BlogPostList } from "./BlogPostList";

describe("BlogPostList", () => {
  it("renders a list of posts with titles and author details", () => {
    const posts = [
      {
        id: "post-1",
        slug: "test-post",
        title: "Test Post",
        description: "A short description.",
        image: "/images/test-post.jpg",
        author: { name: "Jane Doe", image: "/images/jane.jpg" },
        publishedAt: "2024-01-01",
        createdAt: "2024-01-01",
      },
    ] as any;

    render(<BlogPostList posts={posts} />);

    expect(screen.getByRole("heading", { name: /test post/i })).toBeInTheDocument();
    expect(screen.getByText(/a short description/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /jane doe/i })).toBeInTheDocument();
  });
});
