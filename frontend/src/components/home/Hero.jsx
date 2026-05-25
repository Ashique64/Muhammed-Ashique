"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/lib/constants";

/* ─── Pre-computed particle ring dots (deterministic = no hydration issues) ── */
const RING_DOTS = Array.from({ length: 220 }, (_, i) => {
  const angle  = (i / 220) * 2 * Math.PI;
  // Slight radius variance for a "cloud" feel
  const radii  = [128, 131, 126, 133, 129, 135, 127, 132, 130, 128];
  const r      = radii[i % radii.length];
  const x      = 150 + r * Math.cos(angle);
  const y      = 150 + r * Math.sin(angle);
  const sizes  = [0.5, 0.9, 1.3, 0.6, 1.1, 0.7, 1.5, 0.8, 1.0, 0.6];
  const opacs  = [0.35, 0.65, 0.9, 0.5, 0.75, 0.4, 0.85, 0.55, 0.7, 0.45];
  return { x, y, r: sizes[i % sizes.length], o: opacs[i % opacs.length] };
});

export default function Hero() {
  const { name, title, speedCounter, tagline } = CONFIG.profile;

  // ── Mounted guard: prevents Framer Motion SSR hydration mismatch ──────────
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Return a plain black screen on the server — no animations, no mismatch
  if (!mounted) {
    return (
      <section className="relative w-full min-h-screen bg-bg flex flex-col px-8 md:px-12 pt-8 pb-10">
        <div className="relative z-10 mt-6 md:mt-8">
          <h1 className="font-display text-[8vw] md:text-[6.5vw] leading-none tracking-tight text-highlight uppercase opacity-0">
            {name}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-bg overflow-hidden flex flex-col px-8 md:px-12 pt-8 pb-10">

      {/* ── TOP-LEFT: Name + Subtitle ─────────────────────────────────────── */}
      <div className="relative z-10 mt-6 md:mt-8">
        <motion.h1
          className="font-display text-[8vw] md:text-[6.5vw] leading-none tracking-tight text-highlight uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {name}
        </motion.h1>

        <motion.p
          className="font-display font-normal text-lg md:text-xl text-accent/80 mt-3 tracking-wider"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {title}
        </motion.p>
      </div>

      {/* ── CENTER: 3D Cube + Particle Ring ───────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center">

          {/* Rotating particle ring — SVG */}
          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          >
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {RING_DOTS.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="white" opacity={d.o} />
              ))}
            </svg>
          </motion.div>

          {/* Counter-rotating inner ring (slower) */}
          <motion.div
            className="absolute"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          >
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              {Array.from({ length: 80 }, (_, i) => {
                const angle = (i / 80) * 2 * Math.PI;
                const r = 95;
                const x = 110 + r * Math.cos(angle);
                const y = 110 + r * Math.sin(angle);
                const sizes = [0.4, 0.7, 1.0, 0.5];
                const opacs = [0.15, 0.25, 0.35, 0.2];
                return (
                  <circle key={i} cx={x} cy={y}
                    r={sizes[i % sizes.length]}
                    fill="white"
                    opacity={opacs[i % opacs.length]}
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* 3D Rotating Cube */}
          <div className="cube-perspective">
            <motion.div
              className="cube-3d"
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{ rotateX: -15 }}
            >
              <div className="cube-face cube-front"  />
              <div className="cube-face cube-back"   />
              <div className="cube-face cube-left"   />
              <div className="cube-face cube-right"  />
              <div className="cube-face cube-top"    />
              <div className="cube-face cube-bottom" />
            </motion.div>
          </div>

          {/* Thin horizontal crosshair lines through cube center */}
          <div className="absolute w-[200px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute h-[200px] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── BOTTOM-RIGHT: Tagline ─────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-32 md:bottom-36 right-8 md:right-14 max-w-[220px] md:max-w-xs text-right z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <p className="font-display font-normal text-sm md:text-base text-accent/70 leading-relaxed tracking-wide">
          {tagline}
        </p>
      </motion.div>

      {/* ── BOTTOM: Philosophy Tag ────────────────────────────────────────── */}
      <motion.div
        className="mt-auto relative z-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      >
        <p className="font-display font-normal text-right text-[5.5vw] md:text-[4.5vw] text-highlight leading-none tracking-tight">
          {CONFIG.profile.philosophyTag ?? "Design. Develop. Deliver."}
        </p>
      </motion.div>

    </section>
  );
}
