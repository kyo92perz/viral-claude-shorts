// TURNO DA MADRUGADA, ep. 3: O Que Ficou na Mina. Shared world (world-cartoon.ts, copied from episode 1 with this
// episode's prefix). Store interior at x = 100 (counter x 103.6-107.2 / z 1.6-2.8, coolers' glass at z -4.18);
// mine entrance at (-150, -80); the station's lot at the origin.
const e3K = (s: Scene, id: string, f: number) => s.keys?.find((k) => k.id === id)?.t ?? f;
const e3Talk = (t: number, a: t3_Expr, b: t3_Expr, on = true) => (on && Math.floor(t * 7) % 2 ? b : a);
type e3St = ReturnType<typeof CT.stage>;
const e3Int = (t: number, bad = 0.1) => { const st = T3_.st!; st.light('store', { view: [0, -1] }); t3_lights({ store: t3_flick(t, bad), gen: 1, t }); return st; };
const e3Red = (t: number) => { const st = T3_.st!; st.light('emergency', { view: [0, -1] }); t3_lights({ store: 0.12 * t3_flick(t, 0.5), red: 0.6 + 0.4 * Math.abs(Math.sin(t * 3)), t }); return st; };
const e3Night = (t: number, cop: t3_V3, copOn = 1) => { const st = T3_.st!; st.light('night', { view: [0.3, -1] }); t3_lights({ store: t3_flick(t, 0.1), gen: 1, cop: copOn, t }); T3_.cop!.position.set(...cop); return st; };
const e3Look = (st: e3St, a: t3_V3, b: t3_V3, ta: t3_V3, tb: t3_V3, u: number, fov = 40, roll = 0, shake: t3_V3 = [0, 0, 0]) =>
  st.look(t3_add(t3_lerp3(a, b, t3_ease(u)), shake), t3_add(t3_lerp3(ta, tb, t3_ease(u)), shake), fov, roll);
const e3Fc = (st: e3St, a: t3_V3, b: t3_V3): 1 | -1 => { const r = new THREE.Vector3().setFromMatrixColumn(st.cam.matrixWorld, 0); return (b[0] - a[0]) * r.x + (b[2] - a[2]) * r.z >= 0 ? 1 : -1; };
const e3At = (st: e3St, id: number, who: string, at: t3_V3, to: t3_V3, P: t3_Pose, t: number, k = 1, extra: t3_Pose = {}) => t3_rig(st, id, who, at, t3_face(P, e3Fc(st, at, to), extra), t, k);
const e3Walk = (t: number, base: t3_Pose = T3_P.stand, sp = 1.6, amp = 1): t3_Pose => {
  const w = Math.sin(t * sp * Math.PI * 2) * amp;
  return { ...base, legL: [-16 * w - 2, -4 * w + Math.max(0, w) * 14], legR: [16 * w + 2, 4 * w + Math.max(0, -w) * 14], hip: [0, (base.hip?.[1] ?? 0) - 4 * Math.abs(w)] };
};
/** closing darkness at the frame edges (Lola losing consciousness): a big black ring right in front of the lens */
const e3Vignette = (st: e3St, k: number) => {
  const a = Math.round(Math.min(1, Math.max(0, k)) * 10) / 10; if (a <= 0) return;
  const c = st.cam, f = new THREE.Vector3(); c.getWorldDirection(f);
  st.card({ key: `e3-vig-${a}`, cw: 256, ch: 456, at: [c.position.x + f.x * 0.35, c.position.y + f.y * 0.35, c.position.z + f.z * 0.35], w: 0.32, h: 0.57, soft: true, draw: (p) => {
    const g = p.g, gr = g.createRadialGradient(128, 228, 40 + 80 * (1 - a), 128, 228, 260); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, `rgba(0,0,0,${0.97 * a})`); g.fillStyle = gr; g.fillRect(0, 0, 256, 456);
  } });
};
const E3_L: t3_V3 = [104.4, 0, -3.85], E3_D: t3_V3 = [105.75, 0, -3.5];

CT.shots([
  // ---- 1987: the mine (flashback, night) ----
  { id: 'f01', fn(t: number, u: number) {
    const st = e3Int(t, 0.05);
    e3Look(st, [104.6, 1.45, 1.5], [104.6, 1.45, 1.8], [104.6, 1.38, 3.4], [104.6, 1.4, 3.4], u, 38);
    t3_rig(st, 3, 'earlSick', [104.6, 0, 3.4], { ...T3_P.stand, facing: 0, expr: e3Talk(t, 'pained', 'stern'), head: -5 }, t);
  } },
  { id: 'f02', fn(t: number, u: number) {
    const st = e3Night(t, [-200, 0, 0], 0);
    e3Look(st, [-147, 1.6, -66], [-148, 1.7, -70], [-150, 1.6, -80], [-150, 1.7, -80], u, 40);
    for (let i = 0; i < 4; i++) t3_rig(st, 40 + i, i % 2 ? 'miner' : 'miner2', [-152 + i * 1.3, 0, -77.5 - (i % 2) * 0.6], t3_face(e3Walk(t + i, T3_P.stand, 0.8, 0.5), i < 2 ? 1 : -1, { expr: 'neutral' }), t, 0.95);
    t3_fog(st, t, [-150, 0, -74], 8, 8, 0.4);
  } },
  { id: 'f03', fn(t: number, u: number, s: Scene) {
    const st = e3Night(t, [-200, 0, 0], 0), k = e3K(s, 'knock', s.t0 + 3);
    e3Look(st, [-148.5, 1.5, -73.5], [-148.8, 1.5, -74.2], [-150.4, 1.3, -79.0], [-150.4, 1.35, -79.0], u, 42, -3);
    t3_rig(st, 3, 'earlYoung', [-151.2, 0, -78.6], t3_face({ ...T3_P.swing, prop: { kind: 'crowbar', hand: 'R', ang: 100 } }, 1, { expr: 'pained' }), t);
    for (let j = 0; j < 3; j++) { const kj = k + j * 0.32; if (t > kj && t < kj + 0.6) t3_knock(st, [-149.6, 1.5, -79.6], (t - kj) / 0.6); }
    if (t > s.t0 + 0.3 && t < s.t0 + 1.5) st.effect('puff', [-150, 1.0, -79.5], 2.6, (t - s.t0 - 0.3) / 1.2);
  } },
  // ---- back in the store ----
  { id: 'f04', fn(t: number, u: number) {
    const st = e3Int(t);
    e3Look(st, [105.6, 1.45, 1.8], [105.6, 1.45, 2.0], [105.6, 1.38, 3.5], [105.6, 1.4, 3.5], u, 36);
    t3_rig(st, 2, 'tobby', [105.6, 0, 3.5], { ...T3_P.stand, facing: 0, expr: 'pained', head: -8 }, t);
  } },
  { id: 'f05', fn(t: number, u: number) {
    const st = e3Int(t);
    e3Look(st, [105.1, 1.5, -0.6], [105.1, 1.5, -0.3], [105.1, 1.3, 3.45], [105.1, 1.32, 3.45], u, 50);
    const E: t3_V3 = [104.5, 0, 3.4], T: t3_V3 = [105.7, 0, 3.5];
    e3At(st, 3, 'earlSick', E, T, T3_P.relax, t, 1, { expr: e3Talk(t, 'pained', 'stern') });
    e3At(st, 2, 'tobby', T, E, T3_P.stand, t, 1, { expr: 'pained', head: -8 });
  } },
  { id: 'f06', fn(t: number, u: number, s: Scene) {
    const st = e3Int(t, 0.2), d = e3K(s, 'drop', s.t0 + 2.2);
    e3Look(st, [104.8, 1.6, -3.6], [104.8, 1.6, -3.4], [104.8, 1.35, 1.0], [104.8, 1.45, 1.0], u, 58, 0, t3_shake(t, d, 0.12));
    const fall = Math.max(0, 3.2 * (1 - t3_ease((t - (d - 0.35)) / 0.35)));
    t3_rig(st, 1, 'lola', [103.7, 0, 0.9], t3_face(t < d ? T3_P.relax : T3_P.guard, 1, { expr: t < d ? 'neutral' : 'shock' }), t, 0.95);
    t3_rig(st, 3, 'earlSick', [105.0, 0, 1.6], t3_face(T3_P.relax, -1, { expr: t < d ? 'pained' : 'shock' }), t, 0.95);
    t3_rig(st, 2, 'tobby', [105.9, 0, 1.0], t3_face(t < d ? T3_P.stand : T3_P.scared, -1, { expr: t < d ? 'pained' : 'shock' }), t, 0.95);
    if (t > d - 0.4) t3_rig(st, 4, 'daleBeast', [104.5, fall, 0.2], { ...(t < d + 0.25 ? T3_P.crouch : T3_P.stand), facing: 0, maw: 0.7 }, t, 1.18);
    if (t > d && t < d + 0.7) st.effect('puff', [104.5, 0.3, 0.2], 2.0, (t - d) / 0.7);
  } },
  { id: 'f07', fn(t: number, u: number, s: Scene) {
    const st = e3Int(t, 0.4), r = e3K(s, 'reveal', s.t0 + 1);
    e3Look(st, [104.5, 0.5, -2.4], [104.5, 0.55, -2.1], [104.5, 1.7, 0.2], [104.5, 1.8, 0.2], u, 52, 4);
    t3_rig(st, 4, 'daleBeast', [104.5, 0, 0.2], { ...T3_P.stand, armL: [-40, -20], armR: [40, 20], facing: 0, maw: t > r ? 0.9 : 0.4, head: 6 * Math.sin(t * 2), blood: 0.5 }, t, 1.18);
  } },
  { id: 'f08', fn(t: number, u: number, s: Scene) {
    const st = e3Int(t, 0.3), sl = e3K(s, 'slap', s.t0 + 1.4);
    e3Look(st, [104.6, 1.45, -3.0], [104.6, 1.45, -2.8], [104.6, 1.15, 0.6], [104.6, 1.1, 0.6], u, 56, 0, t3_shake(t, sl, 0.1));
    const E: t3_V3 = [103.6 - 0.9 * t3_ease((t - sl) / 0.35), 0, 0.8], D: t3_V3 = [104.7, 0, 0.4], L: t3_V3 = [105.8, 0, 0.4];
    const PD = t3_seq(t, [[s.t0, 'windup'], [sl, 'swing', { torso: 30 }], [sl + 0.5, 'lunge']], 0.15);
    e3At(st, 4, 'daleBeast', D, t < sl + 0.4 ? E : L, PD, t, 1.18, { maw: 0.8, blood: 0.5 });
    e3At(st, 3, 'earlSick', E, D, t < sl ? T3_P.guard : T3_P.down, t, 1, { expr: 'pained' });
    e3At(st, 1, 'lola', L, D, T3_P.guard, t, 1, { expr: 'stern', blood: 0.3 });
    if (t > sl && t < sl + 0.5) { st.effect('burst', [103.8, 1.4, 0.8], 0.9, (t - sl) / 0.4); t3_spray(st, [103.7, 1.4, 0.8], 1.2, (t - sl) / 0.5, 61, -1); }
  } },
  { id: 'f09', fn(t: number, u: number) {
    const st = e3Int(t, 0.3);
    e3Look(st, [105.8, 1.45, -1.5], [105.8, 1.45, -1.1], [105.8, 1.38, 0.4], [105.8, 1.4, 0.4], u, 38, -3);
    t3_rig(st, 1, 'lola', [105.8, 0, 0.4], { ...T3_P.guard, facing: 0, expr: 'stern', blood: 0.35 }, t);
  } },
  // ---- the cooler (emergency red) ----
  { id: 'f10', fn(t: number, u: number, s: Scene) {
    const th = e3K(s, 'throw', s.t0 + 0.3), g = e3K(s, 'glass', s.t0 + 2.8), st = t < g ? e3Int(t, 0.5) : e3Red(t);
    e3Look(st, [105.1, 1.4, 0.7], [105.1, 1.4, 0.5], [105.1, 1.25, -3.6], [105.1, 1.2, -3.6], u, 52, 0, t3_shake(t, g, 0.12));
    const k = t3_ease((t - th) / Math.max(0.3, g - th)), L: t3_V3 = [104.2 + 0.2 * k, 0, -1.9 - 1.95 * k];
    e3At(st, 1, 'lola', L, E3_D, k < 1 ? T3_P.thrown : T3_P.hitHead, t, 1, { expr: 'pained', blood: t > g ? 0.6 : 0.35 });
    e3At(st, 4, 'daleBeast', [105.8, 0, -2.4 - 1.1 * k], L, t < th + 0.2 ? T3_P.swing : T3_P.lunge, t, 1.15, { maw: 0.8, blood: 0.5 });
    if (t > g && t < g + 1.2) t3_shards(st, [104.4, 1.5, -3.95], 2.6, (t - g) / 1.2, 5);
  } },
  { id: 'f11', fn(t: number, u: number, s: Scene) {
    const st = e3Red(t), ps = [e3K(s, 'p1', s.t0 + 0.4), e3K(s, 'p2', s.t0 + 1.2), e3K(s, 'p3', s.t0 + 2.2)];
    let shake: t3_V3 = [0, 0, 0]; for (const p of ps) shake = t3_add(shake, t3_shake(t, p, 0.05));
    e3Look(st, [105.1, 1.45, -0.4], [105.1, 1.45, -0.6], [105.05, 1.35, -3.7], [105.05, 1.35, -3.7], u, 52, -3, shake);
    const keys: t3_Key[] = [[s.t0, 'guard']]; ps.forEach((p, i) => { keys.push([p - 0.12, i === 1 ? 'cross' : i === 2 ? 'hook' : 'jab']); keys.push([p + 0.3, 'guard']); });
    e3At(st, 1, 'lola', E3_L, E3_D, t3_seq(t, keys, 0.1), t, 1, { expr: 'stern', blood: 0.6 });
    const hit = ps.some((p) => t > p && t < p + 0.25);
    e3At(st, 4, 'daleBeast', E3_D, E3_L, hit ? { ...T3_P.stand, head: -10 } : T3_P.stand, t, 1.15, { maw: 0.3, blood: 0.6, armL: [-40, -20], armR: [40, 20] });
    for (const p of ps) if (t > p && t < p + 0.4) { st.effect('burst', [105.4, 1.7, -3.4], 0.6, (t - p) / 0.35); t3_spray(st, [105.6, 1.8, -3.45], 0.9, (t - p) / 0.4, 70 + Math.round(p * 10), 1, true); }
  } },
  { id: 'f12', fn(t: number, u: number, s: Scene) {
    const st = e3Red(t), c = e3K(s, 'choke', s.t0 + 0.6), k = t3_ease((t - c) / 0.4);
    e3Look(st, [105.8, 1.35, 0.6], [105.8, 1.35, 0.3], [105.0, 1.3, -3.6], [105.0, 1.35, -3.6], u, 50, -4, t3_shake(t, c, 0.06));
    e3At(st, 1, 'lola', E3_L, E3_D, t3_mix(T3_P.hitHead, T3_P.lifted, k), t, 1, { expr: 'pained', blood: 0.6 });
    e3At(st, 4, 'daleBeast', E3_D, E3_L, t3_mix(T3_P.lunge, T3_P.choke, k), t, 1.15, { maw: 0.7, blood: 0.6 });
    t3_shards(st, [104.6, 1.6, -3.95], 2.2, 1, 5);
  } },
  { id: 'f13', fn(t: number, u: number) {
    const st = e3Red(t);
    e3Look(st, [104.4, 1.55, -2.4], [104.4, 1.55, -2.65], [104.4, 1.75, -3.85], [104.4, 1.78, -3.85], u, 40, 6 * Math.sin(t * 0.7));
    t3_rig(st, 1, 'lola', E3_L, { ...T3_P.lifted, facing: 1, expr: u < 0.6 ? 'pained' : 'dazed', blood: 0.6 }, t);
    e3Vignette(st, 0.3 + 0.6 * u);
  } },
  // ---- the ring light ----
  { id: 'f14', fn(t: number, u: number) {
    const st = e3Red(t);
    e3Look(st, [107.0, 1.45, -0.9], [107.0, 1.45, -0.7], [107.3, 1.4, -2.2], [107.3, 1.45, -2.2], u, 40, 3);
    t3_rig(st, 2, 'tobby', [107.3, 0, -2.2], t3_face({ ...T3_P.point, armR: [120, 140], prop: { kind: 'ringlight', hand: 'R', ang: 160, on: 0 } }, -1, { expr: e3Talk(t, 'grin', 'laugh') }), t);
  } },
  { id: 'f15', fn(t: number, u: number, s: Scene) {
    const on = e3K(s, 'on', s.t0 + 0.6), st = t < on ? e3Red(t) : e3Int(t, 0.05);
    e3Look(st, [105.7, 1.4, 0.7], [105.7, 1.4, 0.5], [105.6, 1.3, -3.4], [105.6, 1.35, -3.4], u, 54, 0, t3_shake(t, on, 0.08));
    const T: t3_V3 = [106.9, 0, -2.5];
    e3At(st, 2, 'tobby', T, E3_D, { ...T3_P.point, armR: [110, 120], prop: { kind: 'ringlight', hand: 'R', ang: 110, on: t > on ? 1 : 0 } }, t, 1, { expr: 'stern' });
    e3At(st, 4, 'daleBeast', E3_D, T, t > on ? T3_P.scared : T3_P.choke, t, 1.15, { maw: 1, blood: 0.6, head: t > on ? -20 : 0 });
    e3At(st, 1, 'lola', E3_L, E3_D, T3_P.lifted, t, 1, { expr: 'dazed', blood: 0.6 });
    if (t > on) { const k = Math.min(1, (t - on) / 0.3); t3_glow(st, [106.4, 1.75, -2.6], 1.5, '#ffffff', k); t3_glow(st, [105.7, 1.6, -3.3], 1.0, '#f2f7ff', 0.35 * k); }
  } },
  { id: 'f16', fn(t: number, u: number, s: Scene) {
    const st = e3Int(t, 0.05), sc = e3K(s, 'scream', s.t0 + 0.4);
    e3Look(st, [105.4, 1.5, -1.6], [105.4, 1.5, -1.8], [105.5, 1.6, -3.5], [105.5, 1.55, -3.5], u, 44, 5, t3_shake(t, sc, 0.08));
    e3At(st, 4, 'daleBeast', E3_D, E3_L, { ...T3_P.scared, head: -28 }, t, 1.15, { maw: 1, blood: 0.7 });
    const drop = t3_ease((t - sc) / 0.3);
    e3At(st, 1, 'lola', E3_L, E3_D, t3_mix(T3_P.lifted, T3_P.crouch, drop), t, 1, { expr: 'pained', blood: 0.6 });
    t3_glow(st, [106.4, 1.75, -2.6], 1.4, '#ffffff', 0.8);
  } },
  { id: 'f17', fn(t: number, u: number, s: Scene) {
    const st = e3Int(t, 0.05), sb = e3K(s, 'stab', s.t0 + 2.4);
    e3Look(st, [105.0, 1.35, -0.6], [105.0, 1.35, -0.9], [105.05, 1.35, -3.6], [105.05, 1.4, -3.6], u, 50, -3, t3_shake(t, sb, 0.12));
    const PL = t3_seq(t, [[s.t0, 'crouch', { prop: { kind: 'glass', hand: 'R', ang: 160 } }], [s.t0 + 1.0, 'guard', { prop: { kind: 'glass', hand: 'R', ang: 170 } }], [sb - 0.15, 'stab', { armR: [140, 130], prop: { kind: 'glass', hand: 'R', ang: 120 } }]], 0.2);
    e3At(st, 1, 'lola', E3_L, E3_D, PL, t, 1, { expr: 'stern', blood: 0.7 });
    e3At(st, 4, 'daleBeast', E3_D, E3_L, t < sb ? { ...T3_P.scared, head: -20 } : { ...T3_P.hitHead, head: -35 }, t, 1.15, { maw: 1, blood: t > sb ? 1 : 0.7 });
    if (t > sb && t < sb + 0.7) t3_spray(st, [105.5, 1.95, -3.45], 1.6, (t - sb) / 0.7, 81, 1, true);
    t3_glow(st, [106.4, 1.75, -2.6], 1.2, '#ffffff', 0.6);
  } },
  { id: 'f18', fn(t: number, u: number) {
    const st = e3Int(t, 0.1);
    e3Look(st, [104.8, 1.5, -0.6], [104.8, 1.5, -0.4], [104.9, 1.2, -3.4], [104.9, 1.25, -3.4], u, 54);
    t3_rig(st, 4, 'daleBeast', [105.2, 0, -3.5], { ...T3_P.downFace, facing: 1, maw: 0.9, blood: 1 }, t, 1.15);
    const L: t3_V3 = [104.0, 0, -2.9], E: t3_V3 = [105.7, 0, -2.4];
    e3At(st, 1, 'lola', L, E, { ...T3_P.relax, prop: { kind: 'glass', hand: 'R', ang: 20 } }, t, 1, { expr: 'pained', blood: 0.8 });
    if (u > 0.4) e3At(st, 3, 'earlSick', E, L, { ...T3_P.hold, prop: { kind: 'dynamite', hand: 'R', ang: 170 } }, t, 1, { expr: 'stern', blood: 0.3 });
    t3_rig(st, 2, 'tobby', [106.8, 0, -2.6], t3_face({ ...T3_P.stand, prop: { kind: 'ringlight', hand: 'R', ang: 20, on: 1 } }, -1, { expr: 'shock' }), t, 0.95);
  } },
  // ---- the goodbye ----
  { id: 'f19', fn(t: number, u: number) {
    const st = e3Int(t, 0.05);
    e3Look(st, [105.7, 1.45, -1.0], [105.7, 1.45, -0.8], [105.7, 1.38, -2.4], [105.7, 1.4, -2.4], u, 38);
    t3_rig(st, 3, 'earlSick', [105.7, 0, -2.4], { ...T3_P.hold, prop: { kind: 'dynamite', hand: 'R', ang: 170 }, facing: 0, expr: e3Talk(t, 'stern', 'neutral'), blood: 0.3 }, t);
  } },
  { id: 'f20', fn(t: number, u: number) {
    const st = e3Int(t, 0.05);
    e3Look(st, [104.9, 1.45, 0.4], [104.9, 1.45, 0.1], [104.9, 1.3, -2.6], [104.9, 1.32, -2.6], u, 46);
    const L: t3_V3 = [104.2, 0, -2.7], E: t3_V3 = [105.6, 0, -2.5];
    e3At(st, 1, 'lola', L, E, u < 0.2 ? T3_P.point : T3_P.relax, t, 1, { expr: u < 0.2 ? e3Talk(t, 'pained', 'nervous') : 'pained', blood: 0.8 });
    e3At(st, 3, 'earlSick', E, L, { ...T3_P.hold, prop: { kind: 'dynamite', hand: 'R', ang: 170 } }, t, 1, { expr: u > 0.2 ? e3Talk(t, 'smile', 'neutral') : 'pained', blood: 0.3 });
  } },
  { id: 'f21', fn(t: number, u: number) {
    const st = e3Int(t, 0.05);
    e3Look(st, [105.9, 1.45, 0.3], [105.9, 1.45, 0.0], [105.9, 1.3, -2.5], [105.9, 1.32, -2.5], u, 46, 2);
    const T: t3_V3 = [106.6, 0, -2.6], E: t3_V3 = [105.4, 0, -2.5];
    e3At(st, 2, 'tobby', T, E, { ...T3_P.radio, armR: [80, 150] }, t, 1, { expr: u < 0.75 ? e3Talk(t, 'pained', 'nervous') : 'pained' });
    e3At(st, 3, 'earlSick', E, T, { ...T3_P.hold, prop: { kind: 'dynamite', hand: 'R', ang: 170 } }, t, 1, { expr: u > 0.75 ? e3Talk(t, 'smile_closed', 'smile') : 'smile_closed' });
  } },
  // ---- the drive, the mine, the dawn ----
  { id: 'f22', fn(t: number, u: number, s: Scene) {
    const k = t3_ease((t - s.t0) / (s.t1 - s.t0)), st = e3Night(t, [2 + 40 * k, 0, 19.6]);
    T3_.cop!.rotation.y = Math.PI / 2;
    e3Look(st, [-3, 1.9, 28], [-1, 1.9, 27.5], [6, 1.1, 18.5], [12, 1.1, 18.5], u, 42);
    for (let i = 0; i < 8; i++) t3_rig(st, 50 + i, i % 2 ? 'oco' : 'oco2', [-6 + 28 * k - i * 1.6, 0, 16.5 + (i % 3) * 1.4], t3_face(e3Walk(t + i * 0.3, T3_P.stand, 0.9, 0.6), 1, { maw: 0.2 }), t);
    t3_fog(st, t, [10, 0, 16], 8, 8, 0.4);
  } },
  { id: 'f23', fn(t: number, u: number, s: Scene) {
    const b = e3K(s, 'boom', s.t0 + 1.4), st = e3Night(t, [-148, 0, -70], t < b ? 1 : 0);
    T3_.cop!.rotation.y = 0.3;
    e3Look(st, [-145, 2.4, -55], [-145.5, 2.6, -56], [-150, 2.2, -79], [-150, 2.4, -79], u, 40, 0, t3_shake(t, b, 0.25));
    if (t < b) for (let i = 0; i < 6; i++) t3_rig(st, 60 + i, i % 2 ? 'oco' : 'oco2', [-152 + i * 0.8, 0, -76 + (i % 2) * 0.8 - (t - s.t0) * 0.8], t3_face(e3Walk(t + i, T3_P.stand, 0.9, 0.5), 1, {}), t, 0.9);
    if (t > b) { const k = (t - b) / 1.0; st.effect('burst', [-150, 2.5, -78], 9, Math.min(1, k)); st.effect('puff', [-150, 3, -77], 12, Math.min(1, k * 0.6)); t3_glow(st, [-150, 2.5, -77], 22, '#ffb347', Math.max(0, 1 - k * 0.6)); }
  } },
  { id: 'f24', fn(t: number, u: number) {
    const st = T3_.st!; st.light('golden', { view: [0.2, -1], az: 10, el: 7 }); t3_lights({ store: 0.3, t }); T3_.cop!.position.set(-200, 0, 0);
    e3Look(st, [-1.5, 1.3, 14], [-1.8, 1.25, 12.5], [-2.6, 1.0, 6.5], [-2.6, 1.0, 6.5], u, 40);
    t3_rig(st, 1, 'lola', [-3.2, 0, 6.5], { ...T3_P.sitWall, facing: 1, expr: 'relief', blood: 0.8 }, t);
    t3_rig(st, 2, 'tobby', [-2.0, 0, 6.6], { ...T3_P.sitWall, facing: -1, expr: 'pained', prop: { kind: 'ringlight', hand: 'R', ang: 10 } }, t);
  } },
  { id: 'f25', fn(t: number, u: number) {
    const st = T3_.st!; st.light('golden', { view: [0.2, -1], az: 10, el: 7 }); t3_lights({ store: 0.3, t }); T3_.cop!.position.set(-200, 0, 0);
    e3Look(st, [-2.6, 1.0, 10.0], [-2.6, 1.0, 9.6], [-2.6, 0.75, 6.55], [-2.6, 0.75, 6.55], u, 40, -2);
    t3_rig(st, 1, 'lola', [-3.2, 0, 6.5], { ...T3_P.sitWall, facing: 1, expr: u > 0.45 ? e3Talk(t, 'stern', 'smile') : 'relief', blood: 0.8 }, t);
    t3_rig(st, 2, 'tobby', [-2.0, 0, 6.6], { ...T3_P.sitWall, facing: -1, expr: u < 0.45 ? e3Talk(t, 'grin', 'laugh') : 'nervous' }, t);
  } },
  { id: 'f26', fn(t: number, u: number, s: Scene) {
    const st = T3_.st!, k = e3K(s, 'knock', s.t1 - 1.5);
    st.light('golden', { view: [0.2, -1], az: 10, el: 7 }); t3_lights({ store: 0.3, t }); T3_.cop!.position.set(-200, 0, 0);
    e3Look(st, [-3.2, 1.6, 4.0], [-3.2, 1.7, -1.6], [-3.2, 1.8, -4.0], [-3.2, 1.9, -4.0], u, 40);
    st.card({ key: 'e3-hand', cw: 256, ch: 256, at: [-3.2, 1.9, -3.9], w: 0.5, h: 0.5, draw: (p) => { p.ell(128, 150, 60, 70, 'rgba(20,20,26,0.6)', 0); for (let i = 0; i < 4; i++) p.ell(78 + i * 33, 60, 12, 40, 'rgba(20,20,26,0.6)', 0); } });
    for (let j = 0; j < 3; j++) { const kj = k + j * 0.32; if (t > kj && t < kj + 0.6) t3_knock(st, [-3.2, 1.9, -3.9], (t - kj) / 0.6); }
  } },
], t3_init, (t, u, shot, s) => shot.fn(t, u, s));
