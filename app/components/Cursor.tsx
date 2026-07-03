"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom animated cursor — a crisp violet dot with a trailing,
 * lagging blur ring. Desktop (fine pointer) only.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Instant dot position
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  // Lagging ring position (spring)
  const ringX = useSpring(dotX, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 220, damping: 26, mass: 0.6 });

  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
        const el = e.target as HTMLElement;
        setHovering(!!el.closest("a, button, [data-cursor-hover]"));
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none");
      cancelAnimationFrame(raf.current);
    };
  }, [dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing blur ring */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
          pointerEvents: "none",
          borderRadius: "50%",
          border: "1px solid rgba(128,82,255,0.6)",
          filter: "blur(0.4px)",
        }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: hovering ? 1 : 0.7,
          backgroundColor: hovering ? "rgba(128,82,255,0.12)" : "rgba(128,82,255,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
      {/* Instant dot */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#8052ff",
          zIndex: 10000,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
