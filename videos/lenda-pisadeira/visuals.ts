// <lines>
const PI_LINES = [{"who": "pi_eu", "t0": 0.3, "t1": 6.145}, {"who": "pi_eu", "t0": 6.745, "t1": 12.118}, {"who": "pi_vo", "t0": 12.618, "t1": 16.455}, {"who": "pi_eu", "t0": 17.055, "t1": 23.971}, {"who": "pi_eu", "t0": 24.871, "t1": 29.511}, {"who": "pi_eu", "t0": 30.211, "t1": 34.536}, {"who": "pi_eu", "t0": 35.136, "t1": 40.149}, {"who": "pi_pis", "t0": 40.749, "t1": 42.505}, {"who": "pi_eu", "t0": 43.405, "t1": 50.056}, {"who": "pi_eu", "t0": 50.556, "t1": 54.019}, {"who": "pi_eu", "t0": 54.419, "t1": 57.464}, {"who": "pi_eu", "t0": 58.264, "t1": 63.57}, {"who": "pi_eu", "t0": 64.27, "t1": 67.74}];
// </lines>
// =====================================================================
//  A PISADEIRA: the shots (Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400; faces above ~1050 or filling the frame.
//  Heads above the feet: the Pisadeira 566*s, the grandmother ~470*s, Rafa 400*s.
// =====================================================================
BZ_TALK.lines = PI_LINES;
// the bed scene: room, bed, Rafa lying (head on the pillow), the blanket, and optionally the Pisadeira sitting on his chest
// drawn 330 px higher than the world test so the bed sits above the captions
const piBedShot = (withHer = true) => `<rect width="1080" height="1920" fill="#2a2440"/><g transform="translate(0 -330)">${piRoom()}${piBedBack()}${piLying(870, 1310, 1.1)}${piBlanket()}${withHer ? piPis(600, 1470, 1.0) : ''}</g>`;
const piOnChest = (tl: gsap.core.Timeline, sel: string, t: number) => bzPose(tl, sel, t, { lL: 70, lR: -70, aL: -25, aR: 25 }, 0.01);
// Rafa's face close, lying (rotated), on the pillow: head centre at (hx, hy)
const piFaceLying = (hx: number, hy: number, s: number) => `<ellipse cx="${hx - 40}" cy="${hy + 60 * s}" rx="${150 * s}" ry="${70 * s}" fill="#f4f2ea" ${bzO()}/>${piLying(hx + 400 * s, hy, s)}`;
// her hand with very long nails (pointing left), local origin at the wrist
const piClaw = (id: string, x: number, y: number, s = 1, rot = 0) => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 L160 -30" stroke="${BZ.ink}" stroke-width="58" stroke-linecap="round"/><path d="M0 0 L160 -30" stroke="#9aa39a" stroke-width="42" stroke-linecap="round"/>
  <circle cx="0" cy="0" r="52" fill="#9aa39a" ${bzO()}/>${[-36, -12, 12, 34].map((d) => `<path d="M-30 ${d} Q -110 ${d - 10} -170 ${d + 26}" stroke="${BZ.ink}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-30 ${d} Q -110 ${d - 10} -170 ${d + 26}" stroke="#d8d0a8" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('')}</g></g>`;
const piHook = (txt: string) => bzSign('hk', txt, 540, 330, -4, BZ.red, '#fff', 104);

defineVisuals({
  // ---------------- the hook: she is already on his chest at frame 1
  hook: { bg: '#14161c', html: () => bzShot(`<rect width="1080" height="1920" fill="#14161c"/>${piPis(540, 2750, 3.4)}`, `${piHook('NÃO DURMA ASSIM')}${bzFlash('fl', BZ.red)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'fangs'); bzHook(tl, $('#hk'), s.t0); bzHit(tl, $('#fl'), K('h'), 0.35); bzShake(tl, $('#pis'), s.t0, s.t0 + 0.4, 4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 850); } },
  bedhook: { bg: '#1e2a48', html: () => bzShot(piBedShot(), `${piDark('dk', '#000')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { piOnChest(tl, $('#pis'), s.t0); bzFace(tl, $('#pis'), s.t0, 'glow', 'fangs'); bzFace(tl, $('#rafa'), s.t0, 'wide', 'o'); tl.set($('#dk'), { opacity: 0.1 }, s.t0);
      bzShake(tl, $('#rafa'), s.t0, s.t1, 3); bzPush(tl, $('#cam'), s.t0, s.t1, 1.4, 1.55, 560, 900); } },
  roof: { bg: '#0f1530', html: () => bzShot(`${piRoofs()}${piPis(540, 1160, 0.9)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'grin'); bzPose(tl, $('#pis'), s.t0, { lL: 60, lR: -60, aL: 40, aR: -40 }, 0.01);
      tl.fromTo($('#pis'), { y: -120 }, { y: 260, duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1100); } },
  land: { bg: '#1e2a48', html: () => bzShot(piBedShot(), `${piDark('dk', '#000')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { piOnChest(tl, $('#pis'), s.t0); bzFace(tl, $('#pis'), s.t0, 'glow', 'grin'); bzFace(tl, $('#rafa'), s.t0, 'closed', 'flat'); tl.set($('#dk'), { opacity: 0.3 }, s.t0);
      tl.fromTo($('#pis'), { y: -700 }, { y: 0, duration: 0.25, ease: 'power3.in' }, K('l') - 0.25); bzFace(tl, $('#rafa'), K('l'), 'wide', 'open'); bzQuake(tl, $('#cam'), K('l'), K('l') + 0.3, 10); } },
  title: { bg: '#14161c', html: () => bzShot(`<rect width="1080" height="1920" fill="#14161c"/>${piPis(540, 2100, 2.1)}`, `${bzSign('tt', 'A PISADEIRA', 540, 380, -4, BZ.yellow, BZ.ink, 130)}${bzFlash('fl')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'grin'); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  nails: { bg: '#14161c', html: () => bzShot(`<rect width="1080" height="1920" fill="#20242c"/><rect x="0" y="700" width="1080" height="500" fill="#5a4a40"/>${piClaw('cl', 820, 900, 2.2)}<g id="marks" opacity="0"><path d="M220 820 l300 40 M220 880 l300 40 M220 940 l300 40 M230 1000 l290 34" stroke="#2a1e18" stroke-width="10" stroke-linecap="round"/></g>`, bzVignette(0.8)),
    anim(tl, s, K, $) { tl.fromTo($('#cl'), { x: 200 }, { x: -60, duration: s.t1 - s.t0, ease: 'power1.inOut' }, s.t0); tl.to($('#marks'), { opacity: 1, duration: 0.3 }, K('s')); } },
  laugh: { bg: '#14161c', html: () => bzShot(`<rect width="1080" height="1920" fill="#14161c"/>${piPis(540, 2650, 3.2)}`, `${bzSign('hi', 'HIHIHI', 540, 360, 6, '#fff', BZ.red, 120)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'closed', 'fangs'); bzShake(tl, $('#pis'), s.t0, s.t1, 5); bzPop(tl, $('#hi'), s.t0 + 0.2); tl.fromTo($('#hi'), { rotation: -6, transformOrigin: '50% 50%' }, { rotation: 6, duration: 0.12, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.12) }, s.t0 + 0.5); } },
  // ---------------- the warning and the dinner
  vo: { bg: '#e8dcc0', html: () => bzShot(`${piKitchen()}${piVo(540, 1720, 1.6)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'angry', 'flat'); bzTalk(tl, $('#vo'), 'pi_vo', s.t0, s.t1, 'flat', 'open'); bzPose(tl, $('#vo'), s.t0 + 0.2, { aR: -150 }, 0.25);
      tl.fromTo($('#vo .aR'), { rotation: -150 }, { rotation: -130, duration: 0.25, yoyo: true, repeat: 7 }, s.t0 + 0.5); bzBlink(tl, $('#vo'), s.t0, s.t1); } },
  feast: { bg: '#e8dcc0', html: () => bzShot(`${piKitchen()}${piRafa(540, 1440, 1.25)}${piTable()}`, `${bzNum('n1', '1', 300, 1250, '#fff', 160)}${bzNum('n2', '2', 540, 1180, '#fff', 160)}${bzNum('n3', '3', 780, 1250, BZ.red, 160)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rafa'), s.t0, 'closed', 'grin'); bzShake(tl, $('#rafa'), s.t0, s.t0 + 0.8, 3); bzFace(tl, $('#rafa'), s.t0 + 1, 'dot', 'open');
      ['p1', 'p2', 'p3'].forEach((k, i) => bzShow(tl, $('#n' + (i + 1)), K(k))); bzPose(tl, $('#rafa'), s.t0 + 1, { aR: -100 }, 0.2); tl.fromTo($('#rafa .aR'), { rotation: -100 }, { rotation: -60, duration: 0.2, yoyo: true, repeat: 9 }, s.t0 + 1.2); } },
  bed: { bg: '#1e2a48', html: () => bzShot(piBedShot(false), `${piDark('dk', '#000')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rafa'), s.t0, 'closed', 'smile'); tl.to($('#dk'), { opacity: 0.55, duration: 0.15 }, K('off')); bzPush(tl, $('#cam'), s.t0, s.t1, 1.15, 1.25, 600, 900); } },
  // ---------------- 3 AM
  clock: { bg: '#14161c', html: () => bzShot(`<rect width="1080" height="1920" fill="#14161c"/><g transform="translate(540 900) scale(4) translate(-175 -1225)">${piRoom().match(/<g id="clock">[\s\S]*?<\/g>/)![0]}</g>`, bzVignette(0.85)),
    anim(tl, s, K, $) { tl.fromTo($('#clock text'), { opacity: 1 }, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.25), ease: 'steps(1)' }, K('c')); } },
  frozen: { bg: '#1e2a48', html: () => bzShot(`<rect width="1080" height="1920" fill="#1e2a48"/>${piFaceLying(540, 900, 2.6)}`, `${piDark('dk', '#000')}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.set($('#dk'), { opacity: 0.35 }, s.t0); bzFace(tl, $('#rafa'), s.t0, 'wide', 'flat'); bzShake(tl, $('#rafa'), s.t0, s.t1, 2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  weight: { bg: '#1e2a48', html: () => bzShot(`${piBedShot()}`, `${piDark('dk', '#000')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { piOnChest(tl, $('#pis'), s.t0); bzFace(tl, $('#pis'), s.t0, 'closed', 'flat'); bzFace(tl, $('#rafa'), s.t0, 'wide', 'flat'); tl.set($('#pis'), { opacity: 0.45 }, s.t0); tl.set($('#dk'), { opacity: 0.55 }, s.t0);
      tl.fromTo($('#pis .mv'), { y: 0 }, { y: 10, duration: 0.9, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.9) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1.2, 1.4, 600, 850); } },
  eyes: { bg: '#14161c', html: () => bzShot(`<rect width="1080" height="1920" fill="#14161c"/><g id="her" opacity="0">${piPis(540, 2650, 3.2)}</g>`, `${bzFlash('fl', BZ.red)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'grin'); tl.set($('#her'), { opacity: 1 }, K('her')); bzHit(tl, $('#fl'), K('her'), 0.5); bzPush(tl, $('#cam'), K('her'), s.t1, 1, 1.15, 540, 850); } },
  neck: { bg: '#1e2a48', html: () => bzShot(`<rect width="1080" height="1920" fill="#1e2a48"/>${piFaceLying(360, 900, 2.6)}${piClaw('cl', 860, 1000, 1.6, -10)}`, `${piDark('dk', '#000')}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.set($('#dk'), { opacity: 0.3 }, s.t0); bzFace(tl, $('#rafa'), s.t0, 'wide', 'o'); tl.fromTo($('#cl'), { x: 120, y: 30 }, { x: -60, y: -20, duration: 0.4, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.4) }, s.t0); bzShake(tl, $('#rafa'), K('s'), s.t1, 3); } },
  janta: { bg: '#14161c', html: () => bzShot(`<rect width="1080" height="1920" fill="#14161c"/>${piPis(540, 3300, 4.2)}`, `<rect id="tint" width="1080" height="1920" fill="${BZ.blood}" opacity="0.18"/>${bzVignette(0.9)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'grin'); bzTalk(tl, $('#pis'), 'pi_pis', s.t0, s.t1, 'grin', 'fangs'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  // ---------------- the way out
  lembrei: { bg: '#e8dcc0', html: () => bzShot(`${piKitchen()}${piVo(540, 1720, 1.6)}`, `<rect width="1080" height="1920" fill="#c8a060" opacity="0.35"/>${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'dot', 'smile'); bzPose(tl, $('#vo'), s.t0 + 0.2, { aL: 60 }, 0.3); bzBlink(tl, $('#vo'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  foot: { bg: '#1e2a48', html: () => bzShot(piFoot(), `${piDark('dk', '#000')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.set($('#dk'), { opacity: 0.3 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 700, 760); } },
  force: { bg: '#1e2a48', html: () => bzShot(`<rect width="1080" height="1920" fill="#1e2a48"/>${piFaceLying(540, 900, 2.6)}`, `<rect id="tint" width="1080" height="1920" fill="${BZ.blood}" opacity="0"/>${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rafa'), s.t0, 'closed', 'frown'); bzShake(tl, $('#rafa'), s.t0, s.t1, 6); tl.to($('#tint'), { opacity: 0.3, duration: s.t1 - s.t0 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.2, 540, 900); } },
  toe: { bg: '#1e2a48', html: () => bzShot(piFoot(), `${bzNum('mx', 'MEXEU!', 540, 420, BZ.yellow, 180)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.fromTo($('#foot .toe'), { rotation: 0, svgOrigin: '740 800' }, { rotation: -22, svgOrigin: '740 800', duration: 0.12, yoyo: true, repeat: 5 }, K('m') - 0.2); bzShow(tl, $('#mx'), K('m')); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1.25, 740, 760); } },
  scream: { bg: '#14161c', html: () => bzShot(`<rect width="1080" height="1920" fill="#14161c"/>${piPis(540, 2650, 3.2)}`, `${bzFlash('fl', '#fff')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'fangs'); bzFace(tl, $('#pis'), K('g'), 'closed', 'open'); bzHit(tl, $('#fl'), K('g'), 0.5); bzQuake(tl, $('#cam'), K('g'), s.t1, 10); } },
  window: { bg: '#1e2a48', html: () => bzShot(`${piRoom()}${piBedBack()}${piBlanket()}${piPis(500, 1500, 1.0)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'open'); bzPose(tl, $('#pis'), s.t0, { aL: 150, aR: -150, lL: 30, lR: -30 }, 0.15);
      tl.to($('#pis'), { x: 300, y: -800, scale: 0.35, transformOrigin: '50% 50%', duration: 0.5, ease: 'power2.in' }, K('j')); tl.set($('#pis'), { opacity: 0 }, K('j') + 0.5); } },
  gone: { bg: '#0f1530', html: () => bzShot(`${piRoofs()}${piPis(300, 1200, 0.7)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'open'); bzWalk(tl, $('#pis'), s.t0, s.t1, 0, 900, true); tl.to($('#pis'), { y: -150, duration: s.t1 - s.t0 }, s.t0); } },
  // ---------------- the morning after
  morning: { bg: '#bfe0f6', html: () => bzShot(`${bzSky('#bfe0f6', '#fff0c8')}<rect y="1300" width="1080" height="640" fill="#c8b090" ${bzO()}/>${piRafa(540, 1700, 2.2)}<g id="marks" opacity="0"><path d="M470 1040 l60 50 M500 1030 l60 50 M530 1020 l60 50" stroke="${BZ.red}" stroke-width="12" stroke-linecap="round"/></g>`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#rafa'), s.t0, 'half', 'frown'); tl.to($('#marks'), { opacity: 1, duration: 0.3 }, s.t0 + 0.8); bzPose(tl, $('#rafa'), s.t0 + 0.5, { aR: -150 }, 0.3); bzBlink(tl, $('#rafa'), s.t0, s.t1); } },
  ceiling: { bg: '#d8d0c0', html: () => bzShot(piCeiling(), bzVignette(0.6)),
    anim(tl, s, K, $) { for (let i = 0; i < 6; i++) tl.to($('#fp' + i), { opacity: 1, duration: 0.1 }, s.t0 + 0.3 + i * 0.35); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1); } },
  you: { bg: '#0f1530', html: () => bzShot(`${piRoofs()}${piPis(540, 1160, 0.9)}`, `${bzFlash('fl', BZ.red)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#pis'), s.t0, 'glow', 'grin'); bzPose(tl, $('#pis'), s.t0, { lL: 60, lR: -60, aL: 40, aR: -40 }, 0.01); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.6, 540, 820);
      bzFace(tl, $('#pis'), K('end'), undefined, 'fangs'); bzHit(tl, $('#fl'), K('end'), 0.4); } },
});
