import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";
import ReadingProgress from "@/components/ui/readingProgress";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "James Merriman | Travel Writer & Documentary Photographer",
  description:
    "Award-longlisted travel writer and photographer documenting remote, complex and overlooked destinations across 160+ countries.",
  alternates: {
    canonical: "https://www.jamesmerriman.co.uk",
  },
  openGraph: {
    title: "James Merriman | Travel Writer & Documentary Photographer",
    description:
      "Award-longlisted travel writer and photographer documenting remote, complex and overlooked destinations across 160+ countries.",
    url: "https://www.jamesmerriman.co.uk",
    siteName: "James Merriman",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Merriman | Travel Writer & Documentary Photographer",
    description:
      "Award-longlisted travel writer and photographer documenting remote, complex and overlooked destinations across 160+ countries.",
  },
  other: {
    sameAs: JSON.stringify([
      "https://x.com/mezzarino",
      "https://linkedin.com/in/jamesmerriman",
      "https://instagram.com/mezzarino",
    ]),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
