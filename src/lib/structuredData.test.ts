import { describe, expect, it } from "vitest";

import { buildImageObject } from "./structuredData"

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
    });
  });
});
