// TURNO DA MADRUGADA: the series' world, shared by the three episodes (episodes 2 and 3 copy this file with their own
// name prefix via videos/turno-da-madrugada/tools/share-world.mjs, because every video's world shares one global scope).
// Three sets in one stage, far apart: the Gas-N-Go on Route 9 in the fog (origin), the store inside (x = 100) and the old
// mine entrance (x = -150). Everything is posed from t: lights, power, flicker, cars, fog, people.
type t2_V3 = [number, number, number];
type t2_Pose = import('../../styles/2.5d_cartoon/src/toon.ts').Rig;
type t2_Outfit = import('../../styles/2.5d_cartoon/src/toon.ts').RigOutfit;
type t2_Prop = import('../../styles/2.5d_cartoon/src/toon.ts').RigProp;
type t2_Expr = import('../../styles/2.5d_cartoon/src/toon.ts').Expr;
interface t2_Glow { m: THREE.MeshBasicMaterial; c: THREE.Color; group: string }
const T2_: { st?: ReturnType<typeof CT.stage>; glows: t2_Glow[]; cop?: THREE.Group; truck?: THREE.Group; copBar?: THREE.MeshBasicMaterial[] } = { glows: [] };

// ---------------- power and practical lights ----------------
/** an emissive (glowing) material in a power group: 'store' (windows, tubes, coolers, canopy, sign), 'gen' (back flood), 'red' (emergency) */
const t2_glowMat = (group: string, hex: string, k = 1.6, opacity = 1) => {
  const c = new THREE.Color(hex).multiplyScalar(k);
  const m = new THREE.MeshBasicMaterial({ color: c.clone(), transparent: opacity < 1, opacity, side: THREE.DoubleSide });
  T2_.glows.push({ m, c, group });
  return m;
};
/** set the power of a group this frame: 0 off .. 1 on (a cold fluorescent flicker comes from `flick`) */
const t2_power = (group: string, k: number) => {
  for (const g of T2_.glows) if (g.group === group) g.m.color.copy(g.c).multiplyScalar(Math.max(0.03, k));
};
/** deterministic fluorescent flicker: 1 most of the time, short dips (more when `bad` goes up) */
const t2_flick = (t: number, bad = 0.3) => {
  const f = Math.floor(t * 24), h = (n: number) => { const v = Math.sin(n * 91.7 + 7.3) * 43758.5; return v - Math.floor(v); };
  return h(f) < bad * 0.35 ? 0.15 + 0.4 * h(f + 3) : 1;
};
const t2_lights = (o: { store?: number; gen?: number; red?: number; cop?: number; t: number }) => {
  t2_power('store', o.store ?? 1); t2_power('gen', o.gen ?? 0); t2_power('red', o.red ?? 0);
  const on = o.cop ?? 0, ph = Math.floor(o.t * 6) % 2;
  if (T2_.copBar) { T2_.copBar[0].color.setRGB(2.6 * on * ph, 0.1, 0.1); T2_.copBar[1].color.setRGB(0.1, 0.3, 2.8 * on * (1 - ph)); }
};

// ---------------- painted textures ----------------
const t2_asphalt = () => CT.paint.ctex('tm-asphalt', 512, 512, (g, r) => {
  g.fillStyle = '#3a3c42'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) { g.fillStyle = r() < 0.5 ? '#2f3136' : '#47494f'; g.fillRect(r() * 512, r() * 512, 2 + r() * 3, 2 + r() * 3); }
  g.strokeStyle = '#2a2b30'; g.lineWidth = 3; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(r() * 512, r() * 512); for (let k = 0; k < 4; k++) g.lineTo(r() * 512, r() * 512); g.stroke(); }
});
const t2_road = () => CT.paint.ctex('tm-road', 512, 128, (g, r) => {
  g.fillStyle = '#34363b'; g.fillRect(0, 0, 512, 128);
  for (let i = 0; i < 900; i++) { g.fillStyle = r() < 0.5 ? '#2c2e33' : '#43454b'; g.fillRect(r() * 512, r() * 128, 2, 2); }
  g.fillStyle = '#d9b43a'; for (let x = 0; x < 512; x += 128) g.fillRect(x + 10, 60, 70, 8);
  g.fillStyle = '#cfcfc8'; g.fillRect(0, 6, 512, 5); g.fillRect(0, 117, 512, 5);
});
const t2_tiles = () => CT.paint.ctex('tm-tiles', 256, 256, (g) => {
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { g.fillStyle = (x + y) % 2 ? '#d6d2c2' : '#a8bdb2'; g.fillRect(x * 64, y * 64, 64, 64); }
  g.strokeStyle = 'rgba(60,60,60,0.35)'; g.lineWidth = 2; for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(i * 64, 0); g.lineTo(i * 64, 256); g.moveTo(0, i * 64); g.lineTo(256, i * 64); g.stroke(); }
});
const t2_siding = () => CT.paint.ctex('tm-siding', 256, 256, (g) => {
  g.fillStyle = '#c9c0a6'; g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 16) { g.fillStyle = '#b3aa90'; g.fillRect(0, y + 13, 256, 3); }
});
/** the pole sign: a pump, a crescent moon and a big 24 (pictures, the titles carry the words) */
const t2_signTex = () => CT.paint.ctex('tm-sign', 512, 340, (g) => {
  g.fillStyle = '#16233d'; g.fillRect(0, 0, 512, 340);
  g.strokeStyle = '#f2f2f2'; g.lineWidth = 14; g.strokeRect(10, 10, 492, 320);
  g.fillStyle = '#e8352b'; g.fillRect(60, 90, 110, 170); g.fillStyle = '#f2f2f2'; g.fillRect(80, 115, 70, 45);
  g.strokeStyle = '#e8352b'; g.lineWidth = 12; g.beginPath(); g.moveTo(170, 130); g.lineTo(205, 150); g.lineTo(205, 230); g.stroke();
  g.fillStyle = '#ffd34a'; g.font = 'bold 170px Arial'; g.fillText('24', 250, 245);
  g.beginPath(); g.arc(440, 80, 38, 0, Math.PI * 2); g.fill(); g.fillStyle = '#16233d'; g.beginPath(); g.arc(458, 68, 34, 0, Math.PI * 2); g.fill();
});
const t2_skullTex = () => CT.paint.ctex('tm-skull', 256, 256, (g) => {
  g.fillStyle = '#c9b48a'; g.fillRect(0, 0, 256, 256); g.strokeStyle = '#3a2a1a'; g.lineWidth = 10; g.strokeRect(6, 6, 244, 244);
  g.fillStyle = '#2a1a12'; g.beginPath(); g.arc(128, 110, 58, 0, Math.PI * 2); g.fill(); g.fillRect(96, 140, 64, 50);
  g.fillStyle = '#c9b48a'; g.beginPath(); g.arc(106, 108, 15, 0, Math.PI * 2); g.arc(150, 108, 15, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#2a1a12'; g.lineWidth = 16; g.beginPath(); g.moveTo(40, 220); g.lineTo(216, 40); g.moveTo(40, 40); g.lineTo(216, 220); g.stroke();
});

// ---------------- builders ----------------
const t2_box = (b: ReturnType<typeof CT.batch>, key: string, col: string, min: t2_V3, max: t2_V3, tile = 0) => CT.box(b, CT.mat(key, col), min, max, tile);
const t2_tmat = (key: string, tex: THREE.Texture, rx: number, ry: number) => CT.mat(key, { map: CT.paint.rep(tex, rx, ry) });
const t2_plane = (st: ReturnType<typeof CT.stage>, m: THREE.Material, w: number, h: number, pos: t2_V3, rot: t2_V3 = [0, 0, 0]) => {
  const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.position.set(...pos); p.rotation.set(...rot); p.receiveShadow = true; return st.add(p);
};
/** a car out of boxes: body, doors, cabin glass, wheels, headlights; returns the group (moved per frame by the shots) */
const t2_car = (st: ReturnType<typeof CT.stage>, key: string, body: string, top: string, cop: boolean) => {
  const grp = new THREE.Group();
  const bx = (col: string, min: t2_V3, max: t2_V3, m?: THREE.Material) => {
    const s: t2_V3 = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...s), m ?? CT.mat(`${key}-${col}`, col));
    mesh.position.set((min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2); mesh.castShadow = true; grp.add(mesh); return mesh;
  };
  bx(body, [-0.95, 0.35, -2.3], [0.95, 0.95, 2.3]);
  bx(top, [-0.96, 0.6, -0.9], [0.96, 0.95, 0.9]);
  bx(cop ? top : body, [-0.85, 0.95, -1.0], [0.85, 1.55, 0.7]);
  bx('#141a24', [-0.86, 1.0, 0.55], [0.86, 1.48, 0.72]);   // windscreen
  bx('#141a24', [-0.87, 1.02, -0.9], [0.87, 1.45, 0.5]);   // side glass
  for (const [x, z] of [[-0.9, 1.45], [0.9, 1.45], [-0.9, -1.45], [0.9, -1.45]]) bx('#121212', [x - 0.16, 0, z - 0.38], [x + 0.16, 0.66, z + 0.38]);
  const head = t2_glowMat('car', '#fff2c8', 2.2);
  bx('', [-0.85, 0.6, 2.29], [-0.45, 0.8, 2.33], head); bx('', [0.45, 0.6, 2.29], [0.85, 0.8, 2.33], head);
  const tail = t2_glowMat('car', '#ff2a1a', 1.4);
  bx('', [-0.85, 0.6, -2.33], [-0.5, 0.78, -2.29], tail); bx('', [0.5, 0.6, -2.33], [0.85, 0.78, -2.29], tail);
  if (cop) {
    const r = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.1, 0, 0) }), bl = new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 0, 0.1) });
    bx('', [-0.7, 1.55, -0.2], [-0.05, 1.72, 0.15], r); bx('', [0.05, 1.55, -0.2], [0.7, 1.72, 0.15], bl);
    T2_.copBar = [r, bl];
    bx('#e8c45a', [0.97, 0.62, -0.3], [0.99, 0.88, 0.1]);   // the door star, as a gold plate
  } else bx(body, [-0.95, 0.95, -2.3], [0.95, 1.15, -1.1]);   // pickup bed rim
  return st.add(grp);
};

const t2_init = (w: World) => {
  const st = T2_.st = CT.stage(w, { light: 'night', clouds: false, far: 900 });
  CT.ground(st, { kind: 'grass', size: 600, tile: 10 });
  // ---------- EXTERIOR: the Gas-N-Go on Route 9 ----------
  t2_plane(st, t2_tmat('tm-lot', t2_asphalt(), 8, 7), 32, 28, [0, 0.01, 3], [-Math.PI / 2, 0, 0]);
  t2_plane(st, t2_tmat('tm-road', t2_road(), 30, 1), 600, 8, [0, 0.015, 21], [-Math.PI / 2, 0, 0]);
  t2_plane(st, t2_tmat('tm-gravel', CT.paint.stoneHD('tm-gravel', ['#6d6a64', '#5f5c56', '#77736c', '#57544f'], '#3e3c39'), 6, 4), 30, 14, [0, 0.012, -18], [-Math.PI / 2, 0, 0]);
  const b = CT.batch();
  CT.box(b, t2_tmat('tm-wall', t2_siding(), 6, 2), [-9, 0, -12], [9, 4.2, -4], 0);
  t2_box(b, 'tm-fascia', '#a8262a', [-9.3, 4.0, -12.3], [9.3, 5.0, -3.7]);
  t2_box(b, 'tm-white', '#ebe8e0', [-9.31, 4.35, -3.69], [9.31, 4.6, -3.66]);
  t2_box(b, 'tm-steel', '#4a4e55', [3.2, 0, -12.08], [4.6, 2.4, -12.0]);
  for (const x of [-8.1, -1.4, -0.95, 0.95, 1.4, 8.1]) t2_box(b, 'tm-frame', '#3b3f45', [x - 0.08, 0.6, -3.98], [x + 0.08, 3.3, -3.9]);
  t2_box(b, 'tm-frame', '#3b3f45', [-8.2, 3.2, -3.98], [8.2, 3.35, -3.9]); t2_box(b, 'tm-frame', '#3b3f45', [-8.2, 0.55, -3.98], [8.2, 0.7, -3.9]);
  // canopy, pumps, sign
  for (const x of [-6, 6]) for (const z of [1, 9]) t2_box(b, 'tm-post', '#d9d6cc', [x - 0.18, 0, z - 0.18], [x + 0.18, 4.8, z + 0.18]);
  t2_box(b, 'tm-canopy', '#e9e6de', [-7.5, 4.8, -0.2], [7.5, 5.15, 10.2]);
  t2_box(b, 'tm-fascia', '#a8262a', [-7.55, 5.1, -0.25], [7.55, 5.55, 10.25]);
  for (const x of [-2.6, 2.6]) {
    t2_box(b, 'tm-island', '#9a978f', [x - 0.8, 0, 4.1], [x + 0.8, 0.2, 5.9]);
    t2_box(b, 'tm-pump', '#c0392b', [x - 0.4, 0.2, 4.7], [x + 0.4, 1.9, 5.3]);
    t2_box(b, 'tm-white', '#ebe8e0', [x - 0.42, 1.55, 4.68], [x + 0.42, 1.9, 5.32]);
  }
  t2_box(b, 'tm-post', '#8d8f94', [11.8, 0, 11.8], [12.2, 7.5, 12.2]);
  t2_box(b, 'tm-steel', '#4a4e55', [10.4, 7.4, 11.85], [13.6, 9.7, 12.15]);
  // back: generator pad, dumpster, flood pole
  t2_box(b, 'tm-concrete', '#8e8b84', [5.2, 0, -18.2], [8.0, 0.2, -16.0]);
  t2_box(b, 'tm-gen', '#c9b23a', [5.7, 0.2, -17.6], [7.5, 1.45, -16.5]);
  t2_box(b, 'tm-steel', '#4a4e55', [5.9, 0.4, -16.52], [7.3, 1.25, -16.46]);
  t2_box(b, 'tm-steel', '#4a4e55', [7.1, 1.45, -17.3], [7.25, 2.2, -17.15]);
  t2_box(b, 'tm-dumpster', '#2f5a3a', [-6, 0, -16.5], [-3.6, 1.5, -15]);
  t2_box(b, 'tm-post', '#8d8f94', [9.4, 0, -15.1], [9.6, 5.5, -14.9]);
  // the pines, in rings around the lot (the fog eats the far ones)
  let n = 0;
  for (let i = 0; i < 70; i++) {
    const a = (i / 70) * Math.PI * 2 + 0.37 * Math.sin(i * 7.1), d = 26 + 22 * (0.5 + 0.5 * Math.sin(i * 3.3)), x = Math.cos(a) * d, z = Math.sin(a) * d - 4;
    if (z > 15 && z < 27) continue;   // keep the road clear
    CT.tree(b, x, z, { kind: i % 5 === 0 ? 'tall' : 'cone', h: 9 + 6 * (0.5 + 0.5 * Math.sin(i * 1.7)), seed: i + 11 }); n++;
  }
  // ---------- INTERIOR: the store (x = 100) ----------
  const X = 100;
  t2_box(b, 'tm-inwall', '#d4d0bf', [X - 9.2, 0, -5.2], [X + 9.2, 3.6, -5]);
  t2_box(b, 'tm-inwall', '#d4d0bf', [X - 9.2, 0, -5.2], [X - 9, 3.6, 5.2]);
  t2_box(b, 'tm-inwall', '#d4d0bf', [X + 9, 0, -5.2], [X + 9.2, 3.6, 5.2]);
  t2_box(b, 'tm-inwall', '#d4d0bf', [X - 9.2, 0, 5], [X + 9.2, 0.7, 5.2]); t2_box(b, 'tm-inwall', '#d4d0bf', [X - 9.2, 3.2, 5], [X + 9.2, 3.6, 5.2]);
  for (const x of [-9, -1.1, 1.1, 8.6]) t2_box(b, 'tm-frame', '#3b3f45', [X + x - 0.15, 0.7, 5], [X + x + 0.15, 3.2, 5.2]);
  t2_box(b, 'tm-ceil', '#e3e1d6', [X - 9.2, 3.6, -5.2], [X + 9.2, 3.75, 5.2]);
  // aisles with products
  const PROD = ['#d63a3a', '#f0b429', '#2f7fd1', '#3aa65a', '#e86a1c', '#8e44ad', '#f2f2ea', '#c2185b'];
  for (const ax of [-3.2, 1.6]) {
    t2_box(b, 'tm-shelf', '#cfd2d4', [X + ax - 0.6, 0, -2.0], [X + ax + 0.6, 1.75, 1.9]);
    for (let lv = 0; lv < 3; lv++) for (let k = 0; k < 6; k++) for (const sd of [-1, 1]) {
      const z0 = -1.9 + k * 0.62, y0 = 0.25 + lv * 0.52, ci = (k * 3 + lv * 5 + (sd > 0 ? 2 : 0) + Math.abs(ax) * 7) % PROD.length;
      const x0 = sd < 0 ? X + ax - 0.66 : X + ax + 0.5;
      t2_box(b, `tm-prod${ci}`, PROD[ci], [x0, y0, z0], [x0 + 0.16, y0 + 0.32 + 0.08 * (k % 3), z0 + 0.48]);
    }
  }
  // counter, register, cigarette wall
  t2_box(b, 'tm-wood', '#7a4e32', [X + 3.6, 0, 1.6], [X + 7.2, 1.05, 2.8]);
  t2_box(b, 'tm-top', '#2d2d30', [X + 3.55, 1.05, 1.55], [X + 7.25, 1.12, 2.85]);
  t2_box(b, 'tm-steel', '#4a4e55', [X + 4.0, 1.12, 2.2], [X + 4.5, 1.32, 2.6]);
  for (let k = 0; k < 10; k++) t2_box(b, `tm-prod${k % PROD.length}`, PROD[k % PROD.length], [X - 8.95, 1.6 + (k % 2) * 0.35, -1 + Math.floor(k / 2) * 0.45], [X - 8.85, 1.9 + (k % 2) * 0.35, -0.6 + Math.floor(k / 2) * 0.45]);
  // coolers along the back wall
  t2_box(b, 'tm-cooler', '#9aa3ab', [X + 0, 0, -5], [X + 8.8, 2.6, -4.2]);
  // podcast table in the corner
  t2_box(b, 'tm-wood', '#7a4e32', [X - 8.8, 0, -4.6], [X - 7.0, 0.78, -3.0]);
  t2_box(b, 'tm-steel', '#4a4e55', [X - 8.4, 0.78, -4.2], [X - 7.6, 0.82, -3.6]);
  for (let k = 0; k < 6; k++) t2_box(b, 'tm-carton', '#a9875a', [X - 8.9 + (k % 3) * 0.62, 0, -2.2 + Math.floor(k / 3) * 0.7], [X - 8.35 + (k % 3) * 0.62, 0.55 + 0.25 * (k % 2), -1.65 + Math.floor(k / 3) * 0.7]);
  // ---------- MINE (x = -150) ----------
  const MX = -150, MZ = -80;
  for (const x of [-2.2, 2.2]) t2_box(b, 'tm-timber', '#5a3d24', [MX + x - 0.25, 0, MZ - 0.3], [MX + x + 0.25, 4.0, MZ + 0.2]);
  t2_box(b, 'tm-timber', '#5a3d24', [MX - 2.8, 3.8, MZ - 0.3], [MX + 2.8, 4.4, MZ + 0.2]);
  for (const [y, rot] of [[1.0, 0], [2.0, 0], [2.9, 0]] as const) t2_box(b, 'tm-board', '#6e5236', [MX - 2.1, y, MZ + 0.15], [MX + (y === 2.0 ? 0.4 : 2.1), y + 0.28 + rot, MZ + 0.3]);
  for (const x of [-0.7, 0.7]) t2_box(b, 'tm-rail', '#5d5650', [MX + x - 0.06, 0.02, MZ], [MX + x + 0.06, 0.14, MZ + 26]);
  for (let k = 0; k < 26; k++) t2_box(b, 'tm-timber', '#5a3d24', [MX - 1.1, 0.0, MZ + k + 0.2], [MX + 1.1, 0.08, MZ + k + 0.5]);
  t2_box(b, 'tm-post', '#6e5236', [MX + 4.4, 0, MZ + 6], [MX + 4.6, 2.2, MZ + 6.2]);
  for (let i = 0; i < 40; i++) {
    const x = MX + (i % 2 ? 1 : -1) * (7 + (i * 2.7) % 18), z = MZ + 2 + ((i * 5.3) % 40);
    CT.tree(b, x, z, { kind: i % 4 === 0 ? 'tall' : 'cone', h: 8 + (i * 1.3) % 6, seed: i + 101 });
  }
  CT.build(b, st);
  // the hill above the mine
  const hill = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 18), t2_tmat('tm-rock', CT.paint.stoneHD('tm-rock', ['#5a5650', '#4e4a45', '#625d56', '#47433e'], '#2e2b28'), 10, 6));
  hill.scale.set(1.6, 0.75, 0.9); hill.position.set(MX, -4, MZ - 27); hill.receiveShadow = true; st.add(hill);
  const hole = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 3.8), new THREE.MeshBasicMaterial({ color: '#030303' })); hole.position.set(MX, 1.9, MZ - 0.32); st.add(hole);
  t2_plane(st, t2_tmat('tm-gravel2', CT.paint.stoneHD('tm-gravel', ['#6d6a64', '#5f5c56', '#77736c', '#57544f'], '#3e3c39'), 5, 8), 14, 34, [MX, 0.012, MZ + 15], [-Math.PI / 2, 0, 0]);
  const skull = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), CT.mat('tm-skull', { map: t2_skullTex() })); skull.position.set(MX + 4.5, 2.2, MZ + 6.25); st.add(skull);
  // ---------- glowing things (power groups) ----------
  const WIN = t2_glowMat('store', '#cfeedd', 1.35);
  t2_plane(st, WIN, 6.6, 2.5, [-4.75, 1.95, -3.95]); t2_plane(st, WIN, 6.6, 2.5, [4.75, 1.95, -3.95]);
  t2_plane(st, t2_glowMat('store', '#e8f6ea', 1.5), 1.8, 2.65, [0, 1.33, -3.95]);
  const PANEL = t2_glowMat('store', '#f4fff4', 2.4);
  for (const x of [-3.2, 3.2]) for (const z of [2.5, 7.5]) t2_plane(st, PANEL, 2.4, 1.2, [x, 4.79, z], [Math.PI / 2, 0, 0]);
  const SIGN = new THREE.MeshBasicMaterial({ map: t2_signTex(), color: new THREE.Color(1.3, 1.3, 1.3) }); T2_.glows.push({ m: SIGN, c: SIGN.color.clone(), group: 'store' });
  t2_plane(st, SIGN, 3.0, 2.1, [12, 8.55, 12.16]); t2_plane(st, SIGN, 3.0, 2.1, [12, 8.55, 11.84], [0, Math.PI, 0]);
  for (const x of [-2.6, 2.6]) t2_plane(st, t2_glowMat('store', '#7fffb0', 1.6), 0.45, 0.25, [x, 1.3, 5.31]);
  t2_plane(st, t2_glowMat('gen', '#fff4d0', 3), 0.7, 0.4, [9.5, 5.4, -14.85]);
  t2_plane(st, t2_glowMat('store', '#fff4d0', 2.2), 0.5, 0.25, [3.9, 2.65, -12.12], [0, Math.PI, 0]);
  // interior: tubes, cooler doors, window panes (dark night outside, see-through), exit lamp
  const TUBE = t2_glowMat('store', '#f2fff2', 2.6);
  for (const x of [-6, -1, 4]) for (const z of [-3, 0, 3]) t2_plane(st, TUBE, 2.2, 0.22, [X + x, 3.58, z], [Math.PI / 2, 0, 0]);
  const COOL = t2_glowMat('store', '#dff2ff', 1.5);
  for (let k = 0; k < 5; k++) t2_plane(st, COOL, 1.55, 2.2, [X + 0.95 + k * 1.75, 1.3, -4.18]);
  const PANE = new THREE.MeshBasicMaterial({ color: '#0b1424', transparent: true, opacity: 0.55 });
  for (const [x0, x1] of [[-8.85, -1.25], [1.25, 8.45]]) t2_plane(st, PANE, x1 - x0, 2.5, [X + (x0 + x1) / 2, 1.95, 5.1], [0, Math.PI, 0]);
  const outside = new THREE.Mesh(new THREE.PlaneGeometry(40, 12), new THREE.MeshBasicMaterial({ color: '#0c111b' })); outside.rotation.x = -Math.PI / 2; outside.position.set(X, 0.03, 11.2); st.add(outside);
  const fogBack = new THREE.Mesh(new THREE.PlaneGeometry(60, 14), new THREE.MeshBasicMaterial({ color: '#1a2233' })); fogBack.position.set(X, 5, 16); fogBack.rotation.y = Math.PI; st.add(fogBack);
  t2_plane(st, t2_glowMat('red', '#ff2a1a', 2.4), 0.6, 0.25, [X - 8, 3.0, -4.98]);
  t2_plane(st, t2_tmat('tm-floor', t2_tiles(), 9, 5), 18, 10, [X, 0.006, 0], [-Math.PI / 2, 0, 0]);
  // cars
  T2_.cop = t2_car(st, 'tm-cop', '#3d2f22', '#ebe7dc', true); T2_.cop.position.set(9.2, 0, 5.5); T2_.cop.rotation.y = Math.PI;
  T2_.truck = t2_car(st, 'tm-truck', '#7e1b1b', '#7e1b1b', false); T2_.truck.position.set(-10, 0, 7); T2_.truck.rotation.y = 0.15;
  void n;
  return st;
};

// ---------------- the cast (all original) ----------------
const T2_CAST: Record<string, t2_Outfit> = {
  lola: { jacket: '#566238', pants: '#27324a', boots: '#3b2a1e', hat: 'hair', hair: '#1d120e', skin: CT.SKINS[3], zip: true, shirt: '#2b2b2b', ponytail: '#1d120e' },
  tobby: { jacket: '#8d8f96', pants: '#b39b6c', boots: '#f0ede4', hat: 'cap', cap: '#2e7d4f', skin: CT.SKINS[0], vest: '#e8742c' },
  earl: { jacket: '#b39a62', pants: '#4a3a2a', boots: '#2a1d14', hat: 'cap', cap: '#6b5233', skin: CT.SKINS[1], moustache: '#d8d6d0', build: 'stout', badge: true, belt: '#2a1d14' },
  earlSick: { jacket: '#b39a62', pants: '#4a3a2a', boots: '#2a1d14', hat: 'cap', cap: '#6b5233', skin: '#d9c2a8', moustache: '#d8d6d0', build: 'stout', badge: true, belt: '#2a1d14', veins: 0.8 },
  dale: { jacket: '#9e2a2a', pants: '#2f3a52', boots: '#3b2a1e', hat: 'cap', cap: '#e8e4da', skin: CT.SKINS[2], flannel: '#5a1414', beard: '#6b4a2e', build: 'stout' },
  daleHollow: { jacket: '#7a2424', pants: '#2a3348', boots: '#2b211a', hat: null, skin: '#93a5aa', flannel: '#3a0e0e', build: 'stout', hollow: true, long: 1.0 },
  daleBeast: { jacket: '#5a1c1c', pants: '#232a3c', boots: '#2b211a', hat: null, skin: '#8399a0', flannel: '#2a0a0a', build: 'stout', hollow: true, long: 1.45 },
  daleTied: { jacket: '#7a2424', pants: '#2a3348', boots: '#2b211a', hat: null, skin: '#93a5aa', flannel: '#3a0e0e', build: 'stout', hollow: true, tape: true, bag: '#f2c230' },
  miner: { jacket: '#3b4652', pants: '#2c3138', boots: '#1d1d1d', hat: 'miner', skin: CT.SKINS[1], miner: true, stripes: true, lamp: 1 },
  miner2: { jacket: '#4a4136', pants: '#2c3138', boots: '#1d1d1d', hat: 'miner', skin: CT.SKINS[3], miner: true, stripes: true, lamp: 1, moustache: '#3a2a1a' },
  earlYoung: { jacket: '#b39a62', pants: '#4a3a2a', boots: '#2a1d14', hat: 'cap', cap: '#6b5233', skin: CT.SKINS[1], moustache: '#5a3b2a', badge: true, belt: '#2a1d14' },
  oco: { jacket: '#3b4652', pants: '#2c3138', boots: '#1d1d1d', hat: 'miner', skin: '#9fb0b4', hollow: true, miner: true, stripes: true, long: 1.15 },
  oco2: { jacket: '#4a4136', pants: '#2c3138', boots: '#1d1d1d', hat: 'miner', skin: '#a3b1ad', hollow: true, miner: true, stripes: true, long: 1.2 },
};
/** blink: 3 frames shut every 2-4 s, different per id */
const t2_blink = (t: number, id: number) => { const f = Math.round(t * 30), per = 70 + ((id * 37) % 50); return ((f + id * 17) % per) < 3 ? 1 : 0; };
const t2_q = (o: unknown) => JSON.stringify(o, (_k, v) => (typeof v === 'number' ? Math.round(v * 2) / 2 : v));
/** one rigged character this frame. k = size (1 = adult 2.16 m) */
const t2_rig = (st: ReturnType<typeof CT.stage>, id: number, who: string, at: t2_V3, pose: t2_Pose, t: number, k = 1, o?: Partial<t2_Outfit>) => {
  const out = o ? { ...T2_CAST[who], ...o } : T2_CAST[who], P: t2_Pose = { ...pose, blink: pose.blink ?? t2_blink(t, id) };
  st.person({ id, who: { key: `tm|${who}|${o ? t2_q(o) : ''}|${t2_q(P)}`, draw: (p, light) => CT.bodyRig(p, out, { ...P, light, seed: id }) }, at, scale: k / CT.RIG_SCALE });
};

// ---------------- poses (facing screen right; t2_flip mirrors them) ----------------
const T2_P: Record<string, t2_Pose> = {
  stand: { armL: [-8, -4], armR: [8, 4], legL: [-4, 0], legR: [4, 0] },
  relax: { armL: [-6, 10], armR: [10, 30], legL: [-5, 0], legR: [5, 0], torso: -2 },
  arms: { armL: [30, 100], armR: [-30, -100], legL: [-6, 0], legR: [6, 0], front: 'both' },               // arms crossed
  shrug: { armL: [-50, 40], armR: [50, -40], legL: [-5, 0], legR: [5, 0], head: 8 },
  point: { armL: [-8, -4], armR: [100, 95], legL: [-4, 0], legR: [4, 0], torso: 4 },
  scared: { armL: [40, 160], armR: [-30, 170], legL: [-12, -2], legR: [10, 2], hip: [0, 18], torso: -6, front: 'both' },
  guard: { armL: [25, 172], armR: [40, 160], legL: [-22, -6], legR: [16, 6], hip: [0, 16], torso: 6, fistL: true, fistR: true, front: 'L' },
  jab: { armL: [25, 172], armR: [96, 92], legL: [-26, -8], legR: [20, 8], hip: [10, 16], torso: 12, fistL: true, fistR: true, front: 'L' },
  cross: { armL: [92, 90], armR: [35, 165], legL: [-30, -12], legR: [18, 6], hip: [16, 14], torso: 18, fistL: true, fistR: true, front: 'L' },
  hook: { armL: [25, 172], armR: [100, 175], legL: [-20, -6], legR: [18, 6], hip: [8, 16], torso: 20, fistL: true, fistR: true, front: 'R' },
  elbow: { armL: [118, 245], armR: [40, 160], legL: [-26, -10], legR: [18, 6], hip: [14, 12], torso: 16, fistL: true, fistR: true, front: 'L' },
  knee: { armL: [95, 125], armR: [80, 125], legL: [-6, -2], legR: [105, 10], hip: [10, 0], torso: -8, front: 'both' },
  wrist: { armL: [70, 100], armR: [62, 95], legL: [-16, -4], legR: [14, 4], hip: [0, 12], torso: 10, front: 'both' },
  kickLow: { armL: [-40, 150], armR: [20, 165], legL: [-4, -2], legR: [72, 88], hip: [-6, 0], torso: -22, fistL: true, fistR: true },
  kickHigh: { armL: [-50, 140], armR: [10, 170], legL: [-2, 0], legR: [98, 100], hip: [-14, -10], torso: -30, fistL: true, fistR: true },
  grabbed: { armL: [70, 120], armR: [60, 115], legL: [-14, -4], legR: [8, 2], hip: [-10, 8], torso: -14, head: -10, expr: 'pained', front: 'both' },
  thrown: { armL: [-130, -160], armR: [30, 130], legL: [-30, -10], legR: [10, 30], hip: [-30, 10], torso: -32, head: -18, expr: 'pained' },
  lifted: { armL: [70, 150], armR: [58, 140], legL: [-10, -6], legR: [18, 10], hip: [0, -70], torso: -4, head: -16, expr: 'pained', front: 'both' },
  slam: { armL: [118, 70], armR: [108, 55], legL: [-30, -10], legR: [10, 4], hip: [-6, 14], torso: 42, head: 18, fistL: true, fistR: true, expr: 'stern', front: 'both' },
  hitHead: { armL: [-30, -60], armR: [20, 70], legL: [-14, -6], legR: [14, 4], hip: [-14, 6], torso: -20, head: -24, expr: 'dazed' },
  hitBody: { armL: [30, 80], armR: [10, 60], legL: [-12, -4], legR: [12, 4], hip: [-8, 18], torso: 28, head: 10, expr: 'pained', front: 'both' },
  down: { armL: [-150, -170], armR: [160, 175], legL: [-6, -2], legR: [6, 2], hip: [0, 315], roll: -90, expr: 'dazed' },
  downFace: { armL: [-160, -175], armR: [150, 160], legL: [-8, -2], legR: [6, 4], hip: [0, 315], roll: 90, expr: 'dazed' },
  crawl: { armL: [40, 20], armR: [70, 60], legL: [-20, -60], legR: [-5, 20], hip: [0, 290], roll: 72, head: -40, front: 'both' },
  crouch: { armL: [20, 60], armR: [40, 80], legL: [-40, 20], legR: [40, -20], hip: [0, 120], torso: 18, front: 'both' },
  duck: { armL: [40, 160], armR: [60, 170], legL: [-50, 10], legR: [45, -10], hip: [0, 130], torso: 30, head: 10, fistL: true, fistR: true, front: 'both' },
  grab: { armL: [92, 96], armR: [80, 90], legL: [-18, -6], legR: [14, 4], hip: [8, 10], torso: 14, front: 'both' },
  choke: { armL: [-20, 10], armR: [118, 140], legL: [-16, -4], legR: [12, 4], hip: [6, 6], torso: 8, front: 'none' },
  lunge: { armL: [110, 105], armR: [95, 98], legL: [-38, -16], legR: [30, 10], hip: [24, 20], torso: 30, front: 'both' },
  windup: { armL: [175, 200], armR: [168, 195], legL: [-16, -4], legR: [16, 4], hip: [-6, 6], torso: -14, front: 'both' },
  swing: { armL: [100, 92], armR: [92, 86], legL: [-28, -10], legR: [22, 8], hip: [16, 12], torso: 26, front: 'both' },
  aim: { armL: [80, 95], armR: [100, 90], legL: [-18, -4], legR: [14, 4], hip: [0, 8], torso: 4, front: 'both' },
  recoil: { armL: [70, 120], armR: [95, 110], legL: [-20, -6], legR: [14, 4], hip: [-10, 8], torso: -12, head: -8, front: 'both' },
  pull: { armL: [20, 40], armR: [-70, -100], legL: [-24, -8], legR: [20, 6], hip: [-14, 16], torso: -16, fistR: true },
  bite: { armL: [100, 130], armR: [80, 125], legL: [-20, -6], legR: [16, 4], hip: [12, 30], torso: 34, head: 14, front: 'both' },
  mount: { armL: [130, 170], armR: [115, 160], legL: [-80, 30], legR: [80, -30], hip: [0, 230], torso: 18, front: 'both' },
  push: { armL: [140, 150], armR: [125, 135], legL: [-6, -2], legR: [6, 2], hip: [0, 315], roll: -90, fistL: true, fistR: true, expr: 'pained', front: 'both' },
  walk: { armL: [-14, -6], armR: [14, 6], legL: [-14, -4], legR: [12, 4] },
  stab: { armL: [-20, 30], armR: [110, 100], legL: [-24, -8], legR: [18, 6], hip: [10, 10], torso: 18, front: 'R' },
  hold: { armL: [30, 100], armR: [40, 110], legL: [-6, 0], legR: [6, 0], front: 'both' },
  sitWall: { armL: [10, 40], armR: [-10, -40], legL: [-75, -95], legR: [75, 95], hip: [0, 255], front: 'both' },
  sneak: { armL: [30, 150], armR: [70, 160], legL: [-22, -6], legR: [18, 8], hip: [0, 40], torso: 14, front: 'both' },
  radio: { armL: [-8, -4], armR: [30, 175], legL: [-5, 0], legR: [5, 0], prop: { kind: 'radio', hand: 'R', ang: 175 } },
  sleeve: { armL: [60, 100], armR: [40, 150], legL: [-6, 0], legR: [6, 0], front: 'both', head: 10 },
};
const t2_lerpA = (a: [number, number] | undefined, b: [number, number] | undefined, k: number, d: [number, number]): [number, number] => {
  const A = a ?? d, B = b ?? d; return [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
};
const t2_n = (a: number | undefined, b: number | undefined, k: number) => (a ?? 0) + ((b ?? 0) - (a ?? 0)) * k;
/** blend two poses (k 0..1, eased by the caller): joints interpolate, switches (expr, props, fists) flip at the middle */
const t2_mix = (A: t2_Pose, B: t2_Pose, k: number): t2_Pose => {
  const S = T2_P.stand, half = k < 0.5 ? A : B;
  return { ...half,
    armL: t2_lerpA(A.armL, B.armL, k, S.armL!), armR: t2_lerpA(A.armR, B.armR, k, S.armR!), legL: t2_lerpA(A.legL, B.legL, k, S.legL!), legR: t2_lerpA(A.legR, B.legR, k, S.legR!),
    hip: [t2_n(A.hip?.[0], B.hip?.[0], k), t2_n(A.hip?.[1], B.hip?.[1], k)], torso: t2_n(A.torso, B.torso, k), head: t2_n(A.head, B.head, k), roll: t2_n(A.roll, B.roll, k),
    blood: t2_n(A.blood, B.blood, k), maw: t2_n(A.maw, B.maw, k), bruise: t2_n(A.bruise, B.bruise, k),
    prop: A.prop && B.prop && A.prop.kind === B.prop.kind ? { ...half.prop!, ang: t2_n(A.prop.ang, B.prop.ang, k) } : half.prop };
};
/** mirror a pose to face screen left */
const t2_flip = (P: t2_Pose): t2_Pose => {
  const m = (a?: [number, number]): [number, number] | undefined => (a ? [-a[0], -a[1]] : undefined);
  const mp = (q?: t2_Prop | null) => (q ? { ...q, hand: (q.hand ?? 'R') === 'R' ? 'L' as const : 'R' as const, ang: -q.ang } : q);
  return { ...P, armL: m(P.armR), armR: m(P.armL), legL: m(P.legR), legR: m(P.legL), fistL: P.fistR, fistR: P.fistL,
    front: P.front === 'L' ? 'R' : P.front === 'R' ? 'L' : P.front, hip: P.hip ? [-P.hip[0], P.hip[1]] : undefined,
    torso: P.torso !== undefined ? -P.torso : undefined, head: P.head !== undefined ? -P.head : undefined, roll: P.roll !== undefined ? -P.roll : undefined,
    prop: mp(P.prop), prop2: mp(P.prop2), facing: P.facing !== undefined ? (-P.facing as -1 | 0 | 1) : undefined };
};
const t2_ease = (x: number) => { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c); };
/** a choreography: [time, pose name or pose, extra] keys; holds between keys and blends over `blend` s into each key */
type t2_Key = [number, string | t2_Pose, t2_Pose?];
const t2_seq = (t: number, keys: t2_Key[], blend = 0.18): t2_Pose => {
  const get = (k: t2_Key): t2_Pose => ({ ...(typeof k[1] === 'string' ? T2_P[k[1]] : k[1]), ...(k[2] ?? {}) });
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const cur = get(keys[i]);
  if (i === 0 || t >= keys[i][0] + blend) return cur;
  return t2_mix(get(keys[i - 1]), cur, t2_ease((t - keys[i][0]) / blend));
};
/** facing right (+1) or left (-1): pose plus `facing` */
const t2_face = (P: t2_Pose, f: 1 | -1, extra: t2_Pose = {}): t2_Pose => ({ ...(f > 0 ? P : t2_flip(P)), facing: f, ...extra });

// ---------------- effects (flat drawings, deterministic from t) ----------------
const t2_hash = (n: number) => { const v = Math.sin(n * 127.1 + 31.7) * 43758.5453; return v - Math.floor(v); };
/** blood (or coal) spray: droplets flying along `dir` (-1 left, 1 right) with gravity, u = 0..1 */
const t2_spray = (st: ReturnType<typeof CT.stage>, at: t2_V3, size: number, u: number, seed: number, dir: number, coal = false) => {
  const k = Math.round(Math.min(1, Math.max(0, u)) * 20) / 20, col = coal ? '#141014' : '#b3121e', col2 = coal ? '#3a2a2e' : '#7a0a12';
  st.card({ key: `tm-spray-${seed}-${dir}-${coal}-${k}`, cw: 512, ch: 512, at, w: size, h: size, draw: (p) => {
    for (let i = 0; i < 26; i++) {
      const a = (t2_hash(seed + i) - 0.5) * 1.6, v = 120 + 220 * t2_hash(seed + i * 3), x = 256 + dir * Math.cos(a) * v * k, y = 256 + Math.sin(a) * v * k * 0.6 + 240 * k * k;
      const r = (4 + 13 * t2_hash(seed + i * 7)) * (1 - 0.5 * k);
      p.ell(x, y, r * (1 + 0.8 * k), r, i % 3 ? col : col2, 0);
    }
  } });
};
const t2_shards = (st: ReturnType<typeof CT.stage>, at: t2_V3, size: number, u: number, seed: number) => {
  const k = Math.round(Math.min(1, Math.max(0, u)) * 20) / 20;
  st.card({ key: `tm-shards-${seed}-${k}`, cw: 512, ch: 512, at, w: size, h: size, draw: (p) => {
    for (let i = 0; i < 24; i++) {
      const a = t2_hash(seed + i) * Math.PI * 2, v = 60 + 200 * t2_hash(seed + i * 5), x = 256 + Math.cos(a) * v * k, y = 256 + Math.sin(a) * v * k + 160 * k * k, s = 8 + 18 * t2_hash(i + seed * 2), r = a * 3 + k * 6;
      p.poly([[x + Math.cos(r) * s, y + Math.sin(r) * s], [x + Math.cos(r + 2.3) * s * 0.6, y + Math.sin(r + 2.3) * s * 0.6], [x + Math.cos(r + 4) * s * 0.8, y + Math.sin(r + 4) * s * 0.8]], i % 2 ? '#d9f0ff' : '#a9cfe6', 2);
    }
  } });
};
/** a soft light glow (flashlights, flares, headlights, ring light) */
const t2_glow = (st: ReturnType<typeof CT.stage>, at: t2_V3, size: number, col: string, k = 1) => {
  const a = Math.round(Math.min(1, Math.max(0, k)) * 10) / 10;
  if (a <= 0) return;
  st.card({ key: `tm-glow-${col}-${a}`, cw: 256, ch: 256, at, w: size, h: size, soft: true, draw: (p) => {
    const g = p.g, gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, col); gr.addColorStop(0.25, col + 'aa'); gr.addColorStop(1, col + '00'); g.globalAlpha = a; g.fillStyle = gr; g.fillRect(0, 0, 256, 256); g.globalAlpha = 1;
  } });
};
/** drifting fog wisps near the ground around a point (the fog that came down the mountain) */
const t2_fog = (st: ReturnType<typeof CT.stage>, t: number, c: t2_V3, n = 8, spread = 10, dense = 0.5) => {
  for (let i = 0; i < n; i++) {
    const x = c[0] + (t2_hash(i) - 0.5) * spread * 2 + Math.sin(t * 0.13 + i) * 1.5 + ((t * 0.35 + i * 3) % 8) - 4, z = c[2] + (t2_hash(i + 9) - 0.5) * spread * 2, s = 5 + 5 * t2_hash(i + 4);
    const a = Math.round(dense * (0.5 + 0.5 * t2_hash(i + 2)) * 10) / 10;
    st.card({ key: `tm-fog-${i % 3}-${a}`, cw: 256, ch: 128, at: [x, c[1] + 0.6 + 0.5 * t2_hash(i + 7), z], w: s, h: s * 0.4, soft: true, draw: (p) => {
      const g = p.g; g.globalAlpha = a;
      for (let j = 0; j < 6; j++) { const gr = g.createRadialGradient(40 + j * 35, 64 + 10 * Math.sin(j + i), 0, 40 + j * 35, 64, 60); gr.addColorStop(0, 'rgba(150,165,190,0.55)'); gr.addColorStop(1, 'rgba(150,165,190,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 128); }
      g.globalAlpha = 1;
    } });
  }
};
/** knuckles on glass: three ripples on a window (u = 0..1) */
const t2_knock = (st: ReturnType<typeof CT.stage>, at: t2_V3, u: number) => st.effect('ring', at, 0.6 + 0.6 * u, u);
/** the camera shake on impacts: flips sign every frame for 7 frames after `t0` */
const t2_shake = (t: number, t0: number, amp = 0.06): t2_V3 => {
  const f = Math.round((t - t0) * 30); if (f < 0 || f > 7) return [0, 0, 0];
  const s = (f % 2 ? 1 : -1) * amp * (1 - f / 8); return [s, s * 0.6, 0];
};
const t2_add = (a: t2_V3, b: t2_V3): t2_V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const t2_lerp3 = (a: t2_V3, b: t2_V3, k: number): t2_V3 => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

// ---------------- world test shots (core/world.ts) ----------------
const T2_SHEETS = [['guard', 'jab', 'cross', 'hook'], ['elbow', 'knee', 'kickLow', 'kickHigh'], ['grabbed', 'thrown', 'lifted', 'slam'], ['hitHead', 'hitBody', 'duck', 'pull'],
  ['down', 'downFace', 'crawl', 'mount'], ['windup', 'swing', 'aim', 'recoil'], ['choke', 'lunge', 'bite', 'push'], ['scared', 'arms', 'shrug', 'point']];
CT.shots([
  { id: 'test-cast' }, ...[...T2_SHEETS, ...T2_SHEETS].map((_, i) => ({ id: `test-sheet${i}` })), { id: 'test-ext0' }, { id: 'test-ext1' }, { id: 'test-ext2' }, { id: 'test-int' }, { id: 'test-back' }, { id: 'test-mine' }, { id: 'test-blackout' },
], t2_init, (t, u, shot) => {
  const st = T2_.st!;
  if (shot.id === 'test-cast') {
    st.light('store', { view: [0, -1] }); t2_lights({ store: 1, t });
    st.look([105.5, 1.2, 4.6], [105.5, 1.0, -3.0], 40, 0);
    const names = ['lola', 'tobby', 'earl', 'dale', 'daleHollow', 'oco'];
    names.forEach((n, i) => t2_rig(st, i + 1, n, [103.2 + (i % 3) * 2.3, 0, i < 3 ? -1.2 : -3.6], t2_face(T2_P.stand, i < 3 ? 1 : -1, { expr: (['smile', 'nervous', 'stern', 'grin', 'neutral', 'neutral'] as t2_Expr[])[i], maw: i === 5 ? 0.8 : 0 }), t, 1));
  } else if (shot.id.startsWith('test-sheet')) {
    st.light('store', { view: [0, -1] }); t2_lights({ store: 1, t });
    st.look([0, 1.3, 13], [0, 1.15, 6], 40, 0);
    const i = Number(shot.id.slice(10)), A = T2_SHEETS[i >> 1].slice((i & 1) * 2, (i & 1) * 2 + 2);
    A.forEach((n, j) => t2_rig(st, 10 + j, j ? 'lola' : 'daleHollow', [-0.75 + j * 1.5, 0, 6], t2_face(T2_P[n], 1, { expr: 'stern', blood: 0.5, prop: n === 'windup' || n === 'swing' ? { kind: 'pickaxe', hand: 'R', ang: n === 'windup' ? 200 : 80 } : n === 'aim' || n === 'recoil' ? { kind: 'shotgun', hand: 'R', ang: 92, on: n === 'recoil' ? 1 : 0 } : null }), t, 0.9));
  } else if (shot.id.startsWith('test-ext')) {
    st.light('night', { view: [0.3, -1] }); t2_lights({ store: t2_flick(t, 0.2), cop: 1, t });
    const k = Number(shot.id.slice(8) || 0);
    if (k === 0) st.look([7, 1.5, 32], [0, 3.2, 0], 30, 0);
    else if (k === 1) st.look([-6, 1.2, 12], [-1.5, 1.8, -3], 36, 0);
    else st.look([14, 6, 30], [2, 2.5, 0], 34, 0);
    t2_fog(st, t, [0, 0, 6], 10, 14, 0.5);
    t2_rig(st, 30, 'oco', [-4.2, 0, -3.0], t2_face(T2_P.stand, 1, {}), t, 1);
  } else if (shot.id === 'test-int') {
    st.light('store', { view: [0.2, -1] }); t2_lights({ store: t2_flick(t, 0.2), t });
    st.look([97.5, 1.6, 4.6], [94.5, 1.2, 0.5], 40, 0);
    t2_rig(st, 31, 'lola', [94.0, 0, 0.9], t2_face(T2_P.arms, 1, { expr: 'stern' }), t);
    t2_rig(st, 32, 'tobby', [96.0, 0, 3.3], t2_face(T2_P.scared, -1, { expr: 'nervous' }), t);
  } else if (shot.id === 'test-back') {
    st.light('blackout', { view: [0.3, -1] }); t2_lights({ store: 0, gen: u > 0.5 ? 1 : 0, t });
    st.look([3.8, 1.4, -24.5], [4.6, 1.1, -19], 40, 0);
    t2_fog(st, t, [5, 0, -20], 8, 8, 0.6);
    t2_rig(st, 33, 'lola', [3.7, 0, -19.4], t2_face(T2_P.guard, 1, { prop: { kind: 'crowbar', hand: 'R', ang: 150 }, expr: 'stern' }), t);
    t2_rig(st, 34, 'oco2', [5.4, 0, -19.6], t2_face(T2_P.windup, -1, { prop: { kind: 'pickaxe', hand: 'R', ang: 200 }, maw: 0.6 }), t);
    t2_glow(st, [4.1, 1.4, -19.2], 1.5, '#fff4c0', 0.8);
  } else if (shot.id === 'test-mine') {
    st.light('night', { view: [0.1, -1] }); t2_lights({ store: 0, cop: 1, t });
    st.look([-147, 2.2, -64], [-150, 2.0, -80], 40, 0);
    t2_fog(st, t, [-150, 0, -72], 10, 10, 0.6);
    for (let i = 0; i < 4; i++) t2_rig(st, 40 + i, i % 2 ? 'oco' : 'oco2', [-152 + i * 1.3, 0, -74 - i * 0.8], t2_face(T2_P.walk, i % 2 ? 1 : -1, {}), t);
  } else {
    st.light('emergency', { view: [0, -1] }); t2_lights({ store: 0, red: 1, t });
    st.look([105.8, 1.35, 0.6], [105.0, 1.25, -3.6], 40, -4);
    t2_rig(st, 50, 'lola', [104.4, 0, -3.85], t2_face(T2_P.lifted, 1, { blood: 0.6 }), t);
    t2_rig(st, 51, 'daleBeast', [105.7, 0, -3.5], t2_face(T2_P.choke, -1, { maw: 0.7 }), t, 1.15);
    t2_shards(st, [104.6, 1.6, -3.95], 2.2, u, 3);
  }
});
