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
        hostname: "*.cloudinary.com",
      },
    ],
  },

  // ✅ ✅ ✅ THIS is the critical addition
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },

  redirects: async () => {
    return [];
  },
};

export default nextConfig;
