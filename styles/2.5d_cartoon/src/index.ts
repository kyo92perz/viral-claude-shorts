// =====================================================================
//  Cartoon (2.5D) — what the scenes see as the global `CT`. Flat 2D characters drawn on canvases, standing as lit cards
//  in a painted 3D world with black ink lines, two-tone light (day or golden hour), lens blur and a colour grade.
//  The look (toon, cast, ink, lensblur, grade, shade, lights, paint, build) comes from the MIT "claude-animated-shorts"
//  bridge short (LICENSE-bridge); this file only puts it on the 3D style's engine: the adapter bundles it with esbuild
//  into project/cartoon.js, with `three` read from the page's global THREE.
//  RULE (same as 3D): everything is posed from the time t. Same t, same picture: frames are captured out of order.
// =====================================================================
import * as THREE from "three";
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ToneMappingEffect, ToneMappingMode, BlendFunction } from "postprocessing";
import { InkPass, NOINK } from "./ink";
import { LensBlur } from "./lensblur";
import { GradeEffect, GRADES, gradeFor } from "./grade";
import { LIGHTS, LOOK, type LightPreset } from "./lights";
import { TONE, CHAR, untone } from "./shade";
import { Pool, Actor, Fx } from "./cast";
import { Pen, bodyFront, bodySide, fxBurst, fxStars, fxPuff, fxSplash, fxRing, fxNote, fxCreak, fxContact, fxShadow, type Outfit, type Expr, type FrontOpts, type SideOpts } from "./toon";
import { ctex, rep, cloudHD, grassHD, cobbleHD, stoneHD, planksHD } from "./paint";
import { Batch, lam, house as houseB, addVeg, boxGeo, V, type VegKind } from "./build";

export { Pen, NOINK, Batch, boxGeo };
export { KID, PARENT, OFFICER, SKIN, SKINS, INK, townsfolk, soldier, mix, shade, mul, bodyRig, RIG_SCALE } from "./toon";
export type { Rig, RigOutfit, RigProp, RigPropKind } from "./toon";
export type { Outfit, Expr, FrontOpts, SideOpts, VegKind };
export * as paint from "./paint";

type V3 = [number, number, number];
export type Light = import("./lights").LightName;
export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const FPS = 30;

// ---------------- the image chain: one per renderer, shared by every stage ----------------
// ink (world lines, own pass) -> lens blur pre + main (thin-lens DOF) -> bloom (emissive only) + NEUTRAL tone map + grade
interface Post { composer: EffectComposer; render: RenderPass; ink: InkPass; lens: LensBlur; grade: GradeEffect }
const POSTS = new Map<THREE.WebGLRenderer, Post>();
const makeBloom = () => {   // the glow keeps the same size relative to the frame at any output size
  const b = new BloomEffect({ blendFunction: BlendFunction.ADD, intensity: 0.5, luminanceThreshold: 1.0, luminanceSmoothing: 0.2, mipmapBlur: true, levels: 6, radius: 0.6 });
  const mip = b.mipmapBlurPass, setSize = mip.setSize.bind(mip);
  mip.setSize = (w: number, h: number) => setSize(Math.round((1920 * w) / Math.max(h, 1)), 1920);
  return b;
};
const postFor = (r: THREE.WebGLRenderer, scene: THREE.Scene, cam: THREE.PerspectiveCamera): Post => {
  let p = POSTS.get(r);
  if (p) return p;
  r.toneMapping = THREE.NoToneMapping;   // the chain tone-maps (NEUTRAL) before the grade
  const RS = (typeof SCENES === "undefined" ? 1 : SCENES.renderScale ?? 1);   // < 1: fast software render
  const composer = new EffectComposer(r, { multisampling: RS < 1 ? 0 : 4, frameBufferType: THREE.HalfFloatType });
  const render = new RenderPass(scene, cam), ink = new InkPass(scene, cam), lens = new LensBlur({ maxCoC: 24, nearScale: 1.2 });
  const grade = new GradeEffect(GRADES.day, 1);
  composer.addPass(render); composer.addPass(ink);
  composer.addPass(new EffectPass(cam, lens.pre)); composer.addPass(new EffectPass(cam, lens.main));
  composer.addPass(new EffectPass(cam, makeBloom(), new ToneMappingEffect({ mode: ToneMappingMode.NEUTRAL }), grade));
  composer.setSize(Math.round(1080 * RS), Math.round(1920 * RS));
  p = { composer, render, ink, lens, grade }; POSTS.set(r, p);
  return p;
};

// ---------------- sky ----------------
const skyMaterial = () => new THREE.ShaderMaterial({
  uniforms: { c0: { value: new THREE.Color() }, c1: { value: new THREE.Color() }, c2: { value: new THREE.Color() },
    c3: { value: new THREE.Color() }, c4: { value: new THREE.Color() }, e: { value: new THREE.Vector4() } },
  vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragmentShader: `uniform vec3 c0, c1, c2, c3, c4; uniform vec4 e; varying vec3 vP;
    void main(){ float el = asin(clamp(normalize(vP).y, -1.0, 1.0));
      vec3 c = mix(c0, c1, smoothstep(0.0, e.x, el)); c = mix(c, c2, smoothstep(e.x, e.y, el));
      c = mix(c, c3, smoothstep(e.y, e.z, el)); c = mix(c, c4, smoothstep(e.z, e.w, el)); gl_FragColor = vec4(c, 1.0); }`,
  side: THREE.BackSide, depthWrite: false, fog: false,
});
const discTex = () => ctex("sunDisc", 128, 128, (g) => {
  const gr = g.createRadialGradient(64, 64, 58, 64, 64, 64); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
});
const haloTex = () => ctex("sunHalo", 256, 256, (g) => {
  const im = g.createImageData(256, 256);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
    const u = Math.hypot(x - 127.5, y - 127.5) / 128;
    const a = (0.55 * Math.exp(-((u / 0.25) ** 2)) + 0.35 * Math.exp(-((u / 0.6) ** 2))) * (1 - Math.min(1, Math.max(0, (u - 0.8) / 0.2)));
    const i = (y * 256 + x) * 4; im.data[i] = im.data[i + 1] = im.data[i + 2] = 255; im.data[i + 3] = Math.round(255 * Math.min(1, a));
  }
  g.putImageData(im, 0, 0);
});

// ---------------- characters: drawing size, blinks, view ----------------
/** drawing resolution by distance: [canvas w, h, scale from the 600 x 1000 design] (sized for the 1080 x 1920 render) */
const tier = (d: number): [number, number, number] => d < 3.2 ? [1200, 2000, 2.0] : d < 6.5 ? [720, 1200, 1.2] : d < 16 ? [360, 600, 0.6] : [180, 300, 0.3];
const hh = (i: number, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const q = (v: number, n = 120) => Math.round(v * n) / n;
const fkey = (o: object) => JSON.stringify(o, (_k, v) => (typeof v === "number" ? q(v) : v));
/** eyelid 0 open .. 1 shut: a 4-frame blink every 0.5-2.3 s, different for each character id, from t alone */
const LID = [0.5, 1, 1, 0.5];
const lidAt = (t: number, i: number) => {
  const f = Math.round(t * FPS);
  let s = Math.round(-60 * hh(i, 9));
  for (let n = 0; s <= f && n < 2000; n++) { const k = f - s; if (k >= 0 && k < 4) return LID[k]; s += Math.round(15 + 54 * hh(i * 31 + n, 13)); }
  return 0;
};
const toSrgb = (v: number) => { const c = clamp01(v); return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055; };
const hexOf = (c: V3, k: number) => "#" + c.map((v) => Math.round(255 * toSrgb(1 - (1 - v) * k)).toString(16).padStart(2, "0")).join("");
const CONTACT: Record<Light, V3> = { day: [0.2, 0.21, 0.33], golden: [0.24, 0.2, 0.33], night: [0.05, 0.06, 0.1], store: [0.12, 0.13, 0.13], blackout: [0.02, 0.02, 0.04], emergency: [0.1, 0.01, 0.02] };
const TAIL: V3 = [0.42, 0.44, 0.62];

/** one character this frame. `who` = an outfit (KID, PARENT, townsfolk(i)…) or your own drawing in the 600 x 1000
 *  design space (soles at y = 975, 1000 units = 2.16 m) */
export interface PersonPose {
  id: number;                          // who it is (blinks and head shape are seeded by it)
  who: Outfit | { key: string; draw: (p: Pen, light: number) => void };
  at: V3;                              // where the feet are (m)
  walk?: [number, number];             // direction it moves (x, z): picks front or side view and mirrors it
  view?: "front" | "side";             // force a view (default: front, or from `walk`)
  mirror?: boolean;                    // side view facing screen-left
  scale?: number;                      // 1 = an adult 2.16 m card (kids come out smaller by their build)
  front?: FrontOpts;                   // pose in the front view (expr, mode, phase, look, wave, prop, tilt, headTilt…)
  side?: SideOpts;                     // pose in the side view (expr, mode, phase, stride…)
  blink?: boolean;                     // default true: blinks by itself
  shadow?: boolean;                    // default true: contact shadow under the feet
}
/** a flat drawing card this frame (effects, signs, props): unlit, never outlined by the world ink */
export interface CardPose { key: string; cw: number; ch: number; draw: (p: Pen) => void; at: V3; w: number; h: number; flat?: boolean; rot?: number; soft?: boolean }
export type Effect = "burst" | "stars" | "puff" | "splash" | "ring" | "note" | "creak";
const FX: Record<Effect, { cw: number; ch: number; draw: (p: Pen, u: number) => void; flat?: boolean; soft?: boolean }> = {
  burst: { cw: 500, ch: 500, draw: (p, u) => fxBurst(p, u) },
  stars: { cw: 420, ch: 210, draw: (p, u) => fxStars(p, u) },
  puff: { cw: 300, ch: 300, draw: (p, u) => fxPuff(p, u), soft: true },
  splash: { cw: 800, ch: 800, draw: (p, u) => fxSplash(p, u) },
  ring: { cw: 600, ch: 600, draw: (p, u) => fxRing(p, u), flat: true },
  note: { cw: 220, ch: 260, draw: (p, u) => fxNote(p, u < 0.5 ? 0 : 1) },
  creak: { cw: 300, ch: 300, draw: (p, u) => fxCreak(p, u) },
};

// ---------------- the stage ----------------
export interface StageOptions { light?: Light; clouds?: boolean; fog?: boolean; near?: number; far?: number }
export interface LightOptions { az?: number; el?: number; view?: [number, number] }
export interface Stage {
  scene: THREE.Scene; cam: THREE.PerspectiveCamera;
  add<T extends THREE.Object3D>(o: T): T;
  /** camera: where it stands, what it looks at (lands in the centre of the frame), lens (fov), tilt in degrees */
  look(pos: V3, target: V3, fov?: number, roll?: number): void;
  /** day or golden hour. az = degrees from the camera's view toward screen right (0 = backlight), el = height.
   *  The sun turns with the camera: for a moving camera pass `view` (the shot's main direction x, z) so the light holds still */
  light(name: Light, o?: LightOptions): void;
  /** lens blur this frame: cInf in px (close-up 12-16, medium 10-12, wide 0); focus on a point (default: the look target) */
  dof(cInf: number, focus?: V3): void;
  person(p: PersonPose): void;
  card(c: CardPose): void;
  /** a ready-made effect card: u is its progress 0..1 (from t) */
  effect(kind: Effect, at: V3, size: number, u: number): void;
  tick(t: number): void; render(): void;
  t: number; sun: THREE.Vector3;
}
export const stage = (w: World, o: StageOptions = {}): Stage => {
  const r = w.renderer;
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1080 / 1920, o.near ?? 0.2, o.far ?? 1500);
  cam.layers.enable(NOINK);   // the main render still shows the no-ink layer (cards, sky, sprites)
  const post = postFor(r, scene, cam);
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1100, 48, 24), skyMaterial());
  sky.renderOrder = -1; sky.frustumCulled = false; sky.layers.set(NOINK); scene.add(sky);
  const disc = new THREE.Sprite(new THREE.SpriteMaterial({ map: discTex(), color: new THREE.Color(6.0, 4.4, 2.4), fog: false, depthWrite: false }));
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex(), fog: false, depthWrite: false, transparent: true, blending: THREE.AdditiveBlending }));
  disc.renderOrder = -0.5; halo.renderOrder = 5;
  for (const m of [disc, halo]) { m.frustumCulled = false; m.layers.set(NOINK); scene.add(m); }
  const hemi = new THREE.HemisphereLight("#cfe6ff", "#6c5c8c", 1.1), sun = new THREE.DirectionalLight("#fff0d6", 2.6);
  sun.castShadow = true; const RS = (typeof SCENES === "undefined" ? 1 : SCENES.renderScale ?? 1); sun.shadow.mapSize.setScalar(RS < 1 ? 2048 : 4096);
  scene.add(hemi, sun, sun.target);
  const fog = new THREE.Fog("#bccbec", 25, 420);
  const clouds: THREE.Mesh[] = [], cloudCache: Partial<Record<Light, THREE.Texture[]>> = {};
  const cloudMaps = (l: Light) => (cloudCache[l] ??= [0, 1, 2, 3].map((k) => cloudHD(k, LOOK[l].cloud)));   // painted on first use
  if (o.clouds !== false) for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + 0.3, d = 620 + (i % 3) * 60, s = 130 + (i % 4) * 30;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: cloudMaps("day")[i % 4], color: new THREE.Color(1.1, 1.1, 1.1), transparent: true, depthWrite: false, fog: false }));
    m.position.set(Math.cos(a) * d, 120 + (i % 4) * 38, Math.sin(a) * d); m.scale.set(s, s / 2, 1); m.layers.set(NOINK);
    clouds.push(m); scene.add(m);
  }
  const pool = new Pool(), actors: Actor[] = [], fxs: Fx[] = [];
  let people: PersonPose[] = [], cards: CardPose[] = [], target = new THREE.Vector3(), L: Light = o.light ?? "day", LO: LightOptions = {};
  let dofC = 0, dofAt: V3 | null = null;
  const sunDir = new THREE.Vector3(0.5, 0.75, -0.4).normalize();
  const tmp = new THREE.Vector3(), fwd = new THREE.Vector3(), right = new THREE.Vector3();

  const applyLight = () => {
    const P: LightPreset = LIGHTS[L], K = LOOK[L];
    // camera-relative sun: the view direction turned by az toward screen right, lifted by el
    let fx: number, fz: number;
    if (LO.view) [fx, fz] = LO.view; else { cam.getWorldDirection(fwd); fx = fwd.x; fz = fwd.z; }
    const n = Math.hypot(fx, fz) || 1; fx /= n; fz /= n;
    const az = THREE.MathUtils.degToRad(LO.az ?? P.az), el = THREE.MathUtils.degToRad(LO.el ?? P.el);
    const hx = fx * Math.cos(az) - fz * Math.sin(az), hz = fz * Math.cos(az) + fx * Math.sin(az);
    sunDir.set(hx * Math.cos(el), Math.sin(el), hz * Math.cos(el)).normalize();
    hemi.color.set(P.sky); hemi.groundColor.set(P.ground); hemi.intensity = P.hemiI;
    sun.color.set(P.sunCol); sun.intensity = P.sunI;
    const dist = cam.position.distanceTo(target);
    let R = THREE.MathUtils.clamp(dist * 1.15 + 7, 12, 95); if (L === "golden") R = Math.max(R, 30);
    sun.position.copy(target).addScaledVector(sunDir, 220); sun.target.position.copy(target);
    const sc = sun.shadow.camera; sc.left = -R; sc.right = R; sc.top = R; sc.bottom = -R; sc.near = 20; sc.far = 480; sc.updateProjectionMatrix();
    sun.shadow.bias = P.bias; sun.shadow.normalBias = P.normalBias * (R / 12);
    TONE.uLitCol.value.set(...P.lit); TONE.uShadeCol.value.set(...P.shade); TONE.uShadeLift.value.set(...P.lift);
    TONE.uLambert.value = P.lambert; TONE.uSideK.value = P.sideK; TONE.uTerm.value = P.term; TONE.uBounce.value.set(...K.bounce); TONE.uSat.value = K.sat;
    CHAR.uCharTint.value.set(...P.charTint); CHAR.uCharShade.value = P.charShade; CHAR.uGrad.value = P.charGrad;
    CHAR.uBodyGrad.value = P.bodyGrad; CHAR.uSideTint.value.set(...P.sideTint);
    const su = (sky.material as THREE.ShaderMaterial).uniforms;
    K.sky.c.forEach((h, i) => untone(h, su["c" + i].value));
    const e = K.sky.e.map((deg) => THREE.MathUtils.degToRad(deg)); su.e.value.set(e[1], e[2], e[3], e[4]);
    sky.position.copy(cam.position);
    untone(P.fog, fog.color); fog.near = P.fogNear; fog.far = P.fogFar; scene.fog = o.fog === false ? null : fog; scene.background = null;
    disc.visible = halo.visible = L === "golden" || L === "night";   // the sun at golden hour, the moon at night
    (disc.material as THREE.SpriteMaterial).color.setRGB(...(L === "night" ? [2.2, 2.5, 3.0] as V3 : [6.0, 4.4, 2.4] as V3));
    if (disc.visible) {
      disc.position.copy(cam.position).addScaledVector(sunDir, 900); disc.scale.setScalar(2 * 900 * Math.tan(THREE.MathUtils.degToRad(1.7)));
      halo.position.copy(disc.position); halo.scale.setScalar(2 * 900 * Math.tan(THREE.MathUtils.degToRad(24)));
      (halo.material as THREE.SpriteMaterial).color.set(P.sunDisc).multiplyScalar(1.3);
    }
    for (let i = 0; i < clouds.length; i++) {
      const m = clouds[i]; m.lookAt(cam.position.x, m.position.y, cam.position.z); (m.material as THREE.MeshBasicMaterial).map = cloudMaps(L)[i % 4];
    }
  };
  // canvas angle the sun comes FROM on an upright card facing the camera, in 45-degree steps (small texture cache)
  const light2D = (mirror: boolean) => Math.round(Math.atan2(-sunDir.y, sunDir.dot(right) * (mirror ? -1 : 1)) / (Math.PI / 4)) * (Math.PI / 4);
  const contact = (x: number, y: number, z: number, sc: number) => {
    const hl = Math.hypot(sunDir.x, sunDir.z) || 1, ox = -sunDir.x / hl, oz = -sunDir.z / hl, rot = Math.atan2(-ox, -oz);
    if (L === "day") {   // by day cards cast no real shadow: a soft tail away from the sun
      const elv = Math.asin(Math.min(0.99, Math.max(0.1, sunDir.y)));
      const len = Math.min(2.4, Math.max(0.5, 1.6 / Math.tan(elv))) * sc, h = len + 0.55 * sc, c = 0.3 * h, tc = hexOf(TAIL, 1);
      cards.push({ key: `blob|shadow|${tc}`, cw: 128, ch: 256, draw: (p) => fxShadow(p, tc), at: [x + ox * c, y + 0.018, z + oz * c], w: 0.72 * sc, h, flat: true, rot });
    }
    const cc = hexOf(CONTACT[L], 1);
    cards.push({ key: `blob|contact|${cc}`, cw: 128, ch: 128, draw: (p) => fxContact(p, cc), at: [x + ox * 0.03 * sc, y + 0.022, z + oz * 0.03 * sc], w: 0.52 * sc, h: 0.4 * sc, flat: true, rot });
  };

  const st: Stage = {
    scene, cam, t: 0, sun: sunDir,
    add: (obj) => { scene.add(obj); return obj; },
    look(pos, tgt, fov = 40, roll = 0) {
      cam.position.set(...pos); cam.up.set(0, 1, 0); cam.fov = fov; cam.updateProjectionMatrix(); cam.lookAt(...tgt);
      if (roll) cam.rotateZ(THREE.MathUtils.degToRad(roll)); cam.updateMatrixWorld(true); target.set(...tgt);
    },
    light(name, lo = {}) { L = name; LO = lo; },
    dof(c, focus) { dofC = c; dofAt = focus ?? null; },
    person(p) { people.push(p); },
    card(c) { cards.push(c); },
    effect(kind, at, size, u) {
      const F = FX[kind], k = q(clamp01(u), 30);
      cards.push({ key: `${kind}${k}`, cw: F.cw, ch: F.ch, draw: (p) => F.draw(p, k), at, w: size, h: size * (F.ch / F.cw), flat: F.flat, soft: F.soft });
    },
    tick(t) { st.t = t; people = []; cards = []; dofC = 0; dofAt = null; },
    render() {
      applyLight();
      right.setFromMatrixColumn(cam.matrixWorld, 0);
      // characters: lit cards turned toward the camera (yaw only)
      let ai = 0;
      for (const p of people) {
        const [x, y, z] = p.at, sc = p.scale ?? 1;
        const d = cam.position.distanceTo(tmp.set(x, y + 1.2 * sc, z)) / sc, [cw, ch, k] = tier(d);
        let side = p.view === "side", mirror = !!p.mirror;
        if (p.walk && !p.view) {
          const tx = cam.position.x - x, tz = cam.position.z - z, tl = Math.hypot(tx, tz) || 1, wl = Math.hypot(...p.walk) || 1;
          side = (tx * p.walk[0] + tz * p.walk[1]) / (tl * wl) < 0.57; mirror = p.walk[0] * right.x + p.walk[1] * right.z < 0;
        }
        const flip = side && mirror, light = light2D(flip), lid = p.blink === false ? 0 : lidAt(st.t, p.id), seed = ((p.id * 5 + 3) % 7) + 1;
        let key: string, draw: (pen: Pen) => void;
        if ("draw" in p.who) { const W = p.who; key = `C|${W.key}|${q(light)}`; draw = (pen) => W.draw(pen, light); }
        else {
          const o = p.who, f2: FrontOpts = { ...p.front, light, seed, blink: p.front?.blink ?? lid }, s2: SideOpts = { ...p.side, light, seed, blink: p.side?.blink ?? lid };
          key = side ? `S|${fkey(o)}|${fkey(s2)}` : `F|${fkey(o)}|${fkey(f2)}`;
          draw = (pen) => (side ? bodySide(pen, o, s2) : bodyFront(pen, o, f2));
        }
        while (actors.length <= ai) actors.push(new Actor(scene));
        const a = actors[ai++];
        a.r = pool.req(key, cw, ch, k, draw);
        a.mesh.visible = true; a.mesh.position.set(x, y, z);
        a.mesh.rotation.set(0, Math.atan2(cam.position.x - x, cam.position.z - z), 0);
        a.mesh.scale.set(flip ? -sc : sc, sc, sc);
        a.mesh.castShadow = LIGHTS[L].actorShadow;
        if (p.shadow !== false) contact(x, y, z, sc);
      }
      for (let i = ai; i < actors.length; i++) actors[i].mesh.visible = false;
      // flat cards: effects, signs, contact shadows
      let fi = 0;
      for (const c of cards) {
        while (fxs.length <= fi) fxs.push(new Fx(scene));
        const e = fxs[fi++];
        e.r = pool.req(c.key, c.cw, c.ch, 1, c.draw); e.use(!!c.soft);
        e.mesh.visible = true; e.mesh.position.set(...c.at);
        if (c.flat) e.mesh.rotation.set(-Math.PI / 2, 0, c.rot ?? 0);
        else { e.mesh.quaternion.copy(cam.quaternion); e.mesh.rotateZ(c.rot ?? 0); }
        e.mesh.scale.set(c.w, c.h, 1);
      }
      for (let i = fi; i < fxs.length; i++) fxs[i].mesh.visible = false;
      pool.flush();
      for (let i = 0; i < ai; i++) actors[i].bind();
      for (let i = 0; i < fi; i++) fxs[i].bind();
      // lens: focus distance along the view axis
      cam.getWorldDirection(fwd);
      if (dofAt) tmp.set(...dofAt); else tmp.copy(target);
      post.lens.focus = Math.max(0.3, tmp.sub(cam.position).dot(fwd)); post.lens.cInf = dofC;
      gradeFor(post.grade, L);
      post.composer.setMainScene(scene); post.composer.setMainCamera(cam); post.ink.world = scene; post.ink.cam = cam;
      post.composer.render();
    },
  };
  w.present = () => st.render();
  return st;
};

/** one visual per shot over the same stage (like p3Shots): init builds the set once (the first time any shot is drawn),
 *  frame(t, u, shot, scene) poses it (u goes 0 -> 1 through the scene). Call st.light(...) and st.look(...) in frame. */
export const shots = <S extends { id: string }>(list: S[], init: (w: World) => Stage, frame: (t: number, u: number, shot: S, s: Scene) => void) => {
  let st: Stage | null = null; const out: Record<string, Visual> = {};
  for (const shot of list) out[shot.id] = { build(w) {
    const stg = st = st || init(w); w.present = () => stg.render();
    return (t) => { stg.tick(t); frame(t, clamp01((t - w.s.t0) / (w.s.t1 - w.s.t0)), shot, w.s); };
  } };
  defineVisuals(out);
};

// ---------------- world pieces ----------------
/** a two-tone painted material (every world surface uses one): a colour, or a canvas texture */
export const mat = (key: string, o: THREE.MeshLambertMaterialParameters | string) => lam(key, () => (typeof o === "string" ? { color: o } : o));
const GROUND = { grass: grassHD, cobble: cobbleHD, stone: () => stoneHD(), planks: planksHD };
/** painted ground: a square of `size` m centred at (x, z), texture tiled every `tile` m */
export const ground = (st: Stage, o: { kind?: keyof typeof GROUND; size?: number; tile?: number; at?: [number, number]; y?: number } = {}) => {
  const size = o.size ?? 400, tile = o.tile ?? 10, kind = o.kind ?? "grass";
  const m = mat(`ground_${kind}_${size}_${tile}`, { map: rep(GROUND[kind](), size / tile, size / tile) });
  const g = new THREE.Mesh(new THREE.PlaneGeometry(size, size).rotateX(-Math.PI / 2), m);
  g.position.set(o.at?.[0] ?? 0, o.y ?? 0, o.at?.[1] ?? 0); g.receiveShadow = true;
  return st.add(g);
};
/** pieces that never move go in a batch (one mesh per material: fast); build() puts them in the stage */
export const batch = () => new Batch();
export const build = (b: Batch, st: Stage) => b.build(st.scene);
/** gabled house with painted facade, windows, plinth, cornice and chimney; the front faces local +z (yaw turns it).
 *  w x d metres, wall height h (7 / 8.4 / 9.8 look right), style 0.. picks wall, shutters and roof */
export const house = (b: Batch, x: number, z: number, o: { yaw?: number; w?: number; d?: number; h?: number; style?: number; y?: number } = {}) =>
  houseB(b, x, z, o.yaw ?? 0, o.w ?? 8, o.d ?? 7, o.h ?? 7, o.style ?? 0, o.y ?? 0);
/** rounded storybook plant: round, fat, tall, cone, bush or hedge; base at (x, z), height h, seed for its shape */
export const tree = (b: Batch, x: number, z: number, o: { kind?: VegKind; h?: number; seed?: number; y?: number; detail?: number } = {}) =>
  addVeg(b, o.kind ?? "round", x, o.y ?? 0, z, o.h ?? 6, o.seed ?? x * 13 + z * 7, o.detail ?? 0);
/** a box of a two-tone material (walls, steps, crates, tables) from corner min to corner max, texture every `tile` m */
export const box = (b: Batch, m: THREE.Material, min: V3, max: V3, tile = 0) => b.add(boxGeo(V(...min), V(...max), tile, true), m);

// ---------------- time helpers (absolute video seconds, like the 3D library) ----------------
/** walk cycle phase for a character moving at `speed` m/s (2 steps per cycle, 0.8 m steps) */
export const walkPhase = (t: number, speed = 1.2) => (t * speed) / 1.6;
