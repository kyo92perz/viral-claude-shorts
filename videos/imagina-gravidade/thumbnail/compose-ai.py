#!/usr/bin/env python3
"""IMAGINA SÓ thumbnail from AI-painted panels (ai-dia1.png, ai-dia24.png, vertical images made from the prompts in
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
    im.paste(panel('ai-dia1.png', pw, 40), (0, 0)); im.paste(panel('ai-dia24.png', pw, 210), (pw, 0))
    ImageDraw.Draw(im).rectangle((pw - 5, 0, pw + 5, H), fill=INK)
    for i, t in enumerate(labels): label(im, t, i * pw + pw / 2, 14, min(130, int(pw * 1.6 / max(4, len(t)))))
    for i, c in enumerate(chips):
        if c: chip(im, c[0], i * pw + pw / 2, H - 128, c[1])
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, W, H), 28, fill=255)
    bg = Image.new('RGB', (W, H), (255, 255, 255)); bg.paste(im, (0, 0), m); bg.save(os.path.join(V, out), quality=92)

build(['DIA 1', 'DIA 24'], [('GRAVIDADE 100%', (47, 160, 74)), ('GRAVIDADE 0,00001%', (224, 48, 42))], 'thumbnail.jpg')
build(['100%', '0,00001%'], [('DIA 1', (47, 160, 74)), ('DIA 24', (224, 48, 42))], 'thumbnail-b.jpg')
print('ok')

# ---- "chamativa": closer crops (bigger faces), punchier colours, jagged lightning divider, tilted labels,
# big gravity numbers and a red arrow + circle on the day-24 chaos
def zoomed(f, w, x0, y0, cw):
    im = Image.open(os.path.join(HERE, f)).convert('RGB'); ch = cw * H / w
    im = im.crop((x0, y0, x0 + cw, y0 + ch)).resize((w, H), Image.LANCZOS)
    im = ImageEnhance.Color(im).enhance(1.35); im = ImageEnhance.Contrast(im).enhance(1.15)
    vg = Image.new('L', (w, H), 0); ImageDraw.Draw(vg).ellipse((-w * 0.25, -H * 0.2, w * 1.25, H * 1.2), fill=255)
    return Image.composite(im, ImageEnhance.Brightness(im).enhance(0.55), vg.filter(ImageFilter.GaussianBlur(80)))

def tilted(im, t, cx, cy, size, fill, rot):
    f = F(size); d0 = ImageDraw.Draw(im); tw = int(d0.textlength(t, font=f)); L = Image.new('RGBA', (tw + 80, int(size * 1.5) + 60), (0, 0, 0, 0))
    d = ImageDraw.Draw(L); d.text((40 + 8, 20 + 10), t, font=f, fill=(0, 0, 0, 170), stroke_width=16, stroke_fill=(0, 0, 0, 170))
    L = L.filter(ImageFilter.GaussianBlur(6)); d = ImageDraw.Draw(L); d.text((40, 20), t, font=f, fill=fill, stroke_width=16, stroke_fill=INK)
    L = L.rotate(rot, expand=True, resample=Image.BICUBIC); im.paste(L, (int(cx - L.width / 2), int(cy - L.height / 2)), L)

def arrow(im, x0, y0, x1, y1):
    import math
    d = ImageDraw.Draw(im); a = math.atan2(y1 - y0, x1 - x0); hx, hy = x1 - 60 * math.cos(a), y1 - 60 * math.sin(a)
    for wdt, c in ((40, INK), (24, (235, 40, 40))):
        d.line((x0, y0, hx, hy), fill=c, width=wdt)
        p = [(x1, y1), (hx + 46 * math.cos(a + 1.57), hy + 46 * math.sin(a + 1.57)), (hx - 46 * math.cos(a + 1.57), hy - 46 * math.sin(a + 1.57))]
        if c == INK: p = [(x1 + 14 * math.cos(a), y1 + 14 * math.sin(a))] + [(x + 10 * (x - hx) / 46, y + 10 * (y - hy) / 46) for x, y in p[1:]]
        d.polygon(p, fill=c)

def loud(out, big=True):
    pw = W // 2; im = Image.new('RGB', (W, H), INK)
    im.paste(zoomed('ai-dia1.png', pw, 250, 0, 690), (0, 0)); im.paste(zoomed('ai-dia24.png', pw, 0, 80, 941), (pw, 0))
    d = ImageDraw.Draw(im); pts = [(pw + 30, 0), (pw - 25, 250), (pw + 25, 330), (pw - 30, H)]
    d.line(pts, fill=INK, width=34, joint='curve'); d.line(pts, fill=(255, 210, 58), width=16, joint='curve')
    d.ellipse((pw + 8, -10, pw + 280, 170), outline=INK, width=16); d.ellipse((pw + 8, -10, pw + 280, 170), outline=(235, 40, 40), width=9)
    arrow(im, pw + 330, 230, pw + 240, 140)
    tilted(im, 'DIA 1', 150, 90, 120, (255, 255, 255), 4); tilted(im, 'DIA 24', pw + 490, 90, 112, (255, 210, 58), -5)
    tilted(im, '100%', pw / 2 - 90, H - 95, 110, (70, 220, 100), 3); tilted(im, '0,00001%', pw + pw / 2 + 40, H - 95, 100, (255, 70, 60), -3)
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, W, H), 28, fill=255)
    bg = Image.new('RGB', (W, H), (255, 255, 255)); bg.paste(im, (0, 0), m); bg.save(os.path.join(V, out), quality=92)

loud('thumbnail-c.jpg')
print('ok')
