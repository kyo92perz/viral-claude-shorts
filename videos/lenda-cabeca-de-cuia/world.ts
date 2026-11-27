// =====================================================================
//  LENDA: O CABEÇA DE CUIA, Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix cc.
//  Cast (original designs): Pedro (the narrator, 13), Maria (his best friend, 13, curly black hair), his grandmother
//  (white bun, glasses) and the Cabeça de Cuia: an enormous round head like a gourd bowl (brown, ridged), long wet black
//  hair, yellow eyes, a thin grey arm with long fingers. In the water only the top of the head shows: it looks like a
//  floating gourd. The only threat colour is the yellow of his eyes.
//  Sets: the meeting of the Poti and the Parnaíba in Teresina (sand bank, two river colours, carnaúba palms, a bridge
//  far away), the grandmother's porch, underwater (green murk, legs, the hand), Maria's ankle with five purple marks.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, kids (tall 1.15–1.2) ~400–415*s.
// =====================================================================
const CC_SPEC: Record<string, BzSpec> = {
  pedro: { kid: true, tall: 1.2, skin: '#a8683e', hair: { style: 'short', color: '#1c1410' }, top: '#e8a030', pants: '#3a6a8a', shoes: '#2b2433' },
  maria: { kid: true, tall: 1.15, skin: '#8a5a3a', hair: { style: 'afro', color: '#1c1410' }, top: '#7a4ac8', top2: '#f6c744', pants: '#7a4ac8', shoes: '#8a5a3a' },
  vo: { skin: '#a8683e', hair: { style: 'bun', color: '#ece8e0' }, glasses: true, top: '#3a8a5a', dress: '#3a8a5a', shoes: '#2b2433' },
};
const ccChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, CC_SPEC[k], x, y, s, flip);
// the gourd head: origin at its centre, radius 200*s. .eyes (yellow, hidden until shown), .mouth, .hair strands
const ccHead = (id: string, x: number, y: number, s = 1, eyes = true) => `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${s})">
  <g class="hair">${[...Array(11)].map((_, i) => { const hx = -180 + i * 36; return `<path d="M${hx} -40 Q ${hx - 20} 140 ${hx + 10} ${220 + (i % 3) * 50}" stroke="${BZ.ink}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M${hx} -40 Q ${hx - 20} 140 ${hx + 10} ${220 + (i % 3) * 50}" stroke="#141418" stroke-width="12" fill="none" stroke-linecap="round"/>`; }).join('')}</g>
  <ellipse cx="0" cy="0" rx="200" ry="185" fill="#6a4a2a" ${bzO('stroke-width="9"')}/><path d="M-150 -60 Q -100 -150 -20 -170 M60 -175 Q 130 -150 165 -80" stroke="#4a3018" stroke-width="8" fill="none" opacity="0.8"/>
  <ellipse cx="-80" cy="-110" rx="60" ry="24" fill="#a8784a" opacity="0.45"/><path d="M-130 -40 Q -70 -70 -20 -40 M20 -40 Q 70 -70 130 -40" stroke="${BZ.ink}" stroke-width="16" fill="none" stroke-linecap="round"/>
  <g class="eyes"${eyes ? '' : ' opacity="0"'}>${bzGlow(id + 'eg', 0, 10, 220, '#ffd23a', 0.35)}<ellipse cx="-70" cy="10" rx="40" ry="28" fill="#ffd23a" ${bzO('stroke-width="7"')}/><ellipse cx="70" cy="10" rx="40" ry="28" fill="#ffd23a" ${bzO('stroke-width="7"')}/><ellipse cx="-70" cy="10" rx="8" ry="24" fill="${BZ.ink}"/><ellipse cx="70" cy="10" rx="8" ry="24" fill="${BZ.ink}"/></g>
  <path class="mouth" d="M-90 100 Q 0 150 90 100 Q 0 120 -90 100 Z" fill="#2a1418" ${bzO('stroke-width="6"')}/></g></g></g>`;
// the long grey hand (fingers up), origin at the wrist
const ccHand = (id: string, x: number, y: number, s = 1, rot = 0) => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-30 300 L -24 0 L 24 0 L 30 300 Z" fill="#7a8a80" ${bzO()}/>
  <ellipse cx="0" cy="-20" rx="60" ry="50" fill="#7a8a80" ${bzO()}/>${[-48, -22, 4, 30].map((fx, i) => `<path d="M${fx} -50 L ${fx * 1.3} ${-170 - (i % 2) * 30}" stroke="${BZ.ink}" stroke-width="26" stroke-linecap="round"/><path d="M${fx} -50 L ${fx * 1.3} ${-170 - (i % 2) * 30}" stroke="#7a8a80" stroke-width="14" stroke-linecap="round"/>`).join('')}
  <path d="M52 -10 L 110 -80" stroke="${BZ.ink}" stroke-width="26" stroke-linecap="round"/><path d="M52 -10 L 110 -80" stroke="#7a8a80" stroke-width="14" stroke-linecap="round"/></g></g>`;
// a carnaúba palm
const ccPalm = (x: number, y: number, s: number, c = '#2f6a3a') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q 14 -300 -4 -600" stroke="#5a4a3a" stroke-width="26" fill="none"/><path d="M0 0 Q 14 -300 -4 -600" stroke="${BZ.ink}" stroke-width="4" fill="none" stroke-dasharray="4 26"/>
  <g transform="translate(-4 -600)">${[...Array(12)].map((_, i) => `<path d="M0 0 L ${Math.cos(i * 0.52) * 170} ${Math.sin(i * 0.52) * 120 - 40}" stroke="${c}" stroke-width="14" stroke-linecap="round"/>`).join('')}<circle r="40" fill="${c}" ${bzO()}/></g></g>`;
// the meeting of the rivers: sky (day or dusk), a bridge far away, palms, two water colours (#wv ripples), the sand bank from y 1300
const CC_PAL = { day: { sky: ['#4a9ad8', '#f4e4b8'], w1: '#5a8a6a', w2: '#9a6a3a', sand: '#e8c890' }, dusk: { sky: ['#e86a3a', '#4a2a5a'], w1: '#3a5a5a', w2: '#6a4a2a', sand: '#b89060' } };
function ccRiver(P = CC_PAL.day, bank = true) {
  const wv = [...Array(10)].map((_, i) => `<path class="wv" d="M${(i * 197) % 1000} ${1020 + (i * 61) % 260} q 30 -14 60 0 t 60 0" stroke="#fff" stroke-width="6" fill="none" opacity="0.35"/>`).join('');
  return `${bzSky(P.sky[0], P.sky[1])}${P === CC_PAL.dusk ? bzSun(780, 900, 110, '#ffb050') : bzSun(820, 300, 90, '#fff4c0')}
    <g opacity="0.75"><rect x="-20" y="870" width="1120" height="16" fill="#8a8a9a"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${60 + i * 160}" y="870" width="14" height="110" fill="#8a8a9a"/>`).join('')}</g>
    ${ccPalm(80, 980, 0.8)}${ccPalm(960, 970, 0.7)}<rect x="-20" y="960" width="1120" height="${bank ? 380 : 1000}" fill="${P.w1}"/><path d="M500 960 Q 560 1100 460 1340 L 1100 1340 L 1100 960 Z" fill="${P.w2}" opacity="0.9"/>
    <g id="wv">${wv}</g>${bank ? `<path d="M-40 1300 Q 300 1270 600 1310 T 1120 1290 L 1120 1940 L -40 1940 Z" fill="${P.sand}" ${bzO()}/>${[...Array(8)].map((_, i) => `<ellipse cx="${(i * 233) % 1080}" cy="${1360 + (i * 97) % 520}" rx="${40 + (i % 3) * 20}" ry="8" fill="#000" opacity="0.08"/>`).join('')}` : ''}`;
}
// the floating gourd: only the dome of the head above the water line (local y 0 = water line)
const ccDome = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-200 0 A 200 140 0 0 1 200 0 Z" fill="#6a4a2a" ${bzO('stroke-width="9"')}/><ellipse cx="-70" cy="-90" rx="50" ry="18" fill="#a8784a" opacity="0.45"/>
  <ellipse cx="0" cy="4" rx="240" ry="26" fill="none" stroke="#fff" stroke-width="6" opacity="0.4"/></g></g>`;
// the grandmother's porch at dusk: wall, a hammock, a window
const ccPorch = () => `${bzSky('#e86a3a', '#4a2a5a')}<rect x="-20" y="500" width="1120" height="800" fill="#e8c8a0" ${bzO()}/><rect x="-20" y="440" width="1120" height="80" fill="#a8502a" ${bzO()}/>
  <rect x="640" y="700" width="260" height="280" fill="#3a5a8a" ${bzO()}/><path d="M770 700 v280 M640 840 h260" stroke="${BZ.ink}" stroke-width="8"/><path d="M60 760 Q 300 1040 560 760" stroke="${BZ.ink}" stroke-width="10" fill="none"/><path d="M90 790 Q 300 1080 530 790 Q 300 960 90 790 Z" fill="#c8342c" ${bzO()}/>
  <rect x="-20" y="1280" width="1120" height="660" fill="#8a5a3a" ${bzO()}/>`;
// underwater: green murk, light shafts, bubbles; Maria's kicking legs from the top (.kl / .kr)
const ccUnder = () => `<rect width="1080" height="1920" fill="#2a4a3a"/>${bzRays('ry', 540, -200, 5, 1900, '#bfe8c0', 0.1)}<rect width="1080" height="1920" fill="#0a1a14" opacity="0.35"/>
  <g id="legs">${[[430, 'kl'], [650, 'kr']].map(([lx, c]) => `<g class="${c}"><rect x="${+lx - 40}" y="-40" width="80" height="640" rx="36" fill="#8a5a3a" ${bzO('stroke-width="9"')}/><ellipse cx="${lx}" cy="610" rx="56" ry="36" fill="#8a5a3a" ${bzO('stroke-width="9"')}/></g>`).join('')}</g>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#4a9ad8', html: () => svg(`${ccRiver()}${ccChar('pedro', 200, 1720, 1.0)}${ccChar('maria', 440, 1720, 1.0)}${ccChar('vo', 680, 1720, 1.0)}${ccHead('cc', 900, 1450, 0.5)}`), anim() {} },
  'test-river': { bg: '#4a9ad8', html: () => svg(`${ccRiver(CC_PAL.dusk)}${ccDome('dm', 600, 1150, 0.6)}`), anim() {} },
  'test-porch': { bg: '#e86a3a', html: () => svg(`${ccPorch()}${ccChar('vo', 540, 1700, 1.2)}`), anim() {} },
  'test-under': { bg: '#2a4a3a', html: () => svg(`${ccUnder()}${ccHand('hd', 560, 1300, 1.2, -10)}`), anim() {} },
  'test-head': { bg: '#3a5a5a', html: () => svg(`${ccRiver(CC_PAL.dusk, false)}${ccHead('cc', 540, 960, 2.0)}<rect y="1150" width="1080" height="800" fill="#3a5a5a" opacity="0.9"/>`), anim() {} },
  'cover-a': { bg: '#3a5a5a', html: () => svg(`${ccRiver(CC_PAL.dusk, false)}${ccHead('cc', 540, 1000, 2.2)}<rect y="1180" width="1080" height="800" fill="#2a4a4a" opacity="0.92"/>${bzVignette(0.55)}`), anim() {} },
  'cover-b': { bg: '#2a4a3a', html: () => svg(`${ccUnder()}${ccHand('hd', 540, 1500, 1.6, -6)}${bzVignette(0.55)}`), anim() {} },
});
