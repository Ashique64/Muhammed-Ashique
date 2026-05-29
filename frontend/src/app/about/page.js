import AboutPageClient from "@/components/AboutPageClient";
import { CONFIG } from "@/lib/constants";
import PageProgress from "@/components/ui/PageProgress";

export const metadata = {
  title: `About | ${CONFIG.profile.name}`,
  description: `Discover the professional engineering philosophy and background of ${CONFIG.profile.name}.`,
};

export default function AboutPage() {
  const bio = CONFIG.about.bio;
  const socials = CONFIG.about.socials;

  return (
    <>
      {/* Global scroll progress bar */}
      <PageProgress />

      {/* Main Page Wrapper */}
      <main
        id="top"
        className="w-full min-h-screen bg-bg px-6 py-32 md:px-12 md:py-40 flex flex-col items-center relative overflow-hidden"
      >
        {/* Background Accent Gradient */}
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

        {/* Mounted Client-side Content Dashboard */}
        <AboutPageClient bio={bio} socials={socials} photo={CONFIG.about.photo} />

        {/* Cinematic Standard Horizontal Footer */}
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
