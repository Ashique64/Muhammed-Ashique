"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { LANGUAGE_COLORS } from "@/lib/github";

/* ── Glassmorphism project card with 3D tilt + cursor light ── */
function ProjectCard({ repo, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Cursor-tracked radial light
  const lightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const lightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-white/8 bg-surface/10 backdrop-blur-sm overflow-hidden group cursor-pointer h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Cursor radial light */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([x, y]) => `radial-gradient(300px circle at ${x} ${y}, rgba(167,139,250,0.12), transparent 70%)`
            ),
          }}
        />

        {/* Card border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "inset 0 0 0 1px rgba(167,139,250,0.2)" }}
        />

        <div className="relative z-10 p-6 flex flex-col gap-4 h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted">
                {repo.topics?.[0] || "project"}
              </span>
              <h3 className="font-display text-lg text-highlight leading-tight group-hover:text-white transition-colors">
                {repo.name.replace(/-/g, " ")}
              </h3>
            </div>
            {/* Arrow */}
            <a
              suppressHydrationWarning
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-highlight hover:border-white/30 transition-all duration-200 group-hover:bg-white/5"
              aria-label="Open repo"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Description */}
          <p className="font-sans text-xs leading-relaxed text-muted flex-1">
            {repo.description}
          </p>

          {/* Topics */}
          {repo.topics?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {repo.topics.map((topic) => (
                <span
                  key={topic}
                  className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-white/6
                             text-muted/70 bg-white/3 tracking-wider"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-4 pt-3 border-t border-white/5">
            {/* Language dots */}
            {repo.language && (
              <div className="flex items-center gap-3">
                {repo.language.split(",").map((lang) => {
                  const trimmedLang = lang.trim();
                  const officialColor = LANGUAGE_COLORS[trimmedLang] || "#8B949E";
                  return (
                    <div key={trimmedLang} className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.05)]"
                        style={{ background: officialColor }}
                      />
                      <span className="font-mono text-[9px] text-muted">{trimmedLang}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection({ repos }) {
  return (
    <section
      id="projects"
      className="relative w-full bg-bg py-24 md:py-36 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 20% 60%, rgba(79,70,229,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.span
              className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              03 — Projects
            </motion.span>
            <motion.h2
              className="font-display text-5xl md:text-6xl lg:text-7xl text-highlight leading-none tracking-tight mt-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Selected <br />
              <span className="text-accent/40">Work.</span>
            </motion.h2>
          </div>
          <motion.a
            suppressHydrationWarning
            href="https://github.com/Ashique64"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted hover:text-highlight border border-white/10 hover:border-white/25 px-5 py-3 rounded-full transition-all duration-300 self-start group"
            whileHover={{ scale: 1.03 }}
          >
            View All on GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {(repos || []).slice(0, 4).map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>

        {/* Centered CTA to GitHub Profile */}
        <div className="flex justify-center mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex"
          >
            <a
              suppressHydrationWarning
              href="https://github.com/Ashique64"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] uppercase text-highlight hover:text-black border border-white/10 hover:border-white bg-white/5 hover:bg-white px-8 py-4 rounded-full transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              Explore More on GitHub
              <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
