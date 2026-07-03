"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── Brand palette ──────────────────────────────────────── */
const VIOLET = 0x8052ff;
const AMBER = 0xffb829;
const LICHEN = 0x15846e;
const BONE = 0xffffff;

const PALETTE = [
  new THREE.Color(VIOLET), new THREE.Color(VIOLET), new THREE.Color(VIOLET),
  new THREE.Color(BONE), new THREE.Color(AMBER), new THREE.Color(LICHEN),
];

/* ─── Shape generators (the morph targets) ───────────────── */
function makeSphere(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 1.0 + (Math.random() - 0.5) * 0.16;
    out[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = r * Math.cos(phi);
  }
  return out;
}

function makeBrain(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const u = Math.random(), v = Math.random();
    const phi = Math.acos(2 * u - 1);
    const theta = 2 * Math.PI * v;
    const r = 0.92 + (Math.random() - 0.5) * 0.16;
    out[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 0.72 + side * 0.52;
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.82;
    out[i * 3 + 2] = r * Math.cos(phi) * 0.9;
  }
  return out;
}

function makeTorusKnot(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const p = 2, q = 3;
  for (let i = 0; i < n; i++) {
    const u = (i / n) * Math.PI * 2 * q;
    const r = 0.6 + 0.3 * Math.cos(p * u / q);
    const jitter = () => (Math.random() - 0.5) * 0.12;
    out[i * 3] = (r * Math.cos(u)) + jitter();
    out[i * 3 + 1] = (r * Math.sin(u)) + jitter();
    out[i * 3 + 2] = (0.4 * Math.sin(p * u / q)) + jitter();
  }
  return out;
}

function makeGalaxy(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const arms = 4;
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 0.6) * 1.4;
    const arm = (i % arms) / arms * Math.PI * 2;
    const spin = r * 2.5;
    const spread = (Math.random() - 0.5) * 0.35 * (1 - r / 1.6);
    out[i * 3] = Math.cos(arm + spin) * r + spread;
    out[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
    out[i * 3 + 2] = Math.sin(arm + spin) * r + spread;
  }
  return out;
}

type ShapeFn = (n: number) => Float32Array;
const SHAPES: ShapeFn[] = [makeSphere, makeBrain, makeTorusKnot, makeGalaxy];

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = window.innerWidth < 768 ? 2600 : 4200;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4.2;

    const world = new THREE.Group();
    scene.add(world);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* ── Glow sprite for points ── */
    const sc = document.createElement("canvas");
    sc.width = sc.height = 64;
    const sx = sc.getContext("2d")!;
    const g = sx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    sx.fillStyle = g;
    sx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(sc);

    /* ── Morphing particle "character" core ── */
    const posA = makeSphere(COUNT);          // current
    const posB = new Float32Array(posA);     // target
    posB.set(posA);
    const posAttr = new THREE.BufferAttribute(new Float32Array(posA), 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);

    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", posAttr);
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.035, vertexColors: true, map: sprite, transparent: true,
      opacity: 0.9, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    world.add(points);

    /* ── Glowing wireframe core (inner "soul") ── */
    const coreGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: VIOLET, wireframe: true, transparent: true, opacity: 0.5 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    world.add(core);

    /* ── Floating wireframe polyhedra (the 3D objects) ── */
    const makers: (() => THREE.BufferGeometry)[] = [
      () => new THREE.TorusGeometry(0.5, 0.16, 12, 40),
      () => new THREE.OctahedronGeometry(0.5, 0),
      () => new THREE.IcosahedronGeometry(0.5, 0),
      () => new THREE.DodecahedronGeometry(0.45, 0),
      () => new THREE.TorusKnotGeometry(0.34, 0.11, 64, 8),
    ];
    const objColors = [VIOLET, AMBER, LICHEN, VIOLET, BONE];
    const floats: { mesh: THREE.LineSegments; base: THREE.Vector3; speed: number; phase: number }[] = [];
    makers.forEach((mk, i) => {
      const edges = new THREE.EdgesGeometry(mk());
      const lmat = new THREE.LineBasicMaterial({ color: objColors[i], transparent: true, opacity: 0.55 });
      const line = new THREE.LineSegments(edges, lmat);
      const angle = (i / makers.length) * Math.PI * 2;
      const radius = 2.6;
      const base = new THREE.Vector3(
        Math.cos(angle) * radius,
        (i % 2 === 0 ? 1 : -1) * (0.8 + Math.random() * 0.8),
        Math.sin(angle) * radius - 1.5,
      );
      line.position.copy(base);
      line.scale.setScalar(0.7 + Math.random() * 0.5);
      world.add(line);
      floats.push({ mesh: line, base, speed: 0.2 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2 });
    });

    /* ── Orbiting spark ring around the core ── */
    const RING = 380;
    const ringPos = new Float32Array(RING * 3);
    for (let i = 0; i < RING; i++) {
      const a = (i / RING) * Math.PI * 2;
      const r = 1.5 + Math.random() * 0.15;
      ringPos[i * 3] = Math.cos(a) * r;
      ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      ringPos[i * 3 + 2] = Math.sin(a) * r;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPos, 3));
    const ringMat = new THREE.PointsMaterial({
      size: 0.028, color: AMBER, map: sprite, transparent: true, opacity: 0.7,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Points(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.6;
    world.add(ring);

    /* ── Interaction state ── */
    let scrollProgress = 0;      // 0..1 across full document
    let targetShape = 0;
    let morphT = 1, morphing = false;
    let tiltX = 0, tiltY = 0, curTX = 0, curTY = 0;

    const computeScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      const idx = Math.min(SHAPES.length - 1, Math.floor(scrollProgress * SHAPES.length));
      if (idx !== targetShape) {
        targetShape = idx;
        const cur = posAttr.array as Float32Array;
        posA.set(cur);
        posB.set(SHAPES[idx](COUNT));
        morphT = 0;
        morphing = true;
      }
    };
    computeScroll();
    window.addEventListener("scroll", computeScroll, { passive: true });

    const onMouse = (e: MouseEvent) => {
      tiltY = (e.clientX / window.innerWidth - 0.5) * 0.6;
      tiltX = (e.clientY / window.innerHeight - 0.5) * -0.4;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* ── Animate ── */
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      /* Morph particle core toward target shape */
      if (morphing) {
        morphT = Math.min(morphT + 0.02, 1);
        const arr = posAttr.array as Float32Array;
        const e = morphT < 0.5 ? 2 * morphT * morphT : 1 - Math.pow(-2 * morphT + 2, 2) / 2;
        for (let i = 0; i < COUNT * 3; i++) arr[i] = posA[i] + (posB[i] - posA[i]) * e;
        posAttr.needsUpdate = true;
        if (morphT >= 1) { morphing = false; posA.set(posB); }
      }

      /* Smooth mouse tilt */
      curTX += (tiltX - curTX) * 0.05;
      curTY += (tiltY - curTY) * 0.05;

      if (!prefersReduced) {
        /* Whole world rotates with scroll + time + mouse */
        world.rotation.y = t * 0.08 + scrollProgress * Math.PI * 2 + curTY;
        world.rotation.x = curTX + Math.sin(t * 0.2) * 0.05;

        /* Core pulses + counter-rotates */
        const pulse = 1 + Math.sin(t * 1.5) * 0.08;
        core.scale.setScalar(pulse);
        core.rotation.x = -t * 0.3;
        core.rotation.y = -t * 0.2;

        /* Particle core spins */
        points.rotation.y = t * 0.05;

        /* Ring orbits */
        ring.rotation.z = t * 0.4;

        /* Floating objects drift + rotate + react to scroll */
        floats.forEach((f, i) => {
          f.mesh.rotation.x = t * f.speed;
          f.mesh.rotation.y = t * f.speed * 0.7;
          f.mesh.position.y = f.base.y + Math.sin(t * f.speed + f.phase) * 0.4;
          f.mesh.position.z = f.base.z + scrollProgress * 2 * (i % 2 === 0 ? 1 : -1);
        });

        /* Subtle camera dolly on scroll */
        camera.position.z = 4.2 - scrollProgress * 0.8;
      }

      renderer.render(scene, camera);
    };
    tick();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", computeScroll);
      window.removeEventListener("mousemove", onMouse);
      geo.dispose(); mat.dispose(); sprite.dispose();
      coreGeo.dispose(); coreMat.dispose();
      ringGeo.dispose(); ringMat.dispose();
      floats.forEach((f) => { f.mesh.geometry.dispose(); (f.mesh.material as THREE.Material).dispose(); });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="three-bg" aria-hidden="true" />;
}
