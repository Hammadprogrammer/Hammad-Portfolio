"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

/* Strict void/violet system:
 * - primary  : filled Plum Voltage (the ONLY filled chromatic surface)
 * - secondary: hairline white @10% on black
 * - outline  : Amber Spark outlined label (used sparingly)
 * - ghost    : text only */
const VARIANT: Record<Variant, string> = {
  primary:
    "text-white bg-plum-voltage hover:opacity-90",
  secondary:
    "text-bone bg-black border border-white/10 hover:border-white/25",
  outline:
    "text-amber-spark bg-transparent border border-amber-spark/50 hover:border-amber-spark",
  ghost:
    "text-smoke bg-transparent hover:text-bone",
};

const SIZE: Record<Size, string> = {
  sm: "px-[18px] py-[10px] text-caption",
  md: "px-6 py-[14px] text-caption",
  lg: "px-8 py-4 text-body-sm",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  type = "button",
  onClick,
  className,
  disabled,
}: ButtonProps) {
  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-pill font-bold uppercase tracking-[0.05em]",
    "cursor-pointer select-none no-underline transition-[opacity,border-color,color] duration-200 will-change-transform",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    VARIANT[variant],
    SIZE[size],
    className,
  );

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.04 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 22 },
  };

  if (href) {
    const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <motion.div className="inline-flex" {...motionProps}>
        <Link href={href} className={base} {...linkProps}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} className={base} {...motionProps}>
      {children}
    </motion.button>
  );
}
