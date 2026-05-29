"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Helper color-coder matching SkillsSection categories
const getSkillTagColor = (skill) => {
  const s = skill.toLowerCase();
  if (
    [
      "next.js",
      "react.js",
      "tailwind css",
      "javascript",
      "scss",
      "bootstrap",
      "responsive design",
      "html5",
      "css3",
      "ui/ux design",
    ].includes(s)
  ) {
    return "#22d3ee"; // Frontend (Cyan)
  }
  if (["python", "django", "rest apis", "restful apis"].includes(s)) {
    return "#a78bfa"; // Backend (Purple)
  }
  if (
    ["postgresql", "mongodb", "supabase", "firebase", "sql", "nosql"].includes(
      s
    )
  ) {
    return "#f97316"; // Database (Orange)
  }
  if (["git", "github", "aws", "cpanel"].includes(s)) {
    return "#facc15"; // Tools (Yellow)
  }
  return "#ffffff"; // Default
};

export default function WorkCard({ workData, index }) {
  const { company, role, period, bullets, skills } = workData;

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Symmetrical 3D mouse yaw and pitch tilts
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

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

  // Cursor-tracked radial glow spotlight
  const lightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const lightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  // Stagger entry animations
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Elegant custom easeOut
        delay: index * 0.1,
      },
    },
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        whileHover={{
          y: -4,
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full border border-white/5 hover:border-white/20 bg-surface/20 hover:bg-white/1.5 p-6 md:p-8 rounded-xl transition-all duration-300 shadow-xl relative group overflow-hidden cursor-default"
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([x, y]) =>
                `radial-gradient(300px circle at ${x} ${y}, rgba(167, 139, 250, 0.08), transparent 70%)`
            ),
          }}
        />

        {/* Decorative top lighting glow line on hover */}
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-linear-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        <div className="relative z-10 w-full">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div>
              <h3 className="font-sans text-lg md:text-xl font-semibold text-highlight tracking-tight">
                {company}
              </h3>
              {period && (
                <span className="font-mono text-[10px] md:text-xs text-muted block mt-1 uppercase tracking-widest">
                  {period}
                </span>
              )}
            </div>

            {/* Role Badge */}
            <span className="inline-block sm:self-center font-mono text-[9px] md:text-[10px] tracking-widest uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-accent font-medium select-none">
              {role}
            </span>
          </div>

          {/* Experience Bullet Items */}
          <ul className="mt-6 space-y-3.5 text-xs md:text-sm text-accent/80 leading-relaxed font-light pl-4 list-disc marker:text-muted">
            {bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="hover:text-highlight transition-colors duration-200"
              >
                {bullet}
              </li>
            ))}
          </ul>

          {/* Skill Tags */}
          <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-white/5">
            {skills.map((skill) => {
              const color = getSkillTagColor(skill);
              return (
                <span
                  key={skill}
                  className="font-mono text-[9px] md:text-[10px] tracking-wider border border-white/5 hover:border-white/15 px-2.5 py-1.5 rounded text-muted hover:text-highlight transition-colors bg-surface/40 select-none flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full inline-block"
                    style={{ backgroundColor: color }}
                  />
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
