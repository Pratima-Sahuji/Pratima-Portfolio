"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let mouseX = -100;
    let mouseY = -100;
    let animFrame;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(animFrame);
    };
  }, [visible]);

  return (
    <>
      {/* Outer subtle follower ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: clicking ? "22px" : "32px",
          height: clicking ? "22px" : "32px",
          border: "2px solid #f97316",
          borderRadius: "2px",
          pointerEvents: "none",
          zIndex: 9999998,
          opacity: visible ? 0.5 : 0,
          transition: "width 0.15s, height 0.15s, opacity 0.2s",
          willChange: "transform",
        }}
      />
      {/* Center accent dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: clicking ? "4px" : "6px",
          height: clicking ? "4px" : "6px",
          background: "#f97316",
          borderRadius: "1px",
          pointerEvents: "none",
          zIndex: 9999999,
          opacity: visible ? 0.8 : 0,
          transition: "width 0.1s, height 0.1s, opacity 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
}
