"use client";

import { motion } from "framer-motion";
import {
  Briefcase, GraduationCap, Award, Code2, Server, Database,
  Calendar, CheckCircle2,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../motion/Motion";
import { Button } from "../ui/Button";
import { Card, Badge, Eyebrow } from "../ui/Card";
import Section from "../ui/Section";
import AnimatedText from "../AnimatedText";

const PROFILE = [
  { label: "Role", val: "Full Stack Developer" },
  { label: "Focus", val: "React · Next.js · Firebase" },
  { label: "Experience", val: "2+ Years" },
  { label: "Location", val: "Karachi, Pakistan" },
  { label: "Status", val: "Open for work" },
];

const STORY = [
  { title: "Where it began", body: "I started in 2022 with curiosity and an HTML file. That first 'Hello World' on a live page hooked me — I wanted to build everything I could imagine on the web." },
  { title: "Going full-stack", body: "Frontend alone wasn't enough. I dove into Node.js, Express, and databases, learning to architect complete systems — from REST APIs to real-time sockets and auth flows." },
  { title: "Shipping for clients", body: "Today I deliver production-ready apps for clients worldwide: e-commerce platforms, dashboards, and APIs — always obsessing over performance, DX, and clean code." },
];

const TIMELINE = [
  { year: "2024 — Present", role: "Full Stack Developer", company: "7ctech", desc: "Developing responsive web applications and collaborating with design teams to create exceptional user experiences using modern technologies like React, Next.js, and Tailwind CSS.", achievements: ["React", "Next.js", "Tailwind CSS"] },
  { year: "2023 — 2024", role: "Freelance Developer", company: "Self-Employed", desc: "Worked independently on web and mobile projects for small businesses, focusing on responsive design, performance optimization, and delivering high-quality solutions that exceed client expectations.", achievements: ["Responsive design", "Performance", "Client delivery"] },
];

const SKILLS = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript / JavaScript", level: 92 },
  { name: "HTML / CSS / Tailwind", level: 94 },
  { name: "Node.js / Express", level: 88 },
  { name: "Firebase / REST APIs", level: 85 },
];

const CATEGORIES = [
  { label: "Frontend", Icon: Code2, items: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript", "React", "Next.js"] },
  { label: "UI & Backend", Icon: Server, items: ["Material-UI", "Styled Components", "Framer Motion", "Node.js", "Express.js", "Firebase"] },
  { label: "Tools & Deploy", Icon: Database, items: ["MongoDB", "Git", "GitHub", "Vercel", "Netlify", "Postman", "Figma", "VS Code"] },
];

const EDUCATION = [
  { title: "Bachelor's Degree", org: "Hamdard University", note: "sontinoe", period: "Graduation", desc: "Completed undergraduate studies at Hamdard University, Karachi.", Icon: GraduationCap },
  { title: "Full Stack Web Development", org: "Saylani Mass IT Training (SMIT)", period: "Certified", desc: "Completed a certified Full Stack Development course at Saylani, covering modern web development end to end.", Icon: Award },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-body-sm font-semibold text-bone">{name}</span>
        <span className="text-body-sm font-bold text-plum-voltage">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-pill bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-pill bg-plum-voltage"
        />
      </div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <div className="relative">
      {/* ════ HERO ════ */}
      <Section className="pt-36 pb-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal immediate><Eyebrow>About Me</Eyebrow></Reveal>
            <h1 className="mb-7 text-display font-bold leading-none">
              <AnimatedText text="Muhammad" as="span" className="block text-bone" delay={0.1} />
              <AnimatedText text="Hammad." as="span" className="block text-plum-voltage" delay={0.3} />
            </h1>
            <Reveal immediate delay={0.55}>
              <p className="mb-5 text-subheading text-ash">
                Full Stack Developer with 2+ years building modern web applications.
                I specialize in React &amp; Next.js frontends with Tailwind CSS, backed
                by Node.js, Express and Firebase.
              </p>
            </Reveal>
            <Reveal immediate delay={0.65}>
              <p className="text-body text-smoke">
                I care about clean code, DX, and performance. Whether it&apos;s a complex
                API, a real-time feature, or a pixel-perfect UI — I bring the same
                precision to every layer.
              </p>
            </Reveal>
          </div>

          <Reveal immediate delay={0.3} direction="left" distance={40}>
            <Card hover={false} className="flex flex-col gap-4 p-9">
              {PROFILE.map(({ label, val }) => (
                <div key={label} className="flex justify-between border-b border-white/10 pb-3.5">
                  <span className="text-caption uppercase tracking-[0.06em] text-smoke">{label}</span>
                  <span className="text-body-sm font-medium text-bone">{val}</span>
                </div>
              ))}
              <div className="flex gap-2.5 pt-1">
                <Button href="/projects" variant="primary" size="sm" className="w-full">View Projects</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ════ STORY ════ */}
      <Section className="pb-30">
        <Reveal><Eyebrow>My Story</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-12 text-heading font-bold text-bone md:text-heading-lg">From curiosity to craft.</h2>
        </Reveal>
        <Stagger stagger={0.12} className="grid gap-6 md:grid-cols-3">
          {STORY.map(({ title, body }, i) => (
            <StaggerItem key={title}>
              <Card className="h-full p-8">
                <p className="mb-4 text-heading font-bold text-plum-voltage/30">0{i + 1}</p>
                <p className="mb-3 text-subheading font-bold text-bone">{title}</p>
                <p className="text-body text-ash">{body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ════ TIMELINE ════ */}
      <Section className="pb-30">
        <Reveal><Eyebrow color="#ffb829">Experience</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-12 text-heading font-bold text-bone md:text-heading-lg">My professional journey.</h2>
        </Reveal>
        <div className="relative">
          <div className="absolute bottom-2 left-1.75 top-2 w-px bg-white/10" />
          <Stagger stagger={0.15}>
            {TIMELINE.map(({ year, role, company, desc, achievements }) => (
              <StaggerItem key={year + role} direction="up" distance={30}>
                <div className="grid grid-cols-[16px_1fr] gap-6 pb-8">
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-1.5 h-4 w-4 rounded-full bg-plum-voltage"
                  />
                  <Card className="p-6">
                    <div className="mb-2 flex flex-wrap justify-between gap-2">
                      <span className="text-subheading font-bold text-bone">{role}</span>
                      <span className="inline-flex items-center gap-1.5 text-caption font-bold text-plum-voltage">
                        <Calendar size={13} /> {year}
                      </span>
                    </div>
                    <p className="mb-3 flex items-center gap-1.5 text-body-sm text-smoke">
                      <Briefcase size={13} /> {company}
                    </p>
                    <p className="mb-3.5 text-body text-ash">{desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {achievements.map((a) => (
                        <span key={a} className="inline-flex items-center gap-1.5 rounded-pill border border-white/10 px-2.5 py-1 text-caption text-ash">
                          <CheckCircle2 size={12} className="text-lichen" /> {a}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ════ SKILLS ════ */}
      <Section className="pb-30">
        <Reveal><Eyebrow>Skills</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-12 text-heading font-bold text-bone md:text-heading-lg">What I&apos;m great at.</h2>
        </Reveal>
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          {SKILLS.map((s) => (
            <Reveal key={s.name} direction="up"><SkillBar {...s} /></Reveal>
          ))}
        </div>
      </Section>

      {/* ════ STACK ════ */}
      <Section className="pb-30">
        <Reveal><Eyebrow>Technology Stack</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-12 text-heading font-bold text-bone md:text-heading-lg">Tools across the stack.</h2>
        </Reveal>
        <Stagger stagger={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ label, Icon, items }) => (
            <StaggerItem key={label}>
              <Card className="h-full p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <Icon size={18} className="text-lichen" />
                  <span className="text-caption font-bold uppercase tracking-[0.08em] text-bone">{label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((it) => <Badge key={it}>{it}</Badge>)}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ════ EDUCATION ════ */}
      <Section className="pb-30">
        <Reveal><Eyebrow color="#ffb829">Education & Certifications</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-12 text-heading font-bold text-bone md:text-heading-lg">Learning never stops.</h2>
        </Reveal>
        <Stagger stagger={0.12} className="grid gap-6 md:grid-cols-2">
          {EDUCATION.map(({ title, org, note, period, desc, Icon }) => (
            <StaggerItem key={title}>
              <Card className="h-full p-7">
                <Icon size={24} className="mb-4 text-lichen" />
                <p className="mb-1 text-subheading font-bold text-bone">{title}</p>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-body-sm font-semibold text-plum-voltage">{org}</p>
                  {note ? <span className="text-caption text-smoke">{note}</span> : null}
                </div>
                <p className="mb-3 text-caption text-smoke">{period}</p>
                <p className="text-body text-ash">{desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

    </div>
  );
}
