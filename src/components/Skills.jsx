"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COMMANDS = {
  help: () => [
    { text: "Available commands:", color: "text-[#f97316]" },
    { text: "  whoami          → about me" },
    { text: "  ls              → list projects" },
    { text: "  cat skills.txt  → my tech stack" },
    { text: "  cat resume.txt  → quick resume summary" },
    { text: "  open github     → open GitHub profile" },
    { text: "  open linkedin   → open LinkedIn profile" },
    { text: "  clear           → clear terminal" },
    { text: "  help            → show this menu" },
  ],
  whoami: () => [
    { text: "Pratima Sahuji", color: "text-white" },
    { text: "Backend Developer" },
    { text: "I build systems that don't break —" },
    { text: "APIs, databases, authentication, real-time & event-driven architectures." },
    { text: "Currently open to backend engineering opportunities.", color: "text-green-400" },
  ],
  ls: () => [
    { text: "projects/", color: "text-[#f97316]" },
    { text: "  ├── crypto-portfolio  (WebSocket price tracking & alert queues)" },
    { text: "  ├── notify-flow       (Event-driven notification pipeline with BullMQ)" },
    { text: "  └── ai-assistant      (RAG document QA system)" },
  ],
  "cat skills.txt": () => [
    { text: "Loading core dependencies...", color: "text-green-400" },
    { text: "  ▶ Node.js / TypeScript / JavaScript" },
    { text: "  ▶ Express.js / REST APIs / WebSockets" },
    { text: "  ▶ PostgreSQL / MongoDB" },
    { text: "  ▶ Redis / BullMQ / Microservices" },
    { text: "  ▶ Docker / Event-Driven Architectures" },
    { text: "[OK] Stack loaded successfully", color: "text-green-400" },
  ],
  "cat resume.txt": () => [
    { text: "=== PRATIMA — BACKEND DEVELOPER ===", color: "text-[#f97316]" },
    { text: "Stack     : Node.js, TypeScript, PostgreSQL, Redis, Docker, BullMQ" },
    { text: "Projects  : 3 production-grade backend systems" },
    { text: "Focus     : Scalability, Real-time, Event-driven architecture" },
    { text: "Contact   : pratimasahuji108@gmail.com" },
    { text: "GitHub    : github.com/Pratima-Sahuji" },
    { text: "LinkedIn  : linkedin.com/in/pratima-sahuji-b43458294/" },
  ],
  "open github": () => {
    if (typeof window !== "undefined") window.open("https://github.com/Pratima-Sahuji", "_blank");
    return [{ text: "Opening github.com/Pratima-Sahuji...", color: "text-green-400" }];
  },
  "open linkedin": () => {
    if (typeof window !== "undefined") window.open("https://www.linkedin.com/in/pratima-sahuji-b43458294/", "_blank");
    return [{ text: "Opening linkedin.com/in/pratima-sahuji-b43458294/...", color: "text-green-400" }];
  },
};

const BOOT_LINES = [
  { text: "pratima-os v1.0.0 — backend.kernel loaded", color: "text-green-400" },
  { text: 'Type "help" to see available commands.', color: "text-gray-400" },
  { text: "" },
];

export default function Skills() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setCmdHistory((p) => [raw, ...p]);
      setCmdIndex(-1);
      return;
    }

    const handler = COMMANDS[cmd];
    const output = handler
      ? handler()
      : [{ text: `command not found: ${cmd}. Type "help" for commands.`, color: "text-red-400" }];

    setHistory((h) => [...h, { cmd: raw, output }]);
    setCmdHistory((p) => [raw, ...p]);
    setCmdIndex(-1);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section id="skills" className="w-full max-w-3xl mx-auto px-4 mt-12 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full bg-black border-4 border-black"
        style={{ boxShadow: "6px 6px 0px #f97316" }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-[#111] border-b-2 border-[#222] px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 bg-[#ff5f56] rounded-full border border-black shadow-[1px_1px_0_#000]" />
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full border border-black shadow-[1px_1px_0_#000]" />
          <div className="w-3 h-3 bg-[#27c93f] rounded-full border border-black shadow-[1px_1px_0_#000]" />
          <span
            className="text-gray-400 ml-4 tracking-widest uppercase"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px" }}
          >
            pratima@server:~ — interactive
          </span>
          <span className="ml-auto text-[8px] text-gray-600 hidden sm:block" style={{ fontFamily: "monospace" }}>
            Tab to autocomplete · ↑↓ history
          </span>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="p-5 sm:p-6 font-mono text-[11px] sm:text-[12px] leading-relaxed overflow-y-auto"
          style={{ minHeight: "260px", maxHeight: "420px" }}
        >
          {BOOT_LINES.map((line, i) => (
            <p key={`boot-${i}`} className={line.color ?? "text-gray-400"}>
              {line.text || "\u00A0"}
            </p>
          ))}

          {history.map((entry, i) => (
            <div key={i} className="mb-1">
              <p>
                <span className="text-[#f97316] mr-2">pratima@server:~$</span>
                <span className="text-white">{entry.cmd}</span>
              </p>
              {entry.output.map((line, j) => (
                <p key={j} className={line.color ?? "text-gray-300"}>
                  {line.text || "\u00A0"}
                </p>
              ))}
              <p className="text-transparent select-none">&nbsp;</p>
            </div>
          ))}

          <div className="flex items-center">
            <span className="text-[#f97316] mr-2 shrink-0">pratima@server:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-[#f97316] font-mono text-[11px] sm:text-[12px]"
              style={{ caretColor: "#f97316" }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
            {input === "" && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-2 h-4 bg-[#f97316] ml-0.5"
              />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
