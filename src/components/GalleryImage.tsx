"use client";

import Image from "next/image";
import { useState } from "react";

import { Photo } from "@/types/photo";

type Props = {
  photo: Photo;
};

const cloudinaryLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return src;

  const safeQuality = quality ?? 80;
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_${width},f_auto,q_${safeQuality}/${src}`;
};

export const GalleryImage = ({ photo }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure>
      <div
        className="relative w-full overflow-hidden rounded-lg bg-gray-200"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse motion-reduce:animate-none" />
        )}

        <Image
          loader={cloudinaryLoader}
          src={`v${photo.version}/${photo.public_id}.${photo.format}`}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 opacity-35 select-none">
          <span className="text-[10px] font-semibold tracking-[0.22em] text-white/90 drop-shadow-sm uppercase">
            James Merriman
          </span>
        </div>
      </div>

      <figcaption className="mt-2 text-sm text-gray-600">{photo.alt}</figcaption>
    </figure>
  );
};
