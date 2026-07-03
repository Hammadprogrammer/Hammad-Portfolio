"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface AnimatedTextProps {
  text: string;
  /** Split unit for the stagger reveal. */
  by?: "word" | "char";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Animate on scroll into view instead of on mount. */
  onView?: boolean;
}

/**
 * AnimatedText — word/character stagger reveal. Uses transform/opacity
 * only for GPU-accelerated, premium reveals.
 */
export default function AnimatedText({
  text,
  by = "word",
  className,
  style,
  delay = 0,
  stagger = 0.06,
  as = "span",
  onView = false,
}: AnimatedTextProps) {
  const units = by === "word" ? text.split(" ") : Array.from(text);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: "0.6em" },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const trigger = onView
    ? { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, margin: "-60px" } }
    : { initial: "hidden" as const, animate: "show" as const };

  const MotionTag = motion[as] as typeof motion.span;

  return (
    <MotionTag className={className} style={style} variants={container} {...trigger}>
      {units.map((unit, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span variants={item} style={{ display: "inline-block", willChange: "transform" }}>
            {unit}
            {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
