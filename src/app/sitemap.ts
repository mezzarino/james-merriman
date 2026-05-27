export const dynamic = "force-dynamic";
export const revalidate = 360; // 1 hour

import type { MetadataRoute } from "next";
import urlJoin from "url-join";

import { config } from "@/config";

import { wisp } from "../lib/wisp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsResult = await wisp.getPosts({ limit: "all" });
  const tagsResult = await wisp.getTags();

  return [
    // ✅ Core pages
    {
      url: config.baseUrl,
      lastModified: new Date("2026-05-27"),
      priority: 1.0,
    },

    {
      url: "https://stories.jamesmerriman.co.uk/",
      lastModified: new Date("2026-05-19"),
      priority: 0.6,
    },

    {
      url: "https://stories.jamesmerriman.co.uk/afghanistan-anxious-explorer",
      lastModified: new Date("2026-05-19"),
      priority: 0.7,
    },

    {
      url: urlJoin(config.baseUrl, "publications"),
      lastModified: new Date("2026-05-19"),
      priority: 0.8,
    },
    {
      url: urlJoin(config.baseUrl, "talks-presentations"),
      lastModified: new Date("2026-05-27"),
      priority: 0.8,
    },
    {
      url: urlJoin(config.baseUrl, "photography"),
      lastModified: new Date("2026-05-26"),
      priority: 0.8,
    },
    {
      url: urlJoin(config.baseUrl, "about"),
      lastModified: new Date("2026-05-27"),
      priority: 0.8,
    },
    {
      url: urlJoin(config.baseUrl, "credentials"),
      lastModified: new Date("2026-05-19"),
      priority: 0.8,
    },
    {
      url: urlJoin(config.baseUrl, "contact"),
      lastModified: new Date("2026-05-19"),
      priority: 0.8,
    },
    {
      url: urlJoin(config.baseUrl, "category"),
      lastModified: new Date("2026-05-19"),
      priority: 0.6,
    },

    // ✅ Blog posts
    ...postsResult.posts.map((post) => ({
      url: urlJoin(config.baseUrl, "post", post.slug),
      lastModified: new Date(post.updatedAt || post.publishedAt || post.createdAt),
      priority: 0.7,
    })),

    // ✅ Tags
    ...tagsResult.tags.map((tag) => ({
      url: urlJoin(config.baseUrl, "category", tag.name),
      lastModified: new Date("2026-05-19"),
      priority: 0.5,
    })),

    {
      url: urlJoin(config.baseUrl, "privacy-policy"),
      lastModified: new Date("2026-05-19"),
      priority: 0.4,
    },
    {
      url: urlJoin(config.baseUrl, "accessibility"),
      lastModified: new Date("2026-05-19"),
      priority: 0.4,
    },
    {
      url: urlJoin(config.baseUrl, "licencing"),
      lastModified: new Date("2026-05-27"),
      priority: 0.4,
    },
    {
      url: urlJoin(config.baseUrl, "commissions"),
      lastModified: new Date("2026-05-27"),
      priority: 0.4,
    },
  ];
}
