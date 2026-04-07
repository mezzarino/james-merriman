/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 414, 640, 768, 1024],
    imageSizes: [320, 480, 640, 840],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      {
        protocol: "https",
        hostname: "assets.about.me",
      },
    ],
  },
  redirects: async () => {
    return [];
  },
};

export default nextConfig;
