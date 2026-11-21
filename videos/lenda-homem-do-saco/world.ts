// =====================================================================
//  LENDA: O HOMEM DO SACO, in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix hs.
//  Cast: Ana (the narrator, 14, ponytail), Lucas (her little brother, 8, red cap), the mother (apron), the old man
//  (very tall and thin, black hat, long coat, grey beard, a burlap sack on his back that moves).
//  Sets: the street of small houses with numbered gates at dusk (orange-purple sky), the same street at night, the
//  house door, the gate seen from inside.
// =====================================================================
const HS_COAT = '<path d="M-58 -560 Q 0 -600 58 -560 L 95 -130 Q 0 -100 -95 -130 Z" fill="#2e2a2c" stroke="#2b2433" stroke-width="7" stroke-linejoin="round"/><path d="M0 -560 L0 -120" stroke="#1b1820" stroke-width="5"/><circle cx="14" cy="-450" r="7" fill="#c9a46a"/><circle cx="14" cy="-370" r="7" fill="#c9a46a"/>';
const HS_SPEC: Record<string, BzSpec> = {
  ana: { kid: true, tall: 1.12, skin: '#e0a878', hair: { style: 'pony', color: '#5a321e' }, top: '#e8505a', pants: '#2f3e66', shoes: '#f0ece2' },
  lucas: { kid: true, tall: 0.88, skin: '#e0a878', hair: { style: 'short', color: '#5a321e' }, hat: { kind: 'cap', color: '#d0342c' }, top: '#f6c744', top2: '#2f62b8', pants: '#3a5a8a', shoes: '#f0ece2' },
  mae: { skin: '#e0a878', hair: { style: 'bun', color: '#5a321e' }, top: '#5aa0c8', belt: '#f4f2ea', pants: '#3a3a5a', shoes: '#2b2433' },
  velho: { tall: 1.25, wide: 0.75, face: 'dead', hat: { kind: 'fedora', color: '#1e1a20' }, beard: '#b8b4ac', top: '#2e2a2c', pants: '#2e2a2c', shoes: '#1e1a20', extra: HS_COAT },
};
const hsAna = (x: number, y: number, s = 1, flip = false) => bzChar('ana', HS_SPEC.ana, x, y, s, flip);
const hsLucas = (x: number, y: number, s = 1, flip = false) => bzChar('lucas', HS_SPEC.lucas, x, y, s, flip);
const hsMae = (x: number, y: number, s = 1, flip = false) => bzChar('mae', HS_SPEC.mae, x, y, s, flip);
const hsVelho = (x: number, y: number, s = 1, flip = false) => bzChar('velho', HS_SPEC.velho, x, y, s, flip);
// the burlap sack (id): over the shoulder of the old man or alone; .peek = two little eyes in the opening; it wobbles
function hsSack(id: string, x: number, y: number, s = 1, rot = 0) {
  return `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g class="sk">
    <path d="M-120 -40 Q -170 160 -60 230 Q 0 260 60 230 Q 170 160 120 -40 Q 60 -90 0 -80 Q -60 -90 -120 -40 Z" fill="#b8925a" ${bzO()}/>
    ${[-60, 0, 60].map((dx) => `<path d="M${dx - 30} ${60 + (dx % 40)} l20 10 M${dx + 10} ${130 - (dx % 30)} l24 -6" stroke="#8a6a3a" stroke-width="6" stroke-linecap="round"/>`).join('')}
    <path d="M-60 -70 Q 0 -40 60 -70" stroke="#6a4a2a" stroke-width="12" fill="none"/><path d="M-30 -78 Q 0 -140 34 -100" stroke="#6a4a2a" stroke-width="10" fill="none"/>
    <g class="peek" opacity="0"><ellipse cx="-22" cy="-48" rx="12" ry="7" fill="#f4f8ff"/><ellipse cx="22" cy="-48" rx="12" ry="7" fill="#f4f8ff"/><circle cx="-20" cy="-48" r="4" fill="${BZ.ink}"/><circle cx="20" cy="-48" r="4" fill="${BZ.ink}"/></g></g></g></g>`;
}
// the old man carrying his sack (the sack hangs behind his right shoulder)
const hsMan = (x: number, y: number, s = 1) => `${hsSack('sack', x + 120 * s, y - 470 * s, 0.9 * s, 18)}${hsVelho(x, y, s)}`;
function hsWobble(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, k = 1) {
  const n = Math.max(2, Math.floor((t1 - t0) / 0.23));
  tl.fromTo(`${sel} .sk`, { rotation: -6 * k, scaleX: 1, transformOrigin: '50% 100%' }, { rotation: 6 * k, scaleX: 1.07, duration: 0.23, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0);
}
// a gate in a low wall with its house number
function hsGate(x: number, y: number, n: number, c = '#3a4a6a', s = 1) {
  return `<g id="gate${n}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-150" y="-260" width="300" height="260" fill="${c}" ${bzO()}/>
    ${[-110, -70, -30, 10, 50, 90].map((bx) => `<rect x="${bx}" y="-240" width="18" height="230" fill="#1e2433"/>`).join('')}
    <rect x="-40" y="-330" width="80" height="54" rx="8" fill="#f4f2ea" ${bzO('stroke-width="5"')}/><text x="0" y="-288" text-anchor="middle" font-family="Anton" font-size="44" fill="${BZ.ink}">${n}</text></g></g>`;
}
// the street: a sky (dusk or night), a row of small houses each with a wall and a gate, the sidewalk and the asphalt
function hsStreet(night = false, gates = true) {
  const sky = night ? `${bzSky('#0f1530', '#3a2f5a')}${bzStars(50, 5, 800)}${bzMoon('moon', 840, 330, 70)}` : `${bzSky('#f29a4a', '#5a3f7a')}${bzSun(200, 920, 110, '#ffcf70')}`;
  const cols = ['#e8c8a0', '#a8c8d8', '#e8a8a0', '#c8d8a0'], lit = night ? '#f6e27a' : '#fbe7b8';
  const house = (i: number) => { const x = 20 + i * 270; return `<rect x="${x}" y="820" width="240" height="420" fill="${cols[i]}" ${bzO()}/><path d="M${x - 20} 840 L${x + 120} 700 L${x + 260} 840 Z" fill="${i % 2 ? '#8a3a2a' : '#a8342c'}" ${bzO()}/>
    <rect x="${x + 70}" y="900" width="100" height="90" fill="${lit}" ${bzO()}/>`; };
  return `${sky}${[0, 1, 2, 3].map(house).join('')}<rect x="-20" y="1120" width="1120" height="140" fill="#c8bca8" ${bzO()}/>
    ${gates ? [0, 1, 2, 3].map((i) => hsGate(155 + i * 270, 1260, i + 1, ['#3a4a6a', '#6a3a3a', '#3a5a4a', '#5a4a6a'][i], 0.62)).join('') : ''}
    <rect x="-20" y="1260" width="1120" height="90" fill="#b8b0a0" ${bzO()}/>${bzGround(1350, night ? '#2e3044' : '#4a4658', BZ.yellow)}`;
}
// the far end of the street (perspective): houses getting smaller toward a vanishing point, a lamp post
function hsStreetFar(night = false) {
  const sky = night ? `${bzSky('#0f1530', '#3a2f5a')}${bzStars(40, 9, 700)}` : `${bzSky('#f29a4a', '#5a3f7a')}`;
  let side = ''; for (let i = 0; i < 5; i++) { const k = 1 - i * 0.17, xl = 180 * k - 60, w = 220 * k; side += `<rect x="${540 - 360 * k - w}" y="${1100 - 360 * k}" width="${w}" height="${360 * k}" fill="${['#e8c8a0', '#a8c8d8', '#e8a8a0', '#c8d8a0', '#d8b8c8'][i]}" ${bzO()}/><rect x="${540 + 360 * k}" y="${1100 - 360 * k}" width="${w}" height="${360 * k}" fill="${['#c8d8a0', '#e8a8a0', '#a8c8d8', '#e8c8a0', '#d8b8c8'][i]}" ${bzO()}/>`; void xl; }
  return `${sky}${side}<path d="M440 1100 L640 1100 L1200 1940 L-120 1940 Z" fill="${night ? '#2e3044' : '#4a4658'}" ${bzO()}/><path d="M540 1110 L540 1940" stroke="${BZ.yellow}" stroke-width="12" stroke-dasharray="50 60"/>
    <path d="M-20 1100 L440 1100 L-120 1940 L-20 1940 Z M640 1100 L1100 1100 L1100 1940 L1200 1940 Z" fill="#b8b0a0" ${bzO()}/>`;
}
// the front door of their house (mother at the door)
function hsDoor() {
  return `${bzSky('#e0804a', '#5a3f7a')}<rect x="-20" y="560" width="1120" height="900" fill="#e8c8a0" ${bzO()}/><rect x="330" y="760" width="420" height="700" fill="#7a4a2a" ${bzO()}/><rect x="360" y="790" width="360" height="670" fill="#f6d89a"/>
    <rect x="60" y="760" width="200" height="200" fill="#fbe7b8" ${bzO()}/><rect x="820" y="760" width="200" height="200" fill="#fbe7b8" ${bzO()}/><path d="M-20 560 h1120" stroke="${BZ.ink}" stroke-width="10"/>
    <rect x="-20" y="1460" width="1120" height="480" fill="#b8b0a0" ${bzO()}/>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#f29a4a', html: () => svg(`${hsStreet()}${hsAna(170, 1620, 1)}${hsLucas(380, 1620, 1)}${hsMae(590, 1620, 1)}${hsMan(860, 1620, 0.95)}`),
    anim(tl, s) { hsWobble(tl, '#sc-test-cast #sack', s.t0, s.t1); bzFace(tl, '#sc-test-cast #velho', s.t0, 'dot', 'grin'); tl.set('#sc-test-cast .peek', { opacity: 1 }, s.t0 + 0.5); } },
  'test-far': { bg: '#f29a4a', html: () => svg(`${hsStreetFar()}${hsMan(540, 1180, 0.35)}${hsLucas(420, 1800, 1.4)}`), anim(tl, s) { hsWobble(tl, '#sc-test-far #sack', s.t0, s.t1); } },
  'test-night': { bg: '#0f1530', html: () => svg(`${hsStreet(true)}${hsMan(540, 1640, 1.0)}${bzVignette(0.6)}`), anim(tl, s) { bzPose(tl, '#sc-test-night #velho', s.t0, { hd: 140 }, 0.01); } },
  'test-door': { bg: '#e0804a', html: () => svg(`${hsDoor()}${hsMae(540, 1640, 1.3)}`), anim(tl, s) { bzFace(tl, '#sc-test-door #mae', s.t0, 'angry', 'open'); bzPose(tl, '#sc-test-door #mae', s.t0, { aR: -130 }, 0.01); } },
});
