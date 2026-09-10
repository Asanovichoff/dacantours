#!/usr/bin/env bash
#
# Download real photographs for the Alaska promo.
#
# HOW TO USE
#   1. Open the search links below, find a photo you like for each slot.
#   2. Copy its DIRECT IMAGE URL (right-click the full-size image ->
#      "Copy Image Address"). It should end in .jpg / .jpeg / .png / .webp.
#   3. Paste it between the quotes for that slot.
#   4. Run:  ./scripts/fetch-alaska-photos.sh
#   5. Tell Claude you're done — it will crop, resize, convert to WebP and
#      put them in place under the right filenames.
#
# Leave any slot empty to keep the current artwork for it.
#
# LICENCE
#   Unsplash and Pexels: free for commercial use, no attribution required.
#   Wikimedia Commons: usually requires crediting the photographer — check
#   each file's page and note the credit so it can go in the page footer.
#
# WHERE TO LOOK  (open these in a browser)
#   dog sledding      https://unsplash.com/s/photos/dog-sledding
#                     https://www.pexels.com/search/dog%20sled/
#   Chena Hot Springs https://commons.wikimedia.org/w/index.php?search=Chena+Hot+Springs&title=Special:MediaSearch&type=image
#                     https://unsplash.com/s/photos/hot-spring-winter
#   Ice Museum        https://commons.wikimedia.org/w/index.php?search=Aurora+Ice+Museum&title=Special:MediaSearch&type=image
#                     https://unsplash.com/s/photos/ice-sculpture
#   glaciers          https://unsplash.com/s/photos/alaska-glacier
#   Alyeska           https://commons.wikimedia.org/w/index.php?search=Alyeska+Resort&title=Special:MediaSearch&type=image
#                     https://unsplash.com/s/photos/ski-resort-mountain
#   Seward Harbor     https://commons.wikimedia.org/w/index.php?search=Seward+Alaska+harbor&title=Special:MediaSearch&type=image
#   Snoqualmie Falls  https://commons.wikimedia.org/w/index.php?search=Snoqualmie+Falls&title=Special:MediaSearch&type=image
#                     https://unsplash.com/s/photos/snoqualmie-falls
#
# Prefer landscape shots, at least 1600px wide. Dark/blue/wintry images sit
# best in this design; bright midday sun will look out of place.

set -euo pipefail

DOG_SLEDDING="https://images.unsplash.com/photo-1630997304867-729e29ff7bf4?q=80&w=1321&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
CHENA_HOT_SPRINGS="https://dynamic-media.tacdn.com/media/photo-o/30/40/ec/e8/caption.jpg?w=2400&h=-1&s=1"
ICE_MUSEUM="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCGt1VrQ5w3zArDeE6eCtBLUa6wc74k7Fva98tJvmWBw&s=10"
GLACIERS="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_sLv60OmsQX7a3UYp88JB4mvplrL02eS9uoTQiSugDuyknwKB38orysW&s=10"
ALYESKA_SKIING="https://www.alyeskaresort.com/wp-content/uploads/2023/12/RKP_ElyseS2018-2-min-scaled.jpg"
SEWARD_HARBOR="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJio-jiYX1PuEstB2qcv0GBa-dC2AEyzAhs0sGf06aA&s=10"
SNOQUALMIE_FALLS="https://images.unsplash.com/photo-1673037287205-2c590da64abc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c25vcXVhbG1pZSUyMGZhbGxzfGVufDB8fDB8fHww"
# Optional: only if you want to replace the aurora photo you already own.
AURORA_HERO=""

OUT="$(cd "$(dirname "$0")/.." && pwd)/public/images/alaska/_raw"
mkdir -p "$OUT"

get () {
  local name="$1" url="$2"
  [ -z "$url" ] && { printf '  %-20s skipped\n' "$name"; return 0; }
  local ext="${url##*.}"; ext="${ext%%\?*}"
  case "$ext" in jpg|jpeg|png|webp) ;; *) ext="jpg" ;; esac
  printf '  %-20s ' "$name"
  if curl -fsSL --max-time 60 -A "Mozilla/5.0" "$url" -o "$OUT/$name.$ext"; then
    echo "ok  ($(du -h "$OUT/$name.$ext" | cut -f1))"
  else
    echo "FAILED — check the URL is the direct image, not the page"
  fi
}

echo "Downloading into $OUT"
get dog-sledding      "$DOG_SLEDDING"
get chena-hot-springs "$CHENA_HOT_SPRINGS"
get ice-museum        "$ICE_MUSEUM"
get glaciers          "$GLACIERS"
get alyeska-skiing    "$ALYESKA_SKIING"
get seward-harbor     "$SEWARD_HARBOR"
get snoqualmie-falls  "$SNOQUALMIE_FALLS"
get aurora-hero       "$AURORA_HERO"

echo
echo "Done. Files are in public/images/alaska/_raw/"
echo "Tell Claude and it will crop, resize and put them into place."
