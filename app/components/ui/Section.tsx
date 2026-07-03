import React from "react";
import { cn } from "../../lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Semantic id for in-page anchors. */
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Section — centered 1200px column with consistent horizontal gutters
 * and generous vertical rhythm. The building block of every page.
 */
export default function Section({ children, className, id, style }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative z-1 mx-auto w-full max-w-page px-6 md:px-12", className)}
      style={style}
    >
      {children}
    </section>
  );
}
