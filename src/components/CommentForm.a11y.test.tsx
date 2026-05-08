import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CommentForm } from "./CommentForm";

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe("CommentForm accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderWithQueryClient(
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
