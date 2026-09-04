"use client";

import { useEffect, useRef, useState } from "react";
import { getTourImage } from "@/lib/assets";
import { mapTitleToSlug, tourDetails, type Tour } from "@/lib/tours";

/**
 * A tour card that opens in place.
 *
 * The old flow was: Details -> modal -> Continue to Interest Form -> scroll ->
 * find the trip in a dropdown again. Four steps to say "I'm interested".
 * Here the card expands where it sits, and one button jumps to the form with
 * this trip already chosen.
 */
export default function TourCard({
  tour,
  onRegister,
}: {
  tour: Tour;
  onRegister: (tour: Tour) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The <img> ships in the prerendered HTML, so the browser can finish
  // loading it before hydration attaches onLoad — in which case onLoad never
  // fires and the image would stay invisible.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const slug = mapTitleToSlug(tour);
  const details = slug ? tourDetails[slug] : undefined;
  const isCustom = tour.title === "Custom Adventure - Your Way";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-white/20">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={getTourImage(tour.title)}
          alt={tour.title}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out-quint group-hover:scale-[1.04] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        {!isCustom && (
          <span className="absolute left-4 top-4 rounded-full bg-base/70 px-3 py-1 text-xs font-medium backdrop-blur-md">
            from ${tour.price.toLocaleString()}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{tour.title}</h3>
        <p className="mt-1.5 text-sm text-faint">{tour.location}</p>

        <p className="mt-4 text-sm leading-relaxed text-muted">{tour.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-faint">
          <span>{tour.duration}</span>
          <span aria-hidden="true">·</span>
          <span>{tour.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span>Max {tour.maxGroupSize}</span>
        </div>

        {/* Expanded detail, in place — no overlay, no navigation. */}
        {details && (
          <div
            id={`details-${tour.id}`}
            hidden={!open}
            className="mt-6 border-t border-line pt-6"
          >
            <p className="text-xs text-faint">
              Starts in <span className="text-muted">{details.gather}</span>
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {details.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm text-muted">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            {details.notes.length > 0 && (
              <ul className="mt-4 space-y-1">
                {details.notes.map((n) => (
                  <li key={n} className="text-xs leading-relaxed text-faint">
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* mt-auto keeps the actions on a common baseline across a row. */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <button type="button" onClick={() => onRegister(tour)} className="btn-solid !py-2.5 text-[13px]">
            {isCustom ? "Design my trip" : "Register interest"}
          </button>
          {details && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={`details-${tour.id}`}
              className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
            >
              {open ? "Less" : "What you'll see"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
