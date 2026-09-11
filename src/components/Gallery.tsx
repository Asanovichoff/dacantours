"use client";

import { useEffect, useRef, useState } from "react";
import { ALASKA } from "@/lib/alaska";

/**
 * The trip in photographs — Akan's own, from Alaska.
 *
 * Portrait phone frames, shown in a uniform 3:4 wall. An earlier masonry
 * version kept every native aspect ratio but left one column ending far
 * short of the others; the slight crop is the better trade.
 *
 * No captions: these are not tied to particular days, and labelling them
 * would claim more than the photographs do.
 */
function Shot({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The <img> ships in the prerendered HTML, so the browser can finish
  // loading before hydration attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <figure className="group overflow-hidden rounded-2xl border border-line bg-surface">
      {/* A uniform 3:4 frame. Seven of the nine are already close to this, so
          the crop is slight; CSS columns produced badly ragged column ends. */}
      <div className="aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out-quint group-hover:scale-[1.04] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </figure>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="border-t border-line py-24 sm:py-32">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">From Alaska</p>
          <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
            Photographs from the last trip
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Aurora over Fairbanks, the hot springs, the dog teams, the glaciers
            from the air — and the people who came along. All taken on the
            trip, not bought in.
          </p>
        </div>

        {/* Eight photographs tile evenly as 4x2 on desktop, 2x4 on mobile. */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ALASKA.gallery.map((src, i) => (
            <Shot key={src} src={src} alt={`Alaska, photograph ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
