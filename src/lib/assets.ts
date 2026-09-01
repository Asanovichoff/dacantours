/**
 * Asset URLs.
 *
 * The source project served images from an AWS S3 bucket
 * (dacantoursbacket.s3.us-east-2.amazonaws.com). They now ship with the site
 * in /public/images and are served by the Cloudflare Worker, whose static
 * asset requests are free and unlimited.
 *
 * The images are optimised to WebP at max 2000px wide — 9.75 MB of source
 * photography down to 1.75 MB, visually unchanged. At that size there is
 * nothing to gain from external object storage.
 *
 * If you later want to swap photos without redeploying, move these files to
 * an R2 bucket on a custom domain and change `asset()` below to prefix the
 * bucket URL. Nothing else needs to change.
 */
function asset(name: string): string {
  return `/images/${name}.webp`;
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
