// =====================================================================
//  LENDA: A LOIRA DO BANHEIRO, in the "Brasil Z" toon look (styles/flat2d/toon.ts). Prefix lb.
//  Cast: Carol (the narrator, 12), Bia (12), the Loira. Sets: the school (day), the corridor, the bathroom (stalls,
//  flush buttons, sinks, mirror, faucets of blood), a close-up of the Loira.
// =====================================================================
const LB_SPEC: Record<string, BzSpec> = {
  carol: { kid: true, skin: '#e8b48a', hair: { style: 'long', color: '#4a2c1c' }, top: '#f4f2ea', top2: '#2f62b8', pants: '#24305a', shoes: '#f0ece2' },
  bia: { kid: true, skin: '#93593a', hair: { style: 'afro', color: '#1c1410' }, top: '#f4f2ea', top2: '#2f62b8', pants: '#24305a', shoes: '#2b2433' },
  loira: { tall: 1.08, wide: 0.85, face: 'pale', hair: { style: 'long', color: '#e8d27a' }, top: '#eeeae0', dress: '#eeeae0', shoes: '#eeeae0', cotton: true, claws: true },
};
const lbCarol = (x: number, y: number, s = 1, flip = false) => bzChar('carol', LB_SPEC.carol, x, y, s, flip);
const lbBia = (x: number, y: number, s = 1, flip = false) => bzChar('bia', LB_SPEC.bia, x, y, s, flip);
const lbLoira = (x: number, y: number, s = 1, flip = false) => bzChar('loira', LB_SPEC.loira, x, y, s, flip);
// ---- the school by day: a long two-storey building, the name on the facade, a flag, the wall
function lbSchool() {
  let win = ''; for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) win += `<rect x="${110 + c * 150}" y="${900 + r * 190}" width="100" height="120" rx="6" fill="#bfe0f0" ${bzO()}/><path d="M${160 + c * 150} ${900 + r * 190} v120" stroke="${BZ.ink}" stroke-width="5"/>`;
  return `${bzSky('#7ec4ee', '#f6e2b8')}${bzSun(860, 420, 90, '#fff0b0')}
    <path d="M-20 1360 L-20 1220 Q 300 1150 540 1200 T 1100 1180 L1100 1360 Z" fill="#7aa86a" ${bzO()}/>
    <rect x="60" y="820" width="960" height="560" fill="#e9d9b0" ${bzO()}/><rect x="60" y="820" width="960" height="70" fill="#2f62b8" ${bzO()}/>
    <text x="540" y="872" text-anchor="middle" font-family="Anton, Impact" font-size="52" fill="#fff">E.E. DOM PEDRO</text>${win}
    <rect x="470" y="1250" width="140" height="130" fill="#7a4a2a" ${bzO()}/><path d="M540 1250 v130" stroke="${BZ.ink}" stroke-width="5"/>
    <path d="M970 820 V 560" stroke="${BZ.ink}" stroke-width="14"/><path d="M970 820 V 560" stroke="#c9ced8" stroke-width="6"/><rect x="972" y="565" width="120" height="80" fill="#2f9a4a" ${bzO('stroke-width="5"')}/><path d="M985 605 l45 -28 l45 28 l-45 28z" fill="#f6c744"/><circle cx="1030" cy="605" r="14" fill="#2f62b8"/>
    ${bzGround(1380, '#a8a49a', '')}<rect x="-20" y="1360" width="1120" height="40" fill="#c8c2b4" ${bzO()}/>`;
}
// ---- the corridor: two-tone walls, classroom doors, the notice board, the bathroom door with INTERDITADO tape
function lbHall(withSign = true) {
  const door = (x: number) => `<rect x="${x}" y="760" width="200" height="420" fill="#8a5a36" ${bzO()}/><rect x="${x + 40}" y="800" width="120" height="110" fill="#cfe4ee" ${bzO('stroke-width="5"')}/><circle cx="${x + 170}" cy="980" r="10" fill="${BZ.yellow}" ${bzO('stroke-width="4"')}/>`;
  return `<rect width="1080" height="1920" fill="#ece6d6"/><rect y="1000" width="1080" height="380" fill="#3f8a6a" ${bzO()}/><path d="M0 1000 h1080" stroke="${BZ.ink}" stroke-width="8"/>
    ${door(60)}<rect x="330" y="800" width="300" height="200" fill="#a8774a" ${bzO()}/>${[0, 1, 2, 3].map((i) => `<rect x="${350 + (i % 2) * 140}" y="${820 + Math.floor(i / 2) * 90}" width="120" height="70" fill="${['#fff3a8', '#ffc0c0', '#c0e0ff', '#fff'][i]}" ${bzO('stroke-width="4"')}/>`).join('')}
    ${door(760)}${withSign ? `<g id="interdito"><rect x="790" y="930" width="140" height="70" fill="#fff" ${bzO('stroke-width="5"')}/><text x="860" y="978" text-anchor="middle" font-family="Anton" font-size="30" fill="${BZ.red}">INTERDITADO</text>
      <path d="M760 860 L960 1080 M960 860 L760 1080" stroke="#f6c744" stroke-width="22"/><path d="M760 860 L960 1080 M960 860 L760 1080" stroke="${BZ.ink}" stroke-width="22" stroke-dasharray="20 20" opacity="0.6"/></g>` : ''}
    <rect y="1380" width="1080" height="560" fill="#b6ada0" ${bzO()}/>${[...Array(9)].map((_, i) => `<path d="M${i * 140 - 60} 1380 L${i * 180 - 300} 1940" stroke="${BZ.ink}" stroke-width="4" opacity="0.4"/>`).join('')}`;
}
// ---- the bathroom: green tiles below, peeling paint above, four stalls (doors with ids to swing), a light that flickers
function lbBath() {
  let tiles = ''; for (let x = 0; x <= 1080; x += 60) tiles += `<path d="M${x} 1020 V1400" stroke="#2b5a4a" stroke-width="3"/>`; for (let y = 1020; y <= 1400; y += 60) tiles += `<path d="M0 ${y} H1080" stroke="#2b5a4a" stroke-width="3"/>`;
  const stall = (i: number) => { const x = 40 + i * 255; return `<rect x="${x}" y="760" width="22" height="620" fill="#7d8f84" ${bzO()}/>
    <g id="door${i}"><g transform="translate(${x + 22} 0)"><rect x="0" y="780" width="210" height="560" fill="#93a698" ${bzO()}/><rect x="170" y="1040" width="18" height="40" rx="6" fill="#c9ced8" ${bzO('stroke-width="4"')}/>
      <text x="105" y="880" text-anchor="middle" font-family="Anton" font-size="44" fill="#5a6a60">${i + 1}</text></g></g>`; };
  return `<rect width="1080" height="1920" fill="#d8cfb4"/>${[...Array(6)].map((_, i) => `<path d="M${120 + i * 170} 560 q 20 60 -8 120 q 30 10 18 50" stroke="#a89c80" stroke-width="5" fill="none"/>`).join('')}
    <rect y="1020" width="1080" height="380" fill="#5f9e86"/>${tiles}<path d="M0 1020 h1080" stroke="${BZ.ink}" stroke-width="8"/>
    ${[0, 1, 2, 3].map(stall).join('')}<rect x="1060" y="760" width="22" height="620" fill="#7d8f84" ${bzO()}/>
    <rect y="1380" width="1080" height="560" fill="#9aa0a0" ${bzO()}/>${[...Array(10)].map((_, i) => `<path d="M${i * 120 - 40} 1380 L${i * 160 - 260} 1940" stroke="${BZ.ink}" stroke-width="4" opacity="0.35"/>`).join('')}
    <g id="tube"><rect x="380" y="330" width="320" height="34" rx="16" fill="#f4fbf0" ${bzO()}/><ellipse cx="540" cy="400" rx="360" ry="120" fill="#f8fff0" opacity="0.12"/></g>`;
}
// the flush button inside a stall (a close-up insert)
function lbFlush() {
  let tiles = ''; for (let x = 0; x <= 1080; x += 120) tiles += `<path d="M${x} 0 V1920" stroke="#2b5a4a" stroke-width="5"/>`; for (let y = 0; y <= 1920; y += 120) tiles += `<path d="M0 ${y} H1080" stroke="#2b5a4a" stroke-width="5"/>`;
  return `<rect width="1080" height="1920" fill="#5f9e86"/>${tiles}<g id="plate"><rect x="340" y="700" width="400" height="400" rx="30" fill="#d4d8dc" ${bzO('stroke-width="10"')}/><circle id="btn" cx="540" cy="900" r="120" fill="#eef0f2" ${bzO('stroke-width="10"')}/><circle cx="500" cy="860" r="30" fill="#fff" opacity="0.7"/></g>`;
}
// sinks and the long mirror; faucets have streams (ids) that turn to blood
function lbSinks() {
  let tiles = ''; for (let x = 0; x <= 1080; x += 60) tiles += `<path d="M${x} 1080 V1400" stroke="#2b5a4a" stroke-width="3"/>`;
  const sink = (x: number, i: number) => `<path d="M${x - 120} 1160 h240 q-10 110 -120 110 q-110 0 -120 -110z" fill="#f4f2ec" ${bzO()}/><path d="M${x + 60} 1160 v-60 q0 -24 -24 -24 h-40" stroke="${BZ.ink}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M${x + 60} 1160 v-60 q0 -24 -24 -24 h-40" stroke="#c9ced8" stroke-width="10" fill="none" stroke-linecap="round"/>
    <rect id="stream${i}" x="${x - 4 - 2}" y="1080" width="14" height="140" fill="${BZ.blood}" opacity="0"/><ellipse id="pool${i}" cx="${x}" cy="1180" rx="90" ry="20" fill="${BZ.blood}" opacity="0"/>`;
  return `<rect width="1080" height="1920" fill="#d8cfb4"/><rect y="1080" width="1080" height="320" fill="#5f9e86"/>${tiles}<path d="M0 1080 h1080" stroke="${BZ.ink}" stroke-width="8"/>
    <rect x="60" y="620" width="960" height="420" fill="#9fb4bc" ${bzO('stroke-width="10"')}/><path d="M120 680 l120 -40 M160 760 l220 -80 M700 700 l200 -60" stroke="#e8f4f8" stroke-width="10" opacity="0.5"/>
    ${sink(220, 0)}${sink(540, 1)}${sink(860, 2)}<rect y="1400" width="1080" height="560" fill="#9aa0a0" ${bzO()}/><ellipse id="floodpool" cx="540" cy="1520" rx="10" ry="4" fill="${BZ.blood}" opacity="0.9"/>`;
}
// a dark overlay for the flickering light (id), and the mirror's ghost glow
const lbDark = (id = 'dark', c = '#0a0c14') => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="0"/>`;
// flicker: the overlay jumps between dark and light (deterministic pattern)
function lbFlicker(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, k = 0.85) {
  const pat = [0, k, 0.1, k, 0, 0, k, 0.3, k, k, 0]; let t = t0, i = 0;
  while (t < t1) { tl.set(sel, { opacity: pat[i % pat.length] }, t); t += 0.07 + ((i * 37) % 5) * 0.03; i++; }
  tl.set(sel, { opacity: 0 }, t1);
}

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#d8cfb4', html: () => svg(`${lbBath()}${lbCarol(260, 1560, 1)}${lbBia(540, 1560, 1)}${lbLoira(820, 1560, 1)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-cast #carol', s.t0, 'wide', 'frown'); bzFace(tl, '#sc-test-cast #bia', s.t0, 'dot', 'grin'); bzFace(tl, '#sc-test-cast #loira', s.t0, 'dead', 'flat'); tl.set('#sc-test-cast #loira .nosebleed', { opacity: 1 }, s.t0 + 1); } },
  'test-school': { bg: '#7ec4ee', html: () => svg(`${lbSchool()}${lbCarol(380, 1600, 0.8)}${lbBia(640, 1600, 0.8, true)}${bzSign('sg', 'ESCOLA DOM PEDRO', 540, 420, -3, BZ.navy, '#fff', 90, { text: '1996', bg: BZ.red, fg: '#fff' })}`), anim() {} },
  'test-hall': { bg: '#ece6d6', html: () => svg(`${lbHall()}${lbBia(420, 1640, 1.1)}${lbCarol(680, 1640, 1.1, true)}`),
    anim(tl, s) { bzWalk(tl, '#sc-test-hall #bia', s.t0, s.t1, 0, 200); bzWalk(tl, '#sc-test-hall #carol', s.t0, s.t1, 0, 200); bzFace(tl, '#sc-test-hall #carol', s.t0, 'half', 'frown'); } },
  'test-mirror': { bg: '#d8cfb4', html: () => svg(`${lbSinks()}${lbLoira(540, 1500, 1.25)}${lbDark()}`),
    anim(tl, s) { bzFace(tl, '#sc-test-mirror #loira', s.t0, 'dead', 'flat'); tl.set('#sc-test-mirror .nosebleed', { opacity: 1 }, s.t0 + 1);
      for (let i = 0; i < 3; i++) { tl.set(`#sc-test-mirror #stream${i}`, { opacity: 1 }, s.t0 + 0.5); tl.set(`#sc-test-mirror #pool${i}`, { opacity: 1 }, s.t0 + 0.5); } } },
  'test-flush': { bg: '#5f9e86', html: () => svg(`${lbFlush()}`), anim() {} },
  'test-closeup': { bg: '#0a0c14', html: () => svg(`<rect width="1080" height="1920" fill="#14181e"/>${lbLoira(540, 2250, 2.6)}${bzVignette(0.8)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-closeup #loira', s.t0, 'dead', 'flat'); tl.set('#sc-test-closeup .nosebleed', { opacity: 1 }, s.t0 + 1); } },
});
