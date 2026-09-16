import Link from "next/link";
import { CalendarDays, Mail, Users, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QuickLink = {
  id: string;
  href: string;
  bg: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

const QUICK_LINKS: QuickLink[] = [
  {
    id: "new-here",
    href: "#new-here",
    bg: "bg-mint",
    icon: Users,
    title: "New Here?",
    subtitle: "What to expect",
  },
  {
    id: "events",
    href: "#events",
    bg: "bg-pinkpale",
    icon: CalendarDays,
    title: "Upcoming Events",
    subtitle: "See what's on",
  },
  {
    id: "parents",
    href: "#parents",
    bg: "bg-bluepale",
    icon: UsersRound,
    title: "Parents",
    subtitle: "Resources & Info",
  },
  {
    id: "contact",
    href: "/contact",
    bg: "bg-yellowpale",
    icon: Mail,
    title: "Contact Us",
    subtitle: "We'd love to hear from you",
  },
];

export default function QuickLinks() {
  return (
    <section className="mx-auto grid max-w-[1210px] grid-cols-1 gap-6 px-6 pt-20 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
      {QUICK_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.id}
            href={link.href}
            className={`flex flex-col items-center rounded-[22px] ${link.bg} px-5 py-8 text-center shadow-[0_8px_20px_-12px_rgba(34,48,60,0.18)] transition-transform duration-200 hover:-translate-y-1`}
          >
            <Icon className="h-9 w-9 text-navy" strokeWidth={1.8} />
            <span className="mt-3 text-[18px] font-bold">{link.title}</span>
            <span className="mt-0.5 text-[13px] text-navy/75">
              {link.subtitle}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
