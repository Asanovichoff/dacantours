"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Expedition from "@/components/Expedition";
import TourCard from "@/components/TourCard";
import WaitlistForm from "@/components/WaitlistForm";
import { ASSETS } from "@/lib/assets";
import { activeTours, tours, CONTACT, type Tour } from "@/lib/tours";

const KG_ID = (tours.find((t) => t.title.includes("Kyrgyzstan")) as Tour).id;

export default function Page() {
  // The form defaults to Kyrgyzstan; a tour card can claim it.
  const [selectedId, setSelectedId] = useState<number>(KG_ID);

  const handleRegister = (tour: Tour) => {
    setSelectedId(tour.id);
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav />

      <main>
        <Hero />
        <Expedition />

        {/* ---------------- Waitlist ---------------- */}
        <section id="waitlist" className="border-t border-line py-24 sm:py-32">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
              <div>
                <p className="eyebrow">Register</p>
                <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
                  Be first to hear when dates open
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                  Three fields. We&apos;ll email you when the Kyrgyzstan
                  itinerary and dates are set, before anything goes public.
                  You can use the same form to ask about any of our US trips.
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
                <WaitlistForm selectedId={selectedId} onSelect={setSelectedId} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- US tours ---------------- */}
        <section id="tours" className="border-t border-line py-24 sm:py-32">
          <div className="shell">
            <div className="max-w-2xl">
              <p className="eyebrow">Running now</p>
              <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
                Our tours across America
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                These run today, and they are why the Kyrgyzstan trip is worth
                waiting for — the same small groups, the same people planning
                them.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} onRegister={handleRegister} />
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
                the second day. Kyrgyzstan is where we go next.
              </p>
            </div>

            <dl className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
              <div className="bg-base px-6 py-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-[15px] transition-colors hover:text-accent"
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div className="bg-base px-6 py-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                  Phone
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`tel:${CONTACT.phoneHref}`}
                    className="text-[15px] transition-colors hover:text-accent"
                  >
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div className="bg-base px-6 py-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                  Based in
                </dt>
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
          <p className="text-xs text-faint">
            © 2026 DACANTOURS · Seattle, WA
          </p>
        </div>
      </footer>
    </>
  );
}
