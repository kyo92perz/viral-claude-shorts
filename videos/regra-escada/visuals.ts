// <lines>
const RG_LINES = [];
// </lines>
// =====================================================================
//  A REGRA DA VÓ Nº 3: O DEGRAU CATORZE — the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Davi ~400*s.
// =====================================================================
BZ_TALK.lines = RG_LINES;
const rgSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const rgHide = (tl: gsap.core.Timeline, sel: string, t0: number, t: number) => { tl.set(sel, { opacity: 0 }, t0); bzShow(tl, sel, t); };
const rgClose = (k: string, s: number, bg: string, id = k, flip = false) => `${bg}${rgChar(k, 540, (k === 'davi' ? 400 : 507) * s + 640, s, flip, id)}`;
const stepY = (i: number) => 1760 - (i - 1) * 104 - 50;   // the middle of step i (1 = bottom)
// the 14th step breathes (scaleY pulse around its own middle)
const rgBreathe = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number, amp = 0.25) => tl.fromTo(sel, { scaleY: 1 }, { scaleY: 1 + amp, svgOrigin: `540 ${stepY(14)}`, duration: 0.9, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.9)), ease: 'sine.inOut' }, t0);
// creak marks (.ck) next to a step
const rgCreak = (id: string, y: number) => `<g id="${id}" opacity="0">${[-1, 1].map((d) => `<path d="M${540 + d * 330} ${y} l ${d * 40} -20 l ${d * 10} 30 l ${d * 40} -20" stroke="#fff2c0" stroke-width="9" fill="none" stroke-linecap="round"/>`).join('')}</g>`;

defineVisuals({
  // ---------------- the hook: the stairs in the dark, the 14th step breathing, a red 14
  hook: { bg: '#000', html: () => bzShot(`<g transform="translate(-540 -400) scale(2)">${rgStairs(14)}${rgDark(0.8, stepY(14))}${rgNums(14)}</g>`, `${rgSay('hk', 'NÃO SUBA', 540, 1560, -4, BZ.red, '#fff', 120)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { tl.set($('#n14'), { opacity: 1 }, s.t0); rgBreathe(tl, $('#s14 .tr'), s.t0, s.t1, 0.35); bzHook(tl, $('#hk'), s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 600); } },
  // ---------------- the rule: grandma and Davi at the foot of the stairs, counting
  rule: { bg: '#3a2a30', html: () => bzShot(`${rgStairs(13)}${rgNums(13)}${rgChar('vo', 300, 1900, 1.2)}${rgChar('davi', 760, 1900, 1.1, true)}`, bzVignette(0.55)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'half', 'flat'); bzFace(tl, $('#davi'), s.t0, 'dot', 'flat'); bzPose(tl, $('#vo'), s.t0 + 0.4, { aR: -140 });
      for (let i = 1; i <= 13; i++) tl.set($('#n' + i), { opacity: 1 }, K('c') + (i - 1) * Math.min(0.28, (s.t1 - K('c') - 0.2) / 13)); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 540, 900); } },
  thirteen: { bg: '#3a2a30', html: () => bzShot(`${rgStairs(13)}`, `${bzNum('big', '13', 540, 820, '#ffffff', 420)}${rgSay('sp', 'SEMPRE TREZE', 540, 380, -3, BZ.yellow, BZ.ink, 96)}`),
    anim(tl, s, K, $) { bzShow(tl, $('#big'), K('t')); rgHide(tl, $('#sp'), s.t0, K('t') + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 800); } },
  warn: { bg: '#3a2a30', html: () => bzShot(rgClose('vo', 2.2, `${rgStairs(13)}<rect width="1080" height="1920" fill="#000" opacity="0.35"/>`), `${rgSay('w14', 'SE DER 14, NINGUÉM SOBE', 540, 1560, -3, BZ.red, '#fff', 80)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzTalk(tl, $('#vo'), 'rg_vo', s.t0, s.t1, 'flat'); bzFace(tl, $('#vo'), s.t0, 'half'); rgHide(tl, $('#w14'), s.t0, K('w')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 640); } },
  // ---------------- the night the power went out
  joke: { bg: '#3a2a30', html: () => bzShot(rgClose('davi', 2.3, `${rgStairs(13)}`), `<rect id="bo" width="1080" height="1920" fill="#000" opacity="0"/>${bzVignette(0.5)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#davi'), s.t0, 'half', 'smile'); tl.fromTo($('#davi .hd'), { rotation: -6 }, { rotation: 6, transformOrigin: '50% 90%', duration: 0.7, yoyo: true, repeat: 1 }, s.t0 + 0.3); tl.set($('#bo'), { opacity: 0.92 }, K('l')); bzFace(tl, $('#davi'), K('l'), 'wide', 'o'); } },
  dark: { bg: '#000', html: () => bzShot(`${rgStairs(14)}${rgDark(0.84)}${rgNums(14)}${rgChar('davi', 540, 2250, 1.6)}`, bzVignette(0.8)),
    anim(tl, s, K, $) { tl.set($('#s14'), { opacity: 0 }, s.t0); bzFace(tl, $('#davi'), s.t0, 'wide', 'flat'); for (const [k, i] of [['a', 1], ['b', 2], ['c', 3]] as [string, number][]) { tl.set($('#n' + i), { opacity: 1 }, K(k)); tl.to($('#spot'), { y: stepY(i) - 1700, duration: 0.3 }, K(k)); } bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 540, 1400); } },
  count: { bg: '#000', html: () => bzShot(`${rgStairs(14)}${rgDark(0.86)}${rgNums(14)}`, bzVignette(0.85)),
    anim(tl, s, K, $) { for (const [k, i] of [['a', 11], ['b', 12], ['c', 13], ['d', 14]] as [string, number][]) { tl.set($('#n' + i), { opacity: 1 }, K(k)); tl.to($('#spot'), { y: stepY(i) - 1700, duration: 0.3 }, K(k)); }
      bzPush(tl, $('#cam'), s.t0, K('d'), 1, 1.5, 540, 500); tl.to($('#cam'), { scale: 1.9, svgOrigin: '540 450', duration: 0.25, ease: 'power3.out' }, K('d')); } },
  breath: { bg: '#000', html: () => bzShot(`<g transform="translate(-1080 -300) scale(3)">${rgStairs(14)}${rgDark(0.7, stepY(14))}</g>`, `${rgSay('rs', 'RESPIRANDO', 540, 1560, 3, BZ.red, '#fff', 110)}${bzVignette(0.85)}`),
    anim(tl, s, K, $) { rgBreathe(tl, $('#s14 .tr'), s.t0, s.t1, 0.45); rgHide(tl, $('#rs'), s.t0, K('r')); bzHandheld(tl, $('#cam'), s.t0, s.t1, 5); } },
  // ---------------- the sofa; the creaks coming down
  sofa: { bg: '#1a1626', html: () => bzShot(`${rgSofa()}${rgChar('vo', 260, 1500, 1.1)}${rgChar('davi', 560, 1500, 1.0)}<rect x="160" y="1180" width="560" height="200" rx="60" fill="#3a6a5a" ${bzO()}/>`, bzVignette(0.7)),
    anim(tl, s, K, $) { bzFace(tl, $('#vo'), s.t0, 'wide', 'flat'); bzFace(tl, $('#davi'), s.t0, 'wide', 'flat'); tl.fromTo($('#davi'), { x: 400 }, { x: 0, duration: 0.4, ease: 'power3.out', immediateRender: true }, K('p')); bzShake(tl, $('#davi'), K('p') + 0.4, s.t1, 2); bzShake(tl, $('#vo'), s.t0, s.t1, 2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 420, 1000); } },
  creak: { bg: '#000', html: () => bzShot(`${rgStairs(14)}<rect width="1080" height="1920" fill="#000" opacity="0.8"/>${[13, 10, 7, 4].map((i) => rgCreak('ck' + i, stepY(i))).join('')}`, bzVignette(0.85)),
    anim(tl, s, K, $) { const d = (s.t1 - K('d')) / 4; [13, 10, 7, 4].forEach((i, n) => tl.fromTo($('#ck' + i), { opacity: 0 }, { opacity: 1, duration: 0.08, yoyo: true, repeat: 1 }, K('d') + n * d)); bzPush(tl, $('#cam'), s.t0, s.t1, 1.2, 1, 540, 900); } },
  // ---------------- the morning: 13 steps again; the wet footprints
  morning: { bg: '#3a2a30', html: () => bzShot(`${rgStairs(13)}${bzGlow('mn', 540, 300, 700, '#fff4c8', 0.3)}${rgNums(13)}`, bzVignette(0.4)),
    anim(tl, s, K, $) { for (let i = 1; i <= 13; i++) tl.set($('#n' + i), { opacity: 1 }, s.t0 + 0.2 + i * 0.12); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06, 540, 900); } },
  rug: { bg: '#c8a878', html: () => bzShot(rgRug(), `${rgSay('ng', 'NÃO ERAM DE GENTE', 540, 380, -3, BZ.red, '#fff', 90)}`),
    anim(tl, s, K, $) { tl.fromTo($('.fp'), { opacity: 0 }, { opacity: 1, duration: 0.15, stagger: 0.35 }, s.t0 + 0.4); rgHide(tl, $('#ng'), s.t0, K('f') + 0.8); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 700, 1300); } },
  // ---------------- today: the building stairwell, 16 steps... 17
  building: { bg: '#4a4a52', html: () => bzShot(`<g transform="translate(0 300) scale(1 0.85)">${rgStairs(17, true)}${rgNums(17, true)}</g>${rgChar('daviadulto', 540, 2150, 1.4)}`, bzVignette(0.6)),
    anim(tl, s, K, $) { bzFace(tl, $('#daviadulto'), s.t0, 'half', 'flat'); const t0 = s.t0 + 0.6, dt = (K('s') - t0) / 17; for (let i = 1; i <= 17; i++) tl.set($('#n' + i), { opacity: 1 }, i === 17 ? K('s') : t0 + (i - 1) * dt); bzFace(tl, $('#daviadulto'), K('s'), 'wide', 'o'); tl.to($('#cam'), { scale: 1.5, svgOrigin: '540 380', duration: 0.3, ease: 'power3.out' }, K('s')); } },
  ask: { bg: '#4a4a52', html: () => bzShot(`<g transform="translate(0 300) scale(1 0.85)">${rgStairs(17, true, false)}${rgNums(17, true)}</g><rect width="1080" height="1920" fill="#000" opacity="0.5"/>`, `${rgSay('q', 'QUANTOS DEGRAUS TEM A SUA?', 540, 1560, -3, BZ.yellow, BZ.ink, 74)}${rgSay('vc', 'VAI LÁ CONTAR', 540, 380, 3, BZ.red, '#fff', 100)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { tl.set($('#n17'), { opacity: 1 }, s.t0); rgHide(tl, $('#q'), s.t0, s.t0 + 0.4); rgHide(tl, $('#vc'), s.t0, s.t1 - 1.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 500); } },
});
