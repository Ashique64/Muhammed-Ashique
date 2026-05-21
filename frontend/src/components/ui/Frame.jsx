"use client";

import { useEffect, useState } from "react";

export default function Frame() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const edgeColor = "rgba(255, 255, 255, 0.15)";
  
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {/* ── Left Edge ── */}
      <div className="absolute left-[20px] top-[60px] bottom-[60px] w-[1px]" style={{ background: edgeColor }} />
      
      {/* ── Top Left Corner ── */}
      <div className="absolute left-[20px] top-[40px] w-[20px] h-[20px] border-t border-l rounded-tl-[16px]" style={{ borderColor: edgeColor }} />
      
      {/* ── Top Edge Main ── */}
      <div className="absolute left-[40px] right-[400px] top-[40px] h-[1px]" style={{ background: edgeColor }} />
      
      {/* ── Top Slant ── */}
      <div 
        className="absolute top-[40px] h-[1px]" 
        style={{ 
          left: 'calc(100% - 400px)', 
          width: '36.055px', 
          background: edgeColor, 
          transformOrigin: 'top left', 
          transform: 'rotate(-33.69deg)' 
        }} 
      />
      
      {/* ── Top Edge Navbar ── */}
      <div className="absolute right-[40px] top-[20px] h-[1px]" style={{ left: 'calc(100% - 370px)', background: edgeColor }} />
      
      {/* ── Top Right Corner ── */}
      <div className="absolute right-[20px] top-[20px] w-[20px] h-[20px] border-t border-r rounded-tr-[16px]" style={{ borderColor: edgeColor }} />
      
      {/* ── Right Edge ── */}
      <div className="absolute right-[20px] top-[40px] bottom-[40px] w-[1px]" style={{ background: edgeColor }} />
      
      {/* ── Bottom Right Corner ── */}
      <div className="absolute right-[20px] bottom-[20px] w-[20px] h-[20px] border-b border-r rounded-br-[16px]" style={{ borderColor: edgeColor }} />
      
      {/* ── Bottom Edge Main ── */}
      <div className="absolute right-[40px] bottom-[20px] left-[70px] h-[1px]" style={{ background: edgeColor }} />
      
      {/* ── Bottom Left Chamfer ── */}
      <div 
        className="absolute bottom-[60px] left-[20px] h-[1px]" 
        style={{ 
          width: '64.031px', 
          background: edgeColor, 
          transformOrigin: 'top left', 
          transform: 'rotate(38.66deg)' 
        }} 
      />
    </div>
  );
}
