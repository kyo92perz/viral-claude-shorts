#!/usr/bin/env python3
"""Thumbnails (1280x720) of ARQUIVO PROIBIDO, Caso Nº 001, from the clean world-test frames of the thumb-a / thumb-b shots
(world.ts; `node core/world.ts videos/arquivo-001-varginha` writes them to world/storyboard/p19.png and p20.png).
One subject big (the creature's red eyes), at most 3 words that complete the title, the channel tag low left.
  usage: python3 make-thumb.py   (run from anywhere; uses styles/flat2d/Anton.ttf)"""
import os
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.dirname(HERE)
FONT = os.path.join(V, '..', '..', 'styles', 'flat2d', 'Anton.ttf')
W, H = 1280, 720
F = lambda px: ImageFont.truetype(FONT, px)
RED, WHITE, YELLOW, PAPER = (224, 48, 42), (255, 255, 255), (255, 210, 58), (239, 233, 214)

def base(png, zoom, cx, cy, bright=1.15):
    im = Image.open(os.path.join(V, 'world', 'storyboard', png)).convert('RGB')
    w, h = im.size; cw, ch = w / zoom, h / zoom
    im = im.crop((cx * w - cw / 2, cy * h - ch / 2, cx * w + cw / 2, cy * h + ch / 2)).resize((W, H), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.2); im = ImageEnhance.Brightness(im).enhance(bright); im = ImageEnhance.Color(im).enhance(1.2)
    v = Image.new('L', (W, H), 0); ImageDraw.Draw(v).ellipse((-W * 0.15, -H * 0.2, W * 1.15, H * 1.2), fill=255)
    return Image.composite(im, Image.new('RGB', (W, H), (0, 0, 0)), v.filter(ImageFilter.GaussianBlur(110)))

def text(im, lines, x, y, size, colors, stroke=10, align='left'):
    d = ImageDraw.Draw(im)
    for t, c in zip(lines, colors):
        f = F(size); tw = d.textlength(t, font=f); xx = x if align == 'left' else x - tw
        sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).text((xx + 6, y + 8), t, font=f, fill=200, stroke_width=stroke, stroke_fill=200)
        im.paste((0, 0, 0), (0, 0), sh.filter(ImageFilter.GaussianBlur(8)))
        d.text((xx, y), t, font=f, fill=c, stroke_width=stroke, stroke_fill=(20, 16, 30)); y += int(size * 1.04)
    return im

def stamp(im, t, cx, cy, size, rot=-8):
    f = F(size); d0 = ImageDraw.Draw(im); tw = int(d0.textlength(t, font=f)); pw, ph = tw + 70, int(size * 1.45)
    layer = Image.new('RGBA', (pw + 40, ph + 40), (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
    d.rounded_rectangle((20, 20, 20 + pw, 20 + ph), 16, fill=(244, 240, 228, 235), outline=RED, width=12); d.text((55, 20 + ph * 0.06), t, font=f, fill=RED)
    layer = layer.rotate(-rot, expand=True, resample=Image.BICUBIC); im.paste(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2)), layer); return im

def tag(im):
    d = ImageDraw.Draw(im); f = F(32); t = 'ARQUIVO PROIBIDO  •  CASO Nº 001'
    tw = d.textlength(t, font=f); d.rectangle((24, H - 68, 24 + tw + 30, H - 22), fill=(20, 16, 30)); d.rectangle((24, H - 68, 32, H - 22), fill=RED); d.text((44, H - 64), t, font=f, fill=PAPER)
    return im

# V1 (recommended): the creature's face fills the right half; "O QUE ELAS VIRAM?"
im = base('p19.png', 1.25, 0.6, 0.5)
im = text(im, ['O QUE', 'ELAS', 'VIRAM?'], 40, 40, 150, [WHITE, WHITE, YELLOW]); im = tag(im)
im.save(os.path.join(V, 'thumbnail.jpg'), quality=90)
# V2: the creature + the secret folder; a red stamp "LIBERADO"
im = base('p20.png', 1.1, 0.5, 0.5)
im = stamp(im, 'LIBERADO', 960, 455, 92); im = text(im, ['30 ANOS', 'ESCONDIDO'], W - 36, 36, 120, [WHITE, YELLOW], align='right'); im = tag(im)
im.save(os.path.join(V, 'thumbnail-b.jpg'), quality=90)
# V3: the face again, the inquiry's verdict as the hook
im = base('p19.png', 1.4, 0.62, 0.45)
im = text(im, ['ERA SÓ', 'UM HOMEM?'], 40, 60, 140, [WHITE, RED]); im = tag(im)
im.save(os.path.join(V, 'thumbnail-c.jpg'), quality=90)
print('ok')
