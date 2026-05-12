import { v2 as cloudinary } from "cloudinary";
import { cache } from "react";

import { CloudinaryResource } from "@/types/cloudinary";
import { Photo } from "@/types/photo";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getPhotos(): Promise<Photo[]> {
  const res = await cloudinary.search
    .expression("folder:photography")
    .with_field("context")
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(60)
    .execute();

  const resources = res.resources as CloudinaryResource[];

  return resources.map((img) => ({
    public_id: img.public_id,
    width: img.width,
    height: img.height,
    alt: img.context?.alt || img.public_id.replace(/-/g, " ") || "Photography by James Merriman",
    category: img.tags?.[0] || "uncategorised",
    tags: img.tags || [],
    created_at: img.created_at,
    format: img.format || "jpg",
    version: img.version,
  }));
}

export const getPhotoById = cache(async (id: string): Promise<Photo | null> => {
  const result = await cloudinary.search
    .expression(`public_id:"${id}"`)
    .with_field("context")
    .with_field("tags")
    .max_results(1)
    .execute();

  const img = result.resources?.[0];

  if (!img) return null;

  return {
    public_id: img.public_id,
    width: img.width,
    height: img.height,
    alt:
      img.context?.alt ||
      img.public_id.split("/").pop()?.replace(/-/g, " ") ||
      "Photography by James Merriman",

    category: img.tags?.[0] || "uncategorised",
    tags: img.tags || [],

    created_at: img.created_at,
    format: img.format || "jpg",
    version: img.version,
  };
});
