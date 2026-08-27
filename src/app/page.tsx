"use client";

import { useState } from "react";
import { Mountains } from "./mountains";
import { content, type Locale } from "./content";

/* ------------------------------------------------------------------ *
 * TODO before launch: replace with the real contact details.
 * Leave WHATSAPP_NUMBER as "" and the button hides itself rather than
 * shipping a dead link.
 * ------------------------------------------------------------------ */
const EMAIL = "hello@dacantours.com";
const WHATSAPP_NUMBER = ""; // digits only, e.g. "996700123456"

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = content[locale];

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <Mountains />

      <div className="relative z-10 mx-auto flex h-dvh max-w-6xl flex-col px-6 sm:px-10">
        {/* ---------------- Header ---------------- */}
        <header className="flex items-center justify-between py-8">
          <span className="font-display text-lg font-semibold tracking-[0.22em] text-snow uppercase">
            Dacan
            <span className="text-ember">.</span>
          </span>

          <div
            className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5 backdrop-blur-sm"
            role="group"
            aria-label="Language"
          >
            {(Object.keys(content) as Locale[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors ${
                  locale === code
                    ? "bg-snow text-night"
                    : "text-mist hover:text-snow"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {/* ---------------- Hero ---------------- */}
        <section className="flex flex-1 flex-col justify-center py-14 sm:py-20">
          <div key={locale} className="animate-rise max-w-3xl">
            <p className="mb-6 text-xs font-medium tracking-[0.32em] text-ember uppercase sm:text-sm">
              {t.eyebrow}
            </p>

            <h1 className="font-display text-5xl leading-[1.02] font-light tracking-tight text-balance text-snow sm:text-7xl lg:text-8xl">
              {t.headline[0]}
              <br />
              <span className="text-ember-soft italic">{t.headline[1]}</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-pretty text-mist sm:text-lg">
              {t.lede}
            </p>

            <div className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-ember/30 bg-ember/10 px-4 py-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              <span className="text-xs font-medium tracking-[0.18em] text-ember-soft uppercase">
                {t.badge}
              </span>
            </div>
          </div>
        </section>

      </div>

      {/* Everything below the hero sits on solid ground, so the ridgeline
          stays a horizon rather than bleeding through the content. */}
      <div className="relative z-10 bg-night">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* ---------------- What's coming ---------------- */}
        <section className="border-t border-white/8 py-14 sm:py-16">
          <div className="grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8 sm:grid-cols-3">
            {t.cards.map((card, i) => (
              <div
                key={`${locale}-${i}`}
                className="group bg-deep/70 p-7 backdrop-blur-sm transition-colors hover:bg-deep sm:p-8"
              >
                <span className="font-display text-xs tracking-[0.2em] text-ember/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display mt-4 text-xl leading-snug text-snow sm:text-2xl">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section className="border-t border-white/8 py-14 sm:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-lg">
              <h2 className="font-display text-2xl text-snow sm:text-3xl">
                {t.contactHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">
                {t.contactBody}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-snow px-6 py-3 text-sm font-medium text-night transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-night focus-visible:outline-none"
              >
                {t.emailCta}
                <span aria-hidden="true">→</span>
              </a>

              {WHATSAPP_NUMBER && (
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-snow transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  {t.whatsappCta}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- Footer ---------------- */}
        <footer className="flex flex-col gap-2 border-t border-white/8 py-8 text-xs text-mist/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Dacan Tours · Kyrgyzstan</span>
          <span>{t.footerNote}</span>
        </footer>
        </div>
      </div>
    </main>
  );
}
