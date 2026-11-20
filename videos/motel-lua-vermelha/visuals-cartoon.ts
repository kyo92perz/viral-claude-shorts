// MOTEL LUA VERMELHA (16:9): every scene is data for one small interpreter (mvShot): the light and the power of each
// group, a camera move, the cast (who, where, pose or choreography, who they face, who is speaking) and its effects.
// Places (world-cartoon.ts): walkway y 0.15 / z -4.6, ice machine x -2.7..-1.5 (front z -5.2), office interior x = 200
// (counter z -0.6..0.4), room 11 inside x = 300 (wall z -3), Hank's pickup (8, 2.6) facing the rooms, the sign catwalk
// (y 8.65, z 17-18.6), the transformer (-40, 26), the pool (x -11..4, z 6..13).
type mvF<T> = T | ((t: number, u: number, s: Scene) => T);
type mvL = 'night' | 'blood' | 'lamp' | 'blackout' | 'golden';
interface mvA { id: number; who: mvF<string>; at: mvF<mv_V3>; to?: mvF<mv_V3>; f?: 1 | -1 | 0; P: mvF<string | mv_Pose>; x?: mvF<mv_Pose>; k?: number; talk?: boolean | [number, number] }
interface mvS { id: string; L: mvF<mvL>; pw?: mvF<{ rooms?: number; office?: number; sign?: number; car?: number; r11?: number }>; cam: mvF<[mv_V3, mv_V3, mv_V3, mv_V3, number?, number?]>;
  shake?: (t: number, s: Scene) => mv_V3; cast?: mvA[]; fx?: (st: ReturnType<typeof CT.stage>, t: number, u: number, s: Scene) => void; fog?: [mv_V3, number, number, number] }
const mvV = <T,>(x: mvF<T>, t: number, u: number, s: Scene): T => (typeof x === 'function' ? (x as (t: number, u: number, s: Scene) => T)(t, u, s) : x);
const mvK = (s: Scene, id: string, f = s.t0 + 0.5) => s.keys?.find((k) => k.id === id)?.t ?? f;
const MV_OPEN: Record<string, mv_Expr> = { stern: 'talkStern', smile: 'talkSmile', grin: 'talkSmile', smile_closed: 'talkSmile', relief: 'talkSmile', pained: 'talkSad', nervous: 'talkSad', shock: 'talkSad' };
const mvTalk = (t: number, e: mv_Expr) => (Math.floor(t * 7) % 2 ? MV_OPEN[e] ?? 'talk' : e);
const mvRight = (st: ReturnType<typeof CT.stage>) => new THREE.Vector3().setFromMatrixColumn(st.cam.matrixWorld, 0);
const mvWalk = (t: number, base: mv_Pose = MV_P.stand, sp = 1.6, amp = 1): mv_Pose => {
  const w = Math.sin(t * sp * Math.PI * 2) * amp;
  return { ...base, legL: [-16 * w - 2, -4 * w + Math.max(0, w) * 14], legR: [16 * w + 2, 4 * w + Math.max(0, -w) * 14], hip: [base.hip?.[0] ?? 0, (base.hip?.[1] ?? 0) - 4 * Math.abs(w)] };
};
const mvRun = (t: number, base: mv_Pose = MV_P.stand) => ({ ...mvWalk(t, base, 2.6, 1.5), torso: 14, armL: [60 * Math.sin(t * 16), 40 + 50 * Math.sin(t * 16)] as [number, number], armR: [-60 * Math.sin(t * 16), -40 - 50 * Math.sin(t * 16)] as [number, number] });
const mvL3 = (a: mv_V3, b: mv_V3, k: number) => mv_lerp3(a, b, Math.min(1, Math.max(0, k)));
/** the light of a scene and the power of each glowing group (rooms, office, the neon sign, cars, room 11) */
const mvLight = (st: ReturnType<typeof CT.stage>, L: mvL, t: number, pw: { rooms?: number; office?: number; sign?: number; car?: number; r11?: number }) => {
  st.light(L, L === 'golden' ? { view: [0.3, -1], az: 20, el: 8 } : { view: [0.3, -1] });
  mv_power('rooms', pw.rooms ?? 1); mv_power('office', pw.office ?? 1); mv_power('sign', (pw.sign ?? 1) * mv_flick(t, 0.12)); mv_power('car', pw.car ?? 0); mv_power('r11', pw.r11 ?? 1);
};
const mvShots = (list: mvS[]) => CT.shots(list, mv_init, (t, u, S, s) => {
  const st = MV_.st!; mvLight(st, mvV(S.L, t, u, s), t, mvV(S.pw ?? {}, t, u, s));
  const [a, b, ta, tb, fov = 36, roll = 0] = mvV(S.cam, t, u, s), sh = S.shake ? S.shake(t, s) : [0, 0, 0] as mv_V3, e = mv_ease(u);
  st.look(mv_add(mv_lerp3(a, b, e), sh), mv_add(mv_lerp3(ta, tb, e), sh), fov, roll);
  const r = mvRight(st);
  for (const A of S.cast ?? []) {
    const at = mvV(A.at, t, u, s), P0 = mvV(A.P, t, u, s), P = typeof P0 === 'string' ? MV_P[P0] : P0, x = A.x ? mvV(A.x, t, u, s) : {};
    let f: 1 | -1 | 0 = A.f ?? 0; if (A.to) { const to = mvV(A.to, t, u, s); f = (to[0] - at[0]) * r.x + (to[2] - at[2]) * r.z >= 0 ? 1 : -1; }
    const base = { ...(f === -1 ? mv_flip(P) : P), ...x, facing: f } as mv_Pose;
    const speak = A.talk === true || (Array.isArray(A.talk) && t >= A.talk[0] && t <= A.talk[1]);
    if (speak) base.expr = mvTalk(t, base.expr ?? 'neutral');
    mv_rig(st, A.id, mvV(A.who, t, u, s), at, base, t, A.k ?? 1);
  }
  if (S.fog) mv_fog(st, t, S.fog[0], S.fog[1], S.fog[2], S.fog[3]);
  S.fx?.(st, t, u, s);
});
// line windows (s) for the speakers, from lines.json
const MVT = { hank1: [0.8, 25.2], sofia1: [62.2, 66.9], sofia2: [73.1, 75.3], kev8: [85.4, 93.4], kev9: [93.8, 99.4], kev11: [107.4, 110.5], hank13: [119.2, 124.7], kev14: [125.0, 128.1], hank15: [128.4, 130.1],
  barb17: [138.7, 142.0], gary18: [142.3, 144.9], kev21: [163.6, 167.1], gary24: [178.9, 180.5], barb26: [187.6, 189.7], mari31: [220.7, 222.0], kev32: [222.3, 224.6], gary35: [239.4, 240.5], hank36: [241.3, 243.4],
  hank38: [252.1, 272.7], kev39: [273.2, 275.4], hank40: [275.8, 283.9], sk43: [295.1, 297.2], kev45: [308.8, 311.6], hank48: [325.4, 330.8], kev50: [337.6, 339.3], kev51: [341.9, 344.7], kev51c: [345.6, 346.9], hank54: [360.6, 363.0],
  hank57: [374.5, 379.5], hank61: [408.0, 410.4], kev66: [438.3, 454.5], sk72: [475.7, 478.5], sk76: [503.9, 505.3], hank76: [505.7, 508.4], hank83: [551.6, 553.9], kev84: [554.2, 555.0], hank85: [555.3, 557.3], kev85: [557.8, 567.2] } as const;
const mvW = (k: keyof typeof MVT): [number, number] => [MVT[k][0], MVT[k][1]];
const WALK = 0.15, OX = 200, RX = 300;
/** the moon in the sky: k 0 = white, 1 = blood red (a flat disc far away, facing the camera) */
const mvMoon = (st: ReturnType<typeof CT.stage>, at: mv_V3, size: number, k: number) => {
  const q = Math.round(Math.min(1, Math.max(0, k)) * 10);
  st.card({ key: `mv-moon-${q}`, cw: 256, ch: 256, at, w: size, h: size, soft: true, draw: (p) => {
    const g = p.g, r = Math.round(235 - 60 * q / 10), gg = Math.round(232 - 190 * q / 10), b = Math.round(220 - 190 * q / 10);
    const gr = g.createRadialGradient(128, 128, 60, 128, 128, 128); gr.addColorStop(0, `rgba(${r},${gg},${b},0.35)`); gr.addColorStop(1, `rgba(${r},${gg},${b},0)`); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    g.fillStyle = `rgb(${r},${gg},${b})`; g.beginPath(); g.arc(128, 128, 62, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(0,0,0,0.12)'; for (const [x, y, rr] of [[105, 110, 14], [150, 140, 10], [130, 165, 8]]) { g.beginPath(); g.arc(x, y, rr, 0, Math.PI * 2); g.fill(); }
  } });
};
const ICE_M: mv_V3 = [-0.4, WALK, -4.55], ICE_G: mv_V3 = [-1.45, WALK, -4.55];
const shk = (ids: string[], amp = 0.06) => (t: number, s: Scene) => ids.reduce((a, id) => mv_add(a, mv_shake(t, mvK(s, id, -99), amp)), [0, 0, 0] as mv_V3);
const deskMari: mv_V3 = [199.4, 0, -1.4], deskCust: mv_V3 = [199.8, 0, 1.3];
/** a flat shadow silhouette on a wall (drawn with the rig in black, facing the camera) */
const mvWallShadow = (st: ReturnType<typeof CT.stage>, id: number, who: string, at: mv_V3, P: mv_Pose, t: number, k = 1) => mv_rig(st, id, who, at, P, t, k);

mvShots([
  // ======================= PROLOGUE (1961) =======================
  { id: 'p01', L: 'golden', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[18, 7, 34], [10, 3.2, 24], [2, 2.4, -6], [0, 2.0, -6]] },
  { id: 'p02', L: 'lamp', pw: { r11: 0.5 }, cam: [[296, 1.6, 2.6], [303, 1.6, 2.6], [297, 1.4, -3], [303.5, 1.4, -3]],
    fx: (st, t) => { for (let i = 0; i < 11; i++) mvWallShadow(st, 60 + i, i % 3 ? 'shadow' : 'shadow2', [296.2 + i * 0.78, 0, -2.95], { ...MV_P.stand, armL: [-10 - (i % 4) * 30, -20], armR: [10 + (i % 3) * 25, 30], facing: 0 }, t, 0.9); } },
  { id: 'p03', L: 'night', cam: [[11.2, 1.45, -1.4], [11.4, 1.45, -2.0], [12, 1.4, -4.6], [12, 1.45, -4.6], 30],
    cast: [{ id: 3, who: 'hank', at: [12, WALK, -4.6], f: 0, P: 'stand', x: { expr: 'stern', head: -8 }, talk: mvW('hank1') }] },
  // ======================= THE NIGHT BEGINS =======================
  { id: 'a01', L: 'lamp', cam: [[199.4, 1.5, 2.6], [199.4, 1.48, 2.0], [199.4, 1.3, -1.4], [199.4, 1.32, -1.4], 34],
    cast: [{ id: 1, who: 'mari', at: deskMari, f: 0, P: 'arms', x: { expr: 'smile' } }] },
  { id: 'a02', L: 'night', cam: [[-30, 2.2, 38], [-10, 2.2, 38], [10, 3, 18], [20, 3, 18], 34],
    fx: (st, t, u) => { const c = MV_.cars!.kev; c.position.set(-60 + 120 * u, 0, 31.5); c.rotation.y = Math.PI / 2; mv_power('car', 1); void st; void t; } },
  { id: 'a03', L: 'lamp', cam: [[201.6, 1.45, 2.2], [201.2, 1.45, 1.8], [199.4, 1.25, -1.4], [199.4, 1.3, -1.4], 36, -2],
    cast: [{ id: 1, who: 'mari', at: deskMari, f: 1, P: (t) => mv_seq(t % 1.6, [[0, 'guard'], [0.3, 'jab'], [0.55, 'guard'], [0.85, 'cross'], [1.15, 'guard']], 0.12), x: { expr: 'stern' } }] },
  { id: 'a04', L: 'lamp', cam: [[200.6, 1.45, 1.6], [200.4, 1.45, 1.2], [199.4, 1.4, -1.4], [199.4, 1.42, -1.4], 32],
    cast: [{ id: 1, who: 'mari', at: deskMari, f: 1, P: { ...MV_P.stand, armR: [150, 200], prop: { kind: 'phone', hand: 'R', ang: 200 } }, x: { expr: 'smile', head: 6 } }] },
  { id: 'a05', L: 'lamp', cam: [[200.2, 1.45, 1.0], [200.1, 1.45, 0.8], [199.4, 1.4, -1.4], [199.4, 1.42, -1.4], 30],
    cast: [{ id: 1, who: 'mari', at: deskMari, f: 1, P: { ...MV_P.stand, armR: [150, 200], prop: { kind: 'phone', hand: 'R', ang: 200 } }, x: { expr: 'stern', head: 6 }, talk: [67.2, 72.8] }] },
  { id: 'a06', L: 'lamp', cam: [[199.4, 1.5, 1.6], [199.4, 1.5, 1.2], [199.4, 1.4, -1.4], [199.4, 1.42, -1.4], 30],
    cast: [{ id: 1, who: 'mari', at: deskMari, f: 0, P: 'stand', x: { expr: 'smile_closed' }, talk: [75.6, 78.5] }] },
  { id: 'a07', L: 'night', pw: { car: 1 }, cam: [[-4, 1.2, 14], [-6, 1.2, 12], [-12, 1.0, 6], [-12, 1.0, 3], 38],
    fx: (st, t, u) => { const c = MV_.cars!.kev; c.position.set(-12, 0, 18 - 15.6 * mv_ease(Math.min(1, u * 1.4))); c.rotation.y = Math.PI; mv_glow(st, [-12, 0.7, c.position.z - 2.4], 1.6, '#fff2c8', 0.9); } },
  { id: 'a08', L: 'night', pw: { car: 1 }, cam: [[-9.2, 1.5, -0.6], [-9.6, 1.5, -0.9], [-11.2, 1.4, -1.6], [-11.2, 1.42, -1.6], 30],
    cast: [{ id: 2, who: 'kev', at: [-11.2, 0, -1.6], f: 1, P: { ...MV_P.film, armR: [150, 200], prop: { kind: 'phone', hand: 'R', ang: 200, on: 1 } }, x: { expr: 'grin', head: 4 * Math.sin(1) }, talk: true }],
    fx: (st) => { MV_.cars!.kev.position.set(-12, 0, 2.4); mv_glow(st, [-10.7, 1.6, -1.55], 0.5, '#ffffff', 0.9); } },
  { id: 'a09', L: 'lamp', cam: [[202.6, 1.5, 3.2], [202.2, 1.5, 2.9], [199.6, 1.25, 0.0], [199.6, 1.25, 0.0], 38],
    cast: [{ id: 2, who: 'kev', at: deskCust, to: deskMari, P: 'film', x: { expr: 'grin' }, talk: mvW('kev9') }, { id: 1, who: 'mari', at: deskMari, to: deskCust, P: 'arms', x: { expr: 'stern' } }] },
  { id: 'a10', L: 'lamp', cam: [[199.6, 1.5, 1.4], [199.5, 1.48, 1.1], [199.4, 1.4, -1.4], [199.4, 1.42, -1.4], 30],
    cast: [{ id: 1, who: 'mari', at: deskMari, f: 0, P: 'arms', x: { expr: 'stern' }, talk: true }] },
  { id: 'a11', L: 'lamp', cam: [[198.0, 1.5, 3.0], [198.3, 1.5, 2.7], [199.6, 1.3, 0.1], [199.6, 1.3, 0.1], 36],
    cast: [{ id: 2, who: 'kev', at: deskCust, to: deskMari, P: 'film', x: { expr: 'laugh' }, talk: true }, { id: 1, who: 'mari', at: deskMari, to: deskCust, P: 'arms', x: { expr: 'stern' } }],
    fx: (st) => mv_glow(st, [199.4, 1.75, 1.2], 0.45, '#ffffff', 0.9) },
  { id: 'a12', L: 'night', cam: [[14, 1.5, 5.5], [12.5, 1.5, 5.2], [10, 1.2, -1.5], [9.6, 1.2, -1.5], 36],
    cast: [{ id: 2, who: 'kev', at: (t, u) => mvL3([4, WALK, -4.6], [7.2, WALK, -4.6], u * 1.5), f: 1, P: (t) => mvWalk(t, MV_P.film, 1.4, 0.6), x: { expr: 'grin' } },
      { id: 3, who: 'hank', at: [9.0, 0, 0.0], f: -1, P: { ...MV_P.hold, prop: { kind: 'wrench', hand: 'R', ang: 120 } }, x: { expr: 'stern' } }] },
  { id: 'a13', L: 'night', cam: [[5.4, 1.5, 0.9], [5.6, 1.5, 0.7], [8.4, 1.25, -1.1], [8.4, 1.25, -1.1], 38],
    cast: [{ id: 3, who: 'hank', at: [9.2, 0, -0.6], to: [7.6, 0, -1.6], P: 'point', x: { expr: 'stern' }, talk: [119.2, 124.7] },
      { id: 2, who: 'kev', at: [7.6, 0, -1.6], to: [9.2, 0, -0.6], P: 'film', x: { expr: 'smile' }, talk: mvW('kev14') }],
    fx: (st) => mv_glow(st, [7.9, 1.7, -1.5], 0.4, '#ffffff', 0.8) },
  { id: 'a14', L: 'night', cam: [[9.2, 1.45, 1.0], [9.2, 1.45, 0.8], [9.2, 1.4, -0.6], [9.2, 1.42, -0.6], 30],
    cast: [{ id: 3, who: 'hank', at: [9.2, 0, -0.6], f: 0, P: 'arms', x: { expr: 'stern' }, talk: true }] },
  { id: 'a15', L: 'night', pw: { car: 0 }, cam: [[-14.2, 1.5, 0.6], [-14.6, 1.5, 0.9], [-17.9, 1.2, 5.3], [-17.9, 1.2, 5.3], 38],
    cast: [{ id: 5, who: 'barb', at: [-17.2, 0, 5.2], to: [-18.6, 0, 5.4], P: 'pose', x: { expr: 'grin' } }, { id: 6, who: 'gary', at: [-18.6, 0, 5.4], to: [-17.2, 0, 5.2], P: 'film', x: { expr: 'smile' } }] },
  { id: 'a16', L: 'night', cam: [[-1.2, 1.4, 1.2], [-1.2, 1.4, 0.6], [-1.0, 1.25, -4.6], [-1.0, 1.25, -4.6], 38],
    cast: [{ id: 5, who: 'barb', at: [-1.6, WALK, -4.7], f: 1, P: 'pose', x: { expr: 'grin' }, talk: mvW('barb17') }, { id: 6, who: 'gary', at: [-0.2, 0, -3.0], to: [-1.6, 0, -4.7], P: 'film', x: { expr: 'smile' }, talk: mvW('gary18') }] },
  { id: 'a17', L: (t, u) => (u < 0.45 ? 'night' : 'blood'), cam: [[0, 1.0, 10], [0, 1.0, 10], [8, 10, -30], [8, 9, -30], 40],
    fx: (st, t, u, s) => { const b = mvK(s, 'buzz', s.t1 - 1.5); if (t > b) mv_power('sign', 0.4 + 0.6 * mv_flick(t, 0.7)); mvMoon(st, [8, 13 - 1.5 * u, -34], 7, u * 1.4); } },
  // ======================= THE FIRST SHADOW =======================
  { id: 'b01', L: 'blood', cam: [[-5.2, 1.5, 0.8], [-4.8, 1.5, 0.4], [-1.4, 1.3, -4.6], [-1.4, 1.3, -4.6], 40],
    cast: [{ id: 2, who: 'kev', at: [-3.6, 0, -1.6], to: ICE_G, P: 'film', x: { expr: 'grin' } }, { id: 6, who: 'gary', at: [-0.3, WALK, -3.9], to: ICE_G, P: 'film', x: { expr: 'smile' } },
      { id: 5, who: 'barb', at: ICE_G, f: 1, P: 'pose', x: { expr: 'grin' } }],
    fx: (st, t) => mvWallShadow(st, 21, 'shGary', [-0.6, WALK, -5.95], { ...MV_P.film, facing: -1 }, t) },
  { id: 'b02', L: 'blood', cam: [[-0.6, 1.4, -1.2], [-0.6, 1.4, -1.6], [-0.6, 1.3, -5.6], [-0.6, 1.3, -5.6], 36],
    cast: [{ id: 6, who: 'gary', at: [-0.2, WALK, -3.9], f: -1, P: 'film', x: { expr: 'smile' } }],
    fx: (st, t) => mvWallShadow(st, 21, 'shGary', [-0.9, WALK, -5.95], { ...MV_P.stand, armR: [150 + 20 * Math.sin(t * 3), 170], facing: 0 }, t) },
  { id: 'b03', L: 'blood', cam: [[-0.9, 1.35, -3.6], [-0.9, 1.4, -4.0], [-0.9, 1.4, -5.95], [-0.9, 1.45, -5.95], 34],
    fx: (st, t, u) => mvWallShadow(st, 21, 'shGary', [-0.9, WALK, -5.95], { ...MV_P.wave, armR: [150 + 25 * Math.sin(t * 2.2), 175], facing: u > 0.6 ? 1 : 0, head: u > 0.6 ? 25 : 0 }, t) },
  { id: 'b04', L: 'blood', cam: [[-2.4, 1.4, -1.0], [-2.0, 1.4, -1.4], [-0.6, 1.3, -4.8], [-0.6, 1.3, -4.6], 36],
    cast: [{ id: 6, who: (t, u, s) => (t > mvK(s, 'in') ? 'garyPale' : 'gary'), at: [-0.2, WALK, -3.9], f: -1, P: (t, u, s) => (t > mvK(s, 'in') ? MV_P.stand : MV_P.scared), x: { expr: 'shock' }, talk: mvW('gary24') }],
    fx: (st, t, u, s) => { const k = Math.min(1, u * 1.6); if (t < mvK(s, 'in')) mvWallShadow(st, 21, 'shGary', mvL3([-0.9, WALK, -5.95], [-0.25, 0.9, -3.85], k), { ...MV_P.lunge, facing: 1 }, t, 1 - 0.5 * k); else st.effect('puff', [-0.2, 1.5, -3.8], 0.9, Math.min(1, (t - mvK(s, 'in')) / 0.6)); } },
  { id: 'b05', L: 'blood', cam: [[-0.2, 1.42, -2.4], [-0.2, 1.42, -2.6], [-0.2, 1.4, -3.9], [-0.2, 1.4, -3.9], 30],
    cast: [{ id: 6, who: 'garyPale', at: [-0.2, WALK, -3.9], f: 0, P: 'stand' }] },
  { id: 'b06', L: 'blood', cam: [[-1.0, 1.45, -1.4], [-1.0, 1.45, -1.6], [-1.0, 1.3, -4.3], [-1.0, 1.3, -4.3], 36],
    cast: [{ id: 5, who: 'barb', at: [-1.7, WALK, -4.6], to: [-0.2, 0, -3.9], P: 'shrug', x: { expr: 'nervous' }, talk: mvW('barb26') }, { id: 6, who: 'garyPale', at: [-0.2, WALK, -3.9], to: [-1.7, 0, -4.6], P: 'stand' }] },
  { id: 'b07', L: 'blood', cam: [[-1.0, 1.4, 1.6], [-1.0, 1.4, 1.2], [-1.0, 1.15, -4.5], [-1.0, 1.15, -4.5], 40], shake: shk(['bang'], 0.08),
    cast: [{ id: 6, who: 'garyPale', at: [-0.9, WALK, -4.4], to: [-1.9, 0, -4.9], P: (t, u, s) => mv_seq(t, [[s.t0, 'grab'], [mvK(s, 'bang') - 0.2, 'swing']]) },
      { id: 5, who: 'barb', at: [-1.9, WALK, -4.9], to: [-0.9, 0, -4.4], P: (t, u, s) => mv_seq(t, [[s.t0, 'grabbed'], [mvK(s, 'bang'), 'downFace']]), x: { expr: 'pained', blood: 0.5 } },
      { id: 1, who: 'mari', at: (t, u) => mvL3([4.5, 0, -2.0], [1.2, WALK, -4.3], u * 1.4), f: -1, P: (t, u) => (u < 0.7 ? mvRun(t) : MV_P.guard), x: { expr: 'stern' } }],
    fx: (st, t, u, s) => { const b = mvK(s, 'bang'); if (t > b && t < b + 0.6) { st.effect('burst', [-2.0, 1.3, -5.1], 0.8, (t - b) / 0.4); mv_spray(st, [-2.0, 1.3, -5.0], 1.1, (t - b) / 0.6, 3, -1); } } },
  // ---- fight 1: Mari vs Gary at the ice machine ----
  { id: 'b08', L: 'blood', cam: [[-0.9, 1.35, -0.4], [-0.9, 1.35, -0.8], [-0.9, 1.1, -4.55], [-0.9, 1.1, -4.55], 38], shake: shk(['jab', 'cross'], 0.06),
    cast: [{ id: 1, who: 'mari', at: ICE_M, to: ICE_G, P: (t, u, s) => mv_seq(t, [[s.t0, 'guard'], [mvK(s, 'jab') - 0.12, 'jab'], [mvK(s, 'jab') + 0.3, 'guard'], [mvK(s, 'cross') - 0.12, 'cross'], [mvK(s, 'cross') + 0.4, 'guard']], 0.12), x: { expr: 'stern' } },
      { id: 6, who: 'garyPale', at: ICE_G, to: ICE_M, P: (t, u, s) => mv_seq(t, [[s.t0, 'grab'], [mvK(s, 'jab'), 'hitHead'], [mvK(s, 'jab') + 0.4, 'stand'], [mvK(s, 'cross'), 'hitHead', { head: -30 }], [mvK(s, 'cross') + 0.5, 'stand']], 0.12), x: { blood: 0.4 } }],
    fx: (st, t, u, s) => { const c = mvK(s, 'cross'); if (t > c && t < c + 0.6) mv_spray(st, [-1.3, 1.55, -4.5], 1.1, (t - c) / 0.6, 11, -1); } },
  { id: 'b09', L: 'blood', cam: [[0.6, 1.0, -1.0], [0.4, 1.0, -1.3], [-0.9, 1.05, -4.55], [-0.9, 1.0, -4.55], 40], shake: shk(['hook'], 0.08),
    cast: [{ id: 1, who: 'mari', at: ICE_M, to: ICE_G, P: (t, u, s) => mv_seq(t, [[s.t0, 'guard'], [mvK(s, 'duck') - 0.1, 'duck'], [mvK(s, 'hook') - 0.12, 'hook', { torso: 30, hip: [10, 40] }], [mvK(s, 'hook') + 0.6, 'guard', { expr: 'pained' }]], 0.12), x: { expr: 'stern' } },
      { id: 6, who: 'garyPale', at: ICE_G, to: ICE_M, P: (t, u, s) => mv_seq(t, [[s.t0, 'lunge'], [mvK(s, 'duck'), 'grab'], [mvK(s, 'hook'), 'hitBody'], [mvK(s, 'hook') + 0.5, 'stand']], 0.14), x: { blood: 0.5 } }] },
  { id: 'b10', L: 'blood', cam: [[-1.6, 1.4, -2.2], [-1.6, 1.4, -2.5], [-1.6, 1.4, -4.85], [-1.6, 1.4, -4.85], 34], shake: shk(['pin'], 0.08),
    cast: [{ id: 1, who: 'mari', at: [-2.0, WALK, -4.9], to: [-0.9, 0, -4.5], P: (t, u, s) => mv_mix(MV_P.thrown, MV_P.lifted, mv_ease((t - mvK(s, 'pin')) / 0.5)), x: { expr: 'pained', blood: 0.3 } },
      { id: 6, who: 'garyPale', at: [-0.9, WALK, -4.5], to: [-2.0, 0, -4.9], P: 'choke', x: { blood: 0.5 } },
      { id: 2, who: 'kev', at: [1.4, 0, -2.6], to: [-1.5, 0, -4.8], P: 'film', x: { expr: 'shock' } }] },
  { id: 'b11', L: 'blood', cam: [[1.6, 1.45, -1.0], [1.6, 1.45, -1.2], [1.4, 1.38, -2.6], [1.4, 1.4, -2.6], 32],
    cast: [{ id: 2, who: 'kev', at: [1.4, 0, -2.6], f: -1, P: 'film', x: { expr: 'nervous' }, talk: mvW('kev32') }],
    fx: (st) => mv_glow(st, [1.05, 1.65, -2.55], 0.4, '#ffffff', 0.9) },
  { id: 'b12', L: 'blood', cam: [[-1.0, 1.3, -0.8], [-1.0, 1.3, -1.1], [-1.0, 1.15, -4.6], [-1.0, 1.1, -4.6], 38], shake: shk(['up', 's1', 's2'], 0.09),
    cast: [{ id: 1, who: 'mari', at: [-1.7, WALK, -4.75], to: [-0.6, 0, -4.5], P: (t, u, s) => mv_seq(t, [[s.t0, 'lifted'], [mvK(s, 'up') - 0.15, 'upper'], [mvK(s, 'up') + 0.5, 'guard', { prop: { kind: 'scoop', hand: 'R', ang: 160 } }], [mvK(s, 's1') - 0.15, 'swing', { prop: { kind: 'scoop', hand: 'R', ang: 100 } }], [mvK(s, 's1') + 0.3, 'windup', { prop: { kind: 'scoop', hand: 'R', ang: 200 } }], [mvK(s, 's2') - 0.12, 'swing', { prop: { kind: 'scoop', hand: 'R', ang: 100 } }]], 0.12), x: { expr: 'stern', blood: 0.3 } },
      { id: 6, who: 'garyPale', at: [-0.6, WALK, -4.5], to: [-1.7, 0, -4.75], P: (t, u, s) => mv_seq(t, [[s.t0, 'choke'], [mvK(s, 'up'), 'hitHead', { head: -35 }], [mvK(s, 's1'), 'hitHead'], [mvK(s, 's2'), 'down']], 0.15), x: { blood: 0.8 } }],
    fx: (st, t, u, s) => { for (const k of ['up', 's1', 's2']) { const x = mvK(s, k); if (t > x && t < x + 0.5) { mv_spray(st, [-0.7, 1.55, -4.45], 1.0, (t - x) / 0.5, 20 + k.length, 1); st.effect('burst', [-0.8, 1.5, -4.4], 0.6, (t - x) / 0.35); } } } },
  { id: 'b13', L: 'blood', cam: [[0.6, 0.55, -2.8], [0.4, 0.55, -3.0], [-0.6, 0.3, -4.5], [-0.6, 0.3, -4.5], 36],
    cast: [{ id: 6, who: 'garyPale', at: [-0.6, WALK, -4.5], f: 1, P: 'down', x: { blood: 0.8 }, talk: mvW('gary35') }] },
  { id: 'b14', L: (t, u) => (u < 0.3 ? 'blood' : 'blackout'), cam: [[1.2, 1.45, -0.6], [1.0, 1.45, -0.9], [0.6, 1.25, -2.8], [0.6, 1.25, -2.8], 40],
    cast: [{ id: 3, who: 'hank', at: (t, u) => mvL3([4.5, 0, -1.8], [1.4, 0, -2.6], u * 2.5), to: [0.2, 0, -2.7], P: (t, u) => (u < 0.35 ? mvRun(t) : MV_P.point), x: { expr: 'stern' }, talk: mvW('hank36') },
      { id: 2, who: 'kev', at: [0.2, 0, -2.7], to: [1.4, 0, -2.6], P: (t, u) => (u < 0.4 ? MV_P.film : MV_P.scared), x: { expr: 'shock' } }],
    fx: (st, t, u) => { if (u < 0.4) mv_glow(st, [0.55, 1.65, -2.65], 0.45, '#ffffff', 0.9); } },
  { id: 'b15', L: 'blackout', pw: { rooms: 0.15 }, cam: [[1.6, 1.45, -1.2], [1.6, 1.45, -1.5], [1.6, 1.4, -2.9], [1.6, 1.42, -2.9], 30],
    cast: [{ id: 3, who: 'hank', at: [1.6, 0, -2.9], f: 0, P: 'stand', x: { expr: 'stern' }, talk: true }] },
  { id: 'b16', L: 'blackout', pw: { office: 0 }, cam: [[202.2, 1.1, 1.4], [202.0, 1.1, 1.1], [201.2, 1.0, -2.4], [201.2, 1.0, -2.4], 40],
    cast: [{ id: 30, who: 'hankKid', at: [201.0, 0, -2.2], f: 0, P: 'scared', x: { expr: 'shock' } }],
    fx: (st, t) => { mv_glow(st, [203.8, 0.05, -3.9], 1.6, '#ff8a6a', 0.4 + 0.3 * Math.sin(t * 3)); mvWallShadow(st, 31, 'momShadow', [203.6, 0, -3.95], { ...MV_P.stand, armR: [150, 175], facing: -1 }, t); } },
  { id: 'b17', L: 'blood', pw: { rooms: 0 }, cam: [[22, 2.0, 2], [24, 3.0, 4], [34, 10.5, 18], [34, 11, 18], 34] },
  { id: 'b18', L: 'blackout', pw: { rooms: 0.1 }, cam: [[0.8, 1.45, -0.9], [0.7, 1.45, -1.1], [0.3, 1.3, -2.7], [0.3, 1.3, -2.7], 34],
    cast: [{ id: 2, who: 'kev', at: [0.3, 0, -2.7], f: 1, P: (t, u, s) => (t > mvK(s, 'on') ? { ...MV_P.film, prop: { kind: 'phone', hand: 'R', ang: 170, on: 1 } } : { ...MV_P.hold, prop: { kind: 'phone', hand: 'R', ang: 120 } }), x: { expr: 'nervous' } }],
    fx: (st, t, u, s) => { if (t > mvK(s, 'on')) mv_glow(st, [0.75, 1.7, -2.65], 0.7, '#ffffff', 1); } },
  { id: 'b19', L: 'blood', pw: { rooms: 0.1 }, cam: [[0.2, 1.4, 0.6], [0.2, 1.5, 0.2], [0.2, 1.6, -5.0], [0.2, 1.9, -5.0], 40],
    cast: [{ id: 2, who: 'kev', at: [0.3, WALK, -3.6], f: 1, P: 'film', x: { expr: 'shock' } }],
    fx: (st, t, u, s) => { const o = mvK(s, 'off'); const k = mv_ease((t - o) / 1.2); mvWallShadow(st, 22, 'shKev', mvL3([0.3, WALK, -5.95], [-0.9, WALK, -5.4], k), { ...MV_P.stand, armR: [30 + 100 * k, 60], facing: k > 0.5 ? 1 : 0, expr: 'grin' }, t, 1 + 0.25 * k); mv_glow(st, [0.75, 1.7, -3.55], 0.6, '#ffffff', 1); } },
  { id: 'b20', L: 'blood', pw: { rooms: 0.1 }, cam: [[-1.5, 1.6, 6.5], [-2.0, 1.6, 6.0], [-6.0, 0.9, -2.0], [-4.5, 0.9, -0.5], 44],
    cast: [{ id: 5, who: 'barb', at: (t, u, s) => (t > mvK(s, 'gone') ? [-200, 0, 0] : mvL3([-8, WALK, -4.4], [-4.5, 0, 1.0], (t - s.t0 - 4) / 5)), f: 1, P: (t, u) => (u < 0.35 ? MV_P.sitStep : MV_P.downFace), x: { expr: 'pained', blood: 0.5 } },
      { id: 22, who: 'shKev', at: (t, u, s) => (t > mvK(s, 'gone') ? [-200, 0, 0] : mvL3([-6.5, WALK, -4.3], [-3.2, 0, 1.0], (t - s.t0 - 3) / 6)), f: 1, P: (t) => mvWalk(t, MV_P.pull, 1.0, 0.6), k: 1.2 }],
    fx: (st, t, u, s) => { const g = mvK(s, 'gone'); if (t > g && t < g + 0.8) st.effect('puff', [-3.8, 1.2, 1.0], 2.2, (t - g) / 0.8); mv_glow(st, [-3, 2, 3], 6, '#ff3a3a', 0.35); } },
  { id: 'b21', L: 'blood', pw: { rooms: 0.1 }, cam: [[1.8, 1.45, 1.2], [1.6, 1.45, 0.9], [1.0, 1.2, -1.8], [1.0, 1.2, -1.8], 38],
    cast: [{ id: 2, who: 'kev', at: [0.4, 0, -1.6], to: [1.7, 0, -2.0], P: 'hitBody', x: { expr: 'pained' }, talk: mvW('kev45') }, { id: 1, who: 'mari', at: [1.7, 0, -2.0], to: [0.4, 0, -1.6], P: 'arms', x: { expr: 'stern', blood: 0.3 }, talk: [312.1, 314.4] }] },
  // ======================= THE PLAN =======================
  { id: 'c01', L: 'blood', pw: { rooms: 0.1 }, cam: [[-30, 1.8, 18], [-33, 1.8, 20], [-40, 3.5, 26], [-40, 3.5, 26], 36] },
  { id: 'c02', L: 'blood', pw: { rooms: 0.1 }, cam: [[1.4, 1.45, 0.4], [1.4, 1.45, 0.1], [1.4, 1.38, -1.4], [1.4, 1.4, -1.4], 30],
    cast: [{ id: 3, who: 'hank', at: [1.4, 0, -1.4], f: 0, P: { ...MV_P.hold, prop: { kind: 'wrench', hand: 'R', ang: 160 } }, x: { expr: 'smile' }, talk: true }] },
  { id: 'c03', L: 'blackout', pw: { office: 0.1 }, cam: [[202.6, 1.5, 2.8], [202.2, 1.5, 2.5], [199.8, 1.25, 0.6], [199.8, 1.25, 0.6], 40],
    cast: [{ id: 1, who: 'mari', at: [199.0, 0, 1.2], to: [200.6, 0, 1.4], P: 'point', x: { expr: 'stern' }, talk: [331.2, 337.2] }, { id: 2, who: 'kev', at: [200.6, 0, 1.4], to: [199.0, 0, 1.2], P: 'scared', x: { expr: 'nervous' }, talk: mvW('kev50') }] },
  { id: 'c04', L: 'blackout', pw: { office: 0.1 }, cam: [[200.6, 1.45, 3.0], [200.6, 1.45, 2.7], [200.6, 1.38, 1.4], [200.6, 1.4, 1.4], 30],
    cast: [{ id: 2, who: 'kev', at: [200.6, 0, 1.4], f: -1, P: (t, u, s) => (t > 345.6 ? MV_P.shrug : MV_P.film), x: { expr: 'smile' }, talk: true }] },
  { id: 'c05', L: 'blood', pw: { rooms: 0.1, car: 1 }, cam: [[-1, 1.0, 9.0], [0, 0.9, 7.5], [0, 0.6, -1.0], [1, 0.6, -1.0], 44],
    fx: (st, t) => { for (let i = 0; i < 6; i++) mv_rig(st, 70 + i, i % 2 ? 'shadow' : 'shadow2', [-8 + i * 3.2 + Math.sin(t + i) * 0.3, 0, -1.5 + (i % 3) * 1.2], { ...MV_P.crawl, facing: i % 2 ? 1 : -1 }, t, 1.1); mv_glow(st, [-12, 0.7, 0.0], 1.8, '#fff2c8', 0.8); mv_glow(st, [8, 0.7, 0.2], 1.8, '#fff2c8', 0.8); } },
  { id: 'c06', L: 'blood', pw: { rooms: 0.1, car: 1 }, cam: [[3.4, 0.5, 4.6], [3.2, 0.55, 4.2], [0, 0.4, -2], [0, 0.4, -2], 40],
    fx: (st, t, u) => { for (let i = 0; i < 5; i++) mv_rig(st, 70 + i, i % 2 ? 'shadow' : 'shadow2', [-3 + i * 1.6, 0, -3.4 + u * 2.0 + (i % 2) * 0.6], { ...MV_P.crawl, facing: 1, armR: [70 + 20 * Math.sin(t * 4 + i), 60], expr: 'grin' }, t, 1.15); } },
  { id: 'c07', L: 'blood', pw: { rooms: 0.1, car: 1 }, cam: [[10.4, 1.45, -0.4], [10.3, 1.45, -0.6], [9.6, 1.35, 2.0], [9.6, 1.35, 2.0], 34],
    cast: [{ id: 3, who: 'hank', at: [9.6, 0, 1.8], to: [8.8, 0, 0.6], P: 'point', x: { expr: 'stern' }, talk: true }, { id: 1, who: 'mari', at: [8.6, 0, 0.6], to: [9.6, 0, 1.8], P: 'guard', x: { expr: 'stern', prop: { kind: 'wrench', hand: 'R', ang: 150 } } }] },
  // ---- the headlights trick (side camera: the rooms on screen right, the pickup on screen left) ----
  { id: 'c08', L: 'blood', pw: { rooms: 0.1, car: 1 }, cam: [[16, 1.5, -1.6], [15.5, 1.5, -1.6], [8, 1.3, -1.6], [8, 1.3, -1.6], 44], shake: shk(['on', 'off'], 0.05),
    cast: [{ id: 3, who: 'hank', at: [9.1, 0, 3.0], to: [8, 0, -3], P: { ...MV_P.hold, armR: [80, 80] }, x: { expr: 'stern' }, k: 0.95 }],
    fx: (st, t, u, s) => { const on = mvK(s, 'on'), off = mvK(s, 'off'), lit = t > on && t < off; mv_power('car', lit ? 1.2 : 0.05);
      if (lit) for (const x of [7.4, 8.6]) mv_glow(st, [x, 0.7, 0.2], 2.8, '#fff2c8', 0.9);
      if (t > on && t < off + 0.05) for (let i = 0; i < 4; i++) { const k = mv_ease((t - on - 0.6) / (off - on - 0.6)); mv_rig(st, 80 + i, i % 2 ? 'shadow' : 'shadow2', [6.6 + i * 0.9, 0.6 + 1.2 * Math.sin(Math.PI * Math.min(1, k)), -4.2 + 3.4 * k], { ...MV_P.lunge, facing: 0, armL: [-130, -150], armR: [130, 150], expr: 'grin' }, t, 1.25); }
      if (t > off && t < off + 0.8) for (let i = 0; i < 4; i++) st.effect('puff', [6.6 + i * 0.9, 1.6, -0.9], 1.4, (t - off) / 0.8); } },
  { id: 'c09', L: 'blood', pw: { rooms: 0.1 }, cam: [[10.4, 1.45, 4.6], [10.3, 1.45, 4.3], [9.1, 1.35, 3.0], [9.1, 1.35, 3.0], 32],
    cast: [{ id: 3, who: 'hank', at: [9.1, 0, 3.0], f: -1, P: { ...MV_P.hold, armR: [80, 80] }, x: { expr: 'grin' }, talk: mvW('hank57') }],
    fx: (st, t) => { const lit = Math.floor(t * 2.5) % 2 === 0; mv_power('car', lit ? 1.2 : 0.05); if (lit) mv_glow(st, [8, 0.7, 0.2], 2.6, '#fff2c8', 0.8); } },
  { id: 'c10', L: 'blood', pw: { rooms: 0.1, car: 1 }, cam: [[11.6, 1.45, 4.0], [11.4, 1.45, 3.8], [9.2, 1.35, 2.6], [9.2, 1.35, 2.6], 38], shake: shk(['grab'], 0.07),
    cast: [{ id: 3, who: 'hank', at: (t, u, s) => mvL3([9.1, 0, 3.0], [9.5, 0.2, 2.6], (t - mvK(s, 'grab')) / 1.5), to: [10.4, 0, 2.2], P: (t, u, s) => (t > mvK(s, 'grab') ? MV_P.lifted : MV_P.hold), x: { expr: 'pained' } },
      { id: 23, who: 'shadow2', at: [10.4, 0, 2.2], to: [9.1, 0, 3.0], P: (t, u, s) => (t > mvK(s, 'grab') ? MV_P.choke : MV_P.lunge), k: 1.2 }],
    fx: (st) => mv_glow(st, [8, 0.7, 0.2], 2.6, '#fff2c8', 0.8) },
  { id: 'c11', L: (t, u, s) => (t > mvK(s, 'rip') ? 'blackout' : 'blood'), pw: { rooms: 0.1, car: 1 }, cam: [[11.4, 1.4, 4.6], [11.2, 1.4, 4.4], [9.4, 1.25, 2.4], [9.2, 1.2, 2.0], 40], shake: shk(['hit', 'rip'], 0.07),
    cast: [{ id: 3, who: 'hank', at: [9.5, 0.2, 2.6], to: [10.4, 0, 2.2], P: (t, u, s) => (t > mvK(s, 'rip') ? MV_P.down : MV_P.lifted), x: { expr: 'pained' } },
      { id: 23, who: 'shadow2', at: (t, u, s) => (t > mvK(s, 'rip') ? [-200, 0, 0] : [10.4, 0, 2.2]), to: [9.1, 0, 3.0], P: 'choke', k: 1.2 },
      { id: 1, who: 'mari', at: (t, u, s) => (t < mvK(s, 'hit') + 1.5 ? [10.8, 0, 3.4] : [8.6, 0, 0.4]), to: [10.4, 0, 2.2], P: (t, u, s) => mv_seq(t, [[s.t0, 'windup', { prop: { kind: 'wrench', hand: 'R', ang: 200 } }], [mvK(s, 'hit') - 0.12, 'swing', { prop: { kind: 'wrench', hand: 'R', ang: 100 } }], [mvK(s, 'hit') + 1.5, 'crouch'], [mvK(s, 'rip') - 0.2, 'pull', { expr: 'stern' }]], 0.14), x: { expr: 'stern' } }],
    fx: (st, t, u, s) => { if (t < mvK(s, 'rip')) mv_glow(st, [8, 0.7, 0.2], 2.6, '#fff2c8', 0.8); const r = mvK(s, 'rip'); if (t > r && t < r + 0.5) st.effect('burst', [8.4, 0.8, 0.3], 0.9, (t - r) / 0.4); } },
  { id: 'c12', L: 'blackout', pw: { rooms: 0.1 }, cam: [[10.6, 1.0, 4.4], [10.5, 1.0, 4.2], [9.4, 0.8, 2.6], [9.4, 0.8, 2.6], 34],
    cast: [{ id: 3, who: 'hank', at: [9.4, 0, 2.6], f: -1, P: 'sitStep', x: { expr: 'pained', bruise: 1 }, talk: mvW('hank61') }, { id: 1, who: 'mari', at: [8.5, 0, 2.2], to: [9.4, 0, 2.6], P: 'crouch', x: { expr: 'nervous' } }] },
  { id: 'c13', L: 'blackout', pw: { rooms: 0.05 }, cam: [[-34, 1.4, 31], [-36, 1.4, 30], [-40, 1.2, 26.8], [-40, 1.2, 26.8], 38],
    cast: [{ id: 1, who: 'mari', at: (t, u) => mvL3([-30, 0, 27.6], [-40, 0, 27.3], u * 1.6), to: [-40, 0, 26.4], P: (t, u, s) => (t > mvK(s, 'pull') - 0.3 ? MV_P.pull : u < 0.62 ? mvRun(t) : MV_P.point), x: { expr: 'stern' } }] },
  { id: 'c14', L: (t, u, s) => (t > mvK(s, 'off') ? 'blackout' : 'blood'), pw: (t, u, s) => (t > mvK(s, 'off') ? { rooms: 0, office: 0, sign: 1 } : { rooms: 0.1, sign: 1 }), cam: [[-20, 3, 40], [-6, 3, 32], [10, 3, 0], [34, 11, 18], 40] },
  // ======================= KEV'S CHOICE =======================
  { id: 'd01', L: 'blackout', pw: { office: 0 }, cam: [[202.4, 1.4, 2.6], [202.0, 1.4, 2.3], [200.2, 0.9, 1.0], [200.2, 0.9, 1.0], 38],
    cast: [{ id: 2, who: 'kev', at: [200.2, 0, 1.0], f: -1, P: 'sitStep', x: { expr: 'nervous', prop: { kind: 'phone', hand: 'R', ang: 170, on: 1 }, armR: [110, 170] } }],
    fx: (st, t) => mv_glow(st, [200.0, 0.95, 1.05], 0.5, '#bfe0ff', 0.6 + 0.3 * Math.abs(Math.sin(t * 4))) },
  { id: 'd02', L: 'blackout', pw: { office: 0 }, cam: [[200.2, 1.0, 2.3], [200.2, 1.0, 2.0], [200.2, 0.95, 1.0], [200.2, 0.95, 1.0], 30],
    cast: [{ id: 2, who: 'kev', at: [200.2, 0, 1.0], f: 0, P: 'sitStep', x: { expr: 'pained', prop: { kind: 'phone', hand: 'R', ang: 170, on: 1 }, armR: [110, 170] }, talk: true }],
    fx: (st) => mv_glow(st, [199.95, 0.85, 1.1], 0.22, '#bfe0ff', 0.6) },
  { id: 'd03', L: 'blackout', pw: { office: 0 }, cam: [[200.9, 1.05, 2.0], [200.8, 1.0, 1.8], [200.2, 0.95, 1.0], [200.2, 0.95, 1.0], 28],
    cast: [{ id: 2, who: 'kev', at: [200.2, 0, 1.0], f: 0, P: 'sitStep', x: { expr: 'pained', prop: { kind: 'phone', hand: 'R', ang: 170, on: 1 }, armR: [110, 170] }, talk: true }],
    fx: (st) => mv_glow(st, [199.95, 0.85, 1.1], 0.22, '#bfe0ff', 0.6) },
  { id: 'd04', L: 'blackout', pw: { office: 0 }, cam: [[200.2, 1.0, 2.3], [200.2, 1.0, 2.15], [200.15, 0.95, 1.0], [200.15, 0.95, 1.0], 28],
    cast: [{ id: 2, who: 'kev', at: [200.2, 0, 1.0], f: 0, P: 'sitStep', x: (t, u, s) => ({ expr: 'relief', prop: { kind: 'phone', hand: 'R', ang: 170, on: t > mvK(s, 'off') ? 0 : 1 }, armR: [110, 170] }) }],
    fx: (st, t, u, s) => { if (t < mvK(s, 'off')) mv_glow(st, [199.95, 0.85, 1.1], 0.22, '#bfe0ff', 0.6); } },
  { id: 'd05', L: 'blackout', pw: { rooms: 0, office: 0, sign: 1 }, cam: [[30, 1.2, 8], [30, 1.2, 9], [34, 10, 18], [34, 11, 18], 38] },
  { id: 'd06', L: 'blackout', pw: { rooms: 0, office: 0, sign: 1 }, cam: [[31.2, 3.0, 13.5], [31.2, 7.2, 13.8], [33.5, 2.6, 17.4], [33.5, 7.6, 17.4], 40],
    cast: [{ id: 1, who: 'mari', at: (t, u) => [33.5, 0.2 + 7.6 * u, 17.25], f: 0, P: (t) => ({ ...MV_P.climb, armL: [-160 + 15 * Math.sin(t * 5), -175], armR: [170 - 15 * Math.sin(t * 5), 185], legL: [-40 + 25 * Math.sin(t * 5), 10], legR: [20 - 25 * Math.sin(t * 5), -10] }), x: { expr: 'stern', prop: { kind: 'wrench', hand: 'R', ang: 90 } } }],
    fx: (st, t) => mv_glow(st, [34, 11.1, 18.4], 5, '#ff2a2a', 0.35 + 0.1 * Math.sin(t * 3)) },
  // ---- fight 3: the catwalk (camera on the motel side, the neon behind them) ----
  { id: 'd07', L: 'blackout', pw: { rooms: 0, office: 0, sign: 1 }, cam: [[34.6, 9.95, 15.0], [34.6, 9.95, 15.3], [34.6, 9.95, 17.8], [34.6, 9.95, 17.8], 30],
    cast: [{ id: 24, who: 'shKev', at: [34.6, 8.65, 17.8], f: 0, P: 'stand', x: { expr: 'grin' }, k: 1.2, talk: mvW('sk72') }],
    fx: (st, t) => mv_glow(st, [34, 11.1, 18.4], 6, '#ff2a2a', 0.45) },
  { id: 'd08', L: 'blackout', pw: { rooms: 0, office: 0, sign: 1 }, cam: [[34.0, 9.6, 13.4], [34.0, 9.7, 13.8], [34.0, 9.45, 17.8], [34.0, 9.5, 17.8], 40], shake: shk(['lunge'], 0.07),
    cast: [{ id: 1, who: 'mari', at: [33.1, 8.65, 17.8], to: [34.9, 0, 17.8], P: 'guard', x: { expr: 'stern', prop: { kind: 'wrench', hand: 'R', ang: 160 } } },
      { id: 24, who: 'shKev', at: (t, u, s) => mvL3([35.6, 8.65, 17.8], [34.3, 8.65, 17.8], (t - mvK(s, 'lunge') + 0.3) / 0.3), to: [33.1, 0, 17.8], P: 'lunge', k: 1.2 }],
    fx: (st) => mv_glow(st, [34, 11.1, 18.4], 6, '#ff2a2a', 0.45) },
  { id: 'd09', L: 'blackout', pw: { rooms: 0, office: 0, sign: 1 }, cam: [[33.8, 9.7, 14.2], [33.8, 9.7, 14.4], [33.8, 9.45, 17.8], [33.8, 9.45, 17.8], 36], shake: shk(['block', 'j1', 'j2', 'j3'], 0.05),
    cast: [{ id: 1, who: 'mari', at: [33.2, 8.65, 17.8], to: [34.4, 0, 17.8], P: (t, u, s) => mv_seq(t, [[s.t0, 'guard'], [mvK(s, 'block') - 0.1, 'guard', { torso: -12, expr: 'pained' }], [mvK(s, 'block') + 0.5, 'guard'], [mvK(s, 'j1') - 0.1, 'jab'], [mvK(s, 'j2') - 0.1, 'guard'], [mvK(s, 'j2'), 'jab'], [mvK(s, 'j3') - 0.1, 'cross'], [mvK(s, 'j3') + 0.4, 'guard']], 0.08), x: { expr: 'stern' } },
      { id: 24, who: 'shKev', at: [34.4, 8.65, 17.8], to: [33.2, 0, 17.8], P: (t, u, s) => mv_seq(t, [[s.t0, 'guard'], [mvK(s, 'block') - 0.15, 'cross'], [mvK(s, 'block') + 0.4, 'guard'], [mvK(s, 'j1'), 'hitHead'], [mvK(s, 'j1') + 0.3, 'guard'], [mvK(s, 'j3'), 'hitHead']], 0.08), k: 1.2 }],
    fx: (st, t, u, s) => { for (const k of ['j1', 'j2', 'j3']) { const x = mvK(s, k); if (t > x && t < x + 0.5) st.effect('puff', [34.1, 10.0, 17.7], 0.7, (t - x) / 0.5); } mv_glow(st, [34, 11.1, 18.4], 6, '#ff2a2a', 0.45); } },
  { id: 'd10', L: 'blackout', pw: { rooms: 0, office: 0, sign: 1 }, cam: [[31.0, 6.6, 13.0], [31.2, 6.4, 13.2], [33.6, 8.4, 17.2], [33.6, 8.2, 17.2], 40], shake: shk(['lift'], 0.06),
    cast: [{ id: 24, who: 'shKev', at: [34.2, 8.65, 17.4], to: [33.4, 0, 16.6], P: 'choke', k: 1.2 },
      { id: 1, who: 'mari', at: (t, u, s) => mvL3([33.4, 8.65, 17.3], [33.4, 8.2, 16.6], (t - mvK(s, 'lift')) / 0.6), to: [34.2, 0, 17.4], P: (t, u, s) => (t > mvK(s, 'lift') ? MV_P.dangle : MV_P.grabbed), x: { expr: 'pained', blood: 0.3 }, talk: false }],
    fx: (st) => mv_glow(st, [34, 11.1, 18.4], 6, '#ff2a2a', 0.45) },
  { id: 'd11', L: 'blackout', pw: { rooms: 0, office: 0, sign: 1 }, cam: [[22, 1.2, 7], [23, 1.3, 7.6], [33, 8.8, 17.0], [33, 9.0, 17.0], 34],
    cast: [{ id: 3, who: 'hank', at: [24.5, 0, 9.2], to: [33, 0, 17], P: 'point', x: { expr: 'grin', bruise: 1 }, talk: true }],
    fx: (st) => mv_glow(st, [34, 11.1, 18.4], 6, '#ff2a2a', 0.45) },
  { id: 'd12', L: 'blackout', pw: { rooms: 0, office: 0, sign: 1 }, cam: [[33.4, 9.6, 14.9], [33.4, 9.6, 15.2], [33.4, 9.55, 16.6], [33.4, 9.6, 16.6], 30],
    cast: [{ id: 1, who: 'mari', at: [33.4, 8.2, 16.6], f: 0, P: 'dangle', x: { expr: 'stern', blood: 0.3, head: 0 } }],
    fx: (st) => mv_glow(st, [34, 11.1, 18.4], 6, '#ff2a2a', 0.55) },
  { id: 'd13', L: (t, u, s) => (t > mvK(s, 'smash') ? 'blackout' : 'blackout'), pw: (t, u, s) => ({ rooms: 0, office: 0, sign: t > mvK(s, 'smash') ? 0 : 1 }), cam: [[32.6, 9.6, 13.6], [32.6, 9.8, 13.9], [33.8, 9.6, 17.6], [33.8, 9.9, 17.6], 40], shake: shk(['smash'], 0.12),
    cast: [{ id: 1, who: 'mari', at: (t, u, s) => mvL3([33.4, 8.2, 16.6], [33.2, 8.65, 17.2], (t - s.t0) / 2.5), to: [34.4, 0, 18.4], P: (t, u, s) => mv_seq(t, [[s.t0, 'dangle'], [s.t0 + 2.5, 'windup', { prop: { kind: 'wrench', hand: 'R', ang: 200 } }], [mvK(s, 'smash') - 0.15, 'swing', { prop: { kind: 'wrench', hand: 'R', ang: 60 } }]], 0.2), x: { expr: 'stern', blood: 0.3 } },
      { id: 24, who: 'shKev', at: [34.4, 8.65, 17.6], to: [33.2, 0, 17.2], P: (t, u, s) => (t > mvK(s, 'smash') ? MV_P.scared : MV_P.choke), k: 1.2 }],
    fx: (st, t, u, s) => { const x = mvK(s, 'smash'); if (t < x) mv_glow(st, [34, 11.1, 18.4], 6, '#ff2a2a', 0.5); if (t > x && t < x + 1.4) { mv_shards(st, [34.2, 10.8, 18.3], 4, (t - x) / 1.4, 9); st.effect('burst', [34.2, 10.8, 18.3], 3, Math.min(1, (t - x) / 0.5)); mv_glow(st, [34.2, 10.8, 18.3], 4, '#ff6a4a', 1 - (t - x) / 1.4); } } },
  { id: 'd14', L: 'blackout', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[33.9, 9.7, 14.6], [33.9, 9.7, 14.8], [34.2, 9.6, 17.6], [34.2, 9.6, 17.6], 34], shake: shk(['scream'], 0.1),
    cast: [{ id: 24, who: 'shKev', at: [34.4, 8.65, 17.6], f: -1, P: (t, u) => ({ ...MV_P.scared, head: -30 }), x: (t, u) => ({ maw: 1 }), k: 1.2 },
      { id: 1, who: 'mari', at: [33.2, 8.65, 17.2], to: [34.4, 0, 17.6], P: 'guard', x: { expr: 'stern', blood: 0.4, prop: { kind: 'wrench', hand: 'R', ang: 160 } } }],
    fx: (st, t, u, s) => { const sc = mvK(s, 'scream'); for (let i = 0; i < 3; i++) if (t > sc + i * 0.5) st.effect('puff', [34.4, 9.4 + i * 0.3, 17.6], 1.5 + i, Math.min(1, (t - sc - i * 0.5) / 1.2)); } },
  { id: 'd15', L: 'blackout', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[-24, 6, 44], [-30, 9, 52], [10, 2, 0], [10, 6, 0], 40], fx: (st, t, u) => mvMoon(st, [32, 17, -29], 7, 1 - 0.5 * u) },
  // ======================= DAWN =======================
  { id: 'e01', L: 'night', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[0, 1.0, 10], [0, 1.0, 10], [8, 7, -30], [8, 9, -30], 40], fx: (st, t, u) => mvMoon(st, [8, 10.5, -32], 6, 0.5 - 0.5 * u) },
  { id: 'e02', L: 'golden', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[-3.2, 1.2, 0.2], [-3.2, 1.25, 0.8], [-3.2, 0.85, 5.6], [-3.2, 0.85, 5.6], 40],
    cast: [{ id: 3, who: 'hank', at: [-4.4, 0, 5.6], f: 1, P: 'sitStep', x: { expr: 'relief', bruise: 1 } }, { id: 1, who: 'mari', at: [-3.2, 0, 5.6], f: 0, P: 'sitStep', x: { expr: 'relief', blood: 0.4 } }, { id: 2, who: 'kev', at: [-2.0, 0, 5.6], f: -1, P: 'sitStep', x: { expr: 'smile_closed' } }] },
  { id: 'e03', L: 'golden', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[-3.2, 1.0, 2.2], [-3.2, 1.0, 2.5], [-3.2, 0.85, 5.6], [-3.2, 0.85, 5.6], 36],
    cast: [{ id: 3, who: 'hank', at: [-4.4, 0, 5.6], f: 1, P: 'sitStep', x: { expr: 'stern', bruise: 1 }, talk: [551.6, 553.9] }, { id: 2, who: 'kev', at: [-2.0, 0, 5.6], f: -1, P: 'sitStep', x: { expr: 'smile' }, talk: mvW('kev84') }] },
  { id: 'e04', L: 'golden', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[-2.0, 1.0, 4.2], [-2.0, 1.0, 4.4], [-2.0, 0.95, 5.6], [-2.0, 0.95, 5.6], 30],
    cast: [{ id: 2, who: 'kev', at: [-2.0, 0, 5.6], f: 0, P: 'sitStep', x: { expr: 'smile_closed' }, talk: true }] },
  { id: 'e05', L: 'golden', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[-2.6, 1.0, 2.6], [-2.6, 1.0, 2.8], [-2.6, 0.85, 5.6], [-2.6, 0.85, 5.6], 34],
    cast: [{ id: 1, who: 'mari', at: [-3.2, 0, 5.6], f: 1, P: 'sitStep', x: { expr: 'smile', blood: 0.4 }, talk: [567.5, 571.4] }, { id: 2, who: 'kev', at: [-2.0, 0, 5.6], f: -1, P: 'sitStep', x: { expr: 'grin' }, talk: [564.0, 567.2] }] },
  { id: 'e06', L: 'lamp', pw: { r11: 0.6 }, cam: [[300, 1.6, 2.6], [300, 1.6, 1.6], [300, 1.4, -3], [300, 1.45, -3], 40],
    fx: (st, t) => { for (let i = 0; i < 13; i++) mvWallShadow(st, 60 + i, i === 11 ? 'shGary' : i === 12 ? 'shadow' : i % 3 ? 'shadow' : 'shadow2', [296.0 + i * 0.66, 0, -2.95], { ...(i === 11 ? MV_P.film : MV_P.stand), armL: [-10 - (i % 4) * 25, -20], facing: 0 }, t, 0.82); } },
  { id: 'e07', L: 'golden', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[-1, 1.5, 12], [-1, 1.5, 11], [-1, 1.4, 16], [-1, 1.6, 30], 36],
    cast: [{ id: 1, who: 'mari', at: [-1, 0, 14], f: 0, P: 'stand', x: { expr: 'relief', blood: 0.3 } }] },
  { id: 'e08', L: 'golden', pw: { rooms: 0, office: 0, sign: 0 }, cam: [[-1, 2.2, 10.6], [-1, 2.0, 11.0], [-1, 0.8, 14.6], [-1, 0.6, 15.2], 40],
    cast: [{ id: 1, who: 'mari', at: [-1, 0, 14], f: 0, P: (t, u) => (u > 0.25 ? { ...MV_P.stand, armR: [150, 200] } : MV_P.stand), x: { expr: 'relief' } }],
    fx: (st, t, u, s) => { const lag = mvK(s, 'lag', s.t1 - 2) - 0.2, up = (t > s.t0 + 0.25 * (s.t1 - s.t0) + 0.5) && t > lag;
      const P: mv_Pose = up ? { ...MV_P.stand, armR: [150, 200], facing: 0 } : { ...MV_P.stand, facing: 0 };
      const cast = MV_CAST.shadow2;
      st.card({ key: `mv-fshadow-${up}`, cw: 600, ch: 1000, at: [-1, 0.02, 15.6], w: 1.4, h: 2.4, flat: true, rot: Math.PI, draw: (p) => CT.bodyRig(p, { ...cast, long: 1 }, { ...P, light: 0 }) }); } },
]);
