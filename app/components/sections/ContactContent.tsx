"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MessageCircle, MapPin, Send, CheckCircle2, ArrowRight, Clock,
  GitBranch, Briefcase,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../motion/Motion";
import { Button } from "../ui/Button";
import { Card, Eyebrow } from "../ui/Card";
import Section from "../ui/Section";
import AnimatedText from "../AnimatedText";

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/Hammadprogrammer", Icon: GitBranch },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hammad-zahid-543a652a6/", Icon: Briefcase },
  { label: "WhatsApp", href: "https://wa.me/923118270539", Icon: MessageCircle },
];

const INFO = [
  { label: "Email", val: "hammadzahid221@gmail.com", Icon: Mail },
  { label: "WhatsApp", val: "+92 311 8270539", Icon: MessageCircle },
  { label: "Location", val: "Karachi, Pakistan", Icon: MapPin },
  { label: "Availability", val: "Open · Responds in 24h", Icon: Clock },
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  subject: z.string().trim().min(3, "Subject should be at least 3 characters"),
  message: z.string().trim().min(20, "Please write at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const fieldBase =
  "w-full rounded-pill border bg-black px-4 py-3.5 text-body-sm text-bone outline-none transition-colors placeholder:text-smoke focus:border-plum-voltage";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-caption font-bold uppercase tracking-widest text-smoke">
      {children}
    </label>
  );
}

export default function ContactContent() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });

  const firstName = (watch("name") || "").split(" ")[0];
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setSubmitError(error instanceof Error ? error.message : "Failed to send message.");
    }
  };

  return (
    <div className="relative">
      {/* ════ HERO ════ */}
      <Section className="pt-36 pb-14">
        <Reveal immediate>
          <span className="label-amber mb-7"><span className="dot-live" /> Available now</span>
        </Reveal>
        <h1 className="mb-5 text-display font-bold leading-none">
          <AnimatedText text="Let's Build" as="span" className="block text-bone" delay={0.1} />
          <AnimatedText text="Something Great." as="span" className="block text-plum-voltage" delay={0.3} />
        </h1>
        <Reveal immediate delay={0.5}>
          <p className="max-w-xl text-subheading text-ash">
            Full Stack Developer open for freelance projects, contracts &amp; full-time
            roles. Drop a message — I respond within 24 hours.
          </p>
        </Reveal>
      </Section>

      {/* ════ MAIN GRID ════ */}
      <Section className="pb-25">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* FORM */}
          <Reveal direction="up">
            <Card hover={false} className="p-8 md:p-11">
              <AnimatePresence mode="wait">
                {isSubmitSuccessful ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 flex justify-center text-lichen"
                    >
                      <CheckCircle2 size={64} />
                    </motion.div>
                    <h3 className="mb-3 text-heading-sm font-bold text-bone">Message sent!</h3>
                    <p className="mb-6 text-body text-ash">
                      Thanks for reaching out, {firstName || "friend"}. I&apos;ll get back to you within 24 hours.
                    </p>
                    <Button variant="secondary" onClick={() => reset()}>Send another</Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Full Name</Label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          autoComplete="name"
                          className={fieldBase}
                          style={{ borderColor: errors.name ? "rgba(255,120,120,0.6)" : "rgba(255,255,255,0.1)" }}
                          {...register("name")}
                        />
                        {errors.name && <p className="mt-1.5 text-caption text-red-400">{errors.name.message}</p>}
                      </div>
                      <div>
                        <Label>Email</Label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          className={fieldBase}
                          style={{ borderColor: errors.email ? "rgba(255,120,120,0.6)" : "rgba(255,255,255,0.1)" }}
                          {...register("email")}
                        />
                        {errors.email && <p className="mt-1.5 text-caption text-red-400">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <Label>Subject</Label>
                      <input
                        type="text"
                        placeholder="Project inquiry"
                        autoComplete="off"
                        className={fieldBase}
                        style={{ borderColor: errors.subject ? "rgba(255,120,120,0.6)" : "rgba(255,255,255,0.1)" }}
                        {...register("subject")}
                      />
                      {errors.subject && <p className="mt-1.5 text-caption text-red-400">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <Label>Message</Label>
                      <textarea
                        rows={6}
                        placeholder="Tell me about your project, timeline, and budget..."
                        className={`${fieldBase} resize-y rounded-3xl`}
                        style={{ borderColor: errors.message ? "rgba(255,120,120,0.6)" : "rgba(255,255,255,0.1)" }}
                        {...register("message")}
                      />
                      {errors.message && <p className="mt-1.5 text-caption text-red-400">{errors.message.message}</p>}
                    </div>

                    {submitError && (
                      <div className="flex items-start gap-2 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        <Mail size={16} className="mt-0.5 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </Reveal>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-4">
            <Reveal direction="left" delay={0.1}>
              <Card hover={false} className="p-7">
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span className="dot-live" />
                  <span className="text-body-sm font-bold text-lichen">Currently available</span>
                </div>
                <p className="text-body text-ash">
                  Open for freelance projects and full-time roles starting immediately.
                  Typical response time: <strong className="text-bone">under 24 hours.</strong>
                </p>
              </Card>
            </Reveal>

            <Stagger stagger={0.08} className="flex flex-col gap-4">
              {INFO.map(({ label, val, Icon }) => (
                <StaggerItem key={label} direction="left">
                  <Card className="flex items-center gap-3.5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-white/10 text-lichen">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-caption uppercase tracking-[0.06em] text-smoke">{label}</p>
                      <p className="text-body-sm font-semibold text-bone">{val}</p>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal direction="left" delay={0.2}>
              <Card hover={false} className="p-6">
                <p className="eyebrow mb-4 text-smoke">Find me at</p>
                <div className="flex flex-wrap gap-2.5">
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
                      className="flex h-11 w-11 items-center justify-center rounded-pill border border-white/10 text-ash transition-colors hover:border-plum-voltage hover:text-plum-voltage"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ════ CTA ════ */}
      <Section className="pb-30">
        <Reveal>
          <div className="rounded-pill border border-white/10 px-8 py-16 text-center md:px-12">
            <Eyebrow color="#ffb829">Let&apos;s work together</Eyebrow>
            <h2 className="mb-4 text-heading font-bold text-bone md:text-display">
              Have a project in mind?
            </h2>
            <p className="mx-auto mb-9 max-w-md text-body text-ash">
              Whether it&apos;s a full product or a quick consultation, I&apos;d love to hear about it.
            </p>
            <Button href="mailto:hammadzahid221@gmail.com" external variant="primary">
              Email Me Directly <ArrowRight size={16} />
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
