// <lines>
const LO_LINES = [{"who": "lo_ju", "t0": 0.3, "t1": 5.942}, {"who": "lo_ju", "t0": 6.542, "t1": 13.343}, {"who": "lo_ju2", "t0": 13.843, "t1": 17.332}, {"who": "lo_tonho", "t0": 17.732, "t1": 19.914}, {"who": "lo_ju", "t0": 20.614, "t1": 24.99}, {"who": "lo_ju", "t0": 25.49, "t1": 31.008}, {"who": "lo_ju", "t0": 31.608, "t1": 37.18}, {"who": "lo_ju", "t0": 37.98, "t1": 43.968}, {"who": "lo_ju", "t0": 44.568, "t1": 48.832}, {"who": "lo_ju", "t0": 49.432, "t1": 54.937}, {"who": "lo_ju", "t0": 55.737, "t1": 62.066}, {"who": "lo_tonho", "t0": 62.566, "t1": 65.158}, {"who": "lo_ju", "t0": 66.058, "t1": 70.99}];
// </lines>
// =====================================================================
//  O LOBISOMEM: the shots (Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400; faces above ~1050 or filling the frame.
//  Heads above the feet: the wolf 693*s, the half-wolf 451*s, Tonho 434*s, Júlia 350*s.
// =====================================================================
BZ_TALK.lines = LO_LINES;
const loHook = (txt: string) => bzSign('hk', txt, 540, 330, -4, BZ.red, '#fff', 110);
const loDark = (id = 'dk', c = '#05060c') => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="0"/>`;
// a henhouse seen from outside (right of the farm), its door (#door) closes
const loCoopOut = (x: number, y: number) => `<g transform="translate(${x} ${y})"><rect x="-150" y="-260" width="300" height="260" fill="#8a5a3a" ${bzO()}/><path d="M-180 -250 L0 -360 L180 -250 Z" fill="#6a3a2a" ${bzO()}/>
  <rect x="-60" y="-170" width="120" height="170" fill="#1b1418"/><g id="door"><rect x="-60" y="-170" width="120" height="170" fill="#a87a4a" ${bzO()}/></g></g>`;
// a rooster on the fence (dawn)
const loRooster = (x: number, y: number, s = 1) => `<g id="rooster"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-90 -60 Q -160 -160 -60 -150 Q -40 -110 -40 -80 Z" fill="#2f6a3a" ${bzO()}/><ellipse cx="0" cy="-60" rx="80" ry="62" fill="#c8542c" ${bzO()}/>
  <circle cx="55" cy="-140" r="40" fill="#c8542c" ${bzO()}/><path d="M40 -180 l10 -26 l10 22 l10 -26 l10 26" fill="#e0302a" ${bzO('stroke-width="4"')}/><path d="M92 -142 l34 8 l-34 10z" fill="#f6c744" ${bzO('stroke-width="4"')}/><circle cx="66" cy="-148" r="6" fill="${BZ.ink}"/>
  <path d="M-20 0 v40 M20 0 v40" stroke="#f6c744" stroke-width="10"/></g></g>`;

defineVisuals({
  // ---------------- the hook: the wolf howls under the moon at frame 1
  hook: { bg: '#0f1530', html: () => bzShot(`${loCross()}${loLobo(540, 1700, 1.2)}`, `${loHook('O 7º FILHO')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#lobo'), s.t0, 'glow', 'open'); bzPose(tl, $('#lobo'), s.t0, { hd: -25, aL: 40, aR: -40 }, 0.01); bzHook(tl, $('#hk'), s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1.3, 540, 900); } },
  tonho: { bg: '#0f1530', html: () => bzShot(`${loFarm()}${loTonho(540, 1500, 1.3)}`, bzSign('nm', 'TONHO', 540, 330, -4, BZ.yellow, BZ.ink, 120, { text: 'O SÉTIMO', bg: BZ.red, fg: '#fff' })),
    anim(tl, s, K, $) { bzFace(tl, $('#tonho'), s.t0, 'half', 'flat'); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), K('n')); bzBlink(tl, $('#tonho'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 950); } },
  farm: { bg: '#0f1530', html: () => bzShot(loFarm(), ''), anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 400, 1000); } },
  moon: { bg: '#0f1530', html: () => bzShot(`${loNight(540, 960, 380)}`, bzSign('lc', 'SEXTA • LUA CHEIA', 540, 330, -3, BZ.yellow, BZ.ink, 90)),
    anim(tl, s, K, $) { bzPop(tl, $('#lc'), s.t0 + 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 960); } },
  sneak: { bg: '#0f1530', html: () => bzShot(`${loFarm()}${loTonho(500, 1560, 0.95)}`, ''),
    anim(tl, s, K, $) { bzWalk(tl, $('#tonho'), s.t0, s.t1, 0, 600); bzFace(tl, $('#tonho'), s.t0, 'half', 'flat'); tl.fromTo($('#tonho .hd'), { rotation: 0 }, { rotation: -12, transformOrigin: '50% 90%', duration: 0.4, yoyo: true, repeat: 1 }, s.t0 + 0.5); } },
  ju: { bg: '#0f1530', html: () => bzShot(`${loFarm()}${loJulia(520, 1500, 1.9)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#julia'), s.t0, 'wide', 'smile'); bzTalk(tl, $('#julia'), 'lo_ju2', s.t0, s.t1, 'smile', 'open'); bzPose(tl, $('#julia'), s.t0 + 0.2, { aR: -60 }, 0.3); } },
  hoje: { bg: '#0f1530', html: () => bzShot(`${loNight(860, 360, 120)}<rect y="1300" width="1080" height="640" fill="#2c3a34"/>${loTonho(540, 1650, 2.2)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#tonho'), s.t0, 'half', 'flat'); bzTalk(tl, $('#tonho'), 'lo_tonho', s.t0, s.t1, 'flat', 'open'); bzFace(tl, $('#tonho'), s.t1 - 0.25, 'glow', undefined); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 700); } },
  // ---------------- the crossroads
  follow: { bg: '#0f1530', html: () => bzShot(`${loCross()}${loTonho(680, 1300, 0.6)}${loJulia(160, 1700, 1.2)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzWalk(tl, $('#tonho'), s.t0, s.t1, 0, -80); bzWalk(tl, $('#julia'), s.t0, s.t1, 0, 200); bzFace(tl, $('#julia'), s.t0, 'wide', 'flat'); bzFace(tl, $('#tonho'), s.t0, 'half', 'flat'); } },
  roll: { bg: '#0f1530', html: () => bzShot(`${loCross()}<g id="rl"><g transform="rotate(-90 760 1560)">${loTonho(760, 1560, 1.1)}</g></g>`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzFace(tl, $('#tonho'), s.t0, 'closed', 'frown'); tl.fromTo($('#rl'), { rotation: -6, svgOrigin: '540 1560' }, { rotation: 6, svgOrigin: '540 1560', duration: 0.35, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.35) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1500); } },
  change: { bg: '#0f1530', html: () => bzShot(`${loCross()}<g id="g1">${loTonho(540, 1650, 1.4)}</g><g id="g2" opacity="0">${loMeio(540, 1650, 1.4)}</g><g id="g3" opacity="0">${loLobo(540, 1650, 1.35)}</g>`, `${bzFlash('fl', '#ffe08a')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tonho'), s.t0, 'closed', 'open'); bzShake(tl, $('#tonho'), K('k1'), K('k2'), 6); bzFace(tl, $('#meio'), s.t0, 'glow', 'open'); bzFace(tl, $('#lobo'), s.t0, 'glow', 'fangs');
      tl.set($('#g1'), { opacity: 0 }, K('k2')); tl.set($('#g2'), { opacity: 1 }, K('k2')); bzHit(tl, $('#fl'), K('k2'), 0.5); bzShake(tl, $('#meio'), K('k2'), K('k4'), 5);
      tl.fromTo($('#meio .hd'), { scale: 1, transformOrigin: '50% 90%' }, { scale: 1.12, duration: 0.2, ease: 'back.out(3)' }, K('k3')); bzHit(tl, $('#fl'), K('k3'), 0.3);
      tl.set($('#g2'), { opacity: 0 }, K('k4')); tl.set($('#g3'), { opacity: 1 }, K('k4')); bzHit(tl, $('#fl'), K('k4'), 0.8); bzQuake(tl, $('#cam'), K('k4'), K('k4') + 0.4, 10); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  howl: { bg: '#0f1530', html: () => bzShot(`${loCross()}${loLobo(540, 1700, 1.2)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzFace(tl, $('#lobo'), s.t0, 'glow', 'fangs'); bzPose(tl, $('#lobo'), K('u') - 0.2, { hd: -28, aL: 40, aR: -40 }, 0.3); bzFace(tl, $('#lobo'), K('u'), 'closed', 'open'); bzPush(tl, $('#cam'), s.t0, s.t1, 1.2, 1, 540, 900); } },
  dogs: { bg: '#0f1530', html: () => bzShot(`${loFarm()}`, `${[[200, 900, -6], [760, 800, 5], [480, 1120, -3], [900, 1200, 8]].map(([x, y, r], i) => bzSign('au' + i, 'AUUU!', x, y, r, '#fff', BZ.ink, 70)).join('')}`),
    anim(tl, s, K, $) { for (let i = 0; i < 4; i++) { tl.set($('#au' + i), { opacity: 0 }, s.t0); bzShow(tl, $('#au' + i), s.t0 + 0.2 + i * 0.35); } bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  hide: { bg: '#0f1530', html: () => bzShot(`${loNight(860, 360, 110)}<rect y="1300" width="1080" height="640" fill="#2c3a34"/>${loJulia(520, 1600, 2.0)}<rect x="660" y="0" width="420" height="1920" fill="#3a2a22" ${bzO()}/><path d="M700 200 q30 300 0 700 M820 400 q-30 400 10 900" stroke="#2a1e18" stroke-width="8" fill="none"/>`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#julia'), s.t0, 'wide', 'flat'); bzPose(tl, $('#julia'), s.t0, { aL: 165 }, 0.15); bzShake(tl, $('#julia'), s.t0, s.t1, 2); } },
  big: { bg: '#0f1530', html: () => bzShot(`${loNight(540, 560, 300)}<rect y="1500" width="1080" height="440" fill="#2c3a34"/>${loLobo(540, 2350, 2.2)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#lobo'), s.t0, 'glow', 'fangs'); tl.fromTo($('#lobo .mv'), { y: 0 }, { y: -12, duration: 0.9, yoyo: true, repeat: 3 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 800); } },
  snap: { bg: '#1a1e18', html: () => bzShot(`<rect width="1080" height="1920" fill="#2c3a34"/><rect y="1100" width="1080" height="840" fill="#4a3a2a"/><path id="stick" d="M120 1250 L960 1180" stroke="#7a5a3a" stroke-width="40" stroke-linecap="round"/>
      <g id="shoe"><ellipse cx="540" cy="1130" rx="200" ry="90" fill="#c8342c" ${bzO('stroke-width="10"')}/><rect x="420" y="760" width="160" height="380" fill="#d9a27a" ${bzO('stroke-width="10"')}/></g>`, `${bzSign('cr', 'CRAC!', 540, 420, -6, '#fff', BZ.red, 150)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#cr'), { opacity: 0 }, s.t0); tl.fromTo($('#shoe'), { y: -200 }, { y: 0, duration: 0.3, ease: 'power2.in' }, K('c') - 0.3); bzShow(tl, $('#cr'), K('c')); bzQuake(tl, $('#cam'), K('c'), K('c') + 0.2, 6); } },
  turn: { bg: '#0f1530', html: () => bzShot(`${loNight(540, 560, 300)}<rect y="1500" width="1080" height="440" fill="#2c3a34"/>${loLobo(540, 1900, 1.6)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#lobo'), s.t0, 'closed', 'flat'); tl.fromTo($('#lobo .hd'), { rotation: 35, transformOrigin: '50% 90%' }, { rotation: 0, duration: 1.0, ease: 'power2.inOut' }, s.t0 + 0.2); bzFace(tl, $('#lobo'), s.t0 + 1.1, 'glow', 'fangs'); } },
  eyes: { bg: '#05060c', html: () => bzShot(`<rect width="1080" height="1920" fill="#05060c"/>${loLobo(540, 3600, 4.0)}`, `${bzFlash('fl', '#ffd23a')}${bzVignette(0.9)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#lobo'), s.t0, 'closed', 'flat'); bzFace(tl, $('#lobo'), K('e'), 'glow', 'fangs'); bzHit(tl, $('#fl'), K('e'), 0.35); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 820); } },
  // ---------------- the henhouse
  run: { bg: '#0f1530', html: () => bzShot(`${loFarm()}${loCoopOut(880, 1320)}${loJulia(60, 1600, 1.15)}`, ''),
    anim(tl, s, K, $) { tl.set($('#door'), { opacity: 0 }, s.t0); bzWalk(tl, $('#julia'), s.t0, K('slam') - 0.2, 0, 820, true); bzFace(tl, $('#julia'), s.t0, 'wide', 'open'); tl.set($('#julia'), { opacity: 0 }, K('slam') - 0.15); tl.set($('#door'), { opacity: 1 }, K('slam')); bzQuake(tl, $('#cam'), K('slam'), K('slam') + 0.2, 5); } },
  coop: { bg: '#3a2a20', html: () => bzShot(`${loCoop()}${loJulia(540, 1560, 1.2)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#julia'), s.t0, 'wide', 'flat'); bzPose(tl, $('#julia'), s.t0, { aL: 165 }, 0.01); tl.set($('#eye'), { opacity: 1, scale: 3.2, transformOrigin: '50% 50%' }, s.t0);
      tl.fromTo($('#eye'), { x: -300 }, { x: 420, duration: s.t1 - s.t0, ease: 'steps(5)' }, s.t0); bzShake(tl, $('#julia'), K('g'), s.t1, 3); } },
  dawn: { bg: '#f29a4a', html: () => bzShot(`${bzSky('#f29a4a', '#5a3f7a')}${bzSun(540, 1100, 160, '#ffd27a')}<rect y="1150" width="1080" height="790" fill="#4a6a44" ${bzO()}/>${[...Array(12)].map((_, i) => `<rect x="${i * 95}" y="1050" width="22" height="200" fill="#8a6a4a" ${bzO('stroke-width="4"')}/>`).join('')}<path d="M0 1100 h1080" stroke="#8a6a4a" stroke-width="16"/>${loRooster(540, 1060, 1.4)}`, bzSign('ck', 'COCORICÓ!', 540, 420, 5, '#fff', BZ.ink, 110)),
    anim(tl, s, K, $) { bzPop(tl, $('#ck'), s.t0 + 0.3); tl.fromTo($('#rooster'), { rotation: 0, svgOrigin: '540 1060' }, { rotation: -8, svgOrigin: '540 1060', duration: 0.3, yoyo: true, repeat: 3 }, s.t0 + 0.2); } },
  // ---------------- the morning
  kitchen: { bg: '#f0e2c0', html: () => bzShot(`${loKitchen()}${loTonho(640, 1600, 1.3, true)}<g id="scr"><path d="M600 1000 l40 40 M620 990 l40 40" stroke="${BZ.red}" stroke-width="8" stroke-linecap="round"/></g>${loTable()}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tonho'), s.t0, 'half', 'flat'); bzBlink(tl, $('#tonho'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 640, 1000); } },
  scrap: { bg: '#f0e2c0', html: () => bzShot(`${loKitchen()}${loTonho(540, 1900, 2.4)}${loScrap('sc', 560, 950, 2.0)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tonho'), s.t0, 'half', 'grin'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.3, 560, 960); } },
  bomdia: { bg: '#f0e2c0', html: () => bzShot(`${loKitchen()}${loTonho(540, 1900, 2.4)}${loScrap('sc', 560, 950, 2.0)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzFace(tl, $('#tonho'), s.t0, 'dot', 'grin'); bzTalk(tl, $('#tonho'), 'lo_tonho', s.t0, s.t1, 'grin', 'open'); bzFace(tl, $('#tonho'), s.t1 - 0.5, 'glow', 'grin'); } },
  you: { bg: '#0f1530', html: () => bzShot(`${loNight(540, 800, 360)}<path d="M-20 1350 Q 540 1150 1100 1350 L1100 1940 L-20 1940 Z" fill="#14181e" ${bzO()}/><g id="sil" style="filter:brightness(0.15)">${loLobo(540, 1290, 0.8)}</g>`, `${bzFlash('fl', '#ffd23a')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#lobo'), s.t0, 'closed', 'flat'); bzPose(tl, $('#lobo'), s.t0, { hd: -25 }, 0.01); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.35, 540, 900);
      tl.set($('#sil'), { filter: 'brightness(1)' }, K('end')); bzPose(tl, $('#lobo'), K('end'), { hd: 0 }, 0.1); bzFace(tl, $('#lobo'), K('end'), 'glow', 'fangs'); bzHit(tl, $('#fl'), K('end'), 0.3); } },
});
