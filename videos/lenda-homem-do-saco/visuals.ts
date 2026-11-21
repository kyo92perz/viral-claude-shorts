// <lines>
const HS_LINES = [];
// </lines>
// =====================================================================
//  O HOMEM DO SACO: the shots (Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: the captions sit at y 1190–1400, so faces stay above ~1050 or fill the frame.
//  Heads above the feet: the old man 629*s, the mother 507*s, Ana 391*s, Lucas 310*s.
// =====================================================================
BZ_TALK.lines = HS_LINES;
const hsShot = (body: string, over = '') => svg(`<g id="cam">${body}</g>${over}`);
function hsPush(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, a = 1, b = 1.07, ox = 540, oy = 900) {
  tl.fromTo(sel, { scale: a, svgOrigin: `${ox} ${oy}` }, { scale: b, svgOrigin: `${ox} ${oy}`, duration: t1 - t0, ease: 'none' }, t0);
}
const hsHit = (tl: gsap.core.Timeline, sel: string, t: number, k = 0.7) => tl.fromTo(sel, { opacity: k }, { opacity: 0, duration: 0.3, ease: 'power2.out' }, t);
const hsShow = (tl: gsap.core.Timeline, sel: string, t: number) => { tl.set(sel, { opacity: 1 }, t); bzPop(tl, sel, t, 0.3); };
const hsNum = (id: string, n: string, x: number, y: number, c = '#fff') => `<g id="${id}" opacity="0"><text x="${x}" y="${y}" text-anchor="middle" font-family="Anton" font-size="200" fill="${c}" stroke="${BZ.ink}" stroke-width="12" paint-order="stroke">${n}</text></g>`;
const hsShade = (id: string, k: number, c = '#0f1530') => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="${k}"/>`;
const hsDusk = () => `${bzSky('#e0804a', '#3a2f5a')}`;
// the old man as one group (so he can travel and fade)
const hsManG = (x: number, y: number, s = 1) => `<g id="man">${hsMan(x, y, s)}</g>`;
// his silhouette behind a gate (hat, shoulders, the sack)
const hsSil = (x: number, y: number, s = 1) => `<g id="sil"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-330" rx="150" ry="26" fill="#05060c"/><path d="M-80 -330 Q -80 -440 0 -440 Q 80 -440 80 -330 Z" fill="#05060c"/>
  <circle cx="0" cy="-260" r="80" fill="#05060c"/><path d="M-170 0 Q -160 -180 0 -190 Q 160 -180 170 0 Z" fill="#05060c"/><path d="M110 -200 Q 280 -260 260 -40 Q 200 20 120 -40 Z" fill="#05060c"/>
  <ellipse cx="-28" cy="-262" rx="12" ry="7" fill="#f0e4a0"/><ellipse cx="28" cy="-262" rx="12" ry="7" fill="#f0e4a0"/></g></g>`;

// a street dog (barks: .mouth opens; quiet: ears down)
const hsDog = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-130 -60 q-40 -60 -20 -110" stroke="${BZ.ink}" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M-130 -60 q-40 -60 -20 -110" stroke="#c88a4a" stroke-width="10" fill="none" stroke-linecap="round"/>
  <ellipse cx="-30" cy="-70" rx="130" ry="70" fill="#c88a4a" ${bzO()}/>${[-110, -60, 20, 70].map((lx) => `<rect x="${lx}" y="-30" width="26" height="60" rx="10" fill="#c88a4a" ${bzO('stroke-width="5"')}/>`).join('')}
  <g class="hd"><circle cx="110" cy="-150" r="70" fill="#c88a4a" ${bzO()}/><g class="ears"><path d="M70 -205 l-40 -40 l10 70z M140 -210 l40 -40 l-5 75z" fill="#8a5a2a" ${bzO('stroke-width="5"')}/></g>
  <circle cx="92" cy="-165" r="9" fill="${BZ.ink}"/><circle cx="135" cy="-165" r="9" fill="${BZ.ink}"/><ellipse cx="118" cy="-130" rx="16" ry="11" fill="${BZ.ink}"/>
  <g class="mouth" opacity="0"><path d="M90 -110 q28 40 56 0 z" fill="${BZ.red}" ${bzO('stroke-width="5"')}/></g></g></g></g>`;
// Ana awake in bed: the blanket up to her nose, the window with the moon
const hsBed = () => `<rect width="1080" height="1920" fill="#141a30"/><rect x="560" y="420" width="380" height="460" fill="#24305a" ${bzO('stroke-width="12"')}/><path d="M750 420 v460 M560 650 h380" stroke="${BZ.ink}" stroke-width="12"/>${bzMoon('mn', 690, 530, 50)}
  <rect x="-20" y="1250" width="1120" height="700" fill="#2a2440" ${bzO()}/><rect x="60" y="1060" width="960" height="140" rx="40" fill="#e8e4dc" ${bzO()}/>`;

defineVisuals({
  // ---------------- the hook: the sack, then him
  sack: { bg: '#3a2f5a', html: () => hsShot(`${hsDusk()}<rect y="1300" width="1080" height="640" fill="#2e2a2c"/>${hsSack('sack', 540, 860, 3.0)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { hsWobble(tl, $('#sack'), s.t0, s.t1, 1.2); tl.to($('#sack .peek'), { opacity: 1, duration: 0.08 }, K('peek')); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 800); } },
  title: { bg: '#f29a4a', html: () => hsShot(`${hsStreetFar()}${hsManG(540, 1180, 0.4)}`, `${bzFlash('fl')}${bzSign('tt', 'O HOMEM DO SACO', 540, 420, -4, BZ.yellow, BZ.ink, 110)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { hsWobble(tl, $('#sack'), s.t0, s.t1); bzFace(tl, $('#velho'), s.t0, 'dot', 'grin'); tl.set($('#tt'), { opacity: 0 }, s.t0); hsShow(tl, $('#tt'), K('t')); hsHit(tl, $('#fl'), K('t'), 0.6);
      hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.3, 540, 1000); } },
  // ---------------- that afternoon
  mom: { bg: '#e0804a', html: () => hsShot(`${hsDoor()}${hsMae(620, 1600, 1.2)}${hsAna(240, 1560, 1.35)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#mae'), s.t0, 'angry', 'open'); bzPose(tl, $('#mae'), s.t0 + 0.2, { aR: -140 }, 0.25); bzFace(tl, $('#ana'), s.t0, 'half', 'smile'); bzBlink(tl, $('#ana'), s.t0, s.t1, 1.8);
      tl.fromTo($('#mae .aR'), { rotation: -140 }, { rotation: -120, duration: 0.25, yoyo: true, repeat: 5 }, s.t0 + 0.5); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  lucas: { bg: '#f29a4a', html: () => hsShot(`${hsStreet()}${hsLucas(540, 1480, 1.4)}<circle id="ball" cx="700" cy="1440" r="44" fill="#fff" ${bzO()}/>`, `${hsShade('sh', 0)}${bzSign('nm', 'LUCAS', 300, 470, -4, BZ.yellow, BZ.ink, 110, { text: 'MEU IRMÃO', bg: BZ.red, fg: '#fff' })}`),
    anim(tl, s, K, $) { bzFace(tl, $('#lucas'), s.t0, 'dot', 'grin'); tl.fromTo($('#ball'), { y: 0 }, { y: -260, duration: 0.35, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.35), ease: 'power1.out' }, s.t0);
      bzPose(tl, $('#lucas'), s.t0, { aR: -60 }, 0.01); tl.set($('#nm'), { opacity: 0 }, s.t0); hsShow(tl, $('#nm'), K('n')); tl.to($('#sh'), { opacity: 0.45, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  far: { bg: '#f29a4a', html: () => hsShot(`${hsStreetFar()}<g id="mg" opacity="0">${hsManG(540, 1180, 0.32)}</g>${hsLucas(330, 1470, 1.15)}`, hsShade('sh', 0.4)),
    anim(tl, s, K, $) { bzFace(tl, $('#lucas'), s.t0, 'dot', 'smile'); bzFace(tl, $('#velho'), s.t0, 'dot', 'grin'); tl.to($('#mg'), { opacity: 1, duration: 0.6 }, K('ap') - 0.3);
      hsWobble(tl, $('#sack'), s.t0, s.t1, 0.7); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.25, 540, 1050); } },
  wobble: { bg: '#3a2f5a', html: () => hsShot(`${hsDusk()}<path d="M-100 1940 L-60 1100 Q 0 980 200 960 L260 1940 Z" fill="#2e2a2c" ${bzO()}/>${hsSack('sack', 560, 960, 2.6, 10)}`, `${hsShade('sh', 0.35)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { hsWobble(tl, $('#sack'), s.t0, s.t1, 1.6); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 560, 900); } },
  velho: { bg: '#3a2f5a', html: () => hsShot(`${hsStreet()}${hsManG(470, 1900, 1.45)}`, `${hsShade('sh', 0.45)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#velho'), s.t0, 'dot', 'grin'); bzTalk(tl, $('#velho'), 'hs_velho', s.t0, s.t1, 'grin', 'open'); hsWobble(tl, $('#sack'), s.t0, s.t1);
      bzPose(tl, $('#velho'), s.t0 + 0.2, { pos: -6, aL: 50 }, 0.6); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 470, 900); } },
  ask: { bg: '#3a2f5a', html: () => hsShot(`${hsStreet()}${hsLucas(540, 1700, 2.2)}`, hsShade('sh', 0.45)),
    anim(tl, s, K, $) { bzFace(tl, $('#lucas'), s.t0, 'dot', 'o'); bzTalk(tl, $('#lucas'), 'hs_lucas', s.t0, s.t1, 'o', 'open'); tl.fromTo($('#lucas .hd'), { rotation: 0, transformOrigin: '50% 90%' }, { rotation: -10, duration: 0.5 }, s.t0 + 0.1); } },
  peek: { bg: '#3a2f5a', html: () => hsShot(`${hsDusk()}<rect y="1300" width="1080" height="640" fill="#2e2a2c"/>${hsSack('sack', 540, 900, 3.2)}`, `${bzFlash('fl', BZ.red)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.set($('#sack .peek'), { opacity: 1 }, K('o')); hsWobble(tl, $('#sack'), s.t0, s.t1, 2.4); hsHit(tl, $('#fl'), K('o'), 0.35);
      tl.fromTo($('#sack'), { x: -8 }, { x: 8, duration: 0.05, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.05), ease: 'none' }, s.t0); } },
  shout: { bg: '#3a2f5a', html: () => hsShot(`${hsStreet()}${hsAna(300, 1500, 1.3)}${hsManG(820, 1560, 0.85)}${hsLucas(640, 1560, 0.85)}`, hsShade('sh', 0.45)),
    anim(tl, s, K, $) { bzFace(tl, $('#ana'), s.t0, 'wide', 'open'); bzPose(tl, $('#ana'), s.t0, { aL: 150, aR: -150 }, 0.2); bzShake(tl, $('#ana'), s.t0 + 0.2, s.t0 + 1.2, 3);
      bzFace(tl, $('#velho'), s.t0, 'dot', 'grin'); bzFace(tl, $('#lucas'), s.t0, 'dot', 'o'); hsWobble(tl, $('#sack'), s.t0, s.t1); } },
  turn: { bg: '#3a2f5a', html: () => hsShot(`${hsStreet()}${hsManG(540, 1900, 1.45)}`, `${hsShade('sh', 0.5)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#velho'), s.t0, 'dot', 'flat'); tl.fromTo($('#velho .hd'), { rotation: 0, transformOrigin: '50% 90%' }, { rotation: 160, duration: Math.max(0.5, K('g') - K('c')), ease: 'power1.inOut' }, K('c'));
      tl.to($('#velho .hd'), { rotation: 185, duration: 0.08 }, K('g')); bzFace(tl, $('#velho'), K('g'), 'wide', 'grin'); hsWobble(tl, $('#sack'), s.t0, s.t1, 0.5); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  mae: { bg: '#e0804a', html: () => hsShot(`${hsDoor()}${hsMae(540, 1680, 1.35)}`, hsShade('sh', 0.3)),
    anim(tl, s, K, $) { bzFace(tl, $('#mae'), s.t0, 'angry', 'open'); bzTalk(tl, $('#mae'), 'hs_mae', s.t0, s.t1, 'open', 'open'); bzPose(tl, $('#mae'), s.t0, { aR: -150, aL: 30 }, 0.15); bzShake(tl, $('#mae'), s.t0, s.t1, 3); } },
  // ---------------- he stays, and counts
  run: { bg: '#3a2f5a', html: () => hsShot(`${hsStreet()}${hsManG(180, 1640, 0.95)}${hsLucas(500, 1600, 1.1)}`, hsShade('sh', 0.5)),
    anim(tl, s, K, $) { bzWalk(tl, $('#lucas'), s.t0, s.t1, 0, 800, true); bzFace(tl, $('#lucas'), s.t0, 'wide', 'open'); bzFace(tl, $('#velho'), s.t0, 'dot', 'flat'); hsWobble(tl, $('#sack'), s.t0, s.t1, 0.5); } },
  smile: { bg: '#3a2f5a', html: () => hsShot(`${hsStreet()}${hsVelho(540, 2600, 2.6)}`, `${hsShade('sh', 0.55)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#velho'), s.t0, 'dot', 'flat'); bzFace(tl, $('#velho'), s.t0 + (s.t1 - s.t0) * 0.45, undefined, 'grin'); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 950); } },
  count: { bg: '#0f1530', html: () => hsShot(`${hsStreet(true)}${hsManG(120, 1640, 0.95)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzWalk(tl, $('#man'), s.t0, s.t1, 0, 420); bzPose(tl, $('#velho'), s.t0 + 0.3, { aR: -95 }, 0.3); bzFace(tl, $('#velho'), s.t0, 'dot', 'grin'); hsWobble(tl, $('#sack'), s.t0, s.t1, 0.6); } },
  numbers: { bg: '#0f1530', html: () => hsShot(`${hsStreet(true)}${hsManG(820, 1640, 0.95)}`, `${hsNum('n1', '1', 155, 900)}${hsNum('n2', '2', 425, 900)}${hsNum('n3', '3', 695, 900, BZ.red)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#velho'), s.t0, 'dot', 'grin'); bzTalk(tl, $('#velho'), 'hs_velho', s.t0, s.t1, 'grin', 'open'); hsWobble(tl, $('#sack'), s.t0, s.t1, 0.6);
      ['g1', 'g2', 'g3'].forEach((k, i) => { hsShow(tl, $('#n' + (i + 1)), K(k)); tl.fromTo($(`#gate${i + 1}`), { y: 0 }, { y: -12, duration: 0.06, yoyo: true, repeat: 3 }, K(k)); bzPose(tl, $('#velho'), K(k), { aR: -80 - i * 8 }, 0.15); });
      tl.to($('#man'), { x: 300, opacity: 0, duration: s.t1 - K('bye'), ease: 'power1.in' }, K('bye')); } },
  nobody: { bg: '#f29a4a', html: () => hsShot(`${hsStreet()}`, hsShade('sh', 0.3)),
    anim(tl, s, K, $) { tl.to($('#sh'), { opacity: 0.55, duration: s.t1 - s.t0, ease: 'none' }, s.t0); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 950); } },
  dogs: { bg: '#3a2f5a', html: () => hsShot(`${hsStreet()}${hsDog('dog', 560, 1560, 1.6)}`, `${hsShade('sh', 0.5)}${bzSign('au', 'AU! AU!', 760, 820, 8, '#fff', BZ.ink, 110)}`),
    anim(tl, s, K, $) { const n = Math.floor((K('q') - s.t0) / 0.3); tl.fromTo($('#dog .mouth'), { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: Math.max(1, n * 2 - 1), ease: 'steps(1)' }, s.t0);
      bzPop(tl, $('#au'), s.t0 + 0.1); tl.fromTo($('#au'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: Math.max(1, n * 2 - 1) }, s.t0 + 0.5);
      tl.set($('#au'), { opacity: 0 }, K('q')); tl.set($('#dog .mouth'), { opacity: 0 }, K('q') + 0.01); tl.to($('#dog .ears'), { rotation: 25, transformOrigin: '50% 100%', duration: 0.3 }, K('q')); tl.to($('#dog'), { x: -120, duration: 0.6, ease: 'power2.in' }, K('q') + 0.3); } },
  closer: { bg: '#3a2f5a', html: () => hsShot(`${hsStreet()}${hsManG(760, 1640, 1.0)}${hsLucas(160, 1560, 1.05)}`, hsShade('sh', 0.5)),
    anim(tl, s, K, $) { bzWalk(tl, $('#lucas'), s.t0, s.t1 - 0.3, 0, 300); bzFace(tl, $('#lucas'), s.t0, 'dot', 'o'); bzFace(tl, $('#velho'), s.t0, 'dot', 'grin'); hsWobble(tl, $('#sack'), s.t0, s.t1, 0.8); } },
  untie: { bg: '#3a2f5a', html: () => hsShot(`${hsDusk()}<rect y="1300" width="1080" height="640" fill="#2e2a2c"/>${hsSack('sack', 540, 980, 3.0)}<g id="hand"><circle cx="600" cy="640" r="60" fill="#9aa39a" ${bzO()}/><path d="M640 610 l60 -30 M650 640 l70 -10 M640 672 l60 15" stroke="${BZ.ink}" stroke-width="12" stroke-linecap="round"/></g>`, `${hsShade('sh', 0.4)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { hsWobble(tl, $('#sack'), s.t0, s.t1, 0.8); tl.fromTo($('#hand'), { x: 40, y: -20 }, { x: -40, y: 20, duration: 0.4, yoyo: true, repeat: Math.max(1, Math.floor((K('p') - s.t0) / 0.4)) }, s.t0);
      tl.to($('#hand'), { x: 200, y: -300, opacity: 0, duration: 0.3 }, K('p')); tl.to($('#sack .peek'), { opacity: 1, duration: 0.1 }, K('p') + 0.3); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.2, 540, 700); } },
  awake: { bg: '#141a30', html: () => hsShot(`${hsBed()}${hsAna(380, 1560, 1.6)}<rect x="40" y="1180" width="1000" height="560" rx="60" fill="#5a6aa8" ${bzO()}/>`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#ana'), s.t0, 'wide', 'flat'); tl.fromTo($('#ana .hd'), { rotation: -12, transformOrigin: '50% 90%' }, { rotation: 12, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, s.t0 + 0.3); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 380, 900); } },
  knock: { bg: '#0f1530', html: () => hsShot(`${bzSky('#0f1530', '#3a2f5a')}${bzStars(40, 13, 900)}<rect y="1250" width="1080" height="700" fill="#2e3044"/>${hsGate(540, 1650, 9, '#3a4a6a', 2.8)}`, `${bzSign('tc', 'TOC  TOC  TOC', 540, 600, -4, '#fff', BZ.ink, 110)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.set($('#tc'), { opacity: 0 }, s.t0); [0, 0.32, 0.64].forEach((d) => tl.fromTo($('#gate9'), { x: 0 }, { x: 14, duration: 0.04, yoyo: true, repeat: 1 }, K('k') + d)); hsShow(tl, $('#tc'), K('k')); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1200); } },
  // ---------------- since then
  home: { bg: '#e0804a', html: () => hsShot(`${hsDoor()}${hsMae(540, 1640, 1.15)}${hsAna(150, 1700, 1.1)}${hsLucas(330, 1700, 1.1)}<rect id="panel" x="360" y="790" width="360" height="670" fill="#7a4a2a" ${bzO()}/>`, hsShade('sh', 0.25)),
    anim(tl, s, K, $) { bzFace(tl, $('#ana'), s.t0, 'half', 'flat'); bzFace(tl, $('#lucas'), s.t0, 'half', 'flat'); bzFace(tl, $('#mae'), s.t0, 'half', 'flat');
      bzWalk(tl, $('#ana'), s.t0, K('shut') - 1.0, 0, 380); bzWalk(tl, $('#lucas'), s.t0, K('shut') - 1.0, 0, 220); tl.to($('#ana, #lucas, #mae'), { opacity: 0, duration: 0.3 }, K('shut') - 0.9);
      tl.fromTo($('#panel'), { scaleX: 0, svgOrigin: '360 790' }, { scaleX: 1, svgOrigin: '360 790', duration: 0.4, ease: 'power2.in' }, K('shut') - 0.4); } },
  inside: { bg: '#0f1530', html: () => hsShot(`${bzSky('#0f1530', '#3a2f5a')}${bzStars(40, 11, 900)}<rect y="1250" width="1080" height="700" fill="#2e3044"/>${hsSil(540, 1500, 1.6)}${hsGate(540, 1650, 9, '#3a4a6a', 2.8)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { tl.fromTo($('#sil'), { opacity: 0 }, { opacity: 1, duration: 1.2 }, s.t0 + 0.4); hsPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1100); } },
  you: { bg: '#0f1530', html: () => hsShot(`${hsStreetFar(true)}<g id="fr">${hsManG(540, 1180, 0.3)}</g><g id="near" opacity="0">${hsVelho(540, 2700, 2.9)}</g>`, bzVignette(0.8)),
    anim(tl, s, K, $) { bzFace(tl, $('#near #velho'), s.t0, 'wide', 'grin'); hsWobble(tl, $('#fr #sack'), s.t0, s.t1, 0.6); hsPush(tl, $('#cam'), s.t0, K('hat'), 1, 1.2, 540, 1050);
      tl.set($('#fr'), { opacity: 0 }, K('hat')); tl.set($('#near'), { opacity: 1 }, K('hat')); tl.set($('#cam'), { scale: 1 }, K('hat')); } },
});
