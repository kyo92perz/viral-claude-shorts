// <lines>
const WS_LINES = [{"who": "us_wi", "t0": 0.3, "t1": 2.123}, {"who": "us_wi", "t0": 2.623, "t1": 9.831}, {"who": "us_wi", "t0": 10.231, "t1": 17.229}, {"who": "us_wi", "t0": 17.629, "t1": 23.293}, {"who": "us_wi", "t0": 23.693, "t1": 31.704}, {"who": "us_wi", "t0": 32.104, "t1": 37.939}, {"who": "us_wi", "t0": 38.339, "t1": 42.949}, {"who": "us_wi", "t0": 43.449, "t1": 47.816}, {"who": "us_wi", "t0": 48.216, "t1": 51.313}];
// </lines>
// =====================================================================
//  WHAT IF EP.4 — you stopped sleeping: the shots. Kit in ../wi-kit.ts, props in world-ep.ts.
// =====================================================================
BZ_TALK.lines = WS_LINES;

defineVisuals({
  hook: { bg: '#2a2a4a', html: () => bzShot(`${wiRoom(true, '3:00')}${wiChar('kid', 540, 1300, 1.1)}`, wiSay('hk', 'NO SLEEP. EVER.', 540, 1560, -4, '#f6c744', BZ.ink, 96)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'flat'); bzHook(tl, $('#hk'), s.t0); tl.fromTo($('#clk'), { scale: 1, svgOrigin: '245 960' }, { scale: 1.2, duration: 0.15, yoyo: true, repeat: 3 }, K('g')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  drunk: { bg: '#e8d8b8', html: () => bzShot(`${wiRoom(false, '3:00')}<g id="k">${wiChar('kid', 540, 1750, 1.5)}</g>`, `${wiHud('24 HOURS', 'AWAKE')}${wiSay('dr', 'LIKE BEING DRUNK', 540, 1560, -4, BZ.red, '#fff', 84)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'grin'); bzShake(tl, $('#kid'), s.t0, s.t0 + 1.5, 4); bzFace(tl, $('#kid'), K('d') - 0.6, 'half', 'o');
      tl.to($('#k'), { rotation: 8, svgOrigin: '540 1750', duration: 0.6, yoyo: true, repeat: Math.floor((s.t1 - K('d') + 0.6) / 0.6), ease: 'sine.inOut' }, K('d') - 0.6); tl.set($('#dr'), { opacity: 0 }, s.t0); bzShow(tl, $('#dr'), K('d')); } },
  naps: { bg: '#e8dcc0', html: () => bzShot(`${wsClass()}${wiChar('pal', 220, 1380, 0.9)}${wiChar('kid', 600, 1450, 1.2)}`, `${wiHud('DAY 2', 'MICRO-NAPS')}<g id="zz">${wiSay('z', 'Z Z Z', 820, 760, 8, '#fff', BZ.ink, 70)}</g>`),
    anim(tl, s, K, $) { bzFace(tl, $('#pal'), s.t0, 'dot', 'smile'); bzFace(tl, $('#kid'), s.t0, 'half', 'flat'); tl.set($('#zz'), { opacity: 0 }, s.t0);
      [0, 1.4, 2.6].forEach((d) => { bzFace(tl, $('#kid'), K('n') + d, 'closed', 'flat'); tl.set($('#zz'), { opacity: 1 }, K('n') + d); bzFace(tl, $('#kid'), K('n') + d + 0.6, 'wide', 'flat'); tl.set($('#zz'), { opacity: 0 }, K('n') + d + 0.6); }); } },
  halluc: { bg: '#2a2a4a', html: () => bzShot(`<g id="wall">${wiRoom(true, '3:00')}</g><g id="sh" opacity="0"><ellipse cx="900" cy="900" rx="90" ry="240" fill="#05050c" opacity="0.8"/><circle cx="880" cy="760" r="12" fill="#ff3a2a"/><circle cx="920" cy="760" r="12" fill="#ff3a2a"/></g>${wiChar('kid', 400, 1720, 1.4)}`, `${wiHud('DAY 3', 'HALLUCINATIONS')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'flat'); tl.to($('#sh'), { opacity: 1, x: -60, duration: 0.3 }, K('m')); tl.to($('#sh'), { opacity: 0, duration: 0.2 }, K('m') + 0.8); tl.to($('#kid .hd'), { rotation: 20, transformOrigin: '50% 90%', duration: 0.2 }, K('m') + 0.2);
      tl.fromTo($('#wall'), { scale: 1, svgOrigin: '540 900' }, { scale: 1.04, duration: 0.7, yoyo: true, repeat: Math.floor((s.t1 - K('b')) / 0.7), ease: 'sine.inOut' }, K('b')); bzFace(tl, $('#kid'), K('h'), 'wide', 'open'); } },
  randy: { bg: '#3a3a4a', html: () => bzShot(`<rect width="1080" height="1920" fill="#3a3a4a"/>${bzRays('ry', 540, 900, 12, 1400, '#fff', 0.12)}${wsPaper('pp')}`, `${wiSay('wr', 'WORLD RECORD', 540, 1560, -3, '#f6c744', BZ.ink, 90)}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { tl.fromTo($('#pp'), { rotation: 720, scale: 0.1, svgOrigin: '540 920' }, { rotation: -4, scale: 1, duration: 0.8, ease: 'power3.out' }, s.t0); tl.set($('#wr'), { opacity: 0 }, s.t0); bzShow(tl, $('#wr'), K('r')); bzHit(tl, $('#fl'), K('r'), 0.4); bzPush(tl, $('#cam'), s.t0 + 0.8, s.t1, 1, 1.08); } },
  words: { bg: '#e8d8b8', html: () => bzShot(`${wiRoom(false, '7:00')}${wiChar('kid', 540, 1750, 1.5)}<g id="lt">${['W', '?', 'R', 'D', 'S'].map((c, i) => `<text class="l${i}" x="${300 + i * 120}" y="640" text-anchor="middle" font-family="Anton" font-size="140" fill="${BZ.ink}">${c}</text>`).join('')}</g>`, wiHud('DAY 11', '???')),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'half', 'o'); for (let i = 0; i < 5; i++) tl.fromTo($(`#lt .l${i}`), { y: 0, rotation: 0 }, { y: (i % 2 ? -1 : 1) * 80, rotation: (i % 2 ? -30 : 30), transformOrigin: '50% 50%', duration: 0.6, yoyo: true, repeat: 3 }, K('w') + i * 0.1); } },
  rats: { bg: '#3a3a4a', html: () => bzShot(`<rect width="1080" height="1920" fill="#d8dce4"/><rect y="1500" width="1080" height="440" fill="#a8acb8" ${bzO()}/>${wsCage(540, 1500)}${wsRat('rt', 540, 1440, 1.4)}`, `${wiHud('2–3 WEEKS', 'NO SLEEP')}`),
    anim(tl, s, K, $) { tl.fromTo($('#rt'), { x: -40 }, { x: 40, duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((K('d') - s.t0) / 0.5) - 1) }, s.t0); tl.set($('#rt .eye'), { opacity: 0 }, K('d')); tl.set($('#rt .xeye'), { opacity: 1 }, K('d'));
      tl.to($('#rt'), { rotation: 180, svgOrigin: '540 1440', y: 30, duration: 0.3 }, K('d')); tl.set($('#cam'), { scale: 1.15, svgOrigin: '540 1440' }, K('d')); } },
  trash: { bg: '#5ab0f0', html: () => bzShot(`<rect width="1080" height="1920" fill="#5ab0f0"/>${bzRays('ry', 540, 900, 12, 1400, '#fff', 0.15)}${wsBrain('br', 540, 900, 1.6)}${[0, 1, 2, 3, 4].map((i) => wsBag('b' + i, 200 + i * 170, 1700 - (i % 2) * 120, 1.1)).join('')}`, wiSay('sl', 'SLEEP = CLEANUP', 540, 380, -3, '#fff', BZ.ink, 90)),
    anim(tl, s, K, $) { tl.fromTo($('#br'), { scale: 0.95, svgOrigin: '540 900' }, { scale: 1.05, duration: 0.5, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.5) }, s.t0); for (let i = 0; i < 5; i++) tl.from($('#b' + i), { y: -900, duration: 0.4, ease: 'bounce.out' }, K('t') + i * 0.25);
      tl.set($('#sl'), { opacity: 0 }, s.t0); bzShow(tl, $('#sl'), s.t0 + 0.2); bzShake(tl, $('#cam'), K('p'), K('p') + 0.3, 5); } },
  end: { bg: '#2a2a4a', html: () => bzShot(`${wiRoom(true, '3:00')}${wiChar('kid', 540, 1300, 1.1)}`, wiSay('q', 'HOW MANY HOURS DID YOU SLEEP?', 540, 1560, -3, '#f6c744', BZ.ink, 64)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'half', 'smile'); bzPop(tl, $('#q'), s.t0 + 0.3); bzIdle(tl, $('#kid'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); } },
});
