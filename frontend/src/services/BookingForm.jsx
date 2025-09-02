import React, { useState, useEffect } from 'react';

export default function InterestForm({ tours }) {
  const [formData, setFormData] = useState({
    tour_id: tours.length > 0 ? tours[0].id : '',
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    date: '',
    agree: false,
  });

  // Countries fetched dynamically and sorted alphabetically
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCountries() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Bad countries response');
        const names = data
          .map((c) => c?.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        if (isMounted) setCountries(names);
      } catch (e) {
        if (isMounted) setCountries([]);
      } finally {
        if (isMounted) setCountriesLoading(false);
      }
    }
    loadCountries();
    return () => { isMounted = false; };
  }, []);

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    if (!formData.agree) {
      setMessage('Please agree to the privacy policy.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        tour_id: formData.tour_id,
        name: `${formData.first_name} ${formData.last_name}`.trim(),
        email: formData.email,
        date: formData.date || undefined,
        notes: formData.country ? `Country: ${formData.country}` : undefined,
      };
      const res = await fetch('http://localhost:8000/api/interests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Thank you! We've received your interest and sent you a confirmation email. We'll be in touch within 24-48 hours!");
        setFormData({
          tour_id: tours.length > 0 ? tours[0].id : '',
          first_name: '',
          last_name: '',
          email: '',
          country: '',
          date: '',
          agree: false,
        });
      } else {
        setMessage(data.error || 'Failed to register interest. Please try again.');
      }
    } catch (error) {
      console.error('Interest registration error:', error);
      setMessage('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-100">Subscribe for travel deals and inspiration</h3>
      </div>

      {/* Row 1: First / Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">First name<span className="text-red-500">*</span></label>
          <input
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Last name<span className="text-red-500">*</span></label>
          <input
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
          <label className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Email address<span className="text-red-500">*</span></label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Country of residence</label>
          <select
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
          <label className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Select tour<span className="text-red-500">*</span></label>
          <select
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
          {formData.tour_id && tours.find(t => t.id == formData.tour_id)?.title?.includes('Kyrgyzstan') && (
            <div className="mt-2 p-3 bg-purple-900/50 border border-purple-500 rounded-lg">
              <p className="text-sm text-purple-200">
                🚀 <strong>Kyrgyzstan Waitlist:</strong> Join our exclusive waitlist for early access to this upcoming adventure! We'll notify you as soon as bookings open.
              </p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-100 mb-1.5">Preferred travel date (optional)</label>
          <input
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
          I have read and agree to the <a href="#" className="underline">privacy policy</a><span className="text-red-500">*</span>
        </label>
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition-all duration-300 transform hover:scale-105"
        >
          {submitting ? 'Submitting...' : 'Subscribe to emails'}
        </button>
      </div>

      {message && (
        <div className={`mt-3 p-2 rounded-md text-center text-sm ${
          message.toLowerCase().includes('error') || message.toLowerCase().includes('fail')
            ? 'bg-red-900 text-red-200 border border-red-700'
            : 'bg-green-900 text-green-200 border border-green-700'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}