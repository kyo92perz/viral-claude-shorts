// <lines>
const BR_LINES: { who: string; t0: number; t1: number }[] = [];
// </lines>
// =====================================================================
//  A MULHER DE BRANCO: the shots (Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400; faces above ~1050 or filling the frame. Heads above the feet: the woman 517*s, Jair 507*s.
// =====================================================================
BZ_TALK.lines = BR_LINES;
const brDark = (id = 'dk', c = '#05060c', k = 0) => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="${k}"/>`;
// the cab with both of them (the woman inside #her so she can appear or vanish)
const brCabShot = (mirror = '') => `${brCab()}${brJair(270, 1700, 1.4)}<g id="her">${brMoca(800, 1700, 1.4)}</g>${brMirror(mirror)}${brWheel()}${brRain(40, 0.3)}`;
// her face close
const brFace = (y = 2100, s = 2.2) => `${bzSky('#05070f', '#1a1e34')}${brMoca(540, y, s)}${brRain(60, 0.4)}`;

defineVisuals({
  // ---------------- the hook: she is in the headlights at frame 1
  hook: { bg: '#05070f', html: () => bzShot(`${brRoad()}${brMoca(540, 1600, 1.3)}${brRain()}`, `${bzSign('hk', 'NÃO PARA!', 540, 330, -4, BZ.red, '#fff', 120)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); brRainFall(tl, $(''), s.t0, s.t1); bzHook(tl, $('#hk'), s.t0); bzPose(tl, $('#moca'), s.t0, { aR: -70 }, 0.01); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.25, 540, 900); } },
  face: { bg: '#05070f', html: () => bzShot(brFace(2600, 3.2), `${bzFlash('fl')}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); brRainFall(tl, $(''), s.t0, s.t1); bzHit(tl, $('#fl'), s.t0, 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 950); } },
  // ---------------- Seu Jair
  jair: { bg: '#05070f', html: () => bzShot(`${brRoad()}${brTruck(700, 1500, 0.9)}${brJair(250, 1560, 1.15)}`, bzSign('nm', 'SEU JAIR', 540, 330, -4, BZ.yellow, BZ.ink, 110, { text: '30 ANOS NA BR', bg: BZ.red, fg: '#fff' })),
    anim(tl, s, K, $) { bzFace(tl, $('#jair'), s.t0, 'dot', 'smile'); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), s.t0 + 0.6); bzBlink(tl, $('#jair'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  medo: { bg: '#14161e', html: () => bzShot(`${bzSky('#05070f', '#1a1e34')}${brJair(540, 1950, 2.2)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#jair'), s.t0, 'half', 'flat'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 800); } },
  // ---------------- that night
  rain: { bg: '#05070f', html: () => bzShot(`${brRoad()}<g id="tk">${brTruck(540, 1560, 0.9)}</g>${brRain()}`, bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#tk'), { x: -500 }, { x: 200, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.fromTo($('#tk .wh'), { rotation: 0, transformOrigin: '50% 50%' }, { rotation: 720, duration: s.t1 - s.t0, ease: 'none' }, s.t0); brRainFall(tl, $(''), s.t0, s.t1); } },
  km: { bg: '#05070f', html: () => bzShot(`<g transform="translate(-1558 -1644) scale(2.6)">${brRoad()}</g>${brRain()}`, bzVignette(0.7)),
    anim(tl, s, K, $) { brRainFall(tl, $(''), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 760, 1000); } },
  found: { bg: '#05070f', html: () => bzShot(`${brRoad()}<g id="mo" opacity="0">${brMoca(260, 1300, 0.55)}</g>${brRain()}`, `${bzFlash('fl')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); brRainFall(tl, $(''), s.t0, s.t1); tl.set($('#mo'), { opacity: 1 }, K('f')); bzHit(tl, $('#fl'), K('f'), 0.25); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.4, 300, 1100); } },
  stop: { bg: '#05070f', html: () => bzShot(`${brRoad()}${brTruck(560, 1560, 0.9)}${brMoca(940, 1580, 0.75)}${brRain()}`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); tl.fromTo($('#truck'), { x: -300 }, { x: 0, duration: K('b') - s.t0, ease: 'power2.out' }, s.t0); bzQuake(tl, $('#cam'), K('b'), K('b') + 0.15, 4); brRainFall(tl, $(''), s.t0, s.t1); } },
  cab: { bg: '#14161e', html: () => bzShot(brCabShot(), bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#jair'), s.t0, 'dot', 'flat'); bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); tl.fromTo($('#her'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, K('in'));
      bzFace(tl, $('#jair'), K('in') + 0.6, 'wide', 'o'); tl.fromTo($('#jair .hd'), { rotation: 0 }, { rotation: 10, transformOrigin: '50% 90%', duration: 0.4 }, K('in') + 0.5); brRainFall(tl, $(''), s.t0, s.t1); } },
  radio: { bg: '#14161e', html: () => bzShot(`<g transform="translate(-1620 -5080) scale(4)">${brCab()}</g>`, bzVignette(0.8)),
    anim(tl, s, K, $) { tl.fromTo($('#radio rect:nth-child(2)'), { opacity: 0.6 }, { opacity: 0.1, duration: 0.07, yoyo: true, repeat: Math.floor((s.t1 - K('r')) / 0.07), ease: 'steps(1)' }, K('r')); bzQuake(tl, $('#cam'), K('r'), K('r') + 0.3, 3); } },
  fog: { bg: '#14161e', html: () => bzShot(brCabShot(), `<rect id="mist" x="540" y="420" width="500" height="980" fill="#e8eef8" opacity="0"/>${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#jair'), s.t0, 'wide', 'flat'); bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); tl.to($('#mist'), { opacity: 0.55, duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0); brRainFall(tl, $(''), s.t0, s.t1); } },
  pergunta: { bg: '#14161e', html: () => bzShot(`${brCab()}${brJair(540, 1900, 2.0)}${brRain(40, 0.3)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#jair'), s.t0, 'dot', 'flat'); bzTalk(tl, $('#jair'), 'br_jair', s.t0, s.t1, 'flat', 'open'); tl.fromTo($('#jair .hd'), { rotation: 0 }, { rotation: 10, transformOrigin: '50% 90%', duration: 0.3 }, s.t0); } },
  resposta: { bg: '#14161e', html: () => bzShot(`${brCab()}${brMoca(540, 2100, 2.3)}${brRain(40, 0.3)}`, `<rect width="1080" height="1920" fill="#8ab0d8" opacity="0.08"/>${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); bzTalk(tl, $('#moca'), 'br_moca', s.t0, s.t1, 'flat', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 900); } },
  // ---------------- the mirror
  mirror: { bg: '#14161e', html: () => bzShot(`<g transform="translate(-1620 -1120) scale(4)">${brCab()}${brMirror('<rect x="372" y="452" width="336" height="106" fill="#3a4058"/><rect x="560" y="470" width="120" height="90" rx="14" fill="#5a3a3a"/><rect x="400" y="470" width="120" height="90" rx="14" fill="#5a3a3a"/>')}</g>`, bzVignette(0.8)),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 900); } },
  still: { bg: '#14161e', html: () => bzShot(brCabShot('<rect x="560" y="470" width="120" height="90" rx="14" fill="#5a3a3a"/>'), `${bzFlash('fl')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#jair'), s.t0, 'wide', 'o'); bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); tl.fromTo($('#moca .hd'), { rotation: 0 }, { rotation: -14, transformOrigin: '50% 90%', duration: 0.5 }, K('l') - 0.2); bzHit(tl, $('#fl'), K('l'), 0.3); bzShake(tl, $('#jair'), K('l'), s.t1, 3); } },
  curve: { bg: '#05070f', html: () => bzShot(`${brRoad()}<g opacity="0.85" transform="translate(-200 -260) scale(0.55)">${brCemetery()}</g>${brMoca(820, 1700, 1.2)}${brRain()}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); bzPose(tl, $('#moca'), s.t0 + 0.4, { aR: -110 }, 0.4); brRainFall(tl, $(''), s.t0, s.t1); } },
  cemetery: { bg: '#05070f', html: () => bzShot(`${brCemetery()}${brRain(50, 0.35)}`, `${bzSign('cm', 'CEMITÉRIO', 540, 420, -4, '#fff', BZ.ink, 110)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.fromTo($('.candle'), { opacity: 1 }, { opacity: 0.55, duration: 0.12, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.12), stagger: 0.05 }, s.t0); tl.set($('#cm'), { opacity: 0 }, s.t0); bzShow(tl, $('#cm'), K('c')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1300); brRainFall(tl, $(''), s.t0, s.t1); } },
  atropelou: { bg: '#05070f', html: () => bzShot(brFace(2650, 3.3), `<rect width="1080" height="1920" fill="${BZ.blood}" opacity="0.12"/>${bzVignette(0.9)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); bzTalk(tl, $('#moca'), 'br_moca', s.t0, s.t1, 'flat', 'open'); brRainFall(tl, $(''), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 900); } },
  // ---------------- gone
  brake: { bg: '#14161e', html: () => bzShot(brCabShot(), `${bzFlash('fl', '#fff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#jair'), s.t0, 'closed', 'open'); bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); bzQuake(tl, $('#cam'), K('b'), K('b') + 0.6, 12); bzHit(tl, $('#fl'), K('b') + 0.3, 0.6); tl.set($('#her'), { opacity: 0 }, K('b') + 0.3); bzPose(tl, $('#jair'), K('b'), { aL: 60, aR: -60 }, 0.1); } },
  seat: { bg: '#1e2030', html: () => bzShot(brSeat(), bzVignette(0.7)),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.18, 540, 1250); } },
  // ---------------- the twist
  pai: { bg: '#14161e', html: () => bzShot(`${bzSky('#05070f', '#1a1e34')}${brJair(540, 1950, 2.2)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#jair'), s.t0, 'half', 'frown'); bzBlink(tl, $('#jair'), s.t0, s.t1); } },
  photo: { bg: '#2a2018', html: () => bzShot(brPhoto(), `${bzFlash('fl')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, K('j'), 1, 1.12, 540, 1000); tl.to($('#cam'), { scale: 2.0, svgOrigin: '540 1320', duration: 0.35, ease: 'power3.out' }, K('j')); bzHit(tl, $('#fl'), K('j'), 0.4); } },
  you: { bg: '#05070f', html: () => bzShot(`${brRoad()}<g id="far">${brMoca(540, 1350, 0.5)}</g><g id="near" opacity="0">${brMoca(540, 2900, 4.0)}</g>${brRain()}`, bzVignette(0.85)),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'dead', 'flat'); brRainFall(tl, $(''), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, K('end'), 1, 1.3, 540, 1100);
      tl.set($('#far'), { opacity: 0 }, K('end')); tl.set($('#near'), { opacity: 1 }, K('end')); tl.set($('#cam'), { scale: 1 }, K('end')); } },
});
