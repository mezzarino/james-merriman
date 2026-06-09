process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

function buildManyPhotos(count: number): Photo[] {
  return Array.from({ length: count }, (_, index) => ({
    public_id: `photo-${index + 1}`,
    alt: `Gallery image ${index + 1}`,
    tags: [index % 2 === 0 ? "afghanistan" : "france"],
    category: index % 2 === 0 ? "afghanistan" : "france",
    width: 800,
    height: 600,
    format: "jpg",
    version: 1,
  }));
}

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

  it("shows the load-more control and closes the lightbox", async () => {
    const manyPhotos = buildManyPhotos(16);
    render(<AdvancedGallery initialPhotos={manyPhotos} />);

    expect(screen.getByRole("button", { name: /load more/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /load more/i }));

    expect(screen.getByText("Gallery image 16")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Gallery image 1"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close image/i }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("navigates the lightbox to the next and previous images", () => {
    render(<AdvancedGallery initialPhotos={photos} />);

    fireEvent.click(screen.getByText("Afghanistan landscape"));
    expect(screen.getByRole("dialog", { name: /afghanistan landscape/i })).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /next image/i })[1]);
    expect(screen.getByRole("dialog", { name: /france countryside/i })).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /previous image/i })[1]);
    expect(screen.getByRole("dialog", { name: /afghanistan landscape/i })).toBeInTheDocument();
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
