// lib/youtube.ts

export function extractYouTubeIds(html: string): string[] {
  const matches = html.matchAll(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/g);
  return Array.from(matches, (m) => m[1]);
}

export async function getYouTubeOEmbed(videoId: string) {
  const res = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) return null;

  return res.json() as Promise<{
    title: string;
    author_name: string;
    thumbnail_url: string;
  }>;
}

/**
 * Builds a VideoObject using:
 * - YouTube metadata (title)
 * - Article description as fallback context
 */
export async function buildVideoObjectFromHtml(html: string, articleDescription?: string | null) {
  const ids = extractYouTubeIds(html);
  if (ids.length === 0) return null;

  const youtubeId = ids[0];
  const meta = await getYouTubeOEmbed(youtubeId);
  if (!meta) return null;

  return {
    "@type": "VideoObject",
    name: meta.title,

    description:
      articleDescription?.trim() || `Video content referenced in the accompanying travel essay.`,

    thumbnailUrl: [meta.thumbnail_url],
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    url: `https://www.youtube.com/watch?v=${youtubeId}`,
  };
}
