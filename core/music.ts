#!/usr/bin/env node
// The soundtrack, synthesized in code and following the story (no third-party audio files).
//   usage: node core/music.ts videos/<topic> [--bpm 96] [--key D]
//   reads  scenes.json (with timings: run core/scenes.ts first):
//          each scene's "mood" (default: its type's) and "ambience", each key's "sfx", and the video's "music": { bpm, key }
//   writes videos/<topic>/music.wav (48 kHz stereo) and prints the score, scene by scene.
// How it follows the story (the vocabulary is in core/score.ts):
//   - every scene plays its mood (scale, chords, instruments, drums, brightness) over ONE shared tempo, so cuts don't stumble;
//     moods crossfade at the cuts;
//   - transitions follow the energy: rising into the next scene -> a riser that lands on an impact at the cut; falling -> a drop;
//     similar -> a soft swish;
//   - a short silence of the rhythm before every stat, then a hit (the number is the strong moment);
//   - each key's sfx sounds exactly at its word, and each scene's ambience plays under it.
// If you bring your own music, save it as videos/<topic>/own-music.wav and this step is skipped.
import fs from 'node:fs';
import path from 'node:path';
import type { Plan } from './types.ts';
import { MOODS, SCALES, TYPE_MOOD, type Mood, type Wave } from './score.ts';

const argv = process.argv.slice(2);
const opt = (k: string) => { const i = argv.indexOf(k); return i >= 0 ? argv.splice(i, 2)[1] : undefined; };
const bpmArg = opt('--bpm'), keyArg = opt('--key');
const DIR = argv[0];
if (!DIR) { console.error('usage: node core/music.ts videos/<topic> [--bpm 96] [--key D]'); process.exit(2); }
const VIDEO = path.resolve(DIR);
const E: Plan = JSON.parse(fs.readFileSync(path.join(VIDEO, 'scenes.json'), 'utf8'));
if (E.duration == null || E.scenes.some((s) => s.t0 == null)) { console.error('scenes.json has no timings: run node core/scenes.ts first'); process.exit(1); }
const BPM = Number(bpmArg ?? E.music?.bpm ?? 96);
const km = /^([A-G])(#|s|b)?$/.exec(keyArg ?? E.music?.key ?? 'D');
if (!km) { console.error('the key must be a note: C, D, Eb, F#…'); process.exit(1); }
const ROOT = 48 + { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[km[1] as 'C'] + (km[2] === '#' || km[2] === 's' ? 1 : km[2] === 'b' ? -1 : 0);   // C3 = 48
const SR = 48000, DUR = E.duration, N = Math.ceil(DUR * SR), TAU = 2 * Math.PI;
const L = new Float32Array(N), R = new Float32Array(N);

// deterministic: the same plan always gives the same audio
let seed = 1234567;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;
const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const osc = (w: Wave, ph: number) => w === 'sine' ? Math.sin(ph) : w === 'tri' ? 2 / Math.PI * Math.asin(Math.sin(ph)) : w === 'square' ? (Math.sin(ph) >= 0 ? 0.7 : -0.7) : 2 * ((ph / TAU) % 1) - 1;
// a sound from t0 for dur seconds: fn(u = seconds since t0, t = video seconds) -> sample; gate(t) fades it (scene crossfades)
function add(t0: number, dur: number, fn: (u: number, t: number) => number, vol: number, pan = 0, gate?: (t: number) => number) {
  const a = Math.max(0, Math.floor(t0 * SR)), b = Math.min(N, Math.floor((t0 + dur) * SR));
  const gl = vol * Math.cos((pan + 1) * Math.PI / 4), gr = vol * Math.sin((pan + 1) * Math.PI / 4);
  for (let i = a; i < b; i++) { const t = i / SR, v = fn(t - t0, t) * (gate ? gate(t) : 1); L[i] += v * gl; R[i] += v * gr; }
}

// ---- the scenes and their moods
const BEAT = 60 / BPM, S16 = BEAT / 4, BAR = 4 * BEAT, F = 0.15;   // F: crossfade at the cuts
const S = E.scenes.map((s, k) => { const name = s.mood && MOODS[s.mood] ? s.mood : TYPE_MOOD[s.type] ?? 'calm'; return { s, k, name, m: MOODS[name] }; });
const gateOf = (k: number) => { const a = k ? S[k].s.t0 : -9, b = k < S.length - 1 ? S[k].s.t1 : DUR + 9; return (t: number) => Math.min(clamp((t - a + F / 2) / F), clamp((b + F / 2 - t) / F)); };
// the silence before each stat: the rhythm stops 0.8 s before the number lands
const statTimes = E.scenes.filter((s) => s.stat).map((s) => (s.keys || []).find((k) => k.id === 'stat')?.t ?? s.t0 + 0.7);
const quiet = (t: number) => statTimes.some((x) => t > x - 0.8 && t < x);
const chord = (m: Mood, bar: number) => {
  const sc = SCALES[m.scale], d = m.prog[((bar % m.prog.length) + m.prog.length) % m.prog.length];
  const notes = [0, 2, 4].map((j) => { const i = d + j; return sc[i % 7] + 12 * Math.floor(i / 7); });
  if (m.dissonant) notes.push(notes[0] + 6);   // the tritone: unease
  return notes;
};

// ---- instruments
const kick = (t: number, v: number) => add(t, 0.4, (u) => Math.sin(TAU * (45 * u + (110 / 18) * (1 - Math.exp(-u * 18)))) * Math.exp(-u * 7), v);
const snare = (t: number, v: number) => add(t, 0.25, (u) => (noise() * 0.6 * Math.exp(-u * 18) + Math.sin(TAU * 185 * u) * 0.5 * Math.exp(-u * 25)), v * 0.6);
const hat = (t: number, v: number, pan: number) => { let y = 0; add(t, 0.08, (u) => { const n = noise(); y += 0.5 * (n - y); return (n - y) * Math.exp(-u * 60); }, v * 0.3, pan); };
const bell = (t: number, midi: number, v: number, pan: number, decay = 2.2) => add(t, 3, (u) => (Math.sin(TAU * hz(midi) * u) + 0.4 * Math.sin(TAU * hz(midi) * 2.01 * u) * Math.exp(-u * 3)) * Math.exp(-u * decay) * Math.min(1, u / 0.003), v, pan);
const swish = (t: number, v: number, len = 0.4) => { let y = 0; add(t - len * 0.65, len, (u) => { const c = 0.05 + 0.25 * Math.sin(Math.PI * u / len); y += c * (noise() - y); return y * Math.sin(Math.PI * u / len) ** 2; }, v, 0); };
const riser = (tEnd: number, len = 1.2, v = 0.35) => { let y = 0; add(tEnd - len, len, (u) => { const k = u / len; y += (0.02 + 0.3 * k * k) * (noise() - y); return (y * 0.8 + 0.25 * Math.sin(TAU * (300 * u + 600 * u * u / len))) * k * k; }, v); };
const impact = (t: number, v = 0.9) => { kick(t, v); let y = 0; add(t, 0.8, (u) => { y += 0.08 * (noise() - y); return y * Math.exp(-u * 5) * 2.5; }, v * 0.4); add(t, 1.4, (u) => Math.sin(TAU * (35 * u + (55 / 4) * (1 - Math.exp(-u * 4)))) * Math.exp(-u * 2.2), v * 0.6); };
const drop = (t: number, v = 0.3) => { let y = 0; add(t, 0.9, (u) => { y += (0.3 * Math.exp(-u * 4)) * (noise() - y); return y * Math.exp(-u * 3) + 0.3 * Math.sin(TAU * (500 * u - 200 * u * u)) * Math.exp(-u * 4); }, v); };

// ---- sound effects on keys (the names are documented in core/score.ts)
const SOUNDS: Record<string, (t: number) => void> = {
  whoosh: (t) => swish(t, 0.45, 0.45),
  hit: (t) => { kick(t, 0.6); add(t, 0.03, () => noise(), 0.15); },
  impact: (t) => impact(t, 0.9),
  pop: (t) => add(t, 0.12, (u) => Math.sin(TAU * (500 * u + 4000 * u * u)) * Math.exp(-u * 30), 0.25),
  tick: (t) => add(t, 0.05, (u) => (Math.sin(TAU * 2200 * u) + noise() * 0.3) * Math.exp(-u * 120), 0.25),
  riser: (t) => riser(t, 1.0, 0.3),
  shimmer: (t) => { const sc = SCALES.major; [0, 2, 4, 7].forEach((d, j) => bell(t + j * 0.06, ROOT + 24 + sc[d % 7] + 12 * Math.floor(d / 7), 0.06, j % 2 ? 0.3 : -0.3, 1.8)); },
  fail: (t) => { add(t, 0.25, (u) => osc('square', TAU * 392 * u) * Math.min(1, u / 0.01) * (1 - u / 0.25), 0.08); add(t + 0.27, 0.55, (u) => osc('square', TAU * (330 - 40 * u) * u + 0.15 * Math.sin(TAU * 6 * u)) * Math.min(1, u / 0.01) * (1 - u / 0.55), 0.08); },
  scratch: (t) => add(t, 0.3, (u) => (osc('saw', TAU * (900 * u - 1100 * u * u)) * 0.6 + noise() * 0.4) * Math.sin(Math.PI * u / 0.3), 0.14),
  zip: (t) => add(t - 0.05, 0.2, (u) => (Math.sin(TAU * (2600 * u - 5500 * u * u)) + noise() * 0.2) * Math.sin(Math.PI * u / 0.2), 0.12, 0),
  thump: (t) => add(t, 0.3, (u) => Math.sin(TAU * 75 * u) * Math.exp(-u * 14), 0.5),
  // horror kit
  knock: (t) => [0, 0.32, 0.64].forEach((d) => { add(t + d, 0.16, (u) => (Math.sin(TAU * 180 * u) * 0.7 + noise() * 0.5) * Math.exp(-u * 40), 0.55); add(t + d, 0.05, () => noise(), 0.12); }),
  crack: (t) => { for (let j = 0; j < 4; j++) add(t + j * 0.012, 0.04, (u) => noise() * Math.exp(-u * 90), 0.5 - j * 0.08); add(t, 0.12, (u) => Math.sin(TAU * 140 * u) * Math.exp(-u * 30), 0.35); },
  glass: (t) => { impact(t, 0.5); for (let j = 0; j < 18; j++) { const f = 2500 + rnd() * 5000, d = rnd() * 0.6; add(t + d, 0.25, (u) => Math.sin(TAU * f * u) * Math.exp(-u * 18), 0.05, rnd() * 1.6 - 0.8); } let y = 0; add(t, 0.5, (u) => { y += 0.5 * (noise() - y); return (noise() - y) * Math.exp(-u * 7); }, 0.4); },
  gun: (t) => { kick(t, 1); let y = 0; add(t, 1.2, (u) => { y += 0.3 * Math.exp(-u * 3) * (noise() - y); return (noise() * Math.exp(-u * 30) + y * 2 * Math.exp(-u * 3)); }, 0.7); },
  sting: (t) => { [0, 1, 6, 11].forEach((d, j) => add(t, 1.6, (u) => osc('saw', TAU * hz(ROOT + 12 + d) * u * (1 + 0.004 * Math.sin(TAU * 5 * u))) * Math.min(1, u / 0.02) * Math.exp(-u * 1.6), 0.07, j % 2 ? 0.4 : -0.4)); impact(t, 0.6); },
  scream: (t) => { for (let j = 0; j < 5; j++) { const f0 = 300 + rnd() * 500; add(t + j * 0.05, 1.3, (u) => (osc('saw', TAU * (f0 * u + 120 * Math.sin(TAU * 7 * u) / TAU)) * 0.5 + noise() * 0.5) * Math.sin(Math.PI * Math.min(1, u / 1.3)) * Math.exp(-u * 0.8), 0.06, rnd() * 1.6 - 0.8); } },
  buzz: (t) => add(t, 0.5, (u) => (osc('saw', TAU * 120 * u) * 0.5 + osc('square', TAU * 60 * u) * 0.3) * (Math.sin(TAU * 23 * u) > -0.2 ? 1 : 0) * Math.sin(Math.PI * u / 0.5), 0.1),
  off: (t) => { add(t, 0.6, (u) => osc('saw', TAU * (120 - 90 * u) * u) * Math.exp(-u * 6), 0.18); impact(t, 0.5); },
  siren: (t) => add(t, 3, (u) => Math.sin(TAU * (700 * u + 160 * Math.sin(TAU * 1.2 * u) / (TAU * 1.2))) * Math.min(1, u / 0.2) * Math.min(1, (3 - u) / 0.5), 0.12),
  boom: (t) => { impact(t, 1); let y = 0; add(t, 4, (u) => { y += 0.02 * (noise() - y); return y * 6 * Math.exp(-u * 0.9); }, 0.9); },
  heart: (t) => [0, 0.28, 0.9, 1.18].forEach((d, j) => add(t + d, 0.2, (u) => Math.sin(TAU * (j % 2 ? 48 : 55) * u) * Math.exp(-u * 18), 0.7)),
  static: (t) => { let y = 0; add(t, 1.1, (u) => { y += 0.6 * (noise() - y); return (noise() - y * 0.5) * Math.min(1, u / 0.01) * (u < 0.15 ? 1 : Math.exp(-(u - 0.15) * 3)) * (0.6 + 0.4 * (Math.sin(TAU * 31 * u) > 0 ? 1 : 0.3)); }, 0.35); },
  feedback: (t) => { add(t, 2.4, (u) => (osc('sine', TAU * (2400 + 300 * Math.sin(TAU * 3 * u)) * u) * 0.7 + osc('saw', TAU * 1200 * u) * 0.2) * Math.min(1, u / 0.3) * Math.min(1, (2.4 - u) / 0.3), 0.16); add(t, 2.4, (u) => osc('sine', TAU * 3600 * u) * Math.min(1, u / 0.6) * Math.min(1, (2.4 - u) / 0.3), 0.06, 0.3); },
  beep: (t) => [0, 0.18, 0.36, 0.9, 1.08, 1.26].forEach((d) => add(t + d, 0.12, (u) => osc('square', TAU * 2900 * u) * Math.min(1, u / 0.004) * Math.min(1, (0.12 - u) / 0.01), 0.07)),
  chop: (t) => { kick(t, 0.7); for (let j = 0; j < 3; j++) add(t + j * 0.008, 0.06, (u) => noise() * Math.exp(-u * 70), 0.45); add(t, 0.25, (u) => Math.sin(TAU * (210 - 90 * u) * u) * Math.exp(-u * 14), 0.4); add(t, 0.5, (u) => Math.sin(TAU * 1800 * u) * Math.exp(-u * 9), 0.05); },
  spark: (t) => { for (let j = 0; j < 22; j++) { const d = rnd() * 0.7; add(t + d, 0.03, (u) => noise() * Math.exp(-u * 150), 0.25 * rnd() + 0.08, rnd() * 1.4 - 0.7); } add(t, 0.8, (u) => osc('saw', TAU * 120 * u) * Math.exp(-u * 4) * (Math.sin(TAU * 40 * u) > 0 ? 1 : 0), 0.08); },
  creak: (t) => add(t, 0.9, (u) => osc('saw', TAU * (90 + 40 * Math.sin(TAU * 1.3 * u)) * u) * (0.5 + 0.5 * Math.sin(TAU * 23 * u)) * Math.sin(Math.PI * u / 0.9), 0.08),
  thud: (t) => { add(t, 0.5, (u) => Math.sin(TAU * (60 + 40 * Math.exp(-u * 20)) * u) * Math.exp(-u * 8), 0.8); let y = 0; add(t, 0.4, (u) => { y += 0.15 * (noise() - y); return y * Math.exp(-u * 10) * 3; }, 0.35); for (let j = 0; j < 6; j++) add(t + 0.05 + rnd() * 0.4, 0.05, (u) => noise() * Math.exp(-u * 60), 0.12); },
  click: (t) => { add(t, 0.03, (u) => noise() * Math.exp(-u * 200), 0.3); add(t + 0.035, 0.02, (u) => noise() * Math.exp(-u * 250), 0.18); },
  // a wolf howl: a sine that rises, holds with vibrato and falls (with an octave above, a bit of breath)
  howl: (t) => { let ph = 0; add(t, 2.6, (u) => { const f = u < 0.5 ? 320 + 300 * (u / 0.5) : u < 1.8 ? 620 + 18 * Math.sin(TAU * 5.5 * u) : 620 - 260 * ((u - 1.8) / 0.8); ph += TAU * f / 48000;
    return (Math.sin(ph) + 0.25 * Math.sin(2 * ph) + 0.04 * noise()) * Math.min(1, u / 0.25) * Math.min(1, (2.6 - u) / 0.5); }, 0.22); },
  // a low growl: filtered noise, rough amplitude
  growl: (t) => { let y = 0; add(t, 1.4, (u) => { y += 0.05 * (noise() - y); return y * 6 * (0.6 + 0.4 * Math.sin(TAU * 28 * u)) * Math.min(1, u / 0.1) * Math.min(1, (1.4 - u) / 0.3); }, 0.5); },
  // a church bell: inharmonic partials with a long decay
  bell: (t) => [[220, 1], [440 * 1.19, 0.5], [660 * 1.02, 0.35], [880 * 1.5, 0.2], [1100 * 1.3, 0.12]].forEach(([f, a]) => add(t, 3.5, (u) => Math.sin(TAU * f * u) * Math.exp(-u * (1.2 + f / 900)), 0.18 * a)),
  // a horse neigh: a fast tremolo on a falling-rising saw
  neigh: (t) => add(t, 1.6, (u) => osc('saw', TAU * (700 - 250 * Math.sin(Math.PI * u / 1.6)) * u) * (0.5 + 0.5 * Math.sin(TAU * 22 * u)) * Math.min(1, u / 0.08) * Math.min(1, (1.6 - u) / 0.4), 0.07),
  // a toilet flush: the lever clack, a rushing low noise that swells and drains, a few gurgles at the end
  flush: (t) => { SOUNDS.click(t); let y = 0; add(t + 0.05, 1.7, (u) => { y += 0.08 * (noise() - y); return y * 4 * Math.min(1, u / 0.15) * Math.exp(-Math.max(0, u - 0.5) * 2.2); }, 0.5);
    for (let j = 0; j < 5; j++) add(t + 1.0 + j * 0.13 + rnd() * 0.05, 0.09, (u) => Math.sin(TAU * (180 + 260 * u / 0.09) * u) * Math.sin(Math.PI * u / 0.09), 0.12); },
  // water (or blood) gushing from taps: a steady hiss that starts hard
  pour: (t) => { let y = 0; add(t, 2.4, (u) => { y += 0.35 * (noise() - y); return y * 2 * Math.min(1, u / 0.05) * Math.min(1, (2.4 - u) / 0.6); }, 0.3); },
};

// ---- ambience (under the scene, with its fades)
const AMB: Record<string, (t0: number, t1: number, g: (t: number) => number) => void> = {
  wind: (t0, t1, g) => { let y = 0; add(t0 - F, t1 - t0 + 2 * F, (u, t) => { y += 0.012 * (noise() - y); return y * (0.7 + 0.3 * Math.sin(TAU * 0.3 * t)); }, 1.6, -0.1, g); },
  forest: (t0, t1, g) => {
    AMB.wind(t0, t1, (t) => g(t) * 0.5);
    for (let t = t0 + 0.3 + rnd() * 0.5; t < t1 - 0.2; t += 0.6 + rnd() * 1.1) { const f = 3000 + rnd() * 1500, pan = rnd() * 1.4 - 0.7; for (const d of [0, 0.11]) add(t + d, 0.09, (u) => Math.sin(TAU * (f * u + 6000 * u * u)) * Math.sin(Math.PI * u / 0.09), 0.035, pan, g); }
  },
  crowd: (t0, t1, g) => { let a = 0, b = 0; add(t0 - F, t1 - t0 + 2 * F, (u, t) => { const n = noise(); a += 0.09 * (n - a); b += 0.012 * (n - b); return (a - b) * (1 + 0.3 * Math.sin(TAU * 3.1 * t) + 0.2 * Math.sin(TAU * 5.3 * t + 1)); }, 1.3, 0.1, g); },
  room: (t0, t1, g) => { let y = 0; add(t0 - F, t1 - t0 + 2 * F, () => { y += 0.004 * (noise() - y); return y; }, 2.2, 0, g); },
  hum: (t0, t1, g) => add(t0 - F, t1 - t0 + 2 * F, (u) => (Math.sin(TAU * 120 * u) * 0.6 + Math.sin(TAU * 240 * u) * 0.25 + Math.sin(TAU * 360 * u) * 0.1), 0.035, 0, g),
  drone: (t0, t1, g) => add(t0 - F, t1 - t0 + 2 * F, (u, t) => (Math.sin(TAU * hz(ROOT - 12) * u) + 0.6 * Math.sin(TAU * hz(ROOT - 11) * u + 0.3) + 0.3 * Math.sin(TAU * hz(ROOT - 6) * u)) * (0.75 + 0.25 * Math.sin(TAU * 0.13 * t)), 0.09, 0, g),
  heartbeat: (t0, t1, g) => { for (let t = t0; t < t1; t += 0.85) for (const d of [0, 0.25]) add(t + d, 0.2, (u) => Math.sin(TAU * (d ? 48 : 56) * u) * Math.exp(-u * 18), 0.5, 0, g); },
  night: (t0, t1, g) => {
    AMB.wind(t0, t1, (t) => g(t) * 0.35);
    for (let t = t0 + rnd() * 0.3; t < t1; t += 0.42 + rnd() * 0.25) { const f = 4200 + rnd() * 500, pan = rnd() * 1.2 - 0.6; for (let k = 0; k < 3; k++) add(t + k * 0.045, 0.03, (u) => Math.sin(TAU * f * u) * Math.sin(Math.PI * u / 0.03), 0.018, pan, g); }
  },
  static: (t0, t1, g) => { let y = 0; add(t0 - F, t1 - t0 + 2 * F, (u, t) => { y += 0.5 * (noise() - y); return (noise() - y) * (0.7 + 0.3 * Math.sin(TAU * 0.4 * t)); }, 0.05, 0, g); },
  powerline: (t0, t1, g) => add(t0 - F, t1 - t0 + 2 * F, (u, t) => (Math.sin(TAU * 60 * u) * 0.5 + Math.sin(TAU * 120 * u) * 0.35 + osc('saw', TAU * 180 * u) * 0.08) * (0.8 + 0.2 * Math.sin(TAU * 0.21 * t)), 0.05, 0, g),
  steps: (t0, t1, g) => { for (let t = Math.ceil(t0 / (BEAT / 2)) * (BEAT / 2), j = 0; t < t1; t += BEAT / 2, j++) add(t, 0.12, (u) => (Math.sin(TAU * 85 * u) * 0.8 + noise() * 0.15) * Math.exp(-u * 28), 0.22, j % 2 ? 0.2 : -0.2, g); },
};

// ---- render every scene with its mood
const score: string[] = [];
for (const { s, k, name, m } of S) {
  const g = gateOf(k), a = k ? s.t0 - F : 0, b = k < S.length - 1 ? s.t1 + F : DUR;
  const inScene = (t: number) => t >= s.t0 - 0.001 && t < s.t1;
  for (let bar = Math.floor(a / BAR); bar * BAR < b; bar++) {
    const tb = bar * BAR, notes = chord(m, bar);
    // pad: the chord held through the bar, filtered by the mood's brightness
    notes.forEach((n, j) => {
      const f = hz(ROOT + 12 + n), det = 1 + (j % 2 ? 0.003 : -0.003); let y = 0;
      add(tb, BAR + 0.4, (u) => { const env = Math.min(1, u / 0.25) * clamp((BAR + 0.4 - u) / 0.4); y += m.bright * (osc(m.padWave, TAU * f * det * u) - y); return env * y; }, m.pad, j % 2 ? 0.35 : -0.35, g);
    });
    // bass, arpeggio, drums and bells: notes that start inside the scene (and not in the silence before a stat)
    if (m.bass > 0) for (let j = 0; j < m.bassPerBar; j++) {
      const t = tb + j * BAR / m.bassPerBar, f = hz(ROOT - 12 + notes[0]), len = Math.min(BAR / m.bassPerBar, 0.7); let y = 0;
      if (inScene(t) && !quiet(t)) add(t, len, (u) => { y += 0.08 * (osc('tri', TAU * f * u) - y); return y * 3 * Math.exp(-u * 4) * Math.min(1, u / 0.006); }, m.bass, 0, g);
    }
    if (m.arp > 0) for (let j = 0; j < 4 * m.arp; j++) {
      const t = tb + j * BEAT / m.arp, f = hz(ROOT + 12 * m.arpOct + notes[j % notes.length] + 12);
      if (inScene(t) && !quiet(t)) add(t, 0.4, (u) => osc(m.arpWave, TAU * f * u) * Math.exp(-u * 9) * Math.min(1, u / 0.004), m.arpVol, j % 2 ? 0.3 : -0.3, g);
    }
    if (m.drums > 0) for (let i = 0; i < 16; i++) {
      const t = tb + i * S16; if (!inScene(t) || quiet(t)) continue;
      if (m.kick[i] === 'x') kick(t, 0.55 * m.drums);
      if (m.snare[i] === 'x') snare(t, 0.5 * m.drums);
      if (m.hat[i] === 'x') hat(t, 0.5 * m.drums, i % 2 ? 0.25 : -0.25);
    }
    if (m.bells > 0 && inScene(tb)) bell(tb, ROOT + 24 + notes[notes.length - 1], m.bells, 0.2);
  }
  // drone: a low root under the whole scene, breathing slowly
  if (m.drone > 0) { let y = 0; const f = hz(ROOT - 24 + chord(m, 0)[0]); add(a, b - a, (u, t) => { y += 0.03 * (osc('saw', TAU * f * u) - y); return (Math.sin(TAU * f * u) * 0.6 + y * 1.5) * (0.75 + 0.25 * Math.sin(TAU * 0.25 * t)); }, m.drone, 0, g); }
  for (const amb of s.ambience || []) AMB[amb]?.(s.t0, s.t1, g);
  // the transition INTO this scene follows the change of energy
  let into = '';
  if (k) {
    const dE = m.energy - S[k - 1].m.energy;
    if (name === 'silence') into = 'silence';
    else if (S[k - 1].name === 'silence') { if (dE >= 0.2) { impact(s.t0, 0.85); into = 'hit out of silence'; } else into = 'out of silence'; }
    else if (dE >= 0.2) { riser(s.t0); impact(s.t0, 0.7); into = 'riser + impact'; }
    else if (dE <= -0.2) { drop(s.t0); into = 'drop'; }
    else { swish(s.t0, 0.25); into = 'swish'; }
  }
  const sfx = (s.keys || []).filter((x) => x.sfx).map((x) => { SOUNDS[x.sfx!]?.(x.t); return `${x.sfx}@${x.t.toFixed(2)}`; });
  score.push(`  ${s.t0.toFixed(2).padStart(6)}–${s.t1.toFixed(2).padEnd(6)} ${s.id.padEnd(12)} ${name.padEnd(11)}${into ? ` in: ${into}` : ''}${s.ambience?.length ? `  amb: ${s.ambience.join('+')}` : ''}${sfx.length ? `  sfx: ${sfx.join(' ')}` : ''}`);
}
for (const t of statTimes) { impact(t, 0.8); SOUNDS.shimmer(t + 0.05); }
// outro: final fade
for (let i = Math.max(0, N - SR); i < N; i++) { const g = (N - i) / SR; L[i] *= g; R[i] *= g; }
// to 16-bit WAV (with a soft limiter)
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(Math.tanh(L[i]) * 32000), 44 + i * 4); buf.writeInt16LE(Math.round(Math.tanh(R[i]) * 32000), 46 + i * 4); }
fs.writeFileSync(path.join(VIDEO, 'music.wav'), buf);
console.log(`music.wav: ${DUR.toFixed(2)} s, ${BPM} BPM in ${km[0]}, ${statTimes.length} stat hit(s)`);
for (const line of score) console.log(line);
