#!/usr/bin/env python3
"""Listen to a voice with numbers: how much the pitch moves (melody = expressiveness), how fast it speaks, how it uses
pauses, how much the loudness varies (dynamics) and how bright or dark it sounds. Use it to compare a generated voice
with a performance you like, or two takes of the same line.
  usage: python3 analyze-voice.py audio_or_video [start_s] [length_s]
  Prints JSON on stdout. Best on clean dialogue; music and effects under the voice blur the pitch numbers.
Reading the numbers:
  pitch_range_st  semitones between the 10th and 90th percentile of the voiced pitch. Flat reads ~3-5 st, lively
                  acting 8-14 st, shouting or cartoon voices more.
  pitch_move_st   median jump of the melody from one syllable-sized step to the next (bigger = more animated).
  syllables_per_s speaking rate while talking (Portuguese conversation is usually ~5-7; dread lines slower).
  pauses          gaps of >= 0.25 s inside the stretch: count, median and the longest (a pause is a performance)."""
import json, subprocess, sys
import numpy as np

src = sys.argv[1]; ss = float(sys.argv[2]) if len(sys.argv) > 2 else 0; ln = float(sys.argv[3]) if len(sys.argv) > 3 else 0
SR = 16000
cmd = ['ffmpeg', '-v', 'error', '-ss', str(ss)] + (['-t', str(ln)] if ln else []) + ['-i', src, '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
x = np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32).astype(np.float64)
if len(x) < SR // 3: sys.exit('too little audio')
hop, win = SR // 100, SR // 25                  # 10 ms hop, 40 ms window
nf = (len(x) - win) // hop
frames = np.lib.stride_tricks.sliding_window_view(x, win)[::hop][:nf]
rms = np.sqrt((frames ** 2).mean(1) + 1e-12); db = 20 * np.log10(rms + 1e-9)
ref = np.percentile(db, 95)
speech = db > ref - 30                          # within 30 dB of the loud parts
# smooth the speech mask: fill gaps < 0.25 s, drop blips < 0.1 s
def runs(mask):
    out, start = [], None
    for i, v in enumerate(list(mask) + [False]):
        if v and start is None: start = i
        if not v and start is not None: out.append((start, i)); start = None
    return out
for a, b in runs(~speech):
    if b - a < 25 and a > 0 and b < nf: speech[a:b] = True
for a, b in runs(speech):
    if b - a < 10: speech[a:b] = False
segs = runs(speech)
pauses = []
for (a1, b1), (a2, b2) in zip(segs, segs[1:]):
    g = (a2 - b1) / 100
    if g >= 0.25: pauses.append(g)
talk_s = speech.sum() / 100
# pitch by normalised autocorrelation (60-500 Hz) on speech frames
lo, hi = SR // 500, SR // 60
f0 = np.full(nf, np.nan)
spec = np.fft.rfft(frames * np.hanning(win), n=2 * win)
ac = np.fft.irfft(np.abs(spec) ** 2)[:, :hi + 1]
ac = ac / (ac[:, :1] + 1e-12)
for i in np.nonzero(speech)[0]:
    seg = ac[i, lo:hi + 1]; k = int(np.argmax(seg))
    if seg[k] > 0.45: f0[i] = SR / (lo + k)
v = f0[~np.isnan(f0)]
st = 12 * np.log2(v / np.median(v)) if len(v) > 20 else np.array([0.0])
# melody movement: median absolute change between 100 ms steps of the voiced pitch
step = f0[::10]; step = step[~np.isnan(step)]
move = np.abs(np.diff(12 * np.log2(step))) if len(step) > 3 else np.array([0.0])
# syllables: peaks of the smoothed loudness envelope inside speech, at least 0.1 s apart and 4 dB above the dip before
env = np.convolve(db, np.ones(5) / 5, mode='same'); syl = 0; last = -100; dip = env[0]
for i in range(1, nf - 1):
    dip = min(dip, env[i])
    if speech[i] and env[i] >= env[i - 1] and env[i] > env[i + 1] and env[i] - dip > 4 and i - last >= 10:
        syl += 1; last = i; dip = env[i]
# brightness: spectral centroid of speech frames
mag = np.abs(spec[speech]); freqs = np.fft.rfftfreq(2 * win, 1 / SR)
cent = float((mag * freqs).sum() / (mag.sum() + 1e-9)) if len(mag) else 0
sd = db[speech]
out = {'file': src.split('/')[-1], 'seconds': round(len(x) / SR, 1), 'talking_s': round(float(talk_s), 1),
       'pitch_median_hz': round(float(np.median(v)), 1) if len(v) else None,
       'pitch_range_st': round(float(np.percentile(st, 90) - np.percentile(st, 10)), 1),
       'pitch_move_st': round(float(np.median(move)), 2),
       'syllables_per_s': round(syl / max(0.1, talk_s), 2),
       'pauses': {'count': len(pauses), 'median_s': round(float(np.median(pauses)), 2) if pauses else 0, 'longest_s': round(max(pauses), 2) if pauses else 0},
       'loudness_range_db': round(float(np.percentile(sd, 95) - np.percentile(sd, 10)), 1) if len(sd) else 0,
       'brightness_hz': round(cent)}
print(json.dumps(out, ensure_ascii=False))
