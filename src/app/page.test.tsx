import { describe, expect, it } from "vitest";
import { generateMetadata } from "./page";
import { config } from "../config";

describe("generateMetadata", () => {
  it("returns noindex robots when query is present", async () => {
    const metadata = await generateMetadata({
      searchParams: Promise.resolve({ query: "test" }),
    });

    expect(metadata).toEqual({
      robots: {
        index: false,
        follow: true,
      },
    });
  });

  it("returns canonical metadata for the first page", async () => {
    const metadata = await generateMetadata({
      searchParams: Promise.resolve({}),
    });

    expect(metadata.title).toBe("Travel Writing and Documentary Photography | James Merriman");
    expect(metadata.alternates?.canonical).toBe(config.baseUrl);
    expect(metadata.openGraph?.url).toBe(config.baseUrl);
    const twitterImages = metadata.twitter?.images;
    expect(Array.isArray(twitterImages) ? twitterImages[0] : twitterImages).toBe(
      "/images/james-merriman-travel-writer.jpg",
    );
  });

  it("returns page metadata for page 2", async () => {
    const metadata = await generateMetadata({
      searchParams: Promise.resolve({ page: "2" }),
    });

    expect(metadata.title).toContain("Page 2");
    expect(metadata.alternates?.canonical).toBe(`${config.baseUrl}/?page=2`);
  });
});
