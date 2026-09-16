import { HandHeart, ShieldCheck } from "lucide-react";
import { HeartDoodle, SparkDoodle, UnderlineDoodle } from "./Doodles";

export default function MissionSection() {
  return (
    <section id="mission" className="mx-auto max-w-[1210px] px-6 pt-20 lg:px-8">
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
        {/* mission */}
        <div className="relative rounded-[28px] bg-card px-8 py-9 shadow-[0_18px_40px_-18px_rgba(34,48,60,0.22)] ring-1 ring-navy/5 sm:px-10">
          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-mint">
            <HandHeart className="h-7 w-7 text-navy" strokeWidth={1.9} />
          </div>
          <div className="relative mt-5 inline-block">
            <h2 className="font-hand text-[32px] font-bold sm:text-[36px]">
              Our Mission
            </h2>
            <SparkDoodle className="absolute -right-9 top-0 h-7 w-8 text-turquoise" />
            <UnderlineDoodle className="mt-1 h-[6px] w-[140px] text-mint" />
          </div>
          <p className="mt-5 text-[15.5px] leading-[1.7] text-navy/90">
            To create a safe, welcoming place where young people feel at home,
            have fun, and build meaningful friendships. Together, we learn
            about Jesus, encourage curiosity and honest questions, and grow in
            knowledge and faith&mdash;helping young people become leaders who
            love and serve others.
          </p>
          <HeartDoodle className="absolute -right-3 -top-4 h-8 w-8 rotate-[10deg] text-peach" strokeWidth={2.8} />
        </div>

        {/* community commitments */}
        <div className="relative rounded-[28px] bg-card px-8 py-9 shadow-[0_18px_40px_-18px_rgba(34,48,60,0.22)] ring-1 ring-navy/5 sm:px-10">
          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-bluepale">
            <ShieldCheck className="h-7 w-7 text-navy" strokeWidth={1.9} />
          </div>
          <div className="relative mt-5 inline-block">
            <h2 className="font-hand text-[32px] font-bold sm:text-[36px]">
              Our Community Commitments
            </h2>
            <UnderlineDoodle className="mt-1 h-[6px] w-[140px] text-turquoise" />
          </div>
          <p className="mt-5 text-[15.5px] leading-[1.7] text-navy/90">
            Our youth group is a drug- and alcohol-free space where we treat
            one another with respect, speak with kindness, and help everyone
            feel welcome.
          </p>
          <p className="mt-5 flex items-center gap-2 font-script text-[21px] font-semibold text-navy/80">
            kind people are our kind of people
            <HeartDoodle className="h-4 w-4" strokeWidth={3.2} />
          </p>
        </div>
      </div>
    </section>
  );
}
