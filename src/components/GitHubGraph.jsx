"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Helper to determine orange color shade based on contribution count
function getColor(count) {
  if (count === 0) return "#f1ede4";
  if (count <= 2) return "#fed7aa"; // light orange
  if (count <= 5) return "#fb923c"; // medium orange
  if (count <= 9) return "#ea580c"; // vibrant orange
  return "#9a3412"; // deep burnt orange
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GitHubGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching GitHub activity:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCalendar();
  }, []);

  const totalContributions = data?.totalContributions ?? 350;
  const weeks = data?.weeks || [];

  return (
    <section id="github" className="w-full max-w-4xl mx-auto px-4 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <h2
              className="text-sm font-bold uppercase tracking-widest text-gray-800"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "11px" }}
            >
              GitHub Activity
            </h2>
            <span className="text-[11px] font-mono text-gray-600 bg-[#ebe5d8] px-2 py-0.5 border border-black/20">
              {loading ? "Loading..." : `${totalContributions} contributions in the last year`}
            </span>
          </div>

          <a
            href="https://github.com/Pratima-Sahuji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-widest text-[#ea580c] hover:underline"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            @Pratima-Sahuji ↗
          </a>
        </div>

        {/* Graph card */}
        <div
          className="border-2 border-black bg-white p-5 relative overflow-hidden"
          style={{ boxShadow: "4px 4px 0px #111" }}
        >
          {/* Tooltip */}
          <div className="h-6 mb-2 flex items-center">
            {hoveredDay ? (
              <span className="text-xs font-mono font-medium text-black bg-[#fff3e0] border border-[#ea580c] px-2 py-0.5 shadow-sm inline-block">
                {hoveredDay.contributionCount === 0
                  ? `No contributions on ${formatDate(hoveredDay.date)}`
                  : `${hoveredDay.contributionCount} contribution${
                      hoveredDay.contributionCount > 1 ? "s" : ""
                    } on ${formatDate(hoveredDay.date)}`}
              </span>
            ) : (
              <span className="text-xs font-mono text-gray-400">
                Hover over a square to view details
              </span>
            )}
          </div>

          {/* Contribution Heatmap Container */}
          <div className="w-full overflow-x-auto pb-2">
            <div className="inline-flex flex-col min-w-[720px]">
              {/* Month labels */}
              <div className="flex text-[10px] font-mono text-gray-500 mb-1 pl-7">
                {weeks.map((week, index) => {
                  // Find if this week contains the first day of a month
                  const firstDay = week.contributionDays[0]?.date;
                  const dayObj = new Date(firstDay);
                  const isStartOfMonth =
                    index === 0 || dayObj.getDate() <= 7;
                  const monthName = dayObj.toLocaleDateString("en-US", { month: "short" });

                  return (
                    <div
                      key={index}
                      className="w-[12px] mr-[3px] text-[9px] text-gray-500 select-none overflow-visible whitespace-nowrap"
                    >
                      {isStartOfMonth && index % 4 === 0 ? monthName : ""}
                    </div>
                  );
                })}
              </div>

              {/* Day labels + Squares grid */}
              <div className="flex items-start">
                {/* Weekday Labels */}
                <div className="flex flex-col justify-between h-[105px] pr-2 text-[9px] font-mono text-gray-400 select-none">
                  <span className="h-[12px] leading-[12px]">Mon</span>
                  <span className="h-[12px] leading-[12px]">Wed</span>
                  <span className="h-[12px] leading-[12px]">Fri</span>
                </div>

                {/* Weeks Grid */}
                {loading ? (
                  <div className="flex gap-[3px] animate-pulse">
                    {Array.from({ length: 52 }).map((_, w) => (
                      <div key={w} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, d) => (
                          <div
                            key={d}
                            className="w-[12px] h-[12px] bg-[#ece7dd] rounded-[2px]"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-[3px]">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3px]">
                        {week.contributionDays.map((day, dIdx) => (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className="w-[12px] h-[12px] rounded-[2px] transition-transform hover:scale-125 cursor-pointer"
                            style={{
                              backgroundColor: getColor(day.contributionCount),
                              border: "1px solid rgba(0,0,0,0.06)",
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-[10px] font-mono text-gray-400">
              Live GitHub data synced
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-gray-500 font-mono">Less</span>
              {[0, 2, 5, 9, 12].map((lvl, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-[2px] border border-black/10"
                  style={{ backgroundColor: getColor(lvl) }}
                />
              ))}
              <span className="text-[9px] text-gray-500 font-mono">More</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
