import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build -> ./out, served by an assets-only Cloudflare Worker.
  output: "export",
  // Emit /about/index.html so static hosts resolve clean URLs with no rewrites.
  trailingSlash: true,
  images: {
    // `output: "export"` has no image optimization server. Imagery is currently
    // remote placeholders; when real photography lands it gets committed and
    // run through a build-time sharp pipeline instead.
    unoptimized: true,
  },
};

export default nextConfig;
