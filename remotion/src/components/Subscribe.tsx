import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
// a subscribe button that pops in, gets "clicked" (turns grey: INSCRITO) and leaves; 4 s
export const Subscribe: React.FC<{ t: number }> = ({ t }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig(), lf = f - Math.round(t * fps);
  if (lf < 0 || lf > 4 * fps) return null;
  const s = spring({ frame: lf, fps, config: { damping: 10 } }), clicked = lf > 1.6 * fps;
  const out = interpolate(lf, [3.6 * fps, 4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const press = lf > 1.45 * fps && lf < 1.75 * fps ? 0.9 : 1;
  return (
    <div style={{ position: "absolute", right: 60, bottom: 90, transform: `scale(${s * press}) translateY(${out * 200}px)`, opacity: 1 - out,
      background: clicked ? "#8a8a92" : "#e0302a", color: "white", fontSize: 40, padding: "18px 40px", borderRadius: 50, border: "6px solid #171319", boxShadow: "0 8px 0 #171319" }}>
      {clicked ? "INSCRITO ✓" : "INSCREVA-SE"}
    </div>
  );
};
