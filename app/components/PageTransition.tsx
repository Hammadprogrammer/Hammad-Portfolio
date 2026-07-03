"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Smooth fade + slide transition between routes using AnimatePresence.
 * GPU-accelerated (opacity/transform only), on-brand and shadow-free.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
