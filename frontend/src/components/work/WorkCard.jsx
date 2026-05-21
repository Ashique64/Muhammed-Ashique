"use client";

import { motion } from "framer-motion";

export default function WorkCard({ workData, index }) {
  const { company, role, period, bullets, skills } = workData;

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
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ 
        y: -4, 
        borderColor: "rgba(255, 255, 255, 0.18)", 
        backgroundColor: "rgba(255, 255, 255, 0.015)" 
      }}
      className="w-full border border-white/5 bg-surface/20 p-6 md:p-8 rounded-xl transition-all duration-300 shadow-xl relative group overflow-hidden"
    >
      {/* Decorative top lighting glow line on hover */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h3 className="font-sans text-lg md:text-xl font-semibold text-highlight tracking-tight">
            {company}
          </h3>
          <span className="font-mono text-[10px] md:text-xs text-muted block mt-1 uppercase tracking-widest">
            {period}
          </span>
        </div>
        
        {/* Role Badge */}
        <span className="inline-block sm:self-center font-mono text-[9px] md:text-[10px] tracking-widest uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-accent font-medium select-none">
          {role}
        </span>
      </div>

      {/* Experience Bullet Items */}
      <ul className="mt-6 space-y-3.5 text-xs md:text-sm text-accent/80 leading-relaxed font-light pl-4 list-disc marker:text-muted">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="hover:text-highlight transition-colors duration-200">
            {bullet}
          </li>
        ))}
      </ul>

      {/* Skill Tags */}
      <div className="mt-8 flex flex-wrap gap-1.5 pt-6 border-t border-white/5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="font-mono text-[9px] md:text-[11px] tracking-wider border border-white/5 hover:border-white/15 px-2.5 py-1 rounded text-muted hover:text-highlight transition-colors bg-surface/40 select-none"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
