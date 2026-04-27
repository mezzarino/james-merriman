// app/lib/getIndexNowUrls.ts
import sitemap from "@/app/sitemap";

export async function getIndexNowUrls(): Promise<string[]> {
  const entries = await sitemap();
  return entries.map((entry) => entry.url);
}
