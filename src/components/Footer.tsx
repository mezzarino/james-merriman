import { Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { config } from "@/config";
import { MAIN_NAV } from "@/lib/navigation";

import { Button } from "./ui/button";
import { SocialLinks } from "./ui/social-links";

export const Footer = () => {
  return (
    <footer className="container mx-auto my-8 max-w-6xl px-4 border-t border-border/50">
      {/* ✅ Logo */}
      <div className="mx-auto pt-8 mb-6 flex justify-center">
        <Link href="/" aria-label="James Merriman home">
          <div className="relative w-[140px] aspect-[18/10]">
            <Image
              src="/james-merriman-travel-writer-logo-grey.png"
              alt="James Merriman – Travel Writer"
              fill
              className="object-contain"
              sizes="140px"
            />
          </div>
        </Link>
      </div>

      {/* ✅ Trust / context */}
      <p className="mb-6 text-sm text-muted-foreground text-center">
        James Merriman is a British travel writer and photographer documenting culture, history and
        remote places worldwide.
      </p>

      {/* ✅ Social links */}
      <div className="flex justify-center mb-6">
        <SocialLinks />
      </div>

      {/* ✅ Footer content */}
      <div className="flex flex-col gap-6">
        {/* ✅ Top row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <div className="text-sm text-center sm:text-left text-muted-foreground">
            © {config.organization} {new Date().getFullYear()}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm md:text-base">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ✅ Divider */}
        <div className="border-t border-border/50 pt-4" />

        {/* ✅ Bottom row */}
        <div className="flex flex-col items-center gap-4 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          {/* Utility links */}
          <ul className="flex flex-wrap justify-center gap-3">
            <li>
              <Link
                href={`https://wisp.blog/?utm_source=james-merriman&utm_medium=web&utm_campaign=${config.baseUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Powered by Wisp
              </Link>
            </li>

            <li>
              <Link href="/privacy-policy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/accessibility" className="hover:text-foreground">
                Accessibility
              </Link>
            </li>
          </ul>

          {/* RSS button */}
          <Link href="/rss">
            <Button variant="ghost" size="icon" aria-label="RSS feed">
              <Rss className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
