import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
}

if (typeof Element !== "undefined") {
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function () {} as any;
  }

  if (!Element.prototype.scrollBy) {
    Element.prototype.scrollBy = function () {} as any;
  }
}

import Page from "./page";

describe("Home page accessibility", () => {
  it("has no WCAG violations", async () => {
    let container: HTMLElement;
    await act(async () => {
      ({ container } = render(
        await Page({ searchParams: Promise.resolve({}) }),
      ));
    });

    let results;
    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
