// <lines>
// </lines>
// =====================================================================
//  THE JERSEY DEVIL: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Jake ~415*s.
//  Revealed in parts under the flashlight: hooves, the tail, the wings, then the horse head and its red eyes.
// =====================================================================
BZ_TALK.lines = JD_LINES;
const jdSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const jdClose = (k: string, s: number, bg: string, id = k) => `${bg}${jdChar(k, 540, (k === 'jake' ? 415 : 507) * s + 640, s, false, id)}`;
// the flashlight beam: a pale cone from (x0, y0) to (x1, y1) and a disc where it lands
const jdBeam = (id: string, x0: number, y0: number, x1: number, y1: number, r = 220) => `<g id="${id}"><path d="M${x0} ${y0} L ${x1 - r} ${y1} A ${r} ${r * 0.6} 0 0 0 ${x1 + r} ${y1} Z" fill="#fff8d8" opacity="0.18"/><ellipse cx="${x1}" cy="${y1}" rx="${r}" ry="${r * 0.9}" fill="#fff8d8" opacity="0.22"/></g>`;
// the wings flap (pivot at the shoulders)
function jdFlap(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, d = 0.22) {
  const n = Math.max(1, Math.floor((t1 - t0) / d));
  tl.fromTo(`${sel} .wingR`, { rotation: 10, transformOrigin: '0% 100%' }, { rotation: -25, duration: d, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .wingL`, { rotation: -10, transformOrigin: '100% 100%' }, { rotation: 25, duration: d, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0);
}
const jdSnow = (id: string, seed = 1) => bzParticles(id, 'dust', 40, [0, 0, 1080, 1900], seed);

defineVisuals({
  // ---------------- the hook: red eyes between the pines, frame 1
  hook: { bg: '#060a1a', html: () => bzShot(`${jdWoods(4)}<g id="ey">${bzGlow('eg', 640, 980, 120, '#ff2a1a', 0.5)}<ellipse cx="610" cy="980" rx="16" ry="10" fill="#ff2a1a"/><ellipse cx="670" cy="980" rx="16" ry="10" fill="#ff2a1a"/></g>${jdPine(820, 1350, 1.3)}${jdPine(240, 1380, 1.4)}${jdSnow('sn', 2)}`,
      `${jdSay('hk', "DON'T GO LOOK", 540, 1560, -4, '#c8201a', '#fff', 100)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); tl.fromTo($('#ey'), { opacity: 1 }, { opacity: 0.1, duration: 0.07, yoyo: true, repeat: 1 }, K('h') + 0.4);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 640, 980); bzHandheld(tl, $('#cam'), s.t0, s.t1, 4); } },
  title: { bg: '#060a1a', html: () => bzShot(`${jdWoods(5)}<g id="sil" opacity="0">${jdDevil('jd', 540, 1200, 0.7)}</g>`, `${jdSay('tt', 'THE JERSEY DEVIL', 540, 400, -4, '#c8201a', '#fff', 120)}${bzFlash('fl', '#c8201a')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.set($('#sil'), { opacity: 1 }, K('t')); tl.fromTo($('#sil'), { y: 0 }, { y: -900, duration: 0.6, ease: 'power2.in' }, K('t') + 0.1); jdFlap(tl, $('#jd'), K('t'), s.t1, 0.12);
      tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.4); } },
  // ---------------- the cabin
  cabin: { bg: '#060a1a', html: () => bzShot(`${jdCabin()}${jdSnow('sn', 3)}`, `${jdSay('nm', 'PINE BARRENS, NEW JERSEY', 540, 380, -3, '#fff', BZ.ink, 70)}${jdSay('ns', 'NO SIGNAL', 760, 1560, 4, '#c8201a', '#fff', 70)}`),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); tl.fromTo($('#smk circle'), { y: 0, opacity: 0.5 }, { y: -80, opacity: 0, duration: 2, stagger: 0.5, repeat: 3 }, s.t0);
      tl.set($('#nm') + ', ' + $('#ns'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), s.t0 + 0.3); bzShow(tl, $('#ns'), K('n')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 400, 1000); } },
  ray: { bg: '#7a5034', html: () => bzShot(jdClose('ray', 2.0, jdInside()), `${bzGlow('fire', 900, 1500, 420, '#ffb050', 0.3)}<g id="chim" opacity="0">${[0, 1, 2].map((i) => `<path d="M${200 + i * 80} 600 q 30 -60 0 -120" stroke="#2a1a14" stroke-width="16" fill="none" stroke-linecap="round"/>`).join('')}</g>`),
    anim(tl, s, K, $) { bzFace(tl, $('#ray'), s.t0, 'half', 'grin'); bzTalk(tl, $('#ray'), 'us_man', s.t0, s.t1, 'grin', 'open'); bzBlink(tl, $('#ray'), s.t0, s.t1); bzPose(tl, $('#ray'), K('w') - 0.2, { aR: -160 }, 0.3);
      tl.fromTo($('#fire'), { opacity: 0.7 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.2) }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 650); } },
  dog: { bg: '#7a5034', html: () => bzShot(`${jdInside()}${jdDog('dog', 380, 1620, 1.2)}${jdChar('jake', 820, 1700, 1.05, true)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#jake'), s.t0, 'dot', 'smile'); bzFace(tl, $('#jake'), K('g'), 'wide', 'flat'); tl.fromTo($('#dog .jaw'), { rotation: 0 }, { rotation: 14, svgOrigin: '160 -152', duration: 0.1, yoyo: true, repeat: Math.floor((s.t1 - K('g')) / 0.1) }, K('g'));
      bzShake(tl, $('#dog'), K('g'), s.t1, 2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 700); } },
  scream: { bg: '#060a1a', html: () => bzShot(`${jdWoods(6)}${jdPine(540, 1500, 1.6)}${jdSnow('sn', 4)}`, `${jdSay('ah', 'AAAAAH', 540, 640, -6, '#fff', '#c8201a', 130)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); tl.set($('#ah'), { opacity: 0 }, s.t0); bzShow(tl, $('#ah'), K('s')); bzShake(tl, $('#ah'), K('s'), K('s') + 1.2, 6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 900); } },
  // ---------------- the flashlight on the shed
  flash: { bg: '#060a1a', html: () => bzShot(`${jdCabin()}${jdChar('ray', 560, 1640, 0.9)}<g id="bm" opacity="0">${jdBeam('b', 600, 1260, 870, 1030, 140)}</g>${jdChar('jake', 200, 1560, 0.7)}${jdSnow('sn', 5)}`, bzVignette(0.65)),
    anim(tl, s, K, $) { bzWalk(tl, $('#ray'), s.t0, K('c'), -200, 0); bzFace(tl, $('#jake'), s.t0, 'wide', 'flat'); bzPose(tl, $('#ray'), K('c'), { aR: -120 }, 0.2); tl.set($('#bm'), { opacity: 1 }, K('c'));
      bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 700, 1100); } },
  parts: { bg: '#060a1a', html: () => bzShot(`<g transform="translate(-1722 -1578) scale(2.6)">${jdCabin()}${jdDevil('jd', 870, 1030, 0.42)}${jdBeam('b', 600, 1260, 870, 1030, 140)}</g>`, `<rect id="dk" width="1080" height="1920" fill="#000" opacity="0.55"/>${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.set($('#jd .tail') + ', ' + $('#jd .wingL') + ', ' + $('#jd .wingR') + ', ' + $('#jd .head') + ', ' + $('#jd .body'), { opacity: 0 }, s.t0);
      tl.to($('#dk'), { opacity: 0.2, duration: 0.3 }, K('h')); tl.fromTo($('#cam'), { x: 0, y: 0 }, { x: -60, y: 260, duration: 0.4 }, K('h') - 0.2);
      tl.to($('#jd .body') + ', ' + $('#jd .tail'), { opacity: 1, duration: 0.2 }, K('t')); tl.to($('#cam'), { x: -200, y: 160, duration: 0.4 }, K('t') - 0.2);
      tl.to($('#jd .wingL') + ', ' + $('#jd .wingR'), { opacity: 1, duration: 0.2 }, K('w')); tl.to($('#cam'), { x: 0, y: 0, scale: 0.85, svgOrigin: '540 900', duration: 0.5 }, K('w') - 0.2); jdFlap(tl, $('#jd'), K('w'), s.t1, 0.5); } },
  head: { bg: '#060a1a', html: () => bzShot(`${jdWoods(7, false)}<g transform="translate(-160 -150)">${jdDevil('jd', 640, 2300, 2.4)}</g>`, `${bzFlash('fl', '#c8201a')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { tl.set($('#jd .eyes'), { opacity: 0 }, s.t0); tl.fromTo($('#cam'), { y: 400 }, { y: 0, duration: K('h') - s.t0 + 0.6, ease: 'power1.inOut' }, s.t0); tl.to($('#jd .eyes'), { opacity: 1, duration: 0.08 }, K('e'));
      bzHit(tl, $('#fl'), K('e'), 0.4); tl.to($('#cam'), { scale: 1.3, svgOrigin: '500 800', duration: 0.3, ease: 'power3.out' }, K('e')); jdFlap(tl, $('#jd'), s.t0, s.t1, 0.6); } },
  inside: { bg: '#060a1a', html: () => bzShot(jdClose('ray', 2.2, `${jdWoods(8)}`), `${bzGlow('fl2', 760, 1200, 300, '#fff8d8', 0.3)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#ray'), s.t0, 'wide', 'open'); bzTalk(tl, $('#ray'), 'us_man', s.t0, s.t1, 'open', 'open'); bzPose(tl, $('#ray'), s.t0, { aL: 150 }, 0.15); bzShake(tl, $('#cam'), s.t0, s.t1, 7); } },
  fly: { bg: '#060a1a', html: () => bzShot(`${jdCabin()}${jdDevil('jd', 870, 1030, 0.42)}${jdSnow('sn', 9)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { jdFlap(tl, $('#jd'), s.t0, s.t1, 0.12); tl.to($('#jd'), { x: -300, y: -1200, scale: 0.4, svgOrigin: '870 1030', duration: 1.2, ease: 'power2.in' }, K('j')); bzShake(tl, $('#cam'), K('j'), K('j') + 0.6, 8);
      bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); tl.fromTo($('#cam'), { scale: 1 }, { scale: 1.1, svgOrigin: '540 900', duration: s.t1 - s.t0 }, s.t0); } },
  // ---------------- the morning
  roof: { bg: '#c8d8ec', html: () => bzShot(jdRoof(), `${jdSay('mn', 'THE NEXT MORNING', 540, 380, -3, '#fff', BZ.ink, 80)}${bzVignette(0.4)}`),
    anim(tl, s, K, $) { for (let i = 0; i < 8; i++) tl.fromTo($('#hp' + i), { opacity: 0 }, { opacity: 1, duration: 0.1 }, K('p') + i * 0.3); bzPop(tl, $('#mn'), s.t0 + 0.1);
      tl.fromTo($('#cam'), { x: 0, y: 0 }, { x: -300, y: 500, duration: s.t1 - s.t0, ease: 'sine.inOut' }, s.t0); tl.to($('#cam'), { scale: 1.3, svgOrigin: '860 600', duration: 0.6 }, K('c') - 0.3); } },
  // ---------------- the end: red eyes in the pines again (loops into the hook)
  end: { bg: '#060a1a', html: () => bzShot(`${jdWoods(4)}<g id="ey" opacity="0">${bzGlow('eg', 640, 980, 120, '#ff2a1a', 0.5)}<ellipse cx="610" cy="980" rx="16" ry="10" fill="#ff2a1a"/><ellipse cx="670" cy="980" rx="16" ry="10" fill="#ff2a1a"/></g>${jdPine(820, 1350, 1.3)}${jdPine(240, 1380, 1.4)}${jdSnow('sn', 2)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzParticlesGo(tl, $('#sn'), 'dust', s.t0, s.t1); tl.to($('#ey'), { opacity: 1, duration: 0.1 }, K('s')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 640, 980); } },
});
