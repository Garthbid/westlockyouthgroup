import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import RsvpForm from "@/components/RsvpForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RSVP — Westlock Youth Group",
  description: "Let us know you're coming — we'll save you a spot!",
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
