// =====================================================================
//  Flat 2D — toon: cartoon characters and sets with thick dark outlines (round heads, capsule bodies, noodle arms and
//  legs, flat colors, gradient skies, fog), the look of the channel's "Brasil Z" series. Loaded after library.ts.
//  Characters: bzChar(id, spec, x, y, scale, flip) -> SVG. Feet at (x, y). Parts you can animate (GSAP, via $('#id .part')):
//    the id itself (walk: x), .mv (bob, shake, lean: no transform), .hd (head, pivots at the neck), .bd (body), .aL .aR (arms, pivot at the
//    shoulder), .lL .lR (legs, pivot at the hip), eyes .ey-dot .ey-wide .ey-closed .ey-half .ey-angry .ey-dead,
//    mouths .mo-smile .mo-flat .mo-open .mo-grin .mo-frown .mo-o (one of each is visible; bzFace switches them)
//  Motion helpers on the timeline: bzFace (expression), bzTalk (mouth follows the words of a speaker), bzBlink, bzWalk,
//    bzRun, bzBob (idle breathing), bzShake (fear tremble), bzPop.
//  Sets: bzSky (gradient), bzStars, bzMoon, bzSun, bzFog, bzLamp, bzBuildings, bzGround, bzSign (a tilted plate), bzRain.
// =====================================================================
const BZ = { ink: '#2b2433', inkSoft: '#3d3446', skin: '#e8a679', skinD: '#c98757', white: '#fbf7ef', yellow: '#f6c744', red: '#c8342c', blood: '#8e0f14',
  navy: '#1f2a4a', night: '#151c33', purple: '#5a3f7a', orange: '#f29a4a', moon: '#efe9d6', fog: '#c9d2e6' };
const BZ_W = 7;   // outline width (at scale 1)
// who speaks when ({ who, t0, t1 } from the video's lines); bzTalk opens the mouth on the words of those windows
const BZ_TALK: { lines: { who: string; t0: number; t1: number }[] } = { lines: [] };
interface BzSpec {
  skin?: string; kid?: boolean; tall?: number; wide?: number;               // tall/wide: 1 = an adult; kids are smaller
  hair?: { style: 'short' | 'long' | 'bun' | 'afro' | 'pony' | 'bald' | 'spiky' | 'messy'; color: string };
  top: string; top2?: string; belt?: string; badge?: string;                // shirt color, a second color (stripe), a belt, a badge
  pants?: string; shoes?: string; dress?: string;                           // a dress replaces trousers (legs show the skin)
  hat?: { kind: 'straw' | 'fedora' | 'cap' | 'beanie'; color: string };
  beard?: string; mustache?: string; glasses?: boolean;
  face?: 'normal' | 'pale' | 'dead' | 'dry';                                // pale: grey-blue (a ghost); dead: sunken eyes; dry: a dried corpse
  extra?: string;                                                           // more SVG drawn on the body (local coordinates)
  cotton?: boolean; claws?: boolean; ribs?: boolean;
  headBack?: string; headFront?: string;                                    // more SVG in the head (local coords, radius ~90): behind the head (ears, a veil) / over the face under the eyes (a snout)
  glow?: string;                                                            // color of the 'glow' eyes (monsters; default red)
}
// a noodle limb: a dark stroke under a colored one (round caps), from (0,0) down to (dx, len)
const bzLimb = (len: number, w: number, color: string, dx = 0, bend = 0) => {
  const d = `M0 0 Q ${dx / 2 + bend} ${len / 2} ${dx} ${len}`;
  return `<path d="${d}" stroke="${BZ.ink}" stroke-width="${w + BZ_W * 2}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${color}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
};
const bzO = (extra = '') => `stroke="${BZ.ink}" stroke-width="${BZ_W}" stroke-linejoin="round" ${extra}`;
function bzChar(id: string, sp: BzSpec, x: number, y: number, s = 1, flip = false) {
  const kid = !!sp.kid, T = (sp.tall ?? 1) * (kid ? 0.78 : 1), Wd = sp.wide ?? 1;
  const skin = sp.face === 'pale' ? '#c9d3dc' : sp.face === 'dry' ? '#7a6a55' : sp.face === 'dead' ? '#9aa39a' : (sp.skin || BZ.skin);
  const hr = kid ? 88 : 92, legL = 200 * T, bodyH = (kid ? 230 : 290) * T, bodyW = 150 * Wd, hipY = -legL, bodyTop = hipY - bodyH + 40, headY = bodyTop - hr * 0.62;
  const pants = sp.dress ? skin : (sp.pants || BZ.navy), shoes = sp.shoes || BZ.ink, limbW = kid ? 18 : 20;
  // legs (pivot at the hip)
  const leg = (cls: string, lx: number) => `<g transform="translate(${lx} ${hipY})"><g class="${cls}">${bzLimb(legL - 18, limbW + 2, pants)}<ellipse cx="${lx < 0 ? -8 : 8}" cy="${legL - 10}" rx="30" ry="15" fill="${shoes}" ${bzO()}/></g></g>`;
  // arms (pivot at the shoulder)
  const sleeve = sp.dress ? sp.dress : sp.top;
  const arm = (cls: string, ax: number) => `<g transform="translate(${ax} ${bodyTop + 55})"><g class="${cls}">${bzLimb(170 * T, limbW, sleeve, ax < 0 ? -10 : 10, ax < 0 ? -12 : 12)}
    <circle cx="${ax < 0 ? -10 : 10}" cy="${170 * T + 6}" r="${kid ? 15 : 17}" fill="${skin}" ${bzO()}/>
    ${sp.claws ? [-8, 0, 8].map((c) => `<path d="M${(ax < 0 ? -10 : 10) + c} ${170 * T + 18} l${c * 0.3} 26" stroke="${BZ.ink}" stroke-width="5" stroke-linecap="round"/>`).join('') : ''}</g></g>`;
  // body: a capsule (a dress flares at the bottom)
  const body = sp.dress
    ? `<path d="M${-bodyW * 0.42} ${bodyTop + 30} Q 0 ${bodyTop - 30} ${bodyW * 0.42} ${bodyTop + 30} L ${bodyW * 0.75} ${hipY + 60} Q 0 ${hipY + 90} ${-bodyW * 0.75} ${hipY + 60} Z" fill="${sp.dress}" ${bzO()}/>`
    : `<rect x="${-bodyW / 2}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" rx="${bodyW / 2}" fill="${sp.top}" ${bzO()}/>`;
  const stripe = sp.top2 ? `<path d="M${-bodyW / 2 + 6} ${bodyTop + bodyH * 0.38} h${bodyW - 12}" stroke="${sp.top2}" stroke-width="18"/>` : '';
  const belt = sp.belt ? `<path d="M${-bodyW / 2 + 4} ${hipY - 20} h${bodyW - 8}" stroke="${sp.belt}" stroke-width="16"/>` : '';
  const badge = sp.badge ? `<path d="M${bodyW * 0.18} ${bodyTop + 70} h26 v22 l-13 10 l-13 -10z" fill="${sp.badge}" ${bzO('stroke-width="4"')}/>` : '';
  const ribs = sp.ribs ? [0, 1, 2, 3].map((i) => `<path d="M${-bodyW * 0.3} ${bodyTop + 70 + i * 30} q ${bodyW * 0.3} 14 ${bodyW * 0.6} 0" stroke="${BZ.ink}" stroke-width="4" fill="none" opacity="0.7"/>`).join('') : '';
  // the head: circle, hair, eyes and mouths (all expressions drawn; only one of each is shown)
  const hairC = sp.hair?.color || BZ.ink, st = sp.hair?.style || 'short';
  let hairBack = '', hairFront = '';
  if (st === 'long') { hairBack = `<path d="M${-hr - 10} ${-10} Q ${-hr - 30} ${hr * 1.9} ${-hr * 0.4} ${hr * 2.2} L ${hr * 0.4} ${hr * 2.2} Q ${hr + 30} ${hr * 1.9} ${hr + 10} ${-10} Z" fill="${hairC}" ${bzO()}/>`;
    hairFront = `<path d="M${-hr} ${-5} Q ${-hr} ${-hr - 15} 0 ${-hr - 12} Q ${hr} ${-hr - 15} ${hr} ${-5} Q ${hr * 0.4} ${-hr * 0.55} ${-hr * 0.1} ${-hr * 0.45} Q ${-hr * 0.6} ${-hr * 0.35} ${-hr} ${-5} Z" fill="${hairC}" ${bzO()}/>`; }
  else if (st === 'afro') hairBack = [[-0.75, -0.6], [-0.35, -0.95], [0.15, -1.0], [0.6, -0.8], [0.9, -0.35], [-0.95, -0.2]].map(([a, b]) => `<circle cx="${a * hr}" cy="${b * hr}" r="${hr * 0.42}" fill="${hairC}" ${bzO()}/>`).join('');
  else if (st === 'bun') { hairBack = `<circle cx="0" cy="${-hr * 1.12}" r="${hr * 0.38}" fill="${hairC}" ${bzO()}/>`; hairFront = `<path d="M${-hr} ${-hr * 0.05} Q ${-hr} ${-hr - 8} 0 ${-hr - 6} Q ${hr} ${-hr - 8} ${hr} ${-hr * 0.05} Q ${hr * 0.6} ${-hr * 0.6} 0 ${-hr * 0.55} Q ${-hr * 0.6} ${-hr * 0.6} ${-hr} ${-hr * 0.05} Z" fill="${hairC}" ${bzO()}/>`; }
  else if (st === 'pony') { hairBack = `<path d="M${hr * 0.6} ${-hr * 0.5} Q ${hr * 1.5} ${-hr * 0.2} ${hr * 1.2} ${hr * 0.9} Q ${hr * 1.0} ${hr * 0.2} ${hr * 0.5} ${-hr * 0.1} Z" fill="${hairC}" ${bzO()}/>`;
    hairFront = `<path d="M${-hr} ${-hr * 0.1} Q ${-hr} ${-hr - 8} 0 ${-hr - 6} Q ${hr} ${-hr - 8} ${hr} ${-hr * 0.1} Q ${hr * 0.3} ${-hr * 0.7} ${-hr} ${-hr * 0.1} Z" fill="${hairC}" ${bzO()}/>`; }
  else if (st === 'short' || st === 'spiky' || st === 'messy') hairFront = `<path d="M${-hr * 0.98} ${-hr * 0.2} Q ${-hr} ${-hr - 10} 0 ${-hr - 8} Q ${hr} ${-hr - 10} ${hr * 0.98} ${-hr * 0.2} ${st === 'spiky' ? `L ${hr * 0.6} ${-hr * 0.62} L ${hr * 0.3} ${-hr * 0.4} L 0 ${-hr * 0.7} L ${-hr * 0.3} ${-hr * 0.45} L ${-hr * 0.6} ${-hr * 0.65}` : st === 'messy' ? `Q ${hr * 0.5} ${-hr * 0.45} ${hr * 0.2} ${-hr * 0.7} Q ${-hr * 0.2} ${-hr * 0.4} ${-hr * 0.5} ${-hr * 0.68}` : `Q 0 ${-hr * 0.55} ${-hr * 0.98} ${-hr * 0.2}`} Z" fill="${hairC}" ${bzO()}/>`;
  const e = hr * 0.3, ey = -hr * 0.05, eyes = `
    <g class="ey ey-dot"><ellipse cx="${-e}" cy="${ey}" rx="9" ry="13" fill="${BZ.ink}"/><ellipse cx="${e}" cy="${ey}" rx="9" ry="13" fill="${BZ.ink}"/></g>
    <g class="ey ey-wide" opacity="0"><circle cx="${-e}" cy="${ey}" r="22" fill="#fff" ${bzO('stroke-width="5"')}/><circle cx="${e}" cy="${ey}" r="22" fill="#fff" ${bzO('stroke-width="5"')}/><circle cx="${-e + 3}" cy="${ey + 2}" r="5" fill="${BZ.ink}"/><circle cx="${e - 3}" cy="${ey + 2}" r="5" fill="${BZ.ink}"/></g>
    <g class="ey ey-closed" opacity="0"><path d="M${-e - 14} ${ey + 4} Q ${-e} ${ey - 12} ${-e + 14} ${ey + 4}" stroke="${BZ.ink}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${e - 14} ${ey + 4} Q ${e} ${ey - 12} ${e + 14} ${ey + 4}" stroke="${BZ.ink}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <g class="ey ey-half" opacity="0"><path d="M${-e - 16} ${ey - 2} h32" stroke="${BZ.ink}" stroke-width="7" stroke-linecap="round"/><ellipse cx="${-e}" cy="${ey + 5}" rx="8" ry="6" fill="${BZ.ink}"/><path d="M${e - 16} ${ey - 2} h32" stroke="${BZ.ink}" stroke-width="7" stroke-linecap="round"/><ellipse cx="${e}" cy="${ey + 5}" rx="8" ry="6" fill="${BZ.ink}"/></g>
    <g class="ey ey-angry" opacity="0"><ellipse cx="${-e}" cy="${ey + 3}" rx="9" ry="11" fill="${BZ.ink}"/><ellipse cx="${e}" cy="${ey + 3}" rx="9" ry="11" fill="${BZ.ink}"/><path d="M${-e - 20} ${ey - 26} L${-e + 12} ${ey - 14}" stroke="${BZ.ink}" stroke-width="7" stroke-linecap="round"/><path d="M${e + 20} ${ey - 26} L${e - 12} ${ey - 14}" stroke="${BZ.ink}" stroke-width="7" stroke-linecap="round"/></g>
    <g class="ey ey-glow" opacity="0"><circle cx="${-e}" cy="${ey}" r="30" fill="${sp.glow || '#ff3a2a'}" opacity="0.3"/><circle cx="${e}" cy="${ey}" r="30" fill="${sp.glow || '#ff3a2a'}" opacity="0.3"/><ellipse cx="${-e}" cy="${ey}" rx="16" ry="11" fill="${sp.glow || '#ff3a2a'}" ${bzO('stroke-width="4"')}/><ellipse cx="${e}" cy="${ey}" rx="16" ry="11" fill="${sp.glow || '#ff3a2a'}" ${bzO('stroke-width="4"')}/><ellipse cx="${-e}" cy="${ey}" rx="3" ry="9" fill="${BZ.ink}"/><ellipse cx="${e}" cy="${ey}" rx="3" ry="9" fill="${BZ.ink}"/></g>
    <g class="ey ey-dead" opacity="0"><circle cx="${-e}" cy="${ey}" r="20" fill="#1a1418"/><circle cx="${e}" cy="${ey}" r="20" fill="#1a1418"/><circle cx="${-e}" cy="${ey}" r="4" fill="#e8f0ff"/><circle cx="${e}" cy="${ey}" r="4" fill="#e8f0ff"/></g>`;
  const my = hr * 0.42, mouths = `
    <g class="mo mo-smile"><path d="M-22 ${my - 6} Q 0 ${my + 14} 22 ${my - 6}" stroke="${BZ.ink}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <g class="mo mo-flat" opacity="0"><path d="M-16 ${my} h32" stroke="${BZ.ink}" stroke-width="6" stroke-linecap="round"/></g>
    <g class="mo mo-open" opacity="0"><ellipse cx="0" cy="${my + 4}" rx="17" ry="20" fill="${BZ.red}" ${bzO('stroke-width="5"')}/></g>
    <g class="mo mo-grin" opacity="0"><path d="M-28 ${my - 8} Q 0 ${my + 26} 28 ${my - 8} Z" fill="#fff" ${bzO('stroke-width="5"')}/></g>
    <g class="mo mo-frown" opacity="0"><path d="M-20 ${my + 8} Q 0 ${my - 8} 20 ${my + 8}" stroke="${BZ.ink}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <g class="mo mo-fangs" opacity="0"><path d="M-40 ${my - 12} Q 0 ${my + 34} 40 ${my - 12} Z" fill="#3a0e12" ${bzO('stroke-width="5"')}/><path d="M-34 ${my - 10} l7 14 l7 -12 l7 14 l7 -14 l7 14 l7 -14 l7 14 l7 -12 l7 12" fill="#f4f0e4" stroke="${BZ.ink}" stroke-width="3" stroke-linejoin="round"/></g>
    <g class="mo mo-o" opacity="0"><ellipse cx="0" cy="${my + 2}" rx="10" ry="12" fill="${BZ.red}" ${bzO('stroke-width="4"')}/></g>`;
  const brows = `<g class="brows"><path d="M${-e - 18} ${ey - 30} Q ${-e} ${ey - 38} ${-e + 16} ${ey - 30}" stroke="${BZ.ink}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${e - 16} ${ey - 30} Q ${e} ${ey - 38} ${e + 18} ${ey - 30}" stroke="${BZ.ink}" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
  const beard = sp.beard ? `<path d="M${-hr * 0.8} ${hr * 0.2} Q ${-hr * 0.7} ${hr * 1.25} 0 ${hr * 1.3} Q ${hr * 0.7} ${hr * 1.25} ${hr * 0.8} ${hr * 0.2} Q ${hr * 0.4} ${hr * 0.75} 0 ${hr * 0.7} Q ${-hr * 0.4} ${hr * 0.75} ${-hr * 0.8} ${hr * 0.2} Z" fill="${sp.beard}" ${bzO()}/>` : '';
  const mustache = sp.mustache ? `<path d="M-34 ${my - 14} Q -18 ${my - 28} 0 ${my - 16} Q 18 ${my - 28} 34 ${my - 14} Q 18 ${my - 4} 0 ${my - 10} Q -18 ${my - 4} -34 ${my - 14} Z" fill="${sp.mustache}" ${bzO('stroke-width="4"')}/>` : '';
  const glasses = sp.glasses ? `<g fill="none" stroke="${BZ.ink}" stroke-width="5"><circle cx="${-e}" cy="${ey}" r="24"/><circle cx="${e}" cy="${ey}" r="24"/><path d="M${-e + 24} ${ey} h${2 * e - 48}"/></g>` : '';
  const cotton = sp.cotton ? `<g class="cotton"><circle cx="-8" cy="${hr * 0.2}" r="8" fill="#fff" ${bzO('stroke-width="3"')}/><circle cx="8" cy="${hr * 0.2}" r="8" fill="#fff" ${bzO('stroke-width="3"')}/>
    <g class="nosebleed" opacity="0"><circle cx="-8" cy="${hr * 0.2}" r="8" fill="${BZ.red}"/><circle cx="8" cy="${hr * 0.2}" r="8" fill="${BZ.red}"/><path d="M-8 ${hr * 0.25} q -2 30 2 52" stroke="${BZ.blood}" stroke-width="7" stroke-linecap="round" fill="none"/></g></g>` : '';
  const cheeks = sp.face === 'dry' ? `<path d="M${-hr * 0.55} ${hr * 0.05} q 12 28 2 50 M${hr * 0.55} ${hr * 0.05} q -12 28 -2 50" stroke="${BZ.ink}" stroke-width="4" fill="none" opacity="0.6"/>` : sp.face === 'pale' ? `<ellipse cx="${-e}" cy="${ey + 24}" rx="22" ry="10" fill="#7a8aa0" opacity="0.5"/><ellipse cx="${e}" cy="${ey + 24}" rx="22" ry="10" fill="#7a8aa0" opacity="0.5"/>` : '';
  let hat = '';
  if (sp.hat?.kind === 'straw') hat = `<ellipse cx="0" cy="${-hr * 0.65}" rx="${hr * 1.6}" ry="${hr * 0.28}" fill="${sp.hat.color}" ${bzO()}/><path d="M${-hr * 0.7} ${-hr * 0.7} Q ${-hr * 0.7} ${-hr * 1.45} 0 ${-hr * 1.45} Q ${hr * 0.7} ${-hr * 1.45} ${hr * 0.7} ${-hr * 0.7} Z" fill="${sp.hat.color}" ${bzO()}/><path d="M${-hr * 0.7} ${-hr * 0.85} h${hr * 1.4}" stroke="${BZ.red}" stroke-width="10"/>`;
  else if (sp.hat?.kind === 'fedora') hat = `<ellipse cx="0" cy="${-hr * 0.55}" rx="${hr * 1.45}" ry="${hr * 0.24}" fill="${sp.hat.color}" ${bzO()}/><path d="M${-hr * 0.8} ${-hr * 0.6} Q ${-hr * 0.85} ${-hr * 1.5} ${-hr * 0.2} ${-hr * 1.35} L 0 ${-hr * 1.2} L ${hr * 0.2} ${-hr * 1.35} Q ${hr * 0.85} ${-hr * 1.5} ${hr * 0.8} ${-hr * 0.6} Z" fill="${sp.hat.color}" ${bzO()}/><path d="M${-hr * 0.8} ${-hr * 0.72} h${hr * 1.6}" stroke="${BZ.ink}" stroke-width="12"/>`;
  else if (sp.hat?.kind === 'cap') hat = `<path d="M${-hr * 0.95} ${-hr * 0.3} Q ${-hr} ${-hr * 1.15} 0 ${-hr * 1.1} Q ${hr} ${-hr * 1.15} ${hr * 0.95} ${-hr * 0.3} Z" fill="${sp.hat.color}" ${bzO()}/><path d="M${-hr * 0.9} ${-hr * 0.32} Q 0 ${-hr * 0.1} ${hr * 1.3} ${-hr * 0.35} Q 0 ${-hr * 0.5} ${-hr * 0.9} ${-hr * 0.32} Z" fill="${BZ.ink}"/>`;
  else if (sp.hat?.kind === 'beanie') hat = `<path d="M${-hr * 0.98} ${-hr * 0.25} Q ${-hr} ${-hr * 1.2} 0 ${-hr * 1.15} Q ${hr} ${-hr * 1.2} ${hr * 0.98} ${-hr * 0.25} Z" fill="${sp.hat.color}" ${bzO()}/>`;
  const head = `<g transform="translate(0 ${headY})"><g class="hd">${sp.headBack || ''}${hairBack}<circle r="${hr}" fill="${skin}" ${bzO()}/>${cheeks}${hairFront}${beard}${sp.headFront || ''}${eyes}${brows}${glasses}${mustache}${mouths}${cotton}${hat}</g></g>`;
  return `<g id="${id}"><g class="mv"><g class="pos" transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    ${leg('lL', -bodyW * 0.22)}${leg('lR', bodyW * 0.22)}${arm('aL', -bodyW * 0.42)}
    <g class="bd">${body}${stripe}${belt}${badge}${ribs}${sp.extra || ''}</g>${arm('aR', bodyW * 0.42)}${head}</g></g></g>`;
}
// ---- motion on the timeline (absolute times). sel = '#sc-xxx #id' (use $('#id'))
const BZ_EYES = ['dot', 'wide', 'closed', 'half', 'angry', 'dead', 'glow'], BZ_MOUTHS = ['smile', 'flat', 'open', 'grin', 'frown', 'o', 'fangs'];
function bzFace(tl: gsap.core.Timeline, sel: string, t: number, eyes?: string, mouth?: string) {
  if (eyes) BZ_EYES.forEach((n) => tl.set(`${sel} .ey-${n}`, { opacity: n === eyes ? 1 : 0 }, t));
  if (mouth) BZ_MOUTHS.forEach((n) => tl.set(`${sel} .mo-${n}`, { opacity: n === mouth ? 1 : 0 }, t));
}
// the mouth opens and closes on the syllables of this speaker's words inside [t0, t1); rest is the mouth to return to
function bzTalk(tl: gsap.core.Timeline, sel: string, who: string, t0: number, t1: number, rest = 'smile', open = 'open') {
  const wins = BZ_TALK.lines.filter((l) => l.who === who && l.t1 > t0 && l.t0 < t1);
  for (const L of wins) for (const w of WORDS) {
    if (w.t0 < Math.max(t0, L.t0 - 0.05) || w.t0 >= Math.min(t1, L.t1)) continue;
    const syl = Math.max(1, (w.w.match(/[aeiouáéíóúâêôãõà]+/gi) || []).length), d = (w.t1 - w.t0) / syl;
    for (let k = 0; k < syl; k++) { const a = w.t0 + k * d; bzFace(tl, sel, a, undefined, open); if (d > 0.09) bzFace(tl, sel, a + d * 0.6, undefined, 'o'); }
    bzFace(tl, sel, Math.min(t1 - 0.01, w.t1), undefined, rest);
  }
}
function bzBlink(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, every = 2.9, seed = 0) {
  for (let t = t0 + 0.6 + (seed % 1.3); t < t1 - 0.2; t += every + ((seed * 7.3 + t) % 1.1)) tl.fromTo(`${sel} .ey`, { scaleY: 1, transformOrigin: '50% 50%' }, { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1, ease: 'none' }, t);
}
// idle: breathing (the body and head bob), limbs settle
function bzBob(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, amp = 5) {
  tl.fromTo(`${sel} .bd, ${sel} .hd`, { y: 0 }, { y: -amp, duration: 0.9, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.9) - 1), ease: 'sine.inOut' }, t0);
}
// walk / run from x0 to x1 (screen px) between t0 and t1: legs and arms swing, the body bobs
function bzWalk(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, x0: number, x1: number, run = false) {
  const step = run ? 0.16 : 0.3, n = Math.max(2, Math.floor((t1 - t0) / step)), a = run ? 38 : 24;
  tl.fromTo(sel, { x: x0 }, { x: x1, duration: t1 - t0, ease: 'none' }, t0);
  tl.fromTo(`${sel} .lL`, { rotation: -a, transformOrigin: '50% 0%' }, { rotation: a, duration: step, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .lR`, { rotation: a, transformOrigin: '50% 0%' }, { rotation: -a, duration: step, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .aL`, { rotation: a * 0.8, transformOrigin: '50% 0%' }, { rotation: -a * 0.8, duration: step, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .aR`, { rotation: -a * 0.8, transformOrigin: '50% 0%' }, { rotation: a * 0.8, duration: step, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0);
  tl.fromTo(`${sel} .mv`, { y: 0 }, { y: run ? -22 : -10, duration: step / 2, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t0);
}
// a pose: rotate limbs (degrees) at time t over d seconds. p = { aL, aR, lL, lR, hd, pos }
function bzPose(tl: gsap.core.Timeline, sel: string, t: number, p: Record<string, number>, d = 0.25) {
  for (const k of Object.keys(p)) tl.to(`${sel} .${k === 'pos' ? 'mv' : k}`, { rotation: p[k], transformOrigin: k === 'hd' ? '50% 90%' : k === 'pos' ? '50% 100%' : '50% 0%', duration: d, ease: 'power2.out' }, t);
}
function bzShake(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, amp = 4) {
  tl.fromTo(`${sel} .mv`, { x: -amp }, { x: amp, duration: 0.05, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.05)), ease: 'none' }, t0);
}
const bzPop = (tl: gsap.core.Timeline, sel: string, t: number, d = 0.4) => tl.fromTo(sel, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: d, ease: 'back.out(2)' }, t);
// ---- sets
let BZ_UID = 0;
function bzSky(top: string, bottom: string, h = 1920) { const g = 'bzsky' + (BZ_UID++); return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="1080" height="${h}" fill="url(#${g})"/>`; }
function bzStars(n: number, seed = 1, yMax = 1100) { let s = ''; let r = seed * 9301 + 49297; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < n; i++) s += `<circle cx="${(rnd() * 1080).toFixed(0)}" cy="${(rnd() * yMax).toFixed(0)}" r="${(1.5 + rnd() * 3).toFixed(1)}" fill="#fff" opacity="${(0.4 + rnd() * 0.6).toFixed(2)}"/>`; return `<g class="stars">${s}</g>`; }
function bzMoon(id: string, x: number, y: number, r = 70) { return `<g id="${id}"><circle cx="${x}" cy="${y}" r="${r * 1.8}" fill="#fff" opacity="0.06"/><circle cx="${x}" cy="${y}" r="${r}" fill="${BZ.moon}" ${bzO()}/><circle cx="${x - r * 0.3}" cy="${y - r * 0.2}" r="${r * 0.16}" fill="#cfc7b0"/><circle cx="${x + r * 0.25}" cy="${y + r * 0.25}" r="${r * 0.11}" fill="#cfc7b0"/></g>`; }
function bzSun(x: number, y: number, r = 110, c = '#ffd27a') { return `<circle cx="${x}" cy="${y}" r="${r * 1.6}" fill="${c}" opacity="0.25"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`; }
function bzFog(y: number, c = BZ.fog, op = 0.35) { return `<g class="fog" opacity="${op}">${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${-100 + i * 300}" cy="${y + (i % 2) * 40}" rx="320" ry="70" fill="${c}"/>`).join('')}</g>`; }
function bzLamp(x: number, y: number, h = 520, on = true, flip = false) { const f = flip ? -1 : 1;
  return `<g class="lamp"><path d="M${x} ${y} v${-h} q0 -30 ${f * 30} -30 h${f * 60}" stroke="${BZ.ink}" stroke-width="22" fill="none"/><path d="M${x} ${y} v${-h} q0 -30 ${f * 30} -30 h${f * 60}" stroke="#8a8f9e" stroke-width="10" fill="none"/>
    <rect x="${x + f * 60 - 40}" y="${y - h - 46}" width="80" height="24" rx="10" fill="${on ? '#fff1c2' : '#555'}" ${bzO()}/>${on ? `<circle cx="${x + f * 60}" cy="${y - h - 20}" r="120" fill="#fff4c8" opacity="0.13"/>` : ''}</g>`; }
function bzGround(y: number, c = '#3c3f52', line = BZ.yellow) { return `<rect x="-20" y="${y}" width="1120" height="${1940 - y}" fill="${c}" ${bzO()}/>${line ? [...Array(9)].map((_, i) => `<rect x="${i * 130}" y="${y + 8}" width="70" height="20" fill="${line}"/>`).join('') : ''}`; }
// a row of flat buildings with lit windows
function bzBuildings(y: number, seed = 1, cols = ['#3a3256', '#4a3a66', '#2f2a48'], lit = 0.5) { let s = '', x = -40, r = seed * 7919; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  while (x < 1100) { const w = 140 + rnd() * 160, h = 220 + rnd() * 320, c = cols[Math.floor(rnd() * cols.length)];
    s += `<rect x="${x}" y="${y - h}" width="${w}" height="${h + 40}" fill="${c}" ${bzO()}/>`;
    for (let wy = y - h + 30; wy < y - 40; wy += 60) for (let wx = x + 22; wx < x + w - 40; wx += 55) if (rnd() < lit) s += `<rect x="${wx}" y="${wy}" width="26" height="30" fill="#ffd97a"/>`;
    x += w + 10; }
  return `<g class="bldg">${s}</g>`; }
// a tilted plate with big condensed letters (place and time cards); id to animate it in
function bzSign(id: string, text: string, x: number, y: number, rot = -4, bg = BZ.yellow, fg = BZ.ink, size = 120, sub?: { text: string; bg: string; fg: string }) {
  const w = text.length * size * 0.55 + 80;
  return `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${rot})"><rect x="${-w / 2}" y="${-size * 0.7}" width="${w}" height="${size * 1.25}" rx="14" fill="${bg}" ${bzO('stroke-width="9"')}/>
    <text x="0" y="${size * 0.35}" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="${size}" fill="${fg}">${text}</text>
    ${sub ? `<g transform="translate(0 ${size * 1.05}) rotate(${-rot * 0.6})"><rect x="${-sub.text.length * size * 0.3 - 30}" y="${-size * 0.45}" width="${sub.text.length * size * 0.6 + 60}" height="${size * 0.85}" rx="10" fill="${sub.bg}" ${bzO('stroke-width="7"')}/><text x="0" y="${size * 0.22}" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="${size * 0.65}" fill="${sub.fg}">${sub.text}</text></g>` : ''}</g></g>`; }
// a vignette on top of everything (darker corners) and a flash for impacts
const bzVignette = (k = 0.55) => `<defs><radialGradient id="bzvig${BZ_UID}" cx="0.5" cy="0.45" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${k}"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#bzvig${BZ_UID++})"/>`;
const bzFlash = (id: string, c = '#fff') => `<rect id="${id}" width="1080" height="1920" fill="${c}" opacity="0"/>`;
// ---- shot helpers (every shot draws inside #cam; overlays stay outside it)
const bzShot = (body: string, over = '') => svg(`<g id="cam">${body}</g>${over}`);
// a slow camera push (or pull: b < a) around (ox, oy)
function bzPush(tl: gsap.core.Timeline, sel: string, t0: number, t1: number, a = 1, b = 1.07, ox = 540, oy = 900) {
  tl.fromTo(sel, { scale: a, svgOrigin: `${ox} ${oy}` }, { scale: b, svgOrigin: `${ox} ${oy}`, duration: t1 - t0, ease: 'none' }, t0);
}
// a flash overlay that fades out (an impact)
const bzHit = (tl: gsap.core.Timeline, sel: string, t: number, k = 0.7) => tl.fromTo(sel, { opacity: k }, { opacity: 0, duration: 0.3, ease: 'power2.out' }, t);
// show something at t with a pop (hidden before)
const bzShow = (tl: gsap.core.Timeline, sel: string, t: number) => { tl.set(sel, { opacity: 1 }, t); bzPop(tl, sel, t, 0.3); };
// the hook plate: visible from the very first frame, then a punch (the first frame of a Short must already hook)
const bzHook = (tl: gsap.core.Timeline, sel: string, t: number) => tl.fromTo(sel, { scale: 1.25, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.35, ease: 'back.out(3)' }, t);
// a big number or word with an outline (hidden until shown)
const bzNum = (id: string, n: string, x: number, y: number, c = '#fff', size = 240) => `<g id="${id}" opacity="0"><text x="${x}" y="${y}" text-anchor="middle" font-family="Anton" font-size="${size}" fill="${c}" stroke="${BZ.ink}" stroke-width="14" paint-order="stroke">${n}</text></g>`;
// the whole frame shakes
const bzQuake = (tl: gsap.core.Timeline, sel: string, t0: number, t1: number, a = 6) => tl.fromTo(sel, { x: -a }, { x: a, duration: 0.05, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 0.05)), ease: 'none' }, t0);
