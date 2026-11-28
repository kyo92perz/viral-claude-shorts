// <lines>
// </lines>
// =====================================================================
//  A PORCA DOS SETE LEITÕES: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Tiago ~415*s.
//  Revealed in parts: red eyes in the dark, the sound, the size of an ox, the line of piglets, the count, the cap.
// =====================================================================
BZ_TALK.lines = PS_LINES;
const psSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const psClose = (k: string, s: number, bg: string, id = k) => `${bg}${psChar(k, 540, (k === 'vo' ? 507 : 415) * s + 640, s, false, id)}`;
const psLine = (y: number, x0: number, dx: number, s: number, cap = -1, flip = false) => [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => cap >= 0 || i < 7).map((i) => psPig('l' + i, x0 + i * dx, y + (i % 2) * 10, s, i === cap, flip)).join('');
const psEyes = (id: string, x: number, y: number, r = 12) => `<g id="${id}">${bzGlow(id + 'g', x, y, r * 6, '#ff2a1a', 0.5)}<circle cx="${x - r * 2}" cy="${y}" r="${r}" fill="#ff2a1a"/><circle cx="${x + r * 2}" cy="${y}" r="${r}" fill="#ff2a1a"/></g>`;
const psWaves = (tl: gsap.core.Timeline, $: (q: string) => string, t0: number, t1: number) => tl.fromTo($('.wv'), { x: -20 }, { x: 20, duration: 1, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 1)), stagger: 0.1, ease: 'sine.inOut' }, t0);

defineVisuals({
  // ---------------- the hook: red eyes at the crossroads, frame 1
  hook: { bg: '#060a18', html: () => bzShot(`${psRoad(true)}${psEyes('e0', 540, 1430, 14)}${[0, 1, 2, 3, 4, 5, 6].map((i) => psEyes('e' + (i + 1), 300 + i * 70, 1520 + (i % 2) * 14, 5)).join('')}`, `${psSay('hk', 'MEIA-NOITE: NÃO PASSE', 540, 1600, -4, BZ.red, '#fff', 84)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); for (let i = 0; i < 8; i++) tl.fromTo($('#e' + i), { opacity: 0 }, { opacity: 1, duration: 0.15 }, s.t0 + 0.6 + i * 0.25);
      tl.fromTo($('#e0'), { scaleY: 1, transformOrigin: '50% 50%' }, { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1 }, K('h')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1430); } },
  title: { bg: '#060a18', html: () => bzShot(`${psRoad(true)}${psPig('pg', 520, 1640, 0.8)}${psLine(1660, 100, 55, 0.22)}`, `${psSay('tt', 'A PORCA DOS 7 LEITÕES', 540, 380, -4, BZ.red, '#fff', 84)}${bzFlash('fl', '#ff2a1a')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { psTrot(tl, $('#pg'), s.t0, s.t1); tl.fromTo($('#pg'), { x: -200 }, { x: 100, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.3); } },
  lore: { bg: '#060a18', html: () => bzShot(`${psRoad(true)}${psPig('pg', 300, 1660, 0.9)}<g id="ln">${psLine(1700, 520, 70, 0.28)}</g>`, `${psSay('n7', '7', 760, 820, 6, '#fff', BZ.ink, 160)}${psSay('ov', 'OLHO VERMELHO', 540, 1580, -3, BZ.red, '#fff', 80)}`),
    anim(tl, s, K, $) { psTrot(tl, $('#pg'), s.t0, s.t1, 0.2); tl.set($('#n7') + ', ' + $('#ov'), { opacity: 0 }, s.t0); for (let i = 0; i < 7; i++) tl.from($('#l' + i), { y: -60, opacity: 0, duration: 0.2, ease: 'back.out(2)' }, K('s') + i * 0.12);
      bzShow(tl, $('#n7'), K('s')); bzShow(tl, $('#ov'), K('o')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1600); } },
  vo: { bg: '#060a18', html: () => bzShot(psClose('vo', 2.0, `${psFarm()}`), `${bzGlow('fg2', 900, 1300, 400, '#ffb050', 0.2)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'frown'); bzTalk(tl, $('#vo'), 'ps_vo', s.t0, s.t1, 'frown', 'open'); bzBlink(tl, $('#vo'), s.t0, s.t1); bzPose(tl, $('#vo'), K('c'), { aR: -120 }, 0.25); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 650); } },
  // ---------------- the night
  party: { bg: '#060a18', html: () => bzShot(`${psFarm()}${psChar('tiago', 540, 1700, 1.1)}<g id="clk"><circle cx="830" cy="760" r="90" fill="#f4f2ea" ${bzO()}/><path id="hm" d="M830 760 V 700" stroke="${BZ.ink}" stroke-width="10" stroke-linecap="round"/><path id="hh" d="M830 760 V 710" stroke="${BZ.red}" stroke-width="6" stroke-linecap="round"/></g>`, psSay('mn', '00:10', 830, 920, 4, BZ.red, '#fff', 70)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'closed', 'grin'); bzBob(tl, $('#tiago'), s.t0, s.t1, 8); tl.fromTo($('#hh'), { rotation: 300, svgOrigin: '830 760' }, { rotation: 420, duration: K('m') - s.t0 }, s.t0);
      bzFace(tl, $('#tiago'), K('m'), 'wide', 'o'); tl.set($('#mn'), { opacity: 0 }, s.t0); bzShow(tl, $('#mn'), K('m')); } },
  road: { bg: '#060a18', html: () => bzShot(`${psRoad()}${psChar('tiago', 540, 1640, 0.9)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzWalk(tl, $('#tiago'), s.t0, s.t1, 0, 0); bzFace(tl, $('#tiago'), s.t0, 'half', 'flat'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1400); } },
  sound: { bg: '#060a18', html: () => bzShot(psClose('tiago', 2.2, `${psRoad(true)}`), `${psSay('g1', 'ÓINC', 230, 560, -10, '#fff', BZ.ink, 90)}${psSay('g2', 'ii ii ii', 820, 760, 8, '#fff', BZ.red, 70)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'half', 'flat'); tl.set($('#g1') + ', ' + $('#g2'), { opacity: 0 }, s.t0); bzShow(tl, $('#g1'), K('g')); bzFace(tl, $('#tiago'), K('g'), 'wide', 'flat');
      tl.to($('#tiago .hd'), { rotation: -14, transformOrigin: '50% 90%', duration: 0.25 }, K('g')); bzShow(tl, $('#g2'), K('q')); tl.to($('#tiago .hd'), { rotation: 12, transformOrigin: '50% 90%', duration: 0.25 }, K('q')); } },
  reveal: { bg: '#060a18', html: () => bzShot(`${psRoad(true)}<g id="big">${psPig('pg', 380, 1700, 1.4)}</g><g id="ln">${psLine(1760, 60, 60, 0.24)}</g>`, `${psSay('bo', 'DO TAMANHO DE UM BOI', 540, 380, -3, '#fff', BZ.ink, 70)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { tl.fromTo($('#big'), { x: -900 }, { x: 0, duration: 1.4, ease: 'power2.out' }, s.t0 + 0.2); psTrot(tl, $('#pg'), s.t0 + 0.2, s.t0 + 1.6, 0.2); tl.set($('#bo'), { opacity: 0 }, s.t0); bzShow(tl, $('#bo'), K('b'));
      tl.fromTo($('#ln'), { x: -700 }, { x: 0, duration: 1.0, ease: 'power2.out' }, K('l') - 0.3); tl.from($('#cam'), { scale: 1.2, svgOrigin: '540 1600', duration: 0.4 }, K('b')); } },
  chase: { bg: '#060a18', html: () => bzShot(`${psRoad()}<g id="pp">${psPig('pg', 400, 1760, 1.0)}</g>${psChar('tiago', 780, 1720, 1.0)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'wide', 'open'); psTrot(tl, $('#pg'), K('c'), s.t1, 0.1); tl.fromTo($('#pp'), { x: -500 }, { x: 0, duration: s.t1 - K('c'), ease: 'none' }, K('c'));
      bzWalk(tl, $('#tiago'), K('r'), s.t1, 0, 260, true); bzShake(tl, $('#cam'), K('c'), s.t1, 6); } },
  water: { bg: '#060a18', html: () => bzShot(`${psStream()}<g id="pg0">${psPig('pg', 520, 1150, 0.55)}</g>${psLine(1170, 120, 110, 0.2)}<g id="tg">${psChar('tiago', 540, 1900, 1.4)}</g><rect y="1640" width="1080" height="300" fill="#14304a" opacity="0.85"/>`, bzParticles('sp', 'bubbles', 18, [380, 1500, 700, 1700], 4)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'wide', 'open'); tl.fromTo($('#tg'), { y: -300 }, { y: 0, duration: 0.4, ease: 'power2.in' }, K('j') - 0.3); bzParticlesGo(tl, $('#sp'), 'bubbles', K('j'), s.t1); psWaves(tl, $, s.t0, s.t1);
      tl.fromTo($('#pg0'), { y: 0 }, { y: -10, duration: 0.25, yoyo: true, repeat: 6 }, K('b')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1200); } },
  rule: { bg: '#060a18', html: () => bzShot(psClose('vo', 2.2, `<rect width="1080" height="1920" fill="#0a0c18"/>${bzStars(30, 9, 1100)}`), `${bzGlow('rg', 540, 640, 420, '#ff2a1a', 0.12)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'frown'); bzTalk(tl, $('#vo'), 'ps_vo', s.t0, s.t1, 'frown', 'open'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 650); } },
  count: { bg: '#060a18', html: () => bzShot(`<g transform="translate(-540 -1200) scale(2)">${psStream()}${psLine(1170, 120, 110, 0.2, 7)}</g>`, `${['1', '2', '3', '7', '8'].map((n, i) => psSay('c' + i, n, 200 + i * 170, 600, (i % 2 ? 6 : -6), i === 4 ? BZ.red : '#fff', i === 4 ? '#fff' : BZ.ink, 110)).join('')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { ['a', 'b', 'c', 's', 'o'].forEach((k, i) => { tl.set($('#c' + i), { opacity: 0 }, s.t0); bzShow(tl, $('#c' + i), K(k)); }); tl.set($('#l7'), { opacity: 0 }, s.t0); tl.to($('#l7'), { opacity: 1, duration: 0.2 }, K('o'));
      tl.fromTo($('#cam'), { x: 300 }, { x: -260, duration: K('o') - s.t0, ease: 'power1.inOut' }, s.t0); } },
  cap: { bg: '#060a18', html: () => bzShot(`<g transform="translate(-2360 -4300) scale(4)">${psStream()}${psPig('l7', 940, 1170, 0.28, true)}</g>`, `${psSay('zc', 'O BONÉ DO ZECA', 540, 380, -3, BZ.red, '#fff', 84)}${bzFlash('fl', '#ff2a1a')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.set($('#zc'), { opacity: 0 }, s.t0); bzShow(tl, $('#zc'), K('z')); bzHit(tl, $('#fl'), K('z'), 0.35); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 900); } },
  end: { bg: '#060a18', html: () => bzShot(`${psRoad(true)}${psEyes('e0', 540, 1430, 14)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { tl.fromTo($('#e0'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, s.t0 + (s.t1 - s.t0) * 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1430); } },
});
