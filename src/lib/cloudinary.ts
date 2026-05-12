import { v2 as cloudinary } from "cloudinary";

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
    .sort_by("created_at", "desc")
    .max_results(60)
    .execute();

  const resources = res.resources as CloudinaryResource[];

  return resources.map((img) => ({
    public_id: img.public_id,
    width: img.width,
    height: img.height,
    alt: img.context?.custom?.alt || "Photography by James Merriman",
    category: img.context?.custom?.category || "all",
    created_at: img.created_at,
    format: img.format || "jpg",
  }));
}
