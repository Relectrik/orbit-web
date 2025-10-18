import InterestForm from "@/components/InterestForm";

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-lavender">About Orbit</h1>
        <p className="mt-4 text-white/80">
          Orbit is a simulation-based platform for dating, friendships, and networking. We build a digital twin of you from your interests, hobbies, and chat interactions—then run simulations to recommend meaningful connections. No swiping.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-2">Digital Twin</h3>
          <p className="text-white/75 text-sm">A structured representation of your preferences and personality, refined as you chat.</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-2">Simulation Engine</h3>
          <p className="text-white/75 text-sm">We simulate interactions to predict compatibility—not just attraction.</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-2">Premium by Design</h3>
          <p className="text-white/75 text-sm">We focus on quality and trust. Your time and attention are valuable.</p>
        </div>
      </section>

      <section className="max-w-2xl">
        <h2 className="text-2xl font-semibold text-lavender">Get Early Access</h2>
        <p className="mt-2 text-white/80">Join the waitlist and help shape the experience.</p>
        <div className="mt-4">
          <InterestForm />
        </div>
      </section>
    </div>
  );
}


