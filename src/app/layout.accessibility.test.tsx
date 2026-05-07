import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RootLayout from "./layout";

describe("Layout accessibility", () => {
  it("includes a skip link to main content", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>,
    );

    const skipLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });

    expect(skipLink).toHaveAttribute("href", "#main");
  });

  it("has a main landmark", () => {
    render(
      <RootLayout>
        <main id="main">Content</main>
      </RootLayout>,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
