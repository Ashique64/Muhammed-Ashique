"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

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

  // Recalculate dimensions and scroll to top or target anchor on every route transition
  useEffect(() => {
    if (!lenisRef.current) return;
    
    // Force recalculation of page/viewport heights
    lenisRef.current.resize();
    
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        // Wait a brief tick to ensure components have fully mounted/rendered
        setTimeout(() => {
          lenisRef.current.scrollTo(targetElement, { 
            offset: -80, // Offset for header spacing
            duration: 1.2
          });
        }, 100);
      } else {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    } else {
      // Reset scroll position to top
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    
    // Refresh ScrollTrigger tracking
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
