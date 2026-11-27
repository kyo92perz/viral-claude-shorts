// =====================================================================
//  LENDA: O SACI, Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix sa.
//  Cast (original designs): Lia (the narrator, 12, a ponytail, yellow t-shirt), vô Zé (straw hat, white moustache,
//  checked shirt) and the Saci (a one-legged boy with a red pointed cap, red shorts, a small pipe, yellow glowing eyes).
//  Sets: the farm in Minas (red dirt yard, white house with blue windows, orange tiles, hills, mango tree, fence, the mare),
//  the kitchen (sour milk, the empty salt pot), the dust whirlwind, the sieve, the bottle with the cork, Lia's room at
//  night, the mirror. The only threat colour is the Saci's red cap.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Lia (kid tall 1.15) ~400*s, the Saci ~330*s.
// =====================================================================
// the red cap's pointed tip falling back (drawn behind the head) and the small pipe (over the face, at the mouth)
const SA_TIP = '<path d="M-40 -88 Q -120 -150 -175 -95 Q -150 -60 -120 -70 Q -90 -110 -10 -80 Z" fill="#d8302a" stroke="#2b2433" stroke-width="7" stroke-linejoin="round"/><circle cx="-175" cy="-95" r="16" fill="#d8302a" stroke="#2b2433" stroke-width="6"/>';
const SA_PIPE = '<path d="M22 40 L 70 48" stroke="#2b2433" stroke-width="13" stroke-linecap="round"/><path d="M22 40 L 70 48" stroke="#8a5a2a" stroke-width="6" stroke-linecap="round"/><rect x="62" y="20" width="26" height="34" rx="6" fill="#6a3a1a" stroke="#2b2433" stroke-width="5"/>';
const SA_BRAIDS = [...Array(10)].map((_, i) => { const a = 195 + i * 17, r = Math.PI * a / 180, x = Math.cos(r) * 84, y = Math.sin(r) * 84;
  const dx = Math.sign(x) * (30 + Math.abs(x) * 0.25), dy = 200 - y * 0.6;
  return `<path d="M${x} ${y} q ${dx * 0.5} ${dy * 0.5} ${dx} ${dy}" stroke="#2b2433" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M${x} ${y} q ${dx * 0.5} ${dy * 0.5} ${dx} ${dy}" stroke="#5a3418" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="8 6"/><circle cx="${x + dx}" cy="${y + dy}" r="7" fill="#d8302a"/>`; }).join('');
const SA_SPEC: Record<string, BzSpec> = {
  lia: { kid: true, tall: 1.15, skin: '#c98757', hair: { style: 'pony', color: '#5a3418' }, top: '#f6c744', top2: '#e8a030', pants: '#3a5a8a', shoes: '#e8e4dc' },
  liab: { kid: true, tall: 1.15, skin: '#c98757', hair: { style: 'pony', color: '#5a3418' }, top: '#e8e4f4', pants: '#8a9ac8', shoes: '#e8e4dc', headBack: SA_BRAIDS },
  vo: { skin: '#d89a6a', hat: { kind: 'straw', color: '#e8c870' }, mustache: '#f0ece4', top: '#4a7a5a', top2: '#c8342c', belt: '#4a2a1a', pants: '#6a5a4a', shoes: '#3a2a1a' },
  saci: { kid: true, tall: 0.95, skin: '#5a3a28', hair: { style: 'bald', color: '#2a1a12' }, hat: { kind: 'beanie', color: '#d8302a' }, top: '#5a3a28', pants: '#c8342c', shoes: '#5a3a28', glow: '#ffd23a', headBack: SA_TIP, headFront: SA_PIPE },
};
// the Saci has one leg: the left leg is never drawn
const saChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => {
  const c = bzChar(id, SA_SPEC[k], x, y, s, flip);
  return k === 'saci' ? c.replace('<g class="lL">', '<g class="lL" opacity="0">') : c;
};
// ---- palettes: day (blue sky, red dirt), dusk (orange to purple), night (blue)
const SA_PAL = {
  day: { sky: ['#5aa8e0', '#cde8f0'], hill: '#6aa84a', hill2: '#4a8a3a', dirt: '#c8784a', dirt2: '#a85a34', wall: '#f4efe4', roof: '#d8643a', win: '#3a6aa8' },
  dusk: { sky: ['#f29a4a', '#6a4a8a'], hill: '#5a6a3a', hill2: '#3f4a2f', dirt: '#a8603a', dirt2: '#8a4a2a', wall: '#e8c8a8', roof: '#b8502a', win: '#2a3a6a' },
};
type SaPal = typeof SA_PAL.day;
// a mango tree (round crown, thick trunk)
const saTree = (x: number, y: number, s: number, c = '#2f6a2a') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 0 L -30 -330 L 30 -330 L 40 0 Z" fill="#5a3a22" ${bzO()}/>${[[-150, -420, 150], [0, -520, 190], [150, -420, 150], [-70, -350, 120], [80, -340, 120]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" ${bzO()}/>`).join('')}${[[-90, -380], [60, -460], [120, -360]].map(([fx, fy]) => `<ellipse cx="${fx}" cy="${fy}" rx="16" ry="20" fill="#f2a43a" ${bzO('stroke-width="4"')}/>`).join('')}</g>`;
// a wooden fence along y
const saFence = (y: number, x0 = -20, x1 = 1100) => { let s = ''; for (let x = x0; x < x1; x += 120) s += `<rect x="${x}" y="${y - 150}" width="22" height="160" fill="#8a5a32" ${bzO('stroke-width="5"')}/>`; return `${s}<rect x="${x0}" y="${y - 120}" width="${x1 - x0}" height="18" fill="#9a6a3a" ${bzO('stroke-width="5"')}/><rect x="${x0}" y="${y - 60}" width="${x1 - x0}" height="18" fill="#9a6a3a" ${bzO('stroke-width="5"')}/>`; };
// the farm: hills, the white house (door, two blue windows, orange tiles), the mango tree, the fence, the red dirt yard (from y 1250)
function saFarm(P: SaPal, house = true) {
  const tiles = [...Array(9)].map((_, i) => `<path d="M${250 + i * 70} 830 v 120" stroke="${BZ.ink}" stroke-width="4" opacity="0.4"/>`).join('');
  return `${bzSky(P.sky[0], P.sky[1])}<path d="M-20 1000 Q 250 820 520 960 Q 800 840 1100 980 L 1100 1300 L -20 1300 Z" fill="${P.hill2}" ${bzO()}/><path d="M-20 1100 Q 300 980 600 1080 Q 850 1020 1100 1090 L 1100 1300 L -20 1300 Z" fill="${P.hill}" ${bzO()}/>
    ${house ? `<rect x="240" y="940" width="560" height="320" fill="${P.wall}" ${bzO()}/><path d="M200 950 L 520 790 L 840 950 Z" fill="${P.roof}" ${bzO()}/>${tiles}
    <rect x="300" y="1010" width="110" height="110" fill="${P.win}" ${bzO()}/><rect x="630" y="1010" width="110" height="110" fill="${P.win}" ${bzO()}/><path d="M355 1010 v110 M685 1010 v110" stroke="${BZ.ink}" stroke-width="5"/><rect x="465" y="1060" width="110" height="200" fill="#6a4a2a" ${bzO()}/>` : ''}
    ${saTree(930, 1290, 0.9)}${saFence(1300, -20, 260)}<rect x="-20" y="1250" width="1120" height="700" fill="${P.dirt}" ${bzO()}/>
    ${[...Array(10)].map((_, i) => `<ellipse cx="${(i * 233) % 1080}" cy="${1320 + (i * 97) % 560}" rx="${50 + (i % 3) * 30}" ry="10" fill="${P.dirt2}" opacity="0.6"/>`).join('')}`;
}
// the mare (side view, facing left); her mane (.mane) and the braids in it (.br, hidden until shown)
function saMare(id: string, x: number, y: number, s = 1, braids = false) {
  const br = [...Array(7)].map((_, i) => `<g class="br"${braids ? '' : ' opacity="0"'}><path d="M${-150 + i * 28} ${-330 + i * 22} q -10 30 0 60" stroke="${BZ.ink}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M${-150 + i * 28} ${-330 + i * 22} q -10 30 0 60" stroke="#2a1a12" stroke-width="8" fill="none" stroke-dasharray="7 5"/><circle cx="${-150 + i * 28}" cy="${-268 + i * 22}" r="7" fill="#d8302a"/></g>`).join('');
  const leg = (lx: number) => `<rect x="${lx}" y="-170" width="34" height="170" rx="12" fill="#8a5232" ${bzO()}/><rect x="${lx - 4}" y="-20" width="42" height="22" rx="6" fill="#2a1a12"/>`;
  return `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${s})">${leg(-120)}${leg(-60)}${leg(110)}${leg(170)}
    <ellipse cx="30" cy="-230" rx="200" ry="95" fill="#9a5a38" ${bzO()}/><path d="M230 -250 Q 290 -230 270 -120" stroke="${BZ.ink}" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M230 -250 Q 290 -230 270 -120" stroke="#3a2418" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M-110 -270 L -190 -420 Q -260 -460 -300 -400 L -330 -330 Q -330 -290 -290 -290 L -230 -320 L -150 -180 Z" fill="#9a5a38" ${bzO()}/><circle cx="-250" cy="-395" r="9" fill="${BZ.ink}"/><path d="M-230 -450 l 10 -40 l 20 34 z" fill="#9a5a38" ${bzO('stroke-width="5"')}/>
    <path class="mane" d="M-200 -440 Q -160 -400 -150 -340 Q -120 -290 -90 -250 L -120 -230 Q -170 -300 -220 -420 Z" fill="#3a2418" ${bzO()}/>${br}</g></g></g>`;
}
// the dust whirlwind: stacked rings (.ring) narrowing toward the ground, base at (x, y)
const saWhirl = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${[...Array(9)].map((_, i) => { const w = 50 + i * 28, yy = -i * 90 - 20;
  return `<ellipse class="ring" cx="0" cy="${yy}" rx="${w}" ry="${18 + i * 3}" fill="none" stroke="#c89a6a" stroke-width="${16 - i}" opacity="${0.9 - i * 0.06}"/><ellipse class="ring" cx="0" cy="${yy}" rx="${w * 0.7}" ry="${12 + i * 2}" fill="none" stroke="#e8c49a" stroke-width="6" opacity="0.6"/>`; }).join('')}
  ${[...Array(14)].map((_, i) => `<circle class="dbit" cx="${((i * 71) % 300) - 150}" cy="${-((i * 131) % 800)}" r="${5 + (i % 3) * 3}" fill="#8a5a3a"/>`).join('')}</g></g>`;
// the sieve (peneira): a round wooden rim and a woven mesh; origin at its centre
const saSieve = (id: string, x: number, y: number, s = 1, tilt = 0.35) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s} ${s * tilt})"><circle r="170" fill="#e8c890" ${bzO('stroke-width="10"')}/>${[...Array(9)].map((_, i) => `<path d="M${-160 + i * 40} -150 v300 M-160 ${-150 + i * 40} h320" stroke="#b8925a" stroke-width="6"/>`).join('')}<circle r="170" fill="none" stroke="#a8743a" stroke-width="26"/><circle r="170" fill="none" ${bzO('stroke-width="8"')}/></g></g>`;
// the bottle (green glass) with its cork (#<id>c) and red smoke inside (.smk); origin at the bottom centre
const saBottle = (id: string, x: number, y: number, s = 1, cork = true) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-90 0 L -90 -260 Q -90 -320 -40 -350 L -36 -470 L 36 -470 L 40 -350 Q 90 -320 90 -260 L 90 0 Z" fill="#3f8a5a" opacity="0.85" ${bzO()}/>
  <g class="smk">${[0, 1, 2].map((i) => `<circle cx="${-30 + i * 30}" cy="${-120 - i * 50}" r="${50 - i * 8}" fill="#d8302a" opacity="0.45"/>`).join('')}</g>
  <path d="M-60 -250 L -60 -60" stroke="#fff" stroke-width="14" opacity="0.4" stroke-linecap="round"/>
  <g id="${id}c"${cork ? '' : ' opacity="0"'}><rect x="-40" y="-530" width="80" height="70" rx="12" fill="#c8945a" ${bzO()}/></g></g></g>`;
// the kitchen: tiles, the wood stove, the table with the sour milk jug (#milk with stink lines .stk) and the empty salt pot (#salt)
function saKitchen() {
  return `<rect width="1080" height="1920" fill="#e8d4b0"/>${[...Array(10)].map((_, i) => `<path d="M0 ${200 + i * 110} H1080" stroke="#d4bc94" stroke-width="5"/>`).join('')}
    <rect x="-20" y="760" width="1120" height="70" fill="#8a5a32" ${bzO()}/><rect x="60" y="880" width="420" height="360" fill="#b8b0a4" ${bzO()}/><rect x="110" y="1000" width="110" height="110" rx="10" fill="#2a2228" ${bzO()}/><rect x="290" y="1000" width="110" height="110" rx="10" fill="#2a2228" ${bzO()}/>
    <rect x="-20" y="1250" width="1120" height="700" fill="#b8784a" ${bzO()}/><rect x="80" y="1180" width="920" height="60" rx="10" fill="#8a5a32" ${bzO()}/>
    <g id="milk"><path d="M300 1180 L 290 960 Q 300 920 360 920 L 440 920 Q 500 920 490 960 L 480 1180 Z" fill="#f4f0e8" ${bzO()}/><path d="M290 960 Q 390 990 490 960" stroke="${BZ.ink}" stroke-width="5" fill="none"/>
      <g class="stk">${[0, 1, 2].map((i) => `<path d="M${340 + i * 50} 900 q -20 -40 0 -80 q 20 -40 0 -80" stroke="#7aa83a" stroke-width="10" fill="none" stroke-linecap="round"/>`).join('')}</g></g>
    <g id="salt"><rect x="640" y="1020" width="200" height="160" rx="20" fill="#f4f0e8" ${bzO()}/><text x="740" y="1120" text-anchor="middle" font-family="Anton" font-size="60" fill="${BZ.ink}">SAL</text><rect x="630" y="990" width="220" height="40" rx="10" fill="#c8945a" ${bzO()}/></g>`;
}
// Lia's room at night: wooden walls, the window with the moon, the bed, the shelf with the bottle at (800, 840)
function saRoom(dark = true) {
  return `<rect width="1080" height="1920" fill="${dark ? '#2a2a4a' : '#e8d8b8'}"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1920" stroke="${dark ? '#22223e' : '#d8c8a4'}" stroke-width="8"/>`).join('')}
    <rect x="120" y="380" width="340" height="380" fill="${dark ? '#0b1028' : '#9ad0f0'}" ${bzO('stroke-width="12"')}/>${dark ? bzMoon('mn', 360, 500, 50) : ''}<path d="M290 380 v380 M120 570 h340" stroke="${BZ.ink}" stroke-width="10"/>
    <rect x="640" y="840" width="340" height="28" fill="#8a5a32" ${bzO()}/><rect x="-20" y="1250" width="1120" height="700" fill="${dark ? '#1e1a2e' : '#a8784a'}" ${bzO()}/>
    <rect x="60" y="1060" width="560" height="220" rx="30" fill="${dark ? '#4a3a6a' : '#e86a5a'}" ${bzO()}/><rect x="60" y="1010" width="200" height="90" rx="30" fill="#e8e4dc" ${bzO()}/>`;
}
// the mirror: a wooden frame and the glass (Lia's reflection is drawn on top by the shot)
const saMirror = () => `<rect width="1080" height="1920" fill="#e8d8b8"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1920" stroke="#d8c8a4" stroke-width="8"/>`).join('')}
  <rect x="120" y="200" width="840" height="1300" rx="30" fill="#8a5a32" ${bzO('stroke-width="12"')}/><rect x="170" y="250" width="740" height="1200" rx="16" fill="#b8d8e8" ${bzO()}/><path d="M250 330 L 420 330 L 250 520 Z" fill="#fff" opacity="0.35"/>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#5aa8e0', html: () => svg(`${saFarm(SA_PAL.day)}${saChar('lia', 200, 1720, 1.0)}${saChar('vo', 480, 1720, 1.0)}${saChar('saci', 760, 1720, 1.0)}${saChar('liab', 960, 1720, 0.8)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #saci', s.t0, 'glow', 'grin'); } },
  'test-farm': { bg: '#5aa8e0', html: () => svg(`${saFarm(SA_PAL.day)}${saMare('mare', 560, 1700, 1.0, true)}${saWhirl('wh', 220, 1700, 1.0)}`), anim() {} },
  'test-props': { bg: '#e8d4b0', html: () => svg(`${saKitchen()}${saSieve('sv', 300, 1600, 1.0)}${saBottle('bt', 760, 1750, 0.8)}`), anim() {} },
  'test-room': { bg: '#2a2a4a', html: () => svg(`${saRoom()}${saBottle('bt', 810, 840, 0.5)}`), anim() {} },
  'test-mirror': { bg: '#e8d8b8', html: () => svg(`${saMirror()}${saChar('liab', 540, 2050, 2.6)}`), anim(tl, s) { bzFace(tl, '#sc-test-mirror #liab', s.t0, 'wide', 'o'); } },
  'test-face': { bg: '#5aa8e0', html: () => svg(`${saFarm(SA_PAL.dusk, false)}${saChar('saci', 540, 1900, 3.0)}`), anim(tl, s) { bzFace(tl, '#sc-test-face #saci', s.t0, 'glow', 'grin'); } },
  // covers (clean frames for core/cover.py)
  'cover-a': { bg: '#f29a4a', html: () => svg(`${saFarm(SA_PAL.dusk, false)}${saWhirl('wh', 540, 1900, 2.0)}${saChar('saci', 540, 1950, 3.0)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #saci', s.t0, 'glow', 'grin'); } },
  'cover-b': { bg: '#e8d8b8', html: () => svg(`${saMirror()}${saChar('liab', 540, 2050, 2.6)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-b #liab', s.t0, 'wide', 'open'); } },
});
