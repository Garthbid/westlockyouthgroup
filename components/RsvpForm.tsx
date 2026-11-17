"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, ArrowRight, Download, FileSignature } from "lucide-react";
import { addRsvp, EVENTS } from "@/lib/events";
import { saveRsvp } from "@/lib/supabase";
import { CONTACT } from "@/lib/site";
import {
  HeartDoodle,
  SmileyDoodle,
  SparkDoodle,
  UnderlineDoodle,
} from "./Doodles";

const FIELDS = [
  { id: "name", label: "Child's Name", placeholder: "First and last name", type: "text", autoComplete: "off" },
  { id: "parentName", label: "Parent's Name", placeholder: "Mom or dad's name", type: "text", autoComplete: "name" },
  { id: "parentEmail", label: "Parent's Email", placeholder: "you@example.com", type: "email", autoComplete: "email" },
];

export default function RsvpForm() {
  const searchParams = useSearchParams();
  const event = EVENTS.find((e) => e.id === searchParams.get("event"));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const entry = {
      id: crypto.randomUUID(),
      eventId: event?.id ?? "general",
      name: String(data.get("name") ?? "").trim(),
      phone: "",
      parentName: String(data.get("parentName") ?? "").trim(),
      parentPhone: "",
      parentEmail: String(data.get("parentEmail") ?? "").trim(),
      allergies: "",
    };
    addRsvp(entry);
    void saveRsvp(entry);
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
          <div className="flex flex-col items-center py-4 text-center">
            <SmileyDoodle className="h-16 w-16 text-turquoise" strokeWidth={2.2} />
            <p className="mt-5 font-hand text-[26px] font-bold leading-snug">
              See you {event ? `at ${event.title}` : "there"}!
            </p>
            <p className="mt-3 flex items-center gap-2 font-script text-[22px] font-semibold text-navy/80">
              so glad you&rsquo;re coming
              <HeartDoodle className="h-4.5 w-4.5" strokeWidth={3.2} />
            </p>

            <PermissionSlipNotice className="mt-7 text-left" />

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
                    required
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    className="w-full rounded-[14px] border border-navy/15 bg-ivory/60 px-4 py-3 text-[15px] text-navy placeholder:text-navy/40 outline-none transition-all duration-200 focus:border-turquoise focus:ring-2 focus:ring-turquoise/30"
                  />
                </div>
              ))}
            </div>

            <PermissionSlipNotice className="mt-7" />

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-peach px-8 py-4 text-[14px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              I&rsquo;M PLANNING TO ATTEND{" "}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-center font-script text-[20px] font-semibold text-navy/80">
              can&rsquo;t wait to see you
              <HeartDoodle className="h-4 w-4" strokeWidth={3.2} />
            </p>
            <p className="mt-3 text-center text-[12.5px] text-navy/55">
              Questions? Email{" "}
              <a href={CONTACT.emailHref} className="font-bold underline underline-offset-2">
                {CONTACT.email}
              </a>{" "}
              or call {CONTACT.name} at{" "}
              <a href={CONTACT.phoneHref} className="font-bold underline underline-offset-2">
                {CONTACT.phone}
              </a>
              .
            </p>
          </form>
        )}

        <SmileyDoodle className="absolute -right-3 -top-4 h-10 w-10 rotate-[10deg] text-turquoise sm:-right-5" />
        <HeartDoodle className="absolute -bottom-3 -left-2 h-8 w-8 rotate-[-12deg] text-peach sm:-left-4" />
      </div>
    </section>
  );
}

/** The "a permission form must be fully completed and handed in" callout, with both ways to do it. */
export function PermissionSlipNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[18px] border-2 border-peach/70 bg-yellowpale/40 px-5 py-4 ${className}`}>
      <p className="flex items-start gap-2.5 text-[14.5px] font-bold leading-snug">
        <AlertCircle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#d1495b]" strokeWidth={2.4} />
        A permission form must be fully completed and handed in before your child can attend.
      </p>
      <p className="mt-1.5 pl-7 text-[13.5px] leading-[1.6] text-navy/80">
        One form covers the whole year. Fill it out and sign it online, or download the PDF, print it, and give it to a leader.
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5 pl-7">
        <Link
          href="/permission-form"
          className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-[12.5px] font-bold tracking-[0.06em] text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <FileSignature className="h-3.5 w-3.5" strokeWidth={2.4} /> FILL IT OUT ONLINE
        </Link>
        <a
          href="/permission-form/pdf"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-[12.5px] font-bold tracking-[0.06em] text-navy ring-1 ring-navy/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2.4} /> DOWNLOAD THE PDF
        </a>
      </div>
    </div>
  );
}
