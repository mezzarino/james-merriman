import { Metadata } from "next";
import Link from "next/link";

import { AdvancedGallery } from "@/components/AdvancedGallery";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";
import { getPhotos } from "@/lib/cloudinary";
import { generateOGImage } from "@/lib/og";
import { Photo } from "@/types/photo";

const ogImage = "/images/james-merriman-travel-writer.jpg";

export const metadata: Metadata = {
  title: "Travel Photography Portfolio | James Merriman",
  description:
    "Explore travel and landscape photography by James Merriman, featuring destinations, culture and natural landscapes from around the world.",

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
    title: "Travel Photography Portfolio | James Merriman",
    description: "A curated collection of travel and landscape photography from around the world.",
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
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return (
    <>
      <FullWidthHeader
        title="Photography"
        description="A curated collection of travel and landscape photography."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Photography", href: "/photography" },
        ]}
      />

      <main className="container mx-auto mt-8 px-4 max-w-6xl" id="main">
        {/* ✅ Intro content (SEO boost) */}
        <article className="prose prose-lg max-w-none mb-10">
          <h1>Travel Photography</h1>

          <p>
            This portfolio showcases a selection of my travel and landscape photography, capturing
            places, people and moments from around the world.
          </p>

          <p>
            All photographs are available for editorial and commercial licence. Please get in touch
            for usage enquiries.
          </p>
        </article>

        {/* ✅ Gallery */}
        <AdvancedGallery initialPhotos={photos} />

        {/* ✅ Licensing CTA */}
        <section
          className="mt-16 p-10 bg-gray-100 rounded-xl text-center"
          aria-labelledby="licensing-heading"
        >
          <h2 id="licensing-heading">Licence My Photography</h2>

          <p className="mt-4">
            My photography is available for editorial and commercial use, including travel
            publications, websites and marketing campaigns.
          </p>

          <Link href="/contact" className="inline-block mt-6 px-6 py-3 bg-black text-white rounded">
            Enquire About Licensing
          </Link>
        </section>

        {/* ✅ ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageGallery",
              name: "James Merriman Photography Portfolio",
              description: "Travel and landscape photography portfolio by James Merriman.",
              url: `${config.baseUrl}/photography`,
              author: {
                "@type": "Person",
                name: "James Merriman",
              },

              image: photos.slice(0, 20).map((photo: Photo) => ({
                "@type": "ImageObject",
                contentUrl: `https://res.cloudinary.com/${cloudName}/image/upload/${photo.public_id}`,
                thumbnailUrl: generateOGImage(photo.public_id, photo.alt),
                name: photo.alt,
                description: photo.alt,
                width: photo.width,
                height: photo.height,
              })),
            }),
          }}
        />
      </main>
    </>
  );
};

export default Page;
