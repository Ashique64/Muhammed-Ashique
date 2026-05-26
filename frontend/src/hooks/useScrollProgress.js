"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useScrollProgress
 * Returns a normalized 0–1 progress value as the user scrolls through the target element.
 *
 * @param {React.RefObject} ref – the element to track
 * @param {object} options
 * @param {string} options.start – ScrollTrigger start (default "top bottom")
 * @param {string} options.end   – ScrollTrigger end   (default "bottom top")
 */
export function useScrollProgress(ref, { start = "top bottom", end = "bottom top" } = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref?.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => st.kill();
  }, [ref, start, end]);

  return progress;
}
