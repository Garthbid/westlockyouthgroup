import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/lib/events";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="overflow-hidden rounded-[20px] bg-card shadow-[0_10px_26px_-14px_rgba(34,48,60,0.2)] ring-1 ring-navy/5 transition-transform duration-200 hover:-translate-y-1">
      <div className="relative m-2.5 h-[155px] overflow-hidden rounded-[14px] sm:h-[170px]">
        <Image
          src={event.image}
          alt={event.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div
          className={`absolute left-3.5 top-3.5 flex h-[64px] w-[64px] flex-col items-center justify-center rounded-[14px] ${event.badgeBg} text-navy`}
        >
          <span className="text-[11px] font-bold tracking-[0.06em]">
            {event.month}
          </span>
          <span className="-mt-0.5 text-[20px] font-bold">{event.day}</span>
        </div>
      </div>
      <div className="px-5 pb-5 pt-1.5">
        <h3 className="text-[21px] font-bold">{event.title}</h3>
        <p className="mt-1 text-[14.5px] text-navy/80">
          {event.time}&ensp;|&ensp;{event.location}
        </p>
        <Link
          href="#rsvp"
          className={`mt-3.5 inline-block rounded-full ${event.ctaBg} px-6 py-2.5 text-[13px] font-bold tracking-[0.06em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow`}
        >
          {event.cta}
        </Link>
      </div>
    </article>
  );
}
