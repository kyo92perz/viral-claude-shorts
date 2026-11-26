// =====================================================================
//  Test: B6-style drawn Tuco (2D card) inside a painted 3D bedroom (styles/2.5d_cartoon, 16:9). Prefix b6.
//  Day 2: Tuco is 3.2 m, hunched under the 2.6 m ceiling, one hand pushing the ceiling, the fan hitting his curls.
// =====================================================================
type b6_V3 = [number, number, number];
type b6_P = [number, number];
const B6: { st?: ReturnType<typeof CT.stage>; fan?: THREE.Group } = {};
const B6_INK = '#2e2024';
const b6Tex = (key: string, w: number, h: number, fn: (g: CanvasRenderingContext2D, r: () => number) => void) => CT.paint.ctex(key, w, h, fn);
// painted plaster: base colour + soft blotches + vertical brush streaks
const b6Plaster = (key: string, base: string, dark: string) => b6Tex(key, 512, 512, (g, r) => {
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 40; i++) { const x = r() * 512, y = r() * 512, R = 40 + r() * 110, gr = g.createRadialGradient(x, y, 0, x, y, R); gr.addColorStop(0, dark + '30'); gr.addColorStop(1, dark + '00'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512); }
  g.globalAlpha = 0.06; g.fillStyle = dark; for (let i = 0; i < 260; i++) g.fillRect(r() * 512, r() * 512, 2 + r() * 3, 30 + r() * 90); g.globalAlpha = 1;
});
const b6Box = (b: ReturnType<typeof CT.batch>, key: string, col: string | THREE.Texture, min: b6_V3, max: b6_V3, tile = 0) =>
  CT.box(b, typeof col === 'string' ? CT.mat(key, col) : CT.mat(key, { map: col }), min, max, tile);

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

// ---------------------------------------------------------------- the bedroom, built once (5 x 4 m, ceiling 2.6 m; open towards +z)
const b6Init = (w: World) => {
  const st = B6.st = CT.stage(w, { light: 'day', fog: false, far: 200, clouds: false });
  const b = CT.batch();
  const wall = b6Plaster('b6-wall', '#f2dcb2', '#b88a5a'), wains = b6Plaster('b6-wains', '#8fb4a0', '#3e6a58'), ceil = b6Plaster('b6-ceil', '#f8efe0', '#c8b090');
  b6Box(b, 'b6-floor', CT.paint.rep(CT.paint.planks(), 3, 3), [-3, 0, -2.2], [3, 0.04, 3], 0);
  b6Box(b, 'b6-wall', wall, [-3, 0.9, -2.3], [3, 2.6, -2.2]); b6Box(b, 'b6-wainsb', wains, [-3, 0, -2.25], [3, 0.9, -2.15]);
  b6Box(b, 'b6-wallL', wall, [-3.1, 0.9, -2.3], [-3, 2.6, 3]); b6Box(b, 'b6-wainsL', wains, [-3.05, 0, -2.3], [-2.95, 0.9, 3]);
  b6Box(b, 'b6-wallR', wall, [3, 0.9, -2.3], [3.1, 2.6, 3]); b6Box(b, 'b6-wainsR', wains, [2.95, 0, -2.3], [3.05, 0.9, 3]);
  b6Box(b, 'b6-rail', '#6a8a78', [-3, 0.88, -2.16], [3, 0.95, -2.1]);
  b6Box(b, 'b6-ceil', ceil, [-3.1, 2.6, -2.3], [3.1, 2.7, 3]);
  b6Box(b, 'b6-crown', '#fbf4e6', [-3, 2.52, -2.2], [3, 2.6, -2.12]);
  // window with frame + sill + two curtains
  const sky = b6Tex('b6-sky', 256, 256, (g) => { const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#7cc0ec'); gr.addColorStop(1, '#d8eef6'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    g.fillStyle = '#ffffff'; for (const [x, y, s] of [[60, 80, 30], [100, 70, 40], [150, 84, 28], [190, 150, 24], [220, 144, 32]]) { g.beginPath(); g.arc(x, y, s, 0, 7); g.fill(); }
    g.fillStyle = '#7aa860'; g.fillRect(0, 220, 256, 36); });
  b6Box(b, 'b6-sky', sky, [0.4, 1.0, -2.22], [1.9, 2.15, -2.2]);
  for (const [a, c] of [[[0.33, 0.96, -2.2], [1.97, 1.02, -2.1]], [[0.33, 2.13, -2.2], [1.97, 2.2, -2.12]], [[0.33, 0.96, -2.2], [0.4, 2.2, -2.12]], [[1.9, 0.96, -2.2], [1.97, 2.2, -2.12]], [[1.12, 1.0, -2.2], [1.18, 2.15, -2.13]], [[0.4, 1.55, -2.2], [1.9, 1.6, -2.13]]] as [b6_V3, b6_V3][]) b6Box(b, 'b6-wframe', '#fbf7ee', a, c);
  b6Box(b, 'b6-sill', '#fbf7ee', [0.25, 0.92, -2.2], [2.05, 0.98, -2.0]);
  const cur = b6Plaster('b6-cur', '#3e8a76', '#173e34');
  b6Box(b, 'b6-curL', cur, [0.05, 0.75, -2.15], [0.42, 2.45, -2.05]); b6Box(b, 'b6-curR', cur, [1.88, 0.75, -2.15], [2.25, 2.45, -2.05]);
  b6Box(b, 'b6-rod', '#6a4a30', [-0.05, 2.42, -2.12], [2.35, 2.46, -2.08]);
  // poster (football) on the back wall, left
  const post = b6Tex('b6-poster', 256, 340, (g) => { g.fillStyle = '#2f5aa8'; g.fillRect(0, 0, 256, 340); g.fillStyle = '#fbf7ee'; g.beginPath(); g.arc(128, 150, 70, 0, 7); g.fill();
    g.fillStyle = '#231a1e'; const pent = (x: number, y: number, r: number) => { g.beginPath(); for (let k = 0; k < 5; k++) { const a = k * 1.2566 - 1.5708; g.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); } g.fill(); }; pent(128, 150, 22);
    for (let k = 0; k < 5; k++) { const a = k * 1.2566 - 1.5708; pent(128 + 58 * Math.cos(a), 150 + 58 * Math.sin(a), 13); }
    g.lineWidth = 6; g.strokeStyle = '#231a1e'; g.beginPath(); g.arc(128, 150, 70, 0, 7); g.stroke(); g.fillStyle = '#f6c744'; g.fillRect(40, 260, 176, 20); g.lineWidth = 10; g.strokeRect(5, 5, 246, 330); });
  b6Box(b, 'b6-poster', post, [-2.2, 1.3, -2.21], [-1.4, 2.35, -2.19]);
  // bed (left): frame, mattress, blanket, pillow, headboard
  b6Box(b, 'b6-bedf', '#8a5632', [-2.95, 0, -2.1], [-1.2, 0.4, 0.2]); b6Box(b, 'b6-head', '#7a4a2a', [-2.95, 0, -2.15], [-1.2, 1.0, -2.05]);
  b6Box(b, 'b6-matt', '#f4efe4', [-2.92, 0.4, -2.05], [-1.23, 0.55, 0.17]);
  const blank = b6Tex('b6-blanket', 256, 256, (g, r) => { g.fillStyle = '#3f9a5c'; g.fillRect(0, 0, 256, 256); g.strokeStyle = '#f6c744'; g.lineWidth = 6; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(0, 30 + i * 44); g.lineTo(256, 30 + i * 44); g.stroke(); } });
  b6Box(b, 'b6-blanket', blank, [-2.94, 0.55, -1.2], [-1.2, 0.64, 0.19]);
  b6Box(b, 'b6-pil', '#fbf7ef', [-2.7, 0.55, -2.0], [-1.45, 0.72, -1.55]);
  // desk + lamp + books (right), shelf with toys, rug, the ruler
  b6Box(b, 'b6-desk', '#a8743e', [1.9, 0.72, -2.15], [2.95, 0.78, -1.45]); for (const x of [1.95, 2.85]) b6Box(b, 'b6-dleg', '#7a5028', [x, 0, -2.1], [x + 0.06, 0.72, -1.5]);
  b6Box(b, 'b6-lampb', '#d03a30', [2.6, 0.78, -2.0], [2.72, 0.82, -1.9]); b6Box(b, 'b6-lamps', '#2e2024', [2.64, 0.82, -1.97], [2.67, 1.15, -1.94]); b6Box(b, 'b6-lamph', '#d03a30', [2.52, 1.12, -2.02], [2.72, 1.24, -1.86]);
  [['#d03a30', 0], ['#2f5aa8', 0.07], ['#f6c744', 0.14]].forEach(([c, dx], i) => b6Box(b, 'b6-book' + i, c as string, [2.0 + (dx as number), 0.78, -2.05], [2.06 + (dx as number), 1.02 - i * 0.03, -1.85]));
  b6Box(b, 'b6-shelf', '#8a5632', [-0.9, 1.85, -2.2], [-0.1, 1.9, -1.98]);
  b6Box(b, 'b6-ballS', '#fbf7ee', [-0.8, 1.9, -2.15], [-0.62, 2.08, -2.0]); b6Box(b, 'b6-robot', '#f6c744', [-0.45, 1.9, -2.12], [-0.25, 2.2, -2.02]);
  const rug = b6Tex('b6-rug', 256, 256, (g) => { g.fillStyle = '#d65a46'; g.fillRect(0, 0, 256, 256); g.strokeStyle = '#f6c744'; g.lineWidth = 12; g.strokeRect(18, 18, 220, 220); g.strokeStyle = '#fbf7ee'; g.lineWidth = 5; g.strokeRect(40, 40, 176, 176); });
  b6Box(b, 'b6-rug', rug, [-0.9, 0.04, -1.0], [1.5, 0.05, 1.2]);
  b6Box(b, 'b6-ruler', '#f6c744', [-1.05, 0, -2.19], [-0.95, 2.4, -2.16]);
  for (let i = 0; i <= 12; i++) b6Box(b, 'b6-tick', '#2e2024', [-1.05, i * 0.2, -2.16], [-1.0 + (i % 5 ? 0 : 0.03), i * 0.2 + 0.015, -2.15]);
  b6Box(b, 'b6-door', '#9a6038', [2.98, 0, -1.2], [3.0, 2.1, -0.2]); b6Box(b, 'b6-knob', '#f6c744', [2.94, 1.0, -1.1], [2.98, 1.06, -1.04]);
  CT.build(b, st);
  // ceiling fan (rod, hub, 3 blades), animated
  B6.fan = new THREE.Group(); const rod = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.25, 0.05), CT.mat('b6-fanr', '#5a4a44')); rod.position.y = 0.12; B6.fan.add(rod);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.12, 16), CT.mat('b6-fanh', '#8a7a74')); B6.fan.add(hub);
  for (let i = 0; i < 3; i++) { const bl = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.025, 0.2), CT.mat('b6-fanb', '#efe6d6')); const a = (i * Math.PI * 2) / 3; bl.position.set(Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5); bl.rotation.y = a; B6.fan.add(bl); }
  B6.fan.position.set(0.55, 2.33, -0.3); st.add(B6.fan);
  // warm desk-lamp glow
  const pl = new THREE.PointLight('#ffd890', 2.5, 3); pl.position.set(2.62, 1.05, -1.9); st.add(pl);
  return st;
};

CT.shots([
  { id: 'quarto', fn(t: number, u: number) { const st = B6.st!; st.light('day', { view: [0.25, -1] });
    B6.fan!.rotation.y = t * 7;
    st.look([0.9 - u * 0.08, 1.25, 3.4 - u * 0.12], [0.1, 1.55, -1.0], 52, -2); st.dof(6, [0.1, 2.0, -0.6]);
    st.person({ id: 1, who: b6Tuco(false), at: [0.05, 0, -0.6], scale: 2.65 / 2.16, shadow: true, blink: false } as any);
  } },
], b6Init, (t, u, shot) => shot.fn(t, u));
