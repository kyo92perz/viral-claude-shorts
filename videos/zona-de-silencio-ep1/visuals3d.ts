// <lines>
const ZS_LINES = [{"who": "vance", "t0": 4.0, "t1": 8.107}, {"who": "ray_young", "t0": 8.707, "t1": 12.456}, {"who": "vance", "t0": 12.856, "t1": 20.072}, {"who": "ray_young", "t0": 20.472, "t1": 27.671}, {"who": "vance", "t0": 28.171, "t1": 28.923}, {"who": "vance", "t0": 31.123, "t1": 33.461}, {"who": "ray_young", "t0": 38.021, "t1": 39.68}, {"who": "ray_young", "t0": 42.876, "t1": 45.326}, {"who": "vance", "t0": 45.826, "t1": 52.034}, {"who": "ray_young", "t0": 52.434, "t1": 54.722}, {"who": "vance", "t0": 55.122, "t1": 58.53}, {"who": "ray_young", "t0": 62.73, "t1": 64.485}, {"who": "vance", "t0": 66.685, "t1": 70.391}, {"who": "ray_young", "t0": 74.391, "t1": 76.712}, {"who": "helen", "t0": 83.712, "t1": 88.85}, {"who": "dani", "t0": 89.15, "t1": 91.844}, {"who": "helen", "t0": 92.244, "t1": 95.718}, {"who": "theo", "t0": 98.718, "t1": 106.528}, {"who": "dani", "t0": 106.928, "t1": 111.618}, {"who": "bolacha", "t0": 111.918, "t1": 114.232}, {"who": "theo", "t0": 114.532, "t1": 118.712}, {"who": "bolacha", "t0": 119.112, "t1": 122.185}, {"who": "dani", "t0": 122.485, "t1": 124.372}, {"who": "theo", "t0": 124.772, "t1": 131.419}, {"who": "dani", "t0": 131.719, "t1": 134.669}, {"who": "theo", "t0": 134.969, "t1": 138.004}, {"who": "dani", "t0": 138.304, "t1": 140.801}, {"who": "bolacha", "t0": 141.301, "t1": 147.825}, {"who": "theo", "t0": 148.125, "t1": 153.393}, {"who": "dani", "t0": 153.693, "t1": 156.441}, {"who": "theo", "t0": 156.741, "t1": 167.487}, {"who": "bolacha", "t0": 167.787, "t1": 169.304}, {"who": "theo", "t0": 169.604, "t1": 175.163}, {"who": "dani", "t0": 175.463, "t1": 178.003}, {"who": "bolacha", "t0": 178.803, "t1": 181.846}, {"who": "theo", "t0": 185.543, "t1": 189.604}, {"who": "bolacha", "t0": 193.476, "t1": 196.883}, {"who": "dani", "t0": 201.374, "t1": 206.021}, {"who": "theo", "t0": 206.321, "t1": 209.515}, {"who": "bolacha", "t0": 210.015, "t1": 211.129}, {"who": "theo", "t0": 212.729, "t1": 217.757}, {"who": "bolacha", "t0": 218.057, "t1": 221.517}, {"who": "dani", "t0": 221.817, "t1": 225.814}, {"who": "coyle", "t0": 227.814, "t1": 234.151}, {"who": "coyle", "t0": 237.199, "t1": 242.704}, {"who": "coyle", "t0": 243.504, "t1": 246.463}, {"who": "coyle", "t0": 250.477, "t1": 253.884}, {"who": "ray_old", "t0": 259.061, "t1": 264.143}, {"who": "ray_old", "t0": 265.743, "t1": 268.507}, {"who": "kyle", "t0": 271.507, "t1": 278.366}, {"who": "jess", "t0": 278.666, "t1": 282.327}, {"who": "kyle", "t0": 282.627, "t1": 288.118}, {"who": "jess", "t0": 288.518, "t1": 295.916}, {"who": "kyle", "t0": 296.216, "t1": 298.269}, {"who": "jess", "t0": 298.569, "t1": 301.501}, {"who": "kyle", "t0": 303.101, "t1": 306.602}, {"who": "jess", "t0": 306.902, "t1": 309.145}, {"who": "kyle", "t0": 310.045, "t1": 315.762}, {"who": "jess", "t0": 316.762, "t1": 323.079}, {"who": "theo", "t0": 323.379, "t1": 325.967}, {"who": "jess", "t0": 326.267, "t1": 328.36}, {"who": "theo", "t0": 328.66, "t1": 332.01}, {"who": "bolacha", "t0": 335.01, "t1": 341.592}, {"who": "dani", "t0": 341.892, "t1": 345.887}, {"who": "theo", "t0": 346.187, "t1": 353.202}, {"who": "bolacha", "t0": 353.502, "t1": 357.356}, {"who": "bolacha", "t0": 357.956, "t1": 364.997}, {"who": "dani", "t0": 365.397, "t1": 368.761}, {"who": "bolacha", "t0": 369.061, "t1": 371.869}, {"who": "bolacha", "t0": 377.476, "t1": 381.436}, {"who": "theo", "t0": 381.736, "t1": 384.822}, {"who": "bolacha", "t0": 396.822, "t1": 400.849}, {"who": "bolacha", "t0": 402.849, "t1": 407.121}, {"who": "ray_old", "t0": 411.121, "t1": 415.837}, {"who": "bolacha", "t0": 416.137, "t1": 419.305}, {"who": "ray_old", "t0": 422.162, "t1": 424.998}, {"who": "ray_old", "t0": 431.498, "t1": 435.622}, {"who": "ray_old", "t0": 443.122, "t1": 445.54}, {"who": "bolacha", "t0": 450.04, "t1": 452.156}, {"who": "dani", "t0": 453.656, "t1": 455.464}, {"who": "theo", "t0": 458.964, "t1": 462.59}, {"who": "bolacha", "t0": 471.59, "t1": 476.91}, {"who": "dani", "t0": 477.21, "t1": 480.126}, {"who": "theo", "t0": 480.926, "t1": 483.477}, {"who": "ray_old", "t0": 484.677, "t1": 491.54}, {"who": "dani", "t0": 491.94, "t1": 492.731}, {"who": "ray_old", "t0": 493.331, "t1": 498.074}, {"who": "theo", "t0": 499.674, "t1": 504.885}, {"who": "ray_old", "t0": 505.285, "t1": 512.581}, {"who": "dani", "t0": 512.981, "t1": 518.045}, {"who": "bolacha", "t0": 518.445, "t1": 521.214}, {"who": "coyle", "t0": 522.814, "t1": 526.931}, {"who": "theo", "t0": 535.682, "t1": 537.485}];
// </lines>
// =====================================================================
//  ZONA DE SILÊNCIO, EP1: the shots. Each shot only places the world (world3d.ts): which set, who stands where in
//  which pose and expression, the camera and the effects. Shot ids and timings come from tools/make-scenes.py.
// =====================================================================
const ZV: any = {};
const zvK = (s: Scene, id: string) => (s.keys || []).find((k) => k.id === id)?.t ?? s.t0;
const zvTo = (a: Vec3, b: Vec3) => Math.atan2(b[0] - a[0], b[2] - a[2]);
const zvL3 = (a: Vec3, b: Vec3, u: number): Vec3 => [zsLerp(a[0], b[0], u), zsLerp(a[1], b[1], u), zsLerp(a[2], b[2], u)];
// a camera move from A to B over the shot (eased), with an optional handheld shake
const zvCam = (u: number, A: [Vec3, Vec3, number], B: [Vec3, Vec3, number], t = 0, shake = 0, roll = 0) => {
  const e = zsEase(u), p = zvL3(A[0], B[0], e), q = zvL3(A[1], B[1], e);
  if (shake) { p[0] += Math.sin(t * 13.1) * shake + Math.sin(t * 31.7) * shake * 0.4; p[1] += Math.sin(t * 11.3 + 1) * shake * 0.8; q[0] += Math.sin(t * 9.7 + 2) * shake * 0.5; }
  zsLook(p, q, zsLerp(A[2], B[2], e), roll + (shake ? Math.sin(t * 7.3) * shake * 0.3 : 0));
};
const zvHold = (pos: Vec3, target: Vec3, fov: number, t = 0, drift = 0.02) => zsLook([pos[0] + Math.sin(t * 0.3) * drift, pos[1] + Math.sin(t * 0.23) * drift * 0.5, pos[2]], target, fov);
// a seated pose whose hips land on a seat of height h
const zvSit = (who: string, h: number, base: ZsPose = ZS_POSES.sit): ZsPose => { const P: ZsPerson = ZS.cast[who]; return { ...base, y: -(P.len.hipY - h - 0.05) / (P.H / 1.7) }; };
// walk along a path: position at time t (start, end, speed m/s), facing the way it goes, and the cycle
const zvWalk = (a: Vec3, b: Vec3, t0: number, t: number, speed: number, run = 0, stride = 1): { p: Vec3; face: number; pose: ZsPose; done: boolean } => {
  const L = Math.hypot(b[0] - a[0], b[2] - a[2]), d = Math.min(L, Math.max(0, (t - t0) * speed)), u = L ? d / L : 1;
  const moving = d < L && t > t0;
  return { p: zvL3(a, b, u), face: zvTo(a, b), pose: moving ? zsWalk(d / (run ? 0.55 : 0.36) * Math.PI * stride, 1, run) : ZS_POSES.stand, done: !moving && t > t0 };
};
// the creature's stutter: it holds, then jumps to where it should be, with a small jitter; glitch flashes
const zvStutter = (p: Vec3, t: number, rate = 6, amp = 1): Vec3 => { const st = zsStutter(t, rate); return [p[0] + st.jx * amp, p[1], p[2] + st.jz * amp]; };
const zvFlick = (t: number, rate = 11, k = 0.5) => (Math.sin(t * rate) * Math.sin(t * rate * 2.3 + 1) > k ? 0.15 : 1);

// ---------------------------------------------------------------- per-set ambient states (reset every frame)
const zvReset = (t: number) => {
  ZS_SCREEN.uStatic.value = 0; ZS_SCREEN.uShape.value = 0; ZS_SCREEN.uWave.value = 0; ZS_SCREEN.uBright.value = 1; ZS_DIAL.value = 0;
  ZS.chiado.fx(t, 0.5);
  if (ZS.reels) ZS.reels.forEach((r: THREE.Mesh, i: number) => (r.rotation.y = t * (i ? 2.6 : 3.1)));
  if (ZS.dishYoke) { ZS.dishYoke.rotation.y = 0.2; ZS.dishTilt.rotation.x = -0.75; ZS.feedGlow.scale.setScalar(0.3); }
  if (ZS.ctrlLights) { ZS.ctrlLights.forEach((l: THREE.PointLight) => (l.intensity = 9)); ZS.ctrlTubes.forEach((p: THREE.Mesh) => (p.visible = true)); }
  if (ZS.cable) ZS.cable.visible = true;
  ZS.axeCtrl.visible = true; ZS.axeWall.visible = true;
  ZS.tvLight.intensity = 0; ZS.shopCeil.intensity = 0; ZS.benchLamp.intensity = 18; ZS.shopGlass.visible = true; ZS.shards.visible = false;
  ZS.rwLights.forEach((l: THREE.PointLight) => (l.intensity = 10)); ZS.baseKey.intensity = 22;
  ZS.flash.l.intensity = 0; ZS.beam.visible = false;
  for (const k of Object.keys(ZS.signs)) (ZS.signs[k] as THREE.Mesh).visible = true;
  if (ZS.st.grade) { ZS.st.grade.uniforms.uGray.value = 0; ZS.st.grade.uniforms.uRed.value = 0; }
};
// sparks: a burst at a point (set-local), from time t0
const zvSparks = (at: Vec3, t0: number, t: number, n = 60) => {
  const dt = t - t0; if (dt < 0 || dt > 1.4) return; ZS.sparks.visible = true; const p = zsAt(at), rnd = p3Rnd(Math.round(t0 * 100));
  for (let i = 0; i < 80; i++) { if (i >= n) { ZS.sparks.hide(i); continue; } const vx = (rnd() - 0.5) * 3, vy = rnd() * 3 + 0.5, vz = (rnd() - 0.5) * 3, life = 0.4 + rnd() * 0.9;
    if (dt > life) { ZS.sparks.hide(i); continue; } ZS.sparks.put(i, p[0] + vx * dt, p[1] + vy * dt - 4.9 * dt * dt, p[2] + vz * dt, 1 - dt / life); }
  ZS.sparks.done();
};
// the flashlight in Bolacha's hand (woods): the spot light and the faint beam follow the hand
const zvFlash = (P: ZsPerson, on: number) => {
  if (on <= 0) return; const h = new THREE.Vector3(); P.handR.getWorldPosition(h); const dir = new THREE.Vector3(0, -0.1, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), P.root.rotation.y);
  const o = ZS.sets.woods.position; ZS.flash.l.intensity = 40 * on; ZS.flash.l.position.set(h.x - o.x, h.y - o.y, h.z - o.z); ZS.flash.l.target.position.set(h.x - o.x + dir.x * 8, h.y - o.y + dir.y * 8, h.z - o.z + dir.z * 8);
  ZS.beam.visible = false; ZS.beam.position.set(h.x - o.x + dir.x * 3.5, h.y - o.y + dir.y * 3.5, h.z - o.z + dir.z * 3.5); ZS.beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir.clone().normalize());
};

// ---------------------------------------------------------------- blocking (set-local marks)
const ZV_CTRL = { vance: [-0.3, 0, 0.5] as Vec3, ray: [1.5, 0, 0.7] as Vec3, door: [-3.6, 0, 1.6] as Vec3, cable: [-0.5, 0.1, 1.3] as Vec3 };
const ZV_BASE = { theo: [-0.35, 0, -1.35] as Vec3, dani: [0.85, 0, -1.2] as Vec3, bol: [1.45, 0, 1.15] as Vec3 };
const ZV_SHOP = { ray: [2.35, 0, -0.6] as Vec3, door: [1.9, 0, 2.6] as Vec3, win: [-1.4, 0, 2.6] as Vec3, strip: [0.8, 0, -2.2] as Vec3 };
const ZV_RW = { jess: [-2.8, 0, 1.55] as Vec3, kyle: [-2.3, 0, -0.6] as Vec3, tv: [3.1, 1.1, -2.4] as Vec3 };

// the three kids in the basement in their usual places (a base layer for many shots)
const zvBasement = (t: number, ex: { theo?: string; dani?: string; bol?: string } = {}, poses: { theo?: ZsPose; dani?: ZsPose; bol?: ZsPose } = {}) => {
  zsUse('basement');
  const tf = ZV.theoAtMic ? Math.PI - 0.5 : 0.45;
  const th = zsPut('theo', ZV_BASE.theo, tf, poses.theo || zvSit('theo', 0.5, ZV.theoAtMic ? ZS_POSES.micDesk : zsMix(ZS_POSES.sit, ZS_POSES.talkR, 0.4)), t, ex.theo || 'calm'); if (!poses.theo || poses.theo.y) zsSeat(0, ZV_BASE.theo, tf);
  const da = zsPut('dani', ZV_BASE.dani, -2.2, poses.dani || ZS_POSES.armsCrossed, t, ex.dani || 'smirk');
  const bo = zsPut('bolacha', ZV_BASE.bol, -1.87, poses.bol || zvSit('bolacha', 0.55, ZS_POSES.relaxed.j ? { ...ZS_POSES.sit, j: { ...ZS_POSES.sit.j, sR: [-0.9, 0, -0.1], eR: [-1.6] } } : ZS_POSES.sit), t, ex.bol || 'smile');
  return { th, da, bo };
};
const zvShop = (t: number) => { zsUse('shop'); };
const zvLookFace = (who: string, dist: number, side: number, h = 0, fov = 30, t = 0): void => {
  const P: ZsPerson = ZS.cast[who]; const hp = new THREE.Vector3(); P.J.head.getWorldPosition(hp); const o = ZS.at;
  const f = P.root.rotation.y + side, x = hp.x - o[0], y = hp.y - o[1] + 0.06, z = hp.z - o[2];
  zsLook([x + Math.sin(f) * dist + Math.sin(t * 0.31) * 0.01, y + h, z + Math.cos(f) * dist], [x, y - 0.01, z], fov);
};

// ---------------------------------------------------------------- the shots
const ZV_SHOTS: { id: string; fn(t: number, u: number, s: Scene): void }[] = [
  // ===== COLD OPEN, 1979 =====
  { id: 's01', fn(t, u) { zsUse('dish'); ZS.feedGlow.scale.setScalar(0.4 + 0.3 * Math.sin(t * 3)); zvCam(u, [[34, 3, 34], [0, 11, -30], 42], [[22, 4, 18], [4, 9, -26], 38]); } },
  { id: 's02', fn(t, u) { zsUse('control'); ZS_SCREEN.uWave.value = 0.15;
    zsPut('vance', ZV_CTRL.vance, Math.PI, zvSit('vance', 0.5, ZS_POSES.micDesk), t, 'awe', { lookX: -0.2 }); zsSeat(0, ZV_CTRL.vance, Math.PI);
    zsPut('ray_young', ZV_CTRL.ray, zvTo(ZV_CTRL.ray, ZV_CTRL.vance), ZS_POSES.armsCrossed, t, 'skeptic');
    zvCam(u, [[0.6, 1.7, 2.8], [0.4, 1.1, -0.5], 42], [[-0.2, 1.65, 2.6], [0.4, 1.1, -0.5], 40]); } },
  { id: 's03', fn(t, u) { zsUse('control'); ZS_SCREEN.uWave.value = 0.2; zsPut('vance', ZV_CTRL.vance, Math.PI, zvSit('vance', 0.5, ZS_POSES.micDesk), t, 'awe'); zsSeat(0, ZV_CTRL.vance, Math.PI);
    zsPut('ray_young', ZV_CTRL.ray, zvTo(ZV_CTRL.ray, ZV_CTRL.vance), ZS_POSES.armsCrossed, t, 'skeptic');
    zvCam(u, [[-0.9, 1.35, -0.6], [-0.3, 1.27, 0.5], 34], [[-0.75, 1.33, -0.35], [-0.3, 1.28, 0.5], 30]); } },
  { id: 's04', fn(t, u) { zsUse('control'); zsPut('vance', ZV_CTRL.vance, Math.PI, zvSit('vance', 0.5, ZS_POSES.micDesk), t, 'awe'); zsSeat(0, ZV_CTRL.vance, Math.PI);
    zsPut('ray_young', ZV_CTRL.ray, zvTo(ZV_CTRL.ray, ZV_CTRL.vance), zsMix(ZS_POSES.armsCrossed, ZS_POSES.shrug, Math.sin(u * Math.PI) * 0.8), t, u > 0.55 ? 'grin' : 'smirk');
    zvLookFace('ray_young', 1.25, 0.35, 0, 30, t); } },
  { id: 's05', fn(t, u, s) { zsUse('control'); const k = zvK(s, 'wave'); ZS_SCREEN.uWave.value = 0.2 + zsRamp(t, k - 0.3, k + 0.8) * 1.4;
    zsPut('vance', ZV_CTRL.vance, Math.PI, zvSit('vance', 0.5, ZS_POSES.micDesk), t, 'hush'); zsSeat(0, ZV_CTRL.vance, Math.PI);
    zvCam(u, [[0.45, 1.62, -1.3], [0.45, 1.62, -2.2], 34], [[0.45, 1.62, -1.6], [0.45, 1.62, -2.2], 26]); } },
  { id: 's06', fn(t, u) { zsUse('control'); ZS_SCREEN.uWave.value = 1.0; ZS_DIAL.value = 0;
    zsPut('vance', ZV_CTRL.vance, Math.PI, zvSit('vance', 0.5, { ...ZS_POSES.micDesk, j: { ...ZS_POSES.micDesk.j, spine: [0.3], head: [0.1] } }), t, 'awe'); zsSeat(0, ZV_CTRL.vance, Math.PI);
    zsPut('ray_young', ZV_CTRL.ray, zvTo(ZV_CTRL.ray, ZV_CTRL.vance), ZS_POSES.relaxed, t, 'worried');
    zvCam(u, [[0.25, 1.28, -0.45], [-0.3, 1.2, 0.45], 32], [[0.2, 1.27, -0.3], [-0.3, 1.2, 0.45], 30]); } },
  { id: 's07', fn(t, u, s) { zsUse('control'); const g = zsRamp(t, zvK(s, 'green'), zvK(s, 'green') + 0.8); ZS_DIAL.value = g; ZS_SCREEN.uWave.value = 1.5;
    ZS.ctrlLights.forEach((l: THREE.PointLight) => (l.intensity = 9 * zvFlick(t, 13, 0.6)));
    zsPut('vance', ZV_CTRL.vance, Math.PI, zvSit('vance', 0.5, ZS_POSES.micDesk), t, 'awe', { lookY: 0.2 }); zsSeat(0, ZV_CTRL.vance, Math.PI);
    zsPut('ray_young', ZV_CTRL.ray, zvTo(ZV_CTRL.ray, [0, 1, -2.5]), ZS_POSES.stand, t, 'fear');
    zvCam(u, [[2.6, 2.2, 2.6], [-0.2, 1.1, -1.2], 44], [[2.4, 2.1, 2.3], [-0.2, 1.1, -1.2], 42]); } },
  { id: 's08', fn(t, u) { zsUse('control'); ZS_DIAL.value = 1; ZS_SCREEN.uWave.value = 1.2;
    zsPut('vance', ZV_CTRL.vance, Math.PI - 0.6, zvSit('vance', 0.5, ZS_POSES.micDesk), t, 'awe'); zsSeat(0, ZV_CTRL.vance, Math.PI - 0.6);
    zsPut('ray_young', ZV_CTRL.ray, zvTo(ZV_CTRL.ray, ZV_CTRL.vance), zsMix(ZS_POSES.stand, ZS_POSES.shrug, 0.6), t, 'worried', { smile: 0.25 });
    zvCam(u, [[-1.6, 1.55, 2.2], [1.0, 1.35, 0.5], 38], [[-1.4, 1.55, 2.0], [1.0, 1.4, 0.5], 36]); } },
  { id: 's09', fn(t, u) { zsUse('control'); ZS_DIAL.value = 1; ZS_SCREEN.uWave.value = 1.4;
    zsPut('ray_young', ZV_CTRL.ray, zvTo(ZV_CTRL.ray, ZV_CTRL.vance), ZS_POSES.stand, t, u > 0.3 ? 'fear' : 'worried', { lookX: Math.sin(t * 5) * 0.2 });
    const P = ZS.cast.ray_young, hp = new THREE.Vector3(); P.J.head.getWorldPosition(hp); const o = ZS.at, f = P.root.rotation.y;
    // a slow push-in that also widens the lens (the room seems to stretch behind him)
    const d = zsLerp(2.2, 0.75, zsEase(u)), fov = zsLerp(22, 46, zsEase(u)); zsLook([hp.x - o[0] + Math.sin(f) * d, hp.y - o[1] + 0.05, hp.z - o[2] + Math.cos(f) * d], [hp.x - o[0], hp.y - o[1] + 0.04, hp.z - o[2]], fov); } },
  { id: 's10', fn(t, u) { zsUse('control'); ZS_DIAL.value = 1; ZS_SCREEN.uWave.value = 1.6;
    const back = zsEase(u) * 0.8; const rp: Vec3 = [ZV_CTRL.ray[0] + back, 0, ZV_CTRL.ray[2] + back * 0.4];
    zsPut('ray_young', rp, zvTo(rp, ZV_CTRL.vance), zsMix(ZS_POSES.stand, ZS_POSES.scared, zsEase(u * 2)), t, 'terror');
    zsPut('vance', ZV_CTRL.vance, Math.PI - 0.9, zvSit('vance', 0.5, ZS_POSES.micDesk), t, 'awe'); zsSeat(0, ZV_CTRL.vance, Math.PI - 0.9);
    zvCam(u, [[-0.6, 1.5, 2.4], [1.4, 1.3, 0.6], 40], [[-0.4, 1.5, 2.6], [1.8, 1.35, 0.8], 40], t, 0.01); } },
  { id: 's11', fn(t, u, s) { zsUse('control'); ZS_DIAL.value = 1; const k = zsRamp(t, zvK(s, 'knob') - 0.5, zvK(s, 'knob') + 1); ZS_SCREEN.uWave.value = 1.6 + k;
    const vp: Vec3 = [-0.3, 0, -1.6]; const reach: ZsPose = { j: { sR: [-1.3, 0, -0.1], eR: [-0.4], wR: [0, 0, 0.5 * k], spine: [0.15], head: [-0.15], sL: [-0.2, 0, 0.3], eL: [-0.6] }, f: [0.4, 0.7] };
    zsPut('vance', vp, Math.PI, reach, t, 'awe', { lookY: 0.15 });
    ZS.ctrlLights.forEach((l: THREE.PointLight) => (l.intensity = 9 * zvFlick(t, 17, 0.7)));
    zvCam(u, [[0.6, 0.7, 0.3], [-0.3, 1.5, -2.0], 38], [[0.5, 0.75, 0.0], [-0.3, 1.55, -2.0], 34]); } },
  { id: 's12', fn(t, u) { zsUse('control'); ZS_DIAL.value = 1; ZS_SCREEN.uWave.value = 2.4;
    const vp: Vec3 = [-0.3, 0, -1.6], rp: Vec3 = zvL3([1.2, 0, 0.2], [0.35, 0, -1.25], zsEase(u * 1.6));
    zsPut('vance', vp, Math.PI - 0.4, ZS_POSES.stand, t, 'angry');
    zsPut('ray_young', rp, zvTo(rp, vp), zsMix(zsWalk(t * 9, 1, 0.5), { j: { sR: [-1.3, -0.3, -0.2], eR: [-0.5], sL: [-1.0, 0.3, 0.2], eL: [-0.7], spine: [0.2] }, f: [0.9, 0.9] }, zsEase(u * 1.5)), t, 'shout');
    zvCam(u, [[1.6, 1.55, 1.8], [-0.1, 1.35, -1.2], 40], [[1.4, 1.5, 1.4], [-0.1, 1.35, -1.3], 38], t, 0.025); } },
  { id: 's13', fn(t, u) { zsUse('control'); ZS_DIAL.value = 1; ZS_SCREEN.uWave.value = 2.8;
    const vp: Vec3 = [-0.3, 0, -1.6]; zsPut('vance', vp, 0.5, { j: { sL: [-0.6, 0, 0.6], eL: [-0.6], sR: [-1.2, 0, -0.2], eR: [-0.5], chest: [0, 0.3, 0] }, f: [0.1, 0.6] }, t, 'laugh');
    const rp: Vec3 = [0.6 + zsEase(u) * 0.5, 0, -1.0 + zsEase(u) * 0.4]; zsPut('ray_young', rp, zvTo(rp, vp), zsMix(ZS_POSES.hitBack, ZS_POSES.scared, zsEase(u)), t, 'fear');
    zvLookFace('vance', 1.1, 0.3, -0.1, 34, t); } },
  { id: 's14', fn(t, u, s) { zsUse('dish'); const k = zvK(s, 'turn'), r = zsRamp(t, k - 0.4, k + 2.4);
    ZS.dishYoke.rotation.y = 0.2 + r * 0.9; ZS.dishTilt.rotation.x = -0.75 + r * 0.6; ZS.feedGlow.scale.setScalar(0.3 + r * 2.4);
    zvCam(u, [[-18, 1.5, 6], [0, 13, -30], 40], [[-16, 1.4, 3], [0, 12, -30], 36]); } },
  { id: 's15', fn(t, u, s) { zsUse('control'); ZS_DIAL.value = 1; ZS_SCREEN.uWave.value = 3;
    const fl = zvFlick(t, 19, 0.3); ZS.ctrlLights.forEach((l: THREE.PointLight) => (l.intensity = 9 * fl)); ZS.ctrlTubes.forEach((p: THREE.Mesh) => (p.visible = fl > 0.5));
    const vp: Vec3 = [-0.3, 0, -1.6]; zsPut('vance', vp, 0.6, ZS_POSES.stand, t, 'awe', { lookY: 0.3 });
    zsPut('ray_young', [1.3, 0, -0.3], zvTo([1.3, 0, -0.3], vp), ZS_POSES.scared, t, 'terror');
    const a = zvK(s, 'appear'); if (t > a) { const C = zsPut('chiado', zvStutter([-3.2, 0, 1.0], t, 5), 0.6, ZS_CPOSES.stalk, t); ZS.chiado.fx(t, 0.9); C.root.visible = zvFlick(t, 31, 0.8) > 0.5; }
    zvCam(u, [[2.2, 1.5, 2.6], [-1.6, 1.4, -0.4], 42], [[2.0, 1.5, 2.3], [-1.9, 1.5, -0.2], 40], t, 0.012); } },
  { id: 's16', fn(t, u, s) { zsUse('control'); ZS_DIAL.value = 1; ZS_SCREEN.uWave.value = 3; const fl = zvFlick(t, 23, 0.2); ZS.ctrlLights.forEach((l: THREE.PointLight) => (l.intensity = 9 * fl));
    const g = zvK(s, 'grab'), drag = zsRamp(t, g + 0.3, s.t1);
    const vp: Vec3 = zvL3([-0.6, 0, -1.2], [-3.0, 0, 1.4], drag); const cp: Vec3 = zvL3([-1.4, 0, -0.6], [-3.4, 0, 1.6], drag);
    zsPut('vance', vp, zvTo(vp, [1.5, 0, 0]), t > g ? zsMix(ZS_POSES.hitBack, { j: { sL: [-1.6, 0, 0.4], eL: [-0.2], sR: [-1.5, 0, -0.4], eR: [-0.3], spine: [-0.3] }, f: [0, 0] }, drag) : ZS_POSES.scared, t, 'scream', {}, 'vance');
    zsPut('chiado', zvStutter(cp, t, 7), zvTo(cp, vp), t > g ? ZS_CPOSES.reach : ZS_CPOSES.stalk, t); ZS.chiado.fx(t, 1, 2);
    zvCam(u, [[1.8, 1.4, 1.2], [-1.6, 1.3, 0.0], 42], [[1.6, 1.4, 1.6], [-2.6, 1.3, 1.0], 44], t, 0.03); } },
  { id: 's17', fn(t, u, s) { zsUse('control'); const ax = zvK(s, 'axe'), ch = zvK(s, 'chop'), dk = zvK(s, 'dark');
    ZS_DIAL.value = t < dk ? 1 : 0; ZS_SCREEN.uWave.value = t < dk ? 3 : 0; ZS_SCREEN.uBright.value = t < dk ? 1 : 0;
    const lit = t < dk ? zvFlick(t, 27, 0.2) : 0; ZS.ctrlLights.forEach((l: THREE.PointLight) => (l.intensity = 9 * lit)); ZS.ctrlTubes.forEach((p: THREE.Mesh) => (p.visible = lit > 0.5));
    const rp: Vec3 = t < ax ? zvL3([-2.6, 0, -1.0], [-3.3, 0, -1.0], zsEase((t - s.t0) / (ax - s.t0))) : zvL3([-3.3, 0, -0.6], [-1.0, 0, 1.0], zsRamp(t, ax, ch - 0.35));
    const pose = zsTrack([[s.t0, ZS_POSES.stand], [ax, { j: { sR: [-1.6, 0.4, -0.3], eR: [-0.4], spine: [0.1] }, f: [0.3, 1] }], [ax + 0.4, ZS_POSES.axeReady], [ch - 0.35, ZS_POSES.axeRaise], [ch, ZS_POSES.axeChop], [ch + 1.2, ZS_POSES.axeChop]], t);
    const R = zsPut('ray_young', rp, t < ax ? -Math.PI / 2 : zvTo(rp, [-0.5, 0, 1.4]) , pose, t, t < ch ? 'rage' : 'shout');
    if (t > ax) { ZS.axeCtrl.visible = false; zsHold('axe', R, 'R', [0, -0.07, 0.02], [1.5, 0, 0]); }
    zvSparks([-0.5, 0.15, 1.3], ch, t, 70);
    zvCam(u, [[0.5, 1.2, 2.6], [-2.0, 1.1, 0.0], 44], [[0.2, 0.9, 2.6], [-0.8, 0.6, 1.0], 40], t, t > ch && t < ch + 0.5 ? 0.06 : 0.02); } },
  { id: 's18', fn(t, u) { zsUse('control'); ZS.ctrlLights.forEach((l: THREE.PointLight) => (l.intensity = 0)); ZS.ctrlTubes.forEach((p: THREE.Mesh) => (p.visible = false)); ZS_SCREEN.uBright.value = 0;
    const R = zsPut('ray_young', [-0.9, 0, 1.4], 2.6, { ...ZS_POSES.crouch, j: { ...ZS_POSES.crouch.j, head: [0.3] } }, t, 'pain', { lookY: -0.3 }); zsHold('axe', R, 'R', [0, -0.07, 0.02], [0.3, 0, 0]);
    zvCam(u, [[0.6, 0.9, 2.7], [-0.9, 0.8, 1.2], 38], [[0.2, 0.85, 2.7], [-0.9, 0.75, 1.3], 34]); } },
  { id: 's19', fn(t, u) { zsUse('dish'); ZS.feedGlow.scale.setScalar(0.25); zvCam(u, [[0, 2, 60], [-60, 60, -200], 30], [[0, 2, 60], [-60, 66, -200], 28]); } },

  // ===== THE TOWN =====
  { id: 's20', fn(t, u) { zsUse('street'); const w = zvWalk([-24, 0, 1.2], [-8, 0, 1.6], t - 2.5, t, 4.2, 0);
    zsPut('dani', w.p, w.face, { ...ZS_POSES.stand, j: { ...ZS_POSES.stand.j, hL: [0, 0, 0.12], kL: [0.3], hR: [-0.2, 0, -0.1], kR: [0.1], spine: [0.1], sL: [0, 0, 0.5], sR: [0, 0, -0.5] } }, t, 'smile');
    ZV.skate(ZS.cast.dani);
    zsPut('helen', [-9.4, 0.15, -7.0], zvTo([-9.4, 0, -7], w.p), ZS_POSES.handsHips, t, 'angry');
    zvCam(u, [[-28, 5.5, 14], [-14, 1.5, -2], 40], [[-24, 4.2, 12], [-11, 1.6, -2], 38]); } },
  { id: 's21', fn(t, u, s) { zsUse('street'); const x = -9 + (t - s.t0) * 3.2;
    const D = zsPut('dani', [x, 0, 1.8], Math.PI / 2 - 0.5, { j: { hL: [0, 0, 0.12], kL: [0.3], hR: [-0.2, 0, -0.1], kR: [0.1], spine: [0.05, -0.8, 0], chest: [0, -0.4, 0], head: [0, -0.7, 0], sR: [-1.2, 0, -0.6], eR: [-0.3], sL: [0, 0, 0.6] }, f: [0.3, 0.1] }, t, 'grin'); ZV.skate(D);
    zsLook([x + 3.2, 1.25, 4.2], [x, 1.2, 1.6], 38); } },
  { id: 's22', fn(t, u) { zsUse('street'); zsPut('helen', [-9.4, 0.15, -7.0], 0.5, zsMix(ZS_POSES.handsHips, ZS_POSES.point, Math.max(0, Math.sin(t * 2)) * 0.6), t, 'angry');
    zvCam(u, [[-8.7, 1.55, -5.4], [-9.4, 1.62, -7.0], 32], [[-8.5, 1.55, -5.2], [-9.3, 1.6, -7.0], 30]); } },

  // ===== THE BASEMENT =====
  { id: 's23', fn(t, u) { ZV.theoAtMic = true; zvBasement(t, { theo: 'grin', dani: 'smirk', bol: 'smile' }); zvCam(u, [[-1.8, 1.45, 0.6], [-0.4, 1.05, -1.6], 44], [[-1.3, 1.25, -0.1], [-0.35, 1.08, -1.6], 36]); } },
  { id: 's24', fn(t, u) { zvBasement(t, { theo: 'smile', dani: 'skeptic' }, { dani: zsMix(ZS_POSES.armsCrossed, ZS_POSES.talkR, 0.5) }); zvLookFace('dani', 1.2, 0.4, 0, 32, t); } },
  { id: 's25', fn(t, u) { zvBasement(t, { bol: 'smile' }); zvLookFace('bolacha', 1.5, 0.2, 0.1, 34, t); } },
  { id: 's26', fn(t, u) { zvBasement(t, { theo: 'skeptic' }, { theo: zvSit('theo', 0.5, zsMix(ZS_POSES.sit, ZS_POSES.point, 0.45)) }); zvLookFace('theo', 1.1, -0.6, 0, 32, t); } },
  { id: 's27', fn(t, u) { zvBasement(t, { bol: 'scream', dani: 'skeptic' }, { bol: zvSit('bolacha', 0.55, { ...ZS_POSES.sit, j: { ...ZS_POSES.sit.j, neck: [-0.4], head: [-0.4], sL: [-0.9, 0, 0.5], eL: [-1.5], sR: [-0.9, 0, -0.5], eR: [-1.5] } }) });
    zvCam(u, [[0.2, 1.1, 1.9], [1.45, 1.0, 1.15], 36], [[0.4, 1.0, 1.8], [1.45, 1.05, 1.15], 32]); } },
  { id: 's28', fn(t, u) { zvBasement(t, { theo: 'laugh', dani: 'skeptic', bol: 'grin' }); zvCam(u, [[-0.5, 1.4, 1.3], [0.6, 1.25, -1.0], 38], [[-0.3, 1.4, 1.1], [0.75, 1.3, -1.1], 34]); } },
  { id: 's29', fn(t, u) { ZV.theoAtMic = true; zvBasement(t, { theo: 'grin', dani: 'neutral', bol: 'calm' }); zvCam(u, [[1.6, 1.9, 1.9], [-0.6, 0.95, -1.2], 46], [[1.2, 1.8, 2.0], [-0.6, 0.95, -1.2], 44]); } },
  { id: 's30', fn(t, u) { zvBasement(t, { dani: 'skeptic' }, { dani: zsMix(ZS_POSES.armsCrossed, ZS_POSES.shrug, 0.5) }); zvLookFace('dani', 1.3, -0.3, 0.02, 32, t); } },
  { id: 's31', fn(t, u) { zvBasement(t, { theo: 'smirk' }); zvLookFace('theo', 1.15, -0.55, 0, 32, t); } },
  { id: 's32', fn(t, u) { zvBasement(t, { dani: 'grin' }, { dani: zsMix(ZS_POSES.point, ZS_POSES.armsCrossed, 0.3) }); zvLookFace('dani', 1.4, 0.2, 0, 34, t); } },
  { id: 's33', fn(t, u) { zvBasement(t, { bol: 'smile', dani: 'smirk', theo: 'skeptic' }, { bol: zvSit('bolacha', 0.55, { ...ZS_POSES.sit, j: { ...ZS_POSES.sit.j, sR: [-0.8, 0, -0.4], eR: [-1.4], sL: [-0.7, 0, 0.4], eL: [-1.3] } }) }); zvLookFace('bolacha', 1.3, -0.3, 0.05, 32, t); } },
  { id: 's34', fn(t, u) { zvBasement(t, { theo: 'neutral', dani: 'smirk', bol: 'calm' }, { theo: zvSit('theo', 0.5, zsMix(ZS_POSES.sit, ZS_POSES.talkL, 0.6)) }); zvLookFace('theo', 1.05, 0.5, 0, 32, t); } },
  { id: 's35', fn(t, u) { zvBasement(t, { dani: 'smirk', theo: 'skeptic' }, { dani: ZS_POSES.handsHips }); zvLookFace('dani', 1.2, 0.5, 0, 32, t); } },
  { id: 's36', fn(t, u) { zvBasement(t, { theo: 'calm', dani: 'skeptic', bol: 'calm' }, { theo: zvSit('theo', 0.5, zsMix(ZS_POSES.sit, ZS_POSES.talkR, 0.5 + 0.3 * Math.sin(t * 2))) });
    zvCam(u, [[0.9, 2.1, 1.6], [-0.4, 1.0, -1.4], 40], [[-0.3, 1.5, 0.6], [-0.35, 1.1, -1.4], 36]); } },
  { id: 's37', fn(t, u) { zvBasement(t, { bol: 'worried' }); zvLookFace('bolacha', 1.4, 0.0, 0.05, 32, t); } },
  { id: 's38', fn(t, u) { zvBasement(t, { theo: 'grin' }, { theo: zvSit('theo', 0.5, zsMix(ZS_POSES.sit, ZS_POSES.shrug, 0.6)) }); zvLookFace('theo', 1.1, -0.3, 0, 32, t); } },
  { id: 's39', fn(t, u) { zvBasement(t, { dani: 'grin', theo: 'angry', bol: 'laugh' }, { dani: ZS_POSES.walkieTalk }); zvCam(u, [[-0.2, 1.4, 0.8], [0.85, 1.35, -1.2], 34], [[0.0, 1.38, 0.6], [0.85, 1.35, -1.2], 30]); } },
  { id: 's40', fn(t, u, s) { zvBasement(t, { theo: 'neutral', dani: 'neutral', bol: 'worried' }, { bol: ZS_POSES.stand }); const k = zvK(s, 'needle'); ZS_DIAL.value = zsRamp(t, k, k + 0.6) * 0.6;
    zvCam(u, [[-0.4, 1.0, -1.65], [-1.15, 0.92, -2.2], 30], [[-0.55, 0.98, -1.75], [-1.15, 0.92, -2.2], 24]); ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.6, 0, ZS.at[2] + 0.2); } },
  { id: 's41', fn(t, u) { zvBasement(t, { theo: 'worried', dani: 'worried', bol: 'fear' }, { bol: ZS_POSES.scared }); ZS_DIAL.value = 1; ZS.baseKey.intensity = 22 * zvFlick(t, 9, 0.85);
    ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.6, 0, ZS.at[2] + 0.2); ZS.cast.bolacha.root.rotation.y = Math.PI - 0.4;
    zvCam(u, [[2.2, 1.6, 2.1], [-0.4, 1.0, -1.3], 44], [[2.0, 1.5, 1.8], [-0.4, 1.0, -1.4], 42]); } },
  { id: 's42', fn(t, u) { zvBasement(t, { theo: 'worried' }, { theo: zvSit('theo', 0.5, zsMix(ZS_POSES.sit, ZS_POSES.shrug, 0.4)) }); ZS_DIAL.value = 1; zvLookFace('theo', 1.05, -0.5, 0, 30, t); } },
  { id: 's43', fn(t, u) { zvBasement(t, { bol: 'fear' }, { bol: ZS_POSES.scared }); ZS_DIAL.value = 1; ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.6, 0, ZS.at[2] + 0.2); ZS.cast.bolacha.root.rotation.y = Math.PI - 0.4;
    const P = ZS.cast.bolacha, hp = new THREE.Vector3(); P.J.head.getWorldPosition(hp); const o = ZS.at, f = P.root.rotation.y, d = zsLerp(1.6, 0.8, zsEase(u));
    zsLook([hp.x - o[0] + Math.sin(f) * d, hp.y - o[1] + 0.05, hp.z - o[2] + Math.cos(f) * d], [hp.x - o[0], hp.y - o[1] + 0.05, hp.z - o[2]], 30); } },
  { id: 's44', fn(t, u) { zvBasement(t, { bol: 'terror', theo: 'fear', dani: 'fear' }, { bol: ZS_POSES.scared }); ZS_DIAL.value = 1; ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.6, 0, ZS.at[2] + 0.2); ZS.cast.bolacha.root.rotation.y = Math.PI - 0.4;
    zvLookFace('bolacha', 1.0, -0.4, -0.05, 34, t); } },
  { id: 's45', fn(t, u, s) { zvBasement(t, { bol: 'terror', theo: 'fear', dani: 'fear' }, { bol: ZS_POSES.cower, dani: ZS_POSES.scared }); ZS_DIAL.value = 1; ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.6, 0, ZS.at[2] + 0.2);
    ZS.baseKey.intensity = 22 * zvFlick(t, 15, 0.4);
    // something tall passes behind the high window
    const k = zvK(s, 'pass'), x = zsLerp(-0.2, 2.0, zsRamp(t, k - 0.2, k + 0.6)); if (t > k - 0.2 && t < k + 0.6) { const C = zsPut('chiado', [x, 0.6, -3.4], Math.PI / 2, ZS_CPOSES.hunch, t); ZS.chiado.fx(t, 0.3); }
    zvCam(u, [[-1.2, 1.2, 1.4], [0.6, 1.8, -2.4], 42], [[-1.0, 1.15, 1.2], [0.7, 1.85, -2.4], 40]); } },
  { id: 's46', fn(t, u) { zvBasement(t, { dani: 'skeptic', theo: 'worried' }, { dani: zsMix(ZS_POSES.handsHips, ZS_POSES.point, 0.4) }); ZS_DIAL.value = 0.5; zvLookFace('dani', 1.25, 0.3, 0, 32, t); } },
  { id: 's47', fn(t, u, s) { ZV.theoAtMic = true; zvBasement(t, { theo: 'angry' }, { theo: zvSit('theo', 0.5, { ...ZS_POSES.micDesk, j: { ...ZS_POSES.micDesk.j, sL: [-1.1, 0.2, 0.3], eL: [-0.6] } }) }); ZS_DIAL.value = 0.4;
    const k = zvK(s, 'rec'); ZS.cassette.children[1].position.y = 0.052 - (t > k ? 0.006 : 0);
    zvCam(u, [[-1.25, 1.15, -1.3], [-1.6, 0.8, -1.85], 30], [[-1.25, 1.1, -1.45], [-1.6, 0.8, -1.85], 26]); } },
  { id: 's48', fn(t, u) { zvBasement(t, { bol: 'fear', theo: 'worried', dani: 'worried' }, { bol: ZS_POSES.scared }); ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.6, 0, ZS.at[2] + 0.2); ZS.cast.bolacha.root.rotation.y = Math.PI + 0.3;
    zvCam(u, [[2.4, 1.7, 2.1], [0.0, 1.0, -1.0], 46], [[2.3, 1.75, 2.2], [0.0, 1.0, -1.0], 48]); } },
  { id: 's49', fn(t, u) { zvBasement(t, { theo: 'neutral', bol: 'worried' }, { theo: { j: { sR: [-1.2, 0, -0.2], eR: [-0.3], head: [0, 0.4, 0] }, f: [0.3, 0.7] }, bol: ZS_POSES.stand });
    ZS.cast.theo.root.position.set(ZS.at[0] + 0.0, 0, ZS.at[2] - 0.6); ZS.cast.theo.root.rotation.y = 0.9; ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.7, 0, ZS.at[2] - 0.1); ZS.cast.bolacha.root.rotation.y = -2.2;
    zsHold('walkie', ZS.cast.theo, 'R', [0, -0.08, 0.03], [0, 0, 0]); zvCam(u, [[-0.8, 1.5, 1.2], [0.35, 1.2, -0.4], 38], [[-0.6, 1.45, 1.0], [0.35, 1.2, -0.4], 36]); } },
  { id: 's50', fn(t, u) { zvBasement(t, { bol: 'worried' }, { bol: { j: { sL: [-0.7, 0.3, 0.2], eL: [-1.6], sR: [-0.4, 0, -0.2], eR: [-1.2] }, f: [0.7, 0.7] } });
    ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.7, 0, ZS.at[2] - 0.1); ZS.cast.bolacha.root.rotation.y = -2.2; zsHold('walkie', ZS.cast.bolacha, 'R', [0, -0.08, 0.03], [0, 0, 0]); zvLookFace('bolacha', 1.2, 0.3, 0, 32, t); } },
  { id: 's51', fn(t, u) { zvBasement(t, { dani: 'grin', bol: 'worried' }, { dani: ZS_POSES.handsHips, bol: ZS_POSES.stand }); ZS.cast.bolacha.root.position.set(ZS.at[0] + 0.7, 0, ZS.at[2] - 0.1); ZS.cast.bolacha.root.rotation.y = -2.2;
    zvCam(u, [[-0.4, 1.35, 1.2], [0.8, 1.25, -0.6], 34], [[-0.3, 1.35, 1.0], [0.8, 1.3, -0.7], 32]); } },

  // ===== COYLE =====
  { id: 's52', fn(t, u) { zsUse('street'); const C = zsPut('coyle', [3.0, 0, 4.9], -0.4, ZS_POSES.walkieTalk, t, 'calm'); zsHold('phone', C, 'R', [0, -0.05, 0.03], [0, 0, 0]);
    zvCam(u, [[1.0, 0.6, 1.6], [3.0, 1.6, 4.9], 40], [[1.3, 0.7, 1.9], [3.0, 1.65, 4.9], 36]); } },
  { id: 's53', fn(t, u) { zsUse('street'); const C = zsPut('coyle', [3.0, 0, 4.9], -0.4, ZS_POSES.walkieTalk, t, 'skeptic', { lookY: -0.4 }); zsHold('phone', C, 'R', [0, -0.05, 0.03], [0, 0, 0]); zvLookFace('coyle', 1.0, 0.5, 0.05, 32, t); } },
  { id: 's54', fn(t, u) { zsUse('street'); const turn = zsEase(u); const C = zsPut('coyle', [3.0, 0, 4.9], zsLerp(-0.4, Math.PI - 0.3, turn), ZS_POSES.walkieTalk, t, 'worried'); zsHold('phone', C, 'R', [0, -0.05, 0.03], [0, 0, 0]);
    zvCam(u, [[5.0, 1.7, 3.0], [3.0, 1.6, 4.9], 36], [[4.6, 1.7, 3.2], [3.0, 1.6, 4.9], 34]); } },
  { id: 's55', fn(t, u) { zsUse('street'); const C = zsPut('coyle', [3.0, 0, 4.9], Math.PI - 0.3, ZS_POSES.walkieTalk, t, 'worried'); zsHold('phone', C, 'R', [0, -0.05, 0.03], [0, 0, 0]);
    zvCam(u, [[0.6, 1.7, 6.2], [-2, 7, -60], 40], [[0.4, 1.7, 6.5], [-2, 8, -60], 38]); } },
  { id: 's56', fn(t, u) { zsUse('street'); const C = zsPut('coyle', [3.0, 0, 4.9], Math.PI - 0.3, ZS_POSES.walkieTalk, t, 'worried'); zsHold('phone', C, 'R', [0, -0.05, 0.03], [0, 0, 0]); zvLookFace('coyle', 1.0, -0.5, 0, 30, t); } },
  { id: 's57', fn(t, u) { zsUse('street'); const C = zsPut('coyle', [3.0, 0, 4.9], Math.PI - 0.6, ZS_POSES.walkieTalk, t, 'fear'); zsHold('phone', C, 'R', [0, -0.05, 0.03], [0, 0, 0]);
    zvCam(u, [[3.5, 1.7, 7.2], [3.0, 1.6, 4.9], 34], [[1.5, 3.0, 10.5], [0, 1.5, -7.5], 44]); } },

  // ===== RAY'S SHOP =====
  { id: 's58', fn(t, u, s) { zsUse('shop'); const on = zvK(s, 'on'); ZS_DIAL.value = t > on ? 1 : 0;
    const R = zsPut('ray_old', ZV_SHOP.ray, Math.PI / 2, zvSit('ray_old', 0.5, { ...ZS_POSES.sit, j: { ...ZS_POSES.sit.j, sR: [-0.9, 0, -0.2], eR: [-1.6] } }), t, t > on ? 'fear' : 'tired'); zsSeat(2, ZV_SHOP.ray, Math.PI / 2); zsHold('glassDrink', R, 'R', [0, -0.06, 0.04], [0, 0, 0]);
    if (t > on) R.root.rotation.y = zsLerp(Math.PI / 2, -0.4, zsRamp(t, on + 0.3, on + 1.2));
    zvCam(u, [[-1.6, 1.4, 1.6], [2.0, 1.0, -1.0], 40], [[-1.2, 1.35, 1.3], [2.0, 1.0, -1.0], 38]); } },
  { id: 's59', fn(t, u, s) { zsUse('shop'); const pl = zvK(s, 'plug'); ZS_DIAL.value = t < pl ? 1 : 0;
    const rp: Vec3 = zvL3(ZV_SHOP.ray, [-2.7, 0, -1.2], zsRamp(t, s.t0 + 0.6, pl - 0.6));
    zsPut('ray_old', rp, zvTo(rp, [-3.5, 0, -1.2]), t > pl - 0.6 ? ZS_POSES.pullPlug : zsWalk(t * 5, 0.7), t, 'fear', { lookX: 0.2 }, 'ray_old');
    zvCam(u, [[0.8, 1.6, 1.8], [-1.0, 1.3, -0.8], 42], [[0.0, 1.5, 1.4], [-2.6, 1.0, -1.2], 40]); } },
  { id: 's60', fn(t, u) { zsUse('shop'); const R = zsPut('ray_old', ZV_SHOP.ray, Math.PI / 2 - 0.3, zvSit('ray_old', 0.5, { ...ZS_POSES.sit, j: { ...ZS_POSES.sit.j, sR: [-0.5, 0, -0.2], eR: [-1.2], head: [0.25] } }), t, 'sad'); zsSeat(2, ZV_SHOP.ray, Math.PI / 2 - 0.3);
    zsHold('glassDrink', R, 'R', [0, -0.06, 0.04], [0, 0, 0]); zvLookFace('ray_old', 1.0, -0.7, 0.1, 32, t); } },

  // ===== REWIND VIDEO =====
  { id: 's61', fn(t, u) { zsUse('rewind'); const K = zsPut('kyle', ZV_RW.kyle, 1.3, { j: { sR: [-1.0, 0.2, -0.2], eR: [-1.0], sL: [-0.3, 0, 0.2], eL: [-0.6], head: [0.1, 0.2, 0] }, f: [0.4, 0.8] }, t, 'grin'); zsHold('cassette', K, 'R', [0, -0.07, 0.05], [1.4, 0, 0]);
    zsPut('jess', ZV_RW.jess, 0.2, ZS_POSES.armsCrossed, t, 'tired');
    zvCam(u, [[0.9, 1.6, -0.4], [-2.3, 1.5, -0.6], 38], [[0.5, 1.6, -0.5], [-2.3, 1.55, -0.6], 34]); } },
  { id: 's62', fn(t, u) { zsUse('rewind'); zsPut('jess', ZV_RW.jess, 0.6, ZS_POSES.armsCrossed, t, 'skeptic'); zsPut('kyle', ZV_RW.kyle, -2.0, ZS_POSES.relaxed, t, 'smile'); zvLookFace('jess', 1.3, 0.2, 0.02, 32, t); } },
  { id: 's63', fn(t, u) { zsUse('rewind'); const K = zsPut('kyle', ZV_RW.kyle, -2.3, zsMix(ZS_POSES.shrug, ZS_POSES.talkR, 0.5), t, 'grin'); zsHold('cassette', K, 'R', [0, -0.07, 0.05], [1.4, 0, 0]); zvLookFace('kyle', 1.3, 0.3, 0, 32, t); } },
  { id: 's64', fn(t, u) { zsUse('rewind'); zsPut('jess', ZV_RW.jess, 0.9, { ...ZS_POSES.relaxed, j: { ...ZS_POSES.relaxed.j, head: [0.1, -0.3, 0] } }, t, 'tired', { lookX: 0.4 });
    const P = ZS.cast.jess, hp = new THREE.Vector3(); P.J.head.getWorldPosition(hp); const o = ZS.at; zsLook([hp.x - o[0] + 0.9, hp.y - o[1], hp.z - o[2] + 0.7 - u * 0.2], [hp.x - o[0], hp.y - o[1], hp.z - o[2]], 30); } },
  { id: 's65', fn(t, u) { zsUse('rewind'); zsPut('kyle', [-1.6, 0, 0.9], -2.2, ZS_POSES.relaxed, t, 'smirk'); zsPut('jess', ZV_RW.jess, 0.9, ZS_POSES.relaxed, t, 'tired');
    zvCam(u, [[0.6, 1.6, 2.6], [-2.2, 1.4, 1.2], 40], [[0.4, 1.6, 2.6], [-2.2, 1.45, 1.2], 38]); } },
  { id: 's66', fn(t, u) { zsUse('rewind'); zsPut('jess', ZV_RW.jess, 0.7, ZS_POSES.armsCrossed, t, 'smirk'); zsPut('kyle', [-1.6, 0, 0.9], -2.2, ZS_POSES.relaxed, t, 'laugh'); zvLookFace('jess', 1.2, 0.4, 0, 32, t); } },
  { id: 's67', fn(t, u, s) { zsUse('rewind'); const k = zvK(s, 'tvs'); ZS_SCREEN.uStatic.value = t > k ? 1 : 0.15; ZS.tvLight.intensity = t > k ? 5 : 1;
    zsPut('kyle', [1.0, 0, -0.6], zsLerp(-2.2, 2.2, zsRamp(t, k + 0.2, k + 1.0)), ZS_POSES.relaxed, t, t > k ? 'worried' : 'calm');
    zvCam(u, [[2.0, 1.5, 1.8], [2.9, 1.2, -2.2], 44], [[2.1, 1.5, 1.5], [3.0, 1.2, -2.3], 40]); } },
  { id: 's68', fn(t, u) { zsUse('rewind'); ZS_SCREEN.uStatic.value = 1; ZS.tvLight.intensity = 5; zsPut('jess', ZV_RW.jess, 0.3, { ...ZS_POSES.relaxed, j: { ...ZS_POSES.relaxed.j, head: [0.3, 0, 0] } }, t, 'tired', { lookY: -0.5 }); zvLookFace('jess', 1.4, -0.3, 0.05, 32, t); } },
  { id: 's69', fn(t, u, s) { zsUse('rewind'); ZS_SCREEN.uStatic.value = 1; const f = zvK(s, 'figure'); ZS_SCREEN.uShape.value = zsRamp(t, f - 0.4, f + 0.6); ZS.tvLight.intensity = 5 + 2 * Math.sin(t * 20);
    const kp: Vec3 = zvL3([1.4, 0, -0.9], [0.4, 0, 0.3], zsRamp(t, f, s.t1)); zsPut('kyle', kp, 2.3, zsMix(ZS_POSES.relaxed, ZS_POSES.scared, zsRamp(t, f - 0.2, f + 0.5)), t, 'fear', {}, 'kyle');
    zvCam(u, [[0.2, 1.3, 0.6], [3.2, 1.25, -2.5], 34], [[1.2, 1.25, -0.6], [3.3, 1.2, -2.6], 30]); } },
  { id: 's70', fn(t, u) { zsUse('rewind'); ZS_SCREEN.uStatic.value = 1; ZS_SCREEN.uShape.value = 1; ZS.tvLight.intensity = 5; const J = zsPut('jess', ZV_RW.jess, 0.5, ZS_POSES.phone, t, 'worried'); zsHold('phone', J, 'R', [0, -0.05, 0.03], [0, 0, 0]);
    zvLookFace('jess', 1.1, 0.45, 0, 32, t); } },
  { id: 's71', fn(t, u) { zsUse('basement'); const T = zsPut('theo', [-0.2, 0, -1.0], 0.3, ZS_POSES.phone, t, 'worried'); zsHold('phone', T, 'R', [0, -0.05, 0.03], [0, 0, 0]); ZS_DIAL.value = 0.3; zvLookFace('theo', 1.1, 0.5, 0, 32, t); } },
  { id: 's72', fn(t, u) { zsUse('rewind'); ZS_SCREEN.uStatic.value = 1; ZS.tvLight.intensity = 5; const J = zsPut('jess', ZV_RW.jess, 0.6, ZS_POSES.phone, t, 'skeptic', { lookX: 0.5 }); zsHold('phone', J, 'R', [0, -0.05, 0.03], [0, 0, 0]);
    zsPut('kyle', [0.4, 0, 0.3], 2.4, ZS_POSES.scared, t, 'fear'); zvCam(u, [[-1.0, 1.6, 3.2], [-2.6, 1.5, 1.5], 40], [[-1.2, 1.6, 3.2], [-2.6, 1.5, 1.5], 38]); } },
  { id: 's73', fn(t, u) { zsUse('basement'); const T = zsPut('theo', [-0.2, 0, -1.0], 0.3, ZS_POSES.phone, t, 'fear'); zsHold('phone', T, 'R', [0, -0.05, 0.03], [0, 0, 0]); ZS_DIAL.value = 0.6;
    const P = ZS.cast.theo, hp = new THREE.Vector3(); P.J.head.getWorldPosition(hp); const o = ZS.at, d = zsLerp(1.4, 0.8, zsEase(u)); zsLook([hp.x - o[0] + 0.5 * d, hp.y - o[1], hp.z - o[2] + 0.85 * d], [hp.x - o[0], hp.y - o[1], hp.z - o[2]], 30); } },

  // ===== THE WOODS =====
  { id: 's74', fn(t, u, s) { zsUse('woods'); const w = zvWalk([0, 0, -26], [1.2, 0, 10], s.t0, t, 1.0); const B = zsPut('bolacha', w.p, w.face, zsAdd(w.pose, ZS_POSES.flashlight, 0.6), t, 'worried');
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 1);
    zvCam(u, [[-6, 3.0, -2], [0, 1.2, -24], 40], [[-5, 2.4, -6], [0, 1.2, -22], 38]); } },
  { id: 's75', fn(t, u, s) { zsUse('woods'); const w = zvWalk([0, 0, -26], [1.2, 0, 10], s.t0 - (s.t0 - ZV.t74), t, 1.0); const B = zsPut('bolacha', w.p, w.face, zsAdd(w.pose, ZS_POSES.flashlight, 0.6), t, 'worried');
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 1); zsLook([w.p[0] + 0.4, 1.5, w.p[2] + 2.6], [w.p[0], 1.35, w.p[2]], 36); } },
  { id: 's76', fn(t, u, s) { zsUse('woods'); const w = zvWalk([0, 0, -26], [1.2, 0, 10], ZV.t74, t, 1.0); const B = zsPut('bolacha', w.p, w.face, zsAdd(w.pose, ZS_POSES.walkieTalk, 0.5), t, 'worried');
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 1); zsLook([w.p[0] + 2.4, 1.3, w.p[2] + 0.6], [w.p[0], 1.3, w.p[2]], 34); } },
  { id: 's77', fn(t, u, s) { zsUse('woods'); const w = zvWalk([0, 0, -26], [1.2, 0, 10], ZV.t74, t, 1.0); const B = zsPut('bolacha', w.p, w.face, zsAdd(w.pose, ZS_POSES.walkieTalk, 0.6), t, 'skeptic');
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 1); zsLook([w.p[0] - 0.5, 1.5, w.p[2] + 1.3], [w.p[0], 1.42, w.p[2]], 32); } },
  { id: 's78', fn(t, u, s) { zsUse('woods'); const w = zvWalk([0, 0, -26], [1.2, 0, 10], ZV.t74, t, 1.0); const B = zsPut('bolacha', w.p, w.face + Math.sin(t * 3) * 0.1, zsAdd(w.pose, ZS_POSES.flashlight, 0.5), t, 'smile');
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 1); zvCam(u, [[w.p[0] + 3, 2.5, w.p[2] + 4], [w.p[0], 1.2, w.p[2]], 40], [[w.p[0] + 2, 2.0, w.p[2] + 3], [w.p[0], 1.2, w.p[2]], 38]); } },
  { id: 's79', fn(t, u, s) { zsUse('woods'); const p: Vec3 = ZV.bStop || [0.6, 0, -6]; const B = zsPut('bolacha', p, 0.05, ZS_POSES.walkieTalk, t, 'worried', { smile: -0.1 });
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 0.9); zsLook([p[0] + 0.6, 1.45, p[2] + 1.4], [p[0], 1.42, p[2]], 32); } },
  { id: 's80', fn(t, u, s) { zsUse('woods'); const p: Vec3 = ZV.bStop || [0.6, 0, -6]; const B = zsPut('bolacha', p, 0.05, ZS_POSES.walkieTalk, t, 'angry');
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 0.9); zsLook([p[0] - 0.7, 1.45, p[2] + 1.3], [p[0], 1.42, p[2]], 32); } },
  { id: 's81', fn(t, u, s) { zsUse('woods'); const p: Vec3 = ZV.bStop || [0.6, 0, -6]; const B = zsPut('bolacha', p, 0.05, ZS_POSES.flashlight, t, 'fear');
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 0.9);
    // behind him, between the trees: a tall silhouette, still
    zsPut('chiado', [p[0] - 2.5, 0, p[2] - 6], 0.3, ZS_CPOSES.hunch, t); ZS.chiado.fx(t, 0.15, 0.3);
    zvCam(u, [[p[0] + 1.5, 1.3, p[2] + 4.5], [p[0] - 1.2, 1.5, p[2] - 4], 34], [[p[0] + 1.3, 1.3, p[2] + 4.0], [p[0] - 1.6, 1.6, p[2] - 5], 32]); } },
  { id: 's82', fn(t, u, s) { zsUse('woods'); const p: Vec3 = ZV.bStop || [0.6, 0, -6]; const B = zsPut('bolacha', p, 0.05, ZS_POSES.walkieTalk, t, 'terror', { lookX: -0.6 });
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, 0.9); const P = ZS.cast.bolacha, hp = new THREE.Vector3(); P.J.head.getWorldPosition(hp); const o = ZS.at;
    zsLook([hp.x - o[0] + 0.15, hp.y - o[1], hp.z - o[2] + zsLerp(1.0, 0.65, zsEase(u))], [hp.x - o[0], hp.y - o[1], hp.z - o[2]], 30); } },
  { id: 's83', fn(t, u, s) { zsUse('woods'); const p: Vec3 = ZV.bStop || [0.6, 0, -6]; const off = zvK(s, 'off'); const B = zsPut('bolacha', p, 0.05, t < off ? ZS_POSES.walkieTalk : ZS_POSES.crouch, t, 'terror');
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]); zvFlash(B, t < off ? 0.9 : 0);
    zvCam(u, [[p[0] + 1.2, 0.9, p[2] + 1.8], [p[0], 1.1, p[2]], 36], [[p[0] + 1.0, 0.8, p[2] + 1.6], [p[0], 0.8, p[2]], 34], t, 0.01); } },
  { id: 's84', fn(t, u, s) { zsUse('woods'); const p: Vec3 = ZV.bStop || [0.6, 0, -6]; const ps = zvK(s, 'pass'), bp = zvK(s, 'beep');
    const B = zsPut('bolacha', p, 0.05, { ...ZS_POSES.crouch, j: { ...ZS_POSES.crouch.j, sL: [-1.6, 0.3, 0.3], eL: [-2.2], head: [-0.2] } }, t, 'terror', { lookX: Math.sin(t * 0.8) * 0.6, lid: -0.2 });
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]);
    // it comes out of the trees in stutters, passes right behind him, stops, the head turning; the beep snaps it to him
    const path = zvL3([p[0] - 4, 0, p[2] - 3], [p[0] + 0.9, 0, p[2] - 0.7], zsRamp(t, s.t0 + 0.5, ps)); const near: Vec3 = t < ps ? path : zvL3([p[0] + 0.9, 0, p[2] - 0.7], [p[0] + 3.5, 0, p[2] + 1.0], zsRamp(t, ps + 1.5, bp - 0.3));
    const back = t > bp ? 1 : 0; const cp = zvStutter(back ? zvL3(near, [p[0] + 1.2, 0, p[2] + 0.3], zsRamp(t, bp, bp + 0.4)) : near, t, 4);
    zsPut('chiado', cp, back ? zvTo(cp, p) : (t < ps ? zvTo(path, [p[0] + 2, 0, p[2]]) : 1.2 + Math.sin(t * 1.3) * 0.8), back ? ZS_CPOSES.reach : ZS_CPOSES.stalk, t);
    ZS.chiado.fx(t, back ? 1 : 0.35, 0.6);
    zvCam(u, [[p[0] - 1.8, 0.7, p[2] + 2.6], [p[0] + 0.3, 1.1, p[2] - 0.6], 42], [[p[0] - 1.5, 0.75, p[2] + 2.3], [p[0] + 0.5, 1.2, p[2] - 0.4], 40]); } },
  { id: 's85', fn(t, u, s) { zsUse('woods'); const p: Vec3 = ZV.bStop || [0.6, 0, -6]; const B = zsPut('bolacha', p, 0.05, { ...ZS_POSES.crouch, j: { ...ZS_POSES.crouch.j, sR: [-1.2, 0, -0.2], eR: [-1.6], head: [0.4] } }, t, 'terror', { lookY: -0.6 });
    zsHold('walkie', B, 'L', [0, -0.08, 0.03]); const P = ZS.cast.bolacha, hp = new THREE.Vector3(); P.J.head.getWorldPosition(hp); const o = ZS.at;
    zsPut('chiado', zvStutter([p[0] + 1.2, 0, p[2] + 0.3], t, 8), zvTo([p[0] + 1.2, 0, p[2] + 0.3], p), ZS_CPOSES.reach, t); ZS.chiado.fx(t, 1);
    zsLook([hp.x - o[0] - 0.6, hp.y - o[1] + 0.1, hp.z - o[2] + 0.9], [hp.x - o[0] + 0.3, hp.y - o[1] + 0.1, hp.z - o[2]], 38); } },
  { id: 's86', fn(t, u, s) { zsUse('woods'); const p0: Vec3 = ZV.bStop || [0.6, 0, -6]; const w = zvWalk(p0, [1.5, 0, 16], s.t0, t, 3.4, 1); const B = zsPut('bolacha', w.p, w.face, w.pose, t, 'scream', {}, 'bolacha');
    zsHold('flashlight', B, 'R'); zvFlash(B, 0.8); const cp = zvStutter([w.p[0] - 0.4, 0, w.p[2] - 2.6 - Math.sin(t * 2) * 0.6], t, 6, 2);
    zsPut('chiado', cp, zvTo(cp, w.p), ZS_CPOSES.reach, t); ZS.chiado.fx(t, 1, 2);
    zsLook([w.p[0] + 0.8, 1.2 + Math.sin(t * 9) * 0.05, w.p[2] + 3.2], [w.p[0], 1.3, w.p[2] - 1.0], 42); } },
  { id: 's87', fn(t, u, s) { zsUse('street'); const w = zvWalk([-14, 0, 7.5], [1.9, 0, -6.6], s.t0, t, 4.2, 1); zsPut('bolacha', w.p, w.face, w.pose, t, 'scream');
    zsLook([w.p[0] + 4.5, 1.8, w.p[2] + 4.0], [w.p[0], 1.2, w.p[2]], 40); } },

  // ===== THE FIGHT =====
  { id: 's88', fn(t, u, s) { zsUse('shop'); ZS.shopCeil.intensity = 4; const d = zvK(s, 'door'); const bp: Vec3 = zvL3([1.9, 0, 3.6], [1.0, 0, 1.2], zsRamp(t, d, d + 0.9));
    zsPut('bolacha', bp, Math.PI + 0.3, t < d + 0.9 ? zsWalk(t * 10, 1, 1) : ZS_POSES.scared, t, 'terror');
    zsPut('ray_old', ZV_SHOP.ray, zsLerp(Math.PI / 2, -2.4, zsRamp(t, d + 0.2, d + 0.8)), zsMix(ZS_POSES.stand, ZS_POSES.point, zsRamp(t, d + 0.8, d + 1.6)), t, 'angry');
    zvCam(u, [[-2.2, 1.6, -1.6], [1.4, 1.2, 1.6], 44], [[-2.0, 1.6, -1.8], [1.2, 1.2, 1.0], 42]); } },
  { id: 's89', fn(t, u) { zsUse('shop'); ZS.shopCeil.intensity = 4; const B = zsPut('bolacha', [1.0, 0, 1.2], Math.PI + 0.6, { j: { sR: [-0.7, 0, -0.3], eR: [-0.6], sL: [-0.5, 0, 0.3], eL: [-1.0] }, f: [0.6, 0.85] }, t, 'terror'); zsHold('walkie', B, 'R');
    zsPut('ray_old', ZV_SHOP.ray, -2.4, ZS_POSES.stand, t, 'worried'); zvLookFace('bolacha', 1.1, -0.4, 0, 34, t); } },
  { id: 's90', fn(t, u, s) { zsUse('shop'); const a = zvK(s, 'all'); ZS_DIAL.value = t > a ? 1 : 0; ZS.shopCeil.intensity = 4 * (t > a ? zvFlick(t, 14, 0.5) : 1);
    ZS.shopRadios.forEach((r: THREE.Object3D, i: number) => { r.rotation.z = t > a ? Math.sin(t * 40 + i) * 0.01 : 0; });
    zsPut('ray_old', [2.1, 0, -0.2], -2.4, ZS_POSES.stand, t, 'terror', { lookX: -0.4 }); zsPut('bolacha', [1.0, 0, 1.2], -2.6, ZS_POSES.scared, t, 'terror');
    zvCam(u, [[0.5, 1.7, 2.4], [-2.0, 1.5, -1.5], 44], [[0.9, 1.6, 2.1], [2.1, 1.65, -0.2], 34]); } },
  { id: 's91', fn(t, u, s) { zsUse('shop'); ZS_DIAL.value = 1; ZS.shopCeil.intensity = 4 * zvFlick(t, 14, 0.5); const ax = zvK(s, 'axe');
    const R = zsPut('ray_old', [2.9, 0, -0.5], zsLerp(Math.PI / 2, -2.0, zsRamp(t, ax + 0.4, ax + 1.0)), t < ax ? { j: { sR: [-2.4, 0, -0.3], eR: [-0.5], sL: [-1.0, 0, 0.3], eL: [-0.6] }, f: [0.4, 0.7] } : ZS_POSES.axeReady, t, 'shout');
    if (t > ax) { ZS.axeWall.visible = false; zsHold('axe', R, 'R', [0, -0.07, 0.02], [1.5, 0, 0]); }
    zsPut('bolacha', [0.8, 0, -1.9], Math.PI, ZS_POSES.pullPlug, t, 'fear');
    zvCam(u, [[-0.4, 1.4, 1.6], [2.6, 1.4, -0.6], 42], [[-0.2, 1.4, 1.4], [2.4, 1.3, -0.4], 40], t, 0.015); } },
  { id: 's92', fn(t, u, s) { zsUse('shop'); ZS_DIAL.value = 1; const g = zvK(s, 'glass'); ZS.shopCeil.intensity = 4 * zvFlick(t, 14, 0.5);
    if (t > g) { ZS.shopGlass.visible = false; ZS.shards.visible = true; const rnd = p3Rnd(7); const o = zsAt([-1.4, 1.5, 2.9]); const dt = t - g;
      for (let i = 0; i < 60; i++) { const vx = (rnd() - 0.5) * 3, vy = rnd() * 2, vz = -rnd() * 4 - 0.5, y = Math.max(0.03, o[1] + (rnd() - 0.5) * 2 + vy * dt - 4.9 * dt * dt); ZS.shards.put(i, o[0] + (rnd() - 0.5) * 3 + vx * dt, y, o[2] + vz * dt * (y > 0.03 ? 1 : 0.4), 1 + rnd() * 1.5, 1, 1, dt * 7 * rnd(), dt * 5, 0); } ZS.shards.done(); }
    const cp: Vec3 = zvL3([-1.4, 0, 4.2], [-1.2, 0, 1.8], zsRamp(t, g - 0.1, g + 0.4)); zsPut('chiado', cp, Math.PI, ZS_CPOSES.crawl, t); ZS.chiado.fx(t, 1, 2);
    zvCam(u, [[0.2, 0.6, -1.4], [-1.4, 1.2, 2.6], 44], [[0.1, 0.55, -1.6], [-1.4, 1.1, 2.4], 46], t, t > g ? 0.04 : 0.01); } },
  { id: 's93', fn(t, u, s) { zsUse('shop'); ZS_DIAL.value = 1; ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 3 * zvFlick(t, 12, 0.6); const r = zvK(s, 'rise');
    zsPut('chiado', zvStutter([-1.0, 0, 1.4], t, 6), -2.6, zsMix(ZS_CPOSES.crawl, ZS_CPOSES.shriek, zsRamp(t, r - 0.4, r + 0.5)), t); ZS.chiado.fx(t, 1, 1.5);
    const R = zsPut('ray_old', [1.6, 0, -0.6], -2.0, ZS_POSES.axeReady, t, 'rage'); zsHold('axe', R, 'R', [0, -0.07, 0.02], [1.5, 0, 0]);
    zvCam(u, [[-0.3, 0.35, -0.4], [-1.0, 2.0, 1.5], 46], [[-0.4, 0.3, -0.6], [-1.0, 2.3, 1.4], 48]); } },
  { id: 's94', fn(t, u, s) { zsUse('shop'); ZS_DIAL.value = 1; ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 3 * zvFlick(t, 12, 0.6); const c = zvK(s, 'chop');
    const rp: Vec3 = zvL3([1.6, 0, -0.6], [0.2, 0, 0.6], zsRamp(t, s.t0, c - 0.1));
    const R = zsPut('ray_old', rp, zvTo(rp, [-1.0, 0, 1.4]), zsTrack([[s.t0, ZS_POSES.axeReady], [c - 0.45, ZS_POSES.axeRaise], [c, ZS_POSES.axeChop], [c + 0.8, ZS_POSES.axeChop]], t), t, t < c ? 'rage' : 'shout', {}, 'ray_old');
    zsHold('axe', R, 'R', [0, -0.07, 0.02], [1.5, 0, 0]);
    const cp: Vec3 = [-0.8 + (t > c ? Math.min(0.5, (t - c) * 1.5) * -1 : 0), 0, 1.4]; const C = zsPut('chiado', cp, zvTo(cp, rp), t > c ? zsMix(ZS_CPOSES.shriek, ZS_CPOSES.convulse, 0.4) : ZS_CPOSES.stalk, t); ZS.chiado.fx(t, t > c && t < c + 0.3 ? 1.6 : 1, 1.5);
    zvSparks([-0.5, 1.6, 1.3], c, t, 40);
    zvCam(u, [[2.0, 1.4, 2.4], [-0.4, 1.4, 0.8], 40], [[1.6, 1.3, 2.2], [-0.6, 1.4, 1.0], 38], t, t > c && t < c + 0.4 ? 0.07 : 0.02); } },
  { id: 's95', fn(t, u, s) { zsUse('shop'); ZS_DIAL.value = 1; ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 3 * zvFlick(t, 12, 0.6); const sw = zvK(s, 'swipe'), th = zvK(s, 'thud');
    const fly = zsRamp(t, sw, th); const rp: Vec3 = zvL3([0.2, 0, 0.6], [2.9, 0, -2.4], fly);
    const R = zsPut('ray_old', rp, zvTo(rp, [-1, 0, 1.4]), t < sw ? ZS_POSES.axeReady : t < th ? ZS_POSES.hitBack : ZS_POSES.fallen, t, 'pain'); R.root.position.y = Math.sin(Math.PI * fly) * 0.6 + ZS.at[1];
    if (t < th) zsHold('axe', R, 'R', [0, -0.07, 0.02], [1.5, 0, 0]);
    zsPut('chiado', [-0.6, 0, 1.2], zvTo([-0.6, 0, 1.2], [0.2, 0, 0.6]), t < sw ? ZS_CPOSES.stalk : ZS_CPOSES.swipe, t); ZS.chiado.fx(t, 1, 2);
    ZS.shopRadios.forEach((r: THREE.Object3D, i: number) => { if (i > 20 && i < 30 && t > th) { r.position.y = Math.max(r.position.y - 0, 0.52 + Math.floor((i % 4)) * 0.6 - Math.min(1, (t - th) * 2) * 0.5); r.rotation.z = Math.min(1, (t - th) * 3) * 0.6; } });
    zvCam(u, [[-1.2, 1.4, 1.8], [1.2, 1.1, -0.6], 44], [[-1.0, 1.3, 1.6], [2.3, 0.8, -2.0], 44], t, t > th && t < th + 0.5 ? 0.07 : 0.02); } },
  { id: 's96', fn(t, u) { zsUse('shop'); ZS_DIAL.value = 1; ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 3 * zvFlick(t, 12, 0.6);
    zsPut('ray_old', [2.9, 0, -2.4], -0.88, ZS_POSES.fallen, t, 'pain');
    const cp = zvStutter(zvL3([-0.6, 0, 1.2], [0.2, 0, -1.0], zsEase(u)), t, 5); zsPut('chiado', cp, zvTo(cp, [0.8, 0, -2.2]), ZS_CPOSES.stalk, t); ZS.chiado.fx(t, 1);
    zsPut('bolacha', [0.8, 0, -2.4], 0.3, ZS_POSES.cower, t, 'terror');
    zvCam(u, [[1.3, 0.5, -2.8], [-0.3, 1.6, 0.6], 44], [[1.2, 0.5, -2.8], [0.1, 1.8, -0.4], 46]); } },
  { id: 's97', fn(t, u) { zsUse('shop'); ZS_DIAL.value = 1; ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 3 * zvFlick(t, 12, 0.6);
    zsPut('ray_old', [2.9, 0, -2.4], -0.88, { ...ZS_POSES.fallen, j: { ...ZS_POSES.fallen.j, head: [-0.5, -0.2, 0], sR: [-1.4, 0, -0.3], eR: [-0.2] } }, t, 'shout'); zvLookFace('ray_old', 0.9, 0.3, 0.15, 36, t); } },
  { id: 's98', fn(t, u, s) { zsUse('shop'); const pl = zvK(s, 'plug'); ZS_DIAL.value = t < pl ? 1 : 0.15; ZS.shopGlass.visible = false; ZS.shopCeil.intensity = t < pl ? 3 * zvFlick(t, 12, 0.6) : 0.6;
    zsPut('bolacha', [0.8, 0, -2.4], Math.PI, t < pl - 0.3 ? ZS_POSES.pullPlug : zsMix(ZS_POSES.pullPlug, ZS_POSES.hitBack, zsRamp(t, pl - 0.3, pl + 0.2)), t, 'shout', {}, 'bolacha');
    zsPut('chiado', [0.2, 0, -1.0], zvTo([0.2, 0, -1.0], [0.8, 0, -2.4]), t < pl ? ZS_CPOSES.reach : ZS_CPOSES.hunch, t); ZS.chiado.fx(t, t < pl ? 1 : 0.4); ZS.chiado.root.visible = t < pl || zvFlick(t, 40, 0.6) > 0.5;
    ZS.plugs[3].position.z = zsAt([0, 0, t > pl ? -2.0 : -2.2])[2];
    zvCam(u, [[1.9, 0.9, -1.0], [0.6, 0.6, -2.2], 40], [[1.8, 0.9, -1.2], [0.6, 0.7, -2.2], 38], t, t > pl && t < pl + 0.4 ? 0.05 : 0.01); } },
  { id: 's99', fn(t, u) { zsUse('shop'); ZS_DIAL.value = 0.2; ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 0.6;
    const cp = zvStutter([0.4, 0, -1.6], t, 4); zsPut('chiado', cp, zvTo(cp, [0.8, 0, -2.4]), ZS_CPOSES.reach, t); ZS.chiado.fx(t, 0.8);
    zsPut('bolacha', [0.8, 0, -2.5], 2.6, ZS_POSES.cower, t, 'scream', {}, 'bolacha');
    zsPut('ray_old', [2.9, 0, -2.4], -0.88, ZS_POSES.fallen, t, 'pain');
    zvCam(u, [[-1.4, 1.2, -0.6], [0.6, 1.0, -2.2], 40], [[-1.2, 1.1, -0.9], [0.6, 1.0, -2.2], 38], t, 0.015); } },
  { id: 's100', fn(t, u, s) { zsUse('shop'); ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 0.6; ZS_DIAL.value = 0.2; const d = zvK(s, 'door');
    const dp: Vec3 = zvL3([1.9, 0, 3.8], [1.4, 0, 1.6], zsRamp(t, d, d + 0.8)), tp: Vec3 = zvL3([2.4, 0, 4.2], [2.2, 0, 2.2], zsRamp(t, d + 0.2, d + 1.0));
    const D = zsPut('dani', dp, Math.PI - 0.2, t < d + 0.8 ? zsWalk(t * 11, 1, 1) : ZS_POSES.skateSwing, t, 'shout', {}, 'dani'); zsHold('skate', D, 'R', [0, -0.1, 0.05], [0, 0, 1.4]);
    zsPut('theo', tp, Math.PI - 0.4, t < d + 1.0 ? zsWalk(t * 10, 1, 1) : ZS_POSES.scared, t, 'fear');
    zvCam(u, [[-0.6, 1.3, -1.4], [1.6, 1.3, 2.4], 42], [[-0.4, 1.3, -1.2], [1.5, 1.25, 1.8], 40]); } },
  { id: 's101', fn(t, u, s) { zsUse('shop'); ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 0.6; ZS_DIAL.value = 0.3; const h = zvK(s, 'hit');
    const D = zsPut('dani', [0.9, 0, 0.6], zvTo([0.9, 0, 0.6], [0.3, 0, -1.0]), zsTrack([[s.t0, ZS_POSES.skateSwing], [h - 0.05, ZS_POSES.skateSwing], [h + 0.1, ZS_POSES.skateHit], [h + 1, ZS_POSES.skateHit]], t), t, 'rage'); zsHold('skate', D, 'R', [0, -0.1, 0.05], [0, 0, 1.4]);
    const C = zsPut('chiado', [0.3, 0, -1.0], zvTo([0.3, 0, -1.0], [0.9, 0, 0.6]) + (t > h ? Math.min(1, (t - h) * 4) * 1.2 : 0), t > h ? zsMix(ZS_CPOSES.shriek, ZS_CPOSES.convulse, 0.3) : ZS_CPOSES.stalk, t); ZS.chiado.fx(t, 1, 1.5);
    zvCam(u, [[2.4, 1.5, -0.4], [0.5, 1.5, -0.2], 40], [[2.2, 1.5, -0.6], [0.4, 1.6, -0.4], 38], t, t > h && t < h + 0.4 ? 0.08 : 0.015); } },
  { id: 's102', fn(t, u, s) { zsUse('shop'); ZS.shopGlass.visible = false; ZS.shopCeil.intensity = 0.6; ZS_DIAL.value = 0.3;
    const T = zsPut('theo', [1.9, 0, 1.4], zvTo([1.9, 0, 1.4], [0.3, 0, -1.0]), ZS_POSES.holdUp, t, 'rage', {}, 'theo'); zsHold('cassette', T, 'R', [0, -0.08, 0.06], [1.4, 0, 0]);
    zsPut('chiado', zvStutter([0.3, 0, -1.0], t, 5), zvTo([0.3, 0, -1.0], [1.9, 0, 1.4]), ZS_CPOSES.reach, t); ZS.chiado.fx(t, 1);
    zvLookFace('theo', 1.3, -1.0, -0.05, 36, t); } },
  { id: 's103', fn(t, u, s) { zsUse('shop'); ZS.shopGlass.visible = false; const fb = zvK(s, 'fb'), sp = zvK(s, 'spark'); ZS_DIAL.value = t > fb ? 1 : 0.3; ZS.shopCeil.intensity = t > fb ? 3 * zvFlick(t, 30, 0.1) : 0.6;
    const C = zsPut('chiado', zvStutter([0.3, 0, -1.0], t, 14, 2.5), 0.9 + Math.sin(t * 13) * 0.3, t > fb ? ZS_CPOSES.convulse : ZS_CPOSES.reach, t); ZS.chiado.fx(t, t > fb ? 1.8 : 1, 3);
    zvSparks([0.3, 1.8, -1.0], sp, t, 60);
    const T = zsPut('theo', [1.9, 0, 1.4], zvTo([1.9, 0, 1.4], [0.3, 0, -1.0]), ZS_POSES.holdUp, t, 'rage'); zsHold('cassette', T, 'R', [0, -0.08, 0.06], [1.4, 0, 0]);
    zsPut('dani', [1.0, 0, 0.9], zvTo([1.0, 0, 0.9], [0.3, 0, -1.0]), ZS_POSES.scared, t, 'fear');
    const P = ZS.chiado, hp = new THREE.Vector3(); P.J.head.getWorldPosition(hp); const o = ZS.at;
    zvCam(u, [[1.6, 1.0, 1.2], [hp.x - o[0], hp.y - o[1], hp.z - o[2]], 40], [[1.0, 1.4, 0.4], [hp.x - o[0], hp.y - o[1], hp.z - o[2]], 34], t, t > fb ? 0.05 : 0.02); } },
  { id: 's104', fn(t, u, s) { zsUse('shop'); ZS.shopGlass.visible = false; const out = zvK(s, 'out'), dk = zvK(s, 'dark');
    ZS_DIAL.value = t < dk ? 1 : 0; ZS.shopCeil.intensity = t < dk ? 2 * zvFlick(t, 25, 0.2) : 0; ZS.benchLamp.intensity = t < dk ? 18 : 0; ZS.shopNeon.intensity = t < dk ? 5 : 0;
    // it folds into the broken window and up the power line: a streak of sparks along the wire
    const cp: Vec3 = zvL3([0.3, 0, -1.0], [-1.4, 0.4, 3.4], zsRamp(t, out - 0.6, out + 0.2)); if (t < out + 0.3) { zsPut('chiado', zvStutter(cp, t, 10, 3), zvTo(cp, [-1.4, 0, 3.4]), ZS_CPOSES.crawl, t); ZS.chiado.fx(t, 1.4, 3); }
    zvSparks([-1.4, 2.0, 3.2], out, t, 80); zvSparks([-1.4, 2.8, 4.2], out + 0.5, t, 60);
    zsPut('theo', [1.9, 0, 1.4], -2.6, ZS_POSES.scared, t, 'fear'); zsPut('dani', [1.0, 0, 0.9], -2.8, ZS_POSES.scared, t, 'fear');
    zvCam(u, [[1.6, 1.6, -1.4], [-1.4, 1.4, 2.8], 44], [[1.4, 1.6, -1.6], [-1.4, 1.8, 3.0], 42]); } },

  // ===== AFTERMATH =====
  { id: 's105', fn(t, u) { zvAfter(t, { bol: 'worried' }); zvCam(u, [[-0.4, 0.9, 0.9], [1.6, 0.9, -1.8], 42], [[-0.2, 0.9, 0.7], [1.6, 0.9, -1.8], 40]); } },
  { id: 's106', fn(t, u) { zvAfter(t, { dani: 'smirk', bol: 'skeptic' }); zvLookFace('dani', 1.1, 0.3, 0.05, 34, t); } },
  { id: 's107', fn(t, u) { zvAfter(t, { theo: 'worried' }); zvLookFace('theo', 1.1, -0.3, 0.05, 34, t); } },
  { id: 's108', fn(t, u) { zvAfter(t, { ray: 'sad' }); zvLookFace('ray_old', zsLerp(1.2, 0.8, zsEase(u)), 0.4, 0.05, 32, t); } },
  { id: 's109', fn(t, u) { zvAfter(t, { dani: 'worried' }); zvLookFace('dani', 1.0, -0.2, 0.05, 32, t); } },
  { id: 's110', fn(t, u) { zvAfter(t, { ray: 'tired' }); zvLookFace('ray_old', 0.85, -0.3, 0.05, 30, t); } },
  { id: 's111', fn(t, u) { zvAfter(t, { theo: 'angry' }, true); zvCam(u, [[0.4, 1.0, 0.2], [1.8, 1.0, -1.5], 36], [[0.6, 1.0, 0.0], [1.8, 1.0, -1.5], 34]); } },
  { id: 's112', fn(t, u) { zvAfter(t, { ray: 'angry' }); zvLookFace('ray_old', 0.9, 0.5, 0.05, 32, t); } },
  { id: 's113', fn(t, u) { zvAfter(t, { dani: 'angry', theo: 'calm' }); zvLookFace('dani', 0.9, 0.0, 0.05, 32, t); } },
  { id: 's114', fn(t, u) { zvAfter(t, { bol: 'smirk', dani: 'skeptic', theo: 'smirk', ray: 'tired' }); zvCam(u, [[-0.8, 1.5, 0.9], [1.6, 0.9, -1.6], 44], [[-1.2, 1.7, 1.3], [1.6, 0.9, -1.6], 46]); } },
  { id: 's115', fn(t, u) { zsUse('street'); for (const k of Object.keys(ZS.signs)) (ZS.signs[k] as THREE.Mesh).visible = k !== 'shop';
    const C = zsPut('coyle', [-1.0, 0, -4.8], Math.PI, ZS_POSES.walkieTalk, t, 'calm'); zsHold('phone', C, 'R', [0, -0.05, 0.03], [0, 0, 0]);
    zvCam(u, [[-2.2, 1.7, -2.6], [-1.0, 1.6, -4.8], 34], [[-1.8, 1.7, -3.0], [-1.0, 1.65, -4.8], 30]); } },
  { id: 's116', fn(t, u, s) { zsUse('basement'); const g = zvK(s, 'glow'); ZS_DIAL.value = zsRamp(t, g, g + 1.0); ZS.baseKey.intensity = 0;
    zsPut('theo', [-2.1, 0, 1.1], Math.PI - 0.5, ZS_POSES.stand, t, 'fear');
    zvCam(u, [[1.6, 1.4, 2.0], [-1.3, 1.1, -0.9], 46], [[1.3, 1.35, 1.6], [-1.3, 1.05, -1.0], 42]); } },
  { id: 's117', fn(t, u) { zsUse('basement'); ZS_DIAL.value = 1; ZS.baseKey.intensity = 0; zsPut('theo', [-2.1, 0, 1.1], Math.PI - 0.5, ZS_POSES.scared, t, 'terror', {}, 'theo'); zvLookFace('theo', 0.95, 0.4, 0, 32, t); } },
  { id: 's118', fn(t, u, s) { zsUse('basement'); ZS_DIAL.value = 1; ZS.baseKey.intensity = 0; const c = zvK(s, 'cut');
    zvCam(u, [[-1.0, 1.0, -1.4], [-1.15, 0.9, -2.2], 30], [[-1.1, 0.95, -1.85], [-1.15, 0.9, -2.2], 20]); if (t > c) { ZS_DIAL.value = 0; ZS.sets.basement.visible = false; } } },
];
// the aftermath in the dark shop: a flashlight on the floor, Ray against the shelves, the kids around him
const zvAfter = (t: number, ex: { theo?: string; dani?: string; bol?: string; ray?: string }, cassette = false) => {
  zsUse('shop'); ZS.shopGlass.visible = false; ZS.benchLamp.intensity = 0; ZS.shopNeon.intensity = 2; ZS.shopCeil.intensity = 0; ZS_DIAL.value = 0;
  ZS.flash.l.intensity = 0;   // (the woods flashlight isn't in this set)
  ZS.shopCeil.position.set(1.2, 0.3, -1.0); ZS.shopCeil.intensity = 3.5; ZS.shopCeil.color.set('#fff1d0');
  zsPut('ray_old', [2.6, 0, -2.1], -2.4, zvSit('ray_old', 0.0, { ...ZS_POSES.sit, j: { ...ZS_POSES.sit.j, hL: [-1.2, 0, 0.3], kL: [0.9], hR: [-0.6, 0, -0.2], kR: [0.5], spine: [-0.2], head: [0.1] } }), t, ex.ray || 'tired');
  zsPut('bolacha', [1.0, 0, -0.9], 2.2, zvSit('bolacha', 0.0, { ...ZS_POSES.sit, j: { ...ZS_POSES.sit.j, hL: [-1.4, 0, 0.3], kL: [2.0], hR: [-1.4, 0, -0.3], kR: [2.0], sL: [-0.9, 0, 0.2], eL: [-0.6], sR: [-0.9, 0, -0.2], eR: [-0.6] } }), t, ex.bol || 'worried');
  zsPut('dani', [1.6, 0, -0.2], -2.8, ZS_POSES.crouch, t, ex.dani || 'worried');
  const T = zsPut('theo', [2.0, 0, -0.6], -2.2, cassette ? ZS_POSES.holdUp : ZS_POSES.relaxed, t, ex.theo || 'worried'); if (cassette) zsHold('cassette', T, 'R', [0, -0.08, 0.06], [1.4, 0, 0]);
};
ZV.skate = (P: ZsPerson) => { const sk: THREE.Object3D = ZS.props.skate; sk.visible = true; if (sk.parent !== ZS.st.scene) ZS.st.scene.add(sk); sk.position.set(P.root.position.x, 0.09, P.root.position.z); sk.rotation.set(0, P.root.rotation.y, 0); };

// the shots share the world built in world3d.ts
p3Shots(ZV_SHOTS, (w) => { const st = zsBuild(w); ZS.lines = ZS_LINES; return st; }, (t, u, shot, s) => {
  zvReset(t); ZV.theoAtMic = false;
  ZV.t74 = SCENES.scenes.find((x) => x.id === 's74')!.t0;
  // where Bolacha stops on the path (the end of his walk when the singing is interrupted)
  if (!ZV.bStop) { const w = zvWalk([0, 0, -26], [1.2, 0, 10], ZV.t74, SCENES.scenes.find((x) => x.id === 's79')!.t0, 1.0); ZV.bStop = w.p; }
  if (ZS.shopCeil) { ZS.shopCeil.position.set(0, 2.9, 0); ZS.shopCeil.color.set('#ffe2b0'); }
  ZS.shopNeon.intensity = 5;
  shot.fn(t, u, s);
});
