import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NextEventCard from "@/components/NextEventCard";
import EventsSection from "@/components/EventsSection";
import PlaceHere from "@/components/PlaceHere";
import QuickLinks from "@/components/QuickLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <NextEventCard />
      <EventsSection />
      <PlaceHere />
      <QuickLinks />
      <Footer />
    </main>
  );
}
