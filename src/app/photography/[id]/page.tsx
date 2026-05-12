export const revalidate = 3600;

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { config } from "@/config";
import { getPhotoById } from "@/lib/cloudinary";
import { generateOGImage } from "@/lib/og";
import { Photo } from "@/types/photo";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const photo = await getPhotoById(params.id);

  const canonicalUrl = `${config.baseUrl}/photography/${params.id}`;
  const ogImage = generateOGImage(photo!.public_id, photo!.alt);

  return {
    title: photo!.alt,
    description: photo!.alt,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: photo!.alt,
      description: photo!.alt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: photo!.alt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: photo!.alt,
      description: photo!.alt,
      images: [ogImage],
    },
  };
}

const Page = async ({ params }: Props) => {
  const photo = await getPhotoById(params.id);

  if (!photo) {
    notFound();
  }

  const mappedPhoto: Photo = {
    public_id: photo!.public_id,
    width: photo!.width,
    height: photo!.height,
    alt: photo!.alt || photo!.public_id.replace(/-/g, " "),
    category: photo!.tags?.[0] || "uncategorised",
    tags: photo!.tags || [],
    created_at: photo!.created_at,
    format: photo!.format || "jpg",
    version: photo!.version,
  };

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/l_james-merriman-watermark,w_1.2,g_center,o_40/v${mappedPhoto.version}/${mappedPhoto.public_id}.${mappedPhoto.format}`;

  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <article>
        <figure>
          {/* ✅ Next Image with watermark */}
          <Image
            src={imageUrl}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="rounded-lg w-full h-auto object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />

          {/* ✅ Caption (SEO boost) */}
          <figcaption className="mt-4 text-sm text-gray-500">{photo.alt}</figcaption>
        </figure>

        <h1 className="mt-6 text-3xl font-semibold">{photo.alt}</h1>

        <p className="mt-4 text-gray-700">A travel photograph captured by James Merriman.</p>

        {/* ✅ Licensing CTA */}
        <section className="mt-10 p-6 bg-gray-100 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Licence this image</h2>

          <p className="mt-2">Available for editorial and commercial licensing.</p>

          <Link href="/contact" className="inline-block mt-4 px-6 py-3 bg-black text-white rounded">
            Enquire Now
          </Link>
        </section>
      </article>

      {/* ✅ ✅ Structured Data (Enhanced ImageObject) */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",

            "@id": `${config.baseUrl}/photography/${params.id}`,

            contentUrl: imageUrl,
            url: `${config.baseUrl}/photography/${params.id}`,

            name: photo.alt,
            headline: photo.alt,
            description: photo.alt,

            width: photo.width,
            height: photo.height,

            uploadDate: photo.created_at,

            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${config.baseUrl}/photography/${params.id}`,
            },

            creator: {
              "@type": "Person",
              name: "James Merriman",
            },

            creditText: "James Merriman",
            copyrightNotice: "© James Merriman",

            license: `${config.baseUrl}/contact`,
            acquireLicensePage: `${config.baseUrl}/contact`,
          }),
        }}
      />
    </main>
  );
};

export default Page;
