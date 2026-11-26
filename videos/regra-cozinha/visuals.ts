// <lines>
const RG_LINES = [];
// </lines>
// =====================================================================
//  A REGRA DA VÓ Nº 2: A VOZ DA COZINHA — the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Davi ~400*s.
// =====================================================================
BZ_TALK.lines = RG_LINES;
const rgSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const rgHide = (tl: gsap.core.Timeline, sel: string, t0: number, t: number) => { tl.set(sel, { opacity: 0 }, t0); bzShow(tl, sel, t); };
const rgClose = (k: string, s: number, bg: string, id = k, flip = false) => `${bg}${rgChar(k, 540, (k === 'davi' ? 400 : 507) * s + 640, s, flip, id)}`;
// sound waves coming out of the kitchen doorway toward the camera (.sw)
const rgWaves = (id: string, x = 540, y = 780) => `<g id="${id}">${[0, 1, 2].map((i) => `<path class="sw" d="M${x - 120 - i * 70} ${y - 60 - i * 40} Q ${x} ${y - 140 - i * 60} ${x + 120 + i * 70} ${y - 60 - i * 40}" stroke="#ffe0a0" stroke-width="10" fill="none" stroke-linecap="round" opacity="0"/>`).join('')}</g>`;
const rgWavesGo = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number) => tl.fromTo(`${sel} .sw`, { opacity: 0, scale: 0.8, svgOrigin: '540 780' }, { opacity: 0.85, scale: 1.3, svgOrigin: '540 780', duration: 0.9, stagger: 0.3, repeat: Math.max(0, Math.floor((t1 - t0) / 1.5)), ease: 'sine.out' }, t0);
// the coffee smell: wavy lines drifting in from the right
const rgSmell = () => `<g id="sm">${[0, 1, 2].map((i) => `<path class="sl" d="M1100 ${820 + i * 70} q -60 -30 -120 0 t -120 0 t -120 0" stroke="#c8a070" stroke-width="12" fill="none" stroke-linecap="round" opacity="0"/>`).join('')}</g>`;
// a hand grabbing an arm (close-up): the arm (blue sleeve) across, the old hand closing on it (#hand)
const rgGrab = () => `<rect width="1080" height="1920" fill="#141a2e"/>${bzGlow('gg', 540, 900, 500, '#ffc860', 0.15)}<rect x="-40" y="760" width="1160" height="260" rx="120" fill="#8a5a3a" ${bzO()}/><rect x="-40" y="740" width="300" height="300" rx="40" fill="#3a7ac8" ${bzO()}/>
  <g id="hand"><g transform="translate(620 600)"><rect x="-60" y="-700" width="200" height="560" fill="#e8e4f0" ${bzO()}/>${[-40, 20, 80, 140].map((x) => `<path d="M${x} -160 Q ${x - 10} 120 ${x - 30} 290" stroke="${BZ.ink}" stroke-width="70" fill="none" stroke-linecap="round"/><path d="M${x} -160 Q ${x - 10} 120 ${x - 30} 290" stroke="#a8683e" stroke-width="54" fill="none" stroke-linecap="round"/>`).join('')}<ellipse cx="40" cy="-150" rx="140" ry="110" fill="#a8683e" ${bzO()}/></g></g>`;

defineVisuals({
  // ---------------- the hook: the lit kitchen door at the end of the dark hallway; a tall shape in it
  hook: { bg: '#0e0c14', html: () => bzShot(`${rgHallK()}${rgChar('falsa', 540, 1000, 0.5)}`, `${rgSay('hk', 'NÃO VAI', 540, 1560, -4, BZ.red, '#fff', 120)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#falsa'), s.t0, 'glow', 'flat'); bzHook(tl, $('#hk'), s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1.05, 1.3, 540, 800); } },
  rule: { bg: '#141a2e', html: () => bzShot(`${rgRoom()}${rgChar('vo', 380, 1700, 1.4)}`, `${rgSay('nv', 'NÃO VAI.', 540, 380, -4, BZ.yellow, BZ.ink, 110)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'flat'); bzPose(tl, $('#vo'), s.t0 + 0.3, { aR: -150 }); rgHide(tl, $('#nv'), s.t0, K('n')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 400, 900); } },
  why: { bg: '#141a2e', html: () => bzShot(rgClose('davi', 2.4, `${rgRoom()}`), `${rgSay('pq', 'POR QUÊ?', 540, 300, 3, '#fff', BZ.ink, 100)}${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'dot', 'o'); rgHide(tl, $('#pq'), s.t0, s.t0 + 0.6); bzBob(tl, $('#davi'), s.t0, s.t1); } },
  sleep: { bg: '#141a2e', html: () => bzShot(rgClose('vo', 2.2, `${rgRoom()}`), `${rgSay('dm', 'EU TÔ DORMINDO', 540, 300, -3, BZ.yellow, BZ.ink, 96)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzTalk(tl, $('#vo'), 'rg_vo', s.t0, s.t1, 'flat'); bzFace(tl, $('#vo'), s.t0, 'half'); rgHide(tl, $('#dm'), s.t0, s.t0 + 1.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 640); } },
  // ---------------- the night: coffee smell, the voice
  coffee: { bg: '#141a2e', html: () => bzShot(`${rgRoom()}${rgChar('davi', 340, 1150, 1.0)}${rgSmell()}`, `${rgSay('cf', 'CHEIRO DE CAFÉ', 540, 380, -3, '#fff', BZ.ink, 90)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#davi'), { rotation: -90, svgOrigin: '340 1150', y: -60 }, s.t0); bzFace(tl, $('#davi'), s.t0, 'closed', 'flat'); bzFace(tl, $('#davi'), K('c'), 'wide', 'flat');
      tl.fromTo($('.sl'), { opacity: 0, x: 0 }, { opacity: 0.8, x: -300, duration: 1.6, stagger: 0.3, ease: 'sine.inOut' }, K('c') - 0.4); rgHide(tl, $('#cf'), s.t0, K('c')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1000); } },
  voice: { bg: '#0e0c14', html: () => bzShot(`${rgHallK()}${rgWaves('wv')}`, bzVignette(0.8)),
    anim(tl, s, K, $) { rgWavesGo(tl, $('#wv'), s.t0 + 0.3, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 780); } },
  fake: { bg: '#0e0c14', html: () => bzShot(`<g transform="translate(-540 -760) scale(2)">${rgHallK()}${rgChar('falsa', 540, 1000, 0.5)}</g>${rgWaves('wv', 540, 700)}`, `${rgSay('bl', 'FIZ UM BOLO PRA VOCÊ', 540, 1560, 3, '#fff', BZ.ink, 80)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#falsa'), s.t0, 'glow', 'flat'); rgWavesGo(tl, $('#wv'), s.t0, s.t1); tl.fromTo($('#falsa .aR, #falsa .aL'), { rotation: 0 }, { rotation: (i: number) => (i ? 25 : -25), duration: 1.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, s.t0 + 0.5); rgHide(tl, $('#bl'), s.t0, K('b')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 640); } },
  // ---------------- he gets up; a hand stops him
  getup: { bg: '#141a2e', html: () => bzShot(`${rgRoom()}${rgChar('davi', 360, 1700, 1.3)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'half', 'flat'); bzWalk(tl, $('#davi'), s.t0 + 0.3, s.t1, 0, 380); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 800, 900); } },
  grab: { bg: '#141a2e', html: () => bzShot(rgGrab(), `${bzFlash('fl', '#fff')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { tl.fromTo($('#hand'), { y: -500 }, { y: 0, duration: 0.18, ease: 'power3.in', immediateRender: true }, K('g') - 0.18); bzHit(tl, $('#fl'), K('g'), 0.35); bzQuake(tl, $('#cam'), K('g'), K('g') + 0.3, 10); } },
  real: { bg: '#141a2e', html: () => bzShot(`${rgRoom()}${rgChar('davi', 700, 1700, 1.3, true)}${rgChar('vonoite', 330, 1700, 1.35)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#vonoite'), s.t0, 'wide', 'flat'); bzFace(tl, $('#davi'), s.t0, 'wide', 'o'); bzShake(tl, $('#vonoite'), s.t0, s.t1, 3); bzPose(tl, $('#vonoite'), K('d') - 0.3, { aR: -165 }, 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 330, 900); } },
  heard: { bg: '#141a2e', html: () => bzShot(rgClose('vonoite', 2.4, `<rect width="1080" height="1920" fill="#0e1222"/>`), `${rgSay('ou', 'EU TAMBÉM OUVI', 540, 1560, -3, BZ.red, '#fff', 100)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzTalk(tl, $('#vonoite'), 'rg_vo', s.t0, s.t1, 'flat', 'o'); bzFace(tl, $('#vonoite'), s.t0, 'wide'); bzShake(tl, $('#vonoite'), s.t0, s.t1, 2); rgHide(tl, $('#ou'), s.t0, K('w')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.2, 540, 640); } },
  // ---------------- the chair, the steps; the wardrobe; the cups
  steps: { bg: '#0e0c14', html: () => bzShot(`${rgHallK()}<g id="sh"><path d="M480 1000 L 600 1000 L 760 1920 L 320 1920 Z" fill="#000" opacity="0.7"/></g>${rgChar('falsa', 540, 1000, 0.5)}`, `${rgSay('ps', 'PASSOS', 540, 380, 4, '#fff', BZ.ink, 100)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#falsa'), s.t0, 'glow', 'flat'); tl.set($('#falsa'), { opacity: 0 }, s.t0); tl.set($('#falsa'), { opacity: 1 }, K('c')); tl.fromTo($('#sh'), { scaleY: 0, svgOrigin: '540 1000' }, { scaleY: 1, svgOrigin: '540 1000', duration: s.t1 - K('p'), ease: 'none' }, K('p'));
      tl.to($('#falsa'), { scale: 2.2, svgOrigin: '540 1000', y: 500, duration: s.t1 - K('p'), ease: 'power1.in' }, K('p')); rgHide(tl, $('#ps'), s.t0, K('p')); } },
  wardrobe: { bg: '#08070c', html: () => bzShot(rgWardrobe(), bzVignette(0.6)),
    anim(tl, s, K, $) { tl.fromTo($('.pu'), { x: -6 }, { x: 6, duration: 0.8, yoyo: true, repeat: 3 }, s.t0); tl.to($('#shadow'), { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 }, K('s') + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 820); } },
  cups: { bg: '#e8d8b0', html: () => bzShot(rgKitchen(), `${rgSay('qt', 'AINDA QUENTES', 540, 380, -3, BZ.red, '#fff', 96)}`),
    anim(tl, s, K, $) { tl.fromTo($('.stm'), { opacity: 0.2, y: 0 }, { opacity: 0.8, y: -20, duration: 0.8, yoyo: true, repeat: 5, stagger: 0.2 }, s.t0); bzPop(tl, $('#cup1'), K('d')); bzPop(tl, $('#cup2'), K('d') + 0.3); rgHide(tl, $('#qt'), s.t0, s.t1 - 1.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 1060); } },
  // ---------------- she died last year; yesterday she called again
  dead: { bg: '#5a4a3a', html: () => bzShot(rgPhoto(), bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#pvo'), s.t0, 'dot', 'smile'); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 660); } },
  call: { bg: '#141a2e', html: () => bzShot(`${rgRoom()}${rgChar('davi', 380, 1150, 1.1)}${rgWaves('wv', 900, 700)}`, `${rgSay('dv', 'DAVI...', 540, 380, -3, '#fff', BZ.ink, 110)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { tl.set($('#davi'), { rotation: -90, svgOrigin: '380 1150', y: -60 }, s.t0); bzFace(tl, $('#davi'), s.t0, 'closed', 'flat'); bzFace(tl, $('#davi'), K('c') - 0.3, 'wide', 'o'); rgWavesGo(tl, $('#wv'), K('c') - 0.3, s.t1); rgHide(tl, $('#dv'), s.t0, K('c'));
      tl.fromTo($('#crack'), { scaleX: 1 }, { scaleX: 3, svgOrigin: '773 900', duration: s.t1 - s.t0, ease: 'none' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 760, 900); } },
  ask: { bg: '#0e0c14', html: () => bzShot(`<g transform="translate(-540 -760) scale(2)">${rgHallK()}${rgChar('falsa', 540, 1000, 0.5)}</g>`, `${rgSay('q', 'VOCÊ IA?', 540, 1560, -3, BZ.yellow, BZ.ink, 130)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#falsa'), s.t0, 'glow', 'flat'); rgHide(tl, $('#q'), s.t0, s.t0 + 0.4); bzPose(tl, $('#falsa'), s.t0 + 0.8, { aR: -120 }, 1.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 640); } },
});
