"use client";

import { motion, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
 * Easing & shared transitions — tuned for 60fps
 * ────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    default: return {};
  }
}

interface RevealProps {
  children: React.ReactNode;
  /** Animate immediately on mount (hero) instead of on scroll. */
  immediate?: boolean;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "li" | "span" | "article" | "header" | "footer";
}

/**
 * Reveal — fades + slides content into view.
 * On scroll by default (`whileInView`, fires once). Pass `immediate`
 * for above-the-fold hero content that should animate on page load.
 */
export function Reveal({
  children,
  immediate = false,
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 0.7,
  className,
  style,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  const hidden = { opacity: 0, ...offset(direction, distance) };
  const shown = { opacity: 1, x: 0, y: 0 };

  const animateProps = immediate
    ? { initial: hidden, animate: shown }
    : { initial: hidden, whileInView: shown, viewport: { once: true, margin: "-80px" } };

  return (
    <MotionTag
      className={className}
      style={style}
      {...animateProps}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ──────────────────────────────────────────────
 * Stagger container + item — for lists / grids
 * ────────────────────────────────────────────── */
interface StaggerProps {
  children: React.ReactNode;
  immediate?: boolean;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Stagger({
  children,
  immediate = false,
  stagger = 0.1,
  delayChildren = 0,
  className,
  style,
}: StaggerProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
  const trigger = immediate
    ? { initial: "hidden" as const, animate: "show" as const }
    : { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, margin: "-60px" } };

  return (
    <motion.div className={className} style={style} variants={container} {...trigger}>
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  /** Cards slide down from top by default. */
  direction?: Direction;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerItem({
  children,
  direction = "down",
  distance = 24,
  className,
  style,
}: StaggerItemProps) {
  const item: Variants = {
    hidden: { opacity: 0, ...offset(direction, distance) },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <motion.div className={className} style={style} variants={item}>
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
 * Counter — animated number, runs when in view
 * ────────────────────────────────────────────── */
interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Counter({ to, suffix = "", prefix = "", duration = 1.8, className, style }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value}{suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────
 * Parallax — subtle vertical drift on scroll
 * ────────────────────────────────────────────── */
export function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(y, { stiffness: 150, damping: 18 });
  const ry = useSpring(x, { stiffness: 150, damping: 18 });
  return { rx, ry, x, y };
}

/** Re-export motion + AnimatePresence for convenience in pages. */
export { motion, AnimatePresence } from "framer-motion";
