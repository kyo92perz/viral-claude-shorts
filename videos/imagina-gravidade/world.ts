// =====================================================================
//  IMAGINA SÓ: "E se a gravidade caísse pela metade todo dia?" (base kit shared with the money video) (16:9, 1920 x 1080), Brasil Z toon look, bright and funny. Prefix im.
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
const imChar = (k: string, id: string, x: number, y: number, s = 1, flip = false) => bzChar(id, IM_SPEC[k], x, y, s, flip);

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
// ---------------------------------------------------------------- world test
defineVisuals({
  'test-suits': { bg: '#0a0c1a', html: () => svg(`${imNight(30, 1600, 200, true)}<rect y="760" width="1920" height="320" fill="#4a4a58" ${bzO()}/>${imChar('tucoSuit', 't', 700, 980, 1.1)}${imChar('bielSuit', 'b', 1000, 980, 1.05)}${imChar('maeSuit', 'm', 1300, 980, 1.0)}`), anim() {} },
  'test-hoop': { bg: '#5ab0f0', html: () => svg(`${imHoop()}${imChar('biel', 'b', 1380, 760, 1.0)}${imBall('ball', 1480, 380, 32)}`), anim() {} },
  'test-mask': { bg: '#5ab0f0', html: () => svg(`${imSchool()}${imChar('biel', 'b', 960, 1500, 2.4)}${imMask(960, 560, 2.2)}`), anim() {} },
  'test-boil': { bg: '#1b2a44', html: () => svg(`<rect width="1920" height="1080" fill="#1b2a44"/>${imBoil('37°C')}`), anim() {} },
  'test-above': { bg: '#3a7ad8', html: () => svg(`${imFromAbove(0)}${imChar('tucoSuit', 't', 960, 600, 0.8)}`), anim() {} },
  'test-space': { bg: '#05060e', html: () => svg(`${imEarthLimb()}${imBall('ball', 960, 300, 30)}`), anim() {} },
  'test-ropes': { bg: '#0a0c1a', html: () => svg(`${imNight(0, 0, 0, true)}<rect y="760" width="1920" height="320" fill="#4a4a58" ${bzO()}/><rect x="300" y="420" width="30" height="560" fill="#8a8f9e" ${bzO('stroke-width="5"')}/>${imChar('tucoSuit', 't', 900, 980, 1.1)}${imChar('bielSuit', 'b', 1300, 980, 1.05)}${imRope(330, 700, 900, 760)}${imRope(330, 720, 1300, 770)}`), anim() {} },
  'thumb2-a': { bg: '#5ab0f0', html: () => svg(`${imHoop()}${imChar('tuco', 't', 960, 1150, 1.6)}`), anim(tl, s) { bzFace(tl, '#sc-thumb2-a #t', s.t0, 'wide', 'grin'); } },
});
