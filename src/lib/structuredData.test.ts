import { describe, expect, it } from "vitest";

import { buildImageObject } from "./structuredData";

describe("buildImageObject", () => {
  it("normalizes relative image paths into absolute ImageObject metadata", () => {
    const image = buildImageObject("/images/example.jpg", {
      baseUrl: "https://www.example.com",
      width: 1200,
      height: 630,
      name: "Example image",
      caption: "Example caption",
      licenseUrl: "https://www.example.com/licencing",
      acquireLicensePage: "https://www.example.com/licencing",
    });

    expect(image).toMatchObject({
      "@type": "ImageObject",
      url: "https://www.example.com/images/example.jpg",
      contentUrl: "https://www.example.com/images/example.jpg",
      width: 1200,
      height: 630,
      name: "Example image",
      caption: "Example caption",
      description: "Example caption",
      representativeOfPage: true,
      license: "https://www.example.com/licencing",
      acquireLicensePage: "https://www.example.com/licencing",
      copyrightNotice: "© James Merriman",
      creditText: "James Merriman",
      creator: {
        "@type": "Person",
        name: "James Merriman",
        url: "https://www.example.com",
      },
    });
  });

  it("handles absolute URLs, protocol-relative URLs, and fallback values", () => {
    const image = buildImageObject("https://cdn.example.com/photo.jpg", {
      baseUrl: "https://www.example.com",
      description: "Fallback description",
      thumbnailUrl: "//cdn.example.com/thumb.jpg",
      representativeOfPage: false,
      copyrightNotice: "Custom notice",
      creditText: "Custom credit",
      creator: { "@type": "Person", name: "Example Creator", url: "https://creator.example" },
    });

    expect(image).toMatchObject({
      url: "https://cdn.example.com/photo.jpg",
      contentUrl: "https://cdn.example.com/photo.jpg",
      description: "Fallback description",
      thumbnailUrl: "https://cdn.example.com/thumb.jpg",
      representativeOfPage: false,
      copyrightNotice: "Custom notice",
      creditText: "Custom credit",
      creator: { name: "Example Creator" },
    });
  });

  it("falls back to the caption when description is not provided", () => {
    const image = buildImageObject("/images/example.jpg", {
      baseUrl: "https://www.example.com",
      caption: "Caption fallback",
    });

    expect(image.description).toBe("Caption fallback");
  });
});
