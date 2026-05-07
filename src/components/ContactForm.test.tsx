import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { ContactForm } from "./ContactForm";

// ✅ Mock fetch for successful submission
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response),
) as unknown as typeof fetch;

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

  it("has no accessibility violations", async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
