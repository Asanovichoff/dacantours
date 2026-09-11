import { ALASKA } from "@/lib/alaska";

/**
 * The moving backdrop behind the headline.
 *
 * If `ALASKA.heroVideo` is set it plays that, muted and looping, with the
 * first still as the poster so something is on screen before the file
 * arrives. Otherwise it cross-fades the aurora stills with a slow drift,
 * which gives the hero motion without shipping megabytes of video.
 *
 * Swapping in a real clip is therefore a data change, not a code change.
 *
 * The fade and drift are pure CSS — no timers, no state, nothing to go wrong
 * between the prerendered HTML and hydration. `prefers-reduced-motion`
 * freezes it on the first frame.
 */
export default function HeroMedia() {
  if (ALASKA.heroVideo) {
    return (
      <video
        className="h-full w-full object-cover"
        poster={ALASKA.heroFrames[0]}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={ALASKA.heroVideo.webm} type="video/webm" />
        <source src={ALASKA.heroVideo.mp4} type="video/mp4" />
      </video>
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
