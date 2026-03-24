"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export function AboutCta() {
  return (
    <article className="sticky top-4 mt-4">
      <Link href="/about" className="block rounded-lg group">
        <AspectRatio ratio={16 / 9} className="w-full">
          <Image
            src="https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg"
            alt="James Merriman, travel writer and photographer"
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </AspectRatio>

        <div className="prose prose-sm dark:prose-invert p-4 transition-colors duration-300 group-hover:text-primary">
          <p className="line-clamp-2 font-bold">
            About James Merriman
          </p>
          <p className="line-clamp-3">
            A brief introduction to my work, travels, and perspective.
          </p>
          <span className="font-semibold inline-block mt-2 group-hover:text-primary">
            Find out more
          </span>
        </div>
      </Link>
    </article>
  );
}