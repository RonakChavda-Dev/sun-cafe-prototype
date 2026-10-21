import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // cacheComponents: true,
  images: {
    unoptimized: true,
    // Photography is served sharp: 90 for every picture, AVIF first where the browser supports it.
    qualities: [90],
    formats: ["image/avif", "image/webp"],
  },
  // partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

// import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
