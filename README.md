# DACANTOURS

Marketing site for [dacantours.com](https://dacantours.com). A single static
page built around the upcoming **Kyrgyzstan expedition**, with the five US
national park tours below it.

## Stack

- **Next.js 16** (App Router), `output: "export"` — fully static
- **TypeScript**
- **Tailwind CSS v4**
- **Inter**, self-hosted via `@fontsource-variable/inter`
- **Cloudflare** — an assets-only Worker; static asset requests are free and
  unlimited

No database, no backend, no CMS. Content lives in `src/lib/tours.ts`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site -> ./out
```

## The design

Dark blue, black and white. Near-black ground (`--color-base #05080f`), navy
panels, white type, and a single cool blue (`--color-accent #5b8def`) used
only for eyebrows, list markers and focus rings. Primary actions are white
pills on dark, which keeps the palette to the three colours.

Page order, which is the point: **Kyrgyzstan hero → what the trip is →
waitlist form → US tours → who we are**. The waitlist sits above the US tours
deliberately — the expedition is what the site is for.

### What was removed

The previous design carried a lot of interaction that did not earn its place:

- **The modal.** Details → modal → "Continue to Interest Form" → scroll →
  re-select the trip in a dropdown was four steps to say "I'm interested."
  Cards now expand in place, and one button jumps to the form with that trip
  already selected.
- **The mobile menu.** A hamburger toggle before you could reach anything.
  The nav is now three items and one action, and the section links simply
  fall away on small screens.
- **Four of seven form fields.** First name, last name, country, travel date
  and a consent tick are gone. Name, email and trip remain; consent is a line
  of text, which is standard and costs no click.
- **Duplicate messaging.** The hero had two competing CTAs, three feature
  cards and a "coming soon" banner that repeated the Kyrgyzstan section
  further down. Contact details appeared in both a section and the footer.
  Each now appears once.
- **Emoji as iconography**, and the "Why choose us" bullet list, which said
  nothing a visitor would not assume.

### Kyrgyzstan is waitlist-only

No price and no dates are published. `src/lib/tours.ts` still holds the
$3,200 figure from the original database seed, but nothing renders it. The
copy in `KYRGYZSTAN` is drawn from the tour record's own description — treat
it as a starting point to edit rather than finished marketing.

## Content

`src/lib/tours.ts` holds the six tour records, the four tour-detail records,
the `KYRGYZSTAN` block and the contact details. The Kyrgyzstan record is
`isActive: false`, so it is excluded from the US tour grid but is the default
option in the form.

## Images

`public/images`, served by the Worker. Optimised to WebP at max 2000px —
9.75 MB of source photography down to 1.75 MB.

`logo.jpg` in the original project is actually a PNG with an alpha channel
despite its extension; it is stored here as lossless WebP with transparency
preserved. Flattening it puts a black box behind the wordmark.

R2 was considered and skipped: at this size it saves nothing, since Worker
static assets are already free. To move later, add a bucket prefix in the
`asset()` function in `src/lib/assets.ts` — nothing else changes.

## Deployment

The Worker builds from `main` on every push.

| Field | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Version command | `npx wrangler versions upload` (preview branches) |
| Root directory | *(empty)* |

Do **not** use Cloudflare's "Next.js" framework preset — it runs
`npx opennextjs-cloudflare build`, which expects a server build and fails.

## Open items

- [ ] The Kyrgyzstan copy is a first draft written from the tour description
- [ ] The form opens the visitor's mail client. A Worker function plus an
      email API would let it submit directly, and would let you capture
      sign-ups you currently lose when someone doesn't hit send.
- [ ] No photography of Kyrgyzstan beyond the single hero image
