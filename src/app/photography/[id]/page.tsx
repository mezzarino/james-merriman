import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { config } from "@/config";
import { getPhotos } from "@/lib/cloudinary";
import { generateOGImage } from "@/lib/og";
import { Photo } from "@/types/photo";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const photos = await getPhotos();
  const photo = photos.find((p: Photo) => p.public_id === params.id);

  if (!photo) return {};

  const ogImage = generateOGImage(photo.public_id, photo.alt);

  return {
    title: photo.alt,
    description: photo.alt,

    openGraph: {
      type: "article",
      title: photo.alt,
      description: photo.alt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: photo.alt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: photo.alt,
      description: photo.alt,
      images: [ogImage],
    },
  };
}

const Page = async ({ params }: Props) => {
  const photos = await getPhotos();
  const photo = photos.find((p: Photo) => p.public_id.replace("photography/", "") === params.id);

  if (!photo) {
    return (
      <main className="container mx-auto p-8">
        <h1>Image not found</h1>
      </main>
    );
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // ✅ ✅ WATERMARKED CLOUDINARY URL
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/l_james-merriman-watermark,w_200,g_south_east,x_20,y_20,o_60/${photo.version}/${photo.public_id}.${photo.format}`;

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
            // ✅ Performance
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

            contentUrl: imageUrl,

            name: photo.alt,
            description: photo.alt,

            width: photo.width,
            height: photo.height,

            creator: {
              "@type": "Person",
              name: "James Merriman",
            },

            copyrightNotice: "© James Merriman",
            license: `${config.baseUrl}/contact`,
          }),
        }}
      />
    </main>
  );
};

export default Page;
