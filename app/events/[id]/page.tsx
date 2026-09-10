import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import EventDetails from "@/components/EventDetails";
import Footer from "@/components/Footer";
import { EVENTS } from "@/lib/events";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return EVENTS.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);
  if (!event) return {};
  return {
    title: `${event.title} — Westlock Youth Group`,
    description: `${event.dateLabel} | ${event.time} — ${event.tagline}`,
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);
  if (!event) notFound();

  return (
    <main>
      <Header />
      <EventDetails event={event} />
      <Footer />
    </main>
  );
}
