// =====================================================================
//  AMERICAN LEGENDS EP.2: THE JERSEY DEVIL, Brasil Z toon look (styles/flat2d/toon.ts), 9:16, English. Prefix jd.
//  Cast (original designs): Jake (the narrator, 13, blue winter jacket, beanie), Uncle Ray (big beard, trucker cap,
//  green flannel, a flashlight), Buck the dog, and the Jersey Devil: a horse's long head with red eyes, bat wings,
//  goat legs with hooves, a long forked tail, a dark grey-brown hide. It is revealed in parts. Threat colour: red.
//  Sets: the Pine Barrens at night in snow (pines, moon), the cabin (porch, lit window, chimney) and the shed, the
//  cabin's window from inside, the morning roof with hoof prints going to the chimney.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Jake (kid tall 1.2) ~415*s.
// =====================================================================
const JD_SPEC: Record<string, BzSpec> = {
  jake: { kid: true, tall: 1.2, skin: '#f0c4a0', hat: { kind: 'beanie', color: '#f6c744' }, top: '#3a6ac8', top2: '#f4f2ea', pants: '#3a3a4a', shoes: '#5a3a2a' },
  ray: { wide: 1.2, skin: '#e0a880', hat: { kind: 'cap', color: '#3a5a8a' }, beard: '#6a4a2a', mustache: '#6a4a2a', top: '#3a7a4a', top2: '#2a5a3a', belt: '#4a2a1a', pants: '#4a4a5a', shoes: '#3a2a1a' },
};
const jdChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, JD_SPEC[k], x, y, s, flip);
// the dog (side view facing right; .jaw opens to growl), origin at its feet
const jdDog = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${[-80, -40, 50, 90].map((lx) => `<rect x="${lx}" y="-90" width="22" height="90" rx="8" fill="#a8743a" ${bzO()}/>`).join('')}
  <ellipse cx="0" cy="-120" rx="130" ry="60" fill="#a8743a" ${bzO()}/><path d="M-120 -140 q -50 -40 -40 -90" stroke="${BZ.ink}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M-120 -140 q -50 -40 -40 -90" stroke="#a8743a" stroke-width="12" fill="none" stroke-linecap="round"/>
  <circle cx="120" cy="-180" r="56" fill="#a8743a" ${bzO()}/><path d="M100 -230 l -20 -50 l 40 26 z" fill="#7a4a22" ${bzO('stroke-width="5"')}/><circle cx="138" cy="-196" r="8" fill="${BZ.ink}"/>
  <path d="M160 -180 L 210 -176 L 206 -150 L 160 -158 Z" fill="#a8743a" ${bzO('stroke-width="5"')}/><circle cx="208" cy="-176" r="9" fill="${BZ.ink}"/>
  <path class="jaw" d="M160 -152 L 204 -146 L 196 -128 L 156 -136 Z" fill="#a8743a" ${bzO('stroke-width="5"')}/><path d="M168 -152 l 6 8 l 6 -8 l 6 8 l 6 -8" stroke="#fff" stroke-width="3" fill="none"/></g></g>`;
// THE JERSEY DEVIL, origin at its hooves, facing left. Parts (each its own class so shots can reveal them one by one):
// .legs (goat legs, hooves), .tail, .wingL/.wingR (bat wings, pivot at the shoulders), .body, .head (horse head, .eyes red)
function jdDevil(id: string, x: number, y: number, s = 1) {
  const hide = '#6a5048', hide2 = '#4a3434';
  const wing = (cls: string, f: number) => `<g class="${cls}"><path d="M0 0 L ${f * 120} -260 L ${f * 260} -330 L ${f * 330} -200 L ${f * 290} -90 L ${f * 230} -130 L ${f * 200} -30 L ${f * 130} -70 L ${f * 90} 20 Z" fill="${hide2}" ${bzO()}/><path d="M0 0 L ${f * 260} -330 M0 0 L ${f * 290} -90 M0 0 L ${f * 200} -30" stroke="${BZ.ink}" stroke-width="5"/></g>`;
  return `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${s})">
    <g class="tail"><path d="M60 -260 Q 260 -260 280 -120 Q 300 0 220 30" stroke="${BZ.ink}" stroke-width="28" fill="none" stroke-linecap="round"/><path d="M60 -260 Q 260 -260 280 -120 Q 300 0 220 30" stroke="${hide}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M220 30 l -40 10 l 30 -40 l 20 -10 z" fill="${hide}" ${bzO('stroke-width="5"')}/></g>
    <g transform="translate(-20 -360)">${wing('wingR', 1)}</g>
    <g class="legs">${[[-60, 1], [40, -1]].map(([lx]) => `<path d="M${lx} -220 L ${lx - 20} -120 L ${lx + 20} -50 L ${lx} 0" stroke="${BZ.ink}" stroke-width="36" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M${lx} -220 L ${lx - 20} -120 L ${lx + 20} -50 L ${lx} 0" stroke="${hide}" stroke-width="22" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M${lx - 22} 0 L ${lx + 22} 0 L ${lx + 14} -26 L ${lx - 14} -26 Z" fill="#1a1414" ${bzO('stroke-width="5"')}/>`).join('')}</g>
    <g class="body"><ellipse cx="0" cy="-330" rx="110" ry="150" fill="${hide}" ${bzO()}/><path d="M-60 -400 q 50 30 100 0 M-50 -330 q 50 30 100 0" stroke="${hide2}" stroke-width="8" fill="none"/></g>
    <g transform="translate(20 -360)">${wing('wingL', -1)}</g>
    <g class="head"><path d="M-40 -460 Q -60 -560 -110 -620 Q -200 -650 -250 -600 Q -280 -560 -250 -540 Q -200 -520 -150 -520 Q -100 -480 -60 -420 Z" fill="${hide}" ${bzO()}/>
      <path d="M-90 -600 l -10 -70 l 40 50 z M-60 -590 l 10 -70 l 20 60 z" fill="${hide2}" ${bzO('stroke-width="5"')}/><path d="M-250 -575 q 10 6 20 0" stroke="${BZ.ink}" stroke-width="5" fill="none"/><path d="M-240 -545 q 30 10 60 0" stroke="${BZ.ink}" stroke-width="6" fill="none"/>
      <g class="eyes">${bzGlow(id + 'eg', -140, -590, 120, '#ff2a1a', 0.55)}<ellipse cx="-140" cy="-590" rx="22" ry="14" fill="#ff2a1a" ${bzO('stroke-width="5"')}/></g></g></g></g></g>`;
}
// a pine (triangles), with optional snow
const jdPine = (x: number, y: number, s: number, c = '#14281e', snow = true) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-14" y="-60" width="28" height="70" fill="#2a1e16"/>${[0, 1, 2].map((i) => `<path d="M${-150 + i * 30} ${-60 - i * 150} L 0 ${-280 - i * 150} L ${150 - i * 30} ${-60 - i * 150} Z" fill="${c}" ${bzO()}/>${snow ? `<path d="M${-60 + i * 10} ${-200 - i * 150} L 0 ${-280 - i * 150} L ${60 - i * 10} ${-200 - i * 150} Q 0 ${-215 - i * 150} ${-60 + i * 10} ${-200 - i * 150} Z" fill="#e8eef4"/>` : ''}`).join('')}</g>`;
// the Pine Barrens at night in snow: moon, far pines, the snowy ground from y 1300
function jdWoods(seed = 1, moon = true) {
  let far = ''; for (let i = 0; i < 10; i++) far += jdPine(-40 + i * 125 + (seed * 37 % 50), 1240 + (i % 3) * 30, 0.7 + (i % 2) * 0.15, '#0e1e18');
  return `${bzSky('#060a1a', '#1c2a44')}${bzStars(70, seed, 900)}${moon ? `${bzMoon('mn', 800, 300, 70)}${bzGlow('mg', 800, 300, 260, '#e8eef4', 0.18)}` : ''}<g opacity="0.85">${far}</g>
    <path d="M-20 1290 Q 300 1260 560 1300 T 1100 1280 L 1100 1940 L -20 1940 Z" fill="#c8d4e4" ${bzO()}/><path d="M-20 1400 Q 400 1370 1100 1420" stroke="#a8b8cc" stroke-width="8" fill="none"/>${bzFog(1240, '#8aa0c0', 0.15)}`;
}
// the cabin (porch, lit window, chimney with smoke) and the shed on its right; the shed roof is y 1020–1080, x 700–1040
function jdCabin() {
  return `${jdWoods(2)}<g><rect x="60" y="900" width="520" height="400" fill="#6a4a32" ${bzO()}/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M60 ${940 + i * 60} h520" stroke="#4a3220" stroke-width="6"/>`).join('')}
    <path d="M20 910 L 320 720 L 620 910 Z" fill="#3a2a22" ${bzO()}/><path d="M60 870 Q 320 720 580 870" stroke="#e8eef4" stroke-width="22" fill="none"/><rect x="420" y="700" width="70" height="160" fill="#7a5a4a" ${bzO()}/>
    <rect x="120" y="980" width="130" height="120" fill="#ffc860" ${bzO()}/>${bzGlow('wg', 185, 1040, 200, '#ffc860', 0.35)}<rect x="340" y="1040" width="110" height="260" fill="#3a2418" ${bzO()}/>
    <rect x="40" y="1280" width="560" height="30" fill="#5a3a22" ${bzO('stroke-width="5"')}/></g>
    <g id="smk">${[0, 1, 2].map((i) => `<circle cx="${455 + i * 20}" cy="${660 - i * 70}" r="${30 + i * 12}" fill="#8a94a8" opacity="0.5"/>`).join('')}</g>
    <g><rect x="720" y="1080" width="300" height="220" fill="#5a3a2a" ${bzO()}/><path d="M690 1090 L 870 1010 L 1050 1090 Z" fill="#3a2a22" ${bzO()}/><path d="M710 1080 L 870 1012 L 1030 1080" stroke="#e8eef4" stroke-width="14" fill="none"/><rect x="820" y="1160" width="100" height="140" fill="#2a1a12" ${bzO()}/></g>`;
}
// inside the cabin: wood walls, the window with the dark woods (x 300–780, y 420–900), a lamp
function jdInside() {
  return `<rect width="1080" height="1920" fill="#7a5034"/>${[...Array(14)].map((_, i) => `<path d="M0 ${i * 140} H1080" stroke="#5a3a24" stroke-width="8"/>`).join('')}
    <rect x="300" y="420" width="480" height="480" fill="#060a1a" ${bzO('stroke-width="14"')}/>${bzStars(10, 4, 880).replace(/<circle cx="(\d+)"/g, (m, x) => `<circle cx="${300 + (+x % 480)}"`)}<path d="M540 420 v480 M300 660 h480" stroke="${BZ.ink}" stroke-width="12"/>
    ${bzGlow('lg', 900, 700, 360, '#ffc860', 0.35)}<rect y="1300" width="1080" height="640" fill="#5a3a24" ${bzO()}/>`;
}
// the morning roof: snow, the chimney, hoof prints (ids hp0..hp7) going to the chimney
function jdRoof() {
  const hp = (i: number, x: number, y: number) => `<g id="hp${i}"><path d="M${x - 22} ${y} q 0 -36 18 -40 l 4 40 z M${x + 22} ${y} q 0 -36 -18 -40 l -4 40 z" fill="#3a2c2c"/></g>`;
  return `${bzSky('#c8d8ec', '#f4f0e8')}<path d="M-40 1940 L -40 900 L 1120 500 L 1120 1940 Z" fill="#e8eef4" ${bzO()}/><path d="M-40 900 L 1120 500" stroke="#a8b8cc" stroke-width="10"/>
    <rect x="760" y="380" width="200" height="340" fill="#8a5a4a" ${bzO()}/>${[0, 1, 2, 3].map((i) => `<path d="M760 ${430 + i * 70} h200" stroke="#6a4232" stroke-width="6"/>`).join('')}<rect x="740" y="360" width="240" height="40" fill="#6a4232" ${bzO()}/>
    ${[[120, 1700], [250, 1560], [330, 1400], [460, 1270], [540, 1110], [660, 980], [720, 850], [820, 760]].map(([x, y], i) => hp(i, x, y)).join('')}`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#060a1a', html: () => svg(`${jdWoods()}${jdChar('jake', 180, 1700, 1.0)}${jdChar('ray', 420, 1700, 1.0)}${jdDog('dog', 650, 1700, 0.8)}${jdDevil('jd', 880, 1720, 0.75)}`), anim() {} },
  'test-cabin': { bg: '#060a1a', html: () => svg(`${jdCabin()}${jdDevil('jd', 870, 1030, 0.4)}`), anim() {} },
  'test-inside': { bg: '#7a5034', html: () => svg(`${jdInside()}${jdDog('dog', 340, 1600, 1.1)}${jdChar('jake', 760, 1700, 1.1, true)}`), anim() {} },
  'test-roof': { bg: '#c8d8ec', html: () => svg(`${jdRoof()}`), anim() {} },
  'test-devil': { bg: '#060a1a', html: () => svg(`${jdWoods(3)}${jdDevil('jd', 600, 1800, 1.6)}`), anim() {} },
  'cover-a': { bg: '#060a1a', html: () => svg(`${jdWoods(5)}${jdDevil('jd', 640, 2300, 2.4)}${bzVignette(0.5)}`), anim() {} },
  'cover-b': { bg: '#c8d8ec', html: () => svg(`${jdRoof()}${bzVignette(0.4)}`), anim() {} },
});
