"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

/** SSR-off wrapper for the global Three.js theme. */
export default function Scene3DClient() {
  return <Scene3D />;
}
