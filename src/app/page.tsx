export const revalidate = 60; // 1 minute
export const runtime = "nodejs";

import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Script from "next/script";

import { BlogPostList } from "@/components/BlogPostList";
import { HomepageFilterBar } from "@/components/homepage/HomepageFilterBar";
import { HomepagePagination } from "@/components/homepage/HomepagePagination";
import {
  buildImageObject,
  organizationId,
  personId,
  personSameAs,
  personUrl,
  websiteId,
} from "@/lib/structuredData";
import { wisp } from "@/lib/wisp";

import { FullWidthHeader } from "../components/FullWidthHeader";
import { config } from "../config";

/**
 * Dynamic SEO metadata
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; query?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const page = params?.page;
  const query = params?.query;

  // Internal search results → noindex
  if (query) {
    return {
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const canonicalUrl = !page || page === "1" ? config.baseUrl : `${config.baseUrl}/?page=${page}`;

  const title =
    page && page !== "1"
      ? `Travel Writing and Documentary Photography | James Merriman – Page ${page}`
      : "Travel Writing and Documentary Photography | James Merriman";

  const description =
    "Award‑winning travel writer and photographer documenting remote, complex and overlooked destinations across the world.";

  const ogImage = "/images/james-merriman-travel-writer.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  if (page === 1 && searchParams?.page) {
    redirect(config.baseUrl);
  }

  const currentPageUrl = page > 1 ? `${config.baseUrl}/?page=${page}` : config.baseUrl;

  const result = await wisp.getPosts({
    limit: 6,
    page,
    query: searchParams?.query,
  });

  /**
   * Breadcrumbs (UI + schema)
   */
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Latest Writing", href: page > 1 ? `?page=${page}` : "/" },
  ];

  /**
   * JSON‑LD structured data
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // ✅ Person (Canonical Entity)
      {
        "@type": "Person",
        "@id": personId,
        name: "James Merriman",
        url: personUrl,
        image: `${config.baseUrl}/images/james-merriman-travel-writer.jpg`,
        description:
          "Award-winning British & Irish travel writer and photographer documenting culture, geography and lived experience in over 160 countries.",
        jobTitle: "Award-Winning Travel Writer and Photographer",
        nationality: {
          "@type": "Country",
          name: "United Kingdom",
        },
        knowsLanguage: ["en-GB"],
        sameAs: personSameAs,
        worksFor: {
          "@id": organizationId,
        },
        // 🔗 Links back to the specific About Document when crawled there
        mainEntityOfPage: {
          "@id": `${config.baseUrl}/about#aboutpage`,
        },
        // 🛠️ Combined Occupation: Merges UK location + worldwide scope & qualifications
        hasOccupation: {
          "@type": "Occupation",
          name: "Freelance Travel Writer and Photographer",
          skills: ["Travel Writing", "Journalism", "Photography"],
          occupationLocation: [
            {
              "@type": "Country",
              name: "United Kingdom",
            },
            {
              "@type": "Country",
              name: "Worldwide",
            },
          ],
          qualifications: [
            {
              "@type": "EducationalOccupationalCredential",
              name: "Master of Arts in Nature and Travel Writing (In Progress)",
              credentialCategory: "Master's Degree",
              recognizedBy: {
                "@type": "EducationalOrganization",
                name: "Bath Spa University",
                url: "https://bathspa.ac.uk",
              },
            },
            {
              "@type": "EducationalOccupationalCredential",
              name: "The Craft of Travel Writing Certification",
              credentialCategory: "Certification",
              url: "https://intrepidtimes.com/certification/",
              recognizedBy: {
                "@type": "Organization",
                name: "Intrepid Times",
                url: "https://intrepidtimes.com",
              },
            },
          ],
        },
        // 📰 Freelance Clients / Publishers
        memberOf: [
          { "@type": "Organization", name: "Lupine Travel" },
          { "@type": "Organization", name: "Globetrotters Magazine" },
          { "@type": "NewsMediaOrganization", name: "The Guardian" },
        ],
        // 🏛️ Professional Memberships & Fellowships
        affiliation: [
          {
            "@type": "Organization",
            name: "Royal Geographical Society",
          },
          {
            "@type": "Organization",
            name: "The Chartered Institute of Journalists",
          },
          {
            "@type": "Organization",
            name: "One Planet Journey",
            description: "Deep Travel Ambassador program",
          },
        ],
        // 🏆 Competitions and Industry Recognition
        award: [
          "Winner – Guardian Travel readers' tips competition",
          "Fellow of the Royal Geographical Society (FRGS)",
          "NomadMania Verified Travel to 150+ UN Countries",
        ],
        // 💡 Topics of Expertise
        knowsAbout: [
          "Travel Writing",
          "Documentary Photography",
          "Remote Travel",
          "Cultural Geography",
          "Walking and Exploration",
          "Remote and overlooked places",
        ],
        // 🎙️ Media Appearances, Interviews, and Podcast Features
        subjectOf: [
          {
            "@type": "Article",
            headline:
              "James Merriman Visited 160 Countries Before He Realized That Wasn't the Point of Travel",
            url: "https://intrepidtimes.com/2026/07/james-merriman-visited-160-countries-before-he-realized-that-wasnt-the-point-of-travel/",
            author: { "@id": personId },
            image: buildImageObject("/images/james-merriman.jpg", {
              baseUrl: config.baseUrl,
              width: 1200,
              height: 1600,
              name: "James Merriman",
              caption: "James Merriman",
              description: "Photo of James Merriman",
              licenseUrl: `${config.baseUrl}/licencing`,
              acquireLicensePage: `${config.baseUrl}/licencing`,
            }),
            publisher: {
              "@type": "Organization",
              name: "Intrepid Times",
              url: "https://intrepidtimes.com/",
            },
          },
          {
            "@type": "Article",
            headline: "Meet James Merriman",
            url: "https://www.instagram.com/p/DZuR14hjPDF/",
            author: { "@id": personId },
            image: buildImageObject("/images/james-merriman.jpg", {
              baseUrl: config.baseUrl,
              width: 1200,
              height: 1600,
              name: "James Merriman",
              caption: "James Merriman",
              description: "Photo of James Merriman",
              licenseUrl: `${config.baseUrl}/licencing`,
              acquireLicensePage: `${config.baseUrl}/licencing`,
            }),
            publisher: {
              "@type": "Organization",
              name: "Royal Geographical Society",
              url: "https://www.instagram.com/rgs_ibg",
            },
          },
          {
            "@type": "Article",
            headline: "Before He Realized That Wasn't the Point of Travel",
            url: "https://open.spotify.com/episode/1S1BHmBBuCzYJeWn4ihi22",
            author: { "@id": personId },
            image: buildImageObject("/images/james-merriman.jpg", {
              baseUrl: config.baseUrl,
              width: 1200,
              height: 1600,
              name: "James Merriman",
              caption: "James Merriman",
              description: "Photo of James Merriman",
              licenseUrl: `${config.baseUrl}/licencing`,
              acquireLicensePage: `${config.baseUrl}/licencing`,
            }),
            publisher: {
              "@type": "Organization",
              name: "The Travel Writing Podcast",
              url: "https://open.spotify.com/show/4KcriU5MHy3s9smbaN660v",
            },
          },
        ],
      },

      // ✅ Organisation (The Publishing/Brand Entity)
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "James Merriman",
        url: config.baseUrl,
        logo: {
          ...buildImageObject("/logo.png", {
            baseUrl: config.baseUrl,
            width: 640,
            height: 640,
            name: "James Merriman Travel Writer logo",
            caption: "James Merriman Travel Writer logo",
            licenseUrl: `${config.baseUrl}/licencing`,
            acquireLicensePage: `${config.baseUrl}/licencing`,
          }),
          "@id": `${config.baseUrl}#logo`,
        },
        image: {
          "@id": `${config.baseUrl}#logo`,
        },
        founder: {
          "@id": personId,
        },
        sameAs: personSameAs,
      },

      // ✅ WebSite
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "James Merriman | Travel Writing and Photography",
        url: config.baseUrl,
        inLanguage: "en-GB",
        publisher: {
          "@id": organizationId,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${config.baseUrl}/?query={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },

      // ✅ ProfilePage (homepage)
      {
        "@type": "ProfilePage",
        "@id": `${currentPageUrl}#webpage`,
        url: currentPageUrl,
        inLanguage: "en-GB",
        description:
          "Award-winning travel writer and photographer documenting culture, history and place in over 160 countries.",
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": personId,
        },
        breadcrumb: {
          "@id": `${currentPageUrl}#breadcrumb`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#homepage-intro"],
        },
      },

      // ✅ Blog
      {
        "@type": "Blog",
        "@id": `${config.baseUrl}#blog`,
        name: "James Merriman – Travel Writing",
        url: config.baseUrl,
        inLanguage: "en-GB",
        publisher: {
          "@id": organizationId,
        },
        isPartOf: {
          "@id": websiteId,
        },
      },

      // ✅ Endorsement Quotation
      {
        "@type": "Quotation",
        "@id": `${currentPageUrl}#endorsement-thubron`,
        text: "In such a precarious journey every incident becomes important. Merriman did well.",
        author: {
          "@type": "Person",
          name: "Colin Thubron",
        },
        isPartOf: {
          "@id": `${currentPageUrl}#webpage`, // 🌟 Optimized: Tied smoothly to the webpage node layout
        },
      },

      // ✅ Latest posts list
      {
        "@type": "ItemList",
        "@id": `${currentPageUrl}#latest-writing`,
        numberOfItems: result.posts.length,
        itemListElement: result.posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "BlogPosting",
            "@id": `${config.baseUrl}/post/${post.slug}#article`,
            headline: post.title,
            description: post.description,
            url: `${config.baseUrl}/post/${post.slug}`,
            image: post.image ? [post.image] : undefined,
            datePublished: post.publishedAt || post.createdAt,
            dateModified: post.updatedAt || post.publishedAt || post.createdAt,

            author: {
              "@id": personId,
            },

            mainEntityOfPage: {
              "@id": `${config.baseUrl}/post/${post.slug}#webpage`, // 🌟 Optimized: Matched standard entry schemas
            },
          },
        })),
        mainEntityOfPage: {
          "@id": currentPageUrl,
        },
      },

      // ✅ Optional paginated CollectionPage
      ...(page > 1
        ? [
            {
              "@type": "CollectionPage",
              "@id": `${currentPageUrl}#collectionpage`,
              name: `Latest Writing – Page ${page}`,
              url: currentPageUrl,
              isPartOf: {
                "@id": websiteId,
              },
              mainEntity: {
                "@id": `${currentPageUrl}#latest-writing`,
              },
            },
          ]
        : []),

      // ✅ Breadcrumbs
      {
        "@type": "BreadcrumbList",
        "@id": `${currentPageUrl}#breadcrumb`,
        itemListElement: breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: item.href === "/" ? `${config.baseUrl}/` : `${config.baseUrl}${item.href}`,
        })),
      },
    ],
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FullWidthHeader
        title="Travel Writing and Photography from Remote and Overlooked Places"
        description="Award-winning travel writer and photographer documenting culture, history and place in over 160 countries"
        breadcrumb={breadcrumb}
      />

      <main className="container mx-auto max-w-6xl" id="main" tabIndex={-1}>
        <section className="container mx-auto my-6 max-w-6xl px-4 prose">
          <p id="homepage-intro" className="text-lg">
            This site presents the writing and photographic work of award-winning British & Irish
            travel writer James Merriman. You can read{" "}
            <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
              my biography
            </Link>{" "}
            and review{" "}
            <Link
              href="/credentials"
              className="underline underline-offset-4 hover:text-foreground"
            >
              my credentials
            </Link>{" "}
            for further background. A selection of{" "}
            <Link
              href="/publications"
              className="underline underline-offset-4 hover:text-foreground"
            >
              published writing
            </Link>{" "}
            is also available alongside details of recent{" "}
            <Link
              href="/talks-presentations"
              className="underline underline-offset-4 hover:text-foreground"
            >
              talks and presentations
            </Link>
            .
          </p>
          <p className="text-lg">
            Recent recognition:{" "}
            <a
              href="https://intrepidtimes.com/2026/07/james-merriman-visited-160-countries-before-he-realized-that-wasnt-the-point-of-travel/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              I was recently interviewed by Intrepid Times about travelling to 160+ countries and
              the idea of Deep Travel.
            </a>
          </p>
        </section>

        <h2 className="mt-12 mb-6 text-3xl px-4 font-semibold">Latest Travel Writing</h2>
        <HomepageFilterBar />
        <BlogPostList posts={result.posts} />

        <HomepagePagination pagination={result.pagination} query={searchParams?.query} />

        <section className="prose max-w-full px-4">
          <h2 className="pt-6">Travel Writing and Cultural History</h2>

          <blockquote className="border-l-2 pl-4 my-6">
            <p className="italic">
              In such a precarious journey every incident becomes important. Merriman did well.
            </p>
            <footer className="mt-2 text-sm not-italic text-muted-foreground">
              — Colin Thubron, Author
            </footer>
          </blockquote>

          <p>
            I write about travel through sustained time spent in places. Much of my work focuses on
            regions that are overlooked or poorly understood, where borders, infrastructure and
            history shape everyday life as much as the landscape itself.
          </p>

          <p>
            I work slowly and on the ground, spending extended periods walking, observing and
            reading around the places I visit. My writing is informed by historical research and
            personal experience, with a particular interest in how people live within the realities
            of geography, politics and place.
          </p>

          <p>
            My <Link href="/photography">photography</Link> accompanies and supports my writing. It
            records landscapes and everyday moments, preserving details that the written work
            approaches from another angle.
          </p>

          <h3>Publications</h3>

          <p>
            My writing and photography have appeared in UK and international publications, including{" "}
            <em>The Guardian</em>, <em>Globe Magazine</em> and <em>Bradt Guides</em>. These
            commissioned pieces sit alongside long-form projects developed through repeated journeys
            and sustained research. A selection of published work can be found on the{" "}
            <Link href="/publications">publications</Link> page.
          </p>

          <h3>Talks and Presentations</h3>

          <p>
            Alongside my writing, I give talks on travel writing, cultural history and research-led
            practice. Drawing on fieldwork and long-form projects, these presentations are delivered
            to literary audiences, cultural organisations and academic groups. Further details are
            available on the <Link href="/talks-presentations">talks and presentations</Link> page.
          </p>
        </section>
      </main>
    </>
  );
}
