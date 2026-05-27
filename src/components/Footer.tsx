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
          <div className="relative w-35 aspect-18/10">
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

      {/* ✅ Footer navigation */}
      <nav aria-label="Footer navigation" className="mb-8">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-base text-muted-foreground">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ✅ Divider */}
      <div className="border-t border-border/50 pt-6" />

      {/* ✅ Bottom row */}
      <div className="flex flex-col items-center gap-4 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:items-center">
        <ul className="flex flex-wrap justify-center gap-4 sm:justify-start">
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
          <li>
            <Link href="/licencing" className="hover:text-foreground">
              Licencing
            </Link>
          </li>
          <li>
            <Link href="/commissions" className="hover:text-foreground">
              Commissions
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link href="/rss" aria-label="RSS feed">
              <Rss className="h-4 w-4" />
            </Link>
          </Button>

          <span>
            © {config.organization} {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* ✅ Accreditation logos */}
      <div className="border-t border-border/30 mt-6 pt-4">
        <div className="flex justify-center">
          <div className="flex items-center gap-4 py-2">
            {/* Proudly Human */}
            <a
              href="https://www.proudlyhuman.org/certified/james-merriman"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the ProudlyHuman™ verification certificate for James Merriman"
            >
              <div className="relative w-24 h-20">
                <Image
                  src="/images/creditation-logos/proudly-human-logo.png"
                  alt="My writing and photography has been independently verified as human-origin by ProudlyHuman™"
                  fill
                  loading="lazy"
                  className="object-contain opacity-90 sm:opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>
            </a>

            {/* One Planet Journey */}
            <a
              href="https://oneplanetjourney.com/about/deep-travel-ambassadors/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find out more about James Merriman's role as a One Planet Journey - Deep Travel Ambassador"
            >
              <div className="relative w-22 h-22">
                <Image
                  src="/images/creditation-logos/opj-ambassador-logo.png"
                  alt="One Planet Journey - Deep Travel Ambassador logo"
                  fill
                  loading="lazy"
                  className="object-contain opacity-90 sm:opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>
            </a>

            {/* CIOJ */}
            <a
              href="https://cioj.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View The Chartered Institute of Journalists website"
            >
              <div className="relative w-22 h-28">
                <Image
                  src="/images/creditation-logos/cioj-logo.png"
                  alt="The Chartered Institute of Journalists logo"
                  fill
                  loading="lazy"
                  className="object-contain opacity-90 sm:opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
