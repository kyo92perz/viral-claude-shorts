// =====================================================================
//  LENDA: O BOTO, Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix bt.
//  Cast (original designs): Davi (the narrator, 13), his cousin Rosa (17, long black hair, a festa junina dress), the
//  stranger in white (white suit and hat, pale pink skin, a smile too wide, pink glowing eyes; without the hat: a
//  breathing hole on top of his head) and the pink river dolphin (only its fin and back are ever seen).
//  Sets: the São João party in a riverside village at night (bonfire, little flags, lights, stilt houses), the river
//  bank (dark water, moonlight, a canoe, a big tree), the full moon. The only threat colour is pink.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Davi (kid tall 1.2) ~415*s.
// =====================================================================
const BT_HOLE = '<g class="hole"><ellipse cx="0" cy="-70" rx="26" ry="10" fill="#3a1424" stroke="#2b2433" stroke-width="5"/><ellipse cx="0" cy="-72" rx="16" ry="4" fill="#ff7ab0" opacity="0.6"/></g>';
const BT_CHITA = [...Array(14)].map((_, i) => `<circle cx="${-60 + (i * 37) % 120}" cy="${-430 + (i * 53) % 260}" r="9" fill="#f6c744" stroke="#2b2433" stroke-width="3"/>`).join('');
const BT_SPEC: Record<string, BzSpec> = {
  davi: { kid: true, tall: 1.2, skin: '#b8784a', hair: { style: 'short', color: '#1c1410' }, top: '#3a8a5a', top2: '#f4f2ea', pants: '#3a4a6a', shoes: '#2b2433' },
  rosa: { skin: '#c98757', hair: { style: 'long', color: '#1c1410' }, top: '#e8603a', dress: '#e8603a', shoes: '#2b2433', extra: BT_CHITA },
  boto: { tall: 1.06, skin: '#ecc8c4', hat: { kind: 'fedora', color: '#f4f2ea' }, top: '#f4f2ea', top2: '#ff7ab0', pants: '#f4f2ea', shoes: '#f4f2ea', glow: '#ff7ab0' },
  botoh: { tall: 1.06, skin: '#ecc8c4', hair: { style: 'bald', color: '#ecc8c4' }, top: '#f4f2ea', top2: '#ff7ab0', pants: '#f4f2ea', shoes: '#f4f2ea', glow: '#ff7ab0', headFront: BT_HOLE },
  tio: { skin: '#a8683e', hat: { kind: 'straw', color: '#e8c870' }, mustache: '#2a1a12', top: '#c8342c', top2: '#f4f2ea', pants: '#3a3a5a', shoes: '#2b2433' },
  tia: { skin: '#8a5a3a', hair: { style: 'bun', color: '#1c1410' }, top: '#3a8ac8', dress: '#3a8ac8', shoes: '#2b2433' },
};
const btChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, BT_SPEC[k], x, y, s, flip);
// strings of little coloured flags (bandeirinhas) between two points
const btFlags = (x0: number, y0: number, x1: number, y1: number, sag = 80, seed = 0) => {
  const cols = ['#e8603a', '#f6c744', '#3a8ac8', '#3a8a5a', '#d8302a', '#f4f2ea']; let s = `<path d="M${x0} ${y0} Q ${(x0 + x1) / 2} ${(y0 + y1) / 2 + sag * 2} ${x1} ${y1}" stroke="${BZ.ink}" stroke-width="4" fill="none"/>`;
  for (let i = 1; i < 14; i++) { const u = i / 14, x = (1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * (x0 + x1) / 2 + u * u * x1, y = (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * ((y0 + y1) / 2 + sag * 2) + u * u * y1;
    s += `<path class="flag" d="M${x - 18} ${y} L ${x + 18} ${y} L ${x + 18} ${y + 44} L ${x} ${y + 30} L ${x - 18} ${y + 44} Z" fill="${cols[(i + seed) % cols.length]}" stroke="${BZ.ink}" stroke-width="3"/>`; }
  return `<g class="flags">${s}</g>`;
};
// the bonfire (fogueira): crossed logs and flames (.fl), origin at its base
const btFire = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${bzGlow(id + 'g', 0, -120, 360, '#ffb050', 0.35)}
  <path d="M-120 0 L 100 -60 M-100 -60 L 120 0" stroke="${BZ.ink}" stroke-width="42" stroke-linecap="round"/><path d="M-120 0 L 100 -60 M-100 -60 L 120 0" stroke="#6a3a1a" stroke-width="28" stroke-linecap="round"/>
  <g class="fl"><path d="M-90 -40 Q -110 -170 -30 -260 Q -40 -180 10 -150 Q 20 -250 70 -300 Q 60 -200 110 -150 Q 120 -90 90 -40 Z" fill="#e8603a" ${bzO()}/><path d="M-50 -50 Q -60 -140 0 -190 Q 10 -130 50 -110 Q 70 -70 50 -50 Z" fill="#f6c744"/></g></g></g>`;
// a stilt house at night, lit window
const btHouse = (x: number, y: number, s: number, c = '#6a4a3a') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-150" y="-300" width="300" height="220" fill="${c}" ${bzO()}/><path d="M-180 -290 L 0 -400 L 180 -290 Z" fill="#3a2a20" ${bzO()}/><rect x="-100" y="-250" width="80" height="70" fill="#ffc860" ${bzO()}/>${[-130, -40, 50, 130].map((px) => `<rect x="${px}" y="-80" width="16" height="80" fill="#3a2a1a" ${bzO('stroke-width="4"')}/>`).join('')}</g>`;
// the São João party: night sky, river and moon behind, stilt houses, flag strings, light bulbs, the dirt floor from y 1250
function btParty(fire = true) {
  const bulbs = [...Array(12)].map((_, i) => `<circle class="bulb" cx="${60 + i * 90}" cy="${560 + Math.sin(i * 0.7) * 30 + (i % 2) * 20}" r="12" fill="#ffe08a"/>`).join('');
  return `${bzSky('#0a0e28', '#3a2a5a')}${bzStars(60, 4, 800)}${bzMoon('mn', 840, 260, 70)}<rect x="-20" y="1000" width="1120" height="260" fill="#14203a"/><path d="M-20 1040 H1100" stroke="#3a4a6a" stroke-width="6" opacity="0.6"/>
    ${btHouse(160, 1120, 0.8)}${btHouse(900, 1100, 0.7, '#5a3a4a')}${btFlags(-20, 380, 1100, 420, 70, 0)}${btFlags(-20, 640, 1100, 600, 60, 3)}<path d="M-20 560 Q 540 640 1100 560" stroke="${BZ.ink}" stroke-width="4" fill="none"/>${bulbs}
    <rect x="-20" y="1250" width="1120" height="700" fill="#6a4a30" ${bzO()}/>${[...Array(8)].map((_, i) => `<ellipse cx="${(i * 233) % 1080}" cy="${1330 + (i * 97) % 520}" rx="${60 + (i % 3) * 30}" ry="10" fill="#5a3a24" opacity="0.7"/>`).join('')}
    ${fire ? btFire('fire', 540, 1330, 0.9) : ''}`;
}
// the river bank at night: moon on the water (#rip ripples), a big tree on the left, a canoe, the muddy bank from y 1300
function btRiver() {
  const rip = [...Array(7)].map((_, i) => `<path class="rp" d="M${600 + (i % 2) * 60} ${1060 + i * 34} h ${180 - i * 12}" stroke="#efe9d6" stroke-width="7" stroke-linecap="round" opacity="${0.7 - i * 0.07}"/>`).join('');
  return `${bzSky('#05081c', '#1c2448')}${bzStars(80, 9, 900)}${bzMoon('mn', 760, 360, 90)}${bzGlow('mg', 760, 360, 300, '#efe9d6', 0.2)}<path d="M-20 980 Q 300 950 600 990 T 1100 970 L 1100 1000 L -20 1000 Z" fill="#0c1a14"/>
    <rect x="-20" y="990" width="1120" height="340" fill="#0a1424"/><g id="rip">${rip}</g>
    <path d="M-60 1300 Q 300 1260 560 1320 T 1100 1290 L 1100 1940 L -60 1940 Z" fill="#3a2a1e" ${bzO()}/>
    <g transform="translate(200 1300)"><path d="M-50 0 L -40 -760 L 40 -760 L 50 0 Z" fill="#2a1e16" ${bzO()}/>${[[-170, -820, 170], [0, -900, 200], [170, -820, 170]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0e1e16" ${bzO()}/>`).join('')}</g>
    <g transform="translate(780 1240)"><path d="M-180 0 Q 0 60 180 0 L 150 -30 L -150 -30 Z" fill="#5a3a24" ${bzO()}/></g>${bzFog(1000, '#8aa0c0', 0.15)}`;
}
// the pink dolphin's back and fin rising from the water (origin at the waterline)
const btFin = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-220 0 Q -100 -120 60 -110 Q 180 -100 240 0 Z" fill="#f08ab0" ${bzO()}/><path d="M-10 -112 Q 30 -230 90 -250 Q 80 -170 90 -108 Z" fill="#f08ab0" ${bzO()}/>
  <path d="M-160 -40 Q -40 -100 100 -80" stroke="#fff" stroke-width="10" fill="none" opacity="0.4" stroke-linecap="round"/>${bzGlow(id + 'g', 0, -60, 260, '#ff7ab0', 0.25)}</g></g>`;
// a water splash (.sp drops), origin at the waterline
const btSplash = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${[...Array(9)].map((_, i) => `<ellipse class="sp" cx="${-160 + i * 40}" cy="${-30 - (i % 3) * 60}" rx="16" ry="30" fill="#bfe0f0" ${bzO('stroke-width="4"')}/>`).join('')}<ellipse cx="0" cy="0" rx="220" ry="34" fill="none" stroke="#bfe0f0" stroke-width="10"/></g></g>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#0a0e28', html: () => svg(`${btParty(false)}${btChar('davi', 150, 1740, 0.95)}${btChar('rosa', 380, 1740, 1.0)}${btChar('boto', 640, 1740, 1.0)}${btChar('botoh', 900, 1740, 1.0, false, 'b2')}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #boto', s.t0, 'dot', 'grin'); bzFace(tl, '#sc-test-cast #b2', s.t0, 'glow', 'grin'); } },
  'test-party': { bg: '#0a0e28', html: () => svg(`${btParty()}${btChar('tio', 220, 1700, 1.0)}${btChar('tia', 860, 1700, 1.0)}`), anim() {} },
  'test-river': { bg: '#05081c', html: () => svg(`${btRiver()}${btFin('fin', 620, 1100, 0.8)}${btSplash('spl', 420, 1100, 0.7)}`), anim() {} },
  'test-hole': { bg: '#05081c', html: () => svg(`${btRiver()}${btChar('botoh', 540, 1250 + 507 * 2.8 - 620, 2.8)}`), anim(tl, s) { bzFace(tl, '#sc-test-hole #botoh', s.t0, 'glow', 'grin'); } },
  'cover-a': { bg: '#0a0e28', html: () => svg(`${btParty()}${btChar('boto', 540, 2150, 3.0)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #boto', s.t0, 'glow', 'grin'); } },
  'cover-b': { bg: '#05081c', html: () => svg(`${btRiver()}${btFin('fin', 540, 1150, 1.4)}${bzVignette(0.5)}`), anim() {} },
});
