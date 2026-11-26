// =====================================================================
//  A REGRA DA VÓ Nº 1: O ESPELHO DAS TRÊS. Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix rg.
//  Cast (original designs): Davi (the narrator, 13: afro, blue t-shirt), his grandmother (white bun, glasses, purple
//  dress) and Davi's reflection (the same boy, colder colours, pale blue glow in the eyes when it shows itself).
//  Sets: the grandmother's hallway at night with three mirrors under cloths, the car's rear-view mirror under a cloth,
//  Davi's bed, the bathroom with the big mirror (the reflection lives inside #mir, clipped to the glass), the clock.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Davi (kid tall 1.15) ~400*s.
// =====================================================================
const RG_SPEC: Record<string, BzSpec> = {
  davi: { kid: true, tall: 1.15, skin: '#8a5a3a', hair: { style: 'afro', color: '#1c1410' }, top: '#3a7ac8', pants: '#2a2a3a', shoes: '#e8e4dc' },
  vo: { skin: '#a8683e', hair: { style: 'bun', color: '#e8e4dc' }, glasses: true, top: '#7a3a5a', dress: '#7a3a5a', shoes: '#3a2a1a' },
  refl: { kid: true, tall: 1.15, skin: '#6a5a5a', hair: { style: 'afro', color: '#141018' }, top: '#2a4a7a', pants: '#1a1a24', shoes: '#9a9aa8', glow: '#9ad8ff' },
};
const rgChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, RG_SPEC[k], x, y, s, flip);
// a cloth draped over a rectangle (x, y, w, h): #id, it can be pulled away (animate x/rotation)
const rgCloth = (id: string, x: number, y: number, w: number, h: number, c = '#d8d0c0') => `<g id="${id}"><path d="M${x - 20} ${y - 10} Q ${x + w / 2} ${y - 40} ${x + w + 20} ${y - 10} L ${x + w + 34} ${y + h + 30} Q ${x + w * 0.75} ${y + h + 6} ${x + w / 2} ${y + h + 40} Q ${x + w * 0.25} ${y + h + 6} ${x - 34} ${y + h + 30} Z" fill="${c}" ${bzO()}/>
  ${[0.25, 0.5, 0.75].map((k) => `<path d="M${x + w * k} ${y - 20} Q ${x + w * k + 10} ${y + h / 2} ${x + w * k - 6} ${y + h + 20}" stroke="#b8ae9c" stroke-width="6" fill="none"/>`).join('')}</g>`;
// a framed mirror (frame only; the glass is dark); x, y, w, h = the glass
const rgFrame = (x: number, y: number, w: number, h: number, glass = '#1a2232') => `<rect x="${x - 26}" y="${y - 26}" width="${w + 52}" height="${h + 52}" rx="18" fill="#8a6a3a" ${bzO()}/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${glass}" ${bzO('stroke-width="5"')}/><path d="M${x + 30} ${y + h - 40} L ${x + w * 0.45} ${y + 40}" stroke="#ffffff" stroke-width="14" opacity="0.08"/>`;
// the grandmother's hallway at night: three mirrors (glass rects) under cloths #c1 #c2 #c3, a wall clock, a dim bulb
function rgHall() {
  return `<rect width="1080" height="1920" fill="#3a2e3a"/><rect y="0" width="1080" height="1500" fill="#4a3a4a"/>${[...Array(12)].map((_, i) => `<path d="M0 ${i * 130} H1080" stroke="#3e3040" stroke-width="4"/>`).join('')}
    ${bzGlow('hg', 540, 220, 560, '#ffc870', 0.28)}<path d="M540 0 V160" stroke="${BZ.ink}" stroke-width="6"/><circle cx="540" cy="190" r="34" fill="#ffd890" ${bzO('stroke-width="5"')}/>
    ${rgFrame(90, 520, 220, 340)}${rgFrame(430, 480, 220, 380)}${rgFrame(770, 520, 220, 340)}${rgCloth('c1', 90, 520, 220, 340)}${rgCloth('c2', 430, 480, 220, 380, '#c8b8a8')}${rgCloth('c3', 770, 520, 220, 340, '#d0c8d8')}
    <rect y="1500" width="1080" height="420" fill="#2a1e24" ${bzO()}/><path d="M0 1500 L 1080 1500" stroke="#5a4048" stroke-width="10"/>`;
}
// a car's rear-view mirror under a cloth, the windscreen and the night street behind
function rgCar() {
  return `${bzSky('#070b1c', '#1a2440')}${bzStars(30, 7, 700)}${bzBuildings(1100, 4)}<path d="M-40 1920 L -40 300 Q 540 180 1120 300 L 1120 1920 Z M 60 1500 L 60 420 Q 540 320 1020 420 L 1020 1500 Z" fill="#141018" fill-rule="evenodd"/>
    <rect x="300" y="380" width="480" height="150" rx="40" fill="#2a2a34" ${bzO()}/><path d="M540 300 V380" stroke="${BZ.ink}" stroke-width="30"/>${rgCloth('cc', 300, 380, 480, 150, '#d8d0c0')}
    <rect y="1500" width="1080" height="420" fill="#1e1a24" ${bzO()}/><circle cx="540" cy="1760" r="200" fill="none" stroke="#3a3440" stroke-width="40"/>`;
}
// Davi's room at night (bed, window, phone glow); the phone #ph at (720, 1150)
function rgBed() {
  return `<rect width="1080" height="1920" fill="#141a2e"/><rect x="620" y="380" width="320" height="380" fill="#070b1c" ${bzO('stroke-width="12"')}/>${bzMoon('mn', 860, 470, 40)}<path d="M780 380 v380 M620 570 h320" stroke="${BZ.ink}" stroke-width="10"/>
    <rect y="1240" width="1080" height="680" fill="#1e2236" ${bzO()}/><rect x="80" y="1120" width="920" height="200" rx="30" fill="#3a5a8a" ${bzO()}/><rect x="80" y="1060" width="260" height="110" rx="30" fill="#e8e4dc" ${bzO()}/>`;
}
// the bathroom: tiles, sink, the big mirror (glass 240..840 x 300..1000). The reflection world is drawn inside <g id="mir">,
// clipped to the glass; the reflection sees the same tiles, a little darker and bluer
const RG_GLASS = { x: 240, y: 300, w: 600, h: 700 };
function rgBathWall(dark = false) {
  const t = dark ? '#2a3440' : '#7a9aa8', l = dark ? '#222a34' : '#6a8a98';
  return `<rect width="1080" height="1920" fill="${t}"/>${[...Array(16)].map((_, i) => `<path d="M0 ${i * 120} H1080" stroke="${l}" stroke-width="5"/>`).join('')}${[...Array(10)].map((_, i) => `<path d="M${i * 120} 0 V1920" stroke="${l}" stroke-width="5"/>`).join('')}`;
}
function rgBath(inside = '', dark = false) {
  const g = RG_GLASS, cid = 'rgclip' + (BZ_UID++);
  return `${rgBathWall(dark)}${bzGlow('bl', 540, 160, 520, '#e8f0ff', dark ? 0.08 : 0.25)}
    <rect x="${g.x - 30}" y="${g.y - 30}" width="${g.w + 60}" height="${g.h + 60}" rx="20" fill="#c8c0b0" ${bzO()}/>
    <defs><clipPath id="${cid}"><rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}"/></clipPath></defs>
    <g clip-path="url(#${cid})"><rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" fill="#1a2430"/><g id="mir"><g opacity="0.55">${rgBathWall(true)}</g>${inside}</g>
      <rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" fill="#6ab0ff" opacity="0.08"/><path d="M${g.x + 40} ${g.y + g.h - 60} L ${g.x + g.w * 0.4} ${g.y + 60}" stroke="#ffffff" stroke-width="22" opacity="0.07"/></g>
    <rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" fill="none" ${bzO('stroke-width="8"')}/>
    <rect x="180" y="1160" width="720" height="120" rx="20" fill="#e8e4dc" ${bzO()}/><ellipse cx="540" cy="1180" rx="200" ry="34" fill="#b8c0c8" ${bzO('stroke-width="5"')}/><path d="M540 1100 v60" stroke="#9a9aa8" stroke-width="20"/>
    <rect x="360" y="1280" width="360" height="640" fill="#d8d4cc" ${bzO()}/>`;
}
// a big digital clock card (#id): the time t, red digits
const rgClock = (id: string, t: string, x = 540, y = 760, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-300" y="-130" width="600" height="260" rx="30" fill="#141018" ${bzO('stroke-width="10"')}/><text x="0" y="80" text-anchor="middle" font-family="Anton" font-size="230" fill="#ff3a2a">${t}</text></g></g>`;
// a hand print on the glass (#id), seen from the bathroom: pale, five fingers
const rgPrint = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})" opacity="0.75"><ellipse cx="0" cy="0" rx="58" ry="66" fill="#c8e0ff"/>${[[-52, -70, -20], [-22, -104, -6], [10, -110, 4], [42, -96, 14], [70, -10, 50]].map(([fx, fy, r]) => `<rect x="${fx - 14}" y="${fy - 50}" width="28" height="90" rx="14" fill="#c8e0ff" transform="rotate(${r} ${fx} ${fy})"/>`).join('')}</g></g>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#4a3a4a', html: () => svg(`${rgHall()}${rgChar('davi', 230, 1700, 1.0)}${rgChar('vo', 540, 1700, 1.0)}${rgChar('refl', 850, 1700, 1.0, true)}`), anim(tl, s) { bzFace(tl, '#sc-test-cast #refl', s.t0, 'glow', 'grin'); } },
  'test-bath': { bg: '#7a9aa8', html: () => svg(`${rgBath(rgChar('refl', 540, 1400, 1.0, true))}${rgChar('davi', 540, 1900, 1.15)}${rgPrint('hp', 400, 500)}`), anim(tl, s) { bzFace(tl, '#sc-test-bath #refl', s.t0, 'glow', 'grin'); } },
  'test-car': { bg: '#070b1c', html: () => svg(rgCar()), anim() {} },
  'test-bed': { bg: '#141a2e', html: () => svg(`${rgBed()}${rgClock('ck', '2:59', 540, 760, 0.8)}`), anim() {} },
});
