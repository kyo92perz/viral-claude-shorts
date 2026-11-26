#!/usr/bin/env python3
"""ARQUIVO PROIBIDO, Caso Nº 002: thumbnails (1280x720) from the AI-painted scene ai-cacas.png (the Mirage and the five lights over Rio).
Title in the dark upper-left sky, the
channel tag low left, a red rubber stamp; the bottom-right corner stays clear for the duration.
  usage: python3 compose-ai.py"""
import os
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); V = os.path.dirname(HERE)
F = lambda px: ImageFont.truetype(os.path.join(V, '..', '..', 'styles', 'flat2d', 'Anton.ttf'), px)
W, H = 1280, 720; INK = (20, 16, 30); RED, WHITE, YELLOW, PAPER = (224, 48, 42), (255, 255, 255), (255, 210, 58), (239, 233, 214)

def base(f, bright=1.1, zoom=1.0, cx=0.5, cy=0.5, gamma=1.0):
    im = Image.open(os.path.join(HERE, f)).convert('RGB'); iw, ih = im.size; cw, ch = iw / zoom, ih / zoom
    x0 = min(max(0, cx * iw - cw / 2), iw - cw); y0 = min(max(0, cy * ih - ch / 2), ih - ch)
    im = im.crop((x0, y0, x0 + cw, y0 + ch)).resize((W, H), Image.LANCZOS)
    if gamma != 1.0: im = im.point(lambda v: int(255 * (v / 255) ** (1 / gamma)))
    im = ImageEnhance.Contrast(ImageEnhance.Brightness(im).enhance(bright)).enhance(1.12)
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).rectangle((0, 0, W * 0.5, H * 0.36), fill=170)   # darker upper-left sky for the title
    return Image.composite(Image.new('RGB', (W, H), (0, 0, 0)), im, sh.filter(ImageFilter.GaussianBlur(120)))

def text(im, lines, x, y, size, colors):
    d = ImageDraw.Draw(im)
    for t, c in zip(lines, colors):
        f = F(size); sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).text((x + 6, y + 8), t, font=f, fill=220, stroke_width=11, stroke_fill=220)
        im.paste((0, 0, 0), (0, 0), sh.filter(ImageFilter.GaussianBlur(8))); d.text((x, y), t, font=f, fill=c, stroke_width=11, stroke_fill=INK); y += int(size * 1.03)

def stamp(im, t, cx, cy, size, rot=-8):
    f = F(size); tw = int(ImageDraw.Draw(im).textlength(t, font=f)); pw, ph = tw + 70, int(size * 1.45)
    L = Image.new('RGBA', (pw + 40, ph + 40), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
    d.rounded_rectangle((20, 20, 20 + pw, 20 + ph), 16, fill=(244, 240, 228, 225), outline=RED, width=12); d.text((55, 20 + ph * 0.06), t, font=f, fill=RED)
    L = L.rotate(-rot, expand=True, resample=Image.BICUBIC); im.paste(L, (int(cx - L.width / 2), int(cy - L.height / 2)), L)

def tag(im):
    d = ImageDraw.Draw(im); f = F(32); t = 'ARQUIVO PROIBIDO  •  CASO Nº 002'; tw = d.textlength(t, font=f)
    d.rectangle((24, H - 68, 24 + tw + 30, H - 22), fill=INK); d.rectangle((24, H - 68, 32, H - 22), fill=RED); d.text((44, H - 64), t, font=f, fill=PAPER)

def save(im, out):
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, W, H), 24, fill=255)
    bg = Image.new('RGB', (W, H), (255, 255, 255)); bg.paste(im, (0, 0), m); bg.save(os.path.join(V, out), quality=92)

print('ok')
im = base('ai-cacas.png', 1.05, 1.0, 0.5, 0.5, 1.1); text(im, ['21 OVNIs', 'NO RADAR'], 36, 18, 118, [WHITE, YELLOW]); stamp(im, 'OFICIAL', 760, 520, 72, -6); tag(im); save(im, 'thumbnail.jpg')
im = base('ai-cacas.png', 1.05, 1.0, 0.5, 0.5, 1.1); text(im, ['O GOVERNO', 'ADMITIU'], 36, 18, 118, [WHITE, RED]); stamp(im, 'CASO Nº 002', 760, 520, 60, -6); tag(im); save(im, 'thumbnail-b.jpg')
im = base('ai-cacas.png', 1.05, 1.0, 0.5, 0.5, 1.1); text(im, ['NENHUM CAÇA', 'ALCANÇOU'], 36, 18, 108, [WHITE, YELLOW]); tag(im); save(im, 'thumbnail-c.jpg')
print('ok')
