import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { Metadata } from "next";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import Image from 'next/image'

const { title, description } = config;

export const metadata: Metadata = {
  title: `${title} - Blog`,
  description,
  openGraph: {
    title: `${title} - Blog`,
    description,
    images: [getOgImageUrl(title)],
  },
};

const Page = async () => {
  return (
      <>
        <FullWidthHeader
          title="Welcome to my travel writing blog"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]}
        />
        <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-3/4 prose prose-lg max-w-none break-words blog-content">
              <p>
                I am a Fellow of the Royal Geographical Society and traveller to over 150 countries, who lives in Devon.
              </p>
              <p>
                I love exploring and writing about the world's landscapes, cuisines and cultures.
              </p>
            </div>
            <div className="w-full lg:w-1/4 pb-4 lg:pb-0 lg:pl-4">
              <Image
                src="https://avatars.githubusercontent.com/u/20318951?v=4&size=435"
                className="w-full"
                alt="James Merriman"
              />
            </div>
          </div>
        </main>
      </>
    );
};

export default Page;