import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import { CommentForm } from "./CommentForm";

describe("CommentForm accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <CommentForm
        slug="test-post"
        config={{
          enabled: true,
          allowUrls: true,
          allowNested: false,
          signUpMessage: null,
        }}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
