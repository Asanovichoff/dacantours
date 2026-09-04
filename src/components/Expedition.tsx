import { KYRGYZSTAN } from "@/lib/tours";

/**
 * What the Kyrgyzstan trip actually is. Deliberately no price and no dates —
 * this is a waitlist, and publishing a number you might revise is worse than
 * publishing nothing.
 */
export default function Expedition() {
  return (
    <section id="expedition" className="border-t border-line py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">The expedition</p>
            <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
              Ten days through the Tien Shan
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Kyrgyzstan is one of the last places in Central Asia where
              nomadic life still runs on the seasons rather than on a schedule.
              We are building a single small trip through it, and opening a
              waitlist before anything is published.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {KYRGYZSTAN.facts.map((f) => (
                <div key={f.label} className="bg-base px-5 py-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-lg font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>

            <a href="#waitlist" className="btn-solid mt-9">
              Join the waitlist
            </a>
          </div>

          <ul className="space-y-px self-start overflow-hidden rounded-2xl border border-line bg-line">
            {KYRGYZSTAN.highlights.map((h, i) => (
              <li
                key={h}
                className="flex items-start gap-5 bg-base px-6 py-6 transition-colors hover:bg-surface"
              >
                <span className="mt-0.5 shrink-0 text-xs font-medium tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-relaxed text-muted">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
