import { ALASKA } from "@/lib/alaska";

/**
 * The full plan, open. No accordions — an itinerary someone has to click
 * seven times to read is an itinerary they don't read.
 */
export default function Itinerary() {
  return (
    <section id="itinerary" className="border-t border-line py-24 sm:py-32">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Day by day</p>
          <h2 className="mt-4 text-3xl leading-[1.05] font-semibold text-balance sm:text-4xl">
            The whole plan
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Nothing hidden behind a form. This is the trip as it stands —
            weather and the aurora get a vote on the timings.
          </p>
        </div>

        <ol className="mt-14 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
          {ALASKA.itinerary.map((d) => (
            <li key={d.day} className="bg-base p-6 transition-colors hover:bg-surface sm:p-8">
              <div className="grid gap-5 sm:grid-cols-[120px_1fr] sm:gap-10">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
                    Day {String(d.day).padStart(2, "0")}
                  </div>
                  <div className="mt-1.5 text-xs text-faint">{d.place}</div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold sm:text-xl">{d.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {d.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-faint">
          The helicopter tour on Day 5 is an optional extra, arranged on the
          ground.
        </p>
      </div>
    </section>
  );
}
