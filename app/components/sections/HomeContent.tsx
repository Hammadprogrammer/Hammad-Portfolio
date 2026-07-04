"use client";

import {
  ArrowRight, ArrowDown, Code2, Server, Database,
  Palette, Braces, Paintbrush, Flame, FileType, Layers, Atom, Hexagon,
  GitBranch, GitFork, Wind, Component, Sparkles, Triangle, Globe, SquareCode, Send, PenTool,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem, motion } from "../motion/Motion";
import { Button } from "../ui/Button";
import { Card, Badge, Eyebrow } from "../ui/Card";
import Section from "../ui/Section";
import AnimatedText from "../AnimatedText";

const TECH = [
  { name: "React", Icon: Atom },
  { name: "Next.js", Icon: Layers },
  { name: "TypeScript", Icon: FileType },
  { name: "JavaScript", Icon: Braces },
  { name: "HTML5", Icon: Code2 },
  { name: "CSS3", Icon: Palette },
  { name: "Tailwind CSS", Icon: Wind },
  { name: "Material-UI", Icon: Component },
  { name: "Framer Motion", Icon: Sparkles },
  { name: "Styled Components", Icon: Paintbrush },
  { name: "Node.js", Icon: Hexagon },
  { name: "Express.js", Icon: Server },
  { name: "MongoDB", Icon: Database },
  { name: "Firebase", Icon: Flame },
  { name: "Vercel", Icon: Triangle },
  { name: "Netlify", Icon: Globe },
  { name: "Git", Icon: GitBranch },
  { name: "GitHub", Icon: GitFork },
  { name: "VS Code", Icon: SquareCode },
  { name: "Postman", Icon: Send },
  { name: "Figma", Icon: PenTool },
];

const FEATURED = [
  { title: "ShopEase", sub: "E-Commerce Platform", tech: ["Next.js", "Node.js", "MongoDB", "Stripe"], desc: "Full-stack store with cart, Stripe payments, admin dashboard, and real-time inventory." },
  { title: "TeamFlow", sub: "Project Management", tech: ["React", "Express", "PostgreSQL", "Socket.io"], desc: "Real-time Kanban boards with drag-and-drop, live updates, and team collaboration." },
  { title: "ContentHub", sub: "Headless CMS & API", tech: ["Node.js", "Prisma", "PostgreSQL", "JWT"], desc: "Scalable headless CMS with RBAC auth, media library, and versioned content API." },
];

const SERVICES = [
  { Icon: Code2, title: "Frontend Dev", desc: "React, Next.js & TypeScript — pixel-perfect, accessible, blazing fast." },
  { Icon: Server, title: "Backend & APIs", desc: "Node.js, Express, REST & GraphQL — secure and infinitely scalable." },
  { Icon: Database, title: "Databases", desc: "PostgreSQL, MongoDB, Redis — optimized schemas and lightning queries." },
];

export default function HomeContent() {
  return (
    <div className="relative">
      {/* ════ HERO — centered over the global Three.js theme ════ */}
      <Section className="flex min-h-screen flex-col items-center justify-center pt-28 pb-20 text-center">
        <Reveal immediate direction="up" distance={16}>
          <span className="label-amber mb-8">
            <span className="dot-live" /> Available for hire
          </span>
        </Reveal>

        <h1 className="mb-5 text-display font-bold md:text-hero">
          <AnimatedText text="Muhammad" as="span" className="block text-bone" delay={0.1} />
          <AnimatedText text="Hammad" as="span" className="block text-plum-voltage" delay={0.35} />
        </h1>

        <Reveal immediate delay={0.6}>
          <p className="mb-5 text-body-sm font-semibold uppercase tracking-wider text-plum-voltage">
            Full Stack Developer
          </p>
        </Reveal>

        <Reveal immediate delay={0.7}>
          <p className="mb-10 max-w-xl text-subheading text-ash">
            I craft fast, scalable web applications — React frontends, Node.js
            backends, and everything in between. Turning complex problems into
            elegant products.
          </p>
        </Reveal>

        <Reveal immediate delay={0.8}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/projects" variant="primary">
              View Projects <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Me
            </Button>
          </div>
        </Reveal>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.15em] text-smoke">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="text-plum-voltage">
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </Section>

      {/* ════ TECH STACK ════ */}
      <Section className="pb-30">
        <Reveal><Eyebrow>Tech Stack</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <AnimatedText onView as="h2" by="word" text="Technologies & Tools." className="mb-12 block text-heading font-bold text-bone md:text-heading-lg" />
        </Reveal>
        <Stagger stagger={0.05} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {TECH.map(({ name, Icon }) => (
            <StaggerItem key={name}>
              <div className="card card-hover flex flex-col items-center gap-3 px-4 py-5 text-center">
                <Icon size={22} className="text-plum-voltage" />
                <span className="text-caption font-semibold text-ash">{name}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ════ FEATURED PROJECTS ════ */}
      <Section className="pb-30">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal><Eyebrow>Featured Work</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-heading font-bold text-bone md:text-heading-lg">Projects I&apos;ve shipped.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button href="/projects" variant="secondary" size="sm">All Projects <ArrowRight size={14} /></Button>
          </Reveal>
        </div>

        <Stagger stagger={0.12} className="grid gap-6 md:grid-cols-3">
          {FEATURED.map(({ title, sub, tech, desc }) => (
            <StaggerItem key={title}>
              <Card className="flex h-full flex-col gap-4 p-8">
                <div>
                  <p className="mb-1.5 text-caption font-bold uppercase tracking-[0.1em] text-lichen">{sub}</p>
                  <h3 className="text-heading-sm font-bold text-bone">{title}</h3>
                </div>
                <p className="flex-1 text-body text-ash">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tech.map((t) => <Badge key={t}>{t}</Badge>)}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ════ SERVICES ════ */}
      <Section className="pb-30">
        <Reveal><Eyebrow>What I offer</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-12 text-heading font-bold text-bone md:text-heading-lg">Full-stack, end to end.</h2>
        </Reveal>
        <Stagger stagger={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ Icon, title, desc }) => (
            <StaggerItem key={title}>
              <Card className="h-full p-7">
                <Icon size={24} className="mb-4 text-lichen" />
                <p className="mb-2.5 text-subheading font-bold text-bone">{title}</p>
                <p className="text-body text-ash">{desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ════ CTA ════ */}
      <Section className="pb-30">
        <Reveal>
          <div className="rounded-pill border border-white/10 px-8 py-16 text-center md:px-12 md:py-20">
            <Eyebrow color="#ffb829">Open for work</Eyebrow>
            <h2 className="mx-auto mb-4 max-w-3xl text-heading font-bold text-bone md:text-display">
              Got a project idea? <span className="text-plum-voltage">Let&apos;s build it.</span>
            </h2>
            <p className="mx-auto mb-9 max-w-md text-body text-ash">
              Available for freelance, contracts, and full-time roles. Response within 24h.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="primary">Start a Conversation <ArrowRight size={16} /></Button>
              <Button href="/about" variant="secondary">Learn About Me</Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
