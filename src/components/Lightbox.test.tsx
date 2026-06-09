process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test";

import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

const { dragEndInfo } = vi.hoisted(() => ({
  dragEndInfo: { offset: { x: 0 }, velocity: { x: 0 } },
}));

vi.mock("framer-motion", () => {
  const React = require("react");

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, onDragEnd, drag, dragConstraints, dragElastic, ...props }: any) => (
        <div
          {...props}
          data-testid="lightbox-motion"
          onDragEnd={(event) => onDragEnd?.(event, dragEndInfo)}
        >
          {children}
        </div>
      ),
    },
    useReducedMotion: () => false,
  };
});

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

  it("preloads the next-next image when moving forward", () => {
    const imageSrcs: string[] = [];
    const ImageMock = vi.spyOn(window, "Image").mockImplementation(function (this: any) {
      Object.defineProperty(this, "src", {
        get: () => "",
        set: (value: string) => {
          imageSrcs.push(value);
        },
      });
      return this;
    });

    render(
      <Lightbox
        photo={photo}
        nextPhoto={{ ...photo, public_id: "photo-2" }}
        prevPhoto={{ ...photo, public_id: "photo-0" }}
        nextNextPhoto={{ ...photo, public_id: "photo-3" }}
        onClose={vi.fn()}
        onNext={vi.fn()}
        onPrev={vi.fn()}
      />,
    );

    fireEvent.keyDown(document, { key: "ArrowRight" });

    expect(imageSrcs).toContain("https://res.cloudinary.com/test/image/upload/f_auto,q_auto/photo-3.jpg");

    ImageMock.mockRestore();
  });

  it("supports click-zone and swipe navigation", () => {
    const onNext = vi.fn();
    const onPrev = vi.fn();

    render(<Lightbox photo={photo} onClose={vi.fn()} onNext={onNext} onPrev={onPrev} />);

    fireEvent.click(screen.getAllByRole("button", { name: /previous image/i })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: /next image/i })[0]);

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);

    dragEndInfo.offset.x = -200;
    dragEndInfo.velocity.x = -500;
    fireEvent.dragEnd(screen.getAllByTestId("lightbox-motion")[1], {});
    expect(onNext).toHaveBeenCalledTimes(2);

    dragEndInfo.offset.x = 200;
    dragEndInfo.velocity.x = 500;
    fireEvent.dragEnd(screen.getAllByTestId("lightbox-motion")[1], {});
    expect(onPrev).toHaveBeenCalledTimes(2);
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
