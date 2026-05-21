"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { CONFIG } from "@/lib/constants";

export default function Hero() {
  const { name, title, speedCounter, tagline } = CONFIG.profile;
  const nameParts = name.split(" ");

  // High performance decimal counter
  const count = useMotionValue(0.0);
  const roundedCount = useTransform(count, (latest) => latest.toFixed(1));

  useEffect(() => {
    // Animate count up to target speed value
    const controls = animate(count, speedCounter.value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // premium custom ease-out curve
      delay: 0.8,
    });
    return () => controls.stop();
  }, [count, speedCounter.value]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 pt-32 pb-12 md:px-12 md:pb-16 bg-bg overflow-hidden select-none">
      
      {/* Visual Background Accent - Sleek Dark Ambient Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Large Editorial Typographic Header */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="font-display text-[13vw] leading-[0.8] tracking-tight uppercase flex flex-col items-start w-full select-none">
          {nameParts.map((part, index) => (
            <motion.span
              key={part}
              className={`block ${
                index % 2 === 1 
                  ? "pl-[8vw] md:pl-[15vw] italic text-zinc-300 font-extralight" 
                  : "font-bold text-highlight"
              }`}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.15 + 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {part}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Hero Bottom Footer Panel */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-12 border-t border-white/5">
        
        {/* Left Col: Speed Ticker */}
        <motion.div
          className="flex flex-col items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-baseline gap-1">
            <motion.span className="font-mono text-4xl md:text-6xl font-semibold text-highlight tracking-tighter">
              {roundedCount}
            </motion.span>
            <span className="font-mono text-xs md:text-sm text-highlight font-light lowercase">
              x
            </span>
          </div>
          <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-muted mt-1.5">
            {speedCounter.label} &mdash; {speedCounter.sublabel}
          </span>
        </motion.div>

        {/* Center Col: Subtitle Roles */}
        <motion.div
          className="flex flex-col items-start md:items-center text-left md:text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-accent/90">
            {title}
          </p>
          <span className="font-mono text-[9px] tracking-widest uppercase text-muted mt-2 hidden md:inline">
            Active Core &bull; Available globally
          </span>
        </motion.div>

        {/* Right Col: Blinking Cursor Tagline */}
        <motion.div
          className="flex justify-start md:justify-end items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
              STATUS
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="font-mono text-xs text-highlight bg-white/10 px-2 py-0.5 rounded border border-white/10"
            >
              {tagline}
            </motion.span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
