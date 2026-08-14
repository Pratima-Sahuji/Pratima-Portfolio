"use client";

import { motion } from "framer-motion";
import { LayoutTemplate, Activity, Mail } from "lucide-react";
import Marquee from "./components/Marquee";
import ProjectList from "./components/ProjectList";
import Contact from "./components/Contact";
import Results from "./components/Results";
import ServerLogs from "./components/ServerLogs";
import Terminal from "./components/Terminal";

const allSkills = ["TypeScript", "JavaScript", "Node.js", "Express.js", "Microservices", "REST APIs", "WebSockets", "Java", "MongoDB", "PostgreSQL", "Redis", "Docker", "Event-Driven", "Distributed Systems", "BullMQ"];

const Github = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
import styles from "./page.module.css";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className={styles.main}>
      <ServerLogs />
      <div className="bg-grid"></div>
      
      <div className="container">
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            
            <motion.h1 
              className={styles.title}
              {...fadeInUp}
            >
              I build systems <br /> that don't break.
            </motion.h1>
            
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I’m Pratima — a backend developer who builds the systems behind the experience. 
              APIs, databases, authentication, real-time features, and the logic that keeps 
              applications running smoothly.
            </motion.p>
          </div>

          <motion.div 
            className={styles.heroImageContainer}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.heroVisuals}>
              <div className={styles.imageWrapper}>
                <img 
                  src="/profile.jpg" 
                  alt="Pratima - Backend Developer" 
                  className={styles.heroImage} 
                />
              </div>
              <motion.a 
                href="#projects"
                className={styles.workButton}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 0.98 }}
              >
                See all my work
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* INTERACTIVE TERMINAL SECTION */}
        <Terminal />

        {/* SKILLS SECTION */}
        <section id="skills" className={styles.section} style={{ paddingBottom: '2rem' }}>
          <div className={styles.marqueeWrapper}>
            <Marquee items={allSkills} direction="left" />
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className={styles.section}>
          <h2 className="section-title">Selected Works</h2>
          <ProjectList />
        </section>

      </div>

      <Results />
      <Contact />
    </main>
  );
}
