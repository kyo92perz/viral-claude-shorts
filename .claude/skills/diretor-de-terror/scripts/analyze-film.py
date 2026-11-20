#!/usr/bin/env python3
"""Watch a film analytically: cuts and shot lengths (editing rhythm), one frame per shot (composition), loudness over
time (silences before hits), brightness/saturation per shot (light and colour).
  usage: python3 analyze-film.py film.mp4 outdir [scene_threshold]
  threshold: 6 for animation and clean digital video, 9 for old or flickering film (fewer false cuts).
  Writes outdir/summary.json and outdir/sheet.jpg (one frame per shot, up to 60); prints the summary as JSON on stdout.
  Cached steps (cuts.txt, loud.txt, frames) are reused if the outdir already has them."""
import json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageStat

src, out = sys.argv[1], sys.argv[2]; thr = float(sys.argv[3]) if len(sys.argv) > 3 else 6
os.makedirs(out, exist_ok=True)
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout)

# ---- cuts ----
print(f'analyzing {src} ({dur:.0f} s): cuts...', file=sys.stderr)
cf = os.path.join(out, 'cuts.txt')
if not os.path.exists(cf):
    subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vf', f"scale=320:-2,scdet=threshold={thr},metadata=print:key=lavfi.scd.time:file={cf}", '-an', '-f', 'null', '-'], check=True)
cuts = [float(m) for m in re.findall(r'lavfi\.scd\.time=([0-9.]+)', open(cf).read())]
cuts = [c for i, c in enumerate(cuts) if i == 0 or c - cuts[i - 1] > 0.25]   # drop flicker double-hits
bounds = [0.0] + cuts + [dur]
shots = [(bounds[i], bounds[i + 1]) for i in range(len(bounds) - 1) if bounds[i + 1] - bounds[i] > 0.05]
lens = sorted(b - a for a, b in shots)
per_min = [sum(1 for a, b in shots if m * 60 <= a < (m + 1) * 60) for m in range(int(dur // 60) + 1)]

# ---- loudness (momentary, 100 ms) ----
print('loudness...', file=sys.stderr)
lf = os.path.join(out, 'loud.txt')
if not os.path.exists(lf):
    subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vn', '-af', f'ebur128=metadata=1,ametadata=print:key=lavfi.r128.M:file={lf}', '-f', 'null', '-'])
L = []
if os.path.exists(lf):
    txt = open(lf).read()
    for t, v in re.findall(r'pts_time:([0-9.]+)\s*\nlavfi\.r128\.M=(-?[0-9.inf]+)', txt):
        try: L.append((float(t), max(-70.0, float(v))))
        except ValueError: pass
hits = []   # a quiet stretch (>= 1.5 s under -32 LUFS) followed within 0.6 s by a jump of >= 14 LU
for i in range(len(L)):
    t, v = L[i]
    prev = [x for tt, x in L[max(0, i - 40):i] if t - tt <= 2.0]
    if len(prev) >= 15 and max(prev) < -32 and v - max(prev) >= 14 and (not hits or t - hits[-1] > 3): hits.append(round(t, 1))
quiet = sum(1 for t, v in L if v < -40) / max(1, len(L))

# ---- one frame per shot (sampled), light and colour ----
print('frames...', file=sys.stderr)
step = max(1, len(shots) // 60); sample = shots[::step][:60]; frames = []; stats = []
for i, (a, b) in enumerate(sample):
    fp = os.path.join(out, f'f{i:02d}.jpg')
    if not os.path.exists(fp):
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{(a + b) / 2:.2f}', '-i', src, '-frames:v', '1', '-vf', 'scale=240:-2', fp])
    if os.path.exists(fp):
        im = Image.open(fp).convert('RGB'); frames.append((im, a, b - a))
        hsv = im.convert('HSV'); stats.append((ImageStat.Stat(im.convert('L')).mean[0], ImageStat.Stat(hsv).mean[1]))
if frames:
    w, h = frames[0][0].size; cols = 10; rows = (len(frames) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * w, rows * (h + 16)), (12, 12, 12)); d = ImageDraw.Draw(sheet)
    for k, (im, a, l) in enumerate(frames):
        x, y = (k % cols) * w, (k // cols) * (h + 16); sheet.paste(im, (x, y + 16)); d.text((x + 3, y + 2), f'{int(a // 60)}:{int(a % 60):02d} {l:.1f}s', fill=(255, 220, 0))
    sheet.save(os.path.join(out, 'sheet.jpg'), quality=82)

spark = ''.join(' ▁▂▃▄▅▆▇█'[min(8, int(n / max(1, max(per_min)) * 8))] for n in per_min)
summary = {'file': os.path.basename(src), 'duration_s': round(dur, 1), 'shots': len(shots), 'avg_shot_s': round(dur / max(1, len(shots)), 2),
           'median_shot_s': round(lens[len(lens) // 2], 2) if lens else None, 'shortest_s': round(lens[0], 2) if lens else None, 'longest_s': round(lens[-1], 2) if lens else None,
           'shots_under_1s_pct': round(100 * sum(1 for l in lens if l < 1) / max(1, len(lens)), 1), 'shots_over_8s_pct': round(100 * sum(1 for l in lens if l > 8) / max(1, len(lens)), 1),
           'cuts_per_minute': per_min, 'pacing': spark, 'quiet_share_pct': round(100 * quiet, 1), 'silence_then_hit_s': hits[:40],
           'mean_brightness': round(sum(s[0] for s in stats) / max(1, len(stats)), 1), 'mean_saturation': round(sum(s[1] for s in stats) / max(1, len(stats)), 1)}
json.dump(summary, open(os.path.join(out, 'summary.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps(summary, ensure_ascii=False))
