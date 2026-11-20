#!/usr/bin/env python3
"""Thumbnail (1280x720) for Motel Lua Vermelha: the catwalk fight in front of the neon (frame at 490 s), Kev with his
phone light in a circle (frame at 294 s), the hook in huge letters and an arrow at the shadow's grin.
  usage: python make-thumb.py <catwalk frame.png> <kev frame.png> <font.ttf> <out.jpg>"""
import math, sys
from PIL import Image, ImageDraw, ImageEnhance, ImageFont
A, B, F, OUT = sys.argv[1:5]
font = lambda px: ImageFont.truetype(F, px)
BLACK, WHITE, YEL, RED = (0, 0, 0), (255, 255, 255), (255, 214, 0), (226, 32, 38)
im = Image.open(A).convert('RGB').crop((60, 0, 1620, 878)).resize((1280, 720), Image.LANCZOS)
im = ImageEnhance.Brightness(ImageEnhance.Color(ImageEnhance.Contrast(im).enhance(1.2)).enhance(1.3)).enhance(1.15)
k = ImageEnhance.Brightness(Image.open(B).convert('RGB').crop((800, 330, 1260, 790)).resize((300, 300), Image.LANCZOS)).enhance(1.25)
m = Image.new('L', (300, 300), 0); ImageDraw.Draw(m).ellipse((0, 0, 299, 299), fill=255)
d = ImageDraw.Draw(im)
d.ellipse((952, 32, 1268, 348), fill=BLACK); d.ellipse((958, 38, 1262, 342), fill=WHITE)
im.paste(k, (960, 40), m)
g = Image.new('L', (1280, 720)); gd = ImageDraw.Draw(g)
for y in range(720): gd.line((0, y, 1280, y), fill=int(235 * max(0, (y - 430) / 290) ** 1.1))
im = Image.composite(Image.new('RGB', (1280, 720), BLACK), im, g); d = ImageDraw.Draw(im)
def T(xy, s, px, fill, st=12): d.text(xy, s, font=font(px), fill=fill, stroke_width=st, stroke_fill=BLACK, anchor='ms')
T((640, 598), 'NÃO ACENDA', 128, WHITE); T((640, 705), 'A LUZ', 128, YEL)
f = font(46); s = 'LUA DE SANGUE'; w = d.textlength(s, font=f)
d.rectangle((24, 22, 24 + w + 40, 98), fill=BLACK); d.rectangle((30, 28, 30 + w + 28, 92), fill=RED); d.text((44, 32), s, font=f, fill=WHITE)
d.text((44, 108), 'MOTEL LUA VERMELHA', font=font(36), fill=WHITE, stroke_width=5, stroke_fill=BLACK)
x0, y0, x1, y1 = 250, 330, 440, 230
a = math.atan2(y1 - y0, x1 - x0); hx, hy = x1 - math.cos(a) * 60, y1 - math.sin(a) * 60
for col, ww in ((BLACK, 40), (RED, 24)):
    d.line((x0, y0, hx, hy), fill=col, width=ww)
    d.polygon([(x1, y1), (hx + math.cos(a + 1.57) * (ww + 20), hy + math.sin(a + 1.57) * (ww + 20)), (hx - math.cos(a + 1.57) * (ww + 20), hy - math.sin(a + 1.57) * (ww + 20))], fill=col)
im.save(OUT, quality=93)
