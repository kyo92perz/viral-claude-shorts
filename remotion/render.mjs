#!/usr/bin/env node
// Post-production pass with Remotion over a finished video.
//   node remotion/render.mjs videos/<topic> [--captions] [--from S] [--to S] [--out file.mp4] [--no-subscribe]
// Reads  videos/<topic>/final.mp4 (+ words.json, descricao-youtube.txt chapters, optional edits.json)
// Writes videos/<topic>/final-editado.mp4 (or --out). Status on stderr, a JSON summary on stdout.
// Automatic edits: a "DIA N" stinger + punch zoom where the narration says "Dia N", the chapter bar from the
// description's timestamps, a subscribe pop. edits.json can add/replace: { punches:[{t,scale}], stingers:[{t,text,sub}],
// chapters:[{t,title}], subscribe: seconds|null, captions: bool, brand: "IMAGINA SÓ", auto: false }
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2), flag = (k) => argv.includes(k), opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
if (!argv[0] || argv[0].startsWith("--")) { console.error("usage: node remotion/render.mjs videos/<topic> [--captions] [--from S] [--to S] [--out file.mp4]"); process.exit(2); }
const dir = path.resolve(argv[0]), src = path.join(dir, "final.mp4");
if (!fs.existsSync(src)) { console.error(`there is no ${path.join(argv[0], "final.mp4")} (render the video first)`); process.exit(1); }
const out = path.resolve(opt("--out") ?? path.join(dir, "final-editado.mp4"));
const log = (...a) => console.error("[edit]", ...a);

// the source video
const [w, h, rate] = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v", "-show_entries", "stream=width,height,r_frame_rate", "-of", "csv=p=0", src]).toString().trim().split(",");
const fps = Math.round(eval(rate)), duration = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]).toString().trim();
const read = (f) => (fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), "utf8") : null);
const words = JSON.parse(read("words.json") ?? '{"words":[]}').words ?? [];
const E = JSON.parse(read("edits.json") ?? "{}");

// automatic stingers: "Dia N" at the start of a sentence; the sub line is the short phrase after it ("Seis metros.")
const stingers = [], punches = [];
if (E.auto !== false) for (let i = 0; i < words.length - 1; i++) {
  const a = words[i].w, b = words[i + 1].w.replace(/[^\d]/g, "");
  if (!/^Dia$/.test(a) || !b) continue;
  if (stingers.length && words[i].t0 - stingers.at(-1).t < 4) continue;
  let sub = [], j = i + 2; const endsB = /[.!?]$/.test(words[i + 1].w);
  for (; j < words.length && sub.length < 5; j++) { sub.push(words[j].w); if (/[.!?]$/.test(words[j].w)) break; }
  const subTxt = endsB && sub.length <= 3 && /[.!?]$/.test(sub.at(-1) ?? "") ? sub.join(" ").replace(/[.!?]$/, "").toUpperCase() : undefined;
  stingers.push({ t: +words[i].t0.toFixed(2), text: `DIA ${b}`, sub: subTxt });
  punches.push({ t: +words[i].t0.toFixed(2), scale: 1.1 });
}
// chapters from the description ("1:15 Title")
const chapters = [];
for (const line of (read("descricao-youtube.txt") ?? "").split("\n")) { const m = line.match(/^(\d+):(\d\d)\s+(.+)$/); if (m) chapters.push({ t: +m[1] * 60 + +m[2], title: m[3].trim() }); }
const props = {
  video: "final.mp4", width: +w, height: +h, fps, duration: +duration.toFixed(3), font: "font.ttf", words,
  captions: E.captions ?? flag("--captions"),
  punches: E.punches ?? punches, stingers: E.stingers ?? stingers, chapters: E.chapters ?? chapters,
  subscribe: flag("--no-subscribe") ? null : E.subscribe !== undefined ? E.subscribe : Math.min(60, duration * 0.3), brand: E.brand,
};
log(`${path.basename(dir)}: ${w}x${h} ${fps} fps ${duration.toFixed(1)} s, ${props.stingers.length} stingers, ${props.chapters.length} chapters, captions ${props.captions ? "on" : "off"}`);

// public dir: hard links to the video and the caption font (no copies of big files)
const pub = path.join(here, "out", "public-" + path.basename(dir)); fs.rmSync(pub, { recursive: true, force: true }); fs.mkdirSync(pub, { recursive: true });
const link = (a, b) => { try { fs.linkSync(a, b); } catch { fs.copyFileSync(a, b); } };
link(src, path.join(pub, "final.mp4"));
const font = [path.join(here, "fonts", "ArchivoBlack.ttf")].find((f) => fs.existsSync(f));
if (font) link(font, path.join(pub, "font.ttf")); else delete props.font;
fs.mkdirSync(path.join(pub, "sfx"));
for (const f of fs.readdirSync(path.join(here, "public", "sfx"))) link(path.join(here, "public", "sfx", f), path.join(pub, "sfx", f));

const browserExecutable = process.env.REMOTION_CHROME ?? ["/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell"].find((f) => fs.existsSync(f)) ?? null;
log("bundling…");
const serveUrl = await bundle({ entryPoint: path.join(here, "src", "index.ts"), publicDir: pub });
const comp = await selectComposition({ serveUrl, id: "Edicao", inputProps: props, browserExecutable });
const from = opt("--from"), to = opt("--to");
const frameRange = from || to ? [Math.round((+from || 0) * fps), Math.min(comp.durationInFrames - 1, Math.round((+to || duration) * fps) - 1)] : null;
let last = -1;
await renderMedia({ composition: comp, serveUrl, codec: "h264", outputLocation: out, inputProps: props, browserExecutable, frameRange, crf: 18, audioBitrate: "192k",
  concurrency: Number(process.env.REMOTION_CONCURRENCY ?? 2),
  onProgress: ({ progress }) => { const p = Math.floor(progress * 100); if (p !== last && p % 5 === 0) { last = p; log(`${p}%`); } } });
fs.rmSync(pub, { recursive: true, force: true });
console.log(JSON.stringify({ out, stingers: props.stingers.length, chapters: props.chapters.length, captions: props.captions }));
