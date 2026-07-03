// lib/youtube.ts
import { config } from "@/config";

export function extractYouTubeIds(html: string): string[] {
  const matches = html.matchAll(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/g);
  return Array.from(matches, (m) => m[1]);
}

export async function getYouTubeVideoFromApi(videoId: string) {
  if (!process.env.YOUTUBE_API_KEY) return null;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos` +
      `?part=snippet,contentDetails,statistics` +
      `&id=${videoId}` +
      `&key=${process.env.YOUTUBE_API_KEY}`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) return null;

  const data = await res.json();
  const video = data.items?.[0];
  if (!video) return null;

  return {
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.high.url,
    uploadDate: video.snippet.publishedAt,
    duration: video.contentDetails.duration,
    viewCount: Number(video.statistics.viewCount),
  };
}

async function getYouTubeFromOEmbed(videoId: string) {
  const res = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) return null;

  const data = await res.json();
  return {
    title: data.title,
    thumbnail: data.thumbnail_url,
  };
}

/**
 * Builds a VideoObject using:
 * - YouTube metadata (title)
 * - Article description as fallback context
 */
export async function buildVideoObjectFromHtml(
  html: string,
  articleDescription?: string | null,
  articlePublishedAt?: Date | string | null,
) {
  const ids = extractYouTubeIds(html);
  if (ids.length === 0) return null;

  const youtubeId = ids[0];

  // ✅ Try API first
  const apiMeta = await getYouTubeVideoFromApi(youtubeId);
  if (apiMeta) {
    return {
      "@type": "VideoObject",
      name: apiMeta.title,
      description: apiMeta.description || articleDescription || undefined,
      thumbnailUrl: [apiMeta.thumbnail],
      uploadDate: apiMeta.uploadDate,
      publisher: {
        "@id": `${config.baseUrl}#organization`,
      },
      duration: apiMeta.duration,
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      url: `https://www.youtube.com/watch?v=${youtubeId}`,
      contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: apiMeta.viewCount,
      },
      potentialAction: {
        "@type": "WatchAction",
        target: `https://www.youtube.com/watch?v=${youtubeId}`,
      },
      inLanguage: "en-GB",
    };
  }

  // ✅ Fallback to oEmbed
  const oEmbedMeta = await getYouTubeFromOEmbed(youtubeId);
  if (!oEmbedMeta) return null;

  return {
    "@type": "VideoObject",
    name: oEmbedMeta.title,
    description: articleDescription || undefined,
    thumbnailUrl: [oEmbedMeta.thumbnail],
    publisher: {
      "@id": `${config.baseUrl}#organization`,
    },
    uploadDate: articlePublishedAt ? new Date(articlePublishedAt).toISOString() : undefined,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    url: `https://www.youtube.com/watch?v=${youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    potentialAction: {
      "@type": "WatchAction",
      target: `https://www.youtube.com/watch?v=${youtubeId}`,
    },
    inLanguage: "en-GB",
  };
}
