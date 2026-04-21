import { Rss } from "lucide-react";
import Link from "next/link";

import { config } from "@/config";
import { MAIN_NAV } from "@/lib/navigation";

import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="container mx-auto my-8 max-w-6xl px-4" role="contentinfo">
      {/* ✅ Context / trust sentence */}
      <p className="mb-6 max-w-xl text-sm text-muted-foreground text-center sm:text-left">
        James Merriman is a British travel writer and photographer documenting culture, history and
        remote places worldwide.
      </p>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Copyright */}
        <div className="text-sm text-center sm:text-left">
          © {config.organization} {new Date().getFullYear()}
        </div>

        {/* Footer navigation */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Utilities */}
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground sm:justify-end">
          <Link
            href={`https://wisp.blog/?utm_source=james-merriman&utm_medium=web&utm_campaign=${config.baseUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Powered by Wisp
          </Link>

          <Link href="/rss">
            <Button variant="ghost" aria-label="RSS feed">
              <Rss className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
