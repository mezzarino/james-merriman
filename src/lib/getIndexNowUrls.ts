// app/lib/getIndexNowUrls.ts
import type { MetadataRoute } from "next";

import sitemap from "@/app/sitemap";

export async function getIndexNowUrls(): Promise<MetadataRoute.Sitemap> {
  return sitemap();
}
