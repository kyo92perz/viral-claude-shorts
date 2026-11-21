// =====================================================================
//  LENDA: A MULHER DE BRANCO, in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix br.
//  Cast: Seu Jair (the trucker, moustache, blue cap), the woman in white (pale, long black hair, a veil, wet),
//  the grandfather (a sepia photo), the narrator is heard only.
//  Sets: the highway at night in the rain (headlights, KM 7 sign), the truck from the side, the cab seen through the
//  windshield (driver left, passenger right, rear-view mirror), the cemetery lights in the woods, the empty seat.
// =====================================================================
const BR_VEIL = '<path d="M-100 -40 Q -110 -130 0 -128 Q 110 -130 100 -40 L 130 200 L -130 200 Z" fill="#f4f8ff" opacity="0.55" stroke="#2b2433" stroke-width="5"/>';
const BR_SPEC: Record<string, BzSpec> = {
  jair: { skin: '#c98757', hat: { kind: 'cap', color: '#2f62b8' }, mustache: '#3a2418', hair: { style: 'short', color: '#3a2418' }, top: '#a84a3a', top2: '#6a2a20', pants: '#3a4a6a', shoes: '#2b2433' },
  moca: { tall: 1.02, wide: 0.8, face: 'pale', hair: { style: 'long', color: '#14121a' }, top: '#f4f6fa', dress: '#f4f6fa', shoes: '#f4f6fa', headBack: BR_VEIL },
};
const brJair = (x: number, y: number, s = 1, flip = false) => bzChar('jair', BR_SPEC.jair, x, y, s, flip);
const brMoca = (x: number, y: number, s = 1, flip = false) => bzChar('moca', BR_SPEC.moca, x, y, s, flip);
// rain streaks (one group to scroll down: .rain)
const brRain = (n = 70, op = 0.5) => `<g class="rain" opacity="${op}">${[...Array(n)].map((_, i) => { const x = (i * 157) % 1080, y = (i * 271) % 1920; return `<path d="M${x} ${y} l-14 60 M${x} ${y - 1920} l-14 60" stroke="#c8d8ff" stroke-width="4" stroke-linecap="round"/>`; }).join('')}</g>`;
function brRainFall(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  tl.fromTo(`${sel} .rain`, { y: 0, x: 0 }, { y: 1920 * (t1 - t0) * 0.9, x: -420 * (t1 - t0) * 0.9, duration: t1 - t0, ease: 'none', modifiers: { y: (v: string) => `${parseFloat(v) % 1920}px`, x: (v: string) => `${parseFloat(v) % 448}px` } }, t0);
}
// the highway at night seen from the cab: the road in perspective, the headlight cone, the KM 7 sign, trees as dark shapes
function brRoad() {
  return `${bzSky('#05070f', '#1a1e34')}<path d="M-20 1000 Q 200 930 300 980 Q 420 900 560 990 Q 700 920 820 990 Q 950 930 1100 1000 L1100 1100 L-20 1100 Z" fill="#0b0e18"/>
    <rect x="-20" y="1000" width="1120" height="940" fill="#1a1c24"/><path d="M500 1000 L580 1000 L1100 1940 L-20 1940 Z" fill="#2a2c36" ${bzO()}/>
    <path d="M540 1010 L540 1940" stroke="#f6c744" stroke-width="10" stroke-dasharray="60 70"/><path d="M500 1000 L-20 1700 M580 1000 L1100 1700" stroke="#e8e4dc" stroke-width="8"/>
    <path d="M420 1940 L520 1000 L560 1000 L660 1940 Z M-200 1940 L480 1000 L600 1000 L1280 1940 Z" fill="#fff6c8" opacity="0.10"/>
    <g id="km"><rect x="820" y="980" width="16" height="140" fill="#9aa0aa"/><rect x="770" y="900" width="120" height="90" rx="8" fill="#2f8a4a" ${bzO('stroke-width="5"')}/><text x="830" y="962" text-anchor="middle" font-family="Anton" font-size="46" fill="#fff">KM 7</text></g>`;
}
// the truck seen from the side (facing right): cab with a lit window, trailer, wheels (.wh), headlight beam
function brTruck(x: number, y: number, s = 1, beam = true) {
  const wh = (cx: number) => `<g class="wh"><circle cx="${cx}" cy="0" r="62" fill="#1b1418" ${bzO()}/><circle cx="${cx}" cy="0" r="24" fill="#9aa0aa"/><path d="M${cx - 24} 0 h48" stroke="${BZ.ink}" stroke-width="6"/></g>`;
  return `<g id="truck"><g transform="translate(${x} ${y}) scale(${s})">${beam ? '<path d="M300 -150 L900 -260 L900 -40 Z" fill="#fff6c8" opacity="0.18"/>' : ''}
    <rect x="-560" y="-330" width="560" height="270" fill="#c8c0b0" ${bzO()}/><text x="-280" y="-180" text-anchor="middle" font-family="Anton" font-size="60" fill="#8a3a2a">TRANSPORTES</text>
    <path d="M20 -60 L20 -300 L190 -300 L280 -190 L300 -60 Z" fill="#c8342c" ${bzO()}/><path d="M50 -280 L170 -280 L240 -190 L50 -190 Z" fill="#f6e27a" ${bzO('stroke-width="5"')}/>
    <rect x="270" y="-140" width="40" height="40" fill="#fff6c8" ${bzO('stroke-width="5"')}/><rect x="-560" y="-70" width="870" height="30" fill="#3a3a44" ${bzO()}/>${wh(-440)}${wh(-300)}${wh(180)}</g></g>`;
}
// the cab seen through the windshield: dark glass with rain, dashboard, steering wheel on the left, the rear-view mirror (#mirror) at the top
function brCab() {
  return `<rect width="1080" height="1920" fill="#14161e"/><rect x="40" y="420" width="1000" height="980" rx="40" fill="#24283a" ${bzO('stroke-width="12"')}/>
    <rect x="-20" y="1380" width="1120" height="560" fill="#3a3640" ${bzO()}/><rect x="-20" y="1380" width="1120" height="60" fill="#4a4650"/>
    <g id="radio"><rect x="470" y="1460" width="140" height="70" rx="8" fill="#1b1418" ${bzO('stroke-width="5"')}/><rect x="485" y="1475" width="70" height="40" fill="#3aff9a" opacity="0.6"/><circle cx="585" cy="1495" r="14" fill="#9aa0aa"/></g>`;
}
const brWheel = () => `<g id="wheel"><circle cx="270" cy="1520" r="190" fill="none" stroke="${BZ.ink}" stroke-width="44"/><circle cx="270" cy="1520" r="190" fill="none" stroke="#2a2a30" stroke-width="28"/><path d="M90 1520 h360 M270 1520 v190" stroke="#2a2a30" stroke-width="26"/></g>`;
const brMirror = (inside = '', c = 'brmc' + (BZ_UID++)) => `<g id="mirror"><rect x="360" y="440" width="360" height="130" rx="20" fill="#1b1e2a" ${bzO('stroke-width="9"')}/><defs><clipPath id="${c}"><rect x="372" y="452" width="336" height="106" rx="14"/></clipPath></defs><g clip-path="url(#${c})"><rect x="372" y="452" width="336" height="106" fill="#3a4058"/>${inside}</g></g>`;
// the cemetery in the woods: crosses with candles (.candle flickers), dark trees, low fog
function brCemetery() {
  const cross = (x: number, y: number, s: number) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-150" width="20" height="150" fill="#8a8a94" ${bzO()}/><rect x="-55" y="-115" width="110" height="20" fill="#8a8a94" ${bzO()}/><g class="candle"><rect x="20" y="-30" width="14" height="30" fill="#f4f2ea"/><ellipse cx="27" cy="-40" rx="9" ry="16" fill="#ffd27a"/><circle cx="27" cy="-38" r="30" fill="#ffd27a" opacity="0.2"/></g></g>`;
  return `${bzSky('#05070f', '#1a1e34')}${[[100, 1000], [300, 960], [780, 980], [980, 1010]].map(([x, y]) => `<path d="M${x - 120} ${y + 200} Q ${x} ${y - 300} ${x + 120} ${y + 200} Z" fill="#0b0e18"/>`).join('')}
    <rect x="-20" y="1180" width="1120" height="760" fill="#12161e"/>${cross(260, 1360, 1)}${cross(520, 1300, 0.8)}${cross(760, 1380, 1.1)}${cross(400, 1520, 1.3)}${cross(880, 1560, 1.2)}${bzFog(1440, '#8a90b0', 0.25)}`;
}
// the empty passenger seat: the seat, a puddle (#puddle) and the veil (#veil)
function brSeat() {
  return `<rect width="1080" height="1920" fill="#1e2030"/><rect x="180" y="500" width="720" height="760" rx="80" fill="#5a3a3a" ${bzO()}/><rect x="150" y="1180" width="780" height="300" rx="60" fill="#6a4444" ${bzO()}/>
    <ellipse id="puddle" cx="540" cy="1290" rx="260" ry="60" fill="#8ab0d8" opacity="0.6" ${bzO('stroke-width="5"')}/>
    <g id="veil"><path d="M380 1240 Q 540 1120 720 1250 Q 640 1300 540 1270 Q 450 1300 380 1240 Z" fill="#f4f8ff" opacity="0.8" ${bzO('stroke-width="5"')}/></g>`;
}
// the sepia photo of the grandfather with the same truck
function brPhoto() {
  return `<rect width="1080" height="1920" fill="#2a2018"/><g transform="rotate(-4 540 960)"><rect x="140" y="520" width="800" height="880" fill="#f4ead0" ${bzO('stroke-width="10"')}/><rect x="190" y="570" width="700" height="640" fill="#c8a878"/>
    <g opacity="0.85" style="filter:sepia(1)"><g transform="translate(0 0)">${brTruck(760, 1150, 0.6, false)}</g>${bzChar('avo', { skin: '#b08a68', hat: { kind: 'cap', color: '#6a5a48' }, mustache: '#3a2a1a', top: '#8a6a4a', pants: '#5a4a3a', shoes: '#2b2433' }, 380, 1180, 0.8)}</g>
    <text x="540" y="1320" text-anchor="middle" font-family="Anton" font-size="64" fill="#5a4a3a">JAIR • 1979</text></g>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#05070f', html: () => svg(`${brRoad()}${brJair(300, 1700, 1.1)}${brMoca(760, 1700, 1.1)}${brRain()}`), anim(tl, s) { bzFace(tl, '#sc-test-cast #moca', s.t0, 'dead', 'flat'); } },
  'test-road': { bg: '#05070f', html: () => svg(`${brRoad()}${brMoca(260, 1300, 0.55)}${brRain()}`), anim(tl, s) { brRainFall(tl, '#sc-test-road', s.t0, s.t1); bzFace(tl, '#sc-test-road #moca', s.t0, 'dead', 'flat'); } },
  'test-truck': { bg: '#05070f', html: () => svg(`${brRoad()}${brTruck(540, 1500, 0.9)}${brRain()}`), anim() {} },
  'test-cab': { bg: '#14161e', html: () => svg(`${brCab()}${brJair(270, 1900, 1.4)}${brMoca(800, 1900, 1.4)}${brMirror(`<rect x="372" y="452" width="336" height="106" fill="#2a2e44"/>`)}${brWheel()}${brRain(40, 0.35)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cab #moca', s.t0, 'dead', 'flat'); bzFace(tl, '#sc-test-cab #jair', s.t0, 'dot', 'flat'); } },
  'test-cemetery': { bg: '#05070f', html: () => svg(`${brCemetery()}`), anim() {} },
  'test-seat': { bg: '#1e2030', html: () => svg(`${brSeat()}`), anim() {} },
  'test-photo': { bg: '#2a2018', html: () => svg(`${brPhoto()}`), anim() {} },
});
