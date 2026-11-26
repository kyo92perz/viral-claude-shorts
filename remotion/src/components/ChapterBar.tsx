import { useCurrentFrame, useVideoConfig } from "remotion";
// a slim progress bar with chapter ticks; the current chapter name shows for 3 s after it starts
export const ChapterBar: React.FC<{ chapters: { t: number; title: string }[]; duration: number }> = ({ chapters, duration }) => {
  const f = useCurrentFrame(), { fps, width } = useVideoConfig(), t = f / fps;
  const cur = [...chapters].reverse().find((c) => c.t <= t);
  const since = cur ? t - cur.t : 99, show = since < 3 ? Math.min(1, since * 4, (3 - since) * 4) : 0;
  return (<>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, background: "rgba(0,0,0,.35)" }}>
      <div style={{ width: `${(t / duration) * 100}%`, height: "100%", background: "#f6c744" }} />
      {chapters.map((c, i) => <div key={i} style={{ position: "absolute", left: (c.t / duration) * width, top: 0, width: 4, height: 8, background: "#171319" }} />)}
    </div>
    {cur && show > 0 && <div style={{ position: "absolute", left: 36, bottom: 30, opacity: show, transform: `translateX(${(1 - show) * -40}px)`,
      background: "rgba(23,19,25,.82)", color: "white", fontSize: 30, padding: "10px 20px", borderRadius: 12, borderLeft: "8px solid #f6c744" }}>{cur.title}</div>}
  </>);
};
