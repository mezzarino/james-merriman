import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-hook-form", async () => {
  const actual = await vi.importActual<typeof import("react-hook-form")>("react-hook-form");

  return {
    ...actual,
    Controller: ({ render }: { render: (props: unknown) => React.ReactElement }) =>
      render({
        field: { name: "email", value: "" },
        fieldState: { error: { message: "Email is required." } },
      }),
    useFormContext: () => ({
      getFieldState: () => ({ error: { message: "Email is required." } }),
      formState: {},
    }),
  };
});

import React from "react";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";

describe("form helpers", () => {
  it("throws a helpful error when useFormField is used without a field context", () => {
    expect(() => render(<FormMessage>Email is required.</FormMessage>)).toThrow(
      "useFormField should be used within <FormField>",
    );
  });

  it("renders field descriptions and error messages with the right accessibility wiring", () => {
    render(
      <FormField
        name="email"
        render={() => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <input aria-label="Email" />
            </FormControl>
            <FormDescription>We will never share this address.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />,
    );

    const input = screen.getByRole("textbox", { name: /email/i });

    expect(screen.getByText("We will never share this address.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toContain("form-item-message");
  });
});
