import type { Metadata } from "next";
import Header from "@/components/Header";
import AdminRsvpList from "@/components/AdminRsvpList";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Admin",
  description: "RSVP lists for upcoming events.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main>
      <Header />
      <AdminRsvpList />
      <Footer />
    </main>
  );
}
