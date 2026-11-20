#!/usr/bin/env python3
"""Thumbnails for the night-shift series: a 1280x720 YouTube thumbnail and a 1080x1920 vertical cover per episode,
composed from two full-resolution frames of the episode (monster on one side, the reaction on the other), a hook in
huge letters, an episode badge and a red arrow at the threat.
  usage: python thumbs.py <frames dir> <out dir> <font.ttf>
The frames dir holds ep1/, ep2/, ep3/ with p01.png... (from hyperframes snapshots of each episode)."""
import os, sys
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont

FR, OUT, FONT = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(OUT, exist_ok=True)
EPS = {
    1: dict(a=('ep1', 'p01.png', 1230), b=('ep1', 'p04.png', 1225), hook=['NÃO ABRA', 'A PORTA'], hi=1, small='ele tem a voz do meu avô…', arrow=True),
    2: dict(a=('ep2', 'p03.png', 1090), b=('ep2', 'p04.png', 985), hook=['SE A LUZ APAGAR', 'VOCÊ MORRE'], hi=1, small='e a picareta já estava no ar', arrow=True),
    3: dict(a=('ep3', 'p02.png', 1000), b=('ep3', 'p03.png', 985), hook=['2.000 LÚMENS', 'CONTRA ELE'], hi=0, small='o xerife escondeu isso por 39 anos', arrow=True),
}
RED, YEL, WHITE, BLACK = (226, 32, 38), (255, 214, 0), (255, 255, 255), (0, 0, 0)

def crop(ep, name, cy, w, h):
    im = Image.open(os.path.join(FR, ep, name)).convert('RGB')
    W, H = im.size; ch = int(W * h / w); y0 = max(0, min(H - ch, cy - ch // 2))
    im = im.crop((0, y0, W, y0 + ch)).resize((w, h), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.18); im = ImageEnhance.Color(im).enhance(1.25); return ImageEnhance.Brightness(im).enhance(1.12)

def font(px): return ImageFont.truetype(FONT, px)

def text(d, xy, s, px, fill, stroke=12, anchor='la'):
    d.text(xy, s, font=font(px), fill=fill, stroke_width=stroke, stroke_fill=BLACK, anchor=anchor)

def fit(d, s, px, maxw):
    while d.textlength(s, font=font(px)) > maxw and px > 40: px -= 4
    return px

def vignette(im, k=0.75):
    W, H = im.size; m = Image.new('L', (W, H), 0); dm = ImageDraw.Draw(m)
    dm.ellipse((-W * 0.15, -H * 0.2, W * 1.15, H * 1.2), fill=255); m = m.filter(ImageFilter.GaussianBlur(min(W, H) // 5))
    return Image.composite(im, Image.blend(im, Image.new('RGB', (W, H), BLACK), k), m)

def arrow(d, x0, y0, x1, y1, w=26):
    import math
    a = math.atan2(y1 - y0, x1 - x0); L = math.hypot(x1 - x0, y1 - y0); hx, hy = x1 - math.cos(a) * 70, y1 - math.sin(a) * 70
    for col, ww in ((BLACK, w + 16), (RED, w)):
        d.line((x0, y0, hx, hy), fill=col, width=ww)
        pts = [(x1, y1), (hx + math.cos(a + 1.57) * (ww + 22), hy + math.sin(a + 1.57) * (ww + 22)), (hx - math.cos(a + 1.57) * (ww + 22), hy - math.sin(a + 1.57) * (ww + 22))]
        d.polygon(pts, fill=col)
    del L

def badge(d, x, y, s, px):
    f = font(px); w = d.textlength(s, font=f)
    d.rectangle((x - 6, y - 6, x + w + 34, y + px + 22), fill=BLACK); d.rectangle((x, y, x + w + 28, y + px + 16), fill=RED)
    d.text((x + 14, y + 4), s, font=f, fill=WHITE)

for n, E in EPS.items():
    # ---- 16:9 thumbnail ----
    T = Image.new('RGB', (1280, 720))
    A = crop(*E['a'], 700, 720); B = crop(*E['b'], 640, 720)
    T.paste(A, (0, 0)); T.paste(B, (640, 0))
    d = ImageDraw.Draw(T)
    d.polygon([(600, 0), (690, 0), (630, 720), (540, 720)], fill=BLACK); d.polygon([(612, 0), (672, 0), (612, 720), (552, 720)], fill=RED)
    T = vignette(T, 0.55); d = ImageDraw.Draw(T)
    grad = Image.new('L', (1280, 720)); gd = ImageDraw.Draw(grad)
    for y in range(720): gd.line((0, y, 1280, y), fill=int(225 * max(0, (y - 400) / 320) ** 1.1))
    T = Image.composite(Image.new('RGB', (1280, 720), BLACK), T, grad); d = ImageDraw.Draw(T)
    l1, l2 = E['hook']; px = min(fit(d, l1, 118, 1180), fit(d, l2, 118, 1180))
    text(d, (640, 690 - px - 18), l2, px, YEL if E['hi'] == 1 else WHITE, 12, 'ms'); text(d, (640, 690 - 2 * px - 30), l1, px, YEL if E['hi'] == 0 else WHITE, 12, 'ms')
    badge(d, 28, 26, f'EP. {n}', 54)
    d.text((1250, 34), 'TURNO DA MADRUGADA', font=font(40), fill=WHITE, anchor='ra', stroke_width=6, stroke_fill=BLACK)
    if E['arrow']: arrow(d, 575, 110, 455, 210)
    T.save(os.path.join(OUT, f'thumb-ep{n}.jpg'), quality=93)
    # ---- 9:16 cover ----
    V = crop(E['a'][0], E['a'][1], 960, 1080, 1920); V = vignette(V, 0.5); d = ImageDraw.Draw(V)
    top = Image.new('L', (1080, 1920)); td = ImageDraw.Draw(top)
    for y in range(1920): td.line((0, y, 1080, y), fill=int(230 * max(0, (y - 1250) / 670) ** 1.1 + 200 * max(0, (380 - y) / 380) ** 1.5))
    V = Image.composite(Image.new('RGB', (1080, 1920), BLACK), V, top); d = ImageDraw.Draw(V)
    badge(d, 60, 110, f'EP. {n}', 70)
    d.text((1020, 128), 'TURNO DA\nMADRUGADA', font=font(58), fill=WHITE, anchor='ra', align='right', stroke_width=7, stroke_fill=BLACK)
    px = min(fit(d, l1, 190, 980), fit(d, l2, 190, 980))
    text(d, (540, 1440), l1, px, YEL if E['hi'] == 0 else WHITE, 14, 'ms'); text(d, (540, 1440 + px + 10), l2, px, YEL if E['hi'] == 1 else WHITE, 14, 'ms')
    d.text((540, 1490 + 2 * px), E['small'].upper(), font=font(48), fill=(235, 235, 235), anchor='ms', stroke_width=6, stroke_fill=BLACK)
    V.save(os.path.join(OUT, f'capa-vertical-ep{n}.jpg'), quality=93)
    print('ep', n, 'ok', file=sys.stderr)
