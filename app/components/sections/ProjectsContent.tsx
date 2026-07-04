"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch, ArrowUpRight, MessageCircle,
  ShoppingCart, LayoutDashboard, Users, Building2, Boxes, FileText, BarChart3, Cloud, Brain,
} from "lucide-react";
import { Reveal } from "../motion/Motion";
import { Button } from "../ui/Button";
import { Badge, Eyebrow } from "../ui/Card";
import Section from "../ui/Section";
import AnimatedText from "../AnimatedText";

type Category = "Frontend" | "Backend" | "Full Stack";

interface Project {
  id: string;
  title: string;
  tagline: string;
  category: Category;
  Icon: typeof ShoppingCart;
  desc: string;
  tech: string[];
  repo: string;
}

const PROJECTS: Project[] = [
  {
    id: "01", title: "Todo App", tagline: "TaskFlow", category: "Full Stack", Icon: ShoppingCart,
    desc: "Login/Register, add todos, edit, delete, and mark work complete.",
    tech: ["Next.js", "MongoDB", "TypeScript", "Tailwind"],
    repo: "https://github.com/Hammadprogrammer",
  },
  {
    id: "02", title: "Notes App", tagline: "NoteNest", category: "Full Stack", Icon: FileText,
    desc: "User auth, create notes, edit notes, delete notes, and search note content.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind"],
    repo: "https://github.com/Hammadprogrammer",
  },
  {
    id: "03", title: "Blog Website", tagline: "Blogify", category: "Full Stack", Icon: Brain,
    desc: "Login, create blogs, edit, delete, and support comments.",
    tech: ["Next.js", "MongoDB", "TypeScript", "Tailwind"],
    repo: "https://github.com/Hammadprogrammer",
  },
  {
    id: "04", title: "Employee Management", tagline: "TeamPulse", category: "Backend", Icon: Users,
    desc: "Add, edit, delete, and search employee records with a clean dashboard.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    repo: "https://github.com/Hammadprogrammer",
  },
  {
    id: "05", title: "Student Management", tagline: "EduTrack", category: "Backend", Icon: Building2,
    desc: "Add, update, delete, and view student lists for academic management.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind"],
    repo: "https://github.com/Hammadprogrammer",
  },
  {
    id: "06", title: "Expense Tracker", tagline: "SpendWise", category: "Frontend", Icon: BarChart3,
    desc: "Track income and expenses with monthly summaries and simple charts.",
    tech: ["Next.js", "TypeScript", "Chart.js", "Tailwind"],
    repo: "https://github.com/Hammadprogrammer",
  },
  {
    id: "07", title: "Weather App", tagline: "SkyCast", category: "Frontend", Icon: Cloud,
    desc: "Search city weather with API support, 5-day forecast, and dark mode.",
    tech: ["Next.js", "OpenWeather API", "TypeScript", "Tailwind"],
    repo: "https://github.com/Hammadprogrammer",
  },
];

const FILTERS: ("All" | Category)[] = ["All", "Frontend", "Backend", "Full Stack"];

export default function ProjectsContent() {
  const [filter, setFilter] = useState<"All" | Category>("All");

  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="relative">
      {/* ════ HERO ════ */}
      <Section className="pt-36 pb-12">
        <Reveal immediate><Eyebrow color="#ffb829">Selected Work</Eyebrow></Reveal>
        <h1 className="mb-5 text-display font-bold leading-none">
          <AnimatedText text="Full Stack" as="span" className="block text-bone" delay={0.1} />
          <AnimatedText text="Projects." as="span" className="block text-plum-voltage" delay={0.3} />
        </h1>
        <Reveal immediate delay={0.5}>
          <p className="max-w-xl text-subheading text-ash">
            Production-ready apps covering authentication, CRUD interfaces, dashboards, and APIs.
            Open any card to visit the project on GitHub.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal immediate delay={0.6}>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  data-cursor-hover
                  className="rounded-pill border px-5 py-2 text-body-sm font-semibold transition-colors"
                  style={{
                    borderColor: isActive ? "rgba(128,82,255,0.6)" : "rgba(255,255,255,0.1)",
                    color: isActive ? "#8052ff" : "#9a9a9a",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>
      </Section>

      {/* ════ GRID ════ */}
      <Section className="pb-[120px]">
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.a
                key={p.id}
                layout
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                data-cursor-hover
                className="card card-hover flex flex-col gap-4 p-8 no-underline"
              >
                {/* thumbnail */}
                <div className="flex h-36 items-center justify-center rounded-pill border border-white/10">
                  <p.Icon size={48} className="text-plum-voltage" strokeWidth={1.4} />
                </div>

                <div className="flex items-center justify-between">
                  <Badge>{p.category}</Badge>
                  <span className="text-body-sm font-bold text-smoke">{p.id}</span>
                </div>

                <div>
                  <p className="mb-1 text-caption font-bold uppercase tracking-[0.08em] text-lichen">{p.tagline}</p>
                  <h3 className="text-subheading font-bold text-bone">{p.title}</h3>
                </div>

                <p className="flex-1 text-body text-ash">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => <Badge key={t}>{t}</Badge>)}
                </div>

                <span className="inline-flex items-center gap-1.5 text-caption font-bold uppercase tracking-[0.05em] text-plum-voltage">
                  View on GitHub <ArrowUpRight size={14} />
                </span>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button href="https://github.com/Hammadprogrammer" external variant="outline" size="md">
            View All Projects on GitHub
          </Button>
        </div>
      </Section>

      {/* ════ CTA ════ */}
      <Section className="pb-[120px]">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-pill border border-white/10 px-8 py-14 md:px-12">
            <div>
              <Eyebrow color="#ffb829">Next Project</Eyebrow>
              <h2 className="text-heading-sm font-bold text-bone md:text-heading">
                Got an idea? Let&apos;s build it together.
              </h2>
            </div>
            <Button href="/contact" variant="primary">Start a Conversation <ArrowUpRight size={16} /></Button>
          </div>
        </Reveal>
      </Section>

    </div>
  );
}
