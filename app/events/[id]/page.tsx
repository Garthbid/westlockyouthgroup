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
  const description = `${event.title} — ${event.dateLabel} at ${event.time}, ${event.location}. ${event.tagline}. An event from The Way Youth Group for grades 7–12; everyone's welcome.`;
  return {
    title: event.title,
    description,
    openGraph: {
      title: `${event.title} — The Way Youth Group`,
      description,
      images: [{ url: event.image, alt: event.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} — The Way Youth Group`,
      description,
      images: [event.image],
    },
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
