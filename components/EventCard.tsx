"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { getRsvps, type EventItem } from "@/lib/events";

export default function EventCard({ event }: { event: EventItem }) {
  const [isIn, setIsIn] = useState(false);

  const refresh = useCallback(() => {
    setIsIn(getRsvps().includes(event.id));
  }, [event.id]);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, [refresh]);

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
        <div className="mt-3.5 flex items-center gap-2.5">
          <Link
            href={`/events/${event.id}`}
            className="inline-block rounded-full bg-bluepale px-5 py-2.5 text-[13px] font-bold tracking-[0.06em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow"
          >
            DETAILS
          </Link>
          {isIn ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-5 py-2.5 text-[13px] font-bold tracking-[0.06em] text-navy">
              <Check className="h-3.5 w-3.5" strokeWidth={3} /> I&rsquo;M IN!
            </span>
          ) : (
            <Link
              href={`/rsvp?event=${event.id}`}
              className="inline-block rounded-full bg-pinkpale px-5 py-2.5 text-[13px] font-bold tracking-[0.06em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow"
            >
              RSVP
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
