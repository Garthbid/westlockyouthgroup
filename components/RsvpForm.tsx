"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { addRsvp, EVENTS } from "@/lib/events";
import {
  HeartDoodle,
  SmileyDoodle,
  SparkDoodle,
  UnderlineDoodle,
} from "./Doodles";

const FIELDS = [
  { id: "name", label: "Your Name", placeholder: "First and last name", type: "text" },
  { id: "phone", label: "Your Phone Number", placeholder: "(780) 555-1234", type: "tel" },
  { id: "parentName", label: "Parent's Name", placeholder: "Mom or dad's name", type: "text" },
  { id: "parentPhone", label: "Parent's Phone Number", placeholder: "(780) 555-5678", type: "tel" },
];

export default function RsvpForm() {
  const searchParams = useSearchParams();
  const event = EVENTS.find((e) => e.id === searchParams.get("event"));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (form: HTMLFormElement) => {
    const data = new FormData(form);
    addRsvp({
      eventId: event?.id ?? "general",
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      parentName: String(data.get("parentName") ?? "").trim(),
      parentPhone: String(data.get("parentPhone") ?? "").trim(),
    });
    setSubmitted(true);
  };

  return (
    <section className="mx-auto w-full max-w-[560px] px-6 pb-20 pt-12">
      <div className="relative text-center">
        <h1 className="font-hand text-[44px] font-bold sm:text-[52px]">
          {submitted ? "You're in!" : "RSVP"}
        </h1>
        <SparkDoodle className="absolute -top-1 right-[22%] h-8 w-9 text-doodleorange sm:right-[26%]" />
        {!submitted && (
          <>
            {event ? (
              <p className="mx-auto mt-1 text-[15px] leading-[1.6] text-navy/80">
                <span className="font-bold text-navy">{event.title}</span>
                <br />
                {event.dateLabel}&ensp;|&ensp;{event.time}&ensp;&middot;&ensp;
                {event.location}
              </p>
            ) : (
              <p className="mx-auto mt-1 max-w-[380px] text-[15px] leading-[1.6] text-navy/80">
                Fill this out and we&rsquo;ll save you a spot. It only takes a
                minute!
              </p>
            )}
          </>
        )}
        <UnderlineDoodle className="mx-auto mt-3 h-[7px] w-[150px] text-mint" />
      </div>

      <div className="relative mt-8 rounded-[28px] bg-card px-7 py-9 shadow-[0_18px_40px_-18px_rgba(34,48,60,0.22)] ring-1 ring-navy/5 sm:px-10">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <SmileyDoodle className="h-16 w-16 text-turquoise" strokeWidth={2.2} />
            <p className="mt-5 font-hand text-[26px] font-bold leading-snug">
              See you {event ? `at ${event.title}` : "there"}!
            </p>
            <p className="mt-3 flex items-center gap-2 font-script text-[22px] font-semibold text-navy/80">
              so glad you&rsquo;re coming
              <HeartDoodle className="h-4.5 w-4.5" strokeWidth={3.2} />
            </p>
            <Link
              href="/#events"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-yellowpale px-7 py-3 text-[13px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.4} /> BACK TO EVENTS
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e.currentTarget);
            }}
          >
            <div className="flex flex-col gap-5">
              {FIELDS.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-1.5 block text-[13px] font-bold tracking-[0.02em]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full rounded-[14px] border border-navy/15 bg-ivory/60 px-4 py-3 text-[15px] text-navy placeholder:text-navy/40 outline-none transition-all duration-200 focus:border-turquoise focus:ring-2 focus:ring-turquoise/30"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-peach px-8 py-4 text-[14px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              I&rsquo;M PLANNING TO ATTEND{" "}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-center font-script text-[20px] font-semibold text-navy/80">
              can&rsquo;t wait to see you
              <HeartDoodle className="h-4 w-4" strokeWidth={3.2} />
            </p>
          </form>
        )}

        <SmileyDoodle className="absolute -right-3 -top-4 h-10 w-10 rotate-[10deg] text-turquoise sm:-right-5" />
        <HeartDoodle className="absolute -bottom-3 -left-2 h-8 w-8 rotate-[-12deg] text-peach sm:-left-4" />
      </div>
    </section>
  );
}
