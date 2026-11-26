// =====================================================================
//  A REGRA DA VÓ Nº 2: A VOZ DA COZINHA. Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix rg (same cast as Nº 1).
//  Cast (original designs): Davi (the narrator, 13: afro, blue t-shirt), his grandmother (white bun, glasses; at night a
//  white nightgown), and the THING in the kitchen: her shape, too tall, arms too long, back-lit, two white eyes.
//  Sets: the dark hallway with the lit kitchen doorway at the end, Davi's room, the kitchen (morning: two cups),
//  the inside of the wardrobe (a slit of light, two pairs of eyes), the photo of the grandmother with a black ribbon.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Davi (kid tall 1.15) ~400*s.
// =====================================================================
const RG_SPEC: Record<string, BzSpec> = {
  davi: { kid: true, tall: 1.15, skin: '#8a5a3a', hair: { style: 'afro', color: '#1c1410' }, top: '#3a7ac8', pants: '#2a2a3a', shoes: '#e8e4dc' },
  vo: { skin: '#a8683e', hair: { style: 'bun', color: '#e8e4dc' }, glasses: true, top: '#7a3a5a', dress: '#7a3a5a', shoes: '#3a2a1a' },
  vonoite: { skin: '#a8683e', hair: { style: 'bun', color: '#e8e4dc' }, glasses: true, top: '#e8e4f0', dress: '#e8e4f0', shoes: '#c8b8a8' },
  falsa: { tall: 1.45, wide: 0.8, skin: '#1a141c', hair: { style: 'bun', color: '#3a343c' }, top: '#141018', dress: '#141018', shoes: '#0c0a0e', claws: true, flat: true, glow: '#ffffff' },
};
const rgChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, RG_SPEC[k], x, y, s, flip);
// the hallway at night seen from Davi's door: perspective walls, the kitchen doorway at the end (#door, lit yellow,
// x 420..660, y 560..1000). Put the thing inside it at (540, 1000) scale ~0.45
function rgHallK(lit = true) {
  return `<rect width="1080" height="1920" fill="#0e0c14"/><path d="M0 0 L 420 560 L 420 1000 L 0 1920 Z" fill="#1a1622"/><path d="M1080 0 L 660 560 L 660 1000 L 1080 1920 Z" fill="#16121e"/>
    <path d="M0 1920 L 420 1000 L 660 1000 L 1080 1920 Z" fill="#241c20"/>${[0, 1, 2, 3, 4, 5].map((i) => { const k = i / 6, y = 1000 + 920 * k * k; return `<path d="M${420 - 420 * k * k} ${y} H${660 + 420 * k * k}" stroke="#1a1418" stroke-width="5"/>`; }).join('')}
    <path d="M0 0 L 420 560 H 660 L 1080 0 Z" fill="#100e16"/>
    <g id="door"><rect x="420" y="560" width="240" height="440" fill="${lit ? '#ffc860' : '#14101a'}" ${bzO('stroke-width="6"')}/>${lit ? `${bzGlow('dg', 540, 900, 420, '#ffc860', 0.35)}<path d="M420 1000 L 260 1300 L 820 1300 L 660 1000 Z" fill="#ffc860" opacity="0.18"/>` : ''}</g>`;
}
// Davi's room at night (bed, window), the door ajar on the right with a line of kitchen light (#crack)
function rgRoom() {
  return `<rect width="1080" height="1920" fill="#141a2e"/><rect x="120" y="380" width="320" height="380" fill="#070b1c" ${bzO('stroke-width="12"')}/>${bzStars(10, 4, 700).replace(/<circle cx="(\d+)"/g, (m, x) => `<circle cx="${130 + (+x % 300)}"`)}<path d="M280 380 v380 M120 570 h320" stroke="${BZ.ink}" stroke-width="10"/>
    <rect x="760" y="420" width="260" height="900" fill="#0e0c14" ${bzO()}/><g id="crack"><rect x="760" y="420" width="26" height="900" fill="#ffc860"/>${bzGlow('cg', 773, 900, 300, '#ffc860', 0.3)}</g>
    <rect y="1240" width="1080" height="680" fill="#1e2236" ${bzO()}/><rect x="40" y="1120" width="680" height="200" rx="30" fill="#3a5a8a" ${bzO()}/><rect x="40" y="1060" width="240" height="110" rx="30" fill="#e8e4dc" ${bzO()}/>`;
}
// the kitchen: tiles, a window, the table with a cake and two cups (#cup1 #cup2, steam .stm), a chair
function rgKitchen(morning = true) {
  const cup = (id: string, x: number) => `<g id="${id}"><path d="M${x - 50} 1040 h100 l -12 90 h-76 z" fill="#f4f0e4" ${bzO()}/><path d="M${x + 50} 1060 q 40 6 26 46 q -6 14 -26 6" stroke="${BZ.ink}" stroke-width="9" fill="none"/><ellipse cx="${x}" cy="1040" rx="50" ry="12" fill="#4a2a14" ${bzO('stroke-width="5"')}/>
    ${[0, 1].map((i) => `<path class="stm" d="M${x - 14 + i * 28} 1020 q -16 -30 0 -60 q 16 -30 0 -60" stroke="#efe9d6" stroke-width="7" fill="none" opacity="0.65"/>`).join('')}</g>`;
  return `<rect width="1080" height="1920" fill="${morning ? '#e8d8b0' : '#3a3020'}"/>${[...Array(9)].map((_, i) => `<path d="M0 ${300 + i * 90} H1080" stroke="${morning ? '#d8c8a0' : '#2e2618'}" stroke-width="4"/>`).join('')}
    <rect x="600" y="300" width="320" height="360" fill="${morning ? '#bfe4ff' : '#0b1028'}" ${bzO('stroke-width="12"')}/><path d="M760 300 v360 M600 480 h320" stroke="${BZ.ink}" stroke-width="10"/>${morning ? bzGlow('sg', 760, 480, 500, '#fff4c8', 0.35) : ''}
    <rect x="80" y="1130" width="920" height="60" fill="#8a5a30" ${bzO()}/><rect x="120" y="1190" width="40" height="420" fill="#6a4020" ${bzO()}/><rect x="920" y="1190" width="40" height="420" fill="#6a4020" ${bzO()}/>
    <g transform="translate(-20 0)"><path d="M400 1130 v-110 h220 v110 z" fill="#c87a3a" ${bzO()}/><path d="M400 1020 h220 l -20 -30 h-180 z" fill="#f4e0b0" ${bzO('stroke-width="5"')}/></g>${cup('cup1', 280)}${cup('cup2', 760)}
    <rect y="1600" width="1080" height="320" fill="${morning ? '#b89060' : '#2a2016'}" ${bzO()}/>`;
}
// inside the wardrobe: black, a vertical slit of light (x 520..560), clothes hanging, two pairs of eyes (#e1 Davi, #e2 grandma)
function rgWardrobe() {
  const eyes = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-34" cy="0" rx="26" ry="30" fill="#fbf7ef" ${bzO('stroke-width="5"')}/><ellipse cx="34" cy="0" rx="26" ry="30" fill="#fbf7ef" ${bzO('stroke-width="5"')}/><circle class="pu" cx="-30" cy="4" r="11" fill="${BZ.ink}"/><circle class="pu" cx="38" cy="4" r="11" fill="${BZ.ink}"/></g></g>`;
  return `<rect width="1080" height="1920" fill="#08070c"/><g id="slit"><rect x="520" y="0" width="40" height="1920" fill="#ffc860" opacity="0.85"/>${bzGlow('slg', 540, 900, 260, '#ffc860', 0.25)}</g>
    ${[120, 260, 820, 960].map((x, i) => `<path d="M${x} 120 q -60 40 -50 380 h100 q 10 -340 -50 -380" fill="${['#2a2030', '#1e2430', '#30242a', '#22202a'][i]}"/>`).join('')}<path d="M0 120 H1080" stroke="#2a2430" stroke-width="12"/>
    ${eyes('e1', 300, 860, 1.2)}${eyes('e2', 780, 760, 1.2)}<rect id="shadow" x="520" y="0" width="40" height="1920" fill="#08070c" opacity="0"/>`;
}
// the photo of the grandmother on the wall with a black ribbon (#ph)
function rgPhoto() {
  const cid = 'rgph' + (BZ_UID++);
  return `<defs><clipPath id="${cid}"><rect x="310" y="360" width="460" height="600"/></clipPath></defs><rect width="1080" height="1920" fill="#5a4a3a"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1920" stroke="#4e4032" stroke-width="6"/>`).join('')}${bzGlow('pg', 540, 700, 500, '#ffd890', 0.2)}
    <g id="ph"><rect x="270" y="320" width="540" height="680" rx="12" fill="#8a6a3a" ${bzO()}/><rect x="310" y="360" width="460" height="600" fill="#e8dcc0" ${bzO('stroke-width="5"')}/>
    <g clip-path="url(#${cid})">${bzChar('pvo', RG_SPEC.vo, 540, 1500, 1.5)}</g><path d="M650 320 L 810 320 L 810 480 Z" fill="#141016" ${bzO('stroke-width="5"')}/></g>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#141a2e', html: () => svg(`${rgRoom()}${rgChar('davi', 230, 1700, 1.0)}${rgChar('vonoite', 540, 1700, 1.0)}${rgChar('falsa', 860, 1700, 0.8)}`), anim(tl, s) { bzFace(tl, '#sc-test-cast #falsa', s.t0, 'glow', 'flat'); } },
  'test-hall': { bg: '#0e0c14', html: () => svg(`${rgHallK()}${rgChar('falsa', 540, 1000, 0.5)}`), anim(tl, s) { bzFace(tl, '#sc-test-hall #falsa', s.t0, 'glow', 'flat'); } },
  'test-kitchen': { bg: '#e8d8b0', html: () => svg(rgKitchen()), anim() {} },
  'test-wardrobe': { bg: '#08070c', html: () => svg(rgWardrobe()), anim() {} },
  'test-photo': { bg: '#5a4a3a', html: () => svg(rgPhoto()), anim() {} },
});
