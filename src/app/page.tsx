"use client";

import PricingReveal from "@/components/PricingReveal";
import ModalForm from "@/components/ModalForm";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-24">
      {/* Floating HERO full-width */}
      <section className="sticky top-0 z-30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="bg-white border border-foreground/10 shadow-sm rounded-2xl px-4 py-3 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">Orbit</h1>
            <p className="text-sm md:text-base text-foreground/80">Meet the right match, without all the small talk.</p>
          </div>
        </div>
      </section>

      {/* Alternating sections (image/text placeholders) */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
          <Image src="/images/couple.png" alt="Happy couple" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold">Find your soulmate.</h2>
          <p className="text-xl text-foreground/70">Orbit is an AI-powered dating network where your personal AI chats with others to find real compatibility before you meet. When the chemistry&apos;s real, Orbit sets up the date for you — no ghosting, no wasted time.</p>
        </div>
      </section>

        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background text-lg font-semibold flex items-center justify-center">1</span>
                <div>
                  <h3 className="text-xl font-semibold">Train Your AI</h3>
                  <p className="text-foreground/70 text-base">Teach your AI how you talk, what you value, and what kind of connection you&apos;re looking for.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background text-lg font-semibold flex items-center justify-center">2</span>
                <div>
                  <h3 className="text-xl font-semibold">AI-to-AI Conversations</h3>
                  <p className="text-foreground/70 text-base">Your AI chats with others to gauge real compatibility — not just looks or bios.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background text-lg font-semibold flex items-center justify-center">3</span>
                <div>
                  <h3 className="text-xl font-semibold">The Match Moment</h3>
                  <p className="text-foreground/70 text-base">When two AIs hit a high compatibility score, Orbit texts you both to set up a date.</p>
                </div>
              </div>
            </div>
            <p className="text-foreground/70 text-base italic">No pressure, no awkward intros — just authentic matches made effortless.</p>
          </div>
          <div className="order-1 md:order-2 relative aspect-[2/3] rounded-3xl overflow-hidden bg-white">
            <Image src="/images/match%20screenshot.png" alt="Match preview screenshot" fill className="object-contain" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </section>

        {/* Pricing (text placeholder + reveal) */}
        <section className="glass rounded-3xl p-8 md:p-10 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Pricing</h2>
            <p className="text-foreground/70">Transparent and fair. Learn what&apos;s included.</p>
            <PricingReveal />
          </div>
        </section>

        {/* Moon button at bottom */}
        <section className="flex flex-col items-center -mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">Choose your plan, find your match</h2>
          <div className="relative">
            {/* Pulsing aura */}
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-foreground/20 animate-ping" />
            <div 
              className="absolute inset-1 w-18 h-18 rounded-full bg-foreground/10" 
              style={{ 
                animation: 'slowPulse 6s ease-in-out infinite',
                animationDelay: '0s'
              }} 
            />
            <div 
              className="absolute inset-2 w-16 h-16 rounded-full bg-foreground/5" 
              style={{ 
                animation: 'slowPulse 6s ease-in-out infinite',
                animationDelay: '2s'
              }} 
            />
            
            {/* Moon button */}
            <button
              onClick={() => {
                const modal = document.getElementById('orbit-modal');
                if (modal) modal.style.display = 'flex';
              }}
              className="relative w-20 h-20 rounded-full bg-foreground text-background hover:opacity-90 transition-all duration-300 flex items-center justify-center text-3xl shadow-lg hover:scale-110"
              aria-label="Enter Orbit"
            >
              🌙
            </button>
          </div>
        </section>

        {/* Floating moon modal */}
        <ModalForm />
    </div>
  );
}