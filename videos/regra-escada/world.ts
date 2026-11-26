// =====================================================================
//  A REGRA DA VÓ Nº 3: O DEGRAU CATORZE. Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix rg (same cast).
//  Cast (original designs): Davi (the narrator, 13: afro, blue t-shirt; grown up at the end: taller, hoodie), his
//  grandmother (white bun, glasses). The thing on the stairs is never shown whole: a 14th step, darker, that breathes,
//  and wet three-toed footprints on the rug.
//  Sets: the wooden staircase seen from the bottom (13 steps, #s1..#s14, numbers .num), the living room sofa at night,
//  the wet rug in the morning, the concrete stairwell of the building (numbers 1..17).
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Davi (kid tall 1.15) ~400*s.
// =====================================================================
const RG_SPEC: Record<string, BzSpec> = {
  davi: { kid: true, tall: 1.15, skin: '#8a5a3a', hair: { style: 'afro', color: '#1c1410' }, top: '#3a7ac8', pants: '#2a2a3a', shoes: '#e8e4dc' },
  daviadulto: { tall: 1.0, skin: '#8a5a3a', hair: { style: 'afro', color: '#1c1410' }, top: '#4a4a5a', top2: '#3a7ac8', pants: '#2a2a3a', shoes: '#e8e4dc' },
  vo: { skin: '#a8683e', hair: { style: 'bun', color: '#e8e4dc' }, glasses: true, top: '#7a3a5a', dress: '#7a3a5a', shoes: '#3a2a1a' },
};
const rgChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, RG_SPEC[k], x, y, s, flip);
// a staircase seen from the bottom: n steps (#s1 bottom .. #sN top), each with a number (.num, hidden); the 14th (if any)
// is darker (#s14 .tr breathes). wood: tread colour, riser colour; concrete = the building
function rgStairs(n = 13, concrete = false, lit = true) {
  const tread = concrete ? '#8a8a90' : '#8a5a30', riser = concrete ? '#6a6a70' : '#5a3a1e';
  let s = '';
  for (let i = 0; i < n; i++) {
    const y = 1760 - i * 104, w = 860 - i * 34, x = 540 - w / 2, odd = !concrete && i === 13;
    s += `<g id="s${i + 1}"><g class="tr"><rect x="${x}" y="${y - 70}" width="${w}" height="70" fill="${odd ? '#140c0e' : riser}" ${bzO('stroke-width="5"')}/><rect x="${x - 10}" y="${y - 104}" width="${w + 20}" height="34" fill="${odd ? '#22141a' : tread}" ${bzO('stroke-width="5"')}/>
      ${odd ? `<path d="M${x + 40} ${y - 36} Q 540 ${y - 70} ${x + w - 40} ${y - 36}" stroke="#3a1a20" stroke-width="10" fill="none"/>` : ''}</g>
      <g class="num" opacity="0"><text x="${540}" y="${y - 14}" text-anchor="middle" font-family="Anton" font-size="${60 - i * 1.6}" fill="${(concrete && i === 16) || odd ? '#ff3a2a' : '#ffffff'}" stroke="${BZ.ink}" stroke-width="8" paint-order="stroke">${i + 1}</text></g></g>`;
  }
  const wall = concrete ? '#4a4a52' : '#3a2a30';
  return `<rect width="1080" height="1920" fill="${wall}"/><path d="M0 0 L 300 380 L 300 1760 L 0 1920 Z" fill="${concrete ? '#3a3a42' : '#2e2026'}"/><path d="M1080 0 L 780 380 L 780 1760 L 1080 1920 Z" fill="${concrete ? '#424248' : '#34242a'}"/>
    ${s}<path d="M110 1760 L 330 340" stroke="${concrete ? '#b0b0b8' : '#6a4020'}" stroke-width="18"/><path d="M970 1760 L 750 340" stroke="${concrete ? '#b0b0b8' : '#6a4020'}" stroke-width="18"/>
    ${concrete ? `<rect x="420" y="110" width="240" height="30" rx="10" fill="#e8f4ff" ${bzO('stroke-width="5"')}/>${bzGlow('fl', 540, 150, 500, '#e8f4ff', lit ? 0.3 : 0.05)}` : ''}<rect y="1760" width="1080" height="160" fill="${concrete ? '#5a5a62' : '#3a2418'}" ${bzO()}/>`;
}
// the dark: a black veil and the phone's flashlight spot (#spot, move it with y); draw the numbers (rgNums) above it
const rgDark = (op = 0.82, y = 1700) => `<rect width="1080" height="1920" fill="#000" opacity="${op}"/><g id="spot">${bzGlow('sp' + BZ_UID, 540, y, 300, '#fff2c0', 0.5)}</g>`;
// the step numbers alone (#n1..#nN, hidden), same positions as rgStairs
const rgNums = (n = 14, concrete = false) => [...Array(n)].map((_, i) => { const y = 1760 - i * 104, bad = concrete ? i === 16 : i === 13;
  return `<g id="n${i + 1}" opacity="0"><text x="540" y="${y - 22}" text-anchor="middle" font-family="Anton" font-size="${78 - i * 2.4}" fill="${bad ? '#ff3a2a' : '#ffffff'}" stroke="${BZ.ink}" stroke-width="9" paint-order="stroke">${i + 1}</text></g>`; }).join('');
// the living room at night: the sofa (front view), the foot of the stairs on the right, a blanket
function rgSofa() {
  return `<rect width="1080" height="1920" fill="#1a1626"/>${bzGlow('mg', 200, 500, 400, '#9ab0ff', 0.12)}<rect x="80" y="380" width="260" height="320" fill="#0b1028" ${bzO('stroke-width="12"')}/>
    <path d="M760 1500 L 1080 1100 L 1080 1500 Z" fill="#2a1a16"/>${[0, 1, 2, 3].map((i) => `<path d="M${780 + i * 80} ${1480 - i * 100} h 80 v -100" stroke="#4a3020" stroke-width="12" fill="none"/>`).join('')}
    <rect x="60" y="1050" width="760" height="300" rx="40" fill="#5a3a5a" ${bzO()}/><rect x="40" y="1250" width="800" height="260" rx="40" fill="#6a4a6a" ${bzO()}/><rect y="1500" width="1080" height="420" fill="#2a1e1c" ${bzO()}/>`;
}
// the rug in the morning: wet, with three-toed footprints (.fp) leading from the stairs (right) to the sofa (left)
function rgRug() {
  const fp = (x: number, y: number, r: number) => `<g class="fp" opacity="0"><g transform="translate(${x} ${y}) rotate(${r})"><ellipse cx="0" cy="0" rx="40" ry="54" fill="#2a3a4a" opacity="0.8"/>${[-34, 0, 34].map((dx) => `<path d="M${dx * 0.6} -40 L ${dx} -110" stroke="#2a3a4a" stroke-width="16" stroke-linecap="round" opacity="0.8"/>`).join('')}</g></g>`;
  return `<rect width="1080" height="1920" fill="#c8a878"/>${bzGlow('sun', 540, 300, 700, '#fff4c8', 0.3)}<ellipse cx="540" cy="1100" rx="560" ry="560" fill="#a83a3a" ${bzO()}/><ellipse cx="540" cy="1100" rx="460" ry="460" fill="none" stroke="#e8c870" stroke-width="16"/>
    <ellipse cx="540" cy="1100" rx="360" ry="300" fill="#7a2a2a" opacity="0.5"/>${[[900, 1560, -30], [780, 1380, -25], [660, 1200, -20], [540, 1020, -15], [420, 860, -10], [300, 700, -5]].map(([x, y, r]) => fp(x, y, r)).join('')}`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#3a2a30', html: () => svg(`${rgStairs(14)}${rgChar('davi', 300, 1900, 1.0)}${rgChar('vo', 780, 1900, 1.0)}`), anim(tl, s) { tl.set('#sc-test-cast .num', { opacity: 1 }, s.t0); } },
  'test-building': { bg: '#4a4a52', html: () => svg(`${rgStairs(17, true)}${rgChar('daviadulto', 540, 1900, 1.0)}`), anim(tl, s) { tl.set('#sc-test-building .num', { opacity: 1 }, s.t0); } },
  'test-sofa': { bg: '#1a1626', html: () => svg(rgSofa()), anim() {} },
  'test-rug': { bg: '#c8a878', html: () => svg(rgRug()), anim(tl, s) { tl.set('#sc-test-rug .fp', { opacity: 1 }, s.t0); } },
  'cover-a': { bg: '#000', html: () => svg(`<g transform="translate(-540 -300) scale(2)">${rgStairs(14)}${rgDark(0.6, 1760 - 13 * 104 - 50)}${bzGlow('cv14', 540, 1760 - 13 * 104 - 50, 320, '#ff2a1a', 0.4)}${rgNums(14)}</g>${bzSign('t1', 'SE DER 14', 540, 1380, -4, '#fff', BZ.ink, 110)}${bzSign('t2', 'NÃO SUBA', 540, 1560, 3, BZ.red, '#fff', 140)}${bzVignette(0.7)}`), anim(tl, s) { tl.set('#sc-cover-a #n14, #sc-cover-a #n13, #sc-cover-a #n12', { opacity: 1 }, s.t0); } },
});
