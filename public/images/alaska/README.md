# Alaska promo images

Every image the Alaska promo page uses lives in this folder. Swapping in a
real photograph is a file replacement — no code change anywhere.

| File | Used for | Size | Source |
| --- | --- | --- | --- |
| `aurora-hero.webp` | Full-bleed hero behind the headline | 1040×700 | **Real photo** — already owned |
| `dog-sledding.webp` | Day 2 · dog sledding | 1600×1000 | Original artwork |
| `chena-hot-springs.webp` | Day 3 · Chena Hot Springs | 1600×1000 | Original artwork |
| `ice-museum.webp` | Day 3 · Ice Museum | 1600×1000 | Original artwork |
| `glaciers.webp` | Day 5 · glaciers and helicopter | 1600×1000 | Original artwork |
| `alyeska-skiing.webp` | Day 6 · Alyeska ski resort | 1600×1000 | Original artwork |
| `seward-harbor.webp` | Day 7 · Seward Harbor | 1600×1000 | Original artwork |
| `snoqualmie-falls.webp` | Day 1 · Snoqualmie Falls | 1600×1000 | Original artwork |

## Replacing one

Keep the filename identical and the page picks it up. Landscape, roughly
16:10, at least 1600px wide. WebP is preferred (smaller); JPEG works if you
also change the extension in `src/lib/alaska.ts`.

```bash
# from the repo root, after dropping in your photo
cp ~/Desktop/my-dog-sled-photo.jpg public/images/alaska/dog-sledding.webp   # convert first
```

To convert and resize in one step:

```bash
sips -Z 1600 -s format webp input.jpg --out public/images/alaska/dog-sledding.webp
```

## Why artwork and not stock photography

The environment these were made in cannot download images, and putting stock
photos of Alaska on the page would imply they are pictures of this trip. The
artwork is deliberately illustrative so nobody mistakes it for a photograph —
it holds the layout until real photographs from the trip replace it.
