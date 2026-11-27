// <lines>
const CC_LINES = [{"who": "cc_eu", "t0": 0.3, "t1": 6.93}, {"who": "cc_eu", "t0": 7.53, "t1": 13.897}, {"who": "cc_eu", "t0": 14.397, "t1": 20.102}, {"who": "cc_vo", "t0": 20.602, "t1": 27.051}, {"who": "cc_eu", "t0": 27.651, "t1": 32.384}, {"who": "cc_maria", "t0": 32.884, "t1": 35.291}, {"who": "cc_eu", "t0": 35.891, "t1": 43.295}, {"who": "cc_eu", "t0": 44.095, "t1": 47.967}, {"who": "cc_eu", "t0": 48.567, "t1": 54.058}, {"who": "cc_eu", "t0": 54.658, "t1": 59.6}, {"who": "cc_eu", "t0": 60.3, "t1": 63.667}, {"who": "cc_eu", "t0": 64.367, "t1": 67.278}];
// </lines>
// =====================================================================
//  O CABEÇA DE CUIA: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, kids ~400–415*s.
//  Revealed in parts: a gourd floating, turning, the eyes, the hand, the five marks. Never the whole body.
// =====================================================================
BZ_TALK.lines = CC_LINES;
const ccSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const ccClose = (k: string, s: number, bg: string, id = k) => `${bg}${ccChar(k, 540, (k === 'vo' ? 507 : 410) * s + 640, s, false, id)}`;
const ccWaves = (tl: gsap.core.Timeline, $: (q: string) => string, t0: number, t1: number) => tl.fromTo($('#wv .wv'), { x: -24 }, { x: 24, duration: 1.1, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 1.1)), stagger: 0.12, ease: 'sine.inOut' }, t0);
// water line over a head: the bottom of the frame under the water (murky)
const ccWater = (y: number, c = '#2a4a4a', op = 0.9) => `<rect x="-20" y="${y}" width="1120" height="${1960 - y}" fill="${c}" opacity="${op}"/><path d="M-20 ${y} q 60 -16 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0" stroke="#bfe0e0" stroke-width="8" fill="none" opacity="0.6"/>`;
// Maria swimming: head and arms above the water at (x, y)
const ccSwim = (x: number, y: number, s = 1) => `<g id="swim">${ccChar('maria', x, y + 507 * s * 0.45, s)}${ccWater(y, '#5a8a6a', 0.95)}</g>`;

defineVisuals({
  // ---------------- the hook: yellow eyes just above the water, frame 1
  hook: { bg: '#3a5a5a', html: () => bzShot(`${ccRiver(CC_PAL.dusk, false)}${ccHead('cc', 540, 1050, 1.6)}${ccWater(1150)}`, `${ccSay('hk', 'SE VOCÊ É MARIA...', 540, 1560, -4, BZ.yellow, BZ.ink, 92)}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); ccWaves(tl, $, s.t0, s.t1); tl.fromTo($('#cc'), { y: 60 }, { y: 0, duration: s.t1 - s.t0, ease: 'sine.out' }, s.t0);
      tl.fromTo($('#cc .eyes'), { scaleY: 1, transformOrigin: '50% 50%' }, { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1 }, K('h')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1100); } },
  title: { bg: '#3a5a5a', html: () => bzShot(`${ccRiver(CC_PAL.dusk)}${ccDome('dm', 640, 1160, 0.55)}`, `${ccSay('tt', 'O CABEÇA DE CUIA', 540, 380, -4, BZ.yellow, BZ.ink, 110)}${bzFlash('fl', '#ffd23a')}`),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); tl.fromTo($('#dm'), { x: 120, rotation: 0 }, { x: -140, rotation: 10, svgOrigin: '640 1160', duration: s.t1 - s.t0, ease: 'sine.inOut' }, s.t0);
      tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.35); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 640, 1100); } },
  // ---------------- Teresina, Maria
  city: { bg: '#4a9ad8', html: () => bzShot(`${ccRiver()}${ccChar('pedro', 360, 1680, 1.1)}${ccChar('maria', 680, 1680, 1.1, true)}`, `${ccSay('nm', 'TERESINA, PIAUÍ', 540, 360, -3, '#fff', BZ.ink, 90)}${ccSay('mr', 'MARIA', 700, 820, 4, BZ.yellow, BZ.ink, 80)}`),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); bzFace(tl, $('#pedro'), s.t0, 'dot', 'smile'); bzFace(tl, $('#maria'), s.t0, 'closed', 'grin'); bzIdle(tl, $('#pedro'), s.t0, s.t1); bzIdle(tl, $('#maria'), s.t0, s.t1, 2);
      tl.set($('#nm') + ', ' + $('#mr'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), s.t0 + 0.4); bzShow(tl, $('#mr'), K('m')); bzPose(tl, $('#maria'), K('m'), { aL: 150 }, 0.25); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  // ---------------- the legend
  vo: { bg: '#e86a3a', html: () => bzShot(`${ccPorch()}${ccChar('vo', 380, 1700, 1.2)}${ccChar('pedro', 720, 1720, 0.95, true)}`, bzVignette(0.55)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'flat'); bzFace(tl, $('#pedro'), s.t0, 'dot', 'smile'); bzPose(tl, $('#vo'), K('c'), { aR: -120 }, 0.3); bzFace(tl, $('#pedro'), K('c') + 0.3, 'wide', 'o'); bzIdle(tl, $('#vo'), s.t0, s.t1);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); } },
  crispim: { bg: '#2a1e1a', html: () => bzShot(`<rect width="1080" height="1920" fill="#3a2a22"/><rect y="1300" width="1080" height="640" fill="#2a1e18"/>
      <g id="son"><g transform="translate(380 1500)"><rect x="-60" y="-520" width="120" height="420" rx="60" fill="#141014"/><circle cx="0" cy="-620" r="100" fill="#141014"/><path d="M50 -420 L 230 -560" stroke="#141014" stroke-width="44" stroke-linecap="round"/><path d="M230 -560 L 300 -620" stroke="#e8dcc0" stroke-width="30" stroke-linecap="round"/><rect x="-60" y="-120" width="40" height="140" fill="#141014"/><rect x="20" y="-120" width="40" height="140" fill="#141014"/></g></g>
      <g transform="translate(760 1500)"><path d="M-100 0 L -80 -420 Q 0 -460 80 -420 L 100 0 Z" fill="#141014"/><circle cx="0" cy="-520" r="90" fill="#141014"/><circle cx="0" cy="-600" r="40" fill="#141014"/></g>`,
      `${ccSay('nm', 'CRISPIM', 540, 360, -3, '#fff', BZ.ink, 100)}${ccSay('mal', 'AMALDIÇOADO', 540, 1580, 3, BZ.yellow, BZ.ink, 90)}${bzFlash('fl', '#ffd23a')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { tl.set($('#nm') + ', ' + $('#mal'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), s.t0 + 0.2); tl.fromTo($('#son'), { rotation: 0 }, { rotation: 8, svgOrigin: '380 1500', duration: 0.15, yoyo: true, repeat: 1 }, K('b') - 0.1);
      bzHit(tl, $('#fl'), K('b'), 0.3); bzShow(tl, $('#mal'), K('a')); bzShake(tl, $('#cam'), K('a'), K('a') + 0.5, 6); } },
  curse: { bg: '#3a5a5a', html: () => bzShot(`${ccRiver(CC_PAL.dusk, false)}${ccHead('cc', 540, 900, 1.9)}${ccWater(1240, '#2a4a4a', 0.85)}`, `<g id="seven">${[...Array(7)].map((_, i) => `<g class="m${i}" opacity="0"><circle cx="${150 + i * 130}" cy="1560" r="48" fill="#fff" ${bzO()}/><text x="${150 + i * 130}" y="1580" text-anchor="middle" font-family="Anton" font-size="52" fill="${BZ.ink}">M</text></g>`).join('')}</g>${bzVignette(0.7)}`),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); tl.fromTo($('#cc'), { y: 300 }, { y: 0, duration: 0.8, ease: 'power2.out' }, K('c') - 0.5); tl.fromTo($('#cc .hair'), { rotation: -2, transformOrigin: '50% 0%' }, { rotation: 2, duration: 0.8, yoyo: true, repeat: 5, ease: 'sine.inOut' }, s.t0);
      for (let i = 0; i < 7; i++) tl.to($(`#seven .m${i}`), { opacity: 1, duration: 0.1 }, K('n') + i * 0.12); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); } },
  // ---------------- the Sunday
  laugh: { bg: '#4a9ad8', html: () => bzShot(`${ccRiver()}${ccChar('pedro', 300, 1700, 1.1)}<g id="mj">${ccChar('maria', 720, 1680, 1.1)}</g>${bzParticles('sp', 'bubbles', 16, [600, 1000, 900, 1250], 3)}`, ''),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); bzFace(tl, $('#pedro'), s.t0, 'closed', 'grin'); bzFace(tl, $('#maria'), s.t0, 'closed', 'grin'); bzShake(tl, $('#pedro'), s.t0, s.t0 + 1.2, 3); bzShake(tl, $('#maria'), s.t0, s.t0 + 1.2, 3);
      bzPose(tl, $('#maria'), K('j') - 0.4, { aL: 170, aR: -170 }, 0.2); tl.to($('#mj'), { x: 60, y: -260, duration: 0.3, ease: 'power2.out' }, K('j') - 0.3); tl.to($('#mj'), { y: 200, opacity: 0, duration: 0.3, ease: 'power2.in' }, K('j'));
      bzParticlesGo(tl, $('#sp'), 'bubbles', K('j'), s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  vem: { bg: '#4a9ad8', html: () => bzShot(`${ccRiver(CC_PAL.day, false)}${ccSwim(540, 1160, 2.0)}`, ''),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); bzFace(tl, $('#maria'), s.t0, 'closed', 'grin'); bzTalk(tl, $('#maria'), 'cc_maria', s.t0, s.t1, 'grin', 'open'); bzPose(tl, $('#maria'), s.t0, { aR: -150 }, 0.2);
      tl.to($('#maria .aR'), { rotation: -120, duration: 0.2, yoyo: true, repeat: 5 }, s.t0 + 0.3); tl.fromTo($('#swim'), { y: -10 }, { y: 10, duration: 0.6, yoyo: true, repeat: 5, ease: 'sine.inOut' }, s.t0); } },
  // ---------------- the gourd
  dome: { bg: '#4a9ad8', html: () => bzShot(`${ccRiver(CC_PAL.day, false)}${ccDome('dm', 360, 1150, 0.7)}<g transform="translate(300 0)">${ccSwim(540, 1100, 0.9)}</g>${ccWater(1300, '#5a8a6a', 0.5)}`, `${ccSay('cu', 'UMA CUIA?', 360, 760, -5, '#fff', BZ.ink, 80)}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); bzFace(tl, $('#maria'), s.t0, 'closed', 'smile'); tl.fromTo($('#dm'), { x: -400 }, { x: 0, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.set($('#cu'), { opacity: 0 }, s.t0); bzShow(tl, $('#cu'), K('d'));
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 500, 1150); } },
  spin: { bg: '#3a5a5a', html: () => bzShot(`<g transform="translate(-540 -1180) scale(2)">${ccRiver(CC_PAL.day, false)}</g>${ccDome('dm', 540, 1150, 1.4)}${ccWater(1150, '#5a8a6a', 0.6)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { tl.fromTo($('#dm'), { rotation: -6 }, { rotation: 6, svgOrigin: '540 1150', duration: 1.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, s.t0); tl.fromTo($('#dm'), { x: -60 }, { x: 60, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1100); } },
  eyes: { bg: '#3a5a5a', html: () => bzShot(`${ccRiver(CC_PAL.day, false)}${ccHead('cc', 540, 1150, 1.8, false)}${ccWater(1200, '#4a7a6a', 0.92)}`, `${ccSay('am', 'AMARELOS', 540, 380, -3, BZ.yellow, BZ.ink, 100)}${bzFlash('fl', '#ffd23a')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.fromTo($('#cc'), { y: 200 }, { y: 0, duration: 0.5, ease: 'back.out(1.5)' }, K('v')); tl.to($('#cc .eyes'), { opacity: 1, duration: 0.15 }, K('o')); bzHit(tl, $('#fl'), K('o'), 0.4);
      tl.set($('#am'), { opacity: 0 }, s.t0); bzShow(tl, $('#am'), K('o') + 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1100); } },
  // ---------------- the pull
  sink: { bg: '#4a9ad8', html: () => bzShot(`${ccRiver(CC_PAL.day, false)}<g transform="translate(160 0)">${ccSwim(540, 1100, 0.9)}</g>${ccChar('pedro', 300, 1640, 1.0)}${ccWater(1360, '#5a8a6a', 0.5)}${bzParticles('bb', 'bubbles', 20, [550, 950, 850, 1150], 5)}`, ''),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); bzFace(tl, $('#maria'), s.t0, 'wide', 'open'); tl.to($('#swim'), { y: 300, duration: 0.25, ease: 'power3.in' }, K('s')); bzParticlesGo(tl, $('#bb'), 'bubbles', K('s'), s.t1);
      bzFace(tl, $('#pedro'), s.t0 + 0.2, 'wide', 'open'); bzPose(tl, $('#pedro'), K('j') - 0.4, { aL: 170, aR: -170 }, 0.2); tl.to($('#pedro'), { x: 300, y: -200, rotation: 60, svgOrigin: '300 1640', duration: 0.4, ease: 'power2.out' }, K('j') - 0.3);
      tl.to($('#pedro'), { y: 200, opacity: 0, duration: 0.3, ease: 'power2.in' }, K('j') + 0.1); bzShake(tl, $('#cam'), K('j'), K('j') + 0.4, 6); } },
  under: { bg: '#2a4a3a', html: () => bzShot(`${ccUnder()}${ccHand('hd', 520, 1500, 1.3, -8)}<g id="arm"><path d="M900 -40 Q 760 300 620 520" stroke="${BZ.ink}" stroke-width="64" stroke-linecap="round" fill="none"/><path d="M900 -40 Q 760 300 620 520" stroke="#a8683e" stroke-width="44" stroke-linecap="round" fill="none"/></g>${bzParticles('bb', 'bubbles', 24, [200, 400, 900, 1700], 7)}`, `${bzVignette(0.75)}`),
    anim(tl, s, K, $) { tl.fromTo($('#legs .kl'), { rotation: -8, transformOrigin: '50% 0%' }, { rotation: 8, duration: 0.15, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.15) }, s.t0); tl.fromTo($('#legs .kr'), { rotation: 8, transformOrigin: '50% 0%' }, { rotation: -8, duration: 0.15, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.15) }, s.t0);
      tl.fromTo($('#hd'), { y: 0 }, { y: -500, duration: 0.6, ease: 'power2.out' }, s.t0); tl.to($('#hd'), { y: 400, duration: 0.5, ease: 'power2.in' }, K('p')); tl.to($('#legs'), { y: -500, duration: 0.5, ease: 'power2.in' }, K('p'));
      tl.fromTo($('#arm'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, K('p') - 0.8); bzParticlesGo(tl, $('#bb'), 'bubbles', s.t0, s.t1); bzHandheld(tl, $('#cam'), s.t0, s.t1, 10); } },
  // ---------------- the marks
  sand: { bg: '#4a9ad8', html: () => bzShot(`${ccRiver()}<g id="pm">${ccChar('pedro', 380, 1720, 1.1)}</g><g id="mm">${ccChar('maria', 700, 1720, 1.05, true)}</g>`, bzVignette(0.55)),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); bzFace(tl, $('#pedro'), s.t0, 'closed', 'open'); bzFace(tl, $('#maria'), s.t0, 'closed', 'open'); bzShake(tl, $('#pm'), s.t0, s.t1, 2); bzShake(tl, $('#mm'), s.t0, s.t1, 2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  marks: { bg: '#e8c890', html: () => bzShot(`<rect width="1080" height="1920" fill="#e8c890"/>${[...Array(10)].map((_, i) => `<ellipse cx="${(i * 233) % 1080}" cy="${(i * 197) % 1920}" rx="${40 + (i % 3) * 20}" ry="8" fill="#000" opacity="0.08"/>`).join('')}
      <rect x="-40" y="700" width="760" height="300" rx="150" fill="#8a5a3a" ${bzO('stroke-width="10"')}/><ellipse cx="820" cy="930" rx="220" ry="140" fill="#8a5a3a" ${bzO('stroke-width="10"')}/>
      <g id="mk">${[0, 1, 2, 3, 4].map((i) => `<ellipse class="f${i}" cx="${300 + i * 70}" cy="${800 + (i % 2) * 30}" rx="${i === 4 ? 30 : 22}" ry="${i === 4 ? 70 : 90}" fill="#6a2a6a" opacity="0" transform="rotate(${-10 + i * 6} ${300 + i * 70} ${800 + (i % 2) * 30})"/>`).join('')}</g>`,
      `${ccSay('cm', '5 MARCAS DE DEDOS', 540, 380, -3, '#fff', BZ.ink, 80)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { for (let i = 0; i < 5; i++) tl.to($(`#mk .f${i}`), { opacity: 0.85, duration: 0.15 }, K('m') + i * 0.18); tl.set($('#cm'), { opacity: 0 }, s.t0); bzShow(tl, $('#cm'), K('m') + 1.0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 440, 850); } },
  six: { bg: '#3a5a5a', html: () => bzShot(`${ccRiver(CC_PAL.dusk, false)}${ccDome('dm', 540, 1150, 0.9)}${ccWater(1150, '#2a4a4a', 0.4)}`, `<g id="seven">${[...Array(7)].map((_, i) => `<g class="m${i}"><circle cx="${150 + i * 130}" cy="1560" r="48" fill="${i < 6 ? '#6a2a6a' : '#fff'}" ${bzO()}/><text x="${150 + i * 130}" y="1580" text-anchor="middle" font-family="Anton" font-size="52" fill="${i < 6 ? '#fff' : BZ.ink}">${i < 6 ? 'X' : '?'}</text></g>`).join('')}</g>${bzVignette(0.7)}`),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); for (let i = 0; i < 7; i++) tl.from($(`#seven .m${i}`), { scale: 0, transformOrigin: '50% 50%', duration: 0.2 }, s.t0 + 0.3 + i * 0.15); bzPop(tl, $('#seven .m6'), K('u'));
      tl.fromTo($('#dm'), { rotation: -4 }, { rotation: 4, svgOrigin: '540 1150', duration: 1.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1150); } },
  // ---------------- the end: the eyes rise right behind you (loops into the hook)
  end: { bg: '#3a5a5a', html: () => bzShot(`${ccRiver(CC_PAL.dusk, false)}${ccHead('cc', 540, 1050, 1.6, false)}${ccWater(1150)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { ccWaves(tl, $, s.t0, s.t1); tl.fromTo($('#cc'), { y: 300 }, { y: 0, duration: s.t1 - s.t0, ease: 'power1.out' }, s.t0); tl.to($('#cc .eyes'), { opacity: 1, duration: 0.1 }, s.t0 + (s.t1 - s.t0) * 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1100); } },
});
