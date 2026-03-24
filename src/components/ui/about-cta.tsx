"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export function AboutCta() {
  return (
    <article className="bg-muted overflow-hidden rounded-lg group">
      <Link href="/about" className="block">
        <AspectRatio ratio={16 / 9} className="w-full">
          <Image
            src="https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg"
            alt="James Merriman, travel writer and photographer"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </AspectRatio>

        <div className="prose prose-sm dark:prose-invert p-4">
          <h3 className="line-clamp-2">
            About James Merriman
          </h3>
          <p className="line-clamp-3">
            A brief introduction to my work, travels, and perspective.
          </p>
          <span className="font-semibold inline-block mt-2">
            Find out more →
          </span>
        </div>
      </Link>
    </article>
  );
}