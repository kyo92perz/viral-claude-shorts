import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { theme, ez } from "../theme";
// subscribe button: springs in, gets "clicked" (INSCRITO ✓, grey), leaves fast; 4 s, pop on entry and click
export const Subscribe: React.FC<{ t: number }> = ({ t }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig(), start = Math.round(t * fps), lf = f - start, C = theme.colors;
  if (lf < 0 || lf > 4 * fps) return null;
  const s = spring({ frame: lf, fps, config: theme.spring.bouncy }), clickF = Math.round(1.6 * fps), clicked = lf >= clickF;
  const out = ez(lf, [3.67 * fps, 4 * fps], [0, 1], theme.ease.in), press = lf > clickF - 4 && lf < clickF + 3 ? 0.9 : 1;
  return (<>
    <Sequence from={start} durationInFrames={Math.round(0.2 * fps)}><Audio src={staticFile("sfx/pop.wav")} volume={theme.sfxVolume} /></Sequence>
    <Sequence from={start + clickF} durationInFrames={Math.round(0.2 * fps)}><Audio src={staticFile("sfx/pop.wav")} volume={theme.sfxVolume} /></Sequence>
    <div style={{ position: "absolute", right: 60, bottom: 90, opacity: Math.min(ez(lf, [0, 4], [0, 1]), 1 - out),
      transform: `translateY(${(1 - s) * 40 + out * 200}px) scale(${(0.6 + 0.4 * s) * press * (1 + Math.sin((lf / fps) * 6) * 0.015)})`,
      background: clicked ? C.done : C.red, color: C.text, fontSize: 40, padding: "18px 40px", borderRadius: 50, border: `6px solid ${C.ink}`, boxShadow: `0 8px 0 ${C.ink}` }}>
      {clicked ? "INSCRITO ✓" : "INSCREVA-SE"}
    </div>
  </>);
};
