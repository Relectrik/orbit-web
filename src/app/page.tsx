import InterestForm from "@/components/InterestForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-lavender">
          Meet people through simulations, not swipes
        </h1>
        <p className="mt-4 text-white/80">
          Orbit builds a digital twin from your interests, hobbies, and chat interactions to recommend dates, friends, and collaborators.
        </p>
      </section>
      <InterestForm />
      <p className="text-sm text-white/60">
        Want to preview the experience? Try the <Link href="/chat" className="underline underline-offset-4 hover:text-lavender-light">chat</Link>.
      </p>
    </div>
  );
}
