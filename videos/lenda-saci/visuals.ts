// <lines>
const SA_LINES = [{"who": "sa_eu", "t0": 0.3, "t1": 7.49}, {"who": "sa_eu", "t0": 8.09, "t1": 12.787}, {"who": "sa_eu", "t0": 13.287, "t1": 18.67}, {"who": "sa_vo", "t0": 19.17, "t1": 24.296}, {"who": "sa_eu", "t0": 24.896, "t1": 30.201}, {"who": "sa_eu", "t0": 30.701, "t1": 36.672}, {"who": "sa_eu", "t0": 37.472, "t1": 42.647}, {"who": "sa_eu", "t0": 43.247, "t1": 47.77}, {"who": "sa_eu", "t0": 48.37, "t1": 54.431}, {"who": "sa_eu", "t0": 55.131, "t1": 59.402}, {"who": "sa_vo", "t0": 60.002, "t1": 64.266}, {"who": "sa_eu", "t0": 64.866, "t1": 67.821}];
// </lines>
// =====================================================================
//  O SACI: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Lia ~400*s, the Saci ~330*s.
//  The Saci is revealed in parts: the cap tip behind the fence, the whirlwind, ONE leg under the sieve, then the face.
// =====================================================================
BZ_TALK.lines = SA_LINES;
const P_DAY = SA_PAL.day, P_DUSK = SA_PAL.dusk;
const saSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const saHide = (tl: gsap.core.Timeline, sel: string, t0: number, t: number) => { tl.set(sel, { opacity: 0 }, t0); bzShow(tl, sel, t); };
// the whirlwind spins: rings sway left/right out of phase, dust bits rise
function saSpin(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  const n = Math.max(1, Math.floor((t1 - t0) / 0.3));
  tl.fromTo(`${sel} .ring`, { x: -14 }, { x: 14, duration: 0.15, yoyo: true, repeat: n * 2 - 1, stagger: 0.03, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .dbit`, { y: 60, opacity: 0 }, { y: -200, opacity: 1, duration: 0.9, stagger: 0.07, repeat: Math.max(0, Math.floor((t1 - t0) / 0.9)), ease: 'none' }, t0);
}
// a big close face: head centred at y ~ 640
const saClose = (k: string, s: number, bg: string, id = k) => `${bg}${saChar(k, 540, (k === 'saci' ? 330 : k === 'lia' || k === 'liab' ? 400 : 507) * s + 640, s, false, id)}`;

defineVisuals({
  // ---------------- the hook: a braided mane in frame 1 and the red cap tip behind the fence
  hook: { bg: '#5aa8e0', html: () => bzShot(`<g transform="translate(-539 -2710) scale(2.6)">${saFarm(P_DAY, false)}${saMare('mare', 560, 1700, 1.0, true)}</g>
      <g id="tip" transform="translate(900 1200) rotate(-20)"><path d="M0 0 Q 60 -120 150 -60 Q 110 -20 60 -10 Z" fill="#d8302a" ${bzO()}/><circle cx="150" cy="-60" r="18" fill="#d8302a" ${bzO('stroke-width="6"')}/></g>${bzParticles('dt', 'dust', 22, [0, 0, 1080, 1800], 3)}`,
      `${saSay('hk', 'NÃO DESMANCHE', 540, 1560, -4, BZ.red, '#fff', 100)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1); tl.fromTo($('#tip'), { y: 0 }, { y: 160, duration: 0.25, ease: 'power2.in' }, K('h') + 0.6);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); bzHandheld(tl, $('#cam'), s.t0, s.t1, 4); } },
  title: { bg: '#f29a4a', html: () => bzShot(`${saFarm(P_DUSK)}${saWhirl('wh', 540, 1720, 1.3)}${bzParticles('dt', 'dust', 30, [0, 900, 1080, 1800], 5)}`, `${saSay('tt', 'O SACI', 540, 380, -4, BZ.yellow, BZ.ink, 150)}${bzFlash('fl', '#ffd27a')}`),
    anim(tl, s, K, $) { saSpin(tl, $('#wh'), s.t0, s.t1); tl.fromTo($('#wh'), { x: -500 }, { x: 300, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1);
      tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.4); bzHandheld(tl, $('#cam'), s.t0, s.t1, 5); } },
  // ---------------- the farm
  farm: { bg: '#5aa8e0', html: () => bzShot(`${saFarm(P_DAY)}${saChar('vo', 720, 1560, 1.15)}${saChar('lia', 300, 1580, 1.1)}<g id="bag"><rect x="150" y="1300" width="90" height="120" rx="20" fill="#3a8a8a" ${bzO()}/></g>`, saSay('nm', 'MINAS GERAIS', 540, 360, -3, '#fff', BZ.ink, 90)),
    anim(tl, s, K, $) { bzWalk(tl, $('#lia'), s.t0, s.t0 + 2.5, -260, 0); tl.fromTo($('#bag'), { x: -260 }, { x: 0, duration: 2.5, ease: 'none' }, s.t0); bzFace(tl, $('#lia'), s.t0, 'dot', 'smile');
      bzFace(tl, $('#vo'), s.t0, 'closed', 'grin'); bzPose(tl, $('#vo'), K('v'), { aR: -150 }, 0.25); tl.to($('#vo .aR'), { rotation: -120, duration: 0.2, yoyo: true, repeat: 5 }, K('v') + 0.25); bzIdle(tl, $('#vo'), s.t0, s.t1, 1);
      tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), s.t0 + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  wrong: { bg: '#f29a4a', html: () => bzShot(saClose('lia', 2.3, `${saFarm(P_DUSK, false)}`), bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#lia'), s.t0, 'dot', 'smile'); bzFace(tl, $('#lia'), K('w') - 0.4, 'wide', 'o'); bzBlink(tl, $('#lia'), s.t0, K('w') - 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 700); } },
  // ---------------- what goes wrong
  milk: { bg: '#e8d4b0', html: () => bzShot(saKitchen(), `${saSay('az', 'AZEDO', 390, 640, -6, '#7aa83a', '#fff', 80)}${saSay('vz', 'VAZIO', 740, 860, 5, BZ.red, '#fff', 80)}`),
    anim(tl, s, K, $) { tl.fromTo($('#milk .stk'), { y: 20, opacity: 0.3 }, { y: -30, opacity: 1, duration: 0.8, yoyo: true, repeat: 5, ease: 'sine.inOut' }, s.t0); tl.set($('#az, #vz'), { opacity: 0 }, s.t0); bzShow(tl, $('#az'), s.t0 + 0.6);
      tl.to($('#salt'), { rotation: 160, svgOrigin: '740 1100', duration: 0.35, ease: 'back.out(2)' }, K('s')); bzShow(tl, $('#vz'), K('s') + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 560, 1050); } },
  mane: { bg: '#5aa8e0', html: () => bzShot(`<g transform="translate(-560 -1900) scale(2.2)">${saFarm(P_DAY, false)}${saMare('mare', 560, 1700, 1.0)}</g>`, bzVignette(0.5)),
    anim(tl, s, K, $) { tl.to($('#mare .br'), { opacity: 1, duration: 0.15, stagger: 0.28 }, K('m') + 0.3); tl.fromTo($('#mare'), { rotation: 0 }, { rotation: -2, svgOrigin: '560 1700', duration: 0.2, yoyo: true, repeat: 3 }, K('m'));
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 380, 900); } },
  vo: { bg: '#5aa8e0', html: () => bzShot(saClose('vo', 2.0, `${saFarm(P_DAY, false)}`), bzVignette(0.55)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'flat'); bzTalk(tl, $('#vo'), 'sa_vo', s.t0, s.t1, 'flat', 'open'); bzBlink(tl, $('#vo'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 700); } },
  whirlsmall: { bg: '#5aa8e0', html: () => bzShot(`${saFarm(P_DAY)}${saWhirl('wh', 760, 1600, 0.8)}${bzParticles('dt', 'dust', 20, [400, 1000, 1080, 1700], 4)}`, ''),
    anim(tl, s, K, $) { saSpin(tl, $('#wh'), s.t0, s.t1); tl.fromTo($('#wh'), { x: 0 }, { x: -420, duration: s.t1 - s.t0, ease: 'sine.inOut' }, s.t0); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); } },
  teach: { bg: '#e8d4b0', html: () => bzShot(`${saKitchen().replace(/<g id="milk">[\s\S]*?<\/g><\/g>/, '').replace(/<g id="salt">[\s\S]*?<\/g>/, '')}${saChar('vo', 540, 1700, 1.3)}${saSieve('sv', 280, 1080, 0.7, 1)}${saBottle('bt', 820, 1180, 0.5)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'dot', 'flat'); bzPose(tl, $('#vo'), s.t0 + 0.3, { aL: 60 }, 0.3); tl.set($('#sv, #bt'), { opacity: 0 }, s.t0);
      bzShow(tl, $('#sv'), K('p')); bzShow(tl, $('#bt'), K('g')); bzPose(tl, $('#vo'), K('g'), { aR: -60 }, 0.3); bzIdle(tl, $('#vo'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  // ---------------- the whirlwind and the sieve
  whirl: { bg: '#5aa8e0', html: () => bzShot(`${saFarm(P_DAY)}${saWhirl('wh', 900, 1700, 1.2)}${saChar('lia', 240, 1640, 1.1)}${saSieve('sv', 330, 1420, 0.5, 1)}${bzParticles('dt', 'dust', 30, [0, 900, 1080, 1800], 6)}`, ''),
    anim(tl, s, K, $) { saSpin(tl, $('#wh'), s.t0, s.t1); tl.fromTo($('#wh'), { x: 200 }, { x: -260, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1);
      bzFace(tl, $('#lia'), s.t0, 'wide', 'flat'); bzPose(tl, $('#lia'), s.t0, { aR: -60 }, 0.01); bzShake(tl, $('#cam'), K('r'), K('r') + 1, 3); } },
  throw: { bg: '#5aa8e0', html: () => bzShot(`${saFarm(P_DAY)}${saWhirl('wh', 600, 1720, 1.2)}${saSieve('sv', 260, 1400, 0.6, 0.5)}${bzParticles('dt', 'dust', 30, [0, 900, 1080, 1800], 7)}`, bzFlash('fl', '#fff')),
    anim(tl, s, K, $) { saSpin(tl, $('#wh'), s.t0, K('p')); tl.fromTo($('#sv'), { x: 0, y: 0, rotation: 0 }, { x: 340, y: 300, rotation: 400, svgOrigin: '260 1400', duration: 0.5, ease: 'power2.in' }, K('j'));
      bzHit(tl, $('#fl'), K('x'), 0.5); tl.to($('#wh .ring, #wh .dbit'), { opacity: 0, duration: 0.25 }, K('p')); tl.to($('#dt'), { opacity: 0, duration: 0.25 }, K('p')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 600, 1500); } },
  // ---------------- the reveal, in parts: one leg under the sieve, then the face
  under: { bg: '#c8784a', html: () => bzShot(`<g transform="translate(-540 -1700) scale(2)">${saFarm(P_DAY, false)}</g><g id="leg" opacity="0"><rect x="500" y="1120" width="80" height="330" rx="30" fill="#5a3a28" ${bzO('stroke-width="9"')}/><ellipse cx="530" cy="1450" rx="80" ry="34" fill="#5a3a28" ${bzO('stroke-width="9"')}/><rect x="470" y="1040" width="140" height="120" rx="30" fill="#c8342c" ${bzO('stroke-width="9"')}/></g>
      ${saSieve('sv', 540, 1040, 1.6, 0.4)}`, `${saSay('um', 'UMA PERNA SÓ', 540, 380, -3, '#fff', BZ.ink, 90)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.fromTo($('#sv'), { y: 0 }, { y: -360, duration: 1.2, ease: 'power2.inOut' }, s.t0 + 0.8); tl.to($('#leg'), { opacity: 1, duration: 0.3 }, s.t0 + 1.2); tl.set($('#um'), { opacity: 0 }, s.t0); bzShow(tl, $('#um'), K('l'));
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 1250); } },
  cap: { bg: '#f29a4a', html: () => bzShot(saClose('saci', 3.0, `${saFarm(P_DUSK, false)}`), `${saSay('ha', 'HÁ HÁ HÁ', 540, 340, 6, '#fff', BZ.red, 110)}${bzFlash('fl', '#fff')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#saci'), s.t0, 'glow', 'smile'); bzHit(tl, $('#fl'), K('c'), 0.6); tl.from($('#cam'), { scale: 1.35, svgOrigin: '540 640', duration: 0.4, ease: 'power3.out' }, K('c'));
      bzFace(tl, $('#saci'), K('r') - 0.3, 'glow', 'grin'); tl.fromTo($('#saci .hd'), { rotation: -6, transformOrigin: '50% 90%' }, { rotation: 6, duration: 0.16, yoyo: true, repeat: Math.max(1, Math.floor((s.t1 - K('r')) / 0.16)) }, K('r') - 0.3);
      tl.set($('#ha'), { opacity: 0 }, s.t0); bzShow(tl, $('#ha'), K('r') - 0.2); } },
  smoke: { bg: '#f29a4a', html: () => bzShot(`${saFarm(P_DUSK, false)}${saChar('saci', 380, 1600, 1.3)}<g id="puff">${[0, 1, 2, 3, 4].map((i) => `<circle cx="${380 + i * 70}" cy="${1300 - i * 60}" r="${80 - i * 8}" fill="#d8302a" opacity="0.5"/>`).join('')}</g>${saBottle('bt', 820, 1650, 0.7, false)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#saci'), s.t0, 'glow', 'grin'); tl.set($('#puff'), { opacity: 0 }, s.t0); tl.to($('#saci'), { opacity: 0, scale: 0.3, transformOrigin: '50% 100%', duration: 0.5 }, K('s'));
      tl.fromTo($('#puff'), { opacity: 0.9, x: -100, scale: 1.4, transformOrigin: '50% 50%' }, { opacity: 0, x: 360, y: 200, scale: 0.2, duration: 1.6, ease: 'power2.in' }, K('s'));
      tl.fromTo($('#btc'), { opacity: 1, y: -300 }, { y: 0, duration: 0.25, ease: 'power3.in' }, K('k') - 0.25); bzShake(tl, $('#bt'), K('k'), K('k') + 0.5, 6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 700, 1400); } },
  shelf: { bg: '#e8d8b8', html: () => bzShot(`${saRoom(false)}${saBottle('bt', 810, 840, 0.5)}`, ''),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.25, 810, 700); } },
  // ---------------- the night, the morning
  night: { bg: '#2a2a4a', html: () => bzShot(`${saRoom()}${saBottle('bt', 810, 840, 0.5)}${bzGlow('bg', 810, 700, 200, '#d8302a', 0.3)}<g id="lia0">${saChar('lia', 620, 1130, 0.9)}</g>`, `${saSay('fi', 'FIIIU', 760, 420, 8, '#fff', BZ.ink, 80)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#lia'), s.t0, 'closed', 'flat'); tl.set($('#lia0'), { rotation: -90, svgOrigin: '620 1130' }, s.t0); bzShake(tl, $('#bt'), K('a'), s.t1, 4);
      tl.set($('#fi'), { opacity: 0 }, s.t0); bzShow(tl, $('#fi'), K('a')); bzFace(tl, $('#lia'), K('a') + 0.4, 'wide', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 700, 900); } },
  morning: { bg: '#e8d8b8', html: () => bzShot(`${saRoom(false)}${saBottle('bt', 810, 840, 0.5, false)}<g id="cork"><rect x="560" y="1500" width="56" height="48" rx="10" fill="#c8945a" ${bzO()} transform="rotate(30 588 1524)"/></g>`, `${saSay('vz', 'VAZIA', 810, 560, -4, BZ.red, '#fff', 90)}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { tl.set($('#bt .smk'), { opacity: 0 }, s.t0); tl.set($('#vz'), { opacity: 0 }, s.t0); bzPush(tl, $('#cam'), s.t0, K('c'), 1, 1.0); tl.fromTo($('#cam'), { scale: 1 }, { scale: 1.5, svgOrigin: '588 1524', duration: 0.6, ease: 'power2.inOut' }, K('c'));
      tl.to($('#cam'), { scale: 1.4, svgOrigin: '810 700', duration: 0.5, ease: 'power2.inOut' }, K('v') - 0.5); bzShow(tl, $('#vz'), K('v')); } },
  // ---------------- the braids
  mirror: { bg: '#e8d8b8', html: () => bzShot(`${saMirror()}<g id="b0">${saChar('lia', 540, 2050, 2.6)}</g><g id="b1" opacity="0">${saChar('liab', 540, 2050, 2.6)}</g>`, `${bzFlash('fl', '#fff')}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#lia'), s.t0, 'dot', 'flat'); bzBlink(tl, $('#lia'), s.t0, K('m') - 0.3); tl.set($('#b0'), { opacity: 0 }, K('m')); tl.set($('#b1'), { opacity: 1 }, K('m')); bzFace(tl, $('#liab'), K('m'), 'wide', 'open');
      bzHit(tl, $('#fl'), K('m'), 0.6); bzShake(tl, $('#cam'), K('m'), K('m') + 0.4, 6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 900); } },
  braids: { bg: '#e8d8b8', html: () => bzShot(`<g transform="translate(-860 -1200) scale(2.6)">${saMirror()}${saChar('liab', 540, 2050, 2.6)}</g>`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#liab'), s.t0, 'wide', 'o'); tl.fromTo($('#cam'), { x: 0, y: 0 }, { x: -260, y: -120, duration: s.t1 - s.t0, ease: 'sine.inOut' }, s.t0); } },
  vo2: { bg: '#2a2a4a', html: () => bzShot(saClose('vo', 2.0, `<rect width="1080" height="1920" fill="#1e1a2e"/>${bzStars(40, 7, 1000)}`), `${bzGlow('lamp', 900, 800, 400, '#ffc860', 0.25)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'frown'); bzTalk(tl, $('#vo'), 'sa_vo', s.t0, s.t1, 'frown', 'open'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 650); } },
  // ---------------- the end: a whirlwind brushes past the camera (loops into the hook)
  end: { bg: '#f29a4a', html: () => bzShot(`${saFarm(P_DUSK)}${saWhirl('wh', 540, 2000, 2.4)}${bzParticles('dt', 'dust', 34, [0, 600, 1080, 1900], 8)}<g id="tip2" transform="translate(560 900)"><path d="M0 0 Q 60 -120 150 -60 Q 110 -20 60 -10 Z" fill="#d8302a" ${bzO()}/><circle cx="150" cy="-60" r="18" fill="#d8302a" ${bzO('stroke-width="6"')}/></g>`, bzVignette(0.7)),
    anim(tl, s, K, $) { saSpin(tl, $('#wh'), s.t0, s.t1); tl.fromTo($('#wh'), { x: -900 }, { x: 700, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzParticlesGo(tl, $('#dt'), 'dust', s.t0, s.t1);
      tl.fromTo($('#tip2'), { x: -900, rotation: 0 }, { x: 700, rotation: 720, svgOrigin: '560 900', duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzHandheld(tl, $('#cam'), s.t0, s.t1, 8); } },
});
