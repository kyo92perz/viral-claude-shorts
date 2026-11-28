// =====================================================================
//  LENDA: O PAPA-FIGO, Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix pf.
//  Cast (original designs): Davi (the narrator, 12, blue t-shirt), his little cousin Caio (8, yellow shirt), the
//  grandmother (white bun, glasses, flowered dress) and the Papa-Figo: a tall thin old man in a long black cape, sickly
//  yellow skin with sores, huge ears, a sack on his back that moves. The only threat colour is the sickly yellow.
//  Sets: an old Recife street at dusk (pastel colonial houses, cobblestones, a church tower, lamps), the square with a
//  tree and a bench, the grandmother's room (bed, door, lamp), under the bed (dark; the light line under the door).
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Davi ~400*s, Caio (tall 0.95 kid) ~330*s.
// =====================================================================
const PF_EARS = '<ellipse cx="-104" cy="0" rx="34" ry="52" fill="#d8c070" stroke="#2b2433" stroke-width="7"/><ellipse cx="104" cy="0" rx="34" ry="52" fill="#d8c070" stroke="#2b2433" stroke-width="7"/>';
const PF_SORES = '<circle cx="-40" cy="44" r="9" fill="#a8603a" opacity="0.8"/><circle cx="46" cy="-40" r="7" fill="#a8603a" opacity="0.8"/><circle cx="30" cy="54" r="6" fill="#a8603a" opacity="0.8"/>';
const PF_SPEC: Record<string, BzSpec> = {
  davi: { kid: true, tall: 1.15, skin: '#c98757', hair: { style: 'short', color: '#1c1410' }, top: '#3a6ac8', top2: '#f4f2ea', pants: '#3a3a4a', shoes: '#f4f2ea' },
  caio: { kid: true, tall: 0.95, skin: '#a8683e', hair: { style: 'messy', color: '#1c1410' }, top: '#f6c744', pants: '#3a6a8a', shoes: '#e0342c' },
  vo: { skin: '#a8683e', hair: { style: 'bun', color: '#e8e4dc' }, glasses: true, top: '#c8546a', dress: '#c8546a', shoes: '#2b2433', extra: '<circle cx="-30" cy="-300" r="10" fill="#f4f2ea" opacity="0.8"/><circle cx="20" cy="-240" r="10" fill="#f4f2ea" opacity="0.8"/><circle cx="-10" cy="-180" r="10" fill="#f4f2ea" opacity="0.8"/>' },
  papa: { tall: 1.12, wide: 0.75, skin: '#d8c070', hair: { style: 'bald', color: '#8a8a80' }, top: '#141016', dress: '#141016', shoes: '#0c0a0e', claws: true, headBack: PF_EARS, headFront: PF_SORES, glow: '#e8d23a' },
};
const pfChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, PF_SPEC[k], x, y, s, flip);
// the sack: a lumpy brown bag (origin at its bottom); .bulge moves inside
const pfSack = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-120 0 Q -160 -180 -60 -260 L -40 -300 L 40 -300 L 60 -260 Q 160 -180 120 0 Z" fill="#8a6a3a" ${bzO()}/><path d="M-50 -290 q 50 -30 100 0" stroke="${BZ.ink}" stroke-width="10" fill="none"/>
  <path d="M-80 -120 q 40 20 80 0 M-60 -60 q 50 16 100 -6" stroke="#6a4a22" stroke-width="7" fill="none"/>
  <g class="bulge"><ellipse cx="20" cy="-150" rx="46" ry="36" fill="#9a7a44" ${bzO('stroke-width="5"')}/></g></g></g>`;
// a pastel colonial house front (origin at its bottom-left), width w
const pfHouse = (x: number, y: number, w: number, h: number, c: string, door = '#3a6a8a') => `<g transform="translate(${x} ${y})"><rect x="0" y="${-h}" width="${w}" height="${h}" fill="${c}" ${bzO()}/>
  <rect x="-6" y="${-h - 30}" width="${w + 12}" height="34" fill="#f4ecd8" ${bzO('stroke-width="5"')}/>
  <rect x="${w * 0.18}" y="${-h * 0.75}" width="${w * 0.22}" height="${h * 0.28}" fill="${door}" ${bzO('stroke-width="5"')}/><rect x="${w * 0.6}" y="${-h * 0.75}" width="${w * 0.22}" height="${h * 0.28}" fill="${door}" ${bzO('stroke-width="5"')}/>
  <rect x="${w * 0.36}" y="${-h * 0.38}" width="${w * 0.28}" height="${h * 0.38}" fill="${door}" ${bzO('stroke-width="5"')}/></g>`;
// the street at dusk: sky, a church tower, a row of pastel houses, cobblestones (ground from y 1300), a lamp
function pfStreet(dusk = true) {
  const sky = dusk ? bzSky('#e86a3a', '#4a2a5a') : bzSky('#5ab0f0', '#f4e4b8');
  let cob = ''; for (let i = 0; i < 40; i++) cob += `<ellipse cx="${(i * 137) % 1100}" cy="${1340 + (i * 53) % 580}" rx="44" ry="18" fill="#000" opacity="0.12"/>`;
  return `${sky}<g><rect x="760" y="420" width="160" height="560" fill="#f4ecd8" ${bzO()}/><path d="M740 430 L 840 300 L 940 430 Z" fill="#c8846a" ${bzO()}/><rect x="810" y="500" width="60" height="90" rx="30" fill="#2a2a3a" ${bzO('stroke-width="5"')}/><path d="M840 300 v -60 M820 270 h40" stroke="${BZ.ink}" stroke-width="10"/></g>
    ${pfHouse(-20, 1300, 260, 380, '#e8a0b0')}${pfHouse(240, 1300, 240, 440, '#8ac8b8', '#7a4a2a')}${pfHouse(480, 1300, 260, 360, '#f6c744')}${pfHouse(740, 1300, 360, 410, '#9ab8e8', '#7a4a2a')}
    <rect x="-20" y="1300" width="1120" height="640" fill="#8a8078" ${bzO()}/>${cob}${bzLamp(160, 1320, 520, dusk)}`;
}
// the square: a big tree, a bench, the houses far away
function pfSquare() {
  return `${bzSky('#e86a3a', '#4a2a5a')}<g transform="translate(0 120) scale(1 0.8)">${pfHouse(-20, 1300, 360, 380, '#e8a0b0')}${pfHouse(340, 1300, 380, 420, '#8ac8b8')}${pfHouse(720, 1300, 380, 360, '#f6c744')}</g>
    <rect x="-20" y="1300" width="1120" height="640" fill="#b8a070" ${bzO()}/><g><rect x="120" y="760" width="70" height="560" fill="#5a3a22" ${bzO()}/>${[[150, 640, 220], [20, 760, 150], [290, 760, 160]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#2f6a3a" ${bzO()}/>`).join('')}</g>
    <g><rect x="560" y="1400" width="360" height="26" fill="#7a4a2a" ${bzO('stroke-width="5"')}/><rect x="560" y="1340" width="360" height="22" fill="#7a4a2a" ${bzO('stroke-width="5"')}/><rect x="580" y="1420" width="16" height="70" fill="#2b2433"/><rect x="884" y="1420" width="16" height="70" fill="#2b2433"/></g>`;
}
// the grandmother's room at night: wall, window, the door (x 700–940, y 640–1300; .gap light under it), the bed
function pfRoom() {
  return `<rect width="1080" height="1920" fill="#4a3a5a"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1300" stroke="#42344f" stroke-width="8"/>`).join('')}
    <rect x="120" y="420" width="300" height="340" fill="#0b1028" ${bzO('stroke-width="12"')}/>${bzMoon('mn', 330, 520, 40)}<path d="M270 420 v340 M120 590 h300" stroke="${BZ.ink}" stroke-width="10"/>
    <rect x="700" y="640" width="240" height="660" fill="#6a4a2a" ${bzO('stroke-width="10"')}/><circle cx="900" cy="980" r="16" fill="#e8c870" ${bzO('stroke-width="5"')}/><rect class="gap" x="700" y="1290" width="240" height="12" fill="#e8d23a" opacity="0.8"/>
    <rect x="-20" y="1300" width="1120" height="640" fill="#2e2438" ${bzO()}/><rect x="40" y="1160" width="560" height="160" rx="20" fill="#e8e4dc" ${bzO()}/><rect x="40" y="1320" width="30" height="120" fill="#5a3a22"/><rect x="570" y="1320" width="30" height="120" fill="#5a3a22"/>`;
}
// under the bed: dark slats above, the floor, the door far away with its light gap (feet shadows .feet)
function pfUnder() {
  return `<rect width="1080" height="1920" fill="#0c0a12"/><rect y="0" width="1080" height="420" fill="#2a2030" ${bzO()}/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 190}" y="380" width="150" height="40" fill="#3a2a3a"/>`).join('')}
    <rect y="1500" width="1080" height="420" fill="#1a1420" ${bzO()}/><rect x="640" y="1180" width="320" height="320" fill="#120e18"/><rect x="640" y="1480" width="320" height="14" fill="#e8d23a" opacity="0.85"/>
    <g class="feet"><rect x="700" y="1478" width="60" height="18" fill="#0c0a12"/><rect x="820" y="1478" width="60" height="18" fill="#0c0a12"/></g>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#e86a3a', html: () => svg(`${pfStreet()}${pfChar('davi', 180, 1700, 1.0)}${pfChar('caio', 360, 1700, 1.0)}${pfChar('vo', 580, 1700, 1.0)}${pfChar('papa', 850, 1700, 1.0)}${pfSack('sk', 990, 1700, 0.6)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #papa', s.t0, 'half', 'grin'); } },
  'test-square': { bg: '#e86a3a', html: () => svg(`${pfSquare()}`), anim() {} },
  'test-room': { bg: '#4a3a5a', html: () => svg(`${pfRoom()}${pfChar('vo', 540, 1700, 1.1)}`), anim() {} },
  'test-under': { bg: '#0c0a12', html: () => svg(`${pfUnder()}`), anim() {} },
  'cover-a': { bg: '#e86a3a', html: () => svg(`${pfStreet()}${pfChar('papa', 520, 2500, 3.0)}${pfSack('sk', 900, 1950, 1.4)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #papa', s.t0, 'glow', 'grin'); } },
  'cover-b': { bg: '#0c0a12', html: () => svg(`${pfUnder()}${pfChar('davi', 330, 1720, 1.4)}${pfChar('caio', 600, 1720, 1.4)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-b #davi', s.t0, 'wide', 'o'); bzFace(tl, '#sc-cover-b #caio', s.t0, 'wide', 'o'); } },
});
