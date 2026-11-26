// <lines>
const OP_LINES = [{"who": "ap_narr", "t0": 0.4, "t1": 8.008}, {"who": "ap_narr", "t0": 8.708, "t1": 21.328}, {"who": "ap_narr", "t0": 22.028, "t1": 30.182}, {"who": "ap_min", "t0": 30.782, "t1": 35.251}, {"who": "ap_narr", "t0": 36.251, "t1": 45.843}, {"who": "ap_narr", "t0": 46.443, "t1": 52.235}, {"who": "ap_narr", "t0": 53.835, "t1": 61.388}, {"who": "ap_narr", "t0": 61.888, "t1": 75.193}, {"who": "ap_narr", "t0": 75.693, "t1": 92.917}, {"who": "ap_narr", "t0": 93.717, "t1": 106.868}, {"who": "ap_torre", "t0": 107.368, "t1": 115.938}, {"who": "ap_narr", "t0": 116.538, "t1": 131.21}, {"who": "ap_narr", "t0": 132.01, "t1": 143.53}, {"who": "ap_narr", "t0": 144.53, "t1": 157.046}, {"who": "ap_narr", "t0": 157.546, "t1": 170.699}, {"who": "ap_narr", "t0": 171.299, "t1": 179.836}, {"who": "ap_narr", "t0": 180.836, "t1": 193.445}, {"who": "ap_narr", "t0": 193.945, "t1": 200.06}, {"who": "ap_narr", "t0": 201.26, "t1": 217.697}, {"who": "ap_narr", "t0": 218.197, "t1": 231.316}, {"who": "ap_narr", "t0": 231.816, "t1": 237.421}, {"who": "ap_pil1", "t0": 237.821, "t1": 246.23}, {"who": "ap_narr", "t0": 246.83, "t1": 255.59}, {"who": "ap_narr", "t0": 256.59, "t1": 268.809}, {"who": "ap_narr", "t0": 269.309, "t1": 285.218}, {"who": "ap_narr", "t0": 285.818, "t1": 298.607}, {"who": "ap_narr", "t0": 299.607, "t1": 317.951}, {"who": "ap_narr", "t0": 318.551, "t1": 326.844}, {"who": "ap_pil2", "t0": 327.444, "t1": 333.599}, {"who": "ap_narr", "t0": 334.599, "t1": 351.907}, {"who": "ap_ctrl", "t0": 352.407, "t1": 359.421}, {"who": "ap_narr", "t0": 360.021, "t1": 371.508}, {"who": "ap_narr", "t0": 372.108, "t1": 384.202}, {"who": "ap_narr", "t0": 385.202, "t1": 399.121}, {"who": "ap_narr", "t0": 399.721, "t1": 411.836}, {"who": "ap_narr", "t0": 413.236, "t1": 428.517}, {"who": "ap_min", "t0": 429.017, "t1": 435.749}, {"who": "ap_narr", "t0": 436.349, "t1": 446.92}, {"who": "ap_narr", "t0": 447.92, "t1": 454.652}, {"who": "ap_narr", "t0": 456.052, "t1": 471.047}, {"who": "ap_doc", "t0": 471.847, "t1": 484.558}, {"who": "ap_narr", "t0": 485.758, "t1": 494.882}, {"who": "ap_narr", "t0": 495.682, "t1": 511.525}, {"who": "ap_narr", "t0": 512.125, "t1": 524.294}, {"who": "ap_narr", "t0": 525.494, "t1": 537.24}, {"who": "ap_narr", "t0": 537.84, "t1": 553.322}, {"who": "ap_narr", "t0": 553.922, "t1": 564.298}, {"who": "ap_narr", "t0": 565.498, "t1": 575.312}, {"who": "ap_narr", "t0": 575.912, "t1": 587.255}, {"who": "ap_narr", "t0": 587.855, "t1": 591.641}];
// </lines>
// =====================================================================
//  ARQUIVO PROIBIDO, Caso Nº 002: the shots (16:9 documentary). Kit in world.ts; shot list in tools/make-scenes.py.
//  Real photos: assets/ (credits in assets/CREDITOS.txt). Reconstructions carry the RECONSTITUIÇÃO tag; documents DOCUMENTO.
// =====================================================================
BZ_TALK.lines = OP_LINES;
const vgBig = (id: string, t: string, bg = BZ.yellow, fg = BZ.ink, y = 170, rot = -3, size = 110) => bzSign(id, t, 960, y, rot, bg, fg, size);
const vgStamp = (id: string, t: string, x: number, y: number, size = 110, c = '#e0302a') => { const w = t.length * size * 0.55 + 90;
  return `<g id="${id}"><g transform="translate(${x} ${y}) rotate(-8)"><rect x="${-w / 2}" y="${-size * 0.8}" width="${w}" height="${size * 1.35}" rx="16" fill="#f4f0e4" opacity="0.92" stroke="${c}" stroke-width="14"/><text x="0" y="${size * 0.36}" text-anchor="middle" font-family="Anton" font-size="${size}" fill="${c}">${t}</text></g></g>`; };
const opPop = (tl: gsap.core.Timeline, sel: string, t0: number, t: number) => { tl.set(sel, { opacity: 0 }, t0); bzShow(tl, sel, t); };
const opFade = (tl: gsap.core.Timeline, sel: string, t0: number, t: number, d = 0.6) => { tl.set(sel, { opacity: 0 }, t0); tl.to(sel, { opacity: 1, duration: d }, t); };
// a name card (low left) for people and call signs
const opName = (id: string, t: string, sub: string) => vgCard(id, t, sub);
// a big quote on black (typewriter look)
const opQuote = (lines: string[], who: string) => `<rect width="1920" height="1080" fill="#07060a"/><text x="200" y="300" font-family="Anton" font-size="200" fill="#e0302a" opacity="0.5">“</text>
  ${lines.map((l, i) => `<text class="ql" x="960" y="${420 + i * 90}" text-anchor="middle" font-family="Anton" font-size="72" fill="#efe9d6">${l}</text>`).join('')}<text x="960" y="${460 + lines.length * 90}" text-anchor="middle" font-family="Anton" font-size="40" fill="#f6c744">— ${who}</text>`;
// the airport tower window at night (frame over the sky) with a figure holding binoculars (silhouette)
const opTowerWin = () => `<path d="M0 0 H1920 V1080 H0 Z M200 160 H1720 V760 H200 Z" fill="#14161c" fill-rule="evenodd"/><path d="M200 160 H1720 V760 H200 Z M706 160 V760 M1213 160 V760" fill="none" stroke="#2a2c34" stroke-width="22"/><rect y="760" width="1920" height="320" fill="#1e2028"/>
  <g transform="translate(420 1080)"><path d="M-90 0 Q -110 -260 -60 -330 Q 0 -360 60 -330 Q 110 -260 90 0 Z" fill="#0a0b10"/><circle cx="0" cy="-400" r="70" fill="#0a0b10"/><rect x="-30" y="-430" width="90" height="40" rx="12" fill="#0a0b10"/></g>`;
// runway edge lights (.rl) in perspective
const opRunway = () => `<path d="M760 1080 L 940 760 L 980 760 L 1160 1080 Z" fill="#14161c"/>${[...Array(9)].map((_, i) => { const t = i / 8, y = 760 + 320 * t * t, xl = 940 - 180 * t * t, xr = 980 + 180 * t * t, r = 4 + 10 * t; return `<circle class="rl" cx="${xl}" cy="${y}" r="${r}" fill="#ffe08a"/><circle class="rl" cx="${xr}" cy="${y}" r="${r}" fill="#ffe08a"/>`; }).join('')}`;
// the air-defence operations room (reconstruction): screens glowing green, a desk
const opOpsRoom = () => `<rect width="1920" height="1080" fill="#0a0e14"/>${[300, 760, 1220].map((x) => `<g><rect x="${x}" y="200" width="400" height="300" rx="14" fill="#03160c" stroke="#2aff7a" stroke-width="5"/><circle cx="${x + 200}" cy="350" r="110" fill="none" stroke="#2aff7a" stroke-width="3" opacity="0.6"/>${[[-40, -30], [50, 20], [10, 70]].map(([dx, dy]) => `<rect class="pl" x="${x + 200 + dx}" y="${350 + dy}" width="12" height="12" fill="#c8ffd8"/>`).join('')}</g>`).join('')}<rect y="700" width="1920" height="380" fill="#1a1e26" ${bzO()}/>${bzGlow('og', 960, 360, 700, '#2aff7a', 0.12)}`;
// a jet seen from above (for the six-o'clock diagram), nose up
const opJetTop = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -120 L 16 -40 L 90 30 L 90 46 L 14 26 L 10 80 L 36 100 L 36 112 L 0 104 L -36 112 L -36 100 L -10 80 L -14 26 L -90 46 L -90 30 L -16 -40 Z" fill="#8a94a0" stroke="#2b2433" stroke-width="5"/></g></g>`;
// mechanics on the apron at night (generic)
const OP_MEC: BzSpec = { skin: '#b8784a', hat: { kind: 'cap', color: '#3a4a3a' }, hair: { style: 'short', color: '#1c1410' }, top: '#5a6a4a', pants: '#4a5a3a', shoes: '#1c1410' };
const opApron = () => `${opSky(false)}<rect y="760" width="1920" height="320" fill="#2a2c34" ${bzO()}/><path d="M200 760 Q 600 380 1000 760 Z" fill="#1a1c24" ${bzO()}/>${bzLamp(1500, 800, 420, true)}`;
// the anomalous-propagation diagram: warm layer over cold, the radar beam bending down to the ground
const opInversion = () => `<rect width="1920" height="1080" fill="#0e1a30"/><rect y="200" width="1920" height="260" fill="#e86a3a" opacity="0.25"/><text x="1700" y="340" text-anchor="end" font-family="Anton" font-size="54" fill="#ff9a6a">AR QUENTE</text><rect y="460" width="1920" height="420" fill="#3a8ae0" opacity="0.18"/><text x="1700" y="700" text-anchor="end" font-family="Anton" font-size="54" fill="#8ac0ff">AR FRIO</text>
  <rect y="880" width="1920" height="200" fill="#1a2a20" ${bzO()}/><g transform="translate(240 880)"><rect x="-20" y="-160" width="40" height="160" fill="#8a8f9e" ${bzO('stroke-width="5"')}/><path d="M-80 -200 Q 0 -260 80 -200" stroke="#efe9d6" stroke-width="14" fill="none"/></g>
  <path id="beam" d="M260 700 Q 900 300 1500 880" stroke="#3aff8a" stroke-width="10" fill="none" stroke-dasharray="1600" stroke-dashoffset="1600"/><g id="ghost" opacity="0"><rect x="1480" y="840" width="40" height="40" fill="none" stroke="#c8ffd8" stroke-width="6"/><text x="1530" y="830" font-family="Anton" font-size="40" fill="#c8ffd8">ECO FALSO?</text></g>`;
// the two lead masks (teaser for the next case)
const opMasks = () => `${bzSky('#05060a', '#1a1a26')}<path d="M0 900 Q 500 520 1000 700 Q 1400 560 1920 820 V1080 H0 Z" fill="#0c0e12" ${bzO()}/>${[760, 1160].map((x) => `<g transform="translate(${x} 520)"><path d="M-110 -120 Q 0 -180 110 -120 Q 140 40 0 140 Q -140 40 -110 -120 Z" fill="#7a7e86" stroke="#2b2433" stroke-width="8"/><ellipse cx="-44" cy="-30" rx="26" ry="16" fill="#1a1a20"/><ellipse cx="44" cy="-30" rx="26" ry="16" fill="#1a1a20"/></g>`).join('')}`;


// a real photo shot: slow Ken Burns move, FOTO tag, optional lower-third card
const opPhoto = (file: string, cardT = '', cardS = '', a = 1, b = 1.15, ox = 960, oy = 540, dx = 0, tag = 'foto') => ({ bg: '#000',
  html: () => bzShot(opFull(file), `${vgTag(tag)}${cardT ? vgCard('cd', cardT, cardS) : ''}`),
  anim(tl: gsap.core.Timeline, s: any, K: any, $: any) { opKen(tl, $('#ph'), s.t0, s.t1, a, b, ox, oy, dx); if (cardT) opPop(tl, $('#cd'), s.t0, s.t0 + 0.4); } });
// explainer: how a radar sees (pulse out, echo back, dot on the screen)
const opEcho = () => `<rect width="1920" height="1080" fill="#0e1a30"/><rect y="860" width="1920" height="220" fill="#1a2a20" ${bzO()}/>
  <g transform="translate(300 860)"><path d="M-60 0 L -30 -260 L 30 -260 L 60 0 Z" fill="none" stroke="#8a8f9e" stroke-width="10"/><rect x="-110" y="-330" width="220" height="70" fill="#e0402a" ${bzO()}/></g>
  ${opJet('pj', 1450, 360, 0.9)}
  ${[0, 1, 2].map((i) => `<path class="wo" d="M${420 + i * 40} ${520 - i * 10} q 40 -60 0 -120" transform="rotate(-20 ${420 + i * 40} 460)" stroke="#3aff8a" stroke-width="10" fill="none" opacity="0"/>`).join('')}
  <g id="pulse" opacity="0"><circle cx="420" cy="500" r="18" fill="#3aff8a"/></g><g id="back" opacity="0"><circle cx="1400" cy="380" r="14" fill="#f6c744"/></g>
  <g id="scr" opacity="0"><rect x="1240" y="600" width="420" height="300" rx="16" fill="#03160c" stroke="#3aff8a" stroke-width="6"/><circle cx="1450" cy="750" r="120" fill="none" stroke="#3aff8a" stroke-width="3" opacity="0.6"/><rect x="1500" y="700" width="16" height="16" fill="#c8ffd8"/></g>
  ${['1. O RADAR MANDA UM PULSO', '2. O PULSO BATE E VOLTA', '3. VIRA UM PONTO NA TELA'].map((s, i) => `<g class="st" opacity="0"><text x="80" y="${230 + i * 80}" font-family="Anton" font-size="60" fill="${i === 2 ? '#f6c744' : '#efe9d6'}" stroke="${BZ.ink}" stroke-width="8" paint-order="stroke">${s}</text></g>`).join('')}`;
// explainer: speeds compared (bars)
const OP_SPEEDS: [string, number, string, string][] = [['SOM', 1235, '1.235 KM/H', '#8ac0ff'], ['MIRAGE (MÁX.)', 2350, '≈ 2.350 KM/H', '#efe9d6'], ['BALA DE FUZIL', 3200, '≈ 3.200 KM/H', '#f6c744'], ['O OBJETO (MACH 15)', 18500, '≈ 18.500 KM/H', '#e0302a']];
const opSpeeds = () => `<rect width="1920" height="1080" fill="#07060a"/><text x="960" y="130" text-anchor="middle" font-family="Anton" font-size="70" fill="#efe9d6">QUÃO RÁPIDO É MACH 15?</text>
  ${OP_SPEEDS.map(([n, v, lab, c], i) => `<g id="${'abcd'[i]}"><text x="100" y="${250 + i * 160}" font-family="Anton" font-size="54" fill="${c}">${n}</text><rect class="bar" x="100" y="${268 + i * 160}" width="${Math.max(30, v / 18500 * 1700)}" height="70" rx="10" fill="${c}"/><text x="${130 + Math.max(30, v / 18500 * 1700)}" y="${322 + i * 160}" font-family="Anton" font-size="50" fill="#efe9d6" ${i === 3 ? 'text-anchor="end" dx="-60"' : ''}>${lab}</text></g>`).join('')}`;

defineVisuals({
  // ================================================================ cold open
  'o-sky': { bg: '#02040c', html: () => bzShot(opFull('nasa-terra-noite.jpg'), `${vgCard('cd', '19 DE MAIO DE 1986', 'SEGUNDA-FEIRA • LUA CHEIA • CÉU LIMPO')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1, 1.15, 1100, 700); opPop(tl, $('#cd'), s.t0, K('d')); } },
  'o-radar': { bg: '#020a06', html: () => bzShot(opRadar([[120, -200], [-160, 80], [260, 140], [-60, -300], [200, -40], [-280, -120], [40, 220], [330, -230], [-220, 260]]), vgTag('recon')),
    anim(tl, s, K, $) { opSweep(tl, $(''), s.t0, s.t1); tl.set($('.pl'), { opacity: 0 }, s.t0); tl.to($('.pl'), { opacity: 1, duration: 0.1, stagger: 0.3 }, K('n')); opBlink(tl, $(''), K('n') + 3, s.t1); } },
  'o-jets': { bg: '#02040c', html: () => bzShot(`${opSky()}${opJet('j1', 500, 640, 1.1)}${opJet('j2', 300, 760, 0.8, true)}${opOrb('o1', 1500, 380)}`, `${vgTag('recon')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { tl.fromTo($('#j1'), { x: -600 }, { x: 500, duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0); tl.fromTo($('#j2'), { x: -800 }, { x: 400, duration: s.t1 - s.t0, ease: 'power1.in' }, s.t0 + 0.3); tl.to($('#o1'), { x: 400, y: -150, duration: s.t1 - s.t0, ease: 'power2.in' }, s.t0); opOrbColors(tl, $('#o1'), s.t0, s.t1); } },
  'o-press': { bg: '#2a3048', html: () => bzShot(opPress(), `${vgTag('recon')}${vgCard('cd', '23 DE MAIO DE 1986', 'MINISTÉRIO DA AERONÁUTICA • BRASÍLIA')}`),
    anim(tl, s, K, $) { tl.fromTo($('.fl'), { opacity: 0 }, { opacity: 0.8, duration: 0.06, yoyo: true, repeat: 1, stagger: { each: 0.5, repeat: 2 } }, s.t0 + 0.3); opPop(tl, $('#cd'), s.t0, s.t0 + 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 960, 600); } },
  'o-quote': { bg: '#07060a', html: () => bzShot(opQuote(['"TECNICAMENTE, EU DIRIA', 'AOS SENHORES QUE NÓS NÃO', 'TEMOS EXPLICAÇÃO."'], 'MINISTRO DA AERONÁUTICA, 1986'), ''),
    anim(tl, s, K, $) { tl.fromTo($('.ql'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.9 }, s.t0 + 0.2); } },
  'o-archive': { bg: '#000', html: () => bzShot(opFull('arquivo-nacional.jpg'), `${vgTag('foto')}${vgCard('cd', 'ARQUIVO NACIONAL', 'RIO DE JANEIRO')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1, 1.15, 960, 500); opPop(tl, $('#cd'), s.t0, s.t0 + 0.5); } },
  'o-docs': { bg: '#100c0e', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85, 'FAB • 1986', 'RESERVADO')}`, `${vgTag('doc')}${vgStamp('st', 'LIBERADO', 1300, 300, 100)}`),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 960, 560); opPop(tl, $('#st'), s.t0, K('s')); tl.set($('#fd .cover'), { opacity: 0 }, K('s') + 0.5); tl.set($('#fd .open'), { opacity: 1 }, K('s') + 0.5); } },
  title: { bg: '#0a0812', html: () => bzShot(opTitle(), `${bzFlash('fl', '#fff')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { tl.fromTo($('#tf'), { scale: 1.3 }, { scale: 1, svgOrigin: '960 560', duration: 0.5, ease: 'back.out(2)' }, K('t') - 0.3); bzHit(tl, $('#fl'), K('t'), 0.4); opPop(tl, $('#tcase'), s.t0, K('c')); opFade(tl, $('#tname'), s.t0, K('c') + 0.6); } },

  // ================================================================ 1986: the air defence
  cindacta: { bg: '#0a1424', html: () => bzShot(opMap(), `<g id="ring">${[1, 2, 3].map((k) => `<circle cx="820" cy="260" r="${k * 60}" fill="none" stroke="#3aff8a" stroke-width="4" opacity="0.5"/>`).join('')}</g>${vgCard('cd', 'BRASIL • 1986', 'O CÉU VIGIADO')}`),
    anim(tl, s, K, $) { tl.fromTo($('#ring'), { scale: 0.3, opacity: 1 }, { scale: 2.2, opacity: 0, svgOrigin: '820 260', duration: 1.6, repeat: Math.floor((s.t1 - s.t0) / 1.6) }, s.t0); opPop(tl, $('#cd'), s.t0, s.t0 + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  network: { bg: '#020a06', html: () => bzShot(opRadar([[100, -150], [-200, 60], [220, 200]]), `${vgCard('cd', 'CINDACTA I', 'CENTRO DE OPERAÇÕES DE DEFESA AÉREA • BRASÍLIA')}`),
    anim(tl, s, K, $) { opSweep(tl, $(''), s.t0, s.t1); opBlink(tl, $(''), s.t0, s.t1); opPop(tl, $('#cd'), s.t0, s.t0 + 0.5); } },
  bases: { bg: '#0a1424', html: () => bzShot(opMap(), `<g id="hs">${bzGlow('hsg', 1290, 820, 120, '#ff5a4a', 0.6)}</g><g id="ha">${bzGlow('hag', 700, 330, 120, '#ff5a4a', 0.6)}</g>`),
    anim(tl, s, K, $) { opFade(tl, $('#hs'), s.t0, K('s'), 0.3); opFade(tl, $('#ha'), s.t0, K('a'), 0.3); tl.fromTo($('#hs, #ha'), { scale: 0.8 }, { scale: 1.2, svgOrigin: '960 540', duration: 0.6, yoyo: true, repeat: 7 }, s.t0); } },
  f5photo: { bg: '#000', html: () => bzShot(opFull('f5-rafael.jpg'), `${vgTag('foto')}${vgCard('cd', 'NORTHROP F-5E', 'BASE AÉREA DE SANTA CRUZ (RJ)')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.05, 1.2, 1000, 500, -60); opPop(tl, $('#cd'), s.t0, s.t0 + 0.3); } },
  miragephoto: { bg: '#000', html: () => bzShot(opFull('mirage-fab.jpg'), `${vgTag('foto')}${vgCard('cd', 'DASSAULT MIRAGE III (F-103)', 'BASE AÉREA DE ANÁPOLIS (GO)')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.05, 1.18, 960, 560, 60); opPop(tl, $('#cd'), s.t0, s.t0 + 0.3); } },

  // ================================================================ 20h, São José dos Campos
  sjc: { bg: '#000', html: () => bzShot(opFull('aeroporto-sjc.jpg'), `${vgTag('foto')}${opTime('tm', '20:00', 'SÃO JOSÉ DOS CAMPOS (SP)')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1, 1.15, 700, 400); opPop(tl, $('#tm'), s.t0, K('h')); tl.to($('#tm'), { opacity: 0, duration: 0.4 }, K('h') + 2.2); } },
  tower: { bg: '#02040c', html: () => bzShot(`${opSky()}${opOrb('o1', 1300, 380, 18, '#ff4a3a')}${opTowerWin()}`, `${vgTag('recon')}${opName('nm', 'SGT. SÉRGIO MOTA DA SILVA', 'CONTROLADOR • TORRE DE SÃO JOSÉ DOS CAMPOS')}`),
    anim(tl, s, K, $) { opOrbColors(tl, $('#o1'), s.t0, s.t1); opPop(tl, $('#nm'), s.t0, s.t0 + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 1300, 400); } },
  'q-torre': { bg: '#07090c', html: () => bzShot(opWave('TORRE • SÃO JOSÉ DOS CAMPOS'), `${vgTag('recon')}<text x="960" y="760" text-anchor="middle" font-family="Anton" font-size="44" fill="#8a8f9e">TRANSCRIÇÃO DA GRAVAÇÃO • ARQUIVO NACIONAL</text>`),
    anim(tl, s, K, $) { opWaveGo(tl, $(''), s.t0, s.t1); } },
  colors: { bg: '#02040c', html: () => bzShot(`${opSky()}${opOrb('o1', 760, 420, 30)}${opOrb('o2', 1060, 360, 24)}${opOrb('o3', 1240, 460, 20)}`, `${vgTag('recon')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { opOrbColors(tl, $('#o1'), s.t0, s.t1); opOrbColors(tl, $('#o2'), s.t0 + 0.3, s.t1); opOrbColors(tl, $('#o3'), s.t0 + 0.5, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 1000, 420); } },
  runway: { bg: '#02040c', html: () => bzShot(`${opSky()}${opRunway()}<g id="orbz">${opOrb('o1', 960, 420, 22, '#ff4a3a')}</g>`, `${vgTag('recon')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { tl.to($('.rl'), { opacity: 0.15, duration: 0.3 }, K('o')); tl.to($('#orbz'), { scale: 2.2, svgOrigin: '960 420', duration: 2.0, ease: 'power1.inOut' }, K('o') + 0.2); tl.to($('.rl'), { opacity: 1, duration: 0.3 }, K('b')); tl.to($('#orbz'), { scale: 0.7, svgOrigin: '960 420', duration: 1.6 }, K('b') + 0.2); opOrbColors(tl, $('#o1'), s.t0, s.t1); } },
  gru: { bg: '#020a06', html: () => bzShot(opRadar([[60, 40], [100, 10], [90, 80]]), `${vgTag('recon')}${vgCard('cd', 'RADAR DE GUARULHOS', 'ECOS SOBRE SÃO JOSÉ DOS CAMPOS')}`),
    anim(tl, s, K, $) { opSweep(tl, $(''), s.t0, s.t1); opBlink(tl, $(''), s.t0, s.t1); opPop(tl, $('#cd'), s.t0, s.t0 + 0.5); } },

  // ================================================================ 21h08: Ozires Silva
  xingu: { bg: '#000', html: () => bzShot(opFull('xingu.jpg'), `${vgTag('foto')}${opTime('tm', '21:08', 'BIMOTOR EMB-121 XINGU')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1, 1.15, 1000, 500, -80); opPop(tl, $('#tm'), s.t0, K('h')); tl.to($('#tm'), { opacity: 0, duration: 0.4 }, K('h') + 2.2); } },
  ozires: { bg: '#000', html: () => bzShot(`${opFull('xingu.jpg')}<rect width="1920" height="1080" fill="#000" opacity="0.55"/>${opPrint('op', 'ozires.jpg', 1380, 430, 520, 600, 3, 'FOTO: AGÊNCIA BRASIL')}`, `${opName('nm', 'CEL. OZIRES SILVA', 'FUNDADOR DA EMBRAER • NO DIA SEGUINTE, PRESIDENTE DA PETROBRAS')}${vgTag('foto')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1, 1.12, 960, 400); tl.fromTo($('#op'), { y: 600 }, { y: 0, duration: 0.6, ease: 'power2.out', immediateRender: true }, s.t0 + 0.2); opPop(tl, $('#nm'), s.t0, s.t0 + 0.3); } },
  redstars: { bg: '#02040c', html: () => bzShot(`${opSky()}${opOrb('o1', 1200, 360, 26, '#ff3a2a')}${opOrb('o2', 1420, 420, 22, '#ff3a2a')}${opOrb('o3', 1320, 300, 18, '#ff3a2a')}`, `${vgTag('recon')}${vgBig('rs', '"GRANDES ESTRELAS VERMELHAS"', '#efe9d6', BZ.ink, 160, -2, 76)}`),
    anim(tl, s, K, $) { opPop(tl, $('#rs'), s.t0, s.t0 + 1.2); tl.fromTo($('#o1, #o2, #o3'), { opacity: 0.6 }, { opacity: 1, duration: 0.5, yoyo: true, repeat: 9 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 1300, 380); } },
  ozquote: { bg: '#07060a', html: () => bzShot(opQuote(['SE OS RADARES NÃO TIVESSEM', 'CONFIRMADO, ELE PREFERIA', 'NUNCA TER FALADO NADA.'], 'OZIRES SILVA, ANOS DEPOIS'), ''),
    anim(tl, s, K, $) { tl.fromTo($('.ql'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.9 }, s.t0 + 0.2); } },

  // ================================================================ the alert
  alert: { bg: '#0a1424', html: () => bzShot(`${opMap()}<rect id="red" width="1920" height="1080" fill="#e0302a" opacity="0"/>`, opTime('tm', '21:39', 'SANTA CRUZ EM ALERTA')),
    anim(tl, s, K, $) { tl.fromTo($('#red'), { opacity: 0 }, { opacity: 0.25, duration: 0.4, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.4) }, s.t0); opPop(tl, $('#tm'), s.t0, K('h')); tl.to($('#tm'), { opacity: 0, duration: 0.4 }, K('h') + 2.4); } },
  cerqueira: { bg: '#0a0e14', html: () => bzShot(opOpsRoom(), `${vgTag('recon')}${opName('nm', 'MAJ. NEY CERQUEIRA', 'CHEFE DO CENTRO DE OPERAÇÕES DE DEFESA AÉREA')}${vgStamp('st', 'INTERCEPTAR', 960, 560, 120)}`),
    anim(tl, s, K, $) { opBlink(tl, $(''), s.t0, s.t1); opPop(tl, $('#nm'), s.t0, s.t0 + 0.4); opPop(tl, $('#st'), s.t0, K('i')); bzQuake(tl, $('#cam'), K('i'), K('i') + 0.3, 6); } },

  // ================================================================ Jambock 17
  jb17: { bg: '#000', html: () => bzShot(opFull('f5-taxi.jpg'), `${vgTag('foto')}${opTime('tm', '22:34', 'DECOLA O PRIMEIRO CAÇA')}${opName('nm', 'JAMBOCK 17 • F-5E', 'TEN. KLEBER CALDAS MARINHO')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.2, 1.35, 900, 520); opPop(tl, $('#tm'), s.t0, K('h')); tl.to($('#tm'), { opacity: 0, duration: 0.4 }, K('h') + 2.2); opPop(tl, $('#nm'), s.t0, K('h') + 2.4); } },
  takeoff: { bg: '#02040c', html: () => bzShot(`${opSky()}${opJet('j1', 400, 860, 1.2, false, false)}`, `${vgTag('recon')}${vgBig('lt', 'LUZES APAGADAS', '#efe9d6', BZ.ink, 160, -2, 76)}`),
    anim(tl, s, K, $) { tl.fromTo($('#j1'), { x: -500, y: 0, rotation: 0 }, { x: 1300, y: -500, rotation: -14, svgOrigin: '400 860', duration: s.t1 - s.t0, ease: 'power2.in' }, s.t0); opPop(tl, $('#lt'), s.t0, s.t0 + 0.8); } },
  chase1: { bg: '#02040c', html: () => bzShot(`${opSky()}<g id="tgt">${opOrb('o1', 960, 320, 16)}</g>${opCockpit()}`, vgTag('recon')),
    anim(tl, s, K, $) { tl.set($('#tgt'), { opacity: 0 }, s.t0); tl.to($('#tgt'), { opacity: 1, duration: 0.5 }, K('v')); opOrbColors(tl, $('#o1'), K('v'), s.t1); tl.fromTo($('#tgt'), { x: -40 }, { x: 40, duration: 1.4, yoyo: true, repeat: 5, ease: 'sine.inOut' }, s.t0); bzHandheld(tl, $('#cam'), s.t0, s.t1, 4); } },
  chase1b: { bg: '#02040c', html: () => bzShot(`${opSky()}${opJet('j1', 500, 700, 1.0)}${opOrb('o1', 1300, 500, 22)}`, `${vgTag('recon')}${vgBig('dz', 'SEMPRE A ~18 KM', '#f6c744', BZ.ink, 160, -2, 76)}`),
    anim(tl, s, K, $) { tl.to($('#j1'), { y: -200, duration: s.t1 - s.t0 }, s.t0); tl.to($('#o1'), { y: -380, duration: s.t1 - s.t0 }, s.t0); opOrbColors(tl, $('#o1'), s.t0, s.t1); opPop(tl, $('#dz'), s.t0, s.t0 + 1.0); } },
  sea: { bg: '#0a1424', html: () => bzShot(`${opMap([['scz', 'sjc']])}<path id="toSea" d="M1290 820 Q 1500 700 1880 600" stroke="#ff5a4a" stroke-width="8" fill="none" stroke-dasharray="20 14"/>`, vgCard('cd', 'RUMO AO ATLÂNTICO', 'PERSEGUIÇÃO SOBRE O MAR')),
    anim(tl, s, K, $) { tl.to($('.rt0'), { strokeDashoffset: 0, duration: 1.2 }, s.t0); tl.fromTo($('#toSea'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, s.t0 + 1.2); opPop(tl, $('#cd'), s.t0, s.t0 + 1.4); } },
  'q-pil1': { bg: '#07090c', html: () => bzShot(opWave('PILOTO • JAMBOCK 17'), vgTag('recon')), anim(tl, s, K, $) { opWaveGo(tl, $(''), s.t0, s.t1); } },
  africa: { bg: '#02040c', html: () => bzShot(`${opSky()}${opOrb('o1', 1300, 420, 22)}${opJet('j1', 700, 640, 0.9)}`, `${vgTag('recon')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.to($('#o1'), { x: 800, y: -100, scale: 0.3, svgOrigin: '1300 420', duration: s.t1 - s.t0, ease: 'power2.in' }, s.t0); tl.to($('#j1'), { scaleX: -1, svgOrigin: '700 640', duration: 1.2 }, s.t0 + 1.5); tl.to($('#j1'), { x: -900, duration: s.t1 - s.t0 - 2.8 }, s.t0 + 2.8); } },

  // ================================================================ Jaguar 116
  jg116: { bg: '#000', html: () => bzShot(opFull('mirage-fab.jpg'), `${vgTag('foto')}${opTime('tm', '22:48', 'ANÁPOLIS (GO)')}${opName('nm', 'JAGUAR 116 • MIRAGE F-103', 'CAP. ARMINDO SOUSA VIRIATO DE FREITAS')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.1, 1.25, 900, 560); opPop(tl, $('#tm'), s.t0, K('h')); tl.to($('#tm'), { opacity: 0, duration: 0.4 }, K('h') + 2.2); opPop(tl, $('#nm'), s.t0, K('h') + 2.4); } },
  lock: { bg: '#020a06', html: () => bzShot(opRadar([[0, -230]]), `${vgTag('recon')}<g id="lk"><rect x="920" y="270" width="80" height="80" fill="none" stroke="#ff4a3a" stroke-width="6"/><text x="1020" y="300" font-family="monospace" font-size="34" fill="#ff8a7a">24 KM</text></g>`),
    anim(tl, s, K, $) { opSweep(tl, $(''), s.t0, s.t1); opPop(tl, $('#lk'), s.t0, K('l')); tl.fromTo($('#lk'), { opacity: 1 }, { opacity: 0.4, duration: 0.25, yoyo: true, repeat: 9 }, K('l') + 0.4); } },
  vanish: { bg: '#020a06', html: () => bzShot(opRadar([[0, -60]]), `${vgTag('recon')}<text id="dkm" x="960" y="960" text-anchor="middle" font-family="monospace" font-size="54" fill="#ff8a7a">1,8 KM</text>`),
    anim(tl, s, K, $) { opSweep(tl, $(''), s.t0, s.t1); tl.set($('.pl'), { opacity: 0 }, K('v')); tl.set($('.pl'), { opacity: 1, x: 140, y: -200 }, K('v') + 1.6); tl.set($('#dkm'), { opacity: 0 }, K('v')); } },
  zip: { bg: '#02040c', html: () => bzShot(`${opSky()}${opJet('j1', 600, 600, 1.0, true)}${opOrb('o1', 1000, 560, 20)}`, `${vgTag('recon')}${vgBig('ss', 'MACH 1,05', '#efe9d6', BZ.ink, 160, -2, 80)}`),
    anim(tl, s, K, $) { tl.to($('#j1'), { x: 250, duration: K('z') - s.t0 }, s.t0); tl.to($('#o1'), { x: 900, y: -260, duration: 0.5, ease: 'power3.in' }, K('z')); opPop(tl, $('#ss'), s.t0, s.t0 + 0.4); } },
  mach15: { bg: '#07060a', html: () => bzShot(`<rect width="1920" height="1080" fill="#07060a"/>${bzRays('ry', 960, 540, 16, 1300, '#e0302a', 0.12)}`, `${bzNum('mn', 'MACH 15', 960, 520, '#efe9d6', 260)}${bzNum('kh', '≈ 18.000 KM/H', 960, 720, '#f6c744', 110)}`),
    anim(tl, s, K, $) { bzShow(tl, $('#mn'), K('m')); bzShow(tl, $('#kh'), K('m') + 1.2); tl.fromTo($('#ry'), { rotation: 0 }, { rotation: 20, svgOrigin: '960 540', duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  noeye: { bg: '#02040c', html: () => bzShot(`${opSky()}${opCockpit()}`, `${vgTag('recon')}${vgBig('nd', 'NADA A OLHO NU', '#efe9d6', BZ.ink, 160, -2, 80)}`),
    anim(tl, s, K, $) { opPop(tl, $('#nd'), s.t0, s.t0 + 1.0); bzHandheld(tl, $('#cam'), s.t0, s.t1, 4); } },

  // ================================================================ Jambock 07
  jb07: { bg: '#000', html: () => bzShot(opFull('f5-sbco.jpg'), `${vgTag('foto')}${opTime('tm', '22:50', 'SANTA CRUZ (RJ)')}${opName('nm', 'JAMBOCK 07 • F-5E', 'CAP. MÁRCIO BRISOLLA JORDÃO')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.3, 1.15, 1100, 480); opPop(tl, $('#tm'), s.t0, K('h')); tl.to($('#tm'), { opacity: 0, duration: 0.4 }, K('h') + 2.2); opPop(tl, $('#nm'), s.t0, K('h') + 2.4); } },
  tail13: { bg: '#020a06', html: () => bzShot(`${opRadar([...Array(13)].map((_, i) => [-40 + (i % 4) * 26, 120 + Math.floor(i / 4) * 30]))}<g id="me"><path d="M960 500 l -18 40 h 36 z" fill="#f6c744"/></g>`, `${vgTag('recon')}${bzNum('n13', '13 ALVOS NA CAUDA', 960, 200, '#ff8a7a', 90)}`),
    anim(tl, s, K, $) { opSweep(tl, $(''), s.t0, s.t1); tl.set($('.pl'), { opacity: 0 }, s.t0); tl.to($('.pl'), { opacity: 1, duration: 0.05, stagger: 0.06 }, K('t') - 0.6); bzShow(tl, $('#n13'), K('t')); } },
  turn: { bg: '#02040c', html: () => bzShot(`${opSky()}${opJet('j1', 960, 560, 1.1)}`, `${vgTag('recon')}${vgBig('tr', 'CURVA DE 180°', '#efe9d6', BZ.ink, 160, -2, 80)}`),
    anim(tl, s, K, $) { tl.to($('#j1'), { scaleX: -1, svgOrigin: '960 560', duration: 1.4, ease: 'power1.inOut' }, s.t0 + 0.6); opPop(tl, $('#tr'), s.t0, s.t0 + 0.4); } },
  'q-pil2': { bg: '#07090c', html: () => bzShot(`${opWave('PILOTO • JAMBOCK 07')}<g opacity="0.5">${[...Array(8)].map((_, i) => `<path d="M${200 + i * 200} 650 l 120 -80" stroke="#3aff8a" stroke-width="5"/>`).join('')}</g>`, vgTag('recon')), anim(tl, s, K, $) { opWaveGo(tl, $(''), s.t0, s.t1); } },

  // ================================================================ Jaguar 98
  jg98: { bg: '#000', html: () => bzShot(opFull('f103-anapolis.jpg'), `${vgTag('foto')}${opTime('tm', '23:17', 'ANÁPOLIS (GO)')}${opName('nm', 'JAGUAR 98 • MIRAGE F-103', 'CAP. RODOLFO DA SILVA SOUZA')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.25, 1.1, 1000, 520); opPop(tl, $('#tm'), s.t0, K('h')); tl.to($('#tm'), { opacity: 0, duration: 0.4 }, K('h') + 2.2); opPop(tl, $('#nm'), s.t0, K('h') + 2.4); } },
  pattern: { bg: '#020a06', html: () => bzShot(`${opRadar([[0, 90]])}<g id="me"><path d="M960 520 l -18 40 h 36 z" fill="#f6c744"/></g>`, vgTag('recon')),
    anim(tl, s, K, $) { opSweep(tl, $(''), s.t0, s.t1); for (let i = 0; i < 6; i++) { const t = s.t0 + 0.6 + i * ((s.t1 - s.t0 - 1) / 6); tl.set($('.pl'), { x: i % 2 ? 0 : 0, y: i % 2 ? -200 : 0 }, t); tl.to($('#me'), { rotation: i * 60, svgOrigin: '960 540', duration: 0.5 }, t); } } },
  'q-ctrl': { bg: '#07090c', html: () => bzShot(opWave('CONTROLE • DEFESA AÉREA'), vgTag('recon')), anim(tl, s, K, $) { opWaveGo(tl, $(''), s.t0, s.t1); } },
  sixoclock: { bg: '#0e1a30', html: () => bzShot(`<rect width="1920" height="1080" fill="#0e1a30"/><circle cx="960" cy="540" r="360" fill="none" stroke="#3a5a86" stroke-width="6"/>${['12', '3', '6', '9'].map((h, i) => `<text x="${960 + Math.sin(i * Math.PI / 2) * 420}" y="${555 - Math.cos(i * Math.PI / 2) * 420}" text-anchor="middle" font-family="Anton" font-size="64" fill="#8ac0ff">${h}</text>`).join('')}${opJetTop('jt', 960, 540, 1.3)}<g id="bogey">${opOrb('o1', 960, 820, 22, '#ff4a3a')}</g>`, `${vgTag('recon')}${vgBig('sx', '"SEMPRE ÀS SUAS 6 HORAS"', '#efe9d6', BZ.ink, 120, -2, 72)}`),
    anim(tl, s, K, $) { opPop(tl, $('#sx'), s.t0, s.t0 + 0.6); tl.to($('#jt'), { rotation: 90, svgOrigin: '960 540', duration: 1.2 }, s.t0 + 2.5); tl.set($('#bogey'), { x: 280, y: -280 }, s.t0 + 3.2); tl.to($('#jt'), { rotation: 180, svgOrigin: '960 540', duration: 1.2 }, s.t0 + 5); tl.set($('#bogey'), { x: 0, y: -560 }, s.t0 + 5.6); } },
  mechanics: { bg: '#02040c', html: () => bzShot(`${opApron()}${[700, 960, 1220].map((x, i) => bzChar('mc' + i, OP_MEC, x, 980, 1.0, i === 2)).join('')}`, `${vgTag('recon')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { for (let i = 0; i < 3; i++) { bzFace(tl, $('#mc' + i), s.t0, 'dot', 'flat'); tl.fromTo($(`#mc${i} .hd`), { rotation: -8, transformOrigin: '50% 90%' }, { rotation: 8, duration: 0.3, yoyo: true, repeat: 5 }, s.t1 - 3 + i * 0.2); } } },

  // ================================================================ the last Mirage
  last: { bg: '#000', html: () => bzShot(opFull('mirage-fab.jpg'), `${vgTag('foto')}${opTime('tm', '23:36', 'O ÚLTIMO CAÇA')}${opName('nm', 'MIRAGE F-103', 'CAP. JÚLIO CÉZAR ROZENBERG')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.0, 1.12, 700, 600); opPop(tl, $('#tm'), s.t0, K('h')); tl.to($('#tm'), { opacity: 0, duration: 0.4 }, K('h') + 2.2); opPop(tl, $('#nm'), s.t0, K('h') + 2.4); } },
  three: { bg: '#020a06', html: () => bzShot(opRadar([[60, -80]]), `${vgTag('recon')}${['a', 'b', 'c'].map((k, i) => `<g id="${k}"><text x="${400 + i * 560}" y="190" text-anchor="middle" font-family="Anton" font-size="72" fill="#ff8a7a">${i + 1}ª • 1,8 KM</text></g>`).join('')}`),
    anim(tl, s, K, $) { opSweep(tl, $(''), s.t0, s.t1); opBlink(tl, $(''), s.t0, s.t1); opPop(tl, $('#a'), s.t0, K('a')); opPop(tl, $('#b'), s.t0, K('b')); opPop(tl, $('#c'), s.t0, K('c')); } },
  landing: { bg: '#07060a', html: () => bzShot(`${opFull('nasa-terra-noite.jpg')}<rect width="1920" height="1080" fill="#000" opacity="0.6"/>`, `${opTime('tm', '00:30', '20 DE MAIO • O ÚLTIMO POUSO')}${['5 CAÇAS', '2 HORAS', '21 ALVOS', '0 IDENTIFICADOS'].map((t, i) => `<g class="sm"><text x="${300 + i * 440}" y="770" text-anchor="middle" font-family="Anton" font-size="${i === 3 ? 76 : 90}" fill="${i === 3 ? '#e0302a' : '#efe9d6'}">${t}</text></g>`).join('')}`),
    anim(tl, s, K, $) { opPop(tl, $('#tm'), s.t0, s.t0 + 0.3); tl.fromTo($('.sm'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.7 }, K('s') - 1.5); } },

  // ================================================================ the press conference
  press: { bg: '#2a3048', html: () => bzShot(opPress(), `${vgTag('recon')}${vgCard('cd', '23 DE MAIO DE 1986 • 16H30', 'MIN. OCTÁVIO JÚLIO MOREIRA LIMA')}`),
    anim(tl, s, K, $) { tl.fromTo($('.fl'), { opacity: 0 }, { opacity: 0.8, duration: 0.06, yoyo: true, repeat: 1, stagger: { each: 0.7, repeat: 3 } }, s.t0 + 0.5); opPop(tl, $('#cd'), s.t0, K('d')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 960, 520); } },
  'q-min': { bg: '#2a3048', html: () => bzShot(`<g transform="translate(-960 -500) scale(2)">${opPress()}</g>`, `${vgTag('recon')}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzTalk(tl, $('#of1'), 'ap_min', s.t0, s.t1, 'flat', 'open'); tl.fromTo($('.fl'), { opacity: 0 }, { opacity: 0.7, duration: 0.06, yoyo: true, repeat: 1, stagger: { each: 0.9 } }, s.t0 + 0.3); } },
  oficial: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}`, `${vgStamp('st', 'NOITE OFICIAL DOS OVNIS', 960, 520, 110)}`),
    anim(tl, s, K, $) { opPop(tl, $('#st'), s.t0, K('s')); bzQuake(tl, $('#cam'), K('s'), K('s') + 0.3, 8); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  nopaper: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}`, `${bzNum('yy', '23 ANOS', 960, 560, '#efe9d6', 220)}`),
    anim(tl, s, K, $) { bzShow(tl, $('#yy'), K('y')); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1, 960, 560); } },

  // ================================================================ 2009: the report
  release: { bg: '#000', html: () => bzShot(opFull('arquivo-nacional.jpg'), `${vgTag('foto')}${vgCard('cd', '25 DE SETEMBRO DE 2009', 'O RELATÓRIO É LIBERADO')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.1, 1.25, 1200, 520, -80); opPop(tl, $('#cd'), s.t0, K('d')); } },
  report: { bg: '#100c0e', html: () => bzShot(opReport(), vgTag('doc')), anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 960, 400); } },
  'q-doc': { bg: '#100c0e', html: () => bzShot(opReport(), vgTag('doc')),
    anim(tl, s, K, $) { tl.to($('#hlr'), { opacity: 0.55, duration: 0.8 }, s.t0 + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1.3, 1.6, 960, 660); } },
  solid: { bg: '#07060a', html: () => bzShot(`<rect width="1920" height="1080" fill="#07060a"/>`, `${['SÓLIDOS.', 'INTELIGENTES.', 'EM FORMAÇÃO.'].map((t, i) => `<g id="${'abc'[i]}"><text x="960" y="${380 + i * 170}" text-anchor="middle" font-family="Anton" font-size="150" fill="${i === 1 ? '#e0302a' : '#efe9d6'}">${t}</text></g>`).join('')}`),
    anim(tl, s, K, $) { opPop(tl, $('#a'), s.t0, K('a')); opPop(tl, $('#b'), s.t0, K('b')); opPop(tl, $('#c'), s.t0, K('c')); } },
  list: { bg: '#0e1a30', html: () => bzShot(`<rect width="1920" height="1080" fill="#0e1a30"/>`, `${vgBig('lb', 'O QUE O RELATÓRIO DESCREVE', '#efe9d6', BZ.ink, 130, -2, 72)}${[['a', 'PARADO → SUPERSÔNICO'], ['b', '1.500 M → 12.000 M DE ALTITUDE'], ['c', 'LUZ BRANCA, VERDE, VERMELHA… OU NENHUMA'], ['d', 'CURVAS DE 90 GRAUS']].map(([k, t], i) => `<g id="${k}"><circle cx="360" cy="${330 + i * 150}" r="22" fill="#e0302a"/><text x="420" y="${352 + i * 150}" font-family="Anton" font-size="72" fill="#efe9d6">${t}</text></g>`).join('')}`),
    anim(tl, s, K, $) { opPop(tl, $('#lb'), s.t0, s.t0 + 0.3); for (const k of ['a', 'b', 'c', 'd']) opPop(tl, $('#' + k), s.t0, K(k)); } },
  audio: { bg: '#07090c', html: () => bzShot(`${opWave('ÁUDIOS DE 19/05/1986')}${opPrint('pr', 'arquivo-nacional.jpg', 1500, 820, 420, 260, 4, 'ARQUIVO NACIONAL • 2015')}`, vgTag('audio')),
    anim(tl, s, K, $) { opWaveGo(tl, $(''), s.t0, s.t1); tl.fromTo($('#pr'), { y: 400 }, { y: 0, duration: 0.6, ease: 'power2.out' }, s.t0 + 0.8); } },

  // ================================================================ explanations
  skeptic: { bg: '#0e1a30', html: () => bzShot(opInversion(), vgBig('pa', 'PROPAGAÇÃO ANÔMALA', '#efe9d6', BZ.ink, 120, -2, 72)),
    anim(tl, s, K, $) { tl.to($('#beam'), { strokeDashoffset: 0, duration: 2.5 }, s.t0 + 0.5); opFade(tl, $('#ghost'), s.t0, s.t0 + 3.0); opPop(tl, $('#pa'), s.t0, s.t0 + 0.4); } },
  planets: { bg: '#000', html: () => bzShot(opFull('nasa-lua-venus.jpg'), `${vgTag('foto')}<g id="vl" opacity="0"><circle cx="337" cy="603" r="50" fill="none" stroke="#f6c744" stroke-width="6"/><text x="337" y="500" text-anchor="middle" font-family="Anton" font-size="56" fill="#f6c744" stroke="${BZ.ink}" stroke-width="8" paint-order="stroke">VÊNUS</text></g>${vgCard('cd', 'PLANETAS, AVIÕES, BALÕES?', 'LUA E VÊNUS • BALÃO METEOROLÓGICO (FOTOS: NASA)')}${opPrint('bp', 'nasa-balao.jpg', 1450, 380, 520, 350, 4, 'BALÃO METEOROLÓGICO')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1, 1.1, 960, 540); opPop(tl, $('#cd'), s.t0, s.t0 + 0.3); opFade(tl, $('#vl'), s.t0, s.t0 + 0.8, 0.4); tl.fromTo($('#bp'), { y: 700 }, { y: 0, duration: 0.5, ease: 'back.out(1.4)', immediateRender: true }, K('b')); } },
  double: { bg: '#07060a', html: () => bzShot(`<g><rect width="960" height="1080" fill="#02040c"/><g transform="translate(-480 0)">${opSky()}</g>${opOrb('o1', 480, 420, 24)}</g><g transform="translate(960 0)"><rect width="960" height="1080" fill="#020a06"/><g transform="translate(-480 0)">${opRadar([[0, -120]])}</g></g><path d="M960 0 V1080" stroke="#efe9d6" stroke-width="8"/>`, `<g id="vr">${vgBig('vv', 'VISÃO + RADAR', '#f6c744', BZ.ink, 120, -2, 90)}</g>`),
    anim(tl, s, K, $) { opOrbColors(tl, $('#o1'), s.t0, s.t1); opBlink(tl, $(''), s.t0, s.t1); opPop(tl, $('#vr'), s.t0, K('v')); } },
  open: { bg: '#000', html: () => bzShot(opFull('arquivo-nacional.jpg'), `${vgTag('foto')}${vgBig('mp', 'O ACERVO MAIS PROCURADO', '#efe9d6', BZ.ink, 140, -2, 76)}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.2, 1.0, 960, 500); opPop(tl, $('#mp'), s.t0, s.t1 - 3.0); } },

  // ================================================================ the end
  ask: { bg: '#100c0e', html: () => bzShot(`${vgArchive()}`, `${[['a', 'ERRO DE RADAR', '#3a7aff'], ['b', 'AVIÃO SECRETO', '#3aa05a'], ['c', '???', '#e0302a']].map(([k, t, c], i) => `<g id="${k}"><g transform="translate(${460 + i * 500} 520) rotate(${(i - 1) * 3})"><rect x="-220" y="-120" width="440" height="240" rx="20" fill="${c}" ${bzO('stroke-width="8"')}/><text y="30" text-anchor="middle" font-family="Anton" font-size="${k === 'c' ? 120 : 64}" fill="#fff">${t}</text></g></g>`).join('')}${vgBig('lb', 'O QUE ERA? COMENTA:', BZ.yellow, BZ.ink, 160, -3, 84)}`),
    anim(tl, s, K, $) { opPop(tl, $('#lb'), s.t0, s.t0 + 0.4); opPop(tl, $('#a'), s.t0, K('a')); opPop(tl, $('#b'), s.t0, K('b')); opPop(tl, $('#c'), s.t0, K('c')); } },
  next: { bg: '#05060a', html: () => bzShot(opMasks(), `${vgCard('cd', 'PRÓXIMO ARQUIVO', 'AS MÁSCARAS DE CHUMBO • NITERÓI, 1966')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 960, 520); opPop(tl, $('#cd'), s.t0, s.t0 + 0.8); } },
  end: { bg: '#0a0812', html: () => bzShot(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85, 'CASO Nº 002', 'EM ABERTO')}<g id="eo" opacity="0">${opOrb('o9', 1500, 240, 20)}</g>`, `<rect id="dk" width="1920" height="1080" fill="#000" opacity="0"/>${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzQuake(tl, $('#cam'), K('c'), K('c') + 0.3, 8); tl.to($('#dk'), { opacity: 0.9, duration: 0.8 }, K('c') + 0.4); tl.to($('#eo'), { opacity: 1, duration: 0.2 }, K('z')); tl.to($('#eo'), { x: 500, y: -300, duration: 0.6, ease: 'power3.in' }, K('z') + 0.6); } },

  // ================================================================ added: more real photos and explainers
  echo: { bg: '#0e1a30', html: () => bzShot(opEcho(), ''),
    anim(tl, s, K, $) { const st = $('.st'); tl.set(st, { opacity: 0 }, s.t0); tl.to(st, { opacity: 1, duration: 0.3, stagger: 1.6 }, K('a')); tl.set($('#pulse'), { opacity: 1 }, K('a')); tl.fromTo($('#pulse'), { x: 0, y: 0 }, { x: 980, y: -130, duration: 1.4, ease: 'none' }, K('a')); tl.set($('#pulse'), { opacity: 0 }, K('a') + 1.4); tl.set($('#back'), { opacity: 1 }, K('a') + 1.5); tl.fromTo($('#back'), { x: 0, y: 0 }, { x: -980, y: 120, duration: 1.4, ease: 'none' }, K('a') + 1.5); tl.set($('#back'), { opacity: 0 }, K('a') + 2.9); opFade(tl, $('#scr'), s.t0, K('a') + 3.0, 0.4); tl.fromTo($('.wo'), { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 7, stagger: 0.15 }, K('a')); } },
  cmap: { bg: '#0e1a30', html: () => bzShot(`<rect width="1920" height="1080" fill="#0e1a30"/><g id="ph"><rect x="960" y="60" width="880" height="900" rx="12" fill="#fff"/><image href="assets/mapa-cindacta.jpg" x="980" y="80" width="840" height="860" preserveAspectRatio="xMidYMid meet"/></g>`, `${vgTag('doc')}${bzSign('t1', 'CINDACTA', 480, 330, -2, BZ.yellow, BZ.ink, 110)}${vgCard('cd', '4 CENTROS VIGIAM O CÉU', 'CINDACTA I (BRASÍLIA) JÁ EXISTIA EM 1986')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1, 1.08, 1400, 600); opPop(tl, $('#t1'), s.t0, s.t0 + 0.3); opPop(tl, $('#cd'), s.t0, s.t0 + 0.8); } },
  santacruz: opPhoto('base-santacruz.jpg', 'BASE AÉREA DE SANTA CRUZ', 'RIO DE JANEIRO (FOTO ATUAL)', 1.05, 1.2, 760, 520, -40),
  anapolis: opPhoto('f103-anapolis.jpg', 'BASE AÉREA DE ANÁPOLIS', 'MIRAGE F-103 • GOIÁS', 1, 1.15, 700, 600, 40),
  atcscreen: opPhoto('radar-atc.jpg', 'TELA DE RADAR', 'CADA PONTO É UM ECO', 1.05, 1.3, 1000, 520),
  anaradar: opPhoto('radar-antena.jpg', 'RADAR DE ANÁPOLIS', 'ECOS QUE BRASÍLIA NÃO VIA', 1, 1.18, 960, 380),
  machexp: { bg: '#000', html: () => bzShot(opFull('nasa-schlieren.jpg'), `${vgTag('foto')}${vgCard('cd', 'VELOCIDADE DO SOM ≈ 1.200 KM/H', 'ONDAS DE CHOQUE DE UM JATO SUPERSÔNICO (NASA)')}`),
    anim(tl, s, K, $) { opKen(tl, $('#ph'), s.t0, s.t1, 1.1, 1.3, 700, 300); opPop(tl, $('#cd'), s.t0, s.t0 + 0.4); } },
  f5sea: opPhoto('f5-escolta.jpg', 'MEIA HORA SOBRE O MAR', 'F-5 DA FAB (FOTO ILUSTRATIVA)', 1.1, 1.25, 1100, 500, -80),
  machcmp: { bg: '#07060a', html: () => bzShot(opSpeeds(), ''),
    anim(tl, s, K, $) { for (const k of ['a', 'b', 'c', 'd']) { tl.set($('#' + k), { opacity: 0 }, s.t0); tl.to($('#' + k), { opacity: 1, duration: 0.2 }, K(k)); tl.fromTo($(`#${k} .bar`), { scaleX: 0 }, { scaleX: 1, svgOrigin: '100 0', duration: k === 'd' ? 1.6 : 0.6, ease: 'power2.out' }, K(k)); } } },
  hangar: opPhoto('hangar2.jpg', 'BASE AÉREA DE SANTA CRUZ', 'O HANGAR DO ZEPELIM (FOTO ILUSTRATIVA)', 1, 1.12, 960, 500, 50),
  skradar: opPhoto('radar-atc.jpg', 'RADAR ERRA?', 'ECOS FALSOS EXISTEM', 1.3, 1.05, 900, 520),
  coast: opPhoto('nasa-luzes-costa.jpg', 'O LITORAL DO BRASIL À NOITE', 'VISTO DO ESPAÇO (NASA)', 1, 1.2, 1300, 500),
});
