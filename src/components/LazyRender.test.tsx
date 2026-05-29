import { render, screen, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LazyRender } from "./LazyRender";

declare global {
  interface Window {
    IntersectionObserver: any;
  }
}

describe("LazyRender", () => {
  it("renders a placeholder and then loads children when intersecting", async () => {
    let intersectionCallback: IntersectionObserverCallback | null = null;

    window.IntersectionObserver = class {
      callback: IntersectionObserverCallback;

      constructor(cb: IntersectionObserverCallback) {
        this.callback = cb;
        intersectionCallback = cb;
      }

      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as any;

    render(
      <LazyRender placeholder={<div data-testid="placeholder">Loading</div>}>
        <div data-testid="content">Loaded content</div>
      </LazyRender>,
    );

    expect(screen.getByTestId("placeholder")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).toBeNull();

    await act(async () => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.queryByTestId("placeholder")).toBeNull();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
