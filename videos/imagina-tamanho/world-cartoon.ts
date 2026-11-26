// =====================================================================
//  IMAGINA SÓ: "E se você DOBRASSE de tamanho todo dia?" — the 2.5D world (styles/2.5d_cartoon, 16:9). Prefix tm.
//  Drawn characters (cards that face the camera) in a painted 3D world with lens blur and a colour grade.
//  Cast (original designs, the channel's "soft" look: round white-lavender heads, small bodies, thin legs):
//    TUCO (the main character): messy black curls, GREEN hoodie with a YELLOW collar, RED sneakers.
//    DONA CIDA (his mother, a bun, pink dress), BIEL (his friend, red cap, orange shirt), the REPORTER (long brown hair,
//    blue blazer), a SCIENTIST (grey hair, glasses, white coat), townsfolk.
//  Sets (metres; each far from the others):
//    ROOM   x 0      Tuco's bedroom (bed, window, ruler, ceiling fan at 2.6 m)
//    KITCH  x 40     the kitchen (table, chair, the door)
//    STREET x 100    the neighbourhood street (houses, trees, the basketball hoop, the lake at z 40)
//    CITY   x 400    a city of tall blocks (2-60 m), avenue, cars, the hill with the statue, the needle tower
//    MINI   x 900    a tiny city (blocks 0.3-1.5 m) for the giant days: the sea, the clouds, the mountain
//    SPACE  z 3000   black space with stars: Earth, Moon, Jupiter, the station, the Sun, Tuco the star
// =====================================================================
type tm_V3 = [number, number, number];
const TM: { st?: ReturnType<typeof CT.stage>; earth?: THREE.Mesh; moon?: THREE.Mesh; jup?: THREE.Mesh; sun?: THREE.Mesh; star?: THREE.Mesh; starGlow?: THREE.Sprite;
  iss?: THREE.Group; mtn?: THREE.Group; mtower?: THREE.Mesh; fan?: THREE.Group; chair?: THREE.Group; cars?: THREE.Group[]; ships?: THREE.Group[]; cube?: THREE.Group; ball?: THREE.Mesh; truckJets?: THREE.Mesh[] } = {};
const STU: tm_V3 = [700, 0, 400], TM_ROOM: tm_V3 = [0, 0, 0], TM_KIT: tm_V3 = [40, 0, 0], TM_ST: tm_V3 = [100, 0, 0], TM_CITY: tm_V3 = [400, 0, 0], TM_MINI: tm_V3 = [900, 0, 0], TM_SP: tm_V3 = [0, 0, 3000];
const tmAdd = (a: tm_V3, b: tm_V3): tm_V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

// ---------------------------------------------------------------- the cast: drawn in the 600 x 1000 card (soles y 975)
// pose: e = eyes (dot wide closed half angry glow), m = mouth (smile flat open grin wavy o), a = [left, right] arm angles
// in degrees from straight down (90 = sideways, 170 = up), w = walk phase (radians), t = head tilt (degrees)
interface TmPose { e?: string; m?: string; a?: [number, number]; w?: number; t?: number }
interface TmLook { top: string; top2?: string; pants?: string; shoes?: string; hair: string; hairC?: string; hat?: string; dress?: string; glasses?: boolean; stache?: string }
const TM_LOOK: Record<string, TmLook> = {
  tuco: { top: '#2fa04a', top2: '#f6c744', pants: '#26304e', shoes: '#e0302a', hair: 'curly', hairC: '#1c1410' },
  mae: { top: '#c84a8a', pants: '#c84a8a', shoes: '#3a2a1a', hair: 'bun', hairC: '#1c1410', dress: '#c84a8a' },
  biel: { top: '#f29a4a', pants: '#3a3a4a', shoes: '#f0ece2', hair: 'short', hairC: '#5a3a20', hat: '#d0342c' },
  rep: { top: '#3a6ad8', pants: '#2a2a3a', shoes: '#1c1410', hair: 'long', hairC: '#6a3a20' },
  ger: { top: '#f4f2ee', top2: '#2a3a5a', pants: '#2a3a5a', shoes: '#1c1410', hair: 'short', hairC: '#9a9aa4', glasses: true },
  tio: { top: '#e8c86a', pants: '#4a4a5a', shoes: '#3a2a1a', hair: 'short', hairC: '#3a2216', stache: '#3a2216' },
};
const TM_HEAD = '#ecebfa', TM_HEADS = '#c4c2ea';
const tmRad = (d: number) => (d * Math.PI) / 180;
function tmDraw(k: string, P: TmPose = {}) {
  const L = TM_LOOK[k], e = P.e ?? 'dot', m = P.m ?? 'smile', a = P.a ?? [8, 8], w = P.w ?? 0, tilt = P.t ?? 0;
  const key = `tm-${k}-${e}-${m}-${Math.round(a[0] / 5)}-${Math.round(a[1] / 5)}-${Math.round(Math.sin(w) * 6)}-${Math.round(tilt)}`;
  return { key, draw: (p: any, light: number) => {
    const ws = Math.sin(w);
    // legs (thin) and sneakers
    for (const [lx, d] of [[262, -1], [338, 1]] as [number, number][]) {
      const sw = ws * 26 * d, fx = lx + sw, fy = 952 - Math.max(0, -ws * d) * 18;
      p.line([[lx, 720], [fx, fy]], L.dress ? TM_HEAD : (L.pants ?? '#26304e'), 26);
      p.ell(fx + d * 10, fy + 8, 46, 22, L.shoes ?? '#e8e8f4', 9);
    }
    // the body (hoodie / blazer / coat), a skirt for a dress
    const body: [number, number][] = [[198, 492], [402, 492], [412, 600], [408, 732], [192, 732], [188, 600]];
    p.gradFill(body, L.top, '#00000033', light, 0.4); p.poly(body, null, 10);
    if (L.dress) { const sk: [number, number][] = [[200, 690], [400, 690], [440, 800], [160, 800]]; p.gradFill(sk, L.dress, '#00000033', light, 0.4); p.poly(sk, null, 10); }
    if (k === 'tuco') { p.poly([[226, 640], [374, 640], [362, 712], [238, 712]], '#25843c', 7); p.ell(300, 494, 86, 26, L.top2, 8); p.stroke([[282, 500], [278, 590]], 7, '#ffffff'); p.stroke([[318, 500], [322, 590]], 7, '#ffffff'); }
    else if (L.top2) p.stroke([[300, 500], [300, 728]], 14, L.top2);
    // arms (from the shoulders) and round hands
    for (const [sx, ang, d] of [[208, a[0], -1], [392, a[1], 1]] as [number, number, number][]) {
      const r = tmRad(ang), hx = sx + d * Math.sin(r) * 200, hy = 510 + Math.cos(r) * 200;
      p.line([[sx, 510], [(sx + hx) / 2 + d * 8, (510 + hy) / 2], [hx, hy]], L.top, 30);
      p.ell(hx, hy, 26, 26, '#ffffff', 8);
    }
    // neck and head
    p.line([[300, 432], [300, 492]], TM_HEAD, 18);
    const hr = 182, hx0 = 300 + Math.sin(tmRad(tilt)) * 20, hy0 = 252;
    const head: [number, number][] = []; for (let i = 0; i < 48; i++) { const t = (i / 48) * Math.PI * 2; head.push([hx0 + Math.cos(t) * hr, hy0 + Math.sin(t) * hr]); }
    // hair behind
    if (L.hair === 'curly') for (const [cx, cy] of [[-0.78, -0.55], [-0.42, -0.86], [0.02, -0.98], [0.44, -0.86], [0.78, -0.55]] as [number, number][]) p.ell(hx0 + cx * hr, hy0 + cy * hr, hr * 0.34, hr * 0.32, L.hairC, 9);
    if (L.hair === 'bun') p.ell(hx0, hy0 - hr * 1.02, hr * 0.34, hr * 0.32, L.hairC, 9);
    if (L.hair === 'long') p.poly([[hx0 - hr * 1.06, hy0 - 20], [hx0 - hr * 1.12, hy0 + hr * 1.45], [hx0 + hr * 1.12, hy0 + hr * 1.45], [hx0 + hr * 1.06, hy0 - 20]], L.hairC, 9);
    p.shadedFill(head, TM_HEAD, TM_HEADS, light, hr); p.inkRing(head, 12, light + Math.PI, 0.35);
    // hair in front / hats
    if (L.hair === 'curly') p.poly([[hx0 - hr * 0.88, hy0 - hr * 0.42], [hx0 - hr * 0.5, hy0 - hr * 0.95], [hx0, hy0 - hr * 1.04], [hx0 + hr * 0.5, hy0 - hr * 0.95], [hx0 + hr * 0.88, hy0 - hr * 0.42], [hx0 + hr * 0.45, hy0 - hr * 0.6], [hx0 + hr * 0.15, hy0 - hr * 0.46], [hx0 - hr * 0.15, hy0 - hr * 0.62], [hx0 - hr * 0.5, hy0 - hr * 0.48]], L.hairC, 9);
    else if (L.hair === 'bun' || L.hair === 'short' || L.hair === 'long') p.poly([[hx0 - hr * 0.98, hy0 - hr * 0.15], [hx0 - hr * 0.8, hy0 - hr * 0.8], [hx0, hy0 - hr * 1.03], [hx0 + hr * 0.8, hy0 - hr * 0.8], [hx0 + hr * 0.98, hy0 - hr * 0.15], [hx0 + hr * 0.4, hy0 - hr * 0.55], [hx0 - hr * 0.4, hy0 - hr * 0.55]], L.hairC, 9);
    if (L.hat) { p.poly([[hx0 - hr * 0.98, hy0 - hr * 0.3], [hx0 - hr * 0.8, hy0 - hr * 0.9], [hx0, hy0 - hr * 1.06], [hx0 + hr * 0.8, hy0 - hr * 0.9], [hx0 + hr * 0.98, hy0 - hr * 0.3]], L.hat, 9); p.poly([[hx0 + hr * 0.2, hy0 - hr * 0.34], [hx0 + hr * 1.45, hy0 - hr * 0.3], [hx0 + hr * 1.3, hy0 - hr * 0.5], [hx0 + hr * 0.2, hy0 - hr * 0.55]], L.hat, 9); }
    // the face
    const ex = 64, ey = hy0 + 10;
    if (e === 'dot') for (const d of [-1, 1]) { p.ell(hx0 + d * ex, ey, 17, 23, '#1e2350', 0); p.dot(hx0 + d * ex + 5, ey - 8, 6, '#ffffff'); }
    if (e === 'wide') for (const d of [-1, 1]) { p.ell(hx0 + d * ex, ey, 34, 34, '#ffffff', 9); p.dot(hx0 + d * ex, ey + 3, 11, '#1e2350'); }
    if (e === 'closed') for (const d of [-1, 1]) p.stroke([[hx0 + d * ex - 30, ey], [hx0 + d * ex + 30, ey]], 12, '#1e2350');
    if (e === 'half') for (const d of [-1, 1]) { p.stroke([[hx0 + d * ex - 30, ey - 10], [hx0 + d * ex + 30, ey - 10]], 11, '#1e2350'); p.ell(hx0 + d * ex, ey + 8, 15, 13, '#1e2350', 0); }
    if (e === 'angry') for (const d of [-1, 1]) { p.ell(hx0 + d * ex, ey + 6, 16, 20, '#1e2350', 0); p.stroke([[hx0 + d * (ex + 36), ey - 46], [hx0 + d * (ex - 26), ey - 22]], 13, '#1e2350'); }
    if (e === 'glow') for (const d of [-1, 1]) { p.ell(hx0 + d * ex, ey, 30, 34, '#ffe27a', 8); p.dot(hx0 + d * ex, ey, 8, '#ffffff'); }
    if (e !== 'angry') for (const d of [-1, 1]) p.stroke([[hx0 + d * ex - 34, ey - 60], [hx0 + d * ex + 34, ey - 60]], 13, '#1e2350');
    if (L.glasses) for (const d of [-1, 1]) p.ell(hx0 + d * ex, ey, 40, 40, null, 8);
    if (L.stache) p.poly([[hx0 - 50, ey + 82], [hx0, ey + 66], [hx0 + 50, ey + 82], [hx0, ey + 96]], L.stache, 6);
    const my = hy0 + 112;
    if (m === 'smile') p.arc(hx0, my - 18, 40, 26, 20, 160, 11, '#1e2350');
    if (m === 'flat') p.stroke([[hx0 - 28, my], [hx0 + 28, my]], 11, '#1e2350');
    if (m === 'wavy') p.stroke([[hx0 - 42, my], [hx0 - 28, my - 12], [hx0 - 14, my], [hx0, my - 12], [hx0 + 14, my], [hx0 + 28, my - 12], [hx0 + 42, my]], 10, '#1e2350');
    if (m === 'open') p.poly([[hx0 - 40, my - 14], [hx0 + 40, my - 14], [hx0 + 28, my + 34], [hx0, my + 42], [hx0 - 28, my + 34]], '#c8384a', 9);
    if (m === 'grin') { p.poly([[hx0 - 58, my - 18], [hx0 + 58, my - 18], [hx0 + 40, my + 30], [hx0, my + 40], [hx0 - 40, my + 30]], '#ffffff', 9); }
    if (m === 'o') p.ell(hx0, my + 6, 18, 24, '#c8384a', 8);
  } };
}
// put a character in the frame: k = cast name, h = height in metres, pose
const tmPerson = (st: ReturnType<typeof CT.stage>, id: number, k: string, at: tm_V3, h: number, P: TmPose = {}, shadow = true) => {
  const tt = (st as any).t ?? 0, e = P.e ?? 'dot', blink = (e === 'dot' || e === 'wide') && ((tt + id * 0.77) % 3.3) < 0.13;
  const Q: TmPose = { ...P, e: blink ? 'closed' : e, t: (P.t ?? 0) + Math.round(Math.sin(tt * 1.7 + id) * 3), a: P.a ? [P.a[0] + Math.round(Math.sin(tt * 2 + id) * 3), P.a[1] - Math.round(Math.sin(tt * 2 + id) * 3)] : [8 + Math.round(Math.sin(tt * 2 + id) * 3), 8 - Math.round(Math.sin(tt * 2 + id) * 3)] };
  st.person({ id, who: tmDraw(k, Q), at, scale: h / 1.97, shadow, blink: false } as any);
};

// ---------------------------------------------------------------- textures and small builders
const tmTex = (key: string, w: number, h: number, fn: (g: CanvasRenderingContext2D, r: () => number) => void) => CT.paint.ctex(key, w, h, fn);
const tmWin = (base: string) => tmTex('tm-win-' + base, 256, 256, (g) => {
  g.fillStyle = base; g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { g.fillStyle = (x * 7 + y * 3) % 5 === 0 ? '#ffe9a8' : '#5c7aa0'; g.fillRect(20 + x * 60, 20 + y * 60, 34, 40); }
});
const tmBox = (b: ReturnType<typeof CT.batch>, key: string, col: string | THREE.Texture, min: tm_V3, max: tm_V3, tile = 0) =>
  CT.box(b, typeof col === 'string' ? CT.mat(key, col) : CT.mat(key, { map: col }), min, max, tile);
const tmMesh = (st: ReturnType<typeof CT.stage>, geo: THREE.BufferGeometry, col: string, at: tm_V3, key?: string) => {
  const m = new THREE.Mesh(geo, CT.mat(key ?? `tm-m-${col}`, col)); m.position.set(...at); m.castShadow = true; m.receiveShadow = true; st.add(m); return m;
};
const tmBasic = (st: ReturnType<typeof CT.stage>, geo: THREE.BufferGeometry, mat: THREE.Material, at: tm_V3) => { const m = new THREE.Mesh(geo, mat); m.position.set(...at); st.add(m); return m; };
// a planet texture: ocean with green continents, or stripes (Jupiter), or grey craters (Moon)
const tmPlanetTex = (kind: string) => tmTex('tm-pl-' + kind, 1024, 512, (g, r) => {
  if (kind === 'earth') { g.fillStyle = '#2f74d0'; g.fillRect(0, 0, 1024, 512); g.fillStyle = '#3aa05a';
    for (const [x, y, s] of [[180, 180, 90], [260, 300, 70], [520, 160, 110], [560, 300, 80], [780, 200, 120], [880, 330, 60]]) { g.beginPath(); for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, rr = s * (0.7 + r() * 0.5); g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.8); } g.fill(); }
    g.fillStyle = '#f4f8ff'; g.fillRect(0, 0, 1024, 30); g.fillRect(0, 482, 1024, 30);
    g.globalAlpha = 0.5; for (let i = 0; i < 40; i++) { g.beginPath(); g.ellipse(r() * 1024, r() * 512, 40 + r() * 60, 10 + r() * 10, 0, 0, Math.PI * 2); g.fill(); } g.globalAlpha = 1; }
  if (kind === 'jupiter') { const c = ['#d8b088', '#b88a5a', '#e8d0b0', '#a87048', '#c89a6a', '#e0c098']; for (let i = 0; i < 16; i++) { g.fillStyle = c[i % 6]; g.fillRect(0, i * 32, 1024, 32); } g.fillStyle = '#c8543a'; g.beginPath(); g.ellipse(640, 330, 70, 36, 0, 0, Math.PI * 2); g.fill(); }
  if (kind === 'moon') { g.fillStyle = '#d8d4c8'; g.fillRect(0, 0, 1024, 512); g.fillStyle = '#b8b4a8'; for (let i = 0; i < 50; i++) { g.beginPath(); g.arc(r() * 1024, r() * 512, 8 + r() * 30, 0, Math.PI * 2); g.fill(); } }
  if (kind === 'stars') { g.fillStyle = '#04050c'; g.fillRect(0, 0, 1024, 512); for (let i = 0; i < 900; i++) { g.fillStyle = r() < 0.15 ? '#bcd4ff' : '#ffffff'; const s = r() < 0.08 ? 2.2 : 1; g.fillRect(r() * 1024, r() * 512, s, s); }
    const neb = (x: number, y: number, c: string) => { const gr = g.createRadialGradient(x, y, 0, x, y, 220); gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 1024, 512); };
    neb(300, 200, 'rgba(110,60,170,0.35)'); neb(760, 330, 'rgba(40,90,180,0.3)'); }
});

// ---------------------------------------------------------------- the world, built once
const tmInit = (w: World) => {
  const st = TM.st = CT.stage(w, { light: 'day', fog: false, far: 3000, clouds: false });
  CT.ground(st, { kind: 'grass', size: 1400, tile: 10, at: [400, 0] });
  const b = CT.batch();
  // ROOM: floor, two walls, the bed, a desk, a window card (see tmRoomFx), the ceiling
  tmBox(b, 'tm-floor', '#b88a5a', [-4, 0, -3], [4, 0.05, 3]);
  tmBox(b, 'tm-wall', '#f0d8a0', [-4, 0, -3.2], [4, 2.6, -3]); tmBox(b, 'tm-wall', '#f0d8a0', [-4.2, 0, -3.2], [-4, 2.6, 3]);
  tmBox(b, 'tm-wall2', '#e8c890', [4, 0, -3.2], [4.2, 2.6, 3]);
  tmBox(b, 'tm-bedf', '#8a5a30', [-3.8, 0, -2.9], [-1.6, 0.45, -1.0]); tmBox(b, 'tm-bed', '#2f8a4a', [-3.8, 0.45, -2.9], [-1.6, 0.6, -1.0]); tmBox(b, 'tm-pil', '#fbf7ef', [-3.7, 0.6, -2.8], [-3.0, 0.75, -2.2]);
  tmBox(b, 'tm-desk', '#a87a4a', [2.2, 0, -2.9], [3.8, 0.75, -2.2]);
  tmBox(b, 'tm-win', '#9ad0f0', [-0.6, 1.1, -3.05], [0.9, 2.1, -3.0]);
  tmBox(b, 'tm-ruler', '#f6c744', [-1.25, 0, -2.98], [-1.15, 2.0, -2.95]);
  for (let i = 0; i <= 10; i++) tmBox(b, 'tm-tick', '#2b2433', [-1.3, i * 0.2, -2.97], [-1.15 - (i % 5 ? 0 : 0.08), i * 0.2 + 0.015, -2.94]);
  // KITCHEN
  const K = TM_KIT;
  tmBox(b, 'tm-kfloor', '#c8b8a0', [K[0] - 5, 0, -4], [K[0] + 5, 0.05, 4]);
  tmBox(b, 'tm-kwall', '#e8d8b0', [K[0] - 5, 0, -4.2], [K[0] + 5, 3, -4]);
  tmBox(b, 'tm-door', '#5a3a20', [K[0] - 4, 0, -4.05], [K[0] - 2.8, 2.1, -3.98]);
  tmBox(b, 'tm-table', '#8a5a30', [K[0] - 1, 0.72, -2.5], [K[0] + 1.6, 0.8, -1.2]); tmBox(b, 'tm-tleg', '#6a4020', [K[0] - 0.9, 0, -2.4], [K[0] - 0.8, 0.72, -2.3]); tmBox(b, 'tm-tleg', '#6a4020', [K[0] + 1.4, 0, -2.4], [K[0] + 1.5, 0.72, -2.3]);
  tmBox(b, 'tm-fridge', '#f0f0f4', [K[0] + 3, 0, -3.9], [K[0] + 4, 1.9, -3.1]);
  // STREET: road, houses both sides, trees, the lake
  const S = TM_ST;
  [-30, -18, -6, 6, 18, 30].forEach((x, i) => { CT.house(b, S[0] + x, -9, { yaw: 0, w: 9, d: 7, h: [7, 8.4, 9.8][i % 3], style: i }); CT.house(b, S[0] + x + 6, 11, { yaw: Math.PI, w: 9, d: 7, h: [8.4, 7, 9.8][i % 3], style: i + 2 }); });
  for (let i = 0; i < 8; i++) CT.tree(b, S[0] - 34 + i * 10, i % 2 ? 4.5 : -4.5, { kind: i % 3 === 2 ? 'cone' : 'round', h: 5 + (i % 3), seed: i + 2 });
  tmBox(b, 'tm-road', '#7a7a84', [S[0] - 60, 0, -3.5], [S[0] + 60, 0.03, 3.5]);
  tmBox(b, 'tm-pole', '#8a8f9e', [S[0] + 12, 0, -3.3], [S[0] + 12.15, 3.05, -3.15]); tmBox(b, 'tm-board', '#fbf7ef', [S[0] + 11.4, 2.9, -3.2], [S[0] + 12.8, 3.8, -3.1]);
  // the lake (z 40)
  const lake = new THREE.Mesh(new THREE.CircleGeometry(16, 48).rotateX(-Math.PI / 2), CT.mat('tm-lake', '#3a8ae0')); lake.position.set(S[0], 0.06, 40); st.add(lake);
  for (let i = 0; i < 6; i++) CT.tree(b, S[0] - 24 + i * 10, 22 + (i % 2) * 3, { kind: 'round', h: 6, seed: 20 + i });
  // CITY: blocks around an avenue along x, the hill with the statue, the needle tower
  const C = TM_CITY;
  for (let i = 0; i < 26; i++) for (const side of [-1, 1]) {
    const x = C[0] - 130 + i * 10, h = 12 + ((i * 37 + (side + 1) * 11) % 48), d = 8 + (i % 3) * 2, z0 = side < 0 ? -10 - d : 10;
    tmBox(b, `tm-blk${i % 4}`, tmWin(['#e8d8b8', '#c8b8a0', '#a8b8c8', '#d8c0a0'][i % 4]), [x, 0, z0], [x + 8, h, z0 + d], 4);
  }
  tmBox(b, 'tm-ave', '#5a5c66', [C[0] - 140, 0, -10], [C[0] + 140, 0.04, 10]);
  const hill = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), CT.mat('tm-hill', '#4a8a4a')); hill.scale.set(1, 0.45, 1); hill.position.set(C[0] - 60, 0, -70); st.add(hill);
  tmBox(b, 'tm-statue', '#f0ece2', [C[0] - 61, 13.5, -71], [C[0] - 59, 17, -69]); tmBox(b, 'tm-statue', '#f0ece2', [C[0] - 60.6, 17, -70.6], [C[0] - 59.4, 27, -69.4]);
  tmBox(b, 'tm-statue', '#f0ece2', [C[0] - 65, 24.5, -70.4], [C[0] - 55, 25.7, -69.6]);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), CT.mat('tm-statue', '#f0ece2')); head.position.set(C[0] - 60, 28, -70); st.add(head);
  const tower = new THREE.Mesh(new THREE.ConeGeometry(9, 120, 6), CT.mat('tm-tower', '#c8d8e8')); tower.position.set(C[0] + 120, 60, -60); tower.castShadow = true; st.add(tower);
  // MINI city (for the giant days) by the sea; the sea itself; a mountain; ships
  const M = TM_MINI;
  for (let i = 0; i < 60; i++) { const x = M[0] - 30 + (i % 12) * 2.6, z = -12 + Math.floor(i / 12) * 2.6, h = 0.4 + ((i * 37) % 13) / 10; tmBox(b, `tm-mb${i % 4}`, ['#e8d8b8', '#c8b8a0', '#a8b8c8', '#d8c0a0'][i % 4], [x, 0, z], [x + 1.6, h, z + 1.6]); }
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(900, 900).rotateX(-Math.PI / 2), CT.mat('tm-sea', '#2a7ab8')); sea.position.set(M[0] + 470, 0.05, 0); st.add(sea);
  TM.mtn = new THREE.Group(); const mtn = new THREE.Mesh(new THREE.ConeGeometry(0.68, 1, 7), CT.mat('tm-mtn', '#8a8f9e')); mtn.position.y = 0.5; const snow = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.3, 7), CT.mat('tm-snow', '#fbfbff')); snow.position.y = 0.86; TM.mtn.add(mtn, snow); TM.mtn.position.set(M[0] - 10, 0, -80); TM.mtn.scale.setScalar(44); st.add(TM.mtn);
  TM.mtower = new THREE.Mesh(new THREE.ConeGeometry(1.2, 16.6, 6), CT.mat('tm-tower', '#c8d8e8')); TM.mtower.position.set(M[0] + 2, 8.3, -4); TM.mtower.castShadow = true; st.add(TM.mtower);
  // the STUDIO (diagrams): a navy floor and back wall at x 840, z 30
  tmBox(b, 'tm-stf', '#1b2a44', [STU[0] - 30, 0, STU[2] - 14], [STU[0] + 30, 0.06, STU[2] + 14]); tmBox(b, 'tm-stw', '#22335a', [STU[0] - 30, 0, STU[2] - 14.5], [STU[0] + 30, 24, STU[2] - 14]);
  CT.build(b, st);
  // moving pieces
  TM.cars = [0, 1, 2, 3, 4, 5].map((i) => { const g = new THREE.Group(); const c = new THREE.Mesh(new THREE.BoxGeometry(4, 1.4, 1.9), CT.mat('tm-car' + (i % 4), ['#e0302a', '#3a7aff', '#f6c744', '#f0ece2'][i % 4])); c.position.y = 0.9; c.castShadow = true;
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.8, 1.7), CT.mat('tm-glass', '#8ac0e8')); top.position.set(-0.2, 1.9, 0); g.add(c, top); g.position.set(C[0] - 100 + i * 34, 0, i % 2 ? 3 : -3); st.add(g); return g; });
  TM.ships = [0, 1, 2].map((i) => { const g = new THREE.Group(); const h = new THREE.Mesh(new THREE.BoxGeometry(3, 0.7, 1), CT.mat('tm-hull', '#c8342c')); h.position.y = 0.35; const c = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.8), CT.mat('tm-cabin', '#f0ece2')); c.position.y = 1.0; g.add(h, c); g.position.set(M[0] + 40 + i * 25, 0, -20 + i * 18); st.add(g); return g; });
  TM.fan = new THREE.Group(); for (let i = 0; i < 3; i++) { const bl = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.03, 0.22), CT.mat('tm-fanb', '#e8e4dc')); bl.rotation.y = (i * Math.PI * 2) / 3; bl.position.set(Math.cos((i * Math.PI * 2) / 3) * 0.55, 0, -Math.sin((i * Math.PI * 2) / 3) * 0.55); TM.fan.add(bl); }
  TM.fan.position.set(0.4, 2.45, -0.6); st.add(TM.fan);
  TM.chair = new THREE.Group(); [[0, 0.45, 0, 0.6, 0.06, 0.6], [0, 0.85, -0.27, 0.6, 0.8, 0.06], [-0.25, 0.22, -0.25, 0.06, 0.45, 0.06], [0.25, 0.22, -0.25, 0.06, 0.45, 0.06], [-0.25, 0.22, 0.25, 0.06, 0.45, 0.06], [0.25, 0.22, 0.25, 0.06, 0.45, 0.06]].forEach(([x, y, z, a, bb, c]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(a, bb, c), CT.mat('tm-chair', '#8a5a30')); m.position.set(x, y, z); m.castShadow = true; TM.chair!.add(m); });
  TM.chair.position.set(K[0] + 2.4, 0, -1.6); st.add(TM.chair);
  TM.ball = tmMesh(st, new THREE.SphereGeometry(0.24, 16, 12), '#e86a20', [S[0] + 12, 3.2, -2.6]);
  // the cube of eight (unit cubes), shown in the room's corner for the diagram
  TM.cube = new THREE.Group(); for (let i = 0; i < 8; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.98, 0.98), CT.mat('tm-cube', '#2fa04a')); m.position.set((i & 1) - 0.5, ((i >> 1) & 1) + 0.5, ((i >> 2) & 1) - 0.5); m.castShadow = true; TM.cube.add(m); }
  TM.cube.position.set(STU[0] + 6, 0.06, STU[2] - 2); st.add(TM.cube);
  // SPACE: a starry shell (no fog) around z 3000, the planets
  const SP = TM_SP;
  const shell = new THREE.Mesh(new THREE.SphereGeometry(420, 48, 24), new THREE.MeshBasicMaterial({ map: tmPlanetTex('stars'), side: THREE.BackSide, fog: false }));
  shell.position.set(...SP); st.add(shell);
  const pmat = (kind: string) => new THREE.MeshBasicMaterial({ map: tmPlanetTex(kind), fog: false });
  TM.earth = tmBasic(st, new THREE.SphereGeometry(20, 48, 32), pmat('earth'), tmAdd(SP, [0, 0, 0]));
  const atm = new THREE.Mesh(new THREE.SphereGeometry(21.2, 48, 32), new THREE.MeshBasicMaterial({ color: '#7ac0ff', transparent: true, opacity: 0.18, fog: false })); TM.earth.add(atm);
  TM.moon = tmBasic(st, new THREE.SphereGeometry(5.4, 32, 24), pmat('moon'), tmAdd(SP, [60, 10, 0]));
  TM.jup = tmBasic(st, new THREE.SphereGeometry(40, 48, 32), pmat('jupiter'), tmAdd(SP, [-140, 0, 120]));
  TM.sun = tmBasic(st, new THREE.SphereGeometry(30, 32, 24), new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 2.6, 1.2), fog: false }), tmAdd(SP, [160, 30, 250]));
  TM.star = tmBasic(st, new THREE.SphereGeometry(30, 32, 24), new THREE.MeshBasicMaterial({ color: '#2fa04a', fog: false }), tmAdd(SP, [0, 0, -200]));
  TM.iss = new THREE.Group(); TM.iss.add(new THREE.Mesh(new THREE.BoxGeometry(6, 0.3, 0.3), new THREE.MeshBasicMaterial({ color: '#d8d8e0', fog: false })));
  for (const x of [-2.6, -1.6, 1.6, 2.6]) for (const z of [-1, 1]) { const pn = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 1.6), new THREE.MeshBasicMaterial({ color: '#3a5a9a', fog: false })); pn.position.set(x, 0, z * 1.1); TM.iss.add(pn); }
  TM.iss.position.set(...tmAdd(SP, [20, 22, -10])); st.add(TM.iss);
  return st;
};

// ---------------------------------------------------------------- world test (world.json)
CT.shots([
  { id: 'test-room', fn(t: number, u: number) { const st = TM.st!; st.light('day', { view: [0.2, -1] }); st.look([1.2, 1.4, 4.2], [-0.6, 1.0, -1.4], 46, 2);
    tmPerson(st, 1, 'tuco', [-0.9, 0, -1.6], 1.6, { e: 'dot', m: 'smile', a: [10, 10] }); tmPerson(st, 2, 'mae', [1.0, 0, -1.2], 1.7, { e: 'wide', m: 'open', a: [150, 150] }); } },
  { id: 'test-street', fn(t: number, u: number) { const st = TM.st!; st.light('day', { view: [0.3, -1] }); st.look(tmAdd(TM_ST, [4, 1.8, 9]), tmAdd(TM_ST, [0, 1.6, 0]), 40, 3); st.dof(10, tmAdd(TM_ST, [0, 1.6, 0]));
    tmPerson(st, 1, 'tuco', tmAdd(TM_ST, [0, 0, 0]), 3.2, { e: 'wide', m: 'grin', a: [20, 160] }); tmPerson(st, 3, 'biel', tmAdd(TM_ST, [2.4, 0, 1]), 1.5, { e: 'wide', m: 'o' }); tmPerson(st, 4, 'rep', tmAdd(TM_ST, [-2.4, 0, 1]), 1.7, {}); } },
  { id: 'test-city', fn(t: number, u: number) { const st = TM.st!; st.light('day', { view: [0.2, -1] }); st.look(tmAdd(TM_CITY, [40, 30, 140]), tmAdd(TM_CITY, [0, 40, 0]), 44, 3);
    tmPerson(st, 1, 'tuco', tmAdd(TM_CITY, [0, 0, 0]), 102, { e: 'dot', m: 'grin', a: [30, 30] }); } },
  { id: 'test-mini', fn(t: number, u: number) { const st = TM.st!; st.light('day', { view: [0.2, -1] }); st.look(tmAdd(TM_MINI, [30, 16, 60]), tmAdd(TM_MINI, [10, 14, 0]), 44, 2);
    tmPerson(st, 1, 'tuco', tmAdd(TM_MINI, [10, 0, 0]), 30, { e: 'wide', m: 'o' }); } },
  { id: 'test-space', fn(t: number, u: number) { const st = TM.st!; st.light('day', { view: [0.2, -1] }); st.look(tmAdd(TM_SP, [0, 10, 110]), tmAdd(TM_SP, [10, 5, 0]), 44, 2);
    tmPerson(st, 1, 'tuco', tmAdd(TM_SP, [40, -60, -10]), 120, { e: 'wide', m: 'grin', a: [20, 100] }, false); } },
], tmInit, (t, u, shot) => shot.fn(t, u));
