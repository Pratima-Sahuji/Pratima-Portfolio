"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { target: 70, prefix: "", suffix: "%", label: "API Call Reduction", desc: "Redis caching with TTL slashing polling overhead" },
  { target: 2000, prefix: "", suffix: "+", label: "Events / Min Throughput", desc: "Event-driven BullMQ notification pipelines" },
  { target: 100, prefix: "<", suffix: "ms", label: "P99 Delivery Latency", desc: "Sub-100ms real-time WebSocket & FCM push" },
];

function AnimatedNumber({ target, prefix = "", suffix = "" }) {
  const count = useMotionValue(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const rounded = useTransform(count, (v) => `${prefix}${Math.floor(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 1.8,
      ease: "easeOut",
    });
    return controls.stop;
  }, [inView, count, target, prefix, suffix]);

  return (
    <motion.p
      ref={ref}
      className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-2 tracking-tight text-black"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {rounded}
    </motion.p>
  );
}

export default function Stats() {
  return (
    <section id="results" className="w-full max-w-4xl mx-auto px-4 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="retro-card p-6 sm:p-8 bg-white border-2 border-black"
        style={{ boxShadow: "6px 6px 0px #111" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="font-pixel text-[10px] uppercase tracking-widest px-2.5 py-1 bg-black text-[#f97316]">
            03 // Proven Impact
          </span>
          <h3 className="font-pixel text-xs sm:text-sm text-black tracking-wide ml-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            Key Architecture Metrics
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200 pt-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className={`text-center flex flex-col items-center justify-between ${i !== 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}
            >
              <AnimatedNumber target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="text-xs text-black font-bold uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[220px]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
