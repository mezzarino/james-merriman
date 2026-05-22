import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi, beforeAll } from "vitest";
import { axe } from "jest-axe";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn(), back: vi.fn(), forward: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

if (typeof window.matchMedia === "undefined") {
  Object.defineProperty(window, "matchMedia", {
    value: (query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
    writable: true,
  });
}

if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function () {} as any;
}

if (typeof Element !== "undefined" && !Element.prototype.scrollBy) {
  Element.prototype.scrollBy = function () {} as any;
}

import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  beforeAll(() => {
    pushMock.mockReset();
  });

  it("renders category tabs and the search control", () => {
    render(<FilterBar active="latest" />);

    expect(screen.getByRole("tablist", { name: /blog categories/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search posts/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /latest writing/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("opens search mode and submits the query on Enter", () => {
    render(<FilterBar active="latest" />);

    fireEvent.click(screen.getByRole("button", { name: /search posts/i }));

    const searchInput = screen.getByRole("textbox", { name: /search posts/i });
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "test query" } });
    fireEvent.keyUp(searchInput, { key: "Enter", code: "Enter" });

    expect(pushMock).toHaveBeenCalledWith("/?query=test query");
  });

  it("has no basic accessibility violations", async () => {
    const { container } = render(<FilterBar active="latest" />);
    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
