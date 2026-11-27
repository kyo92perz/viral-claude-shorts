// <lines>
const WM_LINES = [{"who": "us_wi", "t0": 0.3, "t1": 2.643}, {"who": "us_wi", "t0": 3.143, "t1": 9.521}, {"who": "us_wi", "t0": 9.921, "t1": 16.119}, {"who": "us_wi", "t0": 16.519, "t1": 24.005}, {"who": "us_wi", "t0": 24.405, "t1": 30.961}, {"who": "us_wi", "t0": 31.361, "t1": 37.257}, {"who": "us_wi", "t0": 37.657, "t1": 44.92}, {"who": "us_wi", "t0": 45.32, "t1": 47.372}, {"who": "us_wi", "t0": 47.872, "t1": 49.45}];
// </lines>
// =====================================================================
//  WHAT IF EP.2 — the Moon disappeared: the shots. Kit in ../wi-kit.ts, props in world-ep.ts.
// =====================================================================
BZ_TALK.lines = WM_LINES;
const wmWaves = (tl: gsap.core.Timeline, $: (q: string) => string, t0: number, t1: number) => tl.fromTo($('.wv'), { x: -20 }, { x: 20, duration: 1, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 1)), stagger: 0.1, ease: 'sine.inOut' }, t0);

defineVisuals({
  hook: { bg: '#05081c', html: () => bzShot(`${wiBeach(true)}${wiMoon('mo', 540, 640, 200)}${wiChar('kid', 760, 1720, 1.1)}`, `${wiSay('hk', 'THE MOON IS GONE', 540, 1560, -4, '#f6c744', BZ.ink, 92)}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'smile'); bzPose(tl, $('#kid'), s.t0, { aR: -140 }, 0.01); wmWaves(tl, $, s.t0, s.t1); tl.set($('#hk'), { opacity: 0 }, s.t0);
      tl.to($('#mo'), { scale: 0, svgOrigin: '540 640', duration: 0.25, ease: 'back.in(2)' }, K('g') - 0.25); bzHit(tl, $('#fl'), K('g'), 0.5); bzShow(tl, $('#hk'), K('g')); bzFace(tl, $('#kid'), K('g'), 'wide', 'open'); } },
  dark: { bg: '#05081c', html: () => bzShot(`${wiBeach(true)}${wiChar('kid', 540, 1720, 1.2)}<rect id="dk" width="1080" height="1920" fill="#000" opacity="0"/><g id="ey"><circle cx="510" cy="1180" r="10" fill="#fff"/><circle cx="570" cy="1180" r="10" fill="#fff"/></g>`, wiSay('gn', 'GONE', 540, 640, -3, '#fff', BZ.ink, 110)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'wide', 'flat'); tl.set($('#ey'), { opacity: 0 }, s.t0); tl.to($('#dk'), { opacity: 0.85, duration: 0.6 }, K('d')); tl.set($('#ey'), { opacity: 1 }, K('d') + 0.6);
      tl.set($('#gn'), { opacity: 0 }, s.t0); bzShow(tl, $('#gn'), K('g')); } },
  tides: { bg: '#5ab0f0', html: () => bzShot(`${wiBeach(false)}<g id="mo">${wiMoon('m', 860, 380, 110)}</g><path id="hi" d="M-20 1440 H1100" stroke="#fff" stroke-width="10" stroke-dasharray="40 20"/>`, `${wiHud('TIDES', '1/3')}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { wmWaves(tl, $, s.t0, s.t1); tl.fromTo($('#sea'), { y: 0 }, { y: -80, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, K('p') - 0.3); tl.set($('#hud'), { opacity: 0 }, s.t0);
      tl.to($('#mo'), { opacity: 0, duration: 0.3 }, K('s') - 0.5); tl.to($('#sea'), { y: 180, duration: 1.2, ease: 'power2.out' }, K('s')); bzShow(tl, $('#hud'), K('s')); } },
  turtles: { bg: '#05081c', html: () => bzShot(`${wiBeach(true)}${wmCoral(200, 1350, 0.7)}${wmCoral(880, 1380, 0.6, '#f6c744')}<g id="city">${bzGlow('cg', 900, 1900, 500, '#ffc860', 0.5)}</g>${[0, 1, 2, 3].map((i) => wmTurtle('t' + i, 300 + i * 120, 1620 + (i % 2) * 70, 0.9, 160)).join('')}`, wiSay('lo', 'LOST', 540, 640, -3, BZ.red, '#fff', 110)),
    anim(tl, s, K, $) { wmWaves(tl, $, s.t0, s.t1); for (let i = 0; i < 4; i++) tl.to($('#t' + i), { x: 160 + i * 30, y: 260, duration: s.t1 - K('t'), ease: 'none' }, K('t'));
      tl.set($('#lo'), { opacity: 0 }, s.t0); bzShow(tl, $('#lo'), K('t') + 1.0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1600); } },
  owl: { bg: '#05081c', html: () => bzShot(`${bzSky('#05081c', '#1c2448')}${bzStars(60, 6, 1100)}<path d="M-20 1100 Q 300 980 600 1100 L 1100 1060 L 1100 1940 L -20 1940 Z" fill="#0e1a14" ${bzO()}/><path d="M760 1940 V 760 M760 900 L 960 780" stroke="#2a1e16" stroke-width="40" stroke-linecap="round"/>${wmOwl('ow', 900, 700, 1.1)}<g id="ms"><ellipse cx="300" cy="1640" rx="50" ry="30" fill="#9a8a7a" ${bzO('stroke-width="5"')}/><circle cx="345" cy="1625" r="16" fill="#9a8a7a" ${bzO('stroke-width="4"')}/></g>`, wiSay('rh', 'NO RHYTHM', 540, 380, -3, '#fff', BZ.ink, 90)),
    anim(tl, s, K, $) { tl.fromTo($('#ow .eyes'), { scaleY: 1, transformOrigin: '50% 50%' }, { scaleY: 0.1, duration: 0.1, yoyo: true, repeat: 3 }, s.t0 + 1); tl.to($('#ms'), { x: -500, duration: 1.0, ease: 'power2.in' }, K('h'));
      tl.set($('#rh'), { opacity: 0 }, s.t0); bzShow(tl, $('#rh'), K('h') + 0.6); tl.fromTo($('#ow'), { rotation: -8, svgOrigin: '900 760' }, { rotation: 8, duration: 0.8, yoyo: true, repeat: 3 }, s.t0); } },
  top: { bg: '#05061a', html: () => bzShot(`${wiSpace(2)}${wmTop('tp', 540, 900, 280)}${wiMoon('mo', 900, 1350, 70)}`, wiSay('st', 'STEADY', 540, 1560, -3, '#fff', BZ.ink, 90)),
    anim(tl, s, K, $) { tl.set($('#tp'), { rotation: 23, svgOrigin: '540 900' }, s.t0); tl.fromTo($('#tpe .land'), { x: 0 }, { x: -300, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.fromTo($('#mo'), { rotation: 0 }, { rotation: 90, svgOrigin: '540 900', duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      tl.set($('#st'), { opacity: 0 }, s.t0); bzShow(tl, $('#st'), K('t')); } },
  wobble: { bg: '#05061a', html: () => bzShot(`${wiSpace(3)}${wmTop('tq', 540, 900, 280)}`, `${wiSay('ia', 'ICE AGES', 300, 1520, -6, '#bfe8ff', BZ.ink, 80)}${wiSay('sc', 'SCORCHING SUMMERS', 640, 1640, 4, '#ff7a3a', '#fff', 70)}${bzFlash('fl', '#bfe8ff')}`),
    anim(tl, s, K, $) { tl.set($('#tq'), { rotation: 23, svgOrigin: '540 900' }, s.t0); tl.fromTo($('#tqe .land'), { x: 0 }, { x: -380, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      tl.to($('#tq'), { rotation: -40, svgOrigin: '540 900', duration: 0.5, yoyo: true, repeat: Math.floor((s.t1 - K('w')) / 0.5), ease: 'sine.inOut' }, K('w')); tl.set($('#ia') + ', ' + $('#sc'), { opacity: 0 }, s.t0);
      bzShow(tl, $('#ia'), K('i')); bzHit(tl, $('#fl'), K('i'), 0.4); bzShow(tl, $('#sc'), K('s')); } },
  eclipse: { bg: '#05061a', html: () => bzShot(`${wiSpace(4)}${wiSun('su', 540, 900, 260)}<g id="mo"><circle cx="540" cy="900" r="250" fill="#0a0a14" ${bzO()}/></g>`, `${wiSay('nm', 'NO MORE ECLIPSES', 540, 1560, -3, BZ.red, '#fff', 84)}`),
    anim(tl, s, K, $) { tl.fromTo($('#mo'), { x: -700 }, { x: 0, duration: K('e') - s.t0, ease: 'power1.out' }, s.t0); tl.to($('#mo'), { opacity: 0, duration: 0.15 }, K('v')); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), K('v')); } },
  end: { bg: '#05081c', html: () => bzShot(`${wiBeach(true)}<g id="mo" opacity="0">${wiMoon('m', 540, 640, 200)}</g>${wiChar('kid', 760, 1720, 1.1)}`, wiSay('q', 'WOULD YOU MISS IT?', 540, 1560, -3, '#f6c744', BZ.ink, 84)),
    anim(tl, s, K, $) { bzFace(tl, $('#kid'), s.t0, 'dot', 'smile'); bzPose(tl, $('#kid'), s.t0, { aR: -140 }, 0.01); wmWaves(tl, $, s.t0, s.t1); bzPop(tl, $('#q'), s.t0 + 0.3); tl.to($('#mo'), { opacity: 1, duration: 1.2 }, s.t0 + 0.8); } },
});
