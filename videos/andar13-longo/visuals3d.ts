// =====================================================================
//  O 13º andar (versão longa, 16:9) — the scenes. Each one only assembles the world (world3d.ts) over the audio's timing.
// =====================================================================
const b13Breath = (t: number, k = 1) => { B13.corLights.forEach((l: THREE.PointLight) => { l.intensity *= p3Lerp(1, 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.7)), k); }); };
const b13Bed = (m: B13Man) => { m.visible = true; m.position.set(1.4, 0.58, 23.72); m.rotation.set(-Math.PI / 2, Math.PI, 0); };
b13Shots([
  // ---- the promise
  { id: 'hook', fn(t, u, s) {
    b13Mode(t, 'ext'); B13.beacon.visible = Math.floor(t * 1.5) % 2 === 0;
    b13Look([p3Lerp(15, 10, u), p3Lerp(2, 3, u), p3Lerp(-205, -228, p3Smooth(u))], [0, 32, -300], 42);
  } },
  { id: 'estive', fn(t, u, s) {
    const tl = b13K(s, 'la'); b13Cab(0, t >= tl ? '13' : '', 0, 0, t); b13Red(0.85 * b13Pulse(t, tl, 2.5));
    b13Look([0, 2.05, p3Lerp(0.42, 0.55, u)], [0, 2.25, 0.985], 34, b13Shake(t, tl, 0.02));
  } },
  { id: 'historia', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); B13.endDoor.hinge.rotation.y = 0.5;
    b13Look([0.2, 1.6, p3Lerp(4, 9.5, p3Smooth(u))], [0, 1.3, 21], 40);
  } },
  // ---- the building, the panel, the doorman
  { id: 'predio', fn(t, u, s) {
    b13Mode(t, 'ext'); B13.beacon.visible = Math.floor(t * 1.5) % 2 === 0; B13.win14.visible = true;
    b13Look([12 - u * 3, 1.8, -232], [0, p3Lerp(8, 48, p3Smooth(u)), -300], 40);
  } },
  { id: 'botao', fn(t, u, s) {
    const lit = t >= b13K(s, 'quatorze') ? 14 : t >= b13K(s, 'doze') ? 12 : 0; b13Cab(0, '12', lit);
    b13Look([p3Lerp(0.42, 0.6, u), 1.28, p3Lerp(0.4, 0.55, u)], [0.985, 1.25, 0.62], 38);
  } },
  { id: 'porteiro', fn(t, u, s) {
    b13Mode(t, 'lobby'); const iv: B13Man = B13.ivo; iv.visible = true; iv.position.set(38.4, 0, -1.3); iv.pose(b13Idle(t));
    b13Look([p3Lerp(42.8, 42.2, u), 1.7, p3Lerp(3.4, 2.6, u)], [39.3, 1.3, -1.6], 42);
  } },
  { id: 'meianoite', fn(t, u, s) {
    b13Mode(t, 'lobby'); const iv: B13Man = B13.ivo, tn = b13K(s, 'never'); iv.visible = true; iv.position.set(38.4, 0, -1.3);
    iv.pose({ ...b13Idle(t), 'neck.y': p3Lerp(0, 0.7, p3Ramp(t, s.t0 + 0.6, s.t0 + 1.4)), brow: 0.6 });
    if (t < tn) b13Look([38.9, 1.75, 0.15], [38.4, 1.7, -1.3], 30);
    else { (B13.clock.material as THREE.MeshBasicMaterial).map = b13ClockFace(0, 0); b13Look([37.6 - u * 0.4, 2.3, -1.6], [35.52, 2.35, -1.6], 30); }
  } },
  // ---- the night: the elevator
  { id: 'noite', fn(t, u, s) {
    const tp = b13K(s, 'press'), tc = b13K(s, 'close'), m: B13Man = B13.man;
    if (t < tc - 0.2) { b13Cab(1, '1', t >= tp ? 14 : 0); m.visible = true; m.position.set(0.35, 0, 0.15); m.rotation.y = Math.PI / 2; m.pose(t < tp - 0.6 ? b13Idle(t) : b13Mix(b13Idle(t), b13Press(t, tp, 1), p3Ramp(t, tp - 0.6, tp - 0.2)));
      b13Look([-0.85, 1.6, -1.0], [0.55, 1.25, 0.35], 50); }
    else { b13Cab(1 - p3Ramp(t, tc, tc + 0.8), '1', 14); b13Look([0, 1.6, -0.8], [0, 1.45, 4], 42); }
  } },
  { id: 'andares', fn(t, u, s) {
    const n = t >= b13K(s, 'd12') ? '12' : t >= b13K(s, 'd11') ? '11' : t >= b13K(s, 'd10') ? '10' : '9'; b13Cab(0, n);
    b13Look([0, 2.0, p3Lerp(0.3, 0.5, u)], [0, 2.25, 0.985], 34);
  } },
  { id: 'tranco', fn(t, u, s) {
    const tj = b13K(s, 'jolt'), tli = b13K(s, 'light'), m: B13Man = B13.man; m.visible = true; m.position.set(0, 0, -0.55);
    b13Cab(0, '12', 0, t > tli ? 1 : t > tj && t < tj + 0.6 ? 1 : 0, t);
    const P = b13Mix(b13Idle(t), b13Scared(t), p3Ramp(t, tj, tj + 0.3) * 0.7); P['neck.x'] = p3Lerp(P['neck.x'], -0.45, p3Ramp(t, tli - 0.2, tli + 0.4)); m.pose(P);
    b13Look([0.4, 1.55, 0.95], [0, 1.3, -0.55], 50, b13Shake(t, tj, 0.05));
  } },
  { id: 'painel', fn(t, u, s) {
    const tl = b13K(s, 'lit'), glitch = Math.floor(t * 9) % 2 ? '14' : '12';
    b13Cab(0, t >= tl ? '' : t > tl - 1.2 ? glitch : '12', 0, t > tl - 1.2 ? 0.7 : 0, t);
    b13Look([0, p3Lerp(1.95, 2.05, u), p3Lerp(0.25, 0.5, u)], [0, 2.25, 0.985], 36);
  } },
  { id: 'treze', fn(t, u, s) {
    const ts = b13K(s, 'stat'), to = b13K(s, 'open');
    if (t < to - 0.1) { b13Cab(0, t >= ts ? '13' : '', 0, 0, t); b13Red(0.85 * b13Pulse(t, ts, 2.5)); b13Look([0, 2.0, 0.42 + p3Ramp(t, ts, ts + 0.6) * 0.15], [0, 2.25, 0.985], 34, b13Shake(t, ts, 0.02)); }
    else { b13Mode(t, 'thirteen', false); b13Floor('13'); b13Cab(p3Ramp(t, to, to + 0.8), '13'); b13Look([0, 1.6, -0.75 + (t - to) * 0.05], [0, 1.45, 8], 42); }
  } },
  // ---- the 13th floor
  { id: 'corredor', fn(t, u, s) {
    b13Mode(t, 'thirteen', false); b13Floor('13'); b13Cab(1, '13');
    const c = p3Ramp(t, b13K(s, 'carpet') - 0.3, b13K(s, 'carpet') + 0.5), d = p3Ramp(t, b13K(s, 'doors') - 0.3, b13K(s, 'doors') + 0.4), z = p3Lerp(-0.6, 2.4, p3Smooth(u));
    b13Look([0, 1.6, z], [p3Lerp(0, -1.25, d), p3Lerp(p3Lerp(1.45, 0.1, c), 1.2, d), p3Lerp(z + 8, z + 2.4, Math.max(c * 0.5, d * 0.85))], 42);
  } },
  { id: 'placas', fn(t, u, s) {
    b13Mode(t, 'thirteen', false); b13Floor('13'); const z = p3Lerp(3.3, 4.1, p3Smooth(u));
    b13Look([p3Lerp(-0.15, -0.45, u), 1.66, z], [-1.25, 1.68, 5], p3Lerp(34, 26, u));
  } },
  { id: 'respira', fn(t, u, s) {
    b13Mode(t, 'thirteen', false); b13Floor('13'); b13Cab(1, '13'); b13Breath(t); B13.endDoor.hinge.rotation.y = 0.5;
    b13Look([0.4, 1.6, 2.5 + u * 0.8], [0, 1.3, 20], 42);
  } },
  { id: 'passo', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); b13Cab(1, '13'); const ts = b13K(s, 'step'), m: B13Man = B13.man; m.visible = true;
    const go = p3Clamp((t - (ts - 0.4)) / (s.t1 - ts + 0.4)); m.position.set(0.05, 0, p3Lerp(-0.2, 2.6, go)); m.pose(go > 0 ? b13Walk(t, 1.0, 0.7) : b13Idle(t));
    b13Look([0.3, 1.68, -0.95], [0, 1.35, 6], 44);
  } },
  { id: 'fundo', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); b13Cab(1, '13'); const td = b13K(s, 'door'), m: B13Man = B13.man; m.visible = true; B13.endDoor.hinge.rotation.y = 0.5;
    const z = p3Lerp(3, 9.5, p3Clamp((t - s.t0) / (td + 0.5 - s.t0))); m.position.set(0.15, 0, z);
    m.pose(t < td + 0.5 ? b13Walk(t, 1.1, 0.8) : b13Mix(b13Walk(t, 1.1, 0.8), b13Idle(t), p3Ramp(t, td + 0.5, td + 0.8)));
    const look = p3Ramp(t, td - 0.2, td + 0.9);
    b13Look([p3Lerp(0.55, 0.35, look), p3Lerp(1.75, 1.6, look), z - p3Lerp(2.8, 1.6, look)], [0, 1.28, p3Lerp(z + 4, 21, look)], p3Lerp(40, 28, look));
  } },
  { id: 'placa', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); B13.endDoor.hinge.rotation.y = 0.12; const tm = b13K(s, 'mine');
    if (t > tm && t < tm + 0.9) B13.endDoor.setNum(Math.floor((t - tm) * 10) % 2 ? '1302' : '1402');
    b13Look([0, 1.66, p3Lerp(19.75, 20.2, p3Smooth(u))], [0, 1.66, 21], 26, b13Shake(t, b13K(s, 'plate'), 0.01));
  } },
  { id: 'abaixo', fn(t, u, s) {
    b13Mode(t, 'ext'); const tb = b13K(s, 'below'); B13.win14.visible = true; B13.win13.visible = t >= tb && (t > tb + 0.4 || Math.floor((t - tb) * 12) % 2 === 0);
    b13Red(0.5 * b13Pulse(t, tb, 2)); b13Look([7 - u * 1.5, 37, -258 + u * 4], [-1.3, 41.5, -294], 30);
  } },
  { id: 'perto', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); B13.endDoor.hinge.rotation.y = 1.2; const tc = b13K(s, 'call'), m: B13Man = B13.man; m.visible = true;
    const z = p3Lerp(14.5, 18.4, p3Clamp((t - s.t0) / (tc - s.t0))); m.position.set(0.1, 0, z);
    m.pose(t < tc ? b13Walk(t, 0.8, 0.55) : b13Mix(b13Idle(t), b13Scared(t), p3Ramp(t, tc, tc + 0.5) * 0.6));
    b13Look([0.55, 1.72, z - 2.3], [0, 1.4, 22], 38);
  } },
  { id: 'minhavoz', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const m: B13Man = B13.man; m.visible = true; m.position.set(0.1, 0, 18.4); m.pose(b13Scared(t));
    b13Look([0.3, 1.74, 19.75 - u * 0.2], [0.1, 1.7, 18.4], 30);
  } },
  { id: 'olhos', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); B13.endDoor.hinge.rotation.y = 1.2; const tl = b13K(s, 'light'), d: B13Man = B13.dbl;
    d.visible = t >= tl; d.position.set(-0.28, 0, 22.2); d.rotation.y = Math.PI; d.pose({ ...b13Stand(t), eyes: p3Lerp(0.08, 1, p3Ramp(t, tl, tl + 0.25)) });
    b13Red(0.75 * b13Pulse(t, tl)); b13Look([0.1, 1.58, p3Lerp(17.6, 19.0, u)], [-0.15, 1.5, 21.6], 30, b13Shake(t, tl, 0.04));
  } },
  { id: 'pisca', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const tb = b13K(s, 'blink'), tl = b13K(s, 'late');
    const shut = (t0: number) => (t > t0 && t < t0 + 0.18 ? 0.08 : 1);
    if (t < tl - 0.45) { const m: B13Man = B13.man; m.visible = true; m.position.set(0.1, 0, 18.4); m.pose({ ...b13Scared(t), eyes: shut(tb) === 1 ? 1.5 : 0.08 }); b13Look([0.25, 1.76, 19.25], [0.1, 1.74, 18.4], 26); }
    else { B13.endDoor.hinge.rotation.y = 1.2; const d: B13Man = B13.dbl; d.visible = true; d.position.set(-0.28, 0, 22.2); d.rotation.y = Math.PI; d.pose({ ...b13Stand(t), eyes: shut(tl) });
      b13Look([-0.1, 1.8, 20.4], [-0.25, 1.78, 22.2], 22); }
  } },
  // ---- the escape
  { id: 'corri', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const tp = b13K(s, 'press'), tr = b13K(s, 'run');
    if (t < tp - 0.1) { b13Cab(1, '13'); const m: B13Man = B13.man; m.visible = true; m.rotation.y = Math.PI; const z = p3Lerp(17.5, 2.6, p3Clamp((t - s.t0) / (tp - s.t0)));
      m.position.set(0.1, 0, z); m.pose(t < tr ? b13Scared(t) : b13Run(t));
      b13Look([0.45, 1.55, z - 3.4], [0.05, 1.2, z], 40, [Math.sin(t * 17) * 0.015, Math.sin(t * 23) * 0.015]); }
    else { const n = Math.floor((t - tp) * 6); b13Cab(1, '13', n % 2 ? 0 : 14); b13Look([0.5, 1.3, 0.48], [0.985, 1.25, 0.62], 36, [Math.sin(t * 29) * 0.008, Math.sin(t * 31) * 0.008]); }
  } },
  { id: 'viu', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const tc = b13K(s, 'closing'), tv = b13K(s, 'saw'), d: B13Man = B13.twin;
    b13Cab(1 - 0.42 * p3Ramp(t, tc, s.t1), '13'); d.visible = t >= tv; d.position.set(0, 0, 18.5); d.rotation.y = Math.PI; d.pose(b13Stand(t));
    b13Red(0.6 * b13Pulse(t, tv, 2)); b13Look([0, 1.6, -0.75], [0, 1.45, 8], 38, b13Shake(t, tv, 0.02));
  } },
  { id: 'casaco', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const d: B13Man = B13.twin; d.visible = true; d.position.set(0, 0, 18.5); d.rotation.y = Math.PI; d.pose(b13Stand(t));
    b13Look([0.25, 1.45, 15.6], [0, p3Lerp(0.45, 1.6, p3Smooth(u)), 18.5], 30);
  } },
  { id: 'subiu', fn(t, u, s) {
    const tc = b13K(s, 'close'), t14 = b13K(s, 'd14');
    if (t < tc + 0.75) { b13Mode(t, 'thirteen'); b13Floor('13'); const d: B13Man = B13.twin; d.visible = true; d.position.set(0, 0, 18.5); d.rotation.y = Math.PI; d.pose(b13Stand(t));
      b13Cab(0.58 * (1 - p3Ramp(t, tc, tc + 0.6)), '13'); b13Look([0, 1.6, -0.75], [0, 1.45, 8], 38); }
    else { b13Cab(0, t >= t14 ? '14' : '13'); b13Look([0, 2.0, 0.4], [0, 2.25, 0.985], 34); }
  } },
  { id: 'feliz', fn(t, u, s) {
    b13Cab(0, '14'); const m: B13Man = B13.man; m.visible = true; m.position.set(0, 0, -0.55); m.pose({ ...b13Idle(t), 'neck.x': 0.35, 'spine.x': 0.08, eyes: 0.5 });
    b13Look([0.4, 1.55, 0.95 - u * 0.2], [0, 1.3, -0.55], 46);
  } },
  // ---- home, 3 a.m.
  { id: 'casa', fn(t, u, s) {
    b13Mode(t, 'night'); b13Phone(false); const m: B13Man = B13.man, ts = b13K(s, 'sleep'); b13Bed(m);
    m.pose({ ...b13Idle(0), eyes: p3Lerp(1, 0.08, p3Ramp(t, ts, ts + 0.6)), 'neck.y': 0.15 });
    b13Look([p3Lerp(-0.2, 0.2, u), p3Lerp(1.9, 1.6, u), 22.6 + u * 0.4], [1.3, 0.6, 24.6], 42);
  } },
  { id: 'tres', fn(t, u, s) {
    b13Mode(t, 'night'); const tp = b13K(s, 'phone'), td = b13K(s, 'ding'); b13Phone(t >= tp);
    if (t < td) b13Look([1.25, p3Lerp(1.0, 0.85, u), 22.55], [1.6, 0.5, 22.95], 32);
    else { const m: B13Man = B13.man; b13Bed(m); m.pose({ ...b13Idle(0), eyes: p3Lerp(0.08, 1.5, p3Ramp(t, td + 0.1, td + 0.3)), brow: 1, 'neck.y': p3Lerp(0.15, 0.55, p3Ramp(t, td + 0.5, td + 1.1)) });
      b13Look([0.75, 1.2, 25.2], [1.4, 0.72, 25.45], 32); }
  } },
  { id: 'passos', fn(t, u, s) {
    b13Mode(t, 'night'); const ts = b13K(s, 'steps'), tst = b13K(s, 'stop'), arrive = p3Ramp(t, ts - 0.2, tst + 0.4);
    B13.feet.forEach((f: THREE.Mesh, i: number) => { f.visible = arrive > 0; f.position.x = p3Lerp(-0.85 + i * 0.2, -0.12 + i * 0.24, arrive); });
    b13Look([0.3, 0.38, 23.4 - u * 0.4], [0, 0.12, 21.2], 40);
  } },
  { id: 'sombra', fn(t, u, s) {
    b13Mode(t, 'night'); B13.feet.forEach((f: THREE.Mesh, i: number) => { f.visible = true; f.position.x = -0.12 + i * 0.24; });
    b13Look([0.08, 0.26, p3Lerp(22.3, 21.95, u)], [0, 0.02, 21.25], 36);
  } },
  { id: 'batidas', fn(t, u, s) {
    b13Mode(t, 'night'); B13.feet.forEach((f: THREE.Mesh, i: number) => { f.visible = true; f.position.x = -0.12 + i * 0.24; });
    const k1 = b13K(s, 'k1'), k2 = b13K(s, 'k2'), kn = Math.max(b13Knocks(t, k1, 1), b13Knocks(t, k2, 1), b13Knocks(t, k2 + 0.3, 1));
    B13.endDoor.hinge.position.z = 0.012 * kn; b13Look([0.45, 1.3, 23.2], [0, 1.1, 21.05], 42, [kn * 0.02, kn * 0.012]);
  } },
  { id: 'levantei', fn(t, u, s) {
    b13Mode(t, 'night'); const m: B13Man = B13.man; m.visible = true; m.rotation.y = Math.PI; const go = p3Clamp((t - s.t0) / ((s.t1 - s.t0) * 0.55));
    m.position.set(p3Lerp(0.7, 0.1, go), 0, p3Lerp(22.6, 21.45, go)); m.pose(go < 1 ? b13Walk(t, 1.0, 0.6) : b13Mix(b13Walk(t, 1.0, 0.6), b13Listen(t), p3Ramp(t, s.t0 + (s.t1 - s.t0) * 0.55, s.t0 + (s.t1 - s.t0) * 0.7)));
    b13Look([1.5, 1.6, 23.0], [0.2, 1.35, 21.6], 42);
  } },
  { id: 'olhomagico', html: (w) => b13PeepMask(w), fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const ta = b13K(s, 'appear'), d: B13Man = B13.twin; d.visible = t >= ta; d.position.set(0, 0, 20.15); d.pose(b13Stand(t));
    b13Red(0.7 * b13Pulse(t, ta, 2)); b13Look([0, 1.55, 20.97], [0, 1.4, 15], 80, b13Shake(t, ta, 0.01));
  } },
  { id: 'sussurro', html: (w) => b13PeepMask(w), fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const tl = b13K(s, 'lean'), tw = b13K(s, 'whisper'), d: B13Man = B13.twin; d.visible = true;
    d.position.set(0, 0, p3Lerp(20.0, 20.4, p3Ramp(t, tl, tw))); d.pose({ ...b13Stand(t), 'spine.x': p3Lerp(0, 0.18, p3Ramp(t, tl, tw)), 'neck.z': p3Lerp(0.25, 0.45, p3Ramp(t, tw, tw + 0.8)) });
    b13Red(0.6 * b13Pulse(t, tw, 2)); b13Look([0, 1.55, 20.97], [0, p3Lerp(1.4, 1.75, p3Ramp(t, tl, tw)), 15], 80);
  } },
  { id: 'errado', fn(t, u, s) {
    b13Mode(t, 'thirteen'); b13Floor('13'); const tr = b13K(s, 'reveal'), d: B13Man = B13.twin; d.visible = true; d.position.set(0.34, 0, 20.35); d.pose(b13Knock(t, s.t0 - 2));
    b13Red(0.9 * b13Pulse(t, tr, 1.5)); b13Look([p3Lerp(-0.2, 0.2, u), 1.64, p3Lerp(19.9, 18.6, p3Smooth(u))], [-0.05, 1.62, 21], p3Lerp(24, 32, u), b13Shake(t, tr, 0.05));
  } },
  { id: 'naoabri', fn(t, u, s) {
    b13Mode(t, 'night'); B13.feet.forEach((f: THREE.Mesh, i: number) => { f.visible = true; f.position.x = -0.12 + i * 0.24; });
    const kn = b13Knocks(t, b13K(s, 'knock')); B13.endDoor.hinge.position.z = 0.012 * kn;
    b13Look([0.35, p3Lerp(1.3, 1.0, u), p3Lerp(23.9, 23.3, u)], [0, 0.75, 21.05], 42, [kn * 0.02, kn * 0.012]);
  } },
  // ---- the call to action
  { id: 'cta', fn(t, u, s) {
    b13Mode(t, 'ext'); B13.beacon.visible = Math.floor(t * 1.5) % 2 === 0; B13.win14.visible = true; B13.win13.visible = true;
    b13Look([p3Lerp(8, 16, u), p3Lerp(30, 6, p3Smooth(u)), p3Lerp(-262, -205, p3Smooth(u))], [-1.3, p3Lerp(41, 34, u), -294], p3Lerp(28, 44, u));
  } },
  { id: 'pergunta', fn(t, u, s) {
    const on = Math.floor(t * 4) % 3 !== 0; b13Cab(0, on ? '13' : '', 0, 0.6, t); b13Gray(p3Ramp(t, s.t1 - 1.2, s.t1) * 0.8);
    b13Look([0, 2.02, p3Lerp(0.3, 0.6, u)], [0, 2.25, 0.985], 32);
  } },
]);
