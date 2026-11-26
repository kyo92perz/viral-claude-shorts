// ARQUIVO PROIBIDO, Caso Nº 002: A Noite Oficial dos OVNIs (16:9 documentary). Shared archive kit copied from Caso 001 (prefix vg), new pieces prefix op.
const VG_SPEC: Record<string, BzSpec> = {
  lil: { skin: '#c98757', tall: 0.94, hair: { style: 'long', color: '#2a1a12' }, top: '#e8547a', pants: '#3a5a8a', shoes: '#f0ece2' },
  val: { kid: true, tall: 1.12, skin: '#c98757', hair: { style: 'pony', color: '#3a2216' }, top: '#f6c744', pants: '#3a5a8a', shoes: '#e8e4dc' },
  kat: { skin: '#a8683e', hair: { style: 'afro', color: '#1c1410' }, top: '#2fa0a0', pants: '#2a3a5a', shoes: '#3a2a1a' },
  mae: { skin: '#b8784a', hair: { style: 'bun', color: '#2a1a12' }, top: '#8a5aa8', dress: '#8a5aa8', shoes: '#3a2a1a' },
  pm: { skin: '#c98757', hat: { kind: 'cap', color: '#3a3a2a' }, hair: { style: 'short', color: '#1c1410' }, top: '#b8a274', top2: '#8a7a54', belt: '#2a2018', badge: '#f6c744', pants: '#8a7a54', shoes: '#1c1410' },
  pm2: { skin: '#e0a070', hat: { kind: 'cap', color: '#3a3a2a' }, mustache: '#3a2216', hair: { style: 'short', color: '#3a2216' }, top: '#b8a274', top2: '#8a7a54', belt: '#2a2018', badge: '#f6c744', pants: '#8a7a54', shoes: '#1c1410' },
  bomb: { skin: '#c98757', hat: { kind: 'cap', color: '#f6c744' }, hair: { style: 'short', color: '#1c1410' }, top: '#c8342c', top2: '#f6c744', belt: '#2a2018', pants: '#2a2a3a', shoes: '#1c1410' },
  bomb2: { skin: '#e0a070', hat: { kind: 'cap', color: '#f6c744' }, mustache: '#2a1a12', hair: { style: 'short', color: '#2a1a12' }, top: '#c8342c', top2: '#f6c744', belt: '#2a2018', pants: '#2a2a3a', shoes: '#1c1410' },
  sold: { skin: '#b8784a', hat: { kind: 'beanie', color: '#4a5a3a' }, hair: { style: 'short', color: '#1c1410' }, top: '#5a6a44', top2: '#4a5a3a', belt: '#2a2018', pants: '#4a5a3a', shoes: '#1c1410' },
  ufo1: { skin: '#e0a070', hair: { style: 'short', color: '#5a4030' }, beard: '#5a4030', glasses: true, top: '#4a6a8a', pants: '#3a3a4a', shoes: '#3a2a1a' },
  ufo2: { skin: '#c98757', hair: { style: 'messy', color: '#2a1a12' }, mustache: '#2a1a12', top: '#e8e4dc', top2: '#c8342c', pants: '#4a4a5a', shoes: '#3a2a1a' },
  sitio: { skin: '#b8784a', hat: { kind: 'straw', color: '#e8c86a' }, mustache: '#5a4030', hair: { style: 'short', color: '#5a4030' }, top: '#e8e4dc', pants: '#4a5a6a', shoes: '#3a2a1a' },
  sitia: { skin: '#b8784a', hair: { style: 'bun', color: '#8a8a8a' }, top: '#5a8a5a', dress: '#5a8a5a', shoes: '#3a2a1a' },
  nurse: { skin: '#e0a070', hair: { style: 'bun', color: '#3a2216' }, top: '#e8f0f0', top2: '#8ac0c8', pants: '#e8f0f0', shoes: '#f0ece2' },
};
const vgChar = (k: string, id: string, x: number, y: number, s = 1, flip = false) => bzChar(id, VG_SPEC[k], x, y, s, flip);

// ---- the creature, as the girls described it: crouched (pose 'crouch') or standing. Origin at the feet; ~520 tall
// crouched / ~760 standing at s = 1. Classes: .mv (no transform), .hd (head: pivots at the neck), .eyes (the red glow),
// .shine (the oily highlights), .arm (the near arm).
function vgStreet(lights = true) {
  return `<g id="lay-bg">${bzSky('#05070f', '#1a2236')}${lights ? bzStars(40, 2, 400) : ''}
      ${[[0, 300, 260, '#4a4a5a', '#3a2a2a'], [330, 260, 220, '#3a3a4a', '#2a2a3a'], [640, 320, 280, '#4a4256', '#3a2a2a'], [1020, 280, 240, '#3a3a4a', '#2a2430'], [1360, 260, 220, '#4a4a5a', '#3a2a2a'], [1660, 300, 260, '#3a3a4a', '#2a2a3a']].map(([x, w, h, wa, ro]) => vgHouse(x as number, 760, w as number, h as number, wa as string, ro as string, lights)).join('')}</g>
    <g id="lay-mid"><rect x="-20" y="750" width="1960" height="360" fill="#22222a" ${bzO()}/>${[...Array(10)].map((_, i) => `<rect x="${i * 200}" y="905" width="110" height="14" fill="#c8b860" opacity="0.7"/>`).join('')}
      ${[200, 1000, 1760].map((lx) => bzLamp(lx, 790, 420, lights)).join('')}</g>`;
}
// falling rain/hail (#rain .dr), moved by vgRainGo
const vgRain = (id: string, n = 70, hail = false, seed = 3) => { let r = seed * 7919; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  return `<g id="${id}">${[...Array(n)].map(() => { const x = rnd() * 2000, y = rnd() * 1080; return hail ? `<circle class="dr" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(4 + rnd() * 4).toFixed(1)}" fill="#e8f0ff" opacity="0.85"/>` : `<path class="dr" d="M${x.toFixed(0)} ${y.toFixed(0)} l -10 46" stroke="#a8c0e8" stroke-width="3" opacity="0.55"/>`; }).join('')}</g>`; };
function vgRainGo(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, hail = false) {
  const d = hail ? 0.55 : 0.35, n = Math.max(1, Math.floor((t1 - t0) / d));
  tl.fromTo(`${sel} .dr`, { y: -1100 }, { y: 0, x: hail ? -60 : -220, duration: d, ease: 'none', repeat: n, stagger: { each: 0.01, from: 'random' } }, t0);
}
// the hospital corridor in perspective; doors; two armed men (#guards)
function vgArchive() {
  const shelf = (x: number) => `<g transform="translate(${x} 0)"><rect x="0" y="80" width="360" height="760" fill="#2a2420" ${bzO()}/>${[0, 1, 2, 3].map((r) => `<rect x="0" y="${200 + r * 180}" width="360" height="14" fill="#4a3a2a"/>${[0, 1, 2].map((c) => `<rect x="${18 + c * 114}" y="${100 + r * 180}" width="100" height="100" fill="#8a6a40" ${bzO('stroke-width="4"')}/><rect x="${44 + c * 114}" y="${130 + r * 180}" width="48" height="20" fill="#e8dcc0"/>`).join('')}`).join('')}</g>`;
  return `<rect width="1920" height="1080" fill="#100c0e"/>${shelf(60)}${shelf(1500)}<g opacity="0.4">${shelf(460)}${shelf(1100)}</g>
    ${bzGlow('lampg', 960, 640, 640, '#ffd27a', 0.3)}<rect x="300" y="780" width="1320" height="320" fill="#4a3020" ${bzO()}/>
    <g transform="translate(1440 780)"><path d="M0 0 L 30 -260 L -80 -360" stroke="${BZ.ink}" stroke-width="16" fill="none"/><path d="M-160 -400 L -40 -330 L -110 -260 Z" fill="#2a6a4a" ${bzO()}/></g>`;
}
// the folder: kraft cover with a red stamp, opening to typed pages (.pg lines .hl highlights)
function vgFolder(id: string, x: number, y: number, s = 1, title = 'IPM • 1997', stamp = 'CONFIDENCIAL') {
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
    <g class="open" opacity="0"><rect x="-470" y="-300" width="460" height="600" fill="#f4f0e4" ${bzO()}/><rect x="10" y="-300" width="460" height="600" fill="#f4f0e4" ${bzO()}/>
      ${[...Array(12)].map((_, i) => `<rect class="pg" x="-430" y="${-250 + i * 44}" width="${[380, 340, 390, 300, 370, 360, 280, 390, 330, 360, 300, 250][i]}" height="12" fill="#6a6058"/>`).join('')}
      ${[...Array(12)].map((_, i) => `<rect class="pg" x="50" y="${-250 + i * 44}" width="${[360, 390, 320, 380, 300, 370, 390, 340, 300, 380, 260, 330][i]}" height="12" fill="#6a6058"/>`).join('')}
      ${[2, 3, 4].map((i) => `<rect class="hl" x="44" y="${-262 + i * 44}" width="380" height="34" fill="#f6c744" opacity="0"/>`).join('')}
      ${[7, 8].map((i) => `<rect class="redact" x="-434" y="${-256 + i * 44}" width="320" height="26" fill="#1a1418" opacity="0"/>`).join('')}</g>
    <g class="cover"><rect x="-300" y="-380" width="600" height="760" rx="14" fill="#d8b46a" ${bzO('stroke-width="9"')}/><rect x="-300" y="-430" width="230" height="70" rx="12" fill="#c8a058" ${bzO()}/>
      <text x="0" y="-180" text-anchor="middle" font-family="Anton" font-size="78" fill="#2b2433">${title}</text><rect x="-200" y="-140" width="400" height="10" fill="#2b2433"/>
      <text x="0" y="-60" text-anchor="middle" font-family="Anton" font-size="40" fill="#5a4a30">COMANDO DE DEFESA AÉREA</text>
      <g class="stamp" transform="translate(0 140) rotate(-10)"><rect x="-250" y="-70" width="500" height="130" rx="14" fill="none" stroke="#e0302a" stroke-width="12"/><text x="0" y="30" text-anchor="middle" font-family="Anton" font-size="92" fill="#e0302a">${stamp}</text></g></g></g></g>`;
}
// the court building by day (columns) with a banner year
function vgCourt() {
  return `${bzSky('#5a9ae0', '#d8e8f4')}<rect x="-20" y="860" width="1960" height="240" fill="#b8b0a0" ${bzO()}/>
    <g transform="translate(960 860)"><rect x="-620" y="-80" width="1240" height="80" fill="#e8e4dc" ${bzO()}/><rect x="-560" y="-460" width="1120" height="380" fill="#f4f0e8" ${bzO()}/>
      ${[...Array(9)].map((_, i) => `<rect x="${-520 + i * 128}" y="-440" width="56" height="360" fill="#e0dcd0" ${bzO('stroke-width="5"')}/>`).join('')}<path d="M-620 -460 L 0 -640 L 620 -460 Z" fill="#e8e4dc" ${bzO()}/>
      <text x="0" y="-500" text-anchor="middle" font-family="Anton" font-size="56" fill="#2b2433">TRIBUNAL MILITAR</text></g>`;
}
// the title card: dark desk, the channel folder, the case number
function vgTitle() {
  return `<rect width="1920" height="1080" fill="#0a0812"/>${bzGlow('tg', 960, 520, 700, '#ffd27a', 0.18)}
    <g id="tf"><g transform="translate(960 560) rotate(-3)"><rect x="-560" y="-330" width="1120" height="660" rx="18" fill="#d8b46a" ${bzO('stroke-width="10"')}/><rect x="-560" y="-390" width="360" height="80" rx="14" fill="#c8a058" ${bzO()}/>
      <text x="0" y="-40" text-anchor="middle" font-family="Anton" font-size="170" fill="#1b1424" letter-spacing="4">ARQUIVO</text><text x="0" y="130" text-anchor="middle" font-family="Anton" font-size="170" fill="#e0302a" letter-spacing="4">PROIBIDO</text></g></g>
    <g id="tcase"><g transform="translate(1340 250) rotate(8)"><rect x="-230" y="-60" width="460" height="120" rx="12" fill="#e0302a" ${bzO('stroke-width="9"')}/><text x="0" y="36" text-anchor="middle" font-family="Anton" font-size="88" fill="#fff">CASO Nº 001</text></g></g>
    <g id="tname"><text x="960" y="1010" text-anchor="middle" font-family="Anton" font-size="84" fill="#efe9d6" stroke="#0a0812" stroke-width="10" paint-order="stroke" letter-spacing="3">O ET DE VARGINHA • 1996</text></g>`;
}
// documentary tags (top right): RELATO (yellow), DOCUMENTO (red), RECONSTITUIÇÃO (white)
const VG_TAGS: Record<string, [string, string, string]> = { relato: ['RELATO • SEM CONFIRMAÇÃO OFICIAL', '#f6c744', '#1b1424'], doc: ['DOCUMENTO OFICIAL', '#e0302a', '#fff'], recon: ['RECONSTITUIÇÃO', '#efe9d6', '#1b1424'] };
const vgTag = (kind: string) => { const [t, bg, fg] = VG_TAGS[kind]; const w = t.length * 19 + 50;
  return `<g id="tag"><rect x="${1880 - w}" y="40" width="${w}" height="56" rx="8" fill="${bg}" ${bzO('stroke-width="5"')}/><text x="${1880 - w / 2}" y="82" text-anchor="middle" font-family="Anton" font-size="34" fill="${fg}" letter-spacing="1">${t}</text></g>`; };
// a place/date card (bottom left, above the captions)
const vgCard = (id: string, t: string, sub = '') => `<g id="${id}"><rect x="60" y="640" width="${Math.max(t.length, sub.length * 0.62) * 34 + 70}" height="${sub ? 150 : 96}" rx="10" fill="#1b1424" opacity="0.85"/><rect x="60" y="640" width="12" height="${sub ? 150 : 96}" fill="#e0302a"/>
  <text x="100" y="712" font-family="Anton" font-size="62" fill="#efe9d6">${t}</text>${sub ? `<text x="100" y="768" font-family="Anton" font-size="38" fill="#f6c744">${sub}</text>` : ''}</g>`;

// =====================================================================
//  DOCUMENTARY KIT (prefix op): real photos (assets/, Wikimedia Commons, credits in assets/CREDITOS.txt) shown full bleed with
//  slow camera moves or as archive prints; an animated radar scope; the map of the bases and routes; time cards; the report
//  page; the radio waveform; animated reconstructions of the jets at night (tagged RECONSTITUIÇÃO).
// =====================================================================
Object.assign(VG_TAGS, { foto: ['FOTO REAL • ARQUIVO', '#efe9d6', '#1b1424'], audio: ['ÁUDIO REAL • ARQUIVO NACIONAL', '#3aa05a', '#fff'] });
// a photo filling the frame (#ph), cover-fit; dark gradient at the bottom for the captions
const opFull = (file: string, ox = 0.5, oy = 0.5) => `<g id="ph"><image href="assets/${file}" x="0" y="0" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/></g><rect y="700" width="1920" height="380" fill="url(#opfade)"/><defs><linearGradient id="opfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/></linearGradient></defs>`;
// Ken Burns: slow zoom from a to b around (ox, oy)
const opKen = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number, a = 1, b = 1.12, ox = 960, oy = 540, dx = 0) => tl.fromTo(sel, { scale: a, x: 0 }, { scale: b, x: dx, svgOrigin: `${ox} ${oy}`, duration: t1 - t0, ease: 'none' }, t0);
// an archive print: white border, slight rotation, tape, a small credit line
const opPrint = (id: string, file: string, x: number, y: number, w: number, h: number, rot = -3, cap = '') => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot})"><rect x="${-w / 2 - 20}" y="${-h / 2 - 20}" width="${w + 40}" height="${h + 80}" fill="#f4f0e4" ${bzO('stroke-width="4"')}/>
  <image href="assets/${file}" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/><rect x="-60" y="${-h / 2 - 40}" width="120" height="40" fill="#e8dcb0" opacity="0.8" transform="rotate(4)"/>
  ${cap ? `<text x="0" y="${h / 2 + 42}" text-anchor="middle" font-family="Anton" font-size="30" fill="#2b2433">${cap}</text>` : ''}</g></g>`;
// the radar scope: green circles, a sweeping beam (#sweep), plots (.pl) that blink
function opRadar(plots: number[][] = [], cx = 960, cy = 540, r = 420) {
  return `<rect width="1920" height="1080" fill="#020a06"/><g><circle cx="${cx}" cy="${cy}" r="${r}" fill="#03160c" stroke="#2aff7a" stroke-width="4"/>${[0.25, 0.5, 0.75].map((k) => `<circle cx="${cx}" cy="${cy}" r="${r * k}" fill="none" stroke="#2aff7a" stroke-width="2" opacity="0.4"/>`).join('')}
    <path d="M${cx - r} ${cy} H ${cx + r} M${cx} ${cy - r} V ${cy + r}" stroke="#2aff7a" stroke-width="2" opacity="0.35"/>
    <defs><linearGradient id="swg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2aff7a" stop-opacity="0"/><stop offset="1" stop-color="#2aff7a" stop-opacity="0.55"/></linearGradient></defs>
    <g id="sweep"><path d="M${cx} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx + r * Math.cos(0.5)} ${cy - r * Math.sin(0.5)} Z" fill="url(#swg)"/><path d="M${cx} ${cy} L ${cx + r} ${cy}" stroke="#7aff9a" stroke-width="4"/></g>
    <g id="plots">${plots.map(([x, y], i) => `<g class="pl"><rect x="${cx + x - 9}" y="${cy + y - 9}" width="18" height="18" fill="none" stroke="#c8ffd8" stroke-width="4"/><text x="${cx + x + 16}" y="${cy + y - 10}" font-family="monospace" font-size="18" fill="#7aff9a">${String(i + 1).padStart(2, '0')}</text></g>`).join('')}</g></g>
    <text x="${cx - r}" y="${cy + r + 50}" font-family="monospace" font-size="26" fill="#2aff7a" opacity="0.8">CINDACTA I • COPM • 19/05/1986</text>`;
}
const opSweep = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number, cx = 960, cy = 540) => tl.fromTo(`${sel} #sweep`, { rotation: 0 }, { rotation: -360 * Math.max(1, Math.round((t1 - t0) / 3)), svgOrigin: `${cx} ${cy}`, duration: t1 - t0, ease: 'none' }, t0);
const opBlink = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number) => tl.fromTo(`${sel} .pl`, { opacity: 0.2 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.4)), stagger: { each: 0.15, from: 'random' } }, t0);
// the map of south-east Brazil: coastline, the states, the bases and airports; routes (.rt) drawn with dashoffset
const OP_PLACES: Record<string, [number, number, string]> = { bsb: [820, 260, 'BRASÍLIA (CINDACTA I)'], ana: [700, 330, 'BASE AÉREA DE ANÁPOLIS'], sjc: [1150, 760, 'SÃO JOSÉ DOS CAMPOS'], gru: [1060, 770, 'GUARULHOS'], scz: [1290, 820, 'BASE AÉREA DE SANTA CRUZ'], rio: [1340, 800, ''] };
function opMap(routes: [string, string][] = []) {
  const land = `<path d="M200 80 L 1500 80 L 1560 420 Q 1600 600 1480 760 Q 1400 830 1300 850 Q 1180 880 1080 830 Q 900 900 760 1000 L 200 1000 Z" fill="#1a2a20" stroke="#4a7a5a" stroke-width="4"/>`;
  const states = `<path d="M600 200 L 960 180 L 1000 420 L 700 480 Z M960 180 L 1400 220 L 1450 600 L 1000 420 Z M700 480 L 1000 420 L 1150 700 L 900 900 L 650 760 Z" fill="none" stroke="#3a5a46" stroke-width="3" stroke-dasharray="10 8"/>`;
  const pts = Object.entries(OP_PLACES).map(([k, [x, y, n]]) => `<g class="pt-${k}"><circle cx="${x}" cy="${y}" r="12" fill="#f6c744" stroke="#1b1424" stroke-width="4"/>${n ? `<text x="${x + (k === 'gru' ? -24 : 22)}" y="${y + (k === 'gru' ? 44 : -16)}" ${k === 'gru' ? 'text-anchor="end"' : ''} font-family="Anton" font-size="30" fill="#efe9d6">${n}</text>` : ''}</g>`).join('');
  const rts = routes.map(([a, b], i) => { const [x0, y0] = OP_PLACES[a], [x1, y1] = OP_PLACES[b]; return `<path class="rt rt${i}" d="M${x0} ${y0} Q ${(x0 + x1) / 2 + 60} ${(y0 + y1) / 2 - 120} ${x1} ${y1}" stroke="#ff5a4a" stroke-width="8" fill="none" stroke-dasharray="1400" stroke-dashoffset="1400" stroke-linecap="round"/>`; }).join('');
  return `<rect width="1920" height="1080" fill="#0a1424"/><rect x="1480" y="80" width="440" height="1000" fill="#0c1a30"/>${land}${states}${rts}${pts}<text x="1700" y="560" text-anchor="middle" font-family="Anton" font-size="48" fill="#3a5a86" transform="rotate(-90 1700 560)">OCEANO ATLÂNTICO</text>`;
}
// a time card: big digital clock
const opTime = (id: string, t: string, sub = '') => `<g id="${id}"><rect x="660" y="330" width="600" height="${sub ? 300 : 220}" rx="20" fill="#0c0a10" opacity="0.88" stroke="#e0302a" stroke-width="6"/><text x="960" y="490" text-anchor="middle" font-family="Anton" font-size="150" fill="#ff4a3a">${t}</text>${sub ? `<text x="960" y="590" text-anchor="middle" font-family="Anton" font-size="46" fill="#efe9d6">${sub}</text>` : ''}</g>`;
// the radio waveform (.wb bars) with a transcript box
const opWave = (who: string) => `<rect width="1920" height="1080" fill="#07090c"/><g id="wave">${[...Array(64)].map((_, i) => `<rect class="wb" x="${300 + i * 21}" y="460" width="12" height="80" rx="6" fill="#3aff8a"/>`).join('')}</g><text x="960" y="300" text-anchor="middle" font-family="Anton" font-size="60" fill="#efe9d6">${who}</text><text x="960" y="370" text-anchor="middle" font-family="monospace" font-size="30" fill="#3aff8a">● REC  19/05/1986</text>`;
const opWaveGo = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number) => tl.fromTo(`${sel} .wb`, { scaleY: 0.2 }, { scaleY: 1.3, svgOrigin: '0 500', duration: 0.12, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.12)), stagger: { each: 0.02, from: 'random', repeat: 0 }, ease: 'sine.inOut' }, t0);
// a fighter jet seen from the side (F-5 / Mirage shapes), nose to the right; #id
const opJet = (id: string, x: number, y: number, s = 1, delta = false, lights = true) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${delta
  ? `<path d="M-200 10 L 160 0 L 230 6 L 160 16 L -200 20 Z" fill="#7a8494" stroke="#2b2433" stroke-width="5"/><path d="M-160 14 L 40 14 L -120 70 Z" fill="#6a7484" stroke="#2b2433" stroke-width="5"/><path d="M-200 10 L -230 -50 L -170 -50 L -140 10 Z" fill="#6a7484" stroke="#2b2433" stroke-width="5"/><path d="M60 0 Q 90 -26 130 0 Z" fill="#8ac0e8" stroke="#2b2433" stroke-width="4"/>`
  : `<path d="M-200 6 L 180 0 L 240 8 L 180 16 L -200 22 Z" fill="#8a94a0" stroke="#2b2433" stroke-width="5"/><path d="M-60 14 L 40 14 L -40 54 Z M-60 10 L 40 10 L -40 -30 Z" fill="#7a8494" stroke="#2b2433" stroke-width="5"/><path d="M-200 8 L -230 -46 L -180 -46 L -150 8 Z" fill="#7a8494" stroke="#2b2433" stroke-width="5"/><path d="M80 2 Q 110 -24 150 2 Z" fill="#8ac0e8" stroke="#2b2433" stroke-width="4"/>`}
  <ellipse cx="-230" cy="14" rx="40" ry="10" fill="#ffb04a" opacity="0.8"/>${lights ? '<circle cx="-40" cy="40" r="6" fill="#ff3a2a"/><circle cx="-40" cy="-20" r="6" fill="#3aff6a"/>' : ''}</g></g>`;
// the unknown light: a glowing orb that changes colour (.orb fill animated)
const opOrb = (id: string, x: number, y: number, r = 26, c = '#ffffff') => `<g id="${id}">${bzGlow('og' + id, x, y, r * 5, c, 0.4)}<circle class="orb" cx="${x}" cy="${y}" r="${r}" fill="${c}"/></g>`;
const opOrbColors = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number) => { const cs = ['#ffffff', '#ff4a3a', '#4aff8a', '#ffffff', '#ffb04a']; const n = Math.max(2, Math.floor((t1 - t0) / 0.8)); for (let i = 0; i < n; i++) tl.set(`${sel} .orb`, { attr: { fill: cs[i % cs.length] } }, t0 + i * 0.8); };
// the night sky at altitude (deep blue, stars, a full moon, the coast lights far below)
const opSky = (moon = true) => `${bzSky('#02040c', '#14203a')}${bzStars(140, 21, 900)}${moon ? `${bzGlow('mg', 1600, 200, 220, '#efe9d6', 0.18)}<circle cx="1600" cy="200" r="60" fill="#efe9d6" ${bzO('stroke-width="4"')}/>` : ''}<rect y="900" width="1920" height="180" fill="#05080f"/>${[...Array(50)].map((_, i) => `<circle cx="${(i * 197) % 1920}" cy="${920 + (i * 37) % 140}" r="${2 + (i % 3)}" fill="#ffd27a" opacity="0.7"/>`).join('')}`;
// the cockpit view (canopy frame + HUD)
const opCockpit = () => `<path d="M0 1080 L 0 820 Q 960 600 1920 820 L 1920 1080 Z" fill="#1a1c22" stroke="#2b2433" stroke-width="8"/><path d="M960 0 V 640" stroke="#1a1c22" stroke-width="40"/><g stroke="#3aff8a" stroke-width="3" fill="none" opacity="0.8"><circle cx="960" cy="420" r="60"/><path d="M880 420 h40 M1000 420 h40 M960 340 v40 M960 460 v40"/></g><text x="700" y="560" font-family="monospace" font-size="30" fill="#3aff8a" opacity="0.85">M 0.95</text><text x="1140" y="560" font-family="monospace" font-size="30" fill="#3aff8a" opacity="0.85">ALT 33000</text>`;
// a typed report page with a highlighted conclusion
const opReport = () => `<rect width="1920" height="1080" fill="#100c0e"/>${bzGlow('lp', 960, 520, 700, '#ffd27a', 0.25)}<g transform="translate(960 560) rotate(-2)"><rect x="-460" y="-500" width="920" height="1040" fill="#efe9d6" ${bzO()}/>
  <text x="-400" y="-420" font-family="monospace" font-size="30" fill="#2b2433">MINISTÉRIO DA AERONÁUTICA</text><text x="-400" y="-380" font-family="monospace" font-size="26" fill="#2b2433">COMANDO DE DEFESA AÉREA • 02 JUN 1986</text>
  ${[...Array(9)].map((_, i) => `<rect x="-400" y="${-320 + i * 36}" width="${[780, 720, 800, 600, 760, 700, 780, 560, 640][i]}" height="12" fill="#8a8070"/>`).join('')}
  <rect id="hlr" x="-410" y="10" width="820" height="230" fill="#f6c744" opacity="0"/>
  <text x="-400" y="50" font-family="monospace" font-size="30" fill="#2b2433">"OS FENÔMENOS SÃO SÓLIDOS E</text><text x="-400" y="95" font-family="monospace" font-size="30" fill="#2b2433">REFLETEM DE CERTA FORMA INTELIGÊNCIA,</text><text x="-400" y="140" font-family="monospace" font-size="30" fill="#2b2433">(...) VOAR EM FORMAÇÃO, NÃO</text><text x="-400" y="185" font-family="monospace" font-size="30" fill="#2b2433">FORÇOSAMENTE TRIPULADOS."</text>
  ${[...Array(6)].map((_, i) => `<rect x="-400" y="${280 + i * 36}" width="${[700, 760, 600, 720, 500, 640][i]}" height="12" fill="#8a8070"/>`).join('')}</g>`;
// the press conference (reconstruction): a long table with microphones, flashes (.fl), generic officers (no likeness)
const OP_OFF: BzSpec = { skin: '#c98757', hair: { style: 'short', color: '#3a2a1a' }, top: '#3a4a6a', top2: '#c8a040', pants: '#2a3448', shoes: '#1c1410', badge: '#f6c744' };
const opPress = () => `<rect width="1920" height="1080" fill="#2a3048"/><rect x="200" y="140" width="1520" height="200" fill="#1a2038" ${bzO()}/><text x="960" y="270" text-anchor="middle" font-family="Anton" font-size="80" fill="#c8a040">MINISTÉRIO DA AERONÁUTICA</text>
  ${[560, 960, 1360].map((x, i) => bzChar('of' + i, OP_OFF, x, 900, 1.0, i === 2)).join('')}<rect x="100" y="760" width="1720" height="320" fill="#6a4a30" ${bzO()}/>
  ${[...Array(9)].map((_, i) => `<g transform="translate(${400 + i * 140} 760)"><rect x="-8" y="-90" width="16" height="90" fill="#2b2433"/><ellipse cx="0" cy="-100" rx="22" ry="28" fill="#4a4a54" ${bzO('stroke-width="4"')}/></g>`).join('')}
  <g id="flashes">${[[200, 500], [1700, 420], [300, 300], [1600, 650], [960, 520]].map(([x, y]) => `<circle class="fl" cx="${x}" cy="${y}" r="90" fill="#fff" opacity="0"/>`).join('')}</g>`;
// the title card of this case
function opTitle() {
  return `<rect width="1920" height="1080" fill="#0a0812"/>${bzGlow('tg', 960, 520, 700, '#ffd27a', 0.18)}
    <g id="tf"><g transform="translate(960 560) rotate(-3)"><rect x="-560" y="-330" width="1120" height="660" rx="18" fill="#d8b46a" ${bzO('stroke-width="10"')}/><rect x="-560" y="-390" width="360" height="80" rx="14" fill="#c8a058" ${bzO()}/>
      <text x="0" y="-40" text-anchor="middle" font-family="Anton" font-size="170" fill="#1b1424" letter-spacing="4">ARQUIVO</text><text x="0" y="130" text-anchor="middle" font-family="Anton" font-size="170" fill="#e0302a" letter-spacing="4">PROIBIDO</text></g></g>
    <g id="tcase"><g transform="translate(1340 250) rotate(8)"><rect x="-230" y="-60" width="460" height="120" rx="12" fill="#e0302a" ${bzO('stroke-width="9"')}/><text x="0" y="36" text-anchor="middle" font-family="Anton" font-size="88" fill="#fff">CASO Nº 002</text></g></g>
    <g id="tname"><text x="960" y="1010" text-anchor="middle" font-family="Anton" font-size="84" fill="#efe9d6" stroke="#0a0812" stroke-width="10" paint-order="stroke" letter-spacing="3">A NOITE OFICIAL DOS OVNIS • 1986</text></g>`;
}

// ---------------------------------------------------------------- world test
defineVisuals({
  'test-photo': { bg: '#000', html: () => svg(`${opFull('aeroporto-sjc.jpg')}${vgTag('foto')}`), anim() {} },
  'test-prints': { bg: '#100c0e', html: () => svg(`${vgArchive()}${opPrint('p1', 'f5-fab.jpg', 620, 520, 640, 420, -4, 'F-5E • FAB')}${opPrint('p2', 'xingu.jpg', 1300, 540, 600, 400, 3, 'EMB-121 XINGU')}`), anim() {} },
  'test-radar': { bg: '#020a06', html: () => svg(opRadar([[120, -200], [-160, 80], [260, 140], [-60, -300], [200, -40]])), anim() {} },
  'test-map': { bg: '#0a1424', html: () => svg(opMap([['scz', 'sjc'], ['ana', 'bsb']])), anim(tl, s) { tl.set('#sc-test-map .rt', { strokeDashoffset: 0 }, s.t0); } },
  'test-sky': { bg: '#02040c', html: () => svg(`${opSky()}${opJet('j1', 700, 600, 1.2)}${opOrb('o1', 1500, 420)}${vgTag('recon')}`), anim() {} },
  'test-cockpit': { bg: '#02040c', html: () => svg(`${opSky()}${opOrb('o1', 960, 300, 18, '#ff4a3a')}${opCockpit()}`), anim() {} },
  'test-wave': { bg: '#07090c', html: () => svg(`${opWave('PILOTO • JAMBOCK 17')}${vgTag('recon')}`), anim() {} },
  'test-report': { bg: '#100c0e', html: () => svg(`${opReport()}${vgTag('doc')}`), anim(tl, s) { tl.set('#sc-test-report #hlr', { opacity: 0.55 }, s.t0); } },
  'test-press': { bg: '#2a3048', html: () => svg(`${opPress()}${vgTag('recon')}`), anim() {} },
  'test-title': { bg: '#0a0812', html: () => svg(opTitle()), anim() {} },
});
