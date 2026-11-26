type b6_V3 = [number, number, number];
type b6_P = [number, number];
const B6_INK = '#2e2024';
// painted plaster: base colour + soft blotches + vertical brush streaks
const b6Plaster = (key: string, base: string, dark: string) => b6Tex(key, 512, 512, (g, r) => {
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 40; i++) { const x = r() * 512, y = r() * 512, R = 40 + r() * 110, gr = g.createRadialGradient(x, y, 0, x, y, R); gr.addColorStop(0, dark + '30'); gr.addColorStop(1, dark + '00'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512); }
  g.globalAlpha = 0.06; g.fillStyle = dark; for (let i = 0; i < 260; i++) g.fillRect(r() * 512, r() * 512, 2 + r() * 3, 30 + r() * 90); g.globalAlpha = 1;
});

// ---------------------------------------------------------------- the B6 drawing kit (raw canvas, 600 x 1000 card, soles y 975)
const b6R = (s: number) => () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
// catmull-rom through the points
const b6Curve = (pts: b6_P[], n = 10): b6_P[] => { if (pts.length < 3) return pts; const P = [pts[0], ...pts, pts[pts.length - 1]], o: b6_P[] = [];
  for (let i = 1; i < P.length - 2; i++) for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t, f = (j: 0 | 1) => 0.5 * (2 * P[i][j] + (-P[i - 1][j] + P[i + 1][j]) * t + (2 * P[i - 1][j] - 5 * P[i][j] + 4 * P[i + 1][j] - P[i + 2][j]) * t2 + (-P[i - 1][j] + 3 * P[i][j] - 3 * P[i + 1][j] + P[i + 2][j]) * t3); o.push([f(0), f(1)]); }
  o.push(pts[pts.length - 1]); return o; };
// pressure ink: thick in the middle, thin at the ends, slight wobble; closed = even ring
function b6Ink(g: CanvasRenderingContext2D, pts: b6_P[], w: number, seed = 1, closed = false, col = B6_INK) {
  const r = b6R(seed * 97 + 13), P = b6Curve(closed ? [...pts, pts[0], pts[1]] : pts), ph = r() * 6; let L = 0; const N = P.length;
  g.strokeStyle = col; g.lineCap = 'round'; g.lineJoin = 'round';
  for (let i = 1; i < N; i++) { const t = i / (N - 1), k = (closed ? 1 : Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0.04, t))), 0.45)) * (0.84 + 0.16 * Math.sin(i * 0.21 + ph));
    g.lineWidth = Math.max(1, w * k); g.beginPath(); g.moveTo(P[i - 1][0], P[i - 1][1]); g.lineTo(P[i][0], P[i][1]); g.stroke(); L += 1; }
  if (r() < 0.6 && N > 30) { const a = Math.floor(r() * N * 0.5), b = Math.min(N - 1, a + Math.floor(N * 0.25)), off = 3 + r() * 3; g.lineWidth = w * 0.3; g.beginPath(); for (let i = a; i <= b; i++) { const [x, y] = P[i]; if (i === a) g.moveTo(x + off, y - off * 0.5); else g.lineTo(x + off, y - off * 0.5); } g.stroke(); }
}
// matte paint: fill + soft shade toward `dir` + brush streaks, clipped to the shape
function b6Paint(g: CanvasRenderingContext2D, pts: b6_P[], base: string, shade: string, dir: [number, number] = [0.5, 0.8], seed = 1, streak = 1) {
  const P = b6Curve([...pts, pts[0], pts[1]]), r = b6R(seed * 31 + 7);
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const [x, y] of P) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, w = x1 - x0, h = y1 - y0;
  g.save(); g.beginPath(); P.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.clip();
  const gr = g.createLinearGradient(cx - dir[0] * w * 0.5, cy - dir[1] * h * 0.5, cx + dir[0] * w * 0.5, cy + dir[1] * h * 0.5); gr.addColorStop(0.35, base); gr.addColorStop(1, shade);
  g.fillStyle = gr; g.fillRect(x0 - 2, y0 - 2, w + 4, h + 4);
  g.globalAlpha = 0.07 * streak; for (let i = 0; i < 60; i++) { g.fillStyle = r() < 0.5 ? '#ffffff' : '#000000'; g.fillRect(x0 + r() * w, y0 + r() * h, 3 + r() * 5, 20 + r() * 60); }
  g.globalAlpha = 1; g.restore();
}
const b6Blob = (cx: number, cy: number, rx: number, ry: number, seed = 1, wob = 0.03, flat = 1, tilt = 0, n = 40, lumps = 0): b6_P[] => { const r = b6R(seed); const o: b6_P[] = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, k = 1 + wob * Math.sin(a * 2 + r() * 0.4) + (lumps ? 0.07 * Math.max(0, Math.sin(a * lumps)) : 0); let x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k; if (y > 0) y *= flat;
    o.push([cx + x * Math.cos(tilt) - y * Math.sin(tilt), cy + x * Math.sin(tilt) + y * Math.cos(tilt)]); } return o; };
const b6Fill = (g: CanvasRenderingContext2D, pts: b6_P[], col: string) => { g.fillStyle = col; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill(); };
const b6Dot = (g: CanvasRenderingContext2D, x: number, y: number, R: number, col = B6_INK) => { g.fillStyle = col; g.beginPath(); g.arc(x, y, R, 0, Math.PI * 2); g.fill(); };

// TUCO in the clean "thumbnail cartoon" look: big white sphere head, thick black outline, big outlined eyes,
// spiky tuft (Tuco's own: spikes + one curl), GREEN hoodie with white strings, white 4-finger gloves, navy jeans, white sneakers.
const TK = '#141014';
function tkPath(g: CanvasRenderingContext2D, pts: b6_P[], close = true) { const P = b6Curve(close ? [...pts, pts[0], pts[1]] : pts, 8); g.beginPath(); P.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); if (close) g.closePath(); }
function tkShape(g: CanvasRenderingContext2D, pts: b6_P[], base: string, shade: string, ol = 11, dir: [number, number] = [0.6, 0.8]) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const [x, y] of pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, w = x1 - x0, h = y1 - y0;
  tkPath(g, pts); const gr = g.createLinearGradient(cx - dir[0] * w / 2, cy - dir[1] * h / 2, cx + dir[0] * w / 2, cy + dir[1] * h / 2);
  gr.addColorStop(0.45, base); gr.addColorStop(1, shade); g.fillStyle = gr; g.fill();
  if (ol) { g.lineWidth = ol; g.strokeStyle = TK; g.lineJoin = 'round'; g.stroke(); }
}
const tkLine = (g: CanvasRenderingContext2D, pts: b6_P[], w: number, col = TK) => { tkPath(g, pts, false); g.lineWidth = w; g.strokeStyle = col; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); };
// a sleeve tube from a to b (radius r) with ink
function tkSleeve(g: CanvasRenderingContext2D, a: b6_P, m: b6_P, b: b6_P, r: number, col: string) {
  tkLine(g, [a, m, b], r * 2 + 22); tkLine(g, [a, m, b], r * 2, col); }
// a white glove: palm + 4 rounded fingers pointing along angle ang (radians, 0 = right)
function tkGlove(g: CanvasRenderingContext2D, x: number, y: number, ang: number, s = 1) {
  const c = Math.cos(ang), sn = Math.sin(ang), T = (u: number, v: number): b6_P => [x + (u * c - v * sn) * s, y + (u * sn + v * c) * s];
  for (const [v, L] of [[-27, 58], [-9, 66], [9, 64], [27, 54]]) { tkLine(g, [T(10, v), T(L, v)], 26); tkLine(g, [T(10, v), T(L, v)], 15, '#fbfbfd'); }
  tkLine(g, [T(-6, -34), T(26, -56)], 26); tkLine(g, [T(-6, -34), T(26, -56)], 15, '#fbfbfd');   // thumb
  const palm = [T(-34, -32), T(16, -38), T(26, 0), T(16, 38), T(-34, 32), T(-44, 0)]; tkShape(g, palm, '#ffffff', '#d8d8e2', 9);
     // cuff edge
}
function b6Tuco(blink = false) {
  return { key: `tk-tuco-hunch-${blink ? 1 : 0}`, draw: (p: any) => { const g: CanvasRenderingContext2D = p.g;
    const HOOD = '#e0342c', HOODS = '#9a1c1c';
    // jeans (baggy) + white sneakers
    for (const [s, top, knee, foot] of [[0, [252, 700], [222, 830], [210, 930]], [1, [348, 700], [390, 830], [398, 930]]] as [number, b6_P, b6_P, b6_P][]) {
      tkLine(g, [top, knee, foot], 92); tkLine(g, [top, knee, foot], 72, s ? '#26305a' : '#2c3766');
      const fx = foot[0] + (s ? 16 : -16), sh: b6_P[] = [[fx - 58, 950], [fx - 50, 912], [fx + 20, 906], [fx + 64, 940], [fx + 62, 968], [fx - 58, 970]];
      tkShape(g, sh, '#ffffff', '#cfd0da', 10); tkLine(g, [[fx - 56, 958], [fx + 62, 958]], 6, '#9a9aa8');
    }
    // arm on the knee (behind body edge)
    tkSleeve(g, [400, 470], [452, 610], [420, 740], 40, HOOD); tkGlove(g, 412, 770, 1.9, 0.95);
    // hoodie body
    const body: b6_P[] = [[200, 420], [300, 400], [400, 420], [440, 560], [430, 712], [300, 726], [170, 712], [160, 560]];
    tkShape(g, body, HOOD, HOODS, 12, [0.6, 0.8]);
    const pocket: b6_P[] = [[222, 610], [378, 610], [400, 690], [200, 690]]; tkPath(g, pocket); g.fillStyle = '#c42a24'; g.fill(); g.lineWidth = 8; g.strokeStyle = TK; g.stroke();
    tkLine(g, [[176, 704], [424, 704]], 7, '#9a1c1c');
    // hood behind the neck
    const hood: b6_P[] = [[208, 430], [250, 386], [300, 380], [350, 386], [392, 430], [300, 462]]; tkShape(g, hood, '#c42a24', '#8a1818', 10);
    // white strings with tips
    for (const [x0, x1] of [[278, 268], [322, 330]]) { tkLine(g, [[x0, 452], [x1, 540]], 16); tkLine(g, [[x0, 452], [x1, 540]], 8, '#f6c744'); g.fillStyle = '#f6c744'; g.strokeStyle = TK; g.lineWidth = 6; g.beginPath(); g.ellipse(x1, 552, 8, 14, 0, 0, 7); g.fill(); g.stroke(); }
    // arm pushing the ceiling
    tkSleeve(g, [206, 450], [130, 300], [124, 120], 40, HOOD); tkGlove(g, 124, 86, -1.57, 1.0);
    // head: white sphere, soft grey shade bottom-right, thick outline
    const HX = 318, HY = 232, R = 168;
    g.beginPath(); g.arc(HX, HY, R, 0, Math.PI * 2); const hg = g.createRadialGradient(HX - 60, HY - 70, 20, HX, HY, R); hg.addColorStop(0, '#ffffff'); hg.addColorStop(0.7, '#f3f2f7'); hg.addColorStop(1, '#c9c8d6'); g.fillStyle = hg; g.fill(); g.lineWidth = 13; g.strokeStyle = TK; g.stroke();
    // Tuco's tuft: 6 spikes + one curl falling on the forehead
    const sp: b6_P[] = [[HX - 120, HY - 112], [HX - 150, HY - 168], [HX - 86, HY - 150], [HX - 80, HY - 218], [HX - 28, HY - 166], [HX + 4, HY - 236], [HX + 34, HY - 168], [HX + 96, HY - 212], [HX + 88, HY - 146], [HX + 156, HY - 160], [HX + 118, HY - 104], [HX + 40, HY - 140], [HX - 40, HY - 138]];
    g.beginPath(); sp.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fillStyle = '#18141a'; g.fill(); g.lineWidth = 8; g.strokeStyle = TK; g.lineJoin = 'round'; g.stroke();
    g.fillStyle = '#4a4252'; g.beginPath(); g.moveTo(HX - 60, HY - 160); g.lineTo(HX - 40, HY - 196); g.lineTo(HX - 30, HY - 158); g.fill();
    // eyes: big outlined whites, pupils looking up (at the ceiling), worried brows
    for (const [ex, sx] of [[-58, 1], [62, 1.06]] as b6_P[]) { const cx = HX + ex, cy = HY + 8;
      if (blink) { tkLine(g, [[cx - 40, cy + 6], [cx, cy + 16], [cx + 40, cy + 6]], 11); continue; }
      g.beginPath(); g.ellipse(cx, cy, 50 * sx, 62 * sx, 0, 0, 7); g.fillStyle = '#ffffff'; g.fill(); g.lineWidth = 9; g.strokeStyle = TK; g.stroke();
      g.beginPath(); g.ellipse(cx + 6, cy - 18, 20, 25, 0, 0, 7); g.fillStyle = '#111016'; g.fill();
      g.beginPath(); g.arc(cx + 12, cy - 28, 7, 0, 7); g.fillStyle = '#ffffff'; g.fill();
      tkLine(g, ex < 0 ? [[cx - 44, cy - 74], [cx - 10, cy - 92], [cx + 30, cy - 86]] : [[cx - 30, cy - 86], [cx + 10, cy - 92], [cx + 46, cy - 74]], 11); }
    // mouth: open D with tongue
    const mo: b6_P[] = [[HX - 36, HY + 92], [HX + 40, HY + 88], [HX + 30, HY + 128], [HX, HY + 140], [HX - 28, HY + 128]];
    tkPath(g, mo); g.fillStyle = '#6a1424'; g.fill(); g.save(); g.clip(); g.fillStyle = '#ee6a7a'; g.beginPath(); g.ellipse(HX + 2, HY + 136, 26, 16, 0, 0, 7); g.fill(); g.restore(); tkPath(g, mo); g.lineWidth = 9; g.strokeStyle = TK; g.stroke();
    // sweat drop
    const d: b6_P[] = [[HX + 150, HY - 30], [HX + 166, HY + 2], [HX + 150, HY + 18], [HX + 134, HY + 2]]; tkPath(g, d); g.fillStyle = '#bfe6fb'; g.fill(); g.lineWidth = 6; g.strokeStyle = TK; g.stroke();
  } };
}


export { b6Tuco };
