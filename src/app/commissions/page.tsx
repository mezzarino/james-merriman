import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { FigureImage } from "@/components/FigureImage";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";

/**
 * Commissions page metadata
 */
const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Commissions | James Merriman",
  description:
    "Information on commissioning travel writing and documentary photography projects by James Merriman.",
  alternates: {
    canonical: `${config.baseUrl}/commissions`,
  },
  openGraph: {
    type: "website",
    title: "Commissions | James Merriman",
    description:
      "Commissioned travel writing, long‑form features and documentary photography projects by James Merriman.",
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
    title: "Commissions | James Merriman",
    description: "Commissioned travel writing and documentary photography by James Merriman.",
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
      {/* ✅ Structured data */}
      <Script
        id="commissions-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${config.baseUrl}/commissions#webpage`,
                url: `${config.baseUrl}/commissions`,
                name: "Commissions",
                description:
                  "Information on commissioning travel writing and documentary photography projects by James Merriman.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                publisher: {
                  "@id": `${config.baseUrl}#organization`,
                },
                inLanguage: "en-GB",
                breadcrumb: {
                  "@id": `${config.baseUrl}/commissions#breadcrumb`,
                },
              },
              {
                "@type": "Service",
                "@id": `${config.baseUrl}/commissions#service`,
                name: "Editorial Travel Writing and Documentary Photography",
                description:
                  "Commissioned travel writing, long‑form features and documentary photography projects developed through field research and on‑the‑ground reporting.",
                provider: {
                  "@id": `${config.baseUrl}#organization`,
                },
                areaServed: {
                  "@type": "Place",
                  name: "Worldwide",
                },
                audience: {
                  "@type": "Audience",
                  audienceType:
                    "Editors, publishers, cultural organisations, academic institutions",
                },
                isRelatedTo: {
                  "@id": `${config.baseUrl}/commissions#webpage`,
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/commissions#breadcrumb`,
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
                    name: "Commissions",
                    item: `${config.baseUrl}/commissions`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Commissions"
        description="Commissioned travel writing and documentary photography projects"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Commissions", href: "/commissions" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 prose prose-lg max-w-none wrap-break-word blog-content">
            <h2 className="mt-12 text-2xl font-semibold">Overview</h2>
            <p>
              I am available for commissioned travel writing, long‑form features and documentary
              photography projects. Commissions are developed through sustained fieldwork, research
              and on‑the‑ground reporting.
            </p>

            <p>
              My work often focuses on remote, overlooked or politically complex regions, with an
              emphasis on geography, history and everyday life. Projects are typically research‑led
              and developed over extended periods.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">Types of commissions</h2>
            <ul>
              <li>
                <strong>Long‑form travel features</strong> for magazines and editorial platforms
              </li>
              <li>
                <strong>Reported essays</strong> combining narrative writing and field research
              </li>
              <li>
                <strong>Documentary photography projects</strong>, standalone or accompanying
                written work
              </li>
              <li>
                <strong>Research‑led projects</strong> for cultural or academic contexts
              </li>
            </ul>

            <h2 className="mt-12 text-2xl font-semibold">Rights and usage</h2>
            <p>
              Photography usage and rights are outlined on the{" "}
              <Link href="/licencing">licencing page</Link>. Writing commissions are agreed on a
              project‑by‑project basis.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">Enquiries</h2>
            <p>
              To discuss a commission or potential project, please{" "}
              <Link href="/contact">get in touch via the contact form</Link>.
            </p>

            <p>I am happy to discuss ideas, feasibility and scope at an early stage.</p>
          </div>
          <div className="w-full lg:w-1/3 pt-8 lg:pt-0 lg:pl-8">
            <FigureImage
              src="/images/james-merriman.jpg"
              alt="James Merriman, UK travel writer and photographer"
              caption="James Merriman, UK travel writer and photographer"
              width={1200}
              height={1600}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
