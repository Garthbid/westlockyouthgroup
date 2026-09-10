import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { HeartDoodle, SparkDoodle } from "./Doodles";

export default function NextEventCard() {
  return (
    <div className="relative z-10 mx-auto -mt-[56px] w-full max-w-[1210px] px-6 lg:px-8">
      <div className="flex flex-col gap-6 rounded-[28px] bg-card px-7 py-8 shadow-[0_18px_40px_-18px_rgba(34,48,60,0.22)] sm:px-10 lg:flex-row lg:items-center lg:gap-0">
        {/* icon */}
        <div className="flex h-[98px] w-[98px] shrink-0 items-center justify-center rounded-full bg-pinkpale">
          <CalendarDays className="h-10 w-10 text-navy" strokeWidth={1.9} />
        </div>

        {/* event info */}
        <div className="lg:ml-8 lg:flex-1">
          <p className="text-[12.5px] font-bold tracking-[0.22em] text-navy/70">
            NEXT EVENT
          </p>
          <div className="relative mt-0.5 inline-block">
            <h2 className="font-hand text-[36px] font-bold leading-tight sm:text-[42px]">
              Bowling Night
            </h2>
            <SparkDoodle className="absolute -right-8 -top-1 h-7 w-8 text-doodleorange sm:-right-10" />
          </div>
          <p className="mt-2 text-[16px] font-bold">
            Friday, April 25&ensp;|&ensp;7:00 PM
          </p>
          <p className="mt-1 text-[15.5px] text-navy/80">
            Meet at Westlock Alliance Church
          </p>
        </div>

        {/* divider */}
        <div className="hidden h-[104px] w-px bg-navy/15 lg:block" />

        {/* script note */}
        <div className="font-script text-[23px] font-semibold leading-[1.1] lg:ml-10 lg:mr-6 lg:w-[130px]">
          <span className="inline-block rotate-[-4deg]">
            good
            <br />
            friends
            <br />
            great
            <br />
            <span className="flex items-center gap-1.5">
              times <HeartDoodle className="h-4.5 w-4.5" strokeWidth={3.2} />
            </span>
          </span>
        </div>

        {/* CTA */}
        <Link
          href="#rsvp"
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-peach px-10 py-[18px] text-[14px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md lg:self-center"
        >
          RSVP NOW <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </Link>
      </div>
    </div>
  );
}
