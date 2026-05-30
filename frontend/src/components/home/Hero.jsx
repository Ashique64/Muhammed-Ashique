"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { CONFIG } from "@/lib/constants";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const PrismCore = dynamic(() => import("@/components/3d/PrismCore"), { ssr: false });


/* ── Deterministic ambient dots ── */
const AMBIENT_DOTS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${((i * 37.3) % 90) + 5}%`,
  top:  `${((i * 59.7) % 85) + 5}%`,
  size: `${1 + (i % 3)}px`,
  opacity: 0.04 + (i % 5) * 0.025,
}));

export default function Hero() {
  const { name, title, tagline, philosophyTag } = CONFIG.profile;
  const [mounted, setMounted]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useMouseParallax(0.5);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-bg overflow-hidden flex flex-col px-8 md:px-12 pt-8 pb-10">

      {/* ── Background glow + ambient dots (client-only) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.14) 0%, transparent 70%)" }}
        />
        {AMBIENT_DOTS.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-white"
            style={{ left: dot.left, top: dot.top, width: dot.size, height: dot.size, opacity: dot.opacity }}
          />
        ))}
      </div>

      {/* ── 3D NeuralCore Canvas — centered, pointer-events-none ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ width: isMobile ? 400 : 800, height: isMobile ? 400 : 800 }}>
          {mounted && (
            <Canvas
              camera={{ position: [0, 0, 3.5], fov: 55 }}
              dpr={isMobile ? [1, 1.5] : [1, 2]}
              gl={{ antialias: true, alpha: true }}
              style={{ width: "100%", height: "100%" }}
            >
              <Suspense fallback={null}>
                <PrismCore mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
              </Suspense>
            </Canvas>
          )}
        </div>
      </div>

      {/* ── Top-left: Name + Title ── */}
      <div className="relative z-10 mt-6 md:mt-8">
        <motion.h1
          className="font-display text-[9vw] md:text-[6.5vw] leading-none tracking-tight text-highlight uppercase"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="font-mono text-xs md:text-sm text-accent/60 mt-3 tracking-[0.25em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.p>
      </div>

      {/* ── Bottom-right: Tagline ── */}
      <motion.div
        className="absolute bottom-28 md:bottom-32 right-8 md:right-14 max-w-[200px] md:max-w-xs text-right z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display font-normal text-sm md:text-base text-accent/60 leading-relaxed tracking-wide">
          {tagline}
        </p>
      </motion.div>

      {/* ── Bottom: Philosophy tag ── */}
      <motion.div
        className="mt-auto relative z-10 w-full"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display font-normal text-right text-[5.5vw] md:text-[4vw] text-highlight/90 leading-none tracking-tight">
          {philosophyTag ?? "Design. Develop. Deliver."}
        </p>
      </motion.div>



      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-bg to-transparent pointer-events-none z-10" />
    </section>
  );
}
