// =====================================================================
//  ARQUIVO PROIBIDO, Caso Nº 001: Varginha (16:9, 1920 x 1080), in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix vg.
//  A documentary: the facts as the witnesses tell them ("RELATO" tag) and as the documents show them ("DOCUMENTO" tag).
//  Cast (original designs, no likeness of real people): Liliane, Valquíria and Kátia (the three girls), their mother,
//  two military policemen, firemen, an Army driver, two ufologists, a farm couple; the creature as the girls described
//  it (thin, oily brown skin, three bumps on the head, big red eyes, crouching); the man the inquiry pointed to, only
//  ever as a crouched silhouette in the rain (a real person: no face, no mockery).
//  Sets: the town (coffee hills, a church, rooftops) by day, at dusk in a hailstorm and at night; the empty lot with the
//  old wall; a farm at night with the object; the fire truck; a night street with the patrol car; a hospital corridor;
//  the road with Army trucks; a hospital room and a memorial; newspapers and a TV; the "ET town" today; the archive
//  room with the inquiry folder; the court; the title card.
//  Frame: ground line ~ y 900; captions at y 860–930 (keep faces above ~820). Adult head ~507*s above the feet.
// =====================================================================
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
function vgEt(id: string, x: number, y: number, s = 1, pose: 'crouch' | 'stand' = 'crouch', flip = false) {
  const K = '#6a4a2e', K2 = '#4a3220', st = pose === 'stand';
  const hy = st ? -640 : -430;   // head center
  const legs = st
    ? `<path d="M-40 -260 Q -60 -120 -50 0" stroke="${BZ.ink}" stroke-width="44" fill="none" stroke-linecap="round"/><path d="M-40 -260 Q -60 -120 -50 0" stroke="${K}" stroke-width="30" fill="none" stroke-linecap="round"/>
       <path d="M40 -260 Q 60 -120 50 0" stroke="${BZ.ink}" stroke-width="44" fill="none" stroke-linecap="round"/><path d="M40 -260 Q 60 -120 50 0" stroke="${K}" stroke-width="30" fill="none" stroke-linecap="round"/>`
    : `<path d="M-60 -10 Q -150 -150 -40 -240" stroke="${BZ.ink}" stroke-width="50" fill="none" stroke-linecap="round"/><path d="M-60 -10 Q -150 -150 -40 -240" stroke="${K}" stroke-width="36" fill="none" stroke-linecap="round"/>
       <path d="M60 -10 Q 150 -150 40 -240" stroke="${BZ.ink}" stroke-width="50" fill="none" stroke-linecap="round"/><path d="M60 -10 Q 150 -150 40 -240" stroke="${K2}" stroke-width="36" fill="none" stroke-linecap="round"/>`;
  const torso = st ? `<ellipse cx="0" cy="-400" rx="78" ry="160" fill="${K}" ${bzO()}/>` : `<ellipse cx="0" cy="-230" rx="96" ry="120" fill="${K}" ${bzO()}/>`;
  const arm = st
    ? `<g class="arm" transform="translate(70 -500)"><path d="M0 0 Q 40 150 20 300" stroke="${BZ.ink}" stroke-width="34" fill="none" stroke-linecap="round"/><path d="M0 0 Q 40 150 20 300" stroke="${K}" stroke-width="22" fill="none" stroke-linecap="round"/></g>`
    : `<g class="arm" transform="translate(60 -300)"><path d="M0 0 Q 90 90 -40 150" stroke="${BZ.ink}" stroke-width="34" fill="none" stroke-linecap="round"/><path d="M0 0 Q 90 90 -40 150" stroke="${K}" stroke-width="22" fill="none" stroke-linecap="round"/></g>`;
  const eye = (ex: number) => `<ellipse cx="${ex}" cy="${hy + 10}" rx="42" ry="32" transform="rotate(${ex < 0 ? 14 : -14} ${ex} ${hy + 10})" fill="#d81c1c" ${bzO('stroke-width="6"')}/><ellipse cx="${ex + (ex < 0 ? -10 : 10)}" cy="${hy}" rx="10" ry="7" fill="#ffb0a0"/>`;
  const head = `<g class="hd"><path d="M-130 ${hy - 10} Q -140 ${hy - 150} 0 ${hy - 160} Q 140 ${hy - 150} 130 ${hy - 10} Q 110 ${hy + 90} 0 ${hy + 110} Q -110 ${hy + 90} -130 ${hy - 10} Z" fill="${K}" ${bzO('stroke-width="8"')}/>
    ${[-70, 0, 70].map((bx) => `<path d="M${bx - 30} ${hy - 128} Q ${bx - 6} ${hy - 200 - (bx === 0 ? 20 : 0)} ${bx + (bx < 0 ? -12 : bx > 0 ? 12 : 0)} ${hy - 205 - (bx === 0 ? 20 : 0)} Q ${bx + 14} ${hy - 190 - (bx === 0 ? 20 : 0)} ${bx + 30} ${hy - 128} Z" fill="${K2}" ${bzO('stroke-width="6"')}/>`).join('')}
    <g class="eyes">${bzGlow('etg' + id, 0, hy + 10, 210, '#ff2a1a', 0.32)}${eye(-56)}${eye(56)}</g>
    <path d="M-22 ${hy + 70} q 22 8 44 0" stroke="${BZ.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <g class="shine"><ellipse cx="-70" cy="${hy - 70}" rx="26" ry="10" fill="#fff" opacity="0.28" transform="rotate(-30 -70 ${hy - 70})"/></g></g>`;
  const shine = `<g class="shine"><ellipse cx="-40" cy="${st ? -470 : -280}" rx="16" ry="40" fill="#fff" opacity="0.22"/><ellipse cx="30" cy="${st ? -330 : -170}" rx="10" ry="22" fill="#fff" opacity="0.18"/></g>`;
  return `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><ellipse cx="0" cy="6" rx="${st ? 120 : 170}" ry="22" fill="#000" opacity="0.3"/>
    ${legs}${torso}${shine}${head}${arm}</g></g></g>`;
}
// the creature trembles, breathes, the eyes pulse
function vgEtLive(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  const n = Math.max(2, Math.floor((t1 - t0) / 0.06));
  tl.fromTo(`${sel} .mv`, { x: -1.5 }, { x: 1.5, duration: 0.06, yoyo: true, repeat: n, ease: 'none' }, t0);
  tl.fromTo(`${sel} .eyes`, { opacity: 0.8 }, { opacity: 1, duration: 0.7, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.7)), ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .hd`, { rotation: -3, transformOrigin: '50% 100%' }, { rotation: 3, duration: 1.6, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 1.6)), ease: 'sine.inOut' }, t0);
}
// a silhouette crouched by the wall in the rain (the inquiry's explanation): no face, just a shape
const vgCrouch = (id: string, x: number, y: number, s = 1, c = '#141018') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-230" rx="100" ry="130" fill="${c}"/><circle cx="20" cy="-400" r="80" fill="${c}"/><path d="M-80 -10 Q -140 -150 -40 -230 M80 -10 Q 140 -150 40 -230" stroke="${c}" stroke-width="60" fill="none" stroke-linecap="round"/></g></g>`;

// ---- sets (1920 x 1080). Layers: #lay-bg / #lay-mid / #lay-fg for bzParallax
function vgHills(y: number, c: string, rows = '#4a6a3a') {   // coffee hills with rows of bushes
  return `<path d="M-40 ${y} Q 300 ${y - 160} 640 ${y - 60} T 1300 ${y - 90} T 1960 ${y - 40} V 1100 H -40 Z" fill="${c}" ${bzO()}/>
    ${[...Array(7)].map((_, i) => `<path d="M${-40 + i * 300} ${y + 40 + (i % 2) * 20} q 120 -30 260 0" stroke="${rows}" stroke-width="14" stroke-dasharray="18 14" fill="none" stroke-linecap="round"/>`).join('')}`;
}
function vgHouse(x: number, y: number, w: number, h: number, wall: string, roof: string, lit = false, door = true) {
  return `<g><rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}" ${bzO()}/><path d="M${x - 20} ${y - h} L ${x + w / 2} ${y - h - w * 0.32} L ${x + w + 20} ${y - h} Z" fill="${roof}" ${bzO()}/>
    <rect x="${x + w * 0.14}" y="${y - h * 0.72}" width="${w * 0.26}" height="${h * 0.3}" fill="${lit ? '#ffd97a' : '#2a3448'}" ${bzO('stroke-width="5"')}/>${door ? `<rect x="${x + w * 0.58}" y="${y - h * 0.62}" width="${w * 0.24}" height="${h * 0.62}" fill="#6a4a30" ${bzO('stroke-width="5"')}/>` : ''}</g>`;
}
function vgChurch(x: number, y: number, s = 1, lit = false) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-120" y="-300" width="240" height="300" fill="#efe9d6" ${bzO()}/><path d="M-140 -300 L 0 -400 L 140 -300 Z" fill="#c8a060" ${bzO()}/>
    ${[-1, 1].map((k) => `<rect x="${k * 150 - 45}" y="-460" width="90" height="460" fill="#efe9d6" ${bzO()}/><path d="M${k * 150 - 55} -460 L ${k * 150} -540 L ${k * 150 + 55} -460 Z" fill="#c8a060" ${bzO()}/><rect x="${k * 150 - 16}" y="-420" width="32" height="50" rx="16" fill="${lit ? '#ffd97a' : '#3a4458'}"/>`).join('')}
    <rect x="-40" y="-130" width="80" height="130" rx="40" fill="#6a4a30" ${bzO()}/><circle cx="0" cy="-220" r="34" fill="${lit ? '#ffd97a' : '#5a6a8a'}" ${bzO('stroke-width="5"')}/><path d="M0 -400 v -50 M-20 -430 h40" stroke="${BZ.ink}" stroke-width="8"/></g>`;
}
// the town: 'day' | 'dusk' (storm) | 'night'
function vgTown(mode: 'day' | 'dusk' | 'night' = 'day') {
  const sky = mode === 'day' ? bzSky('#7ab8e8', '#e8f0d8') : mode === 'dusk' ? bzSky('#2a2a3a', '#7a6a6a') : bzSky('#0a0e1c', '#24304a');
  const lit = mode === 'night';
  return `<g id="lay-bg">${sky}${mode === 'night' ? bzStars(60, 4, 500) + bzMoon('mn', 1600, 170, 50) : mode === 'day' ? bzSun(1580, 190, 70) : ''}
      ${vgHills(560, mode === 'day' ? '#6a9a4a' : mode === 'dusk' ? '#3a4a3a' : '#16241c', mode === 'day' ? '#3a6a2a' : '#0e1a12')}</g>
    <g id="lay-mid">${vgChurch(980, 760, 0.9, lit)}
      ${[[80, 300, 200, '#e8d8b8', '#c8542c'], [420, 220, 170, '#f0e0a8', '#a83a2a'], [1250, 260, 190, '#d8e0e8', '#c8542c'], [1560, 300, 210, '#f0d0b0', '#8a3a2a']].map(([x, w, h, wa, ro]) => vgHouse(x as number, 800, w as number, h as number, wa as string, ro as string, lit)).join('')}</g>
    <rect x="-20" y="790" width="1960" height="320" fill="${mode === 'day' ? '#8a7a5a' : mode === 'dusk' ? '#4a4038' : '#1e1c22'}" ${bzO()}/>
    <path d="M-20 900 H 1940" stroke="${mode === 'day' ? '#a8987a' : '#2e2a2a'}" stroke-width="40"/>`;
}
// the empty lot in Jardim Andere: overcast afternoon, an old brick wall, tall grass. Wall spans x 700–1700, top y 560.
function vgLot(dark = 0) {
  const bricks = [...Array(8)].map((_, r) => [...Array(14)].map((_, c) => `<rect x="${700 + c * 72 + (r % 2) * 36}" y="${580 + r * 40}" width="64" height="32" fill="none" stroke="#6a3a2a" stroke-width="3" opacity="0.45"/>`).join('')).join('');
  const tuft = (x: number, y: number, s: number, c: string) => `<path d="M${x} ${y} l ${-30 * s} ${-120 * s} l ${20 * s} ${100 * s} l ${10 * s} ${-150 * s} l ${10 * s} ${150 * s} l ${30 * s} ${-110 * s} l ${-10 * s} ${130 * s} Z" fill="${c}" ${bzO('stroke-width="4"')}/>`;
  return `<g id="lay-bg">${bzSky(dark ? '#2a2a3a' : '#8a94a8', dark ? '#5a5050' : '#d8c8a8')}
      ${[[60, 240, 170, '#e8d8b8', '#c8542c'], [360, 200, 150, '#d8e0c8', '#a83a2a'], [1500, 230, 160, '#f0e0a8', '#8a3a2a'], [1760, 220, 180, '#e0d0c0', '#c8542c']].map(([x, w, h, wa, ro]) => vgHouse(x as number, 560, w as number, h as number, wa as string, ro as string, false)).join('')}</g>
    <g id="lay-mid"><rect x="-20" y="540" width="1960" height="560" fill="${dark ? '#3a3a2a' : '#7a7a4a'}" ${bzO()}/>
      <rect x="700" y="560" width="1000" height="340" fill="#b8684a" ${bzO()}/>${bricks}<path d="M960 560 l 30 90 l -24 60 l 40 80 M1400 560 l -20 70 l 30 50" stroke="#4a2a1a" stroke-width="6" fill="none"/>
      <rect x="690" y="548" width="1020" height="22" fill="#9a5a3a" ${bzO('stroke-width="5"')}/>
      ${[...Array(16)].map((_, i) => tuft(40 + i * 120, 620 + (i % 3) * 30, 0.8, dark ? '#2a3a1a' : '#5a7a2a')).join('')}
      <rect x="-20" y="880" width="1960" height="220" fill="${dark ? '#3a3020' : '#8a7a4a'}" ${bzO()}/></g>
    <g id="lay-fg">${[...Array(9)].map((_, i) => tuft(-40 + i * 240, 1100, 1.6, dark ? '#1a2a10' : '#4a6a1e')).join('')}</g>`;
}
// a farm at night with a cigar/bus-shaped object (#ovni, .lights, #smoke)
function vgFarm() {
  return `<g id="lay-bg">${bzSky('#060a18', '#1e2a44')}${bzStars(80, 7, 700)}${vgHills(640, '#101c14', '#0a140e')}</g>
    <g id="lay-mid">${vgHouse(240, 860, 300, 200, '#d8c8a8', '#8a3a2a', true)}
      ${[...Array(12)].map((_, i) => `<rect x="${700 + i * 100}" y="790" width="14" height="110" fill="#4a3a2a" ${bzO('stroke-width="4"')}/>`).join('')}<path d="M690 815 H 1900 M690 855 H 1900" stroke="#4a3a2a" stroke-width="8"/>
      ${[[900, 900], [1250, 910], [1600, 895]].map(([cx, cy]) => `<g transform="translate(${cx} ${cy})"><ellipse cx="0" cy="-60" rx="90" ry="50" fill="#e8e4dc" ${bzO()}/><circle cx="80" cy="-90" r="32" fill="#e8e4dc" ${bzO()}/><rect x="-60" y="-30" width="16" height="40" fill="#2b2433"/><rect x="40" y="-30" width="16" height="40" fill="#2b2433"/><ellipse cx="-20" cy="-70" rx="26" ry="18" fill="#2b2433"/></g>`).join('')}
      <rect x="-20" y="890" width="1960" height="220" fill="#1a241a" ${bzO()}/></g>
    <g id="ovni"><g id="smoke">${[0, 1, 2, 3, 4].map((i) => `<circle class="pf" cx="${1700 - i * 120}" cy="${300 + i * 14}" r="${50 + i * 14}" fill="#8a8a9a" opacity="${0.35 - i * 0.05}"/>`).join('')}</g>
      <g transform="translate(1100 300)"><ellipse cx="0" cy="0" rx="260" ry="62" fill="#9aa0b0" ${bzO('stroke-width="9"')}/><ellipse cx="0" cy="-30" rx="150" ry="40" fill="#c8ccd8" ${bzO()}/>
        <g class="lights">${[-200, -120, -40, 40, 120, 200].map((lx, i) => `<circle cx="${lx}" cy="12" r="14" fill="${i % 2 ? '#ffd27a' : '#ff6a4a'}" ${bzO('stroke-width="4"')}/>`).join('')}</g>
        ${bzGlow('ovg', 0, 60, 260, '#ffd27a', 0.18)}</g></g>`;
}
// the fire truck (local origin at the rear wheel's ground point, faces right)
function vgFireTruck(x: number, y: number, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-80" y="-230" width="560" height="190" rx="18" fill="#c8342c" ${bzO()}/><rect x="380" y="-300" width="180" height="260" rx="20" fill="#c8342c" ${bzO()}/>
    <rect x="410" y="-275" width="120" height="90" rx="10" fill="#8ac0e8" ${bzO('stroke-width="5"')}/><rect x="-60" y="-260" width="420" height="20" fill="#d8d8e0" ${bzO('stroke-width="5"')}/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-40 + i * 70} -262 v 22" stroke="${BZ.ink}" stroke-width="5"/>`).join('')}
    <rect x="-60" y="-150" width="440" height="22" fill="#f6c744"/><text x="160" y="-170" text-anchor="middle" font-family="Anton" font-size="42" fill="#fff">BOMBEIROS</text>
    <rect x="460" y="-322" width="60" height="22" rx="8" fill="#ff3a2a" ${bzO('stroke-width="4"')}/>${[0, 430].map((wx) => `<circle cx="${wx}" cy="-20" r="56" fill="#2b2433"/><circle cx="${wx}" cy="-20" r="22" fill="#9aa0b0"/>`).join('')}</g>`;
}
// a crate under a tarp (#caixa)
const vgCrate = (x: number, y: number, s = 1) => `<g id="caixa"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-110" y="-130" width="220" height="130" fill="#a8783e" ${bzO()}/><path d="M-110 -65 H 110 M-40 -130 V 0 M40 -130 V 0" stroke="#6a4a2a" stroke-width="6"/>
  <path d="M-130 -110 Q -60 -170 0 -140 Q 70 -175 130 -110 L 120 -40 Q 0 -70 -120 -40 Z" fill="#3a5a3a" ${bzO()}/></g></g>`;
// the night street with lamps and the patrol car (#car faces right; .siren)
function vgCar(x: number, y: number, s = 1, label = 'POLÍCIA MILITAR') {
  return `<g id="car"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-260 -60 L -250 -140 L -140 -150 L -80 -230 L 140 -230 L 200 -150 L 280 -140 L 290 -60 Z" fill="#efe9d6" ${bzO()}/>
    <path d="M-60 -215 L 120 -215 L 165 -155 L -110 -155 Z" fill="#8ac0e8" ${bzO('stroke-width="5"')}/><path d="M30 -215 V -155" stroke="${BZ.ink}" stroke-width="6"/>
    <rect x="-255" y="-120" width="540" height="26" fill="#3a5a9a"/><text x="10" y="-70" text-anchor="middle" font-family="Anton" font-size="34" fill="#2b2433">${label}</text>
    <g class="siren"><rect x="-20" y="-262" width="44" height="32" rx="6" fill="#ff3a2a" ${bzO('stroke-width="4"')}/><rect x="24" y="-262" width="44" height="32" rx="6" fill="#3a7aff" ${bzO('stroke-width="4"')}/></g>
    <rect x="272" y="-130" width="24" height="26" fill="#fff4c8" ${bzO('stroke-width="4"')}/>${[-160, 180].map((wx) => `<circle cx="${wx}" cy="-50" r="50" fill="#2b2433"/><circle cx="${wx}" cy="-50" r="20" fill="#9aa0b0"/>`).join('')}</g></g>`;
}
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
function vgCorridor(guards = true) {
  return `<rect width="1920" height="1080" fill="#c8d4d0"/><path d="M0 0 L 760 330 L 1160 330 L 1920 0 Z" fill="#e8eeea" ${bzO()}/><path d="M0 1080 L 760 690 L 1160 690 L 1920 1080 Z" fill="#8a9a96" ${bzO()}/>
    <rect x="760" y="330" width="400" height="360" fill="#5a6a6a" ${bzO()}/><rect x="880" y="420" width="160" height="270" fill="#3a4444" ${bzO('stroke-width="5"')}/>
    ${[[160, 180, 230, 640], [470, 260, 140, 470]].map(([x, y, w, h]) => `<path d="M${x} ${y} L ${x + w} ${y + w * 0.43} L ${x + w} ${y + h} L ${x} ${y + h + 60} Z" fill="#6a8a8a" ${bzO()}/><path d="M${1920 - x} ${y} L ${1920 - x - w} ${y + w * 0.43} L ${1920 - x - w} ${y + h} L ${1920 - x} ${y + h + 60} Z" fill="#6a8a8a" ${bzO()}/>`).join('')}
    ${[[480, 120], [700, 220], [820, 290]].map(([y, w]) => `<rect x="${960 - w}" y="${y / 4}" width="${w * 2}" height="${18}" fill="#fff8d8" ${bzO('stroke-width="4"')}/>`).join('')}
    <rect x="860" y="350" width="200" height="44" fill="#c8342c" ${bzO('stroke-width="5"')}/><text x="960" y="384" text-anchor="middle" font-family="Anton" font-size="32" fill="#fff">ISOLAMENTO</text>
    ${guards ? `<g id="guards">${[870, 1050].map((gx) => `<g transform="translate(${gx} 690) scale(0.55)"><rect x="-55" y="-420" width="110" height="260" rx="40" fill="#2a3426"/><circle cx="0" cy="-480" r="62" fill="#2a3426"/><rect x="-55" y="-170" width="110" height="170" fill="#1a2018"/><path d="M40 -380 l 90 120" stroke="#1a1a1a" stroke-width="22"/></g>`).join('')}</g>` : ''}`;
}
// the road at night with Army trucks (#trucks .tk) and a road sign
function vgRoad() {
  const truck = (x: number) => `<g class="tk" transform="translate(${x} 880)"><rect x="-300" y="-250" width="380" height="210" rx="16" fill="#4a5a3a" ${bzO()}/><path d="M-300 -250 Q -110 -300 80 -250" fill="#5a6a44" ${bzO()}/><rect x="90" y="-210" width="160" height="170" rx="16" fill="#3a4a2e" ${bzO()}/><rect x="110" y="-190" width="90" height="70" rx="8" fill="#1a2430" ${bzO('stroke-width="5"')}/>
    <circle cx="245" cy="-90" r="16" fill="#fff4c8"/><path d="M250 -100 L 700 -180 L 700 0 Z" fill="#fff4c8" opacity="0.14"/>${[-200, 150].map((wx) => `<circle cx="${wx}" cy="-30" r="48" fill="#1a1a1a"/><circle cx="${wx}" cy="-30" r="18" fill="#6a6a6a"/>`).join('')}</g>`;
  return `<g id="lay-bg">${bzSky('#04060c', '#141c2c')}${bzStars(70, 11, 560)}${vgHills(620, '#0c140e', '#08100a')}</g>
    <g id="lay-mid"><rect x="-20" y="820" width="1960" height="300" fill="#1c1c22" ${bzO()}/>${[...Array(10)].map((_, i) => `<rect x="${i * 200}" y="930" width="100" height="12" fill="#e8e0a0" opacity="0.6"/>`).join('')}
      <g transform="translate(1640 820)"><rect x="-10" y="-260" width="20" height="260" fill="#8a8f9e" ${bzO('stroke-width="5"')}/><rect x="-170" y="-380" width="340" height="140" rx="10" fill="#2a7a4a" ${bzO()}/><text x="0" y="-322" text-anchor="middle" font-family="Anton" font-size="40" fill="#fff">TRÊS CORAÇÕES</text><text x="0" y="-268" text-anchor="middle" font-family="Anton" font-size="38" fill="#fff">30 km</text></g></g>
    <g id="trucks">${truck(300)}${truck(900)}</g>`;
}
// a hospital room (bed with a figure under a sheet, a monitor #mon with a heartbeat .beat)
function vgRoom() {
  return `<rect width="1920" height="1080" fill="#9ab0ac"/><rect y="780" width="1920" height="300" fill="#6a807c" ${bzO()}/><rect x="1300" y="160" width="360" height="300" fill="#1a2440" ${bzO('stroke-width="10"')}/><path d="M1480 160 v300 M1300 310 h360" stroke="${BZ.ink}" stroke-width="10"/>
    <g transform="translate(860 820)"><rect x="-420" y="-200" width="840" height="120" rx="20" fill="#e8f0f0" ${bzO()}/><rect x="-440" y="-80" width="20" height="160" fill="#8a8f9e" ${bzO('stroke-width="4"')}/><rect x="420" y="-80" width="20" height="160" fill="#8a8f9e" ${bzO('stroke-width="4"')}/>
      <rect x="-440" y="-320" width="40" height="240" rx="10" fill="#8a8f9e" ${bzO('stroke-width="5"')}/><ellipse cx="-300" cy="-230" rx="100" ry="50" fill="#fbf7ef" ${bzO()}/><path d="M-210 -260 Q 100 -320 400 -220 L 400 -190 L -220 -190 Z" fill="#c8e0e0" ${bzO()}/></g>
    <g transform="translate(360 600)"><rect x="-130" y="-170" width="260" height="190" rx="14" fill="#2b2433" ${bzO()}/><rect x="-110" y="-150" width="220" height="140" fill="#0a1a12"/><path class="beat" d="M-110 -80 h70 l 20 -50 l 20 90 l 20 -40 h 90" stroke="#4aff8a" stroke-width="6" fill="none"/><rect x="-10" y="20" width="20" height="200" fill="#8a8f9e" ${bzO('stroke-width="4"')}/></g>`;
}
// a memorial: a candle and an empty frame with a soldier's cap on a table
function vgMemorial() {
  return `${bzSky('#0a0a10', '#2a2026')}${bzGlow('cg', 960, 560, 520, '#ffb84a', 0.32)}<rect x="-20" y="760" width="1960" height="340" fill="#3a2a22" ${bzO()}/>
    <g transform="translate(860 760)"><rect x="-150" y="-380" width="300" height="360" rx="12" fill="#6a4a2a" ${bzO()}/><rect x="-115" y="-345" width="230" height="290" fill="#2a2a30" ${bzO('stroke-width="5"')}/><path d="M-60 -160 q 60 -90 120 0 v 70 h -120 z" fill="#3a3a44"/><circle cx="0" cy="-220" r="46" fill="#3a3a44"/></g>
    <g transform="translate(1160 760)"><rect x="-34" y="-180" width="68" height="180" fill="#f4ecd8" ${bzO()}/><g id="flame"><path d="M0 -270 Q -32 -220 0 -186 Q 32 -220 0 -270 Z" fill="#ffd27a" ${bzO('stroke-width="5"')}/></g></g>
    <g transform="translate(560 760)"><ellipse cx="0" cy="-30" rx="110" ry="34" fill="#3a3a2a" ${bzO()}/><path d="M-90 -40 Q 0 -150 90 -40 Z" fill="#3a3a2a" ${bzO()}/></g>`;
}
// newspapers and a TV (#tv screen shows the creature); a desk
function vgNews() {
  const paper = (x: number, y: number, r: number, head: string, sub: string) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-260" y="-170" width="520" height="340" fill="#f4f0e4" ${bzO()}/><text x="0" y="-100" text-anchor="middle" font-family="Anton" font-size="66" fill="#2b2433">${head}</text><text x="0" y="-40" text-anchor="middle" font-family="Anton" font-size="34" fill="#c8342c">${sub}</text>
    ${[0, 1, 2, 3].map((i) => `<rect x="-220" y="${0 + i * 36}" width="${i % 2 ? 300 : 440}" height="14" fill="#b8b0a0"/>`).join('')}</g>`;
  return `<rect width="1920" height="1080" fill="#4a3a30"/><rect y="760" width="1920" height="320" fill="#6a4a30" ${bzO()}/>
    <g id="tv"><g transform="translate(1380 520)"><rect x="-300" y="-250" width="600" height="440" rx="40" fill="#3a3a44" ${bzO()}/><rect x="-250" y="-210" width="420" height="340" rx="30" fill="#1a2a3a" ${bzO('stroke-width="6"')}/>
      <circle cx="235" cy="-120" r="20" fill="#8a8f9e" ${bzO('stroke-width="4"')}/><circle cx="235" cy="-50" r="20" fill="#8a8f9e" ${bzO('stroke-width="4"')}/><path d="M-80 -250 L -160 -360 M80 -250 L 160 -360" stroke="${BZ.ink}" stroke-width="8"/>
      <g id="tvimg"><g transform="translate(-40 120) scale(0.42)">${vgEt('tvet', 0, 0, 1, 'stand').replace('id="tvet"', 'id="tvet"')}</g></g><rect x="-250" y="-210" width="420" height="340" rx="30" fill="#8ac0ff" opacity="0.08"/></g></g>
    <g id="papers">${paper(520, 560, -6, 'ET EM VARGINHA?', 'MENINAS VEEM CRIATURA')}${paper(760, 860, 5, 'O MISTÉRIO CRESCE', 'EXÉRCITO NEGA TUDO')}</g>`;
}
// the "ET town" today: a UFO-shaped water tower and a spaceship bus stop, sunny
function vgTourism() {
  return `<g id="lay-bg">${bzSky('#6ab0f0', '#e8f4ff')}${bzSun(260, 180, 70)}${vgHills(620, '#6a9a4a', '#3a6a2a')}</g>
    <g id="lay-mid"><g transform="translate(1180 820)"><rect x="-26" y="-560" width="52" height="560" fill="#c8ccd8" ${bzO()}/><ellipse cx="0" cy="-600" rx="330" ry="80" fill="#c8ccd8" ${bzO('stroke-width="9"')}/><ellipse cx="0" cy="-650" rx="170" ry="70" fill="#8ac0e8" ${bzO()}/>
        ${[-250, -150, -50, 50, 150, 250].map((lx) => `<circle cx="${lx}" cy="-590" r="14" fill="#f6c744" ${bzO('stroke-width="4"')}/>`).join('')}</g>
      <g transform="translate(520 860)"><path d="M-240 0 V -200 Q 0 -360 240 -200 V 0" fill="#9aff6a" opacity="0.25"/><path d="M-260 -190 Q 0 -380 260 -190 Z" fill="#c8ccd8" ${bzO()}/><rect x="-200" y="-60" width="400" height="30" rx="8" fill="#6a4a30" ${bzO('stroke-width="5"')}/><rect x="-240" y="-200" width="20" height="200" fill="#8a8f9e" ${bzO('stroke-width="4"')}/><rect x="220" y="-200" width="20" height="200" fill="#8a8f9e" ${bzO('stroke-width="4"')}/>
        <text x="0" y="-230" text-anchor="middle" font-family="Anton" font-size="44" fill="#2b2433">PONTO</text></g>
      <rect x="-20" y="850" width="1960" height="260" fill="#a8987a" ${bzO()}/>
      <g transform="translate(1640 850)"><rect x="-150" y="-260" width="300" height="260" fill="#f0e0a8" ${bzO()}/><rect x="-170" y="-300" width="340" height="60" fill="#3aa05a" ${bzO()}/><text x="0" y="-258" text-anchor="middle" font-family="Anton" font-size="40" fill="#fff">LEMBRANÇAS</text>
        <g transform="translate(-60 -40) scale(0.18)">${vgEt('souv', 0, 0, 1, 'stand').replace(/#d81c1c/g, '#9aff6a')}</g><g transform="translate(60 -40) scale(0.18)">${vgEt('souv2', 0, 0, 1, 'stand').replace(/#d81c1c/g, '#9aff6a')}</g></g></g>`;
}
// the archive room: shelves of boxes in the dark, a desk lamp, the inquiry folder (#folder: .cover / .open pages)
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
      <text x="0" y="-60" text-anchor="middle" font-family="Anton" font-size="40" fill="#5a4a30">ESCOLA DE SARGENTOS DAS ARMAS</text>
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

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#8a94a8', html: () => svg(`${vgLot()}${vgChar('kat', 'kat', 300, 900, 0.9)}${vgChar('lil', 'lil', 520, 900, 0.9)}${vgChar('val', 'val', 700, 900, 0.9)}${vgChar('mae', 'mae', 880, 900, 0.9)}${vgChar('pm', 'pm', 1080, 900, 0.9)}${vgChar('bomb', 'bomb', 1260, 900, 0.9)}${vgChar('sold', 'sold', 1440, 900, 0.9)}${vgChar('ufo1', 'ufo1', 1620, 900, 0.9)}${vgChar('ufo2', 'ufo2', 1800, 900, 0.9)}`), anim() {} },
  'test-et': { bg: '#8a94a8', html: () => svg(`${vgLot(1)}${vgEt('et', 1100, 900, 1.0)}${vgEt('et2', 500, 900, 0.9, 'stand')}${vgCrouch('cr', 1600, 900, 0.9)}`), anim(tl, s) { vgEtLive(tl, '#sc-test-et #et', s.t0, s.t1); } },
  'test-town': { bg: '#7ab8e8', html: () => svg(`${vgTown('day')}`), anim() {} },
  'test-storm': { bg: '#2a2a3a', html: () => svg(`${vgTown('dusk')}${vgRain('rn', 90, true)}`), anim(tl, s) { vgRainGo(tl, '#sc-test-storm #rn', s.t0, s.t1, true); } },
  'test-farm': { bg: '#060a18', html: () => svg(`${vgFarm()}${vgChar('sitio', 'sitio', 560, 920, 0.8)}${vgChar('sitia', 'sitia', 700, 920, 0.8)}`), anim() {} },
  'test-truck': { bg: '#8a94a8', html: () => svg(`${vgLot()}${vgFireTruck(300, 960, 1)}${vgCrate(1200, 960, 1)}${vgChar('bomb', 'b1', 1000, 960, 0.9)}${vgChar('bomb2', 'b2', 1420, 960, 0.9, true)}`), anim() {} },
  'test-street': { bg: '#05070f', html: () => svg(`${vgStreet(false)}${vgCar(900, 960, 1)}${vgChar('pm', 'pm', 1350, 960, 0.9, true)}${vgChar('pm2', 'pm2', 1550, 960, 0.9, true)}`), anim() {} },
  'test-corridor': { bg: '#c8d4d0', html: () => svg(`${vgCorridor()}${vgChar('nurse', 'nr', 420, 1060, 1.0)}`), anim() {} },
  'test-road': { bg: '#04060c', html: () => svg(`${vgRoad()}`), anim() {} },
  'test-room': { bg: '#9ab0ac', html: () => svg(`${vgRoom()}`), anim() {} },
  'test-memorial': { bg: '#0a0a10', html: () => svg(`${vgMemorial()}`), anim() {} },
  'test-news': { bg: '#4a3a30', html: () => svg(`${vgNews()}`), anim() {} },
  'test-tourism': { bg: '#6ab0f0', html: () => svg(`${vgTourism()}${vgChar('ufo1', 'u1', 880, 940, 0.9)}`), anim() {} },
  'test-archive': { bg: '#100c0e', html: () => svg(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`, ), anim() {} },
  'test-archive-open': { bg: '#100c0e', html: () => svg(`${vgArchive()}${vgFolder('fd', 960, 560, 0.85)}`), anim(tl, s) { tl.set('#sc-test-archive-open #fd .cover', { opacity: 0 }, s.t0); tl.set('#sc-test-archive-open #fd .open', { opacity: 1 }, s.t0); tl.set('#sc-test-archive-open #fd .hl', { opacity: 0.6 }, s.t0); tl.set('#sc-test-archive-open #fd .redact', { opacity: 1 }, s.t0); } },
  'test-court': { bg: '#5a9ae0', html: () => svg(`${vgCourt()}`), anim() {} },
  'test-title': { bg: '#0a0812', html: () => svg(`${vgTitle()}`), anim() {} },
  'test-tags': { bg: '#8a94a8', html: () => svg(`${vgLot()}${vgTag('relato')}${vgCard('cd', 'VARGINHA • MG', '20 DE JANEIRO DE 1996')}`), anim() {} },
  // the thumbnail plate (clean, no text: the text goes on in make-thumb.py)
  'thumb-a': { bg: '#2a2a3a', html: () => svg(`${vgLot(1)}${vgEt('et', 1260, 1240, 1.7)}${bzVignette(0.55)}`), anim() {} },
  'thumb-b': { bg: '#100c0e', html: () => svg(`${vgArchive()}${vgFolder('fd', 1300, 560, 0.85)}${vgEt('et', 520, 1250, 1.45)}${bzVignette(0.5)}`), anim() {} },
});
