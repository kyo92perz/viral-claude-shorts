// <lines>
const IM_LINES = [];
// </lines>
// =====================================================================
//  IMAGINA SÓ EP1: the shots (16:9). Cast, sets and the HUD in world.ts, the shot list in tools/make-scenes.py.
//  Framing: ground ~ y 940, captions y 860–930. Tuco (kid, tall 1.22): head ~ 427*s above the feet; adults ~ 507*s.
// =====================================================================
BZ_TALK.lines = IM_LINES;
const imZ = (k: number, cx: number, cy: number, body: string) => `<g transform="translate(${(960 - cx * k).toFixed(1)} ${(540 - cy * k).toFixed(1)}) scale(${k})">${body}</g>`;
const imPop = (tl: gsap.core.Timeline, sel: string, t0: number, t: number) => { tl.set(sel, { opacity: 0 }, t0); bzShow(tl, sel, t); };
const imHudIn = (tl: gsap.core.Timeline, $: (q: string) => string, s: Scene) => tl.fromTo($('#hud'), { y: -160 }, { y: 0, duration: 0.35, ease: 'back.out(2)' }, s.t0);
const imSign = (id: string, t: string, x: number, y: number, bg = BZ.yellow, fg = BZ.ink, rot = -3, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
// a closeup of a character's face; k = scale, kid head 427*s above feet
const imClose = (who: string, id: string, bg: string, s = 2.6, flip = false, x = 960) => `${bg}${imChar(who, id, x, (IM_SPEC[who].kid ? 427 : 507) * s + 430, s, flip)}`;
// burst of coins flying out (#burst .bc)
const imBurst = (x: number, y: number, n = 14) => `<g id="burst">${[...Array(n)].map((_, i) => `<g class="bc">${imCoin(x, y, 26 + (i % 3) * 6)}</g>`).join('')}</g>`;
function imBurstGo(tl: gsap.core.Timeline, sel: string, t: number) {
  tl.set(`${sel} .bc`, { opacity: 0 }, t - 0.01);
  for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, d = 260 + (i % 4) * 80;
    tl.fromTo(`${sel} .bc:nth-child(${i + 1})`, { x: 0, y: 0, opacity: 1 }, { x: Math.cos(a) * d, y: Math.sin(a) * d + 120, opacity: 0, duration: 1.1, ease: 'power2.out' }, t); }
}
// falling notes (#rainn .nt)
const imNotesRain = (n = 26, seed = 2) => { let r = seed * 9301; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  return `<g id="rainn">${[...Array(n)].map(() => `<g class="nt">${imNote(rnd() * 1920, -100 - rnd() * 600, rnd() * 60 - 30, 0.8)}</g>`).join('')}</g>`; };
const imNotesGo = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number) => tl.fromTo(`${sel} .nt`, { y: 0, rotation: 0 }, { y: 1500, rotation: 200, duration: 2.4, ease: 'none', repeat: Math.max(0, Math.floor((t1 - t0) / 2.4)), stagger: { each: 0.09, from: 'random' } }, t0);
const imConfetti = () => `<g id="conf">${[...Array(40)].map((_, i) => `<rect class="cf" x="${(i * 97) % 1920}" y="${-40 - (i * 53) % 400}" width="18" height="30" fill="${['#f6c744', '#e0302a', '#3aa05a', '#3a7aff', '#c84a8a'][i % 5]}"/>`).join('')}</g>`;
const imConfettiGo = (tl: gsap.core.Timeline, sel: string, t: number) => tl.fromTo(`${sel} .cf`, { y: 0, rotation: 0 }, { y: 1300, rotation: 540, duration: 2.6, ease: 'power1.in', stagger: { each: 0.03, from: 'random' } }, t);
// props
const imCandy = (x: number, y: number) => `<g transform="translate(${x} ${y})"><path d="M-90 -30 L -50 0 L -90 30 Z M90 -30 L 50 0 L 90 30 Z" fill="#e0302a" ${bzO()}/><ellipse rx="60" ry="40" fill="#e0302a" ${bzO()}/><path d="M-30 -30 q 30 60 60 0" stroke="#fff" stroke-width="10" fill="none"/></g>`;
const imSneaker = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-160 0 Q -160 -90 -60 -100 L 40 -70 Q 140 -60 170 0 Z" fill="#fbf7ef" ${bzO()}/><path d="M-160 0 H 170 V 26 H -160 Z" fill="#e0302a" ${bzO()}/><path d="M-60 -90 l 40 50 M -20 -84 l 40 50" stroke="#3a7aff" stroke-width="12"/></g>`;
const imConsole = (x: number, y: number) => `<g transform="translate(${x} ${y})"><path d="M-150 -40 Q -170 60 -110 70 Q -70 70 -50 30 H 50 Q 70 70 110 70 Q 170 60 150 -40 Q 140 -80 0 -80 Q -140 -80 -150 -40 Z" fill="#3a3a44" ${bzO()}/><circle cx="80" cy="-20" r="14" fill="#e0302a"/><circle cx="110" cy="0" r="14" fill="#3aa05a"/><path d="M-110 -10 h50 M-85 -35 v50" stroke="#c8c8d0" stroke-width="14"/></g>`;
const imBike = (x: number, y: number) => `<g transform="translate(${x} ${y})"><circle cx="-110" cy="0" r="70" fill="none" stroke="${BZ.ink}" stroke-width="16"/><circle cx="110" cy="0" r="70" fill="none" stroke="${BZ.ink}" stroke-width="16"/><path d="M-110 0 L -20 -110 L 80 -110 L 110 0 M-20 -110 L 0 0 L 80 -110 M60 -150 h50" stroke="#3aa05a" stroke-width="16" fill="none" stroke-linejoin="round"/><rect x="-40" y="-90" width="60" height="40" rx="8" fill="#f6c744" ${bzO('stroke-width="5"')}/></g>`;
const imCalc = (x: number, y: number, val: string, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-170" y="-260" width="340" height="520" rx="30" fill="#3a3a44" ${bzO('stroke-width="9"')}/><rect x="-140" y="-230" width="280" height="110" rx="10" fill="#b8d8a0"/><text id="calc-val" x="125" y="-150" text-anchor="end" font-family="Anton" font-size="${val.length > 10 ? 44 : 64}" fill="${BZ.ink}">${val}</text>
  ${[...Array(12)].map((_, i) => `<rect x="${-130 + (i % 3) * 90}" y="${-90 + Math.floor(i / 3) * 80}" width="80" height="66" rx="10" fill="${i % 3 === 2 ? '#f29a4a' : '#5a5a66'}"/>`).join('')}</g>`;
const imTicket = (x: number, y: number, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-210" y="-120" width="420" height="240" rx="14" fill="#fbf7ef" ${bzO()}/><rect x="-210" y="-120" width="420" height="70" rx="14" fill="#2fa04a"/><text x="0" y="-70" text-anchor="middle" font-family="Anton" font-size="48" fill="#fff">MEGA DA VIRADA</text>
  ${[...Array(6)].map((_, i) => `<circle cx="${-150 + i * 60}" cy="30" r="24" fill="#f6c744" ${bzO('stroke-width="4"')}/>`).join('')}</g>`;
const imGovt = (x: number, y: number) => `<g transform="translate(${x} ${y})"><rect x="-300" y="-260" width="600" height="260" fill="#e8e4dc" ${bzO()}/>${[...Array(7)].map((_, i) => `<rect x="${-270 + i * 85}" y="-240" width="40" height="230" fill="#d0ccc0" ${bzO('stroke-width="4"')}/>`).join('')}<path d="M-330 -260 L 0 -380 L 330 -260 Z" fill="#e8e4dc" ${bzO()}/><text x="0" y="-290" text-anchor="middle" font-family="Anton" font-size="52" fill="${BZ.ink}">COAF</text></g>`;
const imPaperTower = (x: number, y: number, n = 14) => `<g transform="translate(${x} ${y})">${[...Array(n)].map((_, i) => `<rect x="${-130 + (i % 2) * 10}" y="${-(i + 1) * 40}" width="260" height="40" fill="#fbf7ef" ${bzO('stroke-width="5"')}/>`).join('')}<rect x="-90" y="${-n * 40 - 60}" width="180" height="56" rx="8" fill="#e0302a" ${bzO('stroke-width="5"')}/><text x="0" y="${-n * 40 - 18}" text-anchor="middle" font-family="Anton" font-size="38" fill="#fff">IMPOSTO</text></g>`;
const imGavel = (x: number, y: number) => `<g id="gavel"><g transform="translate(${x} ${y}) rotate(-30)"><rect x="-20" y="0" width="40" height="260" rx="10" fill="#8a5a3a" ${bzO()}/><rect x="-110" y="-70" width="220" height="90" rx="16" fill="#6a4a30" ${bzO()}/></g></g>`;
const imCars = () => `<g id="cars">${[...Array(12)].map((_, i) => `<g transform="translate(${140 + (i % 6) * 300} ${560 + Math.floor(i / 6) * 260})"><path d="M-120 0 V -60 L -70 -110 H 70 L 120 -60 V 0 Z" fill="${['#e0302a', '#3a7aff', '#f6c744', '#3aa05a', '#fbf7ef', '#c84a8a'][i % 6]}" ${bzO()}/><path d="M-60 -100 H 60 L 90 -64 H -90 Z" fill="#8ac0e8" ${bzO('stroke-width="5"')}/><circle cx="-70" cy="0" r="30" fill="${BZ.ink}"/><circle cx="70" cy="0" r="30" fill="${BZ.ink}"/><rect x="-40" y="-150" width="80" height="34" rx="6" fill="#e0302a" ${bzO('stroke-width="4"')}/></g>`).join('')}</g>`;
const imPodium = (x: number, y: number) => `<g transform="translate(${x} ${y})"><rect x="-120" y="-200" width="240" height="200" fill="#f6c744" ${bzO()}/><text x="0" y="-70" text-anchor="middle" font-family="Anton" font-size="110" fill="${BZ.ink}">1º</text><rect x="-360" y="-110" width="240" height="110" fill="#c8ccd8" ${bzO()}/><rect x="120" y="-70" width="240" height="70" fill="#d8a060" ${bzO()}/></g>`;
const imDiamond = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-80 -40 L -40 -90 H 40 L 80 -40 L 0 70 Z" fill="#8ad8f0" ${bzO()}/><path d="M-80 -40 H 80 M-40 -90 L -20 -40 L 0 70 L 20 -40 L 40 -90" stroke="${BZ.ink}" stroke-width="5" fill="none"/></g>`;
const imSand = (x: number, y: number) => `<g transform="translate(${x} ${y})"><path d="M-300 0 Q -150 -220 0 -240 Q 150 -220 300 0 Z" fill="#e8c87a" ${bzO()}/>${[...Array(30)].map((_, i) => `<circle cx="${-220 + (i * 53) % 440}" cy="${-20 - (i * 37) % 180}" r="4" fill="#c8a85a"/>`).join('')}</g>`;
const imRiceMountain = () => `<g id="rm"><path d="M-100 1100 Q 400 300 960 120 Q 1520 300 2020 1100 Z" fill="#fbf7ef" ${bzO('stroke-width="10"')}/>${[...Array(120)].map((_, i) => `<ellipse cx="${200 + (i * 131) % 1520}" cy="${360 + (i * 71) % 700}" rx="9" ry="5" fill="#e8e0d0"/>`).join('')}</g>`;
const imBook = (x: number, y: number) => `<g transform="translate(${x} ${y})"><path d="M0 0 L -200 -40 V -260 L 0 -220 Z" fill="#fbf7ef" ${bzO()}/><path d="M0 0 L 200 -40 V -260 L 0 -220 Z" fill="#fbf7ef" ${bzO()}/>${[0, 1, 2, 3].map((i) => `<path d="M-170 ${-200 + i * 40} L -30 ${-172 + i * 40} M30 ${-172 + i * 40} L 170 ${-200 + i * 40}" stroke="#c8c0b0" stroke-width="6"/>`).join('')}</g>`;
const imJar = (x: number, y: number) => `<g transform="translate(${x} ${y})"><rect x="-150" y="-360" width="300" height="360" rx="40" fill="#d8f0f8" opacity="0.7" ${bzO()}/><rect x="-120" y="-400" width="240" height="50" rx="10" fill="#c8542c" ${bzO()}/><g id="jarfill">${[...Array(18)].map((_, i) => `<g class="jc">${imCoin(-90 + (i % 5) * 45, -40 - Math.floor(i / 5) * 50, 26)}</g>`).join('')}</g></g>`;
const imCommentBox = () => `<g id="cbox"><rect x="360" y="300" width="1200" height="300" rx="30" fill="#fbf7ef" ${bzO('stroke-width="9"')}/><circle cx="470" cy="400" r="60" fill="#2fa04a" ${bzO()}/><text x="570" y="410" font-family="Anton" font-size="56" fill="${BZ.ink}">VOCÊ</text>
  <text id="ctext" x="570" y="510" font-family="Anton" font-size="80" fill="#3a7aff">EU PARAVA NO DIA ___</text></g>`;
const imRules = () => `<g id="rules"><rect x="460" y="170" width="1000" height="640" rx="30" fill="#fbf7ef" ${bzO('stroke-width="10"')}/><text x="960" y="270" text-anchor="middle" font-family="Anton" font-size="84" fill="${BZ.ink}">AS REGRAS</text>
  ${[['r1', '1. DOBRA TODA MANHÃ, ÀS 7H'], ['r2', '2. PODE GASTAR À VONTADE'], ['r3', '3. NÃO PODE CONTAR O SEGREDO']].map(([id, t], i) => `<g id="${id}"><text x="540" y="${420 + i * 140}" font-family="Anton" font-size="64" fill="${['#2fa04a', '#3a7aff', '#e0302a'][i]}">${t}</text></g>`).join('')}</g>`;
const imSleepZ = () => `<g id="zz">${[0, 1, 2].map((i) => `<text class="z" x="${980 + i * 60}" y="${440 - i * 70}" font-family="Anton" font-size="${70 + i * 20}" fill="#fbf7ef">Z</text>`).join('')}</g>`;

defineVisuals({
  // ================================================================ hook + rules
  hook: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imChar('tuco', 'tuco', 420, 820, 1.0)}`, bzVignette(0.35)),
    anim(tl, s, K, $) { tl.set($('#tuco'), { rotation: -90, transformOrigin: '50% 90%', x: 120, y: -30 }, s.t0); bzFace(tl, $('#tuco'), s.t0, 'closed', 'smile'); bzFace(tl, $('#tuco'), s.t0 + 1.4, 'wide', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 500, 700); } },
  coin: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imPhone(960, 560, 1.3, 'R$ 1,00')}`, `${imBurst(960, 520)}${bzVignette(0.3)}`),
    anim(tl, s, K, $) { tl.fromTo($('#phone'), { y: 700 }, { y: 0, duration: 0.45, ease: 'back.out(1.6)' }, s.t0); imBurstGo(tl, $('#burst'), K('c')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  double: { bg: '#f6c744', html: () => bzShot(`<rect width="1920" height="1080" fill="#f6c744"/>${bzRays('ry', 960, 540, 16, 1300, '#fff', 0.25)}${imPhone(960, 560, 1.3, 'R$ 2,00')}`, `${imSign('x2', '× 2', 1420, 300, '#2fa04a', '#fff', 6, 140)}${imBurst(960, 520)}`),
    anim(tl, s, K, $) { tl.fromTo($('#ry'), { rotation: 0, svgOrigin: '960 540' }, { rotation: 25, duration: s.t1 - s.t0, ease: 'none' }, s.t0); imPop(tl, $('#x2'), s.t0, K('d')); imBurstGo(tl, $('#burst'), K('d')); tl.fromTo($('#phone'), { scale: 1, svgOrigin: '960 560' }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, K('d')); } },
  tease: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imChar('tuco', 'tuco', 960, 1180, 1.6)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'half', 'flat'); bzPose(tl, $('#tuco'), s.t0 + 0.2, { aL: 60, aR: -60 }, 0.25); bzIdle(tl, $('#tuco'), s.t0, s.t1); } },
  big: { bg: '#2fa04a', html: () => bzShot(`<rect width="1920" height="1080" fill="#2fa04a"/>${bzRays('ry', 960, 600, 16, 1300, '#f6c744', 0.3)}${imPiles(960, 1000)}${imChar('tuco', 'tuco', 960, 1040, 1.15)}`, `${imHud('DIA 30', 'R$ 536 MI')}${imNotesRain()}`),
    anim(tl, s, K, $) { imHudIn(tl, $, s); for (let i = 0; i < 6; i++) tl.to($(`#pile .p${i}`), { opacity: 1, duration: 0.1 }, s.t0 + 0.2 + i * 0.25); bzFace(tl, $('#tuco'), s.t0, 'wide', 'grin'); bzPose(tl, $('#tuco'), s.t0, { aL: 150, aR: -150 }, 0.2); imNotesGo(tl, $('#rainn'), s.t0, s.t1); bzQuake(tl, $('#cam'), K('m'), K('m') + 0.3, 6); } },
  world: { bg: '#0e1a33', html: () => bzShot(`<rect width="1920" height="1080" fill="#0e1a33"/>${bzStars(90, 5, 1080)}<g id="gl">${imGlobe(960, 560, 300)}</g>${imNotesRain(20, 7)}`, `${imSign('nb', 'NÃO VAI DAR!', 960, 160, '#e0302a', '#fff', -3, 90)}`),
    anim(tl, s, K, $) { tl.fromTo($('#gl'), { scale: 1, svgOrigin: '960 560' }, { scale: 0.7, duration: s.t1 - s.t0, ease: 'none' }, s.t0); imNotesGo(tl, $('#rainn'), s.t0, s.t1); imPop(tl, $('#nb'), s.t0, K('w')); } },
  rules: { bg: '#3a7aff', html: () => bzShot(`<rect width="1920" height="1080" fill="#3a7aff"/>${imRules()}`, ''),
    anim(tl, s, K, $) { bzPop(tl, $('#rules'), s.t0); imPop(tl, $('#r1'), s.t0, K('r1')); imPop(tl, $('#r2'), s.t0, K('r2')); imPop(tl, $('#r3'), s.t0, K('r3')); } },
  go: { bg: '#f6c744', html: () => bzShot(imTitle(), `${bzNum('d1', 'DIA 1', 960, 840, BZ.ink, 160)}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { tl.fromTo($('#tt'), { scale: 1.4, svgOrigin: '960 380' }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, s.t0); bzShow(tl, $('#d1'), K('d')); bzHit(tl, $('#fl'), K('d'), 0.5); tl.set($('#ts'), { opacity: 0 }, s.t0); } },

  // ================================================================ week 1
  day1: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imChar('tuco', 'tuco', 820, 1000, 1.25)}${imPhone(1150, 560, 0.7, 'R$ 1,00')}`, imHud('DIA 1', 'R$ 1,00')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'half', 'flat'); bzPose(tl, $('#tuco'), s.t0, { aR: -110 }, 0.01); bzIdle(tl, $('#tuco'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 960, 520); } },
  candy: { bg: '#f6c744', html: () => bzShot(`<rect width="1920" height="1080" fill="#ffd9e8"/>${imCandy(760, 520)}${imCandy(1160, 520)}`, `${imSign('pr', '1 REAL = 2 BALAS', 960, 200, '#fbf7ef', BZ.ink, -3, 90)}`),
    anim(tl, s, K, $) { bzPop(tl, $('#pr'), s.t0 + 0.2); tl.fromTo($('#cam'), { rotation: -2, svgOrigin: '960 540' }, { rotation: 2, duration: 0.6, yoyo: true, repeat: 4 }, s.t0); } },
  serio: { bg: '#f0c8a0', html: () => bzShot(imClose('tuco', 'tuco', imRoom(), 2.4), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'half', 'flat'); bzTalk(tl, $('#tuco'), 'im_tuco', s.t0, s.t1, 'flat', 'open'); bzPose(tl, $('#tuco'), s.t0, { aR: -60 }, 0.2); } },
  days: { bg: '#3aa05a', html: () => bzShot(`<rect width="1920" height="1080" fill="#3aa05a"/>${[['a', 'DIA 2', 'R$ 2'], ['b', 'DIA 3', 'R$ 4'], ['c', 'DIA 5', 'R$ 16']].map(([id, d, v], i) => `<g id="${id}"><g transform="translate(${420 + i * 540} 520)"><rect x="-220" y="-200" width="440" height="400" rx="30" fill="#fbf7ef" ${bzO('stroke-width="9"')}/><text y="-60" text-anchor="middle" font-family="Anton" font-size="96" fill="${BZ.ink}">${d}</text><text y="100" text-anchor="middle" font-family="Anton" font-size="120" fill="#2fa04a">${v}</text></g></g>`).join('')}`, ''),
    anim(tl, s, K, $) { imPop(tl, $('#a'), s.t0, K('a')); imPop(tl, $('#b'), s.t0, K('b')); imPop(tl, $('#c'), s.t0, K('c')); } },
  cantina: { bg: '#e8f0e0', html: () => bzShot(`${imCanteen()}${imChar('tuco', 'tuco', 820, 1000, 1.2)}`, imHud('DIA 5', 'R$ 16,00')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'dot', 'grin'); bzWalk(tl, $('#tuco'), s.t0, s.t0 + 1.4, -300, 0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 960, 400); } },
  pays: { bg: '#e8f0e0', html: () => bzShot(`${imCanteen()}${imChar('tuco', 'tuco', 720, 1000, 1.2)}${imChar('biel', 'biel', 1120, 1000, 1.2, true)}<g id="cn">${imCoin(920, 600, 30)}</g>`, imHud('DIA 7', 'R$ 64,00')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'dot', 'grin'); bzFace(tl, $('#biel'), s.t0, 'dot', 'smile'); bzIdle(tl, $('#tuco'), s.t0, s.t1); bzIdle(tl, $('#biel'), s.t0, s.t1, 1);
      bzPose(tl, $('#tuco'), K('p') - 0.3, { aR: -90 }, 0.2); imPop(tl, $('#cn'), s.t0, K('p')); bzFace(tl, $('#biel'), K('p') + 0.3, 'wide', 'o'); } },
  rifa: { bg: '#e8f0e0', html: () => bzShot(imClose('biel', 'biel', imCanteen(), 2.4, true), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#biel'), s.t0, 'half', 'smile'); bzTalk(tl, $('#biel'), 'im_biel', s.t0, s.t1, 'smile', 'open'); bzPose(tl, $('#biel'), s.t0, { aL: 70 }, 0.2); } },
  trap: { bg: '#1b2a44', html: () => bzShot(`${imChart(7)}`, `${imSign('tot', 'SEMANA 1: R$ 127', 960, 170, '#fbf7ef', BZ.ink, -3, 84)}`),
    anim(tl, s, K, $) { tl.to($('#curve'), { strokeDashoffset: 0, duration: 2.2, ease: 'none' }, s.t0 + 0.3); imPop(tl, $('#tot'), s.t0, s.t0 + 2.6); } },
  nada: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imChar('tuco', 'tuco', 960, 1180, 1.6)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'half', 'frown'); bzPose(tl, $('#tuco'), s.t0, { hd: -10 }, 0.4); bzIdle(tl, $('#tuco'), s.t0, s.t1); } },
  expo: { bg: '#1b2a44', html: () => bzShot(imChart(30), `${imSign('nm', 'CRESCIMENTO EXPONENCIAL', 960, 140, BZ.yellow, BZ.ink, -2, 80)}${bzFlash('fl', '#3aff8a')}`),
    anim(tl, s, K, $) { tl.to($('#curve'), { strokeDashoffset: 0, duration: K('x') - s.t0, ease: 'power4.in' }, s.t0); imPop(tl, $('#nm'), s.t0, s.t0 + 0.8); bzHit(tl, $('#fl'), K('x'), 0.35); bzQuake(tl, $('#cam'), K('x'), K('x') + 0.4, 8); } },

  // ================================================================ getting real
  d10: { bg: '#5ab0f0', html: () => bzShot(`${imStreet()}${imChar('tuco', 'tuco', 960, 1000, 1.25)}`, `${imHud('DIA 10', 'R$ 512')}${bzParticles('sp', 'fireflies', 10, [800, 820, 1120, 1000], 3)}`),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'dot', 'grin'); bzWalk(tl, $('#tuco'), s.t0, s.t1, -500, 200); bzParticlesGo(tl, $('#sp'), 'fireflies', K('s'), s.t1); bzParallax(tl, $, s.t0, s.t1, -160); } },
  d11: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imChar('tuco', 'tuco', 760, 1000, 1.25)}${imPhone(1250, 520, 0.85, 'R$ 1.024')}`, `${imHud('DIA 11', 'R$ 1.024')}${imConfetti()}`),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'wide', 'grin'); tl.fromTo($('#tuco .mv'), { y: 0 }, { y: -120, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.out' }, K('j')); bzPose(tl, $('#tuco'), K('j'), { aL: 160, aR: -160 }, 0.15); imConfettiGo(tl, $('#conf'), K('j')); } },
  bill: { bg: '#f0e0b0', html: () => bzShot(`${imKitchen()}${imBill('bill', 1000, 360)}${imChar('tuco', 'tuco', 620, 1000, 1.2)}`, imHud('DIA 14', 'R$ 8.192')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'half', 'smile'); bzPose(tl, $('#tuco'), s.t0 + 0.3, { aR: -100 }, 0.3); tl.set($('#bill .paid'), { opacity: 0 }, s.t0); bzPop(tl, $('#bill .paid'), K('p')); tl.set($('#bill .paid'), { opacity: 1 }, K('p')); } },
  mae1: { bg: '#f0e0b0', html: () => bzShot(imClose('mae', 'mae', imKitchen(), 2.0), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#mae'), s.t0, 'wide', 'open'); bzTalk(tl, $('#mae'), 'im_mae', s.t0, s.t1, 'o', 'open'); bzPose(tl, $('#mae'), s.t0, { aR: -140 }, 0.2); } },
  milagre: { bg: '#f0e0b0', html: () => bzShot(imClose('tuco', 'tuco', imKitchen(), 2.4), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'wide', 'flat'); bzTalk(tl, $('#tuco'), 'im_tuco', s.t0, s.t1, 'flat', 'open'); bzPose(tl, $('#tuco'), s.t0, { aL: 60, aR: -60 }, 0.2); tl.fromTo($('#tuco .hd'), { rotation: -4, transformOrigin: '50% 90%' }, { rotation: 4, duration: 0.4, yoyo: true, repeat: 5 }, s.t0); } },
  d16: { bg: '#5ab0f0', html: () => bzShot(`${imStreet()}<g transform="translate(1300 900)"><path d="M-220 0 V -110 L -140 -190 H 140 L 220 -110 V 0 Z" fill="#8a9ab0" ${bzO()}/><circle cx="-130" cy="0" r="50" fill="${BZ.ink}"/><circle cx="130" cy="0" r="50" fill="${BZ.ink}"/></g>${imChar('tuco', 'tuco', 640, 1000, 1.25)}`, `${imHud('DIA 16', 'R$ 32.768')}${imSign('us', 'VENDE-SE', 1300, 560, '#fbf7ef', '#e0302a', 4, 70)}`),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'wide', 'grin'); bzPose(tl, $('#tuco'), s.t0 + 0.3, { aR: -100 }, 0.3); bzParallax(tl, $, s.t0, s.t1, -100); } },
  kid14: { bg: '#5ab0f0', html: () => bzShot(imClose('tuco', 'tuco', imStreet(), 2.4), imSign('ag', '14 ANOS', 1450, 220, '#e0302a', '#fff', 6, 90)),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'half', 'frown'); bzPose(tl, $('#tuco'), s.t0, { aL: 60, aR: -60 }, 0.2); imPop(tl, $('#ag'), s.t0, s.t0 + 0.5); } },
  buys: { bg: '#f6c744', html: () => bzShot(`<rect width="1920" height="1080" fill="#f6c744"/>${bzRays('ry', 960, 540, 16, 1300, '#fff', 0.2)}<g id="a">${imConsole(420, 560)}</g><g id="b">${imPhone(960, 520, 0.8, 'NOVO!', 'CELULAR')}</g><g id="c">${imBike(1480, 600)}</g>`, ''),
    anim(tl, s, K, $) { imPop(tl, $('#a'), s.t0, K('a')); imPop(tl, $('#b'), s.t0, K('b')); imPop(tl, $('#c'), s.t0, K('c')); tl.fromTo($('#ry'), { rotation: 0, svgOrigin: '960 540' }, { rotation: 20, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  school: { bg: '#e8f0e0', html: () => bzShot(`${imCanteen()}${imChar('biel', 'k1', 300, 1000, 1.0)}${imChar('tuco', 'tuco', 960, 1000, 1.2)}${imChar('rep', 'k2', 1600, 1000, 0.9, true)}${imChar('tio', 'k3', 1780, 1000, 0.85, true)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'dot', 'grin'); for (const k of ['#k1', '#k2', '#k3']) { bzFace(tl, $(k), s.t0 + 0.4, 'wide', 'o'); bzIdle(tl, $(k), s.t0, s.t1); } bzWalk(tl, $('#tuco'), s.t0, s.t1, -200, 200); } },

  // ================================================================ the bank
  d18: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imChar('tuco', 'tuco', 760, 1000, 1.25)}${imPhone(1250, 520, 0.85, 'CHAMANDO...', 'BANCO')}`, imHud('DIA 18', 'R$ 131.072')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'dot', 'smile'); bzFace(tl, $('#tuco'), K('r'), 'wide', 'o'); bzQuake(tl, $('#phone'), K('r'), K('r') + 1.4, 6); } },
  manager: { bg: '#2a3a5a', html: () => bzShot(`<rect width="1920" height="1080" fill="#2a3a5a"/><rect x="460" y="80" width="1000" height="760" rx="40" fill="#2b2433" ${bzO('stroke-width="10"')}/><g transform="translate(0 0)"><rect x="500" y="120" width="920" height="680" fill="#d8e4f0"/>${imChar('ger', 'ger', 960, 1420, 1.7)}</g>`, `${imSign('bk', 'GERENTE DO BANCO', 960, 760, '#8a3aff', '#fff', 0, 60)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#ger'), s.t0, 'half', 'flat'); bzTalk(tl, $('#ger'), 'im_ger', s.t0, s.t1, 'flat', 'open'); } },
  coaf: { bg: '#1b2a44', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b2a44"/>${imBrazil(520, 560, 1.0)}${imGovt(1380, 760)}<path id="arr" d="M760 520 Q 1050 360 1260 460" stroke="#f6c744" stroke-width="16" fill="none" stroke-dasharray="30 20"/>`, `${imSign('cf', 'É REAL!', 520, 170, '#e0302a', '#fff', -4, 90)}`),
    anim(tl, s, K, $) { imPop(tl, $('#cf'), s.t0, s.t0 + 0.4); tl.fromTo($('#arr'), { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzQuake(tl, $('#cam'), K('c'), K('c') + 0.25, 4); } },
  process: { bg: '#4a3424', html: () => bzShot(`<rect width="1920" height="1080" fill="#4a3424"/>${imPaperTower(1360, 1000, 16)}${imChar('tuco', 'tuco', 640, 1060, 1.35)}`, `${imGavel(1000, 300)}${imSign('pc', 'PROCESSO', 960, 130, '#fbf7ef', '#e0302a', -3, 90)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'wide', 'frown'); bzShake(tl, $('#tuco'), s.t0, s.t1, 2); tl.fromTo($('#gavel'), { rotation: -30, svgOrigin: '1000 560' }, { rotation: 15, duration: 0.2, ease: 'power3.in' }, K('g') - 0.2); bzQuake(tl, $('#cam'), K('g'), K('g') + 0.3, 8); imPop(tl, $('#pc'), s.t0, K('g')); } },
  tellmom: { bg: '#f0e0b0', html: () => bzShot(`${imKitchen()}${imChar('tuco', 'tuco', 720, 1000, 1.2)}${imChar('mae', 'mae', 1180, 1000, 1.15, true)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'half', 'flat'); bzFace(tl, $('#mae'), s.t0, 'dot', 'flat'); bzIdle(tl, $('#tuco'), s.t0, s.t1); bzIdle(tl, $('#mae'), s.t0, s.t1, 1); bzPose(tl, $('#tuco'), s.t0 + 0.5, { aR: -80 }, 0.3); bzFace(tl, $('#mae'), s.t1 - 1.2, 'wide', 'o'); } },
  contador: { bg: '#f0e0b0', html: () => bzShot(`${imKitchen()}${imChar('ger', 'ct', 960, 1000, 1.2)}${imCalc(1400, 560, '8.388.608', 0.7)}`, imSign('ct2', 'O CONTADOR', 960, 150, BZ.yellow, BZ.ink, -3, 80)),
    anim(tl, s, K, $) { bzFace(tl, $('#ct'), s.t0, 'wide', 'o'); bzPose(tl, $('#ct'), s.t0 + 0.3, { aR: -100 }, 0.3); imPop(tl, $('#ct2'), s.t0, s.t0 + 0.3); bzShake(tl, $('#ct'), s.t0 + 0.8, s.t1, 2); } },
  mae2: { bg: '#f0e0b0', html: () => bzShot(imClose('mae', 'mae', imKitchen(), 2.0), bzFlash('fl', '#fff')),
    anim(tl, s, K, $) { bzFace(tl, $('#mae'), s.t0, 'wide', 'open'); bzTalk(tl, $('#mae'), 'im_mae', s.t0, s.t1, 'o', 'open'); bzPose(tl, $('#mae'), s.t0, { aL: 150, aR: -150 }, 0.15); bzQuake(tl, $('#cam'), s.t0 + 0.2, s.t0 + 0.6, 6); } },
  million: { bg: '#2fa04a', html: () => bzShot(`<rect width="1920" height="1080" fill="#2fa04a"/>${bzRays('ry', 960, 560, 18, 1300, '#f6c744', 0.35)}${imChar('tucoRich', 'tuco', 960, 1060, 1.3)}`, `${imHud('DIA 21', 'R$ 1 MILHÃO')}${imSign('ml', 'MILIONÁRIO!', 960, 260, BZ.yellow, BZ.ink, -4, 110)}${imConfetti()}`),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'wide', 'grin'); bzPose(tl, $('#tuco'), K('m'), { aL: 160, aR: -160 }, 0.15); imPop(tl, $('#ml'), s.t0, K('m')); imConfettiGo(tl, $('#conf'), K('m')); tl.fromTo($('#ry'), { rotation: 0, svgOrigin: '960 560' }, { rotation: 30, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },

  // ================================================================ millionaire
  sleep: { bg: '#3a3a5a', html: () => bzShot(`${imRoom(false)}${imChar('tuco', 'tuco', 420, 820, 1.0)}${imPiles(1400, 960)}`, imSleepZ()),
    anim(tl, s, K, $) { tl.set($('#tuco'), { rotation: -90, transformOrigin: '50% 90%', x: 120, y: -30 }, s.t0); bzFace(tl, $('#tuco'), s.t0, 'closed', 'smile'); for (let i = 0; i < 6; i++) tl.to($(`#pile .p${i}`), { opacity: 1, duration: 0.1 }, s.t0 + 0.3 + i * 0.5);
      tl.fromTo($('#zz .z'), { y: 0, opacity: 0 }, { y: -60, opacity: 1, duration: 1.0, stagger: 0.3, repeat: 2 }, s.t0); } },
  house: { bg: '#5ab0f0', html: () => bzShot(`<g id="small">${imHouse(false)}</g><g id="bigh">${imHouse(true)}</g>${imChar('mae', 'mae', 300, 1000, 1.0)}${imChar('tuco', 'tuco', 470, 1000, 1.05)}`, `${imHud('DIA 23', 'R$ 4 MILHÕES')}${bzFlash('fl', '#fff')}`),
    anim(tl, s, K, $) { imHudIn(tl, $, s); tl.set($('#bigh'), { opacity: 0 }, s.t0); tl.set($('#bigh'), { opacity: 1 }, K('h')); tl.set($('#small'), { opacity: 0 }, K('h')); bzHit(tl, $('#fl'), K('h'), 0.6); bzFace(tl, $('#mae'), K('h'), 'wide', 'o'); bzFace(tl, $('#tuco'), s.t0, 'dot', 'grin'); bzPose(tl, $('#mae'), K('h') + 0.1, { aL: 150, aR: -150 }, 0.2); } },
  uncles: { bg: '#f6c744', html: () => bzShot(`<rect width="1920" height="1080" fill="#f6c744"/>${imChar('tio', 'tio', 600, 1100, 1.45)}${imPhone(1280, 540, 0.95, '37 CHAMADAS', 'TIO ZÉ')}`, imHud('DIA 25', 'R$ 16 MILHÕES')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tio'), s.t0, 'dot', 'grin'); bzPose(tl, $('#tio'), s.t0, { aR: -150 }, 0.2); tl.fromTo($('#tio .aR'), { rotation: -150 }, { rotation: -120, duration: 0.25, yoyo: true, repeat: 7 }, s.t0 + 0.3); bzQuake(tl, $('#phone'), K('r'), s.t1, 5); } },
  reporter: { bg: '#5ab0f0', html: () => bzShot(`${imHouse(true)}${imChar('rep', 'rep', 600, 1000, 1.15)}`, imHud('DIA 27', 'R$ 67 MILHÕES')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzWalk(tl, $('#rep'), s.t0, s.t0 + 1.6, -600, 0); bzFace(tl, $('#rep'), s.t0, 'dot', 'grin'); bzParallax(tl, $, s.t0, s.t1, -80); } },
  live: { bg: '#5ab0f0', html: () => bzShot(`${imZ(1.5, 900, 640, `${imHouse(true)}${imChar('rep', 'rep', 720, 1000, 1.15)}${imChar('tucoRich', 'tuco', 1100, 1000, 1.15, true)}`)}`, imLive('O ADOLESCENTE MAIS RICO DO BAIRRO')),
    anim(tl, s, K, $) { bzFace(tl, $('#rep'), s.t0, 'dot', 'grin'); bzTalk(tl, $('#rep'), 'im_rep', s.t0, s.t1, 'grin', 'open'); bzPose(tl, $('#rep'), s.t0, { aR: -100 }, 0.2); bzFace(tl, $('#tuco'), s.t0, 'wide', 'flat'); } },
  cedo: { bg: '#5ab0f0', html: () => bzShot(imClose('tucoRich', 'tuco', imHouse(true), 2.4), imLive('O SEGREDO DO SUCESSO')),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'half', 'flat'); bzTalk(tl, $('#tuco'), 'im_tuco', s.t0, s.t1, 'grin', 'open'); bzPose(tl, $('#tuco'), s.t0, { aR: -70 }, 0.2); } },
  d30: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imChar('tucoRich', 'tuco', 960, 1060, 1.3)}${imPiles(1500, 980)}`, imHud('DIA 30', 'R$ 536 MILHÕES')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); tl.set($('#pile g'), { opacity: 1 }, s.t0); bzFace(tl, $('#tuco'), s.t0, 'closed', 'smile'); bzFace(tl, $('#tuco'), s.t0 + 1.0, 'wide', 'o'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 960, 520); } },
  mega: { bg: '#2fa04a', html: () => bzShot(`<rect width="1920" height="1080" fill="#2fa04a"/>${bzRays('ry', 960, 540, 16, 1300, '#fff', 0.2)}${imTicket(960, 540, -4)}`, ''),
    anim(tl, s, K, $) { bzPop(tl, $('#cam'), s.t0 + 0.05, 0.4); tl.fromTo($('#ry'), { rotation: 0, svgOrigin: '960 540' }, { rotation: 20, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  twice: { bg: '#2fa04a', html: () => bzShot(`<rect width="1920" height="1080" fill="#2fa04a"/><g id="t1">${imTicket(660, 540, -6)}</g><g id="t2">${imTicket(1260, 540, 6)}</g>`, imSign('x2', 'TODO DIA × 2', 960, 170, BZ.yellow, BZ.ink, -3, 90)),
    anim(tl, s, K, $) { imPop(tl, $('#t2'), s.t0, K('t')); imPop(tl, $('#x2'), s.t0, s.t0 + 0.5); tl.fromTo($('#t1'), { x: 300 }, { x: 0, duration: 0.4 }, K('t')); } },

  // ================================================================ billionaire
  billion: { bg: '#1b1424', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b1424"/>${bzRays('ry', 960, 560, 18, 1300, '#f6c744', 0.3)}${imChar('tucoRich', 'tuco', 960, 1060, 1.3)}`, `${imHud('DIA 31', 'R$ 1 BILHÃO', '#c8a020')}${imSign('bl', 'BILIONÁRIO', 960, 260, BZ.yellow, BZ.ink, -4, 110)}${imNotesRain(30, 11)}`),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'wide', 'grin'); imPop(tl, $('#bl'), s.t0, K('b')); imNotesGo(tl, $('#rainn'), s.t0, s.t1); bzPose(tl, $('#tuco'), K('b'), { aL: 150, aR: -150 }, 0.2); } },
  notfun: { bg: '#3a3a5a', html: () => bzShot(`${imRoom(false)}${imPiles(1460, 980)}${imChar('tucoRich', 'tuco', 760, 1060, 1.3)}`, bzVignette(0.5)),
    anim(tl, s, K, $) { tl.set($('#pile g'), { opacity: 1 }, s.t0); bzFace(tl, $('#tuco'), s.t0, 'half', 'frown'); bzPose(tl, $('#tuco'), s.t0, { hd: -12 }, 0.5); bzIdle(tl, $('#tuco'), s.t0, s.t1); } },
  guards: { bg: '#5ab0f0', html: () => bzShot(`${imStreet()}${imChar('seg', 'g1', 640, 1000, 1.2)}${imChar('tucoRich', 'tuco', 960, 1000, 1.15)}${imChar('seg', 'g2', 1280, 1000, 1.2, true)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#g1'), s.t0, 'angry', 'flat'); bzFace(tl, $('#g2'), s.t0, 'angry', 'flat'); bzFace(tl, $('#tuco'), s.t0, 'half', 'flat'); for (const k of ['#g1', '#tuco', '#g2']) bzWalk(tl, $(k), s.t0, s.t1, -300, 200); bzParallax(tl, $, s.t0, s.t1, 120); } },
  papers: { bg: '#4a3424', html: () => bzShot(`<rect width="1920" height="1080" fill="#e0d8c8"/>${imPaperTower(560, 1000, 20)}${imPaperTower(960, 1000, 22)}${imPaperTower(1360, 1000, 19)}${imChar('tucoRich', 'tuco', 1700, 1000, 1.0, true)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'wide', 'o'); tl.fromTo($('#cam'), { y: 300 }, { y: 0, duration: s.t1 - s.t0, ease: 'sine.inOut' }, s.t0); } },
  biel2: { bg: '#5ab0f0', html: () => bzShot(`${imStreet()}${imChar('biel', 'biel', 760, 1000, 1.25)}<g id="ball"><circle cx="960" cy="960" r="40" fill="#fbf7ef" ${bzO()}/><path d="M940 940 l 20 10 l 20 -10 l -6 24 h -28 z" fill="${BZ.ink}"/></g>`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#biel'), s.t0, 'half', 'frown'); bzIdle(tl, $('#biel'), s.t0, s.t1); tl.fromTo($('#ball'), { x: 0 }, { x: 260, duration: s.t1 - s.t0, ease: 'power1.out' }, s.t0); } },
  pobre: { bg: '#5ab0f0', html: () => bzShot(imClose('biel', 'biel', imStreet(), 2.4, true), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#biel'), s.t0, 'half', 'frown'); bzTalk(tl, $('#biel'), 'im_biel', s.t0, s.t1, 'frown', 'open'); } },
  richest: { bg: '#1b2a44', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b2a44"/>${imBrazil(960, 520, 1.3, '#2a6a3a')}${imPodium(960, 1000)}${imChar('tucoRich', 'tuco', 960, 800, 0.9)}`, imHud('DIA 38', 'R$ 137 BILHÕES', '#c8a020')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'dot', 'grin'); bzPose(tl, $('#tuco'), K('n'), { aL: 160, aR: -160 }, 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 960, 700); } },
  onecoin: { bg: '#fbf7ef', html: () => bzShot(`<rect width="1920" height="1080" fill="#fbf7ef"/>${imCoin(520, 560, 60)}<path d="M640 560 H 900" stroke="${BZ.ink}" stroke-width="12" marker-end=""/><path d="M880 530 l 30 30 l -30 30" stroke="${BZ.ink}" stroke-width="12" fill="none"/>${imPiles(1400, 900)}`, ''),
    anim(tl, s, K, $) { for (let i = 0; i < 6; i++) tl.to($(`#pile .p${i}`), { opacity: 1, duration: 0.1 }, s.t0 + 0.6 + i * 0.3); } },
  trillion: { bg: '#5ab0f0', html: () => bzShot(`<rect width="1920" height="1080" fill="#9ad0f0"/><rect y="440" width="1920" height="640" fill="#a8a8b8"/>${imCars()}`, `${imHud('DIA 41', 'R$ 1 TRILHÃO', '#c8a020')}`),
    anim(tl, s, K, $) { imHudIn(tl, $, s); tl.fromTo($('#cars g'), { scale: 0, transformOrigin: '50% 100%' }, { scale: 1, duration: 0.3, stagger: 0.12, ease: 'back.out(2)' }, s.t0 + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1, 960, 600); } },

  // ================================================================ the twist: inflation
  strange: { bg: '#3a3a5a', html: () => bzShot(imClose('tucoRich', 'tuco', `<rect width="1920" height="1080" fill="#2a2a44"/>${imPiles(960, 1000)}`, 2.2), bzVignette(0.6)),
    anim(tl, s, K, $) { tl.set($('#pile g'), { opacity: 1 }, s.t0); bzFace(tl, $('#tuco'), s.t0, 'half', 'flat'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 960, 420); } },
  scarce: { bg: '#fbf7ef', html: () => bzShot(`<rect width="1920" height="1080" fill="#fbf7ef"/>${imDiamond(560, 520, 2)}${imSand(1360, 760)}`, `${imSign('d1', 'RARO = VALE MUITO', 560, 180, '#3a7aff', '#fff', -3, 70)}${imSign('d2', 'SOBRANDO = VALE NADA', 1360, 180, '#e0302a', '#fff', 3, 70)}`),
    anim(tl, s, K, $) { imPop(tl, $('#d1'), s.t0, s.t0 + 0.3); imPop(tl, $('#d2'), s.t0, s.t0 + 1.2); tl.fromTo($('#cam'), { x: 60 }, { x: -60, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  gdp: { bg: '#1b2a44', html: () => bzShot(`<rect width="1920" height="1080" fill="#1b2a44"/>${imBrazil(620, 560, 1.1)}<g transform="translate(1340 900)"><rect x="-200" y="-380" width="160" height="380" fill="#3aa05a" ${bzO()}/><rect id="tbar" x="40" y="-620" width="160" height="620" fill="#f6c744" ${bzO()}/><text x="-120" y="60" text-anchor="middle" font-family="Anton" font-size="40" fill="#fbf7ef">BRASIL/ANO</text><text x="120" y="60" text-anchor="middle" font-family="Anton" font-size="40" fill="#fbf7ef">TUCO</text></g>`, imHud('DIA 45', 'R$ 17 TRILHÕES', '#c8a020')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); tl.fromTo($('#tbar'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1.4, ease: 'power2.out' }, K('p') - 0.6); } },
  chase: { bg: '#f4e4c4', html: () => bzShot(`${imBakery('R$ 1,00')}${imNotesRain(30, 4)}`, ''),
    anim(tl, s, K, $) { imNotesGo(tl, $('#rainn'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 960, 500); } },
  inflation: { bg: '#1b2a44', html: () => bzShot(`${imChart(30)}`, `${imSign('in', 'INFLAÇÃO', 960, 150, '#e0302a', '#fff', -3, 110)}`),
    anim(tl, s, K, $) { tl.to($('#curve'), { strokeDashoffset: 0, duration: 2.2, ease: 'power3.in' }, s.t0); tl.set($('#curve'), { stroke: '#ff5a4a' }, s.t0); imPop(tl, $('#in'), s.t0, K('i')); } },
  y1993: { bg: '#d8c8a0', html: () => bzShot(`<rect width="1920" height="1080" fill="#d8c8a0"/><rect x="360" y="180" width="1200" height="720" rx="20" fill="#e8dcb8" ${bzO()}/><text x="960" y="420" text-anchor="middle" font-family="Anton" font-size="220" fill="#8a5a3a">1993</text><text x="960" y="640" text-anchor="middle" font-family="Anton" font-size="96" fill="#e0302a">+2.000% NO ANO</text>`, '<rect width="1920" height="1080" fill="#8a6a3a" opacity="0.15"/>'),
    anim(tl, s, K, $) { bzPop(tl, $('#cam'), s.t0, 0.4); bzPush(tl, $('#cam'), s.t0 + 0.4, s.t1, 1, 1.06); } },
  bread: { bg: '#f4e4c4', html: () => bzShot(`${imBakery('')}<g transform="translate(1400 520) rotate(8)">${['1,00', '2,40', '5,70', '9,90', '16,00', '25,00'].map((v, i) => `<text class="pv pv${i}" x="0" y="34" text-anchor="middle" font-family="Anton" font-size="92" fill="#e0302a" opacity="${i ? 0 : 1}">R$ ${v}</text>`).join('')}</g>`, ''),
    anim(tl, s, K, $) { for (let i = 1; i < 6; i++) { const t = s.t0 + ((K('b') - s.t0) * i) / 5; tl.set($(`.pv${i - 1}`), { opacity: 0 }, t); tl.set($(`.pv${i}`), { opacity: 1 }, t); }
      tl.fromTo($('#tag'), { rotation: 0, svgOrigin: '1400 520' }, { rotation: 4, duration: 0.15, yoyo: true, repeat: 9 }, s.t0 + 0.5); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 1300, 500); } },
  mae3: { bg: '#f4e4c4', html: () => bzShot(`${imBakery('R$ 500,00')}${imChar('mae', 'mae', 420, 1260, 1.6)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#mae'), s.t0, 'wide', 'open'); bzTalk(tl, $('#mae'), 'im_mae', s.t0, s.t1, 'o', 'open'); bzPose(tl, $('#mae'), s.t0, { aR: -110 }, 0.2); bzQuake(tl, $('#tag'), s.t0 + 0.3, s.t0 + 1.0, 5); } },
  planet: { bg: '#0e1a33', html: () => bzShot(`<rect width="1920" height="1080" fill="#0e1a33"/>${bzStars(100, 9, 1080)}${imGlobe(1300, 560, 300)}${imChar('tucoRich', 'tuco', 520, 1000, 1.3)}`, imHud('DIA 51', 'MIL TRILHÕES', '#c8a020')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'wide', 'o'); tl.fromTo($('#tuco .mv'), { y: 0 }, { y: -30, duration: 1.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 0.92, 960, 540); } },
  worthless: { bg: '#5ab0f0', html: () => bzShot(`${imStreet()}${imNotesRain(34, 13)}${imChar('tucoRich', 'tuco', 960, 1000, 1.25)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'half', 'frown'); tl.fromTo($('#rainn .nt'), { x: 0, y: 900 }, { x: -2400, y: 600, duration: 3.2, ease: 'none', stagger: { each: 0.06, from: 'random' } }, s.t0); bzParallax(tl, $, s.t0, s.t1, -80); } },

  // ================================================================ the chessboard legend
  legend: { bg: '#2a1e2e', html: () => bzShot(`${imChess()}${imKing(300, 1000, 1.15)}${bzChar('sage', { skin: '#a8683e', beard: '#e8e4dc', hair: { style: 'bald', color: '#e8e4dc' }, top: '#3a5a8a', dress: '#3a5a8a', shoes: '#3a2a1a' }, 1640, 1000, 1.1, true)}`, '<rect width="1920" height="1080" fill="#c8a060" opacity="0.12"/>'),
    anim(tl, s, K, $) { tl.set($('#rice g'), { opacity: 0 }, s.t0); bzFace(tl, $('#king'), s.t0, 'half', 'smile'); bzFace(tl, $('#sage'), s.t0, 'dot', 'smile'); bzPose(tl, $('#sage'), s.t0 + 0.6, { aR: -90 }, 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  grains: { bg: '#2a1e2e', html: () => bzShot(imZ(1.7, 820, 300, imChess()), ''),
    anim(tl, s, K, $) { tl.set($('#rice g'), { opacity: 0 }, s.t0); tl.set($('#rice .r0'), { opacity: 1 }, s.t0 + 0.2); tl.set($('#rice .r1'), { opacity: 1 }, K('a')); tl.set($('#rice .r2'), { opacity: 1 }, K('b')); for (let i = 3; i < 6; i++) tl.set($(`#rice .r${i}`), { opacity: 1 }, K('b') + (i - 2) * 0.35); tl.fromTo($('#cam'), { x: 120 }, { x: -200, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  laugh: { bg: '#2a1e2e', html: () => bzShot(imZ(2.0, 300, 560, `${imChess()}${imKing(300, 1000, 1.15)}`), ''),
    anim(tl, s, K, $) { bzFace(tl, $('#king'), s.t0, 'closed', 'grin'); tl.fromTo($('#king .mv'), { y: 0 }, { y: -12, duration: 0.15, yoyo: true, repeat: 11 }, s.t0); } },
  mountain: { bg: '#5ab0f0', html: () => bzShot(`${bzSky('#5ab0f0', '#d8f0ff')}${imRiceMountain()}${imKing(1500, 1040, 0.6)}`, `${bzNum('q', '9 QUINTILHÕES', 960, 250, BZ.ink, 140)}`),
    anim(tl, s, K, $) { tl.fromTo($('#rm'), { y: 800 }, { y: 0, duration: 1.6, ease: 'power2.out' }, s.t0 + 0.2); bzFace(tl, $('#king'), s.t0, 'wide', 'o'); bzShow(tl, $('#q'), K('q')); bzQuake(tl, $('#cam'), K('q'), K('q') + 0.4, 6); } },
  d64: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imCalc(1300, 560, '9.2233720E18', 0.9)}${imChar('tuco', 'tuco', 640, 1060, 1.3)}`, imHud('DIA 64', '9 QUINTILHÕES', '#c8a020')),
    anim(tl, s, K, $) { imHudIn(tl, $, s); bzFace(tl, $('#tuco'), s.t0, 'dot', 'flat'); bzFace(tl, $('#tuco'), K('e'), 'wide', 'o'); bzQuake(tl, $('#calc-val'), K('e'), K('e') + 0.6, 6); } },

  // ================================================================ the lesson + CTA
  lesson: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imChar('tuco', 'tuco', 720, 1060, 1.3)}${imBook(1250, 820)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'half', 'smile'); bzIdle(tl, $('#tuco'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 960, 560); } },
  jar: { bg: '#f0c8a0', html: () => bzShot(`${imRoom()}${imJar(960, 900)}`, ''),
    anim(tl, s, K, $) { tl.set($('#jarfill .jc'), { opacity: 0 }, s.t0); tl.to($('#jarfill .jc'), { opacity: 1, duration: 0.1, stagger: (s.t1 - s.t0 - 0.6) / 18 }, s.t0 + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 960, 700); } },
  question: { bg: '#3a7aff', html: () => bzShot(`<rect width="1920" height="1080" fill="#3a7aff"/>${[['a', 'DIA 21', 'MILIONÁRIO', '#3aa05a'], ['b', 'DIA 31', 'BILIONÁRIO', '#f6c744'], ['c', 'ATÉ O FIM', '???', '#e0302a']].map(([id, d, v, c], i) => `<g id="${id}"><g transform="translate(${420 + i * 540} 520)"><rect x="-230" y="-220" width="460" height="440" rx="34" fill="${c}" ${bzO('stroke-width="9"')}/><text y="-40" text-anchor="middle" font-family="Anton" font-size="100" fill="${BZ.ink}">${d}</text><text y="110" text-anchor="middle" font-family="Anton" font-size="70" fill="#fbf7ef" stroke="${BZ.ink}" stroke-width="8" paint-order="stroke">${v}</text></g></g>`).join('')}`, ''),
    anim(tl, s, K, $) { imPop(tl, $('#a'), s.t0, K('a')); imPop(tl, $('#b'), s.t0, K('b')); imPop(tl, $('#c'), s.t0, K('c')); } },
  comment: { bg: '#f6c744', html: () => bzShot(`<rect width="1920" height="1080" fill="#f6c744"/>${imCommentBox()}${imChar('tuco', 'tuco', 1700, 1060, 1.0, true)}`, ''),
    anim(tl, s, K, $) { bzPop(tl, $('#cbox'), s.t0 + 0.1); bzFace(tl, $('#tuco'), s.t0, 'dot', 'grin'); bzPose(tl, $('#tuco'), s.t0 + 0.4, { aL: 100 }, 0.3); } },
  next: { bg: '#5ab0f0', html: () => bzShot(`${imStreet()}${imChar('tuco', 'tuco', 960, 1000, 1.3)}`, imSign('nx', 'PRÓXIMO: ENCOLHENDO PELA METADE', 960, 170, '#e0302a', '#fff', -3, 70)),
    anim(tl, s, K, $) { imPop(tl, $('#nx'), s.t0, s.t0 + 0.3); bzFace(tl, $('#tuco'), s.t0, 'dot', 'smile'); tl.to($('#tuco .mv'), { scale: 0.5, svgOrigin: '960 1000', duration: 0.5, ease: 'back.in(2)' }, K('s')); bzFace(tl, $('#tuco'), K('s'), 'wide', 'o'); } },
  'peraí': { bg: '#5ab0f0', html: () => bzShot(`${imStreet()}${imChar('tuco', 'tuco', 960, 1000, 0.55)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tuco'), s.t0, 'wide', 'open'); bzTalk(tl, $('#tuco'), 'im_tuco', s.t0, s.t1, 'o', 'open'); bzPose(tl, $('#tuco'), s.t0, { aL: 150, aR: -150 }, 0.15); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 2.2, 960, 860); } },
});
