// =====================================================================
//  AMERICAN LEGENDS EP.1: BLOODY MARY, Brasil Z toon look (styles/flat2d/toon.ts), 9:16, English. Prefix bm.
//  Cast (original designs): Emma (the narrator, 13, red hair in a ponytail, green hoodie), Kayla (her friend, curly
//  hair, purple pyjamas), two more girls at the sleepover, and Mary in the mirror: grey skin, long wet black hair that
//  hides half the face, black eyes, a red smile, an old white gown. The only threat colour is red.
//  Sets: the bedroom sleepover (sleeping bags, fairy lights, pizza box), the dark bathroom (tiles, sink, the mirror,
//  the candle), the mirror close-up with the reflection, the morning mirror with words written from the other side.
//  Framing: captions y 1190–1400. Heads: kids (tall 1.15) ~400*s above the feet, adults 507*s.
// =====================================================================
const BM_HAIR = '<path d="M-100 -60 Q -130 120 -110 300 L -60 300 Q -70 100 -40 -40 Z M100 -60 Q 130 120 110 300 L 60 300 Q 70 100 40 -40 Z" fill="#0c0a10" stroke="#2b2433" stroke-width="7" stroke-linejoin="round"/>';
const BM_VEIL = '<path d="M-95 -40 Q -90 -100 0 -100 Q 90 -100 95 -40 Q 40 -70 10 -10 Q -10 60 -20 120 L -95 110 Z" fill="#0c0a10"/>';
const BM_SPEC: Record<string, BzSpec> = {
  emma: { kid: true, tall: 1.15, skin: '#f0c4a0', hair: { style: 'pony', color: '#c8542c' }, top: '#3a8a5a', top2: '#f4f2ea', pants: '#3a4a7a', shoes: '#f4f2ea' },
  kayla: { kid: true, tall: 1.12, skin: '#8a5a3a', hair: { style: 'afro', color: '#1c1410' }, top: '#8a5ac8', pants: '#8a5ac8', shoes: '#f4f2ea' },
  zoe: { kid: true, tall: 1.1, skin: '#e8b48a', hair: { style: 'long', color: '#e8c870' }, top: '#e86a8a', pants: '#3a4a7a', shoes: '#f4f2ea' },
  mia: { kid: true, tall: 1.1, skin: '#c98757', hair: { style: 'bun', color: '#2a1a12' }, top: '#3a8ac8', pants: '#3a4a7a', shoes: '#f4f2ea' },
  mary: { tall: 1.0, skin: '#9aa0a0', face: 'dead', hair: { style: 'long', color: '#0c0a10' }, top: '#e8e4d8', dress: '#e8e4d8', shoes: '#9aa0a0', headBack: BM_HAIR, headFront: BM_VEIL, glow: '#e8303a' },
};
const bmChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, BM_SPEC[k], x, y, s, flip);
// fairy lights along a curve (.fl bulbs)
const bmLights = (y: number) => `<path d="M-20 ${y} Q 270 ${y + 80} 540 ${y} T 1100 ${y}" stroke="${BZ.ink}" stroke-width="4" fill="none"/>${[...Array(12)].map((_, i) => `<circle class="fl" cx="${40 + i * 90}" cy="${y + 30 + Math.sin(i * 1.1) * 26}" r="13" fill="${['#ffd27a', '#ff9aa8', '#9ae0ff'][i % 3]}"/>`).join('')}`;
// the bedroom at night: purple walls, window with the moon, the bed, sleeping bags on the floor, a pizza box
function bmBedroom() {
  return `<rect width="1080" height="1920" fill="#3a2a5a"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1300" stroke="#34264f" stroke-width="10"/>`).join('')}
    <rect x="640" y="360" width="320" height="360" fill="#0b1028" ${bzO('stroke-width="12"')}/>${bzMoon('mn', 860, 470, 46)}<path d="M800 360 v360 M640 540 h320" stroke="${BZ.ink}" stroke-width="10"/>
    ${bmLights(300)}<rect x="60" y="430" width="200" height="260" fill="#f4f2ea" ${bzO()}/><text x="160" y="580" text-anchor="middle" font-family="Anton" font-size="60" fill="#e8303a" transform="rotate(-6 160 560)">13!</text>
    <rect x="-20" y="1250" width="1120" height="700" fill="#5a4a7a" ${bzO()}/>
    ${[[150, 1560, '#e86a8a'], [450, 1620, '#3a8ac8'], [760, 1580, '#f6c744']].map(([x, y, c]) => `<rect x="${+x - 140}" y="${+y - 60}" width="280" height="120" rx="50" fill="${c}" ${bzO()}/><rect x="${+x - 140}" y="${+y - 60}" width="80" height="120" rx="40" fill="#f4f2ea" ${bzO()}/>`).join('')}
    <g transform="translate(880 1400) rotate(8)"><rect x="-110" y="-24" width="220" height="48" fill="#c8945a" ${bzO()}/><text x="0" y="12" text-anchor="middle" font-family="Anton" font-size="30" fill="#e8303a">PIZZA</text></g>`;
}
// the dark bathroom: tiles, the sink, the mirror (glass x 240–840, y 300–1100; #glass) and its frame
function bmBath(lit = false) {
  const wall = lit ? '#cfe0e4' : '#1a2230', tile = lit ? '#b8ccd2' : '#141a26';
  return `<rect width="1080" height="1920" fill="${wall}"/>${[...Array(16)].map((_, i) => `<path d="M0 ${i * 120} H1080" stroke="${tile}" stroke-width="6"/>`).join('')}${[...Array(9)].map((_, i) => `<path d="M${i * 120 + 60} 0 V1920" stroke="${tile}" stroke-width="6"/>`).join('')}
    <rect x="210" y="270" width="660" height="860" rx="20" fill="#5a5a66" ${bzO('stroke-width="12"')}/><rect id="glass" x="240" y="300" width="600" height="800" rx="10" fill="${lit ? '#a8c8d4' : '#0e141e'}" ${bzO()}/>
    <path d="M300 360 L 420 360 L 300 520 Z" fill="#fff" opacity="${lit ? 0.35 : 0.08}"/>
    <rect x="180" y="1180" width="720" height="90" rx="20" fill="${lit ? '#f4f2ea' : '#2a3040'}" ${bzO()}/><path d="M400 1270 Q 540 1420 680 1270" fill="${lit ? '#f4f2ea' : '#2a3040'}" ${bzO()}/><rect x="525" y="1130" width="30" height="60" fill="#8a8a94" ${bzO('stroke-width="5"')}/>`;
}
// a candle (origin at its base) with a flame (.flame) and its glow
const bmCandle = (id: string, x: number, y: number, s = 1, lit = true) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${lit ? bzGlow(id + 'g', 0, -150, 260, '#ffc860', 0.4) : ''}<rect x="-22" y="-130" width="44" height="130" rx="6" fill="#f4ecd8" ${bzO()}/><path d="M-22 -110 q 10 20 0 40" stroke="#e8dcc0" stroke-width="8" fill="none"/>
  <g class="flame"${lit ? '' : ' opacity="0"'}><path d="M0 -136 q -24 -40 0 -86 q 24 46 0 86 z" fill="#ffc860" ${bzO('stroke-width="5"')}/><path d="M0 -142 q -10 -20 0 -44 q 10 24 0 44 z" fill="#fff4c0"/></g><path class="smoke" d="M0 -140 q -20 -40 0 -80 q 20 -40 0 -80" stroke="#8a8a94" stroke-width="8" fill="none" opacity="0"/></g></g>`;
// the morning mirror: three words written from the other side (mirrored), in red
const bmWords = (id: string) => `<g id="${id}" transform="translate(1080 0) scale(-1 1)">${['SAY', 'IT', 'AGAIN'].map((w, i) => `<text class="w${i}" x="540" y="${560 + i * 190}" text-anchor="middle" font-family="Anton" font-size="${i === 2 ? 190 : 170}" fill="#b0101a" opacity="0.9" transform="rotate(${-4 + i * 3} 540 ${500 + i * 190})">${w}</text>`).join('')}</g>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#3a2a5a', html: () => svg(`${bmBedroom()}${bmChar('emma', 150, 1720, 0.95)}${bmChar('kayla', 360, 1720, 0.95)}${bmChar('zoe', 560, 1720, 0.95)}${bmChar('mia', 740, 1720, 0.95)}${bmChar('mary', 950, 1720, 0.9)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #mary', s.t0, 'dead', 'grin'); } },
  'test-bath': { bg: '#1a2230', html: () => svg(`${bmBath()}${bmChar('emma', 540, 1250 + 400 * 2.0 - 640 + 640, 2.0)}${bmCandle('cd', 760, 1700, 1.2)}`), anim() {} },
  'test-mirror': { bg: '#1a2230', html: () => svg(`${bmBath()}<g clip-path="url(#bmclip)"><defs><clipPath id="bmclip"><rect x="240" y="300" width="600" height="800" rx="10"/></clipPath></defs>${bmChar('mary', 540, 1900, 2.2)}</g>`),
    anim(tl, s) { bzFace(tl, '#sc-test-mirror #mary', s.t0, 'glow', 'grin'); } },
  'test-words': { bg: '#cfe0e4', html: () => svg(`${bmBath(true)}${bmWords('wd')}`), anim() {} },
  'cover-a': { bg: '#1a2230', html: () => svg(`${bmBath()}<g clip-path="url(#bmclip2)"><defs><clipPath id="bmclip2"><rect x="240" y="300" width="600" height="800" rx="10"/></clipPath></defs>${bmChar('mary', 540, 2050, 2.4)}</g>${bmCandle('cd', 840, 1500, 1.2)}${bzVignette(0.5)}`),
    anim(tl, s) { bzFace(tl, '#sc-cover-a #mary', s.t0, 'glow', 'grin'); } },
  'cover-b': { bg: '#cfe0e4', html: () => svg(`${bmBath(true)}${bmWords('wd')}${bzVignette(0.5)}`), anim() {} },
});
