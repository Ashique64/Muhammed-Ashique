"use client";

import { useState, useEffect } from "react";

/**
 * useMouseParallax
 * Returns a normalized mouse position { x, y } in the range [-1, 1].
 * Used for camera shift in Hero NeuralCore and Contact Globe.
 *
 * @param {number} strength – multiplier for the parallax effect (default 1)
 */
export function useMouseParallax(strength = 1) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: ((e.clientX / window.innerWidth) * 2 - 1) * strength,
        y: (-(e.clientY / window.innerHeight) * 2 + 1) * strength,
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return mouse;
}
