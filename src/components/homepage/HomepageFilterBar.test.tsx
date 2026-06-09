import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const never = new Promise(() => {});

vi.mock("next/dynamic", () => ({
  default: () => {
    const DynamicPlaceholder = () => {
      throw never;
    };

    return DynamicPlaceholder;
  },
}));

import { HomepageFilterBar } from "./HomepageFilterBar";

describe("HomepageFilterBar", () => {
  it("renders the skeleton fallback while the filter bar is loading", () => {
    const { container } = render(<HomepageFilterBar />);

    expect(container.querySelector('div[class*="w-full px-4 lg:px-0 my-6"]')).toBeInTheDocument();
    expect(
      container.querySelectorAll('div[class*="h-11"][class*="w-24"][class*="rounded"]'),
    ).toHaveLength(6);
    expect(
      container.querySelector('div[class*="h-10"][class*="w-10"][class*="rounded-md"]'),
    ).toBeInTheDocument();
  });
});
