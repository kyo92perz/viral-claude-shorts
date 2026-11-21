// <lines>
const CS_LINES = [];
// </lines>
// =====================================================================
//  O CORPO-SECO: the shots (Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: the captions sit at y 1190–1400, so faces stay above ~1050 or fill the frame. An adult's head is 507*s above the feet.
// =====================================================================
BZ_TALK.lines = CS_LINES;
const csShot = (body: string, over = '') => svg(`<g id="cam">${body}</g>${over}`);
function csPush(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, a = 1, b = 1.07, ox = 540, oy = 900) {
  tl.fromTo(sel, { scale: a, svgOrigin: `${ox} ${oy}` }, { scale: b, svgOrigin: `${ox} ${oy}`, duration: t1 - t0, ease: 'none' }, t0);
}
const csHit = (tl: gsap.core.Timeline, sel: string, t: number, k = 0.7) => tl.fromTo(sel, { opacity: k }, { opacity: 0, duration: 0.3, ease: 'power2.out' }, t);
const csShow = (tl: gsap.core.Timeline, sel: string, t: number) => { tl.set(sel, { opacity: 1 }, t); bzPop(tl, sel, t, 0.3); };
const csNum = (id: string, n: string, x: number, y: number, c = '#fff') => `<g id="${id}" opacity="0"><text x="${x}" y="${y}" text-anchor="middle" font-family="Anton" font-size="240" fill="${c}" stroke="${BZ.ink}" stroke-width="14" paint-order="stroke">${n}</text></g>`;
const csShake = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number, a = 6) => tl.fromTo(sel, { x: -a }, { x: a, duration: 0.05, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.05)), ease: 'none' }, t0);
// the rider in a group that can travel
const csRide = (x: number, y: number, s = 1, torn = false) => `<g id="rider">${csRider(x, y, s, torn)}</g>`;
// a dry arm with claws reaching from the left edge
const csClaw = (id: string, x1: number, y1: number) => `<g id="${id}"><path d="M-120 ${y1 + 80} Q ${x1 * 0.4} ${y1 - 60} ${x1} ${y1}" stroke="${BZ.ink}" stroke-width="58" fill="none" stroke-linecap="round"/><path d="M-120 ${y1 + 80} Q ${x1 * 0.4} ${y1 - 60} ${x1} ${y1}" stroke="#7a6a55" stroke-width="42" fill="none" stroke-linecap="round"/>
  ${[-22, 0, 22].map((d) => `<path d="M${x1} ${y1 + d} l70 ${d * 0.6}" stroke="${BZ.ink}" stroke-width="10" stroke-linecap="round"/>`).join('')}</g>`;
const csGlow = (x: number, y: number) => `<circle id="glow" cx="${x}" cy="${y}" r="170" fill="#fff4b0" opacity="0"/>`;

defineVisuals({
  // ---------------- the hook: the tree on the road opens its eyes
  open: { bg: '#0f1530', html: () => csShot(`${csNight(200, 300)}${csTree('tree', 540, 1700, 2.2)}${bzFog(1680, BZ.fog, 0.3)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { csPush(tl, $('#cam'), s.t0, s.t1, 1.05, 1.18, 540, 1040); tl.to($('#tree .eyes'), { opacity: 1, duration: 0.08 }, K('eyes')); tl.fromTo($('.fog'), { x: 0 }, { x: 80, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  minas: { bg: '#0f1530', html: () => csShot(`${csNight()}${csRoad()}${bzLamp(160, 1500, 520)}${csTiao(380, 1580, 1.0)}${bzChar('comp', CS_SPEC.compadre, 700, 1580, 1.0, true)}${bzFog(1560)}`, bzSign('mg', 'INTERIOR DE MINAS', 540, 420, -3, BZ.yellow, BZ.ink, 84)),
    anim(tl, s, K, $) { bzPop(tl, $('#mg'), s.t0 + 0.1); bzFace(tl, $('#comp'), s.t0, 'half', 'o'); bzFace(tl, $('#tiao'), s.t0, 'wide', 'flat'); bzPose(tl, $('#comp'), s.t0 + 0.3, { aR: -120 }, 0.3); bzPose(tl, $('#comp'), s.t0 + 1.3, { aR: -60 }, 0.3);
      bzBlink(tl, $('#tiao'), s.t0, s.t1); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  title: { bg: '#0f1530', html: () => csShot(`${csNight(200, 300)}${csTree('tree', 540, 1650, 1.6)}${csSeco(540, 1250, 1.1)}${bzFog(1600)}`, `${bzFlash('fl')}${bzSign('tt', 'O CORPO-SECO', 540, 400, -4, BZ.yellow, BZ.ink, 120)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzPose(tl, $('#seco'), s.t0, { aL: 160, aR: -160, lL: 20, lR: -20 }, 0.01); bzFace(tl, $('#seco'), s.t0, 'angry', 'grin'); tl.set($('#tt'), { opacity: 0 }, s.t0);
      csShow(tl, $('#tt'), K('t')); csHit(tl, $('#fl'), K('t'), 0.8); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1000); } },
  // ---------------- who he was
  window: { bg: '#1c1a2a', html: () => csShot(csWindow(), `${bzFlash('fl', BZ.red)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#shson .fist'), { rotation: -10, svgOrigin: '420 900' }, { rotation: 0, duration: 0.6 }, s.t0 + 0.3); tl.to($('#shson .fist'), { rotation: 45, svgOrigin: '420 900', duration: 0.12, ease: 'power3.in' }, K('hit') - 0.12);
      tl.to($('#shmae'), { scaleY: 0.82, svgOrigin: '700 1400', duration: 0.2 }, K('hit')); csHit(tl, $('#fl'), K('hit'), 0.5); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 960); } },
  grave: { bg: '#0f1530', html: () => csShot(csGrave(), `${bzFlash('fl')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { tl.set($('#coffin'), { y: 420 }, s.t0); tl.to($('#coffin'), { y: 0, duration: 0.18, ease: 'back.out(2)' }, K('spit')); tl.to($('#dirt'), { y: -260, opacity: 0, duration: 0.6, ease: 'power2.out' }, K('spit'));
      csHit(tl, $('#fl'), K('spit'), 0.5); csShake(tl, $('#cam'), K('spit'), K('spit') + 0.35, 8); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1300); } },
  three: { bg: '#0f1530', html: () => csShot(csGrave(), `${csNum('n1', '1', 220, 640)}${csNum('n2', '2', 540, 560)}${csNum('n3', '3', 860, 640, BZ.red)}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { tl.set($('#coffin'), { y: 420 }, s.t0); tl.set($('#dirt'), { opacity: 0 }, s.t0);
      ['p1', 'p2', 'p3'].forEach((k, i) => { tl.to($('#coffin'), { y: 0, duration: 0.12, ease: 'power3.out' }, K(k)); if (i < 2) tl.to($('#coffin'), { y: 420, duration: 0.15, ease: 'power2.in' }, K(k) + 0.18);
        csShow(tl, $('#n' + (i + 1)), K(k)); csShake(tl, $('#cam'), K(k), K(k) + 0.2, 6); }); } },
  nowhere: { bg: '#3a0e0e', html: () => csShot(csNowhere(), ''),
    anim(tl, s, K, $) { csShow(tl, $('#x1'), K('x1')); csShow(tl, $('#x2'), K('x2')); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },
  dry: { bg: '#0f1530', html: () => csShot(`${csNight(840, 300)}${bzChar('vivo', CS_SPEC.vivo, 540, 1640, 1.25)}<g id="sg" opacity="0">${csSeco(540, 1640, 1.25)}</g>${bzFog(1620)}`, `${bzFlash('fl')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#vivo'), s.t0, 'angry', 'frown'); bzFace(tl, $('#seco'), s.t0, 'angry', 'grin'); tl.to($('#vivo'), { opacity: 0, duration: 0.5 }, K('s') - 0.2); tl.to($('#sg'), { opacity: 1, duration: 0.5 }, K('s') - 0.2);
      csHit(tl, $('#fl'), K('s'), 0.4); bzShake(tl, $('#seco'), K('s'), K('s') + 0.5, 5); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  tree: { bg: '#0f1530', html: () => csShot(`${csNight(200, 300)}${csRoad()}${csTree('tree', 540, 1650, 1.6)}${csSeco(540, 1250, 1.1)}${bzFog(1600)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzPose(tl, $('#seco'), s.t0, { aL: 160, aR: -160, lL: 20, lR: -20 }, 0.01); bzFace(tl, $('#seco'), s.t0, 'angry', 'flat'); bzFace(tl, $('#seco'), s.t1 - 1, undefined, 'grin');
      tl.fromTo($('#seco .hd'), { rotation: -8, transformOrigin: '50% 90%' }, { rotation: 8, duration: (s.t1 - s.t0) / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, s.t0); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 980);
      tl.fromTo($('.fog'), { x: 0 }, { x: -90, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  // ---------------- that night
  ride: { bg: '#0f1530', html: () => csShot(`${csNight()}${csRoad()}${csTree('tree', 900, 1420, 0.8)}${csRide(0, 1700, 0.95)}${bzFog(1660, BZ.fog, 0.25)}`, bzSign('nm', 'SEU TIÃO', 540, 430, -3, BZ.yellow, BZ.ink, 100)),
    anim(tl, s, K, $) { tl.fromTo($('#rider'), { x: -300 }, { x: 760, duration: s.t1 - s.t0, ease: 'none' }, s.t0); csPedal(tl, $(''), s.t0, s.t1); bzFace(tl, $('#tiao'), s.t0, 'dot', 'smile'); bzPop(tl, $('#nm'), s.t0 + 0.6); } },
  snap: { bg: '#0f1530', html: () => csShot(`${csNight(200, 300)}${csTree('tree', 700, 2700, 3)}`, `${bzSign('cr', 'CRÉC!', 380, 520, -8, '#fff', BZ.red, 130)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { tl.set($('#cr'), { opacity: 0 }, s.t0); csShow(tl, $('#cr'), K('c')); csShake(tl, $('#tree'), K('c'), K('c') + 0.3, 8); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 700); } },
  quem: { bg: '#0f1530', html: () => csShot(`${csNight(860, 280)}${csTree('tree', 960, 1900, 1.4)}${csTiao(480, 1950, 2.2)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiao'), s.t0, 'wide', 'flat'); bzTalk(tl, $('#tiao'), 'cs_tiao', s.t0, s.t1, 'flat', 'open'); tl.fromTo($('#tiao .hd'), { rotation: -10, transformOrigin: '50% 90%' }, { rotation: 10, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, s.t0 + 0.2); } },
  quiet: { bg: '#0f1530', html: () => csShot(`${csNight()}${csRoad()}${csTree('tree', 820, 1460, 1.0)}${csRide(260, 1700, 0.8)}${bzFog(1600, BZ.fog, 0.4)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzPose(tl, $('#tiao'), s.t0, { aL: -62, aR: -62, lL: -40, lR: -40 }, 0.01); bzFace(tl, $('#tiao'), s.t0, 'wide', 'flat'); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 820, 1100); tl.fromTo($('.fog'), { x: 0 }, { x: 70, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  moving: { bg: '#0f1530', html: () => csShot(`${csNight()}${csRoad()}${csTree('tree', 700, 1560, 1.3)}${csRide(200, 1750, 0.85)}${bzFog(1600, BZ.fog, 0.35)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzPose(tl, $('#tiao'), s.t0, { aL: -62, aR: -62, lL: -40, lR: -40 }, 0.01); bzFace(tl, $('#tiao'), s.t0, 'wide', 'o');
      tl.fromTo($('#tree'), { rotation: -1.5, svgOrigin: '700 1560' }, { rotation: 1.5, svgOrigin: '700 1560', duration: 0.55, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.55), ease: 'sine.inOut' }, s.t0); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 700, 1000); } },
  arm: { bg: '#0f1530', html: () => csShot(`${csNight(200, 300)}${csTree('tree', 540, 2600, 2.6)}${csSeco(540, 1980, 1.8)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { bzPose(tl, $('#seco'), s.t0, { aL: 160, aR: -160 }, 0.01); bzFace(tl, $('#seco'), s.t0, 'closed', 'flat'); bzFace(tl, $('#seco'), K('a') - 0.3, 'angry', 'flat');
      bzPose(tl, $('#seco'), K('a'), { aR: -70 }, 0.8); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 900); } },
  descend: { bg: '#0f1530', html: () => csShot(`${csNight(200, 300)}${csRoad()}${csTree('tree', 600, 1650, 1.6)}${csSeco(600, 1700, 1.1)}${bzFog(1620)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzPose(tl, $('#seco'), s.t0, { aL: 160, aR: -160, lL: 20, lR: -20 }, 0.01); bzFace(tl, $('#seco'), s.t0, 'angry', 'grin');
      tl.fromTo($('#seco'), { y: -460 }, { y: 0, duration: (s.t1 - s.t0) * 0.8, ease: 'power1.inOut' }, s.t0); bzPose(tl, $('#seco'), s.t0 + (s.t1 - s.t0) * 0.7, { aL: 30, aR: -30, lL: 0, lR: 0 }, 0.5);
      bzShake(tl, $('#seco'), K('k'), K('k') + 0.3, 3); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 600, 1300); } },
  sai: { bg: '#0f1530', html: () => csShot(`${csNight(860, 280)}${csTiao(540, 1950, 2.3)}`, `<rect id="tint" width="1080" height="1920" fill="${BZ.blood}" opacity="0.25"/>${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tiao'), s.t0, 'angry', 'open'); bzTalk(tl, $('#tiao'), 'cs_tiao', s.t0, s.t1, 'open', 'open'); bzShake(tl, $('#tiao'), s.t0, s.t1, 5); bzPose(tl, $('#tiao'), s.t0, { aL: 150, aR: -40 }, 0.2); } },
  // ---------------- the chase
  chase: { bg: '#0f1530', html: () => csShot(`${csNight()}${csRoad()}${csSeco(0, 1720, 1.05)}${csRide(0, 1720, 0.95)}${bzFog(1650, BZ.fog, 0.3)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#rider'), { x: -200 }, { x: 1400, duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0); csPedal(tl, $(''), s.t0, s.t1, true); bzFace(tl, $('#tiao'), s.t0, 'wide', 'open');
      bzWalk(tl, $('#seco'), s.t0, s.t1, -500, 1000, true); bzFace(tl, $('#seco'), s.t0, 'angry', 'open'); bzPose(tl, $('#seco'), s.t0, { aR: -110 }, 0.01); } },
  claws: { bg: '#0f1530', html: () => csShot(`${csNight()}<g id="road">${csRoad()}</g>${csRide(600, 1900, 1.7)}${csClaw('claw', 330, 1100)}<g id="marks" opacity="0"><path d="M470 1000 l60 120 M500 990 l60 120 M530 980 l60 120" stroke="${BZ.blood}" stroke-width="14" stroke-linecap="round"/></g>`, `${bzFlash('fl', BZ.red)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { csPedal(tl, $(''), s.t0, s.t1, true); bzFace(tl, $('#tiao'), s.t0, 'wide', 'open'); tl.fromTo($('#claw'), { x: -500 }, { x: 0, duration: K('sc') - s.t0, ease: 'power1.in' }, s.t0);
      tl.to($('#marks'), { opacity: 1, duration: 0.1 }, K('sc')); csHit(tl, $('#fl'), K('sc'), 0.45); tl.to($('#claw'), { x: -500, duration: 0.5, ease: 'power2.in' }, K('sc') + 0.3); csShake(tl, $('#cam'), s.t0, s.t1, 3); } },
  gate: { bg: '#0f1530', html: () => csShot(`${csNight()}${csRoad()}${csGlow(540 - 330 * 1.1, 1500 - 560 * 1.1)}${csGate(540, 1500, 1.1)}${csRide(0, 1760, 0.75)}${bzFog(1600, BZ.fog, 0.3)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#rider'), { x: -300 }, { x: 560, duration: (s.t1 - s.t0) * 0.6, ease: 'power2.out' }, s.t0); csPedal(tl, $(''), s.t0, s.t0 + (s.t1 - s.t0) * 0.6, true); bzFace(tl, $('#tiao'), s.t0, 'wide', 'open');
      tl.fromTo($('#glow'), { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' }, { opacity: 0.6, scale: 1, duration: 0.4 }, K('x')); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1200); } },
  stop: { bg: '#0f1530', html: () => csShot(`${csNight()}${csRoad()}${csGlow(540 - 330 * 1.1, 1500 - 560 * 1.1)}${csSeco(-200, 1640, 1.05)}${csGate(540, 1500, 1.1)}${bzFog(1600, BZ.fog, 0.3)}`, `${bzFlash('fl', '#fff4b0')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { tl.set($('#glow'), { opacity: 0.6 }, s.t0); bzWalk(tl, $('#seco'), s.t0, K('h') - 0.1, 0, 420); bzFace(tl, $('#seco'), s.t0, 'angry', 'grin');
      bzPose(tl, $('#seco'), K('h'), { aL: 150, aR: -150 }, 0.15); bzFace(tl, $('#seco'), K('h'), 'closed', 'open'); csHit(tl, $('#fl'), K('h'), 0.6); bzShake(tl, $('#seco'), K('h'), K('h') + 0.6, 6);
      tl.to($('#seco'), { x: 100, opacity: 0, duration: 0.8, ease: 'power1.in' }, K('h') + 0.6); } },
  // ---------------- the morning after
  dawn: { bg: '#f29a4a', html: () => csShot(`${csDawn()}${csTiao(640, 1560, 1.25, true, true)}`, bzSign('tr', '3 TIRAS', 300, 500, -5, BZ.red, '#fff', 110)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiao'), s.t0, 'half', 'frown'); tl.set($('#tr'), { opacity: 0 }, s.t0); csShow(tl, $('#tr'), K('t')); bzPose(tl, $('#tiao'), s.t0 + 0.4, { aL: 60 }, 0.4); bzBlink(tl, $('#tiao'), s.t0, s.t1); csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 640, 900); } },
  dead: { bg: '#f29a4a', html: () => csShot(`${bzSky('#f29a4a', '#5a3f7a')}${bzSun(200, 1050, 110, '#ffd27a')}<path d="M-20 1220 Q 300 1150 600 1200 T 1100 1180 L1100 1940 L-20 1940 Z" fill="#4a6a44" ${bzO()}/>${csRoad()}${csTree('tree', 600, 1600, 1.5, true)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 600, 1100); } },
  you: { bg: '#0f1530', html: () => csShot(`${csNight(200, 300)}${csRoad()}${csTree('tree', 540, 1700, 2.2)}${bzFog(1680, BZ.fog, 0.3)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { csPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05, 540, 1040); tl.to($('#tree .eyes'), { opacity: 1, duration: 0.06 }, K('eyes')); } },
});
