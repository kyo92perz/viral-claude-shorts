// =====================================================================
//  AMERICAN LEGENDS EP.3: RESURRECTION MARY, Brasil Z toon look (styles/flat2d/toon.ts), 9:16, English. Prefix rm.
//  Cast (original designs): Nick (the narrator, a young man, brown leather jacket) and Mary (a pale girl in an old
//  white dance dress, short blonde waved hair, a flower pinned on the dress, a faint blue glow; her eyes go empty).
//  Sets: Archer Avenue at night in the snow (street lamps, trees, the road), the inside of the old car (dashboard,
//  windshield, wipers, the passenger seat), the cemetery gates (iron bars, a stone arch), the graves in fog.
//  The only threat colour is a cold pale blue.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet.
// =====================================================================
const RM_FLOWER = '<g transform="translate(-34 -330)"><circle r="16" fill="#f4e8e8" stroke="#2b2433" stroke-width="5"/><circle r="6" fill="#e8c870"/></g>';
const RM_SPEC: Record<string, BzSpec> = {
  nick: { skin: '#e8b48a', hair: { style: 'messy', color: '#3a2418' }, top: '#8a5a32', top2: '#f4f2ea', pants: '#2a3a5a', shoes: '#2a1a12' },
  mary: { tall: 0.95, skin: '#dfe6ee', face: 'pale', hair: { style: 'short', color: '#e8d48a' }, top: '#f4f2f8', dress: '#f4f2f8', shoes: '#dfe6ee', glow: '#9ad8ff', extra: RM_FLOWER },
};
const rmChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, RM_SPEC[k], x, y, s, flip);
// a street lamp with its pool of light
const rmLamp = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-560" width="20" height="560" fill="#2a2a34" ${bzO('stroke-width="5"')}/><path d="M0 -560 q 60 -20 90 10" stroke="#2a2a34" stroke-width="14" fill="none"/><path d="M60 -540 h60 l -10 30 h-40 z" fill="#ffe8a0" ${bzO('stroke-width="5"')}/>
  <path d="M60 -510 L -40 0 L 220 0 L 120 -510 Z" fill="#ffe8a0" opacity="0.12"/></g>`;
// Archer Avenue at night in snow: dark sky, bare trees, the road (from y 1250), lamps, falling snow is a particle layer
function rmRoad() {
  const tree = (x: number, y: number, s: number) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="#141820" fill="none" stroke-linecap="round"><path d="M0 0 V-420" stroke-width="30"/><path d="M0 -260 L -120 -380 M0 -320 L 110 -460 M0 -400 L -60 -520 M-60 -330 L -150 -330" stroke-width="16"/></g>`;
  return `${bzSky('#060812', '#1e2638')}${bzStars(40, 3, 800)}${tree(120, 1250, 1.2)}${tree(960, 1240, 1.0)}${tree(540, 1220, 0.7)}
    <rect x="-20" y="1250" width="1120" height="700" fill="#2a2e3a" ${bzO()}/><path d="M-20 1250 H1100" stroke="#e8eef4" stroke-width="30"/><path d="M540 1300 v120 M540 1500 v140 M540 1720 v160" stroke="#f6c744" stroke-width="16"/>
    ${rmLamp(80, 1260, 1)}${rmLamp(840, 1260, 0.9)}<path d="M-20 1890 H1100" stroke="#e8eef4" stroke-width="40"/>`;
}
// inside the car at night: the windshield (y 200–900) with the road and a lamp passing, the dashboard, the bench seat
function rmCar(outside = '') {
  return `<rect width="1080" height="1920" fill="#14161e"/><defs><clipPath id="rmws"><path d="M60 220 Q 540 160 1020 220 L 1000 900 L 80 900 Z"/></clipPath></defs>
    <g clip-path="url(#rmws)">${outside || `${bzSky('#060812', '#1e2638')}<rect y="700" width="1080" height="300" fill="#2a2e3a"/><path d="M540 720 L 400 900 M540 720 L 680 900" stroke="#f6c744" stroke-width="10"/>`}</g>
    <path d="M60 220 Q 540 160 1020 220 L 1000 900 L 80 900 Z" fill="none" ${bzO('stroke-width="14"')}/><path d="M300 880 L 520 560" stroke="#2a2a34" stroke-width="12" class="wp1"/><path d="M780 880 L 960 600" stroke="#2a2a34" stroke-width="12" class="wp2"/>
    <rect x="-20" y="900" width="1120" height="260" fill="#3a2a2a" ${bzO()}/><circle cx="300" cy="1000" r="70" fill="#1e1a1a" ${bzO()}/><circle cx="300" cy="1000" r="40" fill="#ffe8a0" opacity="0.4"/><circle cx="480" cy="1010" r="40" fill="#1e1a1a" ${bzO()}/>
    <rect x="-20" y="1480" width="1120" height="460" fill="#6a2a2a" ${bzO()}/><path d="M540 1480 V1940" stroke="#4a1a1a" stroke-width="10"/>`;
}
// the cemetery gates: a stone arch with the name, iron bars (x 260–820), the graves and fog behind them
function rmGates(name = true) {
  const graves = [[200, 1180, 1], [420, 1150, 0.8], [700, 1170, 0.9], [900, 1190, 1.1], [560, 1120, 0.6]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-50 0 V-120 Q 0 -180 50 -120 V0 Z" fill="#7a8090" ${bzO()}/><path d="M0 -130 v50 M-20 -110 h40" stroke="#4a5060" stroke-width="8"/></g>`).join('');
  const bars = [...Array(12)].map((_, i) => `<rect x="${270 + i * 48}" y="700" width="14" height="600" fill="#141418" ${bzO('stroke-width="4"')}/><path d="M${277 + i * 48} 700 l -12 -24 l 12 -24 l 12 24 z" fill="#141418"/>`).join('');
  return `${bzSky('#060812', '#202a3c')}${bzStars(50, 6, 700)}${bzMoon('mn', 820, 260, 60)}${graves}${bzFog(1100, '#9aa8c0', 0.3)}
    <rect x="80" y="440" width="180" height="900" fill="#6a6e7a" ${bzO()}/><rect x="820" y="440" width="180" height="900" fill="#6a6e7a" ${bzO()}/><path d="M80 460 Q 540 200 1000 460 L 1000 540 Q 540 300 80 540 Z" fill="#6a6e7a" ${bzO()}/>
    ${name ? `<text x="540" y="420" text-anchor="middle" font-family="Anton" font-size="62" fill="#e8eef4" transform="rotate(0)">RESURRECTION</text>` : ''}${bars}<rect x="-20" y="1300" width="1120" height="640" fill="#e8eef4" ${bzO()}/>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#060812', html: () => svg(`${rmRoad()}${rmChar('nick', 340, 1700, 1.0)}${rmChar('mary', 720, 1700, 1.0)}`), anim(tl, s) { bzFace(tl, '#sc-test-cast #mary', s.t0, 'half', 'smile'); } },
  'test-car': { bg: '#14161e', html: () => svg(`${rmCar()}${rmChar('mary', 790, 1480 + 507 * 1.4 - 300, 1.4)}${rmChar('nick', 290, 1480 + 507 * 1.4 - 300, 1.4)}`), anim(tl, s) { bzFace(tl, '#sc-test-car #mary', s.t0, 'dead', 'flat'); } },
  'test-gates': { bg: '#060812', html: () => svg(`${rmGates()}${rmChar('mary', 560, 1250, 0.45)}`), anim() {} },
  'cover-a': { bg: '#060812', html: () => svg(`${rmRoad()}${rmChar('mary', 540, 2500, 3.0)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #mary', s.t0, 'glow', 'flat'); } },
  'cover-b': { bg: '#060812', html: () => svg(`${rmGates()}${rmChar('mary', 560, 1250, 0.5)}${bzVignette(0.5)}`), anim() {} },
});
