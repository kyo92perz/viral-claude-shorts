#!/usr/bin/env python3
"""IMAGINA SÓ thumbnail from AI-painted panels (ai-dia1.png, ai-dia30.png, vertical images made from the prompts in
descricao-youtube.txt): two panels side by side, a huge DIA label on each, a value chip, dark divider, rounded corners.
  usage: python3 compose-ai.py"""
import os
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.dirname(HERE)
F = lambda px: ImageFont.truetype(os.path.join(V, '..', '..', 'styles', 'flat2d', 'Anton.ttf'), px)
W, H = 1280, 720; INK = (20, 16, 30)

def panel(f, w, top):
    im = Image.open(os.path.join(HERE, f)).convert('RGB'); iw, ih = im.size
    pad = 260   # extend the sky upward (blurred copy of the top strip) so the face sits below the big label
    ext = Image.new('RGB', (iw, ih + pad)); strip = im.crop((0, 0, iw, 120)).resize((iw, pad + 120)).filter(ImageFilter.GaussianBlur(18))
    ext.paste(strip, (0, 0)); fade = Image.linear_gradient('L').resize((iw, 140)); mask = Image.new('L', im.size, 255); mask.paste(fade, (0, 0))
    ext.paste(im, (0, pad), mask); im = ext; ih += pad
    ch = iw * H / w; im = im.crop((0, top, iw, top + ch)).resize((w, H), Image.LANCZOS)
    return ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.12)).enhance(1.08)

def label(im, t, cx, y, size):
    d = ImageDraw.Draw(im); f = F(size); tw = d.textlength(t, font=f)
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).text((cx - tw / 2 + 5, y + 7), t, font=f, fill=200, stroke_width=12, stroke_fill=200)
    im.paste((0, 0, 0), (0, 0), sh.filter(ImageFilter.GaussianBlur(7)))
    d.text((cx - tw / 2, y), t, font=f, fill=(255, 255, 255), stroke_width=12, stroke_fill=INK)

def chip(im, t, cx, y, bg):
    d = ImageDraw.Draw(im); f = F(50); tw = d.textlength(t, font=f)
    d.rounded_rectangle((cx - tw / 2 - 24, y, cx + tw / 2 + 24, y + 74), 16, fill=bg, outline=INK, width=6); d.text((cx - tw / 2, y + 4), t, font=f, fill=(255, 255, 255))

def build(labels, chips, out):
    pw = W // 2; im = Image.new('RGB', (W, H), INK)
    im.paste(panel('ai-dia1.png', pw, 60), (0, 0)); im.paste(panel('ai-dia30.png', pw, 90), (pw, 0))
    ImageDraw.Draw(im).rectangle((pw - 5, 0, pw + 5, H), fill=INK)
    for i, t in enumerate(labels): label(im, t, i * pw + pw / 2, 14, min(130, int(pw * 1.6 / max(4, len(t)))))
    for i, c in enumerate(chips):
        if c: chip(im, c[0], i * pw + pw / 2 - (70 if i == 1 else 0), H - 128, c[1])
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, W, H), 28, fill=255)
    bg = Image.new('RGB', (W, H), (255, 255, 255)); bg.paste(im, (0, 0), m); bg.save(os.path.join(V, out), quality=92)

build(['DIA 1', 'DIA 30'], [('R$ 1', (224, 48, 42)), ('R$ 536 MI', (47, 160, 74))], 'thumbnail.jpg')
build(['1x', '1.000.000.000x'], [None, None], 'thumbnail-b.jpg')
print('ok')
