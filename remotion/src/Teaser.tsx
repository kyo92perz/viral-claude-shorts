// "WHAT IF? — fly to Mars" 10 s teaser: Polyfork low-poly 3D (rocket + astronaut) in three.js via @remotion/three,
// Chatterbox-Turbo narration + generated SFX mix (cartoon-3d-short scripts), motion rules of remotion-motion-graphics:
// eased/spring motion only, 5-layer stack, staggered entrances, faster exits, idle breathing, timing from fps + words.json.
import React, { useEffect, useMemo, useState } from "react";
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { theme, ez } from "./theme";
import words from "./teaser-words.json";

const W = words as { w: string; s: number; e: number }[];
const at = (word: string) => (W.find((x) => x.w.toLowerCase().startsWith(word))?.s ?? 0);
const MARS = "#e0602a", SPACE = "#07071a";

// ---------------------------------------------------------------- 2D layers
const Stars: React.FC = () => {
  const f = useCurrentFrame();
  const stars = useMemo(() => Array.from({ length: 140 }, (_, i) => ({ x: (i * 397) % 1080, y: (i * 761) % 1920, r: 1 + (i % 3), p: i * 0.7 })), []);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #1a1450 0%, ${SPACE} 70%)` }}>
      <div style={{ position: "absolute", width: 1100, height: 1100, borderRadius: "50%", left: -350 + Math.sin(f / 55) * 40, top: -300, filter: "blur(60px)", background: "radial-gradient(circle, #6a3ac855, transparent 62%)" }} />
      <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", right: -300 - Math.cos(f / 70) * 40, bottom: -200, filter: "blur(70px)", background: `radial-gradient(circle, ${MARS}33, transparent 65%)` }} />
      {stars.map((s, i) => <div key={i} style={{ position: "absolute", left: s.x, top: (s.y + f * (0.4 + (i % 3) * 0.3)) % 1920, width: s.r * 2, height: s.r * 2, borderRadius: "50%", background: "#fff", opacity: 0.4 + 0.5 * Math.abs(Math.sin(f / 18 + s.p)) }} />)}
    </AbsoluteFill>
  );
};
const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill style={{ backgroundColor: "#3a2a8a", mixBlendMode: "soft-light", opacity: 0.2 }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.25), transparent 30%, transparent 70%, rgba(0,0,0,.35))" }} />
  </AbsoluteFill>
);
const Grain: React.FC = () => {
  const f = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return <AbsoluteFill style={{ pointerEvents: "none", backgroundImage: noise, backgroundSize: "220px", backgroundPosition: `${(f * 7) % 220}px ${(f * 13) % 220}px`, opacity: 0.07, mixBlendMode: "overlay" }} />;
};
const Vignette: React.FC = () => <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,.5) 100%)" }} />;

// big title letters spring in, staggered 3 f; exit faster (8 f)
const Title: React.FC<{ text: string; y: number; size: number; color: string; outAt: number }> = ({ text, y, size, color, outAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const out = ez(f, [outAt, outAt + 8], [0, 1], theme.ease.in);
  return (
    <div style={{ position: "absolute", top: y, width: "100%", display: "flex", justifyContent: "center", gap: 6 }}>
      {text.split("").map((c, i) => {
        const s = spring({ frame: f - i * 3, fps, config: theme.spring.bouncy });
        return <span key={i} style={{ fontFamily: theme.fonts.display, fontSize: size, color, display: "inline-block", WebkitTextStroke: `10px ${theme.colors.ink}`, paintOrder: "stroke fill",
          transform: `translateY(${(1 - s) * 160 - out * 300}px) scale(${0.4 + 0.6 * s}) rotate(${(1 - s) * (i % 2 ? 12 : -12)}deg)`, opacity: Math.min(1, s * 1.5) * (1 - out) }}>{c === " " ? " " : c}</span>;
      })}
    </div>
  );
};
// words appear on their spoken time (rise + scale + fade), spoken word in hero yellow
const Line: React.FC<{ from: number; to: number; y: number; outAt: number }> = ({ from, to, y, outAt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig(); const t = f / fps;
  const out = ez(f, [outAt, outAt + 8], [0, 1], theme.ease.in);
  return (
    <div style={{ position: "absolute", top: y, width: "100%", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 22, padding: "0 70px", boxSizing: "border-box" }}>
      {W.slice(from, to).map((w, i) => {
        const s = spring({ frame: f - Math.round(w.s * fps) + 2, fps, config: theme.spring.snappy });
        const on = t >= w.s && t <= w.e + 0.15;
        return <span key={i} style={{ fontFamily: theme.fonts.display, fontSize: 92, color: on ? theme.colors.hero : "#fff", WebkitTextStroke: `9px ${theme.colors.ink}`, paintOrder: "stroke fill",
          transform: `translateY(${(1 - s) * 60 - out * 120}px) scale(${0.7 + 0.3 * s})`, opacity: s * (1 - out), display: "inline-block" }}>{w.w.replace(/[.,?]/g, "").toUpperCase()}</span>;
      })}
    </div>
  );
};
// countdown number: pops on its word, exits fast
const Count: React.FC<{ n: string; t: number }> = ({ n, t }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig(); const f0 = Math.round(t * fps);
  const s = spring({ frame: f - f0 + 2, fps, config: theme.spring.bouncy });
  const out = ez(f, [f0 + 16, f0 + 24], [0, 1], theme.ease.in);
  if (f < f0 - 2 || out >= 1) return null;
  return <div style={{ position: "absolute", top: 380, width: "100%", textAlign: "center", fontFamily: theme.fonts.display, fontSize: 420, color: theme.colors.hero, WebkitTextStroke: `16px ${theme.colors.ink}`, paintOrder: "stroke fill",
    transform: `scale(${(0.3 + 0.7 * s) * (1 + out * 0.6)})`, opacity: (1 - out) * Math.min(1, s * 2) }}>{n}</div>;
};

// ---------------------------------------------------------------- 3D (Polyfork GLBs)
function useGlb(file: string, height: number) {
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [h] = useState(() => delayRender(`load ${file}`));
  useEffect(() => {
    new GLTFLoader().load(staticFile(file), (g) => {
      const o = g.scene; const box = new THREE.Box3().setFromObject(o); const size = box.getSize(new THREE.Vector3());
      o.scale.setScalar(height / (size.y || 1)); const b2 = new THREE.Box3().setFromObject(o); const c = b2.getCenter(new THREE.Vector3());
      o.position.set(-c.x, -b2.min.y, -c.z);
      o.traverse((m) => { const mesh = m as THREE.Mesh; if (mesh.isMesh) { mesh.castShadow = true; const mat = mesh.material as THREE.MeshStandardMaterial; if (mat) { mat.roughness = 0.6; mat.metalness = 0.05; } } });
      const wrap = new THREE.Group(); wrap.add(o); setObj(wrap); continueRender(h);
    }, undefined, (e) => { console.error(e); continueRender(h); });
  }, [file, height, h]);
  return obj;
}

const Scene3D: React.FC = () => {
  const f = useCurrentFrame(); const { fps, width, height } = useVideoConfig(); const t = f / fps;
  const rocket = useGlb("models/toy-rocket-e51241.glb", 2.6);
  const astro = useGlb("models/astronaut-explorer-323482.glb", 1.7);
  const tl = at("launch"); const lt = Math.max(0, t - tl);
  const ry = lt * lt * 9;                                       // rocket climbs, accelerating
  const shake = t > tl - 0.2 && t < tl + 1.2 ? Math.sin(f * 2.7) * 0.06 * (1 - lt / 1.4) : 0;
  const orbit = ez(t, [0.8, tl], [-0.5, 0.35], theme.ease.inOut);
  const camY = 2.0 + ez(t, [tl, tl + 1.7], [0, 4], theme.ease.in);
  const cam = new THREE.Vector3(Math.sin(orbit) * 11 + shake, camY + shake, Math.cos(orbit) * 11);
  const look = new THREE.Vector3(0, 1.4 + ez(t, [tl, tl + 1.7], [0, 5], theme.ease.in), 0);
  const flame = t > tl - 0.6 ? 0.6 + 0.4 * Math.abs(Math.sin(f * 1.3)) + Math.min(1, lt) : 0;
  const smoke = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ a: i * 2.4, sp: 0.6 + (i % 5) * 0.25, d: (i % 7) * 0.08 })), []);
  return (
    <ThreeCanvas width={width} height={height} camera={{ fov: 42, position: [cam.x, cam.y, cam.z] }} gl={{ antialias: true }}
      onCreated={({ camera }) => camera.lookAt(look)}>
      <CamRig pos={cam} look={look} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 9, 6]} intensity={2.4} color="#fff4e0" />
      <directionalLight position={[-6, 3, -5]} intensity={1.2} color="#7a6aff" />
      {/* Mars far behind */}
      <mesh position={[-6, 9 + Math.sin(t) * 0.2, -26]}><sphereGeometry args={[6, 48, 48]} /><meshStandardMaterial color={MARS} roughness={0.9} /></mesh>
      {/* the pad: a dusty disc and a ring of lights */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[6, 64]} /><meshStandardMaterial color="#3a3550" roughness={1} /></mesh>
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; const on = 0.4 + 0.6 * Math.abs(Math.sin(f / 6 + i)); return (
        <mesh key={i} position={[Math.cos(a) * 2.4, 0.06, Math.sin(a) * 2.4]}><sphereGeometry args={[0.09, 12, 12]} /><meshBasicMaterial color={new THREE.Color(theme.colors.hero).multiplyScalar(on)} /></mesh>); })}
      {rocket && <group position={[0, ry, 0]} rotation={[0, f * 0.01, 0]}><primitive object={rocket} />
        {flame > 0 && <mesh position={[0, -0.6 * flame, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.45, 1.6 * flame, 20]} /><meshBasicMaterial color="#ffb03a" transparent opacity={0.9} /></mesh>}
        {flame > 0 && <mesh position={[0, -0.35 * flame, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.25, 0.9 * flame, 16]} /><meshBasicMaterial color="#fff4c0" /></mesh>}
      </group>}
      {astro && <group position={[1.5, 0, 2.2]} rotation={[0, -0.3 + Math.sin(f / 20) * 0.08, 0]} scale={1 + Math.sin(f / 12) * 0.015}><primitive object={astro} /></group>}
      {t > tl - 0.4 && smoke.map((p, i) => { const k = Math.max(0, lt + 0.4 - p.d); const r = 0.25 + k * 0.55; return (
        <mesh key={i} position={[Math.cos(p.a) * k * 2.2 * p.sp, 0.3 + k * 0.4, Math.sin(p.a) * k * 2.2 * p.sp]} scale={r}><sphereGeometry args={[1, 10, 10]} /><meshStandardMaterial color="#d8d4e8" transparent opacity={Math.max(0, 0.7 - k * 0.45)} /></mesh>); })}
    </ThreeCanvas>
  );
};
const CamRig: React.FC<{ pos: THREE.Vector3; look: THREE.Vector3 }> = ({ pos, look }) => {
  // the camera follows the frame exactly (no smoothing between renders)
  const camera = useThree((s: { camera: THREE.Camera }) => s.camera);
  camera.position.copy(pos); camera.lookAt(look);
  return null;
};

// ---------------------------------------------------------------- end card
const EndCard: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: theme.spring.bouncy });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", background: `rgba(7,7,26,${0.85 * Math.min(1, s)})` }}>
      {Array.from({ length: 14 }, (_, i) => { const r = spring({ frame: f - i * 2, fps, config: theme.spring.snappy }); return (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -9, width: 18, height: 620 * r, background: i % 2 ? theme.colors.hero : MARS, opacity: 0.35, transformOrigin: "50% 0", transform: `rotate(${i * (360 / 14) + f * 0.6}deg)`, borderRadius: 9 }} />); })}
      <div style={{ whiteSpace: "nowrap", fontFamily: theme.fonts.display, fontSize: 170, color: theme.colors.hero, WebkitTextStroke: `14px ${theme.colors.ink}`, paintOrder: "stroke fill", transform: `scale(${0.5 + 0.5 * s}) rotate(${(1 - s) * -8}deg)` }}>WHAT IF?</div>
    </AbsoluteFill>
  );
};

const useFont = () => {
  const [h] = useState(() => delayRender("font"));
  useEffect(() => { const ff = new FontFace("Edit", `url(${staticFile("ArchivoBlack.ttf")})`); ff.load().then((x) => { document.fonts.add(x); continueRender(h); }).catch(() => continueRender(h)); }, [h]);
};

export const Teaser: React.FC = () => {
  useFont();
  const { fps } = useVideoConfig(); const F = (s: number) => Math.round(s * fps);
  return (
    <AbsoluteFill style={{ background: SPACE }}>
      <Stars />
      <Sequence from={F(0.6)}><Scene3D /></Sequence>
      <Title text="WHAT IF" y={300} size={190} color={theme.colors.hero} outAt={F(at("buckle")) - 6} />
      <Line from={2} to={7} y={560} outAt={F(at("buckle")) - 6} />
      <Line from={7} to={9} y={460} outAt={F(at("three")) - 4} />
      <Count n="3" t={at("three")} /><Count n="2" t={at("two")} /><Count n="1" t={at("one")} />
      <Sequence from={F(at("launch"))} durationInFrames={F(1.2)}><Line from={12} to={13} y={460} outAt={F(1.0)} /></Sequence>
      <Sequence from={F(9.0)}><EndCard /></Sequence>
      <Grade /><Grain /><Vignette />
      <Audio src={staticFile("teaser-mix.wav")} />
      <Sequence from={F(9.0)}><Audio src={staticFile("sfx/pop.wav")} volume={theme.sfxVolume} /></Sequence>
      <Sequence from={0}><Audio src={staticFile("sfx/whoosh.wav")} volume={theme.sfxVolume} /></Sequence>
    </AbsoluteFill>
  );
};
