"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type BgTheme = "home" | "about" | "projects" | "contact";

const THEMES: Record<BgTheme, {
  accent: number; nebula: number; drift: number; tilt: number;
}> = {
  home    : { accent: 0x4f8ef7, nebula: 0x1e3a8a, drift: 0.00018, tilt: 0.00006 }, /* electric blue + deep navy  */
  about   : { accent: 0x38bdf8, nebula: 0x0c3b5e, drift: 0.00012, tilt: 0.00004 }, /* steel sky + midnight ocean */
  projects: { accent: 0xf4a340, nebula: 0x7c3000, drift: 0.00022, tilt: 0.00007 }, /* warm amber + burnt sienna  */
  contact : { accent: 0x2dd4bf, nebula: 0x0d4b44, drift: 0.00010, tilt: 0.00003 }, /* cool cyan-teal + dark jade */
};

/* ── helpers ─────────────────────────────────────────────── */
function makeSprite(color: string, size = 64): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  g.addColorStop(0,   color.replace(")", ",1)").replace("rgb","rgba"));
  g.addColorStop(0.35,"rgba(255,255,255,0.55)");
  g.addColorStop(0.7, "rgba(255,255,255,0.08)");
  g.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

function randBox(spread: number): [number, number, number] {
  return [
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
  ];
}

/* build a layer of stars scattered in a box */
function makeStarLayer(n: number, spread: number, colors: number[]): {
  geo: THREE.BufferGeometry; mat: THREE.PointsMaterial; sprite: THREE.CanvasTexture;
} {
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [x, y, z] = randBox(spread);
    pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
    const hex = colors[Math.floor(Math.random() * colors.length)];
    const c = new THREE.Color(hex);
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
  const sprite = makeSprite("rgb(255,255,255)");
  const mat = new THREE.PointsMaterial({
    size: 0.012 + Math.random() * 0.018,
    vertexColors: true, map: sprite,
    transparent: true, opacity: 0.9,
    sizeAttenuation: true, depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return { geo, mat, sprite };
}

/* build a nebula cloud: N large soft blobs scattered in a disc */
function makeNebula(n: number, accentHex: number, nebulaHex: number): {
  geo: THREE.BufferGeometry; mat: THREE.PointsMaterial; sprite: THREE.CanvasTexture;
} {
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const colors = [accentHex, nebulaHex, 0xffffff, accentHex, nebulaHex];
  for (let i = 0; i < n; i++) {
    /* disc distribution */
    const r     = 2.5 + Math.random() * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const y     = (Math.random() - 0.5) * 3.5;
    pos[i*3]   = Math.cos(theta) * r;
    pos[i*3+1] = y;
    pos[i*3+2] = Math.sin(theta) * r;
    const hex = colors[Math.floor(Math.random() * colors.length)];
    const c = new THREE.Color(hex);
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
  const sprite = makeSprite("rgb(180,140,255)", 128);
  const mat = new THREE.PointsMaterial({
    size: 0.55,
    vertexColors: true, map: sprite,
    transparent: true, opacity: 0.18,
    sizeAttenuation: true, depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return { geo, mat, sprite };
}

export default function ThreeBackground({ theme = "home" }: { theme?: BgTheme }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const cfg = THEMES[theme];

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.01, 200);
    camera.position.set(0, 0, 6);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* ── LAYER 1: deep tiny stars ── */
    const deep = makeStarLayer(4200, 28, [0xffffff, 0xffffff, 0xffffff, 0xaaaaff, 0xffeecc]);
    const deepPts = new THREE.Points(deep.geo, deep.mat);
    scene.add(deepPts);

    /* ── LAYER 2: mid stars with accent color ── */
    const mid = makeStarLayer(1600, 18, [0xffffff, cfg.accent, cfg.accent, 0xffffff, cfg.nebula]);
    const midPts = new THREE.Points(mid.geo, mid.mat);
    midPts.material.size = 0.028;
    scene.add(midPts);

    /* ── LAYER 3: bright foreground stars ── */
    const near = makeStarLayer(400, 10, [0xffffff, cfg.accent, 0xffffff]);
    const nearPts = new THREE.Points(near.geo, near.mat);
    nearPts.material.size = 0.05;
    nearPts.material.opacity = 1.0;
    scene.add(nearPts);

    /* ── LAYER 4: nebula cloud ── */
    const neb = makeNebula(320, cfg.accent, cfg.nebula);
    const nebPts = new THREE.Points(neb.geo, neb.mat);
    scene.add(nebPts);

    /* ── LAYER 5: accent nebula band (horizontal streak) ── */
    const band = makeNebula(180, cfg.accent, cfg.nebula);
    const bandPts = new THREE.Points(band.geo, band.mat);
    bandPts.scale.set(1.4, 0.25, 1.4);
    bandPts.material.opacity = 0.22;
    scene.add(bandPts);

    const allLayers = [deepPts, midPts, nearPts, nebPts, bandPts];

    /* ── mouse parallax ── */
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMouse = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 0.3;
      ty = (e.clientY / window.innerHeight - 0.5) * -0.2;
    };
    window.addEventListener("mousemove", onMouse);

    /* ── animate ── */
    let t = 0, raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t++;
      mx += (tx - mx) * 0.03;
      my += (ty - my) * 0.03;

      /* each layer drifts at a different rate — parallax depth feel */
      deepPts.rotation.y  = t * cfg.drift * 0.4 + mx * 0.06;
      deepPts.rotation.x  = my * 0.04;
      midPts.rotation.y   = t * cfg.drift * 0.8 + mx * 0.10;
      midPts.rotation.x   = my * 0.07;
      nearPts.rotation.y  = t * cfg.drift * 1.4 + mx * 0.16;
      nearPts.rotation.x  = my * 0.12;
      nebPts.rotation.y   = t * cfg.drift * 0.5 + mx * 0.05;
      nebPts.rotation.x   = t * cfg.tilt + my * 0.03;
      bandPts.rotation.y  = t * cfg.drift * 0.3 + mx * 0.04;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      allLayers.forEach(l => { l.geometry.dispose(); (l.material as THREE.PointsMaterial).dispose(); });
      [deep.sprite, mid.sprite, near.sprite, neb.sprite, band.sprite].forEach(s => s.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [theme]);

  return <div ref={mountRef} className="three-bg" aria-hidden="true" />;
}
