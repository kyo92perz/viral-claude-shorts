// =====================================================================
//  LENDA: O LOBISOMEM, in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix lo.
//  Cast: Júlia (the narrator, 12, yellow dress), her cousin Tonho (16, red plaid shirt), the werewolf (Tonho's torn
//  shirt, fur, a snout, pointed ears, yellow eyes, fangs, claws) and a half-way stage of the change.
//  Sets: the farmhouse at night, the dirt crossroads under a huge full moon, the henhouse (slats with moonlight gaps),
//  the kitchen in the morning.
// =====================================================================
const LO_EARS = (c: string) => `<path d="M-78 -30 L-70 -150 L-12 -82 Z" fill="${c}" stroke="#2b2433" stroke-width="7" stroke-linejoin="round"/><path d="M78 -30 L70 -150 L12 -82 Z" fill="${c}" stroke="#2b2433" stroke-width="7" stroke-linejoin="round"/><path d="M-62 -60 L-60 -118 L-30 -84 Z M62 -60 L60 -118 L30 -84 Z" fill="#c88a8a"/>`;
const LO_SNOUT = '<ellipse cx="0" cy="30" rx="54" ry="40" fill="#8a7462" stroke="#2b2433" stroke-width="6"/><ellipse cx="0" cy="6" rx="20" ry="13" fill="#1b1418"/>';
const LO_SHIRT = '<path d="M-90 -520 L-40 -380 L-80 -300 L-20 -240 L-70 -160 M90 -520 L50 -400 L85 -330 L30 -260" stroke="#c8342c" stroke-width="26" stroke-linecap="round" fill="none"/>';
const LO_SPEC: Record<string, BzSpec> = {
  julia: { kid: true, skin: '#d9a27a', hair: { style: 'pony', color: '#3a2418' }, top: '#f6c744', dress: '#f6c744', shoes: '#c8342c' },
  tonho: { kid: true, tall: 1.25, skin: '#c98757', hair: { style: 'messy', color: '#1c1410' }, top: '#c8342c', top2: '#7a1a14', pants: '#3a4a6a', shoes: '#3a2a1a' },
  meio: { kid: true, tall: 1.3, wide: 1.1, skin: '#a87458', hair: { style: 'spiky', color: '#4a3a32' }, top: '#c8342c', top2: '#7a1a14', pants: '#3a4a6a', shoes: '#a87458', claws: true, glow: '#ffd23a', headBack: LO_EARS('#a87458') },
  lobo: { tall: 1.38, wide: 1.3, skin: '#5a4638', hair: { style: 'spiky', color: '#3a2e28' }, top: '#5a4638', pants: '#5a4638', shoes: '#3a2e28', claws: true, glow: '#ffd23a',
    headBack: LO_EARS('#5a4638'), headFront: LO_SNOUT, extra: LO_SHIRT },
};
const loJulia = (x: number, y: number, s = 1, flip = false) => bzChar('julia', LO_SPEC.julia, x, y, s, flip);
const loTonho = (x: number, y: number, s = 1, flip = false) => bzChar('tonho', LO_SPEC.tonho, x, y, s, flip);
const loMeio = (x: number, y: number, s = 1, flip = false) => bzChar('meio', LO_SPEC.meio, x, y, s, flip);
const loLobo = (x: number, y: number, s = 1, flip = false) => bzChar('lobo', LO_SPEC.lobo, x, y, s, flip);
// night sky with a huge moon (the moon can be anywhere)
const loNight = (mx = 540, my = 620, mr = 200) => `${bzSky('#0f1530', '#4a3060')}${bzStars(70, 6, 1100)}${bzMoon('mn', mx, my, mr)}`;
// the farmhouse at night: whitewashed walls, blue window frames, a lamp at the door, the fence
function loFarm() {
  return `${loNight(820, 380, 110)}<path d="M-20 1250 Q 300 1180 600 1230 T 1100 1210 L1100 1940 L-20 1940 Z" fill="#2c3a34" ${bzO()}/>
    <rect x="100" y="880" width="620" height="420" fill="#ece6d6" ${bzO()}/><path d="M60 900 L410 700 L760 900 Z" fill="#a8442c" ${bzO()}/>
    <rect x="160" y="980" width="130" height="120" fill="#f6e27a" ${bzO()}/><rect x="160" y="980" width="130" height="120" fill="none" stroke="#2f62b8" stroke-width="12"/>
    <rect x="360" y="1060" width="130" height="240" fill="#2f62b8" ${bzO()}/><circle cx="530" cy="1040" r="18" fill="#f6e27a" ${bzO('stroke-width="5"')}/>
    ${[...Array(9)].map((_, i) => `<rect x="${740 + i * 40}" y="1180" width="18" height="140" fill="#8a6a4a" ${bzO('stroke-width="4"')}/>`).join('')}<path d="M730 1220 h380 M730 1280 h380" stroke="#8a6a4a" stroke-width="14"/>
    <rect x="-20" y="1300" width="1120" height="640" fill="#7a6248" ${bzO()}/>`;
}
// the crossroads: two dirt roads crossing, grass in the corners, a small wooden cross at the corner
function loCross() {
  return `${loNight(540, 620, 240)}<path d="M-20 1150 L1100 1150 L1100 1940 L-20 1940 Z" fill="#2c3a34" ${bzO()}/>
    <path d="M440 1150 L640 1150 L1100 1600 L1100 1760 L860 1760 L1100 1940 L-20 1940 L220 1760 L-20 1760 L-20 1600 Z" fill="#8a7458" ${bzO()}/>
    <g transform="translate(900 1380)"><rect x="-10" y="-160" width="20" height="160" fill="#5a4a3a" ${bzO()}/><rect x="-55" y="-120" width="110" height="20" fill="#5a4a3a" ${bzO()}/></g>`;
}
// the henhouse from inside: dark planks with gaps (moonlight stripes), straw, two hens; .eye at a gap (the wolf looks in)
function loCoop() {
  let planks = ''; for (let i = 0; i < 8; i++) planks += `<rect x="${i * 140}" y="0" width="128" height="1500" fill="${i % 2 ? '#3a2a20' : '#43302a'}"/><rect x="${i * 140 + 128}" y="0" width="12" height="1500" fill="#c8d8ff" opacity="0.55"/>`;
  const hen = (x: number, y: number) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="70" ry="55" fill="#f4f2ea" ${bzO()}/><circle cx="55" cy="-50" r="30" fill="#f4f2ea" ${bzO()}/><path d="M50 -82 l8 -18 l8 18 l8 -16 l6 18" fill="#c8342c"/><path d="M82 -48 l20 6 l-20 6z" fill="#f6c744"/><circle cx="62" cy="-54" r="5" fill="${BZ.ink}"/></g>`;
  return `${planks}<rect y="1500" width="1080" height="440" fill="#c8a85a" ${bzO()}/>${hen(250, 1520)}${hen(820, 1560)}
    <g id="eye" opacity="0"><rect x="380" y="600" width="12" height="200" fill="#0b0b10"/><ellipse cx="386" cy="700" rx="10" ry="18" fill="#ffd23a"/><ellipse cx="386" cy="700" rx="3" ry="12" fill="${BZ.ink}"/></g>`;
}
// the kitchen in the morning: wood stove, window with sun, the table (drawn after the people)
function loKitchen() {
  return `<rect width="1080" height="1920" fill="#f0e2c0"/><rect x="620" y="480" width="340" height="300" fill="#9ad0f0" ${bzO('stroke-width="12"')}/>${bzSun(790, 640, 70, '#ffe08a')}<path d="M790 480 v300 M620 630 h340" stroke="${BZ.ink}" stroke-width="12"/>
    <rect x="60" y="860" width="380" height="380" fill="#b8b0a0" ${bzO()}/><rect x="100" y="900" width="300" height="60" fill="#6a6a70" ${bzO()}/><rect x="320" y="600" width="60" height="260" fill="#6a6a70" ${bzO()}/>
    <rect y="1240" width="1080" height="700" fill="#b88a5a" ${bzO()}/>`;
}
const loTable = () => `<rect x="80" y="1380" width="920" height="56" fill="#a86a3a" ${bzO()}/><rect x="120" y="1436" width="40" height="320" fill="#7a4a2a" ${bzO()}/><rect x="920" y="1436" width="40" height="320" fill="#7a4a2a" ${bzO()}/>
  <rect x="560" y="1300" width="70" height="80" rx="10" fill="#f4f2ea" ${bzO()}/><rect x="300" y="1330" width="150" height="50" rx="20" fill="#f6e2a8" ${bzO()}/>`;
// a scrap of Júlia's yellow dress (in the wolf's or Tonho's teeth)
const loScrap = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><path d="M${x - 30 * s} ${y} l${60 * s} ${-10 * s} l${10 * s} ${50 * s} l${-30 * s} ${-12 * s} l${-30 * s} ${30 * s} z" fill="#f6c744" ${bzO('stroke-width="5"')}/></g>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#0f1530', html: () => svg(`${loCross()}${loJulia(160, 1700, 1)}${loTonho(380, 1700, 1)}${loMeio(620, 1700, 1)}${loLobo(880, 1700, 0.95)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #lobo', s.t0, 'glow', 'fangs'); bzFace(tl, '#sc-test-cast #meio', s.t0, 'glow', 'open'); bzFace(tl, '#sc-test-cast #julia', s.t0, 'wide', 'o'); } },
  'test-farm': { bg: '#0f1530', html: () => svg(`${loFarm()}${loTonho(560, 1560, 1.1)}`), anim(tl, s) { bzFace(tl, '#sc-test-farm #tonho', s.t0, 'half', 'flat'); } },
  'test-howl': { bg: '#0f1530', html: () => svg(`${loCross()}${loLobo(540, 1700, 1.2)}`), anim(tl, s) { bzFace(tl, '#sc-test-howl #lobo', s.t0, 'closed', 'open'); bzPose(tl, '#sc-test-howl #lobo', s.t0, { hd: -25, aL: 40, aR: -40 }, 0.01); } },
  'test-coop': { bg: '#3a2a20', html: () => svg(`${loCoop()}${loJulia(560, 1640, 1.3)}`), anim(tl, s) { tl.set('#sc-test-coop #eye', { opacity: 1 }, s.t0); bzFace(tl, '#sc-test-coop #julia', s.t0, 'wide', 'o'); } },
  'test-kitchen': { bg: '#f0e2c0', html: () => svg(`${loKitchen()}${loTonho(700, 1600, 1.3, true)}${loScrap('sc', 700 - 0, 1600 - 446 * 1.3 + 50, 1.2)}${loTable()}`),
    anim(tl, s) { bzFace(tl, '#sc-test-kitchen #tonho', s.t0, 'dot', 'grin'); } },
  'test-face': { bg: '#0f1530', html: () => svg(`${loNight(540, 520, 300)}${loLobo(540, 2700, 3)}`), anim(tl, s) { bzFace(tl, '#sc-test-face #lobo', s.t0, 'glow', 'fangs'); } },
});
