// =====================================================================
//  LENDA: A ALAMOA, Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix al.
//  Cast (original designs): tio Juca (fisherman, straw hat, grey beard later white hair, striped shirt) and the Alamoa
//  (long golden hair, a white dress, pale glowing skin; she turns into a skeleton: bone skin, ribs, sunken eyes).
//  Sets: Fernando de Noronha at night in a storm (black sea, lightning, the tall rock needle of the Pico, a fishing boat,
//  the beach), the rock door that opens on gold, the beach at dawn. The only threat colour is the gold of her hair.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet.
// =====================================================================
const AL_SPEC: Record<string, BzSpec> = {
  tio: { wide: 1.1, skin: '#a8683e', hat: { kind: 'straw', color: '#e8c870' }, beard: '#5a4a3a', top: '#3a6ac8', top2: '#f4f2ea', pants: '#e8dcc0', shoes: '#8a5a32' },
  tiow: { wide: 1.1, skin: '#a8683e', hair: { style: 'messy', color: '#f4f4f0' }, beard: '#f4f4f0', top: '#3a6ac8', top2: '#f4f2ea', pants: '#e8dcc0', shoes: '#8a5a32' },
  moa: { tall: 1.02, skin: '#f0dcd0', hair: { style: 'long', color: '#f2c84a' }, top: '#f8f6f0', dress: '#f8f6f0', shoes: '#f0dcd0', glow: '#f2c84a', noShadow: true },
  osso: { tall: 1.02, skin: '#e8e2cc', face: 'dead', hair: { style: 'long', color: '#8a7a4a' }, top: '#d8d2c0', dress: '#d8d2c0', shoes: '#e8e2cc', ribs: true, claws: true, glow: '#f2c84a', noShadow: true },
};
const alChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, AL_SPEC[k], x, y, s, flip);
// the Pico: a tall rock needle on a green hill (origin at the bottom centre); .door glows when open
const alPico = (x: number, y: number, s = 1, door = false) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-520 0 Q -300 -200 -160 -260 L -90 -760 Q -40 -980 20 -980 Q 80 -900 110 -700 L 160 -260 Q 320 -200 520 0 Z" fill="#2a3a30" ${bzO()}/>
  <path d="M-90 -760 Q -40 -980 20 -980 Q 80 -900 110 -700 L 90 -600 Q 20 -640 -60 -620 Z" fill="#3a4a42"/>
  ${door ? `<g class="door">${bzGlow('dg', 10, -330, 260, '#f2c84a', 0.55)}<path d="M-60 -250 L -60 -400 Q 10 -470 80 -400 L 80 -250 Z" fill="#ffd86a" ${bzO()}/></g>` : ''}</g>`;
// a fishing boat (origin at the waterline)
const alBoat = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-160 -60 L 160 -60 L 120 20 L -120 20 Z" fill="#c8542c" ${bzO()}/><path d="M-160 -60 L 160 -60" stroke="#f4f2ea" stroke-width="12"/><path d="M0 -60 V -280" stroke="${BZ.ink}" stroke-width="10"/></g>`;
// a lightning bolt (#id, hidden until flashed)
const alBolt = (id: string, x: number, y: number, s = 1) => `<g id="${id}" opacity="0"><path transform="translate(${x} ${y}) scale(${s})" d="M0 0 L -40 160 L 10 160 L -30 340 L 80 120 L 30 120 L 60 0 Z" fill="#fff8c0" ${bzO('stroke-width="5"')}/></g>`;
// the island at night in a storm: sky, the Pico, the black sea with foam (from y 1150), the beach (from y 1450)
function alNight(door = false, dawn = false) {
  const sky = dawn ? bzSky('#f2a06a', '#7ab0d8') : bzSky('#06081a', '#1e2a44');
  const sea = dawn ? '#3a7ab0' : '#0a1424';
  return `${sky}${dawn ? '' : bzStars(30, 7, 700)}${alPico(700, 1180, 0.9, door)}<rect y="1150" width="1080" height="320" fill="${sea}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path class="foam" d="M${(i * 197) % 1000} ${1180 + i * 46} q 40 -18 80 0 t 80 0" stroke="#e8f0f8" stroke-width="7" fill="none" opacity="0.55"/>`).join('')}
    <path d="M-20 1450 Q 540 1400 1100 1470 L 1100 1940 L -20 1940 Z" fill="${dawn ? '#f0d8a0' : '#8a7a5a'}" ${bzO()}/>`;
}
// inside the rock: gold coins and bars (the treasure)
function alGold() {
  let c = ''; for (let i = 0; i < 26; i++) c += `<ellipse cx="${120 + (i * 151) % 840}" cy="${1300 + (i * 67) % 300}" rx="40" ry="16" fill="#f2c84a" ${bzO('stroke-width="4"')}/>`;
  return `<rect width="1080" height="1920" fill="#2a1e14"/>${bzGlow('gg', 540, 1300, 700, '#f2c84a', 0.45)}<rect y="1280" width="1080" height="640" fill="#4a3a22" ${bzO()}/>${c}
    ${[[260, 1260], [700, 1240]].map(([x, y]) => `<rect x="${x}" y="${y}" width="160" height="60" fill="#e8b83a" ${bzO()}/>`).join('')}`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#06081a', html: () => svg(`${alNight()}${alChar('tio', 200, 1740, 1.0)}${alChar('moa', 460, 1740, 1.0)}${alChar('osso', 720, 1740, 1.0)}${alChar('tiow', 940, 1740, 0.9)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #moa', s.t0, 'half', 'smile'); bzFace(tl, '#sc-test-cast #osso', s.t0, 'glow', 'fangs'); } },
  'test-storm': { bg: '#06081a', html: () => svg(`${alNight(true)}${alBoat(260, 1260, 1)}${alBolt('lb', 300, 200, 1.2).replace('opacity="0"', '')}`), anim() {} },
  'test-gold': { bg: '#2a1e14', html: () => svg(`${alGold()}${alChar('osso', 540, 1500, 1.3)}`), anim(tl, s) { bzFace(tl, '#sc-test-gold #osso', s.t0, 'glow', 'fangs'); } },
  'test-dawn': { bg: '#f2a06a', html: () => svg(`${alNight(false, true)}${alChar('tiow', 540, 1720, 1.2)}`), anim() {} },
  'cover-a': { bg: '#06081a', html: () => svg(`${alNight(true)}${alChar('moa', 540, 2550, 3.0)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #moa', s.t0, 'half', 'smile'); } },
  'cover-b': { bg: '#2a1e14', html: () => svg(`${alGold()}${alChar('osso', 540, 2550, 3.0)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-b #osso', s.t0, 'glow', 'fangs'); } },
});
