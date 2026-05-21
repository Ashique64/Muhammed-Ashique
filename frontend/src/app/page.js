import Hero from "@/components/home/Hero";
import PhilosophySection from "@/components/home/PhilosophySection";
import { CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-bg">
      <Hero />
      <div className="flex flex-col w-full">
        {CONFIG.philosophy.map((panel) => (
          <PhilosophySection key={panel.id} sectionData={panel} />
        ))}
      </div>
    </main>
  );
}
