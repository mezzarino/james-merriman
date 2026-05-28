"use client";

import Script from "next/script";

import { useConsent } from "./ConsentContext";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

export function GoogleAnalytics() {
  const { consent } = useConsent();

  if (consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `,
        }}
      />
    </>
  );
}
