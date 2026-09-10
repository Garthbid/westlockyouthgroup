import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeartDoodle, SmileyDoodle, SparkDoodle } from "./Doodles";

export default function PlaceHere() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1210px] grid-cols-1 items-center gap-10 px-6 pt-20 lg:grid-cols-[46%_1fr] lg:gap-12 lg:px-8"
    >
      {/* blue blob with copy */}
      <div className="relative py-14 pl-4 pr-6 sm:pl-8">
        {/* painted blob layers */}
        <div
          className="absolute inset-0 bg-bluepale/80"
          style={{ borderRadius: "52% 48% 55% 45% / 62% 55% 45% 48%" }}
        />
        <div
          className="absolute -inset-x-1 inset-y-4 rotate-[-5deg] bg-bluepale/70"
          style={{ borderRadius: "48% 52% 42% 58% / 52% 45% 55% 48%" }}
        />

        <div className="relative px-4 py-2 sm:px-6">
          <div className="relative inline-block">
            <h2 className="font-hand text-[40px] font-bold leading-[1.14] sm:text-[52px]">
              You&rsquo;ve got
              <br />a place here.
            </h2>
            <SparkDoodle className="absolute -right-6 top-1 h-9 w-10 rotate-[10deg] text-navy sm:-right-12" />
          </div>
          <p className="mt-6 max-w-[400px] text-[16px] leading-[1.65] text-navy/90">
            Westlock Youth is a place to be yourself, make real friendships,
            have a ton of fun and explore what it means to follow Jesus
            together. Everyone is welcome &ndash; no matter where you&rsquo;re
            at.
          </p>
          <Link
            href="#new-here"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellowpale px-8 py-3.5 text-[13px] font-bold tracking-[0.1em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            LEARN MORE <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>

        <HeartDoodle className="absolute bottom-4 right-6 h-9 w-9 rotate-[10deg] text-navy" strokeWidth={2.8} />
      </div>

      {/* photo */}
      <div className="relative h-[300px] overflow-hidden rounded-[24px] sm:h-[380px]">
        <Image
          src="/images/place.jpg"
          alt="Young people viewed from behind raising their hands at sunset"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 54vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/25" />

        <div className="absolute right-6 top-6 rotate-[4deg] text-right font-script text-[21px] font-semibold leading-[1.15] text-white [text-shadow:0_1px_8px_rgba(40,25,10,0.5)]">
          <span className="block">FAITH</span>
          <span className="block">FRIENDS</span>
          <span className="block">FUN</span>
          <span className="flex items-center justify-end gap-1.5">
            REAL LIFE <HeartDoodle className="h-4 w-4" strokeWidth={3.4} />
          </span>
        </div>

        <SmileyDoodle className="absolute right-8 top-1/2 h-9 w-9 text-white/90" />
        <HeartDoodle className="absolute bottom-6 right-8 h-10 w-10 rotate-[-8deg] text-yellowpale" strokeWidth={2.8} />
      </div>
    </section>
  );
}
