// <lines>
const WD_LINES = [{"who": "us_wi", "t0": 0.3, "t1": 3.246}, {"who": "us_wi", "t0": 3.646, "t1": 10.472}, {"who": "us_wi", "t0": 10.872, "t1": 14.89}, {"who": "us_wi", "t0": 15.29, "t1": 19.413}, {"who": "us_wi", "t0": 19.813, "t1": 23.786}, {"who": "us_wi", "t0": 24.186, "t1": 30.503}, {"who": "us_wi", "t0": 30.903, "t1": 34.915}, {"who": "us_wi", "t0": 35.315, "t1": 42.354}, {"who": "us_wi", "t0": 42.754, "t1": 48.163}, {"who": "us_wi", "t0": 48.663, "t1": 51.363}];
// </lines>
// =====================================================================
//  WHAT IF EP.1 — you double in size every day: the shots. Kit in ../wi-kit.ts, props in world-ep.ts.
//  Every shot: the kid grows in the frame (the subject moves, not the frame) and the HUD shows day + height.
// =====================================================================
BZ_TALK.lines = WD_LINES;
const wdGrow = (tl: gsap.core.Timeline, sel: string, t: number, a: number, b: number, ox: number, oy: number, d = 0.5) => tl.fromTo(sel, { scale: a, svgOrigin: `${ox} ${oy}` }, { scale: b, svgOrigin: `${ox} ${oy}`, duration: d, ease: 'back.out(1.6)' }, t);

defineVisuals({
  hook: { bg: '#2a2a4a', html: () => bzShot(`${wiRoom(true, '6:59')}<g id="k">${wiChar('kid', 540, 1300, 1.1)}</g>`, `${wiSay('hk', '2X BIGGER EVERY DAY', 540, 1560, -4, '#f6c744', BZ.ink, 88)}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'closed', 'smile'); bzFace(tl, $('#kid'), K('g') - 0.4, 'wide', 'o'); bzHook(tl, $('#hk'), s.t0);
      wdGrow(tl, $('#k'), K('g'), 1, 1.6, 540, 1300); bzHit(tl, $('#fl'), K('g'), 0.4); bzShake(tl, $('#cam'), K('g'), K('g') + 0.4, 6); } },
  day2: { bg: '#e8d8b8', html: () => bzShot(`${wiRoom(false, '7:00')}<g id="k">${wiChar('kid', 540, 1500, 2.0)}</g>`, `${wiHud('DAY 2', '10 FT')}${wiSay('w8', '8X HEAVIER', 540, 640, -4, BZ.red, '#fff', 100)}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'o'); tl.set($('#w8'), { opacity: 0 }, s.t0); bzShow(tl, $('#w8'), K('w')); bzShake(tl, $('#cam'), K('w'), K('w') + 0.3, 5);
      tl.to($('#bed'), { scaleY: 0.4, svgOrigin: '540 1350', duration: 0.15 }, K('b')); bzHit(tl, $('#fl'), K('b'), 0.3); bzBlink(tl, $('#kid'), s.t0, s.t1); } },
  day5: { bg: '#5ab0f0', html: () => bzShot(`${wiCity(2)}${wdHouse(160, 1560, 1.1)}${wdHouse(900, 1560, 1.1, '#a8c870')}<g id="k">${wiChar('kid', 540, 1640, 2.3)}</g>${wdCracks('cr', 540, 1420, 2.3)}`, wiHud('DAY 5', '80 FT')),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'flat'); bzFace(tl, $('#kid'), K('c'), 'wide', 'frown'); tl.to($('#cr'), { opacity: 1, duration: 0.1 }, K('c')); bzShake(tl, $('#k'), K('c'), K('c') + 0.6, 4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1300); } },
  day7: { bg: '#5ab0f0', html: () => bzShot(`${bzSky('#5ab0f0', '#d8f0ff')}<rect y="1450" width="1080" height="500" fill="#2f8ac8"/>${wdStatue(300, 1560, 1.1)}<g id="k">${wiChar('kid', 720, 1700, 2.8)}</g>`, wiHud('DAY 7', '300 FT')),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'grin'); wdGrow(tl, $('#k'), K('s') - 0.3, 0.7, 1, 720, 1700, 0.6); bzPose(tl, $('#kid'), K('s'), { aL: 150 }, 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },
  day10: { bg: '#5ab0f0', html: () => bzShot(`${bzSky('#5ab0f0', '#d8f0ff')}${bzBuildings(1650, 4, ['#8aa0c8', '#6a84b8', '#a8b8d8'], 0.2)}${wdTower(330, 1700, 0.95)}<g id="k">${wiChar('kid', 720, 1720, 3.4)}</g>`, wiHud('DAY 10', '1/2 MILE')),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'half', 'grin'); tl.fromTo($('#cam'), { y: -400 }, { y: 0, duration: K('t') - s.t0, ease: 'power1.inOut' }, s.t0); bzPose(tl, $('#kid'), K('t'), { aR: -100 }, 0.3); } },
  day14: { bg: '#3a7ad8', html: () => bzShot(`${bzSky('#1a4aa8', '#9ad0f0')}${wdMountain(540, 1500, 1.2)}<g id="cl">${[[160, 1200], [540, 1250], [900, 1180]].map(([cx, cy]) => `<ellipse cx="${cx}" cy="${cy}" rx="220" ry="60" fill="#fff"/>`).join('')}</g>${wdPlane('pl', 1300, 900, 0.8)}<g id="k">${wiChar('kid', 540, 2300, 3.2)}</g>`, `${wiHud('DAY 14', '8 MILES')}${wiSay('br', "CAN'T BREATHE", 540, 1560, 3, '#fff', BZ.red, 80)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'grin'); tl.to($('#pl'), { x: -1700, duration: 2.5, ease: 'none' }, K('c')); bzFace(tl, $('#kid'), K('b') - 0.2, 'half', 'o'); tl.set($('#br'), { opacity: 0 }, s.t0); bzShow(tl, $('#br'), K('b'));
      tl.to($('#kid'), { y: -20, duration: 0.6, yoyo: true, repeat: 3 }, K('b')); } },
  day17: { bg: '#05061a', html: () => bzShot(`${wiSpace(2)}<path d="M-200 1900 Q 540 1500 1280 1900 Z" fill="#2f7ad8"/><path d="M-200 1900 Q 540 1500 1280 1900" stroke="#9ad8ff" stroke-width="30" fill="none" opacity="0.6"/><g id="k">${wiChar('kid', 540, 2200, 2.8)}</g>`, wiHud('DAY 17', '65 MILES')),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'o'); tl.fromTo($('#k'), { y: 500 }, { y: 0, duration: K('s') - s.t0 + 0.4, ease: 'power2.out' }, s.t0); bzFace(tl, $('#kid'), K('s'), 'wide', 'grin'); } },
  day27: { bg: '#05061a', html: () => bzShot(`${wiSpace(3)}<g id="k">${wiChar('kid', 540, 2050, 2.6)}</g><g id="orb">${wiEarth('ea', 880, 1100, 90)}</g>`, `${wiHud('DAY 27', 'EARTH = BALL')}${wiSay('hv', 'HEAVIER THAN EARTH', 540, 1560, -3, '#f6c744', BZ.ink, 76)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'o'); tl.fromTo($('#orb'), { scale: 3, svgOrigin: '880 1100' }, { scale: 1, duration: 0.5, ease: 'power2.out' }, K('b')); tl.fromTo($('#ea .land'), { x: 0 }, { x: -180, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      tl.set($('#hv'), { opacity: 0 }, s.t0); bzShow(tl, $('#hv'), K('b') + 1.2); tl.to($('#orb'), { rotation: 360, svgOrigin: '540 900', duration: 3, ease: 'none', repeat: 1 }, K('o')); bzFace(tl, $('#kid'), K('o'), 'closed', 'grin'); } },
  day32: { bg: '#05061a', html: () => bzShot(`${wiSpace(5)}<g id="k">${wiChar('kid', 540, 2000, 2.6)}</g><g id="st" opacity="0">${wiSun('su', 540, 900, 420)}</g>${wiBurst('bu', 540, 900, '#ffd27a', 0)}`, `${wiHud('DAY 32', 'A STAR')}${bzFlash('fl', '#fff4c0')}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'frown'); tl.to($('#k'), { scaleX: 0.85, scaleY: 0.85, svgOrigin: '540 1300', duration: K('i') - K('c'), ease: 'power2.in' }, K('c')); bzShake(tl, $('#k'), K('c'), K('i'), 5);
      bzHit(tl, $('#fl'), K('i'), 1); tl.set($('#st'), { opacity: 1 }, K('i')); tl.set($('#k'), { opacity: 0 }, K('i')); tl.to($('#bu path'), { opacity: 0.3, duration: 0.3 }, K('i'));
      tl.fromTo($('#st'), { scale: 0.6, svgOrigin: '540 900' }, { scale: 1.05, duration: 0.6, ease: 'back.out(2)' }, K('i')); tl.to($('#bu'), { rotation: 30, svgOrigin: '540 900', duration: s.t1 - K('i') }, K('i')); } },
  end: { bg: '#2a2a4a', html: () => bzShot(`${wiRoom(true, '6:59')}${wiChar('kid', 540, 1300, 1.1)}`, wiSay('q', 'WHAT DAY WOULD YOU STOP?', 540, 640, -3, '#f6c744', BZ.ink, 70)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'grin'); bzPose(tl, $('#kid'), s.t0 + 0.3, { aR: -130 }, 0.3); bzPop(tl, $('#q'), s.t0 + 0.3); bzIdle(tl, $('#kid'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); } },
});
