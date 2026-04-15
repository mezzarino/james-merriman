import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";

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

  title: "James Merriman | Travel Writer & Photographer",
  description:
    "Award-longlisted travel writer and photographer documenting remote, complex and overlooked destinations across 160+ countries.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  authors: [
    {
      name: "James Merriman",
      url: "/about",
    },
  ],

  openGraph: {
    title: "James Merriman | Travel Writer & Photographer",
    description:
      "Award-longlisted travel writer and photographer documenting remote, complex and overlooked destinations across 160+ countries.",
    url: "/",
    siteName: "James Merriman",
    type: "website",
    images: [
      {
        url: "/james-merriman-travel-writer.jpg",
        width: 1200,
        height: 630,
        alt: "James Merriman – Travel Writer and Photographer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "James Merriman | Travel Writer & Photographer",
    description:
      "Award-longlisted travel writer and photographer documenting remote, complex and overlooked destinations across 160+ countries.",
    images: ["/james-merriman-travel-writer.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${fontSans.variable} antialiased font-sans`}>
        <Providers>
          {/* Reading progress bar */}
          <ReadingProgress />

          {/* Main content */}
          {children}

          {/* Footer */}
          <Footer />

          {/* Performance and analytics */}
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
