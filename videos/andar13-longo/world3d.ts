// =====================================================================
//  O 13º andar (versão longa, 16:9) — the world (3d), adapted from videos/andar13/world3d.ts. One shared stage built once (b13Init) with every place at its own coordinates:
//  the building outside (z −300), the elevator cabin (origin), the corridor (z 1 → 21) and the apartment (z 21 → 26).
//  Characters: the narrator and his double (b13Person), posed from joint angles (b13Pose) blended per state.
//  Everything is posed from t. Shots: b13Shots([...]) registers one visual per shot over the shared stage.
// =====================================================================
const B13: any = {};

// ---------- small helpers
const b13K = (s: Scene, id: string, fb?: number) => (s.keys || []).find((k) => k.id === id)?.t ?? (fb ?? s.t0 + 0.5);
const b13Hash = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
// the flicker of a broken light: 1 most of the time, drops to ~0.1 on a seeded pattern (14 steps per second)
const b13Flick = (t: number, i: number, rate = 0.28) => { const k = Math.floor(t * 14); const h = b13Hash(k + i * 37.3); return h < rate ? 0.08 + 0.15 * b13Hash(k * 3.1 + i) : 0.85 + 0.15 * b13Hash(k * 1.7 + i * 5.0); };
// decaying camera shake from t0: [dx, dy]
const b13Shake = (t: number, t0: number, amp = 0.05): [number, number] => { if (t < t0) return [0, 0]; const d = t - t0, e = amp * Math.exp(-d * 6); return [e * Math.sin(d * 53), e * Math.sin(d * 41 + 1)]; };
// scare pulse 0 -> 1 -> 0 (for the red grade)
const b13Pulse = (t: number, t0: number, k = 4) => (t < t0 ? 0 : Math.min(1, (t - t0) * 20) * Math.exp(-(t - t0) * k));
// three knocks from t0, 0.33 s apart: 0..1 hit amount
const b13Knocks = (t: number, t0: number, n = 3, gap = 0.33) => { let h = 0; for (let i = 0; i < n; i++) { const d = t - (t0 + i * gap); if (d >= 0) h = Math.max(h, Math.exp(-d * 14)); } return h; };

// ---------- textures (canvas, cached)
const B13_TEX = new Map<string, THREE.Texture>();
const b13Tex = (key: string, w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) => {
  let tx = B13_TEX.get(key); if (tx) return tx;
  tx = p3Paint(w, h, draw); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 4; B13_TEX.set(key, tx); return tx;
};
const b13Display = (n: string) => b13Tex('disp' + n, 256, 128, (c) => {
  c.fillStyle = '#050505'; c.fillRect(0, 0, 256, 128);
  c.fillStyle = n === '13' ? '#ff2a1f' : '#ffb12a'; c.font = 'bold 100px DejaVu Sans Mono, monospace'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.shadowColor = c.fillStyle; c.shadowBlur = 18; c.fillText(n, 128, 68);
});
const b13PanelTex = (lit: number) => b13Tex('panel' + lit, 256, 512, (c) => {
  const g = c.createLinearGradient(0, 0, 256, 0); g.addColorStop(0, '#9aa0a8'); g.addColorStop(1, '#c4c9cf'); c.fillStyle = g; c.fillRect(0, 0, 256, 512);
  const floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21];
  floors.forEach((f, i) => {
    const col = i % 2, row = 9 - Math.floor(i / 2), x = 72 + col * 112, y = 52 + row * 44;
    c.beginPath(); c.arc(x, y, 17, 0, Math.PI * 2); c.fillStyle = f === lit ? '#ffd23a' : '#e9ecef'; c.fill();
    if (f === lit) { c.shadowColor = '#ffd23a'; c.shadowBlur = 16; c.fill(); c.shadowBlur = 0; }
    c.strokeStyle = '#59606a'; c.lineWidth = 3; c.stroke();
    c.fillStyle = '#1d2128'; c.font = 'bold 22px DejaVu Sans, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(f), x - (col ? -38 : 38), y + 1);
  });
});
const b13PlateTex = (n: string) => b13Tex('plate' + n, 256, 128, (c) => {
  c.fillStyle = '#b8913d'; c.fillRect(0, 0, 256, 128); c.fillStyle = '#d9b862'; c.fillRect(8, 8, 240, 112);
  c.fillStyle = '#2a1d08'; c.font = 'bold 80px DejaVu Serif, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(n, 128, 70);
});
const b13ClockTex = () => b13Tex('clock', 256, 512, (c) => {
  c.fillStyle = '#05070c'; c.fillRect(0, 0, 256, 512); const g = c.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#16224a'); g.addColorStop(1, '#0b0f20');
  c.fillStyle = g; c.fillRect(10, 10, 236, 492); c.fillStyle = '#ffffff'; c.font = 'bold 88px DejaVu Sans, sans-serif'; c.textAlign = 'center'; c.fillText('03:00', 128, 200);
  c.font = '26px DejaVu Sans, sans-serif'; c.fillStyle = '#b8c4e6'; c.fillText('sexta-feira', 128, 250);
});
const b13ClockFace = (h: number, m: number) => b13Tex('clockface' + h + ':' + m, 256, 256, (c) => {
  c.fillStyle = '#f2ead8'; c.beginPath(); c.arc(128, 128, 120, 0, Math.PI * 2); c.fill(); c.lineWidth = 10; c.strokeStyle = '#2a2016'; c.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; c.fillStyle = '#2a2016'; c.fillRect(128 + Math.sin(a) * 96 - 4, 128 - Math.cos(a) * 96 - 4, 8, 8); }
  const hand = (a: number, L: number, w: number) => { c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(128, 128); c.lineTo(128 + Math.sin(a) * L, 128 - Math.cos(a) * L); c.stroke(); };
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, 58, 9); hand(m / 60 * Math.PI * 2, 88, 6);
});
const b13PhoneOff = () => b13Tex('phoneoff', 16, 32, (c) => { c.fillStyle = '#020203'; c.fillRect(0, 0, 16, 32); });
const b13CityTex = () => b13Tex('city', 512, 512, (c) => {
  const g = c.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#0a1430'); g.addColorStop(1, '#24305a'); c.fillStyle = g; c.fillRect(0, 0, 512, 512);
  const r = p3Rnd(11); c.fillStyle = '#e8ecff'; c.beginPath(); c.arc(390, 110, 34, 0, Math.PI * 2); c.fill();
  for (let i = 0; i < 9; i++) { const x = i * 60 - 10 + r() * 20, hgt = 160 + r() * 220; c.fillStyle = '#080c1a'; c.fillRect(x, 512 - hgt, 54, hgt);
    for (let wy = 512 - hgt + 14; wy < 500; wy += 22) for (let wx = x + 8; wx < x + 48; wx += 14) if (r() < 0.25) { c.fillStyle = r() < 0.5 ? '#ffd88a' : '#9fc3ff'; c.fillRect(wx, wy, 7, 10); } }
});
const b13FacadeTex = () => b13Tex('facade', 512, 1024, (c) => {
  c.fillStyle = '#2c2f3a'; c.fillRect(0, 0, 512, 1024); const r = p3Rnd(5);
  for (let row = 0; row < 21; row++) for (let col = 0; col < 6; col++) {
    const x = 26 + col * 80, y = 1000 - (row + 1) * 47; const lit = r() < 0.32;
    c.fillStyle = lit ? (r() < 0.7 ? '#ffcf7a' : '#a9c8ff') : '#11141c'; c.fillRect(x, y, 56, 32);
  }
  c.fillStyle = '#3a3e4b'; for (let row = 0; row <= 21; row++) c.fillRect(0, 1000 - row * 47 - 8, 512, 5);
  c.fillStyle = '#ffd27a'; c.fillRect(196, 960, 120, 40);   // the lit lobby
});
const b13GlowTex = () => b13Tex('glow', 256, 64, (c) => { const g = c.createLinearGradient(0, 0, 0, 64); g.addColorStop(0, 'rgba(255,214,150,0.95)'); g.addColorStop(1, 'rgba(255,214,150,0)'); c.fillStyle = g; c.fillRect(0, 0, 256, 64); });

// ---------- textured materials (the heroes): carpet, wallpaper, steel, wood
const b13Carpet = () => p3Shader(new THREE.MeshStandardMaterial({ roughness: 0.95 }), 'b13-carpet', { bump: 0.012, color: `
  vec2 q = p3World.xz * vec2(1.8, 1.8); vec2 c = abs(fract(q) - 0.5); float d = c.x + c.y;
  float ring = smoothstep(0.34, 0.31, d) - smoothstep(0.25, 0.22, d), dotc = smoothstep(0.08, 0.05, d);
  float edge = smoothstep(1.02, 1.0, abs(p3World.x)) - smoothstep(0.92, 0.9, abs(p3World.x));
  vec3 base = vec3(0.30, 0.03, 0.04) * (0.8 + 0.35 * p3F(p3World.xz * 6.0));
  diffuseColor.rgb = mix(base, vec3(0.55, 0.38, 0.14), (ring + dotc) * 0.55 + edge * 0.7); p3Ht = p3N(p3World.xz * 90.0);` });
const b13Wall = (key: string, a: string, b: string) => p3Shader(new THREE.MeshStandardMaterial({ roughness: 0.85 }), 'b13-wall-' + key, { uniforms: { uA: { value: new THREE.Color(a) }, uB: { value: new THREE.Color(b) } }, color: `
  float along = p3World.z + p3World.x; float stripe = step(0.5, fract(along * 3.2));
  vec3 paper = mix(uA, uB, stripe * 0.35) * (0.92 + 0.12 * p3F(vec2(along * 4.0, p3World.y * 4.0)));
  float dado = step(p3World.y, 0.95), rail = step(abs(p3World.y - 0.95), 0.03);
  vec3 wood = vec3(0.23, 0.12, 0.06) * (0.8 + 0.3 * p3N(vec2(along * 30.0, p3World.y * 2.0)));
  diffuseColor.rgb = mix(paper, wood, max(dado, rail)) * (1.0 - rail * 0.3);` });
const b13Steel = () => p3Shader(new THREE.MeshStandardMaterial({ roughness: 0.38, metalness: 0.55 }), 'b13-steel', { color: `
  float brush = p3N(vec2(p3World.y * 380.0, (p3World.x + p3World.z) * 2.0)); diffuseColor.rgb = vec3(0.5, 0.52, 0.56) * (0.8 + 0.3 * brush);` });
const b13Wood = (key = 'b13-wood', tint = 1) => p3Shader(new THREE.MeshStandardMaterial({ roughness: 0.6 }), key, { bump: 0.015, uniforms: { uTint: { value: tint } }, color: `
  float rings = p3F(vec2(p3Pos.x * 3.0, p3Pos.y * 0.6)) * 9.0, line = 0.5 + 0.5 * sin(rings * 6.0 + p3Pos.x * 20.0), fine = p3N(vec2(p3Pos.x * 70.0, p3Pos.y * 2.0));
  diffuseColor.rgb = mix(vec3(0.16, 0.07, 0.03), vec3(0.42, 0.22, 0.09), line * 0.7 + fine * 0.3) * uTint; p3Ht = line * 0.5 + fine * 0.3;` });

// ---------- the person: a skeleton of pivots, posed from joint angles
// joints: hips (root of the body), spine, neck, shL/shR (shoulders), elL/elR (elbows), wrL/wrR, hipL/hipR, knL/knR, anL/anR.
// angles in radians. Limbs hang down (-y): x < 0 swings them forward; knees bend > 0, elbows bend < 0. Faces +z.
type B13Pose = Record<string, number>;
const B13_J = ['spine.x', 'spine.y', 'spine.z', 'neck.x', 'neck.y', 'neck.z', 'shL.x', 'shL.z', 'shR.x', 'shR.z', 'elL.x', 'elR.x', 'wrL.x', 'wrR.x', 'hipL.x', 'hipL.z', 'hipR.x', 'hipR.z', 'knL.x', 'knR.x', 'anL.x', 'anR.x', 'drop', 'eyes', 'brow', 'mouth'];
const b13Mix = (a: B13Pose, b: B13Pose, u: number): B13Pose => { const o: B13Pose = {}; for (const k of B13_J) o[k] = p3Lerp(a[k] ?? (k === 'eyes' ? 1 : 0), b[k] ?? (k === 'eyes' ? 1 : 0), u); return o; };
const B13_RANGE: Record<string, [number, number]> = { 'knL.x': [0, 2.2], 'knR.x': [0, 2.2], 'elL.x': [-2.3, 0], 'elR.x': [-2.3, 0], 'neck.x': [-0.6, 0.6], 'neck.y': [-0.9, 0.9], 'neck.z': [-0.4, 0.4] };
// the states
const b13Idle = (t: number): B13Pose => ({ 'spine.x': 0.02 * Math.sin(t * 1.7), 'shL.z': 0.07, 'shR.z': -0.07, 'elL.x': -0.18, 'elR.x': -0.18, 'neck.x': 0.02 * Math.sin(t * 1.7 + 1), 'knL.x': 0.03, 'knR.x': 0.03, eyes: 1 });
const b13Walk = (t: number, f = 1.7, amp = 1): B13Pose => { const p = t * f * Math.PI * 2, s = Math.sin(p);
  return { 'hipL.x': 0.42 * amp * s, 'hipR.x': -0.42 * amp * s, 'knL.x': 0.12 + 0.6 * amp * Math.max(0, -Math.sin(p - 0.9)), 'knR.x': 0.12 + 0.6 * amp * Math.max(0, Math.sin(p - 0.9)),
    'anL.x': -0.1 * s, 'anR.x': 0.1 * s, 'shL.x': -0.32 * amp * s, 'shR.x': 0.32 * amp * s, 'shL.z': 0.07, 'shR.z': -0.07, 'elL.x': -0.3, 'elR.x': -0.3, 'spine.y': 0.06 * s, drop: 0.025 * Math.abs(Math.cos(p)), eyes: 1 }; };
const b13Run = (t: number, f = 2.6): B13Pose => { const p = t * f * Math.PI * 2, s = Math.sin(p);
  return { 'spine.x': 0.28, 'neck.x': -0.2, 'hipL.x': 0.85 * s - 0.25, 'hipR.x': -0.85 * s - 0.25, 'knL.x': 0.3 + 1.3 * Math.max(0, -Math.sin(p - 0.7)), 'knR.x': 0.3 + 1.3 * Math.max(0, Math.sin(p - 0.7)),
    'anL.x': -0.2 * s, 'anR.x': 0.2 * s, 'shL.x': -0.75 * s, 'shR.x': 0.75 * s, 'shL.z': 0.12, 'shR.z': -0.12, 'elL.x': -1.45, 'elR.x': -1.45, drop: 0.06 * Math.abs(Math.cos(p)), eyes: 1.4, brow: 1, mouth: 0.7 }; };
const b13Press = (t: number, tp: number, jabs = 1): B13Pose => { let jab = 0; for (let i = 0; i < jabs; i++) { const d = t - (tp + i * 0.16); if (d > 0) jab = Math.max(jab, Math.exp(-d * 16)); }
  return { ...b13Idle(t), 'shR.x': -1.2 - 0.12 * jab, 'shR.z': 0.18, 'elR.x': -0.35 + 0.25 * jab, 'wrR.x': -0.2, 'neck.y': -0.45, 'neck.x': 0.08, 'spine.y': -0.2 }; };
const b13Scared = (t: number): B13Pose => ({ 'spine.x': -0.16, 'neck.x': -0.18, 'shL.x': -0.85, 'shR.x': -0.85, 'shL.z': 0.3, 'shR.z': -0.3, 'elL.x': -1.95, 'elR.x': -1.95, 'wrL.x': 0.3, 'wrR.x': 0.3,
  'hipL.x': -0.08, 'hipR.x': 0.12, 'knL.x': 0.22, 'knR.x': 0.12, eyes: 1.55, brow: 1, mouth: 1, 'spine.z': 0.02 * Math.sin(t * 31) });
const b13Listen = (t: number): B13Pose => ({ ...b13Idle(t), 'spine.x': 0.2, 'neck.x': 0.12, 'shR.x': -1.45, 'shR.z': 0.12, 'elR.x': -0.55, 'shL.z': 0.1, eyes: 1.3, brow: 0.6 });
const b13Stand = (t: number): B13Pose => ({ 'neck.z': 0.25, 'neck.x': 0.06, 'shL.z': 0.03, 'shR.z': -0.03, eyes: 1, 'spine.x': 0.01 * Math.sin(t * 0.7) });
const b13Knock = (t: number, tk: number): B13Pose => { const h = b13Knocks(t, tk); return { ...b13Stand(t), 'shR.x': -0.95 - 0.22 * h, 'shR.z': 0.1, 'elR.x': -1.55 + 0.55 * h }; };

interface B13PersonOpts { dark?: boolean; twin?: boolean; cap?: boolean; shirt?: string; pants?: string; skin?: string; hair?: string; shoe?: string }
const b13Person = (o: B13PersonOpts = {}) => {
  const D = !!o.dark || !!o.twin, TW = !!o.twin, black = '#07070a';
  const C = { shirt: D && !TW ? black : (o.shirt || '#2f5a3e'), shirtD: D && !TW ? black : '#264b33', pants: D && !TW ? black : (o.pants || '#5b6270'), skin: D ? black : (o.skin || '#b98463'), hair: D ? black : (o.hair || '#2a1c14'), shoe: D && !TW ? black : (o.shoe || '#e9ecef'), sole: D ? black : '#3a3f48' };
  const mat = (c: string) => p3Mat(c, 0, 0.85);
  const limb = (r0: number, r1: number, L: number, c: string) => { const g = p3Cyl(r1, r0, L, 9); g.translate(0, -L / 2, 0); return p3Mesh(g, mat(c)); };
  const J: Record<string, THREE.Group> = {}; const G = (name: string, x = 0, y = 0, z = 0) => { const g = new THREE.Group(); g.position.set(x, y, z); J[name] = g; return g; };
  const root = new THREE.Group(), hips = G('hips', 0, 0.95, 0); root.add(hips);
  // pelvis and legs
  hips.add(p3Mesh(p3Box(0.32, 0.18, 0.2), mat(C.pants), { p: [0, -0.02, 0] }));
  for (const [side, sx] of [['L', 1], ['R', -1]] as [string, number][]) {
    const hip = G('hip' + side, sx * 0.095, -0.07, 0), knee = G('kn' + side, 0, -0.43, 0), ankle = G('an' + side, 0, -0.42, 0);
    hip.add(limb(0.078, 0.062, 0.45, C.pants), knee); knee.add(p3Mesh(p3Ball(0.06, 8, 6), mat(C.pants)), limb(0.06, 0.047, 0.42, C.pants), ankle);
    ankle.add(p3Mesh(p3Box(0.1, 0.07, 0.25), mat(C.shoe), { p: [0, -0.035, 0.06] }), p3Mesh(p3Box(0.105, 0.025, 0.26), mat(C.sole), { p: [0, -0.07, 0.06] }));
    hips.add(hip);
  }
  // torso (chest wider than the waist), hood, neck and head
  const spine = G('spine', 0, 0.06, 0); hips.add(spine);
  const tg = p3Cyl(0.205, 0.165, 0.52, 12); tg.translate(0, 0.26, 0); spine.add(p3Mesh(tg, mat(C.shirt), { s: [1, 1, 0.62] }));
  spine.add(p3Mesh(p3Box(0.2, 0.1, 0.04), mat(C.shirtD), { p: [0, 0.18, 0.105] }));   // the hoodie pocket
  spine.add(p3Mesh(new THREE.TorusGeometry(0.11, 0.045, 6, 12), mat(C.shirtD), { p: [0, 0.53, -0.03], r: [Math.PI / 2 - 0.3, 0, 0] }));   // the hood around the neck
  const neck = G('neck', 0, 0.54, 0); spine.add(neck);
  neck.add(p3Mesh(p3Cyl(0.045, 0.05, 0.1, 8), mat(C.skin), { p: [0, 0.04, 0] }));
  const head = new THREE.Group(); head.position.y = 0.08; neck.add(head);
  head.add(p3Mesh(p3Ball(0.112, 14, 10), mat(C.skin), { p: [0, 0.12, 0.01], s: [0.95, 1.18, 1.05] }));
  head.add(p3Mesh(new THREE.SphereGeometry(0.118, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.52), mat(C.hair), { p: [0, 0.14, -0.005], s: [0.98, 1.12, 1.08], r: [-0.25, 0, 0] }));
  for (const sx of [1, -1]) head.add(p3Mesh(p3Ball(0.025, 6, 5), mat(C.skin), { p: [sx * 0.108, 0.115, 0], s: [0.6, 1, 1] }));
  head.add(p3Mesh(p3Cone(0.018, 0.045, 6), mat(C.skin), { p: [0, 0.1, 0.12], r: [Math.PI / 2, 0, 0] }));
  // the face: eyes (open / wide / closed), brows, mouth. The double only has two glowing eyes.
  const eyes = new THREE.Group(); eyes.position.set(0, 0.135, 0.098); head.add(eyes);
  const brows: THREE.Mesh[] = [];
  for (const sx of [1, -1]) {
    if (D) eyes.add(p3Mesh(p3Ball(0.017, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff', fog: false }), { p: [sx * 0.04, 0, 0.014] }), p3Mesh(p3Ball(0.04, 8, 6), new THREE.MeshBasicMaterial({ color: '#cfe6ff', transparent: true, opacity: 0.18, depthWrite: false, fog: false }), { p: [sx * 0.04, 0, 0.012] }));
    else {
      eyes.add(p3Mesh(p3Ball(0.021, 10, 8), mat('#f4f1ea'), { p: [sx * 0.04, 0, 0], s: [1, 1, 0.5] }), p3Mesh(p3Ball(0.011, 8, 6), mat('#15110e'), { p: [sx * 0.04, 0, 0.011] }));
      const b = p3Mesh(p3Box(0.045, 0.01, 0.012), mat(C.hair), { p: [sx * 0.042, 0.172, 0.1] }); brows.push(b); head.add(b);
    }
  }
  if (o.cap) { head.add(p3Mesh(p3Cyl(0.125, 0.125, 0.07, 14), mat('#1f2733'), { p: [0, 0.22, 0] }), p3Mesh(p3Box(0.16, 0.012, 0.09), mat('#151b24'), { p: [0, 0.19, 0.12] }), p3Mesh(p3Box(0.09, 0.03, 0.01), mat('#c9a24a'), { p: [0, 0.225, 0.126] })); }
  if (!D) head.add(p3Mesh(p3Box(0.07, 0.018, 0.02), mat(C.hair), { p: [0, 0.085, 0.112], s: [o.cap ? 1 : 0.0001, 1, 1] }));   // the doorman's mustache
  const mouth = p3Mesh(p3Ball(0.022, 8, 6), mat(D ? black : '#4a1c1a'), { p: [0, 0.058, 0.105], s: [1, 0.25, 0.4] }); head.add(mouth);
  // arms: upper arm > forearm, mitten hands with a thumb
  for (const [side, sx] of [['L', 1], ['R', -1]] as [string, number][]) {
    const sh = G('sh' + side, sx * 0.225, 0.47, 0), el = G('el' + side, 0, -0.29, 0), wr = G('wr' + side, 0, -0.26, 0);
    sh.add(p3Mesh(p3Ball(0.062, 8, 6), mat(C.shirt)), limb(0.058, 0.047, 0.3, C.shirt), el);
    el.add(p3Mesh(p3Ball(0.048, 8, 6), mat(C.shirt)), limb(0.047, 0.038, 0.24, C.shirt), wr);
    wr.add(p3Mesh(p3Box(0.065, 0.095, 0.035), mat(C.skin), { p: [0, -0.05, 0] }), p3Mesh(p3Box(0.022, 0.05, 0.026), mat(C.skin), { p: [-sx * 0.04, -0.035, 0.012], r: [0, 0, sx * 0.4] }));
    spine.add(sh);
  }
  root.traverse((m) => { m.castShadow = false; });
  const pose = (P: B13Pose) => {
    for (const k of B13_J) {
      const [j, ax] = k.split('.'); if (!ax) continue; let v = P[k] ?? 0; const r = B13_RANGE[k]; if (r) v = p3Clamp(v, r[0], r[1]);
      (J[j].rotation as any)[ax] = v;
    }
    hips.position.y = 0.95 - (P.drop ?? 0);
    const e = P.eyes ?? 1; eyes.scale.set(1 + Math.max(0, e - 1) * 0.5, Math.max(0.08, e), 1);
    brows.forEach((b, i) => { b.position.y = 0.172 + (P.brow ?? 0) * 0.018; b.rotation.z = (i ? -1 : 1) * (P.brow ?? 0) * 0.25; });
    mouth.scale.set(1 - (P.mouth ?? 0) * 0.2, 0.25 + (P.mouth ?? 0) * 0.9, 0.4);
  };
  pose(b13Idle(0));
  return Object.assign(root, { J, pose });
};
type B13Man = ReturnType<typeof b13Person>;

// adds a piece to a group and returns the piece (Object3D.add returns the parent)
const b13In = <T extends THREE.Object3D>(g: THREE.Object3D, o: T) => { g.add(o); return o; };

// ---------- pieces of the sets
const b13Plane = (w: number, h: number, m: THREE.Material, p: Vec3, r: Vec3 = [0, 0, 0]) => { const x = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); x.position.set(...p); x.rotation.set(...r); x.receiveShadow = true; return x; };
const b13Basic = (c: string, extra: THREE.MeshBasicMaterialParameters = {}) => new THREE.MeshBasicMaterial({ color: c, ...extra });
// a door with frame, plate and knob. Built facing +z with its hinge at x = -0.45; returns { g (outer), leaf (the hinge group), plate (mesh) }
const b13Door = (wood: THREE.Material, num: string) => {
  const g = new THREE.Group(), hinge = new THREE.Group(); hinge.position.set(-0.45, 0, 0); g.add(hinge);
  const leaf = p3Mesh(p3Box(0.9, 2.05, 0.05), wood, { p: [0.45, 1.045, 0] }); hinge.add(leaf);
  for (const sz of [1, -1]) {
    hinge.add(p3Mesh(p3Ball(0.032, 8, 6), '#c9a24a', { p: [0.8, 1.0, sz * 0.05], rough: 0.3 }));
    hinge.add(p3Mesh(p3Cyl(0.014, 0.014, 0.012, 10), '#111111', { p: [0.45, 1.5, sz * 0.027], r: [Math.PI / 2, 0, 0] }));   // the peephole
  }
  const plate = b13Plane(0.2, 0.1, new THREE.MeshStandardMaterial({ map: b13PlateTex(num), roughness: 0.35, metalness: 0.4 }), [0.45, 1.68, 0.028]); hinge.add(plate);
  const frame = p3Mat('#3b2414');
  g.add(p3Mesh(p3Box(0.07, 2.12, 0.1), frame, { p: [-0.485, 1.06, 0] }), p3Mesh(p3Box(0.07, 2.12, 0.1), frame, { p: [0.485, 1.06, 0] }), p3Mesh(p3Box(1.04, 0.07, 0.1), frame, { p: [0, 2.12, 0] }));
  return { g, hinge, plate, setNum(n: string) { (plate.material as THREE.MeshStandardMaterial).map = b13PlateTex(n); } };
};

// ---------- the shared stage
const b13Init = (w: World) => {
  const st = B13.st = p3Stage(w, { finish: { sat: 0.82, curve: 0.38, vignette: 1.0, grain: 0.035 } }), S = st.scene;
  (S as any).environmentIntensity = 0.12; S.background = new THREE.Color('#05060a');
  B13.hemi = st.add(new THREE.HemisphereLight('#7d8db5', '#1d140c', 0.25));

  // ===== exterior: the building at z -300
  const ext = B13.ext = new THREE.Group(); ext.position.set(0, 0, -300); S.add(ext);
  ext.add(b13Plane(400, 400, p3Mat('#0d1016', 0, 1), [0, 0, 0], [-Math.PI / 2, 0, 0]));
  const facade = new THREE.MeshBasicMaterial({ map: b13FacadeTex(), color: '#c8c8c8' }), side = p3Mat('#1b1e27');
  ext.add(p3Mesh(p3Box(16, 66, 12), [side, side, side, side, facade, side] as unknown as THREE.Material, { p: [0, 33, 0] }));
  B13.beacon = b13In(ext, p3Mesh(p3Ball(0.35, 8, 6), b13Basic('#ff2a1f'), { p: [0, 66.6, 0] }));
  ext.add(p3Mesh(p3Ball(9, 16, 12), b13Basic('#dfe6ff'), { p: [-60, 150, -240] }));   // the moon
  const r = p3Rnd(21), sp: number[] = []; for (let i = 0; i < 500; i++) { const a = r() * Math.PI * 2, e = 0.15 + r() * 1.2; sp.push(Math.cos(a) * Math.cos(e) * 480, Math.sin(e) * 480, Math.sin(a) * Math.cos(e) * 480); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  ext.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: '#cdd6ff', size: 2.6, sizeAttenuation: false, fog: false })));
  for (const x of [-9, 9]) { ext.add(p3Mesh(p3Cyl(0.08, 0.1, 5, 8), '#22252d', { p: [x, 2.5, 24] })); ext.add(p3Mesh(p3Ball(0.3, 8, 6), b13Basic('#ffcf8a'), { p: [x, 5.1, 24] })); }
  B13.extLight = b13In(ext, new THREE.PointLight('#ffcf8a', 60, 0, 2)); B13.extLight.position.set(0, 6, 22);

  // ===== elevator cabin at the origin: x -1..1, z -1.2..1, y 0..2.4; the door opening (1 m) at z = 1
  const steel = b13Steel(), cab = B13.cab = new THREE.Group(); S.add(cab);
  cab.add(b13Plane(2, 2.2, p3Mat('#2b2d31', 0, 0.6), [0, 0.002, -0.1], [-Math.PI / 2, 0, 0]));
  cab.add(b13Plane(2, 2.2, steel, [0, 2.4, -0.1], [Math.PI / 2, 0, 0]));
  cab.add(b13Plane(2, 2.4, steel, [0, 1.2, -1.2]), b13Plane(2.2, 2.4, steel, [-1, 1.2, -0.1], [0, Math.PI / 2, 0]), b13Plane(2.2, 2.4, steel, [1, 1.2, -0.1], [0, -Math.PI / 2, 0]));
  for (const sx of [1, -1]) cab.add(b13Plane(0.5, 2.4, steel, [sx * 0.75, 1.2, 0.99], [0, Math.PI, 0]));
  cab.add(b13Plane(1, 0.3, steel, [0, 2.25, 0.99], [0, Math.PI, 0]));
  cab.add(p3Mesh(p3Box(1.9, 0.04, 0.04), '#9aa0a8', { p: [0, 0.95, -1.17], rough: 0.3 }));   // the handrail
  B13.cabPanelLight = b13In(cab, b13Plane(1.2, 0.5, b13Basic('#e8f0ff'), [0, 2.395, -0.2], [Math.PI / 2, 0, 0]));
  B13.cabLight = b13In(cab, new THREE.PointLight('#eaf1ff', 3.2, 0, 2)); B13.cabLight.position.set(0, 2.2, -0.2);
  B13.panel = b13In(cab, b13Plane(0.22, 0.44, new THREE.MeshBasicMaterial({ map: b13PanelTex(0), color: '#bbbbbb' }), [0.985, 1.25, 0.62], [0, -Math.PI / 2, 0]));
  B13.dispIn = b13In(cab, b13Plane(0.26, 0.13, new THREE.MeshBasicMaterial({ map: b13Display('12') }), [0, 2.25, 0.985], [0, Math.PI, 0]));
  B13.leaves = [1, -1].map((sx) => b13In(cab, p3Mesh(p3Box(0.52, 2.1, 0.035), steel, { p: [sx * 0.26, 1.05, 1.0] })));

  // ===== corridor: z 1.06 .. 21, x -1.3 .. 1.3, height 2.6
  const cor = B13.cor = new THREE.Group(); S.add(cor);
  cor.add(b13Plane(2.6, 20, b13Carpet(), [0, 0.003, 11], [-Math.PI / 2, 0, 0]));
  cor.add(b13Plane(2.6, 20, p3Mat('#d8d2c4', 0, 0.9), [0, 2.6, 11], [Math.PI / 2, 0, 0]));
  const wallM = b13Wall('cor', '#c9b994', '#b3a37f');
  cor.add(b13Plane(20, 2.6, wallM, [-1.3, 1.3, 11], [0, Math.PI / 2, 0]), b13Plane(20, 2.6, wallM, [1.3, 1.3, 11], [0, -Math.PI / 2, 0]));
  for (const sx of [1, -1]) cor.add(b13Plane(0.8, 2.6, wallM, [sx * 0.9, 1.3, 1.06]));   // the elevator wall, around the door
  cor.add(b13Plane(1, 0.5, wallM, [0, 2.35, 1.06]));
  B13.dispOut = b13In(cor, b13Plane(0.26, 0.13, new THREE.MeshBasicMaterial({ map: b13Display('13') }), [0, 2.36, 1.07]));
  // end wall with the apartment door opening
  for (const sx of [1, -1]) cor.add(p3Mesh(p3Box(0.85, 2.6, 0.1), wallM, { p: [sx * 0.875, 1.3, 21.05] }));
  cor.add(p3Mesh(p3Box(1, 0.5, 0.1), wallM, { p: [0, 2.35, 21.05] }));
  const wood = b13Wood();
  B13.sideDoors = [] as ReturnType<typeof b13Door>[];
  const sideNums = ['01', '04', '03', '06', '05', '07'];
  [5, 10, 15].forEach((z, i) => { for (const sx of [-1, 1]) {
    const d = b13Door(wood, '13' + sideNums[i * 2 + (sx > 0 ? 1 : 0)]); d.g.position.set(sx * 1.27, 0, z); d.g.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2; cor.add(d.g); B13.sideDoors.push(d);
  } });
  const endDoor = B13.endDoor = b13Door(b13Wood('b13-wood-end', 1.15), '1302'); endDoor.g.position.set(0, 0, 21.03); endDoor.g.rotation.y = Math.PI; cor.add(endDoor.g);
  // ceiling light panels + 3 point lights
  B13.corPanels = [3, 7, 11, 15, 19].map((z) => b13In(cor, b13Plane(0.5, 0.5, b13Basic('#fff0d0'), [0, 2.595, z], [Math.PI / 2, 0, 0])));
  B13.corLights = [4, 11, 18].map((z) => { const l = b13In(cor, new THREE.PointLight('#ffd9a0', 4, 0, 2)); l.position.set(0, 2.35, z); return l; });
  // the black void behind the end door (13th floor) and the double hiding in it
  B13.void = b13In(cor, p3Mesh(p3Box(3.6, 2.8, 4.6), new THREE.MeshBasicMaterial({ color: '#000000', side: THREE.BackSide }), { p: [0, 1.4, 23.5] }));

  // ===== apartment: behind the end door, z 21.1 .. 26
  const apt = B13.apt = new THREE.Group(); S.add(apt);
  apt.add(b13Plane(4, 5, b13Wood('b13-floor', 0.7), [0, 0.002, 23.55], [-Math.PI / 2, 0, 0]));
  const wallA = b13Wall('apt', '#5b6a86', '#4f5d78');
  apt.add(b13Plane(4, 2.7, wallA, [0, 1.35, 26], [0, Math.PI, 0]), b13Plane(5, 2.7, wallA, [-2, 1.35, 23.55], [0, Math.PI / 2, 0]), b13Plane(5, 2.7, wallA, [2, 1.35, 23.55], [0, -Math.PI / 2, 0]));
  apt.add(b13Plane(4, 5, p3Mat('#3a4152', 0, 0.9), [0, 2.7, 23.55], [Math.PI / 2, 0, 0]));
  for (const sx of [1, -1]) apt.add(b13Plane(1.55, 2.7, wallA, [sx * 1.225, 1.35, 21.11]));
  apt.add(b13Plane(0.9, 0.6, wallA, [0, 2.4, 21.11]));
  apt.add(b13Plane(1.3, 1.1, new THREE.MeshBasicMaterial({ map: b13CityTex(), color: '#8c96b4' }), [-0.6, 1.5, 25.98], [0, Math.PI, 0]));
  apt.add(p3Mesh(p3Box(1.4, 0.05, 0.08), '#20242e', { p: [-0.6, 0.93, 25.95] }), p3Mesh(p3Box(0.05, 1.2, 0.06), '#20242e', { p: [-0.6, 1.5, 25.95] }));
  // the bed along the right wall, head toward the back
  apt.add(p3Mesh(p3Box(1.1, 0.32, 2.1), '#3a2a20', { p: [1.4, 0.16, 24.6] }), p3Mesh(p3Box(1.04, 0.16, 2.0), '#cfd3dc', { p: [1.4, 0.4, 24.62] }));
  apt.add(p3Mesh(p3Box(0.5, 0.12, 0.3), '#e8ebf2', { p: [1.4, 0.53, 25.45] }));
  B13.blanket = b13In(apt, p3Mesh(p3Box(1.1, 0.08, 1.45), '#34548a', { p: [1.4, 0.7, 24.35] }));
  apt.add(p3Mesh(p3Box(1.12, 0.9, 0.08), '#3a2a20', { p: [1.4, 0.45, 25.68] }));
  // nightstand with the phone clock
  apt.add(p3Mesh(p3Box(0.45, 0.5, 0.4), '#2e2119', { p: [1.65, 0.25, 22.95] }));
  B13.phone = b13In(apt, p3Mesh(p3Box(0.08, 0.01, 0.16), '#0c0c0f', { p: [1.6, 0.505, 22.95], r: [0, 0.35, 0] }));
  B13.phoneScreen = b13In(apt, b13Plane(0.07, 0.145, new THREE.MeshBasicMaterial({ map: b13ClockTex() }), [1.6, 0.512, 22.95], [-Math.PI / 2, 0, 0.35 + Math.PI]));
  B13.phoneLight = b13In(apt, new THREE.PointLight('#7f9cff', 0.25, 0, 2)); B13.phoneLight.position.set(1.6, 0.65, 22.95);
  // moonlight from the window, and the strip of corridor light under the door, with the feet that stop in it
  B13.moon = b13In(apt, new THREE.PointLight('#6f8dff', 1.6, 0, 2)); B13.moon.position.set(-0.6, 1.7, 25.4);
  B13.moonDir = new THREE.DirectionalLight('#6f8dff', 0.35); B13.moonDir.position.set(-1, 3, 27); B13.moonDir.target.position.set(0.5, 0, 22.5); apt.add(B13.moonDir, B13.moonDir.target);
  B13.gap = b13In(apt, b13Plane(0.9, 0.45, new THREE.MeshBasicMaterial({ map: b13GlowTex(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }), [0, 0.004, 21.33], [-Math.PI / 2, 0, 0])); B13.gap.renderOrder = 1;
  B13.feet = [0, 1].map(() => { const f = b13In(apt, b13Plane(0.13, 0.34, new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.92, depthWrite: false }), [0, 0.008, 21.28], [-Math.PI / 2, 0, 0])); f.renderOrder = 2; return f; });


  // ===== lobby at x 40: tiles, the desk, the doorman, a wall clock, the elevator doors with their display
  const lob = B13.lob = new THREE.Group(); lob.position.set(40, 0, 0); S.add(lob);
  const tiles = p3Shader(new THREE.MeshStandardMaterial({ roughness: 0.35 }), 'b13-tiles', { color: `
    vec2 q = floor(p3World.xz * 1.6); float c = mod(q.x + q.y, 2.0); diffuseColor.rgb = mix(vec3(0.12, 0.11, 0.1), vec3(0.62, 0.58, 0.5), c) * (0.9 + 0.15 * p3F(p3World.xz * 5.0));` });
  lob.add(b13Plane(9, 8, tiles, [0, 0.002, 0], [-Math.PI / 2, 0, 0]));
  const wallL = b13Wall('lob', '#8c7a5c', '#7d6c50');
  lob.add(b13Plane(9, 3.2, wallL, [0, 1.6, -4]), b13Plane(8, 3.2, wallL, [-4.5, 1.6, 0], [0, Math.PI / 2, 0]), b13Plane(8, 3.2, wallL, [4.5, 1.6, 0], [0, -Math.PI / 2, 0]));
  lob.add(b13Plane(9, 8, p3Mat('#2a2622', 0, 0.9), [0, 3.2, 0], [Math.PI / 2, 0, 0]));
  // the elevator on the back wall: steel doors, a frame and the display
  lob.add(p3Mesh(p3Box(1.3, 2.4, 0.06), '#5d6168', { p: [1.5, 1.2, -3.98], rough: 0.4 }));
  B13.lobLeaves = [1, -1].map((sx) => b13In(lob, p3Mesh(p3Box(0.52, 2.1, 0.04), b13Steel(), { p: [1.5 + sx * 0.26, 1.05, -3.93] })));
  B13.lobDisp = b13In(lob, b13Plane(0.26, 0.13, new THREE.MeshBasicMaterial({ map: b13Display('14') }), [1.5, 2.3, -3.94]));
  // the reception desk and the clock
  const deskWood = b13Wood('b13-desk', 0.9);
  lob.add(p3Mesh(p3Box(2.2, 1.1, 0.6), deskWood, { p: [-1.6, 0.55, -0.6] }), p3Mesh(p3Box(2.3, 0.05, 0.7), '#2b1c12', { p: [-1.6, 1.12, -0.6] }));
  lob.add(p3Mesh(p3Box(0.4, 0.25, 0.05), '#111', { p: [-1.9, 1.27, -0.75], r: [-0.2, 0.3, 0] }));   // a little monitor
  B13.lobScreen = b13In(lob, b13Plane(0.36, 0.21, b13Basic('#6f8fb8'), [-1.9, 1.27, -0.72], [-0.2, 0.3, 0]));
  B13.clock = b13In(lob, b13Plane(0.6, 0.6, new THREE.MeshBasicMaterial({ map: b13ClockFace(0, 0), color: '#d8d0c0' }), [-4.48, 2.35, -1.6], [0, Math.PI / 2, 0]));
  B13.lobLight = b13In(lob, new THREE.PointLight('#ffcf8f', 9, 0, 2)); B13.lobLight.position.set(-0.5, 2.9, 0);
  lob.add(b13Plane(1.2, 0.5, b13Basic('#ffe6b8'), [-0.5, 3.19, 0], [Math.PI / 2, 0, 0]));
  // the glass entrance with the night street behind it
  lob.add(b13Plane(2.4, 2.5, new THREE.MeshBasicMaterial({ map: b13CityTex(), color: '#5a6280' }), [-1.0, 1.25, 3.98], [0, Math.PI, 0]));
  B13.ivo = st.add(b13Person({ cap: true, shirt: '#3f4a5c', pants: '#262b35', skin: '#c99a74', hair: '#d4d4d4', shoe: '#1b1b1b' })); B13.ivo.rotation.order = 'YXZ';
  B13.twin = st.add(b13Person({ twin: true })); B13.twin.rotation.order = 'YXZ';
  // the facade's two windows: his (14th) and the one that should not exist (13th)
  B13.win14 = b13In(ext, b13Plane(1.6, 1.0, b13Basic('#ffcf7a'), [-1.3, 43.2, 6.02]));
  B13.win13 = b13In(ext, b13Plane(1.6, 1.0, b13Basic('#ff2a1f'), [-1.3, 40.1, 6.02]));

  // ===== the characters
  B13.man = st.add(b13Person()); B13.man.rotation.order = 'YXZ';
  B13.dbl = st.add(b13Person({ dark: true })); B13.dbl.rotation.order = 'YXZ';
  return st;
};

// ---------- per-frame reset: modes of the places, called before every shot poses its frame
// mode: 'ext' (outside), 'home' (14th floor look), 'thirteen' (13th floor look), 'night' (apartment at 3 a.m.)
const b13Mode = (t: number, mode: string, flick = true) => {
  const S = B13.st.scene as THREE.Scene;
  const fog: Record<string, [string, number, number] | null> = { ext: null, lobby: ['#100c08', 8, 30], home: ['#120d08', 6, 26], thirteen: ['#050907', 2.5, 15], night: ['#04060c', 4, 14] };
  const f = fog[mode]; S.fog = f ? new THREE.Fog(f[0], f[1], f[2]) : null;
  B13.ext.visible = mode === 'ext';
  const thirteen = mode === 'thirteen';
  B13.corLights.forEach((l: THREE.PointLight, i: number) => { l.color.set(thirteen ? '#c9f2d4' : '#ffd9a0'); l.intensity = (thirteen ? 3.2 : 4.2) * (thirteen && flick ? b13Flick(t, i) : 1); });
  B13.corPanels.forEach((m: THREE.Mesh, i: number) => { const k = thirteen && flick ? b13Flick(t, Math.min(2, Math.floor(i * 0.6))) : 1; (m.material as THREE.MeshBasicMaterial).color.set(thirteen ? '#d9ffe3' : '#fff0d0').multiplyScalar(k); });
  B13.cabLight.intensity = 3.2; (B13.cabPanelLight.material as THREE.MeshBasicMaterial).color.set('#e8f0ff');
  B13.hemi.intensity = mode === 'ext' ? 0.5 : mode === 'lobby' ? 0.35 : 0.22;
  for (const d of B13.sideDoors) d.setNum(d.plate.userData.n || '1301');
  B13.void.visible = thirteen; B13.apt.visible = !thirteen;
  B13.moon.intensity = mode === 'night' ? 3.2 : 0.6; B13.moonDir.intensity = mode === 'night' ? 0.8 : 0.3;
  B13.gap.visible = mode === 'night'; B13.feet.forEach((m: THREE.Mesh) => { m.visible = false; });
  B13.endDoor.hinge.rotation.y = 0; B13.endDoor.hinge.position.z = 0; B13.endDoor.setNum(thirteen ? '1302' : '1402');
  B13.leaves[0].position.x = 0.26; B13.leaves[1].position.x = -0.26;
  (B13.dispIn.material as THREE.MeshBasicMaterial).map = b13Display('12'); (B13.dispOut.material as THREE.MeshBasicMaterial).map = b13Display('13');
  (B13.panel.material as THREE.MeshBasicMaterial).map = b13PanelTex(0);
  B13.man.visible = false; B13.dbl.visible = false; B13.man.rotation.set(0, 0, 0); B13.dbl.rotation.set(0, 0, 0);
  B13.blanket.visible = true;
  B13.lob.visible = mode === 'lobby'; B13.ivo.visible = false; B13.twin.visible = false; B13.twin.rotation.set(0, 0, 0); B13.ivo.rotation.set(0, 0, 0);
  B13.win13.visible = false; (B13.phoneScreen.material as THREE.MeshBasicMaterial).map = b13ClockTex(); B13.phoneLight.intensity = 0.25;
};
// side door plates by floor
const b13Floor = (floor: '13' | '14') => { const nums = ['01', '04', '03', '06', '05', '07']; B13.sideDoors.forEach((d: any, i: number) => { d.plate.userData.n = floor + nums[i]; d.setNum(floor + nums[i]); }); };
// the cabin's state
const b13Cab = (open: number, disp: string, lit = 0, flick = 0, t = 0) => {
  B13.leaves[0].position.x = 0.26 + 0.5 * open; B13.leaves[1].position.x = -0.26 - 0.5 * open;
  (B13.dispIn.material as THREE.MeshBasicMaterial).map = b13Display(disp); (B13.dispOut.material as THREE.MeshBasicMaterial).map = b13Display(disp);
  (B13.panel.material as THREE.MeshBasicMaterial).map = b13PanelTex(lit);
  const k = flick ? p3Lerp(1, b13Flick(t, 9, 0.45), flick) : 1; B13.cabLight.intensity = 3.2 * k; (B13.cabPanelLight.material as THREE.MeshBasicMaterial).color.set('#e8f0ff').multiplyScalar(k);
};
// camera with shake: st.look + offsets
const b13Look = (pos: Vec3, target: Vec3, fov = 40, shake: [number, number] = [0, 0], roll = 0) => B13.st.look([pos[0] + shake[0], pos[1] + shake[1], pos[2]], [target[0] + shake[0] * 0.5, target[1] + shake[1] * 0.5, target[2]], fov, roll);
const b13Red = (v: number) => { if (B13.st.grade) B13.st.grade.uniforms.uRed.value = v; };
const b13Gray = (v: number) => { if (B13.st.grade) B13.st.grade.uniforms.uGray.value = v; };

// ---------- shots over the shared stage (titles in horror red)
interface B13Shot { id: string; html?(w: World): void; fn(t: number, u: number, s: Scene): void }
const b13Shots = (shots: B13Shot[]) => {
  const V: Record<string, Visual> = {};
  for (const shot of shots) V[shot.id] = { bg: '#05060a', build(w) {
    const st = B13.st || b13Init(w); w.present = () => st.render();
    w.titles.style.setProperty('--highlight', '#ff3b30'); w.titles.style.setProperty('--highlight-fill', 'rgba(255,40,30,0.22)'); w.titles.style.setProperty('--label', '#9b0f14');
    if (shot.html) shot.html(w);
    return (t) => { st.tick(t); b13Mode(t, 'home'); b13Floor('14'); shot.fn(t, p3Clamp((t - w.s.t0) / (w.s.t1 - w.s.t0)), w.s); };
  } };
  defineVisuals(V);
};
// the peephole: a round black mask over the frame (HTML, under the titles)
// from: the time it appears (default: the whole scene)
const b13PeepMask = (w: World, from?: number) => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;z-index:-1;background:radial-gradient(circle at 960px 540px, rgba(0,0,0,0) 0 400px, rgba(0,0,0,0.85) 450px, #000 500px)'; w.titles.style.zIndex = '1'; w.titles.prepend(d);
  if (from !== undefined) { w.tl.set(d, { opacity: 0 }, w.s.t0); w.tl.set(d, { opacity: 1 }, from); } };

// the phone on the nightstand: off (black) or on (03:00)
const b13Phone = (on: boolean) => { (B13.phoneScreen.material as THREE.MeshBasicMaterial).map = on ? b13ClockTex() : b13PhoneOff(); B13.phoneLight.intensity = on ? 0.6 : 0; };

// ---------- world test shots (ids test-*; listed in world.json, 16:9)
b13Shots([
  { id: 'test-lobby', fn(t, u, s) {
    b13Mode(t, 'lobby'); const iv: B13Man = B13.ivo, lt = t - s.t0; iv.visible = true; iv.position.set(40 - 1.6, 0, -1.3); iv.pose(b13Idle(t));
    (B13.clock.material as THREE.MeshBasicMaterial).map = b13ClockFace(0, 0);
    if (lt < 1) b13Look([40 + 2.6, 1.7, 3.2], [40 - 0.8, 1.3, -1.5], 45);
    else b13Look([40 - 1.5, 1.72, 0.2], [40 - 1.6, 1.7, -1.3], 30);
  } },
  { id: 'test-twin', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const tw: B13Man = B13.twin; tw.visible = true; tw.position.set(0, 0, 14); tw.rotation.y = Math.PI; tw.pose(b13Stand(t));
    b13Look([0.3, 1.6, 10.2], [0, 1.2, 14], 40);
  } },
  { id: 'test-ext', fn(t, u, s) { b13Mode(t, 'ext'); B13.win13.visible = t - s.t0 > 1; b13Look([10, 2, -240], [0, 36, -300], 40); } },
  { id: 'test-corridor', fn(t, u, s) { b13Mode(t, 'thirteen'); b13Floor('13'); b13Cab(1, '13'); B13.endDoor.hinge.rotation.y = 0.5; b13Look([0, 1.6, -0.6], [0, 1.4, 8], 45); } },
  { id: 'test-peep', html: (w) => b13PeepMask(w), fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const d: B13Man = B13.twin; d.visible = true; d.position.set(0, 0, 20.2); d.pose(b13Stand(t)); b13Look([0, 1.55, 20.97], [0, 1.4, 15], 80);
  } },
  { id: 'test-phone', fn(t, u, s) { b13Mode(t, 'night'); b13Phone(t - s.t0 > 1); b13Look([1.2, 1.0, 22.5], [1.6, 0.5, 22.95], 32); } },
]);
