// <lines>
const MU_LINES = [{"who": "mu_eu", "t0": 0.3, "t1": 6.279}, {"who": "mu_eu", "t0": 6.879, "t1": 12.676}, {"who": "mu_eu", "t0": 13.176, "t1": 19.736}, {"who": "mu_eu", "t0": 20.336, "t1": 26.251}, {"who": "mu_beto", "t0": 26.651, "t1": 29.403}, {"who": "mu_eu", "t0": 30.203, "t1": 35.272}, {"who": "mu_eu", "t0": 35.972, "t1": 40.692}, {"who": "mu_eu", "t0": 41.192, "t1": 48.327}, {"who": "mu_eu", "t0": 48.827, "t1": 52.996}, {"who": "mu_eu", "t0": 53.596, "t1": 58.466}, {"who": "mu_eu", "t0": 59.466, "t1": 66.926}, {"who": "mu_eu", "t0": 67.526, "t1": 71.116}];
// </lines>
// =====================================================================
//  A MULA SEM CABEÇA: the shots (Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400; faces above ~1050 or filling the frame. Heads above the feet: kids 350*s.
// =====================================================================
BZ_TALK.lines = MU_LINES;
const muDark = (id = 'dk', c = '#05060c', k = 0) => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="${k}"/>`;
const muGlow = (id: string, x: number, y: number, r: number) => `<circle id="${id}" cx="${x}" cy="${y}" r="${r}" fill="#ff8a3a" opacity="0"/>`;
// the neck fire filling the frame (mula placed so the fire's base sits at (600, 1500))
const muNeckClose = () => `${bzSky('#05070f', '#1a1430')}${muMula('mula', -130, 2876, 3.2)}`;
// a kid lying face down on the stones (head to the right)
const muLying = (who: 'davi' | 'beto', x: number, y: number, s = 1) => `<g id="ly"><g transform="rotate(90 ${x} ${y})">${(who === 'davi' ? muDavi : muBeto)(x, y, s)}</g></g>`;
const MU_MOCA: BzSpec = { tall: 1.0, wide: 0.8, skin: '#e0b090', hair: { style: 'long', color: '#2a1a14' }, top: '#7a1a24', dress: '#7a1a24', shoes: '#2b2433' };
// seven little villages on the horizon (ids v0..v6)
const muVillages = () => [...Array(7)].map((_, i) => { const x = 80 + i * 155, y = 1180 - (i % 2) * 30; return `<g id="v${i}"><g transform="translate(${x} ${y})"><rect x="-50" y="-60" width="46" height="60" fill="#e8c8a0" ${bzO('stroke-width="4"')}/><rect x="4" y="-80" width="46" height="80" fill="#a8c8d8" ${bzO('stroke-width="4"')}/><path d="M-56 -58 L-27 -84 L2 -58Z M-2 -78 L27 -104 L56 -78Z" fill="#a8442c" ${bzO('stroke-width="4"')}/></g></g>`; }).join('');

defineVisuals({
  // ---------------- the hook: she gallops through the frame at frame 1
  hook: { bg: '#0f1530', html: () => bzShot(`${muSquare(1)}${muMula('mula', 250, 1900, 1.4)}`, `${bzSign('hk', 'NÃO OLHE PRA ELA', 540, 330, -4, BZ.red, '#fff', 100)}<rect width="1080" height="1920" fill="#ff6a2a" opacity="0.12"/>${bzVignette(0.7)}`),
    anim(tl, s, K, $) { muGallop(tl, $('#mula'), s.t0, s.t1, 0.2); tl.fromTo($('#mula'), { x: -80 }, { x: 80, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzHook(tl, $('#hk'), s.t0); bzQuake(tl, $('#cam'), s.t0, s.t1, 3); } },
  fire: { bg: '#05070f', html: () => bzShot(muNeckClose(), bzVignette(0.8)),
    anim(tl, s, K, $) { muFlicker(tl, $('#mula'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 600, 1100); } },
  vilas: { bg: '#0f1530', html: () => bzShot(`${bzSky('#0f1530', '#3a2f5a')}${bzStars(50, 9, 900)}<rect y="1180" width="1080" height="760" fill="#2c3a34" ${bzO()}/>${muVillages()}${muMula('mula', 0, 1500, 0.45)}`, `${[...Array(7)].map((_, i) => bzNum('n' + i, String(i + 1), 80 + i * 155, 1000, i === 6 ? BZ.red : '#fff', 110)).join('')}`),
    anim(tl, s, K, $) { muGallop(tl, $('#mula'), s.t0, s.t1, 0.16); tl.fromTo($('#mula'), { x: -100 }, { x: 1150, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      for (let i = 0; i < 7; i++) bzShow(tl, $('#n' + i), s.t0 + (s.t1 - s.t0) * (i + 0.5) / 7.5); } },
  // ---------------- the town
  town: { bg: '#0f1530', html: () => bzShot(`${muSquare()}<rect id="w1" x="60" y="1000" width="110" height="110" fill="#2a2a3a" opacity="0"/><rect id="w2" x="880" y="1000" width="110" height="110" fill="#2a2a3a" opacity="0"/>`, bzSign('mn', '00:00', 540, 1050, -3, '#14161c', '#ff4a3a', 110)),
    anim(tl, s, K, $) { tl.set($('#w1'), { opacity: 1 }, s.t0 + 0.9); tl.set($('#w2'), { opacity: 1 }, s.t0 + 1.6); tl.set($('#mn'), { opacity: 0 }, s.t0); bzShow(tl, $('#mn'), s.t0 + 2.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 900); } },
  title: { bg: '#0f1530', html: () => bzShot(`${muSquare(1)}${muMula('mula', 440, 1720, 1.2)}`, `${bzSign('tt', 'A MULA SEM CABEÇA', 540, 340, -4, BZ.yellow, BZ.ink, 92)}${bzFlash('fl', '#ffb060')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { muFlicker(tl, $('#mula'), s.t0, s.t1); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1100); } },
  curse: { bg: '#0f1530', html: () => bzShot(`${bzSky('#0f1530', '#3a2f5a')}${bzStars(50, 3, 900)}${bzMoon('mn', 540, 620, 220)}<rect y="1400" width="1080" height="540" fill="#2c3a34" ${bzO()}/><g id="m1">${bzChar('moca', MU_MOCA, 540, 1560, 1.25)}</g><g id="m2" opacity="0">${muMula('mula', 480, 1640, 1.1)}</g>`, `${bzFlash('fl', '#ffb060')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moca'), s.t0, 'half', 'frown'); bzBlink(tl, $('#moca'), s.t0, K('v')); bzShake(tl, $('#moca'), K('v') - 0.8, K('v'), 4);
      tl.set($('#m1'), { opacity: 0 }, K('v')); tl.set($('#m2'), { opacity: 1 }, K('v')); bzHit(tl, $('#fl'), K('v'), 0.8); muFlicker(tl, $('#mula'), K('v'), s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1100); } },
  boys: { bg: '#0f1530', html: () => bzShot(`${muSquare()}${muDavi(320, 1480, 1.3)}${muBeto(740, 1480, 1.3, true)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#beto'), s.t0, 'closed', 'grin'); bzFace(tl, $('#davi'), s.t0, 'half', 'smile'); bzShake(tl, $('#beto'), s.t0, s.t0 + 1.2, 3); bzBlink(tl, $('#davi'), s.t0, s.t1); bzPose(tl, $('#beto'), s.t0 + 0.2, { aR: -60 }, 0.3); } },
  beto: { bg: '#0f1530', html: () => bzShot(`${muSquare()}${muBeto(540, 1650, 2.2)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#beto'), s.t0, 'dot', 'grin'); bzTalk(tl, $('#beto'), 'mu_beto', s.t0, s.t1, 'grin', 'open'); tl.fromTo($('#beto .hd'), { rotation: -10, transformOrigin: '50% 90%' }, { rotation: 10, duration: 0.7, yoyo: true, repeat: 2 }, s.t0); } },
  // ---------------- midnight
  bell: { bg: '#0f1530', html: () => bzShot(`<g transform="translate(-1080 -250) scale(3)">${muSquare(1)}</g>`, `${muDark('dk', '#05060c', 0.15)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { tl.fromTo($('#bell'), { rotation: -25, svgOrigin: '540 330' }, { rotation: 25, svgOrigin: '540 330', duration: 0.45, yoyo: true, repeat: 3, ease: 'sine.inOut' }, K('b') - 0.2); bzQuake(tl, $('#cam'), K('b'), K('b') + 0.2, 4); } },
  neigh: { bg: '#0f1530', html: () => bzShot(`${muSquare(1)}${muGlow('gl', 540, 1200, 360)}`, `${muDark('dk', '#05060c', 0.3)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.to($('#gl'), { opacity: 0.55, duration: s.t1 - K('r'), ease: 'power1.in' }, K('r') - 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.18, 540, 1200); } },
  street: { bg: '#0f1530', html: () => bzShot(`${muSquare(1)}${muMula('mula', 0, 1840, 1.1)}<g id="sparks" opacity="0">${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${(i * 37) % 120 - 60}" cy="${-(i * 23) % 50}" r="${6 + (i % 3) * 3}" fill="#ffe08a"/>`).join('')}</g>`, bzVignette(0.7)),
    anim(tl, s, K, $) { muGallop(tl, $('#mula'), s.t0, s.t1, 0.2); tl.fromTo($('#mula'), { x: -500 }, { x: 1300, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      tl.set($('#sparks'), { opacity: 1 }, K('sp')); tl.fromTo($('#sparks'), { x: -500 + 400, y: 1840 }, { x: 1300 + 400, y: 1840, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzQuake(tl, $('#cam'), s.t0, s.t1, 3); } },
  neck: { bg: '#05070f', html: () => bzShot(muNeckClose(), `<rect width="1080" height="1920" fill="#ff6a2a" opacity="0.1"/>${bzVignette(0.8)}`),
    anim(tl, s, K, $) { muFlicker(tl, $('#mula'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1.35, 600, 900); } },
  // ---------------- hide
  vo: { bg: '#e8d4b0', html: () => bzShot(`<rect width="1080" height="1920" fill="#e8d4b0"/><rect y="1300" width="1080" height="640" fill="#b89a70" ${bzO()}/>${muVo(540, 1720, 1.6)}`, `<rect width="1080" height="1920" fill="#c8a060" opacity="0.3"/>${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'dot', 'flat'); bzPose(tl, $('#vo'), s.t0 + 0.2, { aR: -120 }, 0.3); bzBlink(tl, $('#vo'), s.t0, s.t1); } },
  lie: { bg: '#0f1530', html: () => bzShot(`${muSquare(1)}${muLying('davi', 380, 1700, 1.3)}`, `${muDark('dk', '#05060c', 0.25)}${bzSign('s1', 'DEITA', 260, 420, -5, BZ.yellow, BZ.ink, 90)}${bzSign('s2', 'ESCONDE AS UNHAS', 560, 600, 3, '#fff', BZ.ink, 70)}${bzSign('s3', 'FECHA OS OLHOS', 600, 790, -3, BZ.red, '#fff', 74)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'closed', 'flat'); ['s1', 's2', 's3'].forEach((id, i) => { tl.set($('#' + id), { opacity: 0 }, s.t0); bzShow(tl, $('#' + id), K('d') + i * 1.3); }); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1500); } },
  notme: { bg: '#0f1530', html: () => bzShot(`${muSquare(1)}${muLying('davi', 140, 1760, 1.1)}${muBeto(720, 1500, 1.3)}<rect id="og" width="1080" height="1920" fill="#ff7a2a" opacity="0"/>`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'closed', 'flat'); bzFace(tl, $('#beto'), s.t0, 'wide', 'open'); tl.to($('#og'), { opacity: 0.22, duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 720, 1000); } },
  pass: { bg: '#0f1530', html: () => bzShot(`${muSquare(1)}${muLying('davi', 300, 1800, 1.0)}${muMula('mula', 0, 1650, 1.3)}`, `<rect id="og" width="1080" height="1920" fill="#ff7a2a" opacity="0"/>${bzFlash('fl', '#fff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'closed', 'frown'); muGallop(tl, $('#mula'), s.t0, s.t1, 0.18); tl.fromTo($('#mula'), { x: -700 }, { x: 1400, duration: 1.4, ease: 'none' }, K('f') - 0.4);
      tl.fromTo($('#og'), { opacity: 0 }, { opacity: 0.4, duration: 0.5, yoyo: true, repeat: 1 }, K('f') - 0.2); bzHit(tl, $('#fl'), K('g'), 0.7); bzQuake(tl, $('#cam'), K('g'), s.t1, 8); } },
  silence: { bg: '#020305', html: () => bzShot(`<rect width="1080" height="1920" fill="#020305"/>${bzStars(20, 5, 900)}`, ''), anim() {} },
  // ---------------- after
  empty: { bg: '#0f1530', html: () => bzShot(`${muSquare(1)}${muDavi(540, 1560, 1.35)}`, muDark('dk', '#05060c', 0.15)),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'wide', 'o'); tl.fromTo($('#davi .hd'), { rotation: -14, transformOrigin: '50% 90%' }, { rotation: 14, duration: 0.8, yoyo: true, repeat: 2, ease: 'sine.inOut' }, s.t0 + 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1, 540, 1000); } },
  prints: { bg: '#0f1530', html: () => bzShot(`<g transform="translate(-540 -2340) scale(2)">${muSquare(1)}${muPrints()}</g>`, bzVignette(0.7)),
    anim(tl, s, K, $) { for (let i = 0; i < 6; i++) tl.to($('#hp' + i), { opacity: 1, duration: 0.15 }, s.t0 + 0.3 + i * 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1500); } },
  cap: { bg: '#0f1530', html: () => bzShot(`<g transform="translate(-540 -2340) scale(2)">${muSquare(1)}</g>${muCap(540, 1060, 2.4)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { muFlicker(tl, $('#cap'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1000); } },
  you: { bg: '#05070f', html: () => bzShot(muNeckClose(), `${bzFlash('fl', '#fff')}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { muFlicker(tl, $('#mula'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, K('end'), 1, 1.7, 600, 1000); bzHit(tl, $('#fl'), K('end'), 0.9); } },
});
