import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import RsvpForm from "@/components/RsvpForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RSVP",
  description:
    "Coming to a Westlock Youth Group event? Fill out a quick RSVP and we'll save you a spot — it only takes a minute.",
};

export default function RsvpPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={null}>
        <RsvpForm />
      </Suspense>
      <Footer />
    </main>
  );
}
