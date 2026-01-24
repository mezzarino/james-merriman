import readingTime from "reading-time";

export function getReadingTimeFromHtml(html: string) {
  // Strip HTML tags
  const text = html.replace(/<[^>]+>/g, " ");

  return readingTime(text).text; // "6 min read"
}