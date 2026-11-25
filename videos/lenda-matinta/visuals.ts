// <lines>
const MT_LINES = [{"who": "mt_eu", "t0": 0.3, "t1": 5.575}, {"who": "mt_eu", "t0": 6.175, "t1": 10.944}, {"who": "mt_eu", "t0": 11.344, "t1": 17.276}, {"who": "mt_eu", "t0": 17.976, "t1": 20.63}, {"who": "mt_vo", "t0": 21.03, "t1": 24.331}, {"who": "mt_eu", "t0": 24.931, "t1": 29.829}, {"who": "mt_eu", "t0": 30.129, "t1": 32.504}, {"who": "mt_eu", "t0": 33.004, "t1": 36.55}, {"who": "mt_eu", "t0": 37.55, "t1": 44.697}, {"who": "mt_matinta", "t0": 45.197, "t1": 47.282}, {"who": "mt_eu", "t0": 47.882, "t1": 53.488}, {"who": "mt_eu", "t0": 54.088, "t1": 58.303}, {"who": "mt_eu", "t0": 58.903, "t1": 63.048}];
// </lines>
// =====================================================================
//  A MATINTA PERERA: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Tito ~400*s.
// =====================================================================
BZ_TALK.lines = MT_LINES;
const mtSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const mtHide = (tl: gsap.core.Timeline, sel: string, t0: number, t: number) => { tl.set(sel, { opacity: 0 }, t0); bzShow(tl, sel, t); };
// a big close face: the character's head centered at y ~ 640
const mtClose = (k: string, s: number, bg: string, id = k) => `${bg}${mtChar(k, 540, (k === 'tito' ? 400 : 507) * s + 640, s, false, id)}`;
// a hand with long nails (closeup)
const mtHand = () => `<g id="hand"><g transform="translate(540 1000)"><ellipse cx="0" cy="0" rx="150" ry="120" fill="#9a8068" ${bzO('stroke-width="9"')}/>${[-100, -40, 20, 80].map((x, i) => `<path d="M${x} -80 Q ${x - 10} -260 ${x + 10} -330" stroke="${BZ.ink}" stroke-width="58" fill="none" stroke-linecap="round"/><path d="M${x} -80 Q ${x - 10} -260 ${x + 10} -330" stroke="#9a8068" stroke-width="44" fill="none" stroke-linecap="round"/><path d="M${x + 10} -330 l ${-14 + i * 4} -110 l 30 100 z" fill="#e8e0c8" ${bzO('stroke-width="5"')}/>`).join('')}<rect x="-170" y="80" width="340" height="300" fill="#1c1418" ${bzO()}/></g></g>`;
// the cup of coffee and the roll of tobacco
const mtGift = () => `<g id="gift"><g transform="translate(540 1080)"><path d="M-80 -90 h160 l -20 140 h-120 z" fill="#e8e4dc" ${bzO()}/><path d="M80 -60 q 60 10 40 70 q -10 20 -40 10" stroke="${BZ.ink}" stroke-width="12" fill="none"/><ellipse cx="0" cy="-90" rx="80" ry="18" fill="#4a2a14" ${bzO('stroke-width="5"')}/>
  ${[0, 1, 2].map((i) => `<path class="stm" d="M${-30 + i * 30} -120 q -20 -40 0 -80 q 20 -40 0 -80" stroke="#efe9d6" stroke-width="8" fill="none" opacity="0.6"/>`).join('')}<rect x="140" y="-20" width="140" height="56" rx="28" fill="#6a4020" ${bzO()}/></g></g>`;

defineVisuals({
  // ---------------- the hook: the bird at the window, red eyes, at frame 1
  hook: { bg: '#070b1c', html: () => bzShot(`<g transform="translate(-1000 -1100) scale(2.85)">${mtHouse()}${mtBird('bd', 540, 770, 0.8)}</g>${mtWhistle('wh', 380, 480)}`, `${mtSay('hk', 'NÃO PROMETA NADA', 540, 1560, -4, BZ.red, '#fff', 100)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); mtWhistleGo(tl, $('#wh'), K('h'), s.t1); tl.fromTo($('#bd .eyes'), { opacity: 0.5 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 5 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 700); } },
  title: { bg: '#070b1c', html: () => bzShot(`${mtHouse()}${mtBird('bd', 540, 770, 0.8)}`, `${mtSay('tt', 'A MATINTA PERERA', 540, 300, -4, BZ.yellow, BZ.ink, 100)}${bzFlash('fl', '#fff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { mtHide(tl, $('#tt'), s.t0, K('t')); bzHit(tl, $('#fl'), K('t'), 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05, 540, 900); } },
  // ---------------- grandma's house
  house: { bg: '#070b1c', html: () => bzShot(`${mtHouse()}`, `${mtSay('pl', 'INTERIOR DO PARÁ', 540, 360, -3, '#fff', BZ.ink, 80)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { mtHide(tl, $('#pl'), s.t0, K('c')); bzPush(tl, $('#cam'), s.t0, s.t1, 1.15, 1, 540, 1000); } },
  rede: { bg: '#5a3e2a', html: () => bzShot(`${mtRoom()}${mtChar('tito', 300, 1120, 0.9)}${mtChar('vo', 800, 1180, 0.9)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { tl.set($('#tito'), { rotation: -80, svgOrigin: '300 1120', y: -60 }, s.t0); tl.set($('#vo'), { rotation: 80, svgOrigin: '800 1180', y: -80 }, s.t0); bzFace(tl, $('#tito'), s.t0, 'closed', 'smile'); bzFace(tl, $('#vo'), s.t0, 'closed', 'flat');
      tl.fromTo($('#rede1'), { rotation: -2 }, { rotation: 2, svgOrigin: '310 940', duration: 1.4, yoyo: true, repeat: 2, ease: 'sine.inOut' }, s.t0); } },
  // ---------------- the whistle
  woke: { bg: '#2a1e18', html: () => bzShot(mtClose('tito', 2.2, mtRoom(true)), `${mtWhistle('wh', 900, 560)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tito'), s.t0, 'closed', 'flat'); bzFace(tl, $('#tito'), K('w'), 'wide', 'o'); mtWhistleGo(tl, $('#wh'), K('w'), s.t1); bzShake(tl, $('#tito'), K('w') + 0.3, s.t1, 2); } },
  roof: { bg: '#070b1c', html: () => bzShot(`${mtHouse()}${mtBird('bd', 540, 770, 0.8)}${mtWhistle('wh', 460, 560)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { mtWhistleGo(tl, $('#wh'), s.t0, s.t1); tl.fromTo($('#bd .beak'), { rotation: 0 }, { rotation: 12, svgOrigin: '470 620', duration: 0.25, yoyo: true, repeat: 7 }, K('r') - 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.25, 540, 600); } },
  vo: { bg: '#2a1e18', html: () => bzShot(`${mtRoom(true)}${mtChar('vo', 700, 1700, 1.25)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'wide', 'frown'); tl.fromTo($('#vo'), { y: 160, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, s.t0); bzShake(tl, $('#vo'), s.t0 + 0.6, s.t1, 2); } },
  quieto: { bg: '#2a1e18', html: () => bzShot(mtClose('vo', 1.9, mtRoom(true)), bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'wide', 'flat'); bzTalk(tl, $('#vo'), 'mt_vo', s.t0, s.t1, 'flat', 'open'); bzPose(tl, $('#vo'), s.t0 + 0.2, { aR: -165 }, 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 640); } },
  closer: { bg: '#2a1e18', html: () => bzShot(`<g transform="translate(-900 -560) scale(2.4)">${mtRoom(true)}${mtBird('bd', 790, 760, 0.5)}</g>${mtWhistle('wh', 700, 900)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { tl.fromTo($('#bd'), { scale: 0.6, opacity: 0.3 }, { scale: 1, opacity: 1, svgOrigin: '790 760', duration: K('p') - s.t0, ease: 'power2.in' }, s.t0); mtWhistleGo(tl, $('#wh'), s.t0, s.t1); } },
  gritei: { bg: '#2a1e18', html: () => bzShot(`${mtRoom(true)}${mtChar('tito', 380, 1700, 1.4)}${mtChar('vo', 820, 1700, 1.2, true)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#tito'), s.t0, 'angry', 'open'); bzFace(tl, $('#vo'), s.t0, 'wide', 'o'); bzPose(tl, $('#tito'), s.t0 + 0.2, { aR: -130 }, 0.2); bzPose(tl, $('#vo'), s.t0 + 0.4, { aL: 120 }, 0.2); } },
  promise: { bg: '#2a1e18', html: () => bzShot(mtClose('tito', 2.3, mtRoom(true)), `${mtSay('pr', 'VOLTA AMANHÃ!', 540, 300, -5, BZ.yellow, BZ.ink, 110)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tito'), s.t0, 'angry', 'open'); bzTalk(tl, $('#tito'), 'mt_eu', s.t0, s.t1, 'open', 'open'); bzHook(tl, $('#pr'), K('x')); bzQuake(tl, $('#cam'), K('x'), K('x') + 0.4, 8); } },
  tapou: { bg: '#2a1e18', html: () => bzShot(`${mtRoom(true)}${mtChar('tito', 480, 1700, 1.5)}${mtChar('vo', 720, 1700, 1.4, true)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#tito'), s.t0, 'wide', 'flat'); bzFace(tl, $('#vo'), s.t0, 'angry', 'frown'); bzPose(tl, $('#vo'), s.t0 + 0.1, { aL: -100 }, 0.15); bzShake(tl, $('#tito'), s.t0, s.t1, 2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 560, 900); } },
  silence: { bg: '#070b1c', html: () => bzShot(`<g transform="translate(-900 -560) scale(2.4)">${mtRoom(true)}</g>`, bzVignette(0.85)),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 540, 960); } },
  // ---------------- the morning visit
  knock: { bg: '#5a3e2a', html: () => bzShot(`${mtDoor()}<rect id="dr" x="260" y="480" width="560" height="1000" fill="#6a4a30" ${bzO('stroke-width="12"')}/>`, `${mtSay('tk', 'TOC TOC TOC', 540, 360, -4, '#fff', BZ.ink, 100)}`),
    anim(tl, s, K, $) { mtHide(tl, $('#tk'), s.t0, K('k')); bzQuake(tl, $('#dr'), K('k'), K('k') + 0.8, 6); tl.to($('#dr'), { scaleX: 0.05, svgOrigin: '820 980', duration: 0.5 }, s.t1 - 0.6); } },
  velha: { bg: '#5a3e2a', html: () => bzShot(`${mtDoor()}${mtChar('matinta', 540, 1500, 1.3)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzFace(tl, $('#matinta'), s.t0, 'half', 'flat'); tl.fromTo($('#matinta'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, K('v') - 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  unha: { bg: '#2a1e18', html: () => bzShot(`<rect width="1080" height="1920" fill="#2a1e18"/>${bzGlow('hg', 540, 760, 600, '#fff0c0', 0.25)}${mtHand()}`, bzVignette(0.7)),
    anim(tl, s, K, $) { tl.fromTo($('#hand'), { y: 300 }, { y: 0, duration: 0.8, ease: 'power2.out' }, s.t0 + 0.2); bzShake(tl, $('#hand'), s.t0 + 1, s.t1, 2); } },
  cobrar: { bg: '#5a3e2a', html: () => bzShot(mtClose('matinta', 2.1, mtDoor()), bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#matinta'), s.t0, 'half', 'grin'); bzTalk(tl, $('#matinta'), 'mt_matinta', s.t0, s.t1, 'grin', 'open'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 640); } },
  pay: { bg: '#5a3e2a', html: () => bzShot(`${mtDoor()}${mtChar('matinta', 720, 1500, 1.2, true)}${mtChar('vo', 300, 1600, 1.2)}${mtGift()}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'frown'); bzFace(tl, $('#matinta'), s.t0, 'half', 'grin'); bzPose(tl, $('#vo'), s.t0, { aR: -80 }, 0.2); tl.fromTo($('#gift .stm'), { y: 0, opacity: 0.6 }, { y: -60, opacity: 0, duration: 1.2, repeat: 3, stagger: 0.3 }, s.t0); } },
  smile: { bg: '#5a3e2a', html: () => bzShot(mtClose('matinta', 2.4, mtDoor()), `${mtWhistle('wh', 860, 600)}${bzFlash('fl', BZ.red)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#matinta'), s.t0, 'half', 'flat'); bzFace(tl, $('#matinta'), K('s'), 'glow', 'grin'); bzHit(tl, $('#fl'), K('s'), 0.3); mtWhistleGo(tl, $('#wh'), K('s') + 0.6, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 640); } },
  // ---------------- the rule, and today
  rule: { bg: '#070b1c', html: () => bzShot(`<g transform="translate(-900 -560) scale(2.4)">${mtRoom(true)}${mtBird('bd', 790, 760, 0.5)}</g>`, `${mtSay('rl', 'PROMETEU? PAGA.', 540, 300, -4, BZ.red, '#fff', 110)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { mtHide(tl, $('#rl'), s.t0, K('j')); tl.fromTo($('#bd .eyes'), { opacity: 0.3 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 7 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); } },
  today: { bg: '#141a2e', html: () => bzShot(`${mtToday()}${mtChar('tito', 360, 1190, 0.95)}`, `${mtSay('on', 'ONTEM', 540, 300, -3, '#fff', BZ.ink, 90)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#tito'), { rotation: 88, svgOrigin: '360 1190' }, s.t0); bzFace(tl, $('#tito'), s.t0, 'closed', 'flat'); bzFace(tl, $('#tito'), s.t0 + 1.2, 'wide', 'o'); mtHide(tl, $('#on'), s.t0, s.t0 + 0.3);
      tl.fromTo($('#clk'), { opacity: 1 }, { opacity: 0.5, duration: 0.5, yoyo: true, repeat: 5 }, s.t0); } },
  outside: { bg: '#141a2e', html: () => bzShot(`<g transform="translate(-860 -560) scale(2.3)">${mtToday()}${mtBird('bd', 780, 760, 0.6)}</g>${mtWhistle('wh', 720, 980)}`, `${bzFlash('fl', BZ.red)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.set($('#bd'), { opacity: 0 }, s.t0); tl.to($('#bd'), { opacity: 1, duration: 0.6 }, K('o') - 0.3); mtWhistleGo(tl, $('#wh'), K('o'), s.t1); bzHit(tl, $('#fl'), K('end'), 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 900); } },
});
