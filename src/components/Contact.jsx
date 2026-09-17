"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EMAIL = "pratimasahuji108@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact-section" className="w-full max-w-3xl mx-auto px-4 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white pixel-corners text-center flex flex-col items-center justify-center p-8 sm:p-12"
      >
        <h2
          className="font-pixel text-3xl sm:text-4xl mb-4 tracking-tight uppercase text-[#f97316]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          Let&apos;s talk
        </h2>
        <p className="text-sm sm:text-base font-medium text-gray-200 max-w-lg mb-8 leading-relaxed">
          Have an idea, need a robust backend system, or want to discuss distributed architectures and APIs? My inbox is always open.
        </p>

        {/* Email display + copy */}
        <div className="flex items-center gap-3 mb-6 flex-wrap justify-center">
          <span
            className="text-gray-300 font-mono text-sm tracking-wide border border-gray-700 px-4 py-2"
            style={{ background: "#1a1a1a" }}
          >
            {EMAIL}
          </span>
          <motion.button
            id="copy-email-btn"
            onClick={handleCopy}
            whileHover={{ y: -2, boxShadow: "3px 3px 0px #f97316" }}
            whileTap={{ scale: 0.95 }}
            className="relative px-4 py-2 border-2 border-gray-600 text-gray-300 hover:border-[#f97316] hover:text-[#f97316] transition-colors font-mono text-xs font-bold overflow-hidden"
            style={{ boxShadow: "2px 2px 0px #333", minWidth: "90px" }}
            aria-label="Copy email address"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-green-400 flex items-center gap-1"
                >
                  ✓ Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  [ Copy ]
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Push to inbox CTA */}
        <motion.a
          href={`mailto:${EMAIL}`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95, y: 0 }}
          className="inline-flex items-center justify-center bg-[#f97316] text-black font-pixel text-[10px] sm:text-[12px] px-8 py-4 uppercase tracking-widest border-2 border-[#f97316] hover:bg-black hover:text-[#f97316] transition-colors"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            boxShadow: "4px 4px 0px rgba(249,115,22,0.5)",
          }}
        >
          Push to Inbox
        </motion.a>
      </motion.div>
    </section>
  );
}
