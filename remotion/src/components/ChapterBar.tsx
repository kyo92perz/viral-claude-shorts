import { useCurrentFrame, useVideoConfig } from "remotion";
import { theme, ez } from "../theme";
// a slim progress bar with chapter ticks; the chapter name slides in for 3 s after it starts (exit faster than entrance)
export const ChapterBar: React.FC<{ chapters: { t: number; title: string }[]; duration: number }> = ({ chapters, duration }) => {
  const f = useCurrentFrame(), { fps, width } = useVideoConfig(), t = f / fps, C = theme.colors;
  const cur = [...chapters].reverse().find((c) => c.t <= t), lf = cur ? f - Math.round(cur.t * fps) : 1e9, hold = 3 * fps;
  const inK = ez(lf, [0, 18], [0, 1]), outK = ez(lf, [hold - 9, hold], [0, 1], theme.ease.in), show = Math.min(inK, 1 - outK);
  return (<>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, background: C.track }}>
      <div style={{ width: `${(t / duration) * 100}%`, height: "100%", background: C.hero }} />
      {chapters.map((c, i) => <div key={i} style={{ position: "absolute", left: (c.t / duration) * width, top: 0, width: 4, height: 8, background: C.ink }} />)}
    </div>
    {cur && lf < hold && <div style={{ position: "absolute", left: 36, bottom: 30, opacity: show, transform: `translateX(${(1 - inK) * -60 + outK * -30}px) translateY(${(1 - inK) * 10}px)`,
      background: C.panel, color: C.text, fontSize: 30, padding: "10px 20px", borderRadius: 12, borderLeft: `8px solid ${C.hero}` }}>{cur.title}</div>}
  </>);
};
