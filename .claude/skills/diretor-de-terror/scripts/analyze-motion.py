#!/usr/bin/env python3
"""Watch how a film MOVES: how many new drawings per second it shows (ones / twos / threes), how much of it is held
still (poses), where the motion peaks (action) and a filmstrip of consecutive frames at those peaks (spacing, smears,
squash and stretch, impact frames).
  usage: python3 analyze-motion.py film.mp4 outdir [max_minutes] [start_s]
  Writes outdir/motion.json and outdir/strips.jpg (8 consecutive frames at each of the top motion peaks); prints the
  summary as JSON on stdout. max_minutes (default 20) caps how much of a long film is read; start_s skips a live-action prologue or titles.
How it decides: frames are compared at 48x27 px in grey (area-averaged); a frame is a NEW drawing when it differs from the previous one by
more than the film's own noise floor
(compression noise, film grain) and than 45% of the change around it, otherwise it is a repeat. Runs of repeats give the "on twos /
threes" rhythm. 30 fps sources with pulldown show extra repeats (ignore 'on 1s' vs 'on 2s' for them)."""
import json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw

src, out = sys.argv[1], sys.argv[2]; max_min = float(sys.argv[3]) if len(sys.argv) > 3 else 20
start = float(sys.argv[4]) if len(sys.argv) > 4 else 0
os.makedirs(out, exist_ok=True)
probe = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate:format=duration',
                        '-of', 'json', src], capture_output=True, text=True).stdout
pj = json.loads(probe); num, den = pj['streams'][0]['r_frame_rate'].split('/'); fps = float(num) / float(den)
dur = min(float(pj['format']['duration']) - start, max_min * 60)
W, H = 48, 27      # area-averaged: blurs film grain and compression noise, keeps the drawing
print(f'reading {src}: {dur:.0f} s at {fps:.2f} fps...', file=sys.stderr)
p = subprocess.Popen(['ffmpeg', '-v', 'error', '-ss', str(start), '-t', str(dur), '-i', src, '-vf', f'scale={W}:{H}:flags=area,format=gray', '-f', 'rawvideo', '-'],
                     stdout=subprocess.PIPE)
diffs = []; prev = None
while True:
    buf = p.stdout.read(W * H)
    if len(buf) < W * H: break
    f = np.frombuffer(buf, np.uint8).astype(np.int16)
    diffs.append(0.0 if prev is None else float(np.abs(f - prev).mean())); prev = f
p.wait()
d = np.array(diffs); n = len(d)
if n < 10: sys.exit('could not read frames')
# a frame is a NEW drawing when it differs more than the noise floor (2.5x the quietest 5% of differences: compression
# noise or film grain between two photos of the same drawing) AND more than 45% of the typical change around it (so the
# low beats of "on twos" read as repeats even in grainy film)
floor = max(0.06, 2.5 * float(np.percentile(d[1:], 5)))
pad = np.pad(d, 12, mode='edge'); local = np.array([np.percentile(pad[i:i + 25], 75) for i in range(n)])
new = (d > floor) & (d > 0.45 * local)
cut = d > max(20.0, float(np.percentile(d, 99.5)))     # a cut, not motion
moving = new & ~cut
# runs: how many frames each drawing stays on screen, only inside moving stretches (holds of >= 0.5 s are poses)
runs = []; r = 1
for i in range(1, n):
    if new[i]: runs.append(r); r = 1
    else: r += 1
runs.append(r)
hold_frames = sum(x for x in runs if x >= fps * 0.5)
anim_runs = [x for x in runs if x < fps * 0.5]
hist = {f'on_{k}s': round(100 * sum(1 for x in anim_runs if x == k) / max(1, len(anim_runs)), 1) for k in (1, 2, 3)}
hist['on_4plus_s'] = round(100 - sum(hist.values()), 1)
# drawings per second and motion energy per second
sec = int(n // fps)
dps = [int(new[int(s * fps):int((s + 1) * fps)].sum()) for s in range(sec)]
energy = [float(np.clip(d[int(s * fps):int((s + 1) * fps)], 0, 20).mean()) for s in range(sec)]
emax = max(energy) or 1
spark = ''.join(' ▁▂▃▄▅▆▇█'[min(8, int(e / emax * 8))] for e in energy[:: max(1, sec // 80)])
# the motion peaks (seconds with most energy, at least 8 s apart, no cuts inside)
order = sorted(range(sec), key=lambda s: -energy[s]); peaks = []
for s in order:
    if all(abs(s - q) >= 8 for q in peaks) and not cut[int(s * fps):int((s + 1) * fps)].any(): peaks.append(s)
    if len(peaks) == 4: break
rows = []
for s in peaks:
    i0 = int(s * fps + fps / 2) - 4; strip = []
    for k in range(8):
        t = start + (i0 + k) / fps; fp = os.path.join(out, f'p{s}_{k}.jpg')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.3f}', '-i', src, '-frames:v', '1', '-vf', 'scale=200:-2', fp])
        if os.path.exists(fp): strip.append(Image.open(fp).convert('RGB'))
    if strip: rows.append((s, strip))
if rows:
    w, h = rows[0][1][0].size; sheet = Image.new('RGB', (8 * w, len(rows) * (h + 16)), (12, 12, 12)); dr = ImageDraw.Draw(sheet)
    for j, (s, strip) in enumerate(rows):
        T = int(start + s); dr.text((3, j * (h + 16) + 2), f'{T // 60}:{T % 60:02d} - 8 consecutive frames', fill=(255, 220, 0))
        for k, im in enumerate(strip): sheet.paste(im.resize((w, h)), (k * w, j * (h + 16) + 16))
    sheet.save(os.path.join(out, 'strips.jpg'), quality=85)
summary = {'file': os.path.basename(src), 'fps': round(fps, 3), 'seconds_read': round(n / fps, 1), 'noise_floor': round(floor, 2),
           'new_drawings_per_s_median': float(np.median(dps)) if dps else 0, 'new_drawings_per_s_in_action': float(np.percentile(dps, 90)) if dps else 0,
           'held_share_pct': round(100 * hold_frames / n, 1), 'timing_while_moving_pct': hist,
           'motion_energy': spark, 'motion_peaks_s': [round(start + q) for q in peaks]}
json.dump(summary, open(os.path.join(out, 'motion.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps(summary, ensure_ascii=False))
