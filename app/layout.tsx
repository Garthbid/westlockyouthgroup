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

export const metadata: Metadata = {
  title: "Westlock Youth Group",
  description:
    "Real people. Real friendships. A brighter tomorrow. Westlock Youth Group — grades 7–12.",
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
