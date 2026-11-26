import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
// "DIA 7" slam: scales in with a spring and a slight tilt, a sub line slides under it, then it flies off
export const Stinger: React.FC<{ t: number; text: string; sub?: string; dur?: number }> = ({ t, text, sub, dur = 1.6 }) => {
  const f = useCurrentFrame(), { fps, width } = useVideoConfig(), lf = f - Math.round(t * fps);
  if (lf < 0 || lf > dur * fps) return null;
  const inS = spring({ frame: lf, fps, config: { damping: 9, stiffness: 180 } });
  const out = interpolate(lf, [dur * fps - 6, dur * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const big = width * 0.085;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: "9%", display: "flex", flexDirection: "column", alignItems: "center",
      transform: `translateY(${-out * 300}px) scale(${0.3 + 0.7 * inS}) rotate(${(1 - inS) * -12 - 3}deg)`, opacity: 1 - out }}>
      <div style={{ fontSize: big, color: "white", WebkitTextStroke: `${big * 0.14}px #171319`, paintOrder: "stroke", letterSpacing: 2, textShadow: "0 10px 0 rgba(0,0,0,.35)" }}>{text}</div>
      {sub && <div style={{ marginTop: 6, fontSize: big * 0.36, color: "#171319", background: "#f6c744", padding: "6px 22px", borderRadius: 14, border: "5px solid #171319",
        transform: `translateX(${interpolate(lf, [3, 10], [-width * 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)` }}>{sub}</div>}
    </div>
  );
};
