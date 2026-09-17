"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

/* ── SVG visuals ── */
const CryptoVisual = () => (
  <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden pointer-events-none opacity-40">
    <svg viewBox="0 0 200 300" width="100%" height="100%" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="300" fill="transparent" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={`h${i}`} x1="0" y1={30 + i * 40} x2="200" y2={30 + i * 40} stroke="#111" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      ))}
      <path d="M 0 220 Q 30 140, 60 170 T 120 90 T 160 120 T 200 40" fill="none" stroke="#111" strokeWidth="3" />
      <circle cx="60" cy="170" r="4" fill="#111" />
      <circle cx="120" cy="90" r="4" fill="#111" />
      <circle cx="160" cy="120" r="4" fill="#111" />
      <circle cx="200" cy="40" r="5" fill="#111" />
    </svg>
  </div>
);

const NotifyFlowVisual = () => (
  <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
    <svg viewBox="0 0 250 200" width="100%" height="100%" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="250" height="200" fill="#ffffff" />
      {[0, 1, 2, 3, 4].map(i => (
        <line key={`h${i}`} x1="0" y1={25 + i * 35} x2="250" y2={25 + i * 35} stroke="#f97316" strokeWidth="0.8" opacity="0.4" />
      ))}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={`v${i}`} x1={20 + i * 40} y1="0" x2={20 + i * 40} y2="200" stroke="#f97316" strokeWidth="0.8" opacity="0.4" />
      ))}
      {[[20, 25], [60, 60], [100, 25], [140, 95], [180, 60], [220, 130]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#f97316" opacity="0.85" />
      ))}
      <path d="M 20 25 L 60 60 L 100 25 L 140 95 L 180 60 L 220 130" fill="none" stroke="#f97316" strokeWidth="2.5" />
      <polygon points="215,120 225,130 215,140" fill="#f97316" />
    </svg>
  </div>
);

const RAGVisual = () => (
  <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
    <svg viewBox="0 0 300 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {[[30, 40], [30, 100], [30, 160], [110, 20], [110, 80], [110, 140], [110, 180], [200, 60], [200, 120], [270, 90]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="8" fill="#f97316" opacity="0.9" />
      ))}
      {[
        [30, 40, 110, 20], [30, 40, 110, 80], [30, 100, 110, 80], [30, 100, 110, 140], [30, 160, 110, 140], [30, 160, 110, 180],
        [110, 20, 200, 60], [110, 80, 200, 60], [110, 80, 200, 120], [110, 140, 200, 120], [110, 180, 200, 120],
        [200, 60, 270, 90], [200, 120, 270, 90]
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f97316" strokeWidth="1.5" opacity="0.35" />
      ))}
    </svg>
  </div>
);

const PROJECT_DETAILS = {
  crypto: {
    title: "Crypto Portfolio Alert System",
    tag: "Fintech",
    tech: ["Node.js", "Express.js", "MongoDB", "WebSockets", "Redis", "Docker", "SendGrid"],
    desc: [
      "Built a real-time cryptocurrency portfolio tracking backend with live WebSocket notifications and automated email alerts for user-defined price thresholds.",
      "Designed a robust FIFO-based profit/loss calculation engine supporting multi-transaction portfolio analytics and unlimited cryptocurrency pairs.",
      "Implemented Redis caching with TTL to cache active tickers and order books, reducing external API calls by 70%, while containerizing the backend using Docker for efficient polling workers."
    ],
    github: "https://github.com/Pratima-Sahuji",
    live: null,
    theme: "#f97316"
  },
  notifyflow: {
    title: "NotifyFlow API",
    tag: "Backend Infrastructure",
    tech: ["TypeScript", "Node.js", "PostgreSQL", "BullMQ", "Redis", "WebSockets"],
    desc: [
      "Designed an event-driven notification routing service processing 2K+ notification events/min across Chat, Group, Community, and time-sensitive Alert events.",
      "Built a high-performance BullMQ + Redis notification pipeline sustaining 1K+ jobs/sec with 4 concurrent workers, exponential backoff retries, and priority queues.",
      "Implemented hybrid WebSocket + FCM push architecture achieving sub-100ms p99 event-to-client latency for connected clients with reliable fallback for background devices.",
      "Engineered multi-device delivery supporting 500+ registered devices with PostgreSQL-backed notification history, token lifecycle management, and context-aware deep links."
    ],
    github: "https://github.com/Pratima-Sahuji",
    live: null,
    theme: "#ffffff"
  },
  rag: {
    title: "AI Knowledge Assistant (RAG)",
    tag: "AI Infrastructure / RAG",
    tech: ["Node.js", "React.js", "OpenAI API", "Pinecone", "LangChain", "Docker"],
    desc: [
      "Built a full-stack AI-powered system enabling document-based contextual Q&A using Retrieval-Augmented Generation.",
      "Implemented a high-throughput document ingestion pipeline with intelligent chunking, embedding generation, and vector storage in Pinecone for semantic retrieval.",
      "Designed REST APIs integrating OpenAI LLM with top-K similarity search to generate accurate, source-grounded responses.",
      "Optimized response quality through prompt engineering and retrieval tuning, significantly improving contextual accuracy and reducing hallucinations."
    ],
    github: "https://github.com/Pratima-Sahuji",
    live: null,
    theme: "#111111"
  }
};

export default function Works() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selected]);

  const activeData = selected ? PROJECT_DETAILS[selected] : null;

  return (
    <section id="works" className="w-full max-w-4xl mx-auto px-4 mt-16 relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-pixel text-center text-4xl sm:text-5xl md:text-6xl mb-10 tracking-tight leading-tight select-none"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        Works
      </motion.h2>

      {/* Row 1: Crypto (1 col) + NotifyFlow (2 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {/* Project 1: Crypto Portfolio */}
        <motion.div
          onClick={() => setSelected("crypto")}
          custom={0}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: "7px 7px 0px #111" }}
          className="relative overflow-hidden border-2 border-black cursor-pointer flex flex-col justify-between"
          style={{ background: "#f97316", boxShadow: "4px 4px 0px #111", minHeight: "220px" }}
        >
          <div className="p-5 flex flex-col justify-between h-full pointer-events-none relative z-10">
            <div>
              <span className="text-[10px] font-bold px-2 py-1 bg-black text-white border border-black">Fintech</span>
              <h3 className="font-pixel text-black text-sm mt-4 leading-snug" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                Crypto Alert System
              </h3>
              <p className="text-[11px] font-medium mt-2 text-black opacity-85 leading-relaxed">
                Real-time crypto tracker with WebSocket updates, FIFO P&L engine, and Redis alert queues
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {PROJECT_DETAILS.crypto.tech.slice(0, 4).map(tag => (
                <span key={tag} className="text-[8px] font-bold px-2 py-0.5 bg-black text-[#f97316] border border-black" style={{ fontFamily: "monospace" }}>{tag}</span>
              ))}
            </div>
          </div>
          <CryptoVisual />
        </motion.div>

        {/* Project 2: NotifyFlow */}
        <motion.div
          onClick={() => setSelected("notifyflow")}
          custom={1}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: "7px 7px 0px #111" }}
          className="relative overflow-hidden border-2 border-black cursor-pointer md:col-span-2 flex flex-col justify-between"
          style={{ background: "#ffffff", boxShadow: "4px 4px 0px #111", minHeight: "220px" }}
        >
          <div className="p-5 relative z-10 pointer-events-none" style={{ paddingRight: "35%" }}>
            <span className="text-[10px] font-bold px-2 py-1 bg-[#f97316] text-white border border-black">Backend Infrastructure</span>
            <h3 className="font-pixel text-xl sm:text-2xl mt-4 leading-snug text-black" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              NotifyFlow API
            </h3>
            <p className="text-[11px] font-medium mt-2 text-gray-600 leading-relaxed">
              Event-driven notification service with BullMQ worker pools, priority queues, and sub-100ms WebSocket/FCM delivery
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {PROJECT_DETAILS.notifyflow.tech.map(tag => (
                <span key={tag} className="text-[8px] font-bold px-2 py-0.5 bg-black text-white border border-black" style={{ fontFamily: "monospace" }}>{tag}</span>
              ))}
            </div>
          </div>
          <NotifyFlowVisual />
        </motion.div>
      </div>

      {/* Row 2: AI Knowledge Assistant (Full width / 3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <motion.div
          onClick={() => setSelected("rag")}
          custom={2}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: "7px 7px 0px #111" }}
          className="relative overflow-hidden border-2 border-black cursor-pointer md:col-span-3 flex flex-col justify-between"
          style={{ background: "#111111", boxShadow: "4px 4px 0px #111", minHeight: "200px" }}
        >
          <RAGVisual />
          <div className="p-5 sm:p-6 relative z-10 pointer-events-none flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-bold px-2 py-1 bg-[#f97316] text-white border border-[#f97316]">AI Infrastructure / RAG</span>
              <h3 className="font-pixel text-white text-lg sm:text-xl mt-4 leading-snug" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                AI Knowledge Assistant (RAG)
              </h3>
              <p className="text-[11px] sm:text-xs font-medium mt-2 text-gray-300 leading-relaxed max-w-2xl">
                Document contextual Q&A system using vector embeddings, Pinecone top-K similarity search, LangChain pipelines, and OpenAI LLM integration
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {PROJECT_DETAILS.rag.tech.map(tag => (
                <span key={tag} className="text-[8px] font-bold px-2 py-0.5 bg-[#f97316] text-black border border-[#f97316]" style={{ fontFamily: "monospace" }}>{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* GitHub CTA button */}
      <div className="flex flex-col items-center justify-center gap-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-700 font-medium text-sm select-none">Want to see more code on GitHub?</p>
          <motion.a
            id="view-all-works-btn"
            href="https://github.com/Pratima-Sahuji"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, boxShadow: "4px 4px 0px #111" }}
            className="bg-black text-white text-xs font-semibold px-6 py-3 border border-black hover:bg-[#222] transition-all"
            style={{ boxShadow: "3px 3px 0px #555" }}
          >
            View all my work
          </motion.a>
        </motion.div>
      </div>

      {/* ── Project Details Modal ── */}
      <AnimatePresence>
        {selected && activeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.65)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#d6d9c1] border-2 border-black flex flex-col relative"
              style={{ boxShadow: "8px 8px 0px #111", maxHeight: "90vh" }}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b-2 border-black"
                style={{ background: activeData.theme }}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="font-pixel text-lg sm:text-xl tracking-tight" 
                    style={{ 
                      fontFamily: "'Press Start 2P', monospace", 
                      color: activeData.theme === "#111111" ? "#ffffff" : "#000000" 
                    }}
                  >
                    {activeData.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-[#f97316] transition-colors"
                  style={{ boxShadow: "2px 2px 0px #111" }}
                  aria-label="Close modal"
                >
                  <span className="font-bold pb-0.5 text-black">×</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto" style={{ background: "white" }}>
                <span className="text-[10px] uppercase font-bold px-2 py-1 bg-black text-white border border-black mb-6 inline-block tracking-widest leading-none">
                  {activeData.tag}
                </span>

                <div className="space-y-4 mb-8">
                  {activeData.desc.map((p, i) => (
                    <p key={i} className="text-gray-800 text-sm md:text-base leading-relaxed tracking-wide font-medium">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-3 border-b-2 border-gray-100 pb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeData.tech.map(tag => (
                      <span key={`modal-tag-${tag}`} className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-black border border-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer / Actions */}
              <div className="p-5 border-t-2 border-black bg-gray-50 flex gap-4">
                {activeData.github && (
                  <a
                    href={activeData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-bold text-xs uppercase tracking-widest py-3 border-2 border-black bg-black text-white hover:bg-[#f97316] hover:text-black transition-colors"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px" }}
                  >
                    Github
                  </a>
                )}
                {activeData.live ? (
                  <a
                    href={activeData.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-bold text-xs uppercase tracking-widest py-3 border-2 border-black bg-white text-black hover:bg-green-400 transition-colors"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", boxShadow: "3px 3px 0px #111" }}
                  >
                    Live Link
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 text-center font-bold text-xs uppercase tracking-widest py-3 border-2 border-black bg-gray-200 text-gray-500 cursor-not-allowed"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", boxShadow: "3px 3px 0px #111" }}
                  >
                    Source on GitHub
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
