import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react";
import { describe, expect, it } from "vitest";

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

    let results;
    await act(async () => {
      results = await axe(container);
    });
    expect(results).toHaveNoViolations();
  });
});
