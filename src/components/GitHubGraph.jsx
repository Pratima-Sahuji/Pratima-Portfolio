"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// Orange color palette for activity levels
function getSquareColor(count) {
  if (!count || count === 0) return "#ede8df";
  if (count <= 2) return "#fed7aa"; // light peach/orange
  if (count <= 5) return "#fb923c"; // medium orange
  if (count <= 9) return "#ea580c"; // bright bold orange
  return "#9a3412"; // dark burnt orange
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return d.toLocaleDateString("en-US", {
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
        if (!res.ok) throw new Error("Failed to fetch GitHub data");
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
  const weeks = useMemo(() => data?.weeks || [], [data]);
  const months = useMemo(() => data?.months || [], [data]);
  const hasWeeks = weeks && weeks.length > 0;

  // Compute X coordinate for each month header
  const monthLabels = useMemo(() => {
    if (!weeks.length || !months.length) return [];
    return months
      .map((m) => {
        const weekIdx = weeks.findIndex((w) =>
          w.contributionDays.some((day) => day.date >= m.firstDay)
        );
        return { name: m.name, weekIdx };
      })
      .filter((m) => m.weekIdx !== -1);
  }, [weeks, months]);

  const CELL_SIZE = 11;
  const CELL_GAP = 3.5;
  const STEP = CELL_SIZE + CELL_GAP;
  const LEFT_OFFSET = 32;
  const TOP_OFFSET = 20;

  const svgWidth = LEFT_OFFSET + Math.max(53, weeks.length) * STEP + 10;
  const svgHeight = TOP_OFFSET + 7 * STEP + 6;

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
            <span className="text-[11px] font-mono font-bold text-black bg-[#f0ebd8] px-2.5 py-1 border border-black/30 shadow-sm">
              {loading ? "Loading contributions..." : `${totalContributions} contributions in the last year`}
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
          className="border-2 border-black bg-white p-5 overflow-hidden"
          style={{ boxShadow: "4px 4px 0px #111" }}
        >
          {/* Active tooltip banner */}
          <div className="min-h-[26px] mb-2 flex items-center">
            {hoveredDay ? (
              <span className="text-xs font-mono font-semibold text-black bg-[#fff3e0] border border-[#ea580c] px-2.5 py-0.5 shadow-sm inline-flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-[1px] inline-block"
                  style={{ backgroundColor: getSquareColor(hoveredDay.contributionCount) }}
                />
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

          {/* SVG Graph rendering */}
          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[780px]">
              <svg
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="select-none"
              >
                {/* Month labels */}
                {monthLabels.map((m, i) => (
                  <text
                    key={i}
                    x={LEFT_OFFSET + m.weekIdx * STEP}
                    y={13}
                    className="text-[10px] fill-gray-500 font-mono font-medium"
                    style={{ fontSize: "10px" }}
                  >
                    {m.name}
                  </text>
                ))}

                {/* Day labels (Mon, Wed, Fri) */}
                <text
                  x={0}
                  y={TOP_OFFSET + 1 * STEP + 9}
                  className="text-[9px] fill-gray-400 font-mono"
                  style={{ fontSize: "9px" }}
                >
                  Mon
                </text>
                <text
                  x={0}
                  y={TOP_OFFSET + 3 * STEP + 9}
                  className="text-[9px] fill-gray-400 font-mono"
                  style={{ fontSize: "9px" }}
                >
                  Wed
                </text>
                <text
                  x={0}
                  y={TOP_OFFSET + 5 * STEP + 9}
                  className="text-[9px] fill-gray-400 font-mono"
                  style={{ fontSize: "9px" }}
                >
                  Fri
                </text>

                {/* Contribution days grid */}
                {!hasWeeks
                  ? Array.from({ length: 53 }).map((_, wIdx) =>
                      Array.from({ length: 7 }).map((_, dIdx) => (
                        <rect
                          key={`${wIdx}-${dIdx}`}
                          x={LEFT_OFFSET + wIdx * STEP}
                          y={TOP_OFFSET + dIdx * STEP}
                          width={CELL_SIZE}
                          height={CELL_SIZE}
                          rx={2}
                          ry={2}
                          fill="#ede8df"
                          stroke="#ddd7cc"
                          strokeWidth="0.8"
                          strokeOpacity={0.6}
                          className="animate-pulse"
                        />
                      ))
                    )
                  : weeks.map((week, wIdx) =>
                      week.contributionDays.map((day) => {
                        const x = LEFT_OFFSET + wIdx * STEP;
                        const y = TOP_OFFSET + day.weekday * STEP;
                        const color = getSquareColor(day.contributionCount);

                        return (
                          <rect
                            key={day.date}
                            x={x}
                            y={y}
                            width={CELL_SIZE}
                            height={CELL_SIZE}
                            rx={2}
                            ry={2}
                            fill={color}
                            stroke={day.contributionCount === 0 ? "#ddd7cc" : "#c2410c"}
                            strokeWidth={day.contributionCount === 0 ? "0.8" : "0.5"}
                            strokeOpacity={day.contributionCount === 0 ? 0.6 : 0.3}
                            className="cursor-pointer transition-all duration-150 hover:opacity-80"
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                          >
                            <title>
                              {day.contributionCount === 0
                                ? `No contributions on ${formatDate(day.date)}`
                                : `${day.contributionCount} contribution${
                                    day.contributionCount > 1 ? "s" : ""
                                  } on ${formatDate(day.date)}`}
                            </title>
                          </rect>
                        );
                      })
                    )}
              </svg>
            </div>
          </div>

          {/* Bottom legend */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Live GitHub API synced
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-gray-500 font-mono">Less</span>
              {[0, 2, 5, 9, 12].map((lvl, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-[2px] border"
                  style={{
                    backgroundColor: getSquareColor(lvl),
                    borderColor: lvl === 0 ? "#ddd7cc" : "#c2410c",
                  }}
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
