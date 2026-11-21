// =====================================================================
//  LENDA: A MULA SEM CABEÇA, in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix mu.
//  Cast: Davi (the narrator, 13), Beto (13, red cap), the grandmother (a memory), the Mula (a dark mule seen from the
//  side, no head: fire comes out of the neck; legs gallop, hooves spark).
//  Sets: the small town square at night (church with a bell tower, cobblestones, lamps), the cobbled street.
// =====================================================================
const MU_SPEC: Record<string, BzSpec> = {
  davi: { kid: true, skin: '#c98757', hair: { style: 'short', color: '#1c1410' }, top: '#2f62b8', top2: '#f4f2ea', pants: '#3a3a4a', shoes: '#f0ece2' },
  beto: { kid: true, skin: '#e0a878', hair: { style: 'short', color: '#8a5a2a' }, hat: { kind: 'cap', color: '#d0342c' }, top: '#3a8a4a', pants: '#3a5a8a', shoes: '#2b2433' },
  vo: { tall: 0.88, skin: '#a87458', hair: { style: 'bun', color: '#ece8e0' }, top: '#3a6a8a', dress: '#3a6a8a', shoes: '#2b2433' },
};
const muDavi = (x: number, y: number, s = 1, flip = false) => bzChar('davi', MU_SPEC.davi, x, y, s, flip);
const muBeto = (x: number, y: number, s = 1, flip = false) => bzChar('beto', MU_SPEC.beto, x, y, s, flip);
const muVo = (x: number, y: number, s = 1, flip = false) => bzChar('vo', MU_SPEC.vo, x, y, s, flip);
// fire (three tongues; .fl flicker). Local origin at the base
const muFire = (cls = 'fire', k = 1) => `<g class="${cls}"><path class="fl" d="M-60 0 Q -90 -120 -30 -190 Q -20 -120 0 -110 Q 10 -220 70 -280 Q 60 -170 90 -120 Q 110 -60 60 0 Z" fill="#e0402a" ${bzO()}/>
  <path class="fl" d="M-30 0 Q -50 -80 -10 -130 Q 0 -80 20 -80 Q 30 -150 60 -190 Q 60 -110 70 -60 Q 70 -20 40 0 Z" fill="#f29a4a"/><path class="fl" d="M-10 0 Q -20 -50 10 -90 Q 20 -50 40 -40 Q 40 -10 20 0 Z" fill="#ffe08a"/>${k > 1 ? '' : ''}</g>`;
// the Mula seen from the side, facing right; legs .l1..l4 (pivot at the body), .tail, the neck with .fire; feet spark (.spark)
function muMula(id: string, x: number, y: number, s = 1, flip = false) {
  const C = '#3a2a24', leg = (cls: string, lx: number) => `<g transform="translate(${lx} -150)"><g class="${cls}">${bzLimb(150, 30, C)}<rect x="-24" y="140" width="48" height="30" rx="6" fill="#1b1418" ${bzO('stroke-width="5"')}/></g></g>`;
  return `<g id="${id}"><g class="mv"><g class="pos" transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    ${leg('l2', -110)}${leg('l4', 90)}<g class="tail"><path d="M-170 -260 Q -260 -230 -250 -110" stroke="${BZ.ink}" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M-170 -260 Q -260 -230 -250 -110" stroke="#1b1418" stroke-width="18" fill="none" stroke-linecap="round"/></g>
    <path d="M110 -290 Q 160 -380 200 -430 L 250 -400 Q 230 -320 170 -200 Z" fill="${C}" ${bzO()}/><ellipse cx="0" cy="-230" rx="190" ry="95" fill="${C}" ${bzO()}/>
    <ellipse cx="225" cy="-418" rx="34" ry="18" transform="rotate(30 225 -418)" fill="#8a1a14" ${bzO('stroke-width="5"')}/><circle class="halo" cx="260" cy="-520" r="190" fill="#ff8a3a" opacity="0.22"/><g transform="translate(228 -430) rotate(30) scale(1.5)">${muFire()}</g>
    ${leg('l1', -130)}${leg('l3', 110)}<path d="M-60 -300 Q 0 -320 60 -300" stroke="#5a4038" stroke-width="10" fill="none"/></g></g></g>`;
}
// gallop: legs swing in pairs, the body bobs, the fire flickers
function muGallop(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, step = 0.22) {
  const n = Math.max(2, Math.floor((t1 - t0) / step));
  [['l1', 35], ['l2', -35], ['l3', -35], ['l4', 35]].forEach(([c, a]) => tl.fromTo(`${sel} .${c}`, { rotation: +a, transformOrigin: '50% 0%' }, { rotation: -a, duration: step, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0));
  tl.fromTo(`${sel} .mv`, { y: 0 }, { y: -26, duration: step / 2, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .tail`, { rotation: -8, svgOrigin: '-170 -260' }, { rotation: 10, duration: step, yoyo: true, repeat: n - 1 }, t0);
  muFlicker(tl, sel, t0, t1);
}
function muFlicker(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  const n = Math.max(2, Math.floor((t1 - t0) / 0.09));
  tl.fromTo(`${sel} .fl`, { scaleY: 0.85, scaleX: 1.05, transformOrigin: '50% 100%' }, { scaleY: 1.15, scaleX: 0.92, duration: 0.09, yoyo: true, repeat: n - 1, ease: 'none', stagger: 0.03 }, t0);
}
// the town square at night: church with bell tower (#bell), houses, cobblestones, two lamps
function muSquare(dark = 0) {
  let stones = ''; for (let r = 0; r < 9; r++) for (let c = 0; c < 10; c++) stones += `<ellipse cx="${(c * 120 + (r % 2) * 60) % 1140 - 30}" cy="${1380 + r * 64}" rx="52" ry="24" fill="#5a5a6a" stroke="#2b2433" stroke-width="4"/>`;
  return `${bzSky('#0f1530', '#3a2f5a')}${bzStars(60, 8, 900)}${bzMoon('mn', 180, 330, 70)}
    <rect x="360" y="520" width="360" height="820" fill="#ece6d6" ${bzO()}/><path d="M340 540 L540 380 L740 540 Z" fill="#a8442c" ${bzO()}/><rect x="480" y="300" width="120" height="120" fill="#ece6d6" ${bzO()}/><path d="M470 300 L540 220 L610 300 Z" fill="#a8442c" ${bzO()}/>
    <rect x="528" y="160" width="24" height="70" fill="${BZ.ink}"/><rect x="510" y="180" width="60" height="18" fill="${BZ.ink}"/>
    <g id="bell"><path d="M515 330 Q 540 300 565 330 L 575 390 L 505 390 Z" fill="#c9a43a" ${bzO('stroke-width="5"')}/></g>
    <path d="M480 1340 v-260 Q 540 1000 600 1080 v260 Z" fill="#7a4a2a" ${bzO()}/><circle cx="540" cy="720" r="70" fill="#9ad0f0" ${bzO()}/>
    <rect x="-20" y="900" width="340" height="440" fill="#e8c8a0" ${bzO()}/><rect x="60" y="1000" width="110" height="110" fill="${dark ? '#2a2a3a' : '#f6e27a'}" ${bzO()}/>
    <rect x="760" y="900" width="340" height="440" fill="#a8c8d8" ${bzO()}/><rect x="880" y="1000" width="110" height="110" fill="${dark ? '#2a2a3a' : '#f6e27a'}" ${bzO()}/>
    <rect x="-20" y="1340" width="1120" height="600" fill="#6a6a7a" ${bzO()}/>${stones}${bzLamp(300, 1400, 480)}`;
}
// burnt hoof prints on the stones (ids hp0..hp5)
const muPrints = () => [[200, 1700], [380, 1610], [560, 1720], [740, 1620], [900, 1730], [1040, 1640]].map(([x, y], i) => `<g id="hp${i}" opacity="0"><path d="M${x - 34} ${y} q34 -60 68 0 q-10 14 -22 4 q-12 -24 -24 0 q-12 10 -22 -4z" fill="#14100e"/><circle cx="${x}" cy="${y - 10}" r="40" fill="#e0402a" opacity="0.25"/></g>`).join('');
// Beto's cap on the stones, on fire
const muCap = (x: number, y: number, s = 1) => `<g id="cap"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-80 0 Q -80 -90 0 -90 Q 80 -90 80 0 Z" fill="#d0342c" ${bzO()}/><path d="M60 -6 L170 6 L80 10 Z" fill="#a8241c" ${bzO('stroke-width="5"')}/><g transform="translate(0 -60) scale(0.7)">${muFire('capfire')}</g></g></g>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#0f1530', html: () => svg(`${muSquare()}${muDavi(170, 1700, 1)}${muBeto(380, 1700, 1)}${muVo(580, 1700, 1)}${muMula('mula', 820, 1760, 0.75)}`),
    anim(tl, s) { muFlicker(tl, '#sc-test-cast #mula', s.t0, s.t1); bzFace(tl, '#sc-test-cast #beto', s.t0, 'dot', 'grin'); } },
  'test-run': { bg: '#0f1530', html: () => svg(`${muSquare(1)}${muMula('mula', 540, 1800, 1.3)}`), anim(tl, s) { muGallop(tl, '#sc-test-run #mula', s.t0, s.t1); } },
  'test-floor': { bg: '#0f1530', html: () => svg(`${muSquare(1)}${muPrints()}${muCap(540, 1560, 1.2)}`), anim(tl, s) { for (let i = 0; i < 6; i++) tl.set(`#sc-test-floor #hp${i}`, { opacity: 1 }, s.t0); muFlicker(tl, '#sc-test-floor #cap', s.t0, s.t1); } },
  'test-fire': { bg: '#0f1530', html: () => svg(`${bzSky('#0f1530', '#3a2f5a')}${muMula('mula', 300, 2900, 3.2)}`), anim(tl, s) { muFlicker(tl, '#sc-test-fire #mula', s.t0, s.t1); } },
});
