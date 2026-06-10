import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import React, { act } from "react";
import { describe, expect, it, vi } from "vitest";

import { BlogContent } from "./BlogContent";

/* -------------------------------------------------
 * next/image mock (typed, accessible)
 * ------------------------------------------------- */
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    alt?: string;
  }) => <img alt={alt ?? ""} {...props} />,
}));

/* -------------------------------------------------
 * Hook mocks (browser‑dependent)
 * ------------------------------------------------- */
vi.mock("@/hooks/useScrollTracking", () => ({
  useScrollTracking: () => {},
}));

vi.mock("@/hooks/useShareAttribute", () => ({
  useShareAttribution: () => {},
}));

/* -------------------------------------------------
 * Heavy child components mocked
 * ------------------------------------------------- */
vi.mock("./CommentSection", () => ({
  CommentSection: () => <div>Comments</div>,
}));

vi.mock("./RelatedPosts", () => ({
  RelatedPosts: () => <div>Related posts</div>,
}));

vi.mock("./PostShare", () => ({
  PostShare: () => <div>Share</div>,
}));

vi.mock("./ui/about-cta", () => ({
  AboutCta: () => <div>About CTA</div>,
}));

/* -------------------------------------------------
 * Typed test data
 * ------------------------------------------------- */
const mockPost = {
  id: "1",
  teamId: "team",
  slug: "test-post",
  title: "Test Blog Post",
  description: "A test description",
  content: "<p>This is <strong>blog content</strong>.</p>",
  image: null,
  authorId: "author",
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
  tags: [{ id: "t1", name: "travel" }],
  author: {
    id: "a1",
    name: "James Merriman",
    image: "/author.jpg",
  },
};

describe("BlogContent", () => {
  it("renders the main content of the blog post", () => {
    render(<BlogContent post={mockPost} relatedPosts={[]} readingTime="5 min read" />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /test blog post/i })).toBeInTheDocument();
    expect(screen.getByText(/blog content/i)).toBeInTheDocument();
    expect(screen.getByText(/james merriman/i)).toBeInTheDocument();
  });

  it("renders transformed media and strips embedded synscribe copy", () => {
    const content = `
      <p><small><a href="https://example.synscribe.com">Synscribe promo</a></small></p>
      <iframe src="https://www.youtube.com/embed/abc123" title="Embedded video"></iframe>
      <img src="/images/demo.jpg" alt="Demo image" />
    `;

    render(
      <BlogContent post={{ ...mockPost, content }} relatedPosts={[]} readingTime="5 min read" />,
    );

    expect(screen.queryByText("Synscribe promo")).not.toBeInTheDocument();

    expect(screen.getByTitle("Embedded video")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/abc123",
    );

    expect(screen.getByRole("img", { name: /demo image/i })).toBeInTheDocument();
  });

  it("renders critical reception details when reviews are provided", () => {
    render(
      <BlogContent
        post={mockPost}
        relatedPosts={[]}
        readingTime="5 min read"
        reviews={[
          {
            reviewText: "A thoughtful and vivid piece.",
            reviewName: "A. Reviewer",
            reviewJobTitle: "Editor",
          },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: /critical reception/i })).toBeInTheDocument();

    expect(screen.getByText("A thoughtful and vivid piece.")).toBeInTheDocument();

    expect(screen.getByText(/A\. Reviewer, Editor/i)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlogContent post={mockPost} relatedPosts={[]} readingTime="5 min read" />,
    );

    const results = await act(async () => axe(container));
    expect(results).toHaveNoViolations();
  });
});
