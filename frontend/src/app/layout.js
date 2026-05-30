import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Frame from "@/components/ui/Frame";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-instrument-serif", // Keep variable name same so globals.css doesn't break
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Muhammed Ashique | Full Stack Developer",
  description: "Full Stack Developer & React Specialist — Creative Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-accent selection:bg-accent selection:text-bg overflow-x-hidden">
        <SmoothScroll>
          {/* ── Custom Sci-Fi Outline Frame ── */}
          <Frame />

          {/* ── Fixed Navbar & Cursor (persists across all routes) ── */}
          <CustomCursor />
          <Navbar />

          {/* ── Scrollable page content ── */}
          {children}

          {/* ── Vercel Analytics ── */}
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  );
}
