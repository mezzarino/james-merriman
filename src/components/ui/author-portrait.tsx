"use client";

import Image from "next/image";

import { LazyRender } from "@/components/LazyRender";
import { cn } from "@/lib/utils";

interface AuthorPortraitProps {
  className?: string;
  caption?: string;
}

export function AuthorPortrait({
  className,
  caption = "James Merriman – travel writer & photographer",
}: AuthorPortraitProps) {
  return (
    <LazyRender
      placeholder={<div className="w-full aspect-[3/4] rounded-lg bg-muted animate-pulse" />}
    >
      <figure className={cn("w-full", className)}>
        <Image
          src="https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg"
          alt="James Merriman, UK travel writer and photographer"
          width={1200}
          height={1600}
          className="w-full h-auto rounded-lg"
          sizes="(max-width: 1024px) 100vw, 384px"
          /* ✅ allow native lazy loading */
        />

        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption}
        </figcaption>
      </figure>
    </LazyRender>
  );
}
