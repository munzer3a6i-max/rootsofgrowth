import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Shared hosting (Hostinger) restricts helper processes during the build:
  // `npm run build` uses webpack, which runs PostCSS/Tailwind in-process (Turbopack's
  // socket-connected child processes are refused there), and the build keeps its
  // own worker processes to a minimum.
  experimental: {
    webpackBuildWorker: false,
    cpus: 1,
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
};

export default nextConfig;
