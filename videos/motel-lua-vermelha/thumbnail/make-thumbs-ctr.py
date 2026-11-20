#!/usr/bin/env python3
"""Click-first thumbnails (1280x720) for Motel Lua Vermelha, three variants for YouTube's "Test & compare":
huge faces with extreme emotion cut out of a green screen as white-outlined stickers, 3-4 giant words, red/black/yellow
contrast and a curiosity gap.
  usage: python make-thumbs-ctr.py <layers dir> <font.ttf> <out dir>"""
import math, os, sys
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont

LAY, FONT, OUT = sys.argv[1:4]
W, H = 1280, 720
BLACK, WHITE, YEL, RED = (0, 0, 0), (255, 255, 255), (255, 230, 0), (230, 20, 30)
font = lambda px: ImageFont.truetype(FONT, px)
layer = lambda n: Image.open(os.path.join(LAY, n)).convert('RGB')

def key(im):
    """green screen -> RGBA: hard key, 1 px erosion, soft edge, green spill removed"""
    r, g, b = [c.point(lambda v: v) for c in im.split()]
    px = im.load(); w, h = im.size
    a = Image.new('L', (w, h), 255); pa = a.load()
    for y in range(h):
        for x in range(w):
            R, G, B = px[x, y]
            if G > 110 and G > R * 1.35 and G > B * 1.35: pa[x, y] = 0
    a = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1))
    out = im.copy(); po = out.load()
    for y in range(h):
        for x in range(w):
            R, G, B = po[x, y]
            if G > max(R, B): po[x, y] = (R, max(R, B), B)
    out.putalpha(a)
    return out.crop(a.getbbox())

def sticker(cut, stroke=14, black=6):
    """white outline + thin black rim + soft drop shadow around a cut-out"""
    a = cut.split()[3]; pad = stroke + black + 30
    big = Image.new('RGBA', (cut.width + 2 * pad, cut.height + 2 * pad), (0, 0, 0, 0))
    A = Image.new('L', big.size, 0); A.paste(a, (pad, pad))
    white = A.filter(ImageFilter.MaxFilter(2 * stroke + 1)); rim = white.filter(ImageFilter.MaxFilter(2 * black + 1))
    shadow = rim.filter(ImageFilter.GaussianBlur(14)).point(lambda v: int(v * 0.7))
    sh = Image.new('RGBA', big.size, (0, 0, 0, 0)); sh.putalpha(shadow); big = Image.alpha_composite(big, ImageChops_offset(sh, 10, 14))
    big = Image.alpha_composite(big, solid(big.size, BLACK, rim)); big = Image.alpha_composite(big, solid(big.size, WHITE, white))
    inner = Image.new('RGBA', big.size, (0, 0, 0, 0)); inner.paste(cut, (pad, pad), cut)
    return Image.alpha_composite(big, inner)

def ImageChops_offset(im, dx, dy):
    o = Image.new('RGBA', im.size, (0, 0, 0, 0)); o.paste(im, (dx, dy)); return o

def solid(size, col, mask):
    s = Image.new('RGBA', size, col + (255,)); s.putalpha(mask); return s

def place(bg, im, h=None, w=None, x=0, y=0, anchor='bl'):
    if h: im = im.resize((int(im.width * h / im.height), h), Image.LANCZOS)
    if w: im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    X = x - (im.width if 'r' in anchor else im.width // 2 if 'c' in anchor else 0)
    Y = y - (im.height if 'b' in anchor else 0)
    bg.alpha_composite(im, (int(X), int(Y)))

def backdrop(name, crop=None, dark=0.55, red=0.35):
    im = layer(name)
    if crop: im = im.crop(crop)
    im = im.resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(2))
    im = ImageEnhance.Brightness(im).enhance(dark)
    im = Image.blend(im, Image.new('RGB', (W, H), (120, 0, 10)), red)
    return im.convert('RGBA')

def glow(bg, cx, cy, r, col, a=200):
    g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(g)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=col + (a,)); g = g.filter(ImageFilter.GaussianBlur(r // 2))
    bg.alpha_composite(g)

def vignette(bg, k=0.75):
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).ellipse((-W * 0.2, -H * 0.25, W * 1.2, H * 1.25), fill=255)
    m = m.filter(ImageFilter.GaussianBlur(160)).point(lambda v: 255 - v)
    v = Image.new('RGBA', (W, H), (0, 0, 0, 0)); v.putalpha(m.point(lambda x: int(x * k))); bg.alpha_composite(v)

def words(d, xy, s, px, fill, anchor='la', rot=0, bg=None):
    """giant words: a hard 3D drop, a thick black stroke, the fill"""
    x, y = xy
    if bg: d.rectangle(bg, fill=RED)
    for dx, dy in ((9, 10), (6, 7), (3, 4)): d.text((x + dx, y + dy), s, font=font(px), fill=BLACK, anchor=anchor, stroke_width=14, stroke_fill=BLACK)
    d.text((x, y), s, font=font(px), fill=fill, anchor=anchor, stroke_width=14, stroke_fill=BLACK)

def arrow(d, x0, y0, x1, y1, w=26, col=RED):
    a = math.atan2(y1 - y0, x1 - x0); hx, hy = x1 - math.cos(a) * 64, y1 - math.sin(a) * 64
    for c, ww in ((BLACK, w + 16), (col, w)):
        d.line((x0, y0, hx, hy), fill=c, width=ww)
        n = (math.cos(a + 1.57), math.sin(a + 1.57))
        d.polygon([(x1, y1), (hx + n[0] * (ww + 22), hy + n[1] * (ww + 22)), (hx - n[0] * (ww + 22), hy - n[1] * (ww + 22))], fill=c)

def badge(d, x, y, s, px=34):
    w = d.textlength(s, font=font(px)); d.rectangle((x, y, x + w + 30, y + px + 22), fill=BLACK); d.rectangle((x + 5, y + 5, x + w + 25, y + px + 17), fill=RED)
    d.text((x + 15, y + 7), s, font=font(px), fill=WHITE)

mari, kev, hank = (sticker(key(layer(n))) for n in ('g-mari.png', 'g-kev.png', 'g-hank.png'))
maw, grin = (sticker(key(layer(n)), stroke=10) for n in ('g-sombra-boca.png', 'g-sombra.png'))

# ---- V1: NÃO ACENDA A LUZ (Mari vs the open jaw) ----
bg = backdrop('b-motel.png', crop=(200, 0, 1720, 855))
glow(bg, 960, 260, 300, (255, 30, 20), 180)
place(bg, maw, h=760, x=1290, y=770, anchor='br')
glow(bg, 300, 470, 260, (255, 220, 120), 70)
place(bg, mari, h=600, x=-40, y=740, anchor='bl')
vignette(bg, 0.55)
d = ImageDraw.Draw(bg)
words(d, (1250, 400), 'NÃO ACENDA', 128, WHITE, 'ra')
words(d, (1250, 540), 'A LUZ', 128, YEL, 'ra')
arrow(d, 760, 120, 880, 190)
bg.convert('RGB').save(os.path.join(OUT, 'thumb-v1-nao-acenda-a-luz.jpg'), quality=94)

# ---- V2: A SOMBRA SE SOLTOU (Kev and his own shadow towering behind him) ----
bg = backdrop('b-parede.png', dark=0.5, red=0.45)
glow(bg, 930, 230, 330, (255, 40, 30), 170)
place(bg, grin, h=820, x=1300, y=800, anchor='br')
glow(bg, 360, 380, 260, (255, 240, 200), 90)
place(bg, kev, h=720, x=-20, y=760, anchor='bl')
vignette(bg, 0.55)
d = ImageDraw.Draw(bg)
words(d, (1250, 400), 'A SOMBRA', 128, WHITE, 'ra')
words(d, (1250, 540), 'SE SOLTOU', 128, YEL, 'ra')
arrow(d, 700, 90, 830, 160)
bg.convert('RGB').save(os.path.join(OUT, 'thumb-v2-a-sombra-se-soltou.jpg'), quality=94)

# ---- V3: 11 SOMBRAS. 0 CORPOS. (the wall of room 11, one shadow opens its mouth) ----
bg = backdrop('b-parede.png', crop=(0, 380, 1920, 1080), dark=0.62, red=0.38)
vignette(bg, 0.45)
place(bg, hank, h=560, x=1320, y=790, anchor='br')
d = ImageDraw.Draw(bg)
cx, cy = 604, 300   # the shadow with the open mouth
for c, ww in ((BLACK, 22), (RED, 13)): d.ellipse((cx - 115, cy - 170, cx + 115, cy + 170), outline=c, width=ww)
words(d, (36, 395), '11 SOMBRAS.', 140, WHITE)
words(d, (36, 548), '0 CORPOS.', 112, YEL)
badge(d, 30, 26, 'MOTEL LUA VERMELHA', 34)
bg.convert('RGB').save(os.path.join(OUT, 'thumb-v3-11-sombras.jpg'), quality=94)
print('ok', file=sys.stderr)
