// <lines>
const WE_LINES = [{"who": "us_wi", "t0": 0.3, "t1": 2.197}, {"who": "us_wi", "t0": 2.697, "t1": 8.861}, {"who": "us_wi", "t0": 9.261, "t1": 17.963}, {"who": "us_wi", "t0": 18.363, "t1": 22.072}, {"who": "us_wi", "t0": 22.572, "t1": 28.389}, {"who": "us_wi", "t0": 28.789, "t1": 33.972}, {"who": "us_wi", "t0": 34.372, "t1": 40.492}, {"who": "us_wi", "t0": 40.892, "t1": 43.333}];
// </lines>
// =====================================================================
//  WHAT IF EP.5 — the Earth stopped spinning: the shots. Kit in ../wi-kit.ts, props in world-ep.ts.
// =====================================================================
BZ_TALK.lines = WE_LINES;

defineVisuals({
  hook: { bg: '#05061a', html: () => bzShot(`${wiSpace(2)}${wiEarth('ea', 540, 900, 340)}`, `${wiSay('hk', 'EARTH STOPS', 540, 1560, -4, BZ.red, '#fff', 110)}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); tl.fromTo($('#ea .land'), { x: 0 }, { x: -600, duration: K('s') - s.t0, ease: 'none' }, s.t0); tl.to($('#ea .land'), { x: -640, duration: 0.25, ease: 'power3.out' }, K('s'));
      bzHit(tl, $('#fl'), K('s'), 0.4); bzShake(tl, $('#cam'), K('s'), K('s') + 0.5, 8); } },
  speed: { bg: '#5ab0f0', html: () => bzShot(`${wiCity(3)}${weSpeed('sp')}${wiChar('kid', 540, 1800, 0.9)}`, wiHud('EQUATOR', 'SPINNING')),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'smile'); tl.fromTo($('#sp .nd'), { rotation: -80, svgOrigin: '540 1000' }, { rotation: 60, duration: K('m') - s.t0 + 0.5, ease: 'power2.out' }, s.t0); bzIdle(tl, $('#kid'), s.t0, s.t1); } },
  fly: { bg: '#5ab0f0', html: () => bzShot(`${wiCity(4)}${weTree('tr', 200, 1520, 1)}${weHouse('hs', 760, 1520, 1)}${weCar('car', 420, 1720, 1)}<g id="k">${wiChar('kid', 600, 1800, 1)}</g>${wiWind('wd', 300, 1800, 14)}`, wiSay('ea', 'EAST →', 540, 640, -3, '#fff', BZ.ink, 100)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'smile'); tl.set($('#wd'), { opacity: 0 }, s.t0); bzFace(tl, $('#kid'), K('s'), 'wide', 'open'); tl.set($('#wd'), { opacity: 1 }, K('s')); wiWindGo(tl, $('#wd'), K('s'), s.t1);
      tl.to($('#k'), { x: 1400, rotation: 360, svgOrigin: '600 1500', duration: 1.2, ease: 'power2.in' }, K('f')); tl.set($('#ea'), { opacity: 0 }, s.t0); bzShow(tl, $('#ea'), K('f'));
      tl.to($('#car'), { x: 1400, rotation: 90, svgOrigin: '420 1700', duration: 1, ease: 'power2.in' }, K('c')); tl.to($('#hs'), { x: 1400, rotation: 40, svgOrigin: '760 1500', duration: 1.2, ease: 'power2.in' }, K('c') + 0.2); tl.to($('#tr'), { x: 1500, rotation: 70, svgOrigin: '200 1500', duration: 1.1, ease: 'power2.in' }, K('c') + 0.4); } },
  winds: { bg: '#8aa0c8', html: () => bzShot(`${bzSky('#6a7a9a', '#c8d0e0')}<rect y="1500" width="1080" height="440" fill="#5a6a4a" ${bzO()}/>${[150, 450, 750, 1000].map((x) => `<g class="bt" transform="translate(${x} 1500)"><rect x="-14" y="-200" width="28" height="200" fill="#6a4a2a"/><circle cx="0" cy="-240" r="70" fill="#3fa84a" ${bzO()}/></g>`).join('')}${wiWind('wd', 200, 1700, 22, '#fff')}`, wiSay('ss', 'FASTER THAN SOUND', 540, 640, -3, BZ.red, '#fff', 90)),
    anim(tl, s, K, $) { wiWindGo(tl, $('#wd'), s.t0, s.t1); tl.to($('.bt'), { rotation: 70, duration: 0.3, stagger: 0.08, ease: 'power2.out' }, K('w')); tl.set($('#ss'), { opacity: 0 }, s.t0); bzShow(tl, $('#ss'), K('w')); bzShake(tl, $('#cam'), K('w'), s.t1, 6); } },
  poles: { bg: '#05061a', html: () => bzShot(`${wiSpace(5)}${weMap('mp')}`, `${wiSay('nn', 'NORTH POLE', 540, 380, -3, '#fff', BZ.ink, 70)}${wiSay('ss', 'SOUTH POLE', 540, 1560, 3, '#fff', BZ.ink, 70)}`),
    anim(tl, s, K, $) { tl.to($('#mp .polN'), { height: 340, duration: 2, ease: 'power1.inOut' }, K('o')); tl.to($('#mp .polS'), { y: -140, height: 340, duration: 2, ease: 'power1.inOut' }, K('o')); tl.to($('#mp .eqw'), { opacity: 0, duration: 2 }, K('o'));
      tl.set($('#nn') + ', ' + $('#ss'), { opacity: 0 }, s.t0); bzShow(tl, $('#nn'), K('o') + 0.5); bzShow(tl, $('#ss'), K('o') + 0.9); } },
  belt: { bg: '#05061a', html: () => bzShot(`${wiSpace(5)}${weMap('mp')}`, wiSay('nc', 'NEW SUPERCONTINENT', 540, 1560, -3, '#f6c744', BZ.ink, 80)),
    anim(tl, s, K, $) { tl.set($('#mp .polN'), { height: 340 }, s.t0); tl.set($('#mp .polS'), { y: -140, height: 340 }, s.t0); tl.set($('#mp .eqw'), { opacity: 0 }, s.t0); tl.to($('#mp .belt'), { opacity: 1, duration: 0.6 }, K('r'));
      tl.set($('#nc'), { opacity: 0 }, s.t0); bzShow(tl, $('#nc'), K('r') + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 900); } },
  daynight: { bg: '#05061a', html: () => bzShot(`<rect x="0" y="0" width="540" height="1920" fill="#ffd27a"/>${wiSun('su', 200, 400, 140)}<rect x="540" y="0" width="540" height="1920" fill="#0a1028"/>${bzStars(30, 8, 1500).replace(/<circle cx="(\d+)"/g, (m, x) => `<circle cx="${540 + (+x % 540)}"`)}
      <rect y="1500" width="540" height="440" fill="#c8a86a" ${bzO()}/><rect x="540" y="1500" width="540" height="440" fill="#e8f0f8" ${bzO()}/>${wiChar('kid', 270, 1700, 1.0)}${wiChar('pal', 810, 1700, 1.0, true)}`, `${wiHud('1 DAY', '= 1 YEAR')}${wiSay('hot', 'BURNING', 270, 1120, -6, BZ.red, '#fff', 70)}${wiSay('cold', 'FREEZING', 810, 1120, 6, '#bfe8ff', BZ.ink, 70)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'half', 'open'); bzFace(tl, $('#pal'), s.t0, 'wide', 'flat'); tl.set($('#hot') + ', ' + $('#cold'), { opacity: 0 }, s.t0); bzShow(tl, $('#hot'), K('d')); bzShake(tl, $('#pal'), K('n'), s.t1, 3); bzShow(tl, $('#cold'), K('n')); } },
  end: { bg: '#05061a', html: () => bzShot(`<rect x="0" y="0" width="540" height="1920" fill="#ffd27a"/><rect x="540" y="0" width="540" height="1920" fill="#0a1028"/>${wiChar('kid', 540, 1800, 1.3)}`, wiSay('q', 'DAY OR NIGHT?', 540, 640, -3, '#fff', BZ.ink, 110)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'grin'); bzPose(tl, $('#kid'), s.t0 + 0.2, { aL: 120, aR: -120 }, 0.3); bzPop(tl, $('#q'), s.t0 + 0.3); bzIdle(tl, $('#kid'), s.t0, s.t1); } },
});
