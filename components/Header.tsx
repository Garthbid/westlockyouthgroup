"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { SunDoodle } from "./Doodles";

const NAV_ITEMS = [
  { label: "Home", href: "/", active: true },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-ivory">
      <div className="mx-auto flex h-[72px] max-w-[1210px] items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5">
          <SunDoodle className="h-8 w-8 shrink-0 text-[#f2b84b]" strokeWidth={2.8} />
          <span className="leading-none">
            <span className="block font-hand text-[26px] font-bold tracking-tight">
              The Way
            </span>
            <span className="mt-0.5 block pl-1 text-[10px] font-bold tracking-[0.28em] text-navy/80">
              YOUTH GROUP
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-colors duration-200 ${
                item.active
                  ? "bg-bluepale text-navy"
                  : "text-navy/80 hover:text-navy"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden items-center gap-1.5 rounded-full bg-peach px-5 py-2.5 text-[13.5px] font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:inline-flex"
        >
          Contact Us <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="p-2 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-navy/10 px-6 pb-5 pt-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block rounded-full px-4 py-2.5 text-[15px] font-medium ${
                item.active ? "bg-bluepale" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-peach px-5 py-2.5 text-[14px] font-semibold"
          >
            Contact Us <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </nav>
      )}
    </header>
  );
}
