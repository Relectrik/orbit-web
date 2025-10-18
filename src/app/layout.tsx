import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbit – Simulation-based connections",
  description:
    "Orbit builds digital twins from your interests and chats to recommend dates, friends, and collaborators—no swiping.",
  metadataBase: new URL("https://orbit.example"),
  openGraph: {
    title: "Orbit – Simulation-based connections",
    description:
      "No swiping. AI simulations recommend meaningful matches for dating, friends, and networking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh">
          <header className="sticky top-0 z-10">
            <div className="glass mx-auto max-w-5xl mt-4 rounded-full px-4 py-3 flex items-center justify-between gap-3">
              <Link href="/" className="text-lavender font-semibold tracking-wide text-base">
                ORBIT
              </Link>
              <div className="flex-1" />
              <Nav />
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 py-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <footer className="mx-auto max-w-5xl px-6 py-10 opacity-80 text-sm">
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <span>© {new Date().getFullYear()} Orbit</span>
              <span className="text-lavender">Simulation &gt; Swipes</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
