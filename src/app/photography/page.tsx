export const revalidate = 300; // ✅ 5 minutes

import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { AdvancedGallery } from "@/components/AdvancedGallery";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";
import { getPhotos } from "@/lib/cloudinary";
import { generateOGImage } from "@/lib/og";
import { Photo } from "@/types/photo";

const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Documentary Travel Photography by James Merriman",
  description:
    "Editorial and documentary travel photography from remote and overlooked regions, produced alongside long‑form travel writing by James Merriman.",

  keywords: [
    "James Merriman photography",
    "travel photography UK",
    "landscape photography",
    "travel photographer portfolio",
    "editorial photography",
  ],

  alternates: {
    canonical: `${config.baseUrl}/photography`,
  },

  openGraph: {
    type: "website",
    url: `${config.baseUrl}/photography`,
    title: "Documentary Travel Photography by James Merriman",
    description:
      "Editorial and documentary travel photography from remote and overlooked regions, produced alongside long‑form travel writing by James Merriman.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Travel photography by James Merriman",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Travel Photography Portfolio | James Merriman",
    description: "Explore travel and landscape photography by James Merriman.",
    images: [ogImage],
  },
};

const Page = async () => {
  const photos = await getPhotos();

  return (
    <>
      {/* ✅ ✅ Structured Data */}
      <Script
        id="photography-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ImageGallery",
                "@id": `${config.baseUrl}/photography#imagegallery`,
                url: `${config.baseUrl}/photography`,
                name: "James Merriman Photography Portfolio",
                description: "Travel and landscape photography portfolio by James Merriman.",
                isPartOf: {
                  "@id": `${config.baseUrl}#website`,
                },
                author: {
                  "@id": `${config.baseUrl}#person`,
                  "@type": "Person",
                  name: "James Merriman",
                  url: config.baseUrl,
                },
                publisher: {
                  "@id": `${config.baseUrl}#organization`,
                  "@type": "Organization",
                  name: "James Merriman",
                },
                image: {
                  "@type": "ImageObject",
                  url: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
                  width: 1200,
                  height: 630,
                },
                mainEntity: {
                  "@id": `${config.baseUrl}/photography#imagegallery`,
                },
                breadcrumb: {
                  "@id": `${config.baseUrl}/photography#breadcrumb`,
                },
                hasPart: photos.slice(0, 20).map((photo: Photo) => ({
                  "@type": "ImageObject",
                  "@id": `${config.baseUrl}/photography/${photo.public_id}#image`,

                  contentUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${photo.version}/${photo.public_id}.${photo.format}`,

                  url: `${config.baseUrl}/photography#${photo.public_id}`,

                  thumbnailUrl: generateOGImage(photo.public_id, photo.alt),

                  name: photo.alt,
                  description: photo.alt,

                  width: photo.width,
                  height: photo.height,

                  creator: {
                    "@id": `${config.baseUrl}#person`,
                  },

                  creditText: "James Merriman",
                  copyrightNotice: "© James Merriman",
                  license: "https://www.jamesmerriman.co.uk/licencing",
                  acquireLicensePage: "https://www.jamesmerriman.co.uk/licencing",
                })),
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${config.baseUrl}/photography#breadcrumb`,
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
                    name: "Photography",
                    item: `${config.baseUrl}/photography`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <FullWidthHeader
        title="Travel Photography Portfolio of Landscapes and Cultures from Remote Places"
        description="A curated portfolio of travel and landscape photography documenting remote regions and natural environments across the world"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Photography", href: "/photography" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main">
        {/* ✅ Intro content (SEO boost) */}
        <article className="prose prose-lg max-w-none mb-10">
          <p>
            This page presents a curated selection of my documentary and travel photography,
            produced alongside long‑form writing from remote and often overlooked regions. The
            images focus on daily life, geography and atmosphere rather than staged or illustrative
            scenes.
          </p>

          <p>
            All photographs are available for editorial and commercial licence. Further details are
            available on the <Link href="/licencing">licencing page</Link>. For specific usage
            enquiries, please <Link href="/contact">get in touch</Link>.
          </p>
        </article>

        {/* ✅ Gallery */}
        <AdvancedGallery initialPhotos={photos} />

        {/* ✅ Licensing CTA */}
        <section
          className="mt-16 p-10 bg-gray-100 rounded-xl text-center"
          aria-labelledby="licensing-heading"
        >
          <h2 id="licensing-heading" className="font-semibold">
            Licence My Photography
          </h2>

          <p className="mt-4">
            My photography is available for editorial and commercial use, including travel
            publications, websites and marketing campaigns.
          </p>

          <Link
            href="/licencing"
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded"
          >
            Enquire About Licencing
          </Link>
        </section>
      </main>
    </>
  );
};

export default Page;
