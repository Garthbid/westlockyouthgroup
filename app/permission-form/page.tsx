import type { Metadata } from "next";
import Header from "@/components/Header";
import PermissionSlipForm from "@/components/PermissionSlipForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Permission Form",
  description:
    "Sign The Way Youth Group's general permission slip and liability release online. One form covers every youth group event for the year.",
  robots: { index: false, follow: true },
};

export default function PermissionFormPage() {
  return (
    <main>
      <Header />
      <PermissionSlipForm />
      <Footer />
    </main>
  );
}
