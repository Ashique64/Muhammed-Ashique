import WorkPageClient from "@/components/work/WorkPageClient";
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

        {/* Cosmic Parallax Starfield Background */}
        <StarfieldCanvas />

        {/* Mounted Client-side Timeline & Filters */}
        <WorkPageClient work={CONFIG.work} profile={CONFIG.profile} />

        {/* Footer */}
        <footer className="w-full max-w-6xl border-t border-white/5 py-8 mt-20 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
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
