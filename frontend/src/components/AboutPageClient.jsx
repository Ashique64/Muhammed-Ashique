"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

function SocialConnectCard({ link, delay }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D yaw and pitch transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Spotlight coordinate vectors
  const lightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const lightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  // Brand-coded styles & assets configurations
  const brandConfig = {
    github: {
      color: "#ffffff",
      rgbaColor: "255, 255, 255",
      icon: FaGithub,
    },
    linkedin: {
      color: "#0a66c2",
      rgbaColor: "10, 102, 194",
      icon: FaLinkedin,
    },
    email: {
      color: "#a78bfa",
      rgbaColor: "167, 139, 250",
      icon: FaEnvelope,
    },
    whatsapp: {
      color: "#25d366",
      rgbaColor: "37, 211, 102",
      icon: FaWhatsapp,
    },
    phone: {
      color: "#facc15",
      rgbaColor: "250, 204, 21",
      icon: FaPhone,
    },
  }[link.icon] || {
    color: "#ffffff",
    rgbaColor: "255, 255, 255",
    icon: FaEnvelope,
  };

  const IconComponent = brandConfig.icon;
  const color = brandConfig.color;
  const rgbaColor = brandConfig.rgbaColor;

  return (
    <div style={{ perspective: 1000 }}>
      <motion.a
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        suppressHydrationWarning
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{
          y: -4,
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col p-5 border border-white/5 bg-surface/15 hover:bg-white/1.5 rounded-xl transition-all duration-300 group shadow-md relative overflow-hidden cursor-pointer"
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([x, y]) =>
                `radial-gradient(200px circle at ${x} ${y}, rgba(${rgbaColor}, 0.08), transparent 70%)`
            ),
          }}
        />

        {/* Hover Border Halo in Brand Color */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-xl"
          style={{ boxShadow: `inset 0 0 0 1px ${color}22` }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full w-full pointer-events-none">
          {/* Top row: brand icon */}
          <div className="flex items-center w-full">
            {IconComponent && (
              <IconComponent
                size={18}
                style={{
                  "--brand-color": color,
                }}
                className="text-muted/40 group-hover:text-[var(--brand-color)] group-hover:drop-shadow-[0_0_6px_var(--brand-color)] group-hover:scale-110 transition-all duration-300"
              />
            )}
          </div>

          {/* Bottom row: brand name and arrow */}
          <div className="font-sans text-xs md:text-sm text-highlight font-semibold mt-8 group-hover:translate-x-1.5 transition-transform duration-300 flex items-center justify-between w-full">
            <span>{link.name}</span>
            <span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity font-normal pr-1">
              &nearr;
            </span>
          </div>
        </div>
      </motion.a>
    </div>
  );
}

export default function AboutPageClient({ bio, socials }) {
  return (
    <div className="max-w-4xl w-full flex flex-col relative z-10">
      {/* Headline block */}
      <div className="mb-16 md:mb-24 flex flex-col items-start border-b border-white/5 pb-12 select-none">
        <span className="font-mono text-[9px] tracking-[0.35em] text-muted uppercase">
          The Mind &amp; Philosophy
        </span>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-highlight leading-none tracking-tight mt-4">
          About Me<span className="text-accent/40">.</span>
        </h1>
      </div>

      {/* 2-Column Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Left Column: SVG Graphic */}
        <div className="col-span-1 md:col-span-5 flex justify-center w-full">
          <div className="w-full aspect-[4/5] max-w-sm rounded-2xl border border-white/5 bg-surface/20 relative overflow-hidden flex flex-col items-center justify-center group shadow-2xl">
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/[0.03] rounded-full blur-[40px] group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.01] rounded-full blur-[30px] group-hover:scale-110 transition-transform duration-700" />

            <svg
              viewBox="0 0 200 200"
              className="w-40 h-40 opacity-60 group-hover:opacity-90 transition-all duration-700 relative z-10 scale-95 group-hover:scale-100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="rgba(232,232,232,0.06)"
                strokeWidth="1"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                stroke="rgba(232,232,232,0.1)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <path
                d="M50 100 L150 100"
                stroke="rgba(232,232,232,0.12)"
                strokeWidth="0.75"
              />
              <path
                d="M100 50 L100 150"
                stroke="rgba(232,232,232,0.12)"
                strokeWidth="0.75"
              />
              <circle cx="100" cy="100" r="6" fill="rgba(255,255,255,0.95)" />
              <circle cx="50" cy="100" r="2.5" fill="rgba(232,232,232,0.4)" />
              <circle cx="150" cy="100" r="2.5" fill="rgba(232,232,232,0.4)" />
              <circle cx="100" cy="50" r="2.5" fill="rgba(232,232,232,0.4)" />
              <circle cx="100" cy="150" r="2.5" fill="rgba(232,232,232,0.4)" />
            </svg>

            <div className="absolute bottom-6 left-6 right-6 bg-surface/60 backdrop-blur-md border border-white/5 px-4 py-3 rounded-lg text-center shadow-lg select-none">
              <span className="font-mono text-[9px] tracking-widest text-highlight uppercase font-semibold">
                SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-start gap-8">
          {bio.map((paragraph, idx) => (
            <p
              key={idx}
              className="font-sans text-xs md:text-sm leading-relaxed text-accent/80 font-light hover:text-highlight transition-colors duration-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Let's Connect */}
      <div className="mt-24 md:mt-36 border-t border-white/5 pt-16 flex flex-col items-start w-full">
        <span className="font-mono text-[9px] tracking-[0.35em] text-muted uppercase">
          Connections &amp; Channels
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-highlight mt-4 mb-10 select-none">
          Let&apos;s connect<span className="text-accent/40">.</span>
        </h2>

        {/* Social Interactive Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {socials.map((link, idx) => (
            <SocialConnectCard key={link.name} link={link} delay={idx * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
}
