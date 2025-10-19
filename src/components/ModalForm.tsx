"use client";

import * as React from "react";
import InterestForm from "@/components/InterestForm";

export default function ModalForm() {

  return (
    <>
      <div id="orbit-modal" className="fixed top-0 left-0 right-0 bottom-0 z-40 flex items-center justify-center p-4" style={{ display: 'none' }}>
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => {
            const modal = document.getElementById('orbit-modal');
            if (modal) modal.style.display = 'none';
          }}
        />
        <div className="relative bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300">
          <button
            onClick={() => {
              const modal = document.getElementById('orbit-modal');
              if (modal) modal.style.display = 'none';
            }}
            className="absolute top-4 right-4 text-foreground/60 hover:text-foreground text-xl"
            aria-label="Close"
          >
            ×
          </button>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Enter Orbit</h2>
            <p className="text-foreground/70 mt-2">Sign up today, choose your plan.</p>
          </div>
          <InterestForm />
        </div>
      </div>
    </>
  );
}
