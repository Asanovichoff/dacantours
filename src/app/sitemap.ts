import type { MetadataRoute } from "next";

// Required by `output: "export"` — tells Next.js to emit this at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dacantours.com",
      lastModified: new Date("2026-08-27"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
