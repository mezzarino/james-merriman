import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { processTableOfContents, TableOfContents } from "./TOC";

describe("processTableOfContents", () => {
  it("generates unique IDs for repeated headings and skips disabled levels", () => {
    const result = processTableOfContents(
      "<h2>Overview</h2><h2>Overview</h2><h3>Details</h3><h4>Hidden</h4>",
      { h2: true, h3: false, h4: true },
    );

    expect(result.tableOfContents).toEqual([
      { id: "overview", text: "Overview", level: 2 },
      { id: "overview-1", text: "Overview", level: 2 },
      { id: "hidden", text: "Hidden", level: 4 },
    ]);

    expect(result.modifiedHtml).toContain('id="overview"');
    expect(result.modifiedHtml).toContain('id="overview-1"');
    expect(result.modifiedHtml).toContain('id="hidden"');
    expect(result.modifiedHtml).not.toContain('id="details"');
  });
});

describe("TableOfContents", () => {
  it("renders anchor links with the correct indentation for each heading level", () => {
    render(
      <TableOfContents
        items={[
          { id: "overview", text: "Overview", level: 2 },
          { id: "details", text: "Details", level: 3 },
        ]}
      />,
    );

    const overviewLink = screen.getByRole("link", { name: "Overview" });
    const detailsLink = screen.getByRole("link", { name: "Details" });

    expect(overviewLink).toHaveAttribute("href", "#overview");
    expect(detailsLink).toHaveAttribute("href", "#details");
    expect(overviewLink.closest("li")).toHaveStyle({ marginLeft: "20px" });
    expect(detailsLink.closest("li")).toHaveStyle({ marginLeft: "40px" });
  });
});
