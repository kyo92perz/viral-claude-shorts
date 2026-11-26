import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import type { Edit } from "./types";
import { Stinger } from "./components/Stinger";
import { ChapterBar } from "./components/ChapterBar";
import { Subscribe } from "./components/Subscribe";
import { Captions } from "./components/Captions";

// the punch zoom: a fast push-in (snap) and an eased release, summed over every punch
const usePunch = (punches: Edit["punches"]) => {
  const t = useCurrentFrame() / useVideoConfig().fps; let s = 1;
  for (const p of punches) { const d = t - p.t, dur = p.dur ?? 0.9, k = (p.scale ?? 1.12) - 1;
    if (d < 0 || d > dur) continue;
    s += d < 0.08 ? k * (d / 0.08) : k * (1 - Easing.out(Easing.cubic)((d - 0.08) / (dur - 0.08))); }
  return s;
};
const useShake = (punches: Edit["punches"]) => {
  const f = useCurrentFrame(), t = f / useVideoConfig().fps; let x = 0, y = 0;
  for (const p of punches) { const d = t - p.t; if (d >= 0 && d < 0.25) { const a = 14 * (1 - d / 0.25); x += a * Math.sin(f * 2.7); y += a * Math.cos(f * 3.3); } }
  return [x, y];
};
export const Edicao: React.FC<Edit> = (p) => {
  const s = usePunch(p.punches), [sx, sy] = useShake(p.punches);
  const font = p.font ? `@font-face{font-family:Edit;src:url(${staticFile(p.font)})}` : "";
  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily: "Edit, 'Arial Black', sans-serif" }}>
      <style>{font}</style>
      <AbsoluteFill style={{ transform: `translate(${sx}px,${sy}px) scale(${s})` }}>
        <OffthreadVideo src={staticFile(p.video)} />
      </AbsoluteFill>
      {p.captions && <Captions words={p.words} />}
      {p.stingers.map((st, i) => <Stinger key={i} {...st} />)}
      {p.chapters.length > 0 && <ChapterBar chapters={p.chapters} duration={p.duration} />}
      {p.subscribe != null && <Subscribe t={p.subscribe} />}
      {p.brand && <div style={{ position: "absolute", left: 36, top: 28, color: "white", fontSize: 30, WebkitTextStroke: "6px #171319", paintOrder: "stroke", opacity: 0.9 }}>{p.brand}</div>}
    </AbsoluteFill>
  );
};
