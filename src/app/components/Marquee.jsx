"use client";

import styles from "./Marquee.module.css";

export default function Marquee({ items, direction = "left" }) {
  return (
    <div className={`${styles.marqueeContainer} ${styles[direction]}`}>
      <div className={styles.marqueeContent}>
        {items.map((item, i) => (
          <span key={i} className={styles.marqueeItem}>{item}</span>
        ))}
      </div>
      <div className={styles.marqueeContent}>
        {items.map((item, i) => (
          <span key={i + items.length} className={styles.marqueeItem}>{item}</span>
        ))}
      </div>
    </div>
  );
}
