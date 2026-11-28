// =====================================================================
//  LENDA: A PORCA DOS SETE LEITÕES, Brasil Z toon look (styles/flat2d/toon.ts), 9:16. Prefix ps.
//  Cast (original designs): Tiago (the narrator, 13, green shirt), vô Bené (straw hat, white moustache), primo Zeca
//  (only his red cap is seen), the Porca (a huge black sow, red eyes, bristles) and her piglets (small, dark, red eyes;
//  the eighth wears Zeca's red cap). The only threat colour is the red of the eyes (and of the cap).
//  Sets: the farm at night with the São João party far away (flags, bonfire), the dirt road under the moon, the
//  crossroads with a wooden cross, the stream (water band) with stones.
//  Framing: captions y 1190–1400. Heads: adults 507*s above the feet, Tiago ~415*s.
// =====================================================================
const PS_SPEC: Record<string, BzSpec> = {
  tiago: { kid: true, tall: 1.2, skin: '#c98757', hair: { style: 'short', color: '#2a1a12' }, top: '#3a8a5a', top2: '#f4f2ea', pants: '#3a4a6a', shoes: '#5a3a22' },
  vo: { skin: '#b8784a', hat: { kind: 'straw', color: '#e8c870' }, mustache: '#f0ece4', top: '#e8e4dc', top2: '#3a6ac8', belt: '#4a2a1a', pants: '#5a4a3a', shoes: '#3a2a1a' },
};
const psChar = (k: string, x: number, y: number, s = 1, flip = false, id = k) => bzChar(id, PS_SPEC[k], x, y, s, flip);
// a pig, side view facing right (origin at its feet); legs .p1..p4, .eye glows; cap = Zeca's red cap on its head
function psPig(id: string, x: number, y: number, s = 1, cap = false, flip = false) {
  const body = '#34303c', dark = '#16141c';
  const leg = (c: string, lx: number) => `<g transform="translate(${lx} -60)"><g class="${c}">${bzLimb(60, 30, body)}</g></g>`;
  return `<g id="${id}"><g class="mv"><g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${leg('p2', -90)}${leg('p4', 80)}
    <ellipse cx="0" cy="-130" rx="200" ry="110" fill="${body}" ${bzO()}/><path d="M-150 -220 l 16 -30 l 16 26 l 16 -30 l 16 28 l 16 -30 l 16 30 l 16 -28 l 16 30" fill="${dark}" stroke="${BZ.ink}" stroke-width="5"/>
    <path d="M-200 -150 q -50 -10 -40 -60" stroke="${BZ.ink}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M150 -200 Q 260 -190 270 -120 Q 260 -70 160 -70 Z" fill="${body}" ${bzO()}/><ellipse cx="275" cy="-118" rx="26" ry="30" fill="#4a3a40" ${bzO('stroke-width="5"')}/><circle cx="270" cy="-128" r="5" fill="${dark}"/><circle cx="270" cy="-108" r="5" fill="${dark}"/>
    <path d="M170 -200 l 20 -50 l 30 40 z" fill="${body}" ${bzO('stroke-width="5"')}/>
    <g class="eye">${bzGlow(id + 'eg', 215, -150, 50, '#ff2a1a', 0.6)}<circle cx="215" cy="-150" r="11" fill="#ff2a1a"/></g>
    ${cap ? `<g transform="translate(200 -215) rotate(-15)"><path d="M-50 0 Q -50 -60 0 -62 Q 50 -60 50 0 Z" fill="#d8302a" ${bzO('stroke-width="5"')}/><path d="M30 -4 L 100 6 L 40 12 Z" fill="#a8201a" ${bzO('stroke-width="4"')}/></g>` : ''}
    ${leg('p1', -110)}${leg('p3', 100)}</g></g></g>`;
}
function psTrot(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, d = 0.14) {
  const n = Math.max(2, Math.floor((t1 - t0) / d));
  [['p1', 30], ['p2', -30], ['p3', -30], ['p4', 30]].forEach(([c, a]) => tl.fromTo(`${sel} .${c}`, { rotation: +a, transformOrigin: '50% 0%' }, { rotation: -a, duration: d, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0));
  tl.fromTo(`${sel} > .mv`, { y: 0 }, { y: -10, duration: d / 2, yoyo: true, repeat: n * 2 - 1 }, t0);
}
// the night countryside: sky, moon, hills, the dirt road (from y 1300), fences
function psRoad(cross = false) {
  return `${bzSky('#060a18', '#1e2a40')}${bzStars(60, 3, 900)}${bzMoon('mn', 820, 300, 70)}<path d="M-20 1100 Q 300 960 600 1080 Q 850 1000 1100 1090 L 1100 1320 L -20 1320 Z" fill="#14281e" ${bzO()}/>
    <rect x="-20" y="1300" width="1120" height="640" fill="#1e2a1a" ${bzO()}/><path d="M380 1300 L 700 1300 L 1020 1940 L 60 1940 Z" fill="#6a5034" ${bzO()}/>
    ${cross ? `<path d="M-20 1560 L 1100 1500 L 1100 1620 L -20 1680 Z" fill="#6a5034"/><g transform="translate(860 1320)"><rect x="-14" y="-300" width="28" height="300" fill="#5a3a22" ${bzO()}/><rect x="-90" y="-240" width="180" height="26" fill="#5a3a22" ${bzO()}/></g>` : ''}
    ${[...Array(8)].map((_, i) => `<rect x="${i * 60 - 10}" y="1240" width="12" height="90" fill="#3a2a1a"/>`).join('')}<rect x="-20" y="1260" width="480" height="10" fill="#3a2a1a"/>${bzFog(1250, '#8aa0c0', 0.15)}`;
}
// the party far away: bonfire glow and flag strings behind the farmhouse
function psFarm() {
  const flags = [...Array(14)].map((_, i) => `<path d="M${20 + i * 76} ${560 + Math.sin(i * 0.8) * 30} l 18 0 l 0 40 l -9 -12 l -9 12 z" fill="${['#e0342c', '#f6c744', '#3a8ac8', '#3a8a5a'][i % 4]}"/>`).join('');
  return `${bzSky('#060a18', '#2a2040')}${bzStars(50, 5, 700)}${flags}<path d="M-20 570 Q 540 640 1100 570" stroke="${BZ.ink}" stroke-width="3" fill="none"/>
    <rect x="160" y="900" width="460" height="400" fill="#e8dcc0" ${bzO()}/><path d="M120 910 L 390 760 L 660 910 Z" fill="#a8502a" ${bzO()}/><rect x="240" y="980" width="100" height="100" fill="#ffc860" ${bzO()}/><rect x="440" y="1100" width="100" height="200" fill="#5a3a22" ${bzO()}/>
    ${bzGlow('fg', 860, 1240, 300, '#ffb050', 0.45)}<path d="M800 1300 L 920 1300 L 860 1160 Z" fill="#f6a03a" ${bzO()}/><rect x="-20" y="1300" width="1120" height="640" fill="#2a2a1a" ${bzO()}/>`;
}
// the stream: a band of water across the frame with stones; the far bank (y < 1180) and the near bank (y > 1600)
function psStream() {
  return `${bzSky('#060a18', '#1e2a40')}${bzStars(50, 8, 800)}${bzMoon('mn', 240, 260, 60)}<rect y="900" width="1080" height="300" fill="#1e2a1a" ${bzO()}/>
    <rect id="water" y="1180" width="1080" height="420" fill="#14304a"/>${[0, 1, 2, 3, 4].map((i) => `<path class="wv" d="M${(i * 230) % 1000} ${1240 + i * 70} q 30 -14 60 0 t 60 0" stroke="#9ac8e8" stroke-width="6" fill="none" opacity="0.5"/>`).join('')}
    ${[[160, 1600], [520, 1610], [880, 1590]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="90" ry="30" fill="#5a5a60" ${bzO('stroke-width="5"')}/>`).join('')}<rect y="1600" width="1080" height="340" fill="#2a3a22" ${bzO()}/>`;
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#060a18', html: () => svg(`${psRoad()}${psChar('tiago', 200, 1700, 1.0)}${psChar('vo', 420, 1700, 1.0)}${psPig('pg', 700, 1760, 0.9)}${psPig('pl', 960, 1760, 0.3, true)}`), anim() {} },
  'test-farm': { bg: '#060a18', html: () => svg(`${psFarm()}`), anim() {} },
  'test-cross': { bg: '#060a18', html: () => svg(`${psRoad(true)}${psPig('pg', 520, 1640, 0.8)}${[0, 1, 2, 3, 4, 5, 6].map((i) => psPig('l' + i, 120 + i * 60, 1660 + (i % 2) * 20, 0.22)).join('')}`), anim() {} },
  'test-stream': { bg: '#060a18', html: () => svg(`${psStream()}${psPig('pg', 540, 1150, 0.6)}`), anim() {} },
  'cover-a': { bg: '#060a18', html: () => svg(`${psRoad(true)}${psPig('pg', 300, 2100, 2.2)}${bzVignette(0.5)}`), anim() {} },
  'cover-b': { bg: '#060a18', html: () => svg(`${psStream()}${[0, 1, 2, 3, 4, 5, 6].map((i) => psPig('l' + i, 60 + i * 120, 1170, 0.28)).join('')}${psPig('l7', 940, 1170, 0.28, true)}${bzVignette(0.5)}`), anim() {} },
});
