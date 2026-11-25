// IMAGINA SÓ: a 2.5D look test. A sunny Brazilian street (colourful houses, a sidewalk, trees), Tuco and Biel.
const IT: { st?: ReturnType<typeof CT.stage> } = {};
const IT_CAST: Record<string, import('../../styles/2.5d_cartoon/src/toon').RigOutfit> = {
  tuco: { jacket: '#2fa04a', zip: true, shirt: '#f6c744', pants: '#2a3a5a', boots: '#e0302a', hat: 'hair', hair: '#1c1410', skin: CT.SKINS[3], build: 'kid' },
  biel: { jacket: '#f29a4a', pants: '#3a3a4a', boots: '#f0ede4', hat: 'cap', cap: '#d0342c', skin: CT.SKINS[0], build: 'kid' },
};
const itInit = (w: World) => {
  const st = IT.st = CT.stage(w, { light: 'day' });
  CT.ground(st, { kind: 'grass', size: 300, tile: 8 });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(7, 140).rotateX(-Math.PI / 2), CT.mat('it-road', { map: CT.paint.rep(CT.paint.cobbleHD(), 2, 40) }));
  road.position.y = 0.01; road.receiveShadow = true; st.add(road);
  const b = CT.batch();
  [-30, -20, -10, 0, 10].forEach((z, i) => {
    CT.house(b, -9.5, z, { yaw: Math.PI / 2, w: 8, d: 7, h: [6.4, 7.6, 6.8][i % 3], style: i });
    CT.house(b, 9, z + 4, { yaw: -Math.PI / 2, w: 8, d: 7, h: [7.2, 6.4, 8][i % 3], style: i + 2 });
  });
  for (let i = 0; i < 6; i++) CT.tree(b, (i % 2 ? 4.6 : -4.8), -24 + i * 7, { kind: i % 3 === 2 ? 'cone' : 'round', h: 5 + (i % 3), seed: i + 3 });
  CT.build(b, st);
  return st;
};
const itRig = (st: ReturnType<typeof CT.stage>, id: number, who: string, at: [number, number, number], P: import('../../styles/2.5d_cartoon/src/toon').Rig, k = 0.72) =>
  st.person({ id, who: { key: `it|${who}|${JSON.stringify(P)}`, draw: (p, light) => CT.bodyRig(p, IT_CAST[who], { ...P, light, seed: id }) }, at, scale: k / CT.RIG_SCALE });
CT.shots([
  { id: 'test-wide', light: 'day' as const },
  { id: 'test-close', light: 'day' as const },
  { id: 'test-golden', light: 'golden' as const },
], itInit, (t, u, shot) => {
  const st = IT.st!;
  st.light(shot.light, { view: [0.35, -1] });
  if (shot.id === 'test-wide') { st.look([2.0, 1.3, 0.5 - u * 0.3], [0.6, 0.9, -4.6], 40, 2); st.dof(14, [0.6, 1, -4.6]); }
  else if (shot.id === 'test-close') { st.look([0.9, 1.25, -1.2 - u * 0.3], [0, 1.15, -4], 30, -3); st.dof(10, [0, 1.3, -4]); }
  else { st.look([-1.2, 1.1, -0.6], [0.6, 0.95, -4.6], 34, 4); st.dof(12, [0, 1.2, -4]); }
  itRig(st, 1, 'tuco', [0, 0, -4], { expr: shot.id === 'test-close' ? 'shock' : 'grin', facing: 0, armL: [-8, -4], armR: [30, 170], legL: [-5, 0], legR: [5, 0], prop: { kind: 'phone', hand: 'R', ang: 170 } });
  itRig(st, 2, 'biel', [1.6, 0, -5.5], { expr: 'laugh', facing: -1, armL: [-8, -4], armR: [8, 4], legL: [-5, 0], legR: [5, 0] });
});
