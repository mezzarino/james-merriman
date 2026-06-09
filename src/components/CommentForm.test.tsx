import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AxiosError } from "axios";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { CommentForm } from "./CommentForm";

const toastMock = vi.fn();

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: toastMock }),
}));

const createCommentMock = vi.fn();

vi.mock("../lib/wisp", () => ({
  wisp: {
    createComment: (...args: unknown[]) => createCommentMock(...args),
  },
}));

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe("CommentForm", () => {
  beforeEach(() => {
    class ResizeObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    createCommentMock.mockReset();
    toastMock.mockReset();
  });

  it("submits successfully, shows the verification alert, and calls onSuccess", async () => {
    createCommentMock.mockResolvedValue({ success: true });
    const onSuccess = vi.fn();

    renderWithQueryClient(
      <CommentForm
        slug="test-post"
        config={{
          enabled: true,
          allowUrls: true,
          allowNested: false,
          signUpMessage: "Receive email updates about replies",
        }}
        onSuccess={onSuccess}
      />,
    );

    expect(screen.getByLabelText("Receive email updates about replies")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^Name$/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/^Website \(optional\)$/i), {
      target: { value: "https://example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Comment$/i), { target: { value: "Nice post" } });
    fireEvent.click(screen.getByLabelText("Receive email updates about replies"));
    fireEvent.click(screen.getByRole("button", { name: /post comment/i }));

    await waitFor(() => expect(createCommentMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Pending email verification")).toBeInTheDocument();
  });

  it("shows a destructive toast when the comment request fails with an Axios error", async () => {
    const axiosError = new AxiosError("Request failed");
    Object.assign(axiosError, {
      response: {
        data: { error: { message: "Email verification failed" } },
      },
    });

    createCommentMock.mockRejectedValue(axiosError);

    renderWithQueryClient(
      <CommentForm
        slug="test-post"
        config={{
          enabled: true,
          allowUrls: false,
          allowNested: false,
          signUpMessage: null,
        }}
      />,
    );

    fireEvent.change(screen.getByLabelText(/^Name$/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/^Comment$/i), { target: { value: "Nice post" } });
    fireEvent.click(screen.getByRole("button", { name: /post comment/i }));

    await waitFor(() => expect(toastMock).toHaveBeenCalledWith({
      title: "Error",
      description: "Email verification failed",
      variant: "destructive",
    }));
  });
});
