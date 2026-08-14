"use client";
import { Mail } from 'lucide-react';
import styles from './Contact.module.css';

const Github = ({ size = 24, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Linkedin = ({ size = 24, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Contact() {
  return (
    <section id="contact" className={styles.darkSection}>
      {/* Background Grid Lines */}
      <div className={styles.gridBackground}>
        <div className={styles.gridCol}></div>
        <div className={styles.gridCol}></div>
        <div className={styles.gridCol}></div>
        <div className={styles.gridCol}></div>
      </div>

      <div className={styles.content}>
        {/* Top Row */}
        <div className={`${styles.row} ${styles.borderBottom}`}>
          <div className={styles.cell} style={{ gridColumn: 'span 4', alignItems: 'center', justifyContent: 'center' }}>
            <span className={styles.monoText}>built by Pratima Sahuji . 2026</span>
          </div>
        </div>

        {/* Middle Row */}
        <div className={`${styles.row} ${styles.borderBottom}`}>
          <div className={styles.cell}></div>
          <div className={`${styles.cell} ${styles.span3} ${styles.heroCell}`}>
            <h2 className={styles.hugeTitle}>Let's Connect.</h2>
            <p className={styles.subtitle}>
              Have an idea, a project, or an interesting engineering problem to discuss? I’d love to hear from you.
            </p>
          </div>
        </div>

        {/* Bottom Social Row */}
        <div className={styles.socialRow}>
          <a href="https://github.com/Pratima-Sahuji" target="_blank" rel="noopener noreferrer" className={styles.socialIconBox}>
            <Github size={20} strokeWidth={2.5} />
          </a>
          <a href="https://www.linkedin.com/in/pratima-sahuji-b43458294/" target="_blank" rel="noopener noreferrer" className={styles.socialIconBox}>
            <Linkedin size={20} strokeWidth={2.5} />
          </a>
          <a href="mailto:pratimasahuji108@gmail.com" className={styles.socialIconBox}>
            <Mail size={20} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
