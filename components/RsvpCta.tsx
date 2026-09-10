"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getRsvps } from "@/lib/events";

export default function RsvpCta({ eventId }: { eventId: string }) {
  const [isIn, setIsIn] = useState(false);

  const refresh = useCallback(() => {
    setIsIn(getRsvps().includes(eventId));
  }, [eventId]);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, [refresh]);

  if (isIn) {
    return (
      <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint px-7 py-4 text-[14px] font-bold tracking-[0.08em] text-navy">
        <Check className="h-4 w-4" strokeWidth={3} /> YOU&rsquo;RE IN — SEE YOU
        THERE!
      </div>
    );
  }

  return (
    <Link
      href={`/rsvp?event=${eventId}`}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-peach px-7 py-4 text-[14px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      RSVP FOR THIS EVENT <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
    </Link>
  );
}
