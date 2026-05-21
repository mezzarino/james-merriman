export const dynamic = "auto";
export const revalidate = 3600; // 1 hour

import { NextResponse } from "next/server";
import RSS, { ItemOptions } from "rss";
import urlJoin from "url-join";

import { config } from "@/config";

import { wisp } from "../../lib/wisp";

const baseUrl = config.baseUrl;

type CustomElement = {
  [key: string]:
    | string
    | {
        _attr?: Record<string, string>;
      };
};

type ExtendedItemOptions = ItemOptions & {
  custom_elements?: CustomElement[];
};

export async function GET() {
  const result = await wisp.getPosts({ limit: 20 });

  const posts = result.posts
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
        title: post.title,
        description: post.description || "",
        url,
        guid: url,
        date: safeDate,
        author: "James Merriman",
        categories: post.tags,
        image: post.image || null,
      };
    });

  const feed = new RSS({
    title: config.title,
    description: config.description,
    site_url: baseUrl,
    feed_url: urlJoin(baseUrl, "/rss"),
    pubDate: new Date(),

    language: "en-GB",
    ttl: 60,

    managingEditor: "info@jamesmerriman.co.uk (James Merriman)",
    webMaster: "info@jamesmerriman.co.uk (James Merriman)",

    copyright: `© ${new Date().getFullYear()} James Merriman`,

    image_url: urlJoin(baseUrl, "/apple-touch-icon.png"),

    custom_namespaces: {
      content: "http://purl.org/rss/1.0/modules/content/",
      media: "http://search.yahoo.com/mrss/",
    },
  });

  posts.forEach((post) => {
    const item: ExtendedItemOptions = {
      title: post.title,
      description: post.description,
      url: post.url,
      guid: post.guid,
      author: post.author,
      date: post.date,
      categories: post.categories.map((t) => t.name),
    };

    if (post.image) {
      item.enclosure = {
        url: post.image,
        type: "image/jpeg",
      };

      item.custom_elements = [
        ...(item.custom_elements || []),
        {
          "media:content": {
            _attr: {
              url: post.image,
              medium: "image",
            },
          },
        },
      ];
    }

    feed.item(item);
  });

  const xml = feed.xml({ indent: true });

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      Link: `<${urlJoin(baseUrl, "/rss")}>; rel="alternate"; type="application/rss+xml"`,
    },
  });
}
