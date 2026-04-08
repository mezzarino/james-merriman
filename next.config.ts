/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 384, 640, 768, 1024],
    imageSizes: [320, 384, 480, 640],

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
