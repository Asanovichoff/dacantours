#!/usr/bin/env bash
# Upload the optimised images in public/images to Cloudflare R2.
#
# One-time setup:
#   npx wrangler login
#   npx wrangler r2 bucket create dacantours-assets
#
# Then, in the Cloudflare dashboard: R2 -> dacantours-assets -> Settings ->
# Public access -> Connect a custom domain, e.g. assets.dacantours.com
#
# Do NOT use the r2.dev URL in production. Cloudflare rate-limits it and it
# gets no caching, WAF or bot protection. A custom domain on your own zone is
# free and has none of those limits.
#
# Finally set NEXT_PUBLIC_ASSET_BASE_URL in the Worker's build settings to
# https://assets.dacantours.com and redeploy.
set -euo pipefail

BUCKET="${R2_BUCKET:-dacantours-assets}"
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/images"

if [ ! -d "$DIR" ]; then
  echo "No images directory at $DIR" >&2
  exit 1
fi

echo "Uploading $(ls -1 "$DIR" | wc -l | tr -d ' ') files to r2://$BUCKET"
for f in "$DIR"/*.webp; do
  name="$(basename "$f")"
  printf '  %-46s' "$name"
  npx wrangler r2 object put "$BUCKET/$name" \
    --file="$f" \
    --content-type="image/webp" \
    --remote >/dev/null
  echo "ok"
done

echo
echo "Done. Now set NEXT_PUBLIC_ASSET_BASE_URL to your bucket's custom domain."
