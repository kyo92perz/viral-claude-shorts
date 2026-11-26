#!/usr/bin/env python3
"""B6-style test frame drawn in code (an imitation of the painted meme look): Tuco, 3.2 m on day 2, bent under his
bedroom ceiling, the fan hitting his curls. 1080x1920. Run: python3 videos/b6-teste/frame.py"""
import math, os, random
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops
W, H, SS = 1080, 1920, 2                      # supersampled
R = random.Random(7)
INK = (34, 26, 34)
def S(v): return int(v * SS)
img = Image.new('RGB', (W * SS, H * SS), (240, 214, 178))
d = ImageDraw.Draw(img)

def paper(base, w, h, k=10, seed=1):
    """a matte painted fill with soft blotches (brush texture)"""
    r = random.Random(seed); t = Image.new('RGB', (w, h), base); td = ImageDraw.Draw(t)
    for _ in range(int(w * h / 30000)):
        x, y, rr = r.randint(0, w), r.randint(0, h), r.randint(60, 220)
        c = tuple(max(0, min(255, base[i] + r.randint(-k, k))) for i in range(3))
        td.ellipse((x - rr, y - rr * 0.6, x + rr, y + rr * 0.6), fill=c)
    return t.filter(ImageFilter.GaussianBlur(40))
def paste_shape(poly, base, seed=1, k=10):
    xs = [p[0] for p in poly]; ys = [p[1] for p in poly]; x0, y0, x1, y1 = int(min(xs)), int(min(ys)), int(max(xs)) + 1, int(max(ys)) + 1
    tex = paper(base, x1 - x0, y1 - y0, k, seed); m = Image.new('L', (x1 - x0, y1 - y0), 0)
    ImageDraw.Draw(m).polygon([(x - x0, y - y0) for x, y in poly], fill=255); img.paste(tex, (x0, y0), m)
def inkline(pts, w0, w1=None, seed=0, col=INK):
    """pressure-varying ink stroke along a polyline (thicker in the middle, slight wobble)"""
    r = random.Random(seed); w1 = w0 if w1 is None else w1; n = len(pts)
    for i in range(n - 1):
        (xa, ya), (xb, yb) = pts[i], pts[i + 1]
        steps = max(4, int(math.hypot(xb - xa, yb - ya) / (1.5 * SS)))
        for k in range(steps):
            t = (i + k / steps) / (n - 1); w = (w0 + (w1 - w0) * t) * (0.8 + 0.35 * math.sin(math.pi * t + i * 0.7)) * (0.97 + r.random() * 0.06)
            x = xa + (xb - xa) * k / steps; y = ya + (yb - ya) * k / steps
            d.ellipse((x - w / 2, y - w / 2, x + w / 2, y + w / 2), fill=col)
def curve(p0, p1, p2, n=24):
    return [((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]) for t in [i / n for i in range(n + 1)]]
def outline(poly, w=S(7), seed=3):
    inkline(poly + [poly[0]], w, w * 1.3, seed)
def blob(cx, cy, rx, ry, n=60, wob=0.04, seed=1, flat=1.0, tilt=0.0):
    r = random.Random(seed); pts = []
    for i in range(n):
        a = i / n * 2 * math.pi; k = 1 + wob * math.sin(a * 3 + r.random()) + r.uniform(-wob, wob) * 0.4
        x, y = math.cos(a) * rx * k, math.sin(a) * ry * k * (flat if math.sin(a) > 0 else 1)
        pts.append((cx + x * math.cos(tilt) - y * math.sin(tilt), cy + x * math.sin(tilt) + y * math.cos(tilt)))
    return pts

# ---------------- the room (painted, warm morning light)
paste_shape([(0, 0), (W * SS, 0), (W * SS, S(1350)), (0, S(1350))], (236, 204, 160), 2, 12)          # wall
paste_shape([(0, S(1350)), (W * SS, S(1350)), (W * SS, H * SS), (0, H * SS)], (176, 112, 74), 3, 14)  # floor
for i in range(9): inkline([(0, S(1380 + i * 62)), (W * SS, S(1372 + i * 62))], S(3), seed=40 + i, col=(140, 84, 54))
paste_shape([(0, 0), (W * SS, 0), (W * SS, S(150)), (0, S(150))], (250, 236, 210), 4, 6)                # ceiling
inkline([(0, S(150)), (W * SS, S(156))], S(8), seed=5)
inkline([(0, S(1350)), (W * SS, S(1346))], S(8), seed=6)
# window with morning
win = [(S(640), S(380)), (S(990), S(370)), (S(1000), S(800)), (S(650), S(810))]
paste_shape(win, (170, 214, 240), 7, 8); outline(win, S(8), 8)
inkline([(S(820), S(375)), (S(826), S(805))], S(7), seed=9); inkline([(S(645), S(590)), (S(996), S(584))], S(7), seed=10)
d.ellipse((S(700), S(420), S(800), S(520)), fill=(255, 238, 170))
# bed with green blanket
bed = [(S(40), S(1300)), (S(520), S(1290)), (S(540), S(1470)), (S(30), S(1480))]
paste_shape(bed, (70, 150, 90), 11, 10); outline(bed, S(8), 12)
pil = blob(S(140), S(1290), S(95), S(45), seed=13); paste_shape(pil, (246, 240, 228), 14, 4); outline(pil, S(6), 15)
# height ruler on the wall
paste_shape([(S(560), S(560)), (S(590), S(560)), (S(592), S(1340)), (S(562), S(1340))], (246, 196, 60), 16, 6)
for i in range(9): inkline([(S(560), S(600 + i * 90)), (S(585 if i % 2 else 600), S(600 + i * 90))], S(4), seed=17 + i)
# ---------------- Tuco, 3.2 m, bent under the ceiling (body leaning, head pressed up)
HEAD = (510, 360)                                   # head center
# legs (single pressure ink strokes) and red sneakers
for (hx, fx, s) in [(440, 380, 1), (560, 640, 2)]:
    inkline(curve((S(hx), S(1080)), (S(hx + (fx - hx) * 0.4), S(1300)), (S(fx), S(1560))), S(15), S(17), seed=20 + s)
    sh = blob(S(fx + 10), S(1572), S(62), S(30), seed=30 + s, flat=0.8); paste_shape(sh, (214, 50, 44), 31 + s, 12); outline(sh, S(7), 32 + s)
    inkline([(S(fx - 45), S(1590)), (S(fx + 66), S(1588))], S(6), seed=34 + s, col=(250, 244, 236))
# body: green hoodie, slightly crooked
body = [(S(395), S(640)), (S(610), S(620)), (S(640), S(860)), (S(620), S(1090)), (S(410), S(1100)), (S(380), S(870))]
paste_shape(body, (52, 150, 76), 40, 14); outline(body, S(8), 41)
pocket = [(S(440), S(950)), (S(585), S(945)), (S(575), S(1040)), (S(450), S(1045))]; paste_shape(pocket, (40, 120, 60), 42, 8); outline(pocket, S(5), 43)
collar = blob(S(505), S(640), S(110), S(34), seed=44); paste_shape(collar, (240, 196, 60), 45, 8); outline(collar, S(6), 46)
for x in (480, 532): inkline([(S(x), S(660)), (S(x - 4), S(760))], S(6), seed=47 + x, col=(250, 246, 236))
# arms: one pressing the ceiling, one on the knee (heavy single strokes + round hands)
inkline(curve((S(410), S(690)), (S(300), S(430)), (S(330), S(175))), S(16), S(14), seed=50); d.ellipse((S(300), S(150), S(360), S(210)), fill=INK)
inkline(curve((S(615), S(700)), (S(720), S(860)), (S(640), S(1050))), S(16), S(14), seed=51); d.ellipse((S(612), S(1025), S(672), S(1085)), fill=INK)
# neck
inkline([(S(500), S(500)), (S(506), S(632))], S(15), seed=52, col=INK)
# head: flattened, tilted, asymmetric; near-white with pale violet underside
hx, hy = S(HEAD[0]), S(HEAD[1])
head = blob(hx, hy, S(230), S(178), seed=60, wob=0.035, flat=0.88, tilt=-0.12)
paste_shape(head, (250, 248, 252), 61, 3)
under = Image.new('L', img.size, 0); ImageDraw.Draw(under).ellipse((hx - S(200), hy + S(40), hx + S(230), hy + S(200)), fill=110)
mh = Image.new('L', img.size, 0); ImageDraw.Draw(mh).polygon(head, fill=255); under = ImageChops.multiply(under.filter(ImageFilter.GaussianBlur(S(30))), mh)
img.paste(Image.new('RGB', img.size, (196, 188, 232)), (0, 0), under)
# messy black curls on top (pressed by the ceiling)
for i, (cx, cy, rr) in enumerate([(-150, -130, 62), (-80, -168, 70), (5, -180, 72), (90, -168, 68), (160, -125, 58), (-205, -70, 46)]):
    c = blob(hx + S(cx), hy + S(cy), S(rr), S(rr * 0.82), seed=70 + i, wob=0.08); paste_shape(c, (28, 22, 24), 71 + i, 8); outline(c, S(5), 72 + i)
outline(head, S(8), 62)
# meme face: shocked — wide eyes with heavy short lids, uneven brows, off-center open mouth, blush
for i, (ex, ey, s) in enumerate([(-78, -6, 1.0), (62, -12, 1.12)]):
    e = blob(hx + S(ex), hy + S(ey), S(40 * s), S(46 * s), seed=80 + i, wob=0.05); paste_shape(e, (255, 255, 255), 81 + i, 2); outline(e, S(6), 82 + i)
    d.ellipse((hx + S(ex - 13), hy + S(ey + 2), hx + S(ex + 13), hy + S(ey + 28)), fill=INK)
    inkline(curve((hx + S(ex - 46), hy + S(ey - 28)), (hx + S(ex), hy + S(ey - 54 - i * 8)), (hx + S(ex + 46), hy + S(ey - 34))), S(9), seed=84 + i)   # heavy lid
    inkline([(hx + S(ex - 44), hy + S(ey - 86 - i * 14)), (hx + S(ex + 40), hy + S(ey - 94 + i * 4))], S(11), seed=86 + i)            # brows
for i, (bx, by) in enumerate([(-150, 70), (150, 60)]):
    bl = Image.new('L', img.size, 0); ImageDraw.Draw(bl).ellipse((hx + S(bx - 46), hy + S(by - 24), hx + S(bx + 46), hy + S(by + 24)), fill=120)
    img.paste(Image.new('RGB', img.size, (244, 150, 160)), (0, 0), bl.filter(ImageFilter.GaussianBlur(S(10))))
mouth = blob(hx + S(28), hy + S(98), S(42), S(36), seed=90, wob=0.12, tilt=0.25); paste_shape(mouth, (150, 40, 52), 91, 6); outline(mouth, S(6), 92)
tooth = [(hx + S(2), hy + S(70)), (hx + S(52), hy + S(66)), (hx + S(48), hy + S(84)), (hx + S(6), hy + S(86))]; d.polygon(tooth, fill=(250, 248, 240))
# sweat drops
for i, (sx, sy) in enumerate([(-238, -40), (-252, 30)]):
    dr = [(hx + S(sx), hy + S(sy - 26)), (hx + S(sx + 15), hy + S(sy + 6)), (hx + S(sx), hy + S(sy + 18)), (hx + S(sx - 15), hy + S(sy + 6))]
    paste_shape(dr, (150, 210, 250), 95 + i, 4); outline(dr, S(4), 96 + i)
# ceiling fan hitting the curls
inkline([(S(760), S(150)), (S(760), S(215))], S(10), seed=100)
for i, (dx, dy) in enumerate([(-200, 10), (190, -6)]):
    bl = [(S(760), S(205)), (S(760 + dx), S(218 + dy)), (S(760 + dx * 1.02), S(250 + dy)), (S(760), S(240))]
    paste_shape(bl, (232, 226, 214), 101 + i, 6); outline(bl, S(6), 102 + i)
d.ellipse((S(735), S(200), S(785), S(250)), fill=(120, 110, 108)); outline(blob(S(760), S(225), S(25), S(25), seed=104), S(5), 105)
for i in range(3): inkline(curve((S(600 + i * 30), S(160)), (S(630 + i * 30), S(120)), (S(660 + i * 30), S(165))), S(5), seed=110 + i)   # impact ticks
# soft warm light + ground shadow + vignette
sh = Image.new('L', img.size, 0); ImageDraw.Draw(sh).ellipse((S(300), S(1560), S(740), S(1640)), fill=120)
img.paste(Image.new('RGB', img.size, (90, 50, 40)), (0, 0), sh.filter(ImageFilter.GaussianBlur(S(18))))
glow = Image.new('L', img.size, 0); ImageDraw.Draw(glow).ellipse((S(500), S(200), S(1200), S(1000)), fill=60)
img.paste(Image.new('RGB', img.size, (255, 236, 190)), (0, 0), glow.filter(ImageFilter.GaussianBlur(S(120))))
img = img.resize((W, H), Image.LANCZOS)
vg = Image.new('L', (W, H), 0); ImageDraw.Draw(vg).rectangle((0, 0, W, H), fill=70); ImageDraw.Draw(vg).ellipse((-200, -100, W + 200, H + 100), fill=0)
img.paste(Image.new('RGB', (W, H), (40, 24, 30)), (0, 0), vg.filter(ImageFilter.GaussianBlur(160)))
# caption (B6 profile: Archivo Black, white, dark outline, fixed baseline band) scaled to 1080 wide
FONT = '/root/.claude/skills/directing-stickman-videos/assets/b6/fonts/ArchivoBlack.ttf'
if not os.path.exists(FONT):
    import glob; c = glob.glob('/root/.claude/skills/directing-stickman-videos/**/ArchivoBlack.ttf', recursive=True); FONT = c[0] if c else None
f = ImageFont.truetype(FONT, int(47 * 1.5)) if FONT else ImageFont.load_default()
txt = 'Eu não caibo na cama!'; dd = ImageDraw.Draw(img); tw = dd.textlength(txt, font=f)
dd.text(((W - tw) / 2, 914 * 1.5 - 60), txt, font=f, fill=(255, 255, 255), stroke_width=6, stroke_fill=(23, 19, 25))
# the day plate
pf = ImageFont.truetype(FONT, 54) if FONT else f
dd.rounded_rectangle((300, 28, 780, 118), 30, fill=(30, 35, 80)); dd.text((540, 75), 'DIA 2  •  3,2 m', font=pf, fill=(246, 199, 68), anchor='mm')
img.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frame-b6.png'))
print('ok')
