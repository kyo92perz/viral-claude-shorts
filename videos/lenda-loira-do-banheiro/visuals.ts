// <lines>
const LB_LINES = [{"who": "lb_eu", "t0": 0.3, "t1": 7.098}, {"who": "lb_eu", "t0": 7.698, "t1": 14.198}, {"who": "lb_eu", "t0": 14.598, "t1": 22.007}, {"who": "lb_bia", "t0": 22.407, "t1": 25.174}, {"who": "lb_eu", "t0": 25.674, "t1": 28.782}, {"who": "lb_eu", "t0": 30.182, "t1": 33.479}, {"who": "lb_bia", "t0": 34.279, "t1": 37.349}, {"who": "lb_eu", "t0": 38.549, "t1": 47.69}, {"who": "lb_eu", "t0": 48.49, "t1": 50.23}, {"who": "lb_bia", "t0": 51.13, "t1": 52.011}, {"who": "lb_eu", "t0": 52.611, "t1": 58.086}, {"who": "lb_eu", "t0": 58.586, "t1": 61.978}, {"who": "lb_eu", "t0": 63.578, "t1": 68.83}, {"who": "lb_eu", "t0": 69.43, "t1": 72.361}];
// </lines>
// =====================================================================
//  A LOIRA DO BANHEIRO: the shots (Brasil Z toon look). The cast and sets are in world.ts, the shot list in tools/make-scenes.py.
//  Framing rule: the captions sit at y 1190–1400, so faces stay above ~1050 (kids at scale 1.3 stand at y 1480) or
//  fill the frame in close-ups.
// =====================================================================
BZ_TALK.lines = LB_LINES;
// the camera: every shot is drawn inside #cam; overlays (dark, vignette, flash) stay outside it
const lbShot = (body: string, over = '') => svg(`<g id="cam">${body}</g>${over}`);
function lbPush(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, a = 1, b = 1.07, ox = 540, oy = 900) {
  tl.fromTo(sel, { scale: a, svgOrigin: `${ox} ${oy}` }, { scale: b, svgOrigin: `${ox} ${oy}`, duration: t1 - t0, ease: 'none' }, t0);
}
const lbPress = (tl: gsap.core.Timeline, sel: string, t: number) => tl.fromTo(sel, { scale: 1, svgOrigin: '540 900' }, { scale: 0.86, svgOrigin: '540 900', duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.in' }, t);
const lbHit = (tl: gsap.core.Timeline, sel: string, t: number, k = 0.7) => tl.fromTo(sel, { opacity: k }, { opacity: 0, duration: 0.25, ease: 'power2.out' }, t);
const lbNum = (id: string, n: string, x: number, y: number, c = '#fff') => `<g id="${id}" opacity="0"><text x="${x}" y="${y}" text-anchor="middle" font-family="Anton" font-size="260" fill="${c}" stroke="${BZ.ink}" stroke-width="14" paint-order="stroke">${n}</text></g>`;
const lbShow = (tl: gsap.core.Timeline, sel: string, t: number) => { tl.set(sel, { opacity: 1 }, t); bzPop(tl, sel, t, 0.3); };
// a kid's arm reaching up to the flush button from the bottom of the frame (close-up inserts)
const lbArm = (skin: string, sleeve = '#f4f2ea') => `<g id="arm"><path d="M900 2100 Q 760 1500 600 1010" stroke="${BZ.ink}" stroke-width="118" fill="none" stroke-linecap="round"/><path d="M900 2100 Q 760 1500 600 1010" stroke="${skin}" stroke-width="100" fill="none" stroke-linecap="round"/>
  <path d="M900 2100 Q 840 1820 790 1640" stroke="${BZ.ink}" stroke-width="150" fill="none"/><path d="M900 2100 Q 840 1820 790 1640" stroke="${sleeve}" stroke-width="132" fill="none"/><circle cx="590" cy="985" r="70" fill="${skin}" ${bzO('stroke-width="9"')}/></g>`;
// the Loira's shadow on a wall: long hair, a dress, arms down
const lbShadow = (id: string, x: number, y: number, s = 1) => `<g id="${id}" opacity="0"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-110 -560 q110 -160 220 0 l30 300 l80 420 h-440 l80 -420 z" fill="#0b0c10" opacity="0.75"/></g></g>`;

defineVisuals({
  // ---------------- the hook: 3 flushes, 3 kicks, a swear, and her
  flush1: { bg: '#5f9e86', html: () => lbShot(`${lbFlush()}<g id="ref" opacity="0"><path d="M430 930 q0 -150 110 -150 q110 0 110 150 l20 120 h-50 l-20 -110 q-60 30 -120 0 l-20 110 h-50z" fill="#e8d27a"/><circle cx="540" cy="900" r="92" fill="#c9d3dc"/><circle cx="505" cy="890" r="16" fill="#2b2433"/><circle cx="575" cy="890" r="16" fill="#2b2433"/><circle cx="530" cy="925" r="7" fill="#c8342c"/><circle cx="550" cy="925" r="7" fill="#c8342c"/></g>`, `${bzVignette(0.7)}${bzFlash('fl')}`),
    anim(tl, s, K, $) { lbPush(tl, $('#cam'), s.t0, s.t1, 1.05, 1.2); lbPress(tl, $('#btn'), K('f')); lbHit(tl, $('#fl'), K('f'), 0.5); tl.to($('#ref'), { opacity: 0.55, duration: 0.05 }, K('f') + 0.12); } },
  kick1: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbBia(930, 1500, 1.3)}`, `${bzVignette(0.6)}${bzFlash('fl')}`),
    anim(tl, s, K, $) { bzFace(tl, $('#bia'), s.t0, 'angry', 'grin'); bzPose(tl, $('#bia'), K('k') - 0.15, { lR: -75, aL: 40, aR: -30 }, 0.12); bzPose(tl, $('#bia'), K('k') + 0.35, { lR: 0, aL: 0, aR: 0 }, 0.3);
      tl.fromTo($('#door3'), { rotation: 0 }, { rotation: 2, svgOrigin: '930 1340', duration: 0.05, yoyo: true, repeat: 5 }, K('k')); lbHit(tl, $('#fl'), K('k'), 0.4); lbPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1.2, 900, 1000); } },
  swear1: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbBia(540, 1640, 2.2)}${lbSwear('sw', 560, 430, 0.95)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#bia'), s.t0, 'angry', 'open'); tl.set($('#sw'), { opacity: 0 }, s.t0); lbShow(tl, $('#sw'), K('b')); bzShake(tl, $('#bia'), K('b'), K('b') + 0.4, 5); } },
  title: { bg: '#d8cfb4', html: () => lbShot(`${lbSinks()}${lbLoira(540, 1580, 1.0)}`, `${lbDark('dk')}${bzSign('tt', 'A LOIRA DO BANHEIRO', 540, 380, -4, BZ.yellow, BZ.ink, 96)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#loira'), s.t0, 'dead', 'flat'); tl.set($('#loira .nosebleed'), { opacity: 1 }, s.t0); tl.set($('#tt'), { opacity: 0 }, s.t0);
      lbFlicker(tl, $('#dk'), s.t0, s.t0 + 0.6, 0.8); lbShow(tl, $('#tt'), K('t')); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 800); } },
  // ---------------- the school
  schools: { bg: '#7ec4ee', html: () => lbShot(`${bzSky('#7ec4ee', '#f6e2b8')}${bzSun(160, 420, 80, '#fff0b0')}<path d="M-20 1940 L-20 1260 Q 300 1150 600 1230 T 1100 1180 L1100 1940 Z" fill="#7aa86a" ${bzO()}/>
      ${lbMiniSchool('m1', 230, 1330, 0.75, '#c8342c')}${lbMiniSchool('m2', 600, 1180, 0.55, '#2f62b8')}${lbMiniSchool('m3', 870, 1420, 0.8, '#e0a030')}`, bzSign('tg', 'TODA ESCOLA TEM A SUA', 540, 470, -3, BZ.navy, '#fff', 76)),
    anim(tl, s, K, $) { bzPop(tl, $('#tg'), s.t0 + 0.1); ['m1', 'm2', 'm3'].forEach((m, i) => { bzPop(tl, $('#' + m), s.t0 + 0.15 * i); tl.to($(`#${m} .ghost`), { opacity: 1, duration: 0.15 }, K('g') + 0.25 * i); }); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  school: { bg: '#7ec4ee', html: () => lbShot(`${lbSchool()}${lbCarol(330, 1560, 0.85)}${lbBia(520, 1560, 0.85)}`, bzSign('sg', 'ESCOLA DOM PEDRO', 540, 430, -3, BZ.navy, '#fff', 90, { text: '1996', bg: BZ.red, fg: '#fff' })),
    anim(tl, s, K, $) { bzWalk(tl, $('#carol'), s.t0, s.t1, -120, 60); bzWalk(tl, $('#bia'), s.t0, s.t1, -120, 60); bzFace(tl, $('#bia'), s.t0, 'dot', 'grin'); bzPop(tl, $('#sg'), s.t0 + 0.15); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },
  bia: { bg: '#7ec4ee', html: () => lbShot(`<g transform="translate(-540 -700) scale(2)">${lbSchool()}</g>${lbCarol(300, 1480, 1.3)}${lbBia(740, 1480, 1.3, true)}`, bzSign('ha', 'HAHAHA', 820, 470, 6, BZ.yellow, BZ.ink, 80)),
    anim(tl, s, K, $) { bzFace(tl, $('#bia'), s.t0, 'closed', 'grin'); bzFace(tl, $('#carol'), s.t0, 'wide', 'frown'); bzPose(tl, $('#bia'), s.t0 + 0.1, { aL: 150, aR: -20 }, 0.2);
      tl.fromTo($('#bia .hd'), { rotation: -6, transformOrigin: '50% 90%' }, { rotation: 6, duration: 0.18, yoyo: true, repeat: 9 }, s.t0 + 0.2); bzPop(tl, $('#ha'), s.t0 + 0.4); bzBlink(tl, $('#carol'), s.t0, s.t1); } },
  hall: { bg: '#ece6d6', html: () => lbShot(`${lbHall()}${lbCarol(80, 1480, 1.3)}${lbBia(330, 1480, 1.3)}`),
    anim(tl, s, K, $) { bzWalk(tl, $('#bia'), s.t0, s.t1, -200, 300, true); bzWalk(tl, $('#carol'), s.t0, s.t1, -200, 300, true); bzFace(tl, $('#carol'), s.t0, 'wide', 'o'); bzFace(tl, $('#bia'), s.t0, 'dot', 'grin'); } },
  tape: { bg: '#ece6d6', html: () => lbShot(`<g transform="translate(-1180 -1040) scale(2)">${lbHall()}</g>`, `${bzVignette(0.6)}${bzFlash('fl')}`),
    anim(tl, s, K, $) { lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); lbHit(tl, $('#fl'), K('z'), 0.3); } },
  dare: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbCarol(280, 1480, 1.3)}${lbBia(760, 1480, 1.3, true)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzFace(tl, $('#carol'), s.t0, 'wide', 'frown'); bzFace(tl, $('#bia'), s.t0, 'dot', 'grin'); bzTalk(tl, $('#bia'), 'lb_bia', s.t0, s.t1, 'grin');
      bzPose(tl, $('#bia'), s.t0 + 0.3, { aR: -50 }, 0.3); bzPose(tl, $('#bia'), s.t0 + 1.6, { aR: -10 }, 0.3); bzBlink(tl, $('#bia'), s.t0, s.t1, 2.2); bzShake(tl, $('#carol'), s.t0, s.t1, 1.5); } },
  // ---------------- the ritual
  pull: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbCarol(260, 1480, 1.3)}${lbBia(690, 1480, 1.3)}`, bzVignette(0.55)),
    anim(tl, s, K, $) { tl.set($('#door2'), { scaleX: 0.15, svgOrigin: '572 0' }, s.t0); bzFace(tl, $('#carol'), s.t0, 'wide', 'o'); bzFace(tl, $('#bia'), s.t0, 'dot', 'flat');
      bzPose(tl, $('#bia'), s.t0 + 0.3, { aR: -160 }, 0.35); bzPose(tl, $('#carol'), s.t0 + 0.2, { aL: 150, aR: -150 }, 0.3); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 690, 1000); } },
  flush3: { bg: '#5f9e86', html: () => lbShot(`${lbFlush()}${lbArm('#93593a')}`, `${lbNum('n1', '1', 220, 600)}${lbNum('n2', '2', 540, 520)}${lbNum('n3', '3', 860, 600, BZ.red)}${bzVignette(0.7)}${bzFlash('fl')}`),
    anim(tl, s, K, $) { ['f1', 'f2', 'f3'].forEach((k, i) => { lbPress(tl, $('#btn'), K(k)); tl.fromTo($('#arm'), { y: 0 }, { y: 30, duration: 0.08, yoyo: true, repeat: 1 }, K(k)); lbShow(tl, $('#n' + (i + 1)), K(k)); lbHit(tl, $('#fl'), K(k), 0.35);
      tl.to($('#cam'), { scale: 1.06 + i * 0.08, svgOrigin: '540 900', duration: 0.12, ease: 'power3.out' }, K(k)); }); } },
  wait: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbCarol(260, 1480, 1.3)}${lbBia(690, 1480, 1.3)}`, `${lbDark('dk', '#000')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#door2'), { scaleX: 0.15, svgOrigin: '572 0' }, s.t0); bzFace(tl, $('#carol'), s.t0, 'wide', 'flat'); bzFace(tl, $('#bia'), s.t0, 'half', 'flat'); tl.set($('#dk'), { opacity: 0.25 }, s.t0);
      lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1000); } },
  kick2: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbCarol(200, 1480, 1.3)}${lbBia(930, 1480, 1.3)}`, `${bzVignette(0.65)}${bzFlash('fl')}`),
    anim(tl, s, K, $) { bzFace(tl, $('#bia'), s.t0, 'angry', 'grin'); bzFace(tl, $('#carol'), s.t0, 'wide', 'o'); bzWalk(tl, $('#bia'), s.t0, K('k') - 0.2, -200, 0);
      bzPose(tl, $('#bia'), K('k') - 0.15, { lR: -80, lL: 0, aL: 45, aR: -30 }, 0.12); bzPose(tl, $('#bia'), K('k') + 0.4, { lR: 0, aL: 0, aR: 0 }, 0.3);
      tl.fromTo($('#door3'), { rotation: 0 }, { rotation: 2.5, svgOrigin: '930 1340', duration: 0.05, yoyo: true, repeat: 7 }, K('k')); lbHit(tl, $('#fl'), K('k'), 0.45); } },
  swear2: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbBia(600, 1600, 2.3, true)}${lbSwear('sw', 470, 420, 1.0)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#bia'), s.t0, 'closed', 'open'); tl.set($('#sw'), { opacity: 0 }, s.t0); lbShow(tl, $('#sw'), K('b')); bzShake(tl, $('#bia'), K('b'), K('b') + 0.5, 6);
      bzPose(tl, $('#bia'), s.t0, { aL: 160, aR: -160 }, 0.3); } },
  nada: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbCarol(270, 1480, 1.3)}${lbBia(760, 1480, 1.3, true)}`, bzVignette(0.55)),
    anim(tl, s, K, $) { tl.set($('#door3'), { scaleX: 0.15, svgOrigin: '827 0' }, s.t0); bzFace(tl, $('#bia'), s.t0, 'dot', 'grin'); bzFace(tl, $('#carol'), s.t0, 'half', 'flat');
      bzPose(tl, $('#bia'), s.t0 + 0.2, { aL: 60, aR: -60 }, 0.25); bzTalk(tl, $('#bia'), 'lb_bia', s.t0, s.t1, 'grin'); bzFace(tl, $('#carol'), s.t0 + 1.4, undefined, 'smile'); bzBlink(tl, $('#carol'), s.t0, s.t1); } },
  // ---------------- her
  flicker: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbCarol(270, 1480, 1.3)}${lbBia(760, 1480, 1.3, true)}`, `${lbDark('dk')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#door3'), { scaleX: 0.15, svgOrigin: '827 0' }, s.t0); bzFace(tl, $('#bia'), s.t0, 'dot', 'smile'); bzFace(tl, $('#carol'), s.t0, 'dot', 'flat');
      lbFlicker(tl, $('#dk'), K('off'), s.t1, 0.9); bzFace(tl, $('#bia'), K('off') + 0.2, 'wide', 'o'); bzFace(tl, $('#carol'), K('off') + 0.1, 'wide', 'o'); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 540, 400); } },
  mirror: { bg: '#d8cfb4', html: () => lbShot(lbSinks(`<g id="her" opacity="0">${lbLoira(540, 1250, 0.85)}</g>${lbCarol(330, 1300, 0.9)}${lbBia(750, 1300, 0.9)}`), `${lbDark('dk')}${bzVignette(0.7)}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { bzFace(tl, $('#carol'), s.t0, 'wide', 'flat'); bzFace(tl, $('#bia'), s.t0, 'wide', 'flat'); bzFace(tl, $('#loira'), s.t0, 'dead', 'flat');
      lbFlicker(tl, $('#dk'), s.t0, s.t0 + 0.5, 0.85); tl.to($('#her'), { opacity: 1, duration: 0.08 }, K('her')); lbHit(tl, $('#fl'), K('her'), 0.6); bzFace(tl, $('#carol'), K('her') + 0.3, undefined, 'o'); bzFace(tl, $('#bia'), K('her') + 0.4, undefined, 'o');
      tl.set($('#dk'), { opacity: 0.2 }, K('her')); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 830); } },
  pale: { bg: '#14181e', html: () => lbShot(`<rect width="1080" height="1920" fill="#1c2128"/>${lbLoira(540, 2240, 2.6)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { bzFace(tl, $('#loira'), s.t0, 'dead', 'flat'); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 820); } },
  cotton: { bg: '#14181e', html: () => lbShot(`<rect width="1080" height="1920" fill="#1c2128"/>${lbLoira(540, 4070, 6)}`, bzVignette(0.85)),
    anim(tl, s, K, $) { bzFace(tl, $('#loira'), s.t0, 'dead', 'flat'); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  red: { bg: '#14181e', html: () => lbShot(`<rect width="1080" height="1920" fill="#1c2128"/>${lbLoira(540, 4800, 7.5)}`, `<rect id="tint" width="1080" height="1920" fill="${BZ.blood}" opacity="0"/>${bzVignette(0.9)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#loira'), s.t0, 'dead', 'flat'); tl.fromTo($('#loira .nosebleed'), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power1.in' }, s.t0 + 0.4);
      tl.fromTo($('#tint'), { opacity: 0 }, { opacity: 0.35, duration: 0.3, yoyo: true, repeat: 1 }, K('r')); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 900); } },
  corre: { bg: '#d8cfb4', html: () => lbShot(`${lbBath()}${lbCarol(320, 1560, 2.0)}${lbBia(780, 1560, 2.0, true)}`, `${lbDark('dk', '#2a0508')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#carol'), s.t0, 'wide', 'open'); bzFace(tl, $('#bia'), s.t0, 'wide', 'open'); bzTalk(tl, $('#bia'), 'lb_bia', s.t0, s.t1, 'open');
      tl.set($('#dk'), { opacity: 0.35 }, s.t0); bzShake(tl, $('#carol'), s.t0, s.t1, 4); bzShake(tl, $('#bia'), s.t0, s.t1, 4); bzPose(tl, $('#carol'), s.t0, { aL: 150, aR: -150 }, 0.15); } },
  door: { bg: '#d8cfb4', html: () => lbShot(lbBath(), `${lbDark('dk', '#2a0508')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { tl.set($('#dk'), { opacity: 0.4 }, s.t0); tl.to($('#door3'), { scaleX: 0.12, svgOrigin: '827 0', duration: 0.7, ease: 'power2.out' }, K('o')); tl.to($('#eyes3'), { opacity: 1, duration: 0.1 }, K('o') + 0.6);
      lbFlicker(tl, $('#dk'), K('o') + 0.8, s.t1 - 0.05, 0.75); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.35, 930, 1000); } },
  taps: { bg: '#d8cfb4', html: () => lbShot(lbSinks(), `${lbDark('dk', '#2a0508')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#dk'), { opacity: 0.3 }, s.t0);
      [0, 1, 2].forEach((i) => { const t = K('p') + i * 0.18; tl.set($('#stream' + i), { opacity: 1 }, t); tl.fromTo($('#stream' + i), { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: 0.25 }, t); tl.to($('#pool' + i), { opacity: 1, duration: 0.3 }, t + 0.2); });
      tl.to($('#floodpool'), { attr: { rx: 640, ry: 160 }, duration: 2.2, ease: 'power1.out' }, K('p') + 0.5); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1200); } },
  // ---------------- after
  run: { bg: '#ece6d6', html: () => lbShot(`${lbHall()}${lbCarol(700, 1480, 1.3, true)}${lbBia(950, 1480, 1.3, true)}`),
    anim(tl, s, K, $) { bzWalk(tl, $('#carol'), s.t0, s.t1, 200, -900, true); bzWalk(tl, $('#bia'), s.t0, s.t1, 200, -900, true); bzFace(tl, $('#carol'), s.t0, 'wide', 'open'); bzFace(tl, $('#bia'), s.t0, 'wide', 'open');
      tl.fromTo($('#cam'), { y: -4 }, { y: 4, duration: 0.08, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.08), ease: 'none' }, s.t0); } },
  back: { bg: '#ece6d6', html: () => lbShot(`${lbHall()}${lbBia(560, 1400, 1.05)}${lbCarol(220, 1520, 1.4)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzWalk(tl, $('#bia'), s.t0 + 0.4, s.t1, 0, 300); bzFace(tl, $('#bia'), s.t0, 'angry', 'flat'); bzFace(tl, $('#carol'), s.t0, 'wide', 'o'); bzPose(tl, $('#carol'), s.t0 + 0.3, { aR: -120 }, 0.3); } },
  bag: { bg: '#9aa0a0', html: () => lbShot(`<g transform="translate(-540 -1450) scale(2)">${lbSinks()}</g>${lbShadow('sh', 260, 1300, 1.5)}<ellipse cx="540" cy="1560" rx="560" ry="170" fill="${BZ.blood}"/>${lbBag('bg', 520, 1560, 1.3)}${lbBia(1180, 1640, 1.4, true)}`, `${bzFlash('bk', '#000')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#bia'), s.t0, 'half', 'flat'); bzWalk(tl, $('#bia'), s.t0, s.t0 + 1.2, 0, -360); bzPose(tl, $('#bia'), s.t0 + 1.0, { aL: -60, aR: 0 }, 0.3);
      tl.fromTo($('#sh'), { opacity: 0, x: -250 }, { opacity: 1, x: 0, duration: 1.4, ease: 'power1.in' }, s.t0 + 0.8); bzFace(tl, $('#bia'), s.t0 + 1.8, 'wide', 'o'); tl.set($('#bk'), { opacity: 1 }, K('slam')); } },
  silent: { bg: '#e9dcc0', html: () => lbShot(`${lbClass()}${lbCarol(300, 1480, 1.3)}${lbBia(780, 1480, 1.3, true)}${lbDesks()}`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzFace(tl, $('#bia'), s.t0, 'half', 'flat'); bzFace(tl, $('#carol'), s.t0, 'dot', 'frown'); bzBlink(tl, $('#carol'), s.t0, s.t1); lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 780, 950); } },
  twice: { bg: '#5f9e86', html: () => lbShot(`${lbFlush()}${lbArm('#93593a', '#7a8a9a')}`, `${lbNum('n1', '1', 220, 600)}${lbNum('n2', '2', 540, 520)}${lbNum('n3', '3?', 860, 600, BZ.red)}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { ['f1', 'f2'].forEach((k, i) => { lbPress(tl, $('#btn'), K(k)); tl.fromTo($('#arm'), { y: 0 }, { y: 30, duration: 0.08, yoyo: true, repeat: 1 }, K(k)); lbShow(tl, $('#n' + (i + 1)), K(k)); });
      tl.fromTo($('#arm'), { x: 0 }, { x: 6, duration: 0.05, yoyo: true, repeat: 10 }, K('f2') + 0.4); tl.to($('#arm'), { y: 700, duration: 0.6, ease: 'power2.in' }, K('f2') + 1.0); lbShow(tl, $('#n3'), K('f2') + 1.2); } },
  you: { bg: '#0c0f12', html: () => lbShot(lbFlush(), `<rect width="1080" height="1920" fill="#000" opacity="0.55"/><g id="eyes" opacity="0"><ellipse cx="440" cy="420" rx="46" ry="22" fill="#f4f8ff"/><ellipse cx="640" cy="420" rx="46" ry="22" fill="#f4f8ff"/><circle cx="440" cy="420" r="9" fill="${BZ.ink}"/><circle cx="640" cy="420" r="9" fill="${BZ.ink}"/></g>${bzVignette(0.85)}`),
    anim(tl, s, K, $) { lbPush(tl, $('#cam'), s.t0, s.t1, 1, 1.25, 540, 900); tl.to($('#eyes'), { opacity: 1, duration: 0.06 }, K('eyes')); } },
});
