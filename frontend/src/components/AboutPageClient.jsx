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

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full w-full pointer-events-none gap-3 py-2">
          {/* Centered brand icon */}
          {IconComponent && (
            <IconComponent
              size={24}
              style={{
                "--brand-color": color,
              }}
              className="text-muted/40 group-hover:text-(--brand-color) group-hover:drop-shadow-[0_0_8px_var(--brand-color)] group-hover:scale-110 transition-all duration-300"
            />
          )}

          {/* Centered brand name and arrow */}
          <div className="font-sans text-xs md:text-sm text-highlight font-semibold flex items-center justify-center gap-1.5 group-hover:text-highlight transition-colors duration-300 w-full">
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.name}</span>
            <span className="text-[11px] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 font-normal">
              ↗
            </span>
          </div>
        </div>
      </motion.a>
    </div>
  );
}

export default function AboutPageClient({ bio, socials, photo }) {
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
        {/* Left Column: Profile Photo */}
        <div className="col-span-1 md:col-span-5 flex justify-center w-full">
          <div className="w-full aspect-4/5 max-w-sm rounded-2xl border border-white/5 bg-surface/20 relative overflow-hidden group shadow-2xl">
            {/* Top-right & bottom-left background glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[30px] group-hover:scale-110 transition-transform duration-700" />

            {/* Profile Image with subtle zoom and black/white-to-color transition */}
            <img
              src={photo || "/avatar.jpg"}
              alt="Muhammed Ashique"
              className="w-full h-full object-cover filter grayscale-20 contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out relative z-10"
            />

            {/* Premium glass border glow */}
            <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl border border-white/10 group-hover:border-indigo-500/30 transition-colors duration-500" />
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
