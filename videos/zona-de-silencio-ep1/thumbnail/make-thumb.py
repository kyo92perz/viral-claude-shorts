#!/usr/bin/env python3
"""Thumbnails of ZONA DE SILÊNCIO EP1 from the 3D renders in layers/ (made by the thumb-a / thumb-b shots of world3d.ts).
One subject big, the threat in green behind him, at most 3 words that complete the title, a small series tag.
  usage: python3 make-thumb.py <font.ttf>"""
import os, sys
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__)); FONT = sys.argv[1]
W, H = 1280, 720
F = lambda px: ImageFont.truetype(FONT, px)

def base(layer, zoom, cx, cy):
    im = Image.open(os.path.join(HERE, 'layers', layer)).convert('RGB')
    w, h = im.size; cw, ch = w / zoom, h / zoom
    im = im.crop((cx * w - cw / 2, cy * h - ch / 2, cx * w + cw / 2, cy * h + ch / 2)).resize((W, H), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.25); im = ImageEnhance.Brightness(im).enhance(1.12); im = ImageEnhance.Color(im).enhance(1.15)
    # vignette: the eye goes to the middle
    v = Image.new('L', (W, H), 0); d = ImageDraw.Draw(v); d.ellipse((-W * 0.15, -H * 0.2, W * 1.15, H * 1.2), fill=255)
    v = v.filter(ImageFilter.GaussianBlur(120)); return Image.composite(im, Image.new('RGB', (W, H), (0, 0, 0)), v)

def text(im, lines, x, y, size, colors, stroke=10, align='left'):
    d = ImageDraw.Draw(im)
    for i, (t, c) in enumerate(zip(lines, colors)):
        f = F(size); tw = d.textlength(t, font=f); xx = x if align == 'left' else x - tw
        sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).text((xx + 6, y + 8), t, font=f, fill=200, stroke_width=stroke, stroke_fill=200)
        im.paste((0, 0, 0), (0, 0), sh.filter(ImageFilter.GaussianBlur(8)))
        d.text((xx, y), t, font=f, fill=c, stroke_width=stroke, stroke_fill=(0, 0, 0)); y += int(size * 1.02)
    return im

def tag(im):
    d = ImageDraw.Draw(im); f = F(34); t = 'ZONA DE SILÊNCIO  •  EP. 1'
    tw = d.textlength(t, font=f); d.rectangle((24, H - 70, 24 + tw + 28, H - 24), fill=(12, 12, 14)); d.text((38, H - 66), t, font=f, fill=(125, 255, 154))
    return im

GREEN, WHITE, YELLOW = (125, 255, 154), (255, 255, 255), (255, 214, 64)
# V1: the creature right behind Bolacha, "DESLIGA O RÁDIO!"
im = base('thumb-a.png', 1.35, 0.36, 0.42)
im = text(im, ['DESLIGA', 'O RÁDIO!'], 40, 70, 150, [WHITE, YELLOW]); im = tag(im)
im.save(os.path.join(HERE, 'thumb-v1-desliga-o-radio.jpg'), quality=92)
# V2: same picture, the hook of the title, "ELE TEM A SUA VOZ"
im = base('thumb-a.png', 1.5, 0.47, 0.4)
im = text(im, ['ELE TEM', 'A SUA VOZ'], W - 36, 60, 136, [WHITE, GREEN], align='right'); im = tag(im)
im.save(os.path.join(HERE, 'thumb-v2-ele-tem-a-sua-voz.jpg'), quality=92)
# V3: the fight, "15 ANOS ESPERANDO"
im = base('thumb-b.png', 1.25, 0.45, 0.52)
im = text(im, ['15 ANOS', 'ESPERANDO'], W - 36, 60, 130, [WHITE, GREEN], align='right'); im = tag(im)
im.save(os.path.join(HERE, 'thumb-v3-15-anos.jpg'), quality=92)
print('ok')
