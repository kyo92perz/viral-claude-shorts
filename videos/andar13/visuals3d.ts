// =====================================================================
//  O 13º andar — the scenes. Each one only assembles the world (world3d.ts) over the audio's timing:
//  the mode of the place, the states of the pieces at its keys and its camera shot.
// =====================================================================
a13Shots([
  // 1. the tower at night, tilt up
  { id: 'hook', fn(t, u, s) {
    a13Mode(t, 'ext'); A13.beacon.visible = Math.floor(t * 1.5) % 2 === 0;
    a13Look([9 - u * 2, 1.7, -228 + u * 3], [0, p3Lerp(16, 46, p3Smooth(u)), -300], 45);
  } },
  // 2. the panel: 12, then 14
  { id: 'botao', fn(t, u, s) {
    a13Mode(t, 'home'); const lit = t >= a13K(s, 'quatorze') ? 14 : t >= a13K(s, 'doze') ? 12 : 0; a13Cab(0, '12', lit);
    a13Look([p3Lerp(0.42, 0.62, u), 1.3, p3Lerp(0.42, 0.55, u)], [0.985, 1.25, 0.62], 40);
  } },
  // 3. the stop: jolt, flicker, fear
  { id: 'parou', fn(t, u, s) {
    a13Mode(t, 'home'); const ts = a13K(s, 'stop'), m: A13Man = A13.man; m.visible = true; m.position.set(0, 0, -0.55);
    a13Cab(0, '12', 0, t > ts && t < ts + 0.9 ? 1 : 0, t);
    const f = p3Ramp(t, ts, ts + 0.3), P = a13Mix(a13Idle(t), a13Scared(t), f * 0.7); P['neck.x'] = p3Lerp(P['neck.x'], -0.45, p3Ramp(t, ts + 0.5, ts + 1.0)); m.pose(P);
    a13Look([0.35, 1.55, 0.95 - u * 0.15], [0, 1.2, -0.55], 74, a13Shake(t, ts, 0.05));
  } },
  // 4. the display glitches between 12 and 14, then goes dark
  { id: 'painel', fn(t, u, s) {
    a13Mode(t, 'home'); const tl = a13K(s, 'lit'); const glitch = Math.floor(t * 9) % 2 ? '14' : '12';
    a13Cab(0, t >= tl ? '' : t > tl - 0.8 ? glitch : '12', 0, t > tl - 0.8 ? 0.7 : 0, t);
    a13Look([0, p3Lerp(1.95, 2.05, u), p3Lerp(0.25, 0.5, u)], [0, 2.25, 0.985], 40);
  } },
  // 5. the red 13; then the doors open by themselves
  { id: 'treze', fn(t, u, s) {
    const ts = a13K(s, 'stat'), to = a13K(s, 'open');
    if (t < to - 0.1) { a13Mode(t, 'home'); a13Cab(0, t >= ts ? '13' : '', 0, 0, t); a13Red(0.85 * a13Pulse(t, ts, 2.5)); a13Look([0, 2.0, 0.42 + p3Ramp(t, ts, ts + 0.6) * 0.15], [0, 2.25, 0.985], 40, a13Shake(t, ts, 0.02)); }
    else { a13Mode(t, 'thirteen', false); a13Floor('13'); a13Cab(p3Ramp(t, to, to + 0.8), '13'); a13Look([0, 1.6, -0.75 + (t - to) * 0.05], [0, 1.45, 8], 50); }
  } },
  // 6. POV out of the cabin: carpet, doors
  { id: 'corredor', fn(t, u, s) {
    a13Mode(t, 'thirteen', false); a13Floor('13'); a13Cab(1, '13');
    const c = p3Ramp(t, a13K(s, 'carpet') - 0.3, a13K(s, 'carpet') + 0.5), d = p3Ramp(t, a13K(s, 'doors') - 0.3, a13K(s, 'doors') + 0.4), z = p3Lerp(-0.6, 2.4, p3Smooth(u));
    a13Look([0, 1.6, z], [p3Lerp(0, -1.25, d), p3Lerp(p3Lerp(1.45, 0.1, c), 1.2, d), p3Lerp(z + 8, z + 2.4, Math.max(c * 0.5, d * 0.85))], 50);
  } },
  // 7. walking down the flickering corridor; the far door is ajar
  { id: 'luzes', fn(t, u, s) {
    a13Mode(t, 'thirteen', t >= a13K(s, 'flick') - 0.3); a13Floor('13'); a13Cab(1, '13');
    const td = a13K(s, 'door'), m: A13Man = A13.man; m.visible = true; A13.endDoor.hinge.rotation.y = 0.5;
    const walk = p3Clamp((t - s.t0) / (td + 0.5 - s.t0)), z = p3Lerp(2.4, 9.5, walk); m.position.set(0.15, 0, z);
    m.pose(t < td + 0.5 ? a13Walk(t, 1.2, 0.8) : a13Mix(a13Walk(t, 1.2, 0.8), a13Idle(t), p3Ramp(t, td + 0.5, td + 0.8)));
    const look = p3Ramp(t, td - 0.2, td + 0.9);
    a13Look([p3Lerp(0.55, 0.35, look), p3Lerp(1.75, 1.6, look), z - p3Lerp(2.8, 1.6, look)], [0, p3Lerp(1.3, 1.25, look), p3Lerp(z + 4, 21, look)], p3Lerp(45, 32, look));
  } },
  // 8. the plate 1302, flickering to 1402 for a moment
  { id: 'placa', fn(t, u, s) {
    a13Mode(t, 'thirteen'); a13Floor('13'); A13.endDoor.hinge.rotation.y = 0.12; const tm = a13K(s, 'mine');
    if (t > tm && t < tm + 0.9) A13.endDoor.setNum(Math.floor((t - tm) * 10) % 2 ? '1302' : '1402');
    a13Look([0, 1.63, p3Lerp(19.6, 20.15, p3Smooth(u))], [0, 1.6, 21], 30, a13Shake(t, a13K(s, 'plate'), 0.01));
  } },
  // 9. his face; then the eyes in the dark doorway
  { id: 'voz', fn(t, u, s) {
    a13Mode(t, 'thirteen'); a13Floor('13'); const te = a13K(s, 'eyes'), tc = a13K(s, 'call');
    if (t < te) { const m: A13Man = A13.man; m.visible = true; m.position.set(0.1, 0, 12); m.pose(a13Mix(a13Idle(t), a13Scared(t), p3Ramp(t, tc, tc + 0.4)));
      a13Look([0.25, 1.74, 13.25 - p3Ramp(t, tc, te) * 0.25], [0.1, 1.7, 12], 35); }
    else { A13.endDoor.hinge.rotation.y = 1.2; const d: A13Man = A13.dbl; d.visible = true; d.position.set(-0.28, 0, 22.2); d.rotation.y = Math.PI; d.pose(a13Stand(t));
      a13Red(0.8 * a13Pulse(t, te)); a13Look([0.1, 1.55, 16.6 + (t - te) * 0.9], [-0.1, 1.45, 21.5], 36, a13Shake(t, te, 0.05)); }
  } },
  // 10. the run back; the 14 pressed again and again
  { id: 'fuga', fn(t, u, s) {
    a13Mode(t, 'thirteen'); a13Floor('13'); const tp = a13K(s, 'press'), tr = a13K(s, 'run');
    if (t < tp - 0.1) { a13Cab(1, '13'); const m: A13Man = A13.man; m.visible = true; m.rotation.y = Math.PI; const z = p3Lerp(10.5, 2.6, p3Clamp((t - s.t0) / (tp - s.t0)));
      m.position.set(0.1, 0, z); m.pose(t < tr ? a13Mix(a13Scared(t), a13Run(t), p3Ramp(t, s.t0, tr)) : a13Run(t));
      a13Look([0.45, 1.55, z - 3.3], [0.05, 1.2, z], 45, [Math.sin(t * 17) * 0.015, Math.sin(t * 23) * 0.015]); }
    else { const n = Math.floor((t - tp) * 6); a13Cab(1, '13', n % 2 ? 0 : 14); a13Look([0.5, 1.3, 0.48], [0.985, 1.25, 0.62], 40, [Math.sin(t * 29) * 0.008, Math.sin(t * 31) * 0.008]); }
  } },
  // 11. the doors close on the corridor; the double is at the end of it. Then the display says 14
  { id: 'fechou', fn(t, u, s) {
    a13Mode(t, 'thirteen'); a13Floor('13'); const tc = a13K(s, 'close'), tu = p3Word(106), d: A13Man = A13.dbl;
    d.visible = true; d.position.set(0, 0, 18.5); d.rotation.y = Math.PI; d.pose(a13Stand(t));
    if (t < tu - 0.05) { a13Cab(1 - p3Ramp(t, tc, tc + 0.7), '13'); a13Look([0, 1.6, -0.75], [0, 1.45, 8], 44); }
    else { a13Mode(t, 'home'); a13Cab(0, '14'); a13Look([0, 1.95, 0.35], [0, 2.25, 0.985], 40); }
  } },
  // 12. home: the bed in moonlight, he closes his eyes
  { id: 'casa', fn(t, u, s) {
    a13Mode(t, 'night'); const m: A13Man = A13.man, ts = a13K(s, 'sleep'); m.visible = true; m.position.set(1.4, 0.58, 23.72); m.rotation.set(-Math.PI / 2, Math.PI, 0);
    m.pose({ ...a13Idle(0), eyes: p3Lerp(1, 0.08, p3Ramp(t, ts, ts + 0.5)), 'neck.y': 0.15 });
    a13Look([p3Lerp(0.1, 0.35, u), p3Lerp(1.8, 1.55, u), 23.3 + u * 0.3], [1.35, 0.65, 25.1], 50);
  } },
  // 13. the clock 03:00; the ding, his eyes snap open
  { id: 'tres', fn(t, u, s) {
    a13Mode(t, 'night'); const td = a13K(s, 'ding');
    if (t < td) a13Look([1.45, p3Lerp(0.9, 0.8, u), 22.72], [1.6, 0.5, 22.95], 35);
    else { const m: A13Man = A13.man; m.visible = true; m.position.set(1.4, 0.58, 23.72); m.rotation.set(-Math.PI / 2, Math.PI, 0);
      m.pose({ ...a13Idle(0), eyes: p3Lerp(0.08, 1.5, p3Ramp(t, td + 0.1, td + 0.3)), brow: 1, 'neck.y': p3Lerp(0.15, 0.55, p3Ramp(t, td + 0.5, td + 1.1)) });
      a13Look([0.85, 1.25, 25.15], [1.4, 0.72, 25.45], 38); }
  } },
  // 14. the strip of light under the door: feet arrive and stop; three knocks
  { id: 'batidas', fn(t, u, s) {
    a13Mode(t, 'night'); const ts = a13K(s, 'steps'), k = a13K(s, 'k1'), kn = Math.max(a13Knocks(t, k, 1), a13Knocks(t, a13K(s, 'k2'), 1), a13Knocks(t, a13K(s, 'k3'), 1));
    const arrive = p3Ramp(t, ts - 0.2, ts + 1.3);
    A13.feet.forEach((f: THREE.Mesh, i: number) => { f.visible = arrive > 0; f.position.x = p3Lerp(-0.75 + i * 0.2, -0.12 + i * 0.24, arrive); });
    A13.endDoor.hinge.position.z = 0.012 * kn;
    a13Look([0.25, 0.35, 23.3 - u * 0.4], [0, 0.12, 21.2], 45, [kn * 0.02, kn * 0.012]);
  } },
  // 15. he listens at the door; the peephole: the double leans closer
  { id: 'sussurro', html: (w) => a13PeepMask(w, a13K(w.s, 'peep')), fn(t, u, s) {
    const tp = a13K(s, 'peep'), tw = a13K(s, 'whisper');
    if (t < tp) { a13Mode(t, 'night'); const m: A13Man = A13.man; m.visible = true; m.position.set(0.1, 0, 21.45); m.rotation.y = Math.PI; m.pose(a13Listen(t)); a13Look([1.3, 1.6, 22.7], [0.1, 1.45, 21.4], 42); }
    else { a13Mode(t, 'thirteen'); a13Floor('13'); const d: A13Man = A13.dbl; d.visible = true; d.position.set(0, 0, p3Lerp(19.9, 20.55, p3Ramp(t, tp, s.t1))); d.pose({ ...a13Stand(t), 'neck.z': p3Lerp(0.25, 0.45, p3Ramp(t, tw, tw + 0.8)) });
      a13Red(0.6 * a13Pulse(t, tw, 2)); a13Look([0, 1.55, 20.97], [0, 1.4, 15], 95); }
  } },
  // 16. the twist: behind the double, pull back to the plate 1302
  { id: 'fim', fn(t, u, s) {
    a13Mode(t, 'thirteen'); a13Floor('13'); const tr = a13K(s, 'reveal'), d: A13Man = A13.dbl; d.visible = true; d.position.set(0.32, 0, 20.35); d.pose(a13Knock(t, s.t0 - 2));
    a13Red(0.9 * a13Pulse(t, tr, 1.5)); a13Gray(p3Ramp(t, s.t1 - 0.8, s.t1) * 0.6);
    a13Look([p3Lerp(-0.2, 0.25, u), 1.62, p3Lerp(20.15, 17.6, p3Smooth(u))], [-0.05, 1.6, 21], p3Lerp(28, 42, u), a13Shake(t, tr, 0.05));
  } },
]);
