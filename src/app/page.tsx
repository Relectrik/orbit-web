import JoinCTA from "@/components/JoinCTA";

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="text-center space-y-5">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground">Orbit</h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">Meet the right match, without all the small talk.</p>
      </section>

      {/* Removed PLAYFUL LINES section per request */}

      {/* ABOUT removed per request */}

      {/* CTA SECTION */}
      <JoinCTA />
    </div>
  );
}