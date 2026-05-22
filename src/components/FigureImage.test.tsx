import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, onLoad, ...props }: any) => (
    <img src={src} alt={alt} onLoad={onLoad} {...props} />
  ),
}));

import { FigureImage } from "./FigureImage";

describe("FigureImage", () => {
  it("shows a loading placeholder and then reveals the image after load", () => {
    const { container } = render(
      <FigureImage
        src="/images/test.jpg"
        alt="Test image"
        caption="Caption text"
        width={600}
        height={400}
      />,
    );

    expect(screen.getByAltText("Test image")).toBeInTheDocument();
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();

    fireEvent.load(screen.getByAltText("Test image"));

    expect(container.querySelector(".animate-pulse")).toBeNull();
    expect(screen.getByText("Caption text")).toBeInTheDocument();
  });
});
