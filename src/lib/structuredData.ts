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
    ...(options.copyrightNotice ? { copyrightNotice: options.copyrightNotice } : {}),
    ...(options.creditText ? { creditText: options.creditText } : {}),
    ...(options.creator ? { creator: options.creator } : {}),
    representativeOfPage,
  };
}
