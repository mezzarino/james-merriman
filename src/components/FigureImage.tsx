"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface FigureImageProps {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
}

export function FigureImage({
  src,
  alt,
  caption,
  width,
  height,
  sizes = "(max-width: 1024px) 100vw, 384px",
  className,
}: FigureImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={cn("w-full", className)}>
      <div
        className="relative w-full overflow-hidden rounded-lg bg-gray-200"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}

        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading="lazy"
          className={cn(
            "h-auto w-full object-cover transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
          )}
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>

      {caption && (
        <figcaption className="mt-2 text-sm text-gray-500 text-center">{caption}</figcaption>
      )}
    </figure>
  );
}
