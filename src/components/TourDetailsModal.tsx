"use client";

import { useEffect, useRef } from "react";
import type { TourDetails } from "@/lib/tours";

const TourDetailsModal = ({
  open,
  onClose,
  details,
  onProceed,
}: {
  open: boolean;
  onClose: () => void;
  details: TourDetails | null;
  onProceed: () => void;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Added: Esc to close, and focus moves into the dialog when it opens.
  // Purely behavioural — nothing about the design changes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={details?.title || "Tour Details"}
        className="relative z-10 bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden mx-4 outline-none"
      >
        <div className="p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-900">{details?.title || "Tour Details"}</h3>
          {details?.gather && (
            <p className="text-gray-600 mt-1">Gathering point: <span className="font-medium">{details.gather}</span></p>
          )}
        </div>
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {details?.highlights && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">What you&apos;ll see</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {details.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          )}
          {details?.notes && details.notes.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Notes</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {details.notes.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="p-6 border-t flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100">Close</button>
          <button onClick={onProceed} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Continue to Interest Form</button>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsModal;
