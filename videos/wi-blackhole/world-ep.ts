// ---- WHAT IF EP.3: falling into a black hole. Props: the black hole with its glowing disk, a spaceship with the friend, a timer.
const wbHole = (id: string, x: number, y: number, r: number) => `<g id="${id}">${bzGlow(id + 'g', x, y, r * 3.2, '#ff9a3a', 0.35)}
  <g class="disk"><ellipse cx="${x}" cy="${y}" rx="${r * 2.6}" ry="${r * 0.7}" fill="none" stroke="#ffb050" stroke-width="${r * 0.35}" opacity="0.9"/><ellipse cx="${x}" cy="${y}" rx="${r * 2.2}" ry="${r * 0.55}" fill="none" stroke="#fff0c0" stroke-width="${r * 0.12}" opacity="0.9"/></g>
  <circle cx="${x}" cy="${y}" r="${r * 1.15}" fill="none" stroke="#ffd27a" stroke-width="${r * 0.1}" opacity="0.8"/><circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>
  <path d="M${x - r * 2.6} ${y} A ${r * 2.6} ${r * 0.7} 0 0 0 ${x + r * 2.6} ${y}" fill="none" stroke="#ffb050" stroke-width="${r * 0.35}" opacity="0.9"/></g>`;
const wbShip = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M-160 0 Q -160 -90 0 -110 Q 200 -90 220 0 Q 200 60 0 70 Q -160 60 -160 0 Z" fill="#c8d0e0" ${bzO()}/><circle cx="40" cy="-20" r="50" fill="#9ad8ff" ${bzO()}/>
  <path d="M-160 -20 l -60 -30 v100 l 60 -30 z" fill="#e0342c" ${bzO('stroke-width="5"')}/></g></g>`;
const wbTimer = (id: string, txt: string) => `<g id="${id}"><rect x="290" y="760" width="500" height="220" rx="30" fill="#0a0a14" ${bzO('stroke-width="10"')}/><text class="tx" x="540" y="910" text-anchor="middle" font-family="Anton" font-size="150" fill="#ff3a2a">${txt}</text></g>`;

defineVisuals({
  'test-hole': { bg: '#05061a', html: () => svg(`${wiSpace(3)}${wbHole('bh', 540, 900, 180)}${wiChar('kid', 300, 1700, 0.8)}${wbShip('sh', 820, 1500, 0.9)}`), anim() {} },
  'cover-a': { bg: '#05061a', html: () => svg(`${wiSpace(5)}${wbHole('bh', 540, 760, 200)}${wiChar('kid', 540, 2350, 2.4)}${bzVignette(0.4)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #kid', s.t0, 'wide', 'open'); } },
});
