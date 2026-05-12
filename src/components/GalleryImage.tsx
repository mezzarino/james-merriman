"use client";

import { CldImage } from "next-cloudinary";
import { useState } from "react";

import { Photo } from "@/types/photo";

type Props = {
  photo: Photo;
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

        <CldImage
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${photo.version}/${photo.public_id}.${photo.format}`}
          preserveTransformations
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 768px) 100vw, 33vw"
          quality="auto"
          format="auto"
          loading="lazy"
          decoding="async"
          placeholder="blur"
          blurDataURL={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_50,q_10,e_blur:1000/${photo.public_id}`}
          onLoad={() => setLoaded(true)}
          overlays={[
            {
              publicId: "james-merriman-watermark",
              width: "1.2",
              crop: "scale",
              effects: [{ name: "opacity", value: 40 }],
              position: { gravity: "center" },
            },
          ]}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <figcaption className="mt-2 text-sm text-gray-600">{photo.alt}</figcaption>
    </figure>
  );
};
