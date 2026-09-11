# Alaska promo images

Akan's own photographs and footage from Alaska. Everything the promo page
shows is here.

| File | Used for |
| --- | --- |
| `aurora.webm` / `aurora.mp4` | The hero clip, looping behind the headline |
| `aurora-poster.webp` | Its first frame — poster and autoplay fallback |
| `hero-1` … `hero-3.webp` | Stills the hero falls back to if the clip is removed |
| `alaska-01` … `alaska-22.webp` | The photo wall, in order |

`alaska-22` also appears full-frame beside the trip facts, so it wants to be
a landscape frame that reads well uncropped.

The wall is ordered deliberately: aurora, then people, then activity, then
landscape, repeating. It is not chronological, and nothing is captioned — the
point is the feel of the week, not a labelled log of it.

## The hero

It is a phone frame: 720×1280, portrait. That shape decides the treatment.
On a phone it fills the screen with the whole composition. On a wide screen
`object-cover` would crop it to a thin horizontal band through the middle of
a vertical curtain, which reads as a formless green smear no matter how much
resolution it has — the problem is the framing, not the pixels. So the wide
layout gives the clip its own aspect back on the right, clear of the
headline, with its left edge masked so it dissolves into a blurred still
rather than drawing a seam.

Both layouts are the same single `<video>`, restyled by `.hero-clip` in
`globals.css`, so no device decodes a copy it cannot see.

`src/components/HeroMedia.tsx` falls back to cross-fading `hero-1…3.webp` if
`ALASKA.heroVideo` is set to null.

### How the clip was prepared

From a 15.1s original, 720×1280 H.264 with sound:

- **Looped seamlessly.** The first and last 1.5s are cross-dissolved into
  each other, leaving 13.6s that returns to its own start. Aurora is formless
  enough that the dissolve is invisible; reversing it instead would have run
  the curtain's flow backwards.
- **Graded.** The original averages 28/255 in luminance against about 100 for
  the stills — dark enough under the hero's gradients to read as a grey
  smudge. A curve lifts the midtones hard while holding the near-blacks
  black, so the sky stays night and the aurora carries colour. Denoise runs
  first, or the lift would raise the sensor noise with it.
- **Silent**, which autoplay requires anyway, and re-encoded to VP9 (0.9 MB)
  with H.264 (2.0 MB) behind it for Safari.

The original is `photo-originals/aurora-original.mp4`. The exact ffmpeg
invocation is in the commit that added the clip.

## Replacing the clip

Overwrite `aurora.webm`, `aurora.mp4` and `aurora-poster.webp`; nothing else
changes. Keep it silent, roughly 10–20 seconds, and under about 3 MB — it
loads on every visit. Portrait is fine; landscape is too, and would simply
fill a wide screen instead of sitting to one side.

## Provenance

All shot by Akan in Alaska. Nothing here is stock or downloaded, so there is
no licence question and no attribution needed.

An earlier version used original vector artwork, then photographs pulled from
the web whose rights could not be confirmed. Both have been removed.

Several frames show identifiable travellers. That is a consent question, not
a licence one — worth a word with anyone recognisable before the page is
promoted widely.

## Sizes

Photo originals are 2–5 MB phone frames. These are resized to 1400px on the
long edge (2400px for the stills) and converted to WebP — about 3.3 MB for
all 25. With the clip, the hero adds roughly 0.9 MB on a first visit.

Originals live in `photo-originals/` at the repo root, git-ignored so they
neither bloat the repository nor get deployed.

## Replacing or adding a photograph

Drop a file in under an existing name and it is picked up with no code
change. To add more, save them as `alaska-23.webp` and so on — the `gallery`
array in `src/lib/alaska.ts` is generated from a count, so bump the count.

The wall renders every image in a 3:4 frame with `object-cover`, so portrait
phone photographs need no cropping. A landscape frame is cropped to its
centre.
