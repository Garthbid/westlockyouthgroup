import { ArrowRight } from "lucide-react";
import { HeartDoodle, SmileyDoodle, SparkDoodle, UnderlineDoodle } from "./Doodles";

const FIELDS = [
  { id: "name", label: "Your Name", placeholder: "First and last name", type: "text" },
  { id: "phone", label: "Your Phone Number", placeholder: "(780) 555-1234", type: "tel" },
  { id: "parentName", label: "Parent's Name", placeholder: "Mom or dad's name", type: "text" },
  { id: "parentPhone", label: "Parent's Phone Number", placeholder: "(780) 555-5678", type: "tel" },
];

export default function RsvpForm() {
  return (
    <section className="mx-auto w-full max-w-[560px] px-6 pb-20 pt-12">
      <div className="relative text-center">
        <h1 className="font-hand text-[44px] font-bold sm:text-[52px]">
          RSVP
        </h1>
        <SparkDoodle className="absolute -top-1 right-[28%] h-8 w-9 text-doodleorange sm:right-[32%]" />
        <p className="mx-auto mt-1 max-w-[380px] text-[15px] leading-[1.6] text-navy/80">
          Fill this out and we&rsquo;ll save you a spot. It only takes a
          minute!
        </p>
        <UnderlineDoodle className="mx-auto mt-3 h-[7px] w-[150px] text-mint" />
      </div>

      <form className="relative mt-8 rounded-[28px] bg-card px-7 py-9 shadow-[0_18px_40px_-18px_rgba(34,48,60,0.22)] ring-1 ring-navy/5 sm:px-10">
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
          type="button"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-peach px-8 py-4 text-[14px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          I&rsquo;M PLANNING TO ATTEND <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </button>

        <p className="mt-4 flex items-center justify-center gap-2 text-center font-script text-[20px] font-semibold text-navy/80">
          can&rsquo;t wait to see you
          <HeartDoodle className="h-4 w-4" strokeWidth={3.2} />
        </p>

        <SmileyDoodle className="absolute -right-3 -top-4 h-10 w-10 rotate-[10deg] text-turquoise sm:-right-5" />
        <HeartDoodle className="absolute -bottom-3 -left-2 h-8 w-8 rotate-[-12deg] text-peach sm:-left-4" />
      </form>
    </section>
  );
}
