"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { CONFIG } from "@/lib/constants";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const TechGalaxy = dynamic(() => import("@/components/3d/TechGalaxy"), { ssr: false });

/* Category filter button */
function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[9px] tracking-[0.25em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
        active
          ? "border-violet-500/60 text-violet-300 bg-violet-900/20"
          : "border-white/8 text-muted hover:border-white/20 hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}

/* Mobile skill list (flat grid instead of 3D) */
function MobileSkillGrid({ skills }) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full mt-8">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/6 bg-surface/10"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}55` }}
          />
          <span className="font-mono text-[9px] tracking-wider text-muted text-center">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  );
}

const CATEGORIES = ["all", "frontend", "backend", "database", "tools", "emerging"];

export default function SkillsSection() {
  const { skills } = CONFIG;
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useMouseParallax(0.8);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen bg-bg border-t border-white/5 py-24 md:py-32 px-6 md:px-12 overflow-hidden flex flex-col"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(67,56,202,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full">
        <motion.span
          className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          04 — Skills
        </motion.span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-3 mb-12">
          <motion.h2
            className="font-display text-5xl md:text-6xl lg:text-7xl text-highlight leading-none tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Tech <br />
            <span className="text-accent/40">Galaxy</span>
          </motion.h2>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {CATEGORIES.map((cat) => (
              <FilterBtn
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </motion.div>
        </div>

        {/* Hint text */}
        <motion.p
          className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted/40 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {isMobile ? "Your tech stack" : "Move mouse to rotate · Hover node for details"}
        </motion.p>
      </div>

      {/* 3D Canvas or mobile grid */}
      {!isMobile ? (
        <motion.div
          className="flex-1 w-full min-h-[60vh]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Canvas
            camera={{ position: [0, 0, 7], fov: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <TechGalaxy
                skills={filteredSkills}
                mouseX={mouse.x}
                mouseY={mouse.y}
              />
            </Suspense>
          </Canvas>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto w-full">
          <MobileSkillGrid skills={filteredSkills} />
        </div>
      )}
    </section>
  );
}
