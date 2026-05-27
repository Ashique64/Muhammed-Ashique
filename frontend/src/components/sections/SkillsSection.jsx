"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CAT_COLORS = {
  frontend: "#22d3ee", // Cyan
  backend: "#a78bfa",  // Purple/Violet
  database: "#f97316", // Orange
  tools: "#facc15",    // Gold/Yellow
  ai: "#4ade80"        // Green
};

const CAT_BADGES = {
  frontend: "FE",
  backend: "BE",
  database: "DB",
  tools: "TOOL",
  ai: "AI"
};

const SKILLS_DATA = [
  { name: "React.js",                  level: 92, category: "frontend" },
  { name: "Python",                    level: 85, category: "backend" },
  { name: "PostgreSQL",                level: 82, category: "database" },
  { name: "Git",                       level: 92, category: "tools" },
  { name: "OpenAI API",                level: 82, category: "ai" },
  { name: "Next.js",                   level: 88, category: "frontend" },
  { name: "Django",                    level: 80, category: "backend" },
  { name: "MongoDB",                   level: 80, category: "database" },
  { name: "VS Code",                   level: 95, category: "tools" },
  { name: "Claude API",                level: 80, category: "ai" },
  { name: "JavaScript (ES6+)",         level: 95, category: "frontend" },
  { name: "Django REST Framework",     level: 82, category: "backend" },
  { name: "MySQL",                     level: 78, category: "database" },
  { name: "GitHub",                    level: 90, category: "tools" },
  { name: "AI Chatbot Integration",    level: 84, category: "ai" },
  { name: "HTML5",                     level: 95, category: "frontend" },
  { name: "REST API Development",      level: 88, category: "backend" },
  { name: "Supabase",                  level: 80, category: "database" },
  { name: "Postman",                   level: 86, category: "tools" },
  { name: "Prompt Engineering",        level: 85, category: "ai" },
  { name: "CSS3",                      level: 92, category: "frontend" },
  { name: "Authentication & Auth",     level: 85, category: "backend" },
  { name: "Firebase Firestore",        level: 82, category: "database" },
  { name: "Figma",                     level: 75, category: "tools" },
  { name: "Tailwind CSS",              level: 90, category: "frontend" },
  { name: "JWT Authentication",        level: 84, category: "backend" },
  { name: "Vercel",                    level: 88, category: "tools" },
  { name: "Redux Toolkit",             level: 82, category: "frontend" },
  { name: "JavaScript",                level: 90, category: "backend" },
  { name: "Netlify",                   level: 84, category: "tools" },
  { name: "Zustand",                   level: 80, category: "frontend" },
  { name: "SCSS / Sass",               level: 85, category: "frontend" },
  { name: "Framer Motion",             level: 82, category: "frontend" },
  { name: "GSAP",                      level: 80, category: "frontend" },
  { name: "Three.js",                  level: 72, category: "frontend" }
];

const CATEGORIES = ["ALL", "FRONTEND", "BACKEND", "DATABASE", "TOOLS", "AI"];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter skills and calculate matching count instantly
  const filteredSkills = activeCategory === "ALL"
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category.toUpperCase() === activeCategory);

  const activeCount = filteredSkills.length;

  return (
    <section
      id="skills"
      className="relative w-full bg-bg border-t border-white/5 py-24 md:py-28 px-6 md:px-12 overflow-hidden flex flex-col font-mono text-white"
    >
      {/* Dynamic Keyframe style blocks */}
      <style>{`
        @keyframes blink {
          from, to { background-color: transparent; }
          50% { background-color: currentColor; }
        }
        .blinking-cursor {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-left: 6px;
          animation: blink 1s step-end infinite;
          background-color: currentColor;
          vertical-align: middle;
        }
        .skill-card-hover:hover {
          border-color: rgba(255, 255, 255, 0.15) !important;
          background-color: rgba(255, 255, 255, 0.02) !important;
        }
        .skill-card-hover:hover .progress-bar {
          filter: brightness(1.2) !important;
        }
      `}</style>

      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 20% 60%, rgba(79,70,229,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Main Terminal Wrapper */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-between flex-1">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted block mb-2">
              04 — SKILLS
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-highlight leading-none tracking-tight m-0">
              Stack <br />
              <span className="text-accent/40">/ Index</span>
            </h2>
          </div>
          
          {/* Live Skill Count Counter */}
          <div className="flex flex-col items-end">
            <span className="font-mono text-[9px] tracking-[0.2em] text-muted uppercase mb-1">
              LIVE_COUNT
            </span>
            <div className="font-mono text-5xl md:text-6xl font-bold text-highlight leading-none">
              {activeCount < 10 ? `0${activeCount}` : activeCount}
            </div>
          </div>
        </div>

        {/* Category filters tab list */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            const color = CAT_COLORS[cat.toLowerCase()] || "#ffffff";
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[9px] tracking-[0.25em] uppercase px-5 py-2.5 transition-all duration-300 border ${
                  active
                    ? "text-black bg-white"
                    : "border-white/5 text-muted hover:border-white/20 hover:text-white"
                }`}
                style={{
                  borderRadius: 0,
                  borderColor: active ? color : undefined,
                  boxShadow: active ? `0 0 15px ${color}33` : "none",
                  backgroundColor: active ? color : "rgba(255,255,255,0.01)",
                  color: active ? "#000000" : undefined,
                  cursor: "pointer"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Brutalist Skills Grid Layout */}
        <div
          className="grid gap-0 border border-white/5 bg-bg"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))"
          }}
        >
          {SKILLS_DATA.map((skill) => {
            const isMatch = activeCategory === "ALL" || skill.category.toUpperCase() === activeCategory;
            const color = CAT_COLORS[skill.category] || "#ffffff";
            const badgeText = CAT_BADGES[skill.category] || "FE";
            
            // 10-dot system calculations
            const filledDots = Math.round(skill.level / 10);

            return (
              <div
                key={skill.name}
                className="skill-card-hover flex flex-col justify-between h-[135px] p-[18px] border border-white/5 bg-transparent transition-all duration-300"
                style={{
                  display: isMatch ? "flex" : "none",
                  margin: "-0.5px", // Share grid borders cleanly
                  boxSizing: "border-box"
                }}
              >
                {/* 1. Skill Name & Category badge row */}
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm font-bold text-highlight tracking-wide">
                    {skill.name}
                  </span>
                  
                  {/* Category badge */}
                  <span
                    className="font-mono text-[8px] font-bold tracking-wider py-[2px] px-[6px]"
                    style={{
                      border: `1px solid ${color}33`,
                      backgroundColor: `${color}11`,
                      color: color,
                      borderRadius: "1px",
                      textTransform: "uppercase"
                    }}
                  >
                    {badgeText}
                  </span>
                </div>

                {/* 2. 2px thin animated progress bar */}
                <div>
                  <div className="h-[2px] w-full bg-white/5">
                    <div
                      className="progress-bar h-full"
                      style={{
                        width: isLoaded && isMatch ? `${skill.level}%` : "0%",
                        backgroundColor: color,
                        boxShadow: `0 0 6px ${color}88`,
                        transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                      }}
                    />
                  </div>
                </div>

                {/* 3. Bottom row: Proficiency percentage & Dot-matrix ratings */}
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] font-bold text-muted tracking-wide">
                    {skill.level}% <span className="text-white/20 text-[8px]">PRO</span>
                  </span>

                  {/* 10-dot indicator */}
                  <div className="flex gap-[4.5px]">
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const isFilled = idx < filledDots;
                      return (
                        <div
                          key={idx}
                          className="w-1 h-1 rounded-full transition-all duration-300"
                          style={{
                            border: isFilled ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.06)",
                            backgroundColor: isFilled ? color : "transparent",
                            boxShadow: isFilled ? `0 0 4px ${color}` : "none"
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Brutalist Footer Row */}
        <div className="flex justify-start items-center mt-8 font-mono text-[9px] text-muted tracking-widest uppercase">
          <span>always learning</span>
        </div>

      </div>
    </section>
  );
}
