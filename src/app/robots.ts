import type { MetadataRoute } from "next";

// Required by `output: "export"` — emit this at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://dacantours.com/sitemap.xml",
  };
}
