#!/usr/bin/env python3
"""Cut 9:16 Shorts from final-editado.mp4: per-shot 4:5 crop + hook title band + bottom call-out.
Run from the repo root: python3 videos/imagina-tamanho/tools/make-shorts.py [n]"""
import json, os, subprocess, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SRC = os.path.join(V, 'final-editado.mp4'); OUT = os.path.join(V, 'shorts')
FONT = os.path.join(V, '..', '..', 'remotion', 'fonts', 'ArchivoBlack.ttf')
SC = json.load(open(os.path.join(V, 'scenes.json'))); SC = SC['scenes'] if isinstance(SC, dict) else SC
# crop centre (fraction of width) per shot; 'fit' = whole frame over a blurred fill
CX = {'hook': .42, 'grow': .38, 'normal': .5, 'wake': .5, 'cama': .5, 'mae': .53, 'surprise': .46, 'cube': .5,
      'door': .45, 'food': .4, 'dunk': .48, 'cristo': .42, 'day7': .45, 'steps': .45, 'carrier': .5, 'news': .33,
      'citymeal': .5, 'burj': .5, 'hand': .6, 'moon': .5, 'jupiter': .47, 'ball': .5, 'fusion': .5, 'star': .5,
      'twosuns': .4}
INTRO = (0.0, 6.6)
SHORTS = [
  ('01-pesa-8x', [INTRO, (31.2, 76.0)], ['ELE DOBROU DE TAMANHO', 'E FICOU 8X MAIS PESADO']),
  ('02-maior-que-o-cristo', [INTRO, (160.7, 211.3)], ['DIA 6: ELE JÁ É MAIOR', 'QUE O CRISTO REDENTOR']),
  ('03-virou-um-sol', [(359.9, 415.6)], ['ELE DOBRA TODO DIA...', 'NO DIA 32 VIRA UM SOL']),
]
W, H, CH, CW = 1920, 1080, 880, 800           # crop above the burned captions and the chapter bar
TOP, MID = 300, 1188                           # our own captions go in the band under the picture
WORDS = json.load(open(os.path.join(V, 'words.json'))); WORDS = WORDS.get('words', WORDS) if isinstance(WORDS, dict) else WORDS

def ass_time(t): return f'{int(t // 3600)}:{int(t % 3600 // 60):02d}:{t % 60:05.2f}'

def captions(segs, path):
  '''groups of up to 3 words, the spoken word in yellow; times remapped onto the Short'''
  ev, off = [], 0.0
  for a, b in segs:
    ws = [w for w in WORDS if w['t0'] >= a - 0.05 and w['t1'] <= b + 0.05]
    groups, g = [], []
    for w in ws:
      g.append(w)
      if len(g) == 3 or w['w'].rstrip().endswith(('.', '!', '?', ',', ':')): groups.append(g); g = []
    if g: groups.append(g)
    for g in groups:
      for k, w in enumerate(g):
        t0 = w['t0'] - a + off; t1 = (g[k + 1]['t0'] if k + 1 < len(g) else w['t1'] + 0.15) - a + off
        txt = ' '.join(('{\\c&H44C7F6&}' + x['w'].strip().upper() + '{\\c&HFFFFFF&}') if j == k else x['w'].strip().upper() for j, x in enumerate(g))
        ev.append(f'Dialogue: 0,{ass_time(max(t0, off))},{ass_time(min(t1, b - a + off))},C,,0,0,0,,{{\\pos(540,{TOP + MID + 125})}}{txt}')
    off += b - a
  open(path, 'w').write('[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n'
    f'Style: C,Archivo Black,78,&H00FFFFFF,&H00FFFFFF,&H00191317,&H00000000,0,0,0,0,100,100,0,0,1,7,0,5,40,40,0,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n' + '\n'.join(ev) + '\n')

def pieces(a, b):
  out = []
  for s in SC:
    lo, hi = max(a, s['t0']), min(b, s['t1'])
    if hi - lo > 0.01: out.append([lo, hi, CX.get(s['id'], .5)])
  for k in range(len(out) - 1, -1, -1):        # fold slivers (< 0.25 s) into a neighbour
    if out[k][1] - out[k][0] < 0.25 and len(out) > 1:
      if k > 0: out[k - 1][1] = out[k][1]
      else: out[1][0] = out[k][0]
      del out[k]
  return out

def build(name, segs, hook):
  ps = [p for a, b in segs for p in pieces(a, b)]
  f, v, ins = [], [], []
  for i, (a, b, cx) in enumerate(ps):          # one seeked input per piece keeps memory low
    ins += ['-ss', f'{a:.3f}', '-t', f'{b - a:.3f}', '-i', SRC]
    f.append(f'[{i}:v]setpts=PTS-STARTPTS[r{i}]')
    if cx == 'fit':
      f.append(f'[r{i}]split[x{i}][y{i}];[x{i}]crop={W}:{CH}:0:0,scale=-2:{MID},crop=1080:{MID},boxblur=24:2,eq=brightness=-0.12[bg{i}];'
               f'[y{i}]crop={W}:{CH}:0:0,scale=1080:-2[fg{i}];[bg{i}][fg{i}]overlay=0:(H-h)/2[v{i}]')
    else:
      x = int(min(max(cx * W - CW / 2, 0), W - CW))
      f.append(f'[r{i}]crop={CW}:{CH}:{x}:0,scale=1080:{MID}:flags=lanczos[v{i}]')
    v.append(f'[v{i}]')
  f.append(''.join(v) + f'concat=n={len(v)}:v=1:a=0[mid]')
  au = []
  for j, (a, b) in enumerate(segs):
    ins += ['-ss', f'{a:.3f}', '-t', f'{b - a:.3f}', '-i', SRC]
    f.append(f'[{len(ps) + j}:a]asetpts=PTS-STARTPTS,afade=t=in:d=0.06,afade=t=out:st={b - a - 0.12:.3f}:d=0.12[a{j}]'); au.append(f'[a{j}]')
  f.append(''.join(au) + f'concat=n={len(au)}:v=0:a=1[aud]')
  tf = []
  for k, line in enumerate(hook):
    p = os.path.join(OUT, f'.{name}-{k}.txt'); open(p, 'w').write(line); tf.append(p)
  ass = os.path.join(OUT, f'.{name}.ass'); captions(segs, ass); FD = os.path.dirname(FONT)
  cta = os.path.join(OUT, '.cta.txt'); open(cta, 'w').write('VÍDEO COMPLETO NO CANAL')
  dt = lambda t, y, c, s: f"drawtext=fontfile={FONT}:textfile={t}:fontsize={s}:fontcolor={c}:borderw=6:bordercolor=0x171319:x=(w-tw)/2:y={y}"
  f.append(f'color=c=0x1b2560:s=1080x1920:r=24[bgc];[bgc][mid]overlay=0:{TOP}:shortest=1,'
           f'{dt(tf[0], 62, "white", 66)},{dt(tf[1], 160, "0xf6c744", 66)},'
           f'drawbox=x=0:y={TOP - 8}:w=1080:h=8:color=0xf6c744:t=fill,drawbox=x=0:y={TOP + MID}:w=1080:h=8:color=0xf6c744:t=fill,'
           f'{dt(cta, 1820, "0xf6c744", 40)},subtitles={ass}:fontsdir={FD},colorspace=all=bt709:iall=bt601-6-625:fast=1[outv]')
  out = os.path.join(OUT, f'{name}.mp4')
  subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(f), '-map', '[outv]', '-map', '[aud]',
                  '-c:v', 'libx264', '-preset', 'medium', '-threads', '4', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '24',
                  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
                  '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-movflags', '+faststart', out], check=True)
  for p in tf + [ass]: os.remove(p)
  print(out, file=sys.stderr)

os.makedirs(OUT, exist_ok=True)
for i, s in enumerate(SHORTS):
  if len(sys.argv) < 2 or sys.argv[1] == str(i + 1): build(*s)
