"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { CONFIG } from "@/lib/constants";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { FaLinkedin, FaEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa";

const DeveloperCore = dynamic(() => import("@/components/3d/DeveloperCore"), { ssr: false });

/* ── Animated grid background ── */
function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(79,70,229,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,70,229,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }}
    />
  );
}

/* ── Floating social icon card ── */
function SocialIcon({ social, delay }) {
  const isMailto = social.url.startsWith("mailto:");
  const isTel = social.url.startsWith("tel:");

  // Map configuration icons to FaBrand components
  const IconComponent = {
    linkedin: FaLinkedin,
    email: FaEnvelope,
    whatsapp: FaWhatsapp,
    phone: FaPhone,
  }[social.icon];

  return (
    <motion.a
      suppressHydrationWarning
      href={social.url}
      target={isMailto || isTel ? undefined : "_blank"}
      rel={isMailto || isTel ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.05 }}
      className="flex items-center gap-3.5 px-6 py-4 rounded-full border border-white/8 bg-surface/20 backdrop-blur-sm hover:border-violet-500/40 hover:bg-violet-900/15 transition-all duration-300 group"
    >
      {IconComponent && (
        <IconComponent 
          size={16} 
          className="text-muted group-hover:text-violet-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(167,139,250,0.4)] transition-all duration-300"
        />
      )}
      <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-muted group-hover:text-violet-300 transition-colors">
        {social.name}
      </span>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-40 group-hover:opacity-80 transition-opacity">
        <path d="M1 7L7 1M7 1H3M7 1V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

export default function ContactSection() {
  const location = CONFIG.profile?.location || "";
  const socials = CONFIG.about?.socials
    ? CONFIG.about.socials.filter((s) => s.name !== "GitHub")
    : [];
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useMouseParallax(0.6);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-bg border-t border-white/5 py-24 md:py-32 px-6 md:px-12 overflow-hidden flex flex-col justify-center"
    >
      <GridBackground />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 75% 50%, rgba(67,56,202,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.span
          className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          06 — Contact
        </motion.span>
        <motion.h2
          className="font-display text-5xl md:text-6xl lg:text-7xl text-highlight leading-none tracking-tight mt-3 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s Build<br />
          <span className="text-accent/35">Something.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Socials & Context ── */}
          <motion.div
            className="flex flex-col gap-10 lg:pr-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-6">
              <p className="font-sans text-base leading-relaxed text-accent/70">
                I am always open to discussing new projects, creative collaborations, or opportunities to be part of your digital visions. Let's start a conversation.
              </p>
              <p className="font-mono text-xs text-muted leading-relaxed uppercase tracking-wider">
                Select a channel below to establish direct communication.
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
              {socials.map((s, i) => (
                <SocialIcon key={s.name} social={s} delay={i * 0.1} />
              ))}
            </div>

            {/* Location */}
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted/50 flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 inline-block" />
              Based in {location} — Available worldwide
            </p>
          </motion.div>

          {/* ── Right: Interactive 3D Developer Core ── */}
          <motion.div
            className="flex items-center justify-center h-[420px] md:h-[520px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {!isMobile ? (
              <div className="w-full h-full relative">
                <Canvas
                  camera={{ position: [0, 0, 2.8], fov: 50 }}
                  dpr={[1, 2]}
                  gl={{ antialias: true, alpha: true }}
                >
                  <Suspense fallback={null}>
                    <DeveloperCore mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
                  </Suspense>
                </Canvas>
              </div>
            ) : (
              /* Mobile: email CTA instead of globe */
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full border border-violet-500/30 bg-violet-900/10 flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
                  {location}
                </p>
                <a
                  href="mailto:ashique200899@gmail.com"
                  className="font-display text-xl text-highlight hover:text-violet-300 transition-colors"
                >
                  ashique200899@gmail.com
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
