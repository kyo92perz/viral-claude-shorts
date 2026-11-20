// Light presets per time of day. The sun is CAMERA-RELATIVE and frozen per shot (world.ts update()):
// az = degrees from the shot camera's forward axis (0 = sun straight ahead = backlight, +90 = screen right,
// 180 = behind camera), el = elevation. lit/shade/lift are LINEAR RGB multipliers for shade.ts (may exceed 1).
// Field names follow lighting.md 9.1 exactly (the CHAR and POST agents read them); values are tuned on renders.
type C3 = [number, number, number];
export type LightPreset = {
  az: number; el: number;
  lit: C3; shade: C3; lift: C3; lambert: number; sideK: number; term: number;      // world two-tone (shade.ts)
  charTint: C3; charShade: number; charGrad: number; bodyGrad: number; sideTint: C3; // character cards (cast.ts)
  blob: C3; actorShadow: boolean;                                                    // contact blobs / card shadows
  top: string; hor: string; skyCurve: C3; fog: string; fogNear: number; fogFar: number; sunDisc: string; // depth.md 6.5
  sunCol: string; sunI: number; sky: string; ground: string; hemiI: number;         // three lights (unpatched mats only)
  bias: number; normalBias: number;
};
export type LightName = "day" | "golden" | "night" | "store" | "blackout" | "emergency";
const NIGHT_BASE = {
  lambert: 0.35, sideK: 0.84, bodyGrad: 0.28, blob: [0.35, 0.36, 0.48] as C3, actorShadow: false,
  skyCurve: [0.0, 0.5, 0.6] as C3, sunDisc: "#cfe0ff", ground: "#141018", bias: -0.00025, normalBias: 0.015,
};
export const LIGHTS: Record<LightName, LightPreset> = {
  day: {
    az: 75, el: 48,
    lit: [1.58, 1.5, 1.33], shade: [0.3, 0.29, 0.36], lift: [0.05, 0.06, 0.11], lambert: 0.35, sideK: 0.84, term: 0.2,
    charTint: [1.0, 0.94, 0.92], charShade: 0.86, charGrad: 0.07, bodyGrad: 0.2, sideTint: [0.92, 0.90, 0.96],
    blob: [0.62, 0.58, 0.58], actorShadow: false,
    top: "#3e7fd2", hor: "#b8d0ec", skyCurve: [0.0, 0.5, 0.6], fog: "#b8d0ec", fogNear: 25, fogFar: 300, sunDisc: "#000000",
    sunCol: "#fff3e0", sunI: 2.8, sky: "#dcecff", ground: "#b49a78", hemiI: 0.55,
    bias: -0.00025, normalBias: 0.015,
  },
  golden: {
    az: 6, el: 7,
    lit: [1.5, 0.68, 0.24], shade: [0.15, 0.15, 0.3], lift: [0.04, 0.06, 0.17], lambert: 0.35, sideK: 0.82, term: 0.07,
    charTint: [1.0, 0.78, 0.56], charShade: 0.88, charGrad: 0.1, bodyGrad: 0.25, sideTint: [0.85, 0.80, 0.95],
    blob: [0.75, 0.74, 0.9], actorShadow: true,
    top: "#6a4f8c", hor: "#ffd08a", skyCurve: [0.05, 0.6, 1.0], fog: "#efb489", fogNear: 50, fogFar: 380, sunDisc: "#ffcf9e",
    sunCol: "#ffab5e", sunI: 5.5, sky: "#d8b0b8", ground: "#8a6a60", hemiI: 0.5,
    bias: -0.0006, normalBias: 0.03,
  },
  // horror nights (added for the night-shift series): cool moonlight through a thick fog, readable faces
  night: { ...NIGHT_BASE, az: 60, el: 34,
    lit: [0.66, 0.78, 1.12], shade: [0.07, 0.08, 0.15], lift: [0.02, 0.03, 0.08], term: 0.15,
    charTint: [0.8, 0.86, 1.0], charShade: 0.8, charGrad: 0.1, sideTint: [0.78, 0.82, 1.0],
    top: "#05070f", hor: "#1b2236", fog: "#252d42", fogNear: 9, fogFar: 75,
    sunCol: "#9fb6ff", sunI: 1.2, sky: "#2a3550", hemiI: 0.35 },
  // inside the store at night: buzzing fluorescent tubes, a sick green-white, the windows black
  store: { ...NIGHT_BASE, az: 20, el: 70,
    lit: [1.22, 1.3, 1.12], shade: [0.2, 0.23, 0.26], lift: [0.03, 0.05, 0.05], term: 0.2,
    charTint: [0.97, 1.0, 0.93], charShade: 0.84, charGrad: 0.08, sideTint: [0.9, 0.95, 0.9],
    top: "#020306", hor: "#0b0f17", fog: "#0b0f17", fogNear: 14, fogFar: 60,
    sunCol: "#e8ffe8", sunI: 2.0, sky: "#dfe8dc", hemiI: 0.5 },
  // the power is gone: barely-there blue, black shadows (flashlights and flares do the rest)
  blackout: { ...NIGHT_BASE, az: 50, el: 40,
    lit: [0.3, 0.36, 0.58], shade: [0.025, 0.025, 0.05], lift: [0.01, 0.012, 0.03], term: 0.12,
    charTint: [0.6, 0.66, 0.9], charShade: 0.7, charGrad: 0.14, sideTint: [0.6, 0.64, 0.9],
    top: "#010204", hor: "#070a12", fog: "#070a12", fogNear: 5, fogFar: 40,
    sunCol: "#7f93d6", sunI: 0.6, sky: "#1a2238", hemiI: 0.2 },
  // emergency light: red strobing exit lamps, deep crimson shadows
  emergency: { ...NIGHT_BASE, az: 35, el: 50,
    lit: [1.15, 0.42, 0.38], shade: [0.1, 0.04, 0.05], lift: [0.04, 0.0, 0.01], term: 0.15,
    charTint: [1.0, 0.7, 0.66], charShade: 0.78, charGrad: 0.12, sideTint: [0.95, 0.5, 0.5],
    top: "#080102", hor: "#1c0406", fog: "#1c0406", fogNear: 6, fogFar: 45,
    sunCol: "#ff4a3a", sunI: 1.6, sky: "#5a1414", hemiI: 0.3 },
};

/** world-only look per light (sky stops by elevation in degrees, river colours, cloud palette). All colours are
 *  ON-SCREEN targets under the current PBR-Neutral tone map; world.ts pre-inverts the tone map (shade.ts untone). */
export type WorldLook = {
  sky: { c: string[]; e: number[] };                         // 5 stops: c[i] at elevation e[i] (deg), smoothstep between
  water: { near: string; mid: string; far: string; crest: string; trough: string; glint: string; shade: C3 };
  bounce: C3;                                                 // shade.ts uBounce: albedo x bounce on shaded faces turned to the lens
  sat: number;                                                // shade.ts uSat: world albedo saturation (1 = as painted)
  cloud: { lit: string; mid: string; shade: string };
};
const NIGHT_WATER = { near: "#0c1626", mid: "#0a1220", far: "#1a2236", crest: "#3a4866", trough: "#05080f", glint: "#cfe0ff", shade: [0.4, 0.44, 0.6] as C3 };
const NIGHT_CLOUD = { lit: "#4c5672", mid: "#323a52", shade: "#1e2436" };
export const LOOK: Record<LightName, WorldLook> = {
  day: {
    // depth.md 2.2: horizon #9fb6e6 just above the skyline, upper sky #5e93d9 at ~20 deg (grade: frame top #5997e2)
    sky: { c: ["#b8d0ec", "#9cbfea", "#6a9fe0", "#4f8cdb", "#3373cc"], e: [0, 3, 8, 16, 40] },
    water: { near: "#22a7b6", mid: "#167fb2", far: "#1a5596", crest: "#7ddfe8", trough: "#0e4a80", glint: "#ffffff", shade: [0.5, 0.56, 0.72] },
    cloud: { lit: "#fbf8f1", mid: "#e1e5f3", shade: "#c3cbe9" },
    bounce: [0, 0, 0],
    sat: 1.08,
  },
  golden: {
    // sunset, not dusk: #ffd08a horizon, peach/orange through ~10 deg, warm rose at 20, muted warm mauve only near the top
    // (the golden grade adds ~+11/255 blue to shadows/mids, so these lean warm)
    sky: { c: ["#ffc47c", "#f7ae78", "#e8967c", "#c4848e", "#8a6f8a"], e: [0, 4, 10, 20, 40] },
    water: { near: "#1e3a6e", mid: "#355f96", far: "#d4a48e", crest: "#d9a088", trough: "#16294f", glint: "#ffe2b0", shade: [0.42, 0.46, 0.72] },
    cloud: { lit: "#ffd2a8", mid: "#f2a08f", shade: "#a98fc4" },
    bounce: [0.04, 0.02, 0.0],
    sat: 1.1,
  },
  night: { sky: { c: ["#2b3550", "#1d2540", "#121a30", "#0b1122", "#060a16"], e: [0, 3, 8, 16, 40] }, water: NIGHT_WATER, cloud: NIGHT_CLOUD, bounce: [0, 0, 0], sat: 0.85 },
  store: { sky: { c: ["#0b0f17", "#080b12", "#05070c", "#030409", "#020306"], e: [0, 3, 8, 16, 40] }, water: NIGHT_WATER, cloud: NIGHT_CLOUD, bounce: [0, 0, 0], sat: 0.9 },
  blackout: { sky: { c: ["#0a0e18", "#070a12", "#05070d", "#03050a", "#010204"], e: [0, 3, 8, 16, 40] }, water: NIGHT_WATER, cloud: { lit: "#1c2130", mid: "#141824", shade: "#0c0f18" }, bounce: [0, 0, 0], sat: 0.8 },
  emergency: { sky: { c: ["#2a0608", "#1c0406", "#120204", "#0a0102", "#050001"], e: [0, 3, 8, 16, 40] }, water: NIGHT_WATER, cloud: { lit: "#40141a", mid: "#2a0c10", shade: "#160608" }, bounce: [0.02, 0, 0], sat: 1.0 },
};
