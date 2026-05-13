import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react";
import { describe, expect, it } from "vitest";

import Page from "./page";

describe("Contact page accessibility", () => {
  it("has no WCAG violations", async () => {
    const { container } = render(<Page />);
    let results;
    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
