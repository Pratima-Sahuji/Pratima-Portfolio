"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GitHubGraph() {
  return (
    <section id="github" className="w-full max-w-4xl mx-auto px-4 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-sm font-bold uppercase tracking-widest text-gray-700"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
          >
            GitHub Activity
          </h2>
          <a
            href="https://github.com/Pratima-Sahuji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-bold uppercase tracking-widest text-[#f97316] hover:underline"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            @Pratima-Sahuji ↗
          </a>
        </div>

        {/* Graph card */}
        <div
          className="border-2 border-black bg-white p-5 overflow-hidden"
          style={{ boxShadow: "4px 4px 0px #111" }}
        >
          {/* Contribution chart */}
          <div className="w-full overflow-x-auto">
            <img
              src="https://ghchart.rshah.org/f97316/Pratima-Sahuji"
              alt="Pratima's GitHub contribution graph"
              className="w-full h-auto"
              style={{
                width: "100%",
                height: "auto",
                imageRendering: "pixelated",
                filter: "contrast(1.1)",
              }}
            />
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-3">
            <span className="text-[9px] text-gray-400 font-medium">Less</span>
            {["opacity-20", "opacity-40", "opacity-60", "opacity-80", "opacity-100"].map(
              (op, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 border border-black bg-[#f97316] ${op}`}
                />
              )
            )}
            <span className="text-[9px] text-gray-400 font-medium">More</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
