"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 sm:h-[4px] z-[99999999] origin-left pointer-events-none"
      style={{ 
        scaleX,
        background: "#f97316",
        boxShadow: "0px 2px 4px rgba(249,115,22,0.4)"
      }}
    />
  );
}
