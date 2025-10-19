"use client";

import * as React from "react";
import InterestForm from "@/components/InterestForm";

export default function JoinCTA() {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <section id="join" className="rounded-3xl p-8 md:p-10 text-center grid grid-rows-[auto_1fr_auto] gap-8">
      <div>
        <h2 className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">Enter Orbit.</h2>
        <h2 className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">The next era of dating.</h2>

      </div>
      <div className="flex items-center justify-center">
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-xl px-7 py-2 text-lg font-medium transition-colors bg-foreground text-background hover:opacity-90"
          >
            Join Now
          </button>
        )}
      </div>
      <div
        className={`max-w-md mx-auto pt-2 transition-all duration-300 ${
          showForm ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none h-0 overflow-hidden"
        }`}
      >
        <InterestForm />
      </div>
    </section>
  );
}


