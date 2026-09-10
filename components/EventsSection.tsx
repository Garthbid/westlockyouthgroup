import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EVENTS } from "@/lib/events";
import EventCard from "./EventCard";
import { SparkDoodle } from "./Doodles";

export default function EventsSection() {
  return (
    <section id="events" className="mx-auto max-w-[1210px] px-6 pt-16 lg:px-8">
      <div className="flex items-end justify-between">
        <div className="relative inline-block">
          <h2 className="font-hand text-[35px] font-bold tracking-wide sm:text-[40px]">
            UPCOMING EVENTS
          </h2>
          <SparkDoodle className="absolute -right-9 top-0 h-7 w-8 text-turquoise" />
        </div>
        <Link
          href="#events"
          className="hidden items-center gap-1.5 pb-2 text-[12px] font-bold tracking-[0.14em] text-navy/80 transition-colors duration-200 hover:text-navy sm:inline-flex"
        >
          VIEW ALL EVENTS <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-3">
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
