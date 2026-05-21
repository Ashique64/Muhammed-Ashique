"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Zero-overhead high-performance MotionValues for mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Soft inertia spring config for the lagging outer ring
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Event delegation helper to find hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], [data-hover], input, textarea'
      );
      
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    addHoverListeners();

    // Since the DOM might render elements asynchronously, verify hooks periodically
    const interval = setInterval(addHoverListeners, 1000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(interval);
    };
  }, [cursorX, cursorY, hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <motion.div
        className="custom-cursor-dot hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      {/* Inertial Glass Outer Ring */}
      <motion.div
        className="custom-cursor-ring hidden md:block"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: hovered ? 1.7 : 1,
          backgroundColor: hovered ? "rgba(232, 232, 232, 0.08)" : "rgba(232, 232, 232, 0)",
          borderColor: hovered ? "rgba(255, 255, 255, 0.9)" : "rgba(232, 232, 232, 0.3)",
        }}
        transition={{ duration: 0.25, ease: "backOut" }}
      />
    </>
  );
}
