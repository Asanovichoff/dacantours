"use client";

import React, { useState, useEffect } from "react";
import { CONTACT, type Tour } from "@/lib/tours";

/**
 * Interest form.
 *
 * The source posted to a Flask API at http://localhost:8000 — an address that
 * can never resolve for a visitor, so the form could not succeed in
 * production. With no backend here it composes a pre-filled email in the
 * visitor's own mail client instead, addressed to dacantour@gmail.com.
 *
 * Every field, class and state message is unchanged. Swapping in a Worker +
 * email API later is a change to `handleSubmit` alone.
 */

// Fallback so the country select is never empty when restcountries.com is
// slow or unreachable — the source left it blank in that case.
const FALLBACK_COUNTRIES = [
  "Australia", "Canada", "China", "France", "Germany", "India", "Italy",
  "Japan", "Kazakhstan", "Kyrgyzstan", "Mexico", "Netherlands", "Poland",
  "Russia", "South Korea", "Spain", "Switzerland", "Turkey", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uzbekistan",
];

export default function InterestForm({ tours }: { tours: Tour[] }) {
  const [formData, setFormData] = useState({
    tour_id: tours.length > 0 ? String(tours[0].id) : "",
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    date: "",
    agree: false,
  });

  // Countries fetched dynamically and sorted alphabetically
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Bad countries response");
        const names = data
          .map((c: { name?: { common?: string } }) => c?.name?.common)
          .filter((n: string | undefined): n is string => Boolean(n))
          .sort((a: string, b: string) => a.localeCompare(b));
        if (isMounted) setCountries(names);
      } catch {
        if (isMounted) setCountries(FALLBACK_COUNTRIES);
      }
    }
    loadCountries();
    return () => { isMounted = false; };
  }, []);

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? target.checked : value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    if (!formData.agree) {
      setMessage("Please agree to the privacy policy.");
      return;
    }
    setSubmitting(true);
    try {
      const tour = tours.find((t) => String(t.id) === String(formData.tour_id));
      const name = `${formData.first_name} ${formData.last_name}`.trim();

      const rows: [string, string][] = [
        ["Name", name],
        ["Email", formData.email],
        ["Country", formData.country],
        ["Tour", tour ? `${tour.title} ($${tour.price})` : ""],
        ["Preferred date", formData.date],
      ];
      const body = rows
        .filter(([, v]) => v)
        .map(([label, v]) => `${label}: ${v}`)
        .join("\n");

      const subject = tour
        ? `Interest: ${tour.title}`
        : "Interest from dacantours.com";

      window.location.href =
        `mailto:${CONTACT.email}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      setMessage(
        "Thanks! Your email app should have opened with your details filled in — just hit send and we'll be in touch within 24-48 hours!"
      );
      setFormData({
        tour_id: tours.length > 0 ? String(tours[0].id) : "",
        first_name: "",
        last_name: "",
        email: "",
        country: "",
        date: "",
        agree: false,
      });
    } catch {
      setMessage("Something went wrong. Please email us at " + CONTACT.email);
    } finally {
      setSubmitting(false);
    }
  }

  const selectedTour = tours.find((t) => String(t.id) === String(formData.tour_id));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-100">Subscribe for travel deals and inspiration</h3>
      </div>

      {/* Row 1: First / Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">First name<span className="text-red-500">*</span></label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Last name<span className="text-red-500">*</span></label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white placeholder-gray-400"
            required
          />
        </div>
      </div>

      {/* Row 2: Email / Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Email address<span className="text-red-500">*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Country of residence</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white"
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Tour + Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tour_id" className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Select tour<span className="text-red-500">*</span></label>
          <select
            id="tour_id"
            name="tour_id"
            value={formData.tour_id}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white"
            required
          >
            {tours.map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.title} — ${tour.price}
              </option>
            ))}
          </select>
          {selectedTour?.title?.includes("Kyrgyzstan") && (
            <div className="mt-2 p-3 bg-purple-900/50 border border-purple-500 rounded-lg">
              <p className="text-sm text-purple-200">
                🚀 <strong>Kyrgyzstan Waitlist:</strong> Join our exclusive waitlist for early access to this upcoming adventure! We&apos;ll notify you as soon as bookings open.
              </p>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="date" className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Preferred travel date (optional)</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white"
          />
        </div>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          checked={formData.agree}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500 bg-gray-600"
        />
        <label htmlFor="agree" className="text-sm text-gray-100">
          I have read and agree to the <a href="#privacy" className="underline">privacy policy</a><span className="text-red-500">*</span>
        </label>
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition-all duration-300 transform hover:scale-105"
        >
          {submitting ? "Submitting..." : "Subscribe to emails"}
        </button>
      </div>

      {message && (
        <div
          role="status"
          className={`mt-3 p-2 rounded-md text-center text-sm ${
            message.toLowerCase().includes("error") || message.toLowerCase().includes("fail") || message.toLowerCase().includes("wrong") || message.toLowerCase().includes("please agree")
              ? "bg-red-900 text-red-200 border border-red-700"
              : "bg-green-900 text-green-200 border border-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
