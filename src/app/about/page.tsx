import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { Metadata } from "next";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { SocialLinks } from "@/components/ui/social-links";
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
            <div className="w-full lg:w-2/3 prose prose-lg max-w-none break-words blog-content">
              <p>
                I am a British traveller, writer and lead web developer based in Devon, England. I am a Fellow of the Royal Geographical Society, and have visited 163 countries across six continents, driven by a deep curiosity for landscape, culture and the stories that shape place.
              </p>
              <p>
                My journeys have taken me from remote island nations to post-conflict regions, exploring how geography, history and community intersect. Through my writing, I reflect on the textures of travel — the light, the language, the food, the quiet human moments that define a destination beyond its map coordinates.
              </p>
              <p>
                Alongside my work in travel and writing, I bring 20 years of experience as a web developer, delivering digital projects for global brands including BP, Castrol, Legal & General, Wrigley, Thatchers, Freederm and holidaycottages.co.uk. My technical background underpins my storytelling, combining structure and creativity in equal measure.
              </p>
              <p>
                Based in beautiful countryside, I continue to explore the world — and the evolving landscape of technology — with the same enduring curiosity.
              </p>

               <SocialLinks />
            </div>
            <div className="w-full lg:w-1/3 pb-4 lg:pb-0 lg:pl-8">
              <Image
                src="https://assets.about.me/background/users/j/a/m/jamesmerriman_1770896987_547.jpg"
                alt="James Merriman"
                width={1200}
                height={1600}
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 1024px) 100vw, 384px"
                preload={true}
              />
            </div>
          </div>
        </main>
      </>
    );
};

export default Page;