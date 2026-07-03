"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── Brand palette ────────────────────────────────────── */
const PALETTE = [
  new THREE.Color(0x8052ff), // plum voltage (dominant)
  new THREE.Color(0x8052ff),
  new THREE.Color(0x8052ff),
  new THREE.Color(0xffffff), // bone
  new THREE.Color(0xffffff),
  new THREE.Color(0xffb829), // amber spark
  new THREE.Color(0x15846e), // lichen
  new THREE.Color(0xbdbdbd), // ash
];

/* ─── Shape generators ─────────────────────────────────── */

/** Fibonacci sphere */
function makeSphere(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi   = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 1.0 + (Math.random() - 0.5) * 0.18;
    out[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = r * Math.cos(phi);
  }
  return out;
}

/** Brain: two 3D ellipsoidal lobes side-by-side with surface concentration */
function makeBrain(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    // alternate between left and right lobe
    const side = i % 2 === 0 ? -1 : 1;
    // random point on sphere surface (rejection-free)
    const u = Math.random();
    const v = Math.random();
    const phi   = Math.acos(2 * u - 1);
    const theta = 2 * Math.PI * v;
    // shell thickness — concentrate near surface
    const r = 0.92 + (Math.random() - 0.5) * 0.16;
    // ellipsoid: wide on x, moderate on y, squished on z
    const lx = r * Math.sin(phi) * Math.cos(theta) * 0.72;
    const ly = r * Math.sin(phi) * Math.sin(theta) * 0.82;
    const lz = r * Math.cos(phi) * 0.90;
    // offset each lobe sideways on X axis
    out[i * 3]     = lx + side * 0.52;
    out[i * 3 + 1] = ly;
    out[i * 3 + 2] = lz;
  }
  return out;
}

/** Lightbulb: sphere bottom, tapered neck top */
function makeLightbulb(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi   = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 0.92 + (Math.random() - 0.5) * 0.16;
    let x = r * Math.sin(phi) * Math.cos(theta);
    let y = r * Math.sin(phi) * Math.sin(theta);
    let z = r * Math.cos(phi);
    // taper the top into a bulb neck
    if (z > 0.5) {
      const t = (z - 0.5) / 0.5; // 0→1
      x *= 1 - t * 0.65;
      y *= 1 - t * 0.65;
      z  = 0.5 + t * 0.55;
    }
    out[i * 3]     = x;
    out[i * 3 + 1] = y - 0.12;
    out[i * 3 + 2] = z;
  }
  return out;
}

/** Earth: slightly oblate sphere */
function makeEarth(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi   = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 0.95 + (Math.random() - 0.5) * 0.12;
    out[i * 3]     = r * Math.sin(phi) * Math.cos(theta) * 1.0;
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.0;
    out[i * 3 + 2] = r * Math.cos(phi) * 0.92; // oblate
  }
  return out;
}

export type ParticleShape = "sphere" | "brain" | "lightbulb" | "earth";

export default function ParticleField({
  count   = 5000,
  shape   = "sphere",
  className = "",
}: {
  count?    : number;
  shape?    : ParticleShape;
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<ParticleShape>(shape);

  /* Keep shapeRef in sync without re-running the whole effect */
  useEffect(() => { shapeRef.current = shape; }, [shape]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.z = 3.6;

    const resize = () => {
      const w = mount.clientWidth  || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* ── Soft glow sprite ── */
    const sc = document.createElement("canvas");
    sc.width = sc.height = 64;
    const sx = sc.getContext("2d")!;
    const sg = sx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sg.addColorStop(0,    "rgba(255,255,255,1)");
    sg.addColorStop(0.45, "rgba(255,255,255,0.55)");
    sg.addColorStop(1,    "rgba(255,255,255,0)");
    sx.fillStyle = sg;
    sx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(sc);

    /* ── Build geometry ── */
    const SHAPES: Record<ParticleShape, () => Float32Array> = {
      sphere   : () => makeSphere(count),
      brain    : () => makeBrain(count),
      lightbulb: () => makeLightbulb(count),
      earth    : () => makeEarth(count),
    };

    /* positions for current & target shape */
    const posA = SHAPES[shapeRef.current]();          // current
    const posB = new Float32Array(count * 3);          // target (starts same)
    posB.set(posA);

    const posAttr = new THREE.BufferAttribute(new Float32Array(posA), 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);

    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", posAttr);
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size          : 0.036,
      vertexColors  : true,
      map           : sprite,
      transparent   : true,
      opacity       : 0.90,
      sizeAttenuation: true,
      depthWrite    : false,
      blending      : THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ── Morphing state ── */
    let morphT     = 1.0;           // 1 = fully at posA
    let morphing   = false;
    let prevShape  = shapeRef.current;

    /* ── Mouse tilt ── */
    let tiltX = 0, tiltY = 0;
    const onMouse = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      tiltY = ((e.clientX - r.left)  / r.width  - 0.5) *  0.5;
      tiltX = ((e.clientY - r.top)   / r.height - 0.5) * -0.5;
    };
    window.addEventListener("mousemove", onMouse);

    /* ── Animate ── */
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      /* Detect shape change & start morph */
      if (shapeRef.current !== prevShape) {
        prevShape = shapeRef.current;
        // set posA = current interpolated pos, posB = new target
        const cur = posAttr.array as Float32Array;
        posA.set(cur);
        const nb = SHAPES[shapeRef.current]();
        posB.set(nb);
        morphT   = 0;
        morphing = true;
      }

      /* Lerp particles toward target */
      if (morphing) {
        morphT = Math.min(morphT + 0.018, 1);
        const arr = posAttr.array as Float32Array;
        const ease = morphT < 0.5
          ? 2 * morphT * morphT
          : 1 - Math.pow(-2 * morphT + 2, 2) / 2;
        for (let i = 0; i < count * 3; i++) {
          arr[i] = posA[i] + (posB[i] - posA[i]) * ease;
        }
        posAttr.needsUpdate = true;
        if (morphT >= 1) { morphing = false; posA.set(posB); }
      }

      /* Slow auto-rotate */
      points.rotation.y += 0.0014;
      /* Mouse tilt */
      points.rotation.x += (tiltX - points.rotation.x) * 0.04;
      points.rotation.z += (tiltY * 0.15 - points.rotation.z) * 0.04;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [count]); // only re-mount if count changes

  return (
    <div ref={mountRef} aria-hidden="true" className={`h-full w-full ${className}`} />
  );
}
