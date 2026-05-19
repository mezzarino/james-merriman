import "./globals.css";

import { IBM_Plex_Sans } from "next/font/google";
import { headers } from "next/headers";

import { ConsentProvider } from "@/components/analytics/ConsentContext";

import LayoutWrapper from "./LayoutWrapper";
import { Providers } from "./providers";

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isStories = host.startsWith("stories.");

  return {
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

    icons: isStories
      ? {} // ✅ remove icons for stories
      : {
          icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            {
              url: "/favicon-96x96.png",
              type: "image/png",
              sizes: "96x96",
            },
            { url: "/favicon.ico", type: "image/x-icon" },
          ],
          apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
        },

    ...(isStories
      ? {}
      : {
          manifest: "/site.webmanifest", // ✅ only on main site
        }),

    appleWebApp: {
      title: "James Merriman Travel Writer",
    },
  };
}

/**
 * ✅ Root layout (NO conditional UI here)
 * This must stay stable — do not try to detect host here
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isStories = host.startsWith("stories.");

  return (
    <html lang="en-GB">
      <body className={`${fontSans.variable} antialiased font-sans`}>
        <Providers>
          <ConsentProvider>
            <LayoutWrapper isStories={isStories}>{children}</LayoutWrapper>
          </ConsentProvider>
        </Providers>
      </body>
    </html>
  );
}
