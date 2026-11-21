// =====================================================================
//  LENDA: O BOITATÁ, in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix bo.
//  Cast: Nina (the narrator, 13, only seen at the end), tio Zeca (rancher, brown hat, moustache, big belly),
//  the Boitatá (a fire serpent made of glowing segments that wave, a head with two huge fire eyes).
//  Sets: the forest by the river at night, the burning forest (a wall of fire), the river bank at dawn.
// =====================================================================
const BO_SPEC: Record<string, BzSpec> = {
  zeca: { wide: 1.3, skin: '#d9a27a', hat: { kind: 'fedora', color: '#7a5a3a' }, mustache: '#4a3020', hair: { style: 'short', color: '#4a3020' }, top: '#e8e4dc', belt: '#5a3a20', pants: '#3a4a6a', shoes: '#3a2a1a' },
  zecaCego: { wide: 1.3, skin: '#c89272', hat: { kind: 'fedora', color: '#7a5a3a' }, mustache: '#4a3020', hair: { style: 'short', color: '#4a3020' }, top: '#a8a49a', belt: '#5a3a20', pants: '#3a4a6a', shoes: '#3a2a1a', glow: '#e8ecf0' },
  nina: { kid: true, skin: '#a87458', hair: { style: 'afro', color: '#1c1410' }, top: '#3a8a6a', pants: '#3a3a4a', shoes: '#f0ece2' },
  peao: { skin: '#8a5a3a', hat: { kind: 'straw', color: '#e8c86a' }, top: '#5a7aa8', pants: '#4a4a5a', shoes: '#2b2433' },
};
const boZeca = (x: number, y: number, s = 1, flip = false, blind = false) => bzChar('zeca', blind ? BO_SPEC.zecaCego : BO_SPEC.zeca, x, y, s, flip);
const boNina = (x: number, y: number, s = 1, flip = false) => bzChar('nina', BO_SPEC.nina, x, y, s, flip);
const boPeao = (x: number, y: number, s = 1, flip = false) => bzChar('peao', BO_SPEC.peao, x, y, s, flip);
// the Boitatá: n glowing segments along a line (each .seg waves up and down), the head (.head) at the front (right)
function boSnake(id: string, x: number, y: number, s = 1, n = 16, flip = false) {
  let segs = ''; for (let i = n - 1; i >= 0; i--) { const r = 80 - (i / n) * 50, sx = -i * 70; segs += `<g class="seg" data-i="${i}"><circle cx="${sx}" cy="0" r="${r * 1.7}" fill="#ff8a2a" opacity="0.18"/><circle cx="${sx}" cy="0" r="${r}" fill="#e0402a" ${bzO()}/><circle cx="${sx}" cy="${-r * 0.15}" r="${r * 0.62}" fill="#f29a4a"/><circle cx="${sx}" cy="${-r * 0.25}" r="${r * 0.3}" fill="#ffe08a"/></g>`; }
  const head = `<g class="head"><g transform="translate(70 -20)"><circle cx="0" cy="0" r="200" fill="#ff8a2a" opacity="0.2"/><path d="M-70 -70 Q 60 -110 150 -30 Q 170 0 150 30 Q 60 90 -70 60 Z" fill="#e0402a" ${bzO()}/>
    <path d="M-40 -40 Q 60 -70 120 -20 Q 60 0 -40 10 Z" fill="#f29a4a"/>${[[-10, -42], [70, -48]].map(([ex, ey]) => `<circle cx="${ex}" cy="${ey}" r="44" fill="#fff4a0" opacity="0.35"/><circle cx="${ex}" cy="${ey}" r="28" fill="#fff8c8" ${bzO('stroke-width="5"')}/><ellipse cx="${ex}" cy="${ey}" rx="6" ry="20" fill="#e0402a"/>`).join('')}
    <path d="M150 20 l50 10 l-20 6 l24 14 l-54 -10z" fill="#ffe08a"/></g></g>`;
  return `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${segs}${head}</g></g></g>`;
}
// slither: the segments wave in a travelling sine (each one later), the head bobs with the front
function boSlither(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, amp = 50, period = 0.9) {
  const n = Math.max(2, Math.ceil((t1 - t0) / (period / 2)));
  tl.fromTo(`${sel} .seg`, { y: -amp }, { y: amp, duration: period / 2, yoyo: true, repeat: n, ease: 'sine.inOut', stagger: { each: period / 12, from: 'end' } }, t0 - period);
  tl.fromTo(`${sel} .head`, { y: amp * 0.6 }, { y: -amp * 0.6, duration: period / 2, yoyo: true, repeat: n, ease: 'sine.inOut' }, t0 - period / 2);
}
// a tree (dark green crown on a trunk)
const boTree = (x: number, y: number, s = 1, c = '#1f3a30') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-22" y="-260" width="44" height="260" fill="#3a2a22" ${bzO()}/>${[[-80, -300, 110], [70, -320, 120], [0, -420, 130]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" ${bzO()}/>`).join('')}</g>`;
// the forest by the river at night
function boForest(river = true) {
  return `${bzSky('#0b1028', '#2a2048')}${bzStars(60, 12, 900)}${bzMoon('mn', 860, 330, 60)}${[...Array(9)].map((_, i) => boTree(i * 140 - 20, 1180 + (i % 2) * 30, 0.9 + (i % 3) * 0.15)).join('')}
    <rect x="-20" y="1200" width="1120" height="740" fill="#24382c" ${bzO()}/>${river ? `<path d="M-20 1560 Q 300 1500 600 1560 T 1100 1540 L1100 1760 Q 700 1720 400 1780 T -20 1760 Z" fill="#2a4a7a" ${bzO()}/><path d="M100 1640 h120 M500 1660 h160 M820 1620 h120" stroke="#8ab0d8" stroke-width="6" stroke-linecap="round" opacity="0.6"/>` : ''}`;
}
// a wall of fire (flames .fl flicker) across the forest edge
function boFireWall(y = 1260, n = 9) {
  return `<g class="firewall">${[...Array(n)].map((_, i) => { const x = i * 1080 / (n - 1), h = 240 + ((i * 53) % 4) * 60; return `<g transform="translate(${x} ${y})"><path class="fl" d="M-80 0 Q -110 ${-h * 0.5} -30 ${-h * 0.8} Q -20 ${-h * 0.5} 0 ${-h * 0.45} Q 20 ${-h} 80 ${-h * 1.1} Q 70 ${-h * 0.6} 100 ${-h * 0.4} Q 110 -30 80 0 Z" fill="#e0402a" ${bzO()}/><path class="fl" d="M-40 0 Q -60 ${-h * 0.4} 0 ${-h * 0.6} Q 20 ${-h * 0.3} 50 ${-h * 0.55} Q 60 -20 40 0 Z" fill="#f29a4a"/></g>`; }).join('')}</g>`;
}
function boFlicker(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  const n = Math.max(2, Math.floor((t1 - t0) / 0.1));
  tl.fromTo(`${sel} .fl`, { scaleY: 0.85, transformOrigin: '50% 100%' }, { scaleY: 1.15, duration: 0.1, yoyo: true, repeat: n - 1, ease: 'none', stagger: 0.04 }, t0);
}
// animals fleeing (silhouettes): a capybara and a deer, each a group to move
const boCapy = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-60" rx="110" ry="60" fill="#5a4030" ${bzO()}/><rect x="70" y="-130" width="80" height="70" rx="30" fill="#5a4030" ${bzO()}/>${[-70, -20, 30, 70].map((lx) => `<rect x="${lx}" y="-20" width="22" height="30" fill="#5a4030" ${bzO('stroke-width="5"')}/>`).join('')}<circle cx="125" cy="-108" r="6" fill="${BZ.ink}"/></g></g>`;
const boDeer = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-160" rx="110" ry="55" fill="#a86a3a" ${bzO()}/><path d="M80 -190 L120 -300 L170 -290 L130 -180 Z" fill="#a86a3a" ${bzO()}/><ellipse cx="160" cy="-305" rx="40" ry="24" fill="#a86a3a" ${bzO()}/>
  ${[-80, -40, 50, 90].map((lx) => `<rect x="${lx}" y="-120" width="16" height="120" fill="#a86a3a" ${bzO('stroke-width="5"')}/>`).join('')}<path d="M140 -330 l-10 -50 M140 -350 l-30 -10 M170 -330 l20 -50" stroke="#5a3a20" stroke-width="8" stroke-linecap="round"/><circle cx="175" cy="-310" r="5" fill="${BZ.ink}"/></g></g>`;
// the river bank at dawn: burnt ground already green again
function boDawn() {
  return `${bzSky('#f29a4a', '#5a3f7a')}${bzSun(200, 1060, 110, '#ffd27a')}${[...Array(9)].map((_, i) => boTree(i * 140 - 20, 1180 + (i % 2) * 30, 0.9 + (i % 3) * 0.15, '#2f5a40')).join('')}
    <rect x="-20" y="1200" width="1120" height="740" fill="#3a6a44" ${bzO()}/><path d="M-20 1560 Q 300 1500 600 1560 T 1100 1540 L1100 1760 Q 700 1720 400 1780 T -20 1760 Z" fill="#5a8ab8" ${bzO()}/>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#0b1028', html: () => svg(`${boForest()}${boZeca(240, 1520, 1)}${boNina(520, 1520, 1)}${boPeao(800, 1520, 1)}`), anim(tl, s) { bzFace(tl, '#sc-test-cast #zeca', s.t0, 'angry', 'grin'); } },
  'test-snake': { bg: '#0b1028', html: () => svg(`${boForest()}${boSnake('boi', 760, 1500, 0.9)}`), anim(tl, s) { boSlither(tl, '#sc-test-snake #boi', s.t0, s.t1); } },
  'test-fire': { bg: '#0b1028', html: () => svg(`${boForest(false)}${boFireWall()}${boCapy('cp', 300, 1700, 1)}${boDeer('dr', 760, 1720, 1)}`), anim(tl, s) { boFlicker(tl, '#sc-test-fire', s.t0, s.t1); } },
  'test-eyes': { bg: '#0b1028', html: () => svg(`<rect width="1080" height="1920" fill="#0b0e18"/>${boSnake('boi', 300, 900, 3.2, 6)}`), anim(tl, s) { boSlither(tl, '#sc-test-eyes #boi', s.t0, s.t1, 20); } },
  'test-dawn': { bg: '#f29a4a', html: () => svg(`${boDawn()}${boZeca(540, 1560, 1.3, false, true)}`), anim(tl, s) { bzFace(tl, '#sc-test-dawn #zeca', s.t0, 'glow', 'open'); } },
});
