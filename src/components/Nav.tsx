"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-2">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-lavender text-black shadow-sm"
                : "glass hover:opacity-90"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}


