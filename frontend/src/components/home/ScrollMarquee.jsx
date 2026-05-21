"use client";

export default function ScrollMarquee({ 
  text = "CREATIVE ENGINEERING &bull; ARTIFICIAL INTELLIGENCE &bull; ARCHITECTURAL MINIMALISM &bull; BLOCKCHAIN &bull; " 
}) {
  // Join the text multiple times to ensure it overflows the screen width
  const repeatedText = Array(6).fill(text).join(" ");

  return (
    <div className="w-full overflow-hidden bg-surface/30 py-6 md:py-8 border-y border-white/5 relative z-10 flex select-none">
      {/* Self-contained keyframe rules for isolated high performance scrolling */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-anim-track {
          display: flex;
          white-space: nowrap;
          animation: marqueeScroll 28s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="marquee-anim-track">
        <span 
          className="font-display italic text-3xl md:text-5xl uppercase tracking-widest text-muted/40 pr-6" 
          dangerouslySetInnerHTML={{ __html: repeatedText }} 
        />
        <span 
          className="font-display italic text-3xl md:text-5xl uppercase tracking-widest text-muted/40 pr-6" 
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: repeatedText }} 
        />
      </div>
    </div>
  );
}
