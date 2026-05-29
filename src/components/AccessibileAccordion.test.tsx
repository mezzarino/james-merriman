import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import AccessibleAccordion from "./AccessibleAccordion";

const faqItems = [
  {
    question: "What draws you to post-conflict regions?",
    answer: "I want to see what daily life looks like after the global news cycle moves on.",
  },
  {
    question: "Why base yourself in Devon?",
    answer:
      "Coming back to the South West gives me the physical distance required to review my notes.",
  },
];

describe("AccessibleAccordion", () => {
  it("renders the FAQ heading and items", () => {
    render(<AccessibleAccordion items={faqItems} />);

    expect(
      screen.getByRole("heading", { name: /frequently asked questions/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(faqItems[0].question)).toBeInTheDocument();
    expect(screen.getByText(faqItems[1].question)).toBeInTheDocument();
  });

  it("toggles a panel when a question is clicked", () => {
    render(<AccessibleAccordion items={faqItems} />);

    const firstQuestion = screen.getByText(faqItems[0].question);
    const firstSummary = firstQuestion.closest("summary");

    expect(firstSummary).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(firstSummary!);
    expect(firstSummary).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(firstSummary!);
    expect(firstSummary).toHaveAttribute("aria-expanded", "false");
  });

  it("has no basic accessibility violations", async () => {
    const { container } = render(<AccessibleAccordion items={faqItems} />);

    let results;
    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
