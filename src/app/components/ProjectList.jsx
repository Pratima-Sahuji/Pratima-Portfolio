"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectList.module.css';
import { Activity, Server, Brain } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'Crypto Portfolio Alert System',
    stack: 'NODE.JS • EXPRESS.JS • MONGODB • WEBSOCKETS • REDIS • DOCKER • SENDGRID',
    stackTags: ['Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'Redis', 'Docker', 'SendGrid'],
    category: 'FINTECH',
    icon: <Activity size={32} strokeWidth={1.5} className={styles.iconSvg} />,
    colorScheme: 'orange',
    oneLine: 'Real-time crypto tracker with WebSocket updates and alert queues.',
    details: [
      'Built a real-time crypto portfolio tracking backend with WebSocket notifications and automated email alerts for user-defined price thresholds.',
      'Designed a FIFO-based profit/loss engine supporting multi-transaction portfolio analytics and unlimited cryptocurrency pairs.',
      'Developed scalable REST APIs and implemented Redis caching with TTL, reducing external API calls by 70%, while containerizing the backend using Docker for efficient deployment and high-frequency polling.'
    ]
  },
  {
    id: '02',
    title: 'NotifyFlow API',
    stack: 'TYPESCRIPT • NODE.JS • POSTGRESQL • BULLMQ • REDIS',
    stackTags: ['TypeScript', 'Node.js', 'PostgreSQL', 'BullMQ', 'Redis'],
    category: 'BACKEND INFRASTRUCTURE',
    icon: <Server size={32} strokeWidth={1.5} className={styles.iconSvg} />,
    colorScheme: 'white',
    oneLine: 'Unified notification routing service for email, SMS, and push.',
    details: [
      'Designed an event-driven Notification Service processing 2K+ notification events/min across Chat, Group, Community, and time-sensitive Alert events through a centralized asynchronous pipeline.',
      'Built a BullMQ + Redis notification pipeline sustaining 1K+ jobs/sec with 4 concurrent workers, implementing exponential backoff retries and priority queues to isolate push-delivery failures from the core API.',
      'Implemented hybrid WebSocket + FCM delivery achieving sub-100ms p99 event-to-client latency for connected clients while supporting reliable push delivery to background and locked devices.',
      'Engineered multi-device notification delivery supporting 500+ registered devices with PostgreSQL-backed notification history, FCM token lifecycle management, and context-aware deep linking.'
    ]
  },
  {
    id: '03',
    title: 'AI Knowledge Assistant (RAG)',
    stack: 'NODE.JS • REACT.JS • OPENAI API • PINECONE • LANGCHAIN • DOCKER',
    stackTags: ['Node.js', 'React.js', 'OpenAI', 'Pinecone', 'LangChain', 'Docker'],
    category: 'AI / RAG',
    icon: <Brain size={32} strokeWidth={1.5} className={styles.iconSvg} />,
    colorScheme: 'black',
    oneLine: 'Full-stack document QA system using Retrieval-Augmented Generation.',
    details: [
      'Built a full-stack AI-powered system enabling document-based contextual Q&A using Retrieval-Augmented Generation.',
      'Implemented document ingestion pipeline with chunking, embedding generation, and vector storage in Pinecone for semantic retrieval.',
      'Designed REST APIs integrating OpenAI LLM with top-K similarity search to generate accurate, source-grounded responses.',
      'Optimized response quality through prompt engineering and retrieval tuning, improving contextual accuracy and reducing hallucinations.'
    ]
  }
];

export default function ProjectList() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    if (openId === id) setOpenId(null);
    else setOpenId(id);
  };

  return (
    <div className={styles.processContainer}>
      <div className={styles.topLine}></div>
      <div className={styles.grid}>
        {projects.map((project, index) => {
          const isOpen = openId === project.id;
          return (
            <motion.div 
              key={project.id} 
              className={`${styles.column} ${styles[project.colorScheme]} ${isOpen ? styles.openColumn : ''}`}
              onClick={() => toggle(project.id)}
              layout
            >
              <div className={styles.numberBox}>
                <span className={styles.dot}>.</span>{project.id}
              </div>
              
              <h3 className={styles.title}>{project.title}</h3>
              
              <div className={styles.stack}>{project.stack}</div>
              
              <div className={styles.iconWrapper}>
                {index !== 0 && <div className={styles.connectingLine}></div>}
                <div className={`${styles.iconBox} ${isOpen ? styles.iconBoxOpen : ''}`}>
                  {project.icon}
                </div>
              </div>
              
              <p className={styles.oneLine}>{project.oneLine}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {openId && (
          <div className={styles.modalOverlay} onClick={() => setOpenId(null)}>
            {projects.filter(p => p.id === openId).map(project => (
              <motion.div 
                key="modal"
                className={styles.modalContent}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`${styles.modalHeader} ${styles[project.colorScheme + 'Header']}`}>
                  <h2 className={styles.modalTitle}>{project.title}</h2>
                  <button className={styles.closeBtn} onClick={() => setOpenId(null)}>x</button>
                </div>
                
                <div className={styles.modalBody}>
                  <div className={styles.modalCategory}>{project.category}</div>
                  
                  <div className={styles.modalDetails}>
                    {project.details.map((point, idx) => (
                      <p key={idx} className={styles.modalParagraph}>{point}</p>
                    ))}
                  </div>

                  <div className={styles.modalStackSection}>
                    <h4 className={styles.modalStackTitle}>TECH STACK</h4>
                    <div className={styles.modalTags}>
                      {project.stackTags.map(tag => (
                        <span key={tag} className={styles.modalTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <button className={`${styles.modalActionBtn} ${styles.btnBlack}`}>GITHUB</button>
                  <button className={`${styles.modalActionBtn} ${styles.btnWhite}`}>LIVE LINK</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
