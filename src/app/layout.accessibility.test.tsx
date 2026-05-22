import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import LayoutWrapper from "./LayoutWrapper";

vi.mock("@vercel/analytics/next", () => ({ Analytics: () => null }));
vi.mock("@vercel/speed-insights/next", () => ({ SpeedInsights: () => null }));
vi.mock("@/components/analytics/ConsentBanner", () => ({ ConsentBanner: () => null }));
vi.mock("@/components/analytics/GoogleAnalyticsConsent", () => ({ GoogleAnalyticsConsent: () => null }));

describe("Layout accessibility", () => {
  it("includes a skip link to main content", () => {
    render(
      <LayoutWrapper isStories={false}>
        <div>Content</div>
      </LayoutWrapper>,
    );

    const skipLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });

    expect(skipLink).toHaveAttribute("href", "#main");
  });

  it("has a main landmark", () => {
    render(
      <LayoutWrapper isStories={false}>
        <main id="main">Content</main>
      </LayoutWrapper>,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
