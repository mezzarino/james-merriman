import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { BlogContent } from "./BlogContent";

// ✅ Mock hooks that rely on browser behaviour
vi.mock("@/hooks/useScrollTracking", () => ({
  useScrollTracking: () => {},
}));

vi.mock("@/hooks/useShareAttribute", () => ({
  useShareAttribution: () => {},
}));

// ✅ Mock heavy child components (we test them separately)
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

// ✅ Test data
const mockPost = {
  id: "1",
  createdAt: new Date(),
  teamId: "team",
  description: "A test description",
  title: "Test Blog Post",
  content: "<p>This is <strong>blog content</strong>.</p>",
  slug: "test-post",
  image: null,
  authorId: "author",
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

    // ✅ Main landmark
    expect(screen.getByRole("main")).toBeInTheDocument();

    // ✅ Title
    expect(screen.getByRole("heading", { name: /test blog post/i })).toBeInTheDocument();

    // ✅ Parsed HTML content
    expect(screen.getByText(/blog content/i)).toBeInTheDocument();

    // ✅ Author
    expect(screen.getByText(/james merriman/i)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlogContent post={mockPost} relatedPosts={[]} readingTime="5 min read" />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
