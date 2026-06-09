import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "jest-axe";

const pushMock = vi.fn();
const searchParamsMock = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn(), back: vi.fn(), forward: vi.fn() }),
  useSearchParams: () => searchParamsMock,
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
  beforeEach(() => {
    pushMock.mockReset();
    searchParamsMock.delete("query");
    vi.useRealTimers();
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

  it("supports Escape to close search mode and restores focus", async () => {
    render(<FilterBar active="latest" />);

    fireEvent.click(screen.getByRole("button", { name: /search posts/i }));
    const input = screen.getByRole("textbox", { name: /search posts/i });

    fireEvent.keyUp(input, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("textbox", { name: /search posts/i })).not.toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /search posts/i })).toBeInTheDocument();
  });

  it("clears the search text and returns home when the query is removed", () => {
    searchParamsMock.set("query", "existing");
    render(<FilterBar active="latest" />);

    const input = screen.getByRole("textbox", { name: /search posts/i });
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /clear search/i }));

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("moves focus between category tabs with arrow keys and animates scroll hints", async () => {
    vi.useFakeTimers();
    const scrollBySpy = vi
      .spyOn(HTMLElement.prototype, "scrollBy")
      .mockImplementation(() => {});
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList,
    );

    render(<FilterBar active="latest" />);

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });

    expect(tabs[1]).toHaveFocus();

    await act(async () => {
      vi.advanceTimersByTime(400);
      await vi.runOnlyPendingTimersAsync();
      vi.advanceTimersByTime(350);
      await vi.runOnlyPendingTimersAsync();
    });

    expect(scrollBySpy).toHaveBeenCalledWith({ left: 40, behavior: "smooth" });
    expect(scrollBySpy).toHaveBeenCalledWith({ left: -40, behavior: "smooth" });
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
