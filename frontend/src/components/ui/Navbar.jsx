"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CONFIG } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();

  // Dynamically generate initials from CONFIG name
  const initials = CONFIG.profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex items-center justify-between pointer-events-none"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic Brand Logo */}
      <Link
        href="/"
        className="font-mono text-sm tracking-widest text-accent hover:text-highlight transition-colors pointer-events-auto mix-blend-difference"
      >
        {initials}
      </Link>

      {/* Floating Glass Navigation Pill */}
      <nav className="flex items-center gap-1 bg-surface/30 backdrop-blur-lg px-2.5 py-1.5 rounded-full border border-white/5 pointer-events-auto shadow-2xl">
        {navLinks.map((link) => {
          // Precise active route matching
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-1.5 font-mono text-[10px] md:text-xs tracking-widest uppercase text-muted hover:text-accent transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-indicator"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={isActive ? "text-highlight font-semibold" : ""}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
