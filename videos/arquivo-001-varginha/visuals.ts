// <lines>
const AP_LINES = [{"who": "ap_narr", "t0": 0.4, "t1": 5.625}, {"who": "ap_narr", "t0": 6.325, "t1": 12.14}, {"who": "ap_narr", "t0": 13.14, "t1": 23.283}, {"who": "ap_lil", "t0": 24.483, "t1": 27.618}, {"who": "ap_narr", "t0": 28.218, "t1": 41.048}, {"who": "ap_narr", "t0": 41.848, "t1": 52.957}, {"who": "ap_narr", "t0": 53.957, "t1": 58.438}, {"who": "ap_narr", "t0": 60.038, "t1": 70.181}, {"who": "ap_narr", "t0": 70.781, "t1": 76.946}, {"who": "ap_narr", "t0": 77.546, "t1": 89.836}, {"who": "ap_narr", "t0": 90.536, "t1": 101.361}, {"who": "ap_narr", "t0": 101.961, "t1": 116.283}, {"who": "ap_narr", "t0": 117.283, "t1": 127.876}, {"who": "ap_narr", "t0": 128.476, "t1": 137.45}, {"who": "ap_narr", "t0": 138.25, "t1": 141.253}, {"who": "ap_narr", "t0": 142.653, "t1": 155.097}, {"who": "ap_narr", "t0": 155.897, "t1": 166.881}, {"who": "ap_kat", "t0": 168.081, "t1": 171.565}, {"who": "ap_narr", "t0": 172.365, "t1": 180.198}, {"who": "ap_narr", "t0": 180.798, "t1": 189.067}, {"who": "ap_narr", "t0": 190.067, "t1": 199.193}, {"who": "ap_narr", "t0": 200.393, "t1": 209.92}, {"who": "ap_narr", "t0": 210.72, "t1": 220.787}, {"who": "ap_narr", "t0": 221.387, "t1": 232.411}, {"who": "ap_pm", "t0": 233.211, "t1": 236.799}, {"who": "ap_narr", "t0": 237.599, "t1": 248.393}, {"who": "ap_narr", "t0": 249.093, "t1": 260.91}, {"who": "ap_narr", "t0": 261.91, "t1": 271.026}, {"who": "ap_narr", "t0": 272.426, "t1": 278.318}, {"who": "ap_narr", "t0": 279.318, "t1": 289.386}, {"who": "ap_narr", "t0": 289.986, "t1": 300.46}, {"who": "ap_narr", "t0": 301.86, "t1": 313.805}, {"who": "ap_narr", "t0": 314.605, "t1": 325.348}, {"who": "ap_narr", "t0": 326.548, "t1": 338.756}, {"who": "ap_narr", "t0": 339.356, "t1": 349.908}, {"who": "ap_narr", "t0": 350.508, "t1": 361.307}, {"who": "ap_narr", "t0": 362.107, "t1": 370.351}, {"who": "ap_narr", "t0": 371.751, "t1": 386.283}, {"who": "ap_narr", "t0": 386.883, "t1": 394.677}, {"who": "ap_narr", "t0": 395.277, "t1": 403.72}, {"who": "ap_doc", "t0": 405.12, "t1": 415.222}, {"who": "ap_narr", "t0": 416.222, "t1": 430.114}, {"who": "ap_narr", "t0": 430.914, "t1": 440.578}, {"who": "ap_doc", "t0": 441.378, "t1": 444.312}, {"who": "ap_narr", "t0": 445.912, "t1": 448.284}, {"who": "ap_narr", "t0": 449.284, "t1": 459.913}, {"who": "ap_kat", "t0": 460.913, "t1": 463.089}, {"who": "ap_narr", "t0": 464.089, "t1": 478.968}, {"who": "ap_narr", "t0": 479.768, "t1": 496.133}, {"who": "ap_narr", "t0": 497.133, "t1": 511.876}, {"who": "ap_narr", "t0": 513.076, "t1": 519.265}, {"who": "ap_narr", "t0": 520.265, "t1": 532.53}, {"who": "ap_narr", "t0": 533.33, "t1": 535.041}];
// </lines>
// =====================================================================
//  ARQUIVO PROIBIDO, Caso Nº 001: the shots (16:9, 1920 x 1080). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: ground ~ y 900, captions at y 860–930 (faces stay above ~820). Adult heads 507*s above the feet.
//  Tags (top right): RELATO for claims nobody confirmed, DOCUMENTO for the inquiry, RECONSTITUIÇÃO for acted lines.
// =====================================================================
BZ_TALK.lines = AP_LINES;
// center the world point (cx, cy) on the screen at zoom k
const vgZoom = (k: number, cx: number, cy: number, body: string) => `<g transform="translate(${(960 - cx * k).toFixed(1)} ${(540 - cy * k).toFixed(1)}) scale(${k})">${body}</g>`;
// hidden at the shot start, pops in at t
const vgPopAt = (tl: gsap.core.Timeline, sel: string, t0: number, t: number) => { tl.set(sel, { opacity: 0 }, t0); bzShow(tl, sel, t); };
const vgFadeAt = (tl: gsap.core.Timeline, sel: string, t0: number, t: number, d = 0.5) => { tl.set(sel, { opacity: 0 }, t0); tl.to(sel, { opacity: 1, duration: d }, t); };
// a big plate in the upper middle
const vgBig = (id: string, t: string, bg = BZ.yellow, fg = BZ.ink, y = 170, rot = -3, size = 110) => bzSign(id, t, 960, y, rot, bg, fg, size);
// a red "X" over something (#id)
const vgX = (id: string, x: number, y: number, r = 120) => `<g id="${id}"><path d="M${x - r} ${y - r} L ${x + r} ${y + r} M${x + r} ${y - r} L ${x - r} ${y + r}" stroke="${BZ.ink}" stroke-width="44" stroke-linecap="round"/><path d="M${x - r} ${y - r} L ${x + r} ${y + r} M${x + r} ${y - r} L ${x - r} ${y + r}" stroke="#e0302a" stroke-width="28" stroke-linecap="round"/></g>`;
// a big rubber stamp (no transform on the animated group)
const vgStamp = (id: string, t: string, x: number, y: number, size = 110, c = '#e0302a') => { const w = t.length * size * 0.55 + 90;
  return `<g id="${id}"><g transform="translate(${x} ${y}) rotate(-8)"><rect x="${-w / 2}" y="${-size * 0.8}" width="${w}" height="${size * 1.35}" rx="16" fill="#f4f0e4" opacity="0.92" stroke="${c}" stroke-width="14"/><text x="0" y="${size * 0.36}" text-anchor="middle" font-family="Anton" font-size="${size}" fill="${c}">${t}</text></g></g>`; };
// three icons: a photo, a video camera, a body bag (outline drawings)
const vgIcons = () => `<g transform="translate(560 470)"><rect x="-130" y="-100" width="260" height="200" rx="14" fill="#efe9d6" ${bzO()}/><circle cx="0" cy="0" r="62" fill="#5a6a8a" ${bzO()}/><rect x="60" y="-130" width="60" height="34" rx="8" fill="#efe9d6" ${bzO()}/></g>
  <g transform="translate(960 470)"><rect x="-150" y="-90" width="220" height="180" rx="18" fill="#3a3a44" ${bzO()}/><path d="M70 -50 L 150 -100 V 100 L 70 50 Z" fill="#3a3a44" ${bzO()}/><circle cx="-40" cy="0" r="50" fill="#5a6a8a" ${bzO()}/></g>
  <g transform="translate(1360 470)"><rect x="-90" y="-150" width="180" height="300" rx="80" fill="#2a3a2e" ${bzO()}/><path d="M0 -130 V 130" stroke="#c8c0a0" stroke-width="10" stroke-dasharray="20 12"/></g>`;
// a big clock showing 3:30
const vgClock = (x: number, y: number) => `<g transform="translate(${x} ${y})"><circle r="150" fill="#efe9d6" ${bzO('stroke-width="12"')}/>${[...Array(12)].map((_, i) => `<rect x="-6" y="-138" width="12" height="26" fill="${BZ.ink}" transform="rotate(${i * 30})"/>`).join('')}
  <path d="M0 0 L 0 105" stroke="${BZ.ink}" stroke-width="12" stroke-linecap="round"/><path d="M0 0 L 50 40" stroke="${BZ.ink}" stroke-width="18" stroke-linecap="round" transform="rotate(5)"/><circle r="14" fill="#e0302a"/></g>`;
// microphones held toward someone (#mics)
const vgMics = (x: number, y: number) => `<g id="mics">${[[-230, 40, 20], [-160, -60, 10], [230, 30, -20], [170, -70, -10]].map(([dx, dy, r]) => `<g transform="translate(${x + dx} ${y + dy}) rotate(${r})"><rect x="-14" y="0" width="28" height="160" rx="8" fill="#3a3a44" ${bzO('stroke-width="5"')}/><ellipse cx="0" cy="-10" rx="34" ry="40" fill="#5a5a66" ${bzO('stroke-width="5"')}/><rect x="-32" y="40" width="64" height="40" fill="${['#c8342c', '#3a7aff', '#f6c744', '#3aa05a'][(dx + 300) % 4]}" ${bzO('stroke-width="4"')}/></g>`).join('')}</g>`;
// a light beam from the sky (the teaser for the next case)
const vgBeam = (id: string, x: number) => `<g id="${id}"><path d="M${x - 40} 0 L ${x + 40} 0 L ${x + 260} 900 L ${x - 260} 900 Z" fill="#fff4b0" opacity="0.18"/><circle cx="${x}" cy="40" r="60" fill="#fff4b0" opacity="0.9" ${bzO('stroke-width="5"')}/></g>`;
const vgRiver = () => `${bzSky('#04060c', '#141c2c')}${bzStars(80, 13, 600)}<rect y="640" width="1920" height="440" fill="#0a1a2a" ${bzO()}/>${[...Array(8)].map((_, i) => `<path d="M${i * 260} ${720 + (i % 3) * 60} h 140" stroke="#3a5a7a" stroke-width="6" opacity="0.6"/>`).join('')}
  <g transform="translate(700 760)"><path d="M-180 0 Q 0 80 180 0 L 150 -20 L -150 -20 Z" fill="#6a4a30" ${bzO()}/></g>`;
// the date card that sits low-left
const vgDate = (id: string, t: string, sub = '') => vgCard(id, t, sub);

defineVisuals({
  // ================================================================ cold open
  'o-date': { bg: '#2a2a3a', html: () => bzShot(vgTown('dusk'), `${vgDate('cd', 'VARGINHA • MG', '20 DE JANEIRO DE 1996')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzParallax(tl, $, s.t0, s.t1, -120); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); vgPopAt(tl, $('#cd'), s.t0, K('c')); } },
  'o-walk': { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${vgChar('kat', 'kat', 1500, 920, 0.95, true)}${vgChar('lil', 'lil', 1680, 920, 0.95, true)}${vgChar('val', 'val', 1840, 930, 0.95, true)}`, `${vgTag('recon')}${bzVignette(0.45)}`),
    anim(tl, s, K, $) { const d = s.t1 - s.t0; bzWalk(tl, $('#kat'), s.t0, s.t1, 0, -60 * d); bzWalk(tl, $('#lil'), s.t0, s.t1, 0, -60 * d); bzWalk(tl, $('#val'), s.t0, s.t1, 0, -62 * d);
      for (const c of ['#kat', '#lil', '#val']) bzFace(tl, $(c), s.t0, 'dot', 'smile'); bzParallax(tl, $, s.t0, s.t1, 80); } },
  'o-stop': { bg: '#8a94a8', html: () => bzShot(vgZoom(1.5, 1100, 640, `${vgLot()}${vgChar('kat', 'kat', 980, 920, 0.95, true)}${vgChar('lil', 'lil', 1160, 920, 0.95, true)}${vgChar('val', 'val', 1320, 930, 0.95, true)}`), bzVignette(0.55)),
    anim(tl, s, K, $) { for (const c of ['#kat', '#lil', '#val']) { bzFace(tl, $(c), s.t0, 'dot', 'smile'); bzFace(tl, $(c), K('s'), 'wide', 'o'); bzShake(tl, $(c), K('s'), s.t1, 2); }
      bzPose(tl, $('#lil'), K('s'), { aL: 40 }, 0.2); bzPush(tl, $('#cam'), K('s'), s.t1, 1, 1.08, 1000, 400); } },
  'o-wall': { bg: '#2a2a3a', html: () => bzShot(`${vgLot(1)}${vgEt('et', 1240, 900, 0.62)}`, `${bzVignette(0.75)}`),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); tl.set($('#et .eyes'), { opacity: 0 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.25, 1240, 640); } },
  'o-skin': { bg: '#2a2a3a', html: () => bzShot(vgZoom(2.6, 1240, 700, `${vgLot(1)}${vgEt('et', 1240, 900, 0.62)}`), bzVignette(0.75)),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); tl.fromTo($('#et .shine'), { opacity: 0.2 }, { opacity: 1, duration: 0.8, yoyo: true, repeat: 3 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 960, 540); } },
  'o-head': { bg: '#2a2a3a', html: () => bzShot(vgZoom(3.1, 1240, 600, `${vgLot(1)}${vgEt('et', 1240, 900, 0.62)}`), bzVignette(0.8)),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); tl.set($('#et .eyes'), { opacity: 0 }, s.t0); tl.fromTo($('#cam'), { y: 160 }, { y: 0, duration: s.t1 - s.t0, ease: 'sine.inOut' }, s.t0); } },
  'o-eyes': { bg: '#0a0a10', html: () => bzShot(vgZoom(5.2, 1240, 640, `${vgLot(1)}${vgEt('et', 1240, 900, 0.62)}`), `${bzFlash('fl', '#ff2a1a')}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.set($('#et .eyes'), { opacity: 0 }, s.t0); tl.to($('#et .eyes'), { opacity: 1, duration: 0.12 }, K('e')); bzHit(tl, $('#fl'), K('e'), 0.35); bzPush(tl, $('#cam'), K('e'), s.t1, 1, 1.1, 960, 540); } },
  'o-scream': { bg: '#8a94a8', html: () => bzShot(vgZoom(2.3, 1160, 470, `${vgLot()}${vgChar('lil', 'lil', 1160, 920, 0.95, true)}`), `${vgTag('recon')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#lil'), s.t0, 'wide', 'o'); bzTalk(tl, $('#lil'), 'ap_lil', s.t0, s.t1, 'o', 'open'); bzShake(tl, $('#lil'), s.t0, s.t1, 3); bzQuake(tl, $('#cam'), K('k'), K('k') + 0.4, 8); } },
  'o-truck': { bg: '#8a94a8', html: () => bzShot(`${vgLot()}<g id="tr">${vgFireTruck(200, 980, 0.9)}</g>${vgCar(1450, 990, 0.9)}`, `${vgTag('relato')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { tl.fromTo($('#tr'), { x: -700 }, { x: 0, duration: 1.4, ease: 'power2.out' }, s.t0); tl.fromTo($('#car'), { x: 900 }, { x: 0, duration: 1.4, ease: 'power2.out' }, s.t0 + 0.5);
      tl.fromTo($('#car .siren'), { opacity: 1 }, { opacity: 0.3, duration: 0.2, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.2) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },
  'o-cop': { bg: '#0a0a10', html: () => bzShot(vgMemorial(), bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#flame'), { scaleY: 0.9, transformOrigin: '50% 100%' }, { scaleY: 1.12, duration: 0.25, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.25) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 860, 520); } },
  'o-army': { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 540, 0.85)}`, `${vgStamp('st', 'SECRETO', 960, 620, 120)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#fd'), { y: -700 }, { y: 0, duration: 0.45, ease: 'power3.in' }, K('f') - 0.45); bzQuake(tl, $('#cam'), K('f'), K('f') + 0.35, 10); vgPopAt(tl, $('#st'), s.t0, K('f') + 0.25); } },
  'o-30': { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}${bzParticles('du', 'dust', 30, [300, 100, 1600, 900], 3)}`, `${bzNum('nm', 'QUASE 30 ANOS', 960, 230, '#efe9d6', 120)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#du'), 'dust', s.t0, s.t1); bzShow(tl, $('#nm'), K('n')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 960, 560); } },
  'o-2026': { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`, `${vgBig('yr', 'JANEIRO • 2026', '#efe9d6', BZ.ink, 170, -3, 96)}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#yr'), s.t0, K('y')); bzPush(tl, $('#cam'), s.t0, s.t1, 1.08, 1.14, 960, 560); } },
  'o-promise': { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}${bzGlow('lk', 960, 560, 360, '#fff4c8', 0.0)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { tl.to($('#lk'), { opacity: 1, duration: 1.5 }, s.t0 + 0.6); tl.fromTo($('#fd'), { rotation: 0, transformOrigin: '50% 50%' }, { rotation: -2, duration: s.t1 - s.t0 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1.35, 960, 560); } },
  title: { bg: '#0a0812', html: () => bzShot(vgTitle(), `${bzFlash('fl', '#fff')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { vgFadeAt(tl, $('#tf'), s.t0, s.t0 + 0.05, 0.4); tl.fromTo($('#tf'), { scale: 1.3, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, K('t') - 0.3); bzHit(tl, $('#fl'), K('t'), 0.4);
      vgPopAt(tl, $('#tcase'), s.t0, K('c')); vgFadeAt(tl, $('#tname'), s.t0, K('c') + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },

  // ================================================================ 1. a quiet town
  town: { bg: '#7ab8e8', html: () => bzShot(vgTown('day'), vgDate('cd', 'VARGINHA • MG', '1996 • TERRA DO CAFÉ')),
    anim(tl, s, K, $) { bzParallax(tl, $, s.t0, s.t1, -160); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.6); } },
  cafe: { bg: '#7ab8e8', html: () => bzShot(vgZoom(1.8, 980, 600, vgTown('day')), bzVignette(0.35)),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 960, 500); } },
  ufos: { bg: '#4a3a30', html: () => bzShot(`<rect width="1920" height="1080" fill="#4a3a30"/>${bzGlow('lg', 960, 480, 700, '#ffd27a', 0.25)}<rect y="760" width="1920" height="320" fill="#6a4a30" ${bzO()}/>${vgChar('ufo1', 'u1', 700, 980, 1.15)}${vgChar('ufo2', 'u2', 1220, 980, 1.15, true)}
      <g transform="translate(960 800)"><rect x="-80" y="-40" width="160" height="60" rx="10" fill="#3a3a44" ${bzO()}/><circle cx="-30" cy="-10" r="16" fill="#8a8f9e"/><circle cx="30" cy="-10" r="16" fill="#8a8f9e"/></g>`, `${vgBig('lb', 'OS UFÓLOGOS', BZ.yellow, BZ.ink, 140, -3, 90)}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzIdle(tl, $('#u1'), s.t0, s.t1); bzIdle(tl, $('#u2'), s.t0, s.t1, 2); bzFace(tl, $('#u1'), s.t0, 'half', 'flat'); bzFace(tl, $('#u2'), s.t0, 'dot', 'o'); bzPose(tl, $('#u2'), s.t0 + 0.3, { aL: 70 }); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  farm: { bg: '#060a18', html: () => bzShot(`${vgFarm()}${vgChar('sitio', 'si', 560, 930, 0.85)}${vgChar('sitia', 'sa', 720, 930, 0.85)}`, `${vgTag('relato')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#ovni'), { opacity: 0 }, s.t0); bzFace(tl, $('#si'), s.t0, 'half', 'flat'); bzFace(tl, $('#sa'), s.t0, 'half', 'flat'); bzIdle(tl, $('#si'), s.t0, s.t1); bzIdle(tl, $('#sa'), s.t0, s.t1, 1);
      bzFace(tl, $('#si'), s.t1 - 1.2, 'wide', 'o'); bzFace(tl, $('#sa'), s.t1 - 1.0, 'wide', 'o'); bzParallax(tl, $, s.t0, s.t1, -100); } },
  ovni: { bg: '#060a18', html: () => bzShot(`${vgFarm()}${vgChar('sitio', 'si', 560, 930, 0.85)}${vgChar('sitia', 'sa', 720, 930, 0.85)}`, `${vgTag('relato')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#ovni'), { x: 1100 }, { x: -300, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.fromTo($('#ovni .lights'), { opacity: 1 }, { opacity: 0.4, duration: 0.25, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.25) }, s.t0);
      tl.fromTo($('#smoke .pf'), { scale: 0.8, transformOrigin: '50% 50%' }, { scale: 1.3, duration: 1.2, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 1.2), stagger: 0.2 }, s.t0);
      for (const c of ['#si', '#sa']) { bzFace(tl, $(c), s.t0, 'wide', 'o'); bzShake(tl, $(c), s.t0, s.t1, 2); } bzPose(tl, $('#si'), s.t0 + 0.4, { aR: -150 }); } },
  cows: { bg: '#060a18', html: () => bzShot(vgZoom(1.6, 1150, 560, vgFarm()), `${bzVignette(0.65)}`),
    anim(tl, s, K, $) { tl.fromTo($('#ovni'), { x: 300 }, { x: -200, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzQuake(tl, $('#cam'), s.t0, s.t1, 2); } },
  call: { bg: '#8a94a8', html: () => bzShot(`<rect width="1920" height="1080" fill="#8a7a6a"/><rect y="780" width="1920" height="300" fill="#5a4a3a" ${bzO()}/>${vgFireTruck(1100, 900, 0.75)}${vgChar('bomb', 'bm', 600, 1000, 1.15)}
      <g transform="translate(600 410)"><rect x="70" y="-30" width="50" height="110" rx="20" fill="#2b2433"/></g>`, `${vgTag('relato')}${vgBig('ph', 'TRIIIM!', '#fff', BZ.ink, 160, -5, 100)}${bzVignette(0.45)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#bm'), s.t0, 'dot', 'flat'); bzPose(tl, $('#bm'), s.t0, { aR: -150 }, 0.01); vgPopAt(tl, $('#ph'), s.t0, s.t0 + 0.2); bzQuake(tl, $('#ph'), s.t0 + 0.2, s.t0 + 1.2, 5); bzFace(tl, $('#bm'), K('r'), 'wide', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 700, 500); } },
  andere: { bg: '#8a94a8', html: () => bzShot(vgLot(), vgDate('cd', 'JARDIM ANDERE', 'BAIRRO NOVO • MATO E TERRENO VAZIO')),
    anim(tl, s, K, $) { bzParallax(tl, $, s.t0, s.t1, -140); vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.4); } },
  nets: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${vgChar('bomb', 'b1', 760, 940, 1.0)}${vgChar('bomb2', 'b2', 1160, 940, 1.0, true)}<path id="net" d="M800 520 Q 960 640 1120 520 L 1100 760 Q 960 820 820 760 Z" fill="none" stroke="#efe9d6" stroke-width="6" stroke-dasharray="14 10"/>`, `${vgTag('relato')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzPose(tl, $('#b1'), s.t0, { aR: -120 }, 0.01); bzPose(tl, $('#b2'), s.t0, { aR: -120 }, 0.01); bzFace(tl, $('#b1'), s.t0, 'angry', 'flat'); bzFace(tl, $('#b2'), s.t0, 'angry', 'flat');
      bzWalk(tl, $('#b1'), s.t0, s.t1, -200, 0); bzWalk(tl, $('#b2'), s.t0, s.t1, 200, 0); bzParallax(tl, $, s.t0, s.t1, -60); } },
  crate: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${vgFireTruck(120, 960, 0.85)}${vgCrate(1200, 950, 1.1)}${vgChar('bomb', 'b1', 1000, 960, 0.95)}${vgChar('bomb2', 'b2', 1420, 960, 0.95, true)}`, `${vgTag('relato')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzPose(tl, $('#b1'), s.t0, { aR: -60 }, 0.01); bzPose(tl, $('#b2'), s.t0, { aR: -60 }, 0.01); bzIdle(tl, $('#b1'), s.t0, s.t1); bzIdle(tl, $('#b2'), s.t0, s.t1, 1);
      bzQuake(tl, $('#caixa'), K('x'), K('x') + 0.5, 7); bzFace(tl, $('#b1'), K('x'), 'wide', 'o'); bzFace(tl, $('#b2'), K('x'), 'wide', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 1200, 700); } },
  nodoc: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgCrate(960, 820, 1.6)}`, `${vgStamp('st', 'SEM CONFIRMAÇÃO', 960, 300, 100)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#st'), s.t0, K('n')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },

  // ================================================================ 2. the three girls
  clock: { bg: '#8a94a8', html: () => bzShot(`${vgTown('day')}`, `${vgClock(960, 380)}${vgDate('cd', '15h30', 'SÁBADO À TARDE')}${bzVignette(0.4)}`),
    anim(tl, s, K, $) { bzParallax(tl, $, s.t0, s.t1, -80); vgPopAt(tl, $('#cd'), s.t0, K('c')); } },
  girls: { bg: '#7ab8e8', html: () => bzShot(`${vgTown('day')}${vgChar('kat', 'kat', 620, 990, 1.05)}${vgChar('lil', 'lil', 930, 990, 1.05)}${vgChar('val', 'val', 1200, 1000, 1.05)}`,
      `${bzSign('n1', 'LILIANE • 16', 930, 200, -3, '#e8547a', '#fff', 56)}${bzSign('n2', 'VALQUÍRIA • 14', 1260, 300, 3, BZ.yellow, BZ.ink, 56)}${bzSign('n3', 'KÁTIA • 22', 560, 300, -4, '#2fa0a0', '#fff', 56)}`),
    anim(tl, s, K, $) { for (const [c, i] of [['#kat', 0], ['#lil', 1], ['#val', 2]] as [string, number][]) { bzIdle(tl, $(c), s.t0, s.t1, i); bzFace(tl, $(c), s.t0, 'dot', 'grin'); }
      bzWalk(tl, $('#kat'), s.t0, s.t1, 0, 60); bzWalk(tl, $('#lil'), s.t0, s.t1, 0, 60); bzWalk(tl, $('#val'), s.t0, s.t1, 0, 60);
      vgPopAt(tl, $('#n1'), s.t0, s.t0 + 0.6); vgPopAt(tl, $('#n2'), s.t0, s.t0 + 1.1); vgPopAt(tl, $('#n3'), s.t0, s.t0 + 2.4); } },
  shortcut: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${vgChar('kat', 'kat', 200, 930, 0.95)}${vgChar('lil', 'lil', 380, 930, 0.95)}${vgChar('val', 'val', 540, 940, 0.95)}`),
    anim(tl, s, K, $) { const d = s.t1 - s.t0; for (const c of ['#kat', '#lil', '#val']) { bzWalk(tl, $(c), s.t0, s.t1, 0, 70 * d); bzFace(tl, $(c), s.t0, 'dot', 'smile'); } bzParallax(tl, $, s.t0, s.t1, -50 * d); } },
  lotwide: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${bzParticles('lv', 'leaves', 14, [0, 300, 1920, 900], 4)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#lv'), 'leaves', s.t0, s.t1); bzParallax(tl, $, s.t0, s.t1, 120); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05, 1200, 600); } },
  lil: { bg: '#8a94a8', html: () => bzShot(vgZoom(2.4, 960, 470, `${vgLot()}${vgChar('lil', 'lil', 960, 920, 0.95)}`), bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#lil'), s.t0, 'dot', 'smile'); bzFace(tl, $('#lil'), K('s') - 0.3, 'wide', 'flat'); bzFace(tl, $('#lil'), K('s'), 'wide', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 960, 420); } },
  reveal: { bg: '#2a2a3a', html: () => bzShot(`${vgLot(1)}${vgEt('et', 1200, 900, 0.85)}`, `${bzFlash('fl', '#000')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); tl.set($('#fl'), { opacity: 1 }, s.t0); tl.to($('#fl'), { opacity: 0, duration: 1.2 }, s.t0 + 0.1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.2, 1200, 600); } },
  size: { bg: '#2a2a3a', html: () => bzShot(`${vgLot(1)}${vgEt('et', 1100, 900, 0.85)}<g id="ms"><path d="M1380 900 V 400" stroke="#efe9d6" stroke-width="8"/><path d="M1350 400 h60 M1350 900 h60" stroke="#efe9d6" stroke-width="8"/></g>`, `${bzNum('nm', '≈ 1,5 m', 1560, 680, '#efe9d6', 110)}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); tl.fromTo($('#ms'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, K('m')); bzShow(tl, $('#nm'), K('m') + 0.2); } },
  shine: { bg: '#2a2a3a', html: () => bzShot(vgZoom(3.2, 1200, 700, `${vgLot(1)}${vgEt('et', 1200, 900, 0.85)}`), `<rect id="sw" x="-400" y="0" width="200" height="1080" fill="#fff" opacity="0.12" transform="skewX(-20)"/>${bzVignette(0.75)}`),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); tl.fromTo($('#sw'), { x: 0 }, { x: 2600, duration: 1.6, ease: 'sine.inOut', repeat: 1 }, s.t0 + 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  horns: { bg: '#2a2a3a', html: () => bzShot(vgZoom(3.4, 1200, 520, `${vgLot(1)}${vgEt('et', 1200, 900, 0.85)}`), `${vgBig('lb', '3 SALIÊNCIAS', '#efe9d6', BZ.ink, 130, -3, 80)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); tl.set($('#et .eyes'), { opacity: 0 }, s.t0); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.4); tl.fromTo($('#cam'), { y: -60 }, { y: 40, duration: s.t1 - s.t0, ease: 'sine.inOut' }, s.t0); } },
  faces: { bg: '#8a94a8', html: () => bzShot(vgZoom(1.9, 1100, 520, `${vgLot()}${vgChar('kat', 'kat', 920, 920, 0.95, true)}${vgChar('lil', 'lil', 1100, 920, 0.95, true)}${vgChar('val', 'val', 1270, 930, 0.95, true)}`), bzVignette(0.6)),
    anim(tl, s, K, $) { for (const c of ['#kat', '#lil', '#val']) { bzFace(tl, $(c), s.t0, 'wide', 'o'); bzShake(tl, $(c), s.t0, s.t1, 2); } bzPose(tl, $('#val'), s.t0 + 0.4, { aL: -150 }); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 1000, 420); } },
  redeyes: { bg: '#0a0a10', html: () => bzShot(vgZoom(5.0, 1200, 548, `${vgLot(1)}${vgEt('et', 1200, 900, 0.85)}`), `${bzFlash('fl', '#ff2a1a')}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.set($('#et .eyes'), { opacity: 0.25 }, s.t0); tl.to($('#et .eyes'), { opacity: 1, duration: 0.15 }, K('e')); bzHit(tl, $('#fl'), K('e'), 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12); } },
  weak: { bg: '#2a2a3a', html: () => bzShot(vgZoom(1.7, 1200, 640, `${vgLot(1)}${vgEt('et', 1200, 900, 0.85)}`), bzVignette(0.7)),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); bzShake(tl, $('#et'), s.t0, s.t1, 3); tl.to($('#et .hd'), { rotation: 8, duration: 2.5, transformOrigin: '50% 100%' }, s.t0 + 1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 1000, 540); } },
  corre: { bg: '#8a94a8', html: () => bzShot(vgZoom(2.2, 960, 480, `${vgLot()}${vgChar('kat', 'kat', 960, 920, 0.95)}`), `${vgTag('recon')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kat'), s.t0, 'wide', 'open'); bzTalk(tl, $('#kat'), 'ap_kat', s.t0, s.t1, 'o', 'open'); bzPose(tl, $('#kat'), s.t0, { aR: -130, aL: 130 }, 0.15); bzShake(tl, $('#kat'), s.t0, s.t1, 3); bzQuake(tl, $('#cam'), K('k'), K('k') + 0.4, 7); } },
  run: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${vgChar('kat', 'kat', 1400, 930, 0.95, true)}${vgChar('lil', 'lil', 1560, 930, 0.95, true)}${vgChar('val', 'val', 1720, 940, 0.95, true)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { const d = s.t1 - s.t0; for (const [c, k] of [['#kat', 0], ['#lil', 0.1], ['#val', 0.2]] as [string, number][]) { bzRunAway(tl, $(c), s.t0 + k, s.t1, -1900); bzFace(tl, $(c), s.t0, 'wide', 'o'); } bzParallax(tl, $, s.t0, s.t1, 200); bzQuake(tl, $('#cam'), s.t0, s.t0 + d, 2); } },
  home: { bg: '#8a7a6a', html: () => bzShot(`<rect width="1920" height="1080" fill="#a8886a"/>${[...Array(12)].map((_, i) => `<path d="M${i * 170} 0 V 1080" stroke="#8a6a4a" stroke-width="6"/>`).join('')}<rect y="800" width="1920" height="280" fill="#7a5a3a" ${bzO()}/>
      ${vgChar('mae', 'mae', 960, 1000, 1.15)}${vgChar('lil', 'lil', 720, 1000, 1.0)}${vgChar('val', 'val', 1180, 1010, 1.0, true)}${vgChar('kat', 'kat', 1420, 1000, 1.0, true)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzFace(tl, $('#mae'), s.t0, 'wide', 'frown'); for (const c of ['#lil', '#val', '#kat']) { bzFace(tl, $(c), s.t0, 'closed', 'frown'); bzShake(tl, $(c), s.t0, s.t1, 2); }
      bzPose(tl, $('#mae'), s.t0, { aL: 60, aR: -60 }, 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 960, 500); } },
  mom: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${vgChar('mae', 'mae', 300, 930, 0.95)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { bzWalk(tl, $('#mae'), s.t0, s.t1, 0, 600); bzFace(tl, $('#mae'), s.t0, 'angry', 'flat'); bzParallax(tl, $, s.t0, s.t1, -160); } },
  empty: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}<ellipse cx="1200" cy="905" rx="200" ry="26" fill="#5a5a2a" opacity="0.7"/>${vgChar('mae', 'mae', 760, 930, 0.95)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#mae'), s.t0, 'wide', 'flat'); bzIdle(tl, $('#mae'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 1200, 700); } },
  today: { bg: '#7ab8e8', html: () => bzShot(`${vgTown('day')}${vgChar('kat', 'kat', 700, 1000, 1.05)}${vgChar('lil', 'lil', 960, 1000, 1.05)}${vgChar('val', 'val', 1220, 1000, 1.05, true)}${vgMics(960, 640)}`, `${vgBig('yr', '30 ANOS DEPOIS', '#efe9d6', BZ.ink, 150, -3, 90)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#yr'), s.t0, K('c')); for (const [c, i] of [['#kat', 0], ['#lil', 1], ['#val', 2]] as [string, number][]) { bzIdle(tl, $(c), s.t0, s.t1, i); bzFace(tl, $(c), s.t0, 'dot', 'flat'); }
      tl.fromTo($('#mics'), { y: 300 }, { y: 0, duration: 0.6, ease: 'power2.out' }, s.t0 + 0.8); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },

  // ================================================================ 3. the storm and the night
  storm: { bg: '#2a2a3a', html: () => bzShot(`${vgTown('dusk')}${vgRain('rn', 120, true, 3)}`, `${vgDate('cd', 'FIM DA TARDE', 'CHUVA DE GRANIZO')}${bzFlash('fl', '#fff')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1, true); bzHit(tl, $('#fl'), K('h'), 0.6); vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },
  blackout: { bg: '#0a0e1c', html: () => bzShot(`${vgTown('night')}${vgRain('rn', 90, false, 5)}`, `<rect id="dk" width="1920" height="1080" fill="#000" opacity="0"/>${bzVignette(0.6)}`),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1); tl.to($('#dk'), { opacity: 0.55, duration: 0.05 }, K('o')); tl.to($('#dk'), { opacity: 0.1, duration: 0.05 }, K('o') + 0.12); tl.to($('#dk'), { opacity: 0.6, duration: 0.05 }, K('o') + 0.3); } },
  darkst: { bg: '#05070f', html: () => bzShot(`${vgStreet(false)}${vgRain('rn', 90, false, 7)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 960, 700); } },
  patrol: { bg: '#05070f', html: () => bzShot(`${vgStreet(false)}${vgCar(900, 980, 1)}${vgRain('rn', 90, false, 9)}`, `${vgTag('relato')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1); tl.fromTo($('#car'), { x: -1400 }, { x: 200, duration: s.t1 - s.t0, ease: 'none' }, s.t0); tl.fromTo($('#car .siren'), { opacity: 1 }, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.25) }, s.t0); } },
  chereze: { bg: '#05070f', html: () => bzShot(vgZoom(1.9, 960, 520, `${vgStreet(false)}${vgChar('pm', 'pm', 960, 920, 0.95)}`), `${vgDate('cd', 'SOLDADO MARCO ELI CHEREZE', 'POLÍCIA MILITAR • 23 ANOS')}${vgRain('rn', 60, false, 11)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1); bzFace(tl, $('#pm'), s.t0, 'dot', 'flat'); bzIdle(tl, $('#pm'), s.t0, s.t1); vgPopAt(tl, $('#cd'), s.t0, K('n')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  cross: { bg: '#05070f', html: () => bzShot(`${vgStreet(false)}${vgCar(500, 990, 1)}<path d="M790 870 L 1900 700 L 1900 1080 L 790 900 Z" fill="#fff4c8" opacity="0.16"/>${vgEt('et', 1500, 960, 0.6, 'stand')}${vgRain('rn', 80, false, 13)}`, `${vgTag('relato')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1); tl.fromTo($('#et'), { x: 600 }, { x: -500, duration: 1.4, ease: 'none' }, K('x') - 0.3); tl.set($('#et'), { opacity: 0 }, s.t0); tl.set($('#et'), { opacity: 1 }, K('x') - 0.3); bzQuake(tl, $('#cam'), K('x'), K('x') + 0.3, 6); } },
  grab: { bg: '#05070f', html: () => bzShot(`${vgStreet(false)}${vgCar(420, 990, 0.9)}${vgEt('et', 1180, 960, 0.6, 'stand')}${vgChar('pm', 'pm', 960, 960, 1.0)}${vgRain('rn', 80, false, 15)}`, `${vgTag('relato')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1); vgEtLive(tl, $('#et'), s.t0, s.t1); bzFace(tl, $('#pm'), s.t0, 'angry', 'flat'); bzWalk(tl, $('#pm'), s.t0, K('g'), -400, 0, true); bzPose(tl, $('#pm'), K('g'), { aR: -80, aL: 60 }, 0.15); bzQuake(tl, $('#cam'), K('g'), K('g') + 0.4, 6); bzShake(tl, $('#et'), K('g'), s.t1, 4); } },
  backseat: { bg: '#05070f', html: () => bzShot(vgZoom(1.9, 520, 820, `${vgStreet(false)}${vgCar(500, 990, 1)}<g id="peek"><circle cx="460" cy="795" r="40" fill="#4a3220"/>${bzGlow('pg', 460, 795, 110, '#ff2a1a', 0.4)}<ellipse cx="444" cy="795" rx="12" ry="9" fill="#d81c1c"/><ellipse cx="476" cy="795" rx="12" ry="9" fill="#d81c1c"/></g>`), `${vgRain('rn', 70, false, 17)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1); tl.fromTo($('#peek'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, s.t0 + 0.8); tl.fromTo($('#car .siren'), { opacity: 1 }, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.25) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 960, 520); } },
  segura: { bg: '#05070f', html: () => bzShot(vgZoom(2.2, 960, 470, `${vgStreet(false)}${vgChar('pm2', 'pm2', 960, 920, 0.95)}`), `${vgTag('recon')}${vgRain('rn', 60, false, 19)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { vgRainGo(tl, $('#rn'), s.t0, s.t1); bzFace(tl, $('#pm2'), s.t0, 'wide', 'open'); bzTalk(tl, $('#pm2'), 'ap_pm', s.t0, s.t1, 'o', 'open'); bzPose(tl, $('#pm2'), s.t0, { aR: -110 }, 0.15); bzShake(tl, $('#pm2'), s.t0, s.t1, 3); } },
  hospital: { bg: '#c8d4d0', html: () => bzShot(`${vgCorridor(false)}`, `${vgDate('cd', 'HOSPITAL REGIONAL', 'DEPOIS: HOSPITAL HUMANITAS')}${vgTag('relato')}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.3, 960, 500); } },
  guards: { bg: '#c8d4d0', html: () => bzShot(vgZoom(1.6, 960, 520, vgCorridor(true)), `${vgTag('relato')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.fromTo($('#guards'), { opacity: 0.2 }, { opacity: 1, duration: 1.2 }, s.t0 + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 960, 480); } },
  trucks: { bg: '#04060c', html: () => bzShot(vgRoad(), `${vgTag('relato')}${vgDate('cd', 'MADRUGADA', 'CAMINHÕES DO EXÉRCITO')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#trucks'), { x: -1200 }, { x: 300, duration: s.t1 - s.t0, ease: 'none' }, s.t0); vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.6); bzParallax(tl, $, s.t0, s.t1, -80); } },
  sign: { bg: '#04060c', html: () => bzShot(vgZoom(1.9, 1640, 500, vgRoad()), bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#trucks'), { x: -600 }, { x: 900, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); } },
  noproof: { bg: '#1b1424', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b1424"/>${vgIcons()}${vgX('x1', 560, 470)}${vgX('x2', 960, 470)}${vgX('x3', 1360, 470)}`, `${vgBig('lb', 'NADA APARECEU', '#efe9d6', BZ.ink, 160, -2, 90)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.5); vgPopAt(tl, $('#x1'), s.t0, K('a')); vgPopAt(tl, $('#x2'), s.t0, K('b')); vgPopAt(tl, $('#x3'), s.t0, K('c')); } },

  // ================================================================ 4. the soldier
  notrumor: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85, 'ÓBITO • 1996', 'DOCUMENTO')}`, `${vgTag('doc')}${bzFlash('fl', '#fff')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzHit(tl, $('#fl'), K('d'), 0.35); bzQuake(tl, $('#cam'), K('d'), K('d') + 0.3, 6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); } },
  sick: { bg: '#9ab0ac', html: () => bzShot(vgRoom(), `${vgDate('cd', 'FEVEREIRO DE 1996', '')}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 860, 600); } },
  surgery: { bg: '#9ab0ac', html: () => bzShot(vgZoom(2.4, 360, 520, vgRoom()), bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('.beat'), { opacity: 1 }, { opacity: 0.4, duration: 0.42, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.42) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  flat: { bg: '#9ab0ac', html: () => bzShot(`${vgZoom(2.4, 360, 520, vgRoom())}<path id="fline" d="M690 520 H 1230" stroke="#4aff8a" stroke-width="14" opacity="0"/>`, `${bzNum('dt', '15 • 02 • 1996', 960, 200, '#efe9d6', 100)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.fromTo($('.beat'), { opacity: 1 }, { opacity: 0.4, duration: 0.35, yoyo: true, repeat: Math.max(1, Math.floor((K('f') - s.t0) / 0.35)) }, s.t0); tl.set($('.beat'), { opacity: 0 }, K('f')); tl.set($('#fline'), { opacity: 1 }, K('f')); bzShow(tl, $('#dt'), s.t0 + 1.6); } },
  candle: { bg: '#0a0a10', html: () => bzShot(vgMemorial(), `${vgBig('ag', '23 ANOS', '#efe9d6', BZ.ink, 150, -2, 90)}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { tl.fromTo($('#flame'), { scaleY: 0.9, transformOrigin: '50% 100%' }, { scaleY: 1.12, duration: 0.25, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.25) }, s.t0); vgPopAt(tl, $('#ag'), s.t0, s.t0 + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 960, 560); } },
  papers: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85, 'PRONTUÁRIO', 'HOSPITAL')}`, `${vgBig('lb', 'FALTAVA COISA?', BZ.yellow, BZ.ink, 140, -3, 90)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#fd .cover'), { opacity: 0 }, s.t0 + 1.2); tl.set($('#fd .open'), { opacity: 1 }, s.t0 + 1.2); tl.to($('#fd .redact'), { opacity: 1, duration: 0.3, stagger: 0.5 }, s.t0 + 2.4); vgPopAt(tl, $('#lb'), s.t0, K('p')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 960, 560); } },
  believe: { bg: '#1b1424', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b1424"/><rect x="960" width="960" height="1080" fill="#2a2030"/>${vgChar('pm', 'pm', 520, 1000, 1.0)}${vgEt('et', 1400, 1000, 0.8, 'stand')}<path d="M960 60 V 1020" stroke="#efe9d6" stroke-width="6" stroke-dasharray="20 16"/>`, `${vgBig('lb', 'CONTATO SEM PROTEÇÃO?', '#efe9d6', BZ.ink, 140, -2, 80)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#pm'), s.t0, 'dot', 'flat'); bzIdle(tl, $('#pm'), s.t0, s.t1); vgEtLive(tl, $('#et'), s.t0, s.t1); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 1.0); } },
  skeptic: { bg: '#0a0a10', html: () => bzShot(vgZoom(1.4, 1100, 560, vgMemorial()), `${vgBig('lb', 'OU UMA TRAGÉDIA COMUM?', '#efe9d6', BZ.ink, 140, 2, 80)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#flame'), { scaleY: 0.9, transformOrigin: '50% 100%' }, { scaleY: 1.12, duration: 0.25, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.25) }, s.t0); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },

  // ================================================================ 5. the media and the town of the ET
  explode: { bg: '#4a3a30', html: () => bzShot(vgNews(), `${bzFlash('fl', '#fff')}${bzVignette(0.4)}`),
    anim(tl, s, K, $) { tl.fromTo($('#papers'), { y: -900 }, { y: 0, duration: 0.5, ease: 'power3.in' }, s.t0 + 0.1); bzHit(tl, $('#fl'), K('x'), 0.4); bzQuake(tl, $('#cam'), K('x'), K('x') + 0.3, 6); tl.set($('#tv'), { opacity: 0 }, s.t0); } },
  interview: { bg: '#8a94a8', html: () => bzShot(`${vgTown('day')}${vgChar('ufo1', 'u1', 600, 1000, 1.05)}${vgChar('bomb', 'bm', 960, 1000, 1.05, true)}${vgChar('ufo2', 'u2', 1320, 1000, 1.05, true)}
      <g transform="translate(720 640)"><rect x="-40" y="-26" width="80" height="52" rx="8" fill="#3a3a44" ${bzO('stroke-width="5"')}/><circle cx="-14" cy="0" r="9" fill="#8a8f9e"/><circle cx="14" cy="0" r="9" fill="#8a8f9e"/></g>`, `${vgBig('lb', 'MESES DE ENTREVISTAS', BZ.yellow, BZ.ink, 150, -3, 80)}`),
    anim(tl, s, K, $) { bzPose(tl, $('#u1'), s.t0, { aR: -70 }, 0.01); bzFace(tl, $('#u1'), s.t0, 'dot', 'flat'); bzFace(tl, $('#u2'), s.t0, 'half', 'flat'); bzIdle(tl, $('#u2'), s.t0, s.t1); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.6); bzParallax(tl, $, s.t0, s.t1, -80); } },
  tv: { bg: '#4a3a30', html: () => bzShot(vgZoom(1.5, 1380, 500, vgNews()), bzVignette(0.5)),
    anim(tl, s, K, $) { tl.fromTo($('#tvimg'), { opacity: 1 }, { opacity: 0.7, duration: 0.1, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.1) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 1100, 500); } },
  roswell: { bg: '#1b1424', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b1424"/>${bzRays('ry', 960, 540, 12, 1400, '#f6c744', 0.12)}`, `${bzSign('lb', 'A ROSWELL BRASILEIRA', 960, 500, -4, BZ.yellow, BZ.ink, 130)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#lb'), s.t0, K('r')); tl.fromTo($('#ry'), { rotation: 0, transformOrigin: '960px 540px' }, { rotation: 30, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  tourism: { bg: '#6ab0f0', html: () => bzShot(`${vgTourism()}${vgChar('ufo1', 'u1', 880, 960, 0.9)}`, vgDate('cd', 'VARGINHA HOJE', 'A CIDADE DO ET')),
    anim(tl, s, K, $) { bzFace(tl, $('#u1'), s.t0, 'dot', 'grin'); bzWalk(tl, $('#u1'), s.t0, s.t1, 0, 300); vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.4); bzParallax(tl, $, s.t0, s.t1, -160); } },
  souvenir: { bg: '#6ab0f0', html: () => bzShot(vgZoom(2.4, 1640, 700, vgTourism()), bzVignette(0.35)),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1); } },
  why: { bg: '#0a0e1c', html: () => bzShot(`${vgTourism()}<rect id="dk" width="1920" height="1080" fill="#0a0e1c" opacity="0"/>`, `${vgBig('q', 'POR QUE O EXÉRCITO INVESTIGOU?', '#e0302a', '#fff', 170, -3, 84)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.to($('#dk'), { opacity: 0.8, duration: 1.6 }, s.t0 + 0.3); vgPopAt(tl, $('#q'), s.t0, K('q')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); } },

  // ================================================================ 6. the secret inquiry
  ipm: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`, `${vgTag('doc')}${vgDate('cd', 'MARÇO DE 1997', 'INQUÉRITO POLICIAL MILITAR')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#fd'), { y: -700 }, { y: 0, duration: 0.45, ease: 'power3.in' }, K('s') - 0.45); bzQuake(tl, $('#cam'), K('s'), K('s') + 0.3, 8); vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.5); } },
  aim: { bg: '#04060c', html: () => bzShot(vgRoad(), `${vgTag('doc')}${vgBig('q', 'MILITARES PARTICIPARAM?', BZ.yellow, BZ.ink, 160, -3, 84)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#trucks'), { x: -900 }, { x: 400, duration: s.t1 - s.t0, ease: 'none' }, s.t0); vgPopAt(tl, $('#q'), s.t0, s.t0 + 0.6); } },
  volumes: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('f1', 720, 560, 0.7, 'VOLUME 1', 'IPM')}${vgFolder('f2', 1200, 560, 0.7, 'VOLUME 2', 'IPM')}`, `${bzNum('nm', '≈ 600 PÁGINAS', 960, 200, '#efe9d6', 110)}${vgTag('doc')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#f2'), { x: 900 }, { x: 0, duration: 0.5, ease: 'power2.out' }, s.t0 + 0.4); bzShow(tl, $('#nm'), K('v')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },
  court: { bg: '#5a9ae0', html: () => bzShot(vgCourt(), `${vgDate('cd', 'SUPERIOR TRIBUNAL MILITAR', 'ARQUIVADO POR QUASE 30 ANOS')}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 960, 500); } },
  release: { bg: '#5a9ae0', html: () => bzShot(vgCourt(), `${vgBig('yr', 'JANEIRO • 2026', BZ.yellow, BZ.ink, 160, -3, 100)}${bzParticles('cf', 'dust', 30, [0, 0, 1920, 1080], 9)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#yr'), s.t0, K('y')); bzParticlesGo(tl, $('#cf'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1.08, 1.0, 960, 500); } },
  open: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}${bzGlow('lk', 960, 560, 500, '#fff4c8', 0.3)}`, `${vgTag('doc')}${bzFlash('fl', '#fff4c8')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#fd .cover'), { opacity: 0 }, K('o')); tl.set($('#fd .open'), { opacity: 1 }, K('o')); bzHit(tl, $('#fl'), K('o'), 0.5); tl.set($('#lk'), { opacity: 0 }, s.t0); tl.to($('#lk'), { opacity: 1, duration: 0.4 }, K('o')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.25, 960, 520); } },
  read1: { bg: '#f4f0e4', html: () => bzShot(vgZoom(1.9, 1200, 560, `${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`), `${vgTag('doc')}${vgBig('lb', 'MOTORISTAS NEGARAM', '#e0302a', '#fff', 150, -2, 84)}`),
    anim(tl, s, K, $) { tl.set($('#fd .cover'), { opacity: 0 }, s.t0); tl.set($('#fd .open'), { opacity: 1 }, s.t0); tl.to($('#fd .hl'), { opacity: 0.6, duration: 0.4, stagger: 0.5 }, s.t0 + 0.4); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 1.0); tl.fromTo($('#cam'), { y: 60 }, { y: -60, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  read2: { bg: '#04060c', html: () => bzShot(`${vgRoad()}${vgX('x1', 960, 520, 220)}`, `${vgTag('doc')}${vgBig('lb', 'TRAJETOS NÃO BATEM', '#e0302a', '#fff', 150, -2, 84)}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { tl.fromTo($('#trucks'), { x: -600 }, { x: 0, duration: 1.5, ease: 'power2.out' }, s.t0); vgPopAt(tl, $('#x1'), s.t0, K('x')); vgPopAt(tl, $('#lb'), s.t0, K('x') + 0.2); } },
  read3: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`, `${vgTag('doc')}${vgStamp('st', 'SEM PARTICIPAÇÃO MILITAR', 960, 560, 90)}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { tl.set($('#fd .cover'), { opacity: 0 }, s.t0); tl.set($('#fd .open'), { opacity: 1 }, s.t0); vgPopAt(tl, $('#st'), s.t0, K('s')); bzQuake(tl, $('#cam'), K('s'), K('s') + 0.25, 6); } },
  explain: { bg: '#f4f0e4', html: () => bzShot(vgZoom(1.9, 720, 560, `${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`), `${vgTag('doc')}${vgBig('lb', 'A EXPLICAÇÃO DO INQUÉRITO', '#efe9d6', BZ.ink, 150, -2, 80)}`),
    anim(tl, s, K, $) { tl.set($('#fd .cover'), { opacity: 0 }, s.t0); tl.set($('#fd .open'), { opacity: 1 }, s.t0); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.6); tl.fromTo($('#cam'), { x: -60 }, { x: 60, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  man: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${vgCrouch('cr', 1200, 900, 0.85, '#2a2430')}`, `${vgTag('doc')}${vgDate('cd', 'A VERSÃO OFICIAL', 'UM MORADOR DO BAIRRO')}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 1200, 640); } },
  shape: { bg: '#2a2a3a', html: () => bzShot(`${vgLot(1)}${vgCrouch('cr', 1200, 900, 0.85, '#141018')}<g id="etg">${vgEt('et', 1200, 900, 0.85)}</g>`, `${vgTag('doc')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#etg'), { opacity: 0 }, s.t0); tl.to($('#etg'), { opacity: 0.85, duration: 1.0 }, K('m') - 0.6); tl.to($('#cr'), { opacity: 0.25, duration: 1.0 }, K('m') - 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 1200, 640); } },
  fireman: { bg: '#4a3a30', html: () => bzShot(`<rect width="1920" height="1080" fill="#5a4a3a"/>${bzGlow('lg', 960, 480, 700, '#ffd27a', 0.2)}<rect y="780" width="1920" height="300" fill="#6a4a30" ${bzO()}/>${vgChar('bomb2', 'bm', 960, 1020, 1.2)}
      <g transform="translate(1300 760) rotate(6)"><rect x="-120" y="-150" width="240" height="300" fill="#f4f0e4" ${bzO()}/>${[0, 1, 2, 3, 4].map((i) => `<rect x="-90" y="${-110 + i * 40}" width="${150 + (i % 2) * 30}" height="10" fill="#6a6058"/>`).join('')}</g>`, `${vgTag('doc')}${vgBig('lb', 'DEPOIMENTO NO INQUÉRITO', '#efe9d6', BZ.ink, 150, -2, 80)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#bm'), s.t0, 'half', 'flat'); bzIdle(tl, $('#bm'), s.t0, s.t1); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.4); } },
  verdict: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`, `${vgTag('doc')}${vgStamp('st', 'ENGANO E BOATOS', 960, 560, 130)}${bzFlash('fl', '#e0302a')}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { tl.set($('#fd .cover'), { opacity: 0 }, s.t0); tl.set($('#fd .open'), { opacity: 1 }, s.t0); vgPopAt(tl, $('#st'), s.t0, K('s')); bzHit(tl, $('#fl'), K('s'), 0.25); bzQuake(tl, $('#cam'), K('s'), K('s') + 0.35, 10); } },

  // ================================================================ 7. what does not close
  closed: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`, `${vgStamp('st', 'ENGANO E BOATOS', 960, 560, 130)}${bzNum('q', '?', 1500, 520, '#f6c744', 400)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#fd .cover'), { opacity: 0 }, s.t0); tl.set($('#fd .open'), { opacity: 1 }, s.t0); bzShow(tl, $('#q'), K('n')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  three: { bg: '#7ab8e8', html: () => bzShot(`${vgTown('day')}${vgChar('kat', 'kat', 700, 1000, 1.05)}${vgChar('lil', 'lil', 960, 1000, 1.05)}${vgChar('val', 'val', 1220, 1000, 1.05, true)}${vgMics(960, 640)}`, ''),
    anim(tl, s, K, $) { for (const [c, i] of [['#kat', 0], ['#lil', 1], ['#val', 2]] as [string, number][]) { bzIdle(tl, $(c), s.t0, s.t1, i); bzFace(tl, $(c), s.t0, 'angry', 'flat'); tl.fromTo($(`${c} .hd`), { rotation: -8, transformOrigin: '50% 90%' }, { rotation: 8, duration: 0.3, yoyo: true, repeat: 5 }, s.t0 + 1 + i * 0.2); }
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 960, 500); } },
  eyes2: { bg: '#0a0a10', html: () => bzShot(vgZoom(5.0, 1200, 548, `${vgLot(1)}${vgEt('et', 1200, 900, 0.85)}`), `${bzFlash('fl', '#ff2a1a')}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.set($('#et .eyes'), { opacity: 0.2 }, s.t0); tl.to($('#et .eyes'), { opacity: 1, duration: 0.1 }, K('e')); bzHit(tl, $('#fl'), K('e'), 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1); } },
  kat: { bg: '#7ab8e8', html: () => bzShot(vgZoom(2.2, 960, 560, `${vgTown('day')}${vgChar('kat', 'kat', 960, 1000, 0.95)}`), `${vgTag('recon')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kat'), s.t0, 'angry', 'flat'); bzTalk(tl, $('#kat'), 'ap_kat', s.t0, s.t1, 'flat', 'open'); bzIdle(tl, $('#kat'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 960, 440); } },
  versions: { bg: '#1b1424', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b1424"/>${vgClock(960, 560)}`, `${bzSign('a', '8h?', 420, 420, -6, BZ.yellow, BZ.ink, 110)}${bzSign('b', '10h?', 1500, 420, 5, '#efe9d6', BZ.ink, 110)}${bzSign('c', '6h?', 1420, 700, -4, '#e0302a', '#fff', 110)}${vgBig('lb', 'AS VERSÕES MUDAM', '#efe9d6', BZ.ink, 150, -2, 80)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.6); vgPopAt(tl, $('#a'), s.t0, K('a')); vgPopAt(tl, $('#b'), s.t0, K('b')); vgPopAt(tl, $('#c'), s.t0, K('c')); } },
  mouths: { bg: '#8a94a8', html: () => bzShot(`${vgTown('day')}${['ufo1', 'bomb', 'pm2', 'mae', 'sitio', 'ufo2'].map((k, i) => vgChar(k, 'm' + i, 260 + i * 280, 1000, 0.95, i > 2)).join('')}`, `${vgBig('lb', 'CENTENAS DE BOCAS', BZ.yellow, BZ.ink, 150, -3, 84)}`),
    anim(tl, s, K, $) { for (let i = 0; i < 6; i++) { bzFace(tl, $('#m' + i), s.t0, 'dot', 'flat'); for (let t = s.t0 + i * 0.13; t < s.t1 - 0.2; t += 0.5) { bzFace(tl, $('#m' + i), t, undefined, 'open'); bzFace(tl, $('#m' + i), t + 0.22, undefined, 'o'); } bzIdle(tl, $('#m' + i), s.t0, s.t1, i); }
      vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  gaps: { bg: '#1b1424', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b1424"/>${['EXÉRCITO', 'BOMBEIROS', 'POLÍCIA MILITAR', 'HOSPITAIS'].map((t, i) => `<g transform="translate(560 ${260 + i * 150})"><rect x="-60" y="-50" width="100" height="100" rx="12" fill="#efe9d6" ${bzO()}/><text x="90" y="30" font-family="Anton" font-size="84" fill="#efe9d6">${t}</text></g>`).join('')}
      <path d="M520 260 l 30 40 l 60 -80" stroke="#3aa05a" stroke-width="22" fill="none" stroke-linecap="round"/>${['a', 'b', 'c'].map((k, i) => `<g id="${k}"><text x="550" y="${445 + i * 150}" text-anchor="middle" font-family="Anton" font-size="96" fill="#e0302a">?</text></g>`).join('')}`, `${vgBig('lb', 'O QUE O INQUÉRITO NÃO OLHOU', '#efe9d6', BZ.ink, 110, -2, 70)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.4); vgPopAt(tl, $('#a'), s.t0, K('a')); vgPopAt(tl, $('#b'), s.t0, K('b')); vgPopAt(tl, $('#c'), s.t0, K('c')); } },
  doc: { bg: '#4a3a30', html: () => bzShot(`${vgZoom(1.6, 1340, 480, `${vgNews()}${vgChar('sold', 'so', 1250, 640, 0.5)}${vgChar('pm2', 'p2', 1440, 640, 0.5, true)}`)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { tl.set($('#tvimg'), { opacity: 0 }, s.t0); bzFace(tl, $('#so'), s.t0, 'half', 'frown'); bzFace(tl, $('#p2'), s.t0, 'angry', 'flat'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08); } },
  two: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fa', 620, 560, 0.65, 'ARQUIVO A', 'VERSÃO OFICIAL')}${vgFolder('fb', 1300, 560, 0.65, 'ARQUIVO B', 'TESTEMUNHAS')}`, bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('#fa'), { x: -900 }, { x: 0, duration: 0.6, ease: 'power2.out' }, s.t0 + 0.2); tl.fromTo($('#fb'), { x: 900 }, { x: 0, duration: 0.6, ease: 'power2.out' }, s.t0 + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.05); } },
  filea: { bg: '#8a94a8', html: () => bzShot(`${vgLot()}${vgCrouch('cr', 1200, 900, 0.85, '#2a2430')}`, `${bzSign('lb', 'ARQUIVO A', 360, 160, -3, '#efe9d6', BZ.ink, 90)}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.3); bzParallax(tl, $, s.t0, s.t1, -100); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 1200, 640); } },
  fileb: { bg: '#2a2a3a', html: () => bzShot(`${vgLot(1)}${vgEt('et', 1200, 900, 0.85)}`, `${bzSign('lb', 'ARQUIVO B', 360, 160, -3, '#e0302a', '#fff', 90)}${bzFlash('fl', '#ff2a1a')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { vgEtLive(tl, $('#et'), s.t0, s.t1); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 0.3); bzHit(tl, $('#fl'), K('e'), 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 1200, 600); } },
  ask: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fa', 620, 560, 0.65, 'ARQUIVO A', 'VERSÃO OFICIAL')}${vgFolder('fb', 1300, 560, 0.65, 'ARQUIVO B', 'TESTEMUNHAS')}`, `${bzNum('q', '?', 960, 560, '#f6c744', 360)}${vgBig('lb', 'COMENTA: A OU B?', BZ.yellow, BZ.ink, 140, -3, 90)}${bzVignette(0.55)}`),
    anim(tl, s, K, $) { bzShow(tl, $('#q'), s.t0 + 0.5); vgPopAt(tl, $('#lb'), s.t0, s.t0 + 1.8); tl.fromTo($('#q'), { y: -12 }, { y: 12, duration: 0.6, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.6) }, s.t0 + 0.9); } },
  next: { bg: '#04060c', html: () => bzShot(`${vgRiver()}${vgBeam('bm', 1300)}`, `${vgDate('cd', 'PRÓXIMO ARQUIVO', 'PARÁ • AS LUZES')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.fromTo($('#bm'), { x: 400 }, { x: -500, duration: s.t1 - s.t0, ease: 'sine.inOut' }, s.t0); tl.set($('#bm'), { opacity: 0 }, s.t0); tl.to($('#bm'), { opacity: 1, duration: 0.6 }, K('n')); vgPopAt(tl, $('#cd'), s.t0, s.t0 + 0.6); } },
  end: { bg: '#0a0812', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85, 'CASO Nº 001', 'ARQUIVADO')}<g id="eyes" opacity="0">${bzGlow('eg', 960, 300, 260, '#ff2a1a', 0.4)}<ellipse cx="900" cy="300" rx="30" ry="22" fill="#d81c1c"/><ellipse cx="1020" cy="300" rx="30" ry="22" fill="#d81c1c"/></g>`, `<rect id="dk" width="1920" height="1080" fill="#000" opacity="0"/>${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzQuake(tl, $('#cam'), K('c'), K('c') + 0.3, 8); tl.to($('#dk'), { opacity: 0.92, duration: 0.8 }, K('c') + 0.4); tl.to($('#eyes'), { opacity: 1, duration: 0.1 }, K('z')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1); } },
});
// a quick run off screen (girls fleeing)
function bzRunAway(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, dx: number) { bzWalk(tl, sel, t0, Math.min(t1, t0 + 2.4), 0, dx, true); }
