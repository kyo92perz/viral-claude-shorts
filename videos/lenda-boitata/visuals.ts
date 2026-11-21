// <lines>
const BO_LINES: { who: string; t0: number; t1: number }[] = [];
// </lines>
// =====================================================================
//  O BOITATÁ: the shots (Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400; faces above ~1050 or filling the frame. Heads above the feet: Zeca 507*s.
// =====================================================================
BZ_TALK.lines = BO_LINES;
const boDark = (id = 'dk', c = '#05060c', k = 0) => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="${k}"/>`;
const boOrange = (id = 'og', k = 0) => `<rect id="${id}" width="1080" height="1920" fill="#ff7a2a" opacity="${k}"/>`;
// a torch in the hand of the peão (local origin at the hand)
const boTorch = (x: number, y: number) => `<g transform="translate(${x} ${y})"><rect x="-8" y="-20" width="16" height="140" fill="#6a4a2a" ${bzO('stroke-width="4"')}/><g transform="translate(0 -20) scale(0.5)"><path class="fl" d="M-50 0 Q -70 -90 -10 -150 Q 0 -90 20 -90 Q 30 -170 60 -200 Q 80 -100 50 0 Z" fill="#e0402a" ${bzO()}/></g></g>`;

defineVisuals({
  // ---------------- the hook: the eyes in the dark at frame 1
  hook: { bg: '#0b0e18', html: () => bzShot(`<rect width="1080" height="1920" fill="#0b0e18"/>${[...Array(7)].map((_, i) => boTree(i * 170 - 20, 1900, 1.6, '#0f1a18')).join('')}${boSnake('boi', 260, 860, 3.0, 6)}`, `${bzSign('hk', 'NÃO OLHE PRA LUZ', 540, 1540, -4, BZ.red, '#fff', 100)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { boSlither(tl, $('#boi'), s.t0, s.t1, 18); bzHook(tl, $('#hk'), s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 860); } },
  title: { bg: '#0b1028', html: () => bzShot(`${boForest()}${boSnake('boi', 0, 1480, 0.85, 18)}`, `${bzSign('tt', 'O BOITATÁ', 540, 360, -4, BZ.yellow, BZ.ink, 130)}${bzFlash('fl', '#ffb060')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { boSlither(tl, $('#boi'), s.t0, s.t1); tl.fromTo($('#boi'), { x: -200 }, { x: 700, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.4); } },
  // ---------------- what it is
  snake: { bg: '#0b1028', html: () => bzShot(`${boForest()}${boSnake('boi', 0, 1480, 0.7, 26)}`, `<rect width="1080" height="1920" fill="#ff7a2a" opacity="0.08"/>${bzVignette(0.6)}`),
    anim(tl, s, K, $) { boSlither(tl, $('#boi'), s.t0, s.t1, 40); tl.fromTo($('#boi'), { x: -300 }, { x: 1500, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  eyes: { bg: '#0b0e18', html: () => bzShot(`<rect width="1080" height="1920" fill="#0b0e18"/>${boSnake('boi', 120, 900, 3.4, 5)}`, bzVignette(0.85)),
    anim(tl, s, K, $) { boSlither(tl, $('#boi'), s.t0, s.t1, 14); tl.fromTo($('#boi .head'), { opacity: 0.4 }, { opacity: 1, duration: 0.5 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 800); } },
  protect: { bg: '#0b1028', html: () => bzShot(`${boForest()}${boCapy('cp', 260, 1700, 0.9)}${boDeer('dr', 780, 1720, 0.9)}${boSnake('boi', 700, 1300, 0.45, 20)}`, ''),
    anim(tl, s, K, $) { boSlither(tl, $('#boi'), s.t0, s.t1, 20); tl.fromTo($('#boi'), { x: -400 }, { x: 300, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  // ---------------- tio Zeca
  zeca: { bg: '#0b1028', html: () => bzShot(`${boForest()}${boZeca(540, 1560, 1.25)}`, bzSign('nm', 'TIO ZECA', 540, 360, -4, BZ.yellow, BZ.ink, 110)),
    anim(tl, s, K, $) { bzFace(tl, $('#zeca'), s.t0, 'half', 'smile'); bzPose(tl, $('#zeca'), s.t0, { aL: 30, aR: -30 }, 0.01); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), K('n')); bzBlink(tl, $('#zeca'), s.t0, s.t1); } },
  order: { bg: '#0b1028', html: () => bzShot(`${boForest()}${boZeca(330, 1560, 1.2)}${boPeao(780, 1560, 1.1, true)}${boTorch(705, 1290)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#zeca'), s.t0, 'angry', 'open'); bzPose(tl, $('#zeca'), s.t0 + 0.2, { aR: -110 }, 0.3); bzFace(tl, $('#peao'), s.t0, 'wide', 'flat'); boFlicker(tl, $(''), s.t0, s.t1); } },
  lenda: { bg: '#0b1028', html: () => bzShot(`${boForest(false)}${boZeca(540, 1950, 2.2)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#zeca'), s.t0, 'half', 'grin'); bzTalk(tl, $('#zeca'), 'bo_zeca', s.t0, s.t1, 'grin', 'open'); bzPose(tl, $('#zeca'), s.t0 + 0.3, { aR: -90 }, 0.3); } },
  // ---------------- the fire
  blaze: { bg: '#0b1028', html: () => bzShot(`${boForest(false)}<g id="fw">${boFireWall()}</g>`, `${boOrange('og', 0)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#fw'), { scaleY: 0.2, svgOrigin: '540 1260' }, { scaleY: 1.15, svgOrigin: '540 1260', duration: 0.8, ease: 'power2.out' }, K('f') - 0.3); boFlicker(tl, $(''), s.t0, s.t1); tl.to($('#og'), { opacity: 0.2, duration: 0.6 }, K('f')); bzQuake(tl, $('#cam'), K('f'), K('f') + 0.3, 6); } },
  flee: { bg: '#0b1028', html: () => bzShot(`${boForest()}${boFireWall(1260)}${boCapy('cp', 900, 1700, 1)}${boDeer('dr', 1100, 1760, 1)}`, boOrange('og', 0.15)),
    anim(tl, s, K, $) { boFlicker(tl, $(''), s.t0, s.t1); tl.fromTo($('#cp'), { x: 0 }, { x: -1200, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.fromTo($('#dr'), { x: 0 }, { x: -1500, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      tl.fromTo($('#cp, #dr'), { y: 0 }, { y: -20, duration: 0.15, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.15) }, s.t0); } },
  flame: { bg: '#0b1028', html: () => bzShot(`<g transform="translate(-540 -1100) scale(2)">${boForest(false)}${boFireWall()}</g>`, boOrange('og', 0.12)),
    anim(tl, s, K, $) { boFlicker(tl, $(''), s.t0, s.t1); tl.to($('.firewall > g:nth-child(5)'), { scaleY: 0.25, svgOrigin: '540 1260', duration: s.t1 - s.t0, ease: 'power2.in' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1400); } },
  crawl: { bg: '#0b1028', html: () => bzShot(`${boForest(false)}${boFireWall()}${boSnake('boi', 300, 1560, 0.8, 14)}`, boOrange('og', 0.12)),
    anim(tl, s, K, $) { boFlicker(tl, $(''), s.t0, s.t1); boSlither(tl, $('#boi'), s.t0, s.t1, 30); tl.fromTo($('#boi'), { x: -300, y: -180 }, { x: 300, y: 0, duration: s.t1 - s.t0, ease: 'power1.out' }, s.t0); } },
  long: { bg: '#0b1028', html: () => bzShot(`${boForest()}${boSnake('boi', 0, 1500, 0.55, 40)}`, boOrange('og', 0.1)),
    anim(tl, s, K, $) { boSlither(tl, $('#boi'), s.t0, s.t1, 30); tl.fromTo($('#boi'), { x: 0 }, { x: 1900, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  toward: { bg: '#0b1028', html: () => bzShot(`${boForest(false)}<g id="fw">${boFireWall()}</g>${boSnake('boi', 260, 1450, 0.75, 16)}${boZeca(840, 1760, 1.25, true)}`, boOrange('og', 0.12)),
    anim(tl, s, K, $) { boFlicker(tl, $(''), s.t0, s.t1); boSlither(tl, $('#boi'), s.t0, s.t1, 28); tl.fromTo($('#boi'), { x: -500 }, { x: 150, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      tl.to($('#fw'), { scaleY: 0.1, svgOrigin: '540 1260', duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzFace(tl, $('#zeca'), s.t0, 'wide', 'open'); bzShake(tl, $('#zeca'), s.t0, s.t1, 3); } },
  deus: { bg: '#0b1028', html: () => bzShot(`${boForest(false)}${boZeca(540, 1950, 2.2)}`, `${boOrange('og', 0)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#zeca'), s.t0, 'wide', 'open'); bzTalk(tl, $('#zeca'), 'bo_zeca', s.t0, s.t1, 'open', 'open'); tl.to($('#og'), { opacity: 0.3, duration: s.t1 - s.t0 }, s.t0); bzShake(tl, $('#zeca'), s.t0, s.t1, 4); } },
  // ---------------- the eyes
  rise: { bg: '#0b0e18', html: () => bzShot(`${boForest(false)}${boSnake('boi', 380, 1700, 1.4, 8)}`, `${boOrange('og', 0.1)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { boSlither(tl, $('#boi'), s.t0, s.t1, 16); tl.fromTo($('#boi .head'), { y: 200, rotation: 0, svgOrigin: '70 0' }, { y: -380, rotation: -25, svgOrigin: '70 0', duration: 1.2, ease: 'power2.out' }, K('r')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1100); } },
  fireeyes: { bg: '#0b0e18', html: () => bzShot(`<rect width="1080" height="1920" fill="#0b0e18"/><g transform="translate(40 1110) scale(5)">${boSnake('boi', 0, 0, 1, 1)}</g>`, `${boOrange('og', 0.08)}${bzVignette(0.9)}`),
    anim(tl, s, K, $) { tl.fromTo($('#boi .head circle'), { opacity: 0.6 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.1) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 800); } },
  look: { bg: '#0b1028', html: () => bzShot(`${boForest(false)}${boZeca(540, 2600, 3.2)}`, `${boOrange('og', 0.3)}${bzFlash('fl', '#fff4c8')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#zeca'), s.t0, 'wide', 'o'); bzHit(tl, $('#fl'), K('w'), 1); tl.set($('#fl'), { opacity: 1 }, K('w') + 0.2); tl.to($('#fl'), { opacity: 0, duration: 0.8 }, K('w') + 0.3); bzFace(tl, $('#zeca'), K('w'), 'glow', 'open'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.2, 540, 960); } },
  // ---------------- the morning after
  morning: { bg: '#f29a4a', html: () => bzShot(boDawn(), ''), anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1200); } },
  blind: { bg: '#f29a4a', html: () => bzShot(`${boDawn()}${boZeca(540, 1560, 1.3, false, true)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#zeca'), s.t0, 'glow', 'flat'); tl.fromTo($('#zeca .hd'), { rotation: -6, transformOrigin: '50% 90%' }, { rotation: 6, duration: 1.2, yoyo: true, repeat: 2, ease: 'sine.inOut' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  luz: { bg: '#f29a4a', html: () => bzShot(`${boDawn()}${boZeca(540, 2600, 3.2, false, true)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#zeca'), s.t0, 'glow', 'flat'); bzTalk(tl, $('#zeca'), 'bo_zeca', s.t0, s.t1, 'flat', 'o'); bzShake(tl, $('#zeca'), s.t0, s.t1, 2); } },
  you: { bg: '#0b0e18', html: () => bzShot(`<rect width="1080" height="1920" fill="#0b0e18"/>${[...Array(7)].map((_, i) => boTree(i * 170 - 20, 1900, 1.6, '#0f1a18')).join('')}<circle id="dot" cx="300" cy="1300" r="26" fill="#ffb060"/><circle cx="300" cy="1300" r="70" fill="#ffb060" opacity="0.25" id="dotg"/><g id="big" opacity="0">${boSnake('boi', 260, 860, 3.0, 6)}</g>`, `${bzFlash('fl', '#ffb060')}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.fromTo($('#dot, #dotg'), { x: 0, y: 0 }, { x: 500, y: -200, duration: K('end') - s.t0, ease: 'sine.inOut' }, s.t0); tl.set($('#dot, #dotg'), { opacity: 0 }, K('end'));
      tl.set($('#big'), { opacity: 1 }, K('end')); bzHit(tl, $('#fl'), K('end'), 0.5); boSlither(tl, $('#boi'), K('end'), s.t1, 14); } },
});
