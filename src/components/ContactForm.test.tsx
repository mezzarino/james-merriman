import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "./ContactForm";

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  mockFetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response);
  global.fetch = mockFetch as unknown as typeof fetch;
});

describe("ContactForm", () => {
  it("shows validation errors when submitting an empty form", async () => {
    render(<ContactForm />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Error summary
    expect(await screen.findByText(/please fix the following errors/i)).toBeInTheDocument();

    // Inline + summary errors (duplicates are expected)
    expect(screen.getAllByText(/name is required/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/email is required/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/message is required/i).length).toBeGreaterThan(0);
  });

  it("moves focus to the error summary when validation fails", async () => {
    render(<ContactForm />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const summary = await screen.findByRole("status");

    await waitFor(() => {
      expect(summary).toHaveFocus();
    });
  });

  it("submits successfully with valid input", async () => {
    render(<ContactForm />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), "James Merriman");
    await user.type(screen.getByLabelText(/email/i), "james@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello, this is a test message.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/sent successfully/i)).toBeInTheDocument();
  });

  it("shows a validation error for an invalid email address", async () => {
    render(<ContactForm />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), "James Merriman");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/message/i), "Hello, this is a test message.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findAllByText(/please enter a valid email address/i)).toHaveLength(2);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("registers and executes the MCP tool for agent submissions", async () => {
    const registerTool = vi.fn();
    Object.defineProperty(document, "modelContext", {
      configurable: true,
      value: { registerTool },
    });

    render(<ContactForm />);

    await waitFor(() => expect(registerTool).toHaveBeenCalledTimes(1));

    const tool = registerTool.mock.calls[0][0];

    const firstResult = await tool.execute({
      name: "James",
      email: "james@example.com",
      message: "Hello",
    });

    expect(firstResult).toEqual({ success: true });
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "X-Submission-Type": "mcp-agent" }),
      }),
    );

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Server issue" }),
    } as Response);

    const secondResult = await tool.execute({
      name: "James",
      email: "james@example.com",
      message: "Hello",
    });

    expect(secondResult).toEqual({ success: false, error: "Server issue" });
  });

  it("shows a generic error when the submission request fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    render(<ContactForm />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), "James Merriman");
    await user.type(screen.getByLabelText(/email/i), "james@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello, this is a test message.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/something went wrong\. please try again\./i),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ContactForm />);

    let results;
    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
