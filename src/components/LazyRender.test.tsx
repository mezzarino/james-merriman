import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LazyRender } from "./LazyRender";

type IntersectionObserverCtor = new (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => IntersectionObserver;

describe("LazyRender", () => {
  it("renders a placeholder and then loads children when intersecting", async () => {
    let intersectionCallback: IntersectionObserverCallback | null = null;

    const IntersectionObserverMock: IntersectionObserverCtor = class {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }

      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = () => [];

      readonly root: Element | null = null;
      readonly rootMargin = "";
      readonly scrollMargin: string = "";
      readonly thresholds: ReadonlyArray<number> = [];
    };

    window.IntersectionObserver = IntersectionObserverMock;

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
