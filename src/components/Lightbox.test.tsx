process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test";

import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

import { Photo } from "@/types/photo";

import { Lightbox } from "./Lightbox";

vi.mock("next-cloudinary");

const photo: Photo = {
  public_id: "photo-1",
  alt: "Test photo",
  category: "photo-category",
  width: 800,
  height: 600,
  format: "jpg",
  version: 1,
};

describe("Lightbox", () => {
  it("renders as a dialog", () => {
    const { getByRole } = render(
      <Lightbox photo={photo} onClose={vi.fn()} onNext={vi.fn()} onPrev={vi.fn()} />,
    );

    expect(getByRole("dialog")).toBeInTheDocument();
  });

  it("closes when Escape is pressed", () => {
    const onClose = vi.fn();

    render(<Lightbox photo={photo} onClose={onClose} onNext={vi.fn()} onPrev={vi.fn()} />);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("navigates with arrow keys", () => {
    const onNext = vi.fn();
    const onPrev = vi.fn();

    render(<Lightbox photo={photo} onClose={vi.fn()} onNext={onNext} onPrev={onPrev} />);

    fireEvent.keyDown(document, { key: "ArrowRight" });
    fireEvent.keyDown(document, { key: "ArrowLeft" });

    expect(onNext).toHaveBeenCalled();
    expect(onPrev).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Lightbox photo={photo} onClose={vi.fn()} onNext={vi.fn()} onPrev={vi.fn()} />,
    );

    let results;
    await act(async () => {
      results = await axe(container);
    });
    expect(results).toHaveNoViolations();
  });
});
