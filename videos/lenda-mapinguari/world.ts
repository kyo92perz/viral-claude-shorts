// =====================================================================
//  LENDA: O MAPINGUARI, in the "Brasil Z" toon look (styles/flat2d/toon.ts), detailed. Prefix ma.
//  Cast: Léo (the narrator, 12), vô Raimundo young (1970s: straw hat, moustache) and old (white hair and beard),
//  Chico (young rubber tapper, red cap, a rifle), the Mapinguari (4 m, shaggy, ONE eye in the forehead, a mouth that
//  opens in its belly, long arms with claws).
//  Sets: the rubber tappers' camp at night (rubber trees with cuts and latex cups, two hammocks, the campfire with embers,
//  the stream), under the stream, the camp at dawn (torn hammock, huge footprints), the family house today at night.
// =====================================================================
const MA_SPEC: Record<string, BzSpec> = {
  leo: { kid: true, skin: '#c98757', hair: { style: 'short', color: '#1c1410' }, top: '#2f8a6a', pants: '#3a3a4a', shoes: '#f0ece2' },
  rai: { skin: '#b8784a', hat: { kind: 'straw', color: '#e8c86a' }, mustache: '#2a1a12', hair: { style: 'short', color: '#2a1a12' }, top: '#e8e4dc', pants: '#4a5a6a', shoes: '#3a2a1a' },
  raiOld: { skin: '#b8784a', hair: { style: 'short', color: '#e8e4dc' }, beard: '#e8e4dc', mustache: '#f4f0e8', glasses: true, top: '#8a6a4a', pants: '#4a4a5a', shoes: '#3a2a1a' },
  chico: { skin: '#8a5a3a', hat: { kind: 'cap', color: '#d0342c' }, hair: { style: 'short', color: '#1c1410' }, top: '#5a7aa8', pants: '#4a4a3a', shoes: '#3a2a1a' },
};
const maLeo = (x: number, y: number, s = 1, flip = false) => bzChar('leo', MA_SPEC.leo, x, y, s, flip);
const maRai = (x: number, y: number, s = 1, flip = false) => bzChar('rai', MA_SPEC.rai, x, y, s, flip);
const maOld = (x: number, y: number, s = 1, flip = false) => bzChar('raiold', MA_SPEC.raiOld, x, y, s, flip);
const maChico = (x: number, y: number, s = 1, flip = false) => bzChar('chico', MA_SPEC.chico, x, y, s, flip);
// ---- the Mapinguari: local origin at the feet, ~1500 tall at s = 1. Classes: .mv (sway), .armL/.armR (pivot at the
// shoulder), .eye (the single eye: .lid closes it), .mouth (the belly mouth: .shut seam / .open jaws, scaled with scaleY)
function maGiant(id: string, x: number, y: number, s = 1) {
  const F = '#3a2c22', F2 = '#2a2018', fur = (pts: number[][]) => pts.map(([a, b]) => `${a},${b}`).join(' ');
  const body = fur([[-330, -260], [-380, -520], [-360, -800], [-300, -1050], [-220, -1250], [-120, -1360], [0, -1400], [120, -1360], [220, -1250], [300, -1050], [360, -800], [380, -520], [330, -260], [260, -160], [140, -120], [0, -110], [-140, -120], [-260, -160]]);
  const jag = (x0: number, y0: number, n: number, dx: number, dy: number) => [...Array(n)].map((_, i) => `<path d="M${x0 + i * dx} ${y0 + i * dy} l -18 34 l 32 -8" fill="${F2}"/>`).join('');
  const arm = (c: string, ax: number, sgn: number) => `<g transform="translate(${ax} -1030)"><g class="${c}"><path d="M0 0 Q ${sgn * 90} 300 ${sgn * 70} 760" stroke="${BZ.ink}" stroke-width="128" fill="none" stroke-linecap="round"/><path d="M0 0 Q ${sgn * 90} 300 ${sgn * 70} 760" stroke="${F}" stroke-width="108" fill="none" stroke-linecap="round"/>
    ${[-30, 0, 30].map((d) => `<path d="M${sgn * 70 + d} 800 q ${d * 0.4} 60 ${d * 0.2 - sgn * 10} 110" stroke="${BZ.ink}" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M${sgn * 70 + d} 800 q ${d * 0.4} 60 ${d * 0.2 - sgn * 10} 110" stroke="#d8d0b8" stroke-width="10" fill="none" stroke-linecap="round"/>`).join('')}</g></g>`;
  const teeth = (y0: number, dir: number) => [...Array(9)].map((_, i) => `<path d="M${-170 + i * 42} ${y0} l 20 ${dir * 46} l 20 ${-dir * 46} z" fill="#f4ecd8" stroke="${BZ.ink}" stroke-width="4"/>`).join('');
  return `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="6" rx="360" ry="40" fill="#000" opacity="0.3"/>
    <rect x="-230" y="-300" width="150" height="300" rx="50" fill="${F}" ${bzO()}/><rect x="80" y="-300" width="150" height="300" rx="50" fill="${F}" ${bzO()}/>
    <path d="M-240 -10 l -60 30 l 100 0 z M240 -10 l 60 30 l -100 0 z" fill="${F2}" ${bzO('stroke-width="5"')}/>
    ${arm('armL', -300, -1)}<polygon points="${body}" fill="${F}" ${bzO('stroke-width="9"')}/>${jag(-300, -900, 6, 20, 90)}${jag(220, -980, 6, 14, 100)}${jag(-150, -1300, 5, 60, 10)}
    <rect x="80" y="-1300" width="210" height="1150" fill="#000" opacity="0.14"/>
    <g class="eye"><ellipse cx="0" cy="-1180" rx="96" ry="70" fill="#f4ecd8" ${bzO('stroke-width="8"')}/>${bzGlow('mge' + id, 0, -1180, 160, '#ff3a2a', 0.35)}<circle cx="0" cy="-1180" r="44" fill="#ff3a2a" ${bzO('stroke-width="5"')}/><ellipse cx="0" cy="-1180" rx="10" ry="34" fill="${BZ.ink}"/>
      <g class="lid" opacity="0"><ellipse cx="0" cy="-1180" rx="98" ry="72" fill="${F}" ${bzO('stroke-width="8"')}/><path d="M-90 -1180 q 90 30 180 0" stroke="${BZ.ink}" stroke-width="7" fill="none"/></g></g>
    <path d="M-150 -1290 q 150 -80 300 0" stroke="${BZ.ink}" stroke-width="28" fill="none" stroke-linecap="round"/>
    <g class="mouth"><g class="shut"><path d="M-200 -620 q 200 60 400 0" stroke="${BZ.ink}" stroke-width="12" fill="none"/></g>
      <g class="open" opacity="0"><g class="jaw"><path d="M-210 -620 Q 0 -840 210 -620 Q 0 -400 -210 -620 Z" fill="#4a0e12" ${bzO('stroke-width="9"')}/>${teeth(-650, 1)}${teeth(-590, -1)}<ellipse cx="0" cy="-620" rx="80" ry="50" fill="#1a0408"/></g></g></g>
    ${arm('armR', 300, 1)}</g></g></g>`;
}
// the belly mouth opens (and shuts at t1 if given)
function maMouth(tl: gsap.core.Timeline, sel: string, t: number, t1?: number) {
  tl.set(`${sel} .shut`, { opacity: 0 }, t); tl.set(`${sel} .open`, { opacity: 1 }, t);
  tl.fromTo(`${sel} .jaw`, { scaleY: 0.05, transformOrigin: '50% 50%' }, { scaleY: 1, duration: 0.35, ease: 'back.out(2)' }, t);
  if (t1 !== undefined) { tl.to(`${sel} .jaw`, { scaleY: 0.05, duration: 0.2 }, t1); tl.set(`${sel} .open`, { opacity: 0 }, t1 + 0.2); tl.set(`${sel} .shut`, { opacity: 1 }, t1 + 0.2); }
}
// the giant sways, arms swing slowly
function maSway(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  const n = Math.max(1, Math.floor((t1 - t0) / 1.2));
  tl.fromTo(`${sel} > .mv`, { rotation: -2, transformOrigin: '50% 100%' }, { rotation: 2, duration: 1.2, yoyo: true, repeat: n, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .armL`, { rotation: -6 }, { rotation: 6, duration: 1.0, yoyo: true, repeat: n, ease: 'sine.inOut', transformOrigin: '50% 0%' }, t0);
  tl.fromTo(`${sel} .armR`, { rotation: 6 }, { rotation: -6, duration: 1.1, yoyo: true, repeat: n, ease: 'sine.inOut', transformOrigin: '50% 0%' }, t0);
}
// ---- the jungle at night: rubber trees (cuts, a cup, a white drip), dark crowns, the stream
function maRubberTree(x: number, y: number, s: number) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-55" y="-900" width="110" height="900" fill="#3a2e26" ${bzO()}/>${[0, 1, 2, 3].map((i) => `<path d="M-50 ${-260 - i * 60} L 50 ${-300 - i * 60}" stroke="#e8e0c8" stroke-width="8"/>`).join('')}
    <path d="M10 -260 v 60" stroke="#f4f0e4" stroke-width="8" stroke-linecap="round"/><path d="M-20 -200 h 60 l -10 50 h -40 z" fill="#8a6a4a" ${bzO('stroke-width="5"')}/><ellipse cx="10" cy="-200" rx="30" ry="8" fill="#f4f0e4"/>
    ${[[-150, -980, 150], [30, -1060, 180], [180, -960, 150]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#14281e" ${bzO()}/>`).join('')}</g>`;
}
function maJungle() {
  return `${bzSky('#060c14', '#18263a')}${bzStars(30, 9, 600)}${[...Array(10)].map((_, i) => `<circle cx="${i * 120}" cy="${880 + (i % 3) * 30}" r="${150 + (i % 2) * 40}" fill="#0c1a14"/>`).join('')}
    ${maRubberTree(140, 1400, 1)}${maRubberTree(940, 1420, 1.05)}${maRubberTree(560, 1300, 0.6)}<rect x="-20" y="1300" width="1120" height="640" fill="#1a2a1a" ${bzO()}/>`;
}
// two hammocks between the trees (ids rede1, rede2), the campfire (#fire with .fl flames) and its glow
function maCamp() {
  const rede = (id: string, x0: number, x1: number, y: number, c: string) => `<g id="${id}"><path d="M${x0} ${y - 120} Q ${(x0 + x1) / 2} ${y + 90} ${x1} ${y - 120}" stroke="${BZ.ink}" stroke-width="14" fill="none"/><path d="M${x0 + 30} ${y - 100} Q ${(x0 + x1) / 2} ${y + 110} ${x1 - 30} ${y - 100} Q ${(x0 + x1) / 2} ${y + 20} ${x0 + 30} ${y - 100} Z" fill="${c}" ${bzO()}/></g>`;
  return `${maJungle()}${rede('rede1', 160, 560, 1180, '#c8542c')}${rede('rede2', 600, 920, 1220, '#3a8a8a')}
    <path d="M-20 1640 Q 300 1600 600 1650 T 1100 1630 L1100 1800 Q 700 1760 400 1820 T -20 1800 Z" fill="#1a3048" ${bzO()}/><path d="M100 1700 h120 M500 1720 h160 M820 1690 h120" stroke="#6a8ab0" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
    <g id="fire">${bzGlow('fg', 540, 1460, 420, '#ff9a3a', 0.45)}<path d="M460 1500 l 160 -30 M470 1470 l 150 40" stroke="#4a2a1a" stroke-width="22" stroke-linecap="round"/>
      <g transform="translate(540 1480)"><path class="fl" d="M-60 0 Q -80 -90 -20 -150 Q -10 -90 10 -90 Q 20 -170 60 -200 Q 80 -110 60 0 Z" fill="#e0402a" ${bzO()}/><path class="fl" d="M-30 0 Q -40 -60 0 -100 Q 20 -60 30 0 Z" fill="#ffd27a"/></g></g>`;
}
function maFlicker(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  const n = Math.max(2, Math.floor((t1 - t0) / 0.1));
  tl.fromTo(`${sel} .fl`, { scaleY: 0.85, transformOrigin: '50% 100%' }, { scaleY: 1.15, duration: 0.1, yoyo: true, repeat: n - 1, ease: 'none', stagger: 0.04 }, t0);
  tl.fromTo(`${sel} #fg`, { opacity: 0.85 }, { opacity: 1, duration: 0.13, yoyo: true, repeat: Math.floor((t1 - t0) / 0.13) }, t0);
}
// under the stream: dark water, the bright surface far above with orange light (#surf), roots
function maUnder() {
  return `${bzSky('#3a2a1a', '#020608')}<rect width="1080" height="260" fill="#ff8a3a" opacity="0.25" id="surf"/>${bzRays('ury', 540, -100, 5, 1800, '#ffcf9a', 0.08)}
    ${[150, 900].map((x) => `<path d="M${x} -20 q 60 300 -20 700" stroke="#1a120c" stroke-width="22" fill="none"/>`).join('')}`;
}
// the camp at dawn: a torn hammock, huge footprints pointing back (ids gp0..gp3)
function maDawn() {
  return `${bzSky('#f29a4a', '#5a3f7a')}${[...Array(10)].map((_, i) => `<circle cx="${i * 120}" cy="${880 + (i % 3) * 30}" r="${150 + (i % 2) * 40}" fill="#2a3a2a"/>`).join('')}
    ${maRubberTree(140, 1400, 1)}${maRubberTree(940, 1420, 1.05)}<rect x="-20" y="1300" width="1120" height="640" fill="#4a5a3a" ${bzO()}/>
    <path d="M160 1060 Q 300 1260 360 1180 M560 1060 Q 450 1250 420 1170" stroke="#c8542c" stroke-width="40" fill="none"/><path d="M160 1060 L 560 1060" stroke="${BZ.ink}" stroke-width="8" stroke-dasharray="40 30"/>
    ${[[380, 1820, 8], [560, 1640, -6], [400, 1470, 6], [560, 1340, -4]].map(([x, y, r], i) => `<g id="gp${i}" opacity="0"><g transform="translate(${x} ${y}) rotate(${r})"><ellipse cx="0" cy="0" rx="70" ry="110" fill="#2a1e14"/>${[-48, -16, 16, 48].map((tx) => `<ellipse cx="${tx}" cy="130" rx="18" ry="26" fill="#2a1e14"/>`).join('')}</g></g>`).join('')}`;
}
// the family house today at night (a wooden house on the forest edge, a lit window), and its kitchen inside
function maHouse() {
  return `${bzSky('#060c14', '#18263a')}${bzStars(50, 3, 900)}${bzMoon('mn', 860, 320, 60)}${[...Array(10)].map((_, i) => `<circle cx="${i * 120}" cy="${1000 + (i % 3) * 30}" r="${150 + (i % 2) * 40}" fill="#0c1a14"/>`).join('')}
    <rect x="200" y="900" width="680" height="460" fill="#8a6a4a" ${bzO()}/><path d="M160 920 L 540 700 L 920 920 Z" fill="#6a3a2a" ${bzO()}/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M200 ${960 + i * 60} h680" stroke="#6a4a30" stroke-width="6"/>`).join('')}
    <rect x="300" y="1000" width="160" height="140" fill="#ffd27a" ${bzO()}/>${bzGlow('wg', 380, 1070, 240, '#ffc860', 0.35)}<rect x="580" y="1100" width="140" height="260" fill="#5a3a2a" ${bzO()}/>
    ${[220, 420, 640, 860].map((x) => `<rect x="${x}" y="1360" width="24" height="200" fill="#5a3a2a" ${bzO('stroke-width="5"')}/>`).join('')}<rect x="-20" y="1520" width="1120" height="420" fill="#1a2a1a" ${bzO()}/>`;
}
function maKitchen() {
  return `<rect width="1080" height="1920" fill="#4a3424"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1920" stroke="#3a281a" stroke-width="8"/>`).join('')}
    <rect x="600" y="500" width="360" height="360" fill="#0c1420" ${bzO('stroke-width="12"')}/><path d="M780 500 v360 M600 680 h360" stroke="${BZ.ink}" stroke-width="12"/>${[...Array(5)].map((_, i) => `<circle cx="${640 + i * 70}" cy="${820 - (i % 2) * 40}" r="40" fill="#0e1e16"/>`).join('')}
    ${bzGlow('lmp', 300, 700, 420, '#ffc860', 0.4)}<rect x="270" y="660" width="60" height="80" rx="8" fill="#ffe8a0" ${bzO('stroke-width="5"')}/><rect y="1300" width="1080" height="640" fill="#5a4030" ${bzO()}/>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#060c14', html: () => svg(`${maCamp()}${maLeo(130, 1700, 0.9)}${maRai(330, 1700, 0.9)}${maOld(540, 1700, 0.9)}${maChico(760, 1700, 0.9)}`), anim(tl, s) { maFlicker(tl, '#sc-test-cast', s.t0, s.t1); } },
  'test-giant': { bg: '#060c14', html: () => svg(`${maJungle()}${maGiant('mapi', 540, 1750, 1.0)}${bzParticles('sp', 'spores', 20, [0, 600, 1080, 1700], 5)}`),
    anim(tl, s) { maSway(tl, '#sc-test-giant #mapi', s.t0, s.t1); maMouth(tl, '#sc-test-giant #mapi', s.t0 + 0.4); bzParticlesGo(tl, '#sc-test-giant #sp', 'spores', s.t0, s.t1); } },
  'test-camp': { bg: '#060c14', html: () => svg(`${maCamp()}${maRai(330, 1560, 1.0)}${maChico(760, 1560, 1.0, true)}${bzParticles('em', 'embers', 16, [440, 1200, 640, 1480], 3)}`),
    anim(tl, s) { maFlicker(tl, '#sc-test-camp', s.t0, s.t1); bzParticlesGo(tl, '#sc-test-camp #em', 'embers', s.t0, s.t1); } },
  'test-under': { bg: '#020608', html: () => svg(`${maUnder()}${maRai(540, 1700, 1.4)}${bzParticles('bb', 'bubbles', 20, [300, 600, 800, 1500], 2)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-under #rai', s.t0, 'wide', 'flat'); bzParticlesGo(tl, '#sc-test-under #bb', 'bubbles', s.t0, s.t1); } },
  'test-dawn': { bg: '#f29a4a', html: () => svg(`${maDawn()}`), anim(tl, s) { for (let i = 0; i < 4; i++) tl.set(`#sc-test-dawn #gp${i}`, { opacity: 1 }, s.t0); } },
  'test-house': { bg: '#060c14', html: () => svg(`${maHouse()}`), anim() {} },
  'test-kitchen': { bg: '#4a3424', html: () => svg(`${maKitchen()}${maLeo(400, 1700, 1.6)}${maOld(700, 1700, 1.5, true)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-kitchen #leo', s.t0, 'wide', 'flat'); bzFace(tl, '#sc-test-kitchen #raiold', s.t0, 'wide', 'flat'); bzPose(tl, '#sc-test-kitchen #raiold', s.t0, { aR: -110 }, 0.01); } },
});
