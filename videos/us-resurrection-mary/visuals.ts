// <lines>
const RM_LINES = [{"who": "us_man", "t0": 0.3, "t1": 6.087}, {"who": "us_man", "t0": 6.687, "t1": 12.732}, {"who": "us_man", "t0": 13.232, "t1": 19.193}, {"who": "us_ghost", "t0": 19.793, "t1": 22.357}, {"who": "us_man", "t0": 22.957, "t1": 26.824}, {"who": "us_man", "t0": 27.424, "t1": 33.0}, {"who": "us_ghost", "t0": 33.6, "t1": 36.49}, {"who": "us_man", "t0": 37.29, "t1": 40.571}, {"who": "us_man", "t0": 41.271, "t1": 46.045}, {"who": "us_man", "t0": 46.745, "t1": 51.106}, {"who": "us_man", "t0": 51.706, "t1": 58.823}, {"who": "us_man", "t0": 59.423, "t1": 63.491}];
// </lines>
// =====================================================================
//  RESURRECTION MARY: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s.
//  In the car the camera sits on the hood looking in: Nick on the left, the passenger seat on the right; the seat back
//  (drawn over them) hides everything under the chest.
// =====================================================================
BZ_TALK.lines = RM_LINES;
const rmSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const rmClose = (k: string, s: number, bg: string, id = k) => `${bg}${rmChar(k, 540, 507 * s + 640, s, false, id)}`;
const rmSnow = (id: string, seed = 1) => bzParticles(id, 'dust', 40, [0, 0, 1080, 1900], seed);
// the inside of the car with two busts (who: 'both' | 'nick' | 'empty'); the seat backs cover them below the chest
const rmInside = (who: string, frost = false) => `${rmCar()}${who !== 'empty' ? rmChar('nick', 300, 2010, 2.0) : ''}${who === 'both' ? rmChar('mary', 800, 2010, 2.0) : ''}
  <rect x="-20" y="1420" width="1120" height="520" fill="#6a2a2a" ${bzO()}/><path d="M540 1420 V1940" stroke="#4a1a1a" stroke-width="10"/><path d="M80 1440 h380 M620 1440 h380" stroke="#8a3a3a" stroke-width="14"/>
  ${frost ? `<g id="frost">${[...Array(16)].map((_, i) => `<path d="M${640 + (i * 53) % 330} ${1440 + (i * 37) % 300} l 20 -20 m -20 0 l 20 20" stroke="#cfeaff" stroke-width="6"/>`).join('')}<ellipse cx="800" cy="1520" rx="200" ry="60" fill="#cfeaff" opacity="0.35"/></g>` : ''}`;
const rmWipe = (tl: gsap.core.Timeline, $: (q: string) => string, t0: number, t1: number) => { tl.fromTo($('.wp1'), { rotation: 0, svgOrigin: '300 880' }, { rotation: -40, duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.6)), ease: 'sine.inOut' }, t0);
  tl.fromTo($('.wp2'), { rotation: 0, svgOrigin: '780 880' }, { rotation: -40, duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.6)), ease: 'sine.inOut' }, t0); };

defineVisuals({
  // ---------------- the hook: a girl in white under a lamp, frame 1
  hook: { bg: '#060812', html: () => bzShot(`${rmRoad()}${bzGlow('mg', 540, 1300, 380, '#9ad8ff', 0.25)}${rmChar('mary', 540, 1800, 1.5)}${rmSnow('sn', 2)}`, `${rmSay('hk', "DON'T STOP", 540, 1560, -4, '#9ad8ff', BZ.ink, 110)}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'half', 'smile'); bzPose(tl, $('#mary'), s.t0 + 0.4, { aR: -150 }, 0.3); tl.fromTo($('#mary .aR'), { rotation: -150 }, { rotation: -120, duration: 0.4, yoyo: true, repeat: 5 }, s.t0 + 0.7);
      bzFace(tl, $('#mary'), K('h'), 'glow', 'flat'); bzHook(tl, $('#hk'), s.t0); bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1000); } },
  title: { bg: '#060812', html: () => bzShot(`${rmRoad()}<g id="hl">${bzGlow('h1', 380, 1500, 260, '#fff4c0', 0.4)}${bzGlow('h2', 700, 1500, 260, '#fff4c0', 0.4)}</g>${rmSnow('sn', 3)}`, `${rmSay('tt', 'RESURRECTION MARY', 540, 400, -4, '#9ad8ff', BZ.ink, 110)}${bzFlash('fl', '#9ad8ff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.fromTo($('#hl'), { x: -900 }, { x: 900, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.35); } },
  // ---------------- the drive
  drive: { bg: '#14161e', html: () => bzShot(rmInside('nick'), rmSay('nm', 'CHICAGO, 2 AM', 540, 360, -3, '#fff', BZ.ink, 90)),
    anim(tl, s, K, $) { bzFace(tl, $('#nick'), s.t0, 'half', 'smile'); bzBlink(tl, $('#nick'), s.t0, s.t1); bzBob(tl, $('#nick'), s.t0, s.t1, 3); rmWipe(tl, $, s.t0, s.t1); bzPop(tl, $('#nm'), s.t0 + 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },
  see: { bg: '#060812', html: () => bzShot(`${rmRoad()}<g id="mr">${bzGlow('mg', 760, 1380, 200, '#9ad8ff', 0.3)}${rmChar('mary', 760, 1440, 0.4)}</g>${rmSnow('sn', 4)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); bzFace(tl, $('#mary'), s.t0, 'half', 'flat'); tl.set($('#mr'), { opacity: 0 }, s.t0); tl.to($('#mr'), { opacity: 1, duration: 0.2 }, K('s'));
      tl.to($('#mr'), { scale: 2.6, svgOrigin: '760 1440', duration: s.t1 - K('s'), ease: 'power1.in' }, K('s')); bzHandheld(tl, $('#cam'), s.t0, s.t1, 3); } },
  ask: { bg: '#060812', html: () => bzShot(rmClose('mary', 2.2, `${rmRoad()}`), `<rect x="-20" y="-20" width="1120" height="1960" fill="none" stroke="#14161e" stroke-width="120"/>${rmSnow('sn', 5)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'half', 'smile'); bzTalk(tl, $('#mary'), 'us_ghost', s.t0, s.t1, 'smile', 'o'); bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 650); } },
  // ---------------- in the car
  cold: { bg: '#14161e', html: () => bzShot(rmInside('both', true), rmSay('ic', 'ICE COLD', 540, 360, -3, '#cfeaff', BZ.ink, 100)),
    anim(tl, s, K, $) { bzFace(tl, $('#nick'), s.t0, 'dot', 'smile'); bzFace(tl, $('#mary'), s.t0, 'half', 'flat'); tl.set($('#frost'), { opacity: 0 }, s.t0); tl.to($('#frost'), { opacity: 1, duration: 0.6 }, K('c') - 0.3);
      bzFace(tl, $('#nick'), K('c'), 'wide', 'o'); bzShake(tl, $('#nick'), K('c'), K('c') + 0.5, 3); tl.set($('#ic'), { opacity: 0 }, s.t0); bzShow(tl, $('#ic'), K('c')); rmWipe(tl, $, s.t0, s.t1); } },
  smell: { bg: '#14161e', html: () => bzShot(`${rmInside('both')}${bzParticles('pt', 'spores', 22, [560, 700, 1080, 1400], 3)}`, `${rmSay('of', 'OLD FLOWERS', 780, 600, 4, '#fff', BZ.ink, 80)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#nick'), s.t0, 'half', 'flat'); bzFace(tl, $('#mary'), s.t0, 'half', 'flat'); tl.to($('#mary .hd'), { rotation: 20, transformOrigin: '50% 90%', duration: 0.6 }, s.t0 + 0.3);
      bzParticlesGo(tl, $('#pt'), 'spores', s.t0, s.t1); tl.set($('#of'), { opacity: 0 }, s.t0); bzShow(tl, $('#of'), K('f')); rmWipe(tl, $, s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 800, 1000); } },
  stop: { bg: '#14161e', html: () => bzShot(rmClose('mary', 2.2, `<rect width="1080" height="1920" fill="#14161e"/>`) + `<rect x="-20" y="1440" width="1120" height="520" fill="#6a2a2a" stroke="#2b2433" stroke-width="7"/><path d="M80 1460 h920" stroke="#8a3a3a" stroke-width="14"/>`, `${bzGlow('bl', 540, 700, 420, '#9ad8ff', 0.2)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'dead', 'flat'); bzTalk(tl, $('#mary'), 'us_ghost', s.t0, s.t1, 'flat', 'o'); tl.fromTo($('#mary .hd'), { rotation: 25, transformOrigin: '50% 90%' }, { rotation: 0, duration: 0.8 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 650); } },
  gates: { bg: '#060812', html: () => bzShot(`${rmGates()}${rmSnow('sn', 6)}`, `${bzFlash('fl', '#9ad8ff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); tl.fromTo($('#cam'), { scale: 1, svgOrigin: '540 420' }, { scale: 1.05, duration: K('g') - s.t0 }, s.t0); tl.to($('#cam'), { scale: 1.5, svgOrigin: '540 420', duration: 0.4, ease: 'power3.out' }, K('g')); bzHit(tl, $('#fl'), K('g'), 0.35); } },
  // ---------------- the empty seat
  turn: { bg: '#14161e', html: () => bzShot(rmClose('nick', 2.2, `<rect width="1080" height="1920" fill="#14161e"/>`) + `<rect x="-20" y="1440" width="1120" height="520" fill="#6a2a2a" stroke="#2b2433" stroke-width="7"/><path d="M80 1460 h920" stroke="#8a3a3a" stroke-width="14"/>`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#nick'), s.t0, 'dot', 'flat'); tl.to($('#nick .hd'), { rotation: 18, transformOrigin: '50% 90%', duration: 0.3 }, s.t0 + 0.6); bzFace(tl, $('#nick'), K('e'), 'wide', 'open'); bzShake(tl, $('#cam'), K('e'), K('e') + 0.4, 5); } },
  empty: { bg: '#14161e', html: () => bzShot(`${rmInside('empty', true)}<g id="door"><rect x="1000" y="900" width="80" height="1040" fill="#2a2a34" ${bzO()}/><rect x="1010" y="1300" width="30" height="80" rx="10" fill="#8a8a94"/></g>`, `${rmSay('cl', 'DOOR CLOSED', 760, 640, 4, '#fff', BZ.ink, 80)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#cl'), { opacity: 0 }, s.t0); bzShow(tl, $('#cl'), s.t0 + 0.8); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 800, 1400); } },
  walk: { bg: '#060812', html: () => bzShot(`${rmGates(false)}${rmChar('mary', 380, 1240, 0.45)}${rmSnow('sn', 7)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'closed', 'flat'); bzWalk(tl, $('#mary'), s.t0, s.t1, 0, 360); tl.to($('#mary'), { opacity: 0.3, duration: 1 }, s.t1 - 1); bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.2, 560, 1150); } },
  // ---------------- the legend
  legend: { bg: '#d8c8a8', html: () => bzShot(`<rect width="1080" height="1920" fill="#3a3028"/><rect x="190" y="360" width="700" height="900" fill="#e8dcc0" ${bzO('stroke-width="10"')}/><rect x="230" y="400" width="620" height="760" fill="#b8a888"/>
      <g id="ph">${rmChar('mary', 540, 1500, 1.3)}</g><rect x="230" y="400" width="620" height="760" fill="#a08050" opacity="0.35"/>`, `${rmSay('yr', 'ALMOST 100 YEARS AGO', 540, 1420, -3, '#fff', BZ.ink, 64)}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'dot', 'smile'); tl.set($('#yr'), { opacity: 0 }, s.t0); bzShow(tl, $('#yr'), K('y')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 800); } },
  home: { bg: '#060812', html: () => bzShot(`${rmRoad()}${rmChar('mary', 760, 1440, 0.45)}${rmSnow('sn', 8)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'closed', 'flat'); bzWalk(tl, $('#mary'), s.t0, s.t1, 0, -200); bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 700, 1300); } },
  // ---------------- the end: she waves at the camera (loops into the hook)
  end: { bg: '#060812', html: () => bzShot(`${rmRoad()}${bzGlow('mg', 540, 1300, 380, '#9ad8ff', 0.25)}${rmChar('mary', 540, 1800, 1.5)}${rmSnow('sn', 2)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'half', 'smile'); bzPose(tl, $('#mary'), K('w'), { aR: -150 }, 0.3); tl.fromTo($('#mary .aR'), { rotation: -150 }, { rotation: -120, duration: 0.4, yoyo: true, repeat: 3 }, K('w') + 0.3);
      bzFace(tl, $('#mary'), K('end') - 0.4, 'glow', 'flat'); bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1000); } },
});
