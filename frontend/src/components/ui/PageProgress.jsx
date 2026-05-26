"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";

/**
 * PageProgress – thin violet spring-animated bar at the top tracking page scroll.
 * Mounted guard prevents Framer Motion from applying MotionValue styles during SSR,
 * which can cause hydration attribute mismatches.
 */
export default function PageProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 35, restDelta: 0.001 });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-400 z-[99999] origin-left"
    />
  );
}
