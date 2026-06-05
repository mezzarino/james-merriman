import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Accessibility Statement page metadata
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Accessibility Statement | James Merriman",
  description: "Accessibility Statement for James Merriman's website.",
  alternates: {
    canonical: `${config.baseUrl}/accessibility`,
  },
  openGraph: {
    type: "website",
    title: "Accessibility Statement | James Merriman",
    description: "Read the accessibility statement for James Merriman's website.",
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
    title: "Accessibility Statement | James Merriman",
    description: "Read the accessibility statement for James Merriman's website.",
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
        id="accessibility-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                additionalType: "https://schema.org/AccessibilityStatement",
                "@id": `${config.baseUrl}/accessibility#webpage`,
                url: `${config.baseUrl}/accessibility`,
                name: "Accessibility Statement | James Merriman",
                description:
                  "Accessibility statement outlining the digital accessibility features, standards and ongoing improvements for British travel writer and photographer James Merriman.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                publisher: {
                  "@id": `${config.baseUrl}#organization`,
                },
                inLanguage: "en-GB",
                breadcrumb: {
                  "@id": `${config.baseUrl}/accessibility#breadcrumb`,
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/accessibility#breadcrumb`,
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
                    name: "Accessibility",
                    item: `${config.baseUrl}/accessibility`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Accessibility Statement"
        description=""
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Accessibility Statement", href: "/accessibility" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full prose prose-lg max-w-none wrap-break-word blog-content">
            <p>
              <strong>Last updated:</strong> 6th May 2026
            </p>
            <p>
              James Merriman is committed to ensuring that this website is accessible to as many
              people as possible, regardless of technology or ability. We aim to comply with the{" "}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.2</strong>, level{" "}
              <strong>AA</strong>.
            </p>
            <h2 className="mt-12 text-2xl font-semibold">Conformance status</h2>
            <p>
              This website is <strong>substantially compliant</strong> with the{" "}
              <strong>WCAG 2.2 AA</strong> accessibility standard.
            </p>
            <p>
              Accessibility has been considered throughout the design and development of the site,
              with a focus on usability for keyboard users, screen‑reader users, and users who
              prefer reduced motion.
            </p>
            <h2 className="mt-12 text-2xl font-semibold">
              Measures taken to support accessibility
            </h2>
            <p>To support accessibility, this website includes:</p>
            <ul>
              <li>Semantic HTML landmarks (header, nav, main, footer)</li>
              <li>
                A visible <strong>skip-to-content</strong> link
              </li>
              <li>Keyboard‑accessible navigation and dialogs</li>
              <li>Clear focus indicators for all interactive elements</li>
              <li>Touch‑friendly controls that meet WCAG 2.2 target‑size guidance</li>
              <li>
                Respect for system <strong>reduced‑motion preferences</strong>
              </li>
              <li>Accessible forms with labelled inputs and announced error messages</li>
              <li>Meaningful alternative text for images</li>
              <li>Screen‑reader‑friendly pagination and breadcrumb navigation</li>
            </ul>
            <h2 className="mt-12 text-2xl font-semibold">Known limitations</h2>
            <p>We are not currently aware of any accessibility barriers on this website.</p>
            <h2 className="mt-12 text-2xl font-semibold">Feedback and contact information</h2>
            <p>
              If you encounter accessibility issues or need content in an alternative format, please{" "}
              <Link href="/contact">contact us</Link>.
            </p>
            <p>
              We aim to respond to accessibility feedback within <strong>5 working days</strong>.
            </p>
            <h2 className="mt-12 text-2xl font-semibold">Preparation of this statement</h2>
            <p>This statement was prepared following:</p>
            <ul>
              <li>Manual testing using keyboard navigation</li>
              <li>Screen‑reader testing (VoiceOver / NVDA)</li>
              <li>Automated testing using Lighthouse, axe DevTools, and WAVE</li>
              <li>
                Review against <strong>WCAG 2.2 AA</strong> success criteria
              </li>
            </ul>
            <h2 className="mt-12 text-2xl font-semibold">Enforcement procedure</h2>
            <p>
              If you are not satisfied with our response to an accessibility concern, you may
              contact the{" "}
              <a
                href="https://www.equalityadvisoryservice.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the website of the Equality Advisory and Support Service (EASS)"
              >
                Equality Advisory and Support Service (EASS)
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
