#!/usr/bin/env node
// Copies the series' shared world (videos/turno-ep1/world-cartoon.ts + world.json) into another episode with its own
// name prefix, because every video's world shares one global scope in the type check (tm_ / TM_ -> t2_ / T2_ ...).
// The episode's visuals file is rewritten in place too (written with the tm_ names, it ends up with its own).
//   usage: node videos/turno-da-madrugada/tools/share-world.mjs videos/turno-ep2 2
import fs from 'node:fs';
import path from 'node:path';

const [dir, n] = process.argv.slice(2);
if (!dir || !n) { console.error('usage: share-world.mjs videos/<episode> <number>'); process.exit(2); }
const src = path.join(path.dirname(path.resolve(dir)), 'turno-ep1');
const swap = (s) => s.replace(/\btm_/g, `t${n}_`).replace(/\bTM_/g, `T${n}_`);
fs.writeFileSync(path.join(dir, 'world-cartoon.ts'), swap(fs.readFileSync(path.join(src, 'world-cartoon.ts'), 'utf8')));
fs.copyFileSync(path.join(src, 'world.json'), path.join(dir, 'world.json'));
const vis = path.join(dir, 'visuals-cartoon.ts');
if (fs.existsSync(vis)) fs.writeFileSync(vis, swap(fs.readFileSync(vis, 'utf8')));
console.error(`shared world -> ${dir} (prefix t${n}_)`);
