#!/usr/bin/env python3
"""A Shorts cover (1080x1920): a frame, a dark band, 2 short lines of text in Anton with a thick outline (white + one
accent colour), optionally the series badge. Keep the text above ~1450: the bottom of a Short is covered by the app.
  usage: python3 core/cover.py videos/<video> <seconds | image.png> "LINE ONE" "LINE TWO" [accent=#f6c744] [out=cover.jpg] [y=230] ["SERIES|EP.1"]
  seconds:   a moment of final.mp4 (it carries the captions and the badge of the video: pick a moment without captions)
  image.png: a clean 1080x1920 frame instead, e.g. a "cover-*" shot of the world test (node core/world.ts videos/<video>
             saves its frames in videos/<video>/world/storyboard/pNN.png); pass "SERIES|EP.1" to draw the badge
  y:         where the text starts (move it off the faces)"""
import os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

V, T, L1, L2 = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
ACC = sys.argv[5] if len(sys.argv) > 5 else '#f6c744'
OUT = os.path.join(V, sys.argv[6] if len(sys.argv) > 6 else 'cover.jpg')
Y = int(sys.argv[7]) if len(sys.argv) > 7 else 230
BADGE = sys.argv[8] if len(sys.argv) > 8 else ''
FONT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'styles', 'flat2d', 'Anton.ttf')
W, H = 1080, 1920
if T.lower().endswith('.png'):
    im = Image.open(T).convert('RGB').resize((W, H))
else:
    with tempfile.TemporaryDirectory() as d:
        p = os.path.join(d, 'f.png')
        subprocess.run(['ffmpeg', '-v', 'error', '-ss', T, '-i', os.path.join(V, 'final.mp4'), '-frames:v', '1', p], check=True)
        im = Image.open(p).convert('RGB').resize((W, H))
im = ImageEnhance.Contrast(im).enhance(1.15); im = ImageEnhance.Color(im).enhance(1.15)
# a dark band behind the text
g = Image.new('L', (1, H)); [g.putpixel((0, y), int(190 * max(0, 1 - abs(y - Y - 200) / 650))) for y in range(H)]
im = Image.composite(Image.new('RGB', (W, H), (8, 8, 14)), im, g.resize((W, H)))
d = ImageDraw.Draw(im)

def line(t, y, color, maxw=980):
    size = 190
    while True:
        f = ImageFont.truetype(FONT, size); w = d.textlength(t, font=f)
        if w <= maxw or size < 80: break
        size -= 6
    x = (W - w) / 2
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).text((x + 8, y + 12), t, font=f, fill=210, stroke_width=16, stroke_fill=210)
    im.paste((0, 0, 0), (0, 0), sh.filter(ImageFilter.GaussianBlur(10)))
    d.text((x, y), t, font=f, fill=color, stroke_width=16, stroke_fill=(20, 16, 28)); return y + int(size * 1.08)

y = line(L1, Y, '#ffffff'); line(L2, y, ACC)
if BADGE:   # the series badge at the top left, like the video's (grey with a dark outline, the episode in yellow)
    t, _, ep = BADGE.partition('|'); f, fe = ImageFont.truetype(FONT, 64), ImageFont.truetype(FONT, 44)
    d.text((70, 120), t, font=f, fill='#e9e4f2', stroke_width=8, stroke_fill='#1b1424')
    if ep: d.text((70 + d.textlength(t, font=f) + 22, 134), ep, font=fe, fill='#f6c744', stroke_width=6, stroke_fill='#1b1424')
im.save(OUT, quality=92); print(OUT)
