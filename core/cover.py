#!/usr/bin/env python3
"""A Shorts cover (1080x1920) from a frame of final.mp4: the frame, a dark band, 2 short lines of text in Anton with a
thick outline (white + one accent color), and the series badge. Keep the text in the top half: the bottom of a Short
is covered by the app (title, buttons).
  usage: python3 core/cover.py videos/<video> <seconds> "LINE ONE" "LINE TWO" [accent=#f6c744] [out=cover.jpg]"""
import os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

V, T, L1, L2 = sys.argv[1], float(sys.argv[2]), sys.argv[3], sys.argv[4]
ACC = sys.argv[5] if len(sys.argv) > 5 else '#f6c744'
OUT = os.path.join(V, sys.argv[6] if len(sys.argv) > 6 else 'cover.jpg')
FONT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'styles', 'flat2d', 'Anton.ttf')
W, H = 1080, 1920
with tempfile.TemporaryDirectory() as d:
    p = os.path.join(d, 'f.png')
    subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(T), '-i', os.path.join(V, 'final.mp4'), '-frames:v', '1', p], check=True)
    im = Image.open(p).convert('RGB').resize((W, H))
im = ImageEnhance.Contrast(im).enhance(1.15); im = ImageEnhance.Color(im).enhance(1.15)
# a dark gradient at the top for the text
g = Image.new('L', (1, H)); [g.putpixel((0, y), int(200 * max(0, 1 - y / 900))) for y in range(H)]
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

y = line(L1, 230, '#ffffff'); line(L2, y, ACC)
im.save(OUT, quality=92); print(OUT)
