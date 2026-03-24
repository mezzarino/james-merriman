import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { Metadata } from "next";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { SocialLinks } from "@/components/ui/social-links";
import Image from 'next/image'

export const metadata: Metadata = {
  title: `About James Merriman | Travel Writer & Photographer`,
  description: `Learn about James Merriman, UK-based travel writer and photographer documenting remote regions and cultural frontiers worldwide.`,
  openGraph: {
    title: `About James Merriman | Travel Writer & Photographer`,
    description: `Learn about James Merriman, UK-based travel writer and photographer.`,
    images: [getOgImageUrl("About James Merriman")],
  },
};

const Page = async () => {
  return (
      <>
        <FullWidthHeader
          title="About James Merriman | Travel Writer & Photographer"
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
                I am a British traveller, award winning writer and lead web developer based in Devon, England...
              </p>
              <h2>Awards</h2>
              <p>Longlisted - Bradt Guides New Travel Writer of the Year 2026</p>
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