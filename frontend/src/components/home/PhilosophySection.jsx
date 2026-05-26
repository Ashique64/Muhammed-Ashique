"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { CONFIG } from "@/lib/constants";

const MorphingGeometry = dynamic(() => import("@/components/3d/MorphingGeometry"), { ssr: false });

const PANELS = CONFIG.philosophy;
const PANEL_COUNT = PANELS.length;

/* Step labels for the morphing shape (mobile fallback) */
const SHAPE_LABELS = ["Crystal", "Prism", "Ring", "Sphere", "Core", "Pulse", "Transcend"];

export default function PhilosophySection() {
  const containerRef = useRef(null);
  const [mounted, setMounted]           = useState(false);
  const [isMobile, setIsMobile]         = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [progress3D, setProgress3D]     = useState(0);
  const [scrollWidthPct, setScrollWidthPct] = useState(0);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Pass target ONLY after mount so Framer Motion never sees a null ref during SSR.
  // When mounted=false, useScroll() tracks window scroll harmlessly.
  const { scrollYProgress } = useScroll(
    mounted
      ? { target: containerRef, offset: ["start start", "end end"] }
      : {}
  );

  const activePanel = useTransform(scrollYProgress, (v) =>
    Math.min(Math.floor(v * PANEL_COUNT), PANEL_COUNT - 1)
  );
  const morphProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Sync motion values → React state (for AnimatePresence + 3D canvas)
  useEffect(() => {
    const unsubPanel    = activePanel.on("change",    (v) => setActivePanelIndex(Math.round(v)));
    const unsubProgress = morphProgress.on("change",  (v) => setProgress3D(v));
    const unsubScroll   = scrollYProgress.on("change",(v) => setScrollWidthPct(v * 100));
    return () => { unsubPanel(); unsubProgress(); unsubScroll(); };
  }, [activePanel, morphProgress, scrollYProgress]);

  const currentPanel = PANELS[activePanelIndex] ?? PANELS[PANELS.length - 1];

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative bg-bg border-t border-white/5"
      style={{ height: `${PANEL_COUNT * 100}vh` }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        {/* Ambient glow that shifts hue with active panel */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse 50% 60% at 75% 50%, 
              hsl(${260 + activePanelIndex * 15}, 60%, 12%) 0%, transparent 70%)`,
          }}
        />

        {/* Section label */}
        <div className="absolute top-10 left-6 md:left-12">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted">
            02 — Philosophy
          </span>
        </div>

        {/* Scroll progress bar — plain div driven by state, no MotionValue on style */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-violet-500/60"
          style={{ width: `${scrollWidthPct}%` }}
        />

        {/* ── Layout: Left text / Right 3D ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text panel ── */}
          <div className="flex flex-col justify-center">

            {/* Progress dot indicators */}
            <div className="flex gap-2 mb-8">
              {PANELS.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    background: i <= activePanelIndex ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.12)",
                    transform: i === activePanelIndex ? "scale(1.6)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPanel.id}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                {/* Counter */}
                <span className="font-mono text-[10px] tracking-[0.3em] text-violet-400/70 uppercase">
                  {String(activePanelIndex + 1).padStart(2, "0")} / {String(PANEL_COUNT).padStart(2, "0")}
                </span>

                {/* Heading with highlights */}
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight text-accent">
                  {currentPanel.heading.split(" ").map((word, idx) => {
                    const clean = word.replace(/[.,#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();
                    const isHighlight = (currentPanel.highlight ?? []).some(
                      (hl) => hl.replace(/[.,#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase() === clean
                    );
                    return (
                      <span key={idx} className={isHighlight ? "text-violet-300 font-medium" : "opacity-85"}>
                        {word}{" "}
                      </span>
                    );
                  })}
                </h2>

                {/* Description */}
                {currentPanel.description && (
                  <p className="font-sans text-sm leading-relaxed text-muted max-w-md">
                    {currentPanel.description}
                  </p>
                )}

                {/* CTA */}
                {currentPanel.ctaLink && (
                  <a
                    href={currentPanel.ctaLink}
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-violet-300 hover:text-white border border-violet-500/30 hover:border-violet-400/60 px-6 py-3 rounded-full transition-all duration-300 self-start mt-2 group"
                  >
                    <span>{currentPanel.ctaLabel}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right: 3D Canvas (desktop) ── */}
          {!isMobile && (
            <div className="flex items-center justify-center" style={{ height: 480 }}>
              <div style={{ width: "100%", height: "100%" }}>
                <Canvas
                  camera={{ position: [0, 0, 3.5], fov: 55 }}
                  dpr={[1, 2]}
                  gl={{ antialias: true, alpha: true }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Suspense fallback={null}>
                    <MorphingGeometry progress={progress3D} />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          )}

          {/* Mobile: decorative shape label instead of canvas */}
          {isMobile && (
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activePanelIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="font-display text-[22vw] text-violet-900/40 select-none"
                >
                  {SHAPE_LABELS[activePanelIndex] ?? "∞"}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.3em] uppercase text-muted/40">
          Keep scrolling
        </div>
      </div>
    </section>
  );
}
