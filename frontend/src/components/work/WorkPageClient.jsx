"use client";

import { useState } from "react";
import WorkCard from "./WorkCard";

const CATEGORIES = ["ALL", "FULL-STACK", "FREELANCE", "INTERN"];

const getJobCategory = (job) => {
  if (job.id === "w1") return ["FREELANCE", "FULL-STACK"];
  if (job.id === "w2") return ["FULL-STACK"];
  if (job.id === "w3") return ["FULL-STACK"];
  if (job.id === "w4") return ["INTERN"];
  if (job.id === "w5") return ["FULL-STACK", "INTERN"];
  return [];
};

export default function WorkPageClient({ work, profile }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [hoveredJobId, setHoveredJobId] = useState(null);

  const getCategoryCount = (cat) => {
    if (cat === "ALL") return work.length;
    return work.filter((job) => getJobCategory(job).includes(cat)).length;
  };

  const filteredJobs = activeCategory === "ALL"
    ? work
    : work.filter((job) => getJobCategory(job).includes(activeCategory));

  return (
    <div className="max-w-6xl w-full flex flex-col relative z-10">
      
      {/* Header Block */}
      <div className="mb-16 md:mb-20 flex flex-col items-start border-b border-white/5 pb-12 select-none">
        <span className="font-mono text-[9px] tracking-[0.35em] text-muted uppercase">
          Milestones &amp; Projects
        </span>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-highlight leading-none tracking-tight mt-4">
          Work Experience<span className="text-accent/40">.</span>
        </h1>
        <p className="font-sans text-xs md:text-sm text-muted max-w-xl leading-relaxed mt-6">
          A chronological history of engineering high-performance decentralized systems, scaling artificial intelligence infrastructure, and creating immersive user experiences.
        </p>
      </div>

      {/* Brutalist Monospace Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat;
          const count = getCategoryCount(cat);
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[9px] tracking-[0.25em] uppercase px-5 py-2.5 transition-all duration-300 border ${
                active
                  ? "text-black bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  : "border-white/5 text-muted hover:border-white/20 hover:text-white bg-white/1"
              }`}
              style={{ borderRadius: 0, cursor: "pointer" }}
            >
              {cat} <span className="opacity-40 ml-1 text-[8px]">({count < 10 ? `0${count}` : count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Split Timeline Section */}
      <div className="relative w-full min-h-[400px]">
        {/* Central vertical timeline line axis (collapses to left-4 on mobile) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent -translate-x-1/2 z-0" />

        {/* Staggered cards loop */}
        <div className="flex flex-col gap-16 md:gap-24 w-full relative z-10">
          {filteredJobs.map((job, index) => {
            const isEven = index % 2 === 0;
            const isHovered = hoveredJobId === job.id;

            return (
              <div
                key={job.id}
                className={`flex flex-col md:flex-row items-center w-full relative ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Pulsing Chrono-node dot exact-centered on axis */}
                <div
                  className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-bg border transition-all duration-300 z-20 flex items-center justify-center ${
                    isHovered
                      ? "border-accent scale-110 shadow-[0_0_12px_rgba(167,139,250,0.5)]"
                      : "border-white/10 scale-100"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      isHovered ? "bg-accent" : "bg-white/10"
                    }`}
                  />
                </div>

                {/* Horizontal branch line (desktop only) */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r transition-all duration-500 hidden md:block ${
                    isEven
                      ? "left-[calc(50%+8px)] w-[calc(50%-48px)] from-accent/20 to-transparent"
                      : "right-[calc(50%+8px)] w-[calc(50%-48px)] from-accent/20 to-transparent"
                  } ${isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-75"}`}
                  style={{ transformOrigin: isEven ? "left" : "right" }}
                />

                {/* Individual Card container with local hover states */}
                <div
                  className="w-full md:w-[calc(50%-36px)] pl-10 md:pl-0"
                  onMouseEnter={() => setHoveredJobId(job.id)}
                  onMouseLeave={() => setHoveredJobId(null)}
                >
                  <WorkCard workData={job} index={index} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
