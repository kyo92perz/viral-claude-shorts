// <lines>
const CU_LINES = [{"who": "cu_eu", "t0": 0.3, "t1": 5.325}, {"who": "cu_eu", "t0": 5.925, "t1": 12.26}, {"who": "cu_bento", "t0": 12.76, "t1": 17.479}, {"who": "cu_eu", "t0": 18.079, "t1": 25.517}, {"who": "cu_eu", "t0": 26.017, "t1": 30.899}, {"who": "cu_bento", "t0": 31.399, "t1": 34.013}, {"who": "cu_eu", "t0": 34.513, "t1": 40.408}, {"who": "cu_eu", "t0": 41.108, "t1": 45.553}, {"who": "cu_eu", "t0": 46.353, "t1": 53.531}, {"who": "cu_bento", "t0": 54.031, "t1": 56.882}, {"who": "cu_eu", "t0": 57.482, "t1": 62.814}, {"who": "cu_eu", "t0": 63.514, "t1": 70.647}, {"who": "cu_eu", "t0": 71.247, "t1": 77.786}, {"who": "cu_eu", "t0": 78.286, "t1": 82.632}, {"who": "cu_eu", "t0": 83.332, "t1": 91.388}, {"who": "cu_eu", "t0": 92.088, "t1": 94.21}];
// </lines>
// =====================================================================
//  O CURUPIRA: the shots (detailed Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Every jungle shot is layered (#lay-bg / #lay-mid / ground / people / #lay-fg) so walks get parallax; the camera
//  breathes (bzHandheld); particles (fireflies before dawn, leaves and dust by day) keep the frame alive.
//  Framing: captions at y 1190–1400. Heads above the feet: Bento 507*s, Caio 416*s, the Curupira 333*s.
// =====================================================================
BZ_TALK.lines = CU_LINES;
const P_DAWN = CU_PAL.dawn, P_DAY = CU_PAL.day, P_DUSK = CU_PAL.dusk;
// a layered jungle shot: background (+ rays by day), middle trees, ground, then the people, then the foreground leaves
function cuScene(P: CuPal, seed: number, people: string, o: { rays?: boolean; parts?: string; leaves?: string; dark?: number } = {}) {
  return `<g id="lay-bg">${cuBg(P, seed)}${o.rays ? bzRays('ry', 760, -120, 6, 1900, '#fff8c8', 0.13) : ''}</g><g id="lay-mid">${cuMid(P, seed)}</g>${cuGround(P)}${people}
    ${o.parts || ''}<g id="lay-fg">${bzFrameLeaves(o.leaves || 'both', '#0e1a14', seed)}</g>${o.dark ? `<rect width="1080" height="1920" fill="#05080c" opacity="${o.dark}"/>` : ''}`;
}
// the Curupira's feet close (side view): legs from the top, feet turned BACKWARDS (toes to the left), he walks to the right
const cuFeet = () => `<rect width="1080" height="1920" fill="${P_DAY.mud}"/><rect y="1300" width="1080" height="640" fill="#4a3424"/>
  ${[300, 700].map((x) => `<rect x="${x - 50}" y="-20" width="100" height="1200" fill="#9a5a32" ${bzO('stroke-width="9"')}/><path d="M${x + 50} 1180 L ${x - 230} 1210 Q ${x - 280} 1290 ${x - 200} 1320 L ${x + 60} 1320 Q ${x + 90} 1250 ${x + 50} 1180 Z" fill="#9a5a32" ${bzO('stroke-width="9"')}/>
    ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${x - 230 + i * 6}" cy="${1220 + i * 22}" rx="26" ry="14" fill="#9a5a32" ${bzO('stroke-width="6"')}/>`).join('')}<ellipse cx="${x + 30}" cy="1300" rx="34" ry="22" fill="#000" opacity="0.15"/>`).join('')}`;
// a thick vine (cipó) across the frame with a knot (#knot) that appears, and two hands
const cuKnot = () => `<rect width="1080" height="1920" fill="#2f5a30"/>${[...Array(12)].map((_, i) => `<ellipse cx="${(i * 191) % 1080}" cy="${(i * 331) % 1920}" rx="90" ry="40" fill="#3f7a3a" opacity="0.6"/>`).join('')}
  <path d="M-40 980 Q 300 900 540 960 T 1120 900" stroke="${BZ.ink}" stroke-width="56" fill="none"/><path d="M-40 980 Q 300 900 540 960 T 1120 900" stroke="#6a8a2a" stroke-width="40" fill="none"/>
  <g id="knot" opacity="0"><ellipse cx="540" cy="960" rx="90" ry="70" fill="none" stroke="${BZ.ink}" stroke-width="56"/><ellipse cx="540" cy="960" rx="90" ry="70" fill="none" stroke="#7a9a3a" stroke-width="40"/></g>
  <g id="hl"><circle cx="420" cy="1040" r="70" fill="#c98757" ${bzO('stroke-width="9"')}/></g><g id="hr"><circle cx="660" cy="1040" r="70" fill="#c98757" ${bzO('stroke-width="9"')}/></g>`;
const cuSay = (id: string, txt: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, txt, x, y, rot, bg, fg, size);

defineVisuals({
  // ---------------- the hook: backwards prints and green eyes in the ferns, frame 1
  hook: { bg: '#6a4a30', html: () => bzShot(`${cuPrints(P_DAY)}${bzGlow('eg', 820, 420, 200, '#9aff6a', 0.25)}<g id="peek"><circle cx="790" cy="420" r="16" fill="#c8ff9a"/><circle cx="850" cy="420" r="16" fill="#c8ff9a"/></g>${cuFern(800, 520, 1.6, '#1f4a30')}${bzParticles('dt', 'dust', 26, [0, 0, 1080, 1700], 3)}`,
      `${cuSay('hk', 'NÃO SIGA AS PEGADAS', 540, 1540, -4, BZ.red, '#fff', 92)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { for (let i = 0; i < 8; i++) tl.set($('#fp' + i), { opacity: 1 }, s.t0); bzHook(tl, $('#hk'), s.t0); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1);
      tl.fromTo($('#peek'), { opacity: 1 }, { opacity: 0.1, duration: 0.08, yoyo: true, repeat: 1 }, s.t0 + 1.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); bzHandheld(tl, $('#cam'), s.t0, s.t1, 4); } },
  eyes: { bg: '#1e3424', html: () => bzShot(`${cuBg(P_DAWN, 5)}${cuKid(540, 2050, 3.2)}${cuFern(200, 1900, 2.4, '#1f4a30')}${cuFern(900, 1950, 2.6, '#24483a')}`, `${bzGlow('g2', 540, 1000, 500, '#9aff6a', 0.15)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#curupira'), s.t0, 'glow', 'grin'); tl.fromTo($('#curupira .hd'), { rotation: -8, transformOrigin: '50% 90%' }, { rotation: 6, duration: 0.6 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); } },
  title: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 2, cuRider(620, 1560, 0.75), { rays: true, parts: bzParticles('lv', 'leaves', 14, [0, 0, 1080, 800], 4) }), `${cuSay('tt', 'O CURUPIRA', 540, 380, -4, BZ.yellow, BZ.ink, 130)}${bzFlash('fl', '#ffd27a')}`),
    anim(tl, s, K, $) { bzFace(tl, $('#curupira'), s.t0, 'glow', 'grin'); bzPose(tl, $('#curupira'), s.t0, { lL: 60, lR: -60, aR: -150 }, 0.01); cuTrot(tl, $('#pig'), s.t0, s.t1); tl.fromTo($('#rider'), { x: -260 }, { x: 200, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      bzParticlesGo(tl, $('#lv'), 'leaves', s.t0, s.t1); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.4); bzParallax(tl, $, s.t0, s.t1, -120); } },
  // ---------------- tio Bento
  bento: { bg: '#14283a', html: () => bzShot(cuScene(P_DAWN, 1, `${cuBento(560, 1560, 1.25)}${cuGun('gun', 700, 1420, 1.0, -78)}`, { parts: bzParticles('ff', 'fireflies', 18, [0, 600, 1080, 1400], 2) }), cuSay('nm', 'TIO BENTO', 540, 360, -4, BZ.yellow, BZ.ink, 110)),
    anim(tl, s, K, $) { bzFace(tl, $('#bento'), s.t0, 'half', 'smile'); bzIdle(tl, $('#bento'), s.t0, s.t1); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), K('n')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 560, 950); } },
  brave: { bg: '#14283a', html: () => bzShot(cuScene(P_DAWN, 1, `${cuCaio(300, 1520, 1.15)}${cuBento(720, 1520, 1.2, true)}`, { parts: bzParticles('ff', 'fireflies', 18, [0, 600, 1080, 1400], 3) }), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#bento'), s.t0, 'closed', 'grin'); bzShake(tl, $('#bento'), s.t0, s.t0 + 1.0, 3); bzFace(tl, $('#caio'), s.t0, 'half', 'flat'); bzIdle(tl, $('#caio'), s.t0, s.t1, 1); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); bzHandheld(tl, $('#cam'), s.t0, s.t1); } },
  lanterna: { bg: '#14283a', html: () => bzShot(cuScene(P_DAWN, 3, `${cuBento(540, 1900, 2.1)}`), cuLantern('lt', 860, 1300, 300)),
    anim(tl, s, K, $) { bzFace(tl, $('#bento'), s.t0, 'dot', 'grin'); bzTalk(tl, $('#bento'), 'cu_bento', s.t0, s.t1, 'grin', 'open'); bzPose(tl, $('#bento'), s.t0 + 0.3, { aR: -70 }, 0.3); bzBlink(tl, $('#bento'), s.t0, s.t1); bzHandheld(tl, $('#cam'), s.t0, s.t1, 3); } },
  enter: { bg: '#14283a', html: () => bzShot(cuScene(P_DAWN, 4, `${cuCaio(360, 1540, 1.1)}${cuLantern('lt', 450, 1330, 280)}${cuBento(680, 1540, 1.15)}`, { parts: bzParticles('ff', 'fireflies', 24, [0, 500, 1080, 1500], 5) }), bzVignette(0.6)),
    anim(tl, s, K, $) { bzWalk(tl, $('#caio'), s.t0, s.t1, 0, 0); bzWalk(tl, $('#bento'), s.t0, s.t1, 0, 0); bzFace(tl, $('#caio'), s.t0, 'wide', 'flat'); bzParallax(tl, $, s.t0, s.t1, -420); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); } },
  mark: { bg: '#5a9a8a', html: () => bzShot(cuCutTree(P_DAWN), `<g id="knife"><path d="M900 760 L 640 720" stroke="${BZ.ink}" stroke-width="26" stroke-linecap="round"/><path d="M900 760 L 640 720" stroke="#c9ced8" stroke-width="14" stroke-linecap="round"/><rect x="890" y="730" width="110" height="56" rx="14" fill="#6a3a1a" ${bzO()}/></g>${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#cuts path'), { opacity: 0 }, s.t0); ['c1', 'c2', 'c3'].forEach((k, i) => { tl.set($(`#cuts path:nth-child(${i + 1})`), { opacity: 1 }, K(k)); tl.fromTo($('#knife'), { x: 120, y: i * 90 - 40 }, { x: -60, y: i * 90, duration: 0.16, ease: 'power3.in' }, K(k) - 0.16); });
      tl.to($('#knife'), { x: 300, opacity: 0, duration: 0.3 }, K('c3') + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 760); } },
  // ---------------- the prints
  hours: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 5, `${cuCaio(360, 1540, 1.1)}${cuBento(680, 1540, 1.15)}`, { rays: true, parts: `${bzParticles('lv', 'leaves', 12, [0, 0, 1080, 800], 6)}${bzParticles('dt', 'dust', 24, [0, 300, 1080, 1500], 7)}` }), cuSay('hr', '2 HORAS DEPOIS', 540, 380, -3, '#fff', BZ.ink, 90)),
    anim(tl, s, K, $) { bzWalk(tl, $('#caio'), s.t0, s.t1, 0, 0); bzWalk(tl, $('#bento'), s.t0, s.t1, 0, 0); bzParallax(tl, $, s.t0, s.t1, -360); bzParticlesGo(tl, $('#lv'), 'leaves', s.t0, s.t1); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1); bzPop(tl, $('#hr'), s.t0 + 0.1); } },
  prints: { bg: '#6a4a30', html: () => bzShot(`${cuPrints(P_DAY)}${bzParticles('dt', 'dust', 20, [0, 0, 1080, 1900], 8)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { for (let i = 0; i < 8; i++) tl.to($('#fp' + i), { opacity: 1, duration: 0.12 }, K('p') + i * 0.22); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1); tl.fromTo($('#cam'), { y: 300 }, { y: -300, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  back: { bg: '#6a4a30', html: () => bzShot(`<g transform="translate(-428 -2312) scale(2.2)">${cuPrints(P_DAY)}</g>`, `${cuSay('pt', 'VIRADAS PRA TRÁS', 540, 380, 4, BZ.red, '#fff', 90)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { for (let i = 0; i < 8; i++) tl.set($('#fp' + i), { opacity: 1 }, s.t0); tl.set($('#pt'), { opacity: 0 }, s.t0); bzShow(tl, $('#pt'), K('b')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 950); } },
  seguir: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 6, `${cuBento(540, 1900, 2.0)}${cuGun('gun', 230, 1500, 1.3, -85)}`, { rays: true }), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#bento'), s.t0, 'dot', 'grin'); bzTalk(tl, $('#bento'), 'cu_bento', s.t0, s.t1, 'grin', 'open'); bzPose(tl, $('#bento'), s.t0 + 0.3, { aR: -100 }, 0.3); bzBlink(tl, $('#bento'), s.t0, s.t1); bzHandheld(tl, $('#cam'), s.t0, s.t1, 3); } },
  follow: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 7, `${cuBento(400, 1540, 1.15)}${cuCaio(700, 1540, 1.1)}`, { rays: true, parts: bzParticles('dt', 'dust', 24, [0, 300, 1080, 1500], 9) }), ''),
    anim(tl, s, K, $) { bzWalk(tl, $('#caio'), s.t0, s.t1, 0, 0); bzWalk(tl, $('#bento'), s.t0, s.t1, 0, 0); bzFace(tl, $('#bento'), s.t0, 'angry', 'flat'); bzParallax(tl, $, s.t0, s.t1, -360); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1); } },
  arrows: { bg: '#6a4a30', html: () => bzShot(cuPrints(P_DAY), `<g id="a1" opacity="0"><path d="M300 1500 L 300 500 L 240 560 M300 500 L 360 560" stroke="#fff" stroke-width="30" fill="none" stroke-linecap="round"/></g><g id="a2" opacity="0"><path d="M780 500 L 780 1500 L 720 1440 M780 1500 L 840 1440" stroke="${BZ.red}" stroke-width="30" fill="none" stroke-linecap="round"/></g>
      ${cuSay('l1', 'VOCÊS', 300, 420, -4, '#fff', BZ.ink, 80)}${cuSay('l2', 'ELE', 780, 1600, 4, BZ.red, '#fff', 80)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { for (let i = 0; i < 8; i++) tl.set($('#fp' + i), { opacity: 1 }, s.t0); tl.set($('#l1, #l2'), { opacity: 0 }, s.t0); tl.to($('#a1'), { opacity: 1, duration: 0.2 }, s.t0 + 0.3); bzShow(tl, $('#l1'), s.t0 + 0.4); tl.to($('#a2'), { opacity: 1, duration: 0.2 }, K('a')); bzShow(tl, $('#l2'), K('a') + 0.1); } },
  // ---------------- the whistle and the loop
  whistle: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 8, `${cuCaio(360, 1540, 1.1)}${cuBento(700, 1540, 1.15, true)}`, { parts: bzParticles('lv', 'leaves', 10, [0, 0, 1080, 700], 2), dark: 0.15 }), `${cuSay('f1', 'FIIIU', 220, 520, -10)}${cuSay('f2', 'FIIIU', 860, 760, 8)}${cuSay('f3', 'FIIIU', 520, 300, -4)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#caio'), s.t0, 'wide', 'o'); bzFace(tl, $('#bento'), s.t0, 'half', 'flat'); bzParticlesGo(tl, $('#lv'), 'leaves', s.t0, s.t1);
      ['w1', 'w2', 'w3'].forEach((k, i) => { tl.set($('#f' + (i + 1)), { opacity: 0 }, s.t0); bzShow(tl, $('#f' + (i + 1)), K(k)); tl.to($('#f' + (i + 1)), { opacity: 0, duration: 0.4 }, K(k) + 1.0);
        tl.to($('#caio .hd'), { rotation: [-14, 14, -8][i], transformOrigin: '50% 90%', duration: 0.25 }, K(k)); tl.to($('#bento .hd'), { rotation: [10, -12, 6][i], transformOrigin: '50% 90%', duration: 0.25 }, K(k) + 0.1); });
      bzHandheld(tl, $('#cam'), s.t0, s.t1, 6); } },
  walk: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 9, `${cuBento(400, 1540, 1.15)}${cuCaio(700, 1540, 1.1)}`, { rays: true, parts: bzParticles('dt', 'dust', 24, [0, 300, 1080, 1500], 4) }), ''),
    anim(tl, s, K, $) { bzWalk(tl, $('#caio'), s.t0, s.t1, 0, 0); bzWalk(tl, $('#bento'), s.t0, s.t1, 0, 0); bzFace(tl, $('#caio'), s.t0, 'half', 'flat'); bzParallax(tl, $, s.t0, s.t1, -420); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1); } },
  same: { bg: '#5a9a8a', html: () => bzShot(cuCutTree(P_DAY), `${bzFlash('fl', '#fff')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, K('s'), 1, 1.1, 540, 760); tl.to($('#cam'), { scale: 1.6, svgOrigin: '540 760', duration: 0.3, ease: 'power3.out' }, K('s')); bzHit(tl, $('#fl'), K('s'), 0.35); } },
  naopode: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 10, `${cuBento(540, 1900, 2.0)}`), bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#bento'), s.t0, 'wide', 'open'); bzTalk(tl, $('#bento'), 'cu_bento', s.t0, s.t1, 'open', 'open'); bzShake(tl, $('#bento'), s.t0, s.t1, 3); bzPose(tl, $('#bento'), s.t0, { aL: 140, aR: -140 }, 0.2); bzHandheld(tl, $('#cam'), s.t0, s.t1, 6); } },
  loop: { bg: '#5a9a8a', html: () => bzShot(cuCutTree(P_DAY), `${cuSay('v1', '2ª VEZ', 300, 420, -6, '#fff', BZ.ink, 100)}${cuSay('v2', '3ª VEZ', 780, 640, 5, '#fff', BZ.ink, 100)}${cuSay('v3', '4ª VEZ', 540, 1560, -3, BZ.red, '#fff', 120)}${bzFlash('fl', '#000')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { ['l1', 'l2', 'l3'].forEach((k, i) => { tl.set($('#v' + (i + 1)), { opacity: 0 }, s.t0); bzShow(tl, $('#v' + (i + 1)), K(k)); bzHit(tl, $('#fl'), K(k) - 0.05, 0.8); tl.set($('#cam'), { scale: 1 + i * 0.15, svgOrigin: '540 760' }, K(k)); }); } },
  // ---------------- him
  saw: { bg: '#5a9a8a', html: () => bzShot(`${cuBg(P_DAY, 11)}${cuCaio(540, 1800, 2.2)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#caio'), s.t0, 'half', 'flat'); bzFace(tl, $('#caio'), s.t0 + 0.5, 'wide', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 880); } },
  rider: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 12, cuRider(300, 1600, 1.05), { rays: true, parts: bzParticles('lv', 'leaves', 16, [0, 0, 1080, 900], 8) }), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#curupira'), s.t0, 'glow', 'grin'); bzPose(tl, $('#curupira'), s.t0, { lL: 60, lR: -60, aR: -150, aL: 40 }, 0.01); cuTrot(tl, $('#pig'), s.t0, s.t1); tl.fromTo($('#rider'), { x: -300 }, { x: 500, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      bzParticlesGo(tl, $('#lv'), 'leaves', s.t0, s.t1); bzParallax(tl, $, s.t0, s.t1, -200); } },
  kid: { bg: '#5a9a8a', html: () => bzShot(`${cuBg(P_DAY, 13)}${bzRays('ry', 700, -120, 5, 1900, '#fff8c8', 0.12)}${cuKid(540, 2050, 3.2)}`, `${cuSay('ha', 'HÁ HÁ HÁ', 540, 380, 6, '#fff', BZ.red, 110)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#curupira'), s.t0, 'glow', 'grin'); tl.fromTo($('#curupira .hd'), { rotation: -6, transformOrigin: '50% 90%' }, { rotation: 6, duration: 0.18, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.18) }, s.t0);
      tl.fromTo($('#curupira .hd > path:first-child'), { scaleY: 0.92, transformOrigin: '50% 100%' }, { scaleY: 1.08, duration: 0.12, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.12) }, s.t0);
      tl.set($('#ha'), { opacity: 0 }, s.t0); bzShow(tl, $('#ha'), K('r') - 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); } },
  feet: { bg: '#6a4a30', html: () => bzShot(cuFeet(), `${cuSay('dir', 'ELE ANDA PRA LÁ →', 540, 420, -3, '#fff', BZ.ink, 80)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#dir'), { opacity: 0 }, s.t0); bzShow(tl, $('#dir'), K('f')); tl.fromTo($('#cam'), { x: 120 }, { x: -60, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  // ---------------- the knot
  vo: { bg: '#e8d4b0', html: () => bzShot(`<rect width="1080" height="1920" fill="#e8d4b0"/><rect y="1300" width="1080" height="640" fill="#b89a70" ${bzO()}/>${cuVo(540, 1720, 1.6)}`, `<rect width="1080" height="1920" fill="#c8a060" opacity="0.3"/>${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'dot', 'smile'); bzIdle(tl, $('#vo'), s.t0, s.t1); bzPose(tl, $('#vo'), s.t0 + 0.2, { aR: -120 }, 0.3); } },
  knot: { bg: '#2f5a30', html: () => bzShot(cuKnot(), bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#hl'), { x: -60, y: 0 }, { x: 40, y: -60, duration: 0.3, yoyo: true, repeat: 5 }, s.t0); tl.fromTo($('#hr'), { x: 60, y: 0 }, { x: -40, y: -60, duration: 0.3, yoyo: true, repeat: 5 }, s.t0 + 0.1);
      tl.to($('#knot'), { opacity: 1, duration: 0.2 }, s.t0 + 1.6); bzPop(tl, $('#knot'), s.t0 + 1.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 960); } },
  untie: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 14, `<g transform="translate(-300 260)">${cuKnot().replace(/<rect width="1080" height="1920" fill="#2f5a30"\/>/, '')}</g>${cuKid(560, 1500, 1.3)}`, { rays: true }), ''),
    anim(tl, s, K, $) { tl.set($('#knot'), { opacity: 1 }, s.t0); tl.set($('#hl, #hr'), { opacity: 0 }, s.t0); bzFace(tl, $('#curupira'), s.t0, 'glow', 'o'); bzPose(tl, $('#curupira'), s.t0, { aL: -50, aR: 50 }, 0.2);
      tl.fromTo($('#curupira .aL'), { rotation: -50 }, { rotation: -30, duration: 0.2, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.2) }, s.t0 + 0.2); tl.fromTo($('#curupira .hd'), { rotation: 10, transformOrigin: '50% 90%' }, { rotation: -10, duration: 0.6, yoyo: true, repeat: 3 }, s.t0); } },
  // ---------------- the run and the shot that never came
  run: { bg: '#5a9a8a', html: () => bzShot(cuScene(P_DAY, 15, `${cuCaio(540, 1560, 1.2)}`, { parts: bzParticles('lv', 'leaves', 16, [0, 0, 1080, 900], 3) }), ''),
    anim(tl, s, K, $) { bzWalk(tl, $('#caio'), s.t0, s.t1, 0, 0, true); bzFace(tl, $('#caio'), s.t0, 'wide', 'open'); bzParallax(tl, $, s.t0, s.t1, -900); bzParticlesGo(tl, $('#lv'), 'leaves', s.t0, s.t1); bzHandheld(tl, $('#cam'), s.t0, s.t1, 10); } },
  aim: { bg: '#3a4a2a', html: () => bzShot(cuScene(P_DUSK, 16, `${cuKid(820, 1520, 1.1)}${cuBento(320, 1560, 1.3)}${cuGun('gun', 300, 1010, 1.2, -4)}`, { dark: 0.2 }), bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#bento'), s.t0, 'angry', 'frown'); bzPose(tl, $('#bento'), s.t0, { aR: -85, aL: -60 }, 0.01); bzFace(tl, $('#curupira'), s.t0, 'glow', 'grin'); bzIdle(tl, $('#curupira'), s.t0, s.t1);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.18, 820, 1100); } },
  road: { bg: '#f29a4a', html: () => bzShot(`${bzSky('#f29a4a', '#5a3f7a')}${bzSun(820, 1000, 120, '#ffd27a')}<path d="M-20 1150 L 1100 1150 L 1100 1940 L -20 1940 Z" fill="#6a4a2a" ${bzO()}/><path d="M440 1150 L 640 1150 L 1000 1940 L 80 1940 Z" fill="#c88a5a" ${bzO()}/>${cuTree(60, 1200, 0.7, P_DUSK, 1)}${cuCaio(540, 1600, 1.2)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#caio'), s.t0, 'half', 'open'); bzWalk(tl, $('#caio'), s.t0, s.t1, -80, 80); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  never: { bg: '#14283a', html: () => bzShot(cuScene(P_DAWN, 17, `<g transform="translate(560 1560) rotate(-12)"><ellipse cx="0" cy="0" rx="150" ry="28" fill="#7a5a3a" ${bzO()}/><path d="M-80 0 Q -80 -90 0 -95 Q 80 -90 80 0 Z" fill="#7a5a3a" ${bzO()}/></g>`, { dark: 0.3, parts: bzParticles('ff', 'fireflies', 14, [0, 700, 1080, 1500], 9) }), bzVignette(0.7)),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.25, 560, 1500); } },
  gun: { bg: '#3a4a2a', html: () => bzShot(`<rect width="1080" height="1920" fill="#3a4a2a"/>${[...Array(12)].map((_, i) => `<ellipse cx="${(i * 191) % 1080}" cy="${(i * 331) % 1920}" rx="90" ry="40" fill="#2f5a30" opacity="0.6"/>`).join('')}${cuGun('gun', 150, 1000, 1.8, -8, true)}`, `${cuSay('td', '3 DIAS DEPOIS', 540, 380, -3, '#fff', BZ.ink, 90)}${bzFlash('fl', '#fff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzPop(tl, $('#td'), s.t0 + 0.1); bzPush(tl, $('#cam'), s.t0, K('g'), 1, 1.1, 540, 980); tl.to($('#cam'), { scale: 1.5, svgOrigin: '600 970', duration: 0.3, ease: 'power3.out' }, K('g')); bzHit(tl, $('#fl'), K('g'), 0.3); } },
  you: { bg: '#6a4a30', html: () => bzShot(`${cuPrints(P_DAY)}${bzGlow('eg', 540, 420, 220, '#9aff6a', 0.25)}<g id="peek" opacity="0"><circle cx="510" cy="420" r="18" fill="#c8ff9a"/><circle cx="570" cy="420" r="18" fill="#c8ff9a"/></g>${cuFern(540, 520, 1.8, '#1f4a30')}`, bzVignette(0.75)),
    anim(tl, s, K, $) { for (let i = 0; i < 8; i++) tl.set($('#fp' + i), { opacity: 1 }, s.t0); tl.fromTo($('#cam'), { y: 200 }, { y: -200, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.set($('#peek'), { opacity: 1 }, K('end')); } },
});
