"use client";

import { useState } from "react";
import { CONTACT, tours, activeTours, type Tour } from "@/lib/tours";

/**
 * Three fields: name, email, trip.
 *
 * The previous form asked for first name, last name, email, country,
 * trip, travel date and a consent tick — seven interactions before you could
 * submit. Country and dates are things you can ask in a reply; the consent
 * tick is replaced by a line of text, which is standard and costs no click.
 *
 * There is no backend, so this composes a pre-filled email in the visitor's
 * own mail client. Swapping in a Worker endpoint later means changing
 * `handleSubmit` and nothing else.
 */

// Kyrgyzstan leads the list — it is what the site is selling.
const KG = tours.find((t) => t.title.includes("Kyrgyzstan")) as Tour;
const OPTIONS: Tour[] = [KG, ...activeTours];

export default function WaitlistForm({
  selectedId,
  onSelect,
}: {
  selectedId: number;
  onSelect: (id: number) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const trip = OPTIONS.find((t) => t.id === selectedId) ?? KG;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isKg = trip.title.includes("Kyrgyzstan");
    const subject = isKg
      ? "Kyrgyzstan waitlist"
      : `Interest: ${trip.title}`;
    const body = [`Name: ${name}`, `Email: ${email}`, `Trip: ${trip.title}`].join("\n");

    window.location.href =
      `mailto:${CONTACT.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rise rounded-2xl border border-line bg-surface p-8 text-center sm:p-10">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-base">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-semibold">Almost there</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Your email app should have opened with your details filled in. Send it
          and we&apos;ll be in touch. If nothing opened, write to us at{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-ink underline underline-offset-4">
            {CONTACT.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-line mt-6 !py-2.5 text-[13px]"
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="wl-name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="wl-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="wl-email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="wl-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="wl-trip" className="mb-2 block text-sm font-medium">
          Which trip
        </label>
        <select
          id="wl-trip"
          name="trip"
          value={selectedId}
          onChange={(e) => onSelect(Number(e.target.value))}
          className="field appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2393a1b5'%3E%3Cpath fill-rule='evenodd' d='M5.2 7.2a1 1 0 0 1 1.4 0L10 10.6l3.4-3.4a1 1 0 1 1 1.4 1.4l-4.1 4.1a1 1 0 0 1-1.4 0L5.2 8.6a1 1 0 0 1 0-1.4Z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        >
          {OPTIONS.map((t) => (
            <option key={t.id} value={t.id} className="bg-surface">
              {t.title.includes("Kyrgyzstan") ? "Kyrgyzstan expedition" : t.title}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-solid w-full">
        {trip.title.includes("Kyrgyzstan") ? "Join the waitlist" : "Register interest"}
      </button>

      <p className="text-center text-xs leading-relaxed text-faint">
        We&apos;ll only email you about this trip. No newsletters, no sharing
        your details.
      </p>
    </form>
  );
}
