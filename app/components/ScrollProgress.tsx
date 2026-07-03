"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin violet progress bar fixed at the very top, driven by scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed inset-x-0 top-0 z-101 h-0.5 bg-plum-voltage"
    />
  );
}
