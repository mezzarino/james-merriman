import { config } from "@/config";
import { Button } from "./ui/button";
import { Rss } from "lucide-react";
import Link from "next/link";
import AuthNav from "./ui/auth-nav";

export const Footer = () => {
  return (
    <footer className="container mx-auto my-4 px-4 max-w-6xl" role="contentinfo">
      <div className="flex justify-between items-center">
        <div className="text-sm mt-4">
          © {config.organization} {new Date().getFullYear()}
        </div>
        <div className="hidden lg:flex items-center gap-3 text-xs text-muted-foreground">
          <Link
            href={`https://wisp.blog/?utm_source=james-merriman&utm_medium=web&utm_campaign=${config.baseUrl}`}
            className="px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Blog powered by Wisp
          </Link>

          <AuthNav />

          <Link
            href="/about"
            className="text-sm underline hover:opacity-70"
          >
            About
          </Link>
        </div>
        <Link href="/rss" title="RSS feed">
          <Button variant="ghost" role="button" aria-label="RSS feed">
            <Rss className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </footer>
  );
};
