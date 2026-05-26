"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const LINKS = [
  { href: "/",        label: "Home"    },
  { href: "/work",    label: "Work"    },
  { href: "/about",   label: "About"   },
];

/* Section anchors for single-page active detection */
const SECTIONS = [
  { id: "hero",        label: "Home"     },
  { id: "about",       label: "About"    },
  { id: "philosophy",  label: "Mind"     },
  { id: "projects",    label: "Projects" },
  { id: "skills",      label: "Skills"   },
  { id: "contact",     label: "Contact"  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 right-6 md:top-8 md:right-10 z-50 transition-all duration-300">
      {/* ── Cohesive capsule container ── */}
      <div className="bg-surface/60 backdrop-blur-xl border border-white/8 rounded-full p-1 flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative font-mono text-[9px] tracking-[0.2em] uppercase px-4 py-2 rounded-full transition-all duration-300 select-none ${
                isActive
                  ? "text-black font-semibold"
                  : "text-muted hover:text-highlight"
              }`}
            >
              {/* Sliding active pill indicator */}
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
