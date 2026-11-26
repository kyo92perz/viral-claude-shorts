// <lines>
const RG_LINES = [{"who": "rg_eu", "t0": 0.3, "t1": 4.984}, {"who": "rg_eu", "t0": 5.484, "t1": 9.521}, {"who": "rg_eu", "t0": 9.921, "t1": 14.622}, {"who": "rg_eu", "t0": 15.122, "t1": 18.698}, {"who": "rg_eu", "t0": 19.498, "t1": 22.346}, {"who": "rg_vo", "t0": 23.246, "t1": 25.338}, {"who": "rg_eu", "t0": 25.838, "t1": 30.618}, {"who": "rg_eu", "t0": 31.318, "t1": 37.707}, {"who": "rg_eu", "t0": 38.307, "t1": 43.288}, {"who": "rg_eu", "t0": 43.888, "t1": 50.219}, {"who": "rg_eu", "t0": 50.819, "t1": 54.567}];
// </lines>
// =====================================================================
//  A REGRA DA VÓ Nº 1: O ESPELHO DAS TRÊS — the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Davi ~400*s.
// =====================================================================
BZ_TALK.lines = RG_LINES;
const rgSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const rgHide = (tl: gsap.core.Timeline, sel: string, t0: number, t: number) => { tl.set(sel, { opacity: 0 }, t0); bzShow(tl, sel, t); };
// a big close face: the head centred at y ~ 640
const rgClose = (k: string, s: number, bg: string, id = k, flip = false) => `${bg}${rgChar(k, 540, (k === 'vo' ? 507 : 400) * s + 640, s, flip, id)}`;
// the mirror close-up: the bathroom zoomed x2 on the glass; inside it the reflection (#rf, spec k) as a bust; Davi's
// back of head (a dark afro) at the bottom of the frame
const rgMirrorClose = (k = 'davi', cloth = '') => `<g transform="translate(-540 -540) scale(2)">${rgBath(rgChar(k, 540, 1330, 1.5, true, 'rf'))}${cloth}</g>
  <g id="nuca"><circle cx="540" cy="1820" r="330" fill="#1c1410" ${bzO('stroke-width="10"')}/>${[...Array(9)].map((_, i) => `<circle cx="${250 + i * 72}" cy="${1560 + (i % 2) * 30}" r="70" fill="#1c1410"/>`).join('')}</g>`;
// a sheet of paper and a pencil on the table; the hand writing with the LEFT hand (#lh)
const rgWrite = () => `<rect width="1080" height="1920" fill="#5a3e2a"/><rect x="120" y="700" width="840" height="900" rx="10" fill="#f4f0e4" ${bzO()}/>${[...Array(12)].map((_, i) => `<path d="M180 ${800 + i * 60} H900" stroke="#a8c0e0" stroke-width="4"/>`).join('')}
  <path id="ink" d="M200 860 q 40 -40 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" stroke="#2a3a8a" stroke-width="10" fill="none" stroke-dasharray="600" stroke-dashoffset="600"/>
  <g id="lh"><g transform="translate(330 1040)"><rect x="-40" y="-260" width="40" height="280" rx="10" fill="#f6c744" ${bzO()}/><path d="M-40 20 l 20 50 l 20 -50 z" fill="#e8c890" ${bzO('stroke-width="5"')}/>
  <ellipse cx="-60" cy="-60" rx="110" ry="90" fill="#8a5a3a" ${bzO()}/><rect x="-200" y="-110" width="160" height="120" rx="50" fill="#3a7ac8" ${bzO()}/></g></g>`;

defineVisuals({
  // ---------------- the hook: a covered mirror, the cloth slipping; one pale eye glows behind it
  hook: { bg: '#2a3440', html: () => bzShot(`<g transform="translate(-540 -540) scale(2)">${rgBath(rgChar('refl', 540, 1330, 1.5, true, 'rf'), true)}${rgCloth('cl', 240, 300, 600, 700)}</g>`, `${rgSay('hk', 'NUNCA TIRE O PANO', 540, 1560, -4, BZ.red, '#fff', 100)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rf'), s.t0, 'glow', 'flat'); bzHook(tl, $('#hk'), s.t0); tl.fromTo($('#cl'), { x: 150, y: 50, rotation: 7 }, { x: 330, y: 120, rotation: 14, svgOrigin: '540 300', duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 700); } },
  // ---------------- the rule: the grandmother covers a mirror in the hallway; 3:00
  rule: { bg: '#4a3a4a', html: () => bzShot(`${rgHall()}${rgChar('vo', 420, 1640, 1.25)}`, `${rgClock('ck', '3:00', 540, 420, 0.6)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#c2'), { y: -520, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', immediateRender: true }, K('c')); bzPose(tl, $('#vo'), K('c') - 0.3, { aR: -150 }, 0.3); bzPose(tl, $('#vo'), K('c') + 0.4, { aR: 0 }, 0.4);
      bzFace(tl, $('#vo'), s.t0, 'half', 'flat'); rgHide(tl, $('#ck'), s.t0, s.t0 + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 540, 800); } },
  cloths: { bg: '#4a3a4a', html: () => bzShot(`${rgHall()}${rgChar('vo', 200, 1640, 1.1)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzWalk(tl, $('#vo'), s.t0, s.t1, 0, 520); bzFace(tl, $('#vo'), s.t0, 'half', 'flat'); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1, 540, 700); } },
  car: { bg: '#070b1c', html: () => bzShot(rgCar(), `${rgSay('rt', 'ATÉ O RETROVISOR', 540, 1560, 3, '#fff', BZ.ink, 84)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#cc'), { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', immediateRender: true }, K('c') - 0.2); rgHide(tl, $('#rt'), s.t0, K('c')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 460); } },
  // ---------------- Davi stays awake
  awake: { bg: '#141a2e', html: () => bzShot(`${rgBed()}${rgChar('davi', 520, 1200, 1.0)}<g id="ph"><rect x="690" y="1060" width="70" height="120" rx="12" fill="#1a1a22" ${bzO('stroke-width="5"')}/><rect x="700" y="1072" width="50" height="90" fill="#9ad8ff"/>${bzGlow('pg', 725, 1110, 200, '#9ad8ff', 0.35)}</g>`, `${rgSay('fr', 'FRESCURA...', 540, 360, -3, '#fff', BZ.ink, 90)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#davi'), { rotation: -90, svgOrigin: '520 1200', y: -60, x: 60 }, s.t0); bzFace(tl, $('#davi'), s.t0, 'half', 'flat'); rgHide(tl, $('#fr'), s.t0, s.t0 + 0.4); tl.to($('#fr'), { opacity: 0, duration: 0.2 }, K('a') - 0.2); bzFace(tl, $('#davi'), K('a'), 'wide', 'flat'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1100); } },
  clock259: { bg: '#141018', html: () => bzShot(`<rect width="1080" height="1920" fill="#0c0a10"/>${rgClock('ck', '2:59', 540, 760, 1.4)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#ck'), { opacity: 0.6 }, { opacity: 1, duration: 0.5, yoyo: true, repeat: 3 }, K('k')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 760); } },
  // ---------------- he pulls the cloth off the bathroom mirror
  pull: { bg: '#7a9aa8', html: () => bzShot(`${rgBath(rgChar('davi', 540, 1330, 1.5, true, 'rf'))}${rgCloth('cl', 240, 300, 600, 700)}${rgChar('davi', 540, 2080, 1.6)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzFace(tl, $('#rf'), s.t0, 'wide', 'flat'); bzFace(tl, $('#davi'), s.t0, 'wide', 'flat'); bzPose(tl, $('#davi'), K('p') - 0.3, { aR: -160 }, 0.3);
      tl.to($('#cl'), { x: 900, y: 300, rotation: 40, svgOrigin: '540 300', duration: 0.6, ease: 'power2.in' }, K('p')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 700); } },
  three: { bg: '#141018', html: () => bzShot(`<rect width="1080" height="1920" fill="#0c0a10"/>${rgClock('c1', '2:59', 540, 760, 1.4)}<g opacity="0" id="c3w">${rgClock('c3', '3:00', 540, 760, 1.4)}</g>`, `${bzFlash('fl', '#ff3a2a')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#c1'), { opacity: 0 }, K('k')); tl.set($('#c3w'), { opacity: 1 }, K('k')); bzHit(tl, $('#fl'), K('k'), 0.4); bzQuake(tl, $('#cam'), K('k'), K('k') + 0.3, 10); } },
  // ---------------- the reflection blinks; Davi doesn't
  blink: { bg: '#2a3440', html: () => bzShot(rgMirrorClose('davi'), bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#rf'), s.t0, 'wide', 'flat'); bzFace(tl, $('#rf'), K('b'), 'closed', 'flat'); bzFace(tl, $('#rf'), K('b') + 0.18, 'wide', 'flat'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.18, 540, 800); } },
  vo: { bg: '#7a9aa8', html: () => bzShot(rgClose('vo', 2.2, rgBathWall()), `${rgSay('vs', 'COBRE ISSO!', 540, 300, -4, BZ.red, '#fff', 100)}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzTalk(tl, $('#vo'), 'rg_vo', s.t0, s.t1, 'open', 'open'); bzFace(tl, $('#vo'), s.t0, 'wide'); bzHook(tl, $('#vs'), s.t0 + 0.1); bzShake(tl, $('#vo'), s.t0, s.t1, 3); } },
  // ---------------- the cloth goes back; before it covers, the reflection smiles
  cover: { bg: '#2a3440', html: () => bzShot(rgMirrorClose('davi', rgCloth('cl', 240, 300, 600, 700)), bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#rf'), s.t0, 'wide', 'flat'); tl.fromTo($('#cl'), { y: -900 }, { y: -560, duration: 0.5, ease: 'power2.out', immediateRender: true }, K('t')); tl.to($('#cl'), { y: -470, duration: K('g') - K('t') - 0.5, ease: 'none' }, K('t') + 0.5);
      bzFace(tl, $('#rf'), K('g'), 'glow', 'grin'); tl.to($('#cl'), { y: 0, duration: 0.35, ease: 'power2.in' }, s.t1 - 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 800); } },
  // ---------------- the grandmother explains; the swap
  explain: { bg: '#4a3a4a', html: () => bzShot(`${rgHall()}${rgChar('vo', 330, 1640, 1.25)}${rgChar('davi', 800, 1640, 1.15, true)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'flat'); bzFace(tl, $('#davi'), s.t0, 'wide', 'flat'); bzBob(tl, $('#vo'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  swap: { bg: '#2a3440', html: () => bzShot(`${rgBath(rgChar('refl', 540, 1330, 1.5, true, 'rf'))}${rgChar('davi', 540, 2080, 1.6)}`, `<g id="arr" opacity="0"><path d="M200 700 Q 540 520 880 700" stroke="#9ad8ff" stroke-width="20" fill="none"/><path d="M880 700 l -60 -60 l -10 80 z" fill="#9ad8ff"/><path d="M880 1000 Q 540 1180 200 1000" stroke="#ff5a4a" stroke-width="20" fill="none"/><path d="M200 1000 l 60 60 l 10 -80 z" fill="#ff5a4a"/></g>${rgSay('tr', 'TROCAR DE LUGAR', 540, 300, -3, BZ.yellow, BZ.ink, 92)}${bzFlash('fl', '#cfe8ff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rf'), s.t0, 'glow', 'grin'); bzFace(tl, $('#davi'), s.t0, 'wide', 'o'); rgHide(tl, $('#tr'), s.t0, s.t0 + 0.2); rgHide(tl, $('#arr'), s.t0, K('s')); bzHit(tl, $('#fl'), K('s'), 0.5);
      tl.fromTo($('#arr'), { rotation: 0 }, { rotation: 360, svgOrigin: '540 850', duration: s.t1 - K('s'), ease: 'none' }, K('s')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 800); } },
  // ---------------- now he's different
  diff: { bg: '#5a3e2a', html: () => bzShot(`<rect width="1080" height="1920" fill="#5a3e2a"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1920" stroke="#4a3220" stroke-width="8"/>`).join('')}<rect x="640" y="420" width="300" height="340" fill="#9ad0f0" ${bzO('stroke-width="12"')}/>${rgChar('vo', 260, 1500, 1.25)}${rgChar('davi', 780, 1500, 1.25, true)}<rect x="-20" y="1300" width="1120" height="70" fill="#7a5030" ${bzO()}/><rect x="-20" y="1370" width="1120" height="560" fill="#4a3220"/>`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'frown'); bzFace(tl, $('#davi'), s.t0, 'dot', 'smile'); bzBlink(tl, $('#davi'), s.t0, s.t1); tl.fromTo($('#vo .hd'), { rotation: 0 }, { rotation: 8, duration: 0.8, yoyo: true, repeat: 1 }, s.t0 + 1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); } },
  lefthand: { bg: '#5a3e2a', html: () => bzShot(rgWrite(), rgSay('me', 'MÃO ESQUERDA', 540, 360, -3, BZ.red, '#fff', 96)),
    anim(tl, s, K, $) { tl.to($('#ink'), { strokeDashoffset: 0, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.to($('#lh'), { x: 480, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.fromTo($('#lh'), { y: 0 }, { y: -20, duration: 0.2, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.2) }, s.t0); rgHide(tl, $('#me'), s.t0, K('l')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); } },
  // ---------------- the twist: at 3 a.m. somebody knocks on the mirror from inside
  knock: { bg: '#2a3440', html: () => bzShot(`${rgBath(rgChar('davi', 540, 1330, 1.5, true, 'rf'), true)}${rgCloth('cl', 240, 300, 600, 700, '#a8a090')}`, `${rgClock('ck', '3:00', 540, 400, 0.5)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { for (let i = 0; i < 3; i++) { tl.fromTo($('#cl'), { scale: 1 }, { scale: 1.03, svgOrigin: '540 650', duration: 0.08, yoyo: true, repeat: 1 }, K('k') + i * 0.5); bzQuake(tl, $('#cam'), K('k') + i * 0.5, K('k') + i * 0.5 + 0.12, 6); } bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 650); } },
  reveal: { bg: '#2a3440', html: () => bzShot(`<g transform="translate(-540 -540) scale(2)">${rgBath(rgChar('davi', 540, 1330, 1.5, true, 'rf'), true)}${rgPrint('p1', 330, 520, 0.8)}${rgPrint('p2', 760, 600, 0.8)}${rgCloth('cl', 240, 300, 600, 700, '#a8a090')}</g>`, `${rgSay('vt', 'ME DEIXA VOLTAR', 540, 1560, -4, BZ.red, '#fff', 96)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rf'), s.t0, 'wide', 'open'); tl.to($('#cl'), { y: 900, duration: 0.6, ease: 'power2.in' }, K('r')); bzShake(tl, $('#rf'), s.t0, s.t1, 5); tl.fromTo($('#p1, #p2'), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.4 }, K('r') + 0.5); rgHide(tl, $('#vt'), s.t0, K('r') + 0.8); } },
  // ---------------- the narrator is the reflection: he looks at you
  ask: { bg: '#141a2e', html: () => bzShot(rgClose('refl', 2.4, `<rect width="1080" height="1920" fill="#10141e"/>${bzGlow('ag', 540, 640, 600, '#9ad8ff', 0.18)}`, 'nr'), `${rgSay('q', 'QUAL A REGRA DA SUA VÓ?', 540, 1560, -3, BZ.yellow, BZ.ink, 80)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#nr'), s.t0, 'dot', 'smile'); bzTalk(tl, $('#nr'), 'rg_eu', s.t0, s.t1, 'smile'); bzFace(tl, $('#nr'), s.t1 - 1.0, 'glow', 'grin'); rgHide(tl, $('#q'), s.t0, s.t0 + 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 640); } },
});
