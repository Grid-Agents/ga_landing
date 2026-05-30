import type { NextConfig } from "next";

// On GitHub Pages a project site is served from a sub-path
// (https://<org>.github.io/<repo>), so assets need a basePath. The deploy
// workflow sets NEXT_PUBLIC_BASE_PATH to "/<repo>"; locally it's empty (root).
// NEXT_PUBLIC_ prefix makes the same value available client-side (used to
// prefix public assets like the logo, which next/image does not auto-prefix).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Two deploy targets need two different output modes:
//   - GitHub Pages: a fully static export (`output: "export"` -> ./out).
//   - Railway: a normal Next.js server (`next start`), which is *incompatible*
//     with `output: "export"`. Railway's build command sets NEXT_OUTPUT=server
//     (and Railway injects RAILWAY_ENVIRONMENT) so we skip the static export
//     there and let `next start` bind to $PORT — the path Railway is built for.
const serverBuild =
  process.env.NEXT_OUTPUT === "server" || !!process.env.RAILWAY_ENVIRONMENT;

const nextConfig: NextConfig = {
  images: { unoptimized: true }, // GitHub Pages has no image-optimization server
  ...(serverBuild ? {} : { output: "export" }), // static export everywhere except Railway
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
