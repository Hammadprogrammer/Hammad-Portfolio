"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

const ALL_LINKS = [...LINKS, { href: "/contact", label: "Contact" }];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-100 flex h-[68px] items-center justify-between px-6 md:px-12"
        style={{
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.10)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          background: scrolled ? "rgba(0,0,0,0.72)" : "transparent",
          transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 no-underline" data-cursor-hover>
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-pill bg-plum-voltage text-[12px] font-bold tracking-tight text-white">
            MH
          </div>
          <div className="leading-tight whitespace-nowrap">
            <p className="text-body-sm font-bold text-bone">Muhammad Hammad</p>
            <p className="text-[10px] uppercase tracking-[0.1em] text-smoke">Full Stack Developer</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden list-none items-center gap-1 md:flex">
          {ALL_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className="relative z-1 block rounded-pill px-[18px] py-2 text-body-sm font-semibold no-underline transition-colors"
                  style={{ color: active ? "#8052ff" : "#9a9a9a" }}
                >
                  {label}
                </Link>
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-pill"
                    style={{ border: "1px solid rgba(128,82,255,0.5)" }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link href="/contact" className="hidden no-underline md:block" data-cursor-hover>
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 rounded-pill bg-plum-voltage px-6 py-[10px] text-caption font-bold uppercase tracking-[0.05em] text-white"
          >
            Hire Me <ArrowUpRight size={14} />
          </motion.span>
        </Link>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-white/10 bg-black text-bone md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99 bg-black/95 pt-[68px] md:hidden"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              className="flex list-none flex-col gap-2 p-6"
            >
              {ALL_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <motion.li key={href} variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}>
                    <Link
                      href={href}
                      className="block rounded-pill border px-5 py-4 text-subheading font-semibold no-underline"
                      style={{
                        color: active ? "#8052ff" : "#bdbdbd",
                        borderColor: active ? "rgba(128,82,255,0.5)" : "rgba(255,255,255,0.1)",
                      }}
                    >
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}>
                <Link
                  href="/contact"
                  className="mt-4 flex items-center justify-center gap-2 rounded-pill bg-plum-voltage px-5 py-4 text-body-sm font-bold uppercase tracking-[0.05em] text-white no-underline"
                >
                  Hire Me <ArrowUpRight size={16} />
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
