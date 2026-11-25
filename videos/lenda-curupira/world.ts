// =====================================================================
//  LENDA: O CURUPIRA, in the "Brasil Z" toon look (styles/flat2d/toon.ts), detailed: layered jungle (#lay-bg/#lay-mid/
//  #lay-fg for parallax), light rays, mist, particles. Prefix cu.
//  Cast: Caio (the narrator, 16, lantern), tio Bento (hunter, brown hat, stubble, a shotgun), the grandmother (a memory),
//  the Curupira (a boy with hair like fire, green eyes, a wide grin; feet turned backwards) riding a wild pig.
//  Sets: the Pará jungle before dawn and by day (giant trees with buttress roots, vines, ferns, mud), the tree with
//  three knife cuts, the backwards footprints, the vine knot, the dirt road at sunset, the shotgun tied with vines.
// =====================================================================
const CU_FIRE = '<path d="M-95 -10 Q -130 -90 -80 -120 Q -90 -170 -40 -190 Q -30 -230 10 -215 Q 50 -250 70 -200 Q 120 -200 105 -140 Q 140 -110 100 -60 Q 110 -30 95 -10 Z" fill="#e0402a" stroke="#2b2433" stroke-width="7" stroke-linejoin="round"/><path d="M-60 -40 Q -80 -110 -30 -140 Q 0 -190 40 -150 Q 80 -150 70 -90 Q 80 -60 60 -40 Z" fill="#f29a4a"/><path d="M-20 -60 Q -20 -110 10 -120 Q 40 -100 30 -60 Z" fill="#ffd27a"/>';
const CU_SPEC: Record<string, BzSpec> = {
  caio: { kid: true, tall: 1.2, skin: '#c98757', hair: { style: 'short', color: '#2a1a12' }, top: '#3a6a8a', top2: '#f4f2ea', pants: '#5a4a3a', shoes: '#3a2a1a' },
  bento: { wide: 1.15, skin: '#b8784a', hat: { kind: 'fedora', color: '#7a5a3a' }, mustache: '#3a2418', beard: '#4a3428', top: '#6a7a4a', belt: '#4a2a1a', pants: '#4a4a3a', shoes: '#3a2a1a' },
  vo: { tall: 0.88, skin: '#a87458', hair: { style: 'bun', color: '#ece8e0' }, top: '#c86a4a', dress: '#c86a4a', shoes: '#2b2433' },
  curupira: { kid: true, tall: 0.95, skin: '#9a5a32', hair: { style: 'spiky', color: '#e0402a' }, top: '#9a5a32', pants: '#5a7a3a', shoes: '#9a5a32', glow: '#9aff6a', headBack: CU_FIRE },
};
const cuCaio = (x: number, y: number, s = 1, flip = false) => bzChar('caio', CU_SPEC.caio, x, y, s, flip);
const cuBento = (x: number, y: number, s = 1, flip = false) => bzChar('bento', CU_SPEC.bento, x, y, s, flip);
const cuVo = (x: number, y: number, s = 1, flip = false) => bzChar('vo', CU_SPEC.vo, x, y, s, flip);
const cuKid = (x: number, y: number, s = 1, flip = false) => bzChar('curupira', CU_SPEC.curupira, x, y, s, flip);
// ---- palettes: before dawn (blue-green, lantern light) and by day (greens, gold rays)
const CU_PAL = {
  dawn: { sky: ['#14283a', '#3a6a6a'], far: '#2a4a50', trunk: '#2e2620', crown: '#1a3a30', ground: '#1e3424', mud: '#3a2e24', fern: '#24483a' },
  day: { sky: ['#5a9a8a', '#d8e8c0'], far: '#7aa890', trunk: '#4a3a2a', crown: '#2f6a3a', ground: '#3a6a30', mud: '#6a4a30', fern: '#3f8a4a' },
  dusk: { sky: ['#f29a4a', '#5a3f7a'], far: '#8a5a6a', trunk: '#3a2a2a', crown: '#2a3a30', ground: '#3a4a2a', mud: '#5a3a2a', fern: '#2f5a3a' },
};
type CuPal = typeof CU_PAL.day;
// a jungle tree: trunk with buttress roots (sapopemas), a crown of blobs, hanging vines
function cuTree(x: number, y: number, s: number, P: CuPal, vines = 2) {
  const crown = [[-160, -900, 150], [0, -980, 180], [170, -900, 150], [-80, -820, 130], [90, -800, 130]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${P.crown}" ${bzO()}/>`).join('');
  const vine = (vx: number, len: number) => `<path d="M${vx} -820 q 20 ${len * 0.3} -8 ${len * 0.6} t 6 ${len * 0.4}" stroke="${BZ.ink}" stroke-width="12" fill="none"/><path d="M${vx} -820 q 20 ${len * 0.3} -8 ${len * 0.6} t 6 ${len * 0.4}" stroke="#4a6a2a" stroke-width="6" fill="none"/>
    ${[0.3, 0.55, 0.8].map((k) => `<ellipse cx="${vx + 10}" cy="${-820 + len * k}" rx="16" ry="8" fill="#3f7a3a" transform="rotate(30 ${vx + 10} ${-820 + len * k})"/>`).join('')}`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${crown}
    <path d="M-60 0 Q -150 -20 -170 10 L -60 -120 L -45 -820 L 45 -820 L 60 -120 L 170 10 Q 150 -20 60 0 Z" fill="${P.trunk}" ${bzO()}/>
    <path d="M-20 -200 q 10 -120 -5 -260 M20 -320 q -8 -100 6 -200 M-10 -600 q 6 -60 -4 -120" stroke="${BZ.ink}" stroke-width="5" fill="none" opacity="0.5"/>
    ${[...Array(vines)].map((_, i) => vine(-120 + i * 200, 500 + i * 140)).join('')}</g>`;
}
// a fern (samambaia) at ground level
const cuFern = (x: number, y: number, s: number, c: string) => `<g transform="translate(${x} ${y}) scale(${s})">${[-70, -40, -12, 15, 45, 75].map((a) => `<g transform="rotate(${a})"><path d="M0 0 Q 10 -80 0 -170" stroke="${c}" stroke-width="10" fill="none"/>${[30, 60, 90, 120, 150].map((t) => `<ellipse cx="${-12}" cy="${-t}" rx="14" ry="6" fill="${c}"/><ellipse cx="${12}" cy="${-t}" rx="14" ry="6" fill="${c}"/>`).join('')}</g>`).join('')}</g>`;
// the jungle in 3 layers (each returned separately so a shot can wrap them in #lay-bg / #lay-mid / #lay-fg)
function cuBg(P: CuPal, seed = 1) {
  let far = ''; for (let i = 0; i < 9; i++) { const x = i * 140 - 40 + (seed * 37 % 60), y = 980 + ((i * 53 + seed) % 3) * 40; far += `<rect x="${x - 14}" y="${y - 300}" width="28" height="320" fill="${P.far}"/><circle cx="${x}" cy="${y - 320}" r="${90 + (i % 3) * 20}" fill="${P.far}"/>`; }
  return `${bzSky(P.sky[0], P.sky[1])}<g opacity="0.85">${far}</g><rect y="900" width="1080" height="300" fill="${P.sky[1]}" opacity="0.35"/>`;
}
function cuMid(P: CuPal, seed = 1) {
  return `${cuTree(120 + (seed % 3) * 30, 1360, 0.9, P, 2)}${cuTree(860 - (seed % 2) * 40, 1380, 1.0, P, 3)}${cuTree(500, 1300, 0.62, P, 1)}`;
}
function cuGround(P: CuPal) {
  return `<path d="M-20 1300 Q 300 1260 560 1300 T 1100 1290 L1100 1940 L-20 1940 Z" fill="${P.ground}" ${bzO()}/>
    <ellipse cx="420" cy="1560" rx="300" ry="70" fill="${P.mud}" ${bzO('stroke-width="5"')}/><ellipse cx="820" cy="1720" rx="200" ry="50" fill="${P.mud}" ${bzO('stroke-width="5"')}/>
    <path d="M-20 1420 Q 200 1380 300 1450 M700 1400 Q 860 1360 1100 1430" stroke="${P.trunk}" stroke-width="26" fill="none" stroke-linecap="round"/>
    ${cuFern(60, 1500, 0.9, P.fern)}${cuFern(1010, 1560, 1.1, P.fern)}${cuFern(620, 1360, 0.6, P.fern)}`;
}
// the tree with three knife cuts (close): bark, the cuts (#cuts) as pale gashes
function cuCutTree(P: CuPal) {
  let bark = ''; for (let i = 0; i < 9; i++) bark += `<path d="M${330 + i * 50} 0 q ${(i % 2 ? 1 : -1) * 20} 900 0 1920" stroke="${BZ.ink}" stroke-width="6" fill="none" opacity="0.35"/>`;
  return `${bzSky(P.sky[0], P.sky[1])}${cuBg(P, 4)}<rect x="300" y="0" width="480" height="1920" fill="${P.trunk}" ${bzO('stroke-width="10"')}/><rect x="620" y="0" width="160" height="1920" fill="#000" opacity="0.18"/>${bark}
    ${[[360, 300, 60], [700, 520, 40], [380, 1240, 70], [720, 1500, 50]].map(([mx, my, mr]) => `<ellipse cx="${mx}" cy="${my}" rx="${mr}" ry="${mr * 0.5}" fill="#4a7a3a" opacity="0.85"/><ellipse cx="${mx + 10}" cy="${my - 6}" rx="${mr * 0.5}" ry="${mr * 0.25}" fill="#6a9a4a" opacity="0.7"/>`).join('')}
    <path d="M760 0 q -60 400 10 800 t -20 1120" stroke="${BZ.ink}" stroke-width="16" fill="none"/><path d="M760 0 q -60 400 10 800 t -20 1120" stroke="#4a6a2a" stroke-width="8" fill="none"/>
    <path d="M300 1700 Q 140 1760 80 1940 L 420 1940 Z M780 1700 Q 940 1760 1000 1940 L 660 1940 Z" fill="${P.trunk}" ${bzO()}/>
    <g id="cuts">${[0, 1, 2].map((i) => `<path d="M${420 + i * 40} ${640 + i * 90} l 200 -60 l 6 30 l -200 60 z" fill="#e8d4a8" ${bzO('stroke-width="6"')}/>`).join('')}</g>`;
}
// small bare footprints in the mud pointing BACKWARDS (heel ahead, toes behind) along a path; ids fp0..fp7
function cuPrints(P: CuPal) {
  const fp = (i: number, x: number, y: number, r: number) => `<g id="fp${i}" opacity="0"><g transform="translate(${x} ${y}) rotate(${r})"><ellipse cx="0" cy="0" rx="34" ry="58" fill="#2a1e14"/><ellipse cx="0" cy="-60" rx="26" ry="14" fill="#2a1e14"/>
    ${[-24, -8, 8, 24].map((tx) => `<ellipse cx="${tx}" cy="74" rx="10" ry="13" fill="#2a1e14"/>`).join('')}</g></g>`;
  return `<rect width="1080" height="1920" fill="${P.mud}"/>${[...Array(14)].map((_, i) => `<ellipse cx="${(i * 211) % 1080}" cy="${(i * 397) % 1920}" rx="${40 + (i % 4) * 20}" ry="${16 + (i % 3) * 6}" fill="#000" opacity="0.12"/>`).join('')}
    ${[[620, 1700, 10], [440, 1460, -8], [600, 1220, 12], [420, 980, -6], [580, 740, 8], [430, 500, -10], [590, 280, 6], [450, 70, -4]].map(([x, y, r], i) => fp(i, x, y, r)).join('')}`;
}
// the wild pig (caititu), side view facing right; legs .p1..p4
function cuPig(id: string, x: number, y: number, s = 1) {
  const leg = (c: string, lx: number) => `<g transform="translate(${lx} -40)"><g class="${c}">${bzLimb(70, 22, '#3a3438')}</g></g>`;
  return `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${s})">${leg('p2', -90)}${leg('p4', 70)}
    <ellipse cx="0" cy="-110" rx="170" ry="95" fill="#4a4248" ${bzO()}/><path d="M-120 -190 l 20 -30 l 20 25 l 20 -30 l 20 28 l 20 -30 l 20 30 l 20 -28 l 20 30 l 20 -26" fill="#2a2428" stroke="${BZ.ink}" stroke-width="5"/>
    <path d="M130 -170 Q 230 -160 250 -100 Q 240 -60 140 -60 Z" fill="#4a4248" ${bzO()}/><ellipse cx="250" cy="-95" rx="22" ry="26" fill="#6a5a60" ${bzO('stroke-width="5"')}/><path d="M220 -70 q 10 -30 30 -36" stroke="#f4f0e4" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="190" cy="-130" r="8" fill="#ff3a2a"/><path d="M150 -180 l 10 -40 l 22 34 z" fill="#3a3438" ${bzO('stroke-width="5"')}/>${leg('p1', -110)}${leg('p3', 90)}</g></g></g>`;
}
function cuTrot(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  const n = Math.max(2, Math.floor((t1 - t0) / 0.14));
  [['p1', 30], ['p2', -30], ['p3', -30], ['p4', 30]].forEach(([c, a]) => tl.fromTo(`${sel} .${c}`, { rotation: +a, transformOrigin: '50% 0%' }, { rotation: -a, duration: 0.14, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0));
  tl.fromTo(`${sel} > .mv`, { y: 0 }, { y: -14, duration: 0.07, yoyo: true, repeat: n * 2 - 1 }, t0);
}
// the Curupira riding the pig (he sits on its back)
const cuRider = (x: number, y: number, s = 1) => `<g id="rider">${cuPig('pig', x, y, s)}<g id="kidride">${cuKid(x + 10 * s, y - 130 * s, s * 0.95)}</g></g>`;
// a shotgun (local origin at the stock), pointing right
const cuGun = (id: string, x: number, y: number, s = 1, rot = 0, vines = false) => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 L120 -24 L130 10 L20 30 Z" fill="#6a3a1a" ${bzO()}/><rect x="110" y="-24" width="330" height="22" rx="8" fill="#3a3a44" ${bzO()}/><rect x="110" y="-4" width="300" height="18" rx="8" fill="#2a2a34" ${bzO('stroke-width="5"')}/>
  ${vines ? [150, 210, 270, 330, 390].map((vx, i) => `<path d="M${vx} -40 q 20 30 -4 60 q -16 -30 30 -50" stroke="#4a7a2a" stroke-width="10" fill="none"/><ellipse cx="${vx + 14}" cy="${-36 + (i % 2) * 70}" rx="14" ry="7" fill="#3f8a3a"/>`).join('') : ''}</g></g>`;
// the lantern glow in a hand (a warm circle of light)
const cuLantern = (id: string, x: number, y: number, r = 260) => `<g id="${id}">${bzGlow(id + 'g', x, y, r, '#ffd27a', 0.45)}<rect x="${x - 18}" y="${y - 30}" width="36" height="50" rx="6" fill="#ffe8a0" ${bzO('stroke-width="5"')}/><path d="M${x - 14} ${y - 30} q 14 -24 28 0" stroke="${BZ.ink}" stroke-width="5" fill="none"/></g>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#5a9a8a', html: () => svg(`${cuBg(CU_PAL.day)}${cuMid(CU_PAL.day)}${cuGround(CU_PAL.day)}${cuCaio(170, 1640, 1)}${cuBento(400, 1640, 1)}${cuVo(640, 1640, 1)}${cuKid(880, 1640, 1)}${bzFrameLeaves('both')}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #curupira', s.t0, 'glow', 'grin'); } },
  'test-dawn': { bg: '#14283a', html: () => svg(`${cuBg(CU_PAL.dawn)}${cuMid(CU_PAL.dawn)}${cuGround(CU_PAL.dawn)}${cuCaio(380, 1640, 1.05)}${cuLantern('lt', 470, 1450)}${cuBento(680, 1640, 1.05)}${bzParticles('ff', 'fireflies', 20, [0, 700, 1080, 1500], 2)}${bzFrameLeaves('both')}${bzVignette(0.6)}`),
    anim(tl, s) { bzParticlesGo(tl, '#sc-test-dawn #ff', 'fireflies', s.t0, s.t1); } },
  'test-day': { bg: '#5a9a8a', html: () => svg(`${cuBg(CU_PAL.day, 2)}${bzRays('ry', 700, -100, 6, 1800, '#fff8c8', 0.14)}${cuMid(CU_PAL.day, 2)}${cuGround(CU_PAL.day)}${bzParticles('lv', 'leaves', 12, [0, 0, 1080, 900], 4)}${bzParticles('dt', 'dust', 30, [0, 300, 1080, 1500], 5)}${bzFrameLeaves('top')}`),
    anim(tl, s) { bzParticlesGo(tl, '#sc-test-day #lv', 'leaves', s.t0, s.t1); bzParticlesGo(tl, '#sc-test-day #dt', 'dust', s.t0, s.t1); } },
  'test-cuts': { bg: '#5a9a8a', html: () => svg(`${cuCutTree(CU_PAL.day)}`), anim() {} },
  'test-prints': { bg: '#6a4a30', html: () => svg(`${cuPrints(CU_PAL.day)}`), anim(tl, s) { for (let i = 0; i < 8; i++) tl.set(`#sc-test-prints #fp${i}`, { opacity: 1 }, s.t0); } },
  'test-rider': { bg: '#5a9a8a', html: () => svg(`${cuBg(CU_PAL.day, 3)}${cuMid(CU_PAL.day, 3)}${cuGround(CU_PAL.day)}${cuRider(420, 1680, 1.2)}${bzFrameLeaves('both')}`),
    anim(tl, s) { bzFace(tl, '#sc-test-rider #curupira', s.t0, 'glow', 'grin'); bzPose(tl, '#sc-test-rider #curupira', s.t0, { lL: 60, lR: -60, aR: -140 }, 0.01); cuTrot(tl, '#sc-test-rider #pig', s.t0, s.t1); } },
  'test-gun': { bg: '#3a4a2a', html: () => svg(`<rect width="1080" height="1920" fill="#3a4a2a"/>${cuGun('gun', 150, 1000, 1.8, -8, true)}`), anim() {} },
  'test-face': { bg: '#14283a', html: () => svg(`${cuBg(CU_PAL.day)}${cuKid(540, 2050, 3.2)}${bzFrameLeaves('both')}`), anim(tl, s) { bzFace(tl, '#sc-test-face #curupira', s.t0, 'glow', 'grin'); } },
  // covers (clean frames for core/cover.py)
  'cover-a': { bg: '#5a9a8a', html: () => svg(`${cuBg(CU_PAL.day, 13)}${bzRays('ry', 700, -120, 5, 1900, '#fff8c8', 0.12)}${cuKid(540, 2050, 3.2)}${bzFrameLeaves('both')}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #curupira', s.t0, 'glow', 'grin'); } },
  'cover-b': { bg: '#3a4a2a', html: () => svg(`<rect width="1080" height="1920" fill="#3a4a2a"/>${[...Array(12)].map((_, i) => `<ellipse cx="${(i * 191) % 1080}" cy="${(i * 331) % 1920}" rx="90" ry="40" fill="#2f5a30" opacity="0.6"/>`).join('')}${cuGun('gun', 150, 1100, 1.8, -8, true)}${bzVignette(0.6)}`), anim() {} },
});
