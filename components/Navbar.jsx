"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = usePlan();


const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);

const planCount = mounted ? plan.length : 0;
const savedCount = mounted ? saved.length : 0;
  const links = [
    {
      href: "/",
      label: "Workout",
      active: pathname === "/" || pathname.startsWith("/workout"),
    },
    { href: "/my-plan", label: "My Plan", active: pathname === "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
  <img src="/assets/logo.png" alt="FitLog logo" className="h-9 w-9 object-contain" />
  <span className="hidden font-display text-xl font-bold tracking-wide sm:inline">
  FITLOG
</span>
</Link>

        {/* Links */}
        <ul className="flex items-center gap-3 sm:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`whitespace-nowrap font-display text-xs uppercase tracking-wider sm:text-base ${
                  link.active
                    ? "border-b-2 border-accent pb-1 text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black sm:text-sm"
          >
            Plan {planCount}
          </Link>
          <Link
            href="/my-plan"
            className="whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black sm:text-sm"
          >
            Saved {savedCount}
          </Link>
        </div>
      </nav>
    </header>
  );
}