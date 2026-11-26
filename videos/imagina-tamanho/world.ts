// =====================================================================
//  IMAGINA SÓ: "E se você DOBRASSE de tamanho todo dia?" (base kit shared with the money and gravity videos) (16:9, 1920 x 1080), Brasil Z toon look, bright and funny. Prefix im.
//  Cast (original designs): TUCO (14, the channel's mascot: curly black hair, green jacket with a yellow zip, red sneakers),
//  BIEL (his friend: red cap turned back, orange shirt), DONA CIDA (his mother), the bank manager (on a phone screen),
//  a TV reporter, security guards.
//  Sets: Tuco's room (bed, window, phone), the school canteen, the street football pitch, the old small house and the new
//  big house, the bank call, a TV studio frame, money piles that grow, the exponential chart, Brazil and the world,
//  the bakery price tag (inflation), the chessboard with rice.
//  The HUD (top center): the day and the balance, the channel's signature (imHud).
//  Frame: ground ~ y 900; captions y 860–930 (faces above ~820). Kid T=0.78*tall: head ~ 350*tall*s above the feet.
// =====================================================================
const IM_SPEC: Record<string, BzSpec> = {
  tuco: { kid: true, tall: 1.22, skin: '#a8683e', hair: { style: 'afro', color: '#1c1410' }, top: '#2fa04a', top2: '#f6c744', pants: '#2a3a5a', shoes: '#e0302a' },
  tucoRich: { kid: true, tall: 1.22, skin: '#a8683e', hair: { style: 'afro', color: '#1c1410' }, top: '#2fa04a', top2: '#f6c744', pants: '#2a3a5a', shoes: '#f6c744', glasses: true },
  biel: { kid: true, tall: 1.18, skin: '#e0a070', hat: { kind: 'cap', color: '#d0342c' }, hair: { style: 'short', color: '#5a3a20' }, top: '#f29a4a', pants: '#3a3a4a', shoes: '#f0ece2' },
  mae: { skin: '#a8683e', hair: { style: 'bun', color: '#1c1410' }, top: '#c84a8a', dress: '#c84a8a', shoes: '#3a2a1a' },
  ger: { skin: '#e0a070', hair: { style: 'short', color: '#8a8a8a' }, glasses: true, top: '#2a3a5a', top2: '#e8e4dc', pants: '#2a3a5a', shoes: '#1c1410' },
  rep: { skin: '#c98757', hair: { style: 'long', color: '#5a3020' }, top: '#3a7aff', pants: '#2a2a3a', shoes: '#1c1410' },
  seg: { skin: '#8a5a3a', hair: { style: 'bald', color: '#1c1410' }, glasses: true, top: '#1c1c24', pants: '#1c1c24', shoes: '#0c0c10', wide: 1.3 },
  tio: { skin: '#c98757', hair: { style: 'short', color: '#3a2216' }, mustache: '#3a2216', top: '#e8c86a', pants: '#4a4a5a', shoes: '#3a2a1a', wide: 1.2 },
};
// ---- the "soft" style (this channel's look from now on): round white-lavender heads on a thin neck, small bodies, thin
// legs, navy outlines, simple faces (oval eyes, line brows, a wavy nervous mouth). Every character goes through softChar.
// Same parts and classes as bzChar (.mv .pos .lL .lR .aL .aR .bd .hd, eyes .ey-*, mouths .mo-*), so bzFace / bzTalk /
// bzBlink / bzWalk / bzPose work. Feet at (x, y); head centre ~420*s above the feet; about 540*s tall.
// TUCO (the main character): messy black curls on top, GREEN hoodie with a YELLOW collar and drawstrings, RED sneakers.
const SOFT = { ink: '#1e2350', head: '#ecebfa', shade: '#c9c8ee' };
function softChar(id: string, sp: BzSpec, x: number, y: number, s = 1, flip = false) {
  const N = SOFT.ink, kid = !!sp.kid, top = sp.top, top2 = sp.top2 || '#ffffff', pants = sp.dress ? sp.dress : (sp.pants || '#2a2e52'), shoe = sp.shoes || '#e8e8f4';
  const o = (w = 7) => `stroke="${N}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const hr = 118, hy = -420, legT = -150;
  const leg = (cls: string, lx: number) => `<g transform="translate(${lx} ${legT})"><g class="${cls}"><path d="M0 0 V 132" ${o(22)}/><path d="M0 0 V 132" stroke="${pants}" stroke-width="12" stroke-linecap="round"/><ellipse cx="${lx > 0 ? 8 : -8}" cy="140" rx="24" ry="12" fill="${shoe}" ${o(6)}/></g></g>`;
  const arm = (cls: string, ax: number) => { const d = ax < 0 ? -1 : 1; return `<g transform="translate(${ax} -272)"><g class="${cls}"><path d="M0 0 Q ${d * 10} 60 ${d * 6} 112" fill="none" ${o(24)}/><path d="M0 0 Q ${d * 10} 60 ${d * 6} 112" fill="none" stroke="${top}" stroke-width="14" stroke-linecap="round"/><circle cx="${d * 6}" cy="120" r="14" fill="#ffffff" ${o(6)}/></g></g>`; };
  const skirt = sp.dress ? `<path d="M-60 -170 L -84 -110 H 84 L 60 -170 Z" fill="${sp.dress}" ${o(6)}/>` : '';
  const body = `<g class="bd"><path d="M-60 -282 Q -66 -220 -60 -150 Q 0 -140 60 -150 Q 66 -220 60 -282 Q 0 -296 -60 -282 Z" fill="${top}" ${o()}/>${skirt}
    <path d="M-34 -286 Q 0 -262 34 -286 Q 0 -302 -34 -286 Z" fill="${top2}" ${o(5)}/><path d="M-12 -278 V -230 M12 -278 V -230" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>${sp.top2 ? `<path d="M-60 -168 H 60" stroke="${top2}" stroke-width="10"/>` : ''}${sp.belt ? `<path d="M-58 -160 H 58" stroke="${sp.belt}" stroke-width="10"/>` : ''}</g>`;
  const neck = `<path d="M0 -300 V -268" stroke="${N}" stroke-width="16" stroke-linecap="round"/><path d="M0 -300 V -268" stroke="${SOFT.head}" stroke-width="8" stroke-linecap="round"/>`;
  // hair / hats
  const hc = sp.hair?.color || N, st = sp.hair?.style || 'short';
  let back = '', front = '';
  if (st === 'afro') { back = [[-0.72, -0.62], [-0.36, -0.9], [0.06, -1.0], [0.46, -0.88], [0.78, -0.58]].map(([a, b]) => `<circle cx="${a * hr}" cy="${b * hr}" r="${hr * 0.3}" fill="${hc}" ${o(6)}/>`).join('');
    front = `<path d="M${-hr * 0.86} ${-hr * 0.42} Q ${-hr * 0.4} ${-hr * 0.72} ${-hr * 0.05} ${-hr * 0.5} Q ${hr * 0.35} ${-hr * 0.74} ${hr * 0.86} ${-hr * 0.42} Q ${hr * 0.6} ${-hr * 1.0} 0 ${-hr * 1.0} Q ${-hr * 0.6} ${-hr * 1.0} ${-hr * 0.86} ${-hr * 0.42} Z" fill="${hc}" ${o(6)}/>`; }
  else if (st === 'bun') { back = `<circle cx="0" cy="${-hr * 1.05}" r="${hr * 0.32}" fill="${hc}" ${o(6)}/>`; front = `<path d="M${-hr * 0.98} ${-hr * 0.1} Q ${-hr} ${-hr * 1.02} 0 ${-hr} Q ${hr} ${-hr * 1.02} ${hr * 0.98} ${-hr * 0.1} Q ${hr * 0.5} ${-hr * 0.62} 0 ${-hr * 0.58} Q ${-hr * 0.5} ${-hr * 0.62} ${-hr * 0.98} ${-hr * 0.1} Z" fill="${hc}" ${o(6)}/>`; }
  else if (st === 'long') { back = `<path d="M${-hr * 1.05} ${-hr * 0.2} Q ${-hr * 1.15} ${hr * 1.6} ${-hr * 0.6} ${hr * 1.9} H ${hr * 0.6} Q ${hr * 1.15} ${hr * 1.6} ${hr * 1.05} ${-hr * 0.2} Z" fill="${hc}" ${o(6)}/>`; front = `<path d="M${-hr} ${-hr * 0.05} Q ${-hr} ${-hr * 1.05} 0 ${-hr * 1.02} Q ${hr} ${-hr * 1.05} ${hr} ${-hr * 0.05} L ${hr * 0.7} ${-hr * 0.5} L ${hr * 0.4} ${-hr * 0.3} L ${hr * 0.1} ${-hr * 0.55} L ${-hr * 0.2} ${-hr * 0.32} L ${-hr * 0.5} ${-hr * 0.56} L ${-hr * 0.78} ${-hr * 0.3} Z" fill="${hc}" ${o(6)}/>`; }
  else if (st !== 'bald') front = `<path d="M${-hr * 0.97} ${-hr * 0.25} Q ${-hr} ${-hr * 1.03} 0 ${-hr * 1.0} Q ${hr} ${-hr * 1.03} ${hr * 0.97} ${-hr * 0.25} Q ${hr * 0.4} ${-hr * 0.62} ${-hr * 0.97} ${-hr * 0.25} Z" fill="${hc}" ${o(6)}/>`;
  let hat = '';
  if (sp.hat?.kind === 'cap') hat = `<path d="M${-hr * 0.98} ${-hr * 0.3} Q ${-hr} ${-hr * 1.08} 0 ${-hr * 1.05} Q ${hr} ${-hr * 1.08} ${hr * 0.98} ${-hr * 0.3} Z" fill="${sp.hat.color}" ${o(6)}/><path d="M${hr * 0.3} ${-hr * 0.34} Q ${hr * 1.1} ${-hr * 0.38} ${hr * 1.4} ${-hr * 0.3} Q ${hr * 1.0} ${-hr * 0.5} ${hr * 0.3} ${-hr * 0.5} Z" fill="${sp.hat.color}" ${o(6)}/>`;
  else if (sp.hat?.kind === 'beanie') hat = `<path d="M${-hr * 0.98} ${-hr * 0.25} Q ${-hr} ${-hr * 1.1} 0 ${-hr * 1.05} Q ${hr} ${-hr * 1.1} ${hr * 0.98} ${-hr * 0.25} Z" fill="${sp.hat.color}" ${o(6)}/>`;
  const e = 40, ey = 4;
  const eyes = `<g class="ey ey-dot"><ellipse cx="${-e}" cy="${ey}" rx="11" ry="15" fill="${N}"/><ellipse cx="${e}" cy="${ey}" rx="11" ry="15" fill="${N}"/><circle cx="${-e + 3}" cy="${ey - 5}" r="3.5" fill="#fff"/><circle cx="${e + 3}" cy="${ey - 5}" r="3.5" fill="#fff"/></g>
    <g class="ey ey-wide" opacity="0"><circle cx="${-e}" cy="${ey}" r="22" fill="#fff" ${o(6)}/><circle cx="${e}" cy="${ey}" r="22" fill="#fff" ${o(6)}/><circle cx="${-e}" cy="${ey + 2}" r="7" fill="${N}"/><circle cx="${e}" cy="${ey + 2}" r="7" fill="${N}"/></g>
    <g class="ey ey-closed" opacity="0"><path d="M${-e - 20} ${ey} H ${-e + 20} M${e - 20} ${ey} H ${e + 20}" ${o(8)}/></g>
    <g class="ey ey-half" opacity="0"><path d="M${-e - 20} ${ey - 6} H ${-e + 20} M${e - 20} ${ey - 6} H ${e + 20}" ${o(7)}/><ellipse cx="${-e}" cy="${ey + 6}" rx="10" ry="9" fill="${N}"/><ellipse cx="${e}" cy="${ey + 6}" rx="10" ry="9" fill="${N}"/></g>
    <g class="ey ey-angry" opacity="0"><ellipse cx="${-e}" cy="${ey + 4}" rx="11" ry="13" fill="${N}"/><ellipse cx="${e}" cy="${ey + 4}" rx="11" ry="13" fill="${N}"/><path d="M${-e - 22} ${ey - 30} L ${-e + 16} ${ey - 16} M${e + 22} ${ey - 30} L ${e - 16} ${ey - 16}" ${o(8)}/></g>
    <g class="ey ey-dead" opacity="0"><path d="M${-e - 14} ${ey - 14} l28 28 M${-e + 14} ${ey - 14} l-28 28 M${e - 14} ${ey - 14} l28 28 M${e + 14} ${ey - 14} l-28 28" ${o(7)}/></g>
    <g class="ey ey-glow" opacity="0"><circle cx="${-e}" cy="${ey}" r="26" fill="${sp.glow || '#ffe27a'}" opacity="0.35"/><circle cx="${e}" cy="${ey}" r="26" fill="${sp.glow || '#ffe27a'}" opacity="0.35"/><ellipse cx="${-e}" cy="${ey}" rx="13" ry="16" fill="${sp.glow || '#ffe27a'}" ${o(5)}/><ellipse cx="${e}" cy="${ey}" rx="13" ry="16" fill="${sp.glow || '#ffe27a'}" ${o(5)}/></g>`;
  const brows = `<g class="brows"><path d="M${-e - 24} ${ey - 40} H ${-e + 20} M${e - 20} ${ey - 40} H ${e + 24}" ${o(9)}/></g>`;
  const my = 60, mouths = `<g class="mo mo-smile"><path d="M-22 ${my - 6} Q 0 ${my + 12} 22 ${my - 6}" fill="none" ${o(7)}/></g>
    <g class="mo mo-flat" opacity="0"><path d="M-16 ${my} H 16" ${o(7)}/></g>
    <g class="mo mo-open" opacity="0"><path d="M-24 ${my - 10} Q 0 ${my - 14} 24 ${my - 10} Q 20 ${my + 26} 0 ${my + 28} Q -20 ${my + 26} -24 ${my - 10} Z" fill="#c8384a" ${o(6)}/></g>
    <g class="mo mo-grin" opacity="0"><path d="M-34 ${my - 10} Q 0 ${my - 6} 34 ${my - 10} Q 28 ${my + 24} 0 ${my + 26} Q -28 ${my + 24} -34 ${my - 10} Z" fill="#fff" ${o(6)}/></g>
    <g class="mo mo-frown" opacity="0"><path d="M-28 ${my} l 9 -8 l 9 8 l 10 -8 l 10 8 l 9 -8 l 9 8" fill="none" ${o(6)}/></g>
    <g class="mo mo-o" opacity="0"><ellipse cx="0" cy="${my + 2}" rx="11" ry="14" fill="#c8384a" ${o(5)}/></g>
    <g class="mo mo-fangs" opacity="0"><path d="M-34 ${my - 10} Q 0 ${my + 30} 34 ${my - 10} Z" fill="#c8384a" ${o(6)}/></g>`;
  const glasses = sp.glasses ? `<g fill="none" ${o(5)}><circle cx="${-e}" cy="${ey}" r="26"/><circle cx="${e}" cy="${ey}" r="26"/><path d="M${-e + 26} ${ey} H ${e - 26}"/></g>` : '';
  const stache = sp.mustache ? `<path d="M-30 ${my - 18} Q -14 ${my - 30} 0 ${my - 18} Q 14 ${my - 30} 30 ${my - 18} Q 14 ${my - 8} 0 ${my - 14} Q -14 ${my - 8} -30 ${my - 18} Z" fill="${sp.mustache}" ${o(4)}/>` : '';
  const head = `<g transform="translate(0 ${hy})"><g class="hd">${back}<circle r="${hr}" fill="${SOFT.head}" ${o(8)}/><path d="M${hr * 0.2} ${-hr * 0.97} A ${hr} ${hr} 0 0 1 ${hr * 0.2} ${hr * 0.97} A ${hr * 0.8} ${hr} 0 0 0 ${hr * 0.2} ${-hr * 0.97} Z" fill="${SOFT.shade}" opacity="0.55"/><path d="M${-hr * 0.55} ${-hr * 0.72} Q ${-hr * 0.2} ${-hr * 0.92} ${hr * 0.2} ${-hr * 0.86}" stroke="#fff" stroke-width="8" fill="none" opacity="0.7" stroke-linecap="round"/>
    ${front}${hat}${kid ? '' : ''}${eyes}${brows}${glasses}${stache}${mouths}</g></g>`;
  return `<g id="${id}" class="bzc"><g class="mv"><g class="pos" transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${sp.noShadow ? '' : `<ellipse class="shadow" cx="0" cy="8" rx="80" ry="16" fill="${N}" opacity="0.25"/>`}
    ${leg('lL', -26)}${leg('lR', 26)}${arm('aL', -58)}${body}${arm('aR', 58)}${neck}${head}</g></g></g>`;
}
const imChar = (k: string, id: string, x: number, y: number, s = 1, flip = false) => softChar(id, k === 'tuco' ? { kid: true, top: '#2fa04a', top2: '#f6c744', hair: { style: 'afro', color: '#1c1410' }, pants: '#26304e', shoes: '#e0302a' } : IM_SPEC[k], x, y, s, flip);

// ---- the HUD: "DIA n" + the balance (top center). ids: #hud, #hud-day text, #hud-val text
const imHud = (day: string, val: string, c = '#3aa05a') => `<g id="hud"><rect x="560" y="26" width="800" height="104" rx="22" fill="#fbf7ef" ${bzO('stroke-width="8"')}/>
  <rect x="560" y="26" width="250" height="104" rx="22" fill="${BZ.ink}"/><text id="hud-day" x="685" y="102" text-anchor="middle" font-family="Anton" font-size="62" fill="#f6c744">${day}</text>
  <text id="hud-val" x="1085" y="${val.length > 15 ? 96 : 104}" text-anchor="middle" font-family="Anton" font-size="${val.length > 18 ? 46 : val.length > 15 ? 56 : 72}" fill="${c}">${val}</text></g>`;
// a coin, a note, a stack (local origin at the bottom center)
const imCoin = (x: number, y: number, r = 40) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#f6c744" ${bzO()}/><circle r="${r * 0.7}" fill="none" stroke="#d8a830" stroke-width="5"/><text y="${r * 0.36}" text-anchor="middle" font-family="Anton" font-size="${r}" fill="#a87a20">1</text></g>`;
const imNote = (x: number, y: number, rot = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-90" y="-44" width="180" height="88" rx="8" fill="#8ad0a0" ${bzO('stroke-width="5"')}/><circle r="26" fill="#5aa070"/><text x="-60" y="-12" font-family="Anton" font-size="24" fill="#2a6a40">R$</text></g>`;
function imStack(x: number, y: number, n: number, w = 200) {   // a stack of note bundles n high
  let s = ''; for (let i = 0; i < n; i++) s += `<rect x="${x - w / 2 + (i % 2) * 6}" y="${y - (i + 1) * 34}" width="${w}" height="32" rx="5" fill="#7ac890" ${bzO('stroke-width="5"')}/><rect x="${x - 14}" y="${y - (i + 1) * 34}" width="28" height="32" fill="#e8d8a8"/>`;
  return `<g>${s}</g>`;
}
// money piles that grow: #pile .p0..p5 (shown one by one)
const imPiles = (x: number, y: number) => `<g id="pile">${[2, 4, 7, 11, 16, 22].map((n, i) => `<g class="p${i}" opacity="0">${imStack(x - 250 + (i % 3) * 250, y - Math.floor(i / 3) * 0, n)}</g>`).join('')}</g>`;

// ---- sets
function imRoom(lit = true) {   // Tuco's small room: bed, window with the morning, a poster, a lamp
  return `<rect width="1920" height="1080" fill="${lit ? '#f0c8a0' : '#6a5a70'}"/>${[...Array(10)].map((_, i) => `<path d="M${i * 200} 0 V 1080" stroke="${lit ? '#e0b088' : '#5a4a60'}" stroke-width="10"/>`).join('')}
    <rect x="1240" y="170" width="440" height="360" fill="${lit ? '#9ad0f0' : '#1a2440'}" ${bzO('stroke-width="12"')}/><path d="M1460 170 v360 M1240 350 h440" stroke="${BZ.ink}" stroke-width="10"/>${lit ? bzSun(1560, 260, 50) : ''}
    <rect x="300" y="200" width="220" height="300" fill="#3a7aff" ${bzO()}/><circle cx="410" cy="330" r="70" fill="#f6c744" ${bzO()}/><text x="410" y="470" text-anchor="middle" font-family="Anton" font-size="40" fill="#fff">GOOOL</text>
    <rect y="820" width="1920" height="260" fill="${lit ? '#c89060' : '#4a3a40'}" ${bzO()}/>
    <g transform="translate(260 900)"><rect x="-200" y="-140" width="560" height="120" rx="20" fill="#e0e8f0" ${bzO()}/><rect x="-200" y="-180" width="160" height="70" rx="20" fill="#fbf7ef" ${bzO()}/><path d="M-60 -140 Q 120 -190 360 -140 V -40 H -60 Z" fill="#3aa05a" ${bzO()}/><rect x="-200" y="-30" width="30" height="40" fill="#6a4a30"/><rect x="330" y="-30" width="30" height="40" fill="#6a4a30"/></g>`;
}
// a phone held up (screen #phone-screen with the bank app balance #phone-val)
function imPhone(x: number, y: number, s = 1, val = 'R$ 1,00', title = 'MEU BANCO') {
  return `<g id="phone"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-170" y="-330" width="340" height="660" rx="44" fill="#2b2433" ${bzO('stroke-width="9"')}/><rect x="-146" y="-290" width="292" height="580" rx="24" fill="#fbf7ef"/>
    <rect x="-146" y="-290" width="292" height="110" rx="24" fill="#8a3aff"/><text x="0" y="-220" text-anchor="middle" font-family="Anton" font-size="40" fill="#fff">${title}</text>
    <text x="0" y="-110" text-anchor="middle" font-family="Anton" font-size="34" fill="#6a6a7a">SALDO</text><text id="phone-val" x="0" y="-30" text-anchor="middle" font-family="Anton" font-size="${val.length > 12 ? 44 : 64}" fill="${BZ.ink}">${val}</text>
    ${[0, 1, 2].map((i) => `<rect x="-120" y="${40 + i * 70}" width="240" height="50" rx="12" fill="#ece4f4"/>`).join('')}</g></g>`;
}
function imCanteen() {   // the school canteen: counter, menu board with prices, tiled wall
  return `<rect width="1920" height="1080" fill="#e8f0e0"/>${[...Array(20)].map((_, i) => `<path d="M0 ${i * 60} H 1920" stroke="#d0dcc8" stroke-width="4"/>`).join('')}
    <rect x="700" y="120" width="560" height="300" rx="14" fill="#2a3a2e" ${bzO('stroke-width="10"')}/><text x="980" y="190" text-anchor="middle" font-family="Anton" font-size="52" fill="#f6c744">CANTINA</text>
    ${[['COXINHA', '6,00'], ['REFRI', '5,00'], ['PÃO DE QUEIJO', '4,00']].map(([a, b], i) => `<text x="760" y="${260 + i * 56}" font-family="Anton" font-size="40" fill="#fbf7ef">${a}</text><text x="1200" y="${260 + i * 56}" text-anchor="end" font-family="Anton" font-size="40" fill="#fbf7ef">${b}</text>`).join('')}
    <rect x="-20" y="640" width="1960" height="440" fill="#c8542c" ${bzO()}/><rect x="-20" y="620" width="1960" height="40" fill="#e8d8b8" ${bzO()}/>
    <g transform="translate(1500 620)"><rect x="-120" y="-120" width="240" height="120" rx="10" fill="#bfe0f0" opacity="0.7" ${bzO()}/>${[-70, 0, 70].map((dx) => `<path d="M${dx - 30} -20 q 30 -70 60 0 z" fill="#e8a040" ${bzO('stroke-width="4"')}/>`).join('')}</g>`;
}
function imStreet() {   // the street pitch in the neighbourhood: houses, a goal made of sandals, sunny
  return `<g id="lay-bg">${bzSky('#5ab0f0', '#d8f0ff')}${bzSun(260, 160, 70)}${imClouds(120, 3)}
      ${[[40, 260, 220, '#f0a0a0'], [330, 240, 200, '#a0d0f0'], [600, 280, 240, '#f0e0a0'], [1240, 260, 220, '#c0f0a0'], [1530, 300, 250, '#f0c0e0']].map(([x, w, h, c]) => `<rect x="${x}" y="${760 - (h as number)}" width="${w}" height="${h}" fill="${c}" ${bzO()}/><rect x="${(x as number) + 30}" y="${760 - (h as number) + 50}" width="70" height="70" fill="#5a7aa8" ${bzO('stroke-width="5"')}/><rect x="${(x as number) + (w as number) - 100}" y="${700 - 60}" width="70" height="120" fill="#8a5a3a" ${bzO('stroke-width="5"')}/>`).join('')}</g>
    <g id="lay-mid">${imTree(1120, 760, 0.9)}${imPole(180)}${imPole(1060)}${imPole(1880)}${imWires(180, 1060, 250)}${imWires(1060, 1880, 250)}<rect x="-20" y="740" width="1960" height="360" fill="#9a9aa8" ${bzO()}/>${imSidewalk(740)}${[...Array(12)].map((_, i) => `<rect x="${i * 170 + 40}" y="905" width="90" height="10" fill="#e8e0b0" opacity="0.7"/>`).join('')}
      ${[640, 1260].map((x) => `<g transform="translate(${x} 900)"><ellipse cx="-50" cy="0" rx="40" ry="16" fill="#3a7aff" ${bzO('stroke-width="4"')}/><ellipse cx="50" cy="0" rx="40" ry="16" fill="#3a7aff" ${bzO('stroke-width="4"')}/></g>`).join('')}</g>`;
}
function imHouse(big = false) {   // the family house: small and simple, or big and new
  if (!big) return `<g id="lay-bg">${bzSky('#5ab0f0', '#d8f0ff')}</g><g id="lay-mid"><rect x="-20" y="820" width="1960" height="280" fill="#8ac060" ${bzO()}/>
      <rect x="660" y="440" width="600" height="400" fill="#e8c8a0" ${bzO()}/><path d="M620 450 L 960 260 L 1300 450 Z" fill="#c8542c" ${bzO()}/><rect x="900" y="620" width="130" height="220" fill="#6a4a30" ${bzO()}/><rect x="720" y="540" width="130" height="110" fill="#8ac0e8" ${bzO()}/>
      <path d="M1040 560 l 60 40 M1110 520 l -50 60" stroke="#a8784e" stroke-width="8"/></g>`;
  return `<g id="lay-bg">${bzSky('#5ab0f0', '#d8f0ff')}${bzSun(1650, 170, 70)}</g><g id="lay-mid"><rect x="-20" y="820" width="1960" height="280" fill="#6ab050" ${bzO()}/>
      <rect x="360" y="300" width="1200" height="540" fill="#fbf7ef" ${bzO()}/><rect x="360" y="260" width="1200" height="60" fill="#3a3a44" ${bzO()}/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${420 + i * 230}" y="380" width="160" height="160" fill="#8ac0e8" ${bzO('stroke-width="6"')}/>`).join('')}<rect x="880" y="600" width="160" height="240" fill="#6a4a30" ${bzO()}/>
      <rect x="1240" y="620" width="300" height="200" fill="#5ab0e8" opacity="0.8" ${bzO()}/><text x="1390" y="740" text-anchor="middle" font-family="Anton" font-size="40" fill="#fff">PISCINA</text></g>`;
}
function imKitchen() {   // the old kitchen: fridge, stove, a table, the light bill on the wall
  return `<rect width="1920" height="1080" fill="#f0e0b0"/>${[...Array(12)].map((_, i) => `<rect x="${i * 170}" y="560" width="160" height="80" fill="#e0d098" opacity="0.6"/>`).join('')}
    <rect x="1400" y="260" width="300" height="580" rx="20" fill="#e8f0f4" ${bzO()}/><path d="M1400 460 h300" stroke="${BZ.ink}" stroke-width="7"/><rect x="1660" y="320" width="16" height="100" fill="${BZ.ink}"/>
    <rect x="200" y="560" width="400" height="280" fill="#c8ccd8" ${bzO()}/>${[290, 410, 530].map((x) => `<circle cx="${x}" cy="580" r="30" fill="#3a3a44"/>`).join('')}
    <rect y="820" width="1920" height="260" fill="#c89060" ${bzO()}/><rect x="760" y="640" width="440" height="40" fill="#a8784e" ${bzO()}/><rect x="790" y="680" width="20" height="160" fill="#8a5a3a"/><rect x="1150" y="680" width="20" height="160" fill="#8a5a3a"/>`;
}
const imBill = (id: string, x: number, y: number, paid = false) => `<g id="${id}"><g transform="translate(${x} ${y}) rotate(-4)"><rect x="-150" y="-190" width="300" height="380" fill="#fbf7ef" ${bzO()}/><text x="0" y="-120" text-anchor="middle" font-family="Anton" font-size="44" fill="${BZ.ink}">CONTA DE LUZ</text>
  ${[0, 1, 2].map((i) => `<rect x="-110" y="${-80 + i * 40}" width="220" height="14" fill="#c8c0b0"/>`).join('')}<text x="0" y="110" text-anchor="middle" font-family="Anton" font-size="52" fill="#e0302a">ATRASADA</text>
  <g class="paid" opacity="${paid ? 1 : 0}"><g transform="rotate(-12)"><rect x="-130" y="30" width="260" height="110" rx="12" fill="#fbf7ef" stroke="#2fa04a" stroke-width="12"/><text x="0" y="112" text-anchor="middle" font-family="Anton" font-size="80" fill="#2fa04a">PAGO</text></g></g></g></g>`;
// a TV studio / live frame (the reporter) with the AO VIVO tag
const imLive = (title: string) => `<g id="live"><rect x="0" y="930" width="1920" height="150" fill="#c8342c"/><rect x="40" y="955" width="200" height="100" rx="10" fill="#fff"/><text x="140" y="1025" text-anchor="middle" font-family="Anton" font-size="52" fill="#c8342c">AO VIVO</text>
  <text x="280" y="1030" font-family="Anton" font-size="64" fill="#fff">${title}</text></g>`;
// the exponential chart: axes, the curve #curve (stroke-dashoffset animates), labels
function imChart(maxDay = 30) {
  let d = 'M 260 880'; for (let x = 0; x <= maxDay; x++) d += ` L ${260 + x * (1400 / maxDay)} ${880 - 700 * Math.pow(2, x - maxDay)}`;
  return `<rect width="1920" height="1080" fill="#1b2a44"/>${[...Array(8)].map((_, i) => `<path d="M260 ${180 + i * 100} H 1700" stroke="#2a3a5a" stroke-width="3"/>`).join('')}
    <path d="M260 160 V 880 H 1720" stroke="#fbf7ef" stroke-width="8" fill="none"/><path id="curve" d="${d}" stroke="#3aff8a" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="3000" stroke-dashoffset="3000"/>
    ${[1, 10, 20, 30].map((x) => `<text x="${260 + (x - 0) * (1400 / maxDay)}" y="940" text-anchor="middle" font-family="Anton" font-size="44" fill="#fbf7ef">DIA ${x}</text>`).join('')}`;
}
// Brazil (simplified outline) and the world (a globe)
const imBrazil = (x: number, y: number, s = 1, c = '#3aa05a') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 -260 Q 80 -280 160 -200 Q 260 -160 300 -60 Q 280 40 200 100 Q 160 200 60 260 Q 0 300 -40 240 Q -60 160 -120 120 Q -220 60 -260 -20 Q -280 -120 -200 -180 Q -120 -240 -40 -260 Z" fill="${c}" ${bzO('stroke-width="9"')}/><circle cx="160" cy="80" r="16" fill="#f6c744" ${bzO('stroke-width="4"')}/></g>`;
const imGlobe = (x: number, y: number, r = 260) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#3a8ae0" ${bzO('stroke-width="10"')}/><path d="M${-r * 0.6} ${-r * 0.4} q ${r * 0.3} ${-r * 0.3} ${r * 0.6} 0 q ${r * 0.1} ${r * 0.3} ${-r * 0.2} ${r * 0.5} q ${-r * 0.3} ${r * 0.1} ${-r * 0.4} ${-r * 0.5} z M${r * 0.1} ${r * 0.1} q ${r * 0.4} ${-r * 0.2} ${r * 0.5} ${r * 0.2} q ${-r * 0.1} ${r * 0.4} ${-r * 0.4} ${r * 0.3} z" fill="#3aa05a" ${bzO('stroke-width="6"')}/></g>`;
// the bakery: a price tag (#tag-val) on a cheese bread basket
function imBakery(price = 'R$ 1,00') {
  return `<rect width="1920" height="1080" fill="#f4e4c4"/><rect y="640" width="1920" height="440" fill="#a8784e" ${bzO()}/><rect x="-20" y="620" width="1960" height="40" fill="#c89868" ${bzO()}/>
    <rect x="300" y="140" width="1320" height="120" rx="14" fill="#c8542c" ${bzO()}/><text x="960" y="230" text-anchor="middle" font-family="Anton" font-size="84" fill="#fbf7ef">PADARIA DA ESQUINA</text>
    <g transform="translate(960 600)"><path d="M-260 0 L -220 -150 H 220 L 260 0 Z" fill="#c89050" ${bzO()}/>${[-150, -50, 50, 150, -100, 0, 100].map((dx, i) => `<circle cx="${dx}" cy="${i < 4 ? -150 : -210}" r="56" fill="#f0c060" ${bzO('stroke-width="5"')}/>`).join('')}</g>
    <g id="tag"><g transform="translate(1400 520) rotate(8)"><rect x="-200" y="-90" width="400" height="180" rx="16" fill="#fbf7ef" ${bzO('stroke-width="8"')}/><text id="tag-val" x="0" y="34" text-anchor="middle" font-family="Anton" font-size="${price.length > 10 ? 64 : 92}" fill="#e0302a">${price}</text></g></g>`;
}
// the chessboard with rice: 8x8 board seen from the front-top (cells .c0..c63 with grain dots)
function imChess() {
  let cells = ''; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { const k = r * 8 + c, x = 560 + c * 100, y = 160 + r * 90;
    cells += `<rect x="${x}" y="${y}" width="100" height="90" fill="${(r + c) % 2 ? '#6a4a30' : '#e8d8b8'}"/>`; }
  return `<rect width="1920" height="1080" fill="#2a1e2e"/>${bzGlow('cg', 960, 520, 700, '#ffd27a', 0.2)}<rect x="540" y="140" width="840" height="760" fill="#3a2a1a" ${bzO('stroke-width="10"')}/>${cells}
    <g id="rice">${[0, 1, 2, 3, 4, 5].map((k) => { const x = 560 + k * 100 + 50, y = 160 + 45; return `<g class="r${k}">${[...Array(Math.min(16, 2 ** k))].map((_, j) => `<ellipse cx="${x - 30 + (j % 4) * 20}" cy="${y - 25 + Math.floor(j / 4) * 16}" rx="7" ry="4" fill="#fbf7ef" ${bzO('stroke-width="2"')}/>`).join('')}</g>`; }).join('')}</g>`;
}
// the king and the sage (simple robes)
const imKing = (x: number, y: number, s = 1) => bzChar('king', { skin: '#e0a070', beard: '#8a6a4a', hair: { style: 'short', color: '#8a6a4a' }, top: '#8a2a4a', top2: '#f6c744', dress: '#8a2a4a', shoes: '#3a2a1a', extra: `<path d="M-60 -560 l 20 -60 l 20 40 l 20 -50 l 20 50 l 20 -40 l 20 60 z" fill="#f6c744" stroke="#2b2433" stroke-width="5"/>` }, x, y, s);
// the channel title card
function imTitle() {
  return `<rect width="1920" height="1080" fill="#f6c744"/>${bzRays('tr', 960, 540, 16, 1400, '#fff', 0.25)}
    <g id="tt"><g transform="translate(960 380) rotate(-3)"><text x="0" y="0" text-anchor="middle" font-family="Anton" font-size="230" fill="${BZ.ink}" stroke="${BZ.ink}" stroke-width="20" paint-order="stroke">IMAGINA SÓ</text><text x="0" y="0" text-anchor="middle" font-family="Anton" font-size="230" fill="#fbf7ef">IMAGINA SÓ</text></g></g>
    <g id="ts"><g transform="translate(960 560) rotate(2)"><rect x="-560" y="-80" width="1120" height="130" rx="18" fill="#2fa04a" ${bzO('stroke-width="9"')}/><text x="0" y="22" text-anchor="middle" font-family="Anton" font-size="84" fill="#fff">SEU DINHEIRO DOBRA TODO DIA</text></g></g>`;
}


// ---- thumbnail exaggeration kit (positions for a kid at (960, 1560, s 2.5): eyes ~ (915, 495) and (1035, 495), head r ~ 220)
const imThTears = () => [915, 1035].map((x, k) => `<path d="M${x - 20} 540 Q ${x - 60 + k * 120} 700 ${x - 40 + k * 80} 900" stroke="#5ac8ff" stroke-width="34" fill="none" stroke-linecap="round" opacity="0.9"/><path d="M${x - 50 + k * 100} 930 q -24 40 0 58 q 24 -18 0 -58 z" fill="#5ac8ff" stroke="#2b2433" stroke-width="5"/>`).join('');
const imThSweat = () => [[700, 330], [1220, 300], [1250, 420]].map(([x, y]) => `<path d="M${x} ${y} q -30 50 0 74 q 30 -24 0 -74 z" fill="#9ae0ff" stroke="#2b2433" stroke-width="6"/>`).join('');
const imThRain = () => `<g><ellipse cx="960" cy="40" rx="560" ry="140" fill="#3a3a48"/><ellipse cx="700" cy="70" rx="260" ry="110" fill="#30303c"/><ellipse cx="1240" cy="70" rx="280" ry="110" fill="#30303c"/>${[...Array(40)].map((_, i) => `<path d="M${(i * 53) % 1920} ${180 + (i * 97) % 800} l -14 50" stroke="#8ab0d8" stroke-width="6" opacity="0.7"/>`).join('')}</g>`;
const imThDollarEyes = () => [915, 1035].map((x) => `<circle cx="${x}" cy="495" r="58" fill="#ffd23a" stroke="#2b2433" stroke-width="9"/><text x="${x}" y="528" text-anchor="middle" font-family="Anton" font-size="96" fill="#1a8a3a">$</text>`).join('');
const imThBolts = (c = '#fff27a') => [[330, 300, 1], [1590, 280, -1], [400, 760, 1], [1520, 760, -1]].map(([x, y, f]) => `<path d="M${x} ${y - 140} l ${-60 * f} 140 h ${50 * f} l ${-40 * f} 140 l ${120 * f} -170 h ${-56 * f} l ${40 * f} -110 z" fill="${c}" stroke="#2b2433" stroke-width="7"/>`).join('');
const imThSparkles = () => [[600, 420], [1330, 380], [820, 220], [1120, 200], [1460, 760], [470, 760]].map(([x, y]) => `<path d="M${x} ${y - 46} L ${x + 12} ${y - 12} L ${x + 46} ${y} L ${x + 12} ${y + 12} L ${x} ${y + 46} L ${x - 12} ${y + 12} L ${x - 46} ${y} L ${x - 12} ${y - 12} Z" fill="#fff" stroke="#2b2433" stroke-width="5"/>`).join('');

// ---- idea bubbles for the universal banner
const imIdea = (x: number, y: number, r: number, inner: string) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#fbf7ef" ${bzO('stroke-width="8"')}/><circle cx="${-r * 0.8}" cy="${r * 0.95}" r="${r * 0.16}" fill="#fbf7ef" ${bzO('stroke-width="6"')}/><g transform="scale(${r / 110})">${inner}</g></g>`;
const imRocket = () => `<g transform="rotate(35)"><path d="M0 -80 Q 34 -40 30 30 H -30 Q -34 -40 0 -80 Z" fill="#e8ecf4" ${bzO()}/><circle cy="-20" r="14" fill="#3a7aff" ${bzO('stroke-width="5"')}/><path d="M-30 10 L -52 50 L -26 40 Z M30 10 L 52 50 L 26 40 Z" fill="#e0302a" ${bzO('stroke-width="5"')}/><path d="M-16 32 Q 0 80 16 32 Z" fill="#f6c744" ${bzO('stroke-width="5"')}/></g>`;
const imClockMini = () => `<circle r="60" fill="#f6c744" ${bzO()}/><path d="M0 0 V -40 M0 0 L 28 18" stroke="${BZ.ink}" stroke-width="10" stroke-linecap="round"/>`;
const imBoltMini = () => `<path d="M10 -70 L -40 10 H 0 L -14 70 L 40 -14 H 0 Z" fill="#f6c744" ${bzO()}/>`;

// ---- thumbnail v2 kit: filters (blurred background, rim light, golden aura, motion blur), rain, splash, crowd, gradients
const imTh2Defs = () => `<defs><filter id="thblur"><feGaussianBlur stdDeviation="6"/></filter><filter id="mblur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3 1"/></filter>
  <filter id="rim" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="-6" dy="0" stdDeviation="2" flood-color="#9ad0ff" flood-opacity="0.9"/><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#000" flood-opacity="0.4"/></filter>
  <filter id="aura" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#ffd23a" flood-opacity="1"/><feDropShadow dx="0" dy="0" stdDeviation="40" flood-color="#ffb000" flood-opacity="0.8"/></filter>
  <radialGradient id="thgold"><stop offset="0" stop-color="#fff6c0" stop-opacity="0.9"/><stop offset="0.5" stop-color="#ffd23a" stop-opacity="0.45"/><stop offset="1" stop-color="#ffb000" stop-opacity="0"/></radialGradient>
  <linearGradient id="thcold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2a4a" stop-opacity="0.35"/><stop offset="1" stop-color="#0a1020" stop-opacity="0.25"/></linearGradient>
  <radialGradient id="thwarm" cx="0.5" cy="0.4" r="0.8"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#2a0a00" stop-opacity="0.5"/></radialGradient></defs>`;
const imThRainHeavy = () => `<g>${[...Array(140)].map((_, i) => `<path d="M${(i * 137) % 1980} ${(i * 211) % 1080} l -18 70" stroke="#c8dcff" stroke-width="${2 + (i % 3)}" opacity="${0.35 + (i % 4) * 0.12}"/>`).join('')}</g>`;
const imThSplash = (x: number, y: number) => `<g>${[-60, -30, 0, 30, 60].map((dx, i) => `<path d="M${x} ${y} Q ${x + dx} ${y - 60 - (i % 2) * 30} ${x + dx * 2} ${y - 10}" stroke="#bcd4f0" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('')}${[-90, -50, 40, 80].map((dx, i) => `<circle cx="${x + dx}" cy="${y - 70 - (i % 2) * 30}" r="9" fill="#bcd4f0"/>`).join('')}</g>`;
const imThCrowd = () => `<g>${[...Array(26)].map((_, i) => { const x = 40 + i * 74, y = 760 + (i % 3) * 30; return `<circle cx="${x}" cy="${y - 120}" r="34" fill="#2a1430"/><rect x="${x - 40}" y="${y - 90}" width="80" height="200" rx="30" fill="#2a1430"/>${i % 4 === 0 ? `<rect x="${x + 20}" y="${y - 200}" width="22" height="36" rx="4" fill="#fff6c0"/>` : ''}`; }).join('')}</g>`;
const imThDollarEyesAt = (x: number, feet: number, sc: number) => { const hy = feet - 423 * sc - 40 - 7 * sc / 2.5, dx = 19.2 * sc, r = 23 * sc;
  return [x - dx, x + dx].map((ex) => `<circle cx="${ex}" cy="${hy}" r="${r}" fill="#ffd23a" stroke="#2b2433" stroke-width="${3.6 * sc}"/><text x="${ex}" y="${hy + r * 0.57}" text-anchor="middle" font-family="Anton" font-size="${r * 1.65}" fill="#1a8a3a">$</text>`).join(''); };
// =====================================================================
//  GRAVITY: space suits, the moon that drifts away, the hoop, oxygen masks, slow rain, the darkening sky, ropes,
//  the ball leaving Earth, Earth seen from above.
// =====================================================================
const IM_HELMET = '<circle cx="0" cy="0" r="128" fill="#bfe4ff" fill-opacity="0.22" stroke="#2b2433" stroke-width="9"/><path d="M-80 -70 Q -40 -110 20 -112" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.8"/>';
Object.assign(IM_SPEC, {
  tucoSuit: { kid: true, tall: 1.22, skin: '#a8683e', hair: { style: 'afro', color: '#1c1410' }, top: '#e8ecf4', top2: '#2fa04a', pants: '#e8ecf4', shoes: '#e0302a', headFront: IM_HELMET },
  bielSuit: { kid: true, tall: 1.18, skin: '#e0a070', hat: { kind: 'cap', color: '#d0342c' }, hair: { style: 'short', color: '#5a3a20' }, top: '#e8ecf4', top2: '#f29a4a', pants: '#e8ecf4', shoes: '#f0ece2', headFront: IM_HELMET },
  maeSuit: { skin: '#a8683e', hair: { style: 'bun', color: '#1c1410' }, top: '#e8ecf4', top2: '#c84a8a', pants: '#e8ecf4', shoes: '#3a2a1a', headFront: IM_HELMET },
});
// an oxygen mask over the face (local to a character's head: draw at the face position)
const imMask = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 -10 Q 0 -40 40 -10 L 34 40 Q 0 60 -34 40 Z" fill="#e8f4f8" stroke="#2b2433" stroke-width="6"/><path d="M0 50 Q 30 140 90 160" stroke="#5ab0e8" stroke-width="12" fill="none"/><path d="M-40 -6 L -90 -40 M40 -6 L 90 -40" stroke="#2b2433" stroke-width="5"/></g>`;
// the night sky with a moon of radius r (it shrinks as it drifts away)
function imNight(moonR = 80, mx = 1500, my = 230, daySky = false) {
  return `${daySky ? bzSky('#0a0c1a', '#2a3a6a') : bzSky('#070b1c', '#202c4a')}${bzStars(90, 7, 900)}${moonR > 0 ? `${bzGlow('mg', mx, my, moonR * 3, '#efe9d6', 0.18)}<circle cx="${mx}" cy="${my}" r="${moonR}" fill="#efe9d6" ${bzO()}/><circle cx="${mx - moonR * 0.3}" cy="${my - moonR * 0.2}" r="${moonR * 0.2}" fill="#d8d2be"/>` : ''}`;
}
// the street with a basketball hoop on a pole (rim at x 1500, y 430)
function imHoop() {
  return `<g id="lay-bg">${bzSky('#5ab0f0', '#d8f0ff')}${bzSun(260, 160, 70)}${imClouds(140, 5)}${imTree(400, 760, 1.1)}${imTree(800, 760, 0.8)}</g>
    <g id="lay-mid"><rect x="-20" y="740" width="1960" height="360" fill="#9a9aa8" ${bzO()}/>${imSidewalk(740)}<rect x="1580" y="300" width="24" height="460" fill="#8a8f9e" ${bzO('stroke-width="5"')}/>
      <rect x="1480" y="290" width="180" height="120" fill="#fbf7ef" ${bzO()}/><rect x="1540" y="330" width="60" height="50" fill="none" stroke="#e0302a" stroke-width="6"/><ellipse cx="1500" cy="430" rx="60" ry="14" fill="none" stroke="#e86a20" stroke-width="10"/>
      <path d="M1445 432 L 1465 500 M1500 444 V 510 M1555 432 L 1535 500" stroke="#fbf7ef" stroke-width="5"/></g>`;
}
// the school wall (2 m) with the school behind
function imSchool() {
  return `<g id="lay-bg">${bzSky('#5ab0f0', '#d8f0ff')}${imClouds(80, 9)}${imTree(200, 560, 1.0)}${imTree(1750, 560, 1.1)}<rect x="300" y="300" width="1300" height="460" fill="#f0d8a0" ${bzO()}/>${[...Array(8)].map((_, i) => `<rect x="${360 + i * 150}" y="360" width="90" height="110" fill="#8ac0e8" ${bzO('stroke-width="5"')}/>`).join('')}<text x="950" y="560" text-anchor="middle" font-family="Anton" font-size="64" fill="#3a5a9a">ESCOLA ESTADUAL</text></g>
    <g id="lay-mid"><rect x="-20" y="560" width="1960" height="220" fill="#c8c0b0" ${bzO()}/><rect x="-20" y="760" width="1960" height="340" fill="#9a9aa8" ${bzO()}/></g>`;
}
// a glass of water with a thermometer showing t degrees; bubbles (.bb) when boiling
function imBoil(t: string, x = 960, y = 700) {
  return `<g transform="translate(${x} ${y})"><path d="M-160 -260 L 160 -260 L 130 160 L -130 160 Z" fill="#bfe4ff" fill-opacity="0.5" ${bzO('stroke-width="9"')}/><path d="M-150 -150 L 150 -150 L 130 160 L -130 160 Z" fill="#5ab0e8" fill-opacity="0.6"/>
    <g id="bub">${[...Array(14)].map((_, i) => `<circle class="bb" cx="${-100 + (i * 47) % 200}" cy="${140 - (i * 37) % 260}" r="${8 + (i % 3) * 5}" fill="#fff" fill-opacity="0.8" stroke="#2b2433" stroke-width="3"/>`).join('')}</g>
    <g transform="translate(300 -40)"><rect x="-30" y="-260" width="60" height="420" rx="30" fill="#fbf7ef" ${bzO()}/><circle cy="170" r="56" fill="#e0302a" ${bzO()}/><rect x="-12" y="-120" width="24" height="290" fill="#e0302a"/><text x="70" y="-110" font-family="Anton" font-size="72" fill="#fbf7ef" stroke="#2b2433" stroke-width="8" paint-order="stroke">${t}</text></g></g>`;
}
// the town seen from very high (tiny roofs) and the curve of the horizon
function imFromAbove(dark = 0) {
  const sky = dark ? bzSky('#05060e', '#141c38') : bzSky('#3a7ad8', '#a8d8f8');
  return `${sky}${dark ? bzStars(80, 9, 600) : ''}<path d="M-200 1100 Q 960 560 2120 1100 Z" fill="#5a8a4a" ${bzO()}/>
    ${[...Array(60)].map((_, i) => { const x = 200 + (i * 197) % 1520, y = 820 + (i * 61) % 240; return `<rect x="${x}" y="${y}" width="${22 + (i % 3) * 8}" height="${16 + (i % 2) * 6}" fill="${['#c8542c', '#f0e0a8', '#e8d8b8', '#a83a2a'][i % 4]}"/>`; }).join('')}
    <path d="M-200 1100 Q 960 560 2120 1100" stroke="#8ac0ff" stroke-width="${dark ? 10 : 24}" fill="none" opacity="0.5"/>`;
}
// ropes from the characters' waists to a pole
const imRope = (x0: number, y0: number, x1: number, y1: number) => `<path d="M${x0} ${y0} Q ${(x0 + x1) / 2} ${Math.max(y0, y1) + 60} ${x1} ${y1}" stroke="#e8c86a" stroke-width="10" fill="none" stroke-linecap="round"/>`;
// a soccer ball (#ball)
const imBall = (id: string, x: number, y: number, r = 40) => `<g id="${id}"><circle cx="${x}" cy="${y}" r="${r}" fill="#fbf7ef" ${bzO()}/><path d="M${x - r * 0.4} ${y - r * 0.3} l ${r * 0.4} ${-r * 0.25} l ${r * 0.4} ${r * 0.25} l ${-r * 0.15} ${r * 0.45} h ${-r * 0.5} z" fill="#2b2433"/></g>`;
// Earth from space (a big curved horizon at the bottom with a thin blue rim)
const imEarthLimb = () => `<rect width="1920" height="1080" fill="#05060e"/>${bzStars(120, 13, 1080)}<circle cx="960" cy="2900" r="2200" fill="#3a8ae0" ${bzO('stroke-width="10"')}/><path d="M300 900 q 200 -80 420 -40 q 160 30 300 -30 q 200 -60 400 10" stroke="#3aa05a" stroke-width="80" fill="none" stroke-linecap="round"/><circle cx="960" cy="2900" r="2220" fill="none" stroke="#8ac0ff" stroke-width="14" opacity="0.4"/>`;


// ---- detail kit: painted clouds, a Brazilian power pole with sagging wires, a leafy tree, sidewalk tiles
const imClouds = (y = 160, seed = 1) => { let r = seed * 7919; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  return `<g opacity="0.92">${[...Array(5)].map(() => { const x = rnd() * 1900, yy = y + rnd() * 160, s = 0.7 + rnd() * 0.7;
    return `<g transform="translate(${x.toFixed(0)} ${yy.toFixed(0)}) scale(${s.toFixed(2)})"><ellipse cx="0" cy="0" rx="130" ry="46" fill="#fbf7ef"/><ellipse cx="-70" cy="-24" rx="70" ry="50" fill="#fbf7ef"/><ellipse cx="50" cy="-40" rx="80" ry="60" fill="#fbf7ef"/><ellipse cx="0" cy="22" rx="130" ry="20" fill="#d8e4f0"/></g>`; }).join('')}</g>`; };
const imPole = (x: number, y = 760, h = 520) => `<g><rect x="${x - 10}" y="${y - h}" width="20" height="${h}" fill="#8a8a8a" ${bzO('stroke-width="5"')}/><rect x="${x - 70}" y="${y - h + 30}" width="140" height="14" fill="#6a6a6a" ${bzO('stroke-width="4"')}/>${[-55, 0, 55].map((dx) => `<rect x="${x + dx - 5}" y="${y - h + 18}" width="10" height="14" fill="#e8e0c8"/>`).join('')}<rect x="${x + 12}" y="${y - h + 90}" width="40" height="60" rx="6" fill="#5a6a5a" ${bzO('stroke-width="4"')}/></g>`;
const imWires = (x0: number, x1: number, y: number) => `<g fill="none" stroke="#2b2433" stroke-width="3" opacity="0.8">${[0, 14, 28].map((d) => `<path d="M${x0} ${y + d} Q ${(x0 + x1) / 2} ${y + d + 70} ${x1} ${y + d}"/>`).join('')}</g>`;
const imTree = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0 Q -20 -120 -6 -200 L 10 -200 Q 18 -120 14 0 Z" fill="#6a4a30" ${bzO('stroke-width="5"')}/>${[[-70, -240, 80], [40, -260, 90], [-10, -320, 90], [80, -200, 60], [-100, -190, 60]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#3a8a3a" ${bzO('stroke-width="5"')}/>`).join('')}${[[-40, -280], [50, -230], [-80, -220]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="22" fill="#5aaa4a" opacity="0.7"/>`).join('')}</g>`;
const imSidewalk = (y = 760) => `<rect x="-20" y="${y}" width="1960" height="50" fill="#c8c0b0" ${bzO('stroke-width="5"')}/>${[...Array(26)].map((_, i) => `<path d="M${i * 80} ${y} v50" stroke="#a8a090" stroke-width="3"/>`).join('')}`;

// ======================================================================= the GIANT kit (this video)
// a height ruler on a wall (x, from the floor y0 up to y1), ticks and a label at the top
const imRuler = (x: number, y0: number, y1: number, label: string) => `<g id="ruler"><rect x="${x - 14}" y="${y1}" width="28" height="${y0 - y1}" fill="#f6c744" ${bzO('stroke-width="5"')}/>${[...Array(11)].map((_, i) => `<path d="M${x - 14} ${y0 - (y0 - y1) * i / 10} h ${i % 5 ? 20 : 34}" stroke="${BZ.ink}" stroke-width="5"/>`).join('')}<text x="${x + 34}" y="${y1 + 40}" font-family="Anton" font-size="46" fill="${BZ.ink}">${label}</text></g>`;
// a sunny city skyline (buildings of height h around a base line y); seed changes the layout; .bw windows
function imCity(y = 900, seed = 1, scale = 1, n = 16) {
  let r = seed * 7919; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280); let s = '';
  for (let i = 0; i < n; i++) { const w = (90 + rnd() * 80) * scale, h = (180 + rnd() * 380) * scale, x = -40 + i * (1960 / n) + rnd() * 20, c = ['#e8d8b8', '#c8b8a0', '#a8b8c8', '#d8c0a0', '#b8c8b0'][i % 5];
    s += `<rect x="${x.toFixed(0)}" y="${(y - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${c}" ${bzO('stroke-width="5"')}/>`;
    for (let wy = y - h + 20 * scale; wy < y - 30 * scale; wy += 44 * scale) for (let wx = x + 14 * scale; wx < x + w - 24 * scale; wx += 34 * scale) s += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="${(16 * scale).toFixed(0)}" height="${(22 * scale).toFixed(0)}" fill="#6a8ab0"/>`; }
  return `<g class="city">${s}</g>`;
}
// tiny cars on a road at y (.car)
const imCars = (y: number, s = 1) => `<g>${[...Array(8)].map((_, i) => `<g class="car" transform="translate(${120 + i * 230} ${y}) scale(${s})"><rect x="-40" y="-26" width="80" height="26" rx="8" fill="${['#e0302a', '#3a7aff', '#f6c744', '#f0ece2'][i % 4]}" ${bzO('stroke-width="4"')}/><circle cx="-22" cy="2" r="9" fill="${BZ.ink}"/><circle cx="22" cy="2" r="9" fill="${BZ.ink}"/></g>`).join('')}</g>`;
// a statue with open arms on a hill (generic), a needle tower (the tallest building), a helicopter
const imStatue = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-260 0 Q 0 -160 260 0 Z" fill="#4a7a4a" ${bzO()}/><rect x="-30" y="-200" width="60" height="70" fill="#e8e4dc" ${bzO('stroke-width="5"')}/><path d="M-22 -200 L -30 -470 H 30 L 22 -200 Z" fill="#f0ece2" ${bzO('stroke-width="5"')}/><rect x="-170" y="-450" width="340" height="30" rx="12" fill="#f0ece2" ${bzO('stroke-width="5"')}/><circle cy="-500" r="30" fill="#f0ece2" ${bzO('stroke-width="5"')}/></g>`;
const imTower = (x: number, y: number, h = 800) => `<g><path d="M${x - 60} ${y} L ${x - 34} ${y - h * 0.4} L ${x - 18} ${y - h * 0.75} L ${x - 4} ${y - h} L ${x + 4} ${y - h} L ${x + 18} ${y - h * 0.75} L ${x + 34} ${y - h * 0.4} L ${x + 60} ${y} Z" fill="#c8d8e8" ${bzO('stroke-width="5"')}/><path d="M${x} ${y - h} V ${y - h - 60}" stroke="${BZ.ink}" stroke-width="6"/></g>`;
const imHeli = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="70" ry="36" fill="#3a4a3a" ${bzO()}/><rect x="60" y="-10" width="120" height="16" fill="#3a4a3a" ${bzO('stroke-width="5"')}/><ellipse cx="-20" cy="-6" rx="30" ry="20" fill="#8ac0e8" ${bzO('stroke-width="4"')}/><path class="rot" d="M-140 -50 H 140" stroke="${BZ.ink}" stroke-width="10" stroke-linecap="round"/><path d="M0 -36 V -50" stroke="${BZ.ink}" stroke-width="8"/><path d="M-40 40 H 40" stroke="${BZ.ink}" stroke-width="6"/></g></g>`;
// the open sea with a low horizon (sky top, water from y)
const imSea = (y = 600, night = false) => `${night ? bzSky('#070b1c', '#202c4a') : bzSky('#5ab0f0', '#d8f0ff')}${night ? bzStars(80, 3, y) : imClouds(80, 3)}<rect x="-20" y="${y}" width="1960" height="${1100 - y}" fill="${night ? '#0e2a44' : '#2a7ab8'}" ${bzO()}/>${[...Array(14)].map((_, i) => `<path d="M${(i * 173) % 1900} ${y + 40 + (i * 61) % (1000 - y)} q 30 -14 60 0 t 60 0" stroke="#bfe4ff" stroke-width="5" fill="none" opacity="0.6"/>`).join('')}`;
// a ship (tiny)
const imShip = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-80 0 L 80 0 L 60 30 L -60 30 Z" fill="#c8342c" ${bzO('stroke-width="5"')}/><rect x="-40" y="-30" width="60" height="30" fill="#f0ece2" ${bzO('stroke-width="4"')}/><rect x="20" y="-50" width="14" height="24" fill="#3a3a48" ${bzO('stroke-width="3"')}/></g>`;
// the space station (truss + solar panels)
const imISS = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-180" y="-6" width="360" height="12" fill="#c8c8d0" ${bzO('stroke-width="4"')}/>${[-160, -100, 100, 160].map((px) => `<rect x="${px - 22}" y="-90" width="44" height="80" fill="#3a5a9a" ${bzO('stroke-width="4"')}/><rect x="${px - 22}" y="10" width="44" height="80" fill="#3a5a9a" ${bzO('stroke-width="4"')}/>`).join('')}<rect x="-40" y="-22" width="80" height="44" rx="14" fill="#f0ece2" ${bzO('stroke-width="4"')}/><circle cx="0" cy="0" r="8" fill="#8ac0e8"/></g></g>`;
// planets: the Moon, Jupiter (stripes)
const imMoon = (x: number, y: number, r = 60) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#d8d4c8" ${bzO()}/><circle cx="${x - r * 0.3}" cy="${y - r * 0.2}" r="${r * 0.18}" fill="#b8b4a8"/><circle cx="${x + r * 0.3}" cy="${y + r * 0.25}" r="${r * 0.12}" fill="#b8b4a8"/></g>`;
const imJupiter = (x: number, y: number, r = 120) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#d8b088" ${bzO()}/>${[-0.6, -0.25, 0.1, 0.45].map((k, i) => `<path d="M${x - r * Math.sqrt(1 - k * k)} ${y + r * k} H ${x + r * Math.sqrt(1 - k * k)}" stroke="${['#b88a5a', '#e8d0b0', '#a87048', '#c89a6a'][i]}" stroke-width="${r * 0.16}"/>`).join('')}<ellipse cx="${x + r * 0.35}" cy="${y + r * 0.3}" rx="${r * 0.18}" ry="${r * 0.1}" fill="#c8543a"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" ${bzO()}/></g>`;
// deep space background
const imSpace = (seed = 5) => `<rect width="1920" height="1080" fill="#05060e"/>${bzStars(160, seed, 1080)}${bzGlow('neb' + seed, 1400, 300, 700, '#6a3aa0', 0.18)}${bzGlow('neb2' + seed, 400, 800, 600, '#2a5ab0', 0.15)}`;
// Tuco as a glowing ball / a star: a sphere of green jacket colours with a hot glow
const imStarTuco = (id: string, x: number, y: number, r = 260, hot = 0) => `<g id="${id}">${bzGlow(id + 'g', x, y, r * 2.6, hot ? '#ffd23a' : '#7aff9a', hot ? 0.6 : 0.25)}<circle cx="${x}" cy="${y}" r="${r}" fill="${hot ? '#ffcf3a' : '#2fa04a'}" ${bzO('stroke-width="10"')}/><path d="M${x - r * 0.95} ${y + r * 0.15} Q ${x} ${y + r * 0.45} ${x + r * 0.95} ${y + r * 0.15}" stroke="${hot ? '#ff9a3a' : '#f6c744'}" stroke-width="${r * 0.12}" fill="none"/><circle cx="${x - r * 0.3}" cy="${y - r * 0.3}" r="${r * 0.2}" fill="#fff" opacity="0.2"/></g>`;
// the Earth seen whole (wrap the existing imGlobe), with a blue halo
const imEarth = (x: number, y: number, r = 200) => `<g>${bzGlow('eg' + x, x, y, r * 1.6, '#5ab0ff', 0.25)}${imGlobe(x, y, r)}</g>`;

// ---------------------------------------------------------------- world test
defineVisuals({
  'test-room': { bg: '#f0d8a0', html: () => svg(`${imRoom()}${imRuler(300, 1000, 200, '1,60 m')}${imChar('tuco', 't', 700, 1000, 1.0)}${imChar('tuco', 'g', 1300, 1100, 2.0)}`), anim(tl, s) { bzFace(tl, '#sc-test-room #g', s.t0, 'wide', 'o'); } },
  'test-city': { bg: '#5ab0f0', html: () => svg(`${bzSky('#5ab0f0', '#d8f0ff')}${imClouds(80, 4)}${imCity(980, 3, 0.5, 26)}${imChar('tuco', 'g', 960, 1000, 2.6)}${imCars(1020, 0.5)}${imHeli('h', 1500, 300, 0.6)}`), anim(tl, s) { bzFace(tl, '#sc-test-city #g', s.t0, 'wide', 'grin'); } },
  'test-statue': { bg: '#5ab0f0', html: () => svg(`${bzSky('#5ab0f0', '#d8f0ff')}${imStatue(600, 1000, 0.9)}${imTower(1500, 1000, 820)}`), anim() {} },
  'test-sea': { bg: '#2a7ab8', html: () => svg(`${imSea(560)}${imShip(400, 800, 0.6)}${imShip(1500, 700, 0.4)}`), anim() {} },
  'test-space': { bg: '#05060e', html: () => svg(`${imSpace()}${imEarth(500, 600, 220)}${imMoon(1000, 300, 60)}${imJupiter(1500, 700, 160)}${imISS('iss', 1000, 800, 0.8)}${imStarTuco('st', 1600, 250, 120, 1)}`), anim() {} },
  'mascots': { bg: '#f6c744', html: () => svg(`<rect width="1920" height="1080" fill="#f6c744"/>${[
    ['A', { kid: true, tall: 1.22, skin: '#a8683e', hair: { style: 'afro', color: '#1c1410' }, top: '#2fa04a', top2: '#f6c744', pants: '#2a3a5a', shoes: '#e0302a' }],
    ['B', { kid: true, tall: 1.22, skin: '#f0c8a0', hair: { style: 'spiky', color: '#f07a1a' }, top: '#2a6ad8', top2: '#fbf7ef', pants: '#2a2a3a', shoes: '#f6c744' }],
    ['C', { kid: true, tall: 1.22, skin: '#8a5a3a', hat: { kind: 'cap', color: '#f6c744' }, hair: { style: 'short', color: '#1c1410' }, top: '#7a3ac8', top2: '#f6c744', pants: '#1c1c24', shoes: '#fbf7ef' }],
    ['D', { kid: true, tall: 1.22, skin: '#c98757', hat: { kind: 'beanie', color: '#e0302a' }, hair: { style: 'messy', color: '#3a2216' }, top: '#1aa0a0', top2: '#fbf7ef', pants: '#3a3a4a', shoes: '#e0302a', glasses: true }],
  ].map(([n, sp]: any, i: number) => `${bzChar('m' + n, sp, 280 + i * 460, 960, 1.35)}<text x="${280 + i * 460}" y="1050" text-anchor="middle" font-family="Anton" font-size="70" fill="${BZ.ink}">${n}</text>`).join('')}`), anim(tl, s) { for (const n of ['A', 'B', 'C', 'D']) bzFace(tl, '#sc-mascots #m' + n, s.t0, 'dot', 'grin'); } },
  'newtuco': { bg: '#5ab0f0', html: () => svg(`${bzSky('#5ab0f0', '#d8f0ff')}<rect y="980" width="1920" height="100" fill="#7ac06a"/>${['a', 'b', 'c', 'd'].map((n, i) => imChar('tuco', 'n' + n, 300 + i * 440, 980, 1.25)).join('')}${imChar('mae', 'xm', 1500, 980, 0.8)}${imChar('biel', 'xb', 1700, 980, 0.8)}${imChar('rep', 'xr', 1860, 980, 0.8)}`), anim(tl, s) { const f = [['dot', 'smile'], ['wide', 'open'], ['half', 'frown'], ['angry', 'grin']]; ['a', 'b', 'c', 'd'].forEach((n, i) => bzFace(tl, '#sc-newtuco #n' + n, s.t0, f[i][0], f[i][1])); } },
});
