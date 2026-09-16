import type { Metadata } from "next";
import { Phone } from "lucide-react";
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
    "Questions about The Way Youth Group or any of our events? Call Justin any time at 780-307-6510.",
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

          <p className="mt-6 font-hand text-[30px] font-bold">Justin</p>
          <a
            href="tel:+17803076510"
            className="mt-2 inline-block font-hand text-[34px] font-bold text-navy underline decoration-turquoise decoration-4 underline-offset-8 transition-colors duration-200 hover:text-navy/70 sm:text-[38px]"
          >
            780-307-6510
          </a>

          <p className="mx-auto mt-7 max-w-[380px] text-[16px] leading-[1.7] text-navy/90">
            Call any time with any questions about the youth group or any of
            the events.
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
