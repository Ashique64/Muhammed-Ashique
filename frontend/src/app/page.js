import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/home/Hero";
import PhilosophySection from "@/components/home/PhilosophySection";
import ScrollMarquee from "@/components/home/ScrollMarquee";
import { CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Page Interactive Shells */}
      <CustomCursor />
      <Navbar />

      {/* Main Structural Layout */}
      <main className="w-full flex flex-col bg-bg">
        {/* Typographic Hero Banner */}
        <Hero />
        
        {/* Infinite Horizontal Running Marquee */}
        <ScrollMarquee />

        {/* Vertical Stack of Philosophy Panels */}
        <div className="flex flex-col w-full">
          {CONFIG.philosophy.map((panel) => (
            <PhilosophySection key={panel.id} sectionData={panel} />
          ))}
        </div>
      </main>
    </>
  );
}
