"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ALASKA } from "@/lib/alaska";

/**
 * The trip in photographs, on a carousel you can spin.
 *
 * This replaces a 22-tile wall that ran nearly two thousand pixels down the
 * page and asked nothing of anyone. Here the photographs sit on the face of a
 * cylinder that drifts on its own, takes a shove from a finger or a mouse and
 * keeps going with real momentum, and opens a picture full-size on a tap. It
 * costs about a fifth of the height.
 *
 * How it is put together
 *
 *   stage    perspective, and the only thing that catches pointer events
 *   cylinder pushed back by its own radius so the front card sits at z = 0
 *            and the browser's perspective divide doesn't blow it up
 *   card     rotateY(i · step) translateZ(radius)
 *
 * The radius is a CSS variable, so the whole thing resizes at breakpoints
 * without JavaScript knowing the numbers. Cards on the far side are turned
 * away from the viewer and `backface-visibility` drops them for free.
 *
 * Nothing about the spin goes through React state: the angle lives in a ref
 * and the loop writes one transform per frame. React re-renders only when a
 * photograph is opened, or when the front-most card changes so it can be lit.
 *
 * Prerendering: the cards carry their transforms as inline styles, which are
 * pure functions of the index, so the server HTML and the first client render
 * agree exactly. The loop only starts afterwards.
 */

const PHOTOS = ALASKA.gallery;
const STEP = 360 / PHOTOS.length;

/** Degrees per second the reel drifts when nobody is touching it. */
const DRIFT = 3.2;
/** Degrees of rotation per pixel dragged. */
const DEG_PER_PX = 0.17;
/** Per-second velocity decay after a throw. e^(-k·dt). */
const FRICTION = 2.4;
/** Movement under this many pixels counts as a tap, not a drag. */
const TAP_SLOP = 6;

export default function PhotoReel() {
  const stage = useRef<HTMLDivElement>(null);
  const cylinder = useRef<HTMLDivElement>(null);

  const angle = useRef(0);
  const velocity = useRef(DRIFT);
  const dragging = useRef(false);
  const visible = useRef(true);

  const [front, setFront] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  /* ---- the loop ------------------------------------------------------- */

  useEffect(() => {
    const el = cylinder.current;
    const host = stage.current;
    if (!el || !host) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = performance.now();

    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    io.observe(host);

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!dragging.current && visible.current) {
        // Decay whatever was thrown in, settling onto the idle drift rather
        // than onto a standstill — the reel is never quite still.
        const target = calm.matches ? 0 : DRIFT;
        velocity.current =
          target + (velocity.current - target) * Math.exp(-FRICTION * dt);
        angle.current += velocity.current * dt;
      }

      el.style.transform = `translateZ(calc(-1 * var(--reel-r))) rotateY(${angle.current}deg)`;

      const n = PHOTOS.length;
      const i = ((Math.round(-angle.current / STEP) % n) + n) % n;
      setFront((prev) => (prev === i ? prev : i));

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  /* ---- dragging ------------------------------------------------------- */

  useEffect(() => {
    const host = stage.current;
    if (!host) return;

    let id: number | null = null;
    let lastX = 0;
    let lastT = 0;
    let travelled = 0;
    let started: number | null = null;

    const down = (e: PointerEvent) => {
      if (id !== null) return;
      // Read the card now: setPointerCapture retargets every later event
      // (and the resulting click) to the stage, so by pointerup the browser
      // can no longer tell us which photograph was under the finger.
      const card = (e.target as Element | null)?.closest?.("[data-index]");
      started = card ? Number((card as HTMLElement).dataset.index) : null;

      id = e.pointerId;
      host.setPointerCapture(id);
      dragging.current = true;
      velocity.current = 0;
      lastX = e.clientX;
      lastT = e.timeStamp;
      travelled = 0;
    };

    const move = (e: PointerEvent) => {
      if (id !== e.pointerId) return;
      const dx = e.clientX - lastX;
      const dt = (e.timeStamp - lastT) / 1000;
      lastX = e.clientX;
      lastT = e.timeStamp;
      travelled += Math.abs(dx);
      angle.current += dx * DEG_PER_PX;
      // Instantaneous velocity, smoothed, so a throw carries but a jitter at
      // the moment of release does not.
      if (dt > 0) {
        const v = (dx * DEG_PER_PX) / dt;
        velocity.current = velocity.current * 0.7 + v * 0.3;
      }
    };

    const up = (e: PointerEvent) => {
      if (id !== e.pointerId) return;

      // Settle our own state first. Touch pointers are released implicitly
      // the moment they lift, so releasePointerCapture throws NotFoundError
      // for them — and an exception here used to take the tap down with it.
      // The symptom was a reel that opened photographs under a mouse and
      // ignored every finger.
      id = null;
      dragging.current = false;
      const wasTap = travelled < TAP_SLOP && started !== null;
      const tapped = started;
      started = null;

      try {
        host.releasePointerCapture(e.pointerId);
      } catch {
        /* already gone */
      }

      if (wasTap && tapped !== null) setOpen(tapped);
    };

    host.addEventListener("pointerdown", down);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);
    return () => {
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", up);
    };
  }, []);

  const nudge = useCallback((dir: number) => {
    velocity.current = dir * 150;
  }, []);

  return (
    <section id="gallery" className="reel-section border-t border-line py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">From Alaska</p>
            <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
              Photographs from the last trip
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Aurora over Fairbanks, the hot springs, the dog teams, the
              glaciers from the air — and the people who came along. Spin it.
            </p>
          </div>

          {/* A finger drags; these are for a mouse and for the keyboard,
              both of which live on a wider screen. */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Spin the photographs back"
              className="reel-nudge"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Spin the photographs forward"
              className="reel-nudge"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={stage}
        className="reel-stage"
        role="group"
        aria-label="Photographs from Alaska — drag to spin"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") nudge(1);
          else if (e.key === "ArrowRight") nudge(-1);
          else return;
          e.preventDefault();
        }}
      >
        <div ref={cylinder} className="reel-cylinder">
          {PHOTOS.map((p, i) => (
            <button
              key={p.thumb}
              type="button"
              data-index={i}
              data-front={i === front || undefined}
              // Pointer taps are handled on the stage, above. A click with no
              // detail came from the keyboard, which the stage never sees.
              onClick={(e) => e.detail === 0 && setOpen(i)}
              className="reel-card"
              style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--reel-r))` }}
              aria-label={`Open photograph ${i + 1} of ${PHOTOS.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumb} alt="" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>

        <div className="reel-scrim reel-scrim-l" />
        <div className="reel-scrim reel-scrim-r" />
      </div>

      <p className="shell mt-8 text-sm text-faint">
        {front + 1} / {PHOTOS.length} · drag to spin, tap a photograph to open it
      </p>

      {open !== null && (
        <Lightbox
          index={open}
          onClose={() => setOpen(null)}
          onStep={(d) =>
            setOpen((v) => (v === null ? v : (v + d + PHOTOS.length) % PHOTOS.length))
          }
        />
      )}
    </section>
  );
}

/* ---- the opened photograph -------------------------------------------- */

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  // A touch that opens a photograph also produces a compatibility click a
  // moment later, and by then this overlay is sitting under the finger — so
  // the backdrop would swallow it and close again instantly. The reel opened
  // fine with a mouse and refused every finger. Ignore clicks that land
  // before the overlay has had time to be aimed at.
  const armedAt = useRef(0);
  useEffect(() => {
    armedAt.current = performance.now() + 400;
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", key);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onStep]);

  return (
    <div
      className="reel-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photograph"
      onClickCapture={(e) => {
        if (performance.now() < armedAt.current) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <button type="button" className="reel-lightbox-bg" aria-label="Close" onClick={onClose} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={index} src={PHOTOS[index].full} alt="" className="reel-lightbox-img" />

      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label="Previous photograph"
        className="reel-arrow left-4 sm:left-8"
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label="Next photograph"
        className="reel-arrow right-4 sm:right-8"
      >
        <Chevron dir="right" />
      </button>
      <button type="button" onClick={onClose} aria-label="Close" className="reel-close">
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      </button>

      <p className="reel-count">
        {index + 1} / {PHOTOS.length}
      </p>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
