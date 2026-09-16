import type { Metadata } from "next";
import { Shantell_Sans, Caveat, DM_Sans } from "next/font/google";
import "./globals.css";

const shantell = Shantell_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-shantell",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const SITE_URL = "https://westlockyouthgroup.vercel.app";
const SITE_DESCRIPTION =
  "A youth group in Westlock, Alberta for teens in grades 7–12. Real friendships, a ton of fun, and space to explore what it means to follow Jesus together. Everyone's welcome — no matter where you're at.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Way Youth Group — Real People. Real Friendships.",
    template: "%s — The Way Youth Group",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "The Way youth group",
    "Westlock youth group",
    "Westlock Alberta teens",
    "church youth group Westlock",
    "youth events Westlock",
    "grades 7-12 youth ministry",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "The Way Youth Group",
    title: "The Way Youth Group — Real People. Real Friendships.",
    description: SITE_DESCRIPTION,
    locale: "en_CA",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "The Way Youth Group — teens arm in arm at sunset. Grades 7–12, you belong here.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Way Youth Group — Real People. Real Friendships.",
    description:
      "A youth group in Westlock, Alberta for grades 7–12. Real friendships, real fun — everyone's welcome.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${shantell.variable} ${caveat.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
