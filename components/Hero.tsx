import Image from "next/image";
import { SmileyDoodle, UnderlineDoodle, HeartDoodle } from "./Doodles";

export default function Hero() {
  return (
    <section className="relative h-[400px] w-full overflow-hidden sm:h-[465px]">
      <Image
        src="/images/hero.jpg"
        alt="Teenagers with arms around each other looking out over water at sunset"
        fill
        priority
        className="object-cover object-[50%_62%]"
      />
      {/* warm sunset grade + legibility overlay */}
      <div className="absolute inset-0 bg-[#d96f2e]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      <div className="absolute inset-0">
        <div className="relative mx-auto h-full max-w-[1210px] px-6 lg:px-8">
          {/* main heading */}
          <div className="absolute left-6 top-[44px] ml-1 text-white sm:top-[88px] lg:left-8 lg:ml-5">
            <h1 className="font-hand leading-none">
              <span className="block text-[52px] font-extrabold tracking-tight drop-shadow-md sm:text-[104px]">
                Westlock
              </span>
              <span className="mt-2 block text-[24px] font-bold tracking-[0.12em] drop-shadow-md sm:text-[46px]">
                YOUTH GROUP
              </span>
            </h1>
          </div>

          {/* tagline */}
          <div className="absolute bottom-[76px] left-6 ml-1 sm:bottom-[64px] text-white lg:left-8 lg:ml-16">
            <p className="text-[11px] font-bold leading-[1.75] tracking-[0.17em] drop-shadow sm:text-[14.5px]">
              REAL PEOPLE. REAL FRIENDSHIPS.
              <br />
              A BRIGHTER TOMORROW.
            </p>
            <UnderlineDoodle className="mt-2.5 h-[7px] w-[165px] sm:h-[8px] sm:w-[235px] text-mint" />
          </div>

          {/* smiley bottom-left edge */}
          <SmileyDoodle className="absolute bottom-[72px] left-4 hidden h-12 w-12 text-yellowpale lg:block lg:left-6" />

          {/* you belong here */}
          <div className="absolute right-6 top-[58px] hidden rotate-[7deg] sm:block text-right font-script text-[25px] font-semibold leading-[1.02] text-white [text-shadow:0_1px_10px_rgba(40,25,10,0.55)] sm:right-10 sm:text-[29px]">
            <span className="block">YOU</span>
            <span className="block">BELONG</span>
            <span className="flex items-center gap-1.5">
              HERE <HeartDoodle className="h-5 w-5" strokeWidth={3} />
            </span>
          </div>

          {/* grades blob */}
          <div
            className="absolute -right-3 bottom-[168px] flex h-[86px] w-[140px] rotate-[-7deg] items-center justify-center bg-mint text-navy sm:right-0 sm:bottom-[70px] sm:h-[130px] sm:w-[216px]"
            style={{
              borderRadius: "48% 52% 55% 45% / 55% 60% 40% 45%",
            }}
          >
            <p className="rotate-[1deg] text-center font-hand text-[21px] font-bold leading-[1.08] sm:text-[33px]">
              GRADES
              <br />7 – 12
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
