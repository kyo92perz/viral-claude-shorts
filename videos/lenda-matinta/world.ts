// =====================================================================
//  LENDA: A MATINTA PERERA, Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix mt.
//  Cast (original designs): Tito (the narrator, 12), his grandmother (white bun, glasses), the Matinta (an old woman no one
//  knows: black dress, black shawl over grey hair, long nails, a crooked smile) and her black bird form (glowing eyes).
//  Sets: the stilt house by the river at night (açaí palms, moon), the room inside (two hammocks, oil lamp, window), the
//  roof with the bird, the door in the morning, Tito's room today (bed, phone, clock 2:00).
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Tito (kid tall 1.15) ~400*s.
// =====================================================================
const MT_SHAWL = '<path d="M-120 -20 Q -130 -150 0 -170 Q 130 -150 120 -20 L 150 240 Q 0 200 -150 240 Z" fill="#141016" stroke="#2b2433" stroke-width="7" stroke-linejoin="round"/>';
const MT_SPEC: Record<string, BzSpec> = {
  tito: { kid: true, tall: 1.15, skin: '#b8784a', hair: { style: 'short', color: '#1c1410' }, top: '#e8603a', pants: '#3a4a6a', shoes: '#e8e4dc' },
  vo: { skin: '#a8683e', hair: { style: 'bun', color: '#e8e4dc' }, glasses: true, top: '#6a5a8a', dress: '#6a5a8a', shoes: '#3a2a1a' },
  matinta: { tall: 0.95, wide: 0.9, skin: '#9a8068', hair: { style: 'bald', color: '#8a8a90' }, top: '#1c1418', dress: '#1c1418', shoes: '#0c0a0e', claws: true, headBack: MT_SHAWL, glow: '#ff3a2a' },
};
const mtChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, MT_SPEC[k], x, y, s, flip);
// the black bird (the Matinta's night form): origin at its feet; .eyes glow, .beak opens; #id
const mtBird = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-20 0 l -10 30 M20 0 l 10 30" stroke="#2b2433" stroke-width="8"/><ellipse cx="0" cy="-90" rx="80" ry="100" fill="#141018" ${bzO()}/><path d="M60 -120 Q 170 -60 150 30 Q 90 -20 50 -40 Z" fill="#0c0a10" ${bzO()}/>
  <circle cx="-10" cy="-200" r="62" fill="#141018" ${bzO()}/><path d="M-70 -170 l -60 20 l 60 10 z" fill="#3a3030" class="beak" ${bzO('stroke-width="5"')}/>
  <g class="eyes">${bzGlow('bge' + id, -20, -210, 90, '#ff3a2a', 0.45)}<circle cx="-38" cy="-212" r="14" fill="#ff3a2a"/><circle cx="4" cy="-212" r="14" fill="#ff3a2a"/></g></g></g></g>`;
// the whistle: wavy sound lines (.wv) coming from (x, y) toward the left
const mtWhistle = (id: string, x: number, y: number, dir = -1) => `<g id="${id}">${[0, 1, 2].map((i) => `<path class="wv" d="M${x} ${y + i * 40 - 40} q ${dir * 40} -30 ${dir * 80} 0 t ${dir * 80} 0 t ${dir * 80} 0" stroke="#efe9d6" stroke-width="10" fill="none" stroke-linecap="round" opacity="0"/>`).join('')}</g>`;
function mtWhistleGo(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  tl.fromTo(`${sel} .wv`, { opacity: 0, x: 0 }, { opacity: 0.9, x: -60, duration: 0.8, stagger: 0.25, repeat: Math.max(0, Math.floor((t1 - t0) / 1.6)), yoyo: true, ease: 'sine.inOut' }, t0);
}
// the stilt house by the river at night (açaí palms, moon, black water); the roof ridge is at y 760 (x 300–780)
function mtHouse() {
  const palm = (x: number, y: number, s: number) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q 10 -300 -6 -620" stroke="#2a2016" stroke-width="22" fill="none"/>${[-60, -25, 15, 50, 85].map((a) => `<path d="M-6 -620 Q ${Math.cos(a * Math.PI / 180) * 160} ${-620 + Math.sin(a * Math.PI / 180) * 60 - 40} ${Math.cos(a * Math.PI / 180) * 240} ${-560 + Math.sin(a * Math.PI / 180) * 120}" stroke="#14281e" stroke-width="18" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  return `${bzSky('#070b1c', '#202c4a')}${bzStars(70, 5, 900)}${bzMoon('mn', 820, 300, 80)}${bzGlow('mg', 820, 300, 260, '#efe9d6', 0.2)}
    ${palm(120, 1300, 1.2)}${palm(960, 1250, 1.0)}<rect x="-20" y="1300" width="1120" height="640" fill="#0e1622"/><rect x="-20" y="1300" width="1120" height="640" fill="#1a2a3a" opacity="0.5"/>
    <rect x="300" y="900" width="480" height="300" fill="#5a3e2a" ${bzO()}/><path d="M260 910 L 540 760 L 820 910 Z" fill="#3a2a20" ${bzO()}/>${[0, 1, 2, 3, 4].map((i) => `<path d="M300 ${950 + i * 50} h480" stroke="#4a3220" stroke-width="5"/>`).join('')}
    <rect x="360" y="980" width="110" height="100" fill="#ffc860" ${bzO()}/>${bzGlow('wg', 415, 1030, 180, '#ffc860', 0.35)}<rect x="590" y="1000" width="110" height="200" fill="#2a1e14" ${bzO()}/>
    ${[320, 460, 620, 760].map((x) => `<rect x="${x}" y="1200" width="22" height="220" fill="#3a2a1a" ${bzO('stroke-width="5"')}/>`).join('')}<rect x="250" y="1196" width="580" height="22" fill="#4a3220" ${bzO('stroke-width="5"')}/>${bzFog(1300, '#8aa0c0', 0.18)}`;
}
// the room: wooden walls, two hammocks (#rede1 left, #rede2 right), the oil lamp (#lamp), the window with the night (x 640–940, y 420–760)
function mtRoom(dark = false) {
  const rede = (id: string, x0: number, x1: number, y: number, c: string) => `<g id="${id}"><path d="M${x0} ${y - 120} Q ${(x0 + x1) / 2} ${y + 90} ${x1} ${y - 120}" stroke="${BZ.ink}" stroke-width="12" fill="none"/><path d="M${x0 + 30} ${y - 100} Q ${(x0 + x1) / 2} ${y + 110} ${x1 - 30} ${y - 100} Q ${(x0 + x1) / 2} ${y + 20} ${x0 + 30} ${y - 100} Z" fill="${c}" ${bzO()}/></g>`;
  return `<rect width="1080" height="1920" fill="${dark ? '#2a1e18' : '#5a3e2a'}"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1920" stroke="${dark ? '#1e1410' : '#4a3220'}" stroke-width="8"/>`).join('')}
    <rect x="640" y="420" width="300" height="340" fill="#0b1028" ${bzO('stroke-width="12"')}/>${bzStars(14, 3, 760).replace(/<circle cx="(\d+)"/g, (m, x) => `<circle cx="${640 + (+x % 300)}"`)}<path d="M790 420 v340 M640 590 h300" stroke="${BZ.ink}" stroke-width="10"/>
    ${dark ? '' : `${bzGlow('lg', 200, 700, 420, '#ffc860', 0.4)}<g id="lamp"><rect x="170" y="680" width="60" height="70" rx="8" fill="#c8a060" ${bzO('stroke-width="5"')}/><path d="M200 680 q -16 -40 0 -70 q 16 30 0 70 z" fill="#ffd27a" ${bzO('stroke-width="4"')}/></g>`}
    ${rede('rede1', 60, 560, 1060, '#c8542c')}${rede('rede2', 560, 1040, 1120, '#3a8a8a')}<rect y="1360" width="1080" height="560" fill="${dark ? '#1e1410' : '#3a2818'}" ${bzO()}/>`;
}
// the door in the morning (open; warm light; the porch) — the visitor stands in it at x 540
function mtDoor() {
  return `<rect width="1080" height="1920" fill="#5a3e2a"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1920" stroke="#4a3220" stroke-width="8"/>`).join('')}
    <rect x="260" y="480" width="560" height="1000" fill="#f4d8a0" ${bzO('stroke-width="12"')}/>${bzGlow('dg', 540, 900, 600, '#fff0c0', 0.4)}<rect x="260" y="1300" width="560" height="180" fill="#c8a870" opacity="0.6"/>
    <path d="M300 520 Q 540 600 780 520" stroke="#e8c890" stroke-width="6" fill="none" opacity="0.6"/><rect x="820" y="480" width="40" height="1000" fill="#3a2818" ${bzO()}/><rect y="1480" width="1080" height="440" fill="#3a2818" ${bzO()}/>`;
}
// Tito's room today: bed, phone glowing, a digital clock 2:00 (#clk)
function mtToday() {
  return `<rect width="1080" height="1920" fill="#141a2e"/><rect x="620" y="420" width="320" height="360" fill="#070b1c" ${bzO('stroke-width="12"')}/><path d="M780 420 v360 M620 600 h320" stroke="${BZ.ink}" stroke-width="10"/>
    <g id="clk"><rect x="120" y="980" width="260" height="120" rx="14" fill="#1a1a22" ${bzO()}/><text x="250" y="1068" text-anchor="middle" font-family="Anton" font-size="84" fill="#ff3a2a">2:00</text></g>
    <rect y="1240" width="1080" height="680" fill="#1e2236" ${bzO()}/><rect x="80" y="1120" width="920" height="200" rx="30" fill="#3a4a7a" ${bzO()}/><rect x="80" y="1080" width="260" height="100" rx="30" fill="#e8e4dc" ${bzO()}/>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#5a3e2a', html: () => svg(`${mtRoom()}${mtChar('tito', 220, 1700, 1.0)}${mtChar('vo', 540, 1700, 1.0)}${mtChar('matinta', 860, 1700, 1.0)}`), anim() {} },
  'test-house': { bg: '#070b1c', html: () => svg(`${mtHouse()}${mtBird('bd', 540, 770, 0.8)}${mtWhistle('wh', 460, 560)}`), anim(tl, s) { mtWhistleGo(tl, '#sc-test-house #wh', s.t0, s.t1); } },
  'test-door': { bg: '#5a3e2a', html: () => svg(`${mtDoor()}${mtChar('matinta', 540, 1500, 1.3)}`), anim(tl, s) { bzFace(tl, '#sc-test-door #matinta', s.t0, 'half', 'grin'); } },
  'test-today': { bg: '#141a2e', html: () => svg(`${mtToday()}${mtBird('bd', 780, 760, 0.7)}`), anim() {} },
  'cover-a': { bg: '#070b1c', html: () => svg(`<g transform="translate(-1000 -650) scale(2.85)">${mtHouse()}${mtBird('bd', 540, 770, 0.8)}</g>${bzVignette(0.55)}`), anim() {} },
  'cover-b': { bg: '#5a3e2a', html: () => svg(`${mtDoor()}${mtChar('matinta', 540, 2300, 3.0)}`), anim(tl, s) { bzFace(tl, '#sc-cover-b #matinta', s.t0, 'glow', 'grin'); } },
});
