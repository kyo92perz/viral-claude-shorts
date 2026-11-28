import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { theme, ez } from "../theme";
// top: % from the top (default 6; use ~12 on videos that burn a series badge at the top)
// "DIA 7" slam: letters spring in staggered (scale + rise + tilt), the sub line slides in after, a faster exit up; whoosh + pop
export const Stinger: React.FC<{ t: number; text: string; sub?: string; dur?: number; top?: number }> = ({ t, text, sub, dur = 1.2, top = 6 }) => {
  const f = useCurrentFrame(), { fps, width } = useVideoConfig(), start = Math.round(t * fps), lf = f - start, end = Math.round(dur * fps);
  const exitF = Math.round(0.33 * fps), big = width * 0.085, C = theme.colors;
  const sfx = <Sequence from={start - 4} durationInFrames={Math.round(0.5 * fps)}><Audio src={staticFile("sfx/whoosh.wav")} volume={theme.sfxVolume} /></Sequence>;
  if (lf < 0 || lf > end) return lf < 0 && lf > -6 ? sfx : null;
  const out = ez(lf, [end - exitF, end], [0, 1], theme.ease.in);
  const breathe = 1 + Math.sin((lf / fps) * Math.PI * 2) * 0.01;
  return (<>
    {sfx}
    <Sequence from={start} durationInFrames={Math.round(0.2 * fps)}><Audio src={staticFile("sfx/pop.wav")} volume={theme.sfxVolume} /></Sequence>
    <div style={{ position: "absolute", left: 0, right: 0, top: `${top}%`, display: "flex", flexDirection: "column", alignItems: "center",
      transform: `translateY(${-out * 260}px) scale(${breathe * (1 - out * 0.2)}) rotate(-3deg)`, opacity: 1 - out }}>
      <div style={{ display: "flex", fontSize: big, color: C.text, WebkitTextStroke: `${big * 0.14}px ${C.ink}`, paintOrder: "stroke", textShadow: "0 10px 0 rgba(0,0,0,.35)" }}>
        {[...text].map((ch, i) => { const s = spring({ frame: lf - i * 2, fps, config: theme.spring.bouncy });
          return <span key={i} style={{ display: "inline-block", whiteSpace: "pre", opacity: ez(lf - i * 2, [0, 3], [0, 1]), transform: `translateY(${(1 - s) * 60}px) scale(${0.4 + 0.6 * s}) rotate(${(1 - s) * -14}deg)` }}>{ch}</span>; })}
      </div>
      {sub && <div style={{ marginTop: 6, fontSize: big * 0.36, color: C.ink, background: C.hero, padding: "6px 22px", borderRadius: 14, border: `5px solid ${C.ink}`,
        opacity: ez(lf, [6, 10], [0, 1]), transform: `translateX(${ez(lf, [6, 16], [-width * 0.3, 0])}px) scale(${ez(lf, [6, 16], [0.8, 1])})` }}>{sub}</div>}
    </div>
  </>);
};
