// =====================================================================
//  ZONA DE SILÊNCIO, EP1: the world (prefix zs). Everything is built once and posed from the time t.
//  1. materials (skin, cloth patterns, hair, wet creature skin)       4. the creature (the Chiado)
//  2. people: one rig for every character (body, face, speech)       5. sets: observatory, basement, main street,
//  3. motion: poses, walk/run cycles, fight moves, expressions           video store, woods, Ray's shop
//  The cast and the look are in BIBLIA.md and plan.md.
// =====================================================================
const ZS: any = {};

// ---------------------------------------------------------------- the cast (BIBLIA.md)
const ZS_CAST: Record<string, ZsSpec> = {
  theo: { name: 'theo', h: 1.56, build: 0.25, kid: true, skin: '#e8c3a0', iris: '#2b1a10', hair: { style: 'side', color: '#141210' }, glasses: '#2a2a2e',
    shirt: { c: '#8a8f96', p: 'plain' }, jacket: { c: '#8c1f24', p: 'flannel', c2: '#1d2a44' }, pants: { c: '#3b5277', p: 'denim' }, shoes: '#e9e6df' },
  dani: { name: 'dani', h: 1.5, build: 0.15, kid: true, female: true, skin: '#c8976e', iris: '#3a2412', hair: { style: 'pony', color: '#2a1810' },
    shirt: { c: '#1b1b1e', p: 'plain' }, jacket: { c: '#e5b52a', p: 'nylon', c2: '#2a6bb0' }, pants: { c: '#56603a', p: 'canvas' }, shoes: '#1d1d22' },
  bolacha: { name: 'bolacha', h: 1.62, build: 1, kid: true, skin: '#7a4c31', iris: '#21140c', hair: { style: 'curly', color: '#16100c' }, pager: true,
    shirt: { c: '#d4682a', p: 'knit' }, pants: { c: '#33486a', p: 'denim' }, shoes: '#b8b4ab' },
  jess: { name: 'jess', h: 1.66, build: 0.2, female: true, skin: '#e6c09c', iris: '#2b1a10', hair: { style: 'long', color: '#17130f' }, lip: '#a4505a',
    shirt: { c: '#7d1f2c', p: 'plain', short: true }, pants: { c: '#2f3f5e', p: 'denim' }, shoes: '#2a2a2e' },
  kyle: { name: 'kyle', h: 1.82, build: 0.2, skin: '#f0c8a6', iris: '#4a6a7a', hair: { style: 'messy', color: '#b79a5e' }, beanie: '#3f4a2e', stubble: '#a08050',
    shirt: { c: '#3d5a3a', p: 'flannel', c2: '#1e2a1c' }, pants: { c: '#465a78', p: 'denim' }, shoes: '#5a4632' },
  ray_old: { name: 'ray_old', h: 1.8, build: 0.55, skin: '#dcae8a', iris: '#3e4e40', hair: { style: 'messy', color: '#6e655a' }, stubble: '#8a8277', scar: true,
    shirt: { c: '#5d6670', p: 'plain' }, jacket: { c: '#6b5234', p: 'canvas', c2: '#4e3a22' }, pants: { c: '#33405a', p: 'denim' }, shoes: '#3a2a1c' },
  ray_young: { name: 'ray_young', h: 1.8, build: 0.4, skin: '#e2b590', iris: '#3e4e40', hair: { style: 'seventies', color: '#5a3d22' }, mustache: '#4e3420',
    shirt: { c: '#c9b48a', p: 'plain' }, pants: { c: '#5a4630', p: 'canvas' }, shoes: '#2e2118' },
  vance: { name: 'vance', h: 1.75, build: 0.5, skin: '#e9c4a4', iris: '#3a4a5a', hair: { style: 'bald', color: '#9c958c' }, beard: undefined, mustache: '#9c958c', stubble: '#8f887f', glasses: '#4a4036',
    shirt: { c: '#dfe3e8', p: 'plain' }, jacket: { c: '#eef0f2', p: 'plain', long: true }, tie: '#3a3f5a', pants: { c: '#4a4a52', p: 'suit' }, shoes: '#1b1b1d' },
  helen: { name: 'helen', h: 1.63, build: 0.55, female: true, skin: '#c48f68', iris: '#3a2412', hair: { style: 'pony', color: '#2e211a' }, lip: '#9a4f4a',
    shirt: { c: '#2f7f7a', p: 'plain' }, jacket: { c: '#ece6da', p: 'plain', open: true }, pants: { c: '#2a2a30', p: 'plain' }, shoes: '#1d1d22' },
  coyle: { name: 'coyle', h: 1.84, build: 0.35, skin: '#efd0b8', iris: '#5a6e80', hair: { style: 'short', color: '#3a2f26' },
    shirt: { c: '#eef0f3', p: 'plain' }, jacket: { c: '#4d5258', p: 'suit', c2: '#3a3e44', open: false }, tie: '#2a2d38', pants: { c: '#4d5258', p: 'suit' }, shoes: '#141416' },
};

// ---------------------------------------------------------------- 5. sets (the pieces are in styles/3d/people.ts)
const ZS_SET_AT: Record<string, Vec3> = { dish: [0, 0, 0], control: [120, 0, 0], basement: [240, 0, 0], street: [360, 0, 0], rewind: [480, 0, 0], woods: [600, 0, 0], shop: [720, 0, 0] };
// ---- A. Pike Ridge, 1979: the dish outside and the control room
const zsSetDish = () => {
  const g = zsGroup();
  g.add(zsTerrain(400, 120, (x, z) => 3 * p3Fbm3(x * 0.02, 0, z * 0.02) + Math.max(0, Math.hypot(x, z + 60) - 60) * 0.18 * (0.6 + p3Noise3(x * 0.01, 1, z * 0.01)), zsSurf('hill', `float n = p3F(p3World.xz * 0.5), d = p3N(p3World.xz * 12.0); diffuseColor.rgb = mix(vec3(0.07, 0.09, 0.06), vec3(0.15, 0.15, 0.1), n) * (0.8 + 0.3 * d); p3Ht = d;`, 0.97, 0.02)));
  g.add(zsStars(1800, 380, 11));
  const moon = zsMesh(new THREE.SphereGeometry(6, 24, 16), zsGlow('#dfe6ff', 1.1), [-120, 110, -260]); g.add(moon);
  // the dish: a tower, a yoke and a 22 m parabolic reflector of panels, with a feed on four legs
  const steel = zsMetal('#b9bec4', 0.5), dark = zsMetal('#6d7278', 0.6);
  const tower = zsGroup(); tower.position.set(0, 0, -30); g.add(tower);
  for (const [x, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) tower.add(p3Rod([x * 5, 0, z * 5], [x * 2.2, 12, z * 2.2], 0.25, dark, 8));
  tower.add(zsBox(6, 1.2, 6, dark, [0, 12.4, 0]));
  const yoke = zsGroup(); yoke.position.y = 13; tower.add(yoke); ZS.dishYoke = yoke;
  const tilt = zsGroup(); tilt.position.y = 2; yoke.add(tilt); ZS.dishTilt = tilt;
  for (const x of [-4.5, 4.5]) yoke.add(zsBox(0.8, 5, 1.4, dark, [x, 1.5, 0]));
  const prof: THREE.Vector2[] = []; for (let i = 0; i <= 24; i++) { const r = (i / 24) * 11; prof.push(new THREE.Vector2(r, r * r / 30)); }
  const dg = new THREE.LatheGeometry(prof, 64); dg.rotateX(-Math.PI / 2);
  const panel = p3Shader(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.42, metalness: 0.55, side: THREE.DoubleSide }), 'zs-dish', { bump: 0.004,
    color: `float a = atan(p3Pos.y, p3Pos.x), r = length(p3Pos.xy); float seam = step(0.97, fract(a * 6.3662)) + step(0.94, fract(r * 0.9)); float n = p3F(p3Pos.xy * 0.6); diffuseColor.rgb = mix(vec3(0.62, 0.64, 0.66), vec3(0.8, 0.82, 0.84), n) * (1.0 - min(1.0, seam) * 0.35); p3Ht = 1.0 - min(1.0, seam);` });
  tilt.add(zsMesh(dg, panel, [0, 0, 0]));
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; tilt.add(p3Rod([Math.cos(a) * 9.5, Math.sin(a) * 9.5, 3.2], [0, 0, 9], 0.09, steel, 6)); }
  tilt.add(zsMesh(new THREE.CylinderGeometry(0.5, 0.8, 1.4, 12), dark, [0, 0, 9], [Math.PI / 2, 0, 0]));
  const feedGlow = zsMesh(new THREE.SphereGeometry(0.35, 12, 10), zsGlow(ZS_GREEN, 1.5), [0, 0, 8.2]); tilt.add(feedGlow); ZS.feedGlow = feedGlow;
  tilt.rotation.x = -0.75;
  // the control building at the foot of the dish, its lit window, the fence, the cable conduit
  const bld = zsGroup(); bld.position.set(14, 0, -14); g.add(bld);
  bld.add(zsBox(12, 4, 8, zsConcrete('#9aa39c'), [0, 2, 0]), zsBox(12.6, 0.4, 8.6, zsConcrete('#6f7670'), [0, 4.2, 0]));
  const win = zsLightPanel(3.2, 1.2, '#d9f2c9', 1.3, [-2, 2.3, 4.01]); bld.add(win); ZS.ctrlWindow = win;
  bld.add(zsLightPanel(1.0, 2.1, '#3a3a2c', 0.3, [3.5, 1.05, 4.01]));
  const lamp = zsPoint('#e8f5d8', 30, 18, [-2, 3, 6], true); bld.add(lamp);
  g.add(zsWire([0, 0.3, -30], [14, 0.3, -14], -0.0, 0.35));
  for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2; g.add(zsBox(0.08, 2.2, 0.08, dark, [Math.cos(a) * 26, 1.1, -22 + Math.sin(a) * 26])); }
  for (let k = 0; k < 40; k++) { const rnd = p3Rnd(200 + k), x = (rnd() - 0.5) * 200, z = -60 - rnd() * 120; const tr = zsPine(9 + rnd() * 8, k); tr.position.set(x, 0, z); g.add(tr); }
  const sky = new THREE.HemisphereLight('#304068', '#0a0c10', 0.5), moonL = new THREE.DirectionalLight('#9fb4ff', 1.2); moonL.position.set(-60, 80, -40); moonL.castShadow = true; moonL.shadow.mapSize.set(2048, 2048); Object.assign(moonL.shadow.camera, { left: -40, right: 40, top: 40, bottom: -10, far: 300 });
  g.add(sky, moonL, moonL.target);
  return g;
};
const zsSetControl = () => {
  const g = zsGroup(), W = 8, D = 6, Hh = 3;
  g.add(zsRoom(W, D, Hh, zsConcrete('#8f9d93'), zsTiles('#9a9888', '#5c5a50'), zsConcrete('#b9bdb3')));
  // fluorescent panels (they flicker with the signal)
  ZS.ctrlTubes = [];
  for (const x of [-2, 2]) { const p = zsLightPanel(1.6, 0.3, '#eaf6e2', 1.2, [x, Hh - 0.01, 0], [Math.PI / 2, 0, 0]); g.add(p); ZS.ctrlTubes.push(p); }
  const tubeL = [zsPoint('#e4f2dc', 9, 9, [-2, 2.7, 0], true), zsPoint('#e4f2dc', 9, 9, [2, 2.7, 0])]; g.add(...tubeL); ZS.ctrlLights = tubeL;
  g.add(new THREE.HemisphereLight('#9fb39a', '#2a2820', 0.35));
  // the console wall: racks of equipment, VU meters, oscilloscopes, a reel-to-reel
  const rack = zsStd('#c8c2ae', 0.55, 0.1), rack2 = zsStd('#7c8a86', 0.5, 0.2);
  for (let i = 0; i < 6; i++) {
    const x = -3.25 + i * 1.3, R = zsGroup(); R.position.set(x, 0, -D / 2 + 0.45); g.add(R);
    R.add(zsBox(1.2, 2.2, 0.8, i % 2 ? rack : rack2, [0, 1.1, 0]));
    const scope = zsPlane(0.5, 0.36, zsScreenMat('scope'), [-0.2, 1.62, 0.41]); scope.castShadow = false; R.add(scope);
    R.add(zsPlane(0.4, 0.18, zsDialMat(), [0.32, 1.7, 0.41]), zsPlane(0.4, 0.18, zsDialMat(), [0.32, 1.45, 0.41]));
    for (let k = 0; k < 6; k++) R.add(zsMesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 10), zsStd('#1b1b1b', 0.4), [-0.45 + k * 0.18, 1.12, 0.42], [Math.PI / 2, 0, 0]));
    for (let k = 0; k < 8; k++) R.add(zsLightPanel(0.03, 0.03, k % 3 ? '#ff4a2a' : '#7dff9a', 1.5, [-0.45 + k * 0.12, 0.9, 0.41]));
    R.add(zsBox(1.25, 0.06, 0.95, zsStd('#55524a', 0.6), [0, 0.86, 0.1]));
  }
  const reel = zsGroup(); reel.position.set(3.2, 0, -1.2); g.add(reel);
  reel.add(zsBox(0.9, 1.4, 0.6, zsStd('#4a4842', 0.5, 0.3), [0, 0.7, 0]));
  ZS.reels = [0.25, -0.25].map((x) => { const r = zsMesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24), zsStd('#8a8d90', 0.3, 0.7), [x, 1.18, 0.31], [Math.PI / 2, 0, 0]); reel.add(r); return r; });
  // the desk with the microphone, papers and coffee
  const desk = zsGroup(); desk.position.set(-0.6, 0, -0.4); g.add(desk);
  desk.add(zsBox(2.4, 0.06, 1.0, zsWood(), [0, 0.76, 0])); for (const [x, z] of [[1.1, 0.4], [-1.1, 0.4], [1.1, -0.4], [-1.1, -0.4]]) desk.add(zsBox(0.06, 0.76, 0.06, zsMetal(), [x, 0.38, z]));
  desk.add(zsMesh(new THREE.CylinderGeometry(0.07, 0.09, 0.03, 16), zsMetal('#333'), [0.3, 0.8, 0.1]), p3Rod([0.3, 0.8, 0.1], [0.3, 1.02, 0.12], 0.008, zsMetal('#444')));
  desk.add(zsMesh(new THREE.CapsuleGeometry(0.035, 0.08, 6, 12), zsMetal('#9a9ea4', 0.3), [0.3, 1.08, 0.13], [0.3, 0, 0]));
  desk.add(zsBox(0.3, 0.005, 0.4, zsStd('#eeeadf', 0.9), [-0.6, 0.795, 0.1], [0, 0.2, 0]), zsBox(0.3, 0.005, 0.4, zsStd('#e6e1d4', 0.9), [-0.45, 0.8, 0.0], [0, -0.1, 0]));
  desk.add(zsMesh(new THREE.CylinderGeometry(0.045, 0.04, 0.1, 14), zsStd('#d8d2c4', 0.4), [0.8, 0.84, 0.2]));
  // the cable: a thick bundle from the floor to the junction box (Ray cuts it)
  ZS.cable = p3Tube([[-3.9, 0.08, 1.8], [-2, 0.08, 1.9], [-0.5, 0.08, 1.3], [1.5, 0.08, 1.5], [3.2, 0.08, 2.2], [3.9, 0.5, 2.3]], 0.07, zsStd('#141414', 0.5), 48); g.add(ZS.cable);
  g.add(zsBox(0.5, 0.7, 0.25, zsMetal('#7a8078', 0.5), [3.88, 0.7, 2.3]));
  // the fire axe in its red case
  g.add(zsBox(0.4, 1.0, 0.1, zsStd('#a3221c', 0.5), [-3.95, 1.5, -1.0], [0, Math.PI / 2, 0]));
  ZS.axeCtrl = zsAxe(); ZS.axeCtrl.position.set(-3.88, 1.05, -1.0); ZS.axeCtrl.rotation.set(0, Math.PI / 2, 0); g.add(ZS.axeCtrl);
  // the window to the dish (night outside) and the dark corridor door (negative space)
  g.add(zsLightPanel(2.2, 1.1, '#18243a', 1, [W / 2 - 0.01, 1.8, -0.8], [0, -Math.PI / 2, 0]));
  g.add(zsBox(1.0, 2.1, 0.05, zsStd('#050506', 1), [-W / 2 + 0.02, 1.05, 1.6], [0, Math.PI / 2, 0]));
  return g;
};
const zsAxe = () => {
  const g = zsGroup(), wood = zsSurf('handle', `float n = p3F(vec2(p3Pos.y * 2.0, p3Pos.x * 40.0)); diffuseColor.rgb = mix(vec3(0.45, 0.27, 0.12), vec3(0.65, 0.42, 0.2), n);`, 0.6, 0);
  g.add(zsMesh(new THREE.CylinderGeometry(0.018, 0.022, 0.9, 10), wood, [0, 0.45, 0]));
  const head = zsMesh(p3Extruded([[0, 0], [0.2, -0.04], [0.24, -0.1], [0.24, 0.12], [0.2, 0.08], [0, 0.04], [-0.08, 0.03], [-0.08, -0.01]], 0.03), zsStd('#b3201a', 0.4, 0.4), [0, 0.86, 0]);
  g.add(head, zsMesh(new THREE.BoxGeometry(0.004, 0.2, 0.032), zsMetal('#d7dade', 0.2), [0.24, 0.87, 0]));
  return g;
};

// ---- B. the basement: Radio Porão
const zsSetBasement = () => {
  const g = zsGroup(), W = 6, D = 5, Hh = 2.4;
  g.add(zsRoom(W, D, Hh, zsWood(), zsCarpet(), zsSurf('ceiltile', `float t = step(0.97, fract(p3World.x * 1.6)) + step(0.97, fract(p3World.z * 1.6)); diffuseColor.rgb = vec3(0.75, 0.72, 0.65) * (1.0 - t * 0.4);`, 0.9, 0)));
  // the ham-radio desk against the back wall
  const desk = zsGroup(); desk.position.set(-0.6, 0, -D / 2 + 0.45); g.add(desk);
  desk.add(zsBox(2.6, 0.06, 0.8, zsWood(), [0, 0.74, 0]), zsBox(2.6, 0.7, 0.04, zsWood(), [0, 0.38, -0.38]));
  for (const x of [-1.25, 1.25]) desk.add(zsBox(0.06, 0.74, 0.76, zsWood(), [x, 0.37, 0]));
  const rig = [zsRadio(0.55, 0.22, 0.35, 1), zsRadio(0.45, 0.18, 0.3, 2), zsRadio(0.5, 0.25, 0.32, 0), zsRadio(0.4, 0.16, 0.3, 1)];
  rig.forEach((r, i) => { r.position.set(-0.55 + (i % 2) * 0.6, 0.77 + Math.floor(i / 2) * 0.27, -0.15); desk.add(r); });
  ZS.receiver = rig[0];
  desk.add(zsCRT(0.42), zsMesh(new THREE.CylinderGeometry(0.06, 0.08, 0.03, 16), zsMetal('#333'), [0.25, 0.78, 0.15]), p3Rod([0.25, 0.78, 0.15], [0.25, 1.0, 0.17], 0.008, zsMetal('#444')));
  desk.children[desk.children.length - 3].position.set(0.75, 0.77, -0.1);
  desk.add(zsMesh(new THREE.CapsuleGeometry(0.03, 0.07, 6, 12), zsMetal('#2a2a2e', 0.3), [0.25, 1.05, 0.18], [0.3, 0, 0]));
  // the cassette recorder (Theo's) and snacks
  ZS.cassette = zsGroup(zsBox(0.2, 0.05, 0.12, zsStd('#2b2b2f', 0.4, 0.2), [0, 0.025, 0]), zsBox(0.09, 0.005, 0.055, zsStd('#cfc6b0', 0.4), [-0.03, 0.052, 0])); ZS.cassette.position.set(-1.0, 0.77, 0.2); desk.add(ZS.cassette);
  desk.add(zsBox(0.18, 0.25, 0.06, zsStd('#d23c2c', 0.6), [1.0, 0.9, 0.2], [0, 0.4, 0.15]));
  // desk lamp (warm key light) and a lava lamp (orange glow)
  const lamp = zsGroup(); lamp.position.set(1.1, 0.77, -0.2); desk.add(lamp);
  lamp.add(zsMesh(new THREE.CylinderGeometry(0.08, 0.1, 0.03, 14), zsMetal('#2e5a46'), [0, 0.015, 0]), p3Rod([0, 0, 0], [-0.05, 0.4, 0.05], 0.01, zsMetal('#2e5a46')));
  lamp.add(zsMesh(new THREE.ConeGeometry(0.1, 0.14, 16, 1, true), zsStd('#2e5a46', 0.4, 0.3), [-0.1, 0.42, 0.1], [0.9, 0, 0.5]));
  const key = zsSpot('#ffcf8a', 22, 7, [0.4, 1.25, -1.5], [-0.6, 0.6, 0.6], 1.0); g.add(key.g); ZS.baseKey = key.l;
  const lava = zsGroup(zsMesh(new THREE.CylinderGeometry(0.05, 0.08, 0.35, 16), zsGlow('#ff7a2a', 0.9), [0, 0.2, 0])); lava.position.set(1.95, 0.4, -1.8); g.add(lava);
  g.add(zsBox(0.5, 0.4, 0.4, zsWood(), [1.95, 0.2, -1.9]), zsPoint('#ff8a3a', 5, 4, [1.95, 0.8, -1.6]));
  g.add(new THREE.HemisphereLight('#6a5a7a', '#2a1a10', 0.25));
  // the couch, a bean bag, posters, the high window with night outside, the stairs going up into the dark
  const couch = zsGroup(); couch.position.set(1.6, 0, 1.2); couch.rotation.y = -Math.PI / 2 - 0.3; g.add(couch);
  const flor = zsSurf('floral', `vec3 v = p3V(p3World.xy * 9.0 + p3World.z * 7.0); float f = smoothstep(0.25, 0.1, v.x); diffuseColor.rgb = mix(vec3(0.42, 0.33, 0.18), vec3(0.64, 0.24, 0.16), f); p3Ht = f;`, 0.95, 0.01);
  couch.add(zsMesh(new THREE.RoundedBoxGeometry(2.0, 0.42, 0.85, 3, 0.1), flor, [0, 0.33, 0]), zsMesh(new THREE.RoundedBoxGeometry(2.0, 0.55, 0.25, 3, 0.1), flor, [0, 0.72, -0.32]));
  for (const x of [-1, 1]) couch.add(zsMesh(new THREE.RoundedBoxGeometry(0.22, 0.55, 0.85, 3, 0.08), flor, [x, 0.45, 0]));
  g.add(zsMesh(new THREE.SphereGeometry(0.45, 20, 14), zsCloth('#5a2a6a', 'nylon', '#3a1a4a'), [-2.2, 0.3, 1.4], undefined, [1, 0.62, 1]));
  const posterA = zsPaintTex('posterA', 360, 512, (c, w, h) => { const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#120a2a'); gr.addColorStop(1, '#4a1a3a'); c.fillStyle = gr; c.fillRect(0, 0, w, h); c.fillStyle = '#e8643a'; c.beginPath(); c.arc(w / 2, h * 0.42, 95, 0, 7); c.fill(); c.fillStyle = '#ffe9b0'; c.font = 'bold 54px Georgia'; c.textAlign = 'center'; c.fillText('MARS 1993', w / 2, h * 0.82); c.font = '24px Arial'; c.fillText('OBSERVER MISSION', w / 2, h * 0.9); });
  const posterB = zsPaintTex('posterB', 360, 512, (c, w, h) => { c.fillStyle = '#0d1b12'; c.fillRect(0, 0, w, h); c.strokeStyle = '#7dff9a'; c.lineWidth = 4; for (let i = 0; i < 9; i++) { c.beginPath(); c.arc(w / 2, h * 0.45, 20 + i * 18, 0, 7); c.globalAlpha = 1 - i * 0.1; c.stroke(); } c.globalAlpha = 1; c.fillStyle = '#b8ffcb'; c.font = 'bold 40px Courier New'; c.textAlign = 'center'; c.fillText('HAM RADIO', w / 2, h * 0.85); c.font = '22px Courier New'; c.fillText('KC8 • 27 MHz', w / 2, h * 0.92); });
  g.add(zsPlane(0.6, 0.85, posterA, [-1.9, 1.5, -D / 2 + 0.01]), zsPlane(0.6, 0.85, posterB, [W / 2 - 0.01, 1.45, -0.8], [0, -Math.PI / 2, 0]));
  g.add(zsLightPanel(0.9, 0.35, '#1a2a48', 0.8, [0.9, 2.05, -D / 2 + 0.01]));
  const stairs = zsGroup(); stairs.position.set(-2.5, 0, 1.6); g.add(stairs);
  for (let k = 0; k < 8; k++) stairs.add(zsBox(0.9, 0.06, 0.28, zsWood(), [0, 0.28 + k * 0.27, -k * 0.26]));
  g.add(zsBox(1.0, 2.4, 0.02, zsStd('#020203', 1), [-2.5, 1.2, -0.6 + 0.0], [0, 0, 0]));
  // the antenna wire across the wall
  g.add(zsWire([-2.9, 2.2, -D / 2 + 0.05], [2.9, 2.2, -D / 2 + 0.05], 0.2, 0.006));
  return g;
};

// ---- C. Main Street at night: Ruiz Diner, Holt Radio & TV, Rewind Video; the van; lamps and wires
const zsSetStreet = () => {
  const g = zsGroup();
  g.add(zsMesh(new THREE.PlaneGeometry(120, 14), zsAsphalt(), [0, 0, 2], [-Math.PI / 2, 0, 0]));
  g.add(zsBox(120, 0.15, 3, zsConcrete('#6e6f6c'), [0, 0.075, -6.5]), zsBox(120, 0.15, 3, zsConcrete('#6e6f6c'), [0, 0.075, 10.5]));
  for (let x = -60; x < 60; x += 6) g.add(zsBox(2.5, 0.01, 0.15, zsStd('#d8c26a', 0.6), [x, 0.005, 2]));
  // storefronts along the back (z = -8)
  const fronts: [string, number, string][] = [['diner', -12, '#8a5a3a'], ['shop', 0, '#6e4632'], ['rewind', 12, '#5a4a62']];
  for (const [name, x, tint] of fronts) {
    const f = zsGroup(); f.position.set(x, 0, -8); g.add(f);
    f.add(zsBox(11.6, 7, 0.5, zsBrick(tint), [0, 3.5, -0.25]), zsBox(11.8, 0.4, 0.7, zsConcrete('#4a4644'), [0, 7.1, -0.2]));
    f.add(zsLightPanel(4.2, 2.2, name === 'diner' ? '#ffd9a0' : name === 'rewind' ? '#cfe0ff' : '#2a2418', name === 'shop' ? 0.25 : 0.75, [-2.4, 1.6, 0.01]));
    f.add(zsBox(1.1, 2.3, 0.06, zsStd('#20160f', 0.6), [2.6, 1.15, 0.03]), zsLightPanel(0.5, 0.4, '#ffe6b0', name === 'shop' ? 0.2 : 0.6, [2.6, 1.85, 0.07]));
    for (const wx of [-3.5, 0, 3.5]) f.add(zsLightPanel(1.4, 1.3, '#1a1a24', 0.6, [wx, 5.0, 0.01]));
  }
  ZS.signs = {
    diner: zsPlane(5, 1.25, zsNeon('diner', 'RUIZ DINER', '#ff4fa3'), [-12, 3.6, -7.8]),
    shop: zsPlane(5, 1.0, zsNeon('shop', 'HOLT RADIO & TV', '#ffb347', 1024, 200, 'bold 110px Arial'), [0, 3.5, -7.8]),
    rewind: zsPlane(5, 1.25, zsNeon('rewind', 'REWIND VIDEO', '#4fd2ff', 1024, 256, 'italic bold 140px Arial'), [12, 3.6, -7.8]),
  };
  Object.values(ZS.signs).forEach((m: any) => { m.castShadow = false; g.add(m); });
  g.add(zsPoint('#ff4fa3', 14, 10, [-12, 3.4, -6]), zsPoint('#4fd2ff', 14, 10, [12, 3.4, -6]), zsPoint('#ffb347', 6, 8, [0, 3.4, -6]));
  // shop window radios (visible from the street) and the TV wall of the video store
  for (let i = 0; i < 5; i++) { const r = zsRadio(0.6, 0.35, 0.3, i); r.position.set(-3.8 + i * 0.75, 0.75, -7.7); g.add(r); }
  ZS.streetTV = zsCRT(0.7); ZS.streetTV.position.set(-1.2, 1.15, -7.75); g.add(ZS.streetTV);
  for (let i = 0; i < 3; i++) { const tv = zsCRT(0.55); tv.position.set(9.3 + i * 0.6, 0.8, -7.7); g.add(tv); }
  // street lamps (sodium), power poles and wires, a sign for the quiet zone
  for (const x of [-20, -6, 6, 20]) { const L = zsGroup(); L.position.set(x, 0, 9.2); g.add(L); L.add(zsMesh(new THREE.CylinderGeometry(0.08, 0.12, 6, 10), zsMetal('#3a3d40'), [0, 3, 0]), p3Rod([0, 6, 0], [0, 6.1, -1.6], 0.05, zsMetal('#3a3d40')));
    L.add(zsMesh(new THREE.CylinderGeometry(0.25, 0.32, 0.18, 12), zsStd('#2a2a2a', 0.5), [0, 6.05, -1.6]), zsLightPanel(0.45, 0.45, '#ffb35a', 1.3, [0, 5.95, -1.6], [Math.PI / 2, 0, 0])); }
  const sodiumA = zsSpot('#ffa955', 60, 16, [-6, 5.9, 7.6], [-6, 0, 3], 0.9), sodiumB = zsSpot('#ffa955', 60, 16, [6, 5.9, 7.6], [6, 0, 3], 0.9, false);
  g.add(sodiumA.g, sodiumB.g, zsPoint('#ffa955', 20, 14, [-20, 5.8, 7.6]), zsPoint('#ffa955', 20, 14, [20, 5.8, 7.6]));
  for (const x of [-30, -10, 10, 30]) { g.add(zsMesh(new THREE.CylinderGeometry(0.13, 0.16, 9, 10), zsSurf('pole', `float n = p3F(vec2(p3Pos.y * 2.0, atan(p3Pos.x, p3Pos.z) * 3.0)); diffuseColor.rgb = mix(vec3(0.18, 0.13, 0.09), vec3(0.3, 0.22, 0.15), n);`, 0.95, 0), [x, 4.5, 12])); g.add(zsBox(2.4, 0.15, 0.15, zsSurf('pole', '', 0.95, 0), [x, 8.6, 12])); }
  for (const y of [8.65, 8.2]) for (let k = 0; k < 3; k++) g.add(zsWire([-30 + k * 20, y, 12], [-10 + k * 20, y, 12], 0.6, 0.015));
  const zone = zsPaintTex('zone', 512, 384, (c, w, h) => { c.fillStyle = '#f3f1ea'; c.fillRect(0, 0, w, h); c.strokeStyle = '#1a3d7a'; c.lineWidth = 14; c.strokeRect(10, 10, w - 20, h - 20); c.fillStyle = '#1a3d7a'; c.textAlign = 'center'; c.font = 'bold 44px Arial';
    c.fillText('YOU ARE ENTERING THE', w / 2, 90); c.font = 'bold 56px Arial'; c.fillText('NATIONAL RADIO', w / 2, 165); c.fillText('QUIET ZONE', w / 2, 230); c.font = '30px Arial'; c.fillText('NO TRANSMITTING', w / 2, 300); c.fillText('VIOLATORS WILL BE FINED', w / 2, 340); });
  const zs = zsGroup(zsPlane(2.0, 1.5, zsPaintTex('zoneF', 2, 2, () => {}), [0, 0, 0])); zs.children[0].visible = false;
  g.add(zsPlane(2.0, 1.5, zone, [-26, 2.6, 9.0]), zsBox(0.08, 2.0, 0.08, zsMetal('#555'), [-26.7, 1.0, 9.0]), zsBox(0.08, 2.0, 0.08, zsMetal('#555'), [-25.3, 1.0, 9.0]));
  // Coyle's van, a pickup at the diner, the mountains and the sky
  ZS.van = zsCar('#e9eaec', true); ZS.van.position.set(4, 0, 6.5); ZS.van.rotation.y = Math.PI / 2; g.add(ZS.van);
  const pick = zsCar('#6a2a22'); pick.position.set(-14, 0, -3); pick.rotation.y = -Math.PI / 2; g.add(pick);
  g.add(zsTerrain(600, 60, (x, z) => (z < -60 ? 40 + 50 * p3Fbm3(x * 0.006, 2, z * 0.006) : -1), zsStd('#080a0e', 1)));
  g.add(zsStars(1200, 380, 21), new THREE.HemisphereLight('#2a3550', '#120c08', 0.45));
  const moonL = new THREE.DirectionalLight('#8aa0d8', 0.6); moonL.position.set(-40, 60, 30); g.add(moonL, moonL.target);
  return g;
};

// ---- D. Rewind Video, inside: aisles of tapes, the TV wall, the counter with the phone
const zsSetRewind = () => {
  const g = zsGroup(), W = 9, D = 7, Hh = 3;
  g.add(zsRoom(W, D, Hh, zsSurf('rewall', `float s = step(0.5, fract(p3World.y * 1.2)); diffuseColor.rgb = mix(vec3(0.16, 0.12, 0.24), vec3(0.2, 0.15, 0.3), s);`, 0.9, 0), zsTiles('#2a2a3a', '#4a4a62'), zsConcrete('#9a9aa6'), true));
  ZS.rwTubes = []; for (const x of [-2.5, 0, 2.5]) for (const z of [-1.5, 1.5]) { const p = zsLightPanel(1.6, 0.25, '#e8f0ff', 1.1, [x, Hh - 0.01, z], [Math.PI / 2, 0, 0]); g.add(p); ZS.rwTubes.push(p); }
  ZS.rwLights = [zsPoint('#e8f0ff', 10, 10, [-2.5, 2.8, 0], true), zsPoint('#e8f0ff', 10, 10, [2.5, 2.8, 0])]; g.add(...ZS.rwLights, new THREE.HemisphereLight('#8a90b0', '#201a30', 0.4));
  // aisles: shelves with tapes (one draw: many boxes with their own colors)
  const spines = (seed: number) => zsPaintTex('spines' + seed, 1024, 512, (c, w, h) => { const rnd = p3Rnd(seed), pal = ['#c0392b', '#2c3e50', '#f1c40f', '#27ae60', '#8e44ad', '#e67e22', '#ecf0f1', '#16a085', '#d35400', '#1a1a1a', '#7f1d1d', '#1d4e89'];
    c.fillStyle = '#cfc9bb'; c.fillRect(0, 0, w, h);
    for (let r = 0; r < 4; r++) { const y0 = r * 128 + 20; c.fillStyle = '#8f887a'; c.fillRect(0, y0 + 98, w, 10);
      for (let x = 4; x < w - 12;) { const bw = 12 + rnd() * 6, bh = 70 + rnd() * 18; c.fillStyle = pal[Math.floor(rnd() * pal.length)]; c.fillRect(x, y0 + 98 - bh, bw, bh); c.fillStyle = 'rgba(255,255,255,0.55)'; c.fillRect(x + 3, y0 + 98 - bh + 8, bw - 6, 6); c.fillRect(x + 3, y0 + 98 - bh + 22, bw - 8, 3); x += bw + 1; } } });
  for (const z of [-1.6, 0.4]) { const sh = zsGroup(); sh.position.set(-1.2, 0, z); g.add(sh);
    sh.add(zsBox(5.0, 1.9, 0.36, zsStd('#d9d4c8', 0.7), [0, 0.95, 0]));
    for (const side of [-1, 1]) sh.add(zsPlane(4.9, 1.7, spines(Math.round(z * 10) + side * 3 + 50), [0, 0.95, side * 0.185], [0, side < 0 ? Math.PI : 0, 0])); }
  const sec = (t: string, c: string) => zsPaintTex('sec' + t, 512, 128, (x, w, h) => { x.fillStyle = c; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = 'bold 80px Arial'; x.textAlign = 'center'; x.fillText(t, w / 2, 95); });
  g.add(zsPlane(1.6, 0.4, sec('HORROR', '#8a1010'), [-2.4, 2.5, -1.6]), zsPlane(1.6, 0.4, sec('COMEDY', '#1a6a2a'), [0.2, 2.5, 0.4]));
  // the TV wall: 2 x 3 sets on a stand, all tuned to the same thing
  const wall = zsGroup(); wall.position.set(3.3, 0, -2.6); wall.rotation.y = -0.5; g.add(wall); ZS.tvWall = wall;
  wall.add(zsBox(2.1, 0.8, 0.6, zsStd('#2a2a30', 0.6), [0, 0.4, 0]), zsBox(2.1, 0.05, 0.6, zsStd('#2a2a30', 0.6), [0, 1.33, 0]));
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) { const tv = zsCRT(0.62, '#2d2b28'); tv.position.set(-0.68 + c * 0.68, 0.82 + r * 0.53, 0); wall.add(tv); }
  ZS.tvLight = zsPoint('#b8c8ff', 0, 5, [3.0, 1.3, -1.8]); g.add(ZS.tvLight);
  // the counter, the register, the beige phone, posters of made-up movies
  const ct = zsGroup(); ct.position.set(-2.8, 0, 2.3); g.add(ct);
  ct.add(zsBox(2.6, 1.05, 0.7, zsStd('#3a2a48', 0.6), [0, 0.52, 0]), zsBox(2.7, 0.05, 0.8, zsStd('#d8d0c0', 0.4), [0, 1.07, 0]));
  ct.add(zsBox(0.4, 0.25, 0.35, zsStd('#cfcac0', 0.4), [-0.7, 1.22, 0]), zsLightPanel(0.25, 0.08, '#7dff9a', 0.6, [-0.7, 1.3, 0.18]));
  ZS.phone = zsGroup(zsBox(0.22, 0.08, 0.2, zsStd('#e2d8c0', 0.4), [0, 0.04, 0])); ZS.phone.position.set(0.6, 1.1, 0.05); ct.add(ZS.phone);
  ZS.handset = zsMesh(new THREE.CapsuleGeometry(0.03, 0.16, 6, 10), zsStd('#e2d8c0', 0.4), [0.6, 1.2, 0.05], [0, 0, Math.PI / 2]); ct.add(ZS.handset);
  const poster = (k: string, title: string, a: string, b: string) => zsPaintTex('mp' + k, 340, 512, (c, w, h) => { const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); c.fillStyle = gr; c.fillRect(0, 0, w, h); c.fillStyle = '#fff'; c.textAlign = 'center'; c.font = 'bold 44px Impact, Arial'; title.split('|').forEach((l, i) => c.fillText(l, w / 2, h * 0.72 + i * 48)); c.fillStyle = 'rgba(0,0,0,0.5)'; c.beginPath(); c.arc(w / 2, h * 0.35, 90, 0, 7); c.fill(); });
  g.add(zsPlane(0.65, 0.95, poster('a', 'RETURN OF THE|CANNIBAL ZOMBIE 6', '#5a0a0a', '#120202'), [-W / 2 + 0.01, 1.7, -1.5], [0, Math.PI / 2, 0]));
  g.add(zsPlane(0.65, 0.95, poster('b', 'MALL RATS|FROM SPACE', '#0a2a5a', '#02060f'), [-W / 2 + 0.01, 1.7, -0.6], [0, Math.PI / 2, 0]));
  g.add(zsPlane(0.65, 0.95, poster('c', 'MY UNCLE|THE VOLCANO', '#6a4a0a', '#1a1002'), [-W / 2 + 0.01, 1.7, 0.3], [0, Math.PI / 2, 0]));
  g.add(zsLightPanel(4.5, 2.2, '#0d1424', 1, [0, 1.4, D / 2 - 0.01], [0, Math.PI, 0]));   // the front window (night)
  return g;
};

// ---- E. the woods: the path under the high-voltage line
const zsSetWoods = () => {
  const g = zsGroup();
  g.add(zsTerrain(160, 90, (x, z) => 0.6 * p3Fbm3(x * 0.05, 3, z * 0.05) * (Math.abs(x - Math.sin(z * 0.12) * 2.5) > 2 ? 1 : 0.3), zsGrass()));
  const ground = g.children[0] as THREE.Mesh; ground.position.x = 0;
  for (let k = 0; k < 70; k++) { const rnd = p3Rnd(500 + k); let x = (rnd() - 0.5) * 70, z = (rnd() - 0.5) * 90; if (Math.abs(x - Math.sin(z * 0.12) * 2.5) < 3.5) x += x < 0 ? -4 : 4;
    const tr = zsPine(10 + rnd() * 9, k + 3); tr.position.set(x, 0, z); tr.rotation.y = rnd() * 6; g.add(tr); }
  for (let k = 0; k < 36; k++) { const rnd = p3Rnd(1700 + k), z = -30 + k * 1.7 + rnd(), side = k % 2 ? 1 : -1, x = Math.sin(z * 0.12) * 2.5 + side * (3.2 + rnd() * 4);
    const tr = zsPine(8 + rnd() * 8, 300 + k); tr.position.set(x, 0, z); tr.rotation.y = rnd() * 6; g.add(tr); }
  for (let k = 0; k < 30; k++) { const rnd = p3Rnd(900 + k), x = (rnd() - 0.5) * 40, z = (rnd() - 0.5) * 60; if (Math.abs(x) < 3) continue;
    g.add(zsMesh(new THREE.DodecahedronGeometry(0.3 + rnd() * 0.5, 1), zsConcrete('#5a5e58'), [x, 0.1, z], [rnd() * 3, rnd() * 3, 0], [1, 0.6, 1.2])); }
  // the pylons and the humming line above the path
  ZS.pylons = [-30, 0, 30].map((z) => { const p = zsPylon(22); p.position.set(9, 0, z); g.add(p); return p; });
  for (const dx of [-5.5, 5.5]) for (const y of [17.2, 20.5]) for (let k = 0; k < 2; k++) g.add(zsWire([9 + dx, y - 0.6, -30 + k * 30], [9 + dx, y - 0.6, k * 30], 2.2, 0.025));
  g.add(zsLog([-3.5, 0.25, 4], 0.4), zsLog([3.8, 0.25, -6], -0.6));
  const moonL = new THREE.DirectionalLight('#7f9ae0', 0.9); moonL.position.set(-30, 60, -20); moonL.castShadow = true; moonL.shadow.mapSize.set(2048, 2048); Object.assign(moonL.shadow.camera, { left: -25, right: 25, top: 25, bottom: -25, far: 150 });
  g.add(moonL, moonL.target, new THREE.HemisphereLight('#26324e', '#0a0b08', 0.35), zsStars(900, 300, 31));
  // Bolacha's flashlight: a spot light carried by him, plus a faint visible beam
  const fl = zsSpot('#fff1d0', 40, 18, [0, 1.2, 0], [0, 0.6, 6], 0.38); g.add(fl.g); ZS.flash = fl;
  const beam = zsMesh(new THREE.ConeGeometry(1.4, 7, 24, 1, true), zM_beam(), [0, 0, 0]); beam.castShadow = false; beam.receiveShadow = false; g.add(beam); ZS.beam = beam;
  return g;
};
const zM_beam = () => zsM('beam', () => new THREE.MeshBasicMaterial({ color: '#fff1d0', transparent: true, opacity: 0.05, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, toneMapped: false }));
const zsLog = (p: Vec3, ry: number) => { const bark = zsSurf('bark', '', 0.95, 0.02); return zsMesh(new THREE.CylinderGeometry(0.25, 0.3, 3.2, 12), bark, p, [0, ry, Math.PI / 2]); };

// ---- F. Holt Radio & TV, inside: walls of radios and TVs, the bench, the axe from 1979, the breaker panel
const zsSetShop = () => {
  const g = zsGroup(), W = 7, D = 6, Hh = 3.1;
  g.add(zsRoom(W, D, Hh, zsSurf('shopwall', `float n = p3F(p3World.xy * 1.5 + p3World.z); diffuseColor.rgb = vec3(0.36, 0.34, 0.27) * (0.8 + 0.3 * n);`, 0.9, 0), zsSurf('plank', `float b = fract(p3World.x * 4.0), g = p3F(vec2(p3World.z * 0.6, p3World.x * 40.0)); diffuseColor.rgb = mix(vec3(0.2, 0.13, 0.08), vec3(0.34, 0.23, 0.14), g) * (0.8 + 0.2 * step(0.04, b)); p3Ht = g;`, 0.7, 0.008), zsConcrete('#6a6658'), true));
  // shelves full of radios and TVs (left and back walls)
  const shelfM = zsStd('#4a3a2a', 0.7); ZS.shopRadios = [];
  for (const [x0, z0, ry, len] of [[-W / 2 + 0.3, 0, Math.PI / 2, 5.4], [0, -D / 2 + 0.3, 0, 6.4]] as [number, number, number, number][]) {
    const sh = zsGroup(); sh.position.set(x0, 0, z0); sh.rotation.y = ry; g.add(sh);
    for (let r = 0; r < 4; r++) { sh.add(zsBox(len, 0.04, 0.5, shelfM, [0, 0.5 + r * 0.6, 0]));
      for (let k = 0; k < Math.floor(len / 0.55); k++) { const rnd = p3Rnd(1000 + r * 37 + k * 7 + Math.round(x0 * 10)); const isTV = rnd() < 0.3;
        const it = isTV ? zsCRT(0.42 + rnd() * 0.12, ['#3a3631', '#6b5a44', '#2a2a2e'][k % 3]) : zsRadio(0.38 + rnd() * 0.12, 0.2 + rnd() * 0.12, 0.26, k + r);
        it.position.set(-len / 2 + 0.3 + k * 0.55, 0.52 + r * 0.6, 0); it.rotation.y = (rnd() - 0.5) * 0.2; sh.add(it); ZS.shopRadios.push(it); } }
    for (const x of [-len / 2, len / 2]) sh.add(zsBox(0.05, 2.5, 0.5, shelfM, [x, 1.25, 0]));
  }
  // the workbench (right wall): a lamp, an open chassis, the whiskey
  const bench = zsGroup(); bench.position.set(W / 2 - 0.5, 0, -0.6); bench.rotation.y = -Math.PI / 2; g.add(bench);
  bench.add(zsBox(2.4, 0.07, 0.8, zsWood(), [0, 0.9, 0]), zsBox(2.4, 0.85, 0.05, zsWood(), [0, 0.45, -0.38]));
  bench.add(zsRadio(0.5, 0.25, 0.35, 2)); bench.children[bench.children.length - 1].position.set(-0.4, 0.94, 0);
  const bl = zsGroup(); bl.position.set(0.7, 0.94, -0.2); bench.add(bl);
  bl.add(zsMesh(new THREE.CylinderGeometry(0.08, 0.1, 0.03, 14), zsMetal('#b9a26a', 0.3), [0, 0.015, 0]), p3Rod([0, 0, 0], [0, 0.32, 0], 0.01, zsMetal('#b9a26a', 0.3)));
  bl.add(zsMesh(new THREE.CylinderGeometry(0.06, 0.18, 0.12, 20, 1, true), zsStd('#1f5a3a', 0.4, 0.2), [0, 0.34, 0.05]));
  const benchLamp = zsSpot('#ffd59a', 18, 6, [W / 2 - 0.7, 1.35, -1.3], [W / 2 - 1.2, 0.9, -0.6], 1.1); g.add(benchLamp.g); ZS.benchLamp = benchLamp.l;
  ZS.bottle = zsMesh(new THREE.CylinderGeometry(0.04, 0.045, 0.28, 14), zsM('bottle', () => new THREE.MeshPhysicalMaterial({ color: '#7a4a1a', roughness: 0.1, transmission: 0, transparent: true, opacity: 0.85 })), [W / 2 - 0.6, 1.08, 0.4]); g.add(ZS.bottle);
  g.add(zsMesh(new THREE.CylinderGeometry(0.035, 0.03, 0.08, 12), zsM('glass', () => new THREE.MeshPhysicalMaterial({ color: '#d8c89a', roughness: 0.05, transparent: true, opacity: 0.45 })), [W / 2 - 0.65, 0.98, 0.15]));
  // the axe of 1979 on the wall above the bench, with a plaque
  ZS.axeWall = zsAxe(); ZS.axeWall.position.set(W / 2 - 0.05, 1.5, -0.6); ZS.axeWall.rotation.set(0, -Math.PI / 2, Math.PI / 2); g.add(ZS.axeWall);
  // the breaker panel (left of the door) and a big power strip on the floor with plugs
  g.add(zsBox(0.5, 0.7, 0.12, zsMetal('#8a8e86', 0.5), [-W / 2 + 0.07, 1.4, 2.0], [0, Math.PI / 2, 0]));
  ZS.strip = zsGroup(zsBox(0.5, 0.05, 0.08, zsStd('#e8e4d8', 0.4), [0, 0.025, 0]), zsLightPanel(0.03, 0.02, '#ff3a2a', 1.5, [0.22, 0.051, 0.02], [-Math.PI / 2, 0, 0])); ZS.strip.position.set(0.8, 0, -2.2); g.add(ZS.strip);
  ZS.plugs = [0, 1, 2, 3].map((k) => { const p = zsBox(0.04, 0.04, 0.05, zsStd('#1a1a1a', 0.4), [0.65 + k * 0.1, 0.065, -2.2]); g.add(p); return p; });
  // the front: the display window (glass that breaks) and the door with its bell; the neon of the street outside
  ZS.shopGlass = zsMesh(new THREE.PlaneGeometry(3.4, 2.2), zsM('shopglass', () => new THREE.MeshPhysicalMaterial({ color: '#9fb4c8', roughness: 0.05, transparent: true, opacity: 0.18, side: THREE.DoubleSide })), [-1.4, 1.5, D / 2]);
  ZS.shopGlass.castShadow = false; g.add(ZS.shopGlass);
  g.add(zsBox(3.6, 0.7, 0.2, zsWood(), [-1.4, 0.35, D / 2]), zsBox(7, 0.3, 0.2, zsWood(), [0, Hh - 0.15, D / 2]), zsBox(1.1, 2.4, 0.08, zsStd('#2a1d12', 0.6), [1.9, 1.2, D / 2]));
  g.add(zsLightPanel(9, 4, '#0b1220', 1, [0, 2, D / 2 + 3], [0, Math.PI, 0]));
  ZS.shardsGeo = new THREE.TetrahedronGeometry(0.08, 0);
  ZS.shards = p3Swarm(60, ZS.shardsGeo, zsM('shard', () => new THREE.MeshPhysicalMaterial({ color: '#c8dcec', roughness: 0.05, transparent: true, opacity: 0.6 })), false); g.add(ZS.shards);
  ZS.shopNeon = zsPoint('#ffb347', 5, 8, [0, 2.6, D / 2 + 1.0]); g.add(ZS.shopNeon, new THREE.HemisphereLight('#4a4436', '#1a1208', 0.35));
  ZS.shopCeil = zsPoint('#ffe2b0', 0, 8, [0, 2.9, 0], true); g.add(ZS.shopCeil);
  return g;
};
const zsSparks = () => { const s = p3Swarm(80, new THREE.SphereGeometry(0.012, 4, 3), zsGlow('#ffd27a', 3)); s.castShadow = false; return s; };

// ---------------------------------------------------------------- the whole world, built once
const ZS_FOG: Record<string, [string, number]> = { dish: ['#111a2e', 0.011], control: ['#0b0d0c', 0.02], basement: ['#120c08', 0.03], street: ['#121828', 0.016], rewind: ['#0c0a14', 0.02], woods: ['#1a2440', 0.028], shop: ['#0e0b08', 0.03] };
const ZS_ENV: Record<string, number> = { dish: 0.05, control: 0.18, basement: 0.08, street: 0.05, rewind: 0.14, woods: 0.03, shop: 0.08 };
const ZS_BG: Record<string, string> = { dish: '#0e1528', control: '#050605', basement: '#050403', street: '#0e1322', rewind: '#05040a', woods: '#1a2440', shop: '#060504' };
// a soft fill near the camera (the 'eye light' of film sets): faces never fall into pure black
const ZS_FILL: Record<string, [string, number]> = { dish: ['#8fa6ff', 2], control: ['#d8f0d0', 2.5], basement: ['#ffd9b0', 3.5], street: ['#9fb0e8', 3], rewind: ['#c8d0ff', 2.5], woods: ['#9fb4ff', 2.2], shop: ['#ffe0b8', 3] };
const zsBuild = (w: World) => {
  const st = p3Stage(w, { finish: { vignette: 0.55, sat: 0.92, curve: 0.3, grain: 0.009 } });
  st.scene.fog = new THREE.FogExp2('#000000', 0.02);
  ZS.st = st; ZS.sets = {} as Record<string, THREE.Group>;
  const make: Record<string, () => THREE.Group> = { dish: zsSetDish, control: zsSetControl, basement: zsSetBasement, street: zsSetStreet, rewind: zsSetRewind, woods: zsSetWoods, shop: zsSetShop };
  for (const k of Object.keys(make)) { const g = make[k](); g.position.set(...ZS_SET_AT[k]); g.visible = false; st.add(g); ZS.sets[k] = g; }
  ZS.cast = {} as Record<string, ZsPerson>;
  for (const n of Object.keys(ZS_CAST)) { const P = zsPerson(ZS_CAST[n]); P.root.visible = false; st.add(P.root); ZS.cast[n] = P; }
  ZS.chiado = zsChiado(); ZS.chiado.root.visible = false; st.add(ZS.chiado.root);
  ZS.sparks = zsSparks(); st.add(ZS.sparks);
  ZS.fill = new THREE.PointLight('#ffffff', 0, 9, 2); st.add(ZS.fill);
  // props people hold
  ZS.props = {
    walkie: zsGroup(zsBox(0.06, 0.16, 0.035, zsStd('#1e2a1e', 0.5), [0, -0.08, 0.02]), p3Rod([0.02, 0, 0.02], [0.02, 0.12, 0.02], 0.004, zsMetal('#222'))),
    flashlight: zsGroup(zsMesh(new THREE.CylinderGeometry(0.022, 0.028, 0.22, 12), zsMetal('#2a2a2a', 0.4), [0, -0.08, 0.04], [Math.PI / 2, 0, 0]), zsMesh(new THREE.CircleGeometry(0.024, 12), zsGlow('#fff4d8', 2), [0, -0.08, 0.155])),
    axe: zsAxe(), skate: zsGroup(zsBox(0.2, 0.02, 0.8, zsSurf('skate', `float n = p3F(p3Pos.xz * 20.0); diffuseColor.rgb = mix(vec3(0.85, 0.2, 0.25), vec3(0.15, 0.6, 0.85), step(0.5, fract(p3Pos.z * 4.0 + n)));`, 0.6, 0), [0, 0, 0]),
      ...[[0.07, 0.3], [-0.07, 0.3], [0.07, -0.3], [-0.07, -0.3]].map(([x, z]) => zsMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 10), zsStd('#eae6d6', 0.4), [x, -0.04, z], [0, 0, Math.PI / 2]))),
    cassette: zsGroup(zsBox(0.2, 0.05, 0.12, zsStd('#2b2b2f', 0.4, 0.2), [0, 0, 0])), phone: zsGroup(zsMesh(new THREE.CapsuleGeometry(0.028, 0.15, 6, 10), zsStd('#e2d8c0', 0.4), [0, -0.05, 0.04])),
    glassDrink: zsGroup(zsMesh(new THREE.CylinderGeometry(0.035, 0.03, 0.08, 12), zsM('glass', () => new THREE.MeshPhysicalMaterial({ color: '#d8c89a', roughness: 0.05, transparent: true, opacity: 0.45 })), [0, -0.06, 0.04])),
  };
  for (const pr of Object.values(ZS.props) as THREE.Object3D[]) { pr.visible = false; st.add(pr); }
  // chairs that appear under whoever sits (two kinds: an office chair and a wooden one)
  ZS.chairs = [0, 1, 2].map((k) => { const ch = zsGroup(), m = k === 2 ? zsWood() : zsStd('#2f3a3a', 0.6);
    ch.add(zsBox(0.48, 0.07, 0.46, m, [0, 0.46, 0]), zsBox(0.46, 0.55, 0.05, m, [0, 0.78, -0.22]));
    if (k === 2) for (const [x, z] of [[0.2, 0.19], [-0.2, 0.19], [0.2, -0.19], [-0.2, -0.19]]) ch.add(zsBox(0.04, 0.46, 0.04, m, [x, 0.23, z]));
    else { ch.add(zsMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8), zsMetal(), [0, 0.23, 0])); for (let a = 0; a < 5; a++) ch.add(p3Rod([0, 0.04, 0], [Math.cos(a * 1.257) * 0.28, 0.03, Math.sin(a * 1.257) * 0.28], 0.015, zsMetal())); }
    ch.visible = false; st.add(ch); return ch; });
  return st;
};
// show one set (its lights, fog and background); hide the rest and every actor (shots turn on who they use)
const zsUse = (name: string) => {
  for (const k of Object.keys(ZS.sets)) ZS.sets[k].visible = k === name;
  for (const n of Object.keys(ZS.cast)) ZS.cast[n].root.visible = false;
  ZS.chiado.root.visible = false; ZS.sparks.visible = false; ZS.chairs.forEach((c: THREE.Object3D) => (c.visible = false));
  for (const pr of Object.values(ZS.props) as THREE.Object3D[]) { pr.visible = false; pr.parent !== ZS.st.scene && ZS.st.scene.add(pr); }
  const [c, d] = ZS_FOG[name]; (ZS.st.scene.fog as THREE.FogExp2).color.set(c); (ZS.st.scene.fog as THREE.FogExp2).density = d; ZS.st.scene.background = zsC(ZS_BG[name]); ZS.st.scene.environmentIntensity = ZS_ENV[name]; ZS.fill.color.set(ZS_FILL[name][0]); ZS.fill.intensity = ZS_FILL[name][1];
  ZS.set = name; ZS.at = ZS_SET_AT[name];
};
// set-local position -> world
const zsAt = (p: Vec3): Vec3 => [p[0] + ZS.at[0], p[1] + ZS.at[1], p[2] + ZS.at[2]];
// put a person in the active set: position (set-local), facing (radians, 0 = +z), a pose, an expression; returns it
const zsPut = (who: string, p: Vec3, face: number, pose: ZsPose, t: number, expr?: string, look: Partial<ZsFace> = {}, speaks?: string) => {
  const P: ZsPerson = who === 'chiado' ? ZS.chiado : ZS.cast[who];
  P.root.visible = true; const q = zsAt(p); P.root.position.set(q[0] + (pose.x || 0), q[1], q[2] + (pose.z || 0)); P.root.rotation.set(0, face, 0);
  zsApply(P, who === 'chiado' ? pose : zsAlive(pose, t, who.length * 1.37));
  if (who !== 'chiado') zsFace(P, t, expr || pose.face, who.length * 0.77, look, speaks);
  P.root.updateMatrixWorld(true);   // so cameras and props that read joint positions this frame see the new pose
  return P;
};
// a chair under a seated person (set-local position of the person, their facing)
const zsSeat = (k: number, p: Vec3, face: number) => { const c: THREE.Object3D = ZS.chairs[k]; c.visible = true; const q = zsAt(p); c.position.set(q[0] - Math.sin(face) * 0.05, q[1], q[2] - Math.cos(face) * 0.05); c.rotation.set(0, face, 0); return c; };
// hold a prop in a hand (the prop follows the wrist), with a local offset and rotation
const zsHold = (prop: string, P: ZsPerson, hand: 'L' | 'R', off: Vec3 = [0, -0.06, 0.03], rot: Vec3 = [0, 0, 0]) => {
  const pr: THREE.Object3D = ZS.props[prop]; pr.visible = true; const wr = hand === 'L' ? P.handL : P.handR;
  if (pr.parent !== wr) wr.add(pr); pr.position.set(...off); pr.rotation.set(...rot); return pr;
};
// the camera, in set-local coordinates
const zsLook = (pos: Vec3, target: Vec3, fov = 35, roll = 0) => {
  ZS.st.look(zsAt(pos), zsAt(target), fov, roll);
  // the fill sits a little above and to the side of the camera, a third of the way to the subject
  const a = zsAt(pos), b = zsAt(target); ZS.fill.position.set(a[0] + (b[0] - a[0]) * 0.35 + 0.4, a[1] + (b[1] - a[1]) * 0.35 + 0.5, a[2] + (b[2] - a[2]) * 0.35);
};

// ---------------------------------------------------------------- test of the world (world.json)
const ZS_TEST = [
  { id: 'test-cast', fn(t: number) { zsUse('street'); const names = ['theo', 'dani', 'bolacha', 'jess', 'kyle', 'helen', 'ray_old', 'ray_young', 'vance', 'coyle'];
    names.forEach((n, i) => zsPut(n, [(i - 4.5) * 0.85, 0.15, -4.5], 0, ZS_POSES[['stand', 'relaxed', 'armsCrossed', 'handsHips', 'relaxed', 'armsCrossed', 'stand', 'relaxed', 'handsHips', 'stand'][i]], t));
    zsLook([0, 1.3, 2.6], [0, 1.0, -4.5], 42); } },
  { id: 'test-faces', fn(t: number, u: number) { zsUse('basement'); const ex = ZS_TEST_FACES[Math.floor(u * 6.99) % 7];
    zsPut('theo', [-0.4, 0, 0.2], 0.2, ZS_POSES.stand, t, ex); zsPut('bolacha', [0.4, 0, 0.3], -0.3, ZS_POSES.stand, t, ex); zsLook([0, 1.45, 1.6], [0, 1.35, 0.2], 32); } },
  { id: 'test-dish', fn(t: number) { zsUse('dish'); ZS.dishTilt.rotation.x = -0.75; zsLook([30, 6, 30], [0, 12, -30], 45); } },
  { id: 'test-control', fn(t: number) { zsUse('control'); ZS_SCREEN.uWave.value = 0.6; zsPut('vance', [-0.3, 0, 0.5], Math.PI, ZS_POSES.micDesk, t, 'awe'); zsSeat(0, [-0.3, 0, 0.5], Math.PI); zsPut('ray_young', [1.2, 0, 1.0], Math.PI + 0.4, ZS_POSES.armsCrossed, t, 'skeptic');
    zsLook([0.5, 1.6, 2.7], [0, 1.2, -1.2], 40); } },
  { id: 'test-basement', fn(t: number) { zsUse('basement'); zsPut('theo', [-0.4, 0, -1.4], Math.PI, ZS_POSES.micDesk, t, 'grin'); zsSeat(0, [-0.4, 0, -1.4], Math.PI); zsPut('dani', [0.9, 0, -0.6], Math.PI + 0.6, ZS_POSES.handsHips, t, 'smirk'); zsPut('bolacha', [1.6, 0, 0.9], -Math.PI / 2 - 0.3, ZS_POSES.sit, t, 'smile');
    zsLook([-1.6, 1.5, 2.0], [0.2, 0.9, -1.0], 44); } },
  { id: 'test-street', fn(t: number) { zsUse('street'); zsPut('dani', [-4, 0, 3], Math.PI / 2, zsWalk(t * 7, 1, 0.3), t, 'smile'); zsPut('helen', [-11, 0.15, -6], 0.3, ZS_POSES.handsHips, t, 'angry');
    zsLook([-2, 2.2, 12], [-4, 2.0, -4], 46); } },
  { id: 'test-rewind', fn(t: number) { zsUse('rewind'); ZS_SCREEN.uStatic.value = 1; ZS_SCREEN.uShape.value = 0.8; ZS.tvLight.intensity = 6; zsPut('kyle', [1.6, 0, -0.9], Math.PI * 0.8, ZS_POSES.scared, t); zsPut('jess', [-0.8, 0, 1.6], 2.4, ZS_POSES.phone, t, 'worried');
    zsLook([-1.6, 1.6, 2.4], [2.2, 1.2, -1.6], 46); } },
  { id: 'test-woods', fn(t: number) { zsUse('woods'); const B = zsPut('bolacha', [0, 0, 0], 0, ZS_POSES.flashlight, t, 'fear'); zsHold('flashlight', B, 'R', [0, -0.08, 0.04], [0, 0, 0]);
    ZS.flash.g.position.set(0, 0, 0); ZS.flash.l.position.set(-0.2, 1.25, 0.3); ZS.flash.l.target.position.set(-0.2, 0.5, 7); ZS.beam.position.set(-0.2 + 0, 1.2 - 0, 3.8); ZS.beam.rotation.set(-Math.PI / 2 - 0.1, 0, 0);
    const C = zsPut('chiado', [1.5, 0, 6], Math.PI, ZS_CPOSES.stalk, t); ZS.chiado.fx(t, 0.6); zsLook([2.5, 1.6, -3.5], [0.5, 1.4, 3], 44); } },
  { id: 'test-shop', fn(t: number) { zsUse('shop'); ZS.shopCeil.intensity = 6; zsPut('ray_old', [1.6, 0, 0.6], -Math.PI / 2, ZS_POSES.axeReady, t, 'angry'); zsHold('axe', ZS.cast.ray_old, 'R', [0, -0.07, 0.02], [1.5, 0, 0]);
    zsPut('chiado', [-0.8, 0, 1.2], Math.PI / 2, ZS_CPOSES.reach, t); ZS.chiado.fx(t, 0.9); zsLook([0.3, 1.6, -2.4], [0.3, 1.3, 1.0], 46); } },
  { id: 'thumb-a', fn(t: number) { zsUse('woods'); ZS.st.scene.fog.density = 0.02;
    const B = zsPut('bolacha', [0, 0, 0], 0.25, { ...ZS_POSES.flashlight, j: { ...ZS_POSES.flashlight.j, head: [-0.05, 0.5, 0], sL: [-1.3, 0.3, 0.3], eL: [-1.9] } }, t, 'terror', { lookX: 0.8, lid: -0.3 });
    zsHold('flashlight', B, 'R'); zsHold('walkie', B, 'L', [0, -0.08, 0.03]);
    ZS.flash.l.intensity = 30; ZS.flash.l.position.set(0.2, 1.2, 0.5); ZS.flash.l.target.position.set(0.5, 1.0, 6);
    const C = zsPut('chiado', [-0.9, 0, -1.3], 0.5, { ...ZS_CPOSES.reach, j: { ...ZS_CPOSES.reach.j, head: [-0.2, 0.2, 0.15], sR: [-1.2, 0.3, -0.6], eR: [-0.6] } }, t); ZS.chiado.fx(t, 1.3, 0.5);
    ZS.thumbLight = ZS.thumbLight || new THREE.PointLight(ZS_GREEN, 0, 6, 2); ZS.st.add(ZS.thumbLight); const q = zsAt([-0.6, 2.2, -0.6]); ZS.thumbLight.position.set(...q); ZS.thumbLight.intensity = 6;
    zsLook([1.3, 1.45, 2.0], [-0.2, 1.65, -0.4], 42); } },
  { id: 'thumb-b', fn(t: number) { zsUse('shop'); ZS_DIAL.value = 1; ZS.shopCeil.intensity = 2; ZS.shopGlass.visible = false;
    zsPut('chiado', [-0.6, 0, 1.0], Math.PI / 2 + 0.3, ZS_CPOSES.shriek, t); ZS.chiado.fx(t, 1.4, 1);
    const R = zsPut('ray_old', [1.0, 0, 0.2], -1.9, ZS_POSES.axeRaise, t, 'rage'); zsHold('axe', R, 'R', [0, -0.07, 0.02], [1.5, 0, 0]);
    zsLook([0.9, 0.9, -2.4], [-0.1, 1.9, 0.8], 46); } },
  { id: 'test-chiado', fn(t: number, u: number) { zsUse('control'); const pose = [ZS_CPOSES.hunch, ZS_CPOSES.shriek, ZS_CPOSES.swipe, ZS_CPOSES.convulse][Math.floor(u * 3.99)];
    zsPut('chiado', [0, 0, 0.5], 0, pose, t); ZS.chiado.fx(t, 1); zsLook([0, 1.7, 4.2], [0, 1.6, 0.5], 45); } },
];
const ZS_TEST_FACES = ['neutral', 'smile', 'fear', 'terror', 'angry', 'laugh', 'skeptic'];
p3Shots(ZS_TEST, (w) => zsBuild(w), (t, u, shot, s) => { ZS_SCREEN.uStatic.value = 0; ZS_SCREEN.uShape.value = 0; ZS_SCREEN.uWave.value = 0; ZS_DIAL.value = 0; shot.fn(t, u); });
