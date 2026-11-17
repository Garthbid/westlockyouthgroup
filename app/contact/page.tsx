import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  HeartDoodle,
  SmileyDoodle,
  SparkDoodle,
  UnderlineDoodle,
} from "@/components/Doodles";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about The Way Youth Group or any of our events? Call or text Hailee Rogers at 780-283-0251, or email westlockyouthgroup@hotmail.com.",
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-[560px] px-6 pb-24 pt-14">
        <div className="relative text-center">
          <h1 className="font-hand text-[44px] font-bold sm:text-[52px]">
            Contact Us
          </h1>
          <SparkDoodle className="absolute -top-1 right-[16%] h-8 w-9 text-doodleorange sm:right-[20%]" />
          <UnderlineDoodle className="mx-auto mt-3 h-[7px] w-[170px] text-mint" />
        </div>

        <div className="relative mt-9 rounded-[28px] bg-card px-8 py-10 text-center shadow-[0_18px_40px_-18px_rgba(34,48,60,0.22)] ring-1 ring-navy/5 sm:px-12">
          <div className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full bg-mint">
            <Phone className="h-9 w-9 text-navy" strokeWidth={1.9} />
          </div>

          <p className="mt-6 font-hand text-[30px] font-bold">{CONTACT.name}</p>
          <p className="text-[12.5px] font-bold tracking-[0.18em] text-navy/55">YOUTH GROUP LEADER</p>
          <a
            href={CONTACT.phoneHref}
            className="mt-3 inline-block font-hand text-[34px] font-bold text-navy underline decoration-turquoise decoration-4 underline-offset-8 transition-colors duration-200 hover:text-navy/70 sm:text-[38px]"
          >
            {CONTACT.phone}
          </a>

          <div className="mx-auto mt-8 flex max-w-[400px] items-center gap-3 rounded-[18px] bg-ivory px-5 py-4 text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bluepale">
              <Mail className="h-5 w-5 text-navy" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11.5px] font-bold tracking-[0.16em] text-navy/55">EMAIL</span>
              <a
                href={CONTACT.emailHref}
                className="block truncate text-[16px] font-bold underline decoration-navy/30 underline-offset-[3px] hover:decoration-navy"
              >
                {CONTACT.email}
              </a>
            </span>
          </div>

          <p className="mx-auto mt-6 max-w-[400px] text-[15.5px] leading-[1.7] text-navy/90">
            Call, text or email any time with questions about the youth group, an
            event, RSVPs or permission forms. Signed permission forms can be emailed
            here too.
          </p>

          <p className="mt-6 flex items-center justify-center gap-2 font-script text-[22px] font-semibold text-navy/80">
            we&rsquo;d love to hear from you
            <HeartDoodle className="h-4.5 w-4.5" strokeWidth={3.2} />
          </p>

          <SmileyDoodle className="absolute -right-3 -top-4 h-10 w-10 rotate-[10deg] text-turquoise sm:-right-5" />
          <HeartDoodle className="absolute -bottom-3 -left-2 h-8 w-8 rotate-[-12deg] text-peach sm:-left-4" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
