// <lines>
// </lines>
// =====================================================================
//  O PAPA-FIGO: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Davi ~400*s, Caio ~330*s.
//  Revealed in parts: the sack, the back in the cape, the yellow skin, the ears, the moving sack; the end is a voice.
// =====================================================================
BZ_TALK.lines = PF_LINES;
const pfSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const pfClose = (k: string, s: number, bg: string, id = k) => `${bg}${pfChar(k, 540, (k === 'vo' || k === 'papa' ? 507 * (k === 'papa' ? 1.12 : 1) : k === 'caio' ? 330 : 400) * s + 640, s, false, id)}`;
const pfWiggle = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number) => tl.fromTo(`${sel} .bulge`, { x: -14, y: 0 }, { x: 14, y: -16, duration: 0.18, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.18)), ease: 'sine.inOut' }, t0);

defineVisuals({
  // ---------------- the hook: the sack on the cobblestones moves, frame 1
  hook: { bg: '#e86a3a', html: () => bzShot(`${pfStreet()}${pfSack('sk', 540, 1720, 1.6)}<g id="cape"><path d="M760 1960 L 820 1100 Q 900 1060 980 1100 L 1100 1960 Z" fill="#141016" ${bzO()}/></g>`, `${pfSay('hk', 'NUNCA ACEITE DOCE', 540, 1560, -4, '#e8d23a', BZ.ink, 92)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); pfWiggle(tl, $('#sk'), s.t0 + 0.8, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1500); bzHandheld(tl, $('#cam'), s.t0, s.t1, 3); } },
  title: { bg: '#e86a3a', html: () => bzShot(`${pfStreet()}<g id="pp">${pfChar('papa', 820, 1700, 1.2, true)}${pfSack('sk', 700, 1500, 0.7)}</g>`, `${pfSay('tt', 'O PAPA-FIGO', 540, 380, -4, '#e8d23a', BZ.ink, 130)}${bzFlash('fl', '#e8d23a')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#papa'), s.t0, 'half', 'flat'); bzWalk(tl, $('#papa'), s.t0, s.t1, 0, -120); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.35); } },
  // ---------------- the rule
  street: { bg: '#e86a3a', html: () => bzShot(`${pfStreet()}${pfChar('papa', 860, 1640, 0.8, true)}${pfSack('sk', 760, 1500, 0.45)}${pfChar('caio', 300, 1700, 1.0)}${pfChar('davi', 470, 1700, 1.0)}`, `${pfSay('nm', 'RECIFE', 540, 360, -3, '#fff', BZ.ink, 100)}${pfSay('bl', 'BALINHA?', 820, 900, 5, '#e8d23a', BZ.ink, 70)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#papa'), s.t0, 'half', 'grin'); bzPose(tl, $('#papa'), s.t0 + 0.4, { aR: -80 }, 0.3); bzFace(tl, $('#caio'), s.t0, 'dot', 'smile'); bzFace(tl, $('#davi'), s.t0, 'dot', 'flat');
      tl.set($('#nm') + ', ' + $('#bl'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), s.t0 + 0.3); bzShow(tl, $('#bl'), K('b')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  vo: { bg: '#4a3a5a', html: () => bzShot(pfClose('vo', 2.1, pfRoom()), bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'frown'); bzTalk(tl, $('#vo'), 'pf_vo', s.t0, s.t1, 'frown', 'open'); bzBlink(tl, $('#vo'), s.t0, s.t1); bzFace(tl, $('#vo'), K('f'), 'wide', 'open'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 650); } },
  // ---------------- Caio is gone
  square: { bg: '#e86a3a', html: () => bzShot(`${pfSquare()}<g id="cm">${pfChar('caio', 740, 1600, 0.9)}</g>${pfChar('davi', 300, 1700, 1.1)}`, pfSay('sm', 'SUMIU', 760, 820, 5, BZ.red, '#fff', 90)),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'dot', 'smile'); bzFace(tl, $('#caio'), s.t0, 'closed', 'grin'); tl.to($('#cm'), { opacity: 0, duration: 0.15 }, K('s')); bzFace(tl, $('#davi'), K('s') + 0.3, 'wide', 'o');
      tl.set($('#sm'), { opacity: 0 }, s.t0); bzShow(tl, $('#sm'), K('s') + 0.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  corner: { bg: '#e86a3a', html: () => bzShot(`${pfStreet()}<g id="pp">${pfChar('papa', 760, 1650, 1.25, true)}</g>${pfSack('sk', 960, 1650, 0.9)}<g id="cc">${pfChar('caio', 470, 1660, 1.0)}</g>`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#papa'), s.t0, 'half', 'smile'); tl.set($('#cc'), { opacity: 0 }, s.t0); tl.to($('#cc'), { opacity: 1, duration: 0.2 }, K('c')); bzFace(tl, $('#caio'), K('c'), 'closed', 'smile');
      tl.fromTo($('#cam'), { scale: 1.4, svgOrigin: '960 1400' }, { scale: 1, svgOrigin: '960 1400', duration: K('v') - s.t0 + 0.8, ease: 'power2.inOut' }, s.t0); pfWiggle(tl, $('#sk'), K('c'), s.t1); } },
  offer: { bg: '#e86a3a', html: () => bzShot(pfClose('papa', 1.9, pfStreet()), bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#papa'), s.t0, 'half', 'grin'); bzTalk(tl, $('#papa'), 'pf_velho', s.t0, s.t1, 'grin', 'open'); bzPose(tl, $('#papa'), s.t0 + 0.2, { aR: -100 }, 0.4);
      tl.to($('#papa .aR'), { rotation: -70, duration: 0.3, yoyo: true, repeat: 4 }, s.t0 + 0.8); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 650); } },
  // ---------------- close: revealed in parts
  close: { bg: '#e86a3a', html: () => bzShot(`<g transform="translate(-980 -2300) scale(2.6)">${pfStreet()}${pfChar('papa', 760, 1650, 1.25, true)}${pfSack('sk', 960, 1650, 0.9)}</g>`, `${pfSay('am', 'AMARELA', 300, 1560, -4, '#e8d23a', BZ.ink, 80)}${pfSay('or', 'ORELHAS', 780, 1640, 4, '#fff', BZ.ink, 70)}${bzFlash('fl', '#e8d23a')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#papa'), s.t0, 'glow', 'grin'); tl.set($('#am') + ', ' + $('#or'), { opacity: 0 }, s.t0); bzShow(tl, $('#am'), K('a')); bzShow(tl, $('#or'), K('o'));
      tl.to($('#cam'), { x: -300, y: -500, duration: 0.6, ease: 'power2.inOut' }, K('m') - 0.4); pfWiggle(tl, $('#sk'), K('m'), s.t1); bzHit(tl, $('#fl'), K('m'), 0.3); } },
  // ---------------- the run, the room
  run: { bg: '#e86a3a', html: () => bzShot(`${pfStreet()}<g id="kids">${pfChar('davi', 540, 1700, 1.1)}${pfChar('caio', 700, 1720, 0.95)}</g>`, ''),
    anim(tl, s, K, $) { bzWalk(tl, $('#davi'), s.t0, s.t1, 0, 0, true); bzWalk(tl, $('#caio'), s.t0, s.t1, 0, 0, true); bzFace(tl, $('#davi'), s.t0, 'wide', 'open'); bzFace(tl, $('#caio'), s.t0, 'wide', 'o');
      tl.fromTo($('#cam'), { x: 0 }, { x: 0, duration: s.t1 - s.t0 }, s.t0); bzHandheld(tl, $('#cam'), s.t0, s.t1, 10); tl.fromTo($('#kids'), { x: -300 }, { x: 200, duration: s.t1 - s.t0, ease: 'none' }, s.t0); } },
  lock: { bg: '#4a3a5a', html: () => bzShot(`${pfRoom()}${pfChar('vo', 820, 1700, 1.1)}${pfChar('davi', 300, 1720, 1.0)}${pfChar('caio', 460, 1730, 0.9)}`, ''),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'angry', 'flat'); bzPose(tl, $('#vo'), K('k') - 0.2, { aR: -90 }, 0.2); bzFace(tl, $('#davi'), s.t0, 'wide', 'flat'); bzFace(tl, $('#caio'), s.t0, 'wide', 'o');
      bzPose(tl, $('#vo'), K('b'), { aL: 140 }, 0.25); bzShake(tl, $('#davi'), s.t0, s.t1, 2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  knock: { bg: '#4a3a5a', html: () => bzShot(`<g transform="translate(-900 -1300) scale(2.2)">${pfRoom()}</g>`, `${pfSay('k1', 'TOC', 340, 600, -8, '#fff', BZ.ink, 90)}${pfSay('k2', 'TOC', 560, 780, 6, '#fff', BZ.ink, 90)}${pfSay('k3', 'TOC', 760, 960, -4, BZ.red, '#fff', 100)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { ['k1', 'k2', 'k3'].forEach((k, i) => { tl.set($('#' + k), { opacity: 0 }, s.t0); bzShow(tl, $('#' + k), K('k') + i * 0.35); tl.to($('#cam'), { x: i % 2 ? 8 : -8, duration: 0.05, yoyo: true, repeat: 1 }, K('k') + i * 0.35); });
      tl.fromTo($('.gap'), { opacity: 0.8 }, { opacity: 0.3, duration: 0.2, yoyo: true, repeat: 3 }, K('k') + 1.2); } },
  voice: { bg: '#0c0a12', html: () => bzShot(`${pfUnder()}`, `${pfSay('ab', 'ABRE, VÓ...', 540, 800, -3, '#e8d23a', BZ.ink, 90)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.set($('#ab'), { opacity: 0 }, s.t0); bzShow(tl, $('#ab'), s.t0 + 0.2); tl.fromTo($('.feet'), { x: 0 }, { x: 30, duration: 0.8, yoyo: true, repeat: 2 }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.2, 800, 1480); } },
  under: { bg: '#0c0a12', html: () => bzShot(`${pfUnder()}${pfChar('davi', 330, 400 * 1.6 + 980, 1.6)}<g id="cc">${pfChar('caio', 740, 330 * 1.6 + 1000, 1.6)}</g><rect y="1450" width="1080" height="470" fill="#0c0a12"/>`, `${bzGlow('dg', 800, 1490, 300, '#e8d23a', 0.18)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'wide', 'flat'); bzFace(tl, $('#caio'), s.t0, 'wide', 'o'); tl.set($('#cc'), { opacity: 0 }, s.t0); tl.to($('#cc'), { opacity: 1, duration: 0.3 }, K('c'));
      bzShake(tl, $('#cc'), K('t'), s.t1, 4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1000); } },
  end: { bg: '#e86a3a', html: () => bzShot(`${pfStreet()}${pfSack('sk', 540, 1720, 1.6)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { pfWiggle(tl, $('#sk'), s.t0 + 0.5, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1500); } },
});
