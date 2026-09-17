"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  "NODE.JS",
  "TYPESCRIPT",
  "POSTGRESQL",
  "MONGODB",
  "REDIS",
  "BULLMQ",
  "WEBSOCKETS",
  "DOCKER",
  "EXPRESS.JS",
  "SYSTEM DESIGN",
  "REST APIS",
  "MICROSERVICES"
];

export default function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <section 
      className="w-full overflow-hidden border-y-4 border-black bg-[#f97316] py-3 sm:py-4 my-12 select-none"
      style={{
        transform: "rotate(-1deg) scale(1.02)",
        boxShadow: "0px 8px 0px rgba(17,17,17,0.15)",
      }}
    >
      <div className="flex w-max animate-marquee shadow-inner">
        {items.map((tech, i) => (
          <div key={i} className="flex items-center">
            <span 
              className="font-pixel text-black text-[10px] sm:text-[12px] px-6" 
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {tech}
            </span>
            <span className="text-black text-xs sm:text-sm px-2 font-bold opacity-70">
              ///
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
