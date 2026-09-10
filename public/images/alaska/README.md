# Alaska promo images

Akan's own photographs from Alaska. Every image the promo page uses is here.

| File | Used for |
| --- | --- |
| `hero.webp` | Full-bleed hero behind the headline |
| `alaska-01` … `alaska-08.webp` | The photo wall, in order |

`alaska-08` also appears full-frame beside the trip facts — it is the only
landscape frame in the set, so it is the one that works there uncropped.

## Provenance

All taken by Akan in Alaska. Nothing here is stock or downloaded, so there
is no licence question and no attribution needed.

An earlier version used original vector artwork, then photographs pulled from
the web whose rights could not be confirmed. Both have been removed.

## Sizes

Originals are 3–9 MB phone frames. These are resized to 1400px on the long
edge (2400px for the hero) and converted to WebP — about 1 MB for the whole
set. The originals are kept in `photo-originals/` at the repo root, which is
git-ignored so it neither bloats the repository nor gets deployed.

## Replacing or adding one

Drop a file in under an existing name and it is picked up with no code
change. To add more, save them as `alaska-09.webp` and so on and add the
entry to the `gallery` array in `src/lib/alaska.ts`.

The wall renders every image in a 3:4 frame with `object-cover`, so portrait
phone photographs need no cropping. A landscape frame will be cropped to its
centre.
