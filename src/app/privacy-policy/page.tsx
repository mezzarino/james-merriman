import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { ConsentPreferencesLink } from "@/components/analytics/ConsentPreferencesLink";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Privacy Policy page metadata
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Privacy Policy | James Merriman",
  description:
    "Read the privacy policy for James Merriman's website. Learn how your personal data is collected, used and protected in compliance with UK data protection laws.",
  alternates: {
    canonical: `${config.baseUrl}/privacy-policy`,
  },
  openGraph: {
    type: "website",
    title: "Privacy Policy | James Merriman",
    description:
      "Read the privacy policy for James Merriman's website. Learn how your personal data is collected, used and protected in compliance with UK data protection laws.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | James Merriman",
    description:
      "Read the privacy policy for James Merriman's website. Learn how your personal data is collected, used and protected in compliance with UK data protection laws.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Page = async () => {
  return (
    <>
      <Script
        id="privacy-policy-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${config.baseUrl}/privacy-policy#webpage`,
                url: `${config.baseUrl}/privacy-policy`,
                name: "Privacy Policy | James Merriman",
                description:
                  "Privacy policy outlining how personal data is collected, used and protected by British travel writer and photographer James Merriman.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                publisher: {
                  "@id": `${config.baseUrl}#organization`,
                },
                inLanguage: "en-GB",
                breadcrumb: {
                  "@id": `${config.baseUrl}/privacy-policy#breadcrumb`,
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/privacy-policy#breadcrumb`,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${config.baseUrl}/`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Privacy Policy",
                    item: `${config.baseUrl}/privacy-policy`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Privacy Policy"
        description=""
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full prose prose-lg max-w-none wrap-break-word blog-content">
            <p>
              <strong>Last updated:</strong> 7th May 2026
            </p>
            <h2 className="mt-12 text-2xl font-semibold">Introduction</h2>
            <p>
              This Privacy Policy explains how James Merriman (&quot;we&quot;, &quot;us&quot; or
              &quot;our&quot;) collects, uses and protects your personal data when you visit
              jamesmerriman.co.uk. We are committed to ensuring your privacy is protected and
              compliant with UK data protection laws.
            </p>
            <h2 className="mt-12 text-2xl font-semibold">Information We Collect</h2>
            <p>We may collect and process the following data about you:</p>
            <ul>
              <li>
                <strong>Contact Information:</strong> If you use the contact form on our website we
                will collect your name, email address and the contents of your message. This
                information is not stored on the website database but is sent directly to us as a
                standard email.
              </li>
              <li>
                <strong>Usage Data:</strong> When you visit the site we automatically collect
                information about your equipment, browsing actions and patterns. This includes your
                IP address, browser type, operating system and the pages you view.
              </li>
            </ul>
            <h2 className="mt-12 text-2xl font-semibold">How We Use Your Information</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul>
              <li>To respond to your enquiries and communicate with you.</li>
              <li>To present our website content effectively.</li>
              <li>To analyse website traffic and improve user experience.</li>
            </ul>
            <h2 className="mt-12 text-2xl font-semibold">Cookies and Analytics</h2>
            <p>
              This website uses cookies to distinguish you from other users. This helps provide a
              good experience when browsing the site and allows us to improve how the site works.
            </p>
            <p>
              We use <strong>Google Analytics</strong> to monitor and analyse web traffic. Google
              Analytics uses cookies to collect anonymised information such as pages visited, time
              spent on pages, and interactions with links. This data does not directly identify you.
            </p>
            <p>
              Google Analytics cookies are{" "}
              <strong>only set after you have given explicit consent</strong> via the cookie consent
              banner.
            </p>
            <p>
              Google Analytics cookies may remain on your device for{" "}
              <strong>up to two years</strong>.
            </p>
            <p>
              You can <ConsentPreferencesLink /> at any time using the cookie consent banner or by
              adjusting your browser’s cookie settings.
            </p>
            <h2 className="mt-12 text-2xl font-semibold">Sharing Your Data</h2>
            <p>
              We do not sell your personal information to third parties. Because your contact form
              submission is sent directly via email, it is not processed or stored by third party
              website plugins. We only share anonymised usage data with Google for our website
              analytics.
            </p>
            <h2 className="mt-12 text-2xl font-semibold">Data Retention</h2>
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfil
              the purposes we collected it for. Emails received via the contact form are kept only
              as long as required for our ongoing correspondence or until your enquiry is fully
              resolved. Analytics data is retained according to the standard retention periods set
              within our Google Analytics account.
            </p>
            <h2 className="mt-12 text-2xl font-semibold">Your Legal Rights</h2>
            <p>
              Under UK data protection law you have specific rights regarding your personal
              information. These include the right to:
            </p>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request correction of incomplete or inaccurate data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Request the transfer of your personal data to another party.</li>
            </ul>
            <p>
              To exercise any of these rights please{" "}
              <Link href="/contact">get in touch via the contact form</Link> on this website.
            </p>
            <h2 className="mt-12 text-2xl font-semibold">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
