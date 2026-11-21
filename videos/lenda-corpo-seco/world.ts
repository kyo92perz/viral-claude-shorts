// =====================================================================
//  LENDA: O CORPO-SECO, in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix cs.
//  Cast: Seu Tião (the grandfather, straw hat, on a bicycle), the Corpo-Seco (dry leather and bone, claws), and, in the
//  past, the bad son alive and his old mother (only as shadows in a window). Sets: the dirt road at night (navy sky,
//  moon, fog), the twisted tree, the farm gate with a wooden cross, the grave that spits the coffin, the farm at dawn.
// =====================================================================
const CS_SPEC: Record<string, BzSpec> = {
  tiao: { skin: '#c98757', hat: { kind: 'straw', color: '#e8c86a' }, mustache: '#ece8e0', top: '#3a6aa8', top2: '#e8e4dc', pants: '#6a5a44', shoes: '#3a2a1a' },
  tiaoTorn: { skin: '#c98757', hat: { kind: 'straw', color: '#e8c86a' }, mustache: '#ece8e0', top: '#3a6aa8', top2: '#e8e4dc', pants: '#6a5a44', shoes: '#3a2a1a',
    extra: '<path d="M-50 -420 l70 160 M-20 -440 l70 170 M10 -450 l60 160" stroke="#c98757" stroke-width="14" stroke-linecap="round"/><path d="M-50 -420 l70 160 M-20 -440 l70 170 M10 -450 l60 160" stroke="#2b2433" stroke-width="4" stroke-linecap="round" opacity="0.6"/>' },
  seco: { tall: 1.12, wide: 0.62, face: 'dry', ribs: true, claws: true, hair: { style: 'messy', color: '#2a2018' }, top: '#7a6a55', pants: '#4a3a2a', shoes: '#7a6a55' },
  vivo: { tall: 1.05, wide: 0.8, skin: '#b8865a', hair: { style: 'messy', color: '#2a2018' }, top: '#7a3a2a', pants: '#3a3030', shoes: '#2b2433' },
  compadre: { skin: '#8a5a3a', hat: { kind: 'fedora', color: '#5a4a3a' }, beard: '#d8d4cc', top: '#a8742a', pants: '#4a4a5a', shoes: '#2b2433' },
  mae: { tall: 0.92, skin: '#d9a27a', hair: { style: 'bun', color: '#b8b4ac' }, top: '#6a4a7a', dress: '#6a4a7a', shoes: '#2b2433' },
};
const csTiao = (x: number, y: number, s = 1, flip = false, torn = false) => bzChar('tiao', torn ? CS_SPEC.tiaoTorn : CS_SPEC.tiao, x, y, s, flip);
const csSeco = (x: number, y: number, s = 1, flip = false) => bzChar('seco', CS_SPEC.seco, x, y, s, flip);
// ---- the night road: navy sky with stars and the moon, far hills, the dirt road going away, fog low
function csNight(moonX = 820, moonY = 360) {
  return `${bzSky('#0f1530', '#3a2f5a')}${bzStars(70, 3, 1000)}${bzMoon('moon', moonX, moonY, 80)}
    <path d="M-20 1120 Q 200 1010 420 1080 T 820 1050 T 1100 1070 L1100 1300 L-20 1300 Z" fill="#232848" ${bzO()}/>
    <path d="M-20 1220 Q 300 1150 600 1200 T 1100 1180 L1100 1940 L-20 1940 Z" fill="#2c3a34" ${bzO()}/>`;
}
const csRoad = () => `<path d="M470 1200 L610 1200 L1000 1940 L80 1940 Z" fill="#8a7458" ${bzO()}/><path d="M540 1210 L540 1940" stroke="#6e5c44" stroke-width="10" stroke-dasharray="40 50" opacity="0.6"/>`;
// the twisted tree (dead = bare and grey); a corpse can hide in it
function csTree(id: string, x: number, y: number, s = 1, dead = false) {
  const c = dead ? '#6a6670' : '#3a2e2a', leaf = dead ? '' : `<g class="leaves">${[[-170, -760, 150], [40, -860, 170], [210, -720, 140], [-60, -640, 120]].map(([lx, ly, r]) => `<circle cx="${lx}" cy="${ly}" r="${r}" fill="#1f3a30" ${bzO()}/>`).join('')}</g>`;
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${leaf}
    <path d="M-60 0 C -50 -200 -90 -360 -30 -520 C 0 -600 -120 -680 -200 -720 M-30 -520 C 40 -640 160 -640 230 -730 M-10 -560 C 0 -680 30 -760 20 -860" stroke="${BZ.ink}" stroke-width="${dead ? 46 : 54}" fill="none" stroke-linecap="round"/>
    <path d="M-60 0 C -50 -200 -90 -360 -30 -520 C 0 -600 -120 -680 -200 -720 M-30 -520 C 40 -640 160 -640 230 -730 M-10 -560 C 0 -680 30 -760 20 -860" stroke="${c}" stroke-width="${dead ? 32 : 40}" fill="none" stroke-linecap="round"/>
    <path d="M-150 0 Q -60 -40 0 -380 Q 60 -40 140 0 Z" fill="${c}" ${bzO()}/><path d="M-40 -120 q20 -60 10 -140 M40 -80 q-10 -50 6 -110" stroke="${BZ.ink}" stroke-width="5" fill="none" opacity="0.5"/>
    <g class="eyes" opacity="0"><ellipse cx="-30" cy="-300" rx="16" ry="8" fill="#f0e4a0"/><ellipse cx="25" cy="-300" rx="16" ry="8" fill="#f0e4a0"/></g></g></g>`;
}
// a bicycle seen from the side (facing right): wheels spin (class .wh), the crank turns (.crank)
function csBike(id: string, x: number, y: number, s = 1) {
  const wheel = (cx: number) => `<g class="wh" data-c="${cx}"><circle cx="${cx}" cy="0" r="110" fill="none" stroke="${BZ.ink}" stroke-width="16"/><circle cx="${cx}" cy="0" r="110" fill="none" stroke="#9aa0aa" stroke-width="6"/>
    ${[0, 45, 90, 135].map((a) => `<path d="M${cx - 100 * Math.cos(a * Math.PI / 180)} ${-100 * Math.sin(a * Math.PI / 180)} L${cx + 100 * Math.cos(a * Math.PI / 180)} ${100 * Math.sin(a * Math.PI / 180)}" stroke="#c9ced8" stroke-width="3"/>`).join('')}<circle cx="${cx}" cy="0" r="12" fill="${BZ.ink}"/></g>`;
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${wheel(-190)}${wheel(190)}
    <path d="M-190 0 L-40 0 L60 -170 L-90 -170 Z M-40 0 L-110 -210 M60 -170 L190 0 M60 -170 L90 -250 L40 -260" stroke="${BZ.ink}" stroke-width="22" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M-190 0 L-40 0 L60 -170 L-90 -170 Z M-40 0 L-110 -210 M60 -170 L190 0 M60 -170 L90 -250 L40 -260" stroke="#b8342c" stroke-width="12" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="-150" y="-232" width="90" height="26" rx="12" fill="#3a2a1a" ${bzO('stroke-width="5"')}/>
    <g class="crank"><path d="M-40 -50 L-40 50" stroke="${BZ.ink}" stroke-width="12" stroke-linecap="round"/></g><circle cx="-40" cy="0" r="24" fill="#9aa0aa" ${bzO('stroke-width="5"')}/></g></g>`;
}
// Tião riding: the figure sits on the saddle (hips at the saddle), arms to the handlebar, legs on the pedals
const csRider = (x: number, y: number, s = 1, torn = false) => `${csBike('bike', x, y, s)}${csTiao(x - 105 * s, y - 32 * s, s, false, torn)}`;
function csPedal(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, fast = false) {
  const p = fast ? 0.18 : 0.34, n = Math.max(2, Math.floor((t1 - t0) / p));
  bzPose(tl, sel + ' #tiao', t0, { aL: -62, aR: -62 }, 0.01);
  tl.fromTo(`${sel} #tiao .lL`, { rotation: -85, transformOrigin: '50% 0%' }, { rotation: -25, duration: p / 2, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} #tiao .lR`, { rotation: -25, transformOrigin: '50% 0%' }, { rotation: -85, duration: p / 2, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} #bike .wh`, { rotation: 0, transformOrigin: '50% 50%' }, { rotation: 360 * n * (fast ? 1.4 : 1), duration: t1 - t0, ease: 'none' }, t0);
  tl.fromTo(`${sel} #bike .crank`, { rotation: 0, svgOrigin: '-40 0' }, { rotation: 360 * n, duration: t1 - t0, ease: 'none' }, t0);
}
// the farm gate (porteira) between two posts, a wooden cross on the left post
function csGate(x: number, y: number, s = 1) {
  return `<g id="gate"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-330" y="-420" width="60" height="440" fill="#7a5a3a" ${bzO()}/><rect x="270" y="-420" width="60" height="440" fill="#7a5a3a" ${bzO()}/>
    ${[-340, -260, -180].map((gy) => `<rect x="-270" y="${gy}" width="540" height="36" fill="#a07a4a" ${bzO()}/>`).join('')}<path d="M-270 -150 L270 -340" stroke="${BZ.ink}" stroke-width="40"/><path d="M-270 -150 L270 -340" stroke="#a07a4a" stroke-width="26"/>
    <g id="cross"><rect x="-312" y="-640" width="24" height="230" fill="#6a4a2a" ${bzO()}/><rect x="-370" y="-580" width="140" height="24" fill="#6a4a2a" ${bzO()}/></g></g></g>`;
}
// the cemetery on a hill: a grave mound with a wooden cross; the coffin (id) bursts out of the dirt
function csGrave() {
  return `${bzSky('#0f1530', '#3a2f5a')}${bzStars(50, 7, 900)}${bzMoon('moon', 240, 380, 70)}<path d="M-20 1300 Q 540 1050 1100 1300 L1100 1940 L-20 1940 Z" fill="#2c3a34" ${bzO()}/>
    ${[[160, 1260, 0.6], [900, 1240, 0.7]].map(([gx, gy, gs]) => `<g transform="translate(${gx} ${gy}) scale(${gs})"><rect x="-12" y="-200" width="24" height="200" fill="#5a4a3a" ${bzO()}/><rect x="-70" y="-150" width="140" height="24" fill="#5a4a3a" ${bzO()}/></g>`).join('')}
    <g id="coffin"><g transform="translate(540 1420) rotate(-12)"><path d="M-90 -260 L90 -260 L130 -120 L90 260 L-90 260 L-130 -120 Z" fill="#5a3a24" ${bzO()}/><path d="M0 -180 v180 M-50 -110 h100" stroke="#c9a46a" stroke-width="14"/></g></g>
    <rect x="-20" y="1530" width="1120" height="420" fill="#2c3a34"/><path d="M200 1500 Q 540 1340 880 1500 L880 1560 L200 1560 Z" fill="#6a5238" ${bzO()}/><g id="dirt">${[...Array(9)].map((_, i) => `<circle cx="${380 + i * 40}" cy="${1440 - (i % 3) * 30}" r="${14 + (i % 3) * 6}" fill="#6a5238" ${bzO('stroke-width="4"')}/>`).join('')}</g>`;
}
// a house window at night with shadows behind the curtain (the past: the son and his mother)
function csWindow() {
  return `<rect width="1080" height="1920" fill="#1c1a2a"/><rect x="0" y="0" width="1080" height="1920" fill="#3a2f4a" opacity="0.5"/>
    <rect x="150" y="520" width="780" height="880" fill="#f2c46a" ${bzO('stroke-width="14"')}/><path d="M540 520 v880 M150 960 h780" stroke="${BZ.ink}" stroke-width="16"/>
    <g id="shmae"><g transform="translate(700 1400)"><circle cx="0" cy="-520" r="70" fill="#3a2a2a"/><circle cx="0" cy="-600" r="36" fill="#3a2a2a"/><path d="M-110 0 Q -90 -400 0 -440 Q 90 -400 110 0 Z" fill="#3a2a2a"/></g></g>
    <g id="shson"><g transform="translate(360 1400)"><circle cx="0" cy="-640" r="80" fill="#2a1e1e"/><path d="M-120 0 L-100 -520 Q 0 -580 100 -520 L120 0 Z" fill="#2a1e1e"/><g class="fist"><path d="M60 -500 L190 -720" stroke="#2a1e1e" stroke-width="56" stroke-linecap="round"/><circle cx="195" cy="-730" r="46" fill="#2a1e1e"/></g></g></g>
    <path d="M150 520 Q 260 900 200 1400 L150 1400 Z M930 520 Q 820 900 880 1400 L930 1400 Z" fill="#a8342c" ${bzO()}/>`;
}
// heaven and hell both closed to him
function csNowhere() {
  return `<rect width="1080" height="960" fill="#bfe0f6"/><rect y="960" width="1080" height="960" fill="#3a0e0e"/>
    <g transform="translate(540 520)">${[[-160, 0, 120], [0, -40, 150], [170, 10, 120]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" ${bzO()}/>`).join('')}<rect x="-90" y="-60" width="180" height="200" rx="20" fill="#f6e27a" ${bzO()}/></g>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${120 + i * 170} 1560 q-60 -160 20 -280 q30 90 70 110 q10 -110 60 -180 q60 190 -20 350 z" fill="${i % 2 ? '#f29a4a' : '#e0402a'}" ${bzO()}/>`).join('')}
    <g id="x1" opacity="0"><path d="M380 360 l320 320 M700 360 l-320 320" stroke="${BZ.red}" stroke-width="44" stroke-linecap="round"/></g>
    <g id="x2" opacity="0"><path d="M380 1240 l320 320 M700 1240 l-320 320" stroke="${BZ.red}" stroke-width="44" stroke-linecap="round"/></g>
    <path d="M0 960 h1080" stroke="${BZ.ink}" stroke-width="12"/>`;
}
// the farm at dawn: orange-purple sky, the farmhouse porch
function csDawn() {
  return `${bzSky('#f29a4a', '#5a3f7a')}${bzSun(820, 1000, 120, '#ffd27a')}<path d="M-20 1200 Q 300 1120 600 1180 T 1100 1160 L1100 1940 L-20 1940 Z" fill="#4a6a44" ${bzO()}/>
    <rect x="80" y="760" width="640" height="560" fill="#e8d4b0" ${bzO()}/><path d="M40 780 L400 560 L760 780 Z" fill="#a8342c" ${bzO()}/><rect x="320" y="1040" width="150" height="280" fill="#7a4a2a" ${bzO()}/>
    <rect x="140" y="880" width="120" height="110" fill="#f6e2a8" ${bzO()}/><rect x="540" y="880" width="120" height="110" fill="#f6e2a8" ${bzO()}/><rect x="-20" y="1320" width="1120" height="620" fill="#8a7458" ${bzO()}/>`;
}
const csDark = (id = 'dk', c = '#05060c') => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="0"/>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#0f1530', html: () => svg(`${csNight()}${csRoad()}${csTiao(270, 1560, 1)}${csSeco(560, 1560, 1)}${bzChar('mae', CS_SPEC.mae, 850, 1560, 1)}${bzFog(1500)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #tiao', s.t0, 'wide', 'o'); bzFace(tl, '#sc-test-cast #seco', s.t0, 'angry', 'grin'); } },
  'test-road': { bg: '#0f1530', html: () => svg(`${csNight()}${csRoad()}${csTree('tree', 820, 1500, 1.1)}${csRider(380, 1600, 0.9)}${bzFog(1520)}`),
    anim(tl, s) { csPedal(tl, '#sc-test-road', s.t0, s.t1); tl.set('#sc-test-road #tree .eyes', { opacity: 1 }, s.t0 + 0.5); } },
  'test-tree': { bg: '#0f1530', html: () => svg(`${csNight(200, 300)}${csTree('tree', 540, 1650, 1.6)}${csSeco(540, 1250, 1.1)}${bzFog(1600)}`),
    anim(tl, s) { bzPose(tl, '#sc-test-tree #seco', s.t0, { aL: 160, aR: -160, lL: 20, lR: -20 }, 0.01); bzFace(tl, '#sc-test-tree #seco', s.t0, 'angry', 'grin'); } },
  'test-gate': { bg: '#0f1530', html: () => svg(`${csNight()}${csRoad()}${csGate(540, 1500, 1.1)}${bzFog(1500)}`), anim() {} },
  'test-grave': { bg: '#0f1530', html: () => svg(`${csGrave()}`), anim() {} },
  'test-window': { bg: '#1c1a2a', html: () => svg(`${csWindow()}`), anim() {} },
  'test-nowhere': { bg: '#3a0e0e', html: () => svg(`${csNowhere()}`), anim(tl, s) { tl.set('#sc-test-nowhere #x1, #sc-test-nowhere #x2', { opacity: 1 }, s.t0 + 0.3); } },
  'test-dawn': { bg: '#f29a4a', html: () => svg(`${csDawn()}${csTiao(700, 1560, 1.2, true, true)}`), anim(tl, s) { bzFace(tl, '#sc-test-dawn #tiao', s.t0, 'half', 'frown'); } },
});
