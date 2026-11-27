// <lines>
// </lines>
// =====================================================================
//  BLOODY MARY: the shots. Cast and sets in world.ts, the shot list in tools/make-scenes.py.
//  Framing: captions at y 1190–1400. Heads above the feet: kids ~400*s, adults 507*s.
//  The camera sits where the mirror is: what is inside the glass is the reflection. Mary is revealed in parts: a dark
//  shape behind the reflection, the candle that stays lit, the smile, then her face.
// =====================================================================
BZ_TALK.lines = BM_LINES;
const bmSay = (id: string, t: string, x: number, y: number, rot: number, bg = '#fff', fg = BZ.ink, size = 90) => bzSign(id, t, x, y, rot, bg, fg, size);
// what is inside the mirror glass (clipped); uid keeps the clip ids unique per shot
const bmGlass = (uid: string, body: string) => `<defs><clipPath id="bmg${uid}"><rect x="240" y="300" width="600" height="800" rx="10"/></clipPath></defs><g clip-path="url(#bmg${uid})">${body}</g>`;
const bmFlicker = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number) => tl.fromTo(`${sel} .flame`, { scaleY: 0.85, transformOrigin: '50% 100%' }, { scaleY: 1.1, duration: 0.09, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.09)), ease: 'sine.inOut' }, t0);
const bmClose = (k: string, s: number, bg: string, id = k) => `${bg}${bmChar(k, 540, (k === 'mary' ? 507 : 400) * s + 640, s, false, id)}`;

defineVisuals({
  // ---------------- the hook: Mary's red eyes in a dark mirror, frame 1
  hook: { bg: '#1a2230', html: () => bzShot(`${bmBath()}${bmGlass('h', bmChar('mary', 540, 2050, 2.4))}${bmCandle('cd', 860, 1640, 1.1)}`, `${bmSay('hk', "DON'T TURN AROUND", 540, 1560, -4, '#b0101a', '#fff', 92)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'dead', 'flat'); bzFace(tl, $('#mary'), K('h'), 'glow', 'grin'); bzHook(tl, $('#hk'), s.t0); bmFlicker(tl, $('#cd'), s.t0, s.t1);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 700); bzHandheld(tl, $('#cam'), s.t0, s.t1, 3); } },
  title: { bg: '#0e141e', html: () => bzShot(`${bmBath()}${bmCandle('cd', 860, 1640, 1.1)}`, `${bmSay('tt', 'BLOODY MARY', 540, 400, -4, '#b0101a', '#fff', 140)}${bzFlash('fl', '#b0101a')}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bmFlicker(tl, $('#cd'), s.t0, s.t1); tl.set($('#tt'), { opacity: 0 }, s.t0); bzShow(tl, $('#tt'), K('t')); bzHit(tl, $('#fl'), K('t'), 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 700); } },
  // ---------------- the sleepover
  party: { bg: '#3a2a5a', html: () => bzShot(`${bmBedroom()}${bmChar('mia', 170, 1620, 1.0)}${bmChar('zoe', 380, 1660, 1.0)}${bmChar('emma', 640, 1700, 1.05)}${bmChar('kayla', 880, 1660, 1.0, true)}`, bmSay('nm', 'SLEEPOVER', 540, 380, -3, '#fff', BZ.ink, 100)),
    anim(tl, s, K, $) { tl.fromTo($('.fl'), { opacity: 1 }, { opacity: 0.4, duration: 0.3, yoyo: true, repeat: Math.floor((s.t1 - s.t0) / 0.3), stagger: 0.07 }, s.t0);
      ['mia', 'zoe', 'emma', 'kayla'].forEach((k, i) => { bzFace(tl, $('#' + k), s.t0, 'closed', 'grin'); bzBob(tl, $('#' + k), s.t0 + i * 0.1, s.t1, 6); });
      bzFace(tl, $('#kayla'), K('d') - 0.3, 'angry', 'grin'); bzFace(tl, $('#emma'), K('d'), 'wide', 'flat'); tl.set($('#nm'), { opacity: 0 }, s.t0); bzShow(tl, $('#nm'), s.t0 + 0.3); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.06); } },
  dare: { bg: '#3a2a5a', html: () => bzShot(bmClose('kayla', 2.2, bmBedroom()), `<rect id="dk" width="1080" height="1920" fill="#05060c" opacity="0"/>${bmCandle('cd', 860, 1500, 1.2, true)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#kayla'), s.t0, 'angry', 'grin'); bzTalk(tl, $('#kayla'), 'us_girl', s.t0, s.t1, 'grin', 'open'); tl.to($('#dk'), { opacity: 0.6, duration: 0.1 }, K('o')); tl.set($('#cd'), { opacity: 0 }, s.t0);
      tl.set($('#cd'), { opacity: 1 }, K('o') + 0.6); bmFlicker(tl, $('#cd'), s.t0, s.t1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 650); } },
  // ---------------- the mirror (the camera is the mirror: Emma faces us)
  stand: { bg: '#1a2230', html: () => bzShot(`<rect width="1080" height="1920" fill="#10141c"/>${bmChar('emma', 540, 400 * 2.2 + 640, 2.2)}${bmCandle('cd', 760, 1760, 1.3)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#emma'), s.t0, 'half', 'flat'); bzPose(tl, $('#emma'), s.t0, { aR: -40 }, 0.01); bzShake(tl, $('#cd'), s.t0, s.t1, 2); bmFlicker(tl, $('#cd'), s.t0, s.t1); bzBlink(tl, $('#emma'), s.t0, s.t1);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 700); } },
  chant: { bg: '#10141c', html: () => bzShot(`<rect width="1080" height="1920" fill="#10141c"/><g id="shade" opacity="0"><ellipse cx="760" cy="700" rx="170" ry="260" fill="#05060a"/></g>${bmChar('emma', 540, 400 * 2.6 + 640, 2.6)}${bmCandle('cd', 780, 1880, 1.5)}`,
      `${bmSay('c1', 'BLOODY MARY', 540, 420, -5, '#fff', '#b0101a', 90)}${bmSay('c2', 'BLOODY MARY', 540, 560, 4, '#fff', '#b0101a', 100)}${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#emma'), s.t0, 'half', 'o'); bmFlicker(tl, $('#cd'), s.t0, s.t1); tl.set($('#c1') + ', ' + $('#c2'), { opacity: 0 }, s.t0); bzShow(tl, $('#c1'), K('a')); bzShow(tl, $('#c2'), K('b'));
      tl.to($('#shade'), { opacity: 0.8, duration: 1.2 }, K('b')); tl.set($('#cam'), { scale: 1.1, svgOrigin: '540 700' }, K('b')); } },
  out: { bg: '#05060a', html: () => bzShot(`<rect width="1080" height="1920" fill="#10141c"/><g transform="translate(-860 -2400) scale(2.6)">${bmCandle('cd', 540, 1500, 1.5)}</g>`, `<rect id="dk" width="1080" height="1920" fill="#000" opacity="0"/>${bzVignette(0.8)}`),
    anim(tl, s, K, $) { bmFlicker(tl, $('#cd'), s.t0, K('o')); tl.to($('#cd .flame'), { opacity: 0, duration: 0.08 }, K('o')); tl.to($('#cdg'), { opacity: 0, duration: 0.15 }, K('o'));
      tl.fromTo($('#cd .smoke'), { opacity: 0.9, y: 0 }, { opacity: 0, y: -60, duration: 1.4 }, K('o') + 0.05); tl.to($('#dk'), { opacity: 0.6, duration: 0.2 }, K('o')); } },
  // ---------------- the lights, the reflection
  laugh: { bg: '#05060a', html: () => bzShot(`<rect width="1080" height="1920" fill="#14141e"/>${bmChar('kayla', 260, 1640, 1.05)}${bmChar('zoe', 820, 1640, 1.05, true)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { ['kayla', 'zoe'].forEach((k) => { bzFace(tl, $('#' + k), s.t0, 'closed', 'grin'); bzShake(tl, $('#' + k), s.t0, s.t1, 3); }); } },
  lit: { bg: '#1a2230', html: () => bzShot(`${bmBath()}${bmGlass('l', `${bmChar('emma', 540, 1900, 2.0)}${bmCandle('cr', 680, 1380, 1.2)}`)}${bmCandle('cd', 840, 1820, 1.3, false)}`, `${bmSay('st', 'STILL LIT', 540, 1560, -3, '#b0101a', '#fff', 90)}${bzVignette(0.7)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#emma'), s.t0, 'half', 'flat'); bmFlicker(tl, $('#cr'), s.t0, s.t1); tl.set($('#st'), { opacity: 0 }, s.t0); bzShow(tl, $('#st'), K('l'));
      bzPush(tl, $('#cam'), s.t0, K('l'), 1, 1.0); tl.to($('#cam'), { scale: 1.35, svgOrigin: '680 1100', duration: 0.5, ease: 'power2.inOut' }, K('l') - 0.2); } },
  smile: { bg: '#0e141e', html: () => bzShot(`${bmBath()}${bmGlass('s', `${bmChar('emma', 540, 1900, 2.0)}${bmCandle('cr', 680, 1380, 1.2)}`)}`, `${bzFlash('fl', '#b0101a')}${bzVignette(0.75)}`),
    anim(tl, s, K, $) { bzFace(tl, $('#emma'), s.t0, 'half', 'flat'); bmFlicker(tl, $('#cr'), s.t0, s.t1); tl.fromTo($('#cam'), { scale: 1.2, svgOrigin: '540 800' }, { scale: 1.45, duration: K('s') - s.t0, ease: 'none' }, s.t0);
      bzFace(tl, $('#emma'), K('s'), 'dead', 'grin'); bzHit(tl, $('#fl'), K('s'), 0.35); } },
  again: { bg: '#0e141e', html: () => bzShot(`${bmBath()}${bmGlass('a', bmChar('mary', 540, 2050, 2.4))}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'glow', 'grin'); bzTalk(tl, $('#mary'), 'us_ghost', s.t0, s.t1, 'grin', 'fangs'); tl.fromTo($('#mary .hd'), { rotation: 0, transformOrigin: '50% 90%' }, { rotation: 12, duration: s.t1 - s.t0, ease: 'none' }, s.t0);
      bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1.3, 540, 750); } },
  lights: { bg: '#cfe0e4', html: () => bzShot(`${bmBath(true)}${bmGlass('x', bmChar('emma', 540, 1900, 2.0))}`, `<rect id="dk" width="1080" height="1920" fill="#000" opacity="1"/>`),
    anim(tl, s, K, $) { bzFace(tl, $('#emma'), s.t0, 'wide', 'open'); tl.to($('#dk'), { opacity: 0, duration: 0.05 }, K('c')); bzShake(tl, $('#cam'), K('c'), K('c') + 0.4, 5); bzFace(tl, $('#emma'), K('c') + 1.0, 'wide', 'flat'); } },
  // ---------------- the morning, the words
  morning: { bg: '#cfe0e4', html: () => bzShot(`${bmBath(true)}${bmWords('wd')}`, bmSay('nx', 'NEXT MORNING', 540, 1540, -3, '#fff', BZ.ink, 80)),
    anim(tl, s, K, $) { tl.set($('#wd text'), { opacity: 0 }, s.t0); [0, 1, 2].forEach((i) => tl.to($(`#wd .w${i}`), { opacity: 0.9, duration: 0.2 }, K('w') + i * 0.35)); bzPop(tl, $('#nx'), s.t0 + 0.1); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.08, 540, 700); } },
  words: { bg: '#cfe0e4', html: () => bzShot(`${bmBath(true)}${bmWords('wd')}`, `${bmSay('rd', 'SAY IT AGAIN', 540, 1540, 3, '#b0101a', '#fff', 100)}${bzVignette(0.6)}`),
    anim(tl, s, K, $) { tl.set($('#rd'), { opacity: 0 }, s.t0); bzShow(tl, $('#rd'), s.t0 + 0.6); bzPush(tl, $('#cam'), s.t0, s.t1, 1.1, 1.25, 540, 750); } },
  // ---------------- the end: a dark mirror again, a shape behind you (loops into the hook)
  end: { bg: '#0e141e', html: () => bzShot(`${bmBath()}${bmGlass('e', `<g id="mg" opacity="0">${bmChar('mary', 540, 2050, 2.4)}</g>`)}${bmCandle('cd', 860, 1640, 1.1)}`, bzVignette(0.75)),
    anim(tl, s, K, $) { bzFace(tl, $('#mary'), s.t0, 'glow', 'flat'); bmFlicker(tl, $('#cd'), s.t0, s.t1); tl.to($('#mg'), { opacity: 1, duration: 2.0 }, s.t0 + (s.t1 - s.t0) * 0.4); bzPush(tl, $('#cam'), s.t0, s.t1, 1, 1.12, 540, 700); } },
});
