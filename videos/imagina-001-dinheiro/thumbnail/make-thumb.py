#!/usr/bin/env python3
"""IMAGINA SÓ thumbnails (1280x720): side-by-side panels "DIA 1 | DIA 30" (or three), the Tuco big in each, one huge
label on top of each panel, thin dark dividers, rounded corners. Panels come from the clean world-test frames
thumb2-a/thumb2-b (world/storyboard/p04.png, p05.png after `node core/world.ts videos/imagina-001-dinheiro`).
  usage: python3 make-thumb.py"""
import os
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.dirname(HERE)
FONT = os.path.join(V, '..', '..', 'styles', 'flat2d', 'Anton.ttf'); W, H = 1280, 720
F = lambda px: ImageFont.truetype(FONT, px)
P = {k: os.path.join(V, 'world', 'storyboard', f) for k, f in (('p1', 'p04.png'), ('p2', 'p05.png'))}

def panel(key, w, zoom=1.0, cy=0.42):
    im = Image.open(P[key]).convert('RGB'); iw, ih = im.size
    ch = ih / zoom; cw = ch * w / H
    im = im.crop((iw / 2 - cw / 2, cy * ih - ch * 0.42, iw / 2 + cw / 2, cy * ih + ch * 0.58)).resize((w, H), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.15); return ImageEnhance.Color(im).enhance(1.25)

def label(im, t, cx, y, size, fill=(255, 255, 255)):
    d = ImageDraw.Draw(im); f = F(size); tw = d.textlength(t, font=f)
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).text((cx - tw / 2 + 5, y + 7), t, font=f, fill=180, stroke_width=12, stroke_fill=180)
    im.paste((0, 0, 0), (0, 0), sh.filter(ImageFilter.GaussianBlur(7)))
    d.text((cx - tw / 2, y), t, font=f, fill=fill, stroke_width=12, stroke_fill=(20, 16, 30))

def chip(im, t, cx, y, bg):
    d = ImageDraw.Draw(im); f = F(46); tw = d.textlength(t, font=f)
    d.rounded_rectangle((cx - tw / 2 - 22, y, cx + tw / 2 + 22, y + 68), 14, fill=bg, outline=(20, 16, 30), width=6); d.text((cx - tw / 2, y + 4), t, font=f, fill=(255, 255, 255))

def build(keys, labels, chips, out):
    n = len(keys); pw = W // n; im = Image.new('RGB', (W, H), (20, 16, 30))
    for i, k in enumerate(keys): im.paste(panel(k, pw), (i * pw, 0))
    d = ImageDraw.Draw(im)
    for i in range(1, n): d.rectangle((i * pw - 5, 0, i * pw + 5, H), fill=(20, 16, 30))
    for i, (t, c) in enumerate(zip(labels, chips)):
        label(im, t, i * pw + pw / 2, 18, min(128 if n == 2 else 112, int(pw * 1.6 / max(4, len(t)))))
        if c: chip(im, c[0], i * pw + pw / 2 - (60 if i == n - 1 else 0), H - 130, c[1])   # the last chip stays clear of the duration corner
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, W, H), 28, fill=255)
    bg = Image.new('RGB', (W, H), (255, 255, 255)); bg.paste(im, (0, 0), m); bg.save(os.path.join(V, out), quality=90)

RED, GREEN, GOLD = (224, 48, 42), (47, 160, 74), (200, 150, 20)
build(['p1', 'p2'], ['DIA 1', 'DIA 30'], [('R$ 1', RED), ('R$ 536 MI', GREEN)], 'thumbnail.jpg')
build(['p1', 'p2'], ['1x', '1.000.000.000x'], [None, None], 'thumbnail-b.jpg')
print('ok')
