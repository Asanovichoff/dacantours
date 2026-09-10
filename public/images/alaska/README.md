# Alaska promo images

Every image the Alaska promo page uses lives here. Swapping one is a file
replacement under the same name — no code change anywhere.

| File | Used for | Source | Status |
| --- | --- | --- | --- |
| `aurora-hero.webp` | Hero, behind the headline | Owned photograph | ✅ |
| `dog-sledding.webp` | Day 2 · dog sledding | Downloaded photo | ⚠️ rights unconfirmed |
| `chena-hot-springs.webp` | Day 3 · Chena Hot Springs | Downloaded photo | ⚠️ rights unconfirmed |
| `ice-museum.webp` | Day 3 · Ice Museum | Downloaded photo | ⚠️ rights unconfirmed |
| `glaciers.webp` | Day 5 · glaciers | Downloaded photo | ⚠️ rights unconfirmed |
| `alyeska-skiing.webp` | Day 6 · Alyeska | Downloaded photo | ⚠️ rights unconfirmed |
| `seward-harbor.webp` | Day 7 · Seward Harbor | **Original artwork** | ⛔ needs a photo |
| `snoqualmie-falls.webp` | Day 1 · Snoqualmie Falls | Downloaded photo | ⚠️ rights unconfirmed |

## Before the promo goes live: confirm image rights

The six downloaded photographs came back at sizes typical of thumbnails
lifted from web pages (678×452, 900×675, 320×415) rather than the full-size
originals a stock library serves. That strongly suggests they were taken from
blogs or tour-operator sites rather than from Unsplash, Pexels or Wikimedia.

This is a commercial site on a public repository. Publishing photographs
without a licence is a real risk, and the fact that they are small makes it
more likely they belong to someone else.

For each one, either:

- confirm it came from Unsplash or Pexels (free for commercial use), or
- confirm it came from Wikimedia Commons and add the required credit to the
  page footer, or
- replace it — re-run `scripts/fetch-alaska-photos.sh` with a URL from a
  source you can point to.

Photographs taken on the trip itself would settle all of this and be better
besides.

## Seward Harbor still needs a photo

The one that came back was 320×415 — too small to use at any size on the
page, so that tile is still the original artwork. It now sits among five
photographs and looks out of place. A landscape shot of the harbour at
1600px or wider would finish the set.

## Replacing an image

Keep the filename. Landscape, ideally 1600px wide or more; the tiles crop to
16:10. Dark, blue, wintry frames suit this design; bright midday sun fights
it.

`scripts/fetch-alaska-photos.sh` downloads into `_raw/`; Claude crops,
resizes, converts to WebP and installs them.
