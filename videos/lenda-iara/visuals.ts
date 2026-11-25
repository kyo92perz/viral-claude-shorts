// <lines>
const IA_LINES: { who: string; t0: number; t1: number }[] = [];
// </lines>
// =====================================================================
//  A IARA: the shots (detailed Brasil Z toon look). Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: Tiago 531*s, the Iara 507*s, Bruna 400*s.
//  The river always moves: the moon's reflection trembles (iaShimmer), ripples grow, mist drifts, fireflies blink.
// =====================================================================
BZ_TALK.lines = IA_LINES;
// music notes rising from the water (ids n0..n4)
const iaNotes = (x: number, y: number) => [0, 1, 2, 3, 4].map((i) => `<g id="nt${i}" opacity="0"><g transform="translate(${x + (i % 2 ? 80 : -60) + i * 20} ${y - i * 40}) rotate(${(i % 2 ? 10 : -10)})"><ellipse cx="0" cy="0" rx="22" ry="16" fill="#c8ffe0" ${bzO('stroke-width="5"')} transform="rotate(-20)"/><path d="M18 -4 V -90 q 30 10 36 40" stroke="#c8ffe0" stroke-width="9" fill="none"/></g></g>`).join('');
function iaNotesGo(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  for (let i = 0; i < 5; i++) tl.fromTo(`${sel} #nt${i}`, { opacity: 0, y: 0 }, { opacity: 1, y: -260, duration: 1.6, ease: 'sine.out', repeat: Math.max(0, Math.floor((t1 - t0) / 1.6) - 1) }, t0 + i * 0.32);
}
// two pale hands with long fingers rising from the water at x (waterline wl)
const iaHands = (x: number, wl: number) => `<g id="hands">${[-90, 90].map((d) => `<g transform="translate(${x + d} ${wl}) rotate(${d > 0 ? 12 : -12})"><rect x="-34" y="-40" width="68" height="200" rx="30" fill="#b8a898" ${bzO()}/>${[-24, -8, 8, 24].map((fx) => `<rect x="${fx - 8}" y="-140" width="16" height="110" rx="8" fill="#b8a898" ${bzO('stroke-width="5"')}/>`).join('')}</g>`).join('')}</g>`;
// under the water looking up: the moon a bright disc far above, the canoe a dark shape on the surface
const iaUpView = () => `${bzSky('#1a3a3a', '#030806')}<ellipse cx="540" cy="160" rx="420" ry="120" fill="#c8e8e0" opacity="0.25"/>${bzRays('ury', 540, 60, 5, 1900, '#d8fff0', 0.08)}
  <g id="hull"><path d="M260 240 Q 540 330 820 240 Q 540 260 260 240 Z" fill="#050a08" ${bzO()}/><path d="M760 250 L 700 520" stroke="#050a08" stroke-width="18"/></g>`;
// the muddy river bank at night
const iaBank = () => `${iaRiver(900, 820, 300)}<path d="M-20 1300 Q 300 1220 600 1280 T 1100 1260 L1100 1940 L-20 1940 Z" fill="#3a2e24" ${bzO()}/>
  ${[[120, 1360], [880, 1380]].map(([x, y]) => `<path d="M${x} ${y} q -40 -80 10 -160 M${x + 20} ${y} q 40 -60 0 -140" stroke="#2a1e16" stroke-width="16" fill="none"/>`).join('')}<path d="M300 1500 h200 M640 1600 h160" stroke="#4a3a2a" stroke-width="10" stroke-linecap="round"/>`;
// their house inside: the plate of fish nobody eats, the empty hammock
const iaHouse = () => `<rect width="1080" height="1920" fill="#5a4030"/>${[...Array(9)].map((_, i) => `<path d="M${i * 130} 0 V1920" stroke="#4a3424" stroke-width="8"/>`).join('')}${bzGlow('lmp', 820, 600, 400, '#ffc860', 0.35)}
  <path d="M60 760 Q 400 1000 740 760" stroke="${BZ.ink}" stroke-width="14" fill="none"/><path d="M90 780 Q 400 1020 710 780 Q 400 900 90 780 Z" fill="#c8542c" ${bzO()}/><rect y="1300" width="1080" height="640" fill="#6a4a30" ${bzO()}/>
  <rect x="200" y="1360" width="680" height="40" fill="#8a5a2a" ${bzO()}/><ellipse cx="540" cy="1350" rx="170" ry="40" fill="#f4f2ea" ${bzO()}/><g transform="translate(540 1335)"><path d="M-110 0 Q -20 -50 70 0 Q -20 40 -110 0 Z M70 0 l 50 -30 v 60 z" fill="#8a9aa8" ${bzO('stroke-width="5"')}/><circle cx="-80" cy="-6" r="6" fill="${BZ.ink}"/></g>`;
const iaSay = (id: string, txt: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, txt, x, y, rot, bg, fg, size);
// the canoe with Tiago standing in it
const iaCanoeTiago = (x: number, y: number, s: number) => iaCanoe('cn', x, y, s, iaTiago(-40, -10, 0.85));

defineVisuals({
  // ---------------- the hook: her eyes at the waterline at frame 1
  hook: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1000)}${iaSurfaceFace(540, 1000, 2.6)}${iaRipples('rp', 540, 1010)}${bzParticles('ff', 'fireflies', 16, [0, 500, 1080, 980], 2)}`, `${iaSay('hk', 'NÃO RESPONDA', 540, 1540, -4, BZ.red, '#fff', 110)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#iara'), s.t0, 'glow', 'flat'); bzHook(tl, $('#hk'), s.t0); iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 960); } },
  title: { bg: '#0b1028', html: () => bzShot(`${iaRiver()}${[0, 1, 2, 3].map((i) => `<path d="M${380 + i * 40} 1320 q ${-40 + i * 20} 120 ${-80 + i * 50} 260" stroke="#14121a" stroke-width="22" fill="none" stroke-linecap="round"/>`).join('')}${iaRipples('rp', 460, 1320)}`, `${iaSay('tt', 'A IARA', 540, 380, -4, BZ.yellow, BZ.ink, 140)}${bzFlash('fl', '#c8ffe0')}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 460, 1300); } },
  // ---------------- Tiago
  tiago: { bg: '#f29a4a', html: () => bzShot(`${iaRiver(1100, 300, 900)}<rect width="1080" height="1920" fill="#f29a4a" opacity="0.28"/>${iaCanoeTiago(540, 1420, 1.3)}`, iaSay('nm', 'TIAGO', 540, 360, -4, BZ.yellow, BZ.ink, 120, )),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'dot', 'smile'); bzIdle(tl, $('#tiago'), s.t0, s.t1); iaShimmer(tl, $(''), s.t0, s.t1); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), K('n')); tl.fromTo($('#cn'), { y: -8 }, { y: 8, duration: 1.1, yoyo: true, repeat: 3, ease: 'sine.inOut' }, s.t0); } },
  forte: { bg: '#f29a4a', html: () => bzShot(`${iaRiver(1100, 300, 900)}<rect width="1080" height="1920" fill="#f29a4a" opacity="0.28"/>${iaTiago(540, 1800, 1.9)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'closed', 'grin'); bzPose(tl, $('#tiago'), s.t0 + 0.1, { aL: 150, aR: -150 }, 0.25); bzBlink(tl, $('#tiago'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 540, 900); } },
  night: { bg: '#0b1028', html: () => bzShot(`${iaRiver()}${iaCanoeTiago(540, 1340, 0.8)}${iaRipples('rp', 540, 1350)}${bzParticles('ff', 'fireflies', 18, [0, 600, 1080, 1100], 4)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); tl.fromTo($('#cn'), { x: -200 }, { x: 300, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      tl.fromTo($('#cn .paddle'), { rotation: -14, svgOrigin: '80 -220' }, { rotation: 14, svgOrigin: '80 -220', duration: 0.6, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.6) }, s.t0); } },
  pier: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1250, 860, 300)}${iaPier()}${iaBruna(520, 1250, 1.05)}${bzParticles('ff', 'fireflies', 14, [0, 700, 1080, 1250], 6)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzFace(tl, $('#bruna'), s.t0, 'dot', 'flat'); bzIdle(tl, $('#bruna'), s.t0, s.t1); iaShimmer(tl, $(''), s.t0, s.t1); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1);
      tl.fromTo($('#lamp'), { opacity: 0.9 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.15) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 520, 1000); } },
  // ---------------- the song
  music: { bg: '#0b1028', html: () => bzShot(`${iaRiver()}${iaCanoeTiago(700, 1340, 0.6)}${iaRipples('rp', 380, 1400)}${iaNotes(380, 1380)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); iaNotesGo(tl, $(''), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1300); } },
  voice: { bg: '#0b1028', html: () => bzShot(`<g transform="translate(-540 -1350) scale(2)">${iaRiver()}</g>${iaRipples('rp', 540, 1100)}${iaNotes(540, 1000)}${bzGlow('wg', 540, 1120, 320, '#6aff9a', 0.18)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); iaNotesGo(tl, $(''), s.t0, s.t1); tl.fromTo($('#wg'), { opacity: 0.4 }, { opacity: 1, duration: 0.8, yoyo: true, repeat: 3 }, s.t0); } },
  below: { bg: '#030806', html: () => bzShot(`${iaUpView()}${bzParticles('bb', 'bubbles', 20, [200, 700, 880, 1900], 3)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#bb'), 'bubbles', s.t0, s.t1); tl.fromTo($('#hull'), { x: -20 }, { x: 20, duration: 1.2, yoyo: true, repeat: 2, ease: 'sine.inOut' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 300); } },
  ouvindo: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1250)}${iaTiago(540, 2000, 2.1)}`, `${bzGlow('wg', 540, 1500, 500, '#6aff9a', 0.12)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'wide', 'smile'); bzTalk(tl, $('#tiago'), 'ia_tiago', s.t0, s.t1, 'smile', 'open'); bzPose(tl, $('#tiago'), s.t0 + 0.3, { aR: -110 }, 0.3); iaShimmer(tl, $(''), s.t0, s.t1); } },
  shout: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1250, 860, 300)}${iaPier()}${iaBruna(520, 1250, 1.2)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzFace(tl, $('#bruna'), s.t0, 'wide', 'open'); bzPose(tl, $('#bruna'), s.t0, { aL: 150, aR: -150 }, 0.2); bzShake(tl, $('#bruna'), s.t0 + 0.2, s.t0 + 1.4, 3); iaShimmer(tl, $(''), s.t0, s.t1); bzHandheld(tl, $('#cam'), s.t0, s.t1, 5); } },
  rowing: { bg: '#0b1028', html: () => bzShot(`${iaRiver()}${iaCanoeTiago(540, 1340, 0.8)}${iaRipples('rp', 540, 1350)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'half', 'smile'); iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); tl.fromTo($('#cn'), { scale: 1.1, transformOrigin: '50% 100%' }, { scale: 0.75, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      tl.fromTo($('#cn .paddle'), { rotation: -14, svgOrigin: '80 -220' }, { rotation: 14, svgOrigin: '80 -220', duration: 0.6, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.6) }, s.t0); } },
  glazed: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1250)}${iaTiago(540, 2150, 2.4)}`, `${bzGlow('wg', 540, 900, 400, '#6aff9a', 0.15)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'half', 'flat'); bzFace(tl, $('#tiago'), K('s') - 0.1, 'glow', 'grin'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 880); } },
  // ---------------- her
  hair: { bg: '#0b1028', html: () => bzShot(`<g transform="translate(-540 -1300) scale(2)">${iaRiver()}</g><g id="strands">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${540 + (i - 3) * 30} 1060 q ${(i - 3) * 60} 200 ${(i - 3) * 140} 500" stroke="#14121a" stroke-width="26" fill="none" stroke-linecap="round"/>`).join('')}</g>${iaRipples('rp', 540, 1060)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); tl.fromTo($('#strands'), { scaleY: 0.1, transformOrigin: '50% 0%', opacity: 0 }, { scaleY: 1, opacity: 1, duration: 1.6, ease: 'power1.out' }, s.t0 + 0.3);
      tl.fromTo($('#strands path'), { x: -6 }, { x: 6, duration: 0.7, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.7), stagger: 0.1, ease: 'sine.inOut' }, s.t0); } },
  eyes: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1000)}<g id="rise">${iaSurfaceFace(540, 1000, 2.6)}</g>${iaRipples('rp', 540, 1010)}`, `${bzFlash('fl', '#6aff9a')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#iara'), s.t0, 'closed', 'flat'); bzFace(tl, $('#iara'), K('e') - 0.2, 'glow', 'flat'); bzHit(tl, $('#fl'), K('e'), 0.25); iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 900); } },
  vem: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1100)}${iaSurfaceFace(540, 1100, 3.2)}${iaRipples('rp', 540, 1110)}`, `${bzGlow('wg', 540, 900, 500, '#6aff9a', 0.12)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#iara'), s.t0, 'glow', 'smile'); bzTalk(tl, $('#iara'), 'ia_iara', s.t0, s.t1, 'smile', 'o'); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); } },
  lean: { bg: '#0b1028', html: () => bzShot(`${iaRiver()}${iaCanoeTiago(540, 1340, 1.0)}${iaRipples('rp', 380, 1360)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'glow', 'smile'); bzPose(tl, $('#tiago'), s.t0 + 0.2, { pos: -28, aL: 60, aR: 40 }, 1.0); iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 400, 1300); } },
  grab: { bg: '#0b1028', html: () => bzShot(`${iaRiver()}${iaCanoeTiago(540, 1340, 1.0)}<g id="hd2">${iaHands(380, 1380)}</g>${bzParticles('sp', 'bubbles', 14, [250, 1250, 520, 1450], 8)}`, `${bzFlash('fl', '#fff')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'wide', 'open'); bzPose(tl, $('#tiago'), s.t0, { pos: -28, aL: 60, aR: 40 }, 0.01); tl.fromTo($('#hd2'), { y: 260 }, { y: 0, duration: 0.25, ease: 'power3.out' }, K('g') - 0.25);
      tl.to($('#tiago'), { x: -200, y: 200, rotation: -40, opacity: 0, duration: 0.4, ease: 'power2.in' }, K('g') + 0.1); tl.to($('#hd2'), { y: 300, duration: 0.4 }, K('g') + 0.2); bzHit(tl, $('#fl'), K('g'), 0.5); bzQuake(tl, $('#cam'), K('g'), K('g') + 0.4, 8);
      tl.fromTo($('#cn'), { rotation: 0, svgOrigin: '540 1340' }, { rotation: 8, svgOrigin: '540 1340', duration: 0.2, yoyo: true, repeat: 3 }, K('g')); bzParticlesGo(tl, $('#sp'), 'bubbles', K('g'), s.t1); } },
  jump: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1250, 860, 300)}${iaPier()}${iaBruna(520, 1250, 1.1)}${iaRipples('rp', 700, 1500)}`, `${bzFlash('fl', '#fff')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#bruna'), s.t0, 'angry', 'open'); tl.to($('#bruna'), { x: 220, y: 300, rotation: 70, transformOrigin: '50% 50%', duration: 0.5, ease: 'power2.in' }, K('j') - 0.5); tl.set($('#bruna'), { opacity: 0 }, K('j'));
      iaRipplesGo(tl, $('#rp'), K('j'), s.t1); bzHit(tl, $('#fl'), K('j'), 0.4); iaShimmer(tl, $(''), s.t0, s.t1); } },
  pull: { bg: '#06120e', html: () => bzShot(`${iaUnder()}${iaTiago(600, 1700, 1.2)}${iaBruna(420, 1400, 1.1)}${bzParticles('bb', 'bubbles', 26, [200, 700, 900, 1900], 9)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'closed', 'o'); bzFace(tl, $('#bruna'), s.t0, 'angry', 'o'); bzPose(tl, $('#bruna'), s.t0, { aR: -60, aL: 150 }, 0.2); bzPose(tl, $('#tiago'), s.t0, { aL: 160, aR: -160 }, 0.2);
      tl.fromTo($('#tiago, #bruna'), { y: 120 }, { y: -160, duration: s.t1 - s.t0, ease: 'power1.inOut' }, s.t0); bzParticlesGo(tl, $('#bb'), 'bubbles', s.t0, s.t1); } },
  reveal: { bg: '#06120e', html: () => bzShot(`${iaUnder()}${iaIara(540, 1560, 1.45)}${bzParticles('bb', 'bubbles', 30, [0, 400, 1080, 1900], 6)}`, `${bzFlash('fl', '#6aff9a')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#iara'), s.t0, 'glow', 'smile'); bzFace(tl, $('#iara'), K('f'), undefined, 'fangs'); bzHit(tl, $('#fl'), K('f'), 0.35); bzParticlesGo(tl, $('#bb'), 'bubbles', s.t0, s.t1);
      tl.fromTo($('#iara .mv'), { y: -12 }, { y: 12, duration: 0.9, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.9), ease: 'sine.inOut' }, s.t0); bzPush(tl, $('#cam'), s.t0, K('f'), 1, 1.1, 540, 1100); tl.to($('#cam'), { scale: 1.7, svgOrigin: '540 820', duration: 0.3, ease: 'power3.out' }, K('f')); } },
  // ---------------- after
  bank: { bg: '#0b1028', html: () => bzShot(`${iaBank()}<g transform="rotate(-80 640 1560)">${iaTiago(640, 1560, 1.0)}</g>${iaBruna(360, 1560, 1.15)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#bruna'), s.t0, 'wide', 'open'); bzFace(tl, $('#tiago'), s.t0, 'closed', 'flat'); bzShake(tl, $('#bruna'), s.t0, s.t1, 2); iaShimmer(tl, $(''), s.t0, s.t1); bzPose(tl, $('#bruna'), s.t0, { aR: -70 }, 0.2); } },
  stare: { bg: '#0b1028', html: () => bzShot(`${iaBank()}${iaTiago(540, 2150, 2.3)}`, `${bzGlow('wg', 540, 900, 400, '#6aff9a', 0.1)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'half', 'flat'); iaShimmer(tl, $(''), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 900); } },
  fish: { bg: '#5a4030', html: () => bzShot(`${iaHouse()}${iaTiago(540, 1360, 1.2)}`, iaSay('nd', 'NÃO COME • NÃO DORME', 540, 360, -3, '#fff', BZ.ink, 80)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'half', 'flat'); bzIdle(tl, $('#tiago'), s.t0, s.t1); bzPop(tl, $('#nd'), s.t0 + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 1200); } },
  trapiche: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1250, 860, 300)}${iaPier()}<g style="filter:brightness(0.35)">${iaTiago(560, 1250, 1.1)}</g>${bzParticles('ff', 'fireflies', 14, [0, 700, 1080, 1250], 3)}`, `${iaSay('md', 'TODA MADRUGADA', 540, 360, -3, '#fff', BZ.ink, 90)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'glow', 'flat'); iaShimmer(tl, $(''), s.t0, s.t1); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); bzPop(tl, $('#md'), s.t0 + 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 560, 1000); } },
  sing: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1250)}${iaTiago(540, 2150, 2.4)}${iaNotes(760, 900)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'closed', 'o'); iaNotesGo(tl, $(''), s.t0, s.t1); tl.fromTo($('#tiago .hd'), { rotation: -6, transformOrigin: '50% 90%' }, { rotation: 6, duration: 0.8, yoyo: true, repeat: 3, ease: 'sine.inOut' }, s.t0); } },
  voz: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1000)}${iaTiago(540, 1900, 2.0)}<g opacity="0.55" transform="translate(0 1060) scale(1 -1) translate(0 -1060)" id="refl">${iaIara(540, 1900, 2.0)}</g>`, `${bzFlash('fl', '#6aff9a')}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#tiago'), s.t0, 'closed', 'o'); bzFace(tl, $('#tiago'), K('v'), 'glow', 'o'); bzFace(tl, $('#iara'), s.t0, 'glow', 'smile'); tl.fromTo($('#refl'), { opacity: 0 }, { opacity: 0.55, duration: 0.6 }, K('v') - 0.3); bzHit(tl, $('#fl'), K('v'), 0.25); iaShimmer(tl, $(''), s.t0, s.t1); } },
  you: { bg: '#0b1028', html: () => bzShot(`${iaRiver(1000)}<g id="rise" opacity="0">${iaSurfaceFace(540, 1000, 2.6)}</g>${iaRipples('rp', 540, 1010)}${bzParticles('ff', 'fireflies', 16, [0, 500, 1080, 980], 7)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { bzFace(tl, $('#iara'), s.t0, 'glow', 'fangs'); iaShimmer(tl, $(''), s.t0, s.t1); iaRipplesGo(tl, $('#rp'), s.t0, s.t1); bzParticlesGo(tl, $('#ff'), 'fireflies', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 960); tl.set($('#rise'), { opacity: 1 }, K('end')); } },
});
