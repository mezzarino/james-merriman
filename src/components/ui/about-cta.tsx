"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export function AboutCta() {
  return (
    <article className="lg:sticky lg:top-4 mt-4">
      <Link href="/about" className="block rounded-lg group overflow-hidden bg-muted">
        <AspectRatio ratio={16 / 9} className="w-full">
          <Image
            src="https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg"
            alt="James Merriman, travel writer and photographer"
            fill
            quality={65}
            sizes="(max-width: 1024px) 100vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQwIiBoZWlnaHQ9IjYzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODQwIiBoZWlnaHQ9IjYzMCIgZmlsbD0iI2VlZWVlZSIvPjwvc3ZnPg=="
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </AspectRatio>

        <div className="prose prose-sm dark:prose-invert p-4 transition-colors duration-300 group-hover:text-primary">
          <p className="font-bold">Meet James Merriman, Travel Writer & Storyteller</p>
          <p>
            James Merriman writes narrative travel stories exploring landscapes and communities
            across the world, capturing the quieter stories of remote and often overlooked
            destinations.
          </p>
          <span className="font-semibold inline-block mt-2 group-hover:text-primary">
            Learn more about James Merriman’s travel writing
          </span>
        </div>
      </Link>
    </article>
  );
}
