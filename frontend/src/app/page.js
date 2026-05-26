/**
 * Home page — Server Component.
 * Fetches GitHub repos at build/revalidation time (ISR every 1 hour).
 * Passes data down to client-side sections as props.
 */

import Hero from "@/components/home/Hero";
import PhilosophySection from "@/components/home/PhilosophySection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import PageProgress from "@/components/ui/PageProgress";
import { fetchGithubRepos } from "@/lib/github";

export const metadata = {
  title: "Muhammed Ashique | Full Stack Developer",
  description:
    "Full Stack Developer crafting cinematic digital experiences with React, Next.js, Three.js, and AI. Based in Kerala, India.",
  openGraph: {
    title: "Muhammed Ashique | Full Stack Developer",
    description: "Scroll-driven cinematic portfolio — React, Next.js, Three.js, AI & Blockchain.",
    type: "website",
  },
};

export default async function Home() {
  // Server-side GitHub fetch — cached by Next.js ISR (revalidate: 3600)
  const repos = await fetchGithubRepos();

  return (
    <main id="top" className="w-full flex flex-col bg-bg">
      {/* ── Global scroll progress bar ── */}
      <PageProgress />

      {/* ── 1. Hero: NeuralCore 3D + scroll zoom ── */}
      <Hero />

      {/* ── 3. About: stats + bio + tech badges ── */}
      <AboutSection />

      {/* ── 4. Philosophy: sticky scroll storytelling + morphing geometry ── */}
      <PhilosophySection />

      {/* ── 5. Projects: GitHub glassmorphism cards ── */}
      <ProjectsSection repos={repos} />

      {/* ── 6. Skills: Tech Galaxy 3D ── */}
      <SkillsSection />

      {/* ── 7. Contact: Interactive Globe + form ── */}
      <ContactSection />

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted">
          © 2026 Muhammed Ashique — Built with Next.js &amp; Three.js
        </span>
        <a
          href="#top"
          className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted hover:text-highlight transition-colors duration-300 flex items-center gap-2 group"
        >
          Back to top
          <span className="group-hover:-translate-y-1 transition-transform duration-200">↑</span>
        </a>
      </footer>
    </main>
  );
}
