import WorkCard from "@/components/work/WorkCard";
import { CONFIG } from "@/lib/constants";
import PageProgress from "@/components/ui/PageProgress";
import { StarfieldCanvas } from "@/components/sections/SkillsSection";

export const metadata = {
  title: `Work Experience | ${CONFIG.profile.name}`,
  description: `Professional software engineering, blockchain, and AI project milestones for ${CONFIG.profile.name}.`,
};

export default function WorkPage() {
  return (
    <>
      {/* Global scroll progress bar */}
      <PageProgress />

      {/* Main Page Content Wrapper */}
      <main
        id="top"
        className="w-full min-h-screen bg-bg px-6 py-32 md:px-12 md:py-40 flex flex-col items-center relative overflow-hidden"
      >
        {/* Background accent */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(99,102,241,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Background CSS Grid Lines */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          }}
        />

        {/* Cosmic Parallax Starfield Background */}
        <StarfieldCanvas />

        <div className="max-w-4xl w-full flex flex-col relative z-10">
          {/* Header Block */}
          <div className="mb-16 md:mb-24 flex flex-col items-start border-b border-white/5 pb-12 select-none">
            <span className="font-mono text-[9px] tracking-[0.35em] text-muted uppercase">
              Milestones &amp; Projects
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-highlight leading-none tracking-tight mt-4">
              Work Experience<span className="text-accent/40">.</span>
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

        {/* Footer */}
        <footer className="w-full max-w-4xl border-t border-white/5 py-8 mt-20 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted">
            © 2026 {CONFIG.profile.name} — Built with Next.js &amp; Three.js
          </span>
          <a
            href="#top"
            className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted hover:text-highlight transition-colors duration-300 flex items-center gap-2 group"
          >
            Back to top
            <span className="group-hover:-translate-y-1 transition-transform duration-200">
              ↑
            </span>
          </a>
        </footer>
      </main>
    </>
  );
}
