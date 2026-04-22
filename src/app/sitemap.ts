export const dynamic = "force-dynamic";
export const revalidate = 360; // 1 hour

import type { MetadataRoute } from "next";
import urlJoin from "url-join";

import { config } from "@/config";

import { wisp } from "../lib/wisp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsResult = await wisp.getPosts({
    limit: "all",
  });

  const tagsResult = await wisp.getTags();

  return [
    {
      url: config.baseUrl,
      lastModified: new Date("2026-01-01"),
      priority: 1.0,
    },

    {
      url: urlJoin(config.baseUrl, "publications"),
      lastModified: new Date("2026-04-22"),
      priority: 0.8,
    },

    {
      url: urlJoin(config.baseUrl, "about"),
      lastModified: new Date("2026-04-21"),
      priority: 0.8,
    },

    {
      url: urlJoin(config.baseUrl, "credentials"),
      lastModified: new Date("2026-04-21"),
      priority: 0.8,
    },

    {
      url: urlJoin(config.baseUrl, "contact"),
      lastModified: new Date("2026-04-21"),
      priority: 0.8,
    },

    {
      url: urlJoin(config.baseUrl, "category"),
      lastModified: new Date("2026-01-01"),
      priority: 0.6,
    },

    ...postsResult.posts.map((post) => ({
      url: urlJoin(config.baseUrl, "post", post.slug),
      lastModified: new Date(post.updatedAt || post.publishedAt || post.createdAt),
      priority: 0.7,
    })),

    ...tagsResult.tags.map((tag) => ({
      url: urlJoin(config.baseUrl, "category", tag.name),
      lastModified: new Date("2026-01-01"),
      priority: 0.5,
    })),
  ];
}
