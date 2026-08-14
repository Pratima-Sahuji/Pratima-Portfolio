"use client";

import { Terminal } from "lucide-react";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <div className={styles.navWrapper}>
      <motion.nav 
        className={styles.nav}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <a href="#" className={styles.logo} aria-label="Home">
          <Terminal size={18} strokeWidth={2.5} />
        </a>
        
        <div className={styles.links}>
          <a href="#skills" className={styles.link}>Skills</a>
          <a href="#projects" className={styles.link}>Projects</a>
        </div>

        <a href="mailto:pratimasahuji108@gmail.com" className={styles.contactBtn}>
          pratimasahuji108@gmail.com
        </a>
      </motion.nav>
    </div>
  );
}
