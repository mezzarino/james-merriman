import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import ReadingProgress from "./readingProgress";

describe("ReadingProgress", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => ({
        matches: false,
        media: "(prefers-reduced-motion: reduce)",
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });

    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 800,
    });

    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    Object.defineProperty(document.documentElement, "scrollHeight", {
      writable: true,
      configurable: true,
      value: 2000,
    });
  });

  it("updates the progress bar based on the current scroll position", () => {
    const { container } = render(<ReadingProgress />);

    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 600,
    });

    fireEvent.scroll(window);

    const progressBar = container.querySelector('[aria-hidden="true"] > div') as HTMLElement;

    expect(progressBar).toHaveStyle({ transform: "scaleX(0.5)" });
  });
});
