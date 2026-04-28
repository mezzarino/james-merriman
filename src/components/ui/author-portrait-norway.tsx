import Image from "next/image";

import { cn } from "@/lib/utils";

interface AuthorPortraitProps {
  className?: string;
  caption?: string;
}

export function AuthorPortraitNorway({
  className,
  caption = "James Merriman in a Norwegian winter",
}: AuthorPortraitProps) {
  return (
    <figure className={cn("w-full", className)}>
      <Image
        src="/images/james-merriman-norway.jpg"
        alt="James Merriman in a Norwegian winter"
        width={1200}
        height={1600}
        className="w-full h-auto rounded-lg"
        sizes="(max-width: 1024px) 100vw, 384px"
        loading="lazy"
      />
      <figcaption className="mt-2 text-sm text-gray-500 text-center">{caption}</figcaption>
    </figure>
  );
}
