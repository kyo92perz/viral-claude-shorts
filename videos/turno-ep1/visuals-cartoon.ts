// TURNO DA MADRUGADA, ep. 1: Alguém Bateu no Vidro. Each scene only places the camera, the light and the cast of the
// shared world (world-cartoon.ts) at time t. People are ~1.78 m tall (faces at ~1.4 m). Store interior at x = 100:
// counter x 103.6-107.2 / z 1.6-2.8, right shelf x 101-102.2 / z -2..1.9, coolers on the back wall (z -4.2), windows on
// the front wall (z 5.1), door x 99-101. The fight arena is behind the counter (x 102.4-108.8, z -4..1.5).
const e1K = (s: Scene, id: string, f: number) => s.keys?.find((k) => k.id === id)?.t ?? f;
/** mouth flaps while a line is spoken */
const e1Talk = (t: number, a: tm_Expr, b: tm_Expr, on = true) => (on && Math.floor(t * 7) % 2 ? b : a);
const e1Int = (t: number, bad = 0.12, power = 1) => { const st = TM_.st!; st.light('store', { view: [0, -1] }); tm_lights({ store: power * tm_flick(t, bad), t }); return st; };
const e1Ext = (t: number, bad = 0.2, cop = 0) => { const st = TM_.st!; st.light('night', { view: [0.3, -1] }); tm_lights({ store: tm_flick(t, bad), cop, t }); TM_.cop!.position.set(-200, 0, 0); return st; };
const e1Dark = (t: number) => { const st = TM_.st!; st.light('blackout', { view: [0, -1] }); tm_lights({ store: 0, t }); return st; };
/** a walk cycle on top of a pose (legs and arms swing), `sp` cycles per second */
const e1Walk = (t: number, base: tm_Pose = TM_P.stand, sp = 1.6, amp = 1): tm_Pose => {
  const w = Math.sin(t * sp * Math.PI * 2) * amp;
  return { ...base, legL: [-16 * w - 2, -4 * w + Math.max(0, w) * 14], legR: [16 * w + 2, 4 * w + Math.max(0, -w) * 14], armL: [10 * w - 8, 10 * w - 4], armR: [-10 * w + 8, -10 * w + 4], hip: [0, -4 * Math.abs(w)] };
};
const e1Look = (st: ReturnType<typeof CT.stage>, a: tm_V3, b: tm_V3, ta: tm_V3, tb: tm_V3, u: number, fov = 40, roll = 0, shake: tm_V3 = [0, 0, 0]) =>
  st.look(tm_add(tm_lerp3(a, b, tm_ease(u)), shake), tm_add(tm_lerp3(ta, tb, tm_ease(u)), shake), fov, roll);
/** which way (on screen) `a` must face to look at `b`, for the camera already placed this frame */
const e1Fc = (st: ReturnType<typeof CT.stage>, a: tm_V3, b: tm_V3): 1 | -1 => {
  const r = new THREE.Vector3().setFromMatrixColumn(st.cam.matrixWorld, 0);
  return (b[0] - a[0]) * r.x + (b[2] - a[2]) * r.z >= 0 ? 1 : -1;
};
/** a rig that faces a point (screen side from the camera) */
const e1At = (st: ReturnType<typeof CT.stage>, id: number, who: string, at: tm_V3, to: tm_V3, P: tm_Pose, t: number, k = 1, extra: tm_Pose = {}) =>
  tm_rig(st, id, who, at, tm_face(P, e1Fc(st, at, to), extra), t, k);

// the fight arena (behind the counter): Lola on the shelf side, Dale on the coolers' corner
const E1_L: tm_V3 = [103.3, 0, 0.0], E1_D: tm_V3 = [104.5, 0, 0.0];

CT.shots([
  // ---- the station in the fog ----
  { id: 's01', fn(t: number, u: number) {
    const st = e1Ext(t, 0.25);
    e1Look(st, [14, 6.5, 31], [9, 2.4, 23], [2, 2.6, 0], [0.5, 2.0, 0], u, 34);
    tm_fog(st, t, [0, 0, 9], 14, 16, 0.6);
  } },
  { id: 's02', fn(t: number, u: number) {
    const st = e1Ext(t, 0.2);
    e1Look(st, [-8, 1.7, 24], [-7, 1.7, 18], [-4.5, 2.0, -4], [-4.5, 2.0, -4], u, 34, 2);
    tm_fog(st, t, [0, 0, 8], 10, 12, 0.45);
  } },
  { id: 's03', fn(t: number, u: number, s: Scene) {
    const st = e1Ext(t, 0.35), m = e1K(s, 'mortos', s.t0 + 1.6);
    e1Look(st, [-5.2, 0.7, 9.5], [-4.8, 0.75, 8.8], [-9, 1.3, 0.5], [-9, 1.3, 0.5], u, 38, -4);
    tm_fog(st, t, [-8, 0, 2], 10, 10, 0.6);
    const x = -10.2 + (t - s.t0) * 0.3;
    tm_rig(st, 20, 'oco', [x, 0, 0.5], tm_face(e1Walk(t, TM_P.stand, 0.7, 0.6), 1, { maw: t > m ? 0.35 : 0, head: t > m ? 14 : 0 }), t);
  } },
  // ---- the night shift ----
  { id: 's04', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t), sh = e1K(s, 'shrug', s.t0 + 4);
    e1Look(st, [105.7, 1.5, 4.5], [105.7, 1.48, 3.9], [105.9, 1.2, 1.0], [105.9, 1.25, 1.0], u, 40);
    tm_rig(st, 1, 'lola', [105.9, 0, 1.0], { ...(t < sh ? TM_P.arms : TM_P.shrug), facing: 0, expr: t < sh ? e1Talk(t, 'stern', 'neutral') : e1Talk(t, 'smile', 'grin') }, t);
  } },
  { id: 's05', fn(t: number, u: number) {
    const st = e1Int(t, 0.1);
    e1Look(st, [94.4, 1.45, 0.4], [94.0, 1.45, -0.1], [92.1, 1.2, -2.5], [92.1, 1.25, -2.5], u, 40, 3);
    tm_rig(st, 2, 'tobby', [92.1, 0, -2.4], { ...TM_P.stand, armR: [40, 168], prop: { kind: 'mic', hand: 'R', ang: 160 }, expr: e1Talk(t, 'grin', 'laugh'), head: 5 * Math.sin(t * 3), facing: 1 }, t);
  } },
  { id: 's06', fn(t: number, u: number) {
    const st = e1Int(t, 0.1);
    e1Look(st, [95.0, 1.5, 1.4], [94.8, 1.5, 1.1], [92.8, 1.15, -2.3], [92.8, 1.15, -2.3], u, 42);
    const T: tm_V3 = [92.0, 0, -2.5], L: tm_V3 = [93.6, 0, -1.9];
    e1At(st, 2, 'tobby', T, L, { ...TM_P.scared, prop: { kind: 'mic', hand: 'L', ang: 170 } }, t, 1, { expr: 'nervous' });
    e1At(st, 1, 'lola', L, T, TM_P.arms, t, 1, { expr: e1Talk(t, 'stern', 'neutral') });
  } },
  { id: 's07', fn(t: number, u: number, s: Scene) {
    const m = e1K(s, 'mina', s.t0 + 3.5), st = e1Int(t, t > m && t < m + 0.8 ? 0.9 : 0.1);
    e1Look(st, [93.8, 1.5, 0.4], [93.1, 1.5, -0.7], [92.2, 1.35, -2.5], [92.2, 1.4, -2.5], u, 38, -3);
    tm_rig(st, 2, 'tobby', [92.1, 0, -2.5], tm_face(t < m ? TM_P.point : TM_P.scared, 1, { expr: t < m ? e1Talk(t, 'nervous', 'shock') : 'shock', head: -6 }), t);
  } },
  { id: 's08', fn(t: number, u: number) {
    const st = e1Ext(t, 0.3);
    e1Look(st, [-7, 1.4, 31], [-5, 1.5, 30], [2, 1.6, 21], [2, 1.5, 19], u, 38);
    tm_fog(st, t, [0, 0, 21], Math.round(8 + 12 * u), 12, 0.5 + 0.35 * u);
  } },
  // ---- the man at the glass ----
  { id: 's09', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.25), k = e1K(s, 'knock', s.t0 + 0.2);
    e1Look(st, [103.4, 1.55, 0.2], [103.5, 1.55, 0.7], [103.8, 1.45, 6.0], [103.8, 1.5, 6.0], u, 40);
    tm_rig(st, 21, 'oco', [103.9, 0, 6.0], { ...TM_P.stand, armR: [150, 172], facing: 0 }, t);
    for (let j = 0; j < 3; j++) { const kj = k + j * 0.32; if (t > kj && t < kj + 0.6) tm_knock(st, [104.2, 1.75, 5.0], (t - kj) / 0.6); }
    tm_rig(st, 2, 'tobby', [103.1, 0, 3.3], tm_face(TM_P.scared, 1, { expr: 'shock' }), t);
  } },
  { id: 's10', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.3), r = e1K(s, 'reveal', s.t0 + 0.5);
    e1Look(st, [103.9, 1.45, 3.4], [103.9, 1.45, 3.9], [103.9, 1.42, 6.0], [103.9, 1.42, 6.0], u, 36, -3);
    tm_rig(st, 21, 'oco', [103.9, 0, 6.0], { ...TM_P.stand, armR: [150, 172], armL: [-150, -172], facing: 0, maw: 0, head: t > r ? 8 : 0 }, t);
  } },
  { id: 's11', fn(t: number, u: number) {
    const st = e1Int(t, 0.2);
    e1Look(st, [102.4, 1.4, 0.6], [102.6, 1.42, 1.1], [103.4, 1.3, 4.6], [103.4, 1.35, 4.6], u, 42, 3);
    tm_rig(st, 21, 'oco', [104.1, 0, 6.0], { ...TM_P.stand, armR: [155, 175], facing: -1, head: 12 + 4 * Math.sin(t * 2), maw: 0 }, t);
    tm_rig(st, 2, 'tobby', [102.9, 0, 3.4], tm_face(TM_P.scared, 1, { expr: 'shock' }), t);
  } },
  { id: 's12', fn(t: number, u: number) {
    const st = e1Int(t, 0.15);
    e1Look(st, [102.9, 1.45, 1.6], [102.9, 1.45, 1.9], [102.9, 1.38, 3.4], [102.9, 1.38, 3.4], u, 34);
    tm_rig(st, 2, 'tobby', [102.9, 0, 3.4], { ...TM_P.scared, facing: 0, expr: e1Talk(t, 'pained', 'nervous'), head: -4 }, t);
  } },
  // ---- the sheriff ----
  { id: 's13', fn(t: number, u: number, s: Scene) {
    const st = e1Ext(t, 0.2, 1), c = e1K(s, 'car', s.t0 + 1), g = e1K(s, 'gone', s.t0 + 5);
    e1Look(st, [-2.0, 1.3, 13.0], [-1.6, 1.35, 13.4], [2.0, 1.15, 18.0], [1.8, 1.2, 18.0], u, 40);
    const k = tm_ease((t - s.t0) / Math.max(0.5, c + 1.6 - s.t0)), cop = TM_.cop!;
    cop.position.set(-32 + 31.5 * k, 0, 19.6); cop.rotation.y = Math.PI / 2;
    tm_fog(st, t, [0, 0, 16], 10, 12, 0.5);
    if (t > c + 1.9) {
      const E: tm_V3 = [2.3, 0, 17.6];
      tm_rig(st, 3, 'earl', E, tm_face({ ...TM_P.point, prop: { kind: 'flashlight', hand: 'R', ang: 95, on: 1 } }, -1, { expr: t > g ? 'stern' : 'neutral' }), t);
      tm_glow(st, [1.65, 1.1, 17.7], 1.4, '#fff2c0', 0.9);
    }
  } },
  { id: 's14', fn(t: number, u: number) {
    const st = e1Int(t, 0.08);
    e1Look(st, [102.8, 1.5, 4.6], [103.0, 1.5, 4.4], [105.2, 1.2, 2.2], [105.2, 1.22, 2.2], u, 46, -2);
    const E: tm_V3 = [104.4, 0, 3.4], L: tm_V3 = [106.0, 0, 1.0];
    e1At(st, 3, 'earl', E, L, { ...TM_P.relax, prop: u > 0.5 ? { kind: 'coffee', hand: 'R', ang: 160 } : null, armR: u > 0.5 ? [40, 165] : [10, 30] }, t, 1, { expr: e1Talk(t, 'stern', 'neutral', u < 0.85) });
    e1At(st, 1, 'lola', L, E, u > 0.5 ? TM_P.shrug : TM_P.relax, t, 1, { expr: 'smile' });
  } },
  { id: 's15', fn(t: number, u: number) {
    const st = e1Int(t, 0.15);
    e1Look(st, [103.6, 1.1, 5.0], [103.7, 1.12, 4.85], [104.4, 1.05, 3.4], [104.4, 1.15, 3.4], u, 40, 4);
    tm_rig(st, 3, 'earl', [104.4, 0, 3.4], tm_face({ ...TM_P.stand, armR: [6, -12], prop: { kind: 'revolver', hand: 'R', ang: 4 } }, 1, { expr: 'stern', head: -8 }), t);
  } },
  // ---- Dale ----
  { id: 's16', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.2), d = e1K(s, 'door', s.t0 + 0.5);
    e1Look(st, [105.6, 1.45, 0.3], [105.4, 1.45, 0.5], [101.2, 1.15, 4.1], [102.0, 1.2, 3.8], u, 38, 3);
    const k = Math.min(1, Math.max(0, (t - d) / 4.5)), x = 100 + 2.4 * k, z = 4.6 - 1.0 * k;
    tm_rig(st, 4, 'dale', [x, 0, z], tm_face(e1Walk(t, TM_P.stand, 0.9, k < 1 ? 0.8 : 0), 1, { torso: 12, head: 22, expr: 'grin' }), t);
  } },
  { id: 's17', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.4), f = e1K(s, 'fome', s.t0 + 1.6);
    e1Look(st, [103.5, 1.45, 2.0], [103.45, 1.45, 2.3], [102.6, 1.4, 3.6], [102.6, 1.4, 3.6], u, 36, -6);
    tm_rig(st, 4, t > f ? 'daleHollow' : 'dale', [102.6, 0, 3.6], { ...TM_P.stand, facing: 1, torso: 8, head: 18, expr: 'grin', maw: 0 }, t);
  } },
  // ---- fight 1: Lola vs Dale behind the counter (camera by the coolers, the shelf on screen right) ----
  { id: 's18', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.15), g = e1K(s, 'grab', s.t0 + 0.5), sl = e1K(s, 'slam', s.t0 + 2.6);
    const shake = tm_add(tm_shake(t, g, 0.03), tm_shake(t, sl, 0.09));
    e1Look(st, [103.9, 1.35, -3.9], [103.7, 1.3, -3.5], [103.85, 1.0, 0.0], [103.55, 1.0, 0.0], u, 50, 0, shake);
    const fly = tm_ease((t - (sl - 0.3)) / 0.3), L: tm_V3 = [E1_L[0] - 0.7 * fly, 0, 0], D: tm_V3 = [E1_D[0] - 0.3 * tm_ease((t - s.t0) / 0.5), 0, 0];
    const PL = tm_seq(t, [[s.t0, 'guard'], [g, 'grabbed'], [sl - 0.3, 'thrown'], [sl + 0.2, 'thrown', { hip: [-30, 40], expr: 'pained' }]]);
    const PD = tm_seq(t, [[s.t0, 'lunge'], [g, 'grab'], [sl - 0.3, 'swing'], [sl + 0.3, 'stand', { torso: 10, head: 18 }]]);
    e1At(st, 1, 'lola', L, D, PL, t, 1, { expr: PL.expr ?? 'stern' });
    e1At(st, 4, 'daleHollow', D, L, PD, t, 1, { expr: 'grin' });
    if (t > sl && t < sl + 1) { st.effect('puff', [102.4, 1.2, 0.0], 1.2, (t - sl) / 1); st.effect('burst', [102.5, 1.4, 0.2], 0.9, (t - sl) / 0.4); }
  } },
  { id: 's19', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.12), w = e1K(s, 'wrist', s.t0 + 0.5), e = e1K(s, 'elbow', s.t0 + 2), k = e1K(s, 'knee', s.t0 + 3.2);
    const shake = tm_add(tm_shake(t, e, 0.07), tm_shake(t, k, 0.07));
    e1Look(st, [103.85, 1.4, -3.9], [103.85, 1.4, -3.5], [103.85, 1.1, 0.0], [103.85, 1.05, 0.0], u, 50, -3, shake);
    const L: tm_V3 = [103.3, 0, 0.0], D: tm_V3 = [104.35, 0, 0.0], fL = e1Fc(st, L, D);
    const PL = tm_seq(t, [[s.t0, 'grabbed'], [w, 'wrist', { expr: 'stern' }], [e - 0.15, 'elbow', { expr: 'stern' }], [k - 0.15, 'knee', { expr: 'stern' }]], 0.15);
    const PD = tm_seq(t, [[s.t0, 'grab'], [w + 0.1, 'grab', { armL: [70, 40], armR: [60, 30] }], [e, 'hitHead'], [k, 'hitBody']], 0.12);
    tm_rig(st, 1, 'lola', L, tm_face(PL, fL, { blood: 0.15 }), t);
    tm_rig(st, 4, 'daleHollow', D, tm_face(PD, (-fL) as 1 | -1, { expr: 'grin', blood: t > e ? 0.4 : 0 }), t);
    if (t > e && t < e + 0.6) tm_spray(st, [104.25, 1.55, 0.05], 1.4, (t - e) / 0.6, 7, -fL, true);
    if (t > k && t < k + 0.6) { tm_spray(st, [104.25, 1.0, 0.05], 1.1, (t - k) / 0.6, 9, -fL, true); st.effect('burst', [103.9, 0.95, 0.1], 0.7, (t - k) / 0.4); }
  } },
  { id: 's20', fn(t: number, u: number) {
    const st = e1Int(t, 0.3);
    e1Look(st, [104.35, 1.45, -1.7], [104.35, 1.45, -1.4], [104.35, 1.42, 0.0], [104.35, 1.45, 0.0], u, 36, 5);
    tm_rig(st, 4, 'daleHollow', [104.35, 0, 0.0], { ...TM_P.stand, facing: 0, torso: -6 * u, head: -18 * u, maw: 0.15 * u, blood: 0.5, armL: [-30, -60], armR: [30, 60] }, t);
  } },
  { id: 's21', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.2), l = e1K(s, 'lift', s.t0 + 0.6), k = tm_ease((t - l) / 0.4);
    e1Look(st, [103.8, 0.6, -3.0], [103.8, 0.65, -2.7], [103.8, 1.25, 0.0], [103.8, 1.35, 0.0], u, 50, 2, tm_shake(t, l, 0.04));
    const L: tm_V3 = [103.3, 0, 0.0], D: tm_V3 = [104.35, 0, 0.0];
    e1At(st, 1, 'lola', L, D, tm_mix(TM_P.grabbed, TM_P.lifted, k), t, 1, { blood: 0.25, expr: 'pained' });
    e1At(st, 4, 'daleHollow', D, L, tm_mix(TM_P.grab, TM_P.choke, k), t, 1, { maw: 0.2, blood: 0.5 });
  } },
  // ---- the counter: side camera from the right wall (counter on screen left) ----
  { id: 's22', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.15), kk = e1K(s, 'kick', s.t0 + 0.3), sn = e1K(s, 'snap', s.t0 + 2), s1 = e1K(s, 'slam1', s.t0 + 2.7), s2 = e1K(s, 'slam2', s.t0 + 4.2);
    const shake = tm_add(tm_add(tm_shake(t, kk, 0.05), tm_shake(t, s1, 0.1)), tm_shake(t, s2, 0.1));
    e1Look(st, [108.5, 1.4, 0.55], [108.3, 1.4, 0.55], [104.4, 1.0, 0.75], [104.4, 0.98, 0.75], u, 50, 0, shake);
    const hitAmt = (x: number) => Math.max(0, 1 - Math.abs(t - x) / 0.25);
    if (t < s1 - 0.4) {
      const L: tm_V3 = [104.4, 0, 0.0], D: tm_V3 = [104.4, 0, 1.1];
      const PL = tm_seq(t, [[s.t0, 'lifted'], [kk, 'kickLow', { expr: 'stern' }], [kk + 0.5, 'guard', { expr: 'stern' }]], 0.15);
      const PD = tm_seq(t, [[s.t0, 'choke'], [kk + 0.05, 'hitBody', { legR: [30, 70] }], [sn, 'crouch', { legR: [60, 100], expr: 'pained' }]], 0.15);
      e1At(st, 1, 'lola', L, D, PL, t, 1, { blood: 0.3 });
      e1At(st, 4, 'daleHollow', D, L, PD, t, 1, { maw: 0.3, blood: 0.5 });
      if (t > sn && t < sn + 0.4) st.effect('creak', [104.4, 0.5, 1.15], 0.6, (t - sn) / 0.4);
    } else {
      const bang = Math.max(hitAmt(s1), hitAmt(s2)), D: tm_V3 = [104.4, 0, 1.15], L: tm_V3 = [104.4, 0, 0.25], C: tm_V3 = [104.4, 0, 2.2];
      e1At(st, 4, 'daleHollow', D, C, { ...TM_P.hitBody, torso: 58 + 14 * bang, head: 18, hip: [0, 20], armL: [60, 80], armR: [80, 100] }, t, 1, { maw: 0.3, blood: 0.6 });
      e1At(st, 1, 'lola', L, C, TM_P.slam, t, 1, { torso: 30 + 18 * bang, blood: 0.3 });
      for (const x of [s1, s2]) if (t > x && t < x + 0.6) { tm_spray(st, [104.4, 1.25, 1.65], 1.3, (t - x) / 0.6, 11 + Math.round(x), 1, true); st.effect('burst', [104.4, 1.2, 1.6], 0.8, (t - x) / 0.35); }
    }
  } },
  { id: 's23', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.2), c = e1K(s, 'coal', s.t0 + 1.5);
    e1Look(st, [107.4, 1.4, 1.0], [107.2, 1.38, 1.05], [104.4, 1.05, 1.5], [104.4, 1.02, 1.5], u, 44, -4);
    const D: tm_V3 = [104.4, 0, 1.15];
    e1At(st, 4, 'daleHollow', D, [104.4, 0, 2.2], { ...TM_P.hitBody, torso: 66, head: 22, hip: [0, 20], armL: [60, 80], armR: [80, 100], maw: 0.2, expr: 'dazed' }, t, 1, { blood: 0.9 });
    const k = Math.min(1, Math.max(0, (t - c + 1) / 2));
    st.card({ key: `e1-pool-${Math.round(k * 10)}`, cw: 256, ch: 256, at: [104.4, 1.135, 1.9], w: 0.3 + 0.7 * k, h: 0.3 + 0.7 * k, flat: true, draw: (p) => p.ell(128, 128, 120, 90, '#121014', 0) });
    if (t > c && t < c + 0.6) tm_spray(st, [104.4, 1.3, 1.6], 1.0, (t - c) / 0.6, 21, -1, true);
  } },
  { id: 's24', fn(t: number, u: number, s: Scene) {
    const st = e1Int(t, 0.15), h = e1K(s, 'hit', s.t0 + 4), f = e1K(s, 'fall', s.t0 + 5.4);
    e1Look(st, [104.3, 1.4, -3.7], [104.3, 1.4, -3.4], [104.35, 1.05, 0.4], [104.4, 0.95, 0.4], u, 52, 0, tm_shake(t, h, 0.1));
    const run = tm_ease((t - s.t0) / Math.max(0.5, h - 0.8 - s.t0)), T: tm_V3 = [102.7 + 0.85 * run, 0, 0.5], D: tm_V3 = [104.5, 0, 0.6], L: tm_V3 = [105.5, 0, 0.1];
    const PT = tm_seq(t, [[s.t0, e1Walk(t, TM_P.stand, 2.4), { prop: { kind: 'extinguisher', hand: 'R', ang: 30 }, expr: 'shock' }], [h - 0.6, 'windup', { prop: { kind: 'extinguisher', hand: 'R', ang: 200 }, expr: 'stern' }], [h, 'swing', { prop: { kind: 'extinguisher', hand: 'R', ang: 110 }, expr: 'stern' }], [h + 0.8, 'stand', { prop: { kind: 'extinguisher', hand: 'R', ang: 10 }, expr: 'shock' }]], 0.15);
    e1At(st, 2, 'tobby', T, D, PT, t);
    const PD = tm_seq(t, [[s.t0, 'hitBody', { torso: 40, expr: 'grin' }], [s.t0 + 1.4, 'lunge', { expr: 'grin' }], [h, 'hitHead', { head: 30 }], [f, 'downFace']], 0.2);
    e1At(st, 4, 'daleHollow', D, L, PD, t, 1, { maw: 0.5, blood: 0.8 });
    e1At(st, 1, 'lola', L, D, TM_P.guard, t, 0.98, { expr: t > h ? 'shock' : 'pained', blood: 0.3 });
    if (t > h && t < h + 0.6) { tm_spray(st, [104.4, 1.55, 0.65], 1.3, (t - h) / 0.6, 31, e1Fc(st, T, D), true); st.effect('stars', [104.5, 1.95, 0.6], 0.8, (t - h) / 0.6); }
    if (t > f && t < f + 0.7) st.effect('puff', [104.5, 0.3, 0.6], 1.4, (t - f) / 0.7);
  } },
  { id: 's25', fn(t: number, u: number) {
    const st = e1Int(t, 0.3);
    e1Look(st, [104.5, 0.85, -2.9], [104.5, 0.9, -2.6], [104.5, 1.15, 1.6], [104.5, 1.2, 1.6], u, 58, 2);
    const D: tm_V3 = [104.5, 0, 0.5], L: tm_V3 = [103.8, 0, 0.0], T: tm_V3 = [105.25, 0, 0.0];
    e1At(st, 4, 'daleHollow', D, L, TM_P.downFace, t, 1, { maw: 0.5, blood: 0.8 });
    tm_rig(st, 3, 'earl', [104.6, 0, 3.4], { ...TM_P.aim, prop: { kind: 'revolver', hand: 'R', ang: 125 }, facing: 0, expr: e1Talk(t, 'shock', 'stern') }, t);
    e1At(st, 1, 'lola', L, D, TM_P.guard, t, 0.95, { expr: 'stern', blood: 0.3 });
    e1At(st, 2, 'tobby', T, D, { ...TM_P.scared, prop: { kind: 'extinguisher', hand: 'L', ang: 10 } }, t, 0.95, { expr: 'nervous' });
  } },
  // ---- the dark ----
  { id: 's26', fn(t: number, u: number, s: Scene) {
    const o = e1K(s, 'off', s.t0 + 1.2), kn = e1K(s, 'knock', s.t0 + 2.4);
    if (t < o + 0.5) {
      const st = t < o ? e1Int(t, 0.6) : e1Dark(t);
      e1Look(st, [104.5, 1.4, -2.9], [104.5, 1.4, -2.7], [104.5, 1.2, 1.6], [104.5, 1.2, 1.6], u, 50);
      tm_rig(st, 1, 'lola', [103.8, 0, 0.0], tm_face(TM_P.guard, 1, { expr: 'shock' }), t, 0.95);
      tm_rig(st, 2, 'tobby', [105.25, 0, 0.0], tm_face(TM_P.scared, -1, { expr: 'shock' }), t, 0.95);
      tm_rig(st, 3, 'earl', [104.6, 0, 3.4], { ...TM_P.scared, facing: 0, expr: 'shock' }, t);
    } else {
      const st = e1Dark(t);
      e1Look(st, [104.5, 1.5, -0.6], [104.5, 1.5, 0.0], [104.5, 1.4, 5.6], [104.5, 1.42, 5.6], (t - o) / (s.t1 - o), 46);
      for (let i = 0; i < 6; i++) tm_rig(st, 22 + i, i % 2 ? 'oco' : 'oco2', [101.8 + i * 1.2, 0, 6.0 + 0.3 * (i % 2)], { ...TM_P.stand, armR: [150 + 8 * Math.sin(t * 3 + i), 172], armL: [-150, -172], facing: 0, maw: i === 2 ? 0.4 : 0 }, t);
      for (let i = 0; i < 6; i++) { const kj = kn + i * 0.13; if (t > kj && t < kj + 0.6) tm_knock(st, [102.0 + i * 1.2, 1.75, 5.0], (t - kj) / 0.6); }
    }
  } },
  { id: 's27', fn(t: number, u: number) {
    const st = e1Dark(t);
    e1Look(st, [104.4, 1.45, -1.9], [104.4, 1.45, -1.6], [104.4, 1.4, 0.4], [104.4, 1.42, 0.4], u, 40, -3);
    tm_rig(st, 1, 'lola', [104.4, 0, 0.4], { ...TM_P.guard, facing: 0, expr: 'shock', head: -4 }, t);
    tm_rig(st, 26, 'oco', [105.2, 0, 6.0], { ...TM_P.stand, armR: [150, 172], facing: 0 }, t);
  } },
  { id: 's28', fn(t: number, u: number) {
    const st = e1Dark(t);
    e1Look(st, [104.4, 1.45, -1.5], [104.4, 1.45, -1.0], [104.4, 1.4, 0.4], [104.4, 1.42, 0.4], u, 36);
    tm_rig(st, 1, 'lola', [104.4, 0, 0.4], { ...TM_P.stand, facing: 0, expr: u < 0.5 ? 'pained' : 'nervous', head: -6 }, t);
  } },
], tm_init, (t, u, shot, s) => shot.fn(t, u, s));
