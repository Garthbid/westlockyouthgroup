import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/events";
import RsvpCta from "./RsvpCta";
import {
  HeartDoodle,
  SmileyDoodle,
  SparkDoodle,
  UnderlineDoodle,
} from "./Doodles";

export default function EventDetails({ event }: { event: EventItem }) {
  return (
    <section className="mx-auto w-full max-w-[1080px] px-6 pb-20 pt-8 lg:px-8">
      <Link
        href="/#events"
        className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.14em] text-navy/70 transition-colors duration-200 hover:text-navy"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} /> ALL EVENTS
      </Link>

      {/* photo banner */}
      <div className="relative mt-5 h-[260px] overflow-hidden rounded-[24px] sm:h-[340px]">
        <Image
          src={event.image}
          alt={event.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1080px) 100vw, 1080px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div
          className={`absolute left-5 top-5 flex h-[76px] w-[76px] flex-col items-center justify-center rounded-[16px] ${event.badgeBg} text-navy`}
        >
          <span className="text-[12px] font-bold tracking-[0.06em]">
            {event.month}
          </span>
          <span className="-mt-0.5 text-[26px] font-bold">{event.day}</span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 sm:left-8">
          <h1 className="font-hand text-[40px] font-bold leading-none text-white drop-shadow-md sm:text-[56px]">
            {event.title}
          </h1>
        </div>

        <div className="absolute bottom-7 right-6 hidden rotate-[5deg] font-script text-[21px] font-semibold text-white [text-shadow:0_1px_8px_rgba(40,25,10,0.5)] sm:block">
          {event.tagline}
        </div>
      </div>

      {/* meta row */}
      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2.5 text-[15px] font-bold">
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-[18px] w-[18px] text-navy/70" strokeWidth={2} />
          {event.dateLabel}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock className="h-[18px] w-[18px] text-navy/70" strokeWidth={2} />
          {event.time}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-[18px] w-[18px] text-navy/70" strokeWidth={2} />
          {event.location}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_350px] lg:gap-14">
        {/* left column */}
        <div>
          {event.description.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mb-4 max-w-[600px] text-[16px] leading-[1.7] text-navy/90"
            >
              {paragraph}
            </p>
          ))}

          <div className="relative mt-9 inline-block">
            <h2 className="font-hand text-[28px] font-bold">The Plan</h2>
            <SparkDoodle className="absolute -right-8 top-0 h-6 w-7 text-turquoise" />
            <UnderlineDoodle className="mt-1 h-[6px] w-[110px] text-mint" />
          </div>
          <ul className="mt-5 flex flex-col gap-3.5">
            {event.plan.map((step) => (
              <li key={step.time} className="flex items-center gap-4">
                <span className="inline-flex w-[64px] shrink-0 justify-center rounded-full bg-bluepale py-1.5 text-[13px] font-bold">
                  {step.time}
                </span>
                <span className="text-[15.5px] text-navy/90">{step.item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-9 max-w-[600px] rounded-[18px] bg-yellowpale/50 px-5 py-4 text-[14px] leading-[1.65] text-navy/90">
            <span className="font-bold">Note for parents:&ensp;</span>
            {event.parentNote}
          </p>
        </div>

        {/* right column */}
        <aside className="relative h-fit rounded-[24px] bg-card px-7 py-8 shadow-[0_14px_32px_-16px_rgba(34,48,60,0.22)] ring-1 ring-navy/5">
          <h2 className="font-hand text-[26px] font-bold">Good to Know</h2>

          <p className="mt-4 text-[13px] font-bold tracking-[0.14em] text-navy/60">
            WHAT TO BRING
          </p>
          <ul className="mt-2.5 flex flex-col gap-2.5">
            {event.bring.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <HeartDoodle
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-peach"
                  strokeWidth={3.4}
                />
                <span className="text-[14.5px] leading-snug text-navy/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[13px] font-bold tracking-[0.14em] text-navy/60">
            COST
          </p>
          <p className="mt-1 text-[15px] font-bold">{event.cost}</p>

          <div className="mt-7">
            <RsvpCta eventId={event.id} />
          </div>
          <p className="mt-3.5 flex items-center justify-center gap-2 text-center font-script text-[19px] font-semibold text-navy/80">
            hope you can make it
            <HeartDoodle className="h-4 w-4" strokeWidth={3.2} />
          </p>

          <SmileyDoodle className="absolute -right-3 -top-4 h-9 w-9 rotate-[10deg] text-turquoise" />
        </aside>
      </div>
    </section>
  );
}
