// Thumbnail layers for Motel Lua Vermelha (not a video): close-ups on a green screen, keyed out by
// videos/motel-lua-vermelha/thumbnail/make-thumbs-ctr.py, and backgrounds. Render them with A.frames at 0.5, 1.5 ... 7.5 s.
const MTT: { green?: THREE.Mesh } = {};
const mtGreen = (st: ReturnType<typeof CT.stage>, at: mt_V3, on: boolean) => {
  if (!MTT.green) { MTT.green = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 1, 0), fog: false })); st.add(MTT.green); }
  MTT.green.visible = on; MTT.green.position.set(...at);
};
const mtL = (st: ReturnType<typeof CT.stage>, L: 'lamp' | 'blood' | 'night', pw: Record<string, number> = {}) => {
  st.light(L, { view: [0, -1] }); for (const g of ['rooms', 'office', 'sign', 'car', 'r11']) mt_power(g, pw[g] ?? 1);
};
const MTX = 500;   // an empty patch of desert for the green-screen shots
CT.shots([{ id: 'g1' }, { id: 'g2' }, { id: 'g3' }, { id: 'g4' }, { id: 'g5' }, { id: 'b1' }, { id: 'b2' }, { id: 'b3' }], mt_init, (t, u, shot) => {
  const st = MT_.st!, id = shot.id;
  if (id[0] === 'g') {
    mtL(st, 'lamp'); mtGreen(st, [MTX, 5, -3], true);
    if (id === 'g1') { st.look([MTX, 1.42, 1.55], [MTX, 1.38, 0], 34, 0); mt_rig(st, 1, 'mari', [MTX, 0, 0], { ...MT_P.scared, facing: 0, expr: 'shock', head: -6, blood: 0.5 }, 0); }
    if (id === 'g2') { st.look([MTX, 1.42, 1.55], [MTX, 1.38, 0], 34, 0); mt_rig(st, 2, 'kev', [MTX, 0, 0], { ...MT_P.scared, facing: 0, expr: 'shock', head: 6 }, 0); }
    if (id === 'g3') { st.look([MTX, 1.55, 3.6], [MTX, 1.5, 0], 40, 0); mt_rig(st, 24, 'shKev', [MTX, 0, 0], { ...MT_P.stand, armL: [-120, -150], armR: [120, 150], facing: 0, maw: 1, head: 0 }, 0, 1.25); }
    if (id === 'g4') { st.look([MTX, 1.55, 3.6], [MTX, 1.5, 0], 40, 0); mt_rig(st, 25, 'shKev', [MTX, 0, 0], { ...MT_P.stand, armL: [-110, -140], armR: [110, 140], facing: 0, maw: 0, head: 0 }, 0, 1.25); }
    if (id === 'g5') { st.look([MTX, 1.42, 1.55], [MTX, 1.38, 0], 34, 0); mt_rig(st, 3, 'hank', [MTX, 0, 0], { ...MT_P.scared, facing: 0, expr: 'shock', bruise: 1 }, 0); }
    return;
  }
  mtGreen(st, [MTX, 5, -3], false);
  if (id === 'b1') { mtL(st, 'blood', { rooms: 0.1 }); st.look([30.5, 4.5, 8], [34, 10.5, 18], 50, 0); }
  if (id === 'b2') { mtL(st, 'lamp', { r11: 0.6 }); st.look([300, 1.5, 2.6], [300, 1.4, -3], 46, 0); for (let i = 0; i < 11; i++) mt_rig(st, 60 + i, i % 3 ? 'shadow' : 'shadow2', [295.6 + i * 0.84, 0, -2.95], { ...MT_P.stand, armL: [-10 - (i % 4) * 30, -20], armR: [10 + (i % 3) * 25, 30], facing: 0, maw: i === 5 ? 1 : 0 }, 0, 0.92); }
  if (id === 'b3') { mtL(st, 'blood', { rooms: 1 }); st.look([2, 1.2, 22], [4, 5, -6], 50, 0);
    st.card({ key: 'mt-moon', cw: 256, ch: 256, at: [6, 13, -30], w: 9, h: 9, soft: true, draw: (p) => { const g = p.g, gr = g.createRadialGradient(128, 128, 50, 128, 128, 128); gr.addColorStop(0, 'rgba(255,60,30,0.6)'); gr.addColorStop(1, 'rgba(255,60,30,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); g.fillStyle = '#d8331f'; g.beginPath(); g.arc(128, 128, 60, 0, Math.PI * 2); g.fill(); } }); }
}, );
