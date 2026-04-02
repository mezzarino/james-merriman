import urlJoin from "url-join";

import { config } from "@/config";

export const getOgImageUrl = (title: string, brandText = config.organization) => {
  return urlJoin(
    config.baseUrl,
    `api/og-image?title=${encodeURIComponent(title)}&brand=${encodeURIComponent(brandText)}`,
  );
};
