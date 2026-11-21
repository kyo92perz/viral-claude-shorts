// One video at a time per style: every style builds into its single project/ folder, so two commands running at the
// same time (a render and a storyboard, say) would overwrite each other's scenes and the render would come out wrong.
// holdProject(dir, video) claims the folder for this process; if another live process holds it, it waits until it's free.
// The claim is released when this process exits.
import fs from 'node:fs';
import path from 'node:path';

const alive = (pid: number) => { try { process.kill(pid, 0); return true; } catch (e) { return (e as NodeJS.ErrnoException).code === 'EPERM'; } };
const nap = (ms: number) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

const held = new Set<string>();
export function holdProject(dir: string, video: string) {
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, '.owner');
  for (let warned = false; ;) {
    let o: { pid: number; video: string } | null = null;
    try { o = JSON.parse(fs.readFileSync(f, 'utf8')); } catch { /* free */ }
    if (!o || o.pid === process.pid || !alive(o.pid)) break;
    if (!warned) { console.error(`waiting: ${path.basename(o.video)} is using ${path.relative(process.cwd(), dir) || dir} (one video at a time per style)`); warned = true; }
    nap(2000);
  }
  fs.writeFileSync(f, JSON.stringify({ pid: process.pid, video }));
  if (held.has(f)) return; held.add(f);
  process.once('exit', () => { try { if (JSON.parse(fs.readFileSync(f, 'utf8')).pid === process.pid) fs.rmSync(f); } catch { /* gone */ } });
}
