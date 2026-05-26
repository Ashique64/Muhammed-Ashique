"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CONFIG } from "@/lib/constants";

/* ── Animated counter ── */
function StatCounter({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numericVal = parseFloat(value);
    if (isNaN(numericVal)) { setDisplayed(value); return; }

    let start = 0;
    const end = numericVal;
    const duration = 1400;
    const suffix = value.replace(/[\d.]/g, ""); // e.g. "+" or "%"
    const timer = setTimeout(() => {
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayed(Math.round(end * eased) + suffix);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-4xl md:text-5xl text-highlight leading-none">
        {displayed}
      </span>
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mt-2">
        {label}
      </span>
    </div>
  );
}

/* ── Tech stack icon badge ── */
function TechBadge({ name, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.08, y: -3 }}
      className="px-3 py-1.5 rounded-full border border-white/8 bg-surface/30 font-mono text-[10px] tracking-widest text-muted hover:text-accent hover:border-white/20 transition-colors duration-300 cursor-default"
      style={{ borderColor: `${color}22` }}
    >
      <span style={{ color }}>{name}</span>
    </motion.div>
  );
}

export default function AboutSection() {
  const { bio, socials } = CONFIG.about;
  const { stats } = CONFIG.profile;
  const topSkills = CONFIG.skills.slice(0, 12);
  const sectionRef = useRef(null);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-bg flex flex-col justify-center px-6 md:px-12 py-24 md:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(79,70,229,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Section label */}
      <motion.span
        className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        01 — About
      </motion.span>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

        {/* ── Left: Heading + Stats ── */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            variants={childVariants}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-highlight leading-none tracking-tight"
          >
            Building <br />
            <span className="text-accent/50">with purpose.</span>
          </motion.h2>

          {/* Stats grid */}
          <motion.div
            variants={childVariants}
            className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10"
          >
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} delay={i * 200} />
            ))}
          </motion.div>

          {/* Tech badges */}
          <motion.div variants={childVariants} className="flex flex-wrap gap-2">
            {topSkills.map((skill, i) => (
              <TechBadge key={skill.name} name={skill.name} color={skill.color} delay={i * 0.04} />
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Bio + Socials ── */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Bio paragraphs */}
          <div className="flex flex-col gap-6">
            {bio.map((para, i) => (
              <motion.p
                key={i}
                variants={childVariants}
                className="font-sans text-sm md:text-base leading-relaxed text-accent/70"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Separator */}
          <motion.div variants={childVariants} className="w-12 h-px bg-white/10" />

          {/* Social links */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {socials.map((s) => (
              <motion.a
                suppressHydrationWarning
                key={s.name}
                variants={childVariants}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-4 border border-white/6 rounded-xl bg-surface/10 hover:bg-surface/30 hover:border-white/15 transition-all duration-300 group"
                whileHover={{ y: -3 }}
              >
                <span className="font-mono text-[9px] tracking-widest text-muted uppercase group-hover:text-highlight transition-colors">
                  {s.name}
                </span>
                <span className="font-sans text-xs text-accent/80 mt-2 group-hover:text-highlight transition-colors truncate">
                  {s.username}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
