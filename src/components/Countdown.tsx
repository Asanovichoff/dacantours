"use client";

import { useEffect, useState } from "react";

/**
 * Days/hours/minutes until departure.
 *
 * Computed only after mount. The page is prerendered at build time, so
 * rendering a live figure on the server would bake in a stale number and
 * then disagree with the client on hydration.
 */
export default function Countdown({ iso }: { iso: string }) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number } | null>(null);

  useEffect(() => {
    const tick = () => {
      const ms = new Date(iso).getTime() - Date.now();
      if (ms <= 0) return setLeft({ d: 0, h: 0, m: 0 });
      setLeft({
        d: Math.floor(ms / 86400000),
        h: Math.floor((ms / 3600000) % 24),
        m: Math.floor((ms / 60000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [iso]);

  // Reserve the space so nothing shifts when the numbers arrive.
  const cells: [string, number | null][] = [
    ["days", left?.d ?? null],
    ["hrs", left?.h ?? null],
    ["min", left?.m ?? null],
  ];

  return (
    <div className="flex items-stretch gap-px overflow-hidden rounded-xl border border-white/15 bg-white/10 backdrop-blur-md">
      {cells.map(([label, v]) => (
        <div key={label} className="min-w-[74px] bg-base/40 px-4 py-2.5 text-center">
          <div className="text-xl font-semibold tabular-nums text-white sm:text-2xl">
            {v === null ? "––" : String(v).padStart(2, "0")}
          </div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
