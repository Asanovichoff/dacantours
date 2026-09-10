"use client";

import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/assets";

/**
 * Three items and one action. The old nav had five links plus a hamburger
 * menu on mobile; the menu is gone entirely, which removes a tap before you
 * can do anything. On small screens the logo and the primary action remain,
 * and the section links fall away rather than hiding behind a toggle.
 */
type Link = { href: string; label: string };

export default function Nav({
  links = [
    { href: "#tours", label: "US tours" },
    { href: "#contact", label: "Contact" },
  ],
  cta = { href: "#waitlist", label: "Join the waitlist" },
}: {
  links?: Link[];
  cta?: { href: string; label: string };
}) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-line bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="shrink-0" aria-label="DACANTOURS — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="DACANTOURS" className="h-7 w-auto sm:h-8" />
        </a>

        <div className="flex items-center gap-1 sm:gap-6">
          {/* Over the hero photograph the bar is transparent, so the muted
              link colour is unreadable against a bright sky. Invert until the
              bar goes solid. */}
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`hidden rounded-full px-3 py-2 text-sm transition-colors hover:text-ink sm:block ${
                solid ? "text-muted" : "text-white/85"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href={cta.href} className="btn-solid !px-5 !py-2.5 text-[13px]">
            {cta.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
