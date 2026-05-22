import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/publications",
}));

import { PrimaryNav } from "./PrimaryNav";

describe("PrimaryNav", () => {
  it("highlights the active desktop navigation item", () => {
    render(<PrimaryNav />);

    const activeLink = screen.getByRole("link", { name: /publications/i });
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("opens and closes the mobile navigation drawer", () => {
    render(<PrimaryNav />);

    const openButton = screen.getByRole("button", { name: /open navigation menu/i });
    fireEvent.click(openButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close navigation menu/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close navigation menu/i }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
