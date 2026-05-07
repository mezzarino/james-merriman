import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "./social-links";

describe("SocialLinks", () => {
  it("renders social links with accessible names", () => {
    render(<SocialLinks />);

    expect(screen.getByRole("link", { name: /email james merriman/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /substack/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /youtube/i })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SocialLinks />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
