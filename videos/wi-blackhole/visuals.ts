// <lines>
const WB_LINES = [{"who": "us_wi", "t0": 0.3, "t1": 1.831}, {"who": "us_wi", "t0": 2.331, "t1": 10.419}, {"who": "us_wi", "t0": 10.819, "t1": 13.071}, {"who": "us_wi", "t0": 13.571, "t1": 20.382}, {"who": "us_wi", "t0": 20.782, "t1": 25.478}, {"who": "us_wi", "t0": 25.978, "t1": 33.14}, {"who": "us_wi", "t0": 33.54, "t1": 38.296}, {"who": "us_wi", "t0": 38.696, "t1": 40.87}, {"who": "us_wi", "t0": 41.37, "t1": 46.52}, {"who": "us_wi", "t0": 46.92, "t1": 48.938}];
// </lines>
// =====================================================================
//  WHAT IF EP.3 — falling into a black hole: the shots. Kit in ../wi-kit.ts, props in world-ep.ts.
// =====================================================================
BZ_TALK.lines = WB_LINES;
const wbSpin = (tl: gsap.core.Timeline, $: (q: string) => string, t0: number, t1: number) => tl.fromTo($('.disk'), { opacity: 0.75 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.3)) }, t0);

defineVisuals({
  hook: { bg: '#05061a', html: () => bzShot(`${wiSpace(3)}${wbHole('bh', 540, 760, 200)}<g id="k">${wiChar('kid', 540, 1800, 1.1)}</g>`, wiSay('hk', "DON'T FALL IN", 540, 1560, -4, '#ff9a3a', '#fff', 100)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'o'); bzPose(tl, $('#kid'), s.t0, { aL: 150, aR: -150 }, 0.01); bzHook(tl, $('#hk'), s.t0); wbSpin(tl, $, s.t0, s.t1);
      tl.to($('#k'), { y: -500, scale: 0.6, svgOrigin: '540 1800', rotation: 25, duration: s.t1 - K('g'), ease: 'power2.in' }, K('g')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 760); } },
  small: { bg: '#05061a', html: () => bzShot(`${wiSpace(4)}${wbHole('bh', 540, 400, 90)}<g id="k">${wiChar('kid', 540, 1500, 1.1)}</g>`, `${wiSay('ft', 'FEET', 760, 1500, 4, '#fff', BZ.ink, 70)}${wiSay('hd', 'HEAD', 760, 900, -4, '#fff', BZ.ink, 70)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'o'); wbSpin(tl, $, s.t0, s.t1); tl.set($('#ft') + ', ' + $('#hd'), { opacity: 0 }, s.t0); bzShow(tl, $('#ft'), K('p')); bzShow(tl, $('#hd'), K('p') + 0.6);
      tl.to($('#k'), { scaleY: 2.4, scaleX: 0.45, svgOrigin: '540 1300', duration: s.t1 - K('s') + 0.8, ease: 'power2.in' }, K('s') - 0.8); bzFace(tl, $('#kid'), K('s'), 'wide', 'open'); } },
  noodle: { bg: '#f6c744', html: () => bzShot(`<rect width="1080" height="1920" fill="#f6c744"/>${bzRays('ry', 540, 900, 14, 1400, '#fff', 0.3)}<g id="k">${wiChar('kid', 540, 1500, 1.3)}</g>`, wiSay('sp', 'SPAGHETTIFICATION', 540, 1560, -4, BZ.red, '#fff', 84)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'closed', 'grin'); tl.set($('#k'), { scaleY: 2.2, scaleX: 0.5, svgOrigin: '540 1300' }, s.t0); tl.to($('#k'), { rotation: 8, svgOrigin: '540 900', duration: 0.3, yoyo: true, repeat: 5 }, s.t0);
      tl.set($('#sp'), { opacity: 0 }, s.t0); bzShow(tl, $('#sp'), K('w')); } },
  giant: { bg: '#05061a', html: () => bzShot(`${wiSpace(6)}<g id="gx">${[0, 1, 2, 3].map((i) => `<path d="M540 900 m ${-500 + i * 40} 0 a ${500 - i * 40} ${260 - i * 20} 0 0 1 ${1000 - i * 80} 0" stroke="#9a7ae8" stroke-width="${30 - i * 5}" fill="none" opacity="0.35" transform="rotate(${i * 45} 540 900)"/>`).join('')}</g>${wbHole('bh', 540, 900, 120)}`, `${wiHud('MASS', '4,000,000 SUNS')}`),
    anim(tl, s, K, $) { wbSpin(tl, $, s.t0, s.t1); tl.to($('#gx'), { rotation: 60, svgOrigin: '540 900', duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.fromTo($('#bh'), { scale: 0.3, svgOrigin: '540 900' }, { scale: 1.6, duration: 0.8, ease: 'power3.out' }, K('g'));
      tl.set($('#hud'), { opacity: 0 }, s.t0); bzShow(tl, $('#hud'), K('m')); } },
  horizon: { bg: '#05061a', html: () => bzShot(`<rect width="1080" height="1920" fill="#000"/><g id="ring"><ellipse cx="540" cy="1100" rx="900" ry="120" fill="none" stroke="#ffb050" stroke-width="30" opacity="0.8"/></g><g id="k">${wiChar('kid', 540, 1000, 1.2)}</g>`, wiSay('nt', 'NOTHING.', 540, 1560, -3, '#fff', BZ.ink, 100)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'flat'); tl.fromTo($('#k'), { y: -400 }, { y: 300, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.set($('#nt'), { opacity: 0 }, s.t0); bzShow(tl, $('#nt'), K('c') + 1.0); bzFace(tl, $('#kid'), K('c') + 0.8, 'half', 'smile'); } },
  friend: { bg: '#05061a', html: () => bzShot(`${wiSpace(7)}${wbHole('bh', 540, 600, 160)}<g id="k">${wiChar('kid', 540, 980, 0.5)}<rect id="rd" x="470" y="660" width="140" height="330" fill="#ff2a1a" opacity="0"/></g>${wbShip('sh', 560, 1500, 1.2)}<g id="pf">${wiChar('pal', 610, 1640, 0.45)}</g>`, `${bzVignette(0.6)}`),
    anim(tl, s, K, $) { wbSpin(tl, $, s.t0, s.t1); bzFace(tl, $('#kid'), s.t0, 'dot', 'flat'); bzFace(tl, $('#pal'), s.t0, 'wide', 'o'); tl.fromTo($('#k'), { y: 0 }, { y: 60, duration: K('f') - s.t0, ease: 'power3.out' }, s.t0);
      tl.to($('#rd'), { opacity: 0.45, duration: 1 }, K('f') - 1.2); tl.to($('#k'), { opacity: 0.6, duration: 1 }, K('f')); } },
  inside: { bg: '#000', html: () => bzShot(`<rect width="1080" height="1920" fill="#05000a"/>${[...Array(12)].map((_, i) => { const a = i * 30 * Math.PI / 180; return `<path class="ar" d="M${540 + Math.cos(a) * 800} ${900 + Math.sin(a) * 800} L ${540 + Math.cos(a) * 160} ${900 + Math.sin(a) * 160}" stroke="#ffb050" stroke-width="16" opacity="0.7" marker-end=""/>`; }).join('')}<circle cx="540" cy="900" r="120" fill="#000" stroke="#ffd27a" stroke-width="10"/>`, wiSay('nl', 'NOT EVEN LIGHT', 540, 1560, -3, '#fff', BZ.ink, 90)),
    anim(tl, s, K, $) { tl.fromTo($('.ar'), { opacity: 0 }, { opacity: 0.8, duration: 0.2, stagger: 0.1 }, s.t0); tl.to($('#cam'), { scale: 1.2, svgOrigin: '540 900', duration: s.t1 - s.t0 }, s.t0); tl.set($('#nl'), { opacity: 0 }, s.t0); bzShow(tl, $('#nl'), K('l')); } },
  timer: { bg: '#05000a', html: () => bzShot(`<rect width="1080" height="1920" fill="#05000a"/>${wbTimer('tm', '1:00')}<g id="k">${wiChar('kid', 540, 1750, 0.9)}</g>`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'flat'); tl.fromTo($('#tm'), { scale: 0.8, svgOrigin: '540 870' }, { scale: 1.1, duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((s.t1 - K('t')) / 0.5)) }, K('t')); } },
  center: { bg: '#05000a', html: () => bzShot(`<rect width="1080" height="1920" fill="#05000a"/>${bzGlow('cg', 540, 800, 400, '#ffd27a', 0.4)}<text id="qm" x="540" y="960" text-anchor="middle" font-family="Anton" font-size="420" fill="#ffd27a">?</text>${wiChar('doc', 540, 1800, 0.9)}`, wiSay('nk', 'NOBODY KNOWS', 540, 1560, -3, BZ.red, '#fff', 90)),
    anim(tl, s, K, $) { bzFace(tl, $('#doc'), s.t0, 'wide', 'o'); tl.fromTo($('#qm'), { scale: 0.5, svgOrigin: '540 800' }, { scale: 1, duration: 0.6, ease: 'back.out(2)' }, s.t0 + 0.2); tl.set($('#nk'), { opacity: 0 }, s.t0); bzShow(tl, $('#nk'), K('n'));
      bzPose(tl, $('#doc'), K('n'), { aL: 120, aR: -120 }, 0.3); } },
  end: { bg: '#05061a', html: () => bzShot(`${wiSpace(3)}${wbHole('bh', 540, 760, 200)}${wiChar('kid', 540, 1800, 1.1)}`, wiSay('q', 'WOULD YOU JUMP IN?', 540, 1560, -4, '#ff9a3a', '#fff', 90)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'grin'); wbSpin(tl, $, s.t0, s.t1); bzPop(tl, $('#q'), s.t0 + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 760); } },
});
