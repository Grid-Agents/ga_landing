import type { NextConfig } from "next";

// On GitHub Pages a project site is served from a sub-path
// (https://<org>.github.io/<repo>), so assets need a basePath. The deploy
// workflow sets NEXT_PUBLIC_BASE_PATH to "/<repo>"; locally it's empty (root).
// NEXT_PUBLIC_ prefix makes the same value available client-side (used to
// prefix public assets like the logo, which next/image does not auto-prefix).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // emit a fully static site to ./out
  images: { unoptimized: true }, // GitHub Pages has no image-optimization server
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
