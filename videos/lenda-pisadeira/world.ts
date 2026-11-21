// =====================================================================
//  LENDA: A PISADEIRA, in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix pi.
//  Cast: Rafa (the narrator, 15), the grandmother, the Pisadeira (very thin, long grey hair, long nails, red eyes,
//  a grin full of teeth). Sets: the bedroom at night (bed seen from the side, window, clock at 3:00), the roofs under
//  the moon, the kitchen with the feijoada, the ceiling with muddy footprints.
// =====================================================================
const PI_SPEC: Record<string, BzSpec> = {
  rafa: { kid: true, tall: 1.15, skin: '#c98757', hair: { style: 'short', color: '#1c1410' }, top: '#3a8a6a', top2: '#f4f2ea', pants: '#3a5a8a', shoes: '#c98757' },
  vo: { tall: 0.88, skin: '#e0a878', hair: { style: 'bun', color: '#ece8e0' }, glasses: true, top: '#7a5a9a', dress: '#7a5a9a', shoes: '#2b2433' },
  pis: { tall: 1.12, wide: 0.55, face: 'dead', hair: { style: 'long', color: '#8a8478' }, top: '#3a3028', dress: '#3a3028', shoes: '#9aa39a', claws: true, glow: '#ff3a2a' },
};
const piRafa = (x: number, y: number, s = 1, flip = false) => bzChar('rafa', PI_SPEC.rafa, x, y, s, flip);
const piVo = (x: number, y: number, s = 1, flip = false) => bzChar('vo', PI_SPEC.vo, x, y, s, flip);
const piPis = (x: number, y: number, s = 1, flip = false) => bzChar('pis', PI_SPEC.pis, x, y, s, flip);
// Rafa lying on his back in bed (head on the left), the blanket up to the chest
const piLying = (x: number, y: number, s = 1) => `<g id="lying"><g transform="rotate(-90 ${x} ${y})">${piRafa(x, y, s)}</g></g>`;
// the bedroom at night: blue walls, window with the moon and the roof edge, the clock, the bed (frame + blanket drawn by piBed)
function piRoom() {
  return `<rect width="1080" height="1920" fill="#1e2a48"/><rect y="1440" width="1080" height="480" fill="#2a2440" ${bzO()}/>
    <rect x="620" y="420" width="360" height="420" fill="#0f1530" ${bzO('stroke-width="12"')}/>${[[660, 470], [720, 560], [950, 640], [680, 690], [900, 450]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff" opacity="0.8"/>`).join('')}${bzMoon('mn', 880, 520, 46)}
    <path d="M620 780 L800 700 L980 780" fill="#7a3a2a" ${bzO()}/><path d="M800 420 v420 M620 630 h360" stroke="${BZ.ink}" stroke-width="12"/>
    <g id="clock"><rect x="80" y="1180" width="190" height="90" rx="12" fill="#14161c" ${bzO()}/><text x="175" y="1250" text-anchor="middle" font-family="Anton" font-size="64" fill="#ff4a3a">3:00</text></g>
    <rect x="60" y="1270" width="230" height="200" fill="#7a5a3a" ${bzO()}/>`;
}
const piBedBack = () => `<rect x="300" y="1180" width="40" height="320" fill="#6a4a2a" ${bzO()}/><rect x="300" y="1330" width="760" height="150" rx="16" fill="#8a6a4a" ${bzO()}/><rect x="330" y="1270" width="200" height="80" rx="40" fill="#f4f2ea" ${bzO()}/>`;
const piBlanket = () => `<path d="M560 1300 Q 800 1250 1080 1290 L1080 1420 L560 1420 Z" fill="#c84a4a" ${bzO()}/><path d="M600 1330 h420 M620 1370 h400" stroke="#a83838" stroke-width="10"/>`;
// the roofs at night under a big moon (clay tiles), the Pisadeira crouches on the ridge
function piRoofs() {
  let tiles = ''; for (let i = 0; i < 9; i++) tiles += `<path d="M${i * 130 - 40} 1300 q65 -40 130 0" stroke="#5a2a1e" stroke-width="10" fill="none"/>`;
  return `${bzSky('#0f1530', '#3a2f5a')}${bzStars(60, 4, 1000)}${bzMoon('mn', 540, 700, 230)}
    <path d="M-20 1150 L540 1040 L1100 1150 L1100 1940 L-20 1940 Z" fill="#8a3a2a" ${bzO()}/>${tiles}${tiles.replace(/1300/g, '1420')}${tiles.replace(/1300/g, '1540')}
    <rect x="760" y="900" width="110" height="200" fill="#6a5a50" ${bzO()}/>`;
}
// the kitchen: tiles, the table with three plates of feijoada, a pan on the stove
function piKitchen() {
  let t = ''; for (let x = 0; x <= 1080; x += 90) t += `<path d="M${x} 700 V1200" stroke="#c8c0a8" stroke-width="4"/>`; for (let y = 700; y <= 1200; y += 90) t += `<path d="M0 ${y} H1080" stroke="#c8c0a8" stroke-width="4"/>`;
  const plate = (x: number) => `<ellipse cx="${x}" cy="1440" rx="110" ry="34" fill="#f4f2ea" ${bzO()}/><ellipse cx="${x}" cy="1432" rx="76" ry="20" fill="#3a2418"/><circle cx="${x - 20}" cy="1428" r="9" fill="#e8e0c8"/><circle cx="${x + 25}" cy="1432" r="7" fill="#c84a3a"/>`;
  return `<rect width="1080" height="1920" fill="#e8dcc0"/>${t}<rect x="660" y="820" width="320" height="200" fill="#f4f2ea" ${bzO()}/><ellipse cx="820" cy="800" rx="110" ry="40" fill="#5a5a66" ${bzO()}/>
    <rect y="1200" width="1080" height="720" fill="#a88a6a" ${bzO()}/>`;
}
const piTable = () => `<rect x="60" y="1440" width="960" height="60" fill="#c98a4a" ${bzO()}/><rect x="100" y="1500" width="40" height="300" fill="#8a5a2a" ${bzO()}/><rect x="940" y="1500" width="40" height="300" fill="#8a5a2a" ${bzO()}/>
  ${[300, 540, 780].map((x) => `<ellipse cx="${x}" cy="1440" rx="110" ry="34" fill="#f4f2ea" ${bzO()}/><ellipse cx="${x}" cy="1432" rx="76" ry="20" fill="#3a2418"/><circle cx="${x - 20}" cy="1428" r="9" fill="#e8e0c8"/>`).join('')}`;
// the ceiling seen from below with muddy footprints (ids fp0..fp5 to reveal one by one)
function piCeiling() {
  const fp = (i: number, x: number, y: number, r: number) => `<g id="fp${i}" opacity="0"><g transform="translate(${x} ${y}) rotate(${r})"><ellipse cx="0" cy="0" rx="34" ry="58" fill="#5a3a24"/>${[-24, -8, 8, 24].map((tx) => `<ellipse cx="${tx}" cy="-74" rx="10" ry="14" fill="#5a3a24"/>`).join('')}</g></g>`;
  return `<rect width="1080" height="1920" fill="#d8d0c0"/>${[...Array(8)].map((_, i) => `<path d="M${i * 150} 0 V1920" stroke="#c0b8a8" stroke-width="6"/>`).join('')}
    <circle cx="540" cy="960" r="60" fill="#f4f2ea" ${bzO()}/>${[[200, 1500, -10], [380, 1250, 5], [300, 980, -8], [560, 760, 12], [480, 500, -5], [700, 300, 15]].map(([x, y, r], i) => fp(i, x, y, r)).join('')}`;
}
// a bare foot sticking out of the blanket (close-up): the big toe (.toe) can wiggle
const piFoot = () => `<rect width="1080" height="1920" fill="#1e2a48"/><path d="M-20 1100 Q 400 980 1100 1060 L1100 1940 L-20 1940 Z" fill="#c84a4a" ${bzO()}/>
  <g id="foot"><path d="M260 1080 Q 300 760 520 700 Q 700 680 760 760 Q 800 860 700 960 Q 600 1060 600 1100 Z" fill="#c98757" ${bzO('stroke-width="10"')}/>
  <g class="toe"><ellipse cx="760" cy="740" rx="56" ry="70" fill="#c98757" ${bzO('stroke-width="10"')}/><ellipse cx="770" cy="712" rx="26" ry="22" fill="#e8c0a0"/></g>
  ${[[660, 690, 34], [580, 690, 30], [510, 705, 26]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.2}" fill="#c98757" ${bzO('stroke-width="8"')}/>`).join('')}</g>`;
const piDark = (id = 'dk', c = '#05060c') => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="0"/>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#1e2a48', html: () => svg(`${piRoom()}${piRafa(220, 1700, 1)}${piVo(520, 1700, 1)}${piPis(850, 1700, 1)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #pis', s.t0, 'glow', 'fangs'); bzFace(tl, '#sc-test-cast #rafa', s.t0, 'wide', 'o'); } },
  'test-bed': { bg: '#1e2a48', html: () => svg(`${piRoom()}${piBedBack()}${piLying(870, 1310, 1.1)}${piBlanket()}${piPis(560, 1500, 1.0)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-bed #pis', s.t0, 'glow', 'fangs'); bzFace(tl, '#sc-test-bed #rafa', s.t0, 'wide', 'flat'); bzPose(tl, '#sc-test-bed #pis', s.t0, { lL: 70, lR: -70, aL: -30, aR: 30 }, 0.01); } },
  'test-roof': { bg: '#0f1530', html: () => svg(`${piRoofs()}${piPis(540, 1160, 0.9)}`), anim(tl, s) { bzFace(tl, '#sc-test-roof #pis', s.t0, 'glow', 'grin'); bzPose(tl, '#sc-test-roof #pis', s.t0, { lL: 60, lR: -60, aL: 40, aR: -40 }, 0.01); } },
  'test-kitchen': { bg: '#e8dcc0', html: () => svg(`${piKitchen()}${piRafa(400, 1560, 1.2)}${piVo(800, 1560, 1.2, true)}${piTable()}`), anim(tl, s) { bzFace(tl, '#sc-test-kitchen #vo', s.t0, 'angry', 'open'); } },
  'test-ceiling': { bg: '#d8d0c0', html: () => svg(`${piCeiling()}`), anim(tl, s) { for (let i = 0; i < 6; i++) tl.set(`#sc-test-ceiling #fp${i}`, { opacity: 1 }, s.t0 + 0.2); } },
  'test-foot': { bg: '#1e2a48', html: () => svg(`${piFoot()}`), anim() {} },
  'test-face': { bg: '#14161c', html: () => svg(`<rect width="1080" height="1920" fill="#14161c"/>${piPis(540, 2650, 3.2)}`), anim(tl, s) { bzFace(tl, '#sc-test-face #pis', s.t0, 'glow', 'fangs'); } },
});
