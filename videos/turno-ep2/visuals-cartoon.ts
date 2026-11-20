// TURNO DA MADRUGADA, ep. 2: Apagão. Shared world (world-cartoon.ts, copied from episode 1 with this episode's prefix).
// Store interior at x = 100 (counter x 103.6-107.2 / z 1.6-2.8, coolers at z -4.2). Behind the store (exterior): back
// door at (3.9, -12.1), gravel to the generator (x 5.7-7.5 / z -17.6..-16.5), flood pole at (9.5, -15).
const e2K = (s: Scene, id: string, f: number) => s.keys?.find((k) => k.id === id)?.t ?? f;
const e2Talk = (t: number, a: t2_Expr, b: t2_Expr, on = true) => (on && Math.floor(t * 7) % 2 ? b : a);
type e2St = ReturnType<typeof CT.stage>;
const e2Dark = (t: number, view: [number, number] = [0, -1]) => { const st = T2_.st!; st.light('blackout', { view }); t2_lights({ store: 0, t }); T2_.cop!.position.set(9.2, 0, 5.5); return st; };
const e2Lit = (t: number, k = 1) => { const st = T2_.st!; st.light('night', { view: [0.3, -1] }); t2_lights({ store: k * t2_flick(t, 0.1), gen: k, t }); T2_.cop!.position.set(9.2, 0, 5.5); return st; };
const e2Int = (t: number) => { const st = T2_.st!; st.light('store', { view: [0, -1] }); t2_lights({ store: t2_flick(t, 0.08), t }); return st; };
const e2Look = (st: e2St, a: t2_V3, b: t2_V3, ta: t2_V3, tb: t2_V3, u: number, fov = 40, roll = 0, shake: t2_V3 = [0, 0, 0]) =>
  st.look(t2_add(t2_lerp3(a, b, t2_ease(u)), shake), t2_add(t2_lerp3(ta, tb, t2_ease(u)), shake), fov, roll);
const e2Fc = (st: e2St, a: t2_V3, b: t2_V3): 1 | -1 => { const r = new THREE.Vector3().setFromMatrixColumn(st.cam.matrixWorld, 0); return (b[0] - a[0]) * r.x + (b[2] - a[2]) * r.z >= 0 ? 1 : -1; };
const e2At = (st: e2St, id: number, who: string, at: t2_V3, to: t2_V3, P: t2_Pose, t: number, k = 1, extra: t2_Pose = {}) => t2_rig(st, id, who, at, t2_face(P, e2Fc(st, at, to), extra), t, k);
const e2Walk = (t: number, base: t2_Pose = T2_P.stand, sp = 1.6, amp = 1): t2_Pose => {
  const w = Math.sin(t * sp * Math.PI * 2) * amp;
  return { ...base, legL: [-16 * w - 2, -4 * w + Math.max(0, w) * 14], legR: [16 * w + 2, 4 * w + Math.max(0, -w) * 14], hip: [0, (base.hip?.[1] ?? 0) - 4 * Math.abs(w)] };
};
/** a flashlight in someone's hand: a glow at the lamp and a pool of light where it points */
const e2Torch = (st: e2St, lamp: t2_V3, spot: t2_V3, k = 1) => {
  t2_glow(st, lamp, 0.9, '#fff3c4', k);
  st.card({ key: `e2-spot-${Math.round(k * 10)}`, cw: 256, ch: 256, at: spot, w: 2.4, h: 1.6, flat: true, soft: true, draw: (p) => {
    const g = p.g, gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, `rgba(255,240,190,${0.55 * k})`); gr.addColorStop(1, 'rgba(255,240,190,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  } });
};
const E2_L: t2_V3 = [5.6, 0, -15.6], E2_O: t2_V3 = [7.0, 0, -15.6];

CT.shots([
  // ---- the dark store ----
  { id: 'e01', fn(t: number, u: number) {
    const st = e2Dark(t);
    e2Look(st, [104.6, 1.45, -2.6], [104.6, 1.45, -2.2], [104.6, 1.3, 1.0], [104.6, 1.3, 1.0], u, 52);
    t2_rig(st, 1, 'lola', [103.9, 0, 0.6], t2_face(T2_P.guard, 1, { expr: 'stern', blood: 0.3 }), t);
    t2_rig(st, 2, 'tobby', [105.3, 0, 0.6], t2_face(T2_P.scared, -1, { expr: 'nervous' }), t);
    t2_rig(st, 3, 'earl', [104.6, 0, 1.3], { ...T2_P.aim, prop: { kind: 'revolver', hand: 'R', ang: 120 }, facing: 0, expr: 'stern' }, t, 0.98);
  } },
  { id: 'e02', fn(t: number, u: number) {
    const st = e2Dark(t);
    e2Look(st, [106.5, 1.2, -0.6], [106.5, 1.15, -1.0], [106.6, 0.8, -3.9], [106.6, 0.75, -3.9], u, 42, -4);
    t2_rig(st, 4, 'daleTied', [106.6, 0, -3.9], { ...T2_P.sitWall, facing: 0, head: 8 * Math.sin(t * 0.8) }, t);
  } },
  { id: 'e03', fn(t: number, u: number) {
    const st = e2Dark(t);
    e2Look(st, [105.3, 1.45, -1.3], [105.3, 1.45, -1.0], [105.3, 1.38, 0.6], [105.3, 1.4, 0.6], u, 38);
    t2_rig(st, 2, 'tobby', [105.3, 0, 0.6], { ...T2_P.shrug, facing: 0, expr: e2Talk(t, 'nervous', 'shock') }, t);
  } },
  { id: 'e04', fn(t: number, u: number, s: Scene) {
    const c = e2K(s, 'click', s.t0 + 0.6), st = e2Dark(t);
    e2Look(st, [104.6, 1.5, -2.4], [104.6, 1.5, -2.0], [104.6, 1.25, 1.0], [104.6, 1.3, 1.0], u, 50, 2);
    const T: t2_V3 = [105.4, 0, 0.6], E: t2_V3 = [104.4, 0, 1.2], L: t2_V3 = [103.6, 0, 0.5];
    e2At(st, 2, 'tobby', T, E, { ...T2_P.point, prop: { kind: 'flashlight', hand: 'R', ang: 120, on: t > c ? 1 : 0 } }, t, 1, { expr: 'nervous' });
    if (t > c) e2Torch(st, [104.8, 1.5, 0.65], [104.4, 0.02, 1.3]);
    e2At(st, 3, 'earl', E, L, T2_P.relax, t, 1, { expr: e2Talk(t, 'stern', 'neutral', t > c + 0.3) });
    e2At(st, 1, 'lola', L, E, T2_P.arms, t, 1, { expr: 'stern' });
  } },
  { id: 'e05', fn(t: number, u: number) {
    const st = e2Dark(t);
    e2Look(st, [104.0, 1.45, -2.0], [104.0, 1.45, -1.7], [104.0, 1.3, 0.85], [104.0, 1.32, 0.85], u, 48, -2);
    const L: t2_V3 = [103.6, 0, 0.5], E: t2_V3 = [104.4, 0, 1.2];
    e2At(st, 1, 'lola', L, E, T2_P.arms, t, 1, { expr: u < 0.4 ? e2Talk(t, 'stern', 'neutral') : 'stern' });
    e2At(st, 3, 'earl', E, L, { ...T2_P.point, armR: [70, 60], prop: { kind: 'crowbar', hand: 'R', ang: 170 } }, t, 1, { expr: u > 0.4 ? e2Talk(t, 'stern', 'neutral') : 'stern' });
    e2Torch(st, [105.3, 1.4, 0.7], [104.2, 0.02, 1.0], 0.8);
  } },
  // ---- out the back ----
  { id: 'e06', fn(t: number, u: number) {
    const st = e2Dark(t, [0.3, -1]);
    e2Look(st, [1.2, 1.5, -18.5], [1.4, 1.5, -18.0], [3.9, 1.2, -12.8], [4.2, 1.2, -13.4], u, 42);
    const k = t2_ease(u), L: t2_V3 = [3.7 + 0.6 * k, 0, -12.7 - 1.5 * k], E: t2_V3 = [4.5 + 0.5 * k, 0, -12.6 - 1.2 * k];
    e2At(st, 1, 'lola', L, [6, 0, -17], { ...e2Walk(t, T2_P.sneak, 1.1, 0.5), prop: { kind: 'crowbar', hand: 'R', ang: 160 }, prop2: { kind: 'flashlight', hand: 'L', ang: 80, on: 1 } }, t, 1, { expr: 'stern' });
    e2At(st, 3, 'earl', E, [6, 0, -17], { ...e2Walk(t, T2_P.aim, 1.0, 0.4), prop: { kind: 'shotgun', hand: 'R', ang: 100 } }, t, 1, { expr: 'stern' });
    t2_glow(st, [L[0] + 0.4, 1.2, L[2]], 0.8, '#fff3c4', 0.9);
    t2_fog(st, t, [4, 0, -19], 9, 8, 0.6);
  } },
  { id: 'e07', fn(t: number, u: number) {
    const st = e2Int(t);
    e2Look(st, [105.0, 1.4, 0.6], [105.2, 1.38, 0.2], [105.9, 0.9, -3.3], [106.0, 0.85, -3.4], u, 50);
    t2_rig(st, 4, 'daleTied', [106.6, 0, -3.9], { ...T2_P.sitWall, facing: 0 }, t);
    e2At(st, 2, 'tobby', [105.1, 0, -2.6], [106.6, 0, -3.9], T2_P.radio, t, 1, { expr: 'nervous' });
  } },
  { id: 'e08', fn(t: number, u: number) {
    const st = e2Int(t);
    e2Look(st, [106.1, 1.2, -1.5], [106.2, 1.15, -1.8], [106.6, 0.85, -3.9], [106.6, 0.8, -3.9], u, 40, 3);
    t2_rig(st, 4, 'daleTied', [106.6, 0, -3.9], { ...T2_P.sitWall, facing: 0, head: 16 * Math.sin(t * 2.2), torso: 6 * Math.sin(t * 1.3) }, t);
    e2At(st, 2, 'tobby', [105.2, 0, -2.9], [106.6, 0, -3.9], T2_P.radio, t, 0.95, { expr: e2Talk(t, 'nervous', 'shock') });
  } },
  { id: 'e09', fn(t: number, u: number) {
    const st = e2Dark(t, [0.3, -1]);
    e2Look(st, [3.4, 1.45, -13.6], [3.5, 1.45, -13.4], [4.7, 1.38, -15.0], [4.7, 1.4, -15.0], u, 40);
    const L: t2_V3 = [4.7, 0, -15.0];
    t2_rig(st, 1, 'lola', L, { ...T2_P.radio, prop: { kind: 'radio', hand: 'R', ang: 175 }, prop2: { kind: 'crowbar', hand: 'L', ang: -150 }, facing: 0, expr: u < 0.45 ? e2Talk(t, 'stern', 'neutral') : 'stern' }, t);
    t2_glow(st, [4.2, 1.2, -14.9], 0.8, '#fff3c4', 0.8);
    t2_fog(st, t, [5, 0, -18], 8, 7, 0.6);
  } },
  { id: 'e10', fn(t: number, u: number) {
    const st = e2Dark(t, [0.3, -1]);
    e2Look(st, [2.6, 1.4, -12.4], [3.4, 1.4, -12.6], [4.3, 1.15, -14.4], [5.0, 1.1, -15.2], u, 50);
    const L: t2_V3 = [4.4 + 0.8 * u, 0, -14.6 - 0.9 * u], E: t2_V3 = [3.8 + 0.7 * u, 0, -14.1 - 0.8 * u];
    e2At(st, 1, 'lola', L, [7, 0, -17], { ...e2Walk(t, T2_P.sneak, 0.9, 0.5), prop: { kind: 'crowbar', hand: 'R', ang: 160 }, prop2: { kind: 'flashlight', hand: 'L', ang: 80, on: 1 } }, t, 1, { expr: 'stern' });
    e2At(st, 3, 'earl', E, [7, 0, -17], { ...e2Walk(t, T2_P.aim, 0.8, 0.4), prop: { kind: 'shotgun', hand: 'R', ang: 100 } }, t, 1, { expr: 'stern' });
    t2_glow(st, [L[0] + 0.45, 1.2, L[2]], 0.8, '#fff3c4', 0.9);
    t2_fog(st, t, [6, 0, -18], 12, 8, 0.75);
  } },
  { id: 'e11', fn(t: number, u: number, s: Scene) {
    const st = e2Dark(t, [0.3, -1]), p = e2K(s, 'pick', s.t0 + 0.3);
    e2Look(st, [6.4, 1.35, -12.3], [6.4, 1.35, -12.5], [6.4, 1.15, -15.8], [6.5, 1.25, -15.8], u, 56, -4);
    const o = t2_ease((t - p) / 1.6), O: t2_V3 = [8.8 - 1.8 * o, 0, -16.6 + 1.0 * o];
    t2_rig(st, 30, 'oco2', O, t2_face({ ...e2Walk(t, T2_P.windup, 0.7, 0.5), prop: { kind: 'pickaxe', hand: 'R', ang: 200 } }, -1, { maw: 0.2 + 0.3 * o }), t);
    t2_rig(st, 1, 'lola', E2_L, t2_face({ ...T2_P.guard, prop: { kind: 'crowbar', hand: 'R', ang: 150 } }, 1, { expr: 'shock' }), t);
    t2_glow(st, [5.95, 1.25, -15.5], 0.8, '#fff3c4', 0.8);
    t2_fog(st, t, [8, 0, -18], 10, 7, 0.75);
  } },
  // ---- fight 2: Lola vs the Hollow with the pickaxe (generator behind them) ----
  { id: 'e12', fn(t: number, u: number, s: Scene) {
    const st = e2Dark(t, [0.3, -1]), d = e2K(s, 'duck', s.t0 + 0.5), k = e2K(s, 'stuck', s.t0 + 3);
    e2Look(st, [6.3, 1.3, -12.3], [6.3, 1.3, -12.5], [6.3, 1.05, -15.6], [6.3, 1.0, -15.6], u, 52, 0, t2_shake(t, k, 0.08));
    const PO = t2_seq(t, [[s.t0, 'windup', { prop: { kind: 'pickaxe', hand: 'R', ang: 200 } }], [d, 'swing', { prop: { kind: 'pickaxe', hand: 'R', ang: 120 } }], [k - 0.2, 'swing', { prop: { kind: 'pickaxe', hand: 'R', ang: 150 }, torso: 30 }]], 0.2);
    const PL = t2_seq(t, [[s.t0, 'guard'], [d - 0.15, 'duck'], [k + 0.4, 'guard']], 0.14);
    e2At(st, 30, 'oco2', E2_O, E2_L, PO, t, 1, { maw: 0.4 });
    e2At(st, 1, 'lola', E2_L, E2_O, { ...PL, prop: { kind: 'crowbar', hand: 'R', ang: 150 } }, t, 1, { expr: 'stern' });
    if (t > k && t < k + 0.5) { st.effect('burst', [6.4, 1.6, -16.4], 1.0, (t - k) / 0.4); st.effect('creak', [6.4, 1.7, -16.4], 0.7, (t - k) / 0.5); }
  } },
  { id: 'e13', fn(t: number, u: number) {
    const st = e2Dark(t, [0.3, -1]);
    e2Look(st, [6.3, 1.35, -12.3], [6.3, 1.35, -12.7], [6.3, 1.1, -15.6], [6.3, 1.1, -15.6], u * 0.6, 56, 4);
    const tug = Math.sin(t * 18) * 6;
    e2At(st, 30, 'oco2', E2_O, [6.4, 1, -16.4], { ...T2_P.pull, torso: -20 + tug, prop: { kind: 'pickaxe', hand: 'R', ang: -120 } }, t, 1, { maw: 0.5 });
    e2At(st, 1, 'lola', E2_L, E2_O, t2_mix(T2_P.duck, { ...T2_P.windup, prop: { kind: 'crowbar', hand: 'R', ang: 200 } }, t2_ease(u * 1.6)), t, 1, { expr: 'stern', prop: { kind: 'crowbar', hand: 'R', ang: 200 } });
  } },
  { id: 'e14', fn(t: number, u: number, s: Scene) {
    const st = e2Dark(t, [0.3, -1]), h = e2K(s, 'strike', s.t0 + 0.8), f = e2K(s, 'fall', s.t0 + 3);
    e2Look(st, [6.3, 0.9, -12.6], [6.3, 0.9, -12.8], [6.3, 0.9, -15.6], [6.3, 0.75, -15.6], u, 52, -3, t2_shake(t, h, 0.09));
    const PL = t2_seq(t, [[s.t0, 'windup', { prop: { kind: 'crowbar', hand: 'R', ang: 200 } }], [h - 0.12, 'swing', { prop: { kind: 'crowbar', hand: 'R', ang: 70 }, torso: 34 }], [h + 0.6, 'guard', { prop: { kind: 'crowbar', hand: 'R', ang: 150 } }]], 0.12);
    const PO = t2_seq(t, [[s.t0, 'pull'], [h, 'hitBody', { legL: [-60, -100], expr: 'pained' }], [f, 'crawl']], 0.18);
    e2At(st, 1, 'lola', E2_L, E2_O, PL, t, 1, { expr: 'stern' });
    e2At(st, 30, 'oco2', E2_O, E2_L, PO, t, 1, { maw: 0.6 });
    if (t > h && t < h + 0.5) { t2_spray(st, [6.8, 0.6, -15.55], 1.1, (t - h) / 0.5, 41, 1, true); st.effect('creak', [6.9, 0.55, -15.5], 0.6, (t - h) / 0.5); }
    if (t > f && t < f + 0.6) st.effect('puff', [7.0, 0.25, -15.6], 1.3, (t - f) / 0.6);
  } },
  { id: 'e15', fn(t: number, u: number, s: Scene) {
    const st = e2Dark(t, [0.3, -1]), c = e2K(s, 'claw', s.t0 + 2.5);
    e2Look(st, [8.6, 0.55, -14.0], [8.4, 0.55, -14.1], [6.3, 0.5, -15.6], [6.1, 0.5, -15.6], u, 46, 5);
    const O: t2_V3 = [7.4 - 0.9 * u, 0, -15.6];
    e2At(st, 30, 'oco2', O, E2_L, { ...T2_P.crawl, armR: [70 + 20 * Math.sin(t * 5), 60], armL: [40 + 20 * Math.cos(t * 5), 20] }, t, 1, { maw: 0.6 });
    e2At(st, 1, 'lola', [5.2, 0, -15.5], O, { ...T2_P.guard, prop: { kind: 'crowbar', hand: 'R', ang: 150 } }, t, 1, { expr: 'shock' });
    if (t > c && t < c + 0.4) st.effect('puff', [O[0] - 0.4, 0.15, O[2]], 0.8, (t - c) / 0.4);
  } },
  { id: 'e16', fn(t: number, u: number, s: Scene) {
    const st = e2Dark(t, [0.3, -1]), g = e2K(s, 'grab', s.t0 + 0.3), d = e2K(s, 'down', s.t0 + 1.8);
    e2Look(st, [6.0, 1.2, -12.5], [6.0, 1.1, -12.7], [5.9, 0.85, -15.6], [5.9, 0.6, -15.6], u, 52, 0, t2_shake(t, d, 0.1));
    const L: t2_V3 = [5.4, 0, -15.6], O: t2_V3 = [6.45 - 0.35 * t2_ease((t - d) / 0.6), 0, -15.6];
    const PL = t2_seq(t, [[s.t0, 'guard'], [g, 'thrown'], [d, 'down', { expr: 'pained' }]], 0.2);
    const PO = t2_seq(t, [[s.t0, 'crawl'], [g, 'crawl', { armL: [100, 100], armR: [95, 95] }], [d + 0.3, 'mount']], 0.25);
    e2At(st, 1, 'lola', L, O, PL, t, 1, { blood: 0.3 });
    e2At(st, 30, 'oco2', O, L, PO, t, 1, { maw: 0.6 });
    if (t > d && t < d + 0.6) st.effect('puff', [5.4, 0.2, -15.6], 1.4, (t - d) / 0.6);
  } },
  { id: 'e17', fn(t: number, u: number, s: Scene) {
    const st = e2Dark(t, [0.3, -1]), o = e2K(s, 'open', s.t0 + 0.8);
    e2Look(st, [6.05, 1.15, -14.2], [6.05, 1.12, -14.4], [6.05, 1.15, -15.6], [6.05, 1.15, -15.6], u, 40, -6);
    e2At(st, 30, 'oco2', [6.1, 0, -15.6], [5.4, 0, -15.6], T2_P.mount, t, 1, { maw: Math.min(1, Math.max(0, (t - o) / 0.8)), head: 10 });
  } },
  { id: 'e18', fn(t: number, u: number) {
    const st = e2Dark(t, [0.3, -1]), push = Math.sin(t * 9) * 4;
    e2Look(st, [6.0, 1.0, -12.9], [6.0, 0.95, -13.3], [5.85, 0.65, -15.6], [5.85, 0.6, -15.6], u, 46, 3);
    e2At(st, 1, 'lola', [5.4, 0, -15.6], [6.4, 0, -15.6], { ...T2_P.push, prop: { kind: 'crowbar', hand: 'R', ang: 90 } }, t, 1, { blood: 0.4, expr: 'pained' });
    e2At(st, 30, 'oco2', [6.15, 0, -15.6], [5.4, 0, -15.6], { ...T2_P.mount, torso: 10 + push }, t, 1, { maw: 1 });
    if (t > 76.2) { t2_rig(st, 3, 'earl', [3.9, 0, -13.0], { ...T2_P.aim, prop: { kind: 'shotgun', hand: 'R', ang: 120 }, facing: 1, expr: 'stern' }, t, 0.9); }
  } },
  { id: 'e19', fn(t: number, u: number, s: Scene) {
    const st = e2Dark(t, [0.3, -1]), g = e2K(s, 'gun', s.t0 + 0.3);
    e2Look(st, [2.6, 1.45, -12.3], [2.7, 1.45, -12.5], [5.0, 1.1, -14.8], [5.2, 1.0, -15.0], u, 48, 0, t2_shake(t, g, 0.12));
    const E: t2_V3 = [3.6, 0, -13.4], O: t2_V3 = [6.2 + 0.7 * t2_ease((t - g) / 0.35), 0, -15.6];
    e2At(st, 3, 'earl', E, O, { ...(t < g + 0.2 ? T2_P.aim : T2_P.recoil), prop: { kind: 'shotgun', hand: 'R', ang: 98, on: t > g && t < g + 0.12 ? 1 : 0 } }, t, 1, { expr: 'stern' });
    e2At(st, 30, 'oco2', O, E, t < g ? T2_P.mount : T2_P.down, t, 1, { maw: 1, blood: t > g ? 1 : 0 });
    if (t > g && t < g + 0.7) { t2_spray(st, [O[0], 1.0, O[2]], 1.8, (t - g) / 0.7, 51, 1, true); t2_glow(st, [4.6, 1.3, -13.6], 1.6, '#ffd27a', 1 - (t - g) / 0.7); }
  } },
  { id: 'e20', fn(t: number, u: number, s: Scene) {
    const st = e2Dark(t, [0.3, -1]), p1 = e2K(s, 'pull1', s.t0 + 0.8), p2 = e2K(s, 'pull2', s.t0 + 2.5);
    e2Look(st, [5.2, 1.3, -13.1], [5.3, 1.3, -13.4], [6.4, 1.05, -16.0], [6.5, 1.0, -16.0], u, 46, -3);
    const yank = (x: number) => Math.max(0, 1 - Math.abs(t - x - 0.15) / 0.3);
    const k = Math.max(yank(p1), yank(p2), yank(s.t1 - 0.6));
    t2_rig(st, 3, 'earl', [6.0, 0, -15.9], t2_face(t2_mix(T2_P.stand, T2_P.pull, k), -1, { expr: 'stern' }), t);
    t2_rig(st, 1, 'lola', [7.2, 0, -15.5], t2_face({ ...T2_P.guard, prop: { kind: 'crowbar', hand: 'R', ang: 150 } }, 1, { expr: 'pained', blood: 0.4 }), t, 0.95);
  } },
  { id: 'e21', fn(t: number, u: number, s: Scene) {
    const on = e2K(s, 'on', s.t0 + 1.4), st = t < on ? e2Dark(t, [0.3, -1]) : e2Lit(t), sc = e2K(s, 'scream', s.t0 + 2.4);
    e2Look(st, [-4, 2.6, -24], [-3, 2.4, -23], [5, 1.4, -16], [5, 1.4, -16], u, 42, 0, t2_shake(t, on, 0.05));
    for (let i = 0; i < 7; i++) {
      const base: t2_V3 = [-1 + i * 2.1, 0, -21 - (i % 3) * 1.6], back = t > sc ? t2_ease((t - sc) / 1.5) : 0;
      t2_rig(st, 31 + i, i % 2 ? 'oco' : 'oco2', [base[0] + (base[0] - 5) * 0.15 * back, 0, base[2] - 2.2 * back], { ...(t > on ? T2_P.scared : T2_P.stand), facing: (i % 2 ? 1 : -1), maw: t > on ? 0.8 : 0.1, head: t > on ? -15 : 0 }, t);
    }
    t2_rig(st, 1, 'lola', [5.3, 0, -15.3], t2_face(T2_P.guard, -1, { expr: 'shock', prop: { kind: 'crowbar', hand: 'R', ang: 150 } }), t, 0.95);
    t2_rig(st, 3, 'earl', [6.2, 0, -15.8], t2_face(T2_P.aim, -1, { prop: { kind: 'shotgun', hand: 'R', ang: 98 }, expr: 'shock' }), t, 0.95);
    t2_fog(st, t, [3, 0, -21], 10, 10, 0.55);
  } },
  { id: 'e22', fn(t: number, u: number) {
    const st = e2Lit(t);
    e2Look(st, [5.9, 1.45, -12.5], [5.9, 1.45, -12.8], [5.95, 1.3, -15.5], [5.95, 1.35, -15.5], u, 44);
    const L: t2_V3 = [5.4, 0, -15.5], E: t2_V3 = [6.5, 0, -15.6];
    e2At(st, 1, 'lola', L, E, { ...T2_P.relax, prop: { kind: 'crowbar', hand: 'R', ang: 20 } }, t, 1, { expr: 'relief', blood: 0.4 });
    e2At(st, 3, 'earl', E, L, { ...T2_P.relax, prop: { kind: 'shotgun', hand: 'R', ang: 20 } }, t, 1, { expr: 'relief_open' });
    t2_fog(st, t, [6, 0, -21], 8, 8, 0.35);
  } },
  { id: 'e23', fn(t: number, u: number) {
    const st = e2Int(t);
    e2Look(st, [104.4, 1.45, 0.6], [104.4, 1.45, 0.9], [104.4, 1.35, 3.6], [104.4, 1.38, 3.6], u, 40);
    t2_rig(st, 2, 'tobby', [104.4, 0, 3.6], { ...T2_P.radio, armL: [-150 + 20 * Math.sin(t * 10), -175], facing: 0, expr: e2Talk(t, 'laugh', 'grin') }, t);
  } },
  { id: 'e24', fn(t: number, u: number) {
    const st = e2Lit(t);
    e2Look(st, [6.5, 1.45, -14.0], [6.5, 1.45, -14.3], [6.5, 1.38, -15.6], [6.5, 1.4, -15.6], u, 38, 2);
    t2_rig(st, 3, 'earl', [6.5, 0, -15.6], { ...T2_P.relax, facing: 0, expr: e2Talk(t, 'stern', 'neutral'), head: -6 }, t);
  } },
  { id: 'e25', fn(t: number, u: number, s: Scene) {
    const st = e2Lit(t), v = e2K(s, 'veins', s.t0 + 3.5);
    e2Look(st, [6.3, 1.35, -14.1], [6.35, 1.3, -14.3], [6.5, 1.25, -15.6], [6.5, 1.2, -15.6], u, 40, -4);
    t2_rig(st, 3, t > v - 1.2 ? 'earlSick' : 'earl', [6.5, 0, -15.6], { ...T2_P.sleeve, facing: 0, expr: 'pained' }, t);
    if (t > v - 1.2) st.card({ key: 'e2-scratch', cw: 256, ch: 128, at: [6.05, 1.32, -15.5], w: 0.32, h: 0.16, draw: (p) => { for (let i = 0; i < 3; i++) p.stroke([[30, 30 + i * 30], [220, 50 + i * 26]], 10, '#8a1020'); } });
  } },
  { id: 'e26', fn(t: number, u: number) {
    const st = e2Int(t);
    e2Look(st, [106.4, 1.5, -1.2], [106.4, 1.45, -1.6], [106.6, 0.5, -3.9], [106.6, 0.45, -3.9], u, 42, -5);
    st.card({ key: 'e2-tape', cw: 512, ch: 256, at: [106.6, 0.02, -3.6], w: 1.2, h: 0.6, flat: true, draw: (p) => { for (let i = 0; i < 4; i++) p.band([[60 + i * 90, 60 + (i % 2) * 90], [140 + i * 90, 120 + (i % 2) * 40]], '#8f9399', 26, 4); p.poly([[330, 140], [470, 120], [490, 220], [340, 230]], '#f2c230', 6); } });
    st.card({ key: 'e2-claw', cw: 256, ch: 256, at: [106.6, 1.2, -4.15], w: 0.9, h: 0.9, draw: (p) => { for (let i = 0; i < 4; i++) p.stroke([[60 + i * 40, 40], [80 + i * 40, 220]], 10, '#141014'); } });
    t2_rig(st, 2, 'tobby', [105.2, 0, -2.4], t2_face(T2_P.radio, 1, { expr: 'shock' }), t, 0.95);
  } },
], t2_init, (t, u, shot, s) => shot.fn(t, u, s));
