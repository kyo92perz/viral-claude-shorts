// ---- WHAT IF EP.4: you stopped sleeping. Props: a classroom, a 1964 newspaper, a lab rat in a cage, a brain with trash bags.
const wsClass = () => `<rect width="1080" height="1920" fill="#e8dcc0"/><rect x="140" y="300" width="800" height="440" fill="#2a4a3a" ${bzO('stroke-width="12"')}/><text x="540" y="540" text-anchor="middle" font-family="Anton" font-size="90" fill="#e8f0e0" opacity="0.9">2 + 2 = ?</text>
  <rect x="-20" y="1300" width="1120" height="640" fill="#b8946a" ${bzO()}/><rect x="160" y="1280" width="760" height="40" fill="#8a5a32" ${bzO()}/>`;
const wsPaper = (id: string) => `<g id="${id}"><rect x="140" y="420" width="800" height="1000" fill="#efe8d4" ${bzO('stroke-width="10"')}/><text x="540" y="540" text-anchor="middle" font-family="Anton" font-size="70" fill="${BZ.ink}">THE DAILY NEWS · 1964</text><path d="M180 570 H900" stroke="${BZ.ink}" stroke-width="6"/>
  <text x="540" y="720" text-anchor="middle" font-family="Anton" font-size="120" fill="${BZ.ink}">11 DAYS</text><text x="540" y="840" text-anchor="middle" font-family="Anton" font-size="110" fill="${BZ.red}">AWAKE!</text>
  <rect x="220" y="900" width="300" height="380" fill="#b8b0a0" ${bzO('stroke-width="6"')}/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M560 ${930 + i * 50} H880" stroke="#8a8478" stroke-width="12"/>`).join('')}</g>`;
const wsRat = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="90" ry="55" fill="#e8e4dc" ${bzO()}/><circle cx="90" cy="-20" r="40" fill="#e8e4dc" ${bzO()}/><circle cx="80" cy="-60" r="18" fill="#f0b0b8" ${bzO('stroke-width="4"')}/>
  <g class="eye"><circle cx="105" cy="-26" r="7" fill="${BZ.ink}"/></g><g class="xeye" opacity="0"><path d="M97 -34 l 16 16 M113 -34 l -16 16" stroke="${BZ.ink}" stroke-width="5"/></g><path d="M-90 0 q -60 10 -90 -30" stroke="#f0b0b8" stroke-width="10" fill="none" stroke-linecap="round"/></g></g>`;
const wsCage = (x: number, y: number) => `<g>${[...Array(9)].map((_, i) => `<path d="M${x - 360 + i * 90} ${y - 500} V${y}" stroke="#8a8a94" stroke-width="10"/>`).join('')}<path d="M${x - 380} ${y - 500} H${x + 380} M${x - 380} ${y} H${x + 380}" stroke="#8a8a94" stroke-width="16"/></g>`;
const wsBrain = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-200 0 Q -220 -160 -80 -180 Q 0 -260 100 -190 Q 230 -170 210 -20 Q 230 120 80 130 Q 0 180 -90 130 Q -230 120 -200 0 Z" fill="#f0a8b8" ${bzO()}/>
  <path d="M-120 -80 q 40 -40 80 0 q 40 40 80 0 M-140 20 q 50 -40 100 0 q 50 40 100 0 M-60 90 q 40 -30 80 0" stroke="#c87888" stroke-width="10" fill="none" stroke-linecap="round"/></g></g>`;
const wsBag = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-70 0 Q -90 -110 -20 -130 L -30 -160 L 30 -160 L 20 -130 Q 90 -110 70 0 Z" fill="#2a2a34" ${bzO()}/><path d="M-30 -160 l 30 -20 l 30 20" stroke="${BZ.ink}" stroke-width="8" fill="none"/></g></g>`;

defineVisuals({
  'test-props': { bg: '#e8dcc0', html: () => svg(`${wsClass()}${wsBrain('br', 540, 1000, 1.2)}${wsBag('b1', 300, 1600)}${wsBag('b2', 760, 1600)}`), anim() {} },
  'test-news': { bg: '#3a3a4a', html: () => svg(`<rect width="1080" height="1920" fill="#3a3a4a"/>${wsPaper('pp')}${wsCage(540, 1800)}${wsRat('rt', 540, 1740, 1.2)}`), anim() {} },
  'cover-a': { bg: '#2a2a4a', html: () => svg(`${wiRoom(true, '3:00')}${wiChar('kid', 540, 2250, 2.5)}${bzVignette(0.5)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #kid', s.t0, 'wide', 'flat'); } },
});
