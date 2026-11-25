// <lines>
const MA_LINES: { who: string; t0: number; t1: number }[] = [];
// </lines>
// =====================================================================
//  O MAPINGUARI: the shots (detailed Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Léo 350*s. The giant at s = 1 is ~1400 tall:
//  its eye sits 1180*s above its feet, its belly mouth 620*s.
// =====================================================================
BZ_TALK.lines = MA_LINES;
const maSay = (id: string, txt: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, txt, x, y, rot, bg, fg, size);
// monkeys sitting on a branch (silhouettes with eyes)
const maMonkeys = () => `<path d="M-20 520 Q 400 470 1100 560" stroke="#0a120e" stroke-width="40" fill="none"/>${[180, 460, 760].map((x, i) => `<g transform="translate(${x} ${500 + i * 14})"><ellipse cx="0" cy="-40" rx="46" ry="56" fill="#0a120e"/><circle cx="0" cy="-110" r="38" fill="#0a120e"/><circle cx="-12" cy="-112" r="6" fill="#f4ecd8"/><circle cx="12" cy="-112" r="6" fill="#f4ecd8"/><path d="M30 -10 q 60 40 20 120" stroke="#0a120e" stroke-width="14" fill="none"/></g>`).join('')}`;
// green stench drifting out of the jungle (.stink)
const maStink = () => `<g id="stink">${[...Array(7)].map((_, i) => `<path class="stink" d="M${-200 + i * 40} ${800 + i * 120} q 80 -60 160 0 t 160 0 t 160 0" stroke="#8ab83a" stroke-width="16" fill="none" opacity="0.55" stroke-linecap="round"/>`).join('')}</g>`;
// Chico's rifle (local origin at the stock), and its muzzle flash (#mf)
const maRifle = (x: number, y: number, rot: number, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 L100 -20 L110 12 L16 26 Z" fill="#6a3a1a" ${bzO()}/><rect x="96" y="-18" width="360" height="20" rx="8" fill="#3a3a44" ${bzO()}/>
  <g id="mf" opacity="0"><path d="M460 -8 l 90 -50 l -30 50 l 90 10 l -90 20 l 40 50 l -100 -40 z" fill="#ffe08a" ${bzO('stroke-width="5"')}/></g></g>`;
// a tear on the grandfather's cheek
const maTear = (x: number, y: number) => `<g id="tear" opacity="0"><path d="M${x} ${y} q -16 30 0 44 q 16 -14 0 -44 z" fill="#8ad0ff" ${bzO('stroke-width="4"')}/></g>`;

defineVisuals({
  // ---------------- the hook: the giant in the dark, one red eye, at frame 1
  hook: { bg: '#060c14', html: () => bzShot(`${maJungle()}${maGiant('mapi', 540, 1820, 1.05)}${bzParticles('sp', 'spores', 22, [0, 500, 1080, 1700], 3)}`, `${maSay('hk', 'NUNCA RESPONDA', 540, 1560, -4, BZ.red, '#fff', 110)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { maSway(tl, $('#mapi'), s.t0, s.t1); bzHook(tl, $('#hk'), s.t0); bzParticlesGo(tl, $('#sp'), 'spores', s.t0, s.t1); bzQuake(tl, $('#cam'), K('h'), K('h') + 0.6, 6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 700); } },
  mouth: { bg: '#060c14', html: () => bzShot(`<rect width="1080" height="1920" fill="#060c14"/>${maGiant('mapi', 540, 2450, 2.4)}`, `${bzFlash('fl', BZ.red)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { maMouth(tl, $('#mapi'), K('m')); bzHit(tl, $('#fl'), K('m'), 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 960); } },
  title: { bg: '#060c14', html: () => bzShot(`${maJungle()}${maGiant('mapi', 540, 1820, 1.05)}`, `${maSay('tt', 'O MAPINGUARI', 540, 260, -4, BZ.yellow, BZ.ink, 110)}${bzFlash('fl', '#fff')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { maSway(tl, $('#mapi'), s.t0, s.t1); maMouth(tl, $('#mapi'), s.t0); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.3); } },
  // ---------------- vô Raimundo
  vo: { bg: '#4a3424', html: () => bzShot(`${maKitchen()}${maOld(540, 1720, 1.6)}`, maSay('nm', 'VÔ RAIMUNDO', 540, 360, -4, BZ.yellow, BZ.ink, 100)),
    anim(tl, s, K, $) { bzFace(tl, $('#raiold'), s.t0, 'half', 'flat'); bzIdle(tl, $('#raiold'), s.t0, s.t1); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), K('n')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 540, 900); } },
  tear: { bg: '#4a3424', html: () => bzShot(`${maKitchen()}${maOld(540, 2400, 2.9)}${maTear(470, 1010)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#raiold'), s.t0, 'half', 'frown'); tl.to($('#tear'), { opacity: 1, duration: 0.2 }, s.t0 + 0.8); tl.fromTo($('#tear'), { y: 0 }, { y: 120, duration: 1.6, ease: 'power1.in' }, s.t0 + 1.0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 950); } },
  // ---------------- 1975
  seringa: { bg: '#060c14', html: () => bzShot(`<g transform="translate(364 -1888) scale(2.4)">${maJungle()}</g>${maRai(330, 1900, 1.6)}`, `${maSay('yr', 'ACRE • 1975', 540, 360, -3, '#fff', BZ.ink, 90)}<rect width="1080" height="1920" fill="#c8a060" opacity="0.15"/>${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rai'), s.t0, 'dot', 'flat'); bzPose(tl, $('#rai'), s.t0 + 0.2, { aR: -100 }, 0.3); tl.fromTo($('#rai .aR'), { rotation: -100 }, { rotation: -70, duration: 0.3, yoyo: true, repeat: 5 }, s.t0 + 0.5); bzPop(tl, $('#yr'), s.t0 + 0.2); } },
  camp: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maRai(330, 1560, 1.0)}${maChico(760, 1560, 1.0, true)}${bzParticles('em', 'embers', 18, [440, 1200, 640, 1480], 3)}${bzParticles('ff', 'fireflies', 16, [0, 500, 1080, 1200], 4)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); bzParticlesGo(tl, $('#em'), 'embers', s.t0, s.t1); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); bzIdle(tl, $('#rai'), s.t0, s.t1); bzIdle(tl, $('#chico'), s.t0, s.t1, 1);
      bzFace(tl, $('#chico'), s.t0, 'dot', 'grin'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1300); } },
  // ---------------- the scream
  grito: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maRai(330, 1560, 1.0)}${maChico(760, 1560, 1.0, true)}${bzParticles('em', 'embers', 18, [440, 1200, 640, 1480], 5)}`, `${maSay('ui', 'UUUUOOOO', 540, 420, -6, '#fff', BZ.ink, 110)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); bzParticlesGo(tl, $('#em'), 'embers', s.t0, s.t1); bzFace(tl, $('#rai'), s.t0, 'dot', 'flat'); bzFace(tl, $('#chico'), s.t0, 'dot', 'flat');
      bzFace(tl, $('#rai'), K('g') + 0.2, 'wide', 'o'); bzFace(tl, $('#chico'), K('g') + 0.3, 'wide', 'o'); tl.set($('#ui'), { opacity: 0 }, s.t0); bzShow(tl, $('#ui'), K('g')); bzQuake(tl, $('#ui'), K('g'), K('g') + 1.2, 6); } },
  monkeys: { bg: '#060c14', html: () => bzShot(`${bzSky('#060c14', '#18263a')}${[...Array(6)].map((_, i) => `<circle cx="${i * 200}" cy="${300 + (i % 2) * 60}" r="${200}" fill="#0c1a14"/>`).join('')}${maMonkeys()}`, bzVignette(0.8)),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 500); } },
  quemta: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maChico(540, 1900, 2.1)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); bzFace(tl, $('#chico'), s.t0, 'dot', 'open'); bzTalk(tl, $('#chico'), 'ma_chico', s.t0, s.t1, 'smile', 'open'); bzPose(tl, $('#chico'), s.t0, { aL: 150, aR: -150 }, 0.2); } },
  calaboca: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maRai(540, 1900, 2.1)}`, `<rect width="1080" height="1920" fill="${BZ.blood}" opacity="0.12"/>${bzVignette(0.7)}`),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); bzFace(tl, $('#rai'), s.t0, 'angry', 'open'); bzTalk(tl, $('#rai'), 'ma_vo', s.t0, s.t1, 'frown', 'open'); bzShake(tl, $('#rai'), s.t0, s.t1, 3); bzPose(tl, $('#rai'), s.t0, { aR: -110 }, 0.15); } },
  closer: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maRai(330, 1560, 1.0)}${maChico(760, 1560, 1.0, true)}`, `${maSay('ui', 'UUUUOOOO', 540, 420, 5, BZ.red, '#fff', 140)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); bzFace(tl, $('#chico'), s.t0, 'wide', 'o'); bzFace(tl, $('#rai'), s.t0, 'angry', 'flat'); tl.set($('#ui'), { opacity: 0 }, s.t0); bzShow(tl, $('#ui'), K('g')); bzQuake(tl, $('#cam'), K('g'), K('g') + 0.8, 8); bzShake(tl, $('#chico'), K('g'), s.t1, 3); } },
  // ---------------- the smell, the trees
  smell: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maRai(330, 1560, 1.0)}${maChico(760, 1560, 1.0, true)}${maStink()}`, `${maSay('fd', 'FEDOR', 540, 420, -4, '#8ab83a', BZ.ink, 110)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); tl.fromTo($('.stink'), { x: -300, opacity: 0 }, { x: 500, opacity: 0.6, duration: s.t1 - s.t0, ease: 'none', stagger: 0.2 }, s.t0);
      bzPose(tl, $('#rai'), s.t0 + 0.8, { aR: -150 }, 0.3); bzPose(tl, $('#chico'), s.t0 + 0.9, { aL: 150 }, 0.3); bzFace(tl, $('#rai'), s.t0 + 0.8, 'closed', 'frown'); bzFace(tl, $('#chico'), s.t0 + 0.9, 'closed', 'frown'); bzPop(tl, $('#fd'), s.t0 + 0.4); } },
  trees: { bg: '#060c14', html: () => bzShot(`${maJungle()}${bzParticles('lv', 'leaves', 18, [0, 0, 1080, 900], 6)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#lv'), 'leaves', s.t0, s.t1); bzQuake(tl, $('#cam'), s.t0, s.t1, 4); bzQuake(tl, $('#cam'), K('c'), K('c') + 0.4, 12); } },
  // ---------------- him
  emerge: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maGiant('mapi', 540, 1600, 0.85)}${maRai(200, 1760, 0.95)}${maChico(880, 1760, 0.95, true)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); maSway(tl, $('#mapi'), s.t0, s.t1); tl.fromTo($('#mapi'), { y: -200, opacity: 0.3 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' }, K('e') - 0.6);
      bzFace(tl, $('#rai'), s.t0, 'wide', 'open'); bzFace(tl, $('#chico'), s.t0, 'wide', 'open'); bzQuake(tl, $('#cam'), K('e'), K('e') + 0.5, 10); } },
  size: { bg: '#060c14', html: () => bzShot(`${maJungle()}${maGiant('mapi', 600, 1800, 1.0)}${maChico(180, 1800, 0.8)}<g id="ruler"><path d="M960 1800 V 400" stroke="#fff" stroke-width="10"/><path d="M930 430 L 960 400 L 990 430 M930 1770 L 960 1800 L 990 1770" stroke="#fff" stroke-width="10" fill="none"/></g>`, maSay('m4', '4 METROS', 860, 360, -6, BZ.yellow, BZ.ink, 100)),
    anim(tl, s, K, $) { maSway(tl, $('#mapi'), s.t0, s.t1); bzFace(tl, $('#chico'), s.t0, 'wide', 'o'); tl.fromTo($('#ruler'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.6 }, s.t0 + 0.2); bzPop(tl, $('#m4'), s.t0 + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 600, 1000); } },
  eye: { bg: '#060c14', html: () => bzShot(`<rect width="1080" height="1920" fill="#060c14"/>${maGiant('mapi', 540, 4920, 3.4)}`, `${bzFlash('fl', BZ.red)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.set($('#mapi .lid'), { opacity: 1 }, s.t0); tl.set($('#mapi .lid'), { opacity: 0 }, K('o')); bzHit(tl, $('#fl'), K('o'), 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 900); } },
  // ---------------- the shots, the mouth
  shoot: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maGiant('mapi', 760, 1650, 0.8)}${maChico(260, 1700, 1.15)}${maRifle(280, 1150, -12, 1.0)}<g id="sparks" opacity="0">${[0, 1, 2, 3, 4].map((i) => `<circle cx="${700 + i * 30}" cy="${900 + (i % 2) * 120}" r="12" fill="#ffe08a"/>`).join('')}</g>`, `${bzFlash('fl', '#fff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); maSway(tl, $('#mapi'), s.t0, s.t1); bzFace(tl, $('#chico'), s.t0, 'angry', 'open'); bzPose(tl, $('#chico'), s.t0, { aR: -80, aL: -60 }, 0.01);
      ['b1', 'b2'].forEach((k) => { tl.set($('#mf'), { opacity: 1 }, K(k)); tl.set($('#mf'), { opacity: 0 }, K(k) + 0.08); bzHit(tl, $('#fl'), K(k), 0.4); tl.fromTo($('#sparks'), { opacity: 1, y: 0 }, { opacity: 0, y: 400, duration: 0.6, ease: 'power2.in' }, K(k) + 0.1); }); } },
  belly: { bg: '#060c14', html: () => bzShot(`<rect width="1080" height="1920" fill="#060c14"/>${maGiant('mapi', 540, 2450, 2.4)}`, `${bzFlash('fl', BZ.red)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { maMouth(tl, $('#mapi'), K('m') - 0.2); bzHit(tl, $('#fl'), K('m'), 0.35); bzQuake(tl, $('#cam'), K('m'), s.t1, 8); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 960); } },
  // ---------------- the stream
  dive: { bg: '#060c14', html: () => bzShot(`${maCamp()}${maRai(540, 1560, 1.1)}`, `${bzFlash('fl', '#fff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { maFlicker(tl, $(''), s.t0, s.t1); bzFace(tl, $('#rai'), s.t0, 'wide', 'open'); tl.to($('#rai'), { y: 200, rotation: 80, transformOrigin: '50% 50%', duration: 0.5, ease: 'power2.in' }, K('d') - 0.5); tl.set($('#rai'), { opacity: 0 }, K('d')); bzHit(tl, $('#fl'), K('d'), 0.4); } },
  under: { bg: '#020608', html: () => bzShot(`${maUnder()}${maRai(540, 1700, 1.5)}${bzParticles('bb', 'bubbles', 20, [300, 600, 800, 1500], 2)}`, `${bzFlash('fl', BZ.red)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rai'), s.t0, 'wide', 'flat'); bzParticlesGo(tl, $('#bb'), 'bubbles', s.t0, s.t1); tl.fromTo($('#surf'), { opacity: 0.15 }, { opacity: 0.4, duration: 0.2, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.2) }, s.t0);
      bzHit(tl, $('#fl'), K('s'), 0.6); bzFace(tl, $('#rai'), K('s'), 'closed', 'frown'); bzShake(tl, $('#rai'), K('s'), s.t1, 3); } },
  // ---------------- dawn
  dawn: { bg: '#f29a4a', html: () => bzShot(maDawn(), ''), anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 360, 1100); } },
  prints: { bg: '#f29a4a', html: () => bzShot(maDawn(), maSay('vt', 'VIRADAS PRA TRÁS', 540, 380, 4, BZ.red, '#fff', 90)),
    anim(tl, s, K, $) { for (let i = 0; i < 4; i++) tl.to($('#gp' + i), { opacity: 1, duration: 0.15 }, s.t0 + 0.2 + i * 0.35); tl.fromTo($('#cam'), { y: 200, scale: 1.3, svgOrigin: '480 1500' }, { y: -100, scale: 1.3, svgOrigin: '480 1500', duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzPop(tl, $('#vt'), s.t0 + 1.4); } },
  // ---------------- today
  today: { bg: '#060c14', html: () => bzShot(`${maHouse()}${bzParticles('ff', 'fireflies', 18, [0, 900, 1080, 1500], 6)}`, maSay('hj', 'HOJE', 540, 360, -4, BZ.yellow, BZ.ink, 120)),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); bzPop(tl, $('#hj'), s.t0 + 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1100); } },
  again: { bg: '#060c14', html: () => bzShot(`${maHouse()}<g id="eyeF" opacity="0">${bzGlow('re', 900, 1180, 80, '#ff3a2a', 0.6)}<circle cx="900" cy="1180" r="12" fill="#ff5a3a"/></g>`, `${maSay('ui', 'UUUUOOOO', 540, 420, -5, '#fff', BZ.ink, 110)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.set($('#ui'), { opacity: 0 }, s.t0); bzShow(tl, $('#ui'), K('g')); tl.fromTo($('#wg'), { opacity: 1 }, { opacity: 0.2, duration: 0.1, yoyo: true, repeat: 5 }, K('g')); tl.set($('#eyeF'), { opacity: 1 }, K('g') + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 700, 1150); } },
  hand: { bg: '#4a3424', html: () => bzShot(`${maKitchen()}${maLeo(430, 1700, 1.7)}${maOld(700, 1760, 1.55, true)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#leo'), s.t0, 'wide', 'flat'); bzFace(tl, $('#raiold'), s.t0, 'wide', 'flat'); bzPose(tl, $('#raiold'), s.t0 + 0.2, { aR: -125 }, 0.3); bzShake(tl, $('#raiold'), s.t0, s.t1, 2); bzShake(tl, $('#leo'), s.t0, s.t1, 1.5); } },
  voltou: { bg: '#4a3424', html: () => bzShot(`${maKitchen()}${maOld(540, 2400, 2.9)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { bzFace(tl, $('#raiold'), s.t0, 'wide', 'flat'); bzTalk(tl, $('#raiold'), 'ma_vo', s.t0, s.t1, 'flat', 'o'); bzShake(tl, $('#raiold'), s.t0, s.t1, 2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 950); } },
  you: { bg: '#020406', html: () => bzShot(`<rect width="1080" height="1920" fill="#020406"/>${[...Array(7)].map((_, i) => `<rect x="${i * 170 - 30}" y="0" width="90" height="1920" fill="#0a120e"/>`).join('')}<g id="big" opacity="0">${maGiant('mapi', 540, 4920, 3.4)}</g>`, bzVignette(0.85)),
    anim(tl, s, K, $) { tl.set($('#mapi .lid'), { opacity: 1 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); tl.set($('#big'), { opacity: 1 }, K('end') - 0.3); tl.set($('#mapi .lid'), { opacity: 0 }, K('end')); } },
});
