# Alaska promo images

Akan's own photographs from Alaska. Every image the promo page uses is here.

| File | Used for |
| --- | --- |
| `hero-1` … `hero-3.webp` | The moving hero — cross-faded behind the headline |
| `alaska-01` … `alaska-22.webp` | The photo wall, in order |

`alaska-22` also appears full-frame beside the trip facts, so it wants to be a
landscape frame that reads well uncropped.

The wall is ordered deliberately: aurora, then people, then activity, then
landscape, repeating. It is not chronological, and nothing is captioned —
the point is the feel of the week, not a labelled log of it.

## The hero

`src/components/HeroMedia.tsx` cross-fades the three hero frames on a 24s
loop with a slow zoom. That is a stand-in for video.

To put a real aurora clip there instead, drop `aurora.mp4` and `aurora.webm`
in this folder and set in `src/lib/alaska.ts`:

```ts
heroVideo: { mp4: `${IMG}/aurora.mp4`, webm: `${IMG}/aurora.webm` },
```

Nothing else changes — the stills stay as the poster frame and as the
fallback for anyone whose browser blocks autoplay. Keep the clip under about
8 MB, silent, and 10–20 seconds; it loops.

## Provenance

All taken by Akan in Alaska. Nothing here is stock or downloaded, so there is
no licence question and no attribution needed.

An earlier version used original vector artwork, then photographs pulled from
the web whose rights could not be confirmed. Both have been removed.

Several frames show identifiable travellers. That is a consent question, not
a licence one — worth a word with anyone recognisable before the page is
promoted widely.

## Sizes

Originals are 2–5 MB phone frames. These are resized to 1400px on the long
edge (2400px for the hero) and converted to WebP — about 3.3 MB for the whole
set of 25. The originals are kept in `photo-originals/` at the repo root,
which is git-ignored so it neither bloats the repository nor gets deployed.

## Replacing or adding one

Drop a file in under an existing name and it is picked up with no code
change. To add more, save them as `alaska-23.webp` and so on — the `gallery`
array in `src/lib/alaska.ts` is generated from a count, so bump the count.

The wall renders every image in a 3:4 frame with `object-cover`, so portrait
phone photographs need no cropping. A landscape frame is cropped to its
centre.
