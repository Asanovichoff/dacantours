import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build -> ./out, deployable to Cloudflare Pages at zero cost.
  output: "export",
  // Emit /about/index.html instead of /about.html so static hosts resolve
  // clean URLs without rewrite rules.
  trailingSlash: true,
  images: {
    // Static export has no image optimization server. We will add a
    // build-time sharp pipeline + custom loader when real photography lands.
    unoptimized: true,
  },
};

export default nextConfig;
