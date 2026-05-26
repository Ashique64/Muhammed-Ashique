"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { CONFIG } from "@/lib/constants";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const InteractiveGlobe = dynamic(() => import("@/components/3d/InteractiveGlobe"), { ssr: false });

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
  return (
    <motion.a
      suppressHydrationWarning
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.05 }}
      className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/8 bg-surface/20 backdrop-blur-sm hover:border-violet-500/40 hover:bg-violet-900/15 transition-all duration-300 group"
    >
      <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted group-hover:text-violet-300 transition-colors">
        {social.name}
      </span>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-40 group-hover:opacity-80 transition-opacity">
        <path d="M1 7L7 1M7 1H3M7 1V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

export default function ContactSection() {
  const { socials, location } = CONFIG.about ? { socials: CONFIG.about.socials, location: CONFIG.profile.location } : { socials: [], location: "" };
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useMouseParallax(0.6);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, wire to your email service / Formspree / Resend
    const mailtoUrl = `mailto:ashiquekp64@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    window.open(mailtoUrl, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

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
          className="font-display text-5xl md:text-7xl lg:text-8xl text-highlight leading-none tracking-tight mt-3 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s Build<br />
          <span className="text-accent/35">Something.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Form + Socials ── */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Contact form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { id: "contact-name", name: "name", label: "Your name", type: "text", required: true },
                { id: "contact-email", name: "email", label: "Email address", type: "email", required: true },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label htmlFor={field.id} className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full bg-surface/10 border border-white/8 rounded-xl px-4 py-3 font-sans text-sm text-accent placeholder:text-muted/40 focus:outline-none focus:border-violet-500/50 focus:bg-violet-900/10 transition-all duration-300"
                    placeholder={field.label}
                    suppressHydrationWarning
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-surface/10 border border-white/8 rounded-xl px-4 py-3 font-sans text-sm text-accent placeholder:text-muted/40 focus:outline-none focus:border-violet-500/50 focus:bg-violet-900/10 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 w-full py-4 rounded-xl font-mono text-[10px] tracking-[0.3em] uppercase bg-violet-600 hover:bg-violet-500 text-white transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {sent ? "Message Sent ✓" : "Send Message →"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </form>

            {/* Social links */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {socials.map((s, i) => (
                <SocialIcon key={s.name} social={s} delay={i * 0.1} />
              ))}
            </div>

            {/* Location */}
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 inline-block" />
              Based in {location} — Available worldwide
            </p>
          </motion.div>

          {/* ── Right: Interactive Globe ── */}
          <motion.div
            className="flex items-center justify-center h-[420px] md:h-[520px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {!isMobile ? (
              <div className="w-full h-full relative">
                {/* Globe hint */}
                <span className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.25em] uppercase text-muted/40 z-10">
                  Move cursor to rotate
                </span>
                <Canvas
                  camera={{ position: [0, 0, 2.8], fov: 50 }}
                  dpr={[1, 2]}
                  gl={{ antialias: true, alpha: true }}
                >
                  <Suspense fallback={null}>
                    <InteractiveGlobe mouseX={mouse.x} mouseY={mouse.y} />
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
                  href="mailto:ashiquekp64@gmail.com"
                  className="font-display text-xl text-highlight hover:text-violet-300 transition-colors"
                >
                  ashiquekp64@gmail.com
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
