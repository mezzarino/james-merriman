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

      {/* ✅ Footer navigation */}
      <nav aria-label="Footer navigation" className="mb-8">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-base text-muted-foreground">
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

      {/* ✅ Divider */}
      <div className="border-t border-border/50 pt-6" />

      {/* ✅ Bottom row: utilities + badge + rss */}
      <div className="flex flex-col items-center gap-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:items-center">
        {/* ✅ Left: Utility links */}
        <ul className="flex flex-wrap justify-center gap-4 sm:justify-start sm:w-1/3">
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

        {/* ✅ Center: Proudly Human badge */}
        {/* ✅ Center: Accreditation badges */}
        <div className="flex justify-center sm:w-1/3">
          <div className="flex items-center gap-4 py-2 px-3 sm:px-4">
            {/* ✅ Proudly Human (compliant size) */}
            <a
              href="https://www.proudlyhuman.org/certified/james-merriman"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the ProudlyHuman™ verification certificate for James Merriman"
            >
              <div className="relative w-[125px] h-[111px]">
                <Image
                  src="/images/creditation-logos/proudly-human-logo.png"
                  alt="My writing and photography has been independently verified as human-origin by ProudlyHuman™"
                  title="I, James Merriman, declare that other than minimal use generally accepted by copyright agencies I am the proud human author of this work. My assertion of human authorship has been verified by ProudlyHuman™."
                  fill
                  className="object-contain opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
            <a
              href="https://oneplanetjourney.com/about/deep-travel-ambassadors/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find out more about James Merriman's role as a One Planet Journey - Deep Travel Ambassador"
            >
              <div className="relative w-[111px] h-[111px]">
                <Image
                  src="/images/creditation-logos/opj-ambassador-logo.png"
                  alt="One Planet Journey - Deep Travel Ambassador logo"
                  title="James Merriman is a One Planet Journey - Deep Travel Ambassador. Deep travel for me is about spending longer in fewer places and attempting to understand a destination by being away from the main tourist routes and interacting with locals away from the mass tourism trails."
                  fill
                  className="object-contain opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
          </div>
        </div>

        {/* ✅ Right: RSS + copyright */}
        <div className="flex items-center justify-center gap-3 sm:justify-end sm:w-1/3">
          <Link href="/rss">
            <Button variant="ghost" size="icon" aria-label="RSS feed">
              <Rss className="h-4 w-4" />
            </Button>
          </Link>

          <span>
            © {config.organization} {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
};
