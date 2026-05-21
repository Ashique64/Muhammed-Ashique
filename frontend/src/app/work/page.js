import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import WorkCard from "@/components/work/WorkCard";
import { CONFIG } from "@/lib/constants";

export const metadata = {
  title: `Work Experience | ${CONFIG.profile.name}`,
  description: `Professional software engineering, blockchain, and AI project milestones for ${CONFIG.profile.name}.`,
};

export default function WorkPage() {
  return (
    <>
      {/* Interactive Core Overlays */}
      <CustomCursor />
      <Navbar />

      {/* Main Page Content Wrapper */}
      <main className="w-full min-h-screen bg-bg px-6 py-32 md:px-12 md:py-40 flex flex-col items-center">
        <div className="max-w-4xl w-full flex flex-col">
          
          {/* Header Block */}
          <div className="mb-16 md:mb-24 flex flex-col items-start border-b border-white/5 pb-12 select-none">
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
              Milestones & Projects
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl italic text-highlight leading-none tracking-tight mt-4">
              Work Experience
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted max-w-xl leading-relaxed mt-6">
              A chronological history of engineering high-performance decentralized systems, scaling artificial intelligence infrastructure, and creating immersive user experiences.
            </p>
          </div>

          {/* Staggered Cards Loop */}
          <div className="flex flex-col gap-8 md:gap-12 w-full">
            {CONFIG.work.map((job, index) => (
              <WorkCard key={job.id} workData={job} index={index} />
            ))}
          </div>
          
        </div>
      </main>
    </>
  );
}
