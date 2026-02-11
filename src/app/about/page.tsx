import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { Metadata } from "next";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import Markdown from "react-markdown";

const { title, description } = config;

const content = `I am a Fellow of the Royal Geographical Society and traveller to over 150 countries, who lives in Devon.

I love exploring and writing about the world's landscapes, cuisines and cultures.`;

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
          title="About"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]}
        />
        <main className="container mx-auto mt-8 px-4 max-w-6xl" role="main">
          <div className="flex">
            <div className="lg:w-3/4 prose prose-lg max-w-none w-full break-words blog-content">

              <Markdown>{content}</Markdown>
            </div>
            <div className="w-1/4 hidden lg:block">
            </div>
            </div>
        </main>
      </>
    );
};

export default Page;