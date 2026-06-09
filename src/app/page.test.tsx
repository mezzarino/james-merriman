import { describe, expect, it } from "vitest";

import { config } from "../config";
import Page, { generateMetadata } from "./page";

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

describe("homepageContent", () => {
  it("redirects ?page=1 to the root URL", async () => {
    const props: {
      searchParams?: Promise<{ query?: string; page?: string }>;
    } = {
      searchParams: Promise.resolve({ page: "1" }),
    };

    try {
      await Page(props);
      throw new Error("Expected redirect did not occur");
    } catch (error) {
      expect(error).toHaveProperty("digest", "NEXT_REDIRECT");
      expect(String(error)).toContain(config.baseUrl);
    }
  });
});
