export const revalidate = 60; // 1 minute

import { Metadata } from "next";
import Link from "next/link";

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { wisp } from "@/lib/wisp";

import { FilterBar } from "../components/FilterBar";
import { FullWidthHeader } from "../components/FullWidthHeader";
import { config } from "../config";

/**
 * Dynamic SEO metadata
 */
export function generateMetadata({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}): Metadata {
  const page = searchParams?.page;
  const query = searchParams?.query;

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
      ? `Travel Writing & Documentary Photography | James Merriman – Page ${page}`
      : "Travel Writing & Documentary Photography | James Merriman";

  const description =
    "Award‑longlisted travel writer and photographer documenting remote, complex and overlooked destinations across the world.";

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
  const jsonLd = [
    // WebSite
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${config.baseUrl}#website`,
      name: "James Merriman | Travel Writing and Photography",
      url: config.baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${config.baseUrl}/?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },

    // Author
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${config.baseUrl}/about#author`,
      name: "James Merriman",
      url: `${config.baseUrl}/about`,
      image: "/images/james-merriman-travel-writer.jpg",
      sameAs: [
        "https://x.com/mezzarino",
        "https://linkedin.com/in/jamesmerriman",
        "https://instagram.com/mezzarino",
      ],
      jobTitle: "Travel Writer & Photographer",
      worksFor: {
        "@id": `${config.baseUrl}#website`,
      },
    },

    // Blog
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${config.baseUrl}#blog`,
      name: "James Merriman – Travel Writing",
      url: currentPageUrl,
      publisher: {
        "@type": "Person",
        "@id": `${config.baseUrl}/about#author`,
        name: "James Merriman",
      },
    },

    // ItemList (posts on this page)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${currentPageUrl}#latest-writing`,
      itemListElement: result.posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          "@id": `${config.baseUrl}/post/${post.slug}`,
          headline: post.title,
          description: post.description,
          url: `${config.baseUrl}/post/${post.slug}`,
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt || post.publishedAt || post.createdAt,
          author: {
            "@type": "Person",
            "@id": `${config.baseUrl}/about#author`,
            name: post.author?.name || "James Merriman",
          },
        },
      })),
      numberOfItems: result.posts.length,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": currentPageUrl,
      },
    },

    // ✅ CollectionPage (ONLY page 2+)
    ...(page > 1
      ? [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${currentPageUrl}#collection`,
            name: `Latest Writing – Page ${page}`,
            url: currentPageUrl,
            isPartOf: {
              "@id": `${config.baseUrl}#website`,
            },
            mainEntity: {
              "@id": `${currentPageUrl}#latest-writing`,
            },
          },
        ]
      : []),

    // Breadcrumbs
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.href === "/" ? config.baseUrl : currentPageUrl,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FullWidthHeader
        title="Travel Writing and Photography from Remote & Overlooked Places"
        description="Award‑longlisted travel writer and photographer documenting culture, history and landscapes across 160+ countries"
        breadcrumb={breadcrumb}
      />

      <section className="container mx-auto my-8 max-w-6xl px-4 lg:px-0 prose">
        <p className="text-lg">
          This site presents the writing and photographic work of travel writer James Merriman. For
          a personal background, visit{" "}
          <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
            my biography
          </Link>
          , explore{" "}
          <Link href="/credentials" className="underline underline-offset-4 hover:text-foreground">
            my professional credentials
          </Link>
          , view selected{" "}
          <Link href="/publications" className="underline underline-offset-4 hover:text-foreground">
            publications
          </Link>
          , or read about{" "}
          <Link
            href="/talks-presentations"
            className="underline underline-offset-4 hover:text-foreground"
          >
            talks and presentations
          </Link>{" "}
          delivered to specialist audiences.
        </p>
      </section>

      <main className="container mx-auto max-w-6xl" role="main">
        <h2 className="my-8 text-3xl font-semibold">Latest Travel Writing</h2>
        <FilterBar active="latest" className="my-8" />
        <BlogPostList posts={result.posts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
        />

        <section className="prose max-w-full">
          <h2>Travel Writing and Cultural History</h2>

          <p>
            I write about travel through sustained time spent in places. Much of my work focuses on
            regions that are overlooked or poorly understood, where travel involves borders,
            infrastructure and history rather than straightforward movement from one location to
            another.
          </p>

          <p>
            I work slowly and on the ground, spending extended periods walking, observing and
            reading around the places I visit. My writing is informed by historical research and my
            own experience, with an emphasis on how people live within particular political and
            geographical conditions.
          </p>

          <p>
            My photography accompanies and supports my writing. It records landscape aswell as
            ordinary moments, holding detail that the written work approaches from another angle.
          </p>

          <h3>Publications</h3>

          <p>
            My writing and photographic work has appeared in UK and international publications
            covering travel, culture and history. These shorter pieces sit alongside longer projects
            developed across repeated journeys and sustained research. A selection of published work
            can be found on the <Link href="/publications">publications</Link> page.
          </p>

          <h3>Talks and Presentations</h3>

          <p>
            Alongside my writing, I give talks and presentations on travel writing, cultural history
            and research‑led practice. These are drawn from fieldwork, long‑form projects and
            archival sources and are delivered to specialist and academic audiences, cultural
            organisations and literary events. Further details are available on the{" "}
            <Link href="/talks-presentations">talks and presentations</Link> page.
          </p>
        </section>
      </main>
    </>
  );
}
