// =====================================================================
//  ZONA DE SILÊNCIO, EP1: the world (prefix zs). Everything is built once and posed from the time t.
//  1. materials (skin, cloth patterns, hair, wet creature skin)       4. the creature (the Chiado)
//  2. people: one rig for every character (body, face, speech)       5. sets: observatory, basement, main street,
//  3. motion: poses, walk/run cycles, fight moves, expressions           video store, woods, Ray's shop
//  The cast and the look are in BIBLIA.md and plan.md.
// =====================================================================
const ZS: any = {};

// ---------------------------------------------------------------- 1. materials
const zsMats = new Map<string, THREE.Material>();
const zsM = <M extends THREE.Material>(key: string, make: () => M): M => { let m = zsMats.get(key) as M | undefined; if (!m) { m = make(); zsMats.set(key, m); } return m; };
const zsC = (c: string) => new THREE.Color(c);

// skin: warm sheen, faint mottling and pores
const zsSkin = (tone: string) => zsM('skin' + tone, () => p3Shader(new THREE.MeshPhysicalMaterial({ color: tone, roughness: 0.5, sheen: 0.35, sheenRoughness: 0.55, sheenColor: zsC('#ff8f6e'), clearcoat: 0.06, clearcoatRoughness: 0.6 }), 'zs-skin', {
  bump: 0.00035, color: `float n = p3F(p3Pos.xy * 22.0 + p3Pos.z * 7.0), m = p3N(p3Pos.xy * 1400.0 + p3Pos.z * 900.0); diffuseColor.rgb *= 0.95 + 0.07 * n; p3Ht = m;` }));
type ZsPattern = 'plain' | 'flannel' | 'denim' | 'knit' | 'canvas' | 'suit' | 'nylon';
// cloth: a weave everywhere, plus the pattern (two colors), all from the object position (no uv seams)
const ZS_CLOTH_GLSL: Record<ZsPattern, string> = {
  plain: `float w = p3N(p3Pos.xy * 260.0) * 0.5 + p3N(p3Pos.zy * 260.0) * 0.5; diffuseColor.rgb = uA * (0.9 + 0.12 * w); p3Ht = w;`,
  flannel: `vec2 q = p3Pos.xy * 7.0 + p3Pos.zy * 7.0; float a = step(0.62, fract(q.x)), b = step(0.62, fract(q.y)), th = step(0.92, fract(q.x * 3.0)) + step(0.92, fract(q.y * 3.0));
    float w = p3N(p3Pos.xy * 300.0); vec3 c = mix(uA, uB, max(a, b) * 0.85); c = mix(c, uB * 0.55, a * b * 0.7); c = mix(c, vec3(0.92), th * 0.18); diffuseColor.rgb = c * (0.88 + 0.14 * w); p3Ht = w;`,
  denim: `float d = fract((p3Pos.x + p3Pos.z) * 140.0 + p3Pos.y * 140.0), w = p3N(p3Pos.xy * 40.0); vec3 c = mix(uA, uA * 1.45 + 0.05, w * 0.55 + step(0.5, d) * 0.12); diffuseColor.rgb = c; p3Ht = step(0.5, d) + w;`,
  knit: `float r = p3N(vec2((p3Pos.x + p3Pos.z) * 260.0, p3Pos.y * 30.0)), w = p3N(p3Pos.xy * 90.0); diffuseColor.rgb = uA * (0.9 + 0.08 * r + 0.05 * w); p3Ht = r;`,
  canvas: `float w = p3N(p3Pos.xy * 200.0) * 0.6 + p3N(p3Pos.zy * 180.0) * 0.4, s = p3F(p3Pos.xy * 9.0); diffuseColor.rgb = mix(uA, uB, s * 0.45) * (0.86 + 0.18 * w); p3Ht = w;`,
  suit: `float s = step(0.93, fract((p3Pos.x + p3Pos.z) * 38.0)), w = p3N(p3Pos.xy * 320.0); diffuseColor.rgb = mix(uA, uB, s * 0.35) * (0.93 + 0.08 * w); p3Ht = w;`,
  nylon: `float w = p3F(p3Pos.xy * 12.0 + p3Pos.z * 4.0); diffuseColor.rgb = mix(uA, uB, step(0.55, fract(p3Pos.y * 3.2)) * 0.9) * (0.85 + 0.3 * w); p3Ht = w;`,
};
const zsCloth = (a: string, pattern: ZsPattern = 'plain', b = '#222222', rough = 0.85) => zsM(`cloth${a}${pattern}${b}`, () => p3Shader(
  new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: pattern === 'nylon' ? 0.45 : rough }), 'zs-cloth-' + pattern,
  { uniforms: { uA: { value: zsC(a) }, uB: { value: zsC(b) } }, bump: pattern === 'knit' ? 0.012 : 0.006, color: ZS_CLOTH_GLSL[pattern] }));
// hair: strands along the head, a darker root, glossy
const zsHairMat = (c: string) => zsM('hair' + c, () => p3Shader(new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.55, sheen: 0.5, sheenColor: zsC(c).multiplyScalar(1.4), clearcoat: 0.08, clearcoatRoughness: 0.5 }), 'zs-hair', {
  uniforms: { uA: { value: zsC(c) } }, bump: 0.01,
  color: `float a = atan(p3Pos.x, p3Pos.z), s = p3N(vec2(a * 40.0, p3Pos.y * 4.0)) * 0.6 + p3N(vec2(a * 110.0, p3Pos.y * 9.0)) * 0.4; diffuseColor.rgb = uA * (0.62 + 0.62 * s); p3Ht = s;` }));
const zsStd = (c: string, rough = 0.6, metal = 0, emissive = 0, ec?: string) => zsM(`std${c}${rough}${metal}${emissive}${ec}`, () => new THREE.MeshStandardMaterial({ color: c, roughness: rough, metalness: metal, emissive: emissive ? (ec || c) : '#000000', emissiveIntensity: emissive }));
const zsGlow = (c: string, k = 1) => zsM(`glow${c}${k}`, () => new THREE.MeshBasicMaterial({ color: zsC(c).multiplyScalar(k), toneMapped: false }));
const zsMesh = (g: THREE.BufferGeometry, m: THREE.Material, p?: Vec3, r?: Vec3, s?: Vec3 | number) => {
  const o = new THREE.Mesh(g, m); o.castShadow = o.receiveShadow = true;
  if (p) o.position.set(...p); if (r) o.rotation.set(...r); if (s !== undefined) { if (typeof s === 'number') o.scale.setScalar(s); else o.scale.set(...s); }
  return o;
};
const zsCap = (r: number, len: number) => new THREE.CapsuleGeometry(r, Math.max(0.001, len), 6, 14);
// a capsule that tapers (r0 at the top joint, r1 at the bottom), hanging from 0 down to -len, round caps that overlap the
// neighbouring joints (limbs, fingers, the neck)
const zsLimbGeo = (r0: number, r1: number, len: number) => {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 8; i++) { const a = -Math.PI / 2 + (i / 8) * (Math.PI / 2); pts.push(new THREE.Vector2(Math.max(1e-4, Math.cos(a) * r1), -len + Math.sin(a) * r1)); }
  for (let i = 0; i <= 8; i++) { const a = (i / 8) * (Math.PI / 2); pts.push(new THREE.Vector2(Math.max(1e-4, Math.cos(a) * r0), Math.sin(a) * r0)); }
  const g = new THREE.LatheGeometry(pts, 16); g.computeVertexNormals(); return g;
};

// ---------------------------------------------------------------- 2. people
type ZsJoint = 'hips' | 'spine' | 'chest' | 'neck' | 'head' | 'sL' | 'eL' | 'wL' | 'sR' | 'eR' | 'wR' | 'hL' | 'kL' | 'aL' | 'hR' | 'kR' | 'aR';
const ZS_JOINTS: ZsJoint[] = ['hips', 'spine', 'chest', 'neck', 'head', 'sL', 'eL', 'wL', 'sR', 'eR', 'wR', 'hL', 'kL', 'aL', 'hR', 'kR', 'aR'];
// a pose: joint rotations [x, y, z] in radians. Conventions (the person faces +z, the left side is +x):
//   arms: x < 0 raises forward, z > 0 lifts the LEFT arm out (z < 0 the right one); elbows bend with x < 0
//   legs: x < 0 swings the thigh forward; knees bend with x > 0; ankles x < 0 lifts the toes
//   spine/chest x > 0 leans forward; head x > 0 looks down, y turns left
//   y: hip height offset (crouch < 0), f: finger curl [left, right] (0 open, 1 fist), face: an expression name
interface ZsPose { j?: Partial<Record<ZsJoint, number[]>>; y?: number; f?: [number, number]; face?: string; x?: number; z?: number }
interface ZsFace { lid: number; lidLow: number; browUp: number; browIn: number; smile: number; open: number; wide: number; lookX: number; lookY: number; sneer: number }
const ZS_FACE0: ZsFace = { lid: 0.18, lidLow: 0, browUp: 0, browIn: 0, smile: 0.05, open: 0, wide: 0, lookX: 0, lookY: 0, sneer: 0 };
const ZS_FACES: Record<string, Partial<ZsFace>> = {
  neutral: {}, calm: { lid: 0.3, smile: 0.1 },
  smile: { smile: 0.7, lid: 0.3, browUp: 0.15 }, grin: { smile: 1, lid: 0.38, browUp: 0.25, open: 0.25, wide: 0.6 },
  laugh: { smile: 1, lid: 0.55, browUp: 0.35, open: 0.6, wide: 0.5 },
  smirk: { smile: 0.45, lid: 0.35, browUp: -0.1, sneer: 0.6 },
  worried: { browUp: 0.55, browIn: 0.55, smile: -0.35, lid: 0.12 },
  fear: { browUp: 0.95, browIn: 0.7, lid: -0.15, lidLow: 0.1, smile: -0.4, open: 0.22, wide: -0.2 },
  terror: { browUp: 1, browIn: 0.85, lid: -0.3, lidLow: 0.15, smile: -0.6, open: 0.75, wide: -0.1 },
  scream: { browUp: 0.9, browIn: 0.9, lid: -0.2, smile: -0.5, open: 1, wide: 0.1 },
  angry: { browUp: -0.6, browIn: 1, lid: 0.32, smile: -0.4, sneer: 0.4 },
  rage: { browUp: -0.8, browIn: 1, lid: 0.25, smile: -0.5, open: 0.55, wide: 0.8, sneer: 0.8 },
  sad: { browUp: 0.5, browIn: 0.8, lid: 0.45, smile: -0.55, lookY: -0.4 },
  tired: { lid: 0.6, browUp: 0.1, smile: -0.15, lookY: -0.2 },
  skeptic: { browUp: 0.1, browIn: 0.3, lid: 0.42, smile: -0.1, sneer: 0.5 },
  awe: { browUp: 0.8, lid: -0.1, open: 0.3, wide: -0.4, smile: 0.1 },
  pain: { browUp: 0.3, browIn: 1, lid: 0.75, smile: -0.7, open: 0.4, wide: 0.9 },
  shout: { browUp: 0.2, browIn: 0.8, lid: 0.05, open: 0.85, wide: 0.5, smile: -0.2 },
  hush: { lid: 0.2, browUp: 0.4, browIn: 0.3, smile: -0.2, open: 0, wide: -0.6 },
};
interface ZsSpec {
  name: string; h: number; build?: number; skin: string; female?: boolean; kid?: boolean;
  hair: { style: 'short' | 'side' | 'long' | 'curly' | 'pony' | 'messy' | 'bald' | 'seventies'; color: string };
  beard?: string; stubble?: string; mustache?: string; glasses?: string; iris?: string; lip?: string; beanie?: string;
  shirt: { c: string; p?: ZsPattern; c2?: string; short?: boolean };
  jacket?: { c: string; p?: ZsPattern; c2?: string; long?: boolean; open?: boolean };
  pants: { c: string; p?: ZsPattern }; shoes: string; tie?: string; scar?: boolean; pager?: boolean;
}
interface ZsPerson {
  spec: ZsSpec; root: THREE.Group; J: Record<ZsJoint, THREE.Group>; H: number;
  face: { set(f: ZsFace): void }; fingers: { L: THREE.Group[]; R: THREE.Group[] };
  handL: THREE.Group; handR: THREE.Group;   // attach props to these (a walkie, a flashlight, an axe)
  len: { thigh: number; shin: number; upper: number; fore: number; hipY: number };
}
const zsGroup = (...c: THREE.Object3D[]) => { const g = new THREE.Group(); if (c.length) g.add(...c); return g; };
const zsSmoothstep = (a: number, b: number, x: number) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); };

// the head: skull, face and hair, radius r (front is +z). The skull is one smooth surface: a sphere pushed by soft bumps
// (gaussians), so there are no creases: brow ridge, eye sockets, cheekbones, a jaw that narrows and a chin.
const zsG = (dx: number, dy: number, s: number) => Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
const zsSkullShape = (fem: number, kid: number) => (x: number, y: number, z: number): Vec3 => {
  const jaw = zsSmoothstep(-0.05, -0.95, y);
  let X = x * 0.84 * (1 - jaw * (0.26 + fem * 0.05 + kid * 0.03)), Y = y * (y < 0 ? 1.1 - kid * 0.07 : 1.02), Z = z * 0.96;
  if (z < 0) Z = z * (1.06 - jaw * 0.25);                                                        // the back of the skull, the neck side
  if (z > 0.55) Z = 0.55 * 0.96 + (Z - 0.55 * 0.96) * 0.72;                                        // a flatter face
  const front = zsSmoothstep(0.3, 0.8, z);
  Z += front * (0.035 * zsG(x, y - 0.28, 0.28) * (1 - kid * 0.6)                                    // brow ridge
    - 0.06 * (zsG(x - 0.34, y - 0.1, 0.12) + zsG(x + 0.34, y - 0.1, 0.12))                         // eye sockets
    + 0.03 * (zsG(x - 0.44, y + 0.2, 0.15) + zsG(x + 0.44, y + 0.2, 0.15))                         // cheekbones
    + 0.06 * zsG(x, y + 0.88, 0.14) + 0.02 * zsG(x, y + 0.52, 0.12));                             // chin and the lips' base
  return [X, Y, Z];
};
const zsHead = (sp: ZsSpec, r: number) => {
  const skin = zsSkin(sp.skin), g = zsGroup(), F = zsGroup(); g.add(F);
  const fem = sp.female ? 1 : 0, kid = sp.kid ? 1 : 0, shape = zsSkullShape(fem, kid);
  const S = (x: number, y: number, z: number): Vec3 => { const q = shape(x, y, z); return [q[0] * r, q[1] * r, q[2] * r]; };
  // the surface point in front at (x, y) on the face (to sit features on the skin)
  const surf = (x: number, y: number) => { const z = Math.sqrt(Math.max(0, 1 - x * x - y * y)); return S(x, y, z)[2]; };
  F.add(zsMesh(p3Blob(S, undefined, 64, 48), skin));
  // ears
  for (const s of [1, -1]) F.add(zsMesh(new THREE.SphereGeometry(r * 0.2, 16, 12), skin, [s * r * 0.82, -r * 0.08, -r * 0.06], [0, s * 0.35, 0], [0.38, 1, 0.7]));
  // nose: bridge, tip and the wings of the nostrils
  const nb = p3Blob((x, y, z) => [x * r * 0.075, y * r * 0.2, Math.max(0, z) * r * (0.06 + 0.07 * zsSmoothstep(0.6, -1, y))], undefined, 18, 14);
  F.add(zsMesh(nb, skin, [0, -r * 0.08, surf(0, -0.08) - r * 0.02]));
  const tipZ = surf(0, -0.3) + r * (0.07 + (1 - kid) * 0.02);
  F.add(zsMesh(new THREE.SphereGeometry(r * 0.07, 16, 12), skin, [0, -r * 0.29, tipZ], undefined, [1.15, 0.9, 0.95]));
  for (const s of [1, -1]) {
    F.add(zsMesh(new THREE.SphereGeometry(r * 0.048, 12, 10), skin, [s * r * 0.072, -r * 0.325, tipZ - r * 0.055], undefined, [1, 0.8, 1]));
    F.add(zsMesh(new THREE.SphereGeometry(r * 0.013, 8, 6), zsStd('#2a1712', 0.9), [s * r * 0.04, -r * 0.36, tipZ - r * 0.045], undefined, [1.3, 0.6, 1]));
  }
  // eyes in their sockets: white, iris and pupil painted by angle; lids that close; brows
  const iris = zsC(sp.iris || '#4a2e1c');
  const eyeMat = zsM('eye' + (sp.iris || ''), () => p3Shader(new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.04 }), 'zs-eye', {
    uniforms: { uI: { value: iris } },
    color: `vec3 d = normalize(p3Pos); float a = acos(clamp(d.z, -1.0, 1.0)); vec3 c = vec3(0.93, 0.9, 0.86) - vec3(0.0, 0.1, 0.09) * smoothstep(0.7, 1.5, a);
      float ir = smoothstep(0.5, 0.46, a), pu = smoothstep(0.22, 0.19, a), ring = smoothstep(0.34, 0.47, a) * ir; vec3 ic = uI * (0.7 + 0.6 * p3N(vec2(atan(d.y, d.x) * 7.0, a * 22.0))) * (1.0 - ring * 0.55);
      c = mix(c, ic, ir); c = mix(c, vec3(0.015), pu); c += vec3(0.9) * smoothstep(0.08, 0.04, length(d.xy - vec2(-0.18, 0.2))); diffuseColor.rgb = c;` }));
  const eyes: THREE.Group[] = [], lids: THREE.Mesh[] = [], lows: THREE.Mesh[] = [], brows: THREE.Mesh[] = [];
  const er = r * (0.118 + kid * 0.022), ex = 0.34, ey = 0.1;
  const ez = surf(ex, ey) - er * 0.55;
  for (const s of [1, -1]) {
    const e = zsGroup(zsMesh(new THREE.SphereGeometry(er, 28, 20), eyeMat)); e.position.set(s * ex * r * 0.84, ey * r, ez); F.add(e); eyes.push(e);
    const lid = zsMesh(new THREE.SphereGeometry(er * 1.09, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.56), skin); lid.position.copy(e.position); F.add(lid); lids.push(lid);
    const low = zsMesh(new THREE.SphereGeometry(er * 1.07, 24, 8, 0, Math.PI * 2, Math.PI * 0.66, Math.PI * 0.34), skin); low.position.copy(e.position); F.add(low); lows.push(low);
    const b = zsMesh(zsCap(r * 0.026, r * 0.22), zsHairMat(sp.hair.style === 'bald' ? (sp.mustache || '#7a7066') : sp.hair.color), [s * ex * r * 0.86, (ey + 0.2) * r, surf(ex, ey + 0.2) + r * 0.0], [0, s * 0.25, Math.PI / 2], [1, 1, 0.7]); F.add(b); brows.push(b);
  }
  // mouth: the dark inside, teeth, two lips that open, stretch and curl
  const my = -0.53, M = zsGroup(); M.position.set(0, my * r, surf(0, my) - r * 0.015); F.add(M);
  const lipM = zsStd(sp.lip || (sp.female ? '#b0605e' : '#a8705f'), 0.42);
  const inside = zsMesh(new THREE.CircleGeometry(r * 0.17, 24), zsStd('#2a0c0c', 0.9), [0, 0, -r * 0.01]); M.add(inside);
  const teeth = zsMesh(new THREE.BoxGeometry(r * 0.26, r * 0.05, r * 0.03), zsStd('#efe9dc', 0.3), [0, r * 0.03, -r * 0.005]); M.add(teeth);
  const lipU = zsMesh(new THREE.TorusGeometry(r * 0.16, r * 0.034, 8, 24, Math.PI), lipM), lipD = zsMesh(new THREE.TorusGeometry(r * 0.16, r * 0.042, 8, 24, Math.PI), lipM);
  lipD.rotation.z = Math.PI; M.add(lipU, lipD);
  // cheeks that lift with a smile
  const cheeks = [1, -1].map((s) => { const c = zsMesh(new THREE.SphereGeometry(r * 0.15, 14, 10), skin, [s * r * 0.38, -r * 0.3, surf(0.42, -0.3) - r * 0.115], undefined, [1, 0.8, 0.6]); return c; });
  // hair
  const hairM = zsHairMat(sp.hair.color), st = sp.hair.style;
  if (st !== 'bald') {
    const hair = p3Blob((x, y, z) => {
      let k = 1.06, Y = y;
      const line = 0.42 - (st === 'side' ? 0.12 * x : 0) - (st === 'messy' || st === 'curly' ? -0.04 : 0);
      const face = z > 0.25 && y < line, side = Math.abs(x) > 0.62 && y < 0.02 && z > -0.35, low = y < -0.2;
      if (face || side || low) k = 0.92;                                                         // tucked inside: the face and ears stay clear
      if ((st === 'long' || st === 'seventies') && y < 0.1 && !face) {
        const drop = st === 'long' ? 1.9 : 1.0; Y = y * drop - (st === 'long' ? 0.04 : 0); k = Math.abs(x) > 0.55 && z > 0.05 && y > -0.2 ? 1.04 : 1.07;
        if (z > 0.2) k = 0.92;
      }
      if (st === 'messy') k += 0.07 * (p3Noise3(x * 5, y * 5, z * 5) - 0.35);
      if (st === 'curly' && k > 1) k = 1.1 + 0.05 * p3Noise3(x * 9, y * 9, z * 9);
      const q = shape(x, Y, z); return [q[0] * r * k, q[1] * r * k + (k > 1 ? r * 0.02 : 0), q[2] * r * k];
    }, undefined, 56, 40);
    F.add(zsMesh(hair, st === 'curly' ? zsM('curl' + sp.hair.color, () => p3Shader(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 }), 'zs-curl', { uniforms: { uA: { value: zsC(sp.hair.color) } }, bump: 0.02,
      color: `vec3 v = p3V(p3Pos.xy * 160.0 + p3Pos.z * 90.0); float c = smoothstep(0.0, 0.45, v.x); diffuseColor.rgb = uA * (0.55 + 0.7 * c); p3Ht = c;` })) : hairM));
    if (st === 'pony') { const tail = zsMesh(zsLimbGeo(r * 0.15, r * 0.06, r * 1.0), hairM, [0, r * 0.3, -r * 0.92], [-2.75, 0, 0]); F.add(tail);
      F.add(zsMesh(new THREE.TorusGeometry(r * 0.13, r * 0.03, 6, 14), zsStd('#c0392b', 0.5), [0, r * 0.28, -r * 0.94], [0.4, 0, 0])); }
  } else {
    // a fringe of grey hair around the back of the head, at ear height
    const ring = zsMesh(new THREE.TorusGeometry(r * 0.84, r * 0.11, 8, 30, Math.PI * 1.15), zsHairMat(sp.beard || '#9c958c')); ring.rotation.z = -0.075 * Math.PI;
    const rg = zsGroup(ring); rg.rotation.x = -Math.PI / 2; rg.position.set(0, r * 0.05, -r * 0.05); rg.scale.set(1, 1.05, 0.9); F.add(rg);
  }
  if (sp.beanie) F.add(zsMesh(new THREE.SphereGeometry(r * 1.1, 28, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), zsCloth(sp.beanie, 'knit'), [0, r * 0.1, -r * 0.05], [-0.2, 0, 0]));
  if (sp.beard || sp.stubble) {
    const bd = p3Blob((x, y, z) => { const mouth = Math.abs(x) < 0.26 && y > -0.62 && y < -0.42 && z > 0; const on = y < -0.12 && z > -0.3 && !mouth;
      const k = on ? (sp.beard ? 1.07 : 1.006) : 0.9, q = shape(x, y, z); return [q[0] * r * k, q[1] * r * k, q[2] * r * k]; }, undefined, 48, 36);
    F.add(zsMesh(bd, sp.beard ? zsHairMat(sp.beard) : zsM('stub' + sp.stubble + sp.skin, () => p3Shader(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.8 }), 'zs-stubble', { uniforms: { uA: { value: zsC(sp.stubble!) }, uS: { value: zsC(sp.skin) } },
      color: `float n = step(0.5, p3N(p3Pos.xy * 1400.0 + p3Pos.z * 500.0)); diffuseColor.rgb = mix(uS * 0.88, uA * 0.8, 0.5 * n + 0.12);` }))));
  }
  if (sp.mustache) F.add(zsMesh(zsCap(r * 0.045, r * 0.26), zsHairMat(sp.mustache), [0, -r * 0.43, surf(0, -0.43) + r * 0.01], [0, 0, Math.PI / 2], [1, 1, 0.7]));
  if (sp.glasses) {
    const fm = zsStd(sp.glasses, 0.3, 0.4), gz = ez + er * 1.35;
    for (const s of [1, -1]) {
      const cx = s * ex * r * 0.84;
      F.add(zsMesh(new THREE.TorusGeometry(er * 1.5, r * 0.014, 6, 28), fm, [cx, ey * r, gz], undefined, [1.15, 0.88, 1]));
      const lens = zsMesh(new THREE.CircleGeometry(er * 1.48, 24), zsM('lens', () => new THREE.MeshPhysicalMaterial({ color: '#dfe8ff', transparent: true, opacity: 0.05, roughness: 0.05, clearcoat: 1 })), [cx, ey * r, gz], undefined, [1.15, 0.88, 1]); lens.castShadow = false; F.add(lens);
      F.add(p3Rod([cx + s * er * 1.7, ey * r + er * 0.3, gz - r * 0.01], [s * r * 0.8, ey * r + er * 0.3, -r * 0.05], r * 0.012, fm));
    }
    F.add(p3Rod([-ex * r * 0.84 + er * 1.6, ey * r + er * 0.35, gz + r * 0.01], [ex * r * 0.84 - er * 1.6, ey * r + er * 0.35, gz + r * 0.01], r * 0.013, fm));
  }
  const base = { brows: brows.map((b) => b.position.clone()), cheek: cheeks[0].position.y };
  const face = {
    set(f: ZsFace) {
      const lid = Math.min(1, Math.max(-0.4, f.lid));
      lids.forEach((l, i) => { l.rotation.x = -0.75 + lid * 1.7 + f.lookY * 0.25; l.rotation.z = (i ? 1 : -1) * f.browIn * 0.1; });
      lows.forEach((l) => { l.rotation.x = -f.lidLow * 0.45 - Math.max(0, f.smile) * 0.3; });
      eyes.forEach((e) => { e.rotation.set(-f.lookY * 0.4, f.lookX * 0.5, 0); });
      brows.forEach((b, i) => { const s = i ? -1 : 1; b.position.y = base.brows[i].y + f.browUp * r * 0.08 - f.browIn * r * 0.015; b.position.x = base.brows[i].x - s * f.browIn * r * 0.03;
        b.rotation.z = Math.PI / 2 + s * (f.browIn * 0.32 - f.browUp * 0.1); });
      const open = Math.max(0, f.open), wide = f.wide, smile = f.smile;
      M.scale.x = 1 + wide * 0.25 + Math.max(0, smile) * 0.16;
      lipU.position.y = r * 0.012 + open * r * 0.025 + f.sneer * r * 0.015; lipD.position.y = -r * 0.012 - open * r * 0.15;
      lipU.scale.set(1, 0.16 - smile * 0.15 + open * 0.2, 0.7); lipD.scale.set(1, 0.14 + smile * 0.2 + open * 0.4, 0.7);
      inside.scale.set(1 + wide * 0.08, 0.04 + open * 0.7, 1); inside.position.y = -open * r * 0.07;
      teeth.visible = open > 0.08 || smile > 0.6;
      cheeks.forEach((c) => { c.position.y = base.cheek + Math.max(0, smile) * r * 0.05; });
    },
  };
  face.set(ZS_FACE0);
  return { g, face };
};

// a hand hanging from the wrist: palm, four fingers in two segments and a thumb; .curl(0..1)
const zsHand = (sp: ZsSpec, L: number, side: number) => {
  const skin = zsSkin(sp.skin), g = zsGroup(), fingers: THREE.Group[] = [];
  const pw = L * 0.42, pl = L * 0.48;
  g.add(zsMesh(new THREE.RoundedBoxGeometry(pw, pl, L * 0.17, 2, L * 0.06), skin, [0, -pl / 2, 0]));
  for (let i = 0; i < 4; i++) {
    const fl = L * (0.48 - Math.abs(i - 1.3) * 0.05), fx = (i - 1.5) * pw * 0.27 * side, fr = L * 0.045;
    const f1 = zsGroup(zsMesh(zsLimbGeo(fr, fr * 0.92, fl * 0.55), skin)); f1.position.set(fx, -pl, 0);
    const f2 = zsGroup(zsMesh(zsLimbGeo(fr * 0.9, fr * 0.75, fl * 0.45), skin)); f2.position.y = -fl * 0.55; f1.add(f2);
    g.add(f1); fingers.push(f1, f2);
  }
  const th = zsGroup(zsMesh(zsLimbGeo(L * 0.055, L * 0.045, L * 0.38), skin)); th.position.set(side * pw * 0.45, -pl * 0.25, L * 0.04); th.rotation.set(-0.4, 0, side * 0.6); g.add(th); fingers.push(th);
  if (sp.scar && side < 0) g.add(zsMesh(zsCap(L * 0.012, pw * 0.7), zsStd('#b9746a', 0.5), [0, -pl * 0.5, L * 0.09], [0, 0, 1.1]));
  return { g, fingers, curl(c: number) {
    for (let i = 0; i < 8; i++) fingers[i].rotation.x = -c * (i % 2 ? 1.6 : 1.4);
    th.rotation.set(-0.4 - c * 0.6, 0, side * (0.6 - c * 0.5));
  } };
};

const zsPerson = (sp: ZsSpec): ZsPerson => {
  const H = sp.h, b = sp.build ?? 0.4, kid = !!sp.kid, fem = !!sp.female;
  const headH = H / (kid ? 6.4 : 7.5), r = headH * 0.5;
  const hipY = H * (kid ? 0.47 : 0.485), torso = H * 0.29, neckL = H * 0.04;
  const shW = H * (fem ? 0.1 : 0.112) * (0.92 + b * 0.18), hipW = H * (fem ? 0.085 : 0.075) * (1 + b * 0.25);
  const upper = H * 0.17, fore = H * 0.15, handL = H * 0.1, thigh = hipY * 0.5, shin = hipY * 0.44;
  const skin = zsSkin(sp.skin), shirt = zsCloth(sp.shirt.c, sp.shirt.p || 'plain', sp.shirt.c2), pants = zsCloth(sp.pants.c, sp.pants.p || 'plain', '#222', 0.9);
  const top = sp.jacket ? zsCloth(sp.jacket.c, sp.jacket.p || 'canvas', sp.jacket.c2 || sp.jacket.c) : shirt;
  const J = {} as Record<ZsJoint, THREE.Group>; for (const n of ZS_JOINTS) J[n] = zsGroup();
  const root = zsGroup(J.hips); root.name = sp.name;
  J.hips.position.y = hipY; J.hips.add(J.spine, J.hL, J.hR); J.spine.add(J.chest); J.chest.position.y = torso * 0.42; J.chest.add(J.neck, J.sL, J.sR);
  J.neck.position.y = torso * 0.58; J.neck.add(J.head); J.head.position.y = neckL;
  // torso: a lathe profile (waist to shoulders), flattened front to back; belly on the spine, chest on the chest joint
  const girth = 1 + b * 0.35;
  const lathe = (prof: number[][], depth: number, mat: THREE.Material) => { const g = new THREE.LatheGeometry(prof.map(([x, y]) => new THREE.Vector2(x, y)), 24); g.computeVertexNormals(); return zsMesh(g, mat, undefined, undefined, [1, 1, depth]); };
  const w = H * 0.1 * girth;
  J.spine.add(lathe([[0.001, -0.06 * H], [hipW * 1.05, -0.05 * H], [w * (fem ? 0.82 : 0.95), 0.02 * H], [w * (fem ? 0.72 : 0.9) * (1 + b * 0.25), torso * 0.3], [w * 0.95, torso * 0.48], [0.001, torso * 0.5]], 0.62 + b * 0.1, top));
  J.chest.add(lathe([[0.001, -0.02 * H], [w * 0.96, -0.02 * H], [w * (fem ? 1.02 : 1.08), torso * 0.22], [shW * 0.98, torso * 0.46], [shW * 0.72, torso * 0.58], [H * 0.035, torso * 0.62], [0.001, torso * 0.62]], 0.6 + b * 0.08, top));
  // pelvis and the belt line
  J.hips.add(zsMesh(new THREE.SphereGeometry(1, 20, 14), pants, [0, -0.01 * H, 0], undefined, [hipW * 1.45, H * 0.07, hipW * 1.05 * (0.9 + b * 0.25)]));
  J.hips.add(zsMesh(new THREE.TorusGeometry(hipW * 1.4, H * 0.008, 6, 28), zsStd('#2b2118', 0.5), [0, 0.035 * H, 0], [Math.PI / 2, 0, 0], [1, 0.7 + b * 0.2, 1]));
  // shirt details: a collar, an open jacket's lapels, a tie, buttons
  J.chest.add(zsMesh(new THREE.TorusGeometry(H * 0.042, H * 0.009, 6, 20), shirt, [0, torso * 0.6, 0], [Math.PI / 2, 0, 0], [1, 0.75, 1]));
  if (sp.jacket && sp.jacket.open !== false) for (const s of [1, -1]) J.chest.add(zsMesh(new THREE.BoxGeometry(H * 0.04, torso * 0.7, H * 0.004), shirt, [s * H * 0.022, torso * 0.26, w * 0.63 * (0.62 + b * 0.1) / 0.62 * 0.98], [0, 0, s * 0.12]));
  if (sp.tie) J.chest.add(zsMesh(new THREE.BoxGeometry(H * 0.018, torso * 0.55, H * 0.006), zsStd(sp.tie, 0.5), [0, torso * 0.3, w * 0.62 + H * 0.004], [0.08, 0, 0]));
  if (sp.pager) J.hips.add(zsMesh(new THREE.RoundedBoxGeometry(H * 0.03, H * 0.045, H * 0.015, 2, 0.003), zsStd('#1a1a1c', 0.4), [hipW * 1.3, 0.02 * H, H * 0.03]));
  J.neck.add(zsMesh(zsLimbGeo(H * 0.032, H * 0.034, neckL + 0.02), skin, [0, neckL + 0.01, 0]));
  const head = zsHead(sp, r); head.g.position.y = r * 0.95; J.head.add(head.g);
  // arms
  const sleeveF = sp.shirt.short && !sp.jacket ? skin : top;
  const hands: ReturnType<typeof zsHand>[] = [];
  for (const [s, side] of [[J.sL, 1], [J.sR, -1]] as [THREE.Group, number][]) {
    s.position.set(side * shW * 0.92, torso * 0.47, 0);
    s.add(zsMesh(new THREE.SphereGeometry(H * 0.034 * (1 + b * 0.25), 14, 10), top));
    s.add(zsMesh(zsLimbGeo(H * 0.03 * (1 + b * 0.3), H * 0.024 * (1 + b * 0.25), upper), sp.shirt.short && !sp.jacket ? shirt : top));
    const e = side > 0 ? J.eL : J.eR, wr = side > 0 ? J.wL : J.wR; e.position.y = -upper; s.add(e);
    e.add(zsMesh(zsLimbGeo(H * 0.023 * (1 + b * 0.2), H * 0.018, fore), sleeveF));
    if (sleeveF !== skin) e.add(zsMesh(new THREE.TorusGeometry(H * 0.019, H * 0.004, 6, 16), top, [0, -fore + H * 0.01, 0], [Math.PI / 2, 0, 0]));
    wr.position.y = -fore; e.add(wr);
    const hd = zsHand(sp, handL, side); wr.add(hd.g); hands.push(hd);
  }
  // legs and shoes
  for (const [h, side] of [[J.hL, 1], [J.hR, -1]] as [THREE.Group, number][]) {
    h.position.set(side * hipW * 0.75, -0.01 * H, 0);
    h.add(zsMesh(zsLimbGeo(H * 0.05 * (1 + b * 0.35), H * 0.036 * (1 + b * 0.2), thigh), pants));
    const k = side > 0 ? J.kL : J.kR, a = side > 0 ? J.aL : J.aR; k.position.y = -thigh; h.add(k);
    k.add(zsMesh(zsLimbGeo(H * 0.035 * (1 + b * 0.2), H * 0.028, shin), pants));
    a.position.y = -shin; k.add(a);
    const shoe = zsM('shoe' + sp.shoes, () => p3Shader(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.55 }), 'zs-shoe', { uniforms: { uA: { value: zsC(sp.shoes) } },
      color: `float sole = step(p3Pos.y, -0.025); diffuseColor.rgb = mix(uA, vec3(0.88, 0.86, 0.8), sole);` }));
    a.add(zsMesh(new THREE.RoundedBoxGeometry(H * 0.058, H * 0.05, H * 0.155, 3, H * 0.02), shoe, [0, -H * 0.017, H * 0.035]));
  }
  const p: ZsPerson = { spec: sp, root, J, H, face: head.face, fingers: { L: hands[0].fingers, R: hands[1].fingers }, handL: J.wL, handR: J.wR,
    len: { thigh, shin, upper, fore, hipY } };
  (p as any).curl = (l: number, rr: number) => { hands[0].curl(l); hands[1].curl(rr); };
  return p;
};

// ---------------------------------------------------------------- 3. motion
const zsLerp = (a: number, b: number, u: number) => a + (b - a) * u;
const zsClamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const zsEase = (u: number) => { u = zsClamp(u); return u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2; };
const zsRamp = (t: number, a: number, b: number) => zsEase((t - a) / (b - a));
// blend two poses (missing joints are 0); u 0..1
const zsMix = (a: ZsPose, b: ZsPose, u: number): ZsPose => {
  const j: Partial<Record<ZsJoint, number[]>> = {};
  for (const n of ZS_JOINTS) { const pa = a.j?.[n], pb = b.j?.[n]; if (!pa && !pb) continue; const A = pa || [0, 0, 0], B = pb || [0, 0, 0]; j[n] = [zsLerp(A[0], B[0], u), zsLerp(A[1] || 0, B[1] || 0, u), zsLerp(A[2] || 0, B[2] || 0, u)]; }
  const fa = a.f || [0.25, 0.25], fb = b.f || [0.25, 0.25];
  return { j, y: zsLerp(a.y || 0, b.y || 0, u), f: [zsLerp(fa[0], fb[0], u), zsLerp(fa[1], fb[1], u)], face: u < 0.5 ? a.face : b.face, x: zsLerp(a.x || 0, b.x || 0, u), z: zsLerp(a.z || 0, b.z || 0, u) };
};
// add a pose on top of another (layers: breathing, a gesture over a walk)
const zsAdd = (a: ZsPose, b: ZsPose, k = 1): ZsPose => {
  const j: Partial<Record<ZsJoint, number[]>> = { ...(a.j || {}) };
  for (const n of ZS_JOINTS) { const pb = b.j?.[n]; if (!pb) continue; const A = j[n] || [0, 0, 0]; j[n] = [A[0] + pb[0] * k, (A[1] || 0) + (pb[1] || 0) * k, (A[2] || 0) + (pb[2] || 0) * k]; }
  return { ...a, j, y: (a.y || 0) + (b.y || 0) * k, f: b.f || a.f, face: b.face || a.face };
};
// a keyed timeline of poses: [[time, pose], ...] eased between keys (times absolute)
const zsTrack = (keys: [number, ZsPose][], t: number): ZsPose => {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) if (t < keys[i + 1][0]) return zsMix(keys[i][1], keys[i + 1][1], zsEase((t - keys[i][0]) / (keys[i + 1][0] - keys[i][0])));
  return keys[keys.length - 1][1];
};
const ZS_POSES: Record<string, ZsPose> = {
  stand: { j: { sL: [0.05, 0, 0.12], sR: [0.05, 0, -0.12], eL: [-0.15], eR: [-0.15], hL: [0, 0, 0.02], hR: [0, 0, -0.02] }, f: [0.3, 0.3] },
  relaxed: { j: { spine: [-0.03], sL: [0.08, 0, 0.1], sR: [0.02, 0, -0.14], eL: [-0.25], eR: [-0.1], hL: [0.02, 0, 0.05], hR: [-0.04, 0.1, -0.01], kR: [0.08], head: [0.04, 0, 0.05] }, f: [0.35, 0.3] },
  armsCrossed: { j: { sL: [-0.55, 0.3, 0.22], eL: [-1.9, 0.6, 0], sR: [-0.6, -0.3, -0.25], eR: [-1.9, -0.6, 0], head: [-0.05] }, f: [0.6, 0.6] },
  handsHips: { j: { sL: [0.1, 0, 0.55], eL: [-1.4, 0, 0], wL: [0, 0, -0.4], sR: [0.1, 0, -0.55], eR: [-1.4, 0, 0], wR: [0, 0, 0.4], hL: [0, 0, 0.07], hR: [0, 0, -0.07] }, f: [0.5, 0.5] },
  point: { j: { sR: [-1.45, 0.1, -0.1], eR: [-0.1], wR: [0.1], chest: [0, -0.15, 0], head: [0, -0.15, 0], sL: [0.05, 0, 0.12], eL: [-0.2] }, f: [0.35, 0.7] },
  shrug: { j: { sL: [0.1, 0, 0.35], eL: [-1.3, 0.4, 0], sR: [0.1, 0, -0.35], eR: [-1.3, -0.4, 0], head: [0, 0, 0.15], chest: [0.05] }, f: [0.1, 0.1] },
  talkL: { j: { sL: [-0.5, 0, 0.25], eL: [-1.1, 0.3, 0], wL: [0.3, 0, 0] }, f: [0.15, 0.3] },
  talkR: { j: { sR: [-0.5, 0, -0.25], eR: [-1.1, -0.3, 0], wR: [0.3, 0, 0] }, f: [0.3, 0.15] },
  scared: { j: { spine: [0.12], chest: [0.1], neck: [0.1], head: [-0.15], sL: [-0.6, 0.2, 0.15], eL: [-1.9, 0.4, 0], sR: [-0.6, -0.2, -0.15], eR: [-1.9, -0.4, 0], hL: [-0.15, 0, 0.06], hR: [-0.1, 0, -0.06], kL: [0.25], kR: [0.2] }, y: -0.03, f: [0.85, 0.85], face: 'fear' },
  cower: { j: { spine: [0.35], chest: [0.3], neck: [0.2], head: [0.1], sL: [-1.4, 0.4, 0.3], eL: [-2.2, 0.6, 0], sR: [-1.4, -0.4, -0.3], eR: [-2.2, -0.6, 0], hL: [-0.9, 0, 0.1], kL: [1.6], aL: [0.6], hR: [-0.7, 0, -0.1], kR: [1.4], aR: [0.5] }, y: -0.32, f: [1, 1], face: 'terror' },
  crouch: { j: { spine: [0.35], chest: [0.15], head: [-0.4], hL: [-1.1, 0, 0.12], kL: [1.9], aL: [0.75], hR: [-0.8, 0, -0.1], kR: [1.7], aR: [0.7], sL: [-0.5, 0, 0.1], eL: [-0.6], sR: [-0.4, 0, -0.1], eR: [-0.5] }, y: -0.36, f: [0.5, 0.5] },
  sit: { j: { hL: [-1.5, 0, 0.08], kL: [1.5], hR: [-1.5, 0, -0.08], kR: [1.5], spine: [-0.05], sL: [-0.35, 0, 0.1], eL: [-1.0], sR: [-0.35, 0, -0.1], eR: [-1.0] }, y: -0.42, f: [0.4, 0.4] },
  micDesk: { j: { hL: [-1.5, 0, 0.08], kL: [1.5], hR: [-1.5, 0, -0.08], kR: [1.5], spine: [0.15], chest: [0.1], sL: [-0.8, 0, 0.15], eL: [-1.2], sR: [-0.9, 0, -0.15], eR: [-1.0], head: [0.05] }, y: -0.42, f: [0.5, 0.5] },
  walkieTalk: { j: { sR: [-0.4, 0.4, -0.15], eR: [-2.25, -0.2, 0], wR: [0.2, 0, 0], head: [0.05, -0.15, 0], sL: [0.05, 0, 0.12], eL: [-0.3] }, f: [0.3, 0.85] },
  phone: { j: { sR: [-0.3, 0.3, -0.35], eR: [-2.4, -0.3, 0], wR: [0, 0, 0.3], head: [0, -0.1, -0.15], sL: [-0.4, 0, 0.2], eL: [-1.3] }, f: [0.5, 0.85] },
  flashlight: { j: { sR: [-1.2, 0.1, -0.1], eR: [-0.35], wR: [0.15], sL: [-0.6, 0, 0.15], eL: [-1.4], chest: [0.05] }, f: [0.5, 0.9] },
  hush: { j: { sR: [-0.4, 0.2, -0.2], eR: [-2.5, -0.5, 0], wR: [0, 0, 0], head: [0.05] }, f: [0.3, 0.8], face: 'hush' },
  // fight: Ray with the axe (both hands), punches, hits
  axeReady: { j: { spine: [0.1], hL: [-0.25, 0, 0.12], kL: [0.35], hR: [0.25, 0, -0.1], kR: [0.25], sR: [-0.9, 0.3, -0.25], eR: [-1.2, -0.4, 0], sL: [-0.6, -0.4, 0.3], eL: [-1.5, 0.4, 0], chest: [0, -0.3, 0], head: [0, 0.3, 0] }, y: -0.06, f: [1, 1], face: 'angry' },
  axeRaise: { j: { spine: [-0.15], hL: [-0.2, 0, 0.12], kL: [0.25], hR: [0.3, 0, -0.1], kR: [0.2], sR: [-2.9, 0.2, -0.3], eR: [-0.9], sL: [-2.7, -0.2, 0.35], eL: [-1.0], chest: [-0.15, -0.5, 0], head: [-0.15, 0.4, 0] }, y: -0.03, f: [1, 1], face: 'rage' },
  axeChop: { j: { spine: [0.45], hL: [-0.55, 0, 0.12], kL: [0.7], hR: [0.35, 0, -0.1], kR: [0.25], sR: [-0.8, 0.1, -0.15], eR: [-0.2], sL: [-0.7, -0.1, 0.2], eL: [-0.3], chest: [0.25, 0.35, 0], head: [0.15, -0.2, 0] }, y: -0.12, f: [1, 1], face: 'shout' },
  guard: { j: { spine: [0.1], hL: [-0.2, 0, 0.12], kL: [0.3], hR: [0.25, 0, -0.1], kR: [0.25], sL: [-0.9, 0.3, 0.2], eL: [-2.2, 0.5, 0], sR: [-0.7, -0.3, -0.2], eR: [-2.3, -0.5, 0], head: [0.15], chest: [0, 0.3, 0] }, y: -0.06, f: [1, 1], face: 'angry' },
  hitBack: { j: { spine: [-0.45], chest: [-0.3], neck: [-0.3], head: [-0.3, 0.2, 0], sL: [-1.3, 0, 0.7], eL: [-0.3], sR: [-1.2, 0, -0.8], eR: [-0.4], hL: [-0.5, 0, 0.1], kL: [0.5], hR: [0.2, 0, -0.1] }, y: -0.05, f: [0.1, 0.1], face: 'pain' },
  fallen: { j: { spine: [-0.1], chest: [-0.15], head: [-0.25, 0.4, 0], sL: [-0.2, 0, 1.2], eL: [-0.4], sR: [-0.6, 0, -0.9], eR: [-0.9], hL: [-0.6, 0, 0.2], kL: [0.9], hR: [-0.2, 0, -0.15], kR: [0.4] }, y: -0.75, f: [0.3, 0.6], face: 'pain' },
  skateSwing: { j: { spine: [0.2], chest: [0.2, 0.6, 0], sR: [-2.3, 0.4, -0.5], eR: [-0.4], sL: [-2.1, -0.4, 0.5], eL: [-0.5], hL: [-0.35, 0, 0.1], kL: [0.4], hR: [0.3, 0, -0.1] }, y: -0.06, f: [1, 1], face: 'rage' },
  skateHit: { j: { spine: [0.35], chest: [0.15, -0.6, 0], sR: [-0.7, -0.3, -0.2], eR: [-0.2], sL: [-0.9, 0.3, 0.3], eL: [-0.3], hL: [-0.55, 0, 0.1], kL: [0.7], hR: [0.35, 0, -0.1] }, y: -0.1, f: [1, 1], face: 'shout' },
  holdUp: { j: { sR: [-1.55, 0, -0.05], eR: [-0.15], sL: [-1.45, 0, 0.1], eL: [-0.35], chest: [-0.05], head: [-0.05] }, f: [0.85, 0.85], face: 'rage' },
  pullPlug: { j: { spine: [0.75], chest: [0.3], head: [-0.3], sR: [-1.3, 0, -0.1], eR: [-0.3], sL: [-0.6, 0, 0.2], eL: [-0.8], hL: [-0.6, 0, 0.1], kL: [0.8], hR: [-0.2, 0, -0.1], kR: [0.4] }, y: -0.12, f: [0.4, 0.9], face: 'fear' },
};
// add breathing, a slow weight shift and small head moves to any pose (seed: per character)
const zsAlive = (p: ZsPose, t: number, seed: number, k = 1): ZsPose => {
  const br = Math.sin(t * 1.9 + seed) * 0.5 + 0.5, sw = Math.sin(t * 0.45 + seed * 2.1);
  return zsAdd(p, { j: { chest: [-0.025 * br * k], spine: [0, sw * 0.03 * k, sw * 0.012 * k], head: [Math.sin(t * 0.7 + seed) * 0.03 * k, Math.sin(t * 0.37 + seed * 3) * 0.06 * k, 0], sL: [0, 0, 0.01 * br * k], sR: [0, 0, -0.01 * br * k] } });
};
// walk and run cycles at a phase (radians: one cycle = 2π = two steps)
const zsWalk = (ph: number, k = 1, run = 0): ZsPose => {
  const s = Math.sin(ph), c = Math.cos(ph), A = (0.42 + run * 0.35) * k;
  const kneeL = Math.max(0, Math.sin(ph - 1.2)) * (0.75 + run * 0.9) * k + 0.08, kneeR = Math.max(0, Math.sin(ph + Math.PI - 1.2)) * (0.75 + run * 0.9) * k + 0.08;
  return { j: {
    hips: [0, s * 0.12 * k, 0], spine: [0.05 + run * 0.28, -s * 0.08 * k, 0], chest: [0, -s * 0.12 * k, 0], head: [run * -0.2, s * 0.08 * k, 0],
    hL: [-s * A, 0, 0.03], kL: [kneeL], aL: [-Math.max(0, -c) * 0.25 * k + Math.max(0, s) * 0.2 * k], hR: [s * A, 0, -0.03], kR: [kneeR], aR: [-Math.max(0, c) * 0.25 * k + Math.max(0, -s) * 0.2 * k],
    sL: [s * (0.42 + run * 0.6) * k, 0, 0.1], eL: [-0.25 - run * 1.25 - Math.max(0, s) * 0.3 * k], sR: [-s * (0.42 + run * 0.6) * k, 0, -0.1], eR: [-0.25 - run * 1.25 - Math.max(0, -s) * 0.3 * k] },
    y: -Math.abs(c) * (0.025 + run * 0.05) * k + run * 0.02 - run * 0.06, f: [0.35 + run * 0.5, 0.35 + run * 0.5] };
};
// apply a pose to a person (and the root position offsets)
const zsApply = (P: ZsPerson, pose: ZsPose) => {
  for (const n of ZS_JOINTS) { const v = pose.j?.[n]; P.J[n].rotation.set(v ? v[0] : 0, v ? v[1] || 0 : 0, v ? v[2] || 0 : 0); }
  P.J.hips.position.y = P.len.hipY + (pose.y || 0) * P.H / 1.7;
  const f = pose.f || [0.25, 0.25]; (P as any).curl(f[0], f[1]);
};
// the face at time t: an expression, blinks, and speech (the mouth follows the words of this person's lines)
const zsSpeech = (who: string, t: number) => {
  const lines = (ZS.lines || []) as { who: string; t0: number; t1: number }[];
  const L = lines.find((l) => l.who === who && t >= l.t0 && t < l.t1);
  if (!L) return 0;
  const w = WORDS.find((x) => x.t0 <= t && t < x.t1 + 0.02 && x.t0 >= L.t0 - 0.1 && x.t1 <= L.t1 + 0.2);
  if (!w) return 0.06;
  const syl = Math.max(1, (w.w.match(/[aeiouáéíóúâêôãõà]+/gi) || []).length), u = (t - w.t0) / Math.max(0.05, w.t1 - w.t0);
  return 0.18 + 0.72 * Math.abs(Math.sin(Math.PI * syl * zsClamp(u)));
};
const zsFace = (P: ZsPerson, t: number, expr: string | undefined, seed: number, extra: Partial<ZsFace> = {}, speaks?: string) => {
  const f: ZsFace = { ...ZS_FACE0, ...(ZS_FACES[expr || 'neutral'] || {}), ...extra };
  // blink: every 2.8-4.6 s, 0.16 s long (lids close and open)
  const period = 2.8 + (seed * 7.31 % 1.8), ph = ((t + seed * 1.7) % period) / period * period;
  if (ph < 0.16) f.lid = Math.max(f.lid, 1 - Math.abs(ph - 0.08) / 0.08 * 0.6);
  const talk = zsSpeech(speaks || P.spec.name, t);
  if (talk > 0) { f.open = Math.max(f.open * 0.5, talk * 0.75); f.wide = f.wide * 0.6 + Math.sin(t * 9 + seed) * 0.2; }
  P.face.set(f);
};

// ---------------------------------------------------------------- 4. the creature: the Chiado
// 2.6 m, too thin, wet black rubber skin with cables hanging like tendons, a head that is a concave dish of bone with a
// ring of needle teeth around a mouth that glows phosphor green. It uses the same joints as a person (zsApply works),
// with longer limbs, three long claws per hand and legs that bend like a dog's.
const ZS_GREEN = '#7dff9a';
const zsWetMat = () => zsM('wet', () => p3Shader(new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.34, clearcoat: 1, clearcoatRoughness: 0.12, metalness: 0.1 }), 'zs-wet', {
  uniforms: { uG: zsWetGlow, uT: P3_T }, bump: 0.01, glow: true,
  color: `float v = p3V(p3Pos.xy * 9.0 + p3Pos.z * 6.0).x, n = p3F(p3Pos.xy * 30.0 + p3Pos.z * 14.0); diffuseColor.rgb = vec3(0.035, 0.038, 0.042) * (0.7 + 0.8 * n);
    float vein = smoothstep(0.06, 0.0, abs(v - 0.32)); p3Ht = n + vein * 0.6;
    p3Glow = vec3(0.49, 1.0, 0.6) * vein * uG * (0.6 + 0.4 * sin(uT * 9.0 + p3Pos.y * 12.0));` }));
const zsChiado = () => {
  const H = 2.6, wet = zsWetMat(), bone = zsM('bone', () => p3Shader(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.6 }), 'zs-bone', { bump: 0.02,
    color: `float n = p3F(p3Pos.xy * 18.0 + p3Pos.z * 7.0), c = p3V(p3Pos.xz * 40.0).x; diffuseColor.rgb = mix(vec3(0.13, 0.12, 0.1), vec3(0.4, 0.37, 0.31), n) * (0.7 + 0.35 * c); p3Ht = n + c;` }));
  const J = {} as Record<ZsJoint, THREE.Group>; for (const n of ZS_JOINTS) J[n] = zsGroup();
  const root = zsGroup(J.hips); root.name = 'chiado';
  const hipY = 1.28, torso = 0.82, upper = 0.78, fore = 0.74, thigh = 0.62, shin = 0.6;
  J.hips.position.y = hipY; J.hips.add(J.spine, J.hL, J.hR); J.spine.add(J.chest); J.chest.position.y = torso * 0.45; J.chest.add(J.neck, J.sL, J.sR);
  J.neck.position.y = torso * 0.55; J.neck.add(J.head); J.head.position.y = 0.2;
  // torso: a ribcage that is too narrow, a pinched waist, a spine of knobs
  const lathe = (prof: number[][], depth: number) => { const g = new THREE.LatheGeometry(prof.map(([x, y]) => new THREE.Vector2(x, y)), 22); g.computeVertexNormals(); return zsMesh(g, wet, undefined, undefined, [1, 1, depth]); };
  J.spine.add(lathe([[0.001, -0.08], [0.11, -0.06], [0.075, 0.12], [0.09, 0.3], [0.001, 0.42]], 0.7));
  J.chest.add(lathe([[0.001, -0.06], [0.12, 0.0], [0.19, 0.2], [0.21, 0.36], [0.13, 0.5], [0.04, 0.56], [0.001, 0.58]], 0.62));
  for (let k = 0; k < 6; k++) J.chest.add(zsMesh(new THREE.TorusGeometry(0.17 - k * 0.006, 0.012, 6, 18, Math.PI * 0.8), bone, [0, 0.06 + k * 0.065, 0.02], [Math.PI / 2 + 0.25, 0, Math.PI * 0.1], [1, 0.62, 1]));
  for (let k = 0; k < 9; k++) (k < 4 ? J.spine : J.chest).add(zsMesh(new THREE.SphereGeometry(0.03, 10, 8), bone, [0, (k < 4 ? k * 0.1 : (k - 4) * 0.11), k < 4 ? -0.07 : -0.12]));
  J.hips.add(zsMesh(new THREE.SphereGeometry(1, 16, 12), wet, [0, 0, 0], undefined, [0.13, 0.08, 0.1]));
  J.neck.add(zsMesh(zsLimbGeo(0.045, 0.06, 0.24), wet, [0, 0.22, 0]));
  // the head: a dish of bone facing forward, teeth in rings pointing to the middle, the glowing mouth
  const dish = new THREE.LatheGeometry(Array.from({ length: 14 }, (_, i) => { const u = i / 13; return new THREE.Vector2(0.02 + u * 0.34, -0.12 * (1 - u * u) + 0.0); }), 32);
  dish.rotateX(Math.PI / 2); dish.computeVertexNormals();
  const head = zsGroup(); head.position.set(0, 0.16, 0.06); J.head.add(head);
  const dishM = zsMesh(dish, zsM('bone2', () => { const m = (bone as THREE.MeshStandardMaterial).clone(); m.side = THREE.DoubleSide; return m; }), [0, 0, 0.02]);
  head.add(dishM);
  head.add(zsMesh(new THREE.TorusGeometry(0.36, 0.025, 8, 40), bone, [0, 0, 0.02]));   // the rim
  const teeth = p3Swarm(80, new THREE.ConeGeometry(0.008, 0.07, 5), zsStd('#d9d2bf', 0.35), true);
  for (let i = 0; i < 80; i++) { const ring = Math.floor(i / 20), a = (i % 20) / 20 * Math.PI * 2 + ring * 0.15, rr = 0.09 + ring * 0.06, z = -0.1 * (1 - ((rr - 0.02) / 0.34) ** 2) + 0.025;
    const o = new THREE.Object3D(); o.position.set(Math.cos(a) * rr, Math.sin(a) * rr, z); o.lookAt(0, 0, z + 0.05); o.rotateX(Math.PI / 2 + 0.9); teeth.put(i, o.position.x, o.position.y, o.position.z, 1, 1, 1, o.rotation.x, o.rotation.y, o.rotation.z); }
  teeth.done(); head.add(teeth);
  const mouth = zsMesh(new THREE.SphereGeometry(0.04, 16, 12), zsGlow(ZS_GREEN, 1.2), [0, 0, -0.08]); head.add(mouth);
  const mouthLight = new THREE.PointLight(ZS_GREEN, 0, 2.5, 2); mouthLight.position.set(0, 0, 0.45); head.add(mouthLight);
  // the back of the head: bony ridges like a satellite's ribs
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; head.add(p3Rod([Math.cos(a) * 0.05, Math.sin(a) * 0.05, -0.12], [Math.cos(a) * 0.34, Math.sin(a) * 0.34, -0.02], 0.014, bone)); }
  // arms: long, thin, knobbed elbows, hands of three claws
  const claws: { L: THREE.Group[]; R: THREE.Group[] } = { L: [], R: [] };
  for (const [s, side] of [[J.sL, 1], [J.sR, -1]] as [THREE.Group, number][]) {
    s.position.set(side * 0.2, torso * 0.48, 0);
    s.add(zsMesh(new THREE.SphereGeometry(0.06, 12, 10), wet), zsMesh(zsLimbGeo(0.045, 0.03, upper), wet));
    const e = side > 0 ? J.eL : J.eR, wr = side > 0 ? J.wL : J.wR; e.position.y = -upper; s.add(e);
    e.add(zsMesh(new THREE.SphereGeometry(0.045, 10, 8), bone), zsMesh(zsLimbGeo(0.034, 0.022, fore), wet)); wr.position.y = -fore; e.add(wr);
    wr.add(zsMesh(new THREE.SphereGeometry(0.04, 10, 8), wet, [0, -0.03, 0], undefined, [1.2, 1, 0.6]));
    for (let k = 0; k < 3; k++) {
      const f1 = zsGroup(zsMesh(zsLimbGeo(0.014, 0.011, 0.16), wet)); f1.position.set((k - 1) * 0.03 * side, -0.05, 0); f1.rotation.z = (k - 1) * 0.25 * side;
      const f2 = zsGroup(zsMesh(zsLimbGeo(0.011, 0.007, 0.13), wet)); f2.position.y = -0.16; f1.add(f2);
      const claw = zsMesh(new THREE.ConeGeometry(0.009, 0.09, 6), bone, [0, -0.17, 0.01], [Math.PI + 0.25, 0, 0]); f2.add(claw);
      wr.add(f1); (side > 0 ? claws.L : claws.R).push(f1, f2);
    }
  }
  // legs that bend backwards at the knee and again at the ankle, standing on long toes
  for (const [h, side] of [[J.hL, 1], [J.hR, -1]] as [THREE.Group, number][]) {
    h.position.set(side * 0.09, -0.02, 0);
    h.add(zsMesh(zsLimbGeo(0.055, 0.035, thigh), wet));
    const k = side > 0 ? J.kL : J.kR, a = side > 0 ? J.aL : J.aR; k.position.y = -thigh; h.add(k);
    k.add(zsMesh(new THREE.SphereGeometry(0.045, 10, 8), bone), zsMesh(zsLimbGeo(0.035, 0.025, shin), wet)); a.position.y = -shin; k.add(a);
    a.add(zsMesh(zsLimbGeo(0.026, 0.02, 0.18), wet));
    for (let t = 0; t < 3; t++) a.add(zsMesh(new THREE.ConeGeometry(0.012, 0.16, 6), bone, [(t - 1) * 0.03, -0.19, 0.07], [Math.PI / 2 + 0.2, 0, (t - 1) * 0.2]));
  }
  // cables hanging from the shoulders and the spine, each a chain that sways
  const cables: THREE.Group[][] = [];
  const cmat = zsStd('#0c0d10', 0.4, 0.3);
  for (let c = 0; c < 7; c++) {
    const chain: THREE.Group[] = []; let parent: THREE.Object3D = c < 4 ? J.chest : J.spine;
    const len = 0.85 + (c % 3) * 0.35, seg = 6, sl = len / seg, x0 = (c % 2 ? 1 : -1) * (0.05 + (c % 4) * 0.04);
    for (let k = 0; k < seg; k++) {
      const g = zsGroup(zsMesh(zsLimbGeo(0.016 - k * 0.0015, 0.014 - k * 0.0015, sl), cmat));
      if (k === 0) g.position.set(x0, c < 4 ? 0.38 - c * 0.05 : 0.25, -0.13); else g.position.y = -sl;
      parent.add(g); chain.push(g); parent = g;
    }
    // a plug at the end of some cables: the creature is wired
    if (c % 2 === 0) parent.add(zsMesh(new THREE.BoxGeometry(0.03, 0.05, 0.02), zsStd('#2a2a2a', 0.4, 0.6), [0, -sl - 0.02, 0]));
    cables.push(chain);
  }
  const P: any = { spec: { name: 'chiado' } as ZsSpec, root, J, H, face: { set() {} }, fingers: claws, handL: J.wL, handR: J.wR, len: { thigh, shin, upper, fore, hipY } };
  P.curl = (l: number, r: number) => { claws.L.forEach((f, i) => { f.rotation.x = -l * (i % 2 ? 1.2 : 0.8); }); claws.R.forEach((f, i) => { f.rotation.x = -r * (i % 2 ? 1.2 : 0.8); }); };
  // glow (0..1): veins and the mouth; sway: the cables follow the time and how fast it moves
  P.fx = (t: number, glow: number, sway = 1) => {
    zsWetGlow.value = glow; mouth.scale.setScalar(0.5 + glow * 0.7); mouthLight.intensity = glow * 1.2;
    cables.forEach((ch, c) => ch.forEach((g, k) => { g.rotation.x = Math.sin(t * 2.1 + c * 1.3 + k * 0.6) * 0.12 * sway * (k + 1) / 3 + (k === 0 ? 0.3 : 0); g.rotation.z = Math.sin(t * 1.7 + c * 2.1 + k * 0.4) * 0.1 * sway * (k + 1) / 3; }));
  };
  return P as ZsPerson & { fx(t: number, glow: number, sway?: number): void };
};
const zsWetGlow = { value: 0 };
// the creature's poses (same conventions as people): hunched, reaching, the shriek, the stutter-step
const ZS_CPOSES: Record<string, ZsPose> = {
  hunch: { j: { spine: [0.45], chest: [0.35], neck: [0.2], head: [-0.6], sL: [-0.3, 0, 0.25], eL: [-0.5], sR: [-0.25, 0, -0.3], eR: [-0.4], hL: [-0.6, 0, 0.12], kL: [1.3], aL: [-0.9], hR: [-0.45, 0, -0.12], kR: [1.2], aR: [-0.85] }, y: -0.12, f: [0.4, 0.4] },
  stalk: { j: { spine: [0.35], chest: [0.25], neck: [0.1], head: [-0.35, 0.3, 0.25], sL: [-0.6, 0, 0.35], eL: [-0.9], sR: [-0.1, 0, -0.4], eR: [-0.3], hL: [-0.8, 0, 0.1], kL: [1.5], aL: [-1.0], hR: [-0.3, 0, -0.1], kR: [1.1], aR: [-0.7] }, y: -0.14, f: [0.6, 0.2] },
  reach: { j: { spine: [0.55], chest: [0.3], neck: [0.15], head: [-0.4], sR: [-1.75, 0.1, -0.15], eR: [-0.2], sL: [-0.9, 0, 0.4], eL: [-0.6], hL: [-0.9, 0, 0.1], kL: [1.5], aL: [-1.0], hR: [-0.2, 0, -0.1], kR: [1.0], aR: [-0.7] }, y: -0.16, f: [0.3, 0.05] },
  shriek: { j: { spine: [-0.2], chest: [-0.35], neck: [-0.4], head: [-0.5, 0, 0], sL: [-0.4, 0, 1.4], eL: [-0.5], sR: [-0.4, 0, -1.4], eR: [-0.5], hL: [-0.5, 0, 0.18], kL: [1.0], aL: [-0.7], hR: [-0.4, 0, -0.18], kR: [0.9], aR: [-0.6] }, y: -0.05, f: [0, 0] },
  convulse: { j: { spine: [0.6, 0.3, 0.2], chest: [-0.3, -0.4, -0.2], neck: [0.5], head: [0.4, 0.6, 0.5], sL: [-2.2, 0, 0.6], eL: [-1.8], sR: [-0.5, 0, -1.6], eR: [-1.2], hL: [-0.4, 0, 0.3], kL: [1.4], aL: [-0.9], hR: [-1.0, 0, -0.1], kR: [1.6], aR: [-0.9] }, y: -0.25, f: [1, 0.2] },
  swipe: { j: { spine: [0.4, -0.5, 0], chest: [0.2, -0.6, 0], head: [-0.3, 0.4, 0], sR: [-1.4, 0.2, -1.0], eR: [-0.15], sL: [-0.5, 0, 0.4], eL: [-0.6], hL: [-0.9, 0, 0.1], kL: [1.4], aL: [-1.0], hR: [-0.3, 0, -0.1], kR: [1.1], aR: [-0.8] }, y: -0.14, f: [0.2, 0] },
  crawl: { j: { spine: [1.3], chest: [0.4], neck: [-0.4], head: [-0.9], sL: [-2.0, 0, 0.3], eL: [-0.2], sR: [-2.1, 0, -0.3], eR: [-0.3], hL: [-1.4, 0, 0.2], kL: [2.2], aL: [-1.0], hR: [-1.2, 0, -0.2], kR: [2.1], aR: [-1.0] }, y: -0.55, f: [0.5, 0.5] },
};
// it does not walk: it stutters. Position along a path is held, then jumps (a bad signal), with a small random shake
const zsStutter = (t: number, rate = 6, seed = 1) => { const q = Math.floor(t * rate) / rate, h = Math.sin(q * 91.7 + seed * 13.1) * 43758.5; return { q, jx: (h - Math.floor(h) - 0.5) * 0.08, jz: (Math.sin(q * 37.3 + seed) * 0.5) * 0.06 }; };

// ---------------------------------------------------------------- the cast (BIBLIA.md)
const ZS_CAST: Record<string, ZsSpec> = {
  theo: { name: 'theo', h: 1.56, build: 0.25, kid: true, skin: '#e8c3a0', iris: '#2b1a10', hair: { style: 'side', color: '#141210' }, glasses: '#2a2a2e',
    shirt: { c: '#8a8f96', p: 'plain' }, jacket: { c: '#8c1f24', p: 'flannel', c2: '#1d2a44' }, pants: { c: '#3b5277', p: 'denim' }, shoes: '#e9e6df' },
  dani: { name: 'dani', h: 1.5, build: 0.15, kid: true, female: true, skin: '#c8976e', iris: '#3a2412', hair: { style: 'pony', color: '#2a1810' },
    shirt: { c: '#1b1b1e', p: 'plain' }, jacket: { c: '#e5b52a', p: 'nylon', c2: '#2a6bb0' }, pants: { c: '#56603a', p: 'canvas' }, shoes: '#1d1d22' },
  bolacha: { name: 'bolacha', h: 1.62, build: 1, kid: true, skin: '#7a4c31', iris: '#21140c', hair: { style: 'curly', color: '#16100c' }, pager: true,
    shirt: { c: '#d4682a', p: 'knit' }, pants: { c: '#33486a', p: 'denim' }, shoes: '#b8b4ab' },
  jess: { name: 'jess', h: 1.66, build: 0.2, female: true, skin: '#e6c09c', iris: '#2b1a10', hair: { style: 'long', color: '#17130f' }, lip: '#a4505a',
    shirt: { c: '#7d1f2c', p: 'plain', short: true }, pants: { c: '#2f3f5e', p: 'denim' }, shoes: '#2a2a2e' },
  kyle: { name: 'kyle', h: 1.82, build: 0.2, skin: '#f0c8a6', iris: '#4a6a7a', hair: { style: 'messy', color: '#b79a5e' }, beanie: '#3f4a2e', stubble: '#a08050',
    shirt: { c: '#3d5a3a', p: 'flannel', c2: '#1e2a1c' }, pants: { c: '#465a78', p: 'denim' }, shoes: '#5a4632' },
  ray_old: { name: 'ray_old', h: 1.8, build: 0.55, skin: '#dcae8a', iris: '#3e4e40', hair: { style: 'messy', color: '#6e655a' }, stubble: '#8a8277', scar: true,
    shirt: { c: '#5d6670', p: 'plain' }, jacket: { c: '#6b5234', p: 'canvas', c2: '#4e3a22' }, pants: { c: '#33405a', p: 'denim' }, shoes: '#3a2a1c' },
  ray_young: { name: 'ray_young', h: 1.8, build: 0.4, skin: '#e2b590', iris: '#3e4e40', hair: { style: 'seventies', color: '#5a3d22' }, mustache: '#4e3420',
    shirt: { c: '#c9b48a', p: 'plain' }, pants: { c: '#5a4630', p: 'canvas' }, shoes: '#2e2118' },
  vance: { name: 'vance', h: 1.75, build: 0.5, skin: '#e9c4a4', iris: '#3a4a5a', hair: { style: 'bald', color: '#9c958c' }, beard: undefined, mustache: '#9c958c', stubble: '#8f887f', glasses: '#4a4036',
    shirt: { c: '#dfe3e8', p: 'plain' }, jacket: { c: '#eef0f2', p: 'plain', long: true }, tie: '#3a3f5a', pants: { c: '#4a4a52', p: 'suit' }, shoes: '#1b1b1d' },
  helen: { name: 'helen', h: 1.63, build: 0.55, female: true, skin: '#c48f68', iris: '#3a2412', hair: { style: 'pony', color: '#2e211a' }, lip: '#9a4f4a',
    shirt: { c: '#2f7f7a', p: 'plain' }, jacket: { c: '#ece6da', p: 'plain', open: true }, pants: { c: '#2a2a30', p: 'plain' }, shoes: '#1d1d22' },
  coyle: { name: 'coyle', h: 1.84, build: 0.35, skin: '#efd0b8', iris: '#5a6e80', hair: { style: 'short', color: '#3a2f26' },
    shirt: { c: '#eef0f3', p: 'plain' }, jacket: { c: '#4d5258', p: 'suit', c2: '#3a3e44', open: false }, tie: '#2a2d38', pants: { c: '#4d5258', p: 'suit' }, shoes: '#141416' },
};

// ---------------------------------------------------------------- 5. sets
// Each set is a group far from the others (only the active one is visible, with its own lights and fog).
const ZS_SET_AT: Record<string, Vec3> = { dish: [0, 0, 0], control: [120, 0, 0], basement: [240, 0, 0], street: [360, 0, 0], rewind: [480, 0, 0], woods: [600, 0, 0], shop: [720, 0, 0] };
// surfaces
const zsSurf = (key: string, glsl: string, rough = 0.8, bump = 0.01, uni: Record<string, P3Uniform> = {}, metal = 0) => zsM('surf' + key, () => p3Shader(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: rough, metalness: metal }), 'zs-s-' + key, { uniforms: uni, bump, color: glsl }));
const zsWood = () => zsSurf('panel', `float b = fract(p3World.x * 3.2 + p3World.z * 3.2), g = p3F(vec2(p3World.y * 1.5, (p3World.x + p3World.z) * 40.0)); vec3 c = mix(vec3(0.17, 0.11, 0.07), vec3(0.32, 0.22, 0.14), g); c *= 0.8 + 0.2 * step(0.04, b); diffuseColor.rgb = c; p3Ht = g + step(b, 0.04);`, 0.6, 0.006);
const zsCarpet = () => zsSurf('carpet', `float n = p3N(p3World.xz * 160.0), m = p3F(p3World.xz * 3.0); diffuseColor.rgb = mix(vec3(0.24, 0.16, 0.09), vec3(0.36, 0.25, 0.14), m) * (0.8 + 0.3 * n); p3Ht = n;`, 0.97, 0.01);
const zsConcrete = (tint = '#8d968e') => zsSurf('conc' + tint, `float n = p3F(p3World.xz * 2.0 + p3World.y * 3.0), f = p3N(p3World.xy * 60.0 + p3World.z * 40.0); diffuseColor.rgb = uA * (0.78 + 0.28 * n) * (0.92 + 0.1 * f); p3Ht = f;`, 0.9, 0.004, { uA: { value: zsC(tint) } });
const zsTiles = (a = '#b9b3a2', b = '#6f6a60') => zsSurf('tile' + a + b, `vec2 q = floor(p3World.xz * 3.3); float k = mod(q.x + q.y, 2.0), grout = step(0.96, fract(p3World.x * 3.3)) + step(0.96, fract(p3World.z * 3.3)), n = p3N(p3World.xz * 30.0); diffuseColor.rgb = mix(uA, uB, k) * (0.88 + 0.15 * n) * (1.0 - grout * 0.35); p3Ht = 1.0 - grout;`, 0.45, 0.003, { uA: { value: zsC(a) }, uB: { value: zsC(b) } });
const zsBrick = (tint = '#7a3f2c') => zsSurf('brick' + tint, `vec2 q = vec2((p3World.x + p3World.z) * 4.4, p3World.y * 13.0); q.x += step(1.0, mod(q.y, 2.0)) * 0.5; vec2 f = fract(q); float mort = step(0.92, f.x) + step(0.88, f.y), n = p3N(floor(q) * 3.1), g = p3N(p3World.xy * 80.0);
  diffuseColor.rgb = mix(uA * (0.75 + 0.45 * n) * (0.9 + 0.15 * g), vec3(0.42, 0.4, 0.37), min(1.0, mort)); p3Ht = 1.0 - min(1.0, mort) + g * 0.3;`, 0.92, 0.012, { uA: { value: zsC(tint) } });
const zsAsphalt = () => zsSurf('asph', `float n = p3N(p3World.xz * 50.0), m = p3F(p3World.xz * 0.6), puddle = smoothstep(0.62, 0.66, p3F(p3World.xz * 0.35 + 3.0)); diffuseColor.rgb = vec3(0.07, 0.072, 0.08) * (0.7 + 0.6 * n) * (0.85 + 0.3 * m) * (1.0 - puddle * 0.4); p3Ht = n * (1.0 - puddle); p3Rough = 1.0 - puddle * 0.85;`, 0.75, 0.004);
const zsGrass = () => zsSurf('ground', `float n = p3F(p3World.xz * 0.8), d = p3N(p3World.xz * 25.0), path = smoothstep(1.6, 0.6, abs(p3World.x - sin(p3World.z * 0.12) * 2.5 - 600.0)); vec3 c = mix(vec3(0.1, 0.13, 0.08), vec3(0.2, 0.2, 0.12), n); c = mix(c, vec3(0.24, 0.2, 0.15), path); diffuseColor.rgb = c * (0.75 + 0.4 * d); p3Ht = d;`, 0.97, 0.02);
const zsMetal = (c = '#8a8f96', rough = 0.45) => zsStd(c, rough, 0.7);
// the roughness hook for asphalt puddles (p3Rough)
(zsAsphalt() as THREE.MeshStandardMaterial).onBeforeCompile = ((orig) => (sh: any, r: any) => { orig(sh, r); sh.fragmentShader = sh.fragmentShader.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n  roughnessFactor *= p3Rough;'); })((zsAsphalt() as THREE.MeshStandardMaterial).onBeforeCompile as any);
// screens: TV static, an oscilloscope trace, a figure that stands inside the static (uniforms shared by every screen)
const ZS_SCREEN = { uStatic: { value: 0 }, uShape: { value: 0 }, uWave: { value: 0 }, uT: P3_T, uBright: { value: 1 } };
const zsScreenMat = (kind: 'tv' | 'scope') => zsM('screen' + kind, () => p3Shader(new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }), 'zs-scr-' + kind, { uniforms: ZS_SCREEN,
  color: kind === 'tv' ? `vec2 uv = p3Uv; float n = p3H1(floor(uv * vec2(160.0, 120.0)) + floor(uT * 24.0) * 7.31), line = 0.8 + 0.2 * sin(uv.y * 400.0);
    vec3 off = vec3(0.05, 0.07, 0.12); vec3 st = vec3(n) * line; float fig = smoothstep(0.09, 0.06, abs(uv.x - 0.5)) * step(0.15, uv.y) * step(uv.y, 0.85) + smoothstep(0.13, 0.1, length((uv - vec2(0.5, 0.8)) * vec2(1.0, 0.8)));
    vec3 c = mix(off, st, uStatic); c = mix(c, vec3(0.0), clamp(fig, 0.0, 1.0) * uShape * 0.95); c += vec3(0.3, 1.0, 0.55) * clamp(fig, 0.0, 1.0) * uShape * 0.1 * n; diffuseColor.rgb = c * uBright;`
  : `vec2 uv = p3Uv; float grid = step(0.97, fract(uv.x * 8.0)) + step(0.97, fract(uv.y * 6.0)); float y = 0.5 + 0.18 * sin(uv.x * 18.0 + uT * 6.0) * (0.3 + uWave) + uWave * 0.2 * sin(uv.x * 63.0 - uT * 17.0) * sin(uT * 3.0 + uv.x * 5.0);
    float tr = smoothstep(0.02, 0.0, abs(uv.y - y)); vec3 c = vec3(0.01, 0.05, 0.02) + vec3(0.05, 0.2, 0.08) * grid + vec3(0.45, 1.0, 0.6) * tr * (1.0 + uWave); diffuseColor.rgb = c * uBright;` }));
// a painted sign / poster (canvas): draw(ctx, w, h)
const zsPaintTex = (key: string, w: number, h: number, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void) => zsM('tex' + key, () => { const t = p3Paint(w, h, (c) => draw(c, w, h)); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 }); });
const zsNeon = (key: string, text: string, color: string, w = 1024, h = 256, font = 'bold 150px Georgia, serif') => zsM('neon' + key, () => {
  const t = p3Paint(w, h, (c) => { c.clearRect(0, 0, w, h); c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = color; c.shadowBlur = 30; c.fillStyle = color; c.fillText(text, w / 2, h / 2); c.shadowBlur = 8; c.fillStyle = '#ffffff'; c.globalAlpha = 0.85; c.fillText(text, w / 2, h / 2); });
  t.colorSpace = THREE.SRGBColorSpace; return new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false, depthWrite: false }); });
const zsBox = (w: number, h: number, d: number, m: THREE.Material, p: Vec3, r?: Vec3) => zsMesh(new THREE.BoxGeometry(w, h, d), m, p, r);
const zsPlane = (w: number, h: number, m: THREE.Material, p: Vec3, r?: Vec3) => zsMesh(new THREE.PlaneGeometry(w, h), m, p, r);
// a room: floor, ceiling and four walls (inside faces), w along x, d along z, the door wall at +z left open if asked
const zsRoom = (w: number, d: number, h: number, wall: THREE.Material, floor: THREE.Material, ceil: THREE.Material, openFront = false) => {
  const g = zsGroup();
  g.add(zsPlane(w, d, floor, [0, 0, 0], [-Math.PI / 2, 0, 0]), zsPlane(w, d, ceil, [0, h, 0], [Math.PI / 2, 0, 0]));
  g.add(zsPlane(w, h, wall, [0, h / 2, -d / 2]), zsPlane(d, h, wall, [-w / 2, h / 2, 0], [0, Math.PI / 2, 0]), zsPlane(d, h, wall, [w / 2, h / 2, 0], [0, -Math.PI / 2, 0]));
  if (!openFront) g.add(zsPlane(w, h, wall, [0, h / 2, d / 2], [0, Math.PI, 0]));
  return g;
};
// a vintage radio / receiver: wood or metal box, speaker grill, a dial that glows (amber, or green when possessed)
const ZS_DIAL = { value: 0 };   // 0 amber, 1 phosphor green
const zsDialMat = () => zsM('dial', () => p3Shader(new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }), 'zs-dial', { uniforms: { uG: ZS_DIAL, uT: P3_T },
  color: `float tick = step(0.8, fract(p3Uv.x * 24.0)) * step(0.4, p3Uv.y); float needle = smoothstep(0.02, 0.0, abs(p3Uv.x - (0.5 + 0.3 * sin(uT * 0.7 + uG * uT * 9.0))));
    vec3 base = mix(vec3(1.0, 0.62, 0.22), vec3(0.45, 1.0, 0.6), uG); diffuseColor.rgb = base * (0.45 + 0.5 * tick) + vec3(1.0, 0.2, 0.1) * needle * (1.0 - uG) + vec3(0.7, 1.0, 0.8) * needle * uG;` }));
const zsRadio = (w: number, h: number, d: number, kind: number) => {
  const g = zsGroup(), body = kind % 3 === 0 ? zsWood() : kind % 3 === 1 ? zsStd(['#3d3a35', '#6b6152', '#2e3438'][kind % 3], 0.5, 0.2) : zsStd('#8c7a5c', 0.55);
  g.add(zsBox(w, h, d, body, [0, h / 2, 0]));
  const grill = zsSurf('grill', `float g = step(0.5, fract(p3World.x * 120.0 + p3World.y * 120.0)); diffuseColor.rgb = mix(vec3(0.12, 0.1, 0.08), vec3(0.32, 0.28, 0.22), g);`, 0.8, 0);
  g.add(zsPlane(w * 0.42, h * 0.62, grill, [-w * 0.24, h * 0.5, d / 2 + 0.002]));
  g.add(zsPlane(w * 0.42, h * 0.22, zsDialMat(), [w * 0.23, h * 0.66, d / 2 + 0.002]));
  for (const x of [0.12, 0.34]) g.add(zsMesh(new THREE.CylinderGeometry(h * 0.07, h * 0.07, 0.02, 12), zsStd('#1a1714', 0.4), [w * x, h * 0.28, d / 2 + 0.01], [Math.PI / 2, 0, 0]));
  return g;
};
const zsCRT = (size: number, body = '#3a3631') => {
  const g = zsGroup(), w = size, h = size * 0.78, d = size * 0.85;
  g.add(zsMesh(new THREE.RoundedBoxGeometry(w, h, d, 3, size * 0.06), zsStd(body, 0.45), [0, h / 2, 0]));
  const scr = zsMesh(new THREE.PlaneGeometry(w * 0.72, h * 0.7), zsScreenMat('tv'), [-w * 0.06, h * 0.52, d / 2 + 0.003]); scr.castShadow = false; g.add(scr);
  for (let i = 0; i < 2; i++) g.add(zsMesh(new THREE.CylinderGeometry(size * 0.03, size * 0.03, 0.02, 10), zsStd('#151515', 0.4), [w * 0.4, h * (0.62 - i * 0.2), d / 2 + 0.01], [Math.PI / 2, 0, 0]));
  return g;
};
const zsPoint = (c: string, i: number, d: number, p: Vec3, shadow = false) => { const l = new THREE.PointLight(c, i, d, 2); l.position.set(...p); if (shadow) { l.castShadow = true; l.shadow.mapSize.set(1024, 1024); l.shadow.bias = -0.002; } return l; };
const zsSpot = (c: string, i: number, d: number, p: Vec3, target: Vec3, angle = 0.6, shadow = true) => { const l = new THREE.SpotLight(c, i, d, angle, 0.55, 2); l.position.set(...p); l.target.position.set(...target); if (shadow) { l.castShadow = true; l.shadow.mapSize.set(1024, 1024); l.shadow.bias = -0.0015; } const g = zsGroup(l, l.target); return { g, l }; };
// a glowing panel of light (a lamp's shade, a window, a fluorescent tube)
const zsLightPanel = (w: number, h: number, c: string, k: number, p: Vec3, r?: Vec3) => { const m = zsPlane(w, h, zsGlow(c, k), p, r); m.castShadow = false; return m; };
const zsStars = (n: number, R: number, seed: number) => { const rnd = p3Rnd(seed), pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const a = rnd() * Math.PI * 2, e = 0.08 + rnd() * 1.3; pos.set([Math.cos(a) * Math.cos(e) * R, Math.sin(e) * R, Math.sin(a) * Math.cos(e) * R], i * 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color: '#cfd8ff', size: 1.6, sizeAttenuation: false, toneMapped: false })); };
const zsTerrain = (size: number, seg: number, height: (x: number, z: number) => number, m: THREE.Material) => {
  const g = new THREE.PlaneGeometry(size, size, seg, seg); g.rotateX(-Math.PI / 2); const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, height(p.getX(i), p.getZ(i))); g.computeVertexNormals();
  const o = new THREE.Mesh(g, m); o.receiveShadow = true; return o;
};
const zsPine = (h: number, seed: number) => {
  const g = zsGroup(), rnd = p3Rnd(seed), bark = zsSurf('bark', `float n = p3F(vec2(atan(p3Pos.x, p3Pos.z) * 4.0, p3Pos.y * 3.0)), s = step(0.5, fract(atan(p3Pos.x, p3Pos.z) * 5.0 + n)); diffuseColor.rgb = mix(vec3(0.12, 0.08, 0.06), vec3(0.28, 0.2, 0.14), n * 0.7 + s * 0.3); p3Ht = n + s;`, 0.95, 0.02);
  g.add(zsMesh(new THREE.CylinderGeometry(0.06 * h / 8, 0.18 * h / 8, h, 9), bark, [0, h / 2, 0]));
  const needles = zsSurf('needle', `float n = p3N(p3World.xz * 40.0 + p3World.y * 30.0), m = p3F(p3World.xy * 3.0); diffuseColor.rgb = mix(vec3(0.03, 0.07, 0.04), vec3(0.1, 0.17, 0.09), n * 0.6 + m * 0.4); p3Ht = n;`, 0.95, 0.03);
  for (let k = 0; k < 6; k++) { const y = h * (0.32 + k * 0.11), r = h * (0.26 - k * 0.035) * (0.9 + rnd() * 0.2);
    const geo = new THREE.ConeGeometry(r, h * 0.2, 11, 3); const pp = geo.attributes.position; for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), z = pp.getZ(i); const j = 1 + 0.18 * Math.sin(Math.atan2(z, x) * 7 + k + seed); pp.setX(i, x * j); pp.setZ(i, z * j); } geo.computeVertexNormals();
    g.add(zsMesh(geo, needles, [0, y, 0], [0, rnd() * 3, 0])); }
  return g;
};
// a lattice pylon (high-voltage tower) built from rods
const zsPylon = (h: number) => {
  const g = zsGroup(), m = zsMetal('#5d6268', 0.6), b = h * 0.12, tp = h * 0.03;
  const corners = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
  for (const [x, z] of corners) g.add(p3Rod([x * b, 0, z * b], [x * tp, h, z * tp], 0.05, m, 6));
  for (let k = 0; k < 8; k++) { const y0 = h * k / 8, y1 = h * (k + 1) / 8, w0 = b + (tp - b) * k / 8, w1 = b + (tp - b) * (k + 1) / 8;
    for (let c = 0; c < 4; c++) { const A = corners[c], B = corners[(c + 1) % 4]; g.add(p3Rod([A[0] * w0, y0, A[1] * w0], [B[0] * w1, y1, B[1] * w1], 0.025, m, 5)); } }
  for (const y of [h * 0.78, h * 0.93]) { g.add(p3Rod([-h * 0.28, y, 0], [h * 0.28, y, 0], 0.05, m, 6)); for (const x of [-h * 0.25, h * 0.25]) g.add(zsMesh(new THREE.CylinderGeometry(0.06, 0.08, 0.5, 8), zsStd('#7a8a8e', 0.3), [x, y - 0.3, 0])); }
  return g;
};
const zsWire = (a: Vec3, b: Vec3, sag: number, r = 0.02) => { const pts: number[][] = []; for (let i = 0; i <= 16; i++) { const u = i / 16; pts.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - Math.sin(Math.PI * u) * sag, a[2] + (b[2] - a[2]) * u]); } return p3Tube(pts, r, zsStd('#151618', 0.5), 32); };
const zsCar = (body: string, van = false) => {
  const g = zsGroup(), paint = zsStd(body, 0.28, 0.35), glass = zsStd('#0b0f14', 0.08, 0.6), chrome = zsMetal('#c9ccd0', 0.2), tire = zsStd('#111', 0.8);
  const L = van ? 4.9 : 4.6, W = van ? 2.0 : 1.85, H = van ? 2.05 : 1.35;
  g.add(zsMesh(new THREE.RoundedBoxGeometry(W, H * (van ? 0.82 : 0.5), L, 3, 0.12), paint, [0, 0.35 + H * (van ? 0.41 : 0.25), 0]));
  if (!van) g.add(zsMesh(new THREE.RoundedBoxGeometry(W * 0.92, H * 0.42, L * 0.52, 3, 0.12), paint, [0, 0.35 + H * 0.7, -0.15]));
  g.add(zsMesh(new THREE.RoundedBoxGeometry(W * 0.94, H * (van ? 0.3 : 0.32), van ? 0.08 : L * 0.5, 2, 0.04), glass, van ? [0, 0.35 + H * 0.62, L / 2 - 0.02] : [0, 0.35 + H * 0.7, -0.15]));
  for (const [x, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) { g.add(zsMesh(new THREE.CylinderGeometry(0.34, 0.34, 0.26, 16), tire, [x * W * 0.47, 0.34, z * L * 0.32], [0, 0, Math.PI / 2])); g.add(zsMesh(new THREE.CylinderGeometry(0.18, 0.18, 0.27, 12), chrome, [x * W * 0.47, 0.34, z * L * 0.32], [0, 0, Math.PI / 2])); }
  for (const x of [-1, 1]) { g.add(zsLightPanel(0.3, 0.14, '#fff6d8', 0.4, [x * W * 0.32, 0.72, L / 2 + 0.01])); g.add(zsLightPanel(0.25, 0.12, '#ff2a20', 0.5, [x * W * 0.36, 0.78, -L / 2 - 0.01], [0, Math.PI, 0])); }
  g.add(zsBox(W * 1.02, 0.12, 0.14, chrome, [0, 0.5, L / 2]), zsBox(W * 1.02, 0.12, 0.14, chrome, [0, 0.5, -L / 2]));
  if (van) { g.add(zsMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 6), chrome, [0.5, 2.6, -1.2]));   // the detector antenna and a small dish
    const d = zsMesh(new THREE.SphereGeometry(0.35, 16, 8, 0, Math.PI * 2, 0, 0.9), zsStd('#d8dadc', 0.4, 0.3), [-0.4, 2.45, -1.4], [-1.2, 0, 0]); g.add(d);
    g.add(zsPlane(1.6, 0.5, zsPaintTex('van', 512, 160, (c, w, h) => { c.fillStyle = '#e9eaec'; c.fillRect(0, 0, w, h); c.fillStyle = '#1f3a6e'; c.font = 'bold 54px Arial'; c.fillText('U.S. RADIO QUIET ZONE', 14, 70); c.font = '34px Arial'; c.fillText('ENFORCEMENT  •  UNIT 7', 14, 125); }), [W / 2 + 0.01, 1.35, 0.1], [0, Math.PI / 2, 0])); }
  return g;
};

// ---- A. Pike Ridge, 1979: the dish outside and the control room
const zsSetDish = () => {
  const g = zsGroup();
  g.add(zsTerrain(400, 120, (x, z) => 3 * p3Fbm3(x * 0.02, 0, z * 0.02) + Math.max(0, Math.hypot(x, z + 60) - 60) * 0.18 * (0.6 + p3Noise3(x * 0.01, 1, z * 0.01)), zsSurf('hill', `float n = p3F(p3World.xz * 0.5), d = p3N(p3World.xz * 12.0); diffuseColor.rgb = mix(vec3(0.07, 0.09, 0.06), vec3(0.15, 0.15, 0.1), n) * (0.8 + 0.3 * d); p3Ht = d;`, 0.97, 0.02)));
  g.add(zsStars(1800, 380, 11));
  const moon = zsMesh(new THREE.SphereGeometry(6, 24, 16), zsGlow('#dfe6ff', 1.1), [-120, 110, -260]); g.add(moon);
  // the dish: a tower, a yoke and a 22 m parabolic reflector of panels, with a feed on four legs
  const steel = zsMetal('#b9bec4', 0.5), dark = zsMetal('#6d7278', 0.6);
  const tower = zsGroup(); tower.position.set(0, 0, -30); g.add(tower);
  for (const [x, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) tower.add(p3Rod([x * 5, 0, z * 5], [x * 2.2, 12, z * 2.2], 0.25, dark, 8));
  tower.add(zsBox(6, 1.2, 6, dark, [0, 12.4, 0]));
  const yoke = zsGroup(); yoke.position.y = 13; tower.add(yoke); ZS.dishYoke = yoke;
  const tilt = zsGroup(); tilt.position.y = 2; yoke.add(tilt); ZS.dishTilt = tilt;
  for (const x of [-4.5, 4.5]) yoke.add(zsBox(0.8, 5, 1.4, dark, [x, 1.5, 0]));
  const prof: THREE.Vector2[] = []; for (let i = 0; i <= 24; i++) { const r = (i / 24) * 11; prof.push(new THREE.Vector2(r, r * r / 30)); }
  const dg = new THREE.LatheGeometry(prof, 64); dg.rotateX(-Math.PI / 2);
  const panel = p3Shader(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.42, metalness: 0.55, side: THREE.DoubleSide }), 'zs-dish', { bump: 0.004,
    color: `float a = atan(p3Pos.y, p3Pos.x), r = length(p3Pos.xy); float seam = step(0.97, fract(a * 6.3662)) + step(0.94, fract(r * 0.9)); float n = p3F(p3Pos.xy * 0.6); diffuseColor.rgb = mix(vec3(0.62, 0.64, 0.66), vec3(0.8, 0.82, 0.84), n) * (1.0 - min(1.0, seam) * 0.35); p3Ht = 1.0 - min(1.0, seam);` });
  tilt.add(zsMesh(dg, panel, [0, 0, 0]));
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; tilt.add(p3Rod([Math.cos(a) * 9.5, Math.sin(a) * 9.5, 3.2], [0, 0, 9], 0.09, steel, 6)); }
  tilt.add(zsMesh(new THREE.CylinderGeometry(0.5, 0.8, 1.4, 12), dark, [0, 0, 9], [Math.PI / 2, 0, 0]));
  const feedGlow = zsMesh(new THREE.SphereGeometry(0.35, 12, 10), zsGlow(ZS_GREEN, 1.5), [0, 0, 8.2]); tilt.add(feedGlow); ZS.feedGlow = feedGlow;
  tilt.rotation.x = -0.75;
  // the control building at the foot of the dish, its lit window, the fence, the cable conduit
  const bld = zsGroup(); bld.position.set(14, 0, -14); g.add(bld);
  bld.add(zsBox(12, 4, 8, zsConcrete('#9aa39c'), [0, 2, 0]), zsBox(12.6, 0.4, 8.6, zsConcrete('#6f7670'), [0, 4.2, 0]));
  const win = zsLightPanel(3.2, 1.2, '#d9f2c9', 1.3, [-2, 2.3, 4.01]); bld.add(win); ZS.ctrlWindow = win;
  bld.add(zsLightPanel(1.0, 2.1, '#3a3a2c', 0.3, [3.5, 1.05, 4.01]));
  const lamp = zsPoint('#e8f5d8', 30, 18, [-2, 3, 6], true); bld.add(lamp);
  g.add(zsWire([0, 0.3, -30], [14, 0.3, -14], -0.0, 0.35));
  for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2; g.add(zsBox(0.08, 2.2, 0.08, dark, [Math.cos(a) * 26, 1.1, -22 + Math.sin(a) * 26])); }
  for (let k = 0; k < 40; k++) { const rnd = p3Rnd(200 + k), x = (rnd() - 0.5) * 200, z = -60 - rnd() * 120; const tr = zsPine(9 + rnd() * 8, k); tr.position.set(x, 0, z); g.add(tr); }
  const sky = new THREE.HemisphereLight('#304068', '#0a0c10', 0.5), moonL = new THREE.DirectionalLight('#9fb4ff', 1.2); moonL.position.set(-60, 80, -40); moonL.castShadow = true; moonL.shadow.mapSize.set(2048, 2048); Object.assign(moonL.shadow.camera, { left: -40, right: 40, top: 40, bottom: -10, far: 300 });
  g.add(sky, moonL, moonL.target);
  return g;
};
const zsSetControl = () => {
  const g = zsGroup(), W = 8, D = 6, Hh = 3;
  g.add(zsRoom(W, D, Hh, zsConcrete('#8f9d93'), zsTiles('#9a9888', '#5c5a50'), zsConcrete('#b9bdb3')));
  // fluorescent panels (they flicker with the signal)
  ZS.ctrlTubes = [];
  for (const x of [-2, 2]) { const p = zsLightPanel(1.6, 0.3, '#eaf6e2', 1.2, [x, Hh - 0.01, 0], [Math.PI / 2, 0, 0]); g.add(p); ZS.ctrlTubes.push(p); }
  const tubeL = [zsPoint('#e4f2dc', 9, 9, [-2, 2.7, 0], true), zsPoint('#e4f2dc', 9, 9, [2, 2.7, 0])]; g.add(...tubeL); ZS.ctrlLights = tubeL;
  g.add(new THREE.HemisphereLight('#9fb39a', '#2a2820', 0.35));
  // the console wall: racks of equipment, VU meters, oscilloscopes, a reel-to-reel
  const rack = zsStd('#c8c2ae', 0.55, 0.1), rack2 = zsStd('#7c8a86', 0.5, 0.2);
  for (let i = 0; i < 6; i++) {
    const x = -3.25 + i * 1.3, R = zsGroup(); R.position.set(x, 0, -D / 2 + 0.45); g.add(R);
    R.add(zsBox(1.2, 2.2, 0.8, i % 2 ? rack : rack2, [0, 1.1, 0]));
    const scope = zsPlane(0.5, 0.36, zsScreenMat('scope'), [-0.2, 1.62, 0.41]); scope.castShadow = false; R.add(scope);
    R.add(zsPlane(0.4, 0.18, zsDialMat(), [0.32, 1.7, 0.41]), zsPlane(0.4, 0.18, zsDialMat(), [0.32, 1.45, 0.41]));
    for (let k = 0; k < 6; k++) R.add(zsMesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 10), zsStd('#1b1b1b', 0.4), [-0.45 + k * 0.18, 1.12, 0.42], [Math.PI / 2, 0, 0]));
    for (let k = 0; k < 8; k++) R.add(zsLightPanel(0.03, 0.03, k % 3 ? '#ff4a2a' : '#7dff9a', 1.5, [-0.45 + k * 0.12, 0.9, 0.41]));
    R.add(zsBox(1.25, 0.06, 0.95, zsStd('#55524a', 0.6), [0, 0.86, 0.1]));
  }
  const reel = zsGroup(); reel.position.set(3.2, 0, -1.2); g.add(reel);
  reel.add(zsBox(0.9, 1.4, 0.6, zsStd('#4a4842', 0.5, 0.3), [0, 0.7, 0]));
  ZS.reels = [0.25, -0.25].map((x) => { const r = zsMesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24), zsStd('#8a8d90', 0.3, 0.7), [x, 1.18, 0.31], [Math.PI / 2, 0, 0]); reel.add(r); return r; });
  // the desk with the microphone, papers and coffee
  const desk = zsGroup(); desk.position.set(-0.6, 0, -0.4); g.add(desk);
  desk.add(zsBox(2.4, 0.06, 1.0, zsWood(), [0, 0.76, 0])); for (const [x, z] of [[1.1, 0.4], [-1.1, 0.4], [1.1, -0.4], [-1.1, -0.4]]) desk.add(zsBox(0.06, 0.76, 0.06, zsMetal(), [x, 0.38, z]));
  desk.add(zsMesh(new THREE.CylinderGeometry(0.07, 0.09, 0.03, 16), zsMetal('#333'), [0.3, 0.8, 0.1]), p3Rod([0.3, 0.8, 0.1], [0.3, 1.02, 0.12], 0.008, zsMetal('#444')));
  desk.add(zsMesh(new THREE.CapsuleGeometry(0.035, 0.08, 6, 12), zsMetal('#9a9ea4', 0.3), [0.3, 1.08, 0.13], [0.3, 0, 0]));
  desk.add(zsBox(0.3, 0.005, 0.4, zsStd('#eeeadf', 0.9), [-0.6, 0.795, 0.1], [0, 0.2, 0]), zsBox(0.3, 0.005, 0.4, zsStd('#e6e1d4', 0.9), [-0.45, 0.8, 0.0], [0, -0.1, 0]));
  desk.add(zsMesh(new THREE.CylinderGeometry(0.045, 0.04, 0.1, 14), zsStd('#d8d2c4', 0.4), [0.8, 0.84, 0.2]));
  // the cable: a thick bundle from the floor to the junction box (Ray cuts it)
  ZS.cable = p3Tube([[-3.9, 0.08, 1.8], [-2, 0.08, 1.9], [-0.5, 0.08, 1.3], [1.5, 0.08, 1.5], [3.2, 0.08, 2.2], [3.9, 0.5, 2.3]], 0.07, zsStd('#141414', 0.5), 48); g.add(ZS.cable);
  g.add(zsBox(0.5, 0.7, 0.25, zsMetal('#7a8078', 0.5), [3.88, 0.7, 2.3]));
  // the fire axe in its red case
  g.add(zsBox(0.4, 1.0, 0.1, zsStd('#a3221c', 0.5), [-3.95, 1.5, -1.0], [0, Math.PI / 2, 0]));
  ZS.axeCtrl = zsAxe(); ZS.axeCtrl.position.set(-3.88, 1.05, -1.0); ZS.axeCtrl.rotation.set(0, Math.PI / 2, 0); g.add(ZS.axeCtrl);
  // the window to the dish (night outside) and the dark corridor door (negative space)
  g.add(zsLightPanel(2.2, 1.1, '#18243a', 1, [W / 2 - 0.01, 1.8, -0.8], [0, -Math.PI / 2, 0]));
  g.add(zsBox(1.0, 2.1, 0.05, zsStd('#050506', 1), [-W / 2 + 0.02, 1.05, 1.6], [0, Math.PI / 2, 0]));
  return g;
};
const zsAxe = () => {
  const g = zsGroup(), wood = zsSurf('handle', `float n = p3F(vec2(p3Pos.y * 2.0, p3Pos.x * 40.0)); diffuseColor.rgb = mix(vec3(0.45, 0.27, 0.12), vec3(0.65, 0.42, 0.2), n);`, 0.6, 0);
  g.add(zsMesh(new THREE.CylinderGeometry(0.018, 0.022, 0.9, 10), wood, [0, 0.45, 0]));
  const head = zsMesh(p3Extruded([[0, 0], [0.2, -0.04], [0.24, -0.1], [0.24, 0.12], [0.2, 0.08], [0, 0.04], [-0.08, 0.03], [-0.08, -0.01]], 0.03), zsStd('#b3201a', 0.4, 0.4), [0, 0.86, 0]);
  g.add(head, zsMesh(new THREE.BoxGeometry(0.004, 0.2, 0.032), zsMetal('#d7dade', 0.2), [0.24, 0.87, 0]));
  return g;
};

// ---- B. the basement: Radio Porão
const zsSetBasement = () => {
  const g = zsGroup(), W = 6, D = 5, Hh = 2.4;
  g.add(zsRoom(W, D, Hh, zsWood(), zsCarpet(), zsSurf('ceiltile', `float t = step(0.97, fract(p3World.x * 1.6)) + step(0.97, fract(p3World.z * 1.6)); diffuseColor.rgb = vec3(0.75, 0.72, 0.65) * (1.0 - t * 0.4);`, 0.9, 0)));
  // the ham-radio desk against the back wall
  const desk = zsGroup(); desk.position.set(-0.6, 0, -D / 2 + 0.45); g.add(desk);
  desk.add(zsBox(2.6, 0.06, 0.8, zsWood(), [0, 0.74, 0]), zsBox(2.6, 0.7, 0.04, zsWood(), [0, 0.38, -0.38]));
  for (const x of [-1.25, 1.25]) desk.add(zsBox(0.06, 0.74, 0.76, zsWood(), [x, 0.37, 0]));
  const rig = [zsRadio(0.55, 0.22, 0.35, 1), zsRadio(0.45, 0.18, 0.3, 2), zsRadio(0.5, 0.25, 0.32, 0), zsRadio(0.4, 0.16, 0.3, 1)];
  rig.forEach((r, i) => { r.position.set(-0.55 + (i % 2) * 0.6, 0.77 + Math.floor(i / 2) * 0.27, -0.15); desk.add(r); });
  ZS.receiver = rig[0];
  desk.add(zsCRT(0.42), zsMesh(new THREE.CylinderGeometry(0.06, 0.08, 0.03, 16), zsMetal('#333'), [0.25, 0.78, 0.15]), p3Rod([0.25, 0.78, 0.15], [0.25, 1.0, 0.17], 0.008, zsMetal('#444')));
  desk.children[desk.children.length - 3].position.set(0.75, 0.77, -0.1);
  desk.add(zsMesh(new THREE.CapsuleGeometry(0.03, 0.07, 6, 12), zsMetal('#2a2a2e', 0.3), [0.25, 1.05, 0.18], [0.3, 0, 0]));
  // the cassette recorder (Theo's) and snacks
  ZS.cassette = zsGroup(zsBox(0.2, 0.05, 0.12, zsStd('#2b2b2f', 0.4, 0.2), [0, 0.025, 0]), zsBox(0.09, 0.005, 0.055, zsStd('#cfc6b0', 0.4), [-0.03, 0.052, 0])); ZS.cassette.position.set(-1.0, 0.77, 0.2); desk.add(ZS.cassette);
  desk.add(zsBox(0.18, 0.25, 0.06, zsStd('#d23c2c', 0.6), [1.0, 0.9, 0.2], [0, 0.4, 0.15]));
  // desk lamp (warm key light) and a lava lamp (orange glow)
  const lamp = zsGroup(); lamp.position.set(1.1, 0.77, -0.2); desk.add(lamp);
  lamp.add(zsMesh(new THREE.CylinderGeometry(0.08, 0.1, 0.03, 14), zsMetal('#2e5a46'), [0, 0.015, 0]), p3Rod([0, 0, 0], [-0.05, 0.4, 0.05], 0.01, zsMetal('#2e5a46')));
  lamp.add(zsMesh(new THREE.ConeGeometry(0.1, 0.14, 16, 1, true), zsStd('#2e5a46', 0.4, 0.3), [-0.1, 0.42, 0.1], [0.9, 0, 0.5]));
  const key = zsSpot('#ffcf8a', 22, 7, [0.4, 1.25, -1.5], [-0.6, 0.6, 0.6], 1.0); g.add(key.g); ZS.baseKey = key.l;
  const lava = zsGroup(zsMesh(new THREE.CylinderGeometry(0.05, 0.08, 0.35, 16), zsGlow('#ff7a2a', 0.9), [0, 0.2, 0])); lava.position.set(1.95, 0.4, -1.8); g.add(lava);
  g.add(zsBox(0.5, 0.4, 0.4, zsWood(), [1.95, 0.2, -1.9]), zsPoint('#ff8a3a', 5, 4, [1.95, 0.8, -1.6]));
  g.add(new THREE.HemisphereLight('#6a5a7a', '#2a1a10', 0.25));
  // the couch, a bean bag, posters, the high window with night outside, the stairs going up into the dark
  const couch = zsGroup(); couch.position.set(1.6, 0, 1.2); couch.rotation.y = -Math.PI / 2 - 0.3; g.add(couch);
  const flor = zsSurf('floral', `vec3 v = p3V(p3World.xy * 9.0 + p3World.z * 7.0); float f = smoothstep(0.25, 0.1, v.x); diffuseColor.rgb = mix(vec3(0.42, 0.33, 0.18), vec3(0.64, 0.24, 0.16), f); p3Ht = f;`, 0.95, 0.01);
  couch.add(zsMesh(new THREE.RoundedBoxGeometry(2.0, 0.42, 0.85, 3, 0.1), flor, [0, 0.33, 0]), zsMesh(new THREE.RoundedBoxGeometry(2.0, 0.55, 0.25, 3, 0.1), flor, [0, 0.72, -0.32]));
  for (const x of [-1, 1]) couch.add(zsMesh(new THREE.RoundedBoxGeometry(0.22, 0.55, 0.85, 3, 0.08), flor, [x, 0.45, 0]));
  g.add(zsMesh(new THREE.SphereGeometry(0.45, 20, 14), zsCloth('#5a2a6a', 'nylon', '#3a1a4a'), [-2.2, 0.3, 1.4], undefined, [1, 0.62, 1]));
  const posterA = zsPaintTex('posterA', 360, 512, (c, w, h) => { const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#120a2a'); gr.addColorStop(1, '#4a1a3a'); c.fillStyle = gr; c.fillRect(0, 0, w, h); c.fillStyle = '#e8643a'; c.beginPath(); c.arc(w / 2, h * 0.42, 95, 0, 7); c.fill(); c.fillStyle = '#ffe9b0'; c.font = 'bold 54px Georgia'; c.textAlign = 'center'; c.fillText('MARS 1993', w / 2, h * 0.82); c.font = '24px Arial'; c.fillText('OBSERVER MISSION', w / 2, h * 0.9); });
  const posterB = zsPaintTex('posterB', 360, 512, (c, w, h) => { c.fillStyle = '#0d1b12'; c.fillRect(0, 0, w, h); c.strokeStyle = '#7dff9a'; c.lineWidth = 4; for (let i = 0; i < 9; i++) { c.beginPath(); c.arc(w / 2, h * 0.45, 20 + i * 18, 0, 7); c.globalAlpha = 1 - i * 0.1; c.stroke(); } c.globalAlpha = 1; c.fillStyle = '#b8ffcb'; c.font = 'bold 40px Courier New'; c.textAlign = 'center'; c.fillText('HAM RADIO', w / 2, h * 0.85); c.font = '22px Courier New'; c.fillText('KC8 • 27 MHz', w / 2, h * 0.92); });
  g.add(zsPlane(0.6, 0.85, posterA, [-1.9, 1.5, -D / 2 + 0.01]), zsPlane(0.6, 0.85, posterB, [W / 2 - 0.01, 1.45, -0.8], [0, -Math.PI / 2, 0]));
  g.add(zsLightPanel(0.9, 0.35, '#1a2a48', 0.8, [0.9, 2.05, -D / 2 + 0.01]));
  const stairs = zsGroup(); stairs.position.set(-2.5, 0, 1.6); g.add(stairs);
  for (let k = 0; k < 8; k++) stairs.add(zsBox(0.9, 0.06, 0.28, zsWood(), [0, 0.28 + k * 0.27, -k * 0.26]));
  g.add(zsBox(1.0, 2.4, 0.02, zsStd('#020203', 1), [-2.5, 1.2, -0.6 + 0.0], [0, 0, 0]));
  // the antenna wire across the wall
  g.add(zsWire([-2.9, 2.2, -D / 2 + 0.05], [2.9, 2.2, -D / 2 + 0.05], 0.2, 0.006));
  return g;
};

// ---- C. Main Street at night: Ruiz Diner, Holt Radio & TV, Rewind Video; the van; lamps and wires
const zsSetStreet = () => {
  const g = zsGroup();
  g.add(zsMesh(new THREE.PlaneGeometry(120, 14), zsAsphalt(), [0, 0, 2], [-Math.PI / 2, 0, 0]));
  g.add(zsBox(120, 0.15, 3, zsConcrete('#6e6f6c'), [0, 0.075, -6.5]), zsBox(120, 0.15, 3, zsConcrete('#6e6f6c'), [0, 0.075, 10.5]));
  for (let x = -60; x < 60; x += 6) g.add(zsBox(2.5, 0.01, 0.15, zsStd('#d8c26a', 0.6), [x, 0.005, 2]));
  // storefronts along the back (z = -8)
  const fronts: [string, number, string][] = [['diner', -12, '#8a5a3a'], ['shop', 0, '#6e4632'], ['rewind', 12, '#5a4a62']];
  for (const [name, x, tint] of fronts) {
    const f = zsGroup(); f.position.set(x, 0, -8); g.add(f);
    f.add(zsBox(11.6, 7, 0.5, zsBrick(tint), [0, 3.5, -0.25]), zsBox(11.8, 0.4, 0.7, zsConcrete('#4a4644'), [0, 7.1, -0.2]));
    f.add(zsLightPanel(4.2, 2.2, name === 'diner' ? '#ffd9a0' : name === 'rewind' ? '#cfe0ff' : '#2a2418', name === 'shop' ? 0.25 : 0.75, [-2.4, 1.6, 0.01]));
    f.add(zsBox(1.1, 2.3, 0.06, zsStd('#20160f', 0.6), [2.6, 1.15, 0.03]), zsLightPanel(0.5, 0.4, '#ffe6b0', name === 'shop' ? 0.2 : 0.6, [2.6, 1.85, 0.07]));
    for (const wx of [-3.5, 0, 3.5]) f.add(zsLightPanel(1.4, 1.3, '#1a1a24', 0.6, [wx, 5.0, 0.01]));
  }
  ZS.signs = {
    diner: zsPlane(5, 1.25, zsNeon('diner', 'RUIZ DINER', '#ff4fa3'), [-12, 3.6, -7.8]),
    shop: zsPlane(5, 1.0, zsNeon('shop', 'HOLT RADIO & TV', '#ffb347', 1024, 200, 'bold 110px Arial'), [0, 3.5, -7.8]),
    rewind: zsPlane(5, 1.25, zsNeon('rewind', 'REWIND VIDEO', '#4fd2ff', 1024, 256, 'italic bold 140px Arial'), [12, 3.6, -7.8]),
  };
  Object.values(ZS.signs).forEach((m: any) => { m.castShadow = false; g.add(m); });
  g.add(zsPoint('#ff4fa3', 14, 10, [-12, 3.4, -6]), zsPoint('#4fd2ff', 14, 10, [12, 3.4, -6]), zsPoint('#ffb347', 6, 8, [0, 3.4, -6]));
  // shop window radios (visible from the street) and the TV wall of the video store
  for (let i = 0; i < 5; i++) { const r = zsRadio(0.6, 0.35, 0.3, i); r.position.set(-3.8 + i * 0.75, 0.75, -7.7); g.add(r); }
  ZS.streetTV = zsCRT(0.7); ZS.streetTV.position.set(-1.2, 1.15, -7.75); g.add(ZS.streetTV);
  for (let i = 0; i < 3; i++) { const tv = zsCRT(0.55); tv.position.set(9.3 + i * 0.6, 0.8, -7.7); g.add(tv); }
  // street lamps (sodium), power poles and wires, a sign for the quiet zone
  for (const x of [-20, -6, 6, 20]) { const L = zsGroup(); L.position.set(x, 0, 9.2); g.add(L); L.add(zsMesh(new THREE.CylinderGeometry(0.08, 0.12, 6, 10), zsMetal('#3a3d40'), [0, 3, 0]), p3Rod([0, 6, 0], [0, 6.1, -1.6], 0.05, zsMetal('#3a3d40')));
    L.add(zsMesh(new THREE.CylinderGeometry(0.25, 0.32, 0.18, 12), zsStd('#2a2a2a', 0.5), [0, 6.05, -1.6]), zsLightPanel(0.45, 0.45, '#ffb35a', 1.3, [0, 5.95, -1.6], [Math.PI / 2, 0, 0])); }
  const sodiumA = zsSpot('#ffa955', 60, 16, [-6, 5.9, 7.6], [-6, 0, 3], 0.9), sodiumB = zsSpot('#ffa955', 60, 16, [6, 5.9, 7.6], [6, 0, 3], 0.9, false);
  g.add(sodiumA.g, sodiumB.g, zsPoint('#ffa955', 20, 14, [-20, 5.8, 7.6]), zsPoint('#ffa955', 20, 14, [20, 5.8, 7.6]));
  for (const x of [-30, -10, 10, 30]) { g.add(zsMesh(new THREE.CylinderGeometry(0.13, 0.16, 9, 10), zsSurf('pole', `float n = p3F(vec2(p3Pos.y * 2.0, atan(p3Pos.x, p3Pos.z) * 3.0)); diffuseColor.rgb = mix(vec3(0.18, 0.13, 0.09), vec3(0.3, 0.22, 0.15), n);`, 0.95, 0), [x, 4.5, 12])); g.add(zsBox(2.4, 0.15, 0.15, zsSurf('pole', '', 0.95, 0), [x, 8.6, 12])); }
  for (const y of [8.65, 8.2]) for (let k = 0; k < 3; k++) g.add(zsWire([-30 + k * 20, y, 12], [-10 + k * 20, y, 12], 0.6, 0.015));
  const zone = zsPaintTex('zone', 512, 384, (c, w, h) => { c.fillStyle = '#f3f1ea'; c.fillRect(0, 0, w, h); c.strokeStyle = '#1a3d7a'; c.lineWidth = 14; c.strokeRect(10, 10, w - 20, h - 20); c.fillStyle = '#1a3d7a'; c.textAlign = 'center'; c.font = 'bold 44px Arial';
    c.fillText('YOU ARE ENTERING THE', w / 2, 90); c.font = 'bold 56px Arial'; c.fillText('NATIONAL RADIO', w / 2, 165); c.fillText('QUIET ZONE', w / 2, 230); c.font = '30px Arial'; c.fillText('NO TRANSMITTING', w / 2, 300); c.fillText('VIOLATORS WILL BE FINED', w / 2, 340); });
  const zs = zsGroup(zsPlane(2.0, 1.5, zsPaintTex('zoneF', 2, 2, () => {}), [0, 0, 0])); zs.children[0].visible = false;
  g.add(zsPlane(2.0, 1.5, zone, [-26, 2.6, 9.0]), zsBox(0.08, 2.0, 0.08, zsMetal('#555'), [-26.7, 1.0, 9.0]), zsBox(0.08, 2.0, 0.08, zsMetal('#555'), [-25.3, 1.0, 9.0]));
  // Coyle's van, a pickup at the diner, the mountains and the sky
  ZS.van = zsCar('#e9eaec', true); ZS.van.position.set(4, 0, 6.5); ZS.van.rotation.y = Math.PI / 2; g.add(ZS.van);
  const pick = zsCar('#6a2a22'); pick.position.set(-14, 0, -3); pick.rotation.y = -Math.PI / 2; g.add(pick);
  g.add(zsTerrain(600, 60, (x, z) => (z < -60 ? 40 + 50 * p3Fbm3(x * 0.006, 2, z * 0.006) : -1), zsStd('#080a0e', 1)));
  g.add(zsStars(1200, 380, 21), new THREE.HemisphereLight('#2a3550', '#120c08', 0.45));
  const moonL = new THREE.DirectionalLight('#8aa0d8', 0.6); moonL.position.set(-40, 60, 30); g.add(moonL, moonL.target);
  return g;
};

// ---- D. Rewind Video, inside: aisles of tapes, the TV wall, the counter with the phone
const zsSetRewind = () => {
  const g = zsGroup(), W = 9, D = 7, Hh = 3;
  g.add(zsRoom(W, D, Hh, zsSurf('rewall', `float s = step(0.5, fract(p3World.y * 1.2)); diffuseColor.rgb = mix(vec3(0.16, 0.12, 0.24), vec3(0.2, 0.15, 0.3), s);`, 0.9, 0), zsTiles('#2a2a3a', '#4a4a62'), zsConcrete('#9a9aa6'), true));
  ZS.rwTubes = []; for (const x of [-2.5, 0, 2.5]) for (const z of [-1.5, 1.5]) { const p = zsLightPanel(1.6, 0.25, '#e8f0ff', 1.1, [x, Hh - 0.01, z], [Math.PI / 2, 0, 0]); g.add(p); ZS.rwTubes.push(p); }
  ZS.rwLights = [zsPoint('#e8f0ff', 10, 10, [-2.5, 2.8, 0], true), zsPoint('#e8f0ff', 10, 10, [2.5, 2.8, 0])]; g.add(...ZS.rwLights, new THREE.HemisphereLight('#8a90b0', '#201a30', 0.4));
  // aisles: shelves with tapes (one draw: many boxes with their own colors)
  const spines = (seed: number) => zsPaintTex('spines' + seed, 1024, 512, (c, w, h) => { const rnd = p3Rnd(seed), pal = ['#c0392b', '#2c3e50', '#f1c40f', '#27ae60', '#8e44ad', '#e67e22', '#ecf0f1', '#16a085', '#d35400', '#1a1a1a', '#7f1d1d', '#1d4e89'];
    c.fillStyle = '#cfc9bb'; c.fillRect(0, 0, w, h);
    for (let r = 0; r < 4; r++) { const y0 = r * 128 + 20; c.fillStyle = '#8f887a'; c.fillRect(0, y0 + 98, w, 10);
      for (let x = 4; x < w - 12;) { const bw = 12 + rnd() * 6, bh = 70 + rnd() * 18; c.fillStyle = pal[Math.floor(rnd() * pal.length)]; c.fillRect(x, y0 + 98 - bh, bw, bh); c.fillStyle = 'rgba(255,255,255,0.55)'; c.fillRect(x + 3, y0 + 98 - bh + 8, bw - 6, 6); c.fillRect(x + 3, y0 + 98 - bh + 22, bw - 8, 3); x += bw + 1; } } });
  for (const z of [-1.6, 0.4]) { const sh = zsGroup(); sh.position.set(-1.2, 0, z); g.add(sh);
    sh.add(zsBox(5.0, 1.9, 0.36, zsStd('#d9d4c8', 0.7), [0, 0.95, 0]));
    for (const side of [-1, 1]) sh.add(zsPlane(4.9, 1.7, spines(Math.round(z * 10) + side * 3 + 50), [0, 0.95, side * 0.185], [0, side < 0 ? Math.PI : 0, 0])); }
  const sec = (t: string, c: string) => zsPaintTex('sec' + t, 512, 128, (x, w, h) => { x.fillStyle = c; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = 'bold 80px Arial'; x.textAlign = 'center'; x.fillText(t, w / 2, 95); });
  g.add(zsPlane(1.6, 0.4, sec('HORROR', '#8a1010'), [-2.4, 2.5, -1.6]), zsPlane(1.6, 0.4, sec('COMEDY', '#1a6a2a'), [0.2, 2.5, 0.4]));
  // the TV wall: 2 x 3 sets on a stand, all tuned to the same thing
  const wall = zsGroup(); wall.position.set(3.3, 0, -2.6); wall.rotation.y = -0.5; g.add(wall); ZS.tvWall = wall;
  wall.add(zsBox(2.1, 0.8, 0.6, zsStd('#2a2a30', 0.6), [0, 0.4, 0]), zsBox(2.1, 0.05, 0.6, zsStd('#2a2a30', 0.6), [0, 1.33, 0]));
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) { const tv = zsCRT(0.62, '#2d2b28'); tv.position.set(-0.68 + c * 0.68, 0.82 + r * 0.53, 0); wall.add(tv); }
  ZS.tvLight = zsPoint('#b8c8ff', 0, 5, [3.0, 1.3, -1.8]); g.add(ZS.tvLight);
  // the counter, the register, the beige phone, posters of made-up movies
  const ct = zsGroup(); ct.position.set(-2.8, 0, 2.3); g.add(ct);
  ct.add(zsBox(2.6, 1.05, 0.7, zsStd('#3a2a48', 0.6), [0, 0.52, 0]), zsBox(2.7, 0.05, 0.8, zsStd('#d8d0c0', 0.4), [0, 1.07, 0]));
  ct.add(zsBox(0.4, 0.25, 0.35, zsStd('#cfcac0', 0.4), [-0.7, 1.22, 0]), zsLightPanel(0.25, 0.08, '#7dff9a', 0.6, [-0.7, 1.3, 0.18]));
  ZS.phone = zsGroup(zsBox(0.22, 0.08, 0.2, zsStd('#e2d8c0', 0.4), [0, 0.04, 0])); ZS.phone.position.set(0.6, 1.1, 0.05); ct.add(ZS.phone);
  ZS.handset = zsMesh(new THREE.CapsuleGeometry(0.03, 0.16, 6, 10), zsStd('#e2d8c0', 0.4), [0.6, 1.2, 0.05], [0, 0, Math.PI / 2]); ct.add(ZS.handset);
  const poster = (k: string, title: string, a: string, b: string) => zsPaintTex('mp' + k, 340, 512, (c, w, h) => { const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); c.fillStyle = gr; c.fillRect(0, 0, w, h); c.fillStyle = '#fff'; c.textAlign = 'center'; c.font = 'bold 44px Impact, Arial'; title.split('|').forEach((l, i) => c.fillText(l, w / 2, h * 0.72 + i * 48)); c.fillStyle = 'rgba(0,0,0,0.5)'; c.beginPath(); c.arc(w / 2, h * 0.35, 90, 0, 7); c.fill(); });
  g.add(zsPlane(0.65, 0.95, poster('a', 'RETURN OF THE|CANNIBAL ZOMBIE 6', '#5a0a0a', '#120202'), [-W / 2 + 0.01, 1.7, -1.5], [0, Math.PI / 2, 0]));
  g.add(zsPlane(0.65, 0.95, poster('b', 'MALL RATS|FROM SPACE', '#0a2a5a', '#02060f'), [-W / 2 + 0.01, 1.7, -0.6], [0, Math.PI / 2, 0]));
  g.add(zsPlane(0.65, 0.95, poster('c', 'MY UNCLE|THE VOLCANO', '#6a4a0a', '#1a1002'), [-W / 2 + 0.01, 1.7, 0.3], [0, Math.PI / 2, 0]));
  g.add(zsLightPanel(4.5, 2.2, '#0d1424', 1, [0, 1.4, D / 2 - 0.01], [0, Math.PI, 0]));   // the front window (night)
  return g;
};

// ---- E. the woods: the path under the high-voltage line
const zsSetWoods = () => {
  const g = zsGroup();
  g.add(zsTerrain(160, 90, (x, z) => 0.6 * p3Fbm3(x * 0.05, 3, z * 0.05) * (Math.abs(x - Math.sin(z * 0.12) * 2.5) > 2 ? 1 : 0.3), zsGrass()));
  const ground = g.children[0] as THREE.Mesh; ground.position.x = 0;
  for (let k = 0; k < 70; k++) { const rnd = p3Rnd(500 + k); let x = (rnd() - 0.5) * 70, z = (rnd() - 0.5) * 90; if (Math.abs(x - Math.sin(z * 0.12) * 2.5) < 3.5) x += x < 0 ? -4 : 4;
    const tr = zsPine(10 + rnd() * 9, k + 3); tr.position.set(x, 0, z); tr.rotation.y = rnd() * 6; g.add(tr); }
  for (let k = 0; k < 30; k++) { const rnd = p3Rnd(900 + k), x = (rnd() - 0.5) * 40, z = (rnd() - 0.5) * 60; if (Math.abs(x) < 3) continue;
    g.add(zsMesh(new THREE.DodecahedronGeometry(0.3 + rnd() * 0.5, 1), zsConcrete('#5a5e58'), [x, 0.1, z], [rnd() * 3, rnd() * 3, 0], [1, 0.6, 1.2])); }
  // the pylons and the humming line above the path
  ZS.pylons = [-30, 0, 30].map((z) => { const p = zsPylon(22); p.position.set(9, 0, z); g.add(p); return p; });
  for (const dx of [-5.5, 5.5]) for (const y of [17.2, 20.5]) for (let k = 0; k < 2; k++) g.add(zsWire([9 + dx, y - 0.6, -30 + k * 30], [9 + dx, y - 0.6, k * 30], 2.2, 0.025));
  g.add(zsLog([-3.5, 0.25, 4], 0.4), zsLog([3.8, 0.25, -6], -0.6));
  const moonL = new THREE.DirectionalLight('#7f9ae0', 0.9); moonL.position.set(-30, 60, -20); moonL.castShadow = true; moonL.shadow.mapSize.set(2048, 2048); Object.assign(moonL.shadow.camera, { left: -25, right: 25, top: 25, bottom: -25, far: 150 });
  g.add(moonL, moonL.target, new THREE.HemisphereLight('#26324e', '#0a0b08', 0.35), zsStars(900, 300, 31));
  // Bolacha's flashlight: a spot light carried by him, plus a faint visible beam
  const fl = zsSpot('#fff1d0', 40, 18, [0, 1.2, 0], [0, 0.6, 6], 0.38); g.add(fl.g); ZS.flash = fl;
  const beam = zsMesh(new THREE.ConeGeometry(1.4, 7, 24, 1, true), zM_beam(), [0, 0, 0]); beam.castShadow = false; beam.receiveShadow = false; g.add(beam); ZS.beam = beam;
  return g;
};
const zM_beam = () => zsM('beam', () => new THREE.MeshBasicMaterial({ color: '#fff1d0', transparent: true, opacity: 0.05, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, toneMapped: false }));
const zsLog = (p: Vec3, ry: number) => { const bark = zsSurf('bark', '', 0.95, 0.02); return zsMesh(new THREE.CylinderGeometry(0.25, 0.3, 3.2, 12), bark, p, [0, ry, Math.PI / 2]); };

// ---- F. Holt Radio & TV, inside: walls of radios and TVs, the bench, the axe from 1979, the breaker panel
const zsSetShop = () => {
  const g = zsGroup(), W = 7, D = 6, Hh = 3.1;
  g.add(zsRoom(W, D, Hh, zsSurf('shopwall', `float n = p3F(p3World.xy * 1.5 + p3World.z); diffuseColor.rgb = vec3(0.36, 0.34, 0.27) * (0.8 + 0.3 * n);`, 0.9, 0), zsSurf('plank', `float b = fract(p3World.x * 4.0), g = p3F(vec2(p3World.z * 0.6, p3World.x * 40.0)); diffuseColor.rgb = mix(vec3(0.2, 0.13, 0.08), vec3(0.34, 0.23, 0.14), g) * (0.8 + 0.2 * step(0.04, b)); p3Ht = g;`, 0.7, 0.008), zsConcrete('#6a6658'), true));
  // shelves full of radios and TVs (left and back walls)
  const shelfM = zsStd('#4a3a2a', 0.7); ZS.shopRadios = [];
  for (const [x0, z0, ry, len] of [[-W / 2 + 0.3, 0, Math.PI / 2, 5.4], [0, -D / 2 + 0.3, 0, 6.4]] as [number, number, number, number][]) {
    const sh = zsGroup(); sh.position.set(x0, 0, z0); sh.rotation.y = ry; g.add(sh);
    for (let r = 0; r < 4; r++) { sh.add(zsBox(len, 0.04, 0.5, shelfM, [0, 0.5 + r * 0.6, 0]));
      for (let k = 0; k < Math.floor(len / 0.55); k++) { const rnd = p3Rnd(1000 + r * 37 + k * 7 + Math.round(x0 * 10)); const isTV = rnd() < 0.3;
        const it = isTV ? zsCRT(0.42 + rnd() * 0.12, ['#3a3631', '#6b5a44', '#2a2a2e'][k % 3]) : zsRadio(0.38 + rnd() * 0.12, 0.2 + rnd() * 0.12, 0.26, k + r);
        it.position.set(-len / 2 + 0.3 + k * 0.55, 0.52 + r * 0.6, 0); it.rotation.y = (rnd() - 0.5) * 0.2; sh.add(it); ZS.shopRadios.push(it); } }
    for (const x of [-len / 2, len / 2]) sh.add(zsBox(0.05, 2.5, 0.5, shelfM, [x, 1.25, 0]));
  }
  // the workbench (right wall): a lamp, an open chassis, the whiskey
  const bench = zsGroup(); bench.position.set(W / 2 - 0.5, 0, -0.6); bench.rotation.y = -Math.PI / 2; g.add(bench);
  bench.add(zsBox(2.4, 0.07, 0.8, zsWood(), [0, 0.9, 0]), zsBox(2.4, 0.85, 0.05, zsWood(), [0, 0.45, -0.38]));
  bench.add(zsRadio(0.5, 0.25, 0.35, 2)); bench.children[bench.children.length - 1].position.set(-0.4, 0.94, 0);
  const bl = zsGroup(); bl.position.set(0.7, 0.94, -0.2); bench.add(bl);
  bl.add(zsMesh(new THREE.CylinderGeometry(0.08, 0.1, 0.03, 14), zsMetal('#b9a26a', 0.3), [0, 0.015, 0]), p3Rod([0, 0, 0], [0, 0.32, 0], 0.01, zsMetal('#b9a26a', 0.3)));
  bl.add(zsMesh(new THREE.CylinderGeometry(0.06, 0.18, 0.12, 20, 1, true), zsStd('#1f5a3a', 0.4, 0.2), [0, 0.34, 0.05]));
  const benchLamp = zsSpot('#ffd59a', 18, 6, [W / 2 - 0.7, 1.35, -1.3], [W / 2 - 1.2, 0.9, -0.6], 1.1); g.add(benchLamp.g); ZS.benchLamp = benchLamp.l;
  ZS.bottle = zsMesh(new THREE.CylinderGeometry(0.04, 0.045, 0.28, 14), zsM('bottle', () => new THREE.MeshPhysicalMaterial({ color: '#7a4a1a', roughness: 0.1, transmission: 0, transparent: true, opacity: 0.85 })), [W / 2 - 0.6, 1.08, 0.4]); g.add(ZS.bottle);
  g.add(zsMesh(new THREE.CylinderGeometry(0.035, 0.03, 0.08, 12), zsM('glass', () => new THREE.MeshPhysicalMaterial({ color: '#d8c89a', roughness: 0.05, transparent: true, opacity: 0.45 })), [W / 2 - 0.65, 0.98, 0.15]));
  // the axe of 1979 on the wall above the bench, with a plaque
  ZS.axeWall = zsAxe(); ZS.axeWall.position.set(W / 2 - 0.05, 1.5, -0.6); ZS.axeWall.rotation.set(0, -Math.PI / 2, Math.PI / 2); g.add(ZS.axeWall);
  // the breaker panel (left of the door) and a big power strip on the floor with plugs
  g.add(zsBox(0.5, 0.7, 0.12, zsMetal('#8a8e86', 0.5), [-W / 2 + 0.07, 1.4, 2.0], [0, Math.PI / 2, 0]));
  ZS.strip = zsGroup(zsBox(0.5, 0.05, 0.08, zsStd('#e8e4d8', 0.4), [0, 0.025, 0]), zsLightPanel(0.03, 0.02, '#ff3a2a', 1.5, [0.22, 0.051, 0.02], [-Math.PI / 2, 0, 0])); ZS.strip.position.set(0.8, 0, -2.2); g.add(ZS.strip);
  ZS.plugs = [0, 1, 2, 3].map((k) => { const p = zsBox(0.04, 0.04, 0.05, zsStd('#1a1a1a', 0.4), [0.65 + k * 0.1, 0.065, -2.2]); g.add(p); return p; });
  // the front: the display window (glass that breaks) and the door with its bell; the neon of the street outside
  ZS.shopGlass = zsMesh(new THREE.PlaneGeometry(3.4, 2.2), zsM('shopglass', () => new THREE.MeshPhysicalMaterial({ color: '#9fb4c8', roughness: 0.05, transparent: true, opacity: 0.18, side: THREE.DoubleSide })), [-1.4, 1.5, D / 2]);
  ZS.shopGlass.castShadow = false; g.add(ZS.shopGlass);
  g.add(zsBox(3.6, 0.7, 0.2, zsWood(), [-1.4, 0.35, D / 2]), zsBox(7, 0.3, 0.2, zsWood(), [0, Hh - 0.15, D / 2]), zsBox(1.1, 2.4, 0.08, zsStd('#2a1d12', 0.6), [1.9, 1.2, D / 2]));
  g.add(zsLightPanel(9, 4, '#0b1220', 1, [0, 2, D / 2 + 3], [0, Math.PI, 0]));
  ZS.shardsGeo = new THREE.TetrahedronGeometry(0.08, 0);
  ZS.shards = p3Swarm(60, ZS.shardsGeo, zsM('shard', () => new THREE.MeshPhysicalMaterial({ color: '#c8dcec', roughness: 0.05, transparent: true, opacity: 0.6 })), false); g.add(ZS.shards);
  ZS.shopNeon = zsPoint('#ffb347', 5, 8, [0, 2.6, D / 2 + 1.0]); g.add(ZS.shopNeon, new THREE.HemisphereLight('#4a4436', '#1a1208', 0.35));
  ZS.shopCeil = zsPoint('#ffe2b0', 0, 8, [0, 2.9, 0], true); g.add(ZS.shopCeil);
  return g;
};
const zsSparks = () => { const s = p3Swarm(80, new THREE.SphereGeometry(0.012, 4, 3), zsGlow('#ffd27a', 3)); s.castShadow = false; return s; };

// ---------------------------------------------------------------- the whole world, built once
const ZS_FOG: Record<string, [string, number]> = { dish: ['#111a2e', 0.011], control: ['#0b0d0c', 0.02], basement: ['#120c08', 0.03], street: ['#121828', 0.016], rewind: ['#0c0a14', 0.02], woods: ['#141d33', 0.04], shop: ['#0e0b08', 0.03] };
const ZS_ENV: Record<string, number> = { dish: 0.05, control: 0.18, basement: 0.08, street: 0.05, rewind: 0.14, woods: 0.03, shop: 0.08 };
const ZS_BG: Record<string, string> = { dish: '#0e1528', control: '#050605', basement: '#050403', street: '#0e1322', rewind: '#05040a', woods: '#121a2e', shop: '#060504' };
// a soft fill near the camera (the 'eye light' of film sets): faces never fall into pure black
const ZS_FILL: Record<string, [string, number]> = { dish: ['#8fa6ff', 2], control: ['#d8f0d0', 2.5], basement: ['#ffd9b0', 3.5], street: ['#9fb0e8', 3], rewind: ['#c8d0ff', 2.5], woods: ['#9fb4ff', 2.2], shop: ['#ffe0b8', 3] };
const zsBuild = (w: World) => {
  const st = p3Stage(w, { finish: { vignette: 0.55, sat: 0.92, curve: 0.3, grain: 0.022 } });
  st.scene.fog = new THREE.FogExp2('#000000', 0.02);
  ZS.st = st; ZS.sets = {} as Record<string, THREE.Group>;
  const make: Record<string, () => THREE.Group> = { dish: zsSetDish, control: zsSetControl, basement: zsSetBasement, street: zsSetStreet, rewind: zsSetRewind, woods: zsSetWoods, shop: zsSetShop };
  for (const k of Object.keys(make)) { const g = make[k](); g.position.set(...ZS_SET_AT[k]); g.visible = false; st.add(g); ZS.sets[k] = g; }
  ZS.cast = {} as Record<string, ZsPerson>;
  for (const n of Object.keys(ZS_CAST)) { const P = zsPerson(ZS_CAST[n]); P.root.visible = false; st.add(P.root); ZS.cast[n] = P; }
  ZS.chiado = zsChiado(); ZS.chiado.root.visible = false; st.add(ZS.chiado.root);
  ZS.sparks = zsSparks(); st.add(ZS.sparks);
  ZS.fill = new THREE.PointLight('#ffffff', 0, 9, 2); st.add(ZS.fill);
  // props people hold
  ZS.props = {
    walkie: zsGroup(zsBox(0.06, 0.16, 0.035, zsStd('#1e2a1e', 0.5), [0, -0.08, 0.02]), p3Rod([0.02, 0, 0.02], [0.02, 0.12, 0.02], 0.004, zsMetal('#222'))),
    flashlight: zsGroup(zsMesh(new THREE.CylinderGeometry(0.022, 0.028, 0.22, 12), zsMetal('#2a2a2a', 0.4), [0, -0.08, 0.04], [Math.PI / 2, 0, 0]), zsMesh(new THREE.CircleGeometry(0.024, 12), zsGlow('#fff4d8', 2), [0, -0.08, 0.155])),
    axe: zsAxe(), skate: zsGroup(zsBox(0.2, 0.02, 0.8, zsSurf('skate', `float n = p3F(p3Pos.xz * 20.0); diffuseColor.rgb = mix(vec3(0.85, 0.2, 0.25), vec3(0.15, 0.6, 0.85), step(0.5, fract(p3Pos.z * 4.0 + n)));`, 0.6, 0), [0, 0, 0]),
      ...[[0.07, 0.3], [-0.07, 0.3], [0.07, -0.3], [-0.07, -0.3]].map(([x, z]) => zsMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 10), zsStd('#eae6d6', 0.4), [x, -0.04, z], [0, 0, Math.PI / 2]))),
    cassette: zsGroup(zsBox(0.2, 0.05, 0.12, zsStd('#2b2b2f', 0.4, 0.2), [0, 0, 0])), phone: zsGroup(zsMesh(new THREE.CapsuleGeometry(0.028, 0.15, 6, 10), zsStd('#e2d8c0', 0.4), [0, -0.05, 0.04])),
    glassDrink: zsGroup(zsMesh(new THREE.CylinderGeometry(0.035, 0.03, 0.08, 12), zsM('glass', () => new THREE.MeshPhysicalMaterial({ color: '#d8c89a', roughness: 0.05, transparent: true, opacity: 0.45 })), [0, -0.06, 0.04])),
  };
  for (const pr of Object.values(ZS.props) as THREE.Object3D[]) { pr.visible = false; st.add(pr); }
  // chairs that appear under whoever sits (two kinds: an office chair and a wooden one)
  ZS.chairs = [0, 1, 2].map((k) => { const ch = zsGroup(), m = k === 2 ? zsWood() : zsStd('#2f3a3a', 0.6);
    ch.add(zsBox(0.48, 0.07, 0.46, m, [0, 0.46, 0]), zsBox(0.46, 0.55, 0.05, m, [0, 0.78, -0.22]));
    if (k === 2) for (const [x, z] of [[0.2, 0.19], [-0.2, 0.19], [0.2, -0.19], [-0.2, -0.19]]) ch.add(zsBox(0.04, 0.46, 0.04, m, [x, 0.23, z]));
    else { ch.add(zsMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8), zsMetal(), [0, 0.23, 0])); for (let a = 0; a < 5; a++) ch.add(p3Rod([0, 0.04, 0], [Math.cos(a * 1.257) * 0.28, 0.03, Math.sin(a * 1.257) * 0.28], 0.015, zsMetal())); }
    ch.visible = false; st.add(ch); return ch; });
  return st;
};
// show one set (its lights, fog and background); hide the rest and every actor (shots turn on who they use)
const zsUse = (name: string) => {
  for (const k of Object.keys(ZS.sets)) ZS.sets[k].visible = k === name;
  for (const n of Object.keys(ZS.cast)) ZS.cast[n].root.visible = false;
  ZS.chiado.root.visible = false; ZS.sparks.visible = false; ZS.chairs.forEach((c: THREE.Object3D) => (c.visible = false));
  for (const pr of Object.values(ZS.props) as THREE.Object3D[]) { pr.visible = false; pr.parent !== ZS.st.scene && ZS.st.scene.add(pr); }
  const [c, d] = ZS_FOG[name]; (ZS.st.scene.fog as THREE.FogExp2).color.set(c); (ZS.st.scene.fog as THREE.FogExp2).density = d; ZS.st.scene.background = zsC(ZS_BG[name]); ZS.st.scene.environmentIntensity = ZS_ENV[name]; ZS.fill.color.set(ZS_FILL[name][0]); ZS.fill.intensity = ZS_FILL[name][1];
  ZS.set = name; ZS.at = ZS_SET_AT[name];
};
// set-local position -> world
const zsAt = (p: Vec3): Vec3 => [p[0] + ZS.at[0], p[1] + ZS.at[1], p[2] + ZS.at[2]];
// put a person in the active set: position (set-local), facing (radians, 0 = +z), a pose, an expression; returns it
const zsPut = (who: string, p: Vec3, face: number, pose: ZsPose, t: number, expr?: string, look: Partial<ZsFace> = {}, speaks?: string) => {
  const P: ZsPerson = who === 'chiado' ? ZS.chiado : ZS.cast[who];
  P.root.visible = true; const q = zsAt(p); P.root.position.set(q[0] + (pose.x || 0), q[1], q[2] + (pose.z || 0)); P.root.rotation.set(0, face, 0);
  zsApply(P, who === 'chiado' ? pose : zsAlive(pose, t, who.length * 1.37));
  if (who !== 'chiado') zsFace(P, t, expr || pose.face, who.length * 0.77, look, speaks);
  return P;
};
// a chair under a seated person (set-local position of the person, their facing)
const zsSeat = (k: number, p: Vec3, face: number) => { const c: THREE.Object3D = ZS.chairs[k]; c.visible = true; const q = zsAt(p); c.position.set(q[0] - Math.sin(face) * 0.05, q[1], q[2] - Math.cos(face) * 0.05); c.rotation.set(0, face, 0); return c; };
// hold a prop in a hand (the prop follows the wrist), with a local offset and rotation
const zsHold = (prop: string, P: ZsPerson, hand: 'L' | 'R', off: Vec3 = [0, -0.06, 0.03], rot: Vec3 = [0, 0, 0]) => {
  const pr: THREE.Object3D = ZS.props[prop]; pr.visible = true; const wr = hand === 'L' ? P.handL : P.handR;
  if (pr.parent !== wr) wr.add(pr); pr.position.set(...off); pr.rotation.set(...rot); return pr;
};
// the camera, in set-local coordinates
const zsLook = (pos: Vec3, target: Vec3, fov = 35, roll = 0) => {
  ZS.st.look(zsAt(pos), zsAt(target), fov, roll);
  // the fill sits a little above and to the side of the camera, a third of the way to the subject
  const a = zsAt(pos), b = zsAt(target); ZS.fill.position.set(a[0] + (b[0] - a[0]) * 0.35 + 0.4, a[1] + (b[1] - a[1]) * 0.35 + 0.5, a[2] + (b[2] - a[2]) * 0.35);
};

// ---------------------------------------------------------------- test of the world (world.json)
const ZS_TEST = [
  { id: 'test-cast', fn(t: number) { zsUse('street'); const names = ['theo', 'dani', 'bolacha', 'jess', 'kyle', 'helen', 'ray_old', 'ray_young', 'vance', 'coyle'];
    names.forEach((n, i) => zsPut(n, [(i - 4.5) * 0.85, 0.15, -4.5], 0, ZS_POSES[['stand', 'relaxed', 'armsCrossed', 'handsHips', 'relaxed', 'armsCrossed', 'stand', 'relaxed', 'handsHips', 'stand'][i]], t));
    zsLook([0, 1.3, 2.6], [0, 1.0, -4.5], 42); } },
  { id: 'test-faces', fn(t: number, u: number) { zsUse('basement'); const ex = ZS_TEST_FACES[Math.floor(u * 6.99) % 7];
    zsPut('theo', [-0.4, 0, 0.2], 0.2, ZS_POSES.stand, t, ex); zsPut('bolacha', [0.4, 0, 0.3], -0.3, ZS_POSES.stand, t, ex); zsLook([0, 1.45, 1.6], [0, 1.35, 0.2], 32); } },
  { id: 'test-dish', fn(t: number) { zsUse('dish'); ZS.dishTilt.rotation.x = -0.75; zsLook([30, 6, 30], [0, 12, -30], 45); } },
  { id: 'test-control', fn(t: number) { zsUse('control'); ZS_SCREEN.uWave.value = 0.6; zsPut('vance', [-0.3, 0, 0.5], Math.PI, ZS_POSES.micDesk, t, 'awe'); zsSeat(0, [-0.3, 0, 0.5], Math.PI); zsPut('ray_young', [1.2, 0, 1.0], Math.PI + 0.4, ZS_POSES.armsCrossed, t, 'skeptic');
    zsLook([0.5, 1.6, 2.7], [0, 1.2, -1.2], 40); } },
  { id: 'test-basement', fn(t: number) { zsUse('basement'); zsPut('theo', [-0.4, 0, -1.4], Math.PI, ZS_POSES.micDesk, t, 'grin'); zsSeat(0, [-0.4, 0, -1.4], Math.PI); zsPut('dani', [0.9, 0, -0.6], Math.PI + 0.6, ZS_POSES.handsHips, t, 'smirk'); zsPut('bolacha', [1.6, 0, 0.9], -Math.PI / 2 - 0.3, ZS_POSES.sit, t, 'smile');
    zsLook([-1.6, 1.5, 2.0], [0.2, 0.9, -1.0], 44); } },
  { id: 'test-street', fn(t: number) { zsUse('street'); zsPut('dani', [-4, 0, 3], Math.PI / 2, zsWalk(t * 7, 1, 0.3), t, 'smile'); zsPut('helen', [-11, 0.15, -6], 0.3, ZS_POSES.handsHips, t, 'angry');
    zsLook([-2, 2.2, 12], [-4, 2.0, -4], 46); } },
  { id: 'test-rewind', fn(t: number) { zsUse('rewind'); ZS_SCREEN.uStatic.value = 1; ZS_SCREEN.uShape.value = 0.8; ZS.tvLight.intensity = 6; zsPut('kyle', [1.6, 0, -0.9], Math.PI * 0.8, ZS_POSES.scared, t); zsPut('jess', [-0.8, 0, 1.6], 2.4, ZS_POSES.phone, t, 'worried');
    zsLook([-1.6, 1.6, 2.4], [2.2, 1.2, -1.6], 46); } },
  { id: 'test-woods', fn(t: number) { zsUse('woods'); const B = zsPut('bolacha', [0, 0, 0], 0, ZS_POSES.flashlight, t, 'fear'); zsHold('flashlight', B, 'R', [0, -0.08, 0.04], [0, 0, 0]);
    ZS.flash.g.position.set(0, 0, 0); ZS.flash.l.position.set(-0.2, 1.25, 0.3); ZS.flash.l.target.position.set(-0.2, 0.5, 7); ZS.beam.position.set(-0.2 + 0, 1.2 - 0, 3.8); ZS.beam.rotation.set(-Math.PI / 2 - 0.1, 0, 0);
    const C = zsPut('chiado', [1.5, 0, 6], Math.PI, ZS_CPOSES.stalk, t); ZS.chiado.fx(t, 0.6); zsLook([2.5, 1.6, -3.5], [0.5, 1.4, 3], 44); } },
  { id: 'test-shop', fn(t: number) { zsUse('shop'); ZS.shopCeil.intensity = 6; zsPut('ray_old', [1.6, 0, 0.6], -Math.PI / 2, ZS_POSES.axeReady, t, 'angry'); zsHold('axe', ZS.cast.ray_old, 'R', [0, -0.07, 0.02], [1.5, 0, 0]);
    zsPut('chiado', [-0.8, 0, 1.2], Math.PI / 2, ZS_CPOSES.reach, t); ZS.chiado.fx(t, 0.9); zsLook([0.3, 1.6, -2.4], [0.3, 1.3, 1.0], 46); } },
  { id: 'test-chiado', fn(t: number, u: number) { zsUse('control'); const pose = [ZS_CPOSES.hunch, ZS_CPOSES.shriek, ZS_CPOSES.swipe, ZS_CPOSES.convulse][Math.floor(u * 3.99)];
    zsPut('chiado', [0, 0, 0.5], 0, pose, t); ZS.chiado.fx(t, 1); zsLook([0, 1.7, 4.2], [0, 1.6, 0.5], 45); } },
];
const ZS_TEST_FACES = ['neutral', 'smile', 'fear', 'terror', 'angry', 'laugh', 'skeptic'];
p3Shots(ZS_TEST, (w) => zsBuild(w), (t, u, shot, s) => { ZS_SCREEN.uStatic.value = 0; ZS_SCREEN.uShape.value = 0; ZS_SCREEN.uWave.value = 0; ZS_DIAL.value = 0; shot.fn(t, u); });
