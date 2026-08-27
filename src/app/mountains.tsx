/**
 * Layered Tien Shan ridgeline, drawn rather than photographed.
 *
 * Deliberate launch choice: original artwork beats generic stock imagery, so
 * this stands in until Akan's own photography is ready. It is pure SVG, so it
 * costs a few KB, scales to any viewport, and needs no image pipeline.
 *
 * The scene is bound to the first viewport (h-dvh) so the ridgeline reads as a
 * horizon for the hero rather than bleeding down through the page content.
 */

const STARS = [
  [6, 12, 1.1], [14, 26, 0.7], [21, 8, 0.9], [28, 19, 1.3], [34, 31, 0.6],
  [41, 14, 0.8], [47, 25, 1.0], [53, 9, 0.7], [59, 21, 1.2], [66, 33, 0.6],
  [72, 16, 0.9], [78, 28, 1.1], [84, 11, 0.8], [90, 23, 0.7], [95, 35, 1.0],
  [11, 38, 0.8], [25, 44, 0.6], [38, 40, 0.9], [50, 47, 0.7], [63, 42, 0.8],
  [75, 49, 0.6], [88, 44, 0.9], [3, 30, 0.7], [17, 17, 0.6], [44, 6, 1.0],
  [69, 6, 0.8], [81, 38, 0.7], [97, 18, 0.9], [31, 12, 0.7], [57, 34, 0.6],
] as const;

export function Mountains() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-dvh overflow-hidden">
      {/* Night sky */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#040910_0%,#060d15_34%,#08131f_62%,#0b1c2b_86%,#0d2233_100%)]" />

      {/* Golden-hour glow, low on the horizon and well clear of the headline */}
      <div
        className="absolute left-[58%] bottom-[14%] h-[30vh] w-[85vw] -translate-x-1/2 rounded-[50%] opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(224,160,71,0.28) 0%, rgba(224,160,71,0.10) 40%, rgba(31,118,131,0.08) 65%, transparent 80%)",
        }}
      />

      {/* Stars */}
      <svg
        className="absolute inset-x-0 top-0 h-[58%] w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 60"
        aria-hidden="true"
      >
        {STARS.map(([x, y, r], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r * 0.09}
            fill="#f4f0e6"
            style={{
              animation: `twinkle ${5 + (i % 5) * 1.7}s ease-in-out ${i * 0.28}s infinite`,
            }}
          />
        ))}
      </svg>

      {/* Ridgelines — far to near, each darker so depth reads without contrast
          fighting the headline sitting above them. */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[44%] w-full"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b3448" />
            <stop offset="100%" stopColor="#132a3c" />
          </linearGradient>
          <linearGradient id="ridgeMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#102232" />
            <stop offset="100%" stopColor="#0a1a28" />
          </linearGradient>
          <linearGradient id="ridgeNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#07111b" />
            <stop offset="100%" stopColor="#050b12" />
          </linearGradient>
        </defs>

        <path
          fill="url(#ridgeFar)"
          opacity="0.9"
          d="M0,300 L110,232 L186,272 L286,178 L368,246 L470,160 L556,228 L676,132 L774,216 L878,154 L1002,238 L1104,186 L1224,258 L1330,206 L1440,268 L1440,520 L0,520 Z"
        />
        <path
          fill="url(#ridgeMid)"
          d="M0,366 L96,306 L178,348 L278,258 L398,330 L502,278 L622,350 L724,290 L846,360 L962,300 L1082,372 L1204,318 L1322,382 L1440,338 L1440,520 L0,520 Z"
        />
        <path
          fill="url(#ridgeNear)"
          d="M0,436 L138,394 L262,428 L382,372 L520,428 L664,384 L802,436 L940,394 L1082,442 L1222,400 L1360,448 L1440,414 L1440,520 L0,520 Z"
        />
      </svg>

      {/* Settle the scene into the page background */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-night" />
    </div>
  );
}
