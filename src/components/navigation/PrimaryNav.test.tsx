import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/publications",
}));

import { PrimaryNav } from "./PrimaryNav";

afterEach(() => {
  vi.restoreAllMocks();
});

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

  it("supports keyboard dismissal and focus wrapping in the mobile drawer", async () => {
    render(<PrimaryNav />);

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));

    const dialog = screen.getByRole("dialog");
    const closeButton = within(dialog).getByRole("button", { name: /^Close$/i });
    const lastLink = within(dialog).getAllByRole("link").at(-1);

    closeButton.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });

    expect(lastLink).toHaveFocus();

    fireEvent.keyDown(document, { key: "Tab" });

    expect(closeButton).toHaveFocus();
  });

  it("ignores swipe end events when no touch start has occurred", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      () =>
        ({
          matches: false,
          media: "",
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    render(<PrimaryNav />);

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    fireEvent.touchEnd(screen.getByRole("dialog"), { changedTouches: [{ clientX: 200 }] });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes on swipe gestures and explicit mobile close actions", async () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      () =>
        ({
          matches: false,
          media: "",
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    const { rerender } = render(<PrimaryNav />);

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));

    const dialog = screen.getByRole("dialog");
    fireEvent.touchStart(dialog, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 200 }] });

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    rerender(<PrimaryNav />);
    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));

    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: /^Close$/i }));

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    rerender(<PrimaryNav />);
    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("link", { name: /publications/i }));

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
