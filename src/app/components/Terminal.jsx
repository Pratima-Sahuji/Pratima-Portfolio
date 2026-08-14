"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Terminal.module.css";

const COMMANDS = {
  help: () => [
    { text: "Available commands:", color: "var(--primary)" },
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
    { text: "Pratima Sahuji", color: "#fff" },
    { text: "Backend Developer" },
    { text: "I build systems that don't break — APIs, databases," },
    { text: "authentication, and real-time event-driven architectures." },
    { text: "Currently open to new opportunities.", color: "#4ade80" },
  ],
  ls: () => [
    { text: "projects/", color: "var(--primary)" },
    { text: "  ├── crypto-portfolio  (WebSocket price tracking)" },
    { text: "  ├── notify-flow       (Event-driven notification pipeline)" },
    { text: "  └── ai-assistant      (RAG document QA system)" },
  ],
  "cat skills.txt": () => [
    { text: "Loading core dependencies...", color: "#4ade80" },
    { text: "  ▶ Node.js / TypeScript / JavaScript" },
    { text: "  ▶ Express.js / REST APIs / WebSockets" },
    { text: "  ▶ PostgreSQL / MongoDB" },
    { text: "  ▶ Redis / BullMQ / Microservices" },
    { text: "  ▶ Docker / Event-Driven Architectures" },
    { text: "[OK] Stack loaded successfully", color: "#4ade80" },
  ],
  "cat resume.txt": () => [
    { text: "=== PRATIMA — BACKEND DEVELOPER ===", color: "var(--primary)" },
    { text: "Stack     : Node.js, TypeScript, PostgreSQL, Redis, Docker" },
    { text: "Projects  : 3 production-grade backend systems" },
    { text: "Focus     : Scalability, Real-time, Event-driven logic" },
    { text: "Contact   : pratimasahuji108@gmail.com" },
  ],
  "open github": () => {
    if (typeof window !== "undefined") window.open("https://github.com/Pratima-Sahuji", "_blank");
    return [{ text: "Opening github.com/Pratima-Sahuji...", color: "#4ade80" }];
  },
  "open linkedin": () => {
    if (typeof window !== "undefined") window.open("https://www.linkedin.com/in/pratima-sahuji-b43458294/", "_blank");
    return [{ text: "Opening linkedin.com...", color: "#4ade80" }];
  },
};

const BOOT_LINES = [
  { text: "pratima-os v1.0.0 — backend.kernel loaded", color: "#4ade80" },
  { text: 'Type "help" to see available commands.', color: "#aaa" },
  { text: "" },
];

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Scroll only the terminal container
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
      : [{ text: `command not found: ${cmd}. Type "help" for commands.`, color: "#f87171" }];

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
      // Simple autocomplete
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section className={styles.terminalSection}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.terminalBox}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className={styles.terminalHeader}>
          <div className={`${styles.dot} ${styles.dotRed}`} />
          <div className={`${styles.dot} ${styles.dotYellow}`} />
          <div className={`${styles.dot} ${styles.dotGreen}`} />
          <span className={styles.headerTitle}>
            pratima@server:~ — interactive
          </span>
          <span className={styles.headerHint}>
            Tab to autocomplete · ↑↓ history
          </span>
        </div>

        {/* Terminal Body */}
        <div ref={scrollRef} className={styles.terminalBody}>
          {BOOT_LINES.map((line, i) => (
            <p key={`boot-${i}`} style={{ color: line.color ?? "#aaa" }}>
              {line.text || "\u00A0"}
            </p>
          ))}

          {history.map((entry, i) => (
            <div key={i} className={styles.historyBlock}>
              <p>
                <span className={styles.prompt}>pratima@server:~$</span>
                <span className={styles.cmdText}>{entry.cmd}</span>
              </p>
              {entry.output.map((line, j) => (
                <p key={j} style={{ color: line.color ?? "#ccc" }}>
                  {line.text || "\u00A0"}
                </p>
              ))}
              <p className={styles.spacer}>&nbsp;</p>
            </div>
          ))}

          <div className={styles.inputRow}>
            <span className={styles.prompt}>pratima@server:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className={styles.inputField}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
            {input === "" && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className={styles.cursor}
              />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
