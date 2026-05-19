import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { headers } from "next/headers";

import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { ConsentProvider } from "@/components/analytics/ConsentContext";
import { GoogleAnalyticsConsent } from "@/components/analytics/GoogleAnalyticsConsent";
import { Footer } from "@/components/Footer";
import ReadingProgress from "@/components/ui/readingProgress";

import { Providers } from "./providers";

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jamesmerriman.co.uk"),
  title: {
    default: "James Merriman | Travel Writer & Photographer",
    template: "%s",
  },
  description:
    "Award-longlisted travel writer and photographer documenting remote, complex and overlooked destinations across 160+ countries.",
  robots: {
    index: true,
    follow: true,
  },
  authors: [
    {
      name: "James Merriman",
      url: "/about",
    },
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "James Merriman Travel Writer",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  const isStories = host.startsWith("stories.");

  return (
    <html lang="en-GB">
      <body
        className={`${fontSans.variable} antialiased font-sans`}
        style={isStories ? { margin: 0, background: "#000" } : undefined}
      >
        {!isStories && (
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-white text-black px-4 py-2 rounded shadow-sm"
          >
            Skip to main content
          </a>
        )}

        <Providers>
          <ConsentProvider>
            {!isStories && <ReadingProgress />}

            {children}

            {/* ✅ Only render site chrome on main site */}
            {!isStories && (
              <>
                <Footer />
                <SpeedInsights />
                <Analytics />
                <ConsentBanner />
                <GoogleAnalyticsConsent />
              </>
            )}
          </ConsentProvider>
        </Providers>
      </body>
    </html>
  );
}
