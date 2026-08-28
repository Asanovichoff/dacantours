"use client";

import { useState } from "react";
import InterestForm from "@/components/InterestForm";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import TourDetailsModal from "@/components/TourDetailsModal";
import { ASSETS } from "@/lib/assets";
import {
  activeTours,
  tours as allTours,
  tourDetails,
  mapTitleToSlug,
  CONTACT,
  type Tour,
  type TourDetails,
} from "@/lib/tours";

export default function App() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsData, setDetailsData] = useState<TourDetails | null>(null);

  const handleInterestClick = (tour: Tour) => {
    setSelectedTour(tour);
    const slug = mapTitleToSlug(tour);
    const details = slug ? tourDetails[slug] : undefined;
    if (details) {
      setDetailsData(details);
      setDetailsOpen(true);
      return;
    }
    document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProceedAfterDetails = () => {
    setDetailsOpen(false);
    document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <Hero />

      <section id="tours" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore America&apos;s Natural Wonders</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">From the rugged wilderness of Alaska to the iconic Grand Canyon, discover America&apos;s most breathtaking national parks and wilderness areas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onInterestClick={handleInterestClick} />
            ))}
          </div>
        </div>
      </section>

      <section id="interest-form" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-700 rounded-3xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Express Your Interest</h2>
              <p className="text-lg text-gray-300">Let us know which tour interests you, and we&apos;ll contact you via Email to discuss details and help you plan your perfect adventure!</p>
            </div>
            {selectedTour && (
              <div className="bg-blue-900 rounded-lg p-4 mb-6">
                <p className="text-blue-200 font-medium">Selected Tour: <span className="font-bold">{selectedTour.title}</span></p>
              </div>
            )}
            {/* All tours, not just active ones: the Kyrgyzstan Preview is
                hidden from the grid but both "Join Waitlist" CTAs point here,
                so it has to be selectable or the waitlist notice below the
                select is unreachable. */}
            <InterestForm tours={allTours} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About DACANTOURS</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">We&apos;re passionate about connecting travelers with America&apos;s most spectacular natural wonders and authentic cultural experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗽</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">American Adventures</h3>
              <p className="text-gray-300">Expert-guided tours through America&apos;s most iconic national parks and wilderness areas.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Global Expansion</h3>
              <p className="text-gray-300">Coming soon: Authentic Kyrgyzstan adventures featuring nomadic culture and alpine landscapes.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Personalized Service</h3>
              <p className="text-gray-300">Tailored experiences with small group sizes and expert local guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Ready to start your adventure? Contact us for personalized travel planning and expert advice.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    {/* Added: contact details are now actual links. */}
                    <a href={`mailto:${CONTACT.email}`} className="text-gray-300 hover:text-blue-400 transition-colors">{CONTACT.email}</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📱</span>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a href={`tel:${CONTACT.phoneHref}`} className="text-gray-300 hover:text-blue-400 transition-colors">{CONTACT.phone}</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-gray-300">{CONTACT.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">Expert local guides with deep knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">Small group sizes for personalized attention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">Carefully curated itineraries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">24/7 support during your trip</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">Sustainable and responsible tourism</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Kyrgyzstan Section */}
      <section id="kyrgyzstan" className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${ASSETS.kyrgyzstanPreview})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
            <span className="text-sm font-medium">🚀 Global Expansion</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-extrabold leading-tight md:leading-none mb-4">Big Trip to Kyrgyzstan Coming Soon</h3>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">Nomadic culture, alpine lakes, horseback adventures — join the waitlist to be the first to know.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#interest-form" className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition">Join Waitlist</a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.logo} alt="DACANTOURS Logo" className="h-8 w-auto mb-4" />
              <p className="text-gray-400">Discover America&apos;s most breathtaking natural wonders with our expert-guided tours. Soon expanding to Kyrgyzstan for global adventures!</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#tours" className="hover:text-white transition-colors">US Tours</a></li>
                <li><a href="#kyrgyzstan" className="hover:text-white transition-colors">🚀 Kyrgyzstan</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 {CONTACT.email}</p>
                <p>📱 {CONTACT.phone}</p>
                <p>📍 {CONTACT.location}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            {/* Fixed: this read "DAKANTOURS", the only place spelled that way. */}
            <p>&copy; 2025 DACANTOURS. All rights reserved. | Global expansion coming soon! 🚀</p>
          </div>
        </div>
      </footer>

      <TourDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        details={detailsData}
        onProceed={handleProceedAfterDetails}
      />
    </div>
  );
}
