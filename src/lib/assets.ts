/**
 * Asset URLs.
 *
 * The source project served images from an AWS S3 bucket
 * (dacantoursbacket.s3.us-east-2.amazonaws.com). This build points at
 * Cloudflare R2 instead — no egress charges, and it sits alongside the
 * Worker that serves the site.
 *
 * Set NEXT_PUBLIC_ASSET_BASE_URL to the bucket's public URL at build time.
 * When it is unset the site falls back to the optimised copies committed in
 * /public/images, so local dev and preview deployments always render even
 * before the bucket exists. Once R2 is live you can delete the fallback
 * copies and the site keeps working.
 */
const R2_BASE = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "");

function asset(name: string): string {
  return R2_BASE ? `${R2_BASE}/${name}.webp` : `/images/${name}.webp`;
}

export const ASSETS = {
  logo: asset("logo"),
  kyrgyzstanPreview: asset("kyrgyzstan_preview_-_coming_soon"),
  alaskaNorthernLights: asset("alaska_northern_lights__wilderness"),
  canyonsAdventure: asset("canyons_adventure"),
  hawaiiOahuAdventure: asset("hawaii_oahu_adventure"),
  westCoastNationalParks: asset("west_coast_national_parks"),
  customAdventure: asset("custom_adventure_-_your_way"),
} as const;

/** Maps a tour title to its image, exactly as the source project did. */
const tourImages: Record<string, string> = {
  "Canyons Adventure": ASSETS.canyonsAdventure,
  "Alaska Northern Lights & Wilderness": ASSETS.alaskaNorthernLights,
  "Hawaii Oahu Adventure": ASSETS.hawaiiOahuAdventure,
  "West Coast National Parks": ASSETS.westCoastNationalParks,
  "Kyrgyzstan Preview - Coming Soon!": ASSETS.kyrgyzstanPreview,
  "Custom Adventure - Your Way": ASSETS.customAdventure,
};

export function getTourImage(tourTitle: string): string | undefined {
  return tourImages[tourTitle];
}
