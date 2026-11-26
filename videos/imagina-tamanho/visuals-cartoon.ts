// <lines>
const IM_LINES = [{"who": "im_narr", "t0": 0.3, "t1": 6.37}, {"who": "im_narr", "t0": 7.25, "t1": 17.964}, {"who": "im_narr", "t0": 18.944, "t1": 24.535}, {"who": "im_narr", "t0": 25.415, "t1": 30.348}, {"who": "im_narr", "t0": 31.628, "t1": 38.212}, {"who": "im_tuco", "t0": 39.092, "t1": 41.107}, {"who": "im_mae", "t0": 41.887, "t1": 44.701}, {"who": "im_narr", "t0": 45.581, "t1": 53.945}, {"who": "im_narr", "t0": 54.825, "t1": 62.635}, {"who": "im_narr", "t0": 63.615, "t1": 70.882}, {"who": "im_biel", "t0": 71.862, "t1": 75.502}, {"who": "im_narr", "t0": 76.382, "t1": 81.974}, {"who": "im_narr", "t0": 82.854, "t1": 92.59}, {"who": "im_narr", "t0": 93.57, "t1": 103.09}, {"who": "im_narr", "t0": 104.07, "t1": 110.822}, {"who": "im_tucog", "t0": 111.602, "t1": 114.682}, {"who": "im_narr", "t0": 115.662, "t1": 123.461}, {"who": "im_narr", "t0": 124.341, "t1": 134.337}, {"who": "im_narr", "t0": 135.317, "t1": 140.619}, {"who": "im_narr", "t0": 141.499, "t1": 151.387}, {"who": "im_biel", "t0": 152.367, "t1": 157.306}, {"who": "im_tuco", "t0": 158.086, "t1": 160.05}, {"who": "im_narr", "t0": 161.13, "t1": 168.963}, {"who": "im_narr", "t0": 169.843, "t1": 177.906}, {"who": "im_narr", "t0": 178.786, "t1": 186.89}, {"who": "im_rep", "t0": 187.77, "t1": 192.584}, {"who": "im_narr", "t0": 193.564, "t1": 201.193}, {"who": "im_narr", "t0": 202.173, "t1": 210.471}, {"who": "im_narr", "t0": 211.651, "t1": 219.524}, {"who": "im_narr", "t0": 220.404, "t1": 229.267}, {"who": "im_narr", "t0": 230.247, "t1": 240.544}, {"who": "im_tuco", "t0": 241.524, "t1": 244.265}, {"who": "im_narr", "t0": 245.245, "t1": 253.772}, {"who": "im_narr", "t0": 254.952, "t1": 260.18}, {"who": "im_narr", "t0": 261.06, "t1": 269.452}, {"who": "im_narr", "t0": 270.332, "t1": 280.634}, {"who": "im_biel", "t0": 281.614, "t1": 284.887}, {"who": "im_narr", "t0": 285.767, "t1": 294.705}, {"who": "im_narr", "t0": 295.685, "t1": 305.623}, {"who": "im_narr", "t0": 306.803, "t1": 316.011}, {"who": "im_mae", "t0": 316.891, "t1": 319.076}, {"who": "im_narr", "t0": 320.056, "t1": 328.812}, {"who": "im_narr", "t0": 329.792, "t1": 337.382}, {"who": "im_narr", "t0": 338.362, "t1": 348.143}, {"who": "im_narr", "t0": 349.023, "t1": 359.009}, {"who": "im_tuco", "t0": 360.189, "t1": 365.244}, {"who": "im_narr", "t0": 366.424, "t1": 375.105}, {"who": "im_narr", "t0": 376.085, "t1": 382.987}, {"who": "im_narr", "t0": 383.867, "t1": 393.494}, {"who": "im_narr", "t0": 394.474, "t1": 405.953}, {"who": "im_narr", "t0": 407.133, "t1": 414.129}, {"who": "im_narr", "t0": 415.709, "t1": 423.158}, {"who": "im_narr", "t0": 424.138, "t1": 437.76}, {"who": "im_narr", "t0": 438.74, "t1": 447.102}, {"who": "im_narr", "t0": 448.082, "t1": 456.628}, {"who": "im_narr", "t0": 457.508, "t1": 462.32}, {"who": "im_tuco", "t0": 463.1, "t1": 464.79}];
// </lines>
// =====================================================================
//  IMAGINA SÓ, SIZE (2.5D): every scene poses the camera, the light, the cast and the props from t. World in
//  world-cartoon.ts, shot list and titles in tools/make-scenes.py. Heights are in metres; giant days use the MINI set
//  (1:50 or 1:100) or SPACE (Earth radius 20 = 6 371 km), keeping the ratios honest.
// =====================================================================
type tmS = ReturnType<typeof CT.stage>;
const tK = (s: Scene, id: string, f = s.t0 + 0.6) => s.keys?.find((k) => k.id === id)?.t ?? f;
const tE = (u: number) => u * u * (3 - 2 * u);
const tL = (a: tm_V3, b: tm_V3, k: number): tm_V3 => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const tC = (x: number) => Math.min(1, Math.max(0, x));
// who is speaking: the mouth opens and closes on that speaker's words
const tTalk = (who: string, t: number, rest = 'smile') => (IM_LINES.some((l: any) => l.who === who && t >= l.t0 && t <= l.t1) ? (Math.floor(t * 8) % 2 ? 'open' : rest) : rest);
// camera: from (p0, q0) to (p1, q1) through the scene; shake after an impact (sign flips every frame, 7 frames)
const tCam = (st: tmS, u: number, p0: tm_V3, p1: tm_V3, q0: tm_V3, q1: tm_V3, fov = 40, roll = 2, shake: [number, number, number] | null = null) => {
  let p = tL(p0, p1, tE(u)), q = tL(q0, q1, tE(u));
  if (shake) { const [t, t0, a] = shake, d = t - t0; if (d >= 0 && d < 0.3) { const sg = Math.floor(d * 24) % 2 ? 1 : -1, k = a * (1 - d / 0.3); p = [p[0] + sg * k, p[1] + sg * k * 0.5, p[2]]; q = [q[0] + sg * k, q[1] + sg * k * 0.5, q[2]]; } }
  tFov = fov; st.look(p, q, fov, roll);
};
// the HUD: "DIA n • height" on a plate in front of the camera, top centre (call after tCam; no lens blur in those shots)
let tFov = 40;
const tHud = (st: tmS, d: string, h: string) => { const cam = st.cam; cam.updateMatrixWorld(); const D = 2.2, hh = D * Math.tan((tFov * Math.PI) / 360), ww = hh * (16 / 9);
  const f = new THREE.Vector3(), r = new THREE.Vector3(), up = new THREE.Vector3(); cam.getWorldDirection(f); r.setFromMatrixColumn(cam.matrixWorld, 0); up.setFromMatrixColumn(cam.matrixWorld, 1);
  const at = cam.position.clone().addScaledVector(f, D).addScaledVector(up, hh * 0.74); const text = `DIA ${d}  •  ${h}`;
  const cw = 1400, ch = 180; st.card({ key: 'tm-hud-' + text, cw, ch, at: [at.x, at.y, at.z], w: ww * 0.62, h: (ww * 0.62 * ch) / cw, draw: (p: any) => { const g: CanvasRenderingContext2D = p.g;
    g.fillStyle = '#1e2350'; g.beginPath(); (g as any).roundRect(4, 4, cw - 8, ch - 8, 40); g.fill(); g.fillStyle = '#fbf7ef'; g.beginPath(); (g as any).roundRect(14, 14, cw - 28, ch - 28, 32); g.fill();
    g.fillStyle = '#1e2350'; g.beginPath(); (g as any).roundRect(14, 14, 380, ch - 28, 32); g.fill(); g.font = '900 96px "Arial Black", Arial, sans-serif'; g.textBaseline = 'middle'; g.textAlign = 'center';
    g.fillStyle = '#f6c744'; g.fillText(`DIA ${d}`, 204, ch / 2 + 4); g.fillStyle = '#e0302a'; g.fillText(h, 400 + (cw - 414) / 2, ch / 2 + 4); } }); };
const tP = (B: tm_V3, x: number, y: number, z: number): tm_V3 => [B[0] + x, B[1] + y, B[2] + z];
// a text sign card (rounded plate, big letters)
const tSign = (st: tmS, key: string, text: string, at: tm_V3, w: number, bg = '#f6c744', fg = '#1e2350', on = true) => {
  if (!on) return;
  const cw = Math.max(400, text.length * 64 + 120), ch = 200;
  st.card({ key: `tm-sign-${key}-${text}`, cw, ch, at, w, h: (w * ch) / cw, draw: (p: any) => {
    const g: CanvasRenderingContext2D = p.g; g.fillStyle = '#1e2350'; g.beginPath(); (g as any).roundRect(6, 6, cw - 12, ch - 12, 40); g.fill();
    g.fillStyle = bg; g.beginPath(); (g as any).roundRect(18, 16, cw - 36, ch - 34, 32); g.fill();
    g.fillStyle = fg; g.font = '900 112px "Arial Black", Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, cw / 2, ch / 2 + 6);
  } });
};
// a picture card drawn with the canvas (props, diagrams); fn draws on a cw x ch canvas
const tPic = (st: tmS, key: string, at: tm_V3, w: number, cw: number, ch: number, fn: (g: CanvasRenderingContext2D) => void) =>
  st.card({ key: 'tm-pic-' + key, cw, ch, at, w, h: (w * ch) / cw, draw: (p: any) => fn(p.g) });
// the space pieces, set every space shot (r = radius in metres; null hides)
const tSpace = (o: { earth?: [tm_V3, number] | null; moon?: [tm_V3, number] | null; jup?: [tm_V3, number] | null; sun?: [tm_V3, number] | null; star?: [tm_V3, number, string] | null; iss?: tm_V3 | null; spin?: number }) => {
  const set = (m: THREE.Object3D | undefined, v: [tm_V3, number] | null | undefined, base: number) => { if (!m) return; m.visible = !!v; if (v) { m.position.set(...tP(TM_SP, ...v[0])); m.scale.setScalar(v[1] / base); } };
  set(TM.earth, o.earth, 20); set(TM.moon, o.moon, 5.4); set(TM.jup, o.jup, 40); set(TM.sun, o.sun, 30);
  if (TM.star) { TM.star.visible = !!o.star; if (o.star) { TM.star.position.set(...tP(TM_SP, ...o.star[0])); TM.star.scale.setScalar(o.star[1] / 30); (TM.star.material as THREE.MeshBasicMaterial).color.set(o.star[2]); } }
  if (TM.iss) { TM.iss.visible = !!o.iss; if (o.iss) TM.iss.position.set(...tP(TM_SP, ...o.iss)); }
  if (TM.earth && o.spin !== undefined) TM.earth.rotation.y = o.spin;
};
const tNoSpace = () => tSpace({});
// glowing star halo card (for the star scenes)
const tGlow = (st: tmS, at: tm_V3, w: number, hot: number) => tPic(st, 'glow' + Math.round(hot * 10), at, w, 256, 256, (g) => {
  const gr = g.createRadialGradient(128, 128, 20, 128, 128, 128); gr.addColorStop(0, `rgba(255,${200 + 40 * hot},${80 + 100 * hot},${0.6 * hot})`); gr.addColorStop(1, 'rgba(255,200,80,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); });
// props drawn as pictures
const tElephant = (g: CanvasRenderingContext2D) => { g.lineWidth = 10; g.strokeStyle = '#1e2350'; g.fillStyle = '#9a9aa8';
  const E = (x: number, y: number, rx: number, ry: number) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); g.fill(); g.stroke(); };
  for (const x of [130, 190, 310, 370]) { g.fillRect(x - 24, 230, 48, 120); g.strokeRect(x - 24, 230, 48, 120); } E(250, 200, 170, 110); E(430, 160, 80, 80); E(390, 150, 60, 70);
  g.beginPath(); g.moveTo(490, 170); g.quadraticCurveTo(540, 260, 500, 340); g.lineWidth = 34; g.stroke(); g.strokeStyle = '#9a9aa8'; g.lineWidth = 20; g.stroke(); g.fillStyle = '#1e2350'; g.beginPath(); g.arc(455, 140, 9, 0, 7); g.fill(); };
const tFood = (g: CanvasRenderingContext2D) => { for (let i = 0; i < 14; i++) { const x = 70 + ((i * 97) % 360), y = 330 - Math.floor(i / 4) * 60; g.fillStyle = '#fbf7ef'; g.strokeStyle = '#1e2350'; g.lineWidth = 6; g.beginPath(); g.ellipse(x, y, 70, 20, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = ['#c87a3a', '#e0302a', '#f6c744', '#3aa05a'][i % 4]; g.beginPath(); g.ellipse(x, y - 14, 44, 22, 0, 0, 7); g.fill(); g.stroke(); } };
const tTruck = (g: CanvasRenderingContext2D, on: boolean) => { g.lineWidth = 8; g.strokeStyle = '#1e2350'; g.fillStyle = '#3a7aff'; g.beginPath(); (g as any).roundRect(40, 250, 280, 130, 50); g.fill(); g.stroke(); g.fillStyle = '#f6c744'; g.fillRect(320, 270, 120, 110); g.strokeRect(320, 270, 120, 110);
  g.fillStyle = '#1e2350'; for (const x of [110, 380]) { g.beginPath(); g.arc(x, 390, 36, 0, 7); g.fill(); }
  if (on) { g.strokeStyle = 'rgba(140,210,255,0.9)'; g.lineWidth = 30; g.lineCap = 'round'; g.beginPath(); g.moveTo(60, 260); g.quadraticCurveTo(10, 80, 120, 10); g.stroke(); } };
const tWhale = (g: CanvasRenderingContext2D) => { g.lineWidth = 10; g.strokeStyle = '#1e2350'; g.fillStyle = '#3a6ab0'; g.beginPath(); g.moveTo(80, 200); g.quadraticCurveTo(200, 60, 600, 90); g.quadraticCurveTo(880, 110, 920, 190); g.quadraticCurveTo(880, 270, 600, 280); g.quadraticCurveTo(300, 300, 80, 200); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(80, 200); g.lineTo(-10, 110); g.lineTo(20, 200); g.lineTo(-10, 290); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#1e2350'; g.beginPath(); g.arc(800, 160, 12, 0, 7); g.fill(); g.strokeStyle = '#9ac0e8'; g.lineWidth = 18; g.beginPath(); g.moveTo(200, 230); g.quadraticCurveTo(500, 290, 880, 210); g.stroke(); };
const tAnt = (g: CanvasRenderingContext2D) => { g.lineWidth = 8; g.strokeStyle = '#1e2350'; g.fillStyle = '#3aa05a'; g.beginPath(); g.moveTo(120, 220); g.quadraticCurveTo(260, -40, 460, 80); g.quadraticCurveTo(300, 140, 120, 220); g.fill(); g.stroke();
  g.fillStyle = '#3a2016'; for (const [x, y, r] of [[120, 300, 60], [220, 290, 40], [300, 270, 44]]) { g.beginPath(); g.ellipse(x, y, r, r * 0.75, 0, 0, 7); g.fill(); g.stroke(); }
  for (const x of [130, 200, 260]) { g.beginPath(); g.moveTo(x, 300); g.lineTo(x - 30, 380); g.moveTo(x, 300); g.lineTo(x + 30, 380); g.stroke(); } };
const tEye = (g: CanvasRenderingContext2D, look: number) => { g.lineWidth = 16; g.strokeStyle = '#1e2350'; g.fillStyle = '#fbf7ef'; g.beginPath(); g.ellipse(400, 200, 380, 180, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#5a3a20'; g.beginPath(); g.arc(400 + look * 120, 210, 130, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#1e2350'; g.beginPath(); g.arc(400 + look * 120, 210, 60, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(360 + look * 120, 170, 24, 0, 7); g.fill(); };
const tCloud = (g: CanvasRenderingContext2D) => { g.fillStyle = 'rgba(255,255,255,0.95)'; for (const [x, y, r] of [[120, 120, 70], [200, 90, 90], [300, 110, 80], [380, 130, 60], [250, 150, 90]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); } };
const tPlane = (g: CanvasRenderingContext2D) => { g.lineWidth = 8; g.strokeStyle = '#1e2350'; g.fillStyle = '#fbf7ef'; g.beginPath(); g.moveTo(20, 110); g.lineTo(360, 100); g.quadraticCurveTo(400, 110, 360, 130); g.lineTo(20, 130); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.moveTo(180, 115); g.lineTo(120, 30); g.lineTo(160, 30); g.lineTo(240, 115); g.fill(); g.stroke(); g.beginPath(); g.moveTo(40, 112); g.lineTo(10, 60); g.lineTo(40, 60); g.lineTo(80, 112); g.fill(); g.stroke(); };
const tCrack = (g: CanvasRenderingContext2D, k: number) => { g.fillStyle = '#0a1a2a'; g.fillRect(0, 0, 400, 800); g.fillStyle = 'rgba(40,80,120,0.6)'; g.fillRect(80, 0, 240, 800);
  g.fillStyle = '#cfe8ff'; g.strokeStyle = '#1e2350'; g.lineWidth = 8; g.beginPath(); g.moveTo(160, 0); g.quadraticCurveTo(140, 400, 170, 800); g.lineTo(230, 800); g.quadraticCurveTo(260, 400, 240, 0); g.closePath(); g.fill(); g.stroke();
  if (k > 0) { g.strokeStyle = '#e0302a'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); const pts = [[150, 380], [190, 360], [170, 400], [220, 390], [200, 430], [252, 416]]; const n = Math.max(1, Math.round(k * 5)); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i <= n; i++) g.lineTo(pts[i][0], pts[i][1]); g.stroke(); } };
const tWave = (g: CanvasRenderingContext2D, ph: number, big: boolean) => { g.clearRect(0, 0, 1200, 300); g.strokeStyle = big ? '#e0302a' : '#3aa05a'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath();
  const L = big ? 700 : 90, A = big ? 110 : 40; for (let x = 0; x <= 1200; x += 6) { const y = 150 + Math.sin(((x + ph * L) / L) * Math.PI * 2) * A; if (x) g.lineTo(x, y); else g.moveTo(x, y); } g.stroke(); };
const tCal = (g: CanvasRenderingContext2D, d: string, sub: string, c: string) => { g.fillStyle = '#fbf7ef'; g.strokeStyle = '#1e2350'; g.lineWidth = 14; g.beginPath(); (g as any).roundRect(10, 10, 580, 420, 36); g.fill(); g.stroke(); g.fillStyle = c; g.beginPath(); (g as any).roundRect(10, 10, 580, 120, 36); g.fill(); g.stroke();
  g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#fff'; g.font = '900 80px "Arial Black", Arial'; g.fillText(d, 300, 74); g.fillStyle = '#1e2350'; g.font = `900 ${sub.length > 10 ? 64 : 92}px "Arial Black", Arial`; g.fillText(sub, 300, 290); };
const tGrid = (g: CanvasRenderingContext2D, n: number) => { g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 54px "Arial Black", Arial';
  for (let i = 0; i < n; i++) { const x = 20 + (i % 10) * 120, y = 20 + Math.floor(i / 10) * 120; g.fillStyle = '#fbf7ef'; g.strokeStyle = '#1e2350'; g.lineWidth = 6; g.beginPath(); (g as any).roundRect(x, y, 104, 104, 14); g.fill(); g.stroke(); g.fillStyle = '#1e2350'; g.fillText(String(i + 1), x + 52, y + 56); } };
const tPhone = (g: CanvasRenderingContext2D) => { g.fillStyle = '#1e2350'; g.beginPath(); (g as any).roundRect(10, 10, 260, 480, 36); g.fill(); g.fillStyle = '#bfe4ff'; g.fillRect(30, 50, 220, 400); g.fillStyle = '#2fa04a'; g.beginPath(); g.arc(140, 220, 70, 0, 7); g.fill();
  g.fillStyle = '#fff'; g.fillRect(122, 170, 36, 70); g.beginPath(); g.arc(140, 240, 30, 0, Math.PI); g.fill(); g.fillStyle = '#1e2350'; g.font = '900 34px Arial'; g.textAlign = 'center'; g.fillText('VOZ ×2048', 140, 360); };
const tBill = (g: CanvasRenderingContext2D) => { g.fillStyle = '#fbf7ef'; g.fillRect(0, 0, 200, 800); g.strokeStyle = '#8a8f9e'; g.lineWidth = 8; for (let y = 40; y < 780; y += 50) { g.beginPath(); g.moveTo(24, y); g.lineTo(176, y); g.stroke(); } };
const tLying = (st: tmS, at: tm_V3, w: number, P: TmPose) => { const d = tmDraw('tuco', P); st.card({ key: 'tm-lying-' + d.key, cw: 1000, ch: 600, at, w, h: w * 0.6, draw: (p: any) => { p.rot = [-Math.PI / 2, 300, 500, 180, -200]; d.draw(p, 0); } }); };

// ---------------------------------------------------------------- the shots
const S = TM_ST, C = TM_CITY, M = TM_MINI, R = TM_ROOM, K = TM_KIT, U = STU;
CT.shots([
  // ================================================ hook and intro
  { id: 'hook', fn(t: number, u: number, s: Scene, st: tmS) { tSpace({ earth: [[24, 18, 0], 6], spin: t * 0.2 }); st.light('day', { view: [0, -1] });
    tCam(st, u, tP(TM_SP, 0, 20, 90), tP(TM_SP, 6, 18, 70), tP(TM_SP, 6, 14, 0), tP(TM_SP, 10, 16, 0), 44, 3);
    tmPerson(st, 1, 'tuco', tP(TM_SP, 0, -70, -12), 110, { e: 'wide', m: 'open', a: [20, 75] }, false); } },
  { id: 'grow', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.2, -1] }); tCam(st, u, tP(S, 2, 4, 90), tP(S, 2, 5, 86), tP(S, 2, 4.5, 62), tP(S, 2, 5, 62), 40, 2);
    [1.6, 3.2, 6.4, 12.8].forEach((h, i) => { if (t > s.t0 + 0.2 + i * (s.t1 - s.t0 - 0.5) / 4) tmPerson(st, 10 + i, 'tuco', tP(S, -8 + [0, 2, 5.5, 11.5][i], 0, 62), h, { e: i > 2 ? 'wide' : 'dot', m: i > 2 ? 'open' : 'smile' }); }); } },
  { id: 'fun', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(S, 16, 2.4, 6), tP(S, 15, 2.6, 5.4), tP(S, 12, 2.6, -2.6), tP(S, 12, 2.8, -2.6), 40, 3); st.dof(10, tP(S, 12, 2.8, -2.6));
    const up = tC((t - s.t0 - 0.3) / 0.8); if (TM.ball) TM.ball.position.set(...tL(tP(S, 12, 4.0, -3.2), tP(S, 12.3, 2.9, -2.4), up));
    tmPerson(st, 1, 'tuco', tP(S, 11.5, 0, -2.4), 3.2, { e: 'dot', m: 'grin', a: [10, 150 - up * 40] }); } },
  { id: 'building', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [-1, 0] }); tCam(st, u, tP(C, 110, 8, 4), tP(C, 96, 10, 4), tP(C, 0, 26, 0), tP(C, 0, 30, 0), 44, 3, [t, tK(s, 'p'), 1.5]);
    tmPerson(st, 1, 'tuco', tP(C, 0, 0, 0), 56, { e: 'wide', m: 'o' }); } },
  { id: 'earthhand', fn(t: number, u: number, s: Scene, st: tmS) { tSpace({ earth: [[30, 16, 4], 7], spin: t * 0.3 }); st.light('day', { view: [0, -1] }); tCam(st, u, tP(TM_SP, -10, 18, 80), tP(TM_SP, 0, 18, 66), tP(TM_SP, 10, 12, 0), tP(TM_SP, 18, 14, 0), 44, -3);
    tmPerson(st, 1, 'tuco', tP(TM_SP, 0, -80, -10), 120, { e: 'wide', m: 'grin', a: [20, 80] }, false); } },
  { id: 'real', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0, -1] }); tCam(st, u, tP(U, 0, 6, 26), tP(U, 0, 6, 22), tP(U, 0, 6, 0), tP(U, 0, 6, 0), 40, 0);
    ['1,6 m', '6,4 m', '819 m', '13 km', '429 MIL KM'].forEach((v, i) => tSign(st, 'n' + i, v, tP(U, -14 + i * 7, 4 + (i % 2) * 4, -2), 6.2, ['#fbf7ef', '#f6c744', '#3aa05a', '#5ab0ff', '#e0302a'][i], '#1e2350', t > s.t0 + 0.2 + i * 0.5)); } },
  { id: 'guess', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0, -1] }); tCam(st, u, tP(U, 0, 7, 28), tP(U, 0, 7, 24), tP(U, 0, 7, 0), tP(U, 0, 7, 0), 40, 0, [t, tK(s, 'g'), 0.6]);
    const n = Math.min(30, Math.floor((t - s.t0) * 18)); tPic(st, 'grid' + n, tP(U, 0, 6, -4), 24, 1220, 380, (g) => tGrid(g, n)); } },
  // ================================================ day 1-2
  { id: 'normal', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); const z = tK(s, 'z'); st.light(t > z ? 'night' : 'day', { view: [-0.3, -1] }); tCam(st, u, tP(R, 0.6, 1.3, 3.4), tP(R, 0.4, 1.2, 3.0), tP(R, -1.0, 1.0, -2.2), tP(R, -1.0, 1.0, -2.2), 44, 2); tHud(st, '1', '1,6 METRO');
    tmPerson(st, 1, 'tuco', tP(R, -0.8, 0, -2.4), 1.6, { e: t > z ? 'closed' : 'dot', m: 'smile' }); } },
  { id: 'wake', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '2', '3,2 METROS'); tNoSpace(); st.light('day', { view: [-0.3, -1] }); if (TM.fan) TM.fan.rotation.y = t * 12; const w = tK(s, 'w'), gr = tC((t - w + 0.2) / 0.35);
    tCam(st, u, tP(R, 1.6, 1.0, 3.6), tP(R, 1.3, 1.2, 3.2), tP(R, 0.2, 2.0, -0.8), tP(R, 0.2, 2.2, -0.8), 50, 4, [t, w, 0.08]);
    tmPerson(st, 1, 'tuco', tP(R, 0.2, 0, -0.9), 1.6 + 1.6 * gr, { e: 'wide', m: 'o', t: -8 }); } },
  { id: 'cama', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [-0.3, -1] }); if (TM.fan) TM.fan.rotation.y = t * 12; tCam(st, u, tP(R, 0.4, 2.4, 1.6), tP(R, 0.4, 2.45, 1.3), tP(R, 0.2, 2.5, -0.9), tP(R, 0.2, 2.5, -0.9), 40, -3); st.dof(14, tP(R, 0.2, 2.6, -0.9));
    tmPerson(st, 1, 'tuco', tP(R, 0.2, 0, -0.9), 3.2, { e: 'wide', m: tTalk('im_tuco', t, 'o'), a: [60, 60] }); } },
  { id: 'mae', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [-0.3, -1] }); if (TM.fan) TM.fan.rotation.y = t * 12; tCam(st, u, tP(R, 3.2, 1.5, 3.6), tP(R, 3.0, 1.5, 3.2), tP(R, 0.6, 1.6, -0.8), tP(R, 0.6, 1.6, -0.8), 48, 2); st.dof(9, tP(R, 2.2, 1.4, 0.6));
    tmPerson(st, 1, 'tuco', tP(R, 0.2, 0, -0.9), 3.2, { e: 'wide', m: 'o', t: t > s.t0 + 1 ? 10 : 0 }); tmPerson(st, 2, 'mae', tP(R, 2.2, 0, 0.6), 1.7, { e: 'wide', m: tTalk('im_mae', t, 'o'), a: [150, 150] }); } },
  { id: 'surprise', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0, -1] }); const o = tK(s, 'o'); tCam(st, u, tP(U, 0, 2.4, 11), tP(U, 0, 2.6, 9.6), tP(U, 0, 1.8, 0), tP(U, 0, 1.8, 0), 40, 0, [t, o, 0.2]);
    tmPerson(st, 1, 'tuco', tP(U, -2.4, 0.06, 0), 1.6, { e: 'dot', m: 'smile' }); tmPerson(st, 2, 'tuco', tP(U, 1.6, 0.06, 0), 3.2, { e: 'wide', m: 'o' });
    tSign(st, 'kg50', '50 KG', tP(U, -2.4, 2.1, 0.5), 2.2, '#fbf7ef'); tSign(st, 'kg400', '400 KG', tP(U, 1.6, 3.9, 0.5), 2.8, '#e0302a', '#ffffff', t > o + 0.5); tSign(st, 'x8', '×8', tP(U, 4.4, 2.4, 0.5), 1.6, '#f6c744', '#1e2350', t > o); } },
  { id: 'cube', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); const a = tK(s, 'a'), l = tK(s, 'l'), g = tK(s, 'g'), o = tK(s, 'o');
    if (TM.cube) { TM.cube.visible = true; TM.cube.children.forEach((c, i) => { c.visible = i === 0 || (i === 1 && t > a) || (i < 4 && t > l) || t > g; }); }
    const ang = 0.5 + u * 0.6; tCam(st, u, tP(U, 6 + Math.sin(ang) * 10, 4.2, -2 + Math.cos(ang) * 10), tP(U, 6 + Math.sin(ang + 0.2) * 9, 3.8, -2 + Math.cos(ang + 0.2) * 9), tP(U, 6, 1.2, -2), tP(U, 6, 1.2, -2), 40, 0, [t, o, 0.12]);
    tSign(st, 'eight', '2 × 2 × 2 = 8', tP(U, 6, 3.4, -2), 4.4, '#f6c744', '#1e2350', t > o); } },
  { id: 'door', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.2, -1] }); const c = tK(s, 'c'); if (TM.chair) { const k = tC((t - c) / 0.25); TM.chair.rotation.z = -k * 1.3; TM.chair.position.y = k * 0.1; }
    tCam(st, u, tP(K, 2.6, 1.5, 3.4), tP(K, 2.2, 1.6, 3.0), tP(K, -0.6, 1.4, -2.4), tP(K, -0.6, 1.5, -2.4), 50, 2, [t, c, 0.1]);
    tmPerson(st, 1, 'tuco', tP(K, -3.0, 0, -3.3), 3.2, { e: 'half', m: 'wavy', t: 14 }); } },
  { id: 'food', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.2, -1] }); if (TM.chair) { TM.chair.rotation.z = -1.3; TM.chair.position.y = 0.1; } const b = tK(s, 'b');
    tCam(st, u, tP(K, 0.4, 1.5, 3.2), tP(K, 0.4, 1.5, 2.8), tP(K, 0.3, 1.1, -1.8), tP(K, 0.3, 1.1, -1.8), 44, 2); st.dof(9, tP(K, 0.3, 1.1, -1.8));
    tPic(st, 'food', tP(K, 0.3, 1.25, -1.8), 1.6, 500, 400, tFood); tmPerson(st, 2, 'mae', tP(K, -1.8, 0, -0.9), 1.7, { e: 'wide', m: 'o', a: [10, 90] });
    if (t > b) { const k = tC((t - b) / 0.8); tPic(st, 'bill', tP(K, -1.1, 1.3 - 0.5 * k, -0.6), 0.3, 200, 800, tBill); } } },
  { id: 'dunk', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); const k = tC((t - s.t0 - 0.9) / 0.4);
    if (TM.ball) TM.ball.position.set(...tL(tP(S, 11.7, 3.9, -2.4), tP(S, 12.1, 2.6, -2.6), k));
    tCam(st, u, tP(S, 6, 2.0, 6), tP(S, 6.6, 2.2, 5.4), tP(S, 10.5, 2.2, -2.4), tP(S, 10.8, 2.4, -2.4), 40, 3); st.dof(9, tP(S, 10.5, 2.2, -2.4));
    tmPerson(st, 1, 'tuco', tP(S, 11.0, 0, -2.2), 3.2, { e: 'dot', m: 'grin', a: [10, 165] }); tmPerson(st, 2, 'biel', tP(S, 7.6, 0, -0.6), 1.5, { e: 'wide', m: tTalk('im_biel', t, 'grin'), a: [150, 150] }); } },
  // ================================================ day 3: bones, voice
  { id: 'elephant', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); const e = tK(s, 'e'); tCam(st, u, tP(S, 2, 3.2, 82), tP(S, 3, 3.6, 79), tP(S, 2, 3.4, 62), tP(S, 2, 3.6, 62), 40, 2); tHud(st, '3', '6,4 METROS');
    tmPerson(st, 1, 'tuco', tP(S, -1.5, 0, 62), 6.4, { e: 'dot', m: 'smile' }); if (t > e) tPic(st, 'eleph', tP(S, 5.5, 1.6, 62.6), 4.6, 560, 380, tElephant); } },
  { id: 'bones', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0, -1] }); const a = tK(s, 'a'), b = tK(s, 'b'); tCam(st, u, tP(U, 0, 6, 24), tP(U, 0, 6, 21), tP(U, 0, 6, 0), tP(U, 0, 6, 0), 40, 0);
    const ka = tC((t - a) / 0.6), kb = tC((t - b) / 1.0);
    if (ka > 0) { tPic(st, 'barA' + Math.round(ka * 20), tP(U, -12 + 8 * ka, 9, -4), 16 * ka + 0.01, 400, 60, (g) => { g.fillStyle = '#3aa05a'; g.fillRect(0, 0, 400, 60); }); tSign(st, 'forca', 'OSSO ×16', tP(U, -8, 11.2, -3.8), 7, '#3aa05a', '#fff'); }
    if (kb > 0) { tPic(st, 'barB' + Math.round(kb * 20), tP(U, -12 + 32 * kb / 2, 4, -4), 32 * kb + 0.01, 800, 60, (g) => { g.fillStyle = '#e0302a'; g.fillRect(0, 0, 800, 60); }); tSign(st, 'peso', 'PESO ×64', tP(U, -8, 6.2, -3.8), 7, '#e0302a', '#fff'); } } },
  { id: 'crack', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0, -1] }); const c = tK(s, 'c'), k = Math.round(tC((t - c) / 0.4) * 5) / 5;
    tCam(st, u, tP(U, 0, 6, 16), tP(U, 0, 6, 12), tP(U, 0, 6, 0), tP(U, 0, 6, 0), 40, 0, [t, c, 0.25]); tPic(st, 'crack' + k, tP(U, 0, 6, -3), 6, 400, 800, (g) => tCrack(g, k));
    if (t > c && t < c + 0.4) st.effect('burst', tP(U, 0.4, 6.2, -2.5), 4, tC((t - c) / 0.4)); } },
  { id: 'deal', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); const k = tK(s, 'k'); tCam(st, u, tP(S, 1, 5.4, 9), tP(S, 1, 5.5, 8), tP(S, -1.5, 5.4, 0), tP(S, -1.5, 5.5, 0), 40, -3); st.dof(13, tP(S, -1.5, 5.4, 0));
    tmPerson(st, 1, 'tuco', tP(S, -1.5, 0, 0), 6.4, { e: 'dot', m: 'grin', a: [10, 120] }); tSign(st, 'comb', 'COMBINADO?', tP(S, 1.6, 6.6, 1), 3.4, '#f6c744', '#1e2350', t > k - 0.2); } },
  { id: 'voice', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0, -1] }); tCam(st, u, tP(U, 0, 7, 24), tP(U, 0, 7, 22), tP(U, 0, 7, 0), tP(U, 0, 7, 0), 40, 0);
    const ph = Math.round((t * 4) % 1 * 12) / 12; tPic(st, 'wS' + ph, tP(U, 0, 10, -4), 26, 1200, 300, (g) => tWave(g, ph, false)); tPic(st, 'wB' + ph, tP(U, 0, 4, -4), 26, 1200, 300, (g) => tWave(g, ph * 0.12, true));
    tSign(st, 'ag', 'AGUDO', tP(U, -10, 12.4, -3.8), 4, '#3aa05a', '#fff'); tSign(st, 'gr', 'GRAVE', tP(U, -10, 6.6, -3.8), 4, '#e0302a', '#fff'); } },
  { id: 'olhando', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(S, 5, 1.6, 14), tP(S, 4, 2.0, 12), tP(S, 0, 3.4, 0), tP(S, 0, 3.6, 0), 42, 2);
    tmPerson(st, 1, 'tuco', tP(S, 0, 0, 0), 6.4, { e: 'half', m: tTalk('im_tucog', t, 'wavy') });
    ['biel', 'mae', 'rep', 'tio', 'ger', 'biel'].forEach((k, i) => tmPerson(st, 20 + i, k, tP(S, -6 + i * 2.6, 0, 3.2 + (i % 2)), k === 'biel' ? 1.5 : 1.7, { e: 'wide', m: 'o', a: [20, 20] })); } },
  // ================================================ day 5: heat, infrasound
  { id: 'day5', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [-1, 0] }); const c = tK(s, 'c'); tCam(st, u, tP(C, -6, 10, 3), tP(C, -12, 12, 3), tP(C, -56, 12, 0), tP(C, -56, 13, 0), 44, 2); tHud(st, '5', '25,6 METROS');
    tmPerson(st, 1, 'tuco', tP(C, -56, 0, 2), 25.6, { e: 'dot', m: 'smile' }); if (t > c) tPic(st, 'food5', tP(C, -44, 3, 4), 10, 500, 400, tFood); } },
  { id: 'heat', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('golden', { view: [-1, 0], az: 20, el: 14 }); tCam(st, u, tP(C, -20, 14, 4), tP(C, -24, 16, 4), tP(C, -56, 16, 0), tP(C, -56, 17, 0), 44, -2);
    tmPerson(st, 1, 'tuco', tP(C, -56, 0, 2), 25.6, { e: 'half', m: 'open', t: Math.sin(t * 9) * 3 });
    for (let i = 0; i < 4; i++) { const k = ((t * 0.8 + i * 0.25) % 1); tPic(st, 'hw' + Math.round(k * 10), tP(C, -54, 26 + k * 8, -6 + i * 4), 2.4, 100, 300, (g) => { g.strokeStyle = `rgba(255,90,40,${0.8 * (1 - k)})`; g.lineWidth = 16; g.beginPath(); g.moveTo(50, 290); g.quadraticCurveTo(10, 200, 50, 150); g.quadraticCurveTo(90, 100, 50, 10); g.stroke(); }); } } },
  { id: 'lake', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.2, -1] }); tCam(st, u, tP(S, 16, 10, 82), tP(S, 14, 11, 76), tP(S, 0, 9, 40), tP(S, 0, 10, 40), 44, 2);
    tmPerson(st, 1, 'tuco', tP(S, 0, -10, 40), 25.6, { e: 'closed', m: 'smile', a: [40, 40] }, false); const on = Math.floor(t * 4) % 2 === 0;
    tPic(st, 'truckL' + on, tP(S, -16, 2.6, 52), 7, 460, 420, (g) => tTruck(g, on)); tPic(st, 'truckR' + on, tP(S, 16, 2.6, 52), 7, 460, 420, (g) => { g.translate(460, 0); g.scale(-1, 1); tTruck(g, on); }); } },
  { id: 'infra', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); const n = tK(s, 'n'); tCam(st, u, tP(S, 4, 4, 108), tP(S, 3, 5, 102), tP(S, 0, 14, 62), tP(S, 0, 15, 62), 44, 2, [t, s.t0 + 0.3, 0.3]);
    tmPerson(st, 1, 'tuco', tP(S, 0, 0, 62), 25.6, { e: 'dot', m: Math.floor(t * 3) % 2 ? 'open' : 'o' });
    for (let i = 0; i < 3; i++) { const k = (t * 0.7 + i / 3) % 1; st.effect('ring', tP(S, 0, 20 + i, 63), 6 + k * 30, k); }
    ['biel', 'mae', 'rep', 'tio', 'ger'].forEach((k, i) => tmPerson(st, 20 + i, k, tP(S, -8 + i * 4, 0, 74 + (i % 2) * 2), k === 'biel' ? 1.5 : 1.7, { e: t > n ? 'half' : 'wide', m: t > n ? 'wavy' : 'o', a: [150, 150] })); } },
  { id: 'app', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(S, 3, 1.3, 3.4), tP(S, 3, 1.3, 3.0), tP(S, 3.6, 1.1, 0), tP(S, 3.6, 1.15, 0), 40, 3); st.dof(14, tP(S, 3.3, 1.2, 0));
    tmPerson(st, 2, 'biel', tP(S, 3, 0, 0), 1.5, { e: 'wide', m: tTalk('im_biel', t, 'grin'), a: [10, 110] }); tPic(st, 'phone', tP(S, 3.9, 1.05, 0.25), 0.32, 280, 500, tPhone); } },
  { id: 'fome', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(S, 2, 21, 16), tP(S, 2, 21, 13), tP(S, 0, 21.5, 0), tP(S, 0, 21.6, 0), 40, -2); st.dof(14, tP(S, 0, 22, 0));
    tmPerson(st, 1, 'tuco', tP(S, 0, 0, 0), 25.6, { e: 'half', m: tTalk('im_tuco', t, 'wavy') }); } },
  // ================================================ day 6-10
  { id: 'cristo', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.2, 1] }); tCam(st, u, tP(C, -40, 20, -170), tP(C, -44, 22, -160), tP(C, -52, 26, -70), tP(C, -52, 27, -70), 42, 2); tHud(st, '6', '51 METROS');
    tmPerson(st, 1, 'tuco', tP(C, -42, 9, -78), 51, { e: 'wide', m: 'grin', a: [10, 70] }); } },
  { id: 'day7', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [-1, 0] }); tCam(st, u, tP(C, 170, 6, 3), tP(C, 150, 10, 3), tP(C, 0, 48, 0), tP(C, 0, 52, 0), 44, 3, [t, tK(s, 'd'), 2]); tHud(st, '7', '102 METROS');
    tmPerson(st, 1, 'tuco', tP(C, 0, 0, 0), 102, { e: 'dot', m: 'smile' }); } },
  { id: 'steps', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [-1, 0] }); const ph = (t - s.t0) * 3.2, x = -40 + (t - s.t0) * 10, stepT = s.t0 + Math.floor((t - s.t0) / 0.98) * 0.98;
    tCam(st, u, tP(C, 120, 5, 4), tP(C, 110, 6, 4), tP(C, x, 40, 0), tP(C, x, 40, 0), 46, 2, [t, stepT, 1.2]);
    tmPerson(st, 1, 'tuco', tP(C, x, 0, 0), 102, { e: 'dot', m: 'flat', w: ph, a: [10 + Math.sin(ph) * 20, 10 - Math.sin(ph) * 20] });
    (TM.cars ?? []).forEach((c, i) => { c.position.x = C[0] - 20 + i * 18 + ((t * (i % 2 ? 6 : -6)) % 30); });
    if (t > tK(s, 'a')) for (let i = 0; i < 3; i++) st.effect('burst', tP(C, 40 + i * 20, 2, -6 + i * 6), 3, (t * 2 + i / 3) % 1); } },
  { id: 'carrier', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '8', '205 METROS'); tNoSpace(); st.light('day', { view: [0.2, -1] }); const sh = TM.ships?.[0]; if (sh) { sh.scale.setScalar(11); sh.position.set(M[0] + 60, 0, 6); }
    tCam(st, u, tP(M, 60, 8, 70), tP(M, 56, 9, 62), tP(M, 50, 9, 0), tP(M, 50, 10, 0), 44, 2); tmPerson(st, 1, 'tuco', tP(M, 38, 0, 0), 20.5, { e: 'dot', m: 'grin', a: [10, 40] });
    for (let i = 0; i < 2; i++) tPic(st, 'heli', tP(M, 30 + ((t * 6 + i * 20) % 40), 18 + i * 3, 4), 4, 300, 160, (g) => { g.fillStyle = '#3a4a3a'; g.strokeStyle = '#1e2350'; g.lineWidth = 8; g.beginPath(); g.ellipse(120, 100, 80, 40, 0, 0, 7); g.fill(); g.stroke(); g.fillRect(180, 92, 110, 16); g.fillStyle = '#1e2350'; g.fillRect(20, 40, 220, 10); g.fillRect(116, 40, 8, 30); }); } },
  { id: 'news', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('golden', { view: [-1, 0], az: 25, el: 12 }); tCam(st, u, tP(C, 104, 1.6, 6), tP(C, 102, 1.7, 5.6), tP(C, 96, 1.6, 2), tP(C, 96, 1.7, 2), 40, 3); st.dof(10, tP(C, 96, 1.6, 2));
    tmPerson(st, 2, 'rep', tP(C, 96, 0, 2), 1.7, { e: 'wide', m: tTalk('im_rep', t, 'flat'), a: [10, 100] }); const ph = (t - s.t0) * 3; tmPerson(st, 1, 'tuco', tP(C, -40 + (t - s.t0) * 8, 0, -2), 102, { e: 'dot', m: 'flat', w: ph }); } },
  { id: 'citymeal', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '9', '410 METROS'); tNoSpace(); st.light('day', { view: [0.2, -1] }); tCam(st, u, tP(C, 160, 260, 420), tP(C, 140, 240, 380), tP(C, 0, 160, 0), tP(C, 0, 170, 0), 44, 3);
    tmPerson(st, 1, 'tuco', tP(C, 0, 0, 0), 410, { e: 'half', m: 'wavy' }); } },
  { id: 'burj', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '10', '819 METROS'); tNoSpace(); st.light('day', { view: [0.2, -1] }); tCam(st, u, tP(M, 8, 6, 34), tP(M, 9, 7, 30), tP(M, 6, 8, -4), tP(M, 6, 8.5, -4), 40, 3, [t, tK(s, 't'), 0.25]);
    tmPerson(st, 1, 'tuco', tP(M, 9, 0, -4), 16.4, { e: 'dot', m: 'grin', a: [10, 40] }); } },
  // ================================================ day 13-14
  { id: 'tosea', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '13', '6,5 KM'); tNoSpace(); st.light('day', { view: [0.3, -1] }); const ph = (t - s.t0) * 2.4; tCam(st, u, tP(M, -10, 30, 150), tP(M, 0, 34, 140), tP(M, 10, 30, 0), tP(M, 40, 30, 0), 44, 2);
    tmPerson(st, 1, 'tuco', tP(M, -20 + (t - s.t0) * 10, 0, -6), 65, { e: 'half', m: 'flat', w: ph }); } },
  { id: 'ocean', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(M, 120, 30, 130), tP(M, 116, 32, 120), tP(M, 110, 24, 0), tP(M, 110, 26, 0), 44, 2);
    tmPerson(st, 1, 'tuco', tP(M, 110, -40, 0), 65, { e: 'closed', m: 'smile', a: [60, 60] }, false); tSign(st, 'pisc', 'PISCINA RASA', tP(M, 132, 36, 10), 18, '#f6c744', '#1e2350', t > tK(s, 'p')); } },
  { id: 'clouds', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '14', '13 KM'); tNoSpace(); st.light('day', { view: [0.3, -1] }); if (TM.mtn) { TM.mtn.position.set(M[0] + 150, 0, -60); TM.mtn.scale.setScalar(88); }
    tCam(st, u, tP(M, 140, 50, 230), tP(M, 140, 70, 210), tP(M, 120, 60, 0), tP(M, 120, 90, 0), 46, 2);
    tmPerson(st, 1, 'tuco', tP(M, 110, 0, 0), 131, { e: t > tK(s, 'f') ? 'half' : 'dot', m: t > tK(s, 'f') ? 'wavy' : 'smile' });
    if (t > tK(s, 'n')) for (let i = 0; i < 6; i++) tPic(st, 'cloud', tP(M, 40 + i * 34, 20 + (i % 2) * 4, 20 + (i % 3) * 6), 34, 460, 240, tCloud);
    if (t > tK(s, 'a')) tPic(st, 'plane', tP(M, 190 - (t - tK(s, 'a')) * 14, 110, 20), 14, 400, 160, tPlane); } },
  { id: 'frio', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(M, 116, 118, 56), tP(M, 116, 118, 50), tP(M, 110, 118, 0), tP(M, 110, 118.5, 0), 40, -3); st.dof(14, tP(M, 110, 119, 0));
    tmPerson(st, 1, 'tuco', tP(M, 110, 0, 0), 131, { e: 'half', m: tTalk('im_tuco', t, 'wavy'), t: Math.sin(t * 22) * 2 });
    for (let i = 0; i < 4; i++) tPic(st, 'cloud', tP(M, 80 + i * 22, 100, 30), 30, 460, 240, tCloud); } },
  { id: 'island', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('golden', { view: [0.3, -1], az: 30, el: 10 }); tCam(st, u, tP(M, 120, 50, 190), tP(M, 116, 46, 176), tP(M, 110, 2, 0), tP(M, 110, 2, 0), 40, 2);
    tLying(st, tP(M, 110, 4, 0), 80, { e: 'closed', m: 'o' }); (TM.ships ?? []).forEach((sh, i) => { sh.scale.setScalar(3); sh.position.set(M[0] + 60 + i * 50, 0, 40 - i * 8 + Math.sin(t + i) * 2); });
    for (let i = 0; i < 3; i++) { const k = (t * 0.6 + i / 3) % 1; tSign(st, 'z' + i, 'Z', tP(M, 74 + i * 6, 14 + k * 10, 4), 5 + i * 2, '#fbf7ef'); } } },
  { id: 'science', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(M, 52, 1.6, 8), tP(M, 50, 1.7, 7), tP(M, 50, 1.6, 0), tP(M, 50, 1.6, 0), 40, 2); st.dof(10, tP(M, 50, 1.6, 0));
    tmPerson(st, 2, 'ger', tP(M, 49, 0, 0), 1.7, { e: 'wide', m: 'grin', a: [10, 100] }); tmPerson(st, 3, 'rep', tP(M, 51.4, 0, 0.4), 1.7, { e: 'wide', m: 'o', a: [10, 100] }); tLying(st, tP(M, 110, 6, -60), 130, { e: 'closed', m: 'smile' }); } },
  // ================================================ day 17-21
  { id: 'karman', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '17', '105 KM'); tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(M, 120, 60, 170), tP(M, 120, 80, 150), tP(M, 110, 70, 0), tP(M, 110, 95, 0), 46, 2);
    tmPerson(st, 1, 'tuco', tP(M, 110, 0, 0), 105, { e: 'wide', m: 'o' }); tPic(st, 'kline', tP(M, 110, 100, 4), 260, 1600, 40, (g) => { g.fillStyle = '#fbf7ef'; for (let x = 0; x < 1600; x += 60) g.fillRect(x, 10, 36, 20); });
    tSign(st, 'espaco', 'COMEÇA O ESPAÇO', tP(M, 40, 106, 6), 40, '#1e2350', '#fbf7ef', t > tK(s, 'k') - 0.5); } },
  { id: 'iss', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '19', '419 KM'); tSpace({ earth: [[0, -20, 0], 20], iss: [6 - (t - s.t0) * 0.6, 4.2, 2], spin: t * 0.05 }); st.light('day', { view: [0, -1] });
    tCam(st, u, tP(TM_SP, 4, 4.5, 12), tP(TM_SP, 3, 4.5, 10), tP(TM_SP, 2, 3.6, 0), tP(TM_SP, 2, 3.8, 0), 40, 2); tmPerson(st, 1, 'tuco', tP(TM_SP, 0, 0, 0), 4.4, { e: 'wide', m: 'grin', a: [10, 150] }, false); } },
  { id: 'selfie', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('golden', { view: [0.3, -1], az: 25, el: 12 }); tCam(st, u, tP(S, 3, 0.9, 3.2), tP(S, 3, 0.95, 2.8), tP(S, 3.4, 1.4, 0), tP(S, 3.4, 1.45, 0), 40, 4); st.dof(14, tP(S, 3.4, 1.3, 0));
    tmPerson(st, 2, 'biel', tP(S, 3.4, 0, 0), 1.5, { e: 'wide', m: tTalk('im_biel', t, 'grin'), a: [10, 165] }); } },
  { id: 'sink', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('blood', { view: [-1, 0] }); const a = tK(s, 'a'), k = tC((t - a) / (s.t1 - a)); tCam(st, u, tP(C, 70, 6, 3), tP(C, 64, 5, 3), tP(C, 0, 14, 0), tP(C, 0, 12, 0), 46, 3, [t, a, 0.8]);
    tmPerson(st, 1, 'tuco', tP(C, 0, -k * 10, 0), 400, { e: 'wide', m: 'o' }); if (t > a) for (let i = 0; i < 3; i++) st.effect('puff', tP(C, 10, 2, -6 + i * 6), 12, (t * 1.3 + i / 3) % 1); } },
  { id: 'orbit', fn(t: number, u: number, s: Scene, st: tmS) { const ang = 1.2 + (t - s.t0) * 0.35; tSpace({ earth: [[0, 0, 0], 20], spin: t * 0.1 }); st.light('day', { view: [0, -1] }); tHud(st, '21', '1.678 KM');
    tCam(st, u, tP(TM_SP, 0, 30, 120), tP(TM_SP, 0, 28, 110), tP(TM_SP, 0, 0, 0), tP(TM_SP, 0, 0, 0), 44, 2);
    tmPerson(st, 1, 'tuco', tP(TM_SP, Math.cos(ang) * 40, -5 + Math.sin(ang) * 8, Math.sin(ang) * 20), 11, { e: 'wide', m: 'grin', a: [120, 120] }, false); } },
  // ================================================ day 23-27
  { id: 'brazil', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '23', '6.710 KM'); tSpace({ earth: [[-14, 0, 0], 20], spin: 4.4 }); st.light('day', { view: [0, -1] }); tCam(st, u, tP(TM_SP, 0, 6, 90), tP(TM_SP, 2, 6, 80), tP(TM_SP, 0, 2, 0), tP(TM_SP, 2, 2, 0), 44, 2);
    tmPerson(st, 1, 'tuco', tP(TM_SP, 22, -10, 4), 21, { e: 'wide', m: 'grin', t: -10 }, false); } },
  { id: 'maecall', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('golden', { view: [0.3, -1], az: 25, el: 12 }); tCam(st, u, tP(S, 1, 1.0, 3.6), tP(S, 1, 1.05, 3.2), tP(S, 0.4, 1.6, 0), tP(S, 0.4, 1.65, 0), 40, 3); st.dof(14, tP(S, 0.4, 1.6, 0));
    tmPerson(st, 2, 'mae', tP(S, 0.4, 0, 0), 1.7, { e: 'wide', m: tTalk('im_mae', t, 'smile'), a: [10, 150], t: -8 }); } },
  { id: 'pilates', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '24', '13.422 KM'); tSpace({ earth: [[-16, 6, 6], 20], spin: t * 0.2 }); st.light('day', { view: [0, -1] }); tCam(st, u, tP(TM_SP, 0, 14, 110), tP(TM_SP, 0, 14, 98), tP(TM_SP, 0, 8, 0), tP(TM_SP, 0, 8, 0), 44, 2);
    tmPerson(st, 1, 'tuco', tP(TM_SP, 22, -14, 0), 42, { e: 'dot', m: 'grin', a: [60, 10] }, false); tSign(st, 'pil', 'BOLA DE PILATES', tP(TM_SP, -16, 34, 8), 24, '#f6c744', '#1e2350', t > tK(s, 'b')); } },
  { id: 'eye', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); tCam(st, u, tP(S, 0, 1.2, 80), tP(S, 0, 1.4, 78), tP(S, 0, 6, 60), tP(S, 0, 7, 60), 46, 2);
    const look = Math.round(Math.sin(t * 2) * 4) / 4; tPic(st, 'eye' + look, tP(S, 0, 26, 30), 40, 800, 400, (g) => tEye(g, look));
    ['biel', 'mae', 'rep', 'tio', 'ger', 'biel', 'mae'].forEach((k, i) => tmPerson(st, 20 + i, k, tP(S, -6 + i * 2, 0, 66 + (i % 2)), k === 'biel' ? 1.5 : 1.7, { e: 'wide', m: 'o', a: [20, 20], t: -10 }));
    tSign(st, 'serg', 'TAMANHO DE SERGIPE', tP(S, 0, 14, 40), 14, '#f6c744', '#1e2350', t > tK(s, 's')); } },
  { id: 'soccer', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '27', '107 MIL KM'); tSpace({ earth: [[28, 18, 4], 6], spin: t * 0.4 }); st.light('day', { view: [0, -1] }); tCam(st, u, tP(TM_SP, 10, 22, 70), tP(TM_SP, 14, 20, 60), tP(TM_SP, 14, 14, 0), tP(TM_SP, 20, 15, 0), 44, -3);
    tmPerson(st, 1, 'tuco', tP(TM_SP, 0, -80, -10), 120, { e: 'wide', m: 'o', a: [20, 78] }, false); tSign(st, 'bola', 'BOLA DE FUTEBOL', tP(TM_SP, 28, 6, 6), 16, '#f6c744', '#1e2350', t > tK(s, 'b')); } },
  { id: 'swap', fn(t: number, u: number, s: Scene, st: tmS) { const T0 = tK(s, 't'), a = t > T0 ? (t - T0) * 0.8 : 0; tSpace({ earth: [[Math.cos(a) * 40, 10 + Math.sin(a) * 4, Math.sin(a) * 24], 2.4], spin: t }); st.light('day', { view: [0, -1] });
    tCam(st, u, tP(TM_SP, 0, 30, 110), tP(TM_SP, 0, 28, 100), tP(TM_SP, 0, 10, 0), tP(TM_SP, 0, 10, 0), 44, 2); tmPerson(st, 1, 'tuco', tP(TM_SP, 0, -20, 0), 60, { e: 'dot', m: 'grin' }, false);
    tSign(st, 'massa', 'TUCO = 2,5 TERRAS', tP(TM_SP, 0, 46, 10), 34, '#2fa04a', '#fff', t > tK(s, 'g')); } },
  { id: 'hand', fn(t: number, u: number, s: Scene, st: tmS) { tSpace({ earth: [[18, 12, 4], 6], spin: t * 0.4 }); st.light('day', { view: [0, -1] }); tCam(st, u, tP(TM_SP, 4, 16, 40), tP(TM_SP, 6, 16, 34), tP(TM_SP, 6, 14, 0), tP(TM_SP, 8, 14, 0), 40, -3); st.dof(12, tP(TM_SP, 0, 16, -8));
    tmPerson(st, 1, 'tuco', tP(TM_SP, -2, -80, -8), 120, { e: 'wide', m: tTalk('im_tuco', t, 'o'), a: [20, 78], t: 10 }, false); } },
  // ================================================ day 29-32
  { id: 'moon', fn(t: number, u: number, s: Scene, st: tmS) { const a = (t - s.t0) * 0.5; tSpace({ earth: [[-20, -50, 0], 3], moon: [[-20 + Math.cos(a) * 26, -50 + 22 + Math.sin(a) * 6, Math.sin(a) * 10], 2] }); st.light('day', { view: [0, -1] }); tHud(st, '29', '429 MIL KM');
    tCam(st, u, tP(TM_SP, 0, 0, 220), tP(TM_SP, 0, -4, 200), tP(TM_SP, -6, 0, 0), tP(TM_SP, -6, -4, 0), 44, 2); tmPerson(st, 1, 'tuco', tP(TM_SP, 6, -62, -6), 120, { e: 'wide', m: 'o' }, false);
    tSign(st, 'joelho', 'A LUA NO JOELHO', tP(TM_SP, -46, -6, 8), 26, '#f6c744', '#1e2350', t > tK(s, 'j')); } },
  { id: 'jupiter', fn(t: number, u: number, s: Scene, st: tmS) { tSpace({ jup: [[-50, 0, 10], 12] }); st.light('day', { view: [0, -1] }); tHud(st, '30', '859 MIL KM'); tCam(st, u, tP(TM_SP, -10, 4, 210), tP(TM_SP, -8, 4, 196), tP(TM_SP, -6, 2, 0), tP(TM_SP, -6, 2, 0), 44, 2);
    tmPerson(st, 1, 'tuco', tP(TM_SP, 26, -62, 0), 120, { e: 'wide', m: 'o' }, false); tSign(st, 'jup', '4 × JÚPITER', tP(TM_SP, -50, 24, 12), 24, '#f6c744', '#1e2350', t > tK(s, 'j')); } },
  { id: 'ball', fn(t: number, u: number, s: Scene, st: tmS) { const b = tK(s, 'b'), k = tC((t - (b - 1.6)) / 1.6); tSpace({ star: [[0, 0, -10], 1 + 26 * k, '#2fa04a'] }); st.light('day', { view: [0, -1] });
    tCam(st, u, tP(TM_SP, 0, 4, 110), tP(TM_SP, 0, 2, 100), tP(TM_SP, 0, 0, 0), tP(TM_SP, 0, 0, 0), 44, 2, [t, b, 0.6]);
    if (k < 1) tmPerson(st, 1, 'tuco', tP(TM_SP, 0, -60 * (1 - k * 0.6), -10), 120 * (1 - k * 0.8), { e: 'wide', m: 'o', a: [90 + k * 60, 90 + k * 60] }, false); } },
  { id: 'fusion', fn(t: number, u: number, s: Scene, st: tmS) { const f = tK(s, 'f'), k = tC((t - f) / 1.2); const col = new THREE.Color('#2fa04a').lerp(new THREE.Color('#ffcf3a'), k); tSpace({ star: [[0, 0, -10], 27, '#' + col.getHexString()] }); st.light('day', { view: [0, -1] });
    tCam(st, u, tP(TM_SP, 0, 2, 90), tP(TM_SP, 0, 2, 78), tP(TM_SP, 0, 0, 0), tP(TM_SP, 0, 0, 0), 44, 2); tGlow(st, tP(TM_SP, 0, 0, 0), 120, k);
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2, d = 18 * (1 - tC((t - f) / 0.6)); if (t < f + 0.6) { st.effect('stars', tP(TM_SP, Math.cos(a) * 20 - d * 0.3, Math.sin(a) * 20, 20), 6, (t * 2) % 1); } }
    tSign(st, 'estrela', 'NASCE UMA ESTRELA', tP(TM_SP, 0, -34, 20), 40, '#f6c744', '#1e2350', t > tK(s, 'e')); } },
  { id: 'star', fn(t: number, u: number, s: Scene, st: tmS) { tHud(st, '32', 'UMA ESTRELA'); const a = tK(s, 'a'), on = t > a; tSpace({ star: [[0, 0, -10], 27 + (on ? Math.sin(t * 6) * 1.2 : 0), on ? '#ffe27a' : '#2fa04a'] }); st.light('day', { view: [0, -1] });
    tCam(st, u, tP(TM_SP, 0, 2, 110), tP(TM_SP, 0, 2, 96), tP(TM_SP, 0, 0, 0), tP(TM_SP, 0, 0, 0), 44, 2, [t, a, 2]); if (on) { tGlow(st, tP(TM_SP, 0, 0, 0), 150, 1); st.effect('burst', tP(TM_SP, 0, 0, 20), 90, tC((t - a) / 0.6)); } } },
  { id: 'twosuns', fn(t: number, u: number, s: Scene, st: tmS) { const a = (t - s.t0) * 0.5; tSpace({ sun: [[-50, 0, 0], 18], star: [[50, 0, 0], 12, '#ffe27a'], earth: [[-50 + Math.cos(a) * 34, Math.sin(a) * 4, Math.sin(a) * 20], 2.2] }); st.light('day', { view: [0, -1] });
    tCam(st, u, tP(TM_SP, 0, 30, 140), tP(TM_SP, 0, 26, 126), tP(TM_SP, 0, 0, 0), tP(TM_SP, 0, 0, 0), 44, 2); tGlow(st, tP(TM_SP, 50, 0, 0), 60, 1); } },
  { id: 'chaos', fn(t: number, u: number, s: Scene, st: tmS) { const a = (t - s.t0) * 0.9, wob = Math.sin(t * 3) * 10; tSpace({ sun: [[-40, 0, 0], 16], star: [[40, 0, 0], 10, '#ffe27a'], earth: [[-40 + Math.cos(a) * (30 + wob), Math.sin(a) * 6, Math.sin(a) * (16 + wob)], 2.2], jup: [[-40 + Math.cos(a * 0.6 + 2) * 70, 0, Math.sin(a * 0.6 + 2) * 30 + wob], 4] });
    st.light('day', { view: [0, -1] }); tCam(st, u, tP(TM_SP, 0, 40, 150), tP(TM_SP, 0, 36, 140), tP(TM_SP, 0, 0, 0), tP(TM_SP, 0, 0, 0), 44, Math.sin(t * 4) * 3); tGlow(st, tP(TM_SP, 40, 0, 0), 50, 1); } },
  // ================================================ real life, the end
  { id: 'reallife', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); const b = tK(s, 'b'); tCam(st, u, tP(M, 70, 8, 40), tP(M, 72, 8, 34), tP(M, 80, 2, 0), tP(M, 80, 2, 0), 40, 2);
    if (t > b) tPic(st, 'whale', tP(M, 92 - (t - b) * 3, 2.2, 4), 22, 940, 340, tWhale); tSign(st, 'agua', 'A ÁGUA SEGURA O PESO', tP(M, 80, 12, 4), 22, '#f6c744', '#1e2350', t > tK(s, 'a')); } },
  { id: 'ant', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0.3, -1] }); const f = tK(s, 'f'), e = tK(s, 'e'); tCam(st, u, tP(S, 0, 2.2, 12), tP(S, 0, 2.4, 10), tP(S, 0, 1.6, 0), tP(S, 0, 1.6, 0), 40, 2);
    if (t > f) { tPic(st, 'ant', tP(S, -3 + (t - f) * 0.3, 1.4, 0), 3.6, 480, 400, tAnt); tSign(st, 'x50', '×50', tP(S, -3, 3.6, 0.4), 2, '#3aa05a', '#fff'); }
    if (t > e) { tPic(st, 'eleph2', tP(S, 3.6, 1.6, 0), 4.6, 560, 380, tElephant); tSign(st, 'npula', 'NÃO PULA', tP(S, 3.6, 3.8, 0.4), 3, '#e0302a', '#fff'); } } },
  { id: 'ask', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0, -1] }); tCam(st, u, tP(U, 0, 7, 26), tP(U, 0, 7, 22), tP(U, 0, 7, 0), tP(U, 0, 7, 0), 40, 0);
    if (t > tK(s, 'a')) tPic(st, 'cal2', tP(U, -7, 7, -2), 10, 600, 440, (g) => tCal(g, 'DIA 2', '3 METROS', '#3aa05a'));
    if (t > tK(s, 'b')) tPic(st, 'cal27', tP(U, 7, 7, -2), 10, 600, 440, (g) => tCal(g, 'DIA 27', 'TERRA NA MÃO', '#e0302a'));
    tmPerson(st, 1, 'tuco', tP(U, 0, 0.06, 2), 3.2, { e: 'dot', m: 'smile', a: [100, 100] }); } },
  { id: 'sub', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('day', { view: [0, -1] }); const i = tK(s, 'i'); tCam(st, u, tP(U, 0, 5, 20), tP(U, 0, 5, 17), tP(U, 0, 5, 0), tP(U, 0, 5, 0), 40, 0, [t, i, 0.3]);
    tSign(st, 'insc', 'INSCREVA-SE', tP(U, 0, 7.4, 0), 12, '#e0302a', '#fff', t > i); tmPerson(st, 1, 'tuco', tP(U, -6, 0.06, 2), 3.2, { e: 'dot', m: 'grin', a: [10, 150] }); } },
  { id: 'endcard', fn(t: number, u: number, s: Scene, st: tmS) { tNoSpace(); st.light('golden', { view: [0.2, -1], az: 20, el: 14 }); if (TM.chair) { TM.chair.rotation.z = 0; TM.chair.position.y = 0; }
    tCam(st, u, tP(K, 1.2, 1.4, 4.2), tP(K, 1.0, 1.4, 3.6), tP(K, 0.6, 1.1, -1.0), tP(K, 0.6, 1.1, -1.0), 42, 2); st.dof(9, tP(K, 0.6, 1.2, -1.0));
    tmPerson(st, 1, 'tuco', tP(K, 1.6, 0, -1.0), 1.6, { e: 'dot', m: tTalk('im_tuco', t, 'grin'), a: [10, 40] }); tmPerson(st, 2, 'mae', tP(K, -0.6, 0, -1.4), 1.7, { e: 'closed', m: 'smile', a: [10, 10] }); } },
], tmInit, (t, u, shot, s) => { const st = TM.st!; if (TM.ships) TM.ships.forEach((sh, i) => { if (shot.id !== 'carrier' && shot.id !== 'island') { sh.scale.setScalar(1); sh.position.set(TM_MINI[0] + 40 + i * 25, 0, -20 + i * 18); } });
  if (TM.mtn && shot.id !== 'clouds') { TM.mtn.position.set(TM_MINI[0] - 10, 0, -80); TM.mtn.scale.setScalar(44); }
  if (TM.cube) TM.cube.visible = shot.id === 'cube';
  if (TM.chair && !['door', 'food', 'endcard'].includes(shot.id)) { TM.chair.rotation.z = 0; TM.chair.position.y = 0; }
  if (TM.ball && !['fun', 'dunk'].includes(shot.id)) TM.ball.position.set(TM_ST[0] + 12, 3.2, -2.6);
  shot.fn(t, u, s, st); });
