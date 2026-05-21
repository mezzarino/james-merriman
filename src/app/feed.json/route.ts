export const dynamic = "auto";
export const revalidate = 3600;

import { NextResponse } from "next/server";
import urlJoin from "url-join";

import { config } from "@/config";

import { wisp } from "../../lib/wisp";

const baseUrl = config.baseUrl;

export async function GET() {
  const result = await wisp.getPosts({ limit: 20 });

  const items = result.posts
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishedAt || 0).getTime();
      return dateB - dateA;
    })
    .map((post) => {
      const url = urlJoin(baseUrl, `/post/${post.slug}`);

      const safeDate =
        post.publishedAt && !isNaN(new Date(post.publishedAt).getTime())
          ? new Date(post.publishedAt)
          : new Date();

      return {
        id: url,
        url,
        title: post.title,
        summary: post.description || "",

        date_published: safeDate.toISOString(),

        date_modified: post.updatedAt?.toISOString(),

        authors: [
          {
            name: "James Merriman",
            url: urlJoin(baseUrl, "/about"),
          },
        ],

        tags: post.tags.map((t) => t.name),

        image: post.image || undefined,

        attachments: post.image
          ? [
              {
                url: post.image,
                mime_type: "image/jpeg",
              },
            ]
          : undefined,
      };
    });

  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: config.title,
    description: config.description,

    home_page_url: baseUrl,
    feed_url: urlJoin(baseUrl, "/feed.json"),

    language: "en-GB",

    favicon: urlJoin(baseUrl, "/favicon.ico"),

    items,
  };

  return NextResponse.json(feed, {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      Link: `<${urlJoin(baseUrl, "/feed.json")}>; rel="alternate"; type="application/feed+json"`,
    },
  });
}
