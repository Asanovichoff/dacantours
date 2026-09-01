# DACANTOURS

Marketing site for [dacantours.com](https://dacantours.com) — guided small-group
tours of America's national parks, with Kyrgyzstan trips coming soon.

A static build of the `inbound-travel-platform` site. **The design is carried
over unchanged**; see "Design fidelity" below for the verification.

## Stack

- **Next.js 16** (App Router), `output: "export"` — a fully static build
- **TypeScript**
- **Tailwind CSS v4**
- **Cloudflare** — an assets-only Worker; static asset requests are free and
  unlimited

No database, no backend, no CMS. Tour content lives in `src/lib/tours.ts`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site -> ./out
```

## Images

Images live in `public/images` and are served by the Worker. Static asset
requests on Workers are free and unlimited, so this costs nothing.

They are optimised to WebP at max 2000px wide — **9.75 MB of source
photography down to 1.75 MB**, visually unchanged. One photo alone was 7.5 MB
at 5757px wide, displayed in a card a few hundred pixels tall.

`logo.jpg` in the source project is actually a PNG with an alpha channel
despite its extension. It is stored here as lossless WebP with transparency
preserved — flattening it puts a black box behind the wordmark in the nav.

R2 was considered and skipped: at 1.75 MB it saves nothing (Worker assets are
already free) and adds a bucket, a custom domain and an upload step. If you
later want to swap photos without redeploying, move these files to an R2
bucket on a custom domain and add that prefix in `src/lib/assets.ts` — that
one function is the only thing that needs to change.

## Deployment

The Worker builds from `main` on every push.

| Field | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Version command | `npx wrangler versions upload` (preview branches) |
| Root directory | *(empty)* |

Do **not** use Cloudflare's "Next.js" framework preset — it runs
`npx opennextjs-cloudflare build`, which expects a server build and fails here.

## Design fidelity

The port was verified against a build of the original Vite app, rendered with
identical image and API stubs. Section heights now match to the pixel:

```
             ORIGINAL   PORT
hero            900      900
about           536      536
contact         588      588
kyrgyzstan      720      720
footer          349      349
tours          1540     1548   (+8, see below)
interest-form    784      782   (-2, see below)
```

Three Tailwind v3 → v4 differences had to be neutralised to get there:

1. **Border colour.** v4 defaults a bare `border` to `currentColor`; v3 used
   `gray-200`. Restored in `globals.css`.
2. **Font stack.** v4 ships a shorter default sans stack. v3's exact stack is
   pinned in `@theme`, because the different font changed text metrics and
   therefore where headings wrapped.
3. **Line-height precedence.** v3 emitted `md:`/`lg:` font-size rules *after*
   `.leading-*`, so at those breakpoints the font size's own line-height won
   and `leading-tight` only applied on mobile. v4 orders them the other way,
   which made the hero 39px taller. Three elements now carry explicit
   breakpoint line-heights that reproduce v3's result exactly.

The remaining `+8px` on the tours grid is the tour-card button arrow (below);
the `-2px` is Chromium's intrinsic `input[type=date]` height under v4's
Preflight.

## What changed beyond the port

Nothing visual, except where noted:

- **Tour card arrow.** The source had `<span className="mr-2">Details</span>`
  followed by an *empty* span carrying `group-hover:translate-x-1` — an arrow
  that had gone missing. Restored as `→`. This is the +8px above.
- **Images load reliably.** The source was a client-rendered SPA, so React
  always created the `<img>` after mount and its `onLoad` fired. Prerendered,
  the browser often finishes loading before hydration attaches the handler, so
  `onLoad` never fired and every tour image stayed invisible behind its
  placeholder. `TourCard` now also checks `img.complete` on mount.
- **The form works.** It posted to `http://localhost:8000`, which can never
  resolve for a visitor. It now composes a pre-filled email to
  dacantour@gmail.com. Every field, class and message is unchanged.
- **Country list has a fallback.** If restcountries.com is unreachable the
  select was empty; it now falls back to a built-in list.
- **Kyrgyzstan is selectable in the form.** The API filtered it out of the
  grid (`is_active = false`), but both "Join Waitlist" buttons scroll to the
  form — where it could not be chosen, making the waitlist notice unreachable.
  The grid still hides it.
- **SEO and favicon.** The page was titled "Vite + React" with the Vite
  favicon and no meta description. Now has a real title, description,
  Open Graph and Twitter cards, schema.org `TravelAgency`, `robots.txt`,
  `sitemap.xml`, and a favicon generated from the globe in the logo.
- **Content fixes.** Footer read "© 2025 DAKANTOURS" (everywhere else
  DACANTOURS); "Seattle,WA" was missing a space. Email and phone in the
  contact section are now real `mailto:`/`tel:` links.
- **Accessibility.** Form labels are associated with their inputs, the mobile
  menu button has `aria-expanded`, the details modal closes on Escape and traps
  focus, decorative SVGs are `aria-hidden`, and a `prefers-reduced-motion`
  block was added.

## Open items

- [ ] Hero background is still a remote Unsplash URL — the one image not in
      the asset set. Worth replacing with your own photograph.
- [ ] The form opens the visitor's mail client. A Cloudflare Worker function
      plus an email API would let it submit directly.
