"use client";

import dynamic from "next/dynamic";
import type { BgTheme } from "./ThreeBackground";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
  loading: () => null,
});

export default function ThreeBg({ theme }: { theme: BgTheme }) {
  return <ThreeBackground theme={theme} />;
}
