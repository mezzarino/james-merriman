import type { Metadata } from "next";
import Link from "next/link";

import { FullWidthHeader } from "@/components/FullWidthHeader";

export const metadata: Metadata = {
  title: "Page not found | James Merriman",
  description:
    "The page you’re looking for doesn’t exist. Explore travel writing by James Merriman or return to the homepage.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <FullWidthHeader
        title="Page not found"
        description="The page you’re looking for may have moved, no longer exists, or is temporarily unavailable"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "404", href: "" },
        ]}
      />
      <main id="main" tabIndex={-1}>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="font-medium underline">
            Go to homepage
          </Link>

          <Link href="/category" className="font-medium underline">
            Browse travel writing categories
          </Link>

          <Link href="/about" className="font-medium underline">
            About James Merriman
          </Link>
        </div>
      </main>
    </>
  );
}
