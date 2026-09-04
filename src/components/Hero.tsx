import { ASSETS } from "@/lib/assets";
import { KYRGYZSTAN } from "@/lib/tours";

/**
 * Kyrgyzstan is the subject of the site now, so it owns the first screen.
 * One action. The previous hero carried two competing CTAs, three feature
 * cards and a duplicate "coming soon" banner.
 */
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.kyrgyzstanPreview}
          alt="The Tien Shan mountains of Kyrgyzstan"
          className="h-full w-full object-cover"
        />
        {/* Two stacked gradients: one to seat the type, one to blend the
            photograph into the page below it. */}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-base/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/80 via-transparent to-transparent" />
        {/* Keeps the fixed nav legible over a bright sky. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-base/80 to-transparent" />
      </div>

      <div className="shell relative z-10 pb-20 pt-32 sm:pb-28">
        <p className="eyebrow rise">Our next expedition</p>

        <h1 className="rise mt-5 max-w-4xl text-[2.75rem] leading-[0.95] font-semibold text-balance sm:text-7xl lg:text-8xl">
          Kyrgyzstan
          <span className="block text-muted">is next.</span>
        </h1>

        <p className="rise mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {KYRGYZSTAN.intro}
        </p>

        <div className="rise mt-9 flex flex-wrap items-center gap-3">
          <a href="#waitlist" className="btn-solid">
            Join the waitlist
          </a>
          <a href="#expedition" className="btn-line">
            What the trip is
          </a>
        </div>

        <p className="rise mt-8 text-sm text-faint">
          Run by the team behind our US national park tours — five of them, below.
        </p>
      </div>
    </section>
  );
}
