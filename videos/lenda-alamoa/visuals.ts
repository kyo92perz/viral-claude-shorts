// <lines>
const AL_LINES = [{"who": "al_eu", "t0": 0.3, "t1": 7.367}, {"who": "al_eu", "t0": 7.967, "t1": 14.888}, {"who": "al_tio", "t0": 15.388, "t1": 19.328}, {"who": "al_eu", "t0": 19.928, "t1": 24.976}, {"who": "al_eu", "t0": 25.476, "t1": 30.236}, {"who": "al_moa", "t0": 30.836, "t1": 34.044}, {"who": "al_eu", "t0": 34.744, "t1": 39.364}, {"who": "al_eu", "t0": 39.964, "t1": 46.154}, {"who": "al_eu", "t0": 46.854, "t1": 49.676}, {"who": "al_eu", "t0": 50.276, "t1": 56.891}, {"who": "al_eu", "t0": 57.491, "t1": 60.184}];
// </lines>
// =====================================================================
//  A ALAMOA: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s.
//  Revealed in parts: lightning, golden hair, the smile, the door of gold, the face falling, the skeleton.
// =====================================================================
BZ_TALK.lines = AL_LINES;
const alSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const alClose = (k: string, s: number, bg: string, id = k) => `${bg}${alChar(k, 540, 507 * (k === 'moa' || k === 'osso' ? 1.02 : 1) * s + 640, s, false, id)}`;
const alRain = (id: string) => bzParticles(id, 'dust', 50, [0, 0, 1080, 1900], 5);
const alFoam = (tl: gsap.core.Timeline, $: (q: string) => string, t0: number, t1: number) => tl.fromTo($('.foam'), { x: -20 }, { x: 20, duration: 0.9, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.9)), stagger: 0.1, ease: 'sine.inOut' }, t0);
const alFlash = (tl: gsap.core.Timeline, $: (q: string) => string, t: number) => { tl.set($('#lb'), { opacity: 1 }, t); tl.set($('#lb'), { opacity: 0 }, t + 0.15); bzHit(tl, $('#fl'), t, 0.7); };
const alFloat = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number) => tl.fromTo(sel, { y: 0 }, { y: -24, duration: 1.2, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 1.2)), ease: 'sine.inOut' }, t0);

defineVisuals({
  // ---------------- the hook: a woman in white on the dark beach, her golden hair, frame 1
  hook: { bg: '#06081a', html: () => bzShot(`${alNight()}<g id="m">${alChar('moa', 700, 1640, 0.9)}</g>${alRain('rn')}${alBolt('lb', 250, 120, 1.3)}`, `${alSay('hk', 'NÃO VÁ ATRÁS', 540, 1560, -4, '#f2c84a', BZ.ink, 100)}${bzFlash('fl', '#e8f0ff')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); bzFace(tl, $('#moa'), s.t0, 'half', 'smile'); bzPose(tl, $('#moa'), s.t0 + 0.5, { aR: -130 }, 0.4); alFloat(tl, $('#m'), s.t0, s.t1); alFoam(tl, $, s.t0, s.t1);
      bzParticlesGo(tl, $('#rn'), 'dust', s.t0, s.t1); alFlash(tl, $, K('h')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 700, 1200); } },
  title: { bg: '#06081a', html: () => bzShot(`${alNight(true)}${alRain('rn')}${alBolt('lb', 650, 80, 1.4)}`, `${alSay('tt', 'A ALAMOA', 540, 380, -4, '#f2c84a', BZ.ink, 140)}${bzFlash('fl', '#e8f0ff')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { alFoam(tl, $, s.t0, s.t1); bzParticlesGo(tl, $('#rn'), 'dust', s.t0, s.t1); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); alFlash(tl, $, K('t')); } },
  lore: { bg: '#06081a', html: () => bzShot(`${alNight()}<g id="m">${alChar('moa', 540, 1580, 1.2)}</g>${alRain('rn')}${alBolt('lb', 300, 100, 1.2)}`, `${alSay('pe', 'OS PÉS NÃO TOCAM A AREIA', 540, 1620, 3, '#fff', BZ.ink, 60)}${bzFlash('fl', '#e8f0ff')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moa'), s.t0, 'closed', 'smile'); alFloat(tl, $('#m'), s.t0, s.t1); tl.set($('#m'), { y: -60 }, s.t0); alFoam(tl, $, s.t0, s.t1); bzParticlesGo(tl, $('#rn'), 'dust', s.t0, s.t1);
      alFlash(tl, $, K('l')); tl.set($('#pe'), { opacity: 0 }, s.t0); bzShow(tl, $('#pe'), K('p')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1500); } },
  tio: { bg: '#06081a', html: () => bzShot(alClose('tio', 2.0, `${alNight()}`), `${alRain('rn')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tio'), s.t0, 'half', 'frown'); bzTalk(tl, $('#tio'), 'al_tio', s.t0, s.t1, 'frown', 'open'); bzBlink(tl, $('#tio'), s.t0, s.t1); bzParticlesGo(tl, $('#rn'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 650); } },
  // ---------------- the storm night
  boat: { bg: '#06081a', html: () => bzShot(`${alNight()}<g id="bt">${alBoat(300, 1260, 1.0)}</g>${alChar('tio', 760, 1700, 1.0, true)}<g id="lt">${bzGlow('lg', 760, 600, 140, '#f2c84a', 0.7)}<circle cx="760" cy="600" r="16" fill="#fff4c0"/></g>${alRain('rn')}`, bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#bt'), { rotation: -3, svgOrigin: '300 1260' }, { rotation: 3, duration: 0.9, yoyo: true, repeat: 5, ease: 'sine.inOut' }, s.t0); bzFace(tl, $('#tio'), s.t0, 'dot', 'flat'); bzWalk(tl, $('#tio'), s.t0, K('l'), 120, 0);
      tl.set($('#lt'), { opacity: 0 }, s.t0); tl.to($('#lt'), { opacity: 1, duration: 0.3 }, K('l')); tl.fromTo($('#lt'), { y: 0 }, { y: 300, duration: s.t1 - K('l'), ease: 'none' }, K('l')); bzFace(tl, $('#tio'), K('l'), 'wide', 'o');
      tl.to($('#tio .hd'), { rotation: -15, transformOrigin: '50% 90%', duration: 0.3 }, K('l')); alFoam(tl, $, s.t0, s.t1); bzParticlesGo(tl, $('#rn'), 'dust', s.t0, s.t1); } },
  her: { bg: '#06081a', html: () => bzShot(alClose('moa', 2.2, `${alNight()}`), `${bzGlow('hg', 540, 600, 420, '#f2c84a', 0.2)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moa'), s.t0, 'closed', 'flat'); bzFace(tl, $('#moa'), s.t0 + 0.8, 'half', 'flat'); bzFace(tl, $('#moa'), K('s'), 'half', 'smile'); bzPose(tl, $('#moa'), K('s') + 0.4, { aR: -140 }, 0.4);
      tl.to($('#moa .aR'), { rotation: -110, duration: 0.4, yoyo: true, repeat: 3 }, K('s') + 0.8); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 650); } },
  call: { bg: '#06081a', html: () => bzShot(alClose('moa', 2.6, `${alNight(true)}`), `${bzGlow('hg', 540, 600, 420, '#f2c84a', 0.25)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moa'), s.t0, 'half', 'smile'); bzTalk(tl, $('#moa'), 'al_moa', s.t0, s.t1, 'smile', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 640); } },
  // ---------------- the Pico, the gold, the face
  climb: { bg: '#06081a', html: () => bzShot(`<g transform="translate(-700 -900) scale(2)">${alNight()}</g><g id="door" opacity="0">${bzGlow('dg', 540, 1000, 420, '#f2c84a', 0.55)}<path d="M400 1300 L 400 920 Q 540 800 680 920 L 680 1300 Z" fill="#ffd86a" ${bzO()}/></g><rect x="380" y="900" width="320" height="420" fill="#2a3a30" id="slab" ${bzO()}/>${alChar('moa', 540, 1700, 0.9)}${alChar('tio', 300, 1760, 0.9)}${alRain('rn')}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#tio'), s.t0, 'half', 'smile'); bzFace(tl, $('#moa'), s.t0, 'closed', 'smile'); tl.set($('#door'), { opacity: 1 }, K('d') - 0.1);
      tl.to($('#slab'), { x: 340, duration: 0.8, ease: 'power2.inOut' }, K('d')); bzParticlesGo(tl, $('#rn'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1100); } },
  gold: { bg: '#2a1e14', html: () => bzShot(`${alGold()}<g id="a">${alChar('moa', 540, 2200, 2.6)}</g><g id="b" opacity="0">${alChar('osso', 540, 2200, 2.6)}</g>`, `${alSay('ou', 'OURO', 540, 1580, -3, '#f2c84a', BZ.ink, 110)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#moa'), s.t0, 'half', 'smile'); bzFace(tl, $('#osso'), s.t0, 'glow', 'fangs'); tl.set($('#ou'), { opacity: 0 }, s.t0); bzShow(tl, $('#ou'), K('o')); tl.to($('#ou'), { opacity: 0, duration: 0.2 }, K('o') + 1.5);
      tl.to($('#b'), { opacity: 1, duration: s.t1 - K('f'), ease: 'none' }, K('f')); tl.to($('#a'), { y: 60, duration: s.t1 - K('f') }, K('f')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 700); } },
  skull: { bg: '#2a1e14', html: () => bzShot(alClose('osso', 2.6, `${alGold()}`), `<rect id="dr" x="-20" y="0" width="0" height="1920" fill="#120c08"/><rect id="dl" x="1100" y="0" width="0" height="1920" fill="#120c08"/>${bzFlash('fl', '#f2c84a')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#osso'), s.t0, 'glow', 'fangs'); bzHit(tl, $('#fl'), K('k'), 0.5); tl.from($('#cam'), { scale: 1.3, svgOrigin: '540 640', duration: 0.4, ease: 'power3.out' }, K('k'));
      tl.to($('#dr'), { width: 560, duration: s.t1 - K('c'), ease: 'power1.in' }, K('c')); tl.to($('#dl'), { x: 540, width: 560, duration: s.t1 - K('c'), ease: 'power1.in' }, K('c')); } },
  fall: { bg: '#f2a06a', html: () => bzShot(`${alNight(false, true)}<g id="w">${alChar('tiow', 540, 1720, 1.2)}</g>`, `${alSay('br', 'CABELO BRANCO', 540, 640, -3, '#fff', BZ.ink, 90)}${alSay('tr', '30 ANOS', 540, 1560, 3, BZ.red, '#fff', 90)}`),
    anim(tl, s, K, $) { tl.fromTo($('#w'), { rotation: -90, svgOrigin: '540 1720', x: -200, opacity: 0 }, { rotation: 0, x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, K('j')); bzFace(tl, $('#tiow'), s.t0, 'closed', 'flat'); bzFace(tl, $('#tiow'), K('w') - 0.5, 'wide', 'o');
      tl.set($('#br') + ', ' + $('#tr'), { opacity: 0 }, s.t0); bzShow(tl, $('#br'), K('w')); bzShow(tl, $('#tr'), K('w') + 1.0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  end: { bg: '#06081a', html: () => bzShot(`${alNight()}<g id="m" opacity="0">${alChar('moa', 700, 1640, 0.9)}</g>${alRain('rn')}${alBolt('lb', 250, 120, 1.3)}`, `${bzFlash('fl', '#e8f0ff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { alFoam(tl, $, s.t0, s.t1); bzParticlesGo(tl, $('#rn'), 'dust', s.t0, s.t1); bzFace(tl, $('#moa'), s.t0, 'half', 'smile'); tl.to($('#m'), { opacity: 1, duration: 1.5 }, s.t0 + 0.6); alFlash(tl, $, K('end') - 0.2); } },
});
