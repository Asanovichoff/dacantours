# Dacan Tours

Marketing site for [dacantours.com](https://dacantours.com) — a tour operator
running custom trips across Kyrgyzstan.

Currently a **coming-soon landing page**. The full site is being built in stages.

## Stack

- **Next.js 16** (App Router) with `output: "export"` — a fully static build
- **TypeScript**
- **Tailwind CSS v4**
- **Cloudflare Pages** for hosting (free, and unlike Vercel's Hobby plan it
  permits commercial use)

No database, no server. The whole site is static files.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static site is emitted to ./out
```

## Deployment

Cloudflare Pages builds from `main` on every push.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 22 |

Secrets (e.g. the Resend API key, once contact forms land) belong in
Cloudflare Pages environment variables — **never** in this repo.

## Before launch

- [ ] Set `EMAIL` and `WHATSAPP_NUMBER` in `src/app/page.tsx`
      (an empty WhatsApp number hides the button rather than shipping a dead link)
- [ ] Replace the drawn ridgeline with real photography once available

## Roadmap

Destination and experience pages, a custom Trip Builder, contact forms via
Cloudflare Pages Functions + Resend, and a full Russian locale. See the
project's architecture notes for the reasoning behind each decision.
