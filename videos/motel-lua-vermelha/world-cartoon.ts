// MOTEL LUA VERMELHA: the world (16:9). The Red Moon Motel on Route 375, Nevada: the room row (rooms 1-11 along x,
// fronts at z -6, walkway to z -3.4), the office (x 22-30) and its interior (x = 200), room 11 inside (x = 300), the raised
// empty pool, the lot, the sign pole with its catwalk (deck at y 8.65, x 31.6-36.4, z 17-18.6), the transformer pole by the
// highway (-40, 26), the desert and the mesas. Helpers (lights, rig, poses, effects) come from the night-shift series.
type mv_V3 = [number, number, number];
type mv_Pose = import('../../styles/2.5d_cartoon/src/toon.ts').Rig;
type mv_Outfit = import('../../styles/2.5d_cartoon/src/toon.ts').RigOutfit;
type mv_Prop = import('../../styles/2.5d_cartoon/src/toon.ts').RigProp;
type mv_Expr = import('../../styles/2.5d_cartoon/src/toon.ts').Expr;
interface mv_Glow { m: THREE.MeshBasicMaterial; c: THREE.Color; group: string }
const MV_: { st?: ReturnType<typeof CT.stage>; glows: mv_Glow[]; cop?: THREE.Group; truck?: THREE.Group; copBar?: THREE.MeshBasicMaterial[]; cars?: Record<string, THREE.Group> } = { glows: [] };

// ---------------- power and practical lights ----------------
/** an emissive (glowing) material in a power group: 'store' (windows, tubes, coolers, canopy, sign), 'gen' (back flood), 'red' (emergency) */
const mv_glowMat = (group: string, hex: string, k = 1.6, opacity = 1) => {
  const c = new THREE.Color(hex).multiplyScalar(k);
  const m = new THREE.MeshBasicMaterial({ color: c.clone(), transparent: opacity < 1, opacity, side: THREE.DoubleSide });
  MV_.glows.push({ m, c, group });
  return m;
};
/** set the power of a group this frame: 0 off .. 1 on (a cold fluorescent flicker comes from `flick`) */
const mv_power = (group: string, k: number) => {
  for (const g of MV_.glows) if (g.group === group) g.m.color.copy(g.c).multiplyScalar(Math.max(0.03, k));
};
/** deterministic fluorescent flicker: 1 most of the time, short dips (more when `bad` goes up) */
const mv_flick = (t: number, bad = 0.3) => {
  const f = Math.floor(t * 24), h = (n: number) => { const v = Math.sin(n * 91.7 + 7.3) * 43758.5; return v - Math.floor(v); };
  return h(f) < bad * 0.35 ? 0.15 + 0.4 * h(f + 3) : 1;
};
const mv_lights = (o: { store?: number; gen?: number; red?: number; cop?: number; t: number }) => {
  mv_power('store', o.store ?? 1); mv_power('gen', o.gen ?? 0); mv_power('red', o.red ?? 0);
  const on = o.cop ?? 0, ph = Math.floor(o.t * 6) % 2;
  if (MV_.copBar) { MV_.copBar[0].color.setRGB(2.6 * on * ph, 0.1, 0.1); MV_.copBar[1].color.setRGB(0.1, 0.3, 2.8 * on * (1 - ph)); }
};

// ---------------- painted textures ----------------
const mv_asphalt = () => CT.paint.ctex('tm-asphalt', 512, 512, (g, r) => {
  g.fillStyle = '#3a3c42'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) { g.fillStyle = r() < 0.5 ? '#2f3136' : '#47494f'; g.fillRect(r() * 512, r() * 512, 2 + r() * 3, 2 + r() * 3); }
  g.strokeStyle = '#2a2b30'; g.lineWidth = 3; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(r() * 512, r() * 512); for (let k = 0; k < 4; k++) g.lineTo(r() * 512, r() * 512); g.stroke(); }
});
const mv_road = () => CT.paint.ctex('tm-road', 512, 128, (g, r) => {
  g.fillStyle = '#34363b'; g.fillRect(0, 0, 512, 128);
  for (let i = 0; i < 900; i++) { g.fillStyle = r() < 0.5 ? '#2c2e33' : '#43454b'; g.fillRect(r() * 512, r() * 128, 2, 2); }
  g.fillStyle = '#d9b43a'; for (let x = 0; x < 512; x += 128) g.fillRect(x + 10, 60, 70, 8);
  g.fillStyle = '#cfcfc8'; g.fillRect(0, 6, 512, 5); g.fillRect(0, 117, 512, 5);
});
const mv_tiles = () => CT.paint.ctex('tm-tiles', 256, 256, (g) => {
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { g.fillStyle = (x + y) % 2 ? '#d6d2c2' : '#a8bdb2'; g.fillRect(x * 64, y * 64, 64, 64); }
  g.strokeStyle = 'rgba(60,60,60,0.35)'; g.lineWidth = 2; for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(i * 64, 0); g.lineTo(i * 64, 256); g.moveTo(0, i * 64); g.lineTo(256, i * 64); g.stroke(); }
});
const mv_siding = () => CT.paint.ctex('tm-siding', 256, 256, (g) => {
  g.fillStyle = '#c9c0a6'; g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 16) { g.fillStyle = '#b3aa90'; g.fillRect(0, y + 13, 256, 3); }
});
/** the pole sign: a pump, a crescent moon and a big 24 (pictures, the titles carry the words) */
const mv_signTex = () => CT.paint.ctex('tm-sign', 512, 340, (g) => {
  g.fillStyle = '#16233d'; g.fillRect(0, 0, 512, 340);
  g.strokeStyle = '#f2f2f2'; g.lineWidth = 14; g.strokeRect(10, 10, 492, 320);
  g.fillStyle = '#e8352b'; g.fillRect(60, 90, 110, 170); g.fillStyle = '#f2f2f2'; g.fillRect(80, 115, 70, 45);
  g.strokeStyle = '#e8352b'; g.lineWidth = 12; g.beginPath(); g.moveTo(170, 130); g.lineTo(205, 150); g.lineTo(205, 230); g.stroke();
  g.fillStyle = '#ffd34a'; g.font = 'bold 170px Arial'; g.fillText('24', 250, 245);
  g.beginPath(); g.arc(440, 80, 38, 0, Math.PI * 2); g.fill(); g.fillStyle = '#16233d'; g.beginPath(); g.arc(458, 68, 34, 0, Math.PI * 2); g.fill();
});
const mv_skullTex = () => CT.paint.ctex('tm-skull', 256, 256, (g) => {
  g.fillStyle = '#c9b48a'; g.fillRect(0, 0, 256, 256); g.strokeStyle = '#3a2a1a'; g.lineWidth = 10; g.strokeRect(6, 6, 244, 244);
  g.fillStyle = '#2a1a12'; g.beginPath(); g.arc(128, 110, 58, 0, Math.PI * 2); g.fill(); g.fillRect(96, 140, 64, 50);
  g.fillStyle = '#c9b48a'; g.beginPath(); g.arc(106, 108, 15, 0, Math.PI * 2); g.arc(150, 108, 15, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#2a1a12'; g.lineWidth = 16; g.beginPath(); g.moveTo(40, 220); g.lineTo(216, 40); g.moveTo(40, 40); g.lineTo(216, 220); g.stroke();
});

// ---------------- builders ----------------
const mv_box = (b: ReturnType<typeof CT.batch>, key: string, col: string, min: mv_V3, max: mv_V3, tile = 0) => CT.box(b, CT.mat(key, col), min, max, tile);
const mv_tmat = (key: string, tex: THREE.Texture, rx: number, ry: number) => CT.mat(key, { map: CT.paint.rep(tex, rx, ry) });
const mv_plane = (st: ReturnType<typeof CT.stage>, m: THREE.Material, w: number, h: number, pos: mv_V3, rot: mv_V3 = [0, 0, 0]) => {
  const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.position.set(...pos); p.rotation.set(...rot); p.receiveShadow = true; return st.add(p);
};
/** a car out of boxes: body, doors, cabin glass, wheels, headlights; returns the group (moved per frame by the shots) */
const mv_car = (st: ReturnType<typeof CT.stage>, key: string, body: string, top: string, cop: boolean) => {
  const grp = new THREE.Group();
  const bx = (col: string, min: mv_V3, max: mv_V3, m?: THREE.Material) => {
    const s: mv_V3 = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...s), m ?? CT.mat(`${key}-${col}`, col));
    mesh.position.set((min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2); mesh.castShadow = true; grp.add(mesh); return mesh;
  };
  bx(body, [-0.95, 0.35, -2.3], [0.95, 0.95, 2.3]);
  bx(top, [-0.96, 0.6, -0.9], [0.96, 0.95, 0.9]);
  bx(cop ? top : body, [-0.85, 0.95, -1.0], [0.85, 1.55, 0.7]);
  bx('#141a24', [-0.86, 1.0, 0.55], [0.86, 1.48, 0.72]);   // windscreen
  bx('#141a24', [-0.87, 1.02, -0.9], [0.87, 1.45, 0.5]);   // side glass
  for (const [x, z] of [[-0.9, 1.45], [0.9, 1.45], [-0.9, -1.45], [0.9, -1.45]]) bx('#121212', [x - 0.16, 0, z - 0.38], [x + 0.16, 0.66, z + 0.38]);
  const head = mv_glowMat('car', '#fff2c8', 2.2);
  bx('', [-0.85, 0.6, 2.29], [-0.45, 0.8, 2.33], head); bx('', [0.45, 0.6, 2.29], [0.85, 0.8, 2.33], head);
  const tail = mv_glowMat('car', '#ff2a1a', 1.4);
  bx('', [-0.85, 0.6, -2.33], [-0.5, 0.78, -2.29], tail); bx('', [0.5, 0.6, -2.33], [0.85, 0.78, -2.29], tail);
  if (cop) {
    const r = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.1, 0, 0) }), bl = new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 0, 0.1) });
    bx('', [-0.7, 1.55, -0.2], [-0.05, 1.72, 0.15], r); bx('', [0.05, 1.55, -0.2], [0.7, 1.72, 0.15], bl);
    MV_.copBar = [r, bl];
    bx('#e8c45a', [0.97, 0.62, -0.3], [0.99, 0.88, 0.1]);   // the door star, as a gold plate
  } else bx(body, [-0.95, 0.95, -2.3], [0.95, 1.15, -1.1]);   // pickup bed rim
  return st.add(grp);
};

const mv_sand = () => CT.paint.ctex('mv-sand', 512, 512, (g, r) => {
  g.fillStyle = '#c99a6a'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 3200; i++) { g.fillStyle = r() < 0.5 ? '#b98a5c' : '#d7aa7a'; g.fillRect(r() * 512, r() * 512, 2 + r() * 3, 2 + r() * 2); }
  for (let i = 0; i < 60; i++) { g.fillStyle = '#8f6a48'; g.beginPath(); g.ellipse(r() * 512, r() * 512, 3 + r() * 5, 2 + r() * 3, r() * 3, 0, Math.PI * 2); g.fill(); }
});
const mv_stucco = () => CT.paint.ctex('mv-stucco', 256, 256, (g, r) => {
  g.fillStyle = '#e6c3a0'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) { g.fillStyle = r() < 0.5 ? 'rgba(170,120,90,0.18)' : 'rgba(255,240,220,0.2)'; g.fillRect(r() * 256, r() * 256, 3, 3); }
  g.fillStyle = '#c2553f'; g.fillRect(0, 224, 256, 32);
});
const mv_tilesBlue = () => CT.paint.ctex('mv-pooltile', 256, 256, (g) => {
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { g.fillStyle = (x + y) % 2 ? '#7fb7c9' : '#9cc9d6'; g.fillRect(x * 32, y * 32, 32, 32); }
  g.strokeStyle = 'rgba(40,60,70,0.4)'; for (let i = 0; i <= 8; i++) { g.beginPath(); g.moveTo(i * 32, 0); g.lineTo(i * 32, 256); g.moveTo(0, i * 32); g.lineTo(256, i * 32); g.stroke(); }
});
/** the neon sign: a big crescent moon and MOTEL, on black (the black adds nothing when it glows) */
const mv_neonTex = () => CT.paint.ctex('mv-neon', 512, 512, (g) => {
  g.fillStyle = '#000'; g.fillRect(0, 0, 512, 512);
  g.strokeStyle = '#ff2a2a'; g.lineWidth = 26; g.lineCap = 'round';
  g.beginPath(); g.arc(250, 200, 150, Math.PI * 0.35, Math.PI * 1.65); g.stroke();
  g.beginPath(); g.arc(315, 200, 125, Math.PI * 0.62, Math.PI * 1.38, false); g.stroke();
  g.fillStyle = '#ff6ad5'; g.font = 'bold 92px Arial'; g.textAlign = 'center'; g.fillText('MOTEL', 256, 470);
});
const mv_numTex = (n: number) => CT.paint.ctex(`mv-num${n}`, 128, 128, (g) => {
  g.fillStyle = '#f2e6c8'; g.fillRect(0, 0, 128, 128); g.strokeStyle = '#3a2a1a'; g.lineWidth = 8; g.strokeRect(4, 4, 120, 120);
  g.fillStyle = n === 11 ? '#b3121e' : '#2a2018'; g.font = 'bold 76px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(n), 64, 68);
});
const mv_signIceTex = () => CT.paint.ctex('mv-ice', 128, 128, (g) => {
  g.fillStyle = '#2f7fd1'; g.fillRect(0, 0, 128, 128); g.strokeStyle = '#fff'; g.lineWidth = 8;
  for (let i = 0; i < 3; i++) { const a = (i * Math.PI) / 3; g.beginPath(); g.moveTo(64 - Math.cos(a) * 44, 64 - Math.sin(a) * 44); g.lineTo(64 + Math.cos(a) * 44, 64 + Math.sin(a) * 44); g.stroke(); }
});
/** room k (1..11) centre along the row */
const mv_roomX = (k: number) => -22 + 4 * (k - 0.5);

const mv_init = (w: World) => {
  const st = MV_.st = CT.stage(w, { light: 'night', clouds: false, far: 1200 });
  st.add(new THREE.Mesh(new THREE.PlaneGeometry(900, 900).rotateX(-Math.PI / 2), mv_tmat('mv-sandm', mv_sand(), 90, 90))).receiveShadow = true;
  mv_plane(st, mv_tmat('mv-road', mv_road(), 40, 1), 900, 8, [0, 0.015, 30], [-Math.PI / 2, 0, 0]);
  mv_plane(st, mv_tmat('mv-lot', mv_asphalt(), 10, 5), 58, 25.6, [5, 0.01, 9.4], [-Math.PI / 2, 0, 0]);
  const b = CT.batch();
  // ---- the room row (rooms 1..11), walkway, overhang, doors, windows ----
  CT.box(b, mv_tmat('mv-wall', mv_stucco(), 10, 1.2), [-22, 0, -13], [22, 3.3, -6], 0);
  mv_box(b, 'mv-roof', '#8c3b2a', [-22.4, 3.3, -13.4], [22.4, 3.6, -5.8]);
  mv_box(b, 'mv-walk', '#b9b1a4', [-22, 0, -6], [22, 0.15, -3.4]);
  mv_box(b, 'mv-over', '#efe2c8', [-22.3, 3.0, -6.1], [22.3, 3.25, -3.3]);
  mv_box(b, 'mv-trim', '#c2553f', [-22.3, 3.0, -3.35], [22.3, 3.25, -3.25]);
  for (let k = 0; k <= 11; k++) mv_box(b, 'mv-post', '#efe2c8', [-22 + 4 * k - 0.1, 0.15, -3.6], [-22 + 4 * k + 0.1, 3.0, -3.4]);
  for (let k = 1; k <= 11; k++) {
    const x = mv_roomX(k);
    mv_box(b, 'mv-door', k === 11 ? '#5a2a2a' : '#2a8f8f', [x - 1.2, 0.15, -6.06], [x - 0.15, 2.3, -5.98]);
    mv_box(b, 'mv-frame', '#efe2c8', [x + 0.3, 0.95, -6.07], [x + 1.75, 2.1, -6.0]);
    if (k === 11) for (const y of [0.8, 1.5]) mv_box(b, 'mv-board', '#7a5a3a', [x - 1.35, y, -6.14], [x, y + 0.2, -6.07]);
  }
  // ice machine
  mv_box(b, 'mv-ice', '#e8eef2', [-2.7, 0.15, -6.0], [-1.5, 1.95, -5.2]);
  mv_box(b, 'mv-icetop', '#2f7fd1', [-2.72, 1.6, -5.22], [-1.48, 1.95, -5.18]);
  // the office (right end) and its glass front
  CT.box(b, mv_tmat('mv-wall2', mv_stucco(), 4, 1.2), [22, 0, -14], [30, 3.9, -3], 0);
  mv_box(b, 'mv-roof', '#8c3b2a', [21.8, 3.9, -14.3], [30.3, 4.3, -2.7]);
  // the pool: a raised concrete basin, empty, cracked tiles
  mv_box(b, 'mv-coping', '#d7d0c2', [-11, 0, 6], [-9.6, 0.7, 13]); mv_box(b, 'mv-coping', '#d7d0c2', [2.6, 0, 6], [4, 0.7, 13]);
  mv_box(b, 'mv-coping', '#d7d0c2', [-9.6, 0, 6], [2.6, 0.7, 7.2]); mv_box(b, 'mv-coping', '#d7d0c2', [-9.6, 0, 11.8], [2.6, 0.7, 13]);
  // the sign: pole, ladder, catwalk with a railing, the board
  mv_box(b, 'mv-pole', '#6d7178', [33.75, 0, 17.75], [34.25, 8.6, 18.25]);
  for (let y = 0.4; y < 8.5; y += 0.45) mv_box(b, 'mv-pole', '#6d7178', [33.3, y, 17.6], [33.75, y + 0.05, 17.65]);
  mv_box(b, 'mv-pole', '#6d7178', [33.25, 0, 17.55], [33.3, 8.6, 17.65]);
  mv_box(b, 'mv-deck', '#4d5157', [31.6, 8.5, 17.0], [36.4, 8.65, 18.6]);
  for (let x = 31.7; x <= 36.4; x += 0.7) mv_box(b, 'mv-pole', '#6d7178', [x, 8.65, 17.0], [x + 0.05, 9.6, 17.05]);
  mv_box(b, 'mv-pole', '#6d7178', [31.6, 9.55, 16.98], [36.4, 9.62, 17.06]);
  mv_box(b, 'mv-board', '#1a1418', [31.6, 8.65, 18.62], [36.4, 13.6, 18.85]);
  // transformer pole by the highway
  mv_box(b, 'mv-wood', '#5a3d24', [-40.2, 0, 25.8], [-39.8, 8.5, 26.2]);
  mv_box(b, 'mv-wood', '#5a3d24', [-41.5, 7.6, 25.9], [-38.5, 7.8, 26.1]);
  mv_box(b, 'mv-steel', '#8d939b', [-40.8, 5.6, 26.2], [-40.0, 6.8, 26.9]);
  mv_box(b, 'mv-steel', '#8d939b', [-40.6, 0.9, 26.2], [-39.4, 1.9, 26.7]);
  // desert: sage, a few tall yuccas, the mesas far away
  for (let i = 0; i < 160; i++) {
    const a = i * 2.39996, d = 30 + (i * 7.3) % 120, x = Math.cos(a) * d, z = Math.sin(a) * d;
    if (z > 25 && z < 35) continue; if (x > -26 && x < 40 && z > -16 && z < 25) continue;
    CT.tree(b, x, z, { kind: i % 9 === 0 ? 'tall' : 'bush', h: i % 9 === 0 ? 4 + (i % 3) : 0.7 + (i % 5) * 0.15, seed: i + 7 });
  }
  for (let i = 0; i < 9; i++) {
    const x = -260 + i * 70, z = -190 - (i % 3) * 40, wv = 40 + (i % 4) * 20, h = 26 + (i % 3) * 14;
    CT.box(b, mv_tmat('mv-mesa', CT.paint.stoneHD('mv-mesa', ['#9a4a32', '#8a3f2a', '#a8553a', '#7f3826'], '#5a2a1c'), 6, 3), [x - wv / 2, 0, z - 20], [x + wv / 2, h, z + 20], 0);
  }
  // ---- interiors: the office (x = 200) and room 11 (x = 300) ----
  const OX = 200;
  mv_box(b, 'mv-inwall', '#d8c39a', [OX - 5, 0, -4.2], [OX + 5, 3.2, -4]); mv_box(b, 'mv-inwall', '#d8c39a', [OX - 5.2, 0, -4.2], [OX - 5, 3.2, 4.2]);
  mv_box(b, 'mv-inwall', '#d8c39a', [OX + 5, 0, -4.2], [OX + 5.2, 3.2, 4.2]); mv_box(b, 'mv-inwall', '#d8c39a', [OX - 5.2, 0, 4], [OX + 5.2, 0.9, 4.2]);
  mv_box(b, 'mv-inwall', '#d8c39a', [OX - 5.2, 2.6, 4], [OX + 5.2, 3.2, 4.2]); mv_box(b, 'mv-ceil', '#efe6d0', [OX - 5.2, 3.2, -4.2], [OX + 5.2, 3.35, 4.2]);
  mv_box(b, 'mv-wood', '#6b4226', [OX - 3, 0, -0.6], [OX + 2, 1.05, 0.4]); mv_box(b, 'mv-top', '#3a2a22', [OX - 3.05, 1.05, -0.65], [OX + 2.05, 1.12, 0.45]);
  mv_box(b, 'mv-wood', '#6b4226', [OX - 2.5, 1.4, -4.0], [OX + 0.5, 2.6, -3.9]);
  for (let k = 0; k < 12; k++) mv_box(b, 'mv-key', '#d9b44a', [OX - 2.3 + (k % 6) * 0.45, 1.6 + Math.floor(k / 6) * 0.5, -3.9], [OX - 2.2 + (k % 6) * 0.45, 1.85 + Math.floor(k / 6) * 0.5, -3.85]);
  mv_box(b, 'mv-steel', '#3a3d44', [OX + 2.8, 0, -3.9], [OX + 3.6, 1.1, -3.3]); mv_box(b, 'mv-steel', '#22252b', [OX + 3.0, 1.1, -3.85], [OX + 3.5, 1.5, -3.5]);
  mv_box(b, 'mv-chair', '#8c3b2a', [OX + 2.4, 0, 1.6], [OX + 4.6, 0.5, 2.6]); mv_box(b, 'mv-chair', '#8c3b2a', [OX + 2.4, 0.5, 2.4], [OX + 4.6, 1.1, 2.6]);
  const RX = 300;
  mv_box(b, 'mv-r11', '#e9e2d2', [RX - 4, 0, -3.2], [RX + 4, 3, -3]); mv_box(b, 'mv-r11', '#e9e2d2', [RX - 4.2, 0, -3.2], [RX - 4, 3, 3]);
  mv_box(b, 'mv-r11', '#e9e2d2', [RX + 4, 0, -3.2], [RX + 4.2, 3, 3]); mv_box(b, 'mv-ceil', '#efe6d0', [RX - 4.2, 3, -3.2], [RX + 4.2, 3.15, 3]);
  mv_box(b, 'mv-bed', '#7a2a3a', [RX + 1.2, 0, -3], [RX + 3.6, 0.6, -0.8]);
  CT.build(b, st);
  mv_plane(st, mv_tmat('mv-pool', mv_tilesBlue(), 6, 3), 12.2, 4.6, [-3.5, 0.03, 9.5], [-Math.PI / 2, 0, 0]);
  mv_plane(st, CT.mat('mv-carpet', '#6a3a2a'), 10.4, 8.4, [OX, 0.01, 0], [-Math.PI / 2, 0, 0]);
  mv_plane(st, CT.mat('mv-carpet2', '#4a5a3a'), 8.4, 6.2, [RX, 0.01, -0.1], [-Math.PI / 2, 0, 0]);
  // ---- glowing things ----
  for (let k = 1; k <= 11; k++) {
    const x = mv_roomX(k);
    if (k !== 11) mv_plane(st, mv_glowMat('rooms', k % 3 ? '#ffcf86' : '#ffb870', 1.25), 1.35, 1.05, [x + 1.02, 1.52, -6.09]);
    mv_plane(st, CT.mat(`mv-numm${k}`, { map: mv_numTex(k) }), 0.3, 0.3, [x - 0.68, 1.75, -6.11]);
    mv_plane(st, mv_glowMat('rooms', '#fff1d0', 2.2), 0.5, 0.18, [x, 2.99, -4.6], [Math.PI / 2, 0, 0]);
  }
  mv_plane(st, CT.mat('mv-icesign', { map: mv_signIceTex() }), 0.5, 0.5, [-2.1, 1.25, -5.18]);
  mv_plane(st, mv_glowMat('office', '#ffd89a', 1.4), 7.2, 2.2, [26, 1.65, -2.97]);
  const NE = new THREE.MeshBasicMaterial({ map: mv_neonTex(), color: new THREE.Color(2.2, 2.2, 2.2), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false });
  MV_.glows.push({ m: NE, c: NE.color.clone(), group: 'sign' });
  mv_plane(st, NE, 4.6, 4.6, [34, 11.1, 18.6], [0, Math.PI, 0]);
  const NE2 = new THREE.MeshBasicMaterial({ map: mv_neonTex(), color: new THREE.Color(2.2, 2.2, 2.2), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false });
  MV_.glows.push({ m: NE2, c: NE2.color.clone(), group: 'sign' });
  mv_plane(st, NE2, 4.6, 4.6, [34, 11.1, 18.88]);
  mv_plane(st, mv_glowMat('office', '#fff3d6', 2.0), 1.8, 0.25, [OX, 3.18, 0], [Math.PI / 2, 0, 0]);
  mv_plane(st, mv_glowMat('office', '#9fd0ff', 1.5), 0.8, 0.5, [OX + 3.25, 1.3, -3.49]);
  const PANE = new THREE.MeshBasicMaterial({ color: '#2a0a10', transparent: true, opacity: 0.7 });
  mv_plane(st, PANE, 10.2, 1.7, [OX, 1.75, 4.1], [0, Math.PI, 0]);
  mv_plane(st, mv_glowMat('r11', '#ffe2b0', 2.2), 1.2, 0.3, [RX, 2.98, 0], [Math.PI / 2, 0, 0]);
  // cars
  const cars: Record<string, THREE.Group> = {};
  cars.kev = mv_car(st, 'mv-kev', '#f0c419', '#f0c419', false); cars.kev.position.set(-12, 0, 2.4); cars.kev.rotation.y = Math.PI;
  cars.hank = mv_car(st, 'mv-hank', '#6b4a2e', '#c9b89a', false); cars.hank.position.set(8, 0, 2.6); cars.hank.rotation.y = Math.PI;
  const rv = new THREE.Mesh(new THREE.BoxGeometry(2.5, 3.0, 8), CT.mat('mv-rv', '#f2efe6')); rv.position.set(-20, 1.6, 9); rv.castShadow = true; st.add(rv);
  const rvs = new THREE.Mesh(new THREE.BoxGeometry(2.52, 0.4, 8.02), CT.mat('mv-rvs', '#2fb5a9')); rvs.position.set(-20, 1.4, 9); st.add(rvs);
  MV_.cars = cars;
  return st;
};
const MV_CAST: Record<string, mv_Outfit> = {
  mari: { jacket: '#3f5f8a', pants: '#24232a', boots: '#3b2a1e', hat: 'hair', hair: '#2a1a10', skin: CT.SKINS[2], zip: true, shirt: '#c2553f', ponytail: '#2a1a10' },
  kev: { jacket: '#f0c419', pants: '#333a48', boots: '#f2f2ea', hat: 'cap', cap: '#d6332f', skin: CT.SKINS[1], zip: true, shirt: '#2b2b2b' },
  hank: { jacket: '#6b6a3a', pants: '#3a3a40', boots: '#2a1d14', hat: 'cap', cap: '#3a4a2a', skin: CT.SKINS[0], beard: '#e6e6e0', build: 'stout', belt: '#2a1d14' },
  barb: { jacket: '#2fb5a9', pants: '#e8e2d2', boots: '#f2f2ea', hat: 'hair', hair: '#d9d4c8', skin: CT.SKINS[0], flannel: '#f2d04a' },
  gary: { jacket: '#2fb5a9', pants: '#c8b48a', boots: '#6b4a2e', hat: 'cap', cap: '#ffffff', skin: CT.SKINS[0], flannel: '#f2d04a', moustache: '#bdbdbd', build: 'stout' },
  garyPale: { jacket: '#2fb5a9', pants: '#c8b48a', boots: '#6b4a2e', hat: 'cap', cap: '#ffffff', skin: '#a3a8ab', flannel: '#f2d04a', moustache: '#bdbdbd', build: 'stout', pale: true },
  barbPale: { jacket: '#2fb5a9', pants: '#e8e2d2', boots: '#f2f2ea', hat: 'hair', hair: '#d9d4c8', skin: '#a3a8ab', flannel: '#f2d04a', pale: true },
  hankKid: { jacket: '#c2553f', pants: '#3a4a6a', boots: '#2a1d14', hat: 'hair', hair: '#c9a46a', skin: CT.SKINS[0], build: 'kid' },
  momShadow: { jacket: '#000', pants: '#000', boots: '#000', hat: 'hair', shadow: true, long: 1.1 },
  shGary: { jacket: '#000', pants: '#000', boots: '#000', hat: 'cap', build: 'stout', shadow: true },
  shKev: { jacket: '#000', pants: '#000', boots: '#000', hat: 'cap', shadow: true, long: 1.25 },
  shadow: { jacket: '#000', pants: '#000', boots: '#000', hat: 'hair', shadow: true, long: 1.3 },
  shadow2: { jacket: '#000', pants: '#000', boots: '#000', hat: null, shadow: true, long: 1.4, build: 'stout' },
};

/** blink: 3 frames shut every 2-4 s, different per id */
const mv_blink = (t: number, id: number) => { const f = Math.round(t * 30), per = 70 + ((id * 37) % 50); return ((f + id * 17) % per) < 3 ? 1 : 0; };
const mv_q = (o: unknown) => JSON.stringify(o, (_k, v) => (typeof v === 'number' ? Math.round(v * 2) / 2 : v));
/** one rigged character this frame. k = size (1 = adult 2.16 m) */
const mv_rig = (st: ReturnType<typeof CT.stage>, id: number, who: string, at: mv_V3, pose: mv_Pose, t: number, k = 1, o?: Partial<mv_Outfit>) => {
  const out = o ? { ...MV_CAST[who], ...o } : MV_CAST[who], P: mv_Pose = { ...pose, blink: pose.blink ?? mv_blink(t, id) };
  st.person({ id, who: { key: `tm|${who}|${o ? mv_q(o) : ''}|${mv_q(P)}`, draw: (p, light) => CT.bodyRig(p, out, { ...P, light, seed: id }) }, at, scale: k / CT.RIG_SCALE });
};

// ---------------- poses (facing screen right; mv_flip mirrors them) ----------------
const MV_P: Record<string, mv_Pose> = {
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
const mv_lerpA = (a: [number, number] | undefined, b: [number, number] | undefined, k: number, d: [number, number]): [number, number] => {
  const A = a ?? d, B = b ?? d; return [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
};
const mv_n = (a: number | undefined, b: number | undefined, k: number) => (a ?? 0) + ((b ?? 0) - (a ?? 0)) * k;
/** blend two poses (k 0..1, eased by the caller): joints interpolate, switches (expr, props, fists) flip at the middle */
const mv_mix = (A: mv_Pose, B: mv_Pose, k: number): mv_Pose => {
  const S = MV_P.stand, half = k < 0.5 ? A : B;
  return { ...half,
    armL: mv_lerpA(A.armL, B.armL, k, S.armL!), armR: mv_lerpA(A.armR, B.armR, k, S.armR!), legL: mv_lerpA(A.legL, B.legL, k, S.legL!), legR: mv_lerpA(A.legR, B.legR, k, S.legR!),
    hip: [mv_n(A.hip?.[0], B.hip?.[0], k), mv_n(A.hip?.[1], B.hip?.[1], k)], torso: mv_n(A.torso, B.torso, k), head: mv_n(A.head, B.head, k), roll: mv_n(A.roll, B.roll, k),
    blood: mv_n(A.blood, B.blood, k), maw: mv_n(A.maw, B.maw, k), bruise: mv_n(A.bruise, B.bruise, k),
    prop: A.prop && B.prop && A.prop.kind === B.prop.kind ? { ...half.prop!, ang: mv_n(A.prop.ang, B.prop.ang, k) } : half.prop };
};
/** mirror a pose to face screen left */
const mv_flip = (P: mv_Pose): mv_Pose => {
  const m = (a?: [number, number]): [number, number] | undefined => (a ? [-a[0], -a[1]] : undefined);
  const mp = (q?: mv_Prop | null) => (q ? { ...q, hand: (q.hand ?? 'R') === 'R' ? 'L' as const : 'R' as const, ang: -q.ang } : q);
  return { ...P, armL: m(P.armR), armR: m(P.armL), legL: m(P.legR), legR: m(P.legL), fistL: P.fistR, fistR: P.fistL,
    front: P.front === 'L' ? 'R' : P.front === 'R' ? 'L' : P.front, hip: P.hip ? [-P.hip[0], P.hip[1]] : undefined,
    torso: P.torso !== undefined ? -P.torso : undefined, head: P.head !== undefined ? -P.head : undefined, roll: P.roll !== undefined ? -P.roll : undefined,
    prop: mp(P.prop), prop2: mp(P.prop2), facing: P.facing !== undefined ? (-P.facing as -1 | 0 | 1) : undefined };
};
const mv_ease = (x: number) => { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c); };
/** a choreography: [time, pose name or pose, extra] keys; holds between keys and blends over `blend` s into each key */
type mv_Key = [number, string | mv_Pose, mv_Pose?];
const mv_seq = (t: number, keys: mv_Key[], blend = 0.18): mv_Pose => {
  const get = (k: mv_Key): mv_Pose => ({ ...(typeof k[1] === 'string' ? MV_P[k[1]] : k[1]), ...(k[2] ?? {}) });
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const cur = get(keys[i]);
  if (i === 0 || t >= keys[i][0] + blend) return cur;
  return mv_mix(get(keys[i - 1]), cur, mv_ease((t - keys[i][0]) / blend));
};
/** facing right (+1) or left (-1): pose plus `facing` */
const mv_face = (P: mv_Pose, f: 1 | -1, extra: mv_Pose = {}): mv_Pose => ({ ...(f > 0 ? P : mv_flip(P)), facing: f, ...extra });

// ---------------- effects (flat drawings, deterministic from t) ----------------
const mv_hash = (n: number) => { const v = Math.sin(n * 127.1 + 31.7) * 43758.5453; return v - Math.floor(v); };
/** blood (or coal) spray: droplets flying along `dir` (-1 left, 1 right) with gravity, u = 0..1 */
const mv_spray = (st: ReturnType<typeof CT.stage>, at: mv_V3, size: number, u: number, seed: number, dir: number, coal = false) => {
  const k = Math.round(Math.min(1, Math.max(0, u)) * 20) / 20, col = coal ? '#141014' : '#b3121e', col2 = coal ? '#3a2a2e' : '#7a0a12';
  st.card({ key: `tm-spray-${seed}-${dir}-${coal}-${k}`, cw: 512, ch: 512, at, w: size, h: size, draw: (p) => {
    for (let i = 0; i < 26; i++) {
      const a = (mv_hash(seed + i) - 0.5) * 1.6, v = 120 + 220 * mv_hash(seed + i * 3), x = 256 + dir * Math.cos(a) * v * k, y = 256 + Math.sin(a) * v * k * 0.6 + 240 * k * k;
      const r = (4 + 13 * mv_hash(seed + i * 7)) * (1 - 0.5 * k);
      p.ell(x, y, r * (1 + 0.8 * k), r, i % 3 ? col : col2, 0);
    }
  } });
};
const mv_shards = (st: ReturnType<typeof CT.stage>, at: mv_V3, size: number, u: number, seed: number) => {
  const k = Math.round(Math.min(1, Math.max(0, u)) * 20) / 20;
  st.card({ key: `tm-shards-${seed}-${k}`, cw: 512, ch: 512, at, w: size, h: size, draw: (p) => {
    for (let i = 0; i < 24; i++) {
      const a = mv_hash(seed + i) * Math.PI * 2, v = 60 + 200 * mv_hash(seed + i * 5), x = 256 + Math.cos(a) * v * k, y = 256 + Math.sin(a) * v * k + 160 * k * k, s = 8 + 18 * mv_hash(i + seed * 2), r = a * 3 + k * 6;
      p.poly([[x + Math.cos(r) * s, y + Math.sin(r) * s], [x + Math.cos(r + 2.3) * s * 0.6, y + Math.sin(r + 2.3) * s * 0.6], [x + Math.cos(r + 4) * s * 0.8, y + Math.sin(r + 4) * s * 0.8]], i % 2 ? '#d9f0ff' : '#a9cfe6', 2);
    }
  } });
};
/** a soft light glow (flashlights, flares, headlights, ring light) */
const mv_glow = (st: ReturnType<typeof CT.stage>, at: mv_V3, size: number, col: string, k = 1) => {
  const a = Math.round(Math.min(1, Math.max(0, k)) * 10) / 10;
  if (a <= 0) return;
  st.card({ key: `tm-glow-${col}-${a}`, cw: 256, ch: 256, at, w: size, h: size, soft: true, draw: (p) => {
    const g = p.g, gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, col); gr.addColorStop(0.25, col + 'aa'); gr.addColorStop(1, col + '00'); g.globalAlpha = a; g.fillStyle = gr; g.fillRect(0, 0, 256, 256); g.globalAlpha = 1;
  } });
};
/** drifting fog wisps near the ground around a point (the fog that came down the mountain) */
const mv_fog = (st: ReturnType<typeof CT.stage>, t: number, c: mv_V3, n = 8, spread = 10, dense = 0.5) => {
  for (let i = 0; i < n; i++) {
    const x = c[0] + (mv_hash(i) - 0.5) * spread * 2 + Math.sin(t * 0.13 + i) * 1.5 + ((t * 0.35 + i * 3) % 8) - 4, z = c[2] + (mv_hash(i + 9) - 0.5) * spread * 2, s = 5 + 5 * mv_hash(i + 4);
    const a = Math.round(dense * (0.5 + 0.5 * mv_hash(i + 2)) * 10) / 10;
    st.card({ key: `tm-fog-${i % 3}-${a}`, cw: 256, ch: 128, at: [x, c[1] + 0.6 + 0.5 * mv_hash(i + 7), z], w: s, h: s * 0.4, soft: true, draw: (p) => {
      const g = p.g; g.globalAlpha = a;
      for (let j = 0; j < 6; j++) { const gr = g.createRadialGradient(40 + j * 35, 64 + 10 * Math.sin(j + i), 0, 40 + j * 35, 64, 60); gr.addColorStop(0, 'rgba(150,165,190,0.55)'); gr.addColorStop(1, 'rgba(150,165,190,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 128); }
      g.globalAlpha = 1;
    } });
  }
};
/** knuckles on glass: three ripples on a window (u = 0..1) */
const mv_knock = (st: ReturnType<typeof CT.stage>, at: mv_V3, u: number) => st.effect('ring', at, 0.6 + 0.6 * u, u);
/** the camera shake on impacts: flips sign every frame for 7 frames after `t0` */
const mv_shake = (t: number, t0: number, amp = 0.06): mv_V3 => {
  const f = Math.round((t - t0) * 30); if (f < 0 || f > 7) return [0, 0, 0];
  const s = (f % 2 ? 1 : -1) * amp * (1 - f / 8); return [s, s * 0.6, 0];
};
const mv_add = (a: mv_V3, b: mv_V3): mv_V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mv_lerp3 = (a: mv_V3, b: mv_V3, k: number): mv_V3 => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

Object.assign(MV_P, {
  upper: { armL: [25, 172], armR: [55, 178], legL: [-20, -6], legR: [16, 4], hip: [6, 26], torso: 14, head: -6, fistL: true, fistR: true, front: 'R' },
  clinch: { armL: [95, 160], armR: [80, 150], legL: [-18, -6], legR: [14, 4], hip: [10, 12], torso: 22, front: 'both' },
  film: { armL: [-8, -4], armR: [120, 160], legL: [-5, 0], legR: [5, 0], prop: { kind: 'phone', hand: 'R', ang: 170, on: 1 } },
  sitStep: { armL: [20, 60], armR: [-20, -60], legL: [-80, 0], legR: [80, 0], hip: [0, 210], front: 'both' },
  climb: { armL: [-160, -175], armR: [170, 185], legL: [-40, 10], legR: [20, -10], hip: [0, -20] },
  dangle: { armL: [-170, -175], armR: [165, 175], legL: [-12, -8], legR: [16, 10], hip: [0, -60], head: -12, expr: 'pained' },
  wave: { armL: [-8, -4], armR: [150, 170 ], legL: [-5, 0], legR: [5, 0] },
  pose: { armL: [-30, -150], armR: [40, 120], legL: [-8, 0], legR: [10, 4], torso: 4, head: 6, expr: 'grin' },
});
const MV_SHEETS = [['upper', 'clinch'], ['film', 'sitStep'], ['climb', 'dangle'], ['wave', 'pose']];
CT.shots([
  { id: 'test-cast' }, { id: 'test-cast2' }, ...MV_SHEETS.map((_, i) => ({ id: `test-sheet${i}` })), { id: 'test-motel' }, { id: 'test-blood' }, { id: 'test-ice' }, { id: 'test-sign' }, { id: 'test-office' }, { id: 'test-pole' },
], mv_init, (t, u, shot) => {
  const st = MV_.st!;
  const lights = (L: 'night' | 'blood' | 'lamp', o: { rooms?: number; office?: number; sign?: number } = {}) => { st.light(L, { view: [0.3, -1] }); mv_power('rooms', o.rooms ?? 1); mv_power('office', o.office ?? 1); mv_power('sign', o.sign ?? mv_flick(t, 0.15)); mv_power('car', 1); mv_power('r11', 1); };
  if (shot.id === 'test-cast' || shot.id === 'test-cast2') {
    lights('night');
    st.look([0, 1.25, 4.6], [0, 1.0, -1.0], 40, 0);
    const names = shot.id === 'test-cast' ? ['mari', 'kev', 'hank'] : ['barb', 'garyPale', 'shKev'];
    names.forEach((n, i) => mv_rig(st, i + 1, n, [-1.3 + i * 1.3, 0, -1.0], mv_face(MV_P.stand, i < 2 ? 1 : -1, { expr: (['smile', 'grin', 'stern'] as mv_Expr[])[i] }), t, 1));
  } else if (shot.id.startsWith('test-sheet')) {
    lights('blood');
    st.look([0, 1.3, 7], [0, 1.15, 0], 40, 0);
    MV_SHEETS[Number(shot.id.slice(10))].forEach((n, j) => mv_rig(st, 10 + j, j ? 'mari' : 'shKev', [-1 + j * 2, 0, 0], mv_face(MV_P[n], 1, { expr: 'stern' }), t, 0.95));
  } else if (shot.id === 'test-motel') {
    lights('night');
    st.look([6, 3.2, 26], [4, 2.2, -4], 34, 0);
  } else if (shot.id === 'test-blood') {
    lights('blood');
    st.look([-16, 2.0, 20], [6, 4, -6], 40, 0);
  } else if (shot.id === 'test-ice') {
    lights('blood');
    st.look([-1.2, 1.4, 1.2], [-1.2, 1.2, -5], 40, 0);
    mv_rig(st, 20, 'gary', [-0.4, 0.15, -4.6], mv_face(MV_P.pose, -1, {}), t);
    mv_rig(st, 21, 'shGary', [-0.9, 0.15, -5.95], mv_face(MV_P.wave, -1, {}), t);
    mv_rig(st, 22, 'kev', [-2.6, 0.15, -3.0], mv_face(MV_P.film, 1, { expr: 'shock' }), t);
  } else if (shot.id === 'test-sign') {
    lights('blood', { rooms: 0, office: 0 });
    st.look([30.5, 9.6, 14.2], [34, 9.4, 17.8], 44, 0);
    mv_rig(st, 30, 'mari', [33.2, 8.65, 17.8], mv_face(MV_P.guard, 1, { prop: { kind: 'wrench', hand: 'R', ang: 150 }, expr: 'stern' }), t);
    mv_rig(st, 31, 'shKev', [34.8, 8.65, 17.8], mv_face(MV_P.lunge, -1, {}), t);
  } else if (shot.id === 'test-office') {
    lights('lamp');
    st.look([202.5, 1.55, 3.4], [200, 1.2, -1.5], 44, 0);
    mv_rig(st, 32, 'kev', [200.3, 0, 1.3], mv_face(MV_P.film, -1, { expr: 'pained' }), t);
    mv_rig(st, 33, 'mari', [199.0, 0, -1.4], mv_face(MV_P.arms, 1, { expr: 'stern' }), t);
  } else {
    lights('blood', { rooms: 0 });
    st.look([-35, 1.6, 21], [-40, 2.2, 26], 44, 0);
    mv_rig(st, 34, 'mari', [-39.8, 0, 25.3], mv_face(MV_P.point, -1, {}), t);
  }
});
