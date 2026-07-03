"use client";

import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  /** Particle density factor. Higher = more nodes. */
  density?: number;
  /** Base opacity of the whole field (0-1). */
  opacity?: number;
  /** If true, canvas is fixed to viewport (global bg). Otherwise absolute-fills parent. */
  fixed?: boolean;
  /** Enable subtle parallax drift tied to scroll. */
  parallax?: boolean;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const ACCENT = "128,82,255"; // plum voltage rgb
const LICHEN = "21,132,110"; // decorative node accent

/**
 * Animated constellation network — floating nodes connected by thin
 * violet lines. Pure canvas, transform/opacity only, GPU-friendly.
 */
export default function ParticleBackground({
  density = 1,
  opacity = 0.6,
  fixed = true,
  parallax = true,
  className = "",
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };
    let scrollY = 0;

    const parent = fixed ? null : canvas.parentElement;

    const measure = () => {
      width = fixed ? window.innerWidth : parent?.clientWidth || window.innerWidth;
      height = fixed ? window.innerHeight : parent?.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(((width * height) / 18000) * density);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    measure();

    const LINK_DIST = 130;
    const MOUSE_DIST = 170;

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;

      const drift = parallax ? scrollY * 0.02 : 0;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const py = n.y - drift;

        // node dot
        const isLichen = i % 11 === 0;
        ctx.beginPath();
        ctx.arc(n.x, py, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${isLichen ? LICHEN : ACCENT},${isLichen ? 0.55 : 0.75})`;
        ctx.fill();

        // links to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const a = (1 - dist / LINK_DIST) * 0.5;
            ctx.beginPath();
            ctx.moveTo(n.x, py);
            ctx.lineTo(m.x, m.y - drift);
            ctx.strokeStyle = `rgba(${ACCENT},${a})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // link to mouse
        const mdx = n.x - mouse.x;
        const mdy = py - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < MOUSE_DIST) {
          const a = (1 - mdist / MOUSE_DIST) * 0.7;
          ctx.beginPath();
          ctx.moveTo(n.x, py);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${ACCENT},${a})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };
    tick();

    const onMove = (e: MouseEvent) => {
      if (fixed) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      } else {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    if (parent) ro.observe(parent);
    else window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [density, opacity, fixed, parallax]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: fixed ? "fixed" : "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
