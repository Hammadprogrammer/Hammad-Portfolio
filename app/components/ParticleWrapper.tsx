"use client";

import dynamic from "next/dynamic";
import type { ParticleShape } from "./ParticleField";

const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function ParticleWrapper({
  count = 5000,
  shape = "sphere",
  className = "",
}: {
  count?: number;
  shape?: ParticleShape;
  className?: string;
}) {
  return <ParticleField count={count} shape={shape} className={className} />;
}
