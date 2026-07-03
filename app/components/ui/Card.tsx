"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  /** Border turns violet on hover. */
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/** Flat hairline card — pure black, 1px white @10% border, 24px radius.
 *  Depth comes from contrast + negative space only (no shadow / glass). */
export function Card({ children, hover = true, className, style, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn("card relative overflow-hidden", hover && "card-hover", className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Violet pill tag. */
export function Badge({
  children,
  color = "#8052ff",
  className,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center rounded-pill text-caption font-semibold", className)}
      style={{ color, border: `1px solid ${color}55`, padding: "4px 12px" }}
    >
      {children}
    </span>
  );
}

/** Uppercase eyebrow/kicker label — Bone by default per spec. */
export function Eyebrow({ children, color = "#ffffff" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="eyebrow" style={{ color, marginBottom: 18 }}>
      {children}
    </p>
  );
}
