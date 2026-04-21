import { Rss } from "lucide-react";
import Link from "next/link";

import { config } from "@/config";
import { MAIN_NAV } from "@/lib/navigation";

import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="container mx-auto my-4 max-w-6xl px-4" role="contentinfo">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Copyright */}
        <div className="text-sm">
          © {config.organization} {new Date().getFullYear()}
        </div>

        {/* Footer navigation */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Link
            href={`https://wisp.blog/?utm_source=james-merriman&utm_medium=web&utm_campaign=${config.baseUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Powered by Wisp
          </Link>

          <Link href="/rss" aria-label="RSS feed">
            <Button variant="ghost">
              <Rss className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
