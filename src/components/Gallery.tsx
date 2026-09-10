"use client";

import { useEffect, useRef, useState } from "react";
import { ALASKA } from "@/lib/alaska";

/**
 * The trip in pictures. Captions sit under a scrim and lift on hover, so the
 * images carry the section rather than competing with a block of text.
 *
 * Images ship in the prerendered HTML, so the browser can finish loading one
 * before hydration attaches onLoad — hence the `complete` check.
 */
function Tile({ item }: { item: (typeof ALASKA.gallery)[number] }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-line bg-surface">
      {/* 16:10 matches the artwork exactly, so nothing is cropped away. */}
      <div className="aspect-[16/10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={ref}
          src={item.image}
          alt={item.title}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out-quint group-hover:scale-[1.05] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base/95 via-base/60 to-transparent p-5 pt-10">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
          Day {item.day}
        </span>
        <figcaption className="mt-1 text-lg font-semibold">{item.title}</figcaption>
        {/* Held at zero height until hover so the tiles stay quiet at rest. */}
        <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-muted opacity-0 transition-all duration-300 ease-out-quint group-hover:mt-1.5 group-hover:max-h-20 group-hover:opacity-100">
          {item.caption}
        </p>
      </div>
    </figure>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="border-t border-line py-24 sm:py-32">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">What you&apos;ll see</p>
          <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
            Seven days, most of them after dark
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Late November in interior Alaska means a few hours of blue daylight
            and a very long night — which is exactly why we go then.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ALASKA.gallery.map((item) => (
            <Tile key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
