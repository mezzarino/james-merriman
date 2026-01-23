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
        <div className="text-xs text-muted-foreground hidden lg:block">
          <Link
            href={`https://wisp.blog/?utm_source=james-merriman&utm_medium=web&utm_campaign=${config.baseUrl}`}
          >
            Blog powered by wisp
          </Link>
          <AuthNav />
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
