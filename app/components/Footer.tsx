"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, GitBranch, Briefcase, MessageCircle } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/Hammadprogrammer", Icon: GitBranch },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hammad-zahid-543a652a6/", Icon: Briefcase },
  { label: "WhatsApp", href: "https://wa.me/923118270539", Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="relative z-1 mt-section border-t border-white/10">
      <div className="mx-auto max-w-page px-6 py-section md:px-12">
        <div className="mb-section flex flex-wrap justify-between gap-10">
          {/* Brand */}
          <div className="max-w-80">
            <Link href="/" className="mb-4 flex items-center gap-3 no-underline" data-cursor-hover>
              <div className="flex h-8 w-8 items-center justify-center rounded-pill bg-plum-voltage text-[13px] font-bold text-white">
                HH
              </div>
              <span className="text-subheading font-bold text-bone">Muhammad Hammad</span>
            </Link>
            <p className="text-body text-smoke">
              Full Stack Developer crafting fast, scalable web applications. Available for freelance &amp; full-time roles.
            </p>
            <a
              href="mailto:hammadzahid221@gmail.com"
              className="mt-4 inline-block text-body font-semibold text-plum-voltage no-underline"
              data-cursor-hover
            >
              hammadzahid221@gmail.com
            </a>
            <a
              href="https://wa.me/923118270539"
              className="mt-2 inline-block text-body font-semibold text-plum-voltage no-underline"
              data-cursor-hover
              target="_blank"
              rel="noopener noreferrer"
            >
              +92 322 1870539
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow mb-4 text-smoke">Navigate</p>
            <div className="flex flex-col gap-3">
              {NAV.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="nav-link w-fit text-body text-ash no-underline transition-colors hover:text-bone"
                  data-cursor-hover
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="eyebrow mb-4 text-smoke">Connect</p>
            <div className="flex gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor-hover
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex h-10 w-10 items-center justify-center rounded-pill border border-white/10 text-ash transition-colors hover:border-plum-voltage hover:text-plum-voltage"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="text-caption text-smoke">
            © {new Date().getFullYear()} Muhammad Hammad — Full Stack Developer
          </span>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
            className="flex items-center gap-2 rounded-pill border border-white/10 px-4 py-2 text-caption font-semibold text-ash transition-colors hover:border-plum-voltage hover:text-bone"
          >
            Back to top <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
