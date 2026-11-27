// ---- WHAT IF EP.5: the Earth stopped spinning. Props: a speedometer, flying car/house/tree, an Earth map with water at the poles and a land belt.
const weSpeed = (id: string) => `<g id="${id}"><path d="M240 1000 A 300 300 0 0 1 840 1000" fill="none" stroke="${BZ.ink}" stroke-width="60"/><path d="M240 1000 A 300 300 0 0 1 840 1000" fill="none" stroke="#f4f2ea" stroke-width="40"/>
  <path d="M700 760 A 300 300 0 0 1 840 1000" fill="none" stroke="#e0342c" stroke-width="40"/><g class="nd"><path d="M540 1000 L 540 740" stroke="${BZ.ink}" stroke-width="24" stroke-linecap="round"/><path d="M540 1000 L 540 740" stroke="#e0342c" stroke-width="12" stroke-linecap="round"/></g><circle cx="540" cy="1000" r="36" fill="${BZ.ink}"/>
  <text x="540" y="1180" text-anchor="middle" font-family="Anton" font-size="110" fill="#fff">1,000 MPH</text></g>`;
const weCar = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-140" y="-80" width="280" height="80" rx="20" fill="#3a8ac8" ${bzO()}/><path d="M-80 -80 L -50 -140 L 60 -140 L 90 -80 Z" fill="#9ad8ff" ${bzO()}/><circle cx="-80" cy="0" r="34" fill="${BZ.ink}"/><circle cx="80" cy="0" r="34" fill="${BZ.ink}"/></g></g>`;
const weHouse = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-110" y="-160" width="220" height="160" fill="#e8a070" ${bzO()}/><path d="M-140 -150 L 0 -260 L 140 -150 Z" fill="#a8402a" ${bzO()}/><rect x="-25" y="-80" width="50" height="80" fill="#5a3a22"/></g></g>`;
const weTree = (id: string, x: number, y: number, s = 1) => `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})"><rect x="-18" y="-160" width="36" height="160" fill="#6a4a2a" ${bzO()}/><circle cx="0" cy="-220" r="90" fill="#3fa84a" ${bzO()}/></g></g>`;
// a flat world map in an ellipse: water bands at the poles (#polN/#polS) and the equator belt of land (#belt)
const weMap = (id: string) => `<g id="${id}"><defs><clipPath id="${id}c"><ellipse cx="540" cy="900" rx="460" ry="460"/></clipPath></defs><g clip-path="url(#${id}c)"><rect x="60" y="420" width="960" height="960" fill="#3fa84a"/>
  <rect class="polN" x="60" y="420" width="960" height="200" fill="#2f7ad8"/><rect class="polS" x="60" y="1180" width="960" height="200" fill="#2f7ad8"/><rect class="eqw" x="60" y="780" width="960" height="240" fill="#2f7ad8"/><rect class="belt" x="60" y="800" width="960" height="200" fill="#c8a86a" opacity="0"/></g>
  <ellipse cx="540" cy="900" rx="460" ry="460" fill="none" ${bzO('stroke-width="10"')}/><path d="M80 900 H1000" stroke="#f6c744" stroke-width="6" stroke-dasharray="30 20"/></g>`;

defineVisuals({
  'test-props': { bg: '#5ab0f0', html: () => svg(`${wiCity(3)}${weCar('car', 300, 1650, 1)}${weHouse('hs', 760, 1500, 1)}${weTree('tr', 540, 1500, 1)}`), anim() {} },
  'test-map': { bg: '#05061a', html: () => svg(`${wiSpace(2)}${weMap('mp')}${weSpeed('sp')}`), anim() {} },
  'cover-a': { bg: '#05061a', html: () => svg(`${wiSpace(6)}<g opacity="0.95">${wiEarth('ea', 540, 900, 320)}</g><rect x="540" y="420" width="560" height="960" fill="#05061a" opacity="0.6"/>${wiChar('kid', 540, 2350, 2.2)}${bzVignette(0.4)}`), anim(tl, s) { bzFace(tl, '#sc-cover-a #kid', s.t0, 'wide', 'open'); } },
});
