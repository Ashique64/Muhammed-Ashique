"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger if running in browser
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Sleek easing curves
      direction: "vertical",
      gestureDirection: "vertical",
      smoothHandheld: false, // Keep native touch controls on mobile devices
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll updates directly to GSAP's ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Feed Lenis frame updates to the GSAP Ticker animation loop
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // Reduce visual lag on rapid scroll updates
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return <>{children}</>;
}
