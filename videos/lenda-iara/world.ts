// =====================================================================
//  LENDA: A IARA, in the "Brasil Z" toon look (styles/flat2d/toon.ts), detailed. Prefix ia.
//  Cast: Bruna (the narrator, 15), her brother Tiago (20, fisherman, tank top), the Iara (long black hair that floats,
//  green glowing eyes, a teal scaled tail; her real mouth is full of teeth).
//  Sets: the Rio Negro at night (black water, the moon and its trembling reflection, lily pads, far forest, mist), the
//  pier (trapiche) with the stilt house and the oil lamp, the canoe, under the water (rays, bubbles, roots), the bank.
// =====================================================================
const IA_TAIL = `<path d="M-80 -250 Q -98 -120 -30 -20 Q -112 6 -128 74 Q -40 44 0 30 Q 40 44 128 74 Q 112 6 30 -20 Q 98 -120 80 -250 Z" fill="#2a8a7a" stroke="#2b2433" stroke-width="7" stroke-linejoin="round"/>
  ${[-200, -160, -120, -80].map((y, r) => [-40, 0, 40].map((x) => `<path d="M${x - 18 + (r % 2) * 18} ${y} q 18 22 36 0" stroke="#1a5a50" stroke-width="5" fill="none"/>`).join('')).join('')}<path d="M-90 60 q 40 -30 90 -30 q 50 0 90 30" stroke="#6ad8c8" stroke-width="5" fill="none" opacity="0.6"/>`;
const IA_HAIR = '<path d="M-100 -40 Q -170 140 -120 320 Q -60 200 -70 60 Z M100 -40 Q 170 140 120 320 Q 60 200 70 60 Z" fill="#14121a" stroke="#2b2433" stroke-width="6"/>';
const IA_SPEC: Record<string, BzSpec> = {
  bruna: { kid: true, tall: 1.15, skin: '#b8784a', hair: { style: 'pony', color: '#1c1410' }, top: '#e8a030', pants: '#3a5a6a', shoes: '#b8784a' },
  tiago: { tall: 1.05, wide: 1.05, skin: '#a8683a', hair: { style: 'short', color: '#1c1410' }, top: '#e8e4dc', top2: '#c8342c', pants: '#3a4a6a', shoes: '#a8683a', glow: '#6aff9a' },
  iara: { tall: 1.0, wide: 0.85, skin: '#c89a78', hair: { style: 'long', color: '#14121a' }, top: '#2a6a5a', pants: '#2a8a7a', shoes: '#2a8a7a', glow: '#6aff9a', extra: IA_TAIL, headBack: IA_HAIR, noShadow: true },
};
const iaBruna = (x: number, y: number, s = 1, flip = false) => bzChar('bruna', IA_SPEC.bruna, x, y, s, flip);
const iaTiago = (x: number, y: number, s = 1, flip = false) => bzChar('tiago', IA_SPEC.tiago, x, y, s, flip);
const iaIara = (x: number, y: number, s = 1, flip = false) => bzChar('iara', IA_SPEC.iara, x, y, s, flip);
// the night sky with the moon, the far forest line and the black river (water from y = wy); #shimmer = the moon's trembling reflection
function iaRiver(wy = 1100, mx = 760, my = 380) {
  const lily = (x: number, y: number, s: number, flower = false) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 m -90 0 a 90 30 0 1 0 180 0 a 90 30 0 1 0 -180 0 M0 0 L 70 -10" fill="#2f6a3a" stroke="#2b2433" stroke-width="5"/><path d="M-80 4 a 80 22 0 0 0 160 0" stroke="#4a8a4a" stroke-width="6" fill="none"/>${flower ? `<g transform="translate(-20 -16)"><path d="M0 0 l -18 -26 l 18 8 l 0 -30 l 14 28 l 18 -22 l -6 34 z" fill="#f4d8e8" stroke="#2b2433" stroke-width="4"/></g>` : ''}</g>`;
  let streak = ''; for (let i = 0; i < 9; i++) streak += `<rect class="sh" x="${mx - 60 + ((i * 37) % 120) - 40}" y="${wy + 30 + i * 70}" width="${160 - i * 10}" height="12" rx="6" fill="#efe9d6" opacity="${0.6 - i * 0.05}"/>`;
  return `${bzSky('#0b1028', '#24305a')}${bzStars(60, 7, wy - 200)}${bzMoon('mn', mx, my, 90)}${bzGlow('mg', mx, my, 260, '#efe9d6', 0.22)}
    <path d="M-20 ${wy} L-20 ${wy - 120} ${[...Array(12)].map((_, i) => `Q ${i * 100 + 30} ${wy - 220 - (i % 3) * 40} ${i * 100 + 80} ${wy - 130}`).join(' ')} L1100 ${wy - 100} L1100 ${wy} Z" fill="#0e1a1c"/>
    <rect y="${wy}" width="1080" height="${1940 - wy}" fill="#14100e"/><rect y="${wy}" width="1080" height="${1940 - wy}" fill="#1a2a3a" opacity="0.5"/><g id="shimmer">${streak}</g>
    ${lily(160, wy + 220, 0.9, true)}${lily(900, wy + 380, 1.1)}${lily(260, wy + 640, 1.3)}${bzFog(wy + 20, '#8aa0c0', 0.18)}`;
}
// the moon reflection trembles; ripple rings (.rip) grow and fade
function iaShimmer(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  tl.fromTo(`${sel} .sh`, { x: -14, scaleX: 0.9 }, { x: 14, scaleX: 1.1, duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.5)), ease: 'sine.inOut', stagger: 0.08 }, t0);
}
const iaRipples = (id: string, x: number, y: number) => `<g id="${id}">${[0, 1, 2].map((i) => `<ellipse class="rip" cx="${x}" cy="${y}" rx="40" ry="12" fill="none" stroke="#c8d8f0" stroke-width="5" opacity="0"/>`).join('')}</g>`;
function iaRipplesGo(tl: gsap.core.Timeline, sel: string, t0: number, t1: number) {
  tl.fromTo(`${sel} .rip`, { attr: { rx: 30, ry: 9 }, opacity: 0.8 }, { attr: { rx: 260, ry: 70 }, opacity: 0, duration: 1.6, repeat: Math.max(0, Math.floor((t1 - t0) / 1.6) - 1), stagger: 0.53, ease: 'power1.out' }, t0);
}
// the pier with the stilt house, the oil lamp (#lamp) glowing
function iaPier() {
  return `<g><rect x="-20" y="900" width="560" height="360" fill="#6a4a30" ${bzO()}/><path d="M-40 910 L 260 760 L 560 910 Z" fill="#8a6a3a" ${bzO()}/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-10 + i * 50} 790 l 30 0" stroke="#5a4a2a" stroke-width="10" opacity="0.6"/>`).join('')}
    <rect x="120" y="1000" width="120" height="120" fill="#ffd27a" ${bzO()}/><path d="M180 1000 v120 M120 1060 h120" stroke="${BZ.ink}" stroke-width="7"/>
    <rect x="-20" y="1250" width="760" height="36" fill="#8a6a4a" ${bzO()}/>${[20, 180, 340, 500, 660].map((x) => `<rect x="${x}" y="1280" width="26" height="420" fill="#5a3a2a" ${bzO('stroke-width="5"')}/>`).join('')}
    <g id="lamp">${bzGlow('lg', 640, 1200, 300, '#ffc860', 0.5)}<rect x="620" y="1170" width="40" height="60" rx="8" fill="#ffe8a0" ${bzO('stroke-width="5"')}/><path d="M640 1170 v -24" stroke="${BZ.ink}" stroke-width="5"/></g></g>`;
}
// a wooden canoe (side view) with a paddle (.paddle)
const iaCanoe = (id: string, x: number, y: number, s = 1, who = '') => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">${who}<path d="M-260 -40 Q -200 40 0 40 Q 200 40 260 -40 Z" fill="#7a4a2a" ${bzO()}/><path d="M-240 -34 Q 0 -10 240 -34" stroke="#a87a4a" stroke-width="10" fill="none"/>
  <g class="paddle"><path d="M80 -220 L 200 40" stroke="${BZ.ink}" stroke-width="16" stroke-linecap="round"/><path d="M80 -220 L 200 40" stroke="#c8a060" stroke-width="8" stroke-linecap="round"/><ellipse cx="205" cy="60" rx="20" ry="44" fill="#c8a060" ${bzO('stroke-width="5"')} transform="rotate(-24 205 60)"/></g></g></g>`;
// under the water: dark green, light rays from the surface, roots from the top, weeds, bubbles
function iaUnder() {
  return `${bzSky('#2a5a5a', '#06120e')}${bzRays('ury', 540, -200, 6, 2200, '#c8fff0', 0.1)}
    ${[120, 380, 760, 980].map((x, i) => `<path d="M${x} -20 q ${(i % 2 ? 1 : -1) * 60} 260 0 ${420 + i * 60} q ${(i % 2 ? -1 : 1) * 40} 120 10 200" stroke="#2a1e16" stroke-width="${18 - i * 2}" fill="none"/>`).join('')}
    ${[[100, 1940, 1.2], [300, 1940, 0.9], [820, 1940, 1.3], [1000, 1940, 1]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 q -40 -200 10 -400 q 50 -150 0 -300" stroke="#1f4a3a" stroke-width="26" fill="none"/><path d="M30 0 q 40 -160 -10 -320" stroke="#2f6a4a" stroke-width="20" fill="none"/></g>`).join('')}`;
}
// her face just above the water (the waterline hides everything below y = wl)
const iaSurfaceFace = (x: number, wl: number, s: number) => `<defs><clipPath id="iawl${BZ_UID}"><rect x="0" y="0" width="1080" height="${wl}"/></clipPath></defs><g clip-path="url(#iawl${BZ_UID++})">${iaIara(x, wl + 470 * s, s)}</g><path d="M0 ${wl} h1080" stroke="#c8d8f0" stroke-width="4" opacity="0.5"/>`;

// ---------------------------------------------------------------- the world test (world.json)
defineVisuals({
  'test-cast': { bg: '#0b1028', html: () => svg(`${iaRiver()}${iaBruna(200, 1640, 1)}${iaTiago(460, 1640, 1)}${iaIara(800, 1640, 1)}`), anim(tl, s) { bzFace(tl, '#sc-test-cast #iara', s.t0, 'glow', 'smile'); } },
  'test-river': { bg: '#0b1028', html: () => svg(`${iaRiver()}${iaCanoe('cn', 620, 1320, 0.8, iaTiago(-30, -10, 0.8))}${iaRipples('rp', 620, 1330)}${bzParticles('ff', 'fireflies', 16, [0, 800, 1080, 1200], 3)}`),
    anim(tl, s) { iaShimmer(tl, '#sc-test-river', s.t0, s.t1); iaRipplesGo(tl, '#sc-test-river #rp', s.t0, s.t1); bzParticlesGo(tl, '#sc-test-river #ff', 'fireflies', s.t0, s.t1); } },
  'test-pier': { bg: '#0b1028', html: () => svg(`${iaRiver(1250, 860, 300)}${iaPier()}${iaBruna(560, 1250, 1.0)}`), anim(tl, s) { bzFace(tl, '#sc-test-pier #bruna', s.t0, 'wide', 'flat'); } },
  'test-face': { bg: '#0b1028', html: () => svg(`${iaRiver(1000)}${iaSurfaceFace(540, 1000, 2.6)}`), anim(tl, s) { bzFace(tl, '#sc-test-face #iara', s.t0, 'glow', 'flat'); } },
  'test-under': { bg: '#06120e', html: () => svg(`${iaUnder()}${iaIara(540, 1500, 1.4)}${bzParticles('bb', 'bubbles', 26, [0, 400, 1080, 1900], 6)}`),
    anim(tl, s) { bzFace(tl, '#sc-test-under #iara', s.t0, 'glow', 'fangs'); bzParticlesGo(tl, '#sc-test-under #bb', 'bubbles', s.t0, s.t1); } },
  // covers (clean frames for core/cover.py)
  'cover-a': { bg: '#0b1028', html: () => svg(`${iaRiver(1050)}${iaSurfaceFace(540, 1050, 2.8)}${bzParticles('ff', 'fireflies', 14, [0, 500, 1000, 1000], 2)}${bzVignette(0.6)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #iara', s.t0, 'glow', 'flat'); } },
  'cover-b': { bg: '#06120e', html: () => svg(`${iaUnder()}${iaIara(540, 1900, 2.0)}${bzParticles('bb', 'bubbles', 26, [0, 400, 1080, 1900], 6)}${bzVignette(0.6)}`), anim(tl, s) { bzFace(tl, '#sc-cover-b #iara', s.t0, 'glow', 'fangs'); } },
});
