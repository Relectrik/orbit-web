"use client";

import * as React from "react";

export default function PricingReveal() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-xl px-7 py-2 text-lg font-medium transition-colors bg-foreground text-background hover:opacity-90"
        >
          Learn More
        </button>
      )}
      <div
        className={`mt-4 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none h-0 overflow-hidden"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 text-lg font-semibold text-foreground/70">Features</th>
                <th className="p-6 text-lg font-semibold text-center">Twin+</th>
                <th className="p-6 text-lg font-semibold text-center">TwinX</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {[
                { label: "Price", plus: <span className="text-foreground font-semibold">$15</span>, twinX: <span className="text-foreground font-semibold">$25</span> },
                { label: "Regular Matches", plus: <Tick />, twinX: <Tick /> },
                { label: "Post-date Analytics", plus: <Tick />, twinX: <Tick /> },
                { label: "Matching Analysis", plus: <span className="text-foreground/60 text-sm">Preview</span>, twinX: <Tick /> },
                { label: "Faster Match Cycles", plus: <Cross />, twinX: <Tick /> },
                { label: "Planning Assistant", plus: <Cross />, twinX: <Tick /> },
                { label: "Filter Matching", plus: <Cross />, twinX: <Tick /> },
              ].map((row) => (
                <tr key={row.label} className="border-t border-foreground/10 align-top">
                  <td className="p-6 text-foreground/80 font-medium">{row.label}</td>
                  <td className="p-6 text-center">{row.plus}</td>
                  <td className="p-6 text-center">{row.twinX}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Tick() {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/15 text-green-700 text-lg" aria-label="Included">
      ✓
    </span>
  );
}

function Cross() {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10 text-red-600 text-lg" aria-label="Not included">
      ✕
    </span>
  );
}


