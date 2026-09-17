"use client";

import { useEffect, useState } from "react";

const generateLogs = (count) => {
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  const paths = [
    "/api/v1/portfolio/sync",
    "/ws/crypto/prices",
    "/api/v1/notify/push",
    "/workers/bullmq/process",
    "/api/v1/rate-limit/check",
    "/redis/sync",
    "/api/v1/auth/verify",
    "/metrics/prometheus",
  ];
  const statuses = [200, 201, 200, 204, 401, 403, 404, 500, 502, 503];
  const ips = ["192.168.1.104", "10.0.0.52", "127.0.0.1", "172.16.254.1", "10.12.0.45"];

  const logs = [];
  let currentTime = new Date();

  for (let i = 0; i < count; i++) {
    const isError = Math.random() > 0.85;
    const method = methods[Math.floor(Math.random() * methods.length)];
    const path = paths[Math.floor(Math.random() * paths.length)];
    const status = isError
      ? statuses[Math.floor(Math.random() * 6) + 4]
      : statuses[Math.floor(Math.random() * 4)];
    const ip = ips[Math.floor(Math.random() * ips.length)];
    const latency = Math.floor(Math.random() * 150) + 2;
    const level = isError ? "[ERROR]" : "[INFO] ";

    currentTime = new Date(currentTime.getTime() - Math.floor(Math.random() * 8000));
    const timestamp = currentTime.toISOString().replace("T", " ").replace("Z", "");

    logs.push(`${timestamp} ${level} ${ip} - - "${method} ${path} HTTP/1.1" ${status} ${latency}ms`);
  }
  return logs;
};

export default function ServerLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(generateLogs(60));
  }, []);

  if (logs.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      style={{ opacity: 0.12 }}
      aria-hidden="true"
    >
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(214,217,193,0.7) 50%, rgba(214,217,193,1) 100%)"
        }}
      />

      <div
        className="absolute inset-0 flex flex-col text-[10px] sm:text-[11px] text-zinc-900 w-[250%] sm:w-full select-none"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          whiteSpace: "nowrap",
          lineHeight: "1.6",
          transform: "rotate(-2deg) scale(1.1)",
          transformOrigin: "center -10%",
        }}
      >
        <div className="animate-server-logs-scroll">
          {logs.map((log, i) => (
            <div key={`a-${i}`}>{log}</div>
          ))}
        </div>
        <div className="animate-server-logs-scroll">
          {logs.map((log, i) => (
            <div key={`b-${i}`}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
