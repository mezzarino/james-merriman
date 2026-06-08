// lib/youtube.ts

export function extractYouTubeIds(html: string): string[] {
  const matches = html.matchAll(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/g);
  return Array.from(matches, (m) => m[1]);
}

export async function getYouTubeVideoFromApi(videoId: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos` +
      `?part=snippet,contentDetails,statistics` +
      `&id=${videoId}` +
      `&key=${process.env.YOUTUBE_API_KEY}`,
    { next: { revalidate: 86400 } }, // cache 24h
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
    duration: video.contentDetails.duration, // ISO 8601
    viewCount: Number(video.statistics.viewCount),
  };
}

/**
 * Builds a VideoObject using:
 * - YouTube metadata (title)
 * - Article description as fallback context
 */
export async function buildVideoObjectFromHtml(html: string) {
  const ids = extractYouTubeIds(html);
  if (ids.length === 0) return null;

  const youtubeId = ids[0];
  const meta = await getYouTubeVideoFromApi(youtubeId);
  if (!meta) return null;

  return {
    "@type": "VideoObject",
    name: meta.title,
    description: meta.description,
    thumbnailUrl: [meta.thumbnail],
    uploadDate: meta.uploadDate,
    duration: meta.duration,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    url: `https://www.youtube.com/watch?v=${youtubeId}`,

    // ✅ Optional, now legitimate
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "WatchAction" },
      userInteractionCount: meta.viewCount,
    },
  };
}
