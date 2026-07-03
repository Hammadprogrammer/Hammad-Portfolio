"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ParticleShape } from "./ParticleField";

const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
  loading: () => null,
});

const SHAPES: ParticleShape[] = ["sphere", "brain", "lightbulb", "earth"];

/**
 * Three.js morphing point-cloud for the hero. Cycles through shapes
 * (sphere → brain → lightbulb → earth) on a slow timer, morphing between
 * them. Violet-dominant palette per the brand system.
 */
export default function HeroParticles() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % SHAPES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return <ParticleField shape={SHAPES[i]} count={5000} />;
}
