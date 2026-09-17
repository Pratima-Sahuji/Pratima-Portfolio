"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const bioText = "I'm Pratima — a backend developer who builds the systems behind the experience. APIs, databases, authentication, real-time features, and the logic that keeps applications running smoothly.";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const typeNextChar = () => {
      setDisplayedText(bioText.slice(0, i + 1));
      i++;
      if (i < bioText.length) {
        setTimeout(typeNextChar, Math.random() * 25 + 25);
      } else {
        setIsTyping(false);
      }
    };
    
    const timeoutId = setTimeout(typeNextChar, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section
      id="hero"
      className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-3 mt-6"
    >
      {/* Hero portrait card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="retro-card overflow-hidden"
        style={{ boxShadow: "6px 6px 0px #111111" }}
      >
        {/* Halftone portrait — real photo */}
        <div
          className="halftone-photo w-full"
          style={{ minHeight: "460px", maxHeight: "540px", background: "#e4cca6" }}
        >
          <img
            src="/profile.jpg"
            alt="Pratima — Backend Developer portrait"
            className="w-full h-full object-cover"
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              objectPosition: "center 30%",
            }}
          />
        </div>

        {/* Caption */}
        <div className="px-5 py-3 border-t border-black bg-white">
          <p className="text-sm italic text-gray-700 text-center font-medium">
            &ldquo;I build systems that don&apos;t break.&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Bio card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="retro-card px-6 py-5 bg-white"
      >
        <p className="text-base text-gray-800 leading-relaxed mb-2 font-medium">
          {displayedText}
          <span 
            className={`inline-block w-2.5 h-[1.1em] align-middle ml-1 bg-[#f97316] ${isTyping ? "opacity-100" : "animate-pulse"}`}
            aria-hidden="true"
          />
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          Explore my{" "}
          <Link
            href="#works"
            id="hero-works-link"
            className="text-[#f97316] font-semibold underline underline-offset-2 hover:text-orange-700 transition-colors"
          >
            selected works
          </Link>{" "}
          to see what I&apos;ve built.
        </p>
      </motion.div>
    </section>
  );
}
