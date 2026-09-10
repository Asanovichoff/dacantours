"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import AlaskaHero from "@/components/AlaskaHero";
import Gallery from "@/components/Gallery";
import Itinerary from "@/components/Itinerary";
import WaitlistForm from "@/components/WaitlistForm";
import TourCard from "@/components/TourCard";
import { ASSETS } from "@/lib/assets";
import { ALASKA } from "@/lib/alaska";
import { tours, activeTours, CONTACT, type Tour } from "@/lib/tours";

const ALASKA_ID = (tours.find((t) => t.title.startsWith("Alaska")) as Tour).id;
const KG_ID = (tours.find((t) => t.title.includes("Kyrgyzstan")) as Tour).id;
/** The rest of the catalogue — Alaska is the promo, so it is not repeated here. */
const OTHER_TOURS = activeTours.filter((t) => t.id !== ALASKA_ID);

/**
 * Alaska promo page — lives on the `promo-alaska` branch only.
 *
 * `main` still holds the Kyrgyzstan-led site. To run the promo, point
 * Cloudflare's production branch at `promo-alaska`; to end it, point it back
 * at `main`. Nothing here needs unpicking afterwards.
 */
export default function Page() {
  const [selectedId, setSelectedId] = useState<number>(ALASKA_ID);

  return (
    <>
      <Nav
        links={[
          { href: "#itinerary", label: "Itinerary" },
          { href: "#tours", label: "Other trips" },
          { href: "#contact", label: "Contact" },
        ]}
        cta={{ href: "#register", label: "Register interest" }}
      />

      <main>
        <AlaskaHero />

        {/* ---------------- Facts + the Seattle leg ---------------- */}
        <section className="border-t border-line py-24 sm:py-32">
          <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow">The trip</p>
              <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
                Fairbanks for the lights, Anchorage for the ice
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                We gather in Seattle, fly north the same night, and spend three
                days around Fairbanks where the aurora is most reliable — then
                move south to Anchorage for glaciers, Alyeska and the coast.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {ALASKA.facts.map((f) => (
                  <div key={f.label} className="bg-base px-5 py-5">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-lg font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <a href="#register" className="btn-solid mt-9">
                Register interest
              </a>
            </div>

            <figure className="self-start overflow-hidden rounded-2xl border border-line">
              <div className="aspect-[16/11]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ALASKA.gatewayImage}
                  alt="Frosted trees at dusk outside Fairbanks"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="border-t border-line bg-surface px-5 py-4 text-sm text-muted">
                <span className="text-accent">Day 1</span> — Seattle, Snoqualmie
                Falls and the first Starbucks, then the night flight north.
              </figcaption>
            </figure>
          </div>
        </section>

        <Gallery />
        <Itinerary />

        {/* ---------------- Register ---------------- */}
        <section id="register" className="border-t border-line py-24 sm:py-32">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
              <div>
                <p className="eyebrow">Register</p>
                <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
                  Twelve places, leaving 28 November
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  Three fields. Tell us you&apos;re interested and we&apos;ll
                  come back to you personally with costs and the practical
                  details — flights, kit, and what the nights are actually like.
                </p>
                <p className="mt-8 text-sm text-faint">
                  Prefer to just write to us?{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-ink underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
                <WaitlistForm
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  leadId={ALASKA_ID}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Kyrgyzstan, still collecting ---------------- */}
        <section id="kyrgyzstan" className="border-t border-line py-20">
          <div className="shell">
            <div className="relative overflow-hidden rounded-2xl border border-line">
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.kyrgyzstanPreview}
                  alt="The Tien Shan mountains of Kyrgyzstan"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-base via-base/85 to-base/40" />
              </div>

              <div className="relative grid gap-6 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="eyebrow">Still ahead</p>
                  <h2 className="mt-3 text-2xl font-semibold text-balance sm:text-3xl">
                    Kyrgyzstan, after this
                  </h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
                    Ten days across the Tien Shan — yurt camps, alpine lakes and
                    horseback. Dates aren&apos;t set, and the waitlist is still
                    open.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(KG_ID);
                    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-line shrink-0"
                >
                  Join that waitlist
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- The rest of the catalogue ---------------- */}
        <section id="tours" className="border-t border-line py-24 sm:py-32">
          <div className="shell">
            <div className="max-w-2xl">
              <p className="eyebrow">Also running</p>
              <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
                Our other trips
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Alaska in November is the one with dates on it. These run
                through the year — say which one interests you and we&apos;ll
                come back to you.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {OTHER_TOURS.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onRegister={(t) => {
                    setSelectedId(t.id);
                    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="border-t border-line py-24 sm:py-32">
          <div className="shell grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <p className="eyebrow">Who we are</p>
              <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
                A small team, based in Seattle
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                We run expert-guided trips through America&apos;s national parks
                and wilderness, in groups small enough that you know everyone by
                the second day.
              </p>
            </div>

            <dl className="space-y-px self-start overflow-hidden rounded-2xl border border-line bg-line">
              <div className="bg-base px-6 py-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${CONTACT.email}`} className="text-[15px] transition-colors hover:text-accent">
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div className="bg-base px-6 py-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">Phone</dt>
                <dd className="mt-1.5">
                  <a href={`tel:${CONTACT.phoneHref}`} className="text-[15px] transition-colors hover:text-accent">
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div className="bg-base px-6 py-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">Based in</dt>
                <dd className="mt-1.5 text-[15px] text-muted">{CONTACT.location}</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-12">
        <div className="shell flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="DACANTOURS" className="h-6 w-auto opacity-70" />
          <p className="text-xs text-faint">© 2026 DACANTOURS · Seattle, WA</p>
        </div>
      </footer>
    </>
  );
}
