"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const LINKS = [
  { href: "/",      label: "Home"  },
  { href: "/work",  label: "Work"  },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 right-0 z-50 flex items-center gap-2 pr-8 pt-6 md:pr-10 md:pt-7">
      {LINKS.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`
              relative font-mono text-xs tracking-widest px-4 py-1.5 rounded-full transition-colors duration-200
              ${isActive
                ? "text-highlight border border-white/30 bg-transparent"
                : "text-muted hover:text-accent border border-transparent"
              }
            `}
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full border border-white/30"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
