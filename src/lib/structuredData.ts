import { config } from "@/config";

export const personId = `${config.baseUrl}#james-merriman`;
export const personUrl = `${config.baseUrl}`;
export const personSameAs = [
  "https://www.wikidata.org/wiki/Q140897679",
  "https://www.journalism.co.uk/james-merriman-fl-75/",
  "https://muckrack.com/mezzarino",
  "https://www.travelwriters.org/writers/james-merriman-3",
  "https://travmedia.com/mezzarino",
  "https://www.proudlyhuman.org/certified/james-merriman",
  "https://nomadmania.com/profile/59142",
  "https://linkedin.com/in/jamesmerriman",
  "https://mezzarino.substack.com",
  "https://www.youtube.com/@jamesmerrimancouk",
  "https://x.com/mezzarino",
  "https://instagram.com/mezzarino",
  "https://medium.com/@mezzarino",
  "https://www.goodreads.com/mezzarino",
  "https://about.me/jamesmerriman",
  "https://linktr.ee/mezzarino",
];
export const websiteId = `${config.baseUrl}#website`;
export const organizationId = `${config.baseUrl}#organization`;

export interface ImageObjectOptions {
  baseUrl: string;
  width?: number;
  height?: number;
  name?: string;
  alt?: string;
  caption?: string;
  description?: string;
  thumbnailUrl?: string;
  licenseUrl?: string;
  acquireLicensePage?: string;
  copyrightNotice?: string;
  creditText?: string;
  creator?: unknown;
  representativeOfPage?: boolean;
}

function normalizeImageUrl(value: string, baseUrl: string): string {
  if (!value) return value;

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return value;
  }
}

export function buildImageObject(imageUrl: string, options: ImageObjectOptions) {
  const url = normalizeImageUrl(imageUrl, options.baseUrl);

  const description = options.description ?? options.caption;
  const representativeOfPage = options.representativeOfPage ?? true;
  const copyrightNotice = options.copyrightNotice ?? "© James Merriman";
  const creditText = options.creditText ?? "James Merriman";
  const creator = options.creator ?? {
    "@type": "Person" as const,
    name: "James Merriman",
    url: options.baseUrl,
  };

  return {
    "@type": "ImageObject" as const,
    url,
    contentUrl: url,
    ...(options.width ? { width: options.width } : {}),
    ...(options.height ? { height: options.height } : {}),
    ...(options.name ? { name: options.name } : {}),
    ...(options.caption ? { caption: options.caption } : {}),
    ...(description ? { description } : {}),
    ...(options.thumbnailUrl
      ? { thumbnailUrl: normalizeImageUrl(options.thumbnailUrl, options.baseUrl) }
      : {}),
    ...(options.licenseUrl ? { license: options.licenseUrl } : {}),
    ...(options.acquireLicensePage ? { acquireLicensePage: options.acquireLicensePage } : {}),
    copyrightNotice,
    creditText,
    creator,
    representativeOfPage,
  };
}
