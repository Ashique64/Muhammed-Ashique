"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function PhilosophySection({ sectionData }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const descRef = useRef(null);

  const { heading, highlight = [], description, ctaLink, ctaLabel } = sectionData;

  useEffect(() => {
    // Register ScrollTrigger inside the browser lifecycle
    gsap.registerPlugin(ScrollTrigger);

    const words = textRef.current.querySelectorAll(".word");
    const desc = descRef.current;

    // Create staggered entrance animation timeline linked to viewport entry
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Starts when the top of the panel reaches 75% of screen height
        end: "bottom 25%",
        toggleActions: "play none none reverse", // Rewind when scrolling back up
      }
    });

    // Stagger characters/words up
    tl.from(words, {
      y: 45,
      opacity: 0,
      stagger: 0.05,
      duration: 0.7,
      ease: "power3.out"
    });

    // Fade in supporting text
    if (desc) {
      tl.from(desc, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.35"); // Slide overlapping start
    }

    return () => {
      // Safely kill local ScrollTrigger on unmount
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === containerRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  // Split heading by spaces
  const wordsArray = heading.split(" ");

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 py-24 border-b border-white/5 relative bg-bg"
    >
      {/* Decorative Index Label */}
      <div className="absolute top-12 left-6 md:left-12 font-mono text-[9px] tracking-[0.3em] uppercase text-muted">
        Philosophy Statement
      </div>

      <div className="max-w-4xl w-full flex flex-col justify-center items-center text-center">
        
        {/* Word Split Wrapper */}
        <h2
          ref={textRef}
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-accent select-none overflow-hidden flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em]"
        >
          {wordsArray.map((word, idx) => {
            // Clean punctuation to accurately match the highlight list
            const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
            const shouldHighlight = highlight.some(
              (hl) => hl.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() === cleanWord
            );

            return (
              <span
                key={idx}
                className="word inline-block origin-bottom"
              >
                <span className={
                  shouldHighlight 
                    ? "text-highlight font-medium italic border-b border-highlight/15" 
                    : "opacity-80"
                }>
                  {word}
                </span>
              </span>
            );
          })}
        </h2>

        {/* Small Supporting Body Paragraph */}
        {description && (
          <div ref={descRef} className="mt-10 max-w-md flex flex-col items-center">
            <p className="font-sans text-xs md:text-sm leading-relaxed text-muted text-center">
              {description}
            </p>
            
            {/* CTA Option for Final Panel */}
            {ctaLink && (
              <div className="mt-8">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-2.5 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-highlight hover:text-bg border border-white/10 hover:border-transparent bg-surface/50 hover:bg-highlight px-6 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <span>{ctaLabel}</span>
                  <span className="text-[10px]">&rarr;</span>
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
