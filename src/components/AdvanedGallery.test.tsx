process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test";

import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-cloudinary");

import { act } from "react";

import { Photo } from "@/types/photo";

import { AdvancedGallery } from "./AdvancedGallery";

const photos: Photo[] = [
  {
    public_id: "photo-1",
    alt: "Afghanistan landscape",
    tags: ["afghanistan"],
    category: "afghanistan",
    width: 800,
    height: 600,
    format: "jpg",
    version: 1,
  },
  {
    public_id: "photo-2",
    alt: "France countryside",
    tags: ["france"],
    category: "france",
    width: 800,
    height: 600,
    format: "jpg",
    version: 1,
  },
];

describe("AdvancedGallery", () => {
  it("renders all images initially", () => {
    render(<AdvancedGallery initialPhotos={photos} />);

    expect(screen.getByText("Afghanistan landscape")).toBeInTheDocument();
    expect(screen.getByText("France countryside")).toBeInTheDocument();
  });

  it("filters images by category", () => {
    render(<AdvancedGallery initialPhotos={photos} />);

    fireEvent.click(screen.getByRole("button", { name: /^afghanistan$/i }));

    expect(screen.getByText("Afghanistan landscape")).toBeInTheDocument();
    expect(screen.queryByText("France countryside")).toBeNull();
  });

  it("opens the lightbox when an image is clicked", () => {
    render(<AdvancedGallery initialPhotos={photos} />);

    fireEvent.click(screen.getByText("Afghanistan landscape"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has no basic accessibility violations", async () => {
    const { container } = render(<AdvancedGallery initialPhotos={photos} />);
    let results;
    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
