// <lines>
// </lines>
// =====================================================================
//  O BOTO: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: adults 507*s, Davi ~415*s.
//  Revealed in parts: the white hat that never comes off, the smell of river, the hole, the smile, the pink fin.
// =====================================================================
BZ_TALK.lines = BT_LINES;
const btSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
const btClose = (k: string, s: number, bg: string, id = k) => `${bg}${btChar(k, 540, (k === 'davi' ? 415 : 507) * s + 640, s, false, id)}`;
// the party is alive: flames flicker, flags sway, bulbs twinkle
function btLive(tl: gsap.core.Timeline, $: (q: string) => string, t0: number, t1: number) {
  const n = Math.max(1, Math.floor((t1 - t0) / 0.2));
  tl.fromTo($('#fire .fl'), { scaleY: 0.9, transformOrigin: '50% 100%' }, { scaleY: 1.12, duration: 0.1, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo($('.flag'), { rotation: -6, transformOrigin: '50% 0%' }, { rotation: 6, duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.6)), stagger: 0.05, ease: 'sine.inOut' }, t0);
  tl.fromTo($('.bulb'), { opacity: 1 }, { opacity: 0.5, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.3)), stagger: 0.08 }, t0);
}
// a couple dancing (quadrilha step): sway and turn
function btDance(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, phase = 0) {
  const n = Math.max(1, Math.floor((t1 - t0) / 0.45));
  tl.fromTo(sel, { x: -30, rotation: -4 }, { x: 30, rotation: 4, duration: 0.45, yoyo: true, repeat: n - 1, ease: 'sine.inOut', delay: phase }, t0);
}
const btRip = (tl: gsap.core.Timeline, $: (q: string) => string, t0: number, t1: number) => tl.fromTo($('#rip .rp'), { x: -20 }, { x: 20, duration: 1, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 1)), stagger: 0.1, ease: 'sine.inOut' }, t0);

defineVisuals({
  // ---------------- the hook: the man in white at the party, his hat hiding his eyes, frame 1
  hook: { bg: '#0a0e28', html: () => bzShot(`${btParty()}${btChar('boto', 560, 2150, 3.0)}`, `${btSay('hk', 'NÃO DANCE COM ELE', 540, 1560, -4, '#ff7ab0', '#fff', 92)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzHook(tl, $('#hk'), s.t0); btLive(tl, $, s.t0, s.t1); bzFace(tl, $('#boto'), s.t0, 'half', 'smile'); bzFace(tl, $('#boto'), K('h'), 'glow', 'grin');
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 700); bzHandheld(tl, $('#cam'), s.t0, s.t1, 3); } },
  title: { bg: '#05081c', html: () => bzShot(`${btRiver()}${btFin('fin', 620, 1080, 0.9)}${btSplash('spl', 620, 1080, 0.8)}`, `${btSay('tt', 'O BOTO', 540, 380, -4, BZ.yellow, BZ.ink, 150)}${bzFlash('fl', '#ff7ab0')}`),
    anim(tl, s, K, $) { btRip(tl, $, s.t0, s.t1); tl.fromTo($('#fin'), { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, s.t0 + 0.2); tl.to($('#fin'), { x: 260, y: 200, duration: 1.0, ease: 'power2.in' }, s.t0 + 1.2);
      tl.fromTo($('#spl .sp'), { y: 0, opacity: 0 }, { y: -120, opacity: 1, duration: 0.3, stagger: 0.02, yoyo: true, repeat: 1 }, K('t')); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.35); } },
  // ---------------- the party
  party: { bg: '#0a0e28', html: () => bzShot(`${btParty()}<g id="c1">${btChar('tio', 180, 1700, 0.95)}${btChar('tia', 330, 1700, 0.95, true)}</g>${btChar('davi', 760, 1720, 1.0)}${btChar('rosa', 920, 1720, 1.0, true)}`, btSay('nm', 'SÃO JOÃO NO AMAZONAS', 540, 360, -3, '#fff', BZ.ink, 70)),
    anim(tl, s, K, $) { btLive(tl, $, s.t0, s.t1); btDance(tl, $('#c1'), s.t0, s.t1); bzFace(tl, $('#tio'), s.t0, 'closed', 'grin'); bzFace(tl, $('#tia'), s.t0, 'closed', 'grin'); bzFace(tl, $('#davi'), s.t0, 'dot', 'smile');
      bzFace(tl, $('#rosa'), K('r'), 'closed', 'grin'); bzPop(tl, $('#rosa'), K('r')); bzIdle(tl, $('#davi'), s.t0, s.t1); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), s.t0 + 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  arrive: { bg: '#0a0e28', html: () => bzShot(`${btParty()}${btChar('tio', 200, 1700, 0.95)}${btChar('tia', 340, 1700, 0.95)}${btChar('boto', 860, 1720, 1.05)}<g id="smell">${[0, 1, 2].map((i) => `<path d="M${780 + i * 60} 1000 q -20 -40 0 -80 q 20 -40 0 -80" stroke="#7ac8c8" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.8"/>`).join('')}</g>`,
      `${btSay('rio', 'CHEIRO DE RIO', 700, 640, 5, '#7ac8c8', BZ.ink, 70)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { btLive(tl, $, s.t0, s.t1); bzWalk(tl, $('#boto'), s.t0, K('a') + 0.8, 400, 0); bzFace(tl, $('#boto'), s.t0, 'half', 'smile'); bzFace(tl, $('#tio'), s.t0, 'closed', 'grin'); bzFace(tl, $('#tia'), s.t0, 'closed', 'grin');
      bzFace(tl, $('#tio'), K('a') + 0.4, 'wide', 'o'); bzFace(tl, $('#tia'), K('a') + 0.5, 'wide', 'o'); tl.to($('#tio .hd') + ', ' + $('#tia .hd'), { rotation: 14, transformOrigin: '50% 90%', duration: 0.25 }, K('a') + 0.4);
      tl.set($('#smell') + ', ' + $('#rio'), { opacity: 0 }, s.t0); tl.to($('#smell'), { opacity: 1, duration: 0.4 }, K('s') - 0.3); bzShow(tl, $('#rio'), K('s')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 820, 1100); } },
  ask: { bg: '#0a0e28', html: () => bzShot(btClose('boto', 2.1, btParty()), bzVignette(0.6)),
    anim(tl, s, K, $) { btLive(tl, $, s.t0, s.t1); bzFace(tl, $('#boto'), s.t0, 'half', 'smile'); bzTalk(tl, $('#boto'), 'bt_boto', s.t0, s.t1, 'smile', 'open'); bzPose(tl, $('#boto'), s.t0 + 0.2, { aR: -100 }, 0.4);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 650); } },
  dance: { bg: '#0a0e28', html: () => bzShot(`${btParty()}<g id="cpl">${btChar('rosa', 450, 1720, 1.15)}${btChar('boto', 640, 1720, 1.2, true)}</g><g id="drop" opacity="0"><path d="M700 820 q -24 40 0 60 q 24 -20 0 -60 z" fill="#9ad8f0" ${bzO('stroke-width="4"')}/></g>`, btSay('ch', 'O CHAPÉU NÃO SAI', 540, 380, -3, '#fff', BZ.ink, 80)),
    anim(tl, s, K, $) { btLive(tl, $, s.t0, s.t1); btDance(tl, $('#cpl'), s.t0, s.t1); bzFace(tl, $('#rosa'), s.t0, 'closed', 'grin'); bzFace(tl, $('#boto'), s.t0, 'half', 'smile'); bzPose(tl, $('#rosa'), s.t0, { aR: -60 }, 0.01); bzPose(tl, $('#boto'), s.t0, { aR: -60 }, 0.01);
      tl.set($('#ch'), { opacity: 0 }, s.t0); bzShow(tl, $('#ch'), K('h')); tl.fromTo($('#drop'), { opacity: 1, y: 0 }, { y: 120, opacity: 0, duration: 0.8, ease: 'power1.in' }, K('s')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 560, 900); } },
  rosa: { bg: '#0a0e28', html: () => bzShot(btClose('rosa', 2.0, btParty()), ''),
    anim(tl, s, K, $) { btLive(tl, $, s.t0, s.t1); bzFace(tl, $('#rosa'), s.t0, 'dot', 'smile'); bzTalk(tl, $('#rosa'), 'bt_rosa', s.t0, s.t1, 'smile', 'open'); bzBlink(tl, $('#rosa'), s.t0, s.t1); bzPose(tl, $('#rosa'), s.t0 + 0.4, { aR: -40 }, 0.3);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 650); } },
  // ---------------- the river bank
  follow: { bg: '#05081c', html: () => bzShot(`${btRiver()}${btChar('rosa', 600, 1500, 0.7)}${btChar('boto', 720, 1500, 0.75, true)}<g id="dv">${btChar('davi', 200, 1760, 1.15)}</g>`, bzVignette(0.7)),
    anim(tl, s, K, $) { btRip(tl, $, s.t0, s.t1); bzFace(tl, $('#davi'), s.t0, 'wide', 'flat'); tl.fromTo($('#dv'), { x: -160 }, { x: 0, duration: 1.2, ease: 'power1.out' }, s.t0); bzFace(tl, $('#rosa'), s.t0, 'closed', 'smile');
      bzShake(tl, $('#boto'), K('w'), K('w') + 1, 2); bzHandheld(tl, $('#cam'), s.t0, s.t1, 5); } },
  hat: { bg: '#05081c', html: () => bzShot(`${btRiver()}${btChar('botoh', 540, 1700, 1.3)}<g id="hat"><g transform="translate(540 860)"><ellipse cx="0" cy="40" rx="130" ry="22" fill="#f4f2ea" ${bzO()}/><path d="M-70 40 Q -78 -40 -18 -28 L 0 -14 L 18 -28 Q 78 -40 70 40 Z" fill="#f4f2ea" ${bzO()}/></g></g>`, bzVignette(0.65)),
    anim(tl, s, K, $) { btRip(tl, $, s.t0, s.t1); bzFace(tl, $('#botoh'), s.t0, 'half', 'flat'); tl.set($('#botoh .hole'), { opacity: 0 }, s.t0); tl.to($('#botoh .hole'), { opacity: 1, duration: 0.1 }, K('f') + 0.15);
      tl.fromTo($('#hat'), { x: 0, y: 0, rotation: 0 }, { x: 700, y: -260, rotation: 260, svgOrigin: '540 860', duration: 0.8, ease: 'power2.in' }, K('f')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.15, 540, 900); } },
  hole: { bg: '#05081c', html: () => bzShot(`<g transform="translate(-1404 -2620) scale(3.6)">${btRiver()}${btChar('botoh', 540, 1700, 1.3)}</g>`, `${btSay('fu', 'UM FURO', 540, 380, -3, '#ff7ab0', '#fff', 100)}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#botoh'), s.t0, 'half', 'flat'); tl.fromTo($('#botoh .hole'), { scaleY: 0.3, transformOrigin: '50% 50%' }, { scaleY: 1.6, duration: 0.5, yoyo: true, repeat: Math.max(3, Math.floor((s.t1 - s.t0) / 0.5)), ease: 'sine.inOut' }, s.t0 + 0.6);
      tl.set($('#fu'), { opacity: 0 }, s.t0); bzShow(tl, $('#fu'), K('h')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 700); } },
  // ---------------- the jump and the fin
  saw: { bg: '#05081c', html: () => bzShot(btClose('botoh', 2.3, btRiver()), `${bzFlash('fl', '#ff7ab0')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#botoh'), s.t0, 'dot', 'flat'); tl.to($('#botoh .hd'), { rotation: -10, transformOrigin: '50% 90%', duration: 0.3 }, s.t0 + 0.2); bzFace(tl, $('#botoh'), K('s'), 'glow', 'grin'); bzHit(tl, $('#fl'), K('s'), 0.4);
      tl.from($('#cam'), { scale: 1.3, svgOrigin: '540 640', duration: 0.4, ease: 'power3.out' }, K('s')); } },
  jump: { bg: '#05081c', html: () => bzShot(`${btRiver()}${btChar('botoh', 500, 1420, 0.85)}${btSplash('spl', 640, 1060, 1.0)}`, ''),
    anim(tl, s, K, $) { btRip(tl, $, s.t0, s.t1); bzFace(tl, $('#botoh'), s.t0, 'glow', 'grin'); bzPose(tl, $('#botoh'), s.t0 + 0.2, { aL: 160, aR: -160 }, 0.2);
      tl.to($('#botoh'), { x: 160, y: -260, rotation: 70, svgOrigin: '500 1420', duration: 0.35, ease: 'power2.out' }, K('j') - 0.5); tl.to($('#botoh'), { x: 160, y: 300, opacity: 0, rotation: 160, svgOrigin: '500 1420', duration: 0.3, ease: 'power2.in' }, K('j') - 0.15);
      tl.set($('#spl'), { opacity: 0 }, s.t0); tl.set($('#spl'), { opacity: 1 }, K('j')); tl.fromTo($('#spl .sp'), { y: 0 }, { y: -200, duration: 0.35, stagger: 0.02, yoyo: true, repeat: 1, ease: 'power2.out' }, K('j')); bzShake(tl, $('#cam'), K('j'), K('j') + 0.4, 6); } },
  fin: { bg: '#05081c', html: () => bzShot(`<g transform="translate(-540 -1100) scale(2)">${btRiver()}</g>${btFin('fin', 540, 1150, 1.3)}`, bzVignette(0.7)),
    anim(tl, s, K, $) { tl.fromTo($('#fin'), { y: 320 }, { y: 0, duration: 0.6, ease: 'power2.out' }, K('f') - 0.4); tl.to($('#fin'), { x: 300, y: 320, duration: 1.2, ease: 'power2.in' }, K('f') + 1.2); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.1, 540, 1100); } },
  // ---------------- Rosa
  glazed: { bg: '#05081c', html: () => bzShot(btClose('rosa', 2.0, btRiver()), `${bzGlow('pk', 540, 640, 360, '#ff7ab0', 0.15)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#rosa'), s.t0, 'dead', 'flat'); tl.fromTo($('#rosa .hd'), { rotation: -3, transformOrigin: '50% 90%' }, { rotation: 3, duration: 2, yoyo: true, repeat: 2, ease: 'sine.inOut' }, s.t0); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 650); } },
  moon: { bg: '#05081c', html: () => bzShot(`${btRiver()}${btChar('rosa', 300, 1700, 0.9)}`, `${btSay('lc', 'LUA CHEIA', 760, 620, 4, '#fff', BZ.ink, 80)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { btRip(tl, $, s.t0, s.t1); bzFace(tl, $('#rosa'), s.t0, 'dead', 'flat'); bzWalk(tl, $('#rosa'), s.t0, s.t1, 0, 340); tl.set($('#lc'), { opacity: 0 }, s.t0); bzShow(tl, $('#lc'), K('m')); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 760, 500); } },
  // ---------------- the end: back at the party, a man in white turns to the camera (loops into the hook)
  end: { bg: '#0a0e28', html: () => bzShot(`${btParty()}${btChar('boto', 540, 2150, 3.0)}`, `${bzFlash('fl', '#ff7ab0')}${bzVignette(0.65)}`),
    anim(tl, s, K, $) { btLive(tl, $, s.t0, s.t1); bzFace(tl, $('#boto'), s.t0, 'half', 'smile'); tl.fromTo($('#cam'), { scale: 1, svgOrigin: '540 700' }, { scale: 1.08, duration: K('l') - s.t0, ease: 'none' }, s.t0);
      tl.to($('#cam'), { scale: 1.8, svgOrigin: '540 420', duration: 0.35, ease: 'power3.out' }, K('l')); bzFace(tl, $('#boto'), K('l'), 'glow', 'grin'); bzHit(tl, $('#fl'), K('l'), 0.4); } },
});
