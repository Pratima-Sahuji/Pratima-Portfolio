"use client";

import { motion } from "framer-motion";

const socials = [
  {
    id: "footer-github",
    label: "GitHub",
    href: "https://github.com/Pratima-Sahuji",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.202 2.392.1 2.646.64.698 1.028 1.59 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    id: "footer-linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pratima-sahuji-b43458294/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: "footer-email",
    label: "Email",
    href: "mailto:pratimasahuji108@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="0"/>
        <path d="M2 4l10 9 10-9"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full max-w-3xl mx-auto px-4 mt-12 mb-10 flex flex-col items-center gap-6">
      {/* Divider */}
      <div className="w-full border-t-2 border-black" />

      {/* Social icons */}
      <div className="flex items-center gap-4">
        {socials.map((s) => (
          <motion.a
            key={s.id}
            id={s.id}
            href={s.href}
            target={s.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.label}
            whileHover={{ y: -3, boxShadow: "3px 3px 0px #111" }}
            className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white text-black hover:bg-black hover:text-[#f97316] transition-colors"
            style={{ boxShadow: "2px 2px 0px #111" }}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>

      {/* Copyright */}
      <p
        className="text-[8px] sm:text-[9px] text-gray-700 uppercase tracking-widest text-center font-bold"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        Built by Pratima Sahuji · 2026
      </p>
    </footer>
  );
}
