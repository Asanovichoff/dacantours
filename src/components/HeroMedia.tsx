import { ALASKA } from "@/lib/alaska";

/**
 * The moving backdrop behind the headline.
 *
 * With `ALASKA.heroVideo` set this is Akan's aurora clip, silent and looping.
 * It is a single <video> element — the phone and wide-screen treatments are
 * the same element restyled by `.hero-clip` in globals.css, so no device ever
 * decodes a copy it cannot see. On wide screens a blurred still sits behind
 * it as ambient colour; a picture is enough for something under 80px of blur.
 *
 * With `heroVideo` null it cross-fades the stills instead. Either way the
 * motion is declarative — a <video> the browser drives, or CSS keyframes — so
 * there are no timers, no state, and nothing to desync at hydration.
 *
 * If autoplay is refused (iOS low-power mode, data saver) the poster stays up
 * and the hero simply reads as a still.
 */
export default function HeroMedia() {
  const video = ALASKA.heroVideo;

  if (video) {
    return (
      <div className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.poster}
          alt=""
          aria-hidden
          className="hero-wash absolute inset-0 hidden h-full w-full scale-150 object-cover opacity-70 blur-[80px] saturate-125 md:block"
        />
        <video
          className="hero-clip"
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="hero-stills h-full w-full">
      {ALASKA.heroFrames.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === 0 ? "The northern lights over Alaska" : ""}
          aria-hidden={i > 0}
          fetchPriority={i === 0 ? "high" : "low"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animationDelay: `${i * 8}s, ${i * 8}s` }}
        />
      ))}
    </div>
  );
}
