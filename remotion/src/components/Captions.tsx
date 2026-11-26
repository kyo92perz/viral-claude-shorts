import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { theme } from "../theme";
// word-by-word captions in groups of up to 4 words; the spoken word pops yellow
export const Captions: React.FC<{ words: { w: string; t0: number; t1: number }[] }> = ({ words }) => {
  const f = useCurrentFrame(), { fps, width } = useVideoConfig(), t = f / fps;
  const i = words.findIndex((w) => w.t0 <= t && t < (words[words.indexOf(w) + 1]?.t0 ?? w.t1 + 0.4));
  if (i < 0) return null;
  const g0 = Math.floor(i / 4) * 4, group = words.slice(g0, g0 + 4), size = width * 0.042;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: "12%", textAlign: "center", fontSize: size, color: "white", WebkitTextStroke: `${size * 0.16}px #171319`, paintOrder: "stroke" }}>
      {group.map((w, k) => { const on = g0 + k === i, pop = on ? spring({ frame: f - Math.round(w.t0 * fps), fps, config: theme.spring.snappy }) : 0;
        return <span key={k} style={{ display: "inline-block", margin: "0 .18em", color: on ? "#f6c744" : "white", transform: `scale(${1 + 0.15 * pop})` }}>{w.w}</span>; })}
    </div>
  );
};
