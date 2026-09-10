import Countdown from "@/components/Countdown";
import { ALASKA } from "@/lib/alaska";

export default function AlaskaHero() {
  return (
    <section id="top" className="relative flex min-h-[94svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ALASKA.heroImage}
          alt="The northern lights over Alaska"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-base/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/85 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-base/80 to-transparent" />
      </div>

      <div className="shell relative z-10 pb-20 pt-32 sm:pb-28">
        <p className="eyebrow rise">{ALASKA.dates} · 7 days</p>

        <h1 className="rise mt-5 max-w-4xl text-[2.75rem] leading-[0.95] font-semibold text-balance sm:text-7xl lg:text-8xl">
          Alaska,
          <span className="block text-muted">in the dark season.</span>
        </h1>

        <p className="rise mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {ALASKA.intro}
        </p>

        <div className="rise mt-9 flex flex-wrap items-center gap-4">
          <a href="#register" className="btn-solid">
            Register interest
          </a>
          <a href="#itinerary" className="btn-line">
            See the itinerary
          </a>
        </div>

        <div className="rise mt-10 flex flex-wrap items-center gap-4">
          <Countdown iso={ALASKA.departsISO} />
          <p className="text-sm text-white/60">until we fly</p>
        </div>
      </div>
    </section>
  );
}
