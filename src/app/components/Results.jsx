"use client";
import styles from './Results.module.css';

export default function Results() {
  return (
    <section className={styles.resultsSection}>
      <div className={styles.gridContainer}>
        {/* Background Grid Lines */}
        <div className={styles.gridBackground}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>

        <div className={styles.content}>
          {/* Left Column: Title */}
          <div className={styles.leftColumn}>
            <div className={styles.badge}>
              <span className={styles.badgeNum}>03</span>
              <span className={styles.badgeText}>RESULTS</span>
            </div>
            <h2 className={styles.hugeTitle}>Results of<br />my work</h2>
          </div>

          {/* Right Column: Stats */}
          <div className={styles.rightColumn}>
            
            {/* Stat Row 1 */}
            <div className={styles.statRow}>
              <div className={styles.statValue}>70%</div>
              <div className={styles.statName}>
                API CALL<br />REDUCTION
              </div>
              <div className={styles.statDesc}>
                Implemented Redis caching with TTL for the crypto portfolio tracker, slashing external API polling overhead.
              </div>
            </div>

            {/* Stat Row 2 */}
            <div className={styles.statRow}>
              <div className={styles.statValue}>2K+</div>
              <div className={styles.statName}>
                EVENTS PER<br />MINUTE
              </div>
              <div className={styles.statDesc}>
                Designed an event-driven notification pipeline sustaining high-throughput delivery across Chat, Group, and Alert events.
              </div>
            </div>

            {/* Stat Row 3 */}
            <div className={`${styles.statRow} ${styles.lastRow}`}>
              <div className={styles.statValue}>&lt;100ms</div>
              <div className={styles.statName}>
                P99 DELIVERY<br />LATENCY
              </div>
              <div className={styles.statDesc}>
                Achieved real-time delivery speeds for connected clients using a hybrid WebSocket and FCM push notification architecture.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
