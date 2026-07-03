"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch, X, ArrowUpRight, Sparkles,
  ShoppingCart, LayoutDashboard, Users, Brain, Building2, Boxes, Check,
} from "lucide-react";
import { Reveal } from "../motion/Motion";
import { Button } from "../ui/Button";
import { Badge, Eyebrow } from "../ui/Card";
import Section from "../ui/Section";
import AnimatedText from "../AnimatedText";

type Category = "Frontend" | "Backend" | "Full Stack" | "Mobile" | "AI";

interface Project {
  id: string;
  title: string;
  tagline: string;
  category: Category;
  Icon: typeof ShoppingCart;
  desc: string;
  longDesc: string;
  tech: string[];
  features: string[];
  repo: string;
}

const PROJECTS: Project[] = [
  {
    id: "01", title: "E-Commerce Platform", tagline: "ShopEase", category: "Full Stack", Icon: ShoppingCart,
    desc: "Complete online store with payments, admin dashboard, and real-time inventory.",
    longDesc: "A production-grade e-commerce platform supporting thousands of products, secure Stripe checkout, order tracking, and a powerful admin dashboard with analytics. Built for scale with server-side rendering and edge caching.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind", "Redis"],
    features: ["Stripe payment integration", "Admin dashboard with charts", "JWT auth + refresh tokens", "Real-time inventory sync", "Product search & filters", "Email order notifications"],
    repo: "https://github.com",
  },
  {
    id: "02", title: "SaaS Dashboard", tagline: "MetricFlow", category: "Frontend", Icon: LayoutDashboard,
    desc: "Analytics dashboard with live charts, dark mode, and team management.",
    longDesc: "A sleek SaaS analytics dashboard featuring real-time data visualization, customizable widgets, role-based team access, and a polished design system. Optimized for performance with virtualized tables and lazy-loaded charts.",
    tech: ["React", "TypeScript", "Tailwind", "Recharts", "Zustand"],
    features: ["Real-time data charts", "Customizable widgets", "Dark / light themes", "Team & role management", "Export to CSV / PDF", "Responsive layout"],
    repo: "https://github.com",
  },
  {
    id: "03", title: "CRM Management System", tagline: "ClientCore", category: "Full Stack", Icon: Users,
    desc: "Customer relationship platform with pipelines, automation, and reports.",
    longDesc: "An end-to-end CRM that helps teams manage leads, deals, and customer communication. Includes a drag-and-drop sales pipeline, automated email workflows, activity logging, and detailed reporting dashboards.",
    tech: ["Next.js", "Express", "PostgreSQL", "Prisma", "Socket.io"],
    features: ["Drag-and-drop pipeline", "Email automation", "Activity timeline", "Custom reports", "Role-based access", "Real-time notifications"],
    repo: "https://github.com",
  },
  {
    id: "04", title: "AI Web Application", tagline: "NeuraChat", category: "AI", Icon: Brain,
    desc: "AI-powered chat assistant with streaming responses and context memory.",
    longDesc: "An AI web app that integrates large language models for intelligent conversations, document Q&A, and content generation. Features streaming token responses, conversation memory, and a beautiful chat interface.",
    tech: ["Next.js", "OpenAI API", "Node.js", "PostgreSQL", "Vercel AI"],
    features: ["Streaming AI responses", "Context-aware memory", "Document Q&A (RAG)", "Prompt templates", "Usage analytics", "Rate limiting"],
    repo: "https://github.com",
  },
  {
    id: "05", title: "Real Estate Platform", tagline: "EstateHub", category: "Full Stack", Icon: Building2,
    desc: "Property listings with map search, virtual tours, and agent dashboards.",
    longDesc: "A modern real estate marketplace with advanced map-based search, high-resolution image galleries, saved favorites, mortgage calculators, and dedicated dashboards for agents to manage their listings.",
    tech: ["Next.js", "Node.js", "MongoDB", "Mapbox", "Cloudinary"],
    features: ["Map-based search", "Advanced filters", "Saved favorites", "Agent dashboards", "Mortgage calculator", "Image galleries"],
    repo: "https://github.com",
  },
  {
    id: "06", title: "Inventory Management System", tagline: "StockPilot", category: "Backend", Icon: Boxes,
    desc: "Robust inventory API with stock tracking, alerts, and multi-warehouse support.",
    longDesc: "A scalable backend system for inventory and warehouse management. Handles stock movements, low-stock alerts, supplier management, and barcode scanning — exposed through a clean, documented REST API.",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    features: ["Multi-warehouse support", "Low-stock alerts", "Supplier management", "Barcode scanning", "Audit logs", "REST API + docs"],
    repo: "https://github.com",
  },
];

const FILTERS: ("All" | Category)[] = ["All", "Frontend", "Backend", "Full Stack", "Mobile", "AI"];

export default function ProjectsContent() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [active, setActive] = useState<Project | null>(null);

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
            Production-ready apps spanning e-commerce, real-time systems, AI, and more.
            Click any project for the full breakdown.
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
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(p)}
                data-cursor-hover
                className="card card-hover flex cursor-pointer flex-col gap-4 p-8"
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
                  View Details <ArrowUpRight size={14} />
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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

      {/* ════ DETAIL MODAL ════ */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-1000 flex items-center justify-center p-5"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="card max-h-[88vh] w-full max-w-[720px] overflow-y-auto"
            >
              {/* header */}
              <div className="relative flex h-44 items-center justify-center border-b border-white/10">
                <active.Icon size={64} className="text-plum-voltage" strokeWidth={1.3} />
                <button
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  data-cursor-hover
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-pill border border-white/10 bg-black text-bone"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-9">
                <div className="mb-2 flex items-center gap-2.5">
                  <Badge>{active.category}</Badge>
                  <span className="text-caption font-bold uppercase tracking-[0.08em] text-lichen">{active.tagline}</span>
                </div>
                <h2 className="mb-4 text-heading-sm font-bold text-bone">{active.title}</h2>
                <p className="mb-7 text-body text-ash">{active.longDesc}</p>

                <p className="mb-4 flex items-center gap-2 text-body-sm font-bold uppercase tracking-[0.08em] text-bone">
                  <Sparkles size={14} className="text-plum-voltage" /> Key Features
                </p>
                <div className="mb-7 grid gap-2.5 sm:grid-cols-2">
                  {active.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-lichen" />
                      <span className="text-body-sm text-ash">{f}</span>
                    </div>
                  ))}
                </div>

                <p className="mb-3.5 text-body-sm font-bold uppercase tracking-[0.08em] text-bone">Tech Stack</p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {active.tech.map((t) => <Badge key={t}>{t}</Badge>)}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href={active.repo} external variant="primary"><GitBranch size={16} /> View on GitHub</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
