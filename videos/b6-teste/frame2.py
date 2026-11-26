#!/usr/bin/env python3
"""B6-style frame drawn in code, round 2 (learned from the Sample 1 portrait V44 and the v21b character):
 - wide flattened head (wider than tall), no visible neck, lilac-pink soft shade on the lower third
 - heavy straight upper lids with low half-hidden pupils, thick uneven brows (one raised), tiny off-center mouth
 - hatched blush strokes, dark-brown ink with wobble, thick/thin pressure and a few double passes
 - matte paint with brush streaks and paper grain; single thick stick limbs out of the sleeves, round dark hands
Tuco, day 2 (3.2 m), hunched under his bedroom ceiling with the fan hitting his curls. 1080x1920.
Run: python3 videos/b6-teste/frame2.py"""
import math, os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

W, H, SS = 1080, 1920, 2
CW, CH = W * SS, H * SS
INK = (52, 34, 36)
rng = np.random.default_rng(11)
canvas = Image.new('RGB', (CW, CH), (238, 210, 172))
d = ImageDraw.Draw(canvas)
def S(v): return v * SS

# ---------------------------------------------------------------- texture helpers
def noise_field(w, h, scale, seed, stretch=(1, 1)):
    r = np.random.default_rng(seed); n = r.random((max(2, h // scale), max(2, w // scale))).astype(np.float32)
    im = Image.fromarray((n * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    if stretch != (1, 1): im = im.resize((max(1, w // stretch[0]), max(1, h // stretch[1])), Image.BILINEAR).resize((w, h), Image.BICUBIC)
    return np.asarray(im).astype(np.float32) / 255.0

def paint(poly, base, shade, light=(-0.6, -0.8), seed=1, streak=1.0, edge=0.0):
    """matte paint inside a polygon: a soft gradient from lit side to shaded side + brush streaks + darker edge"""
    xs = [p[0] for p in poly]; ys = [p[1] for p in poly]
    x0, y0, x1, y1 = int(min(xs)) - 2, int(min(ys)) - 2, int(max(xs)) + 3, int(max(ys)) + 3
    w, h = max(2, x1 - x0), max(2, y1 - y0)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    lx, ly = light; t = ((xx / w - 0.5) * -lx + (yy / h - 0.5) * -ly); t = (t - t.min()) / (np.ptp(t) + 1e-6)
    t = np.clip(t * 1.25 - 0.18, 0, 1) ** 1.4
    b, s = np.array(base, np.float32), np.array(shade, np.float32)
    col = b[None, None, :] * (1 - t[..., None]) + s[None, None, :] * t[..., None]
    st = noise_field(w, h, 6, seed, stretch=(1, 7)) - 0.5                       # vertical brush streaks
    bl = noise_field(w, h, 40, seed + 9) - 0.5                                   # broad blotches
    col += (st[..., None] * 16 + bl[..., None] * 14) * streak
    m = Image.new('L', (w, h), 0); ImageDraw.Draw(m).polygon([(x - x0, y - y0) for x, y in poly], fill=255)
    if edge:
        inner = m.filter(ImageFilter.GaussianBlur(S(10))); e = 1 - np.asarray(inner).astype(np.float32) / 255.0
        col -= (e * edge * np.asarray(m).astype(np.float32) / 255.0)[..., None]
    tile = Image.fromarray(np.clip(col, 0, 255).astype(np.uint8))
    canvas.paste(tile, (x0, y0), m)

def soft(shape_fn, color, blur, alpha=1.0, box=None):
    """a soft painted glow/shadow (shape_fn draws white on an L mask)"""
    m = Image.new('L', (CW, CH), 0); shape_fn(ImageDraw.Draw(m))
    m = m.filter(ImageFilter.GaussianBlur(blur)); m = m.point(lambda v: int(v * alpha))
    canvas.paste(Image.new('RGB', (CW, CH), color), (0, 0), m)

def catmull(pts, n=10):
    if len(pts) < 3: return pts
    P = [pts[0]] + pts + [pts[-1]]; out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for k in range(n):
            t = k / n; t2, t3 = t * t, t * t * t
            out.append(tuple(0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3) for j in range(2)))
    out.append(pts[-1]); return out

def ink(pts, w, seed=0, col=INK, closed=False, taper=True, repass=0.35, smooth=True):
    """pressure-varying ink: thick in the middle, thinner at the ends, a slight wobble, and a partial second pass"""
    r = random.Random(seed)
    if closed: pts = pts + pts[:2]
    P = catmull(pts) if smooth else pts
    # resample densely
    dense = []
    for (xa, ya), (xb, yb) in zip(P, P[1:]):
        n = max(1, int(math.hypot(xb - xa, yb - ya) / (0.8 * SS)))
        for k in range(n): dense.append((xa + (xb - xa) * k / n, ya + (yb - ya) * k / n))
    N = len(dense); ph = r.random() * 6
    for i, (x, y) in enumerate(dense):
        t = i / max(1, N - 1)
        k = (math.sin(math.pi * t) ** 0.5 if taper and not closed else 1.0) * (0.86 + 0.14 * math.sin(i * 0.035 + ph)) * (0.92 + 0.16 * math.sin(i * 0.11 + ph * 2))
        rr = max(0.6, w * k / 2)
        wob = math.sin(i * 0.09 + ph) * 0.7 * SS
        d.ellipse((x - rr + wob * 0.3, y - rr + wob * 0.2, x + rr + wob * 0.3, y + rr + wob * 0.2), fill=col)
    # a partial repass (sketchy double line) on a random stretch
    if repass and N > 40 and r.random() < repass * 2:
        a = r.randint(0, N // 2); b = min(N, a + r.randint(N // 6, N // 3)); off = r.uniform(1.5, 3.0) * SS
        for i in range(a, b, 2):
            x, y = dense[i]; rr = w * 0.22
            d.ellipse((x - rr + off, y - rr - off * 0.5, x + rr + off, y + rr - off * 0.5), fill=col)

def blob(cx, cy, rx, ry, n=72, seed=1, wob=0.03, flat_bottom=1.0, tilt=0.0, lumps=0):
    r = random.Random(seed); pts = []
    for i in range(n):
        a = i / n * 2 * math.pi
        k = 1 + wob * math.sin(a * 2 + r.random() * 0.3) + (lumps and 0.06 * max(0, math.sin(a * lumps)))
        x = math.cos(a) * rx * k; y = math.sin(a) * ry * k
        if y > 0: y *= flat_bottom
        pts.append((cx + x * math.cos(tilt) - y * math.sin(tilt), cy + x * math.sin(tilt) + y * math.cos(tilt)))
    return pts

def hatch(cx, cy, rx, ry, col=(232, 120, 132), seed=5):
    """the hatched blush: a soft pink spot plus short diagonal strokes"""
    soft(lambda dr: dr.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=255), col, S(8), 0.42)
    r = random.Random(seed)
    for i in range(9):
        x = cx - rx * 0.8 + i * rx * 0.2 + r.uniform(-2, 2) * SS; y = cy + r.uniform(-ry * 0.2, ry * 0.2)
        L = ry * 0.85
        d.line((x - L * 0.35, y + L * 0.5, x + L * 0.35, y - L * 0.5), fill=(214, 96, 110), width=int(2.2 * SS))

# ---------------------------------------------------------------- the room
# wall: warm cream plaster with a darker band (wainscot) and soft window light
paint([(0, 0), (CW, 0), (CW, S(1300)), (0, S(1300))], (243, 222, 186), (214, 178, 140), light=(0.7, -0.7), seed=2, streak=0.6)
paint([(0, S(1040)), (CW, S(1040)), (CW, S(1300)), (0, S(1300))], (150, 178, 160), (112, 140, 124), light=(0.7, -0.7), seed=3, streak=0.7)
ink([(0, S(1040)), (S(540), S(1036)), (CW, S(1042))], S(6), seed=4, taper=False)
for i in range(13): ink([(S(40 + i * 80), S(1052)), (S(42 + i * 80), S(1288))], S(3), seed=60 + i, col=(98, 122, 108), taper=False, repass=0)
# ceiling (low) and its shadow line
paint([(0, 0), (CW, 0), (CW, S(190)), (0, S(170))], (250, 240, 222), (226, 212, 192), light=(0, -1), seed=5, streak=0.4)
ink([(0, S(170)), (S(540), S(182)), (CW, S(190))], S(7), seed=6, taper=False)
soft(lambda dr: dr.rectangle((0, S(176), CW, S(230)), fill=255), (176, 140, 120), S(16), 0.35)
# floor: warm planks
paint([(0, S(1300)), (CW, S(1300)), (CW, CH), (0, CH)], (178, 112, 72), (132, 76, 50), light=(0.4, -1), seed=7, streak=1.1)
for i in range(11):
    y = 1330 + i * 58 + i * i * 2.2
    ink([(0, S(y)), (S(540), S(y - 3)), (CW, S(y + 2))], S(3.2), seed=70 + i, col=(118, 68, 44), taper=False, repass=0)
ink([(0, S(1300)), (S(560), S(1296)), (CW, S(1302))], S(7), seed=8, taper=False)
# window with curtains and morning sky
paint([(S(660), S(330)), (S(1010), S(322)), (S(1018), S(800)), (S(668), S(806))], (176, 214, 236), (226, 236, 232), light=(0, -1), seed=9, streak=0.4)
soft(lambda dr: dr.ellipse((S(700), S(380), S(860), S(540)), fill=255), (255, 244, 196), S(14), 0.9)
d.ellipse((S(740), S(420), S(820), S(500)), fill=(255, 238, 170))
for x in (838,): ink([(S(x), S(326)), (S(840), S(804))], S(8), seed=10, taper=False)
ink([(S(664), S(560)), (S(1014), S(556))], S(8), seed=11, taper=False)
ink([(S(660), S(330)), (S(1010), S(322)), (S(1018), S(800)), (S(668), S(806))], S(9), seed=12, closed=True, taper=False, smooth=False)
for (x0, x1, s) in [(620, 700, 13), (980, 1062, 14)]:
    cur = [(S(x0), S(300)), (S(x1), S(300)), (S(x1 + 8), S(560)), (S(x1 - 10), S(840)), (S(x0 + 4), S(850)), (S(x0 - 6), S(560))]
    paint(cur, (74, 132, 118), (46, 92, 84), light=(-0.6, -0.8), seed=s, streak=1.2); ink(cur, S(6), seed=s + 1, closed=True, taper=False)
    for k in range(3): ink([(S(x0 + 18 + k * 22), S(310)), (S(x0 + 14 + k * 22), S(840))], S(3), seed=s + 5 + k, col=(40, 80, 72), repass=0)
ink([(S(600), S(300)), (S(1080), S(300))], S(9), seed=15, taper=False)
# football poster
pst = [(S(70), S(360)), (S(300), S(352)), (S(308), S(660)), (S(76), S(668))]
paint(pst, (52, 96, 170), (36, 70, 130), seed=16, streak=0.6); ink(pst, S(6), seed=17, closed=True, taper=False, smooth=False)
d.ellipse((S(130), S(430), S(250), S(550)), fill=(250, 246, 236)); ink(blob(S(190), S(490), S(60), S(60), seed=18), S(5), seed=19, closed=True, taper=False)
def pent(cx, cy, r, rot=0):
    return [(S(cx + r * math.cos(rot + k * 2 * math.pi / 5 - math.pi / 2)), S(cy + r * math.sin(rot + k * 2 * math.pi / 5 - math.pi / 2))) for k in range(5)]
d.polygon(pent(190, 490, 20), fill=INK)
for k in range(5):
    a = k * 2 * math.pi / 5 - math.pi / 2; ink([(S(190 + 20 * math.cos(a)), S(490 + 20 * math.sin(a))), (S(190 + 44 * math.cos(a)), S(490 + 44 * math.sin(a)))], S(4), seed=20 + k, taper=False, repass=0)
    d.polygon(pent(190 + 54 * math.cos(a), 490 + 54 * math.sin(a), 11, a), fill=INK)
ink([(S(120), S(600)), (S(260), S(596))], S(10), seed=21, col=(246, 199, 68), taper=False, repass=0)
# the bed (left), green blanket with folds, pillow
bed = [(S(-20), S(1150)), (S(430), S(1140)), (S(452), S(1330)), (S(-20), S(1350))]
paint([(S(-20), S(1060)), (S(60), S(1060)), (S(60), S(1340)), (S(-20), S(1340))], (140, 88, 56), (104, 62, 40), seed=22); ink([(S(60), S(1060)), (S(60), S(1340))], S(7), seed=23, taper=False)
paint(bed, (78, 156, 98), (46, 108, 66), light=(0.6, -0.8), seed=24, streak=1.0); ink(bed, S(7), seed=25, closed=True, taper=False)
for k in range(3): ink([(S(140 + k * 90), S(1160)), (S(160 + k * 90), S(1230)), (S(150 + k * 90), S(1320))], S(4), seed=26 + k, col=(40, 96, 56))
pil = blob(S(150), S(1142), S(92), S(40), seed=29, wob=0.06); paint(pil, (248, 244, 234), (214, 206, 196), seed=30, streak=0.3); ink(pil, S(6), seed=31, closed=True, taper=False)
# the height ruler (behind Tuco)
rul = [(S(600), S(520)), (S(632), S(520)), (S(634), S(1036)), (S(602), S(1036))]
paint(rul, (246, 200, 70), (214, 160, 40), seed=32, streak=0.3); ink(rul, S(5), seed=33, closed=True, taper=False, smooth=False)
for i in range(11): ink([(S(602), S(540 + i * 46)), (S(618 if i % 2 else 628), S(540 + i * 46))], S(3.5), seed=34 + i, taper=False, repass=0)

# ---------------------------------------------------------------- Tuco (3.2 m), hunched under the ceiling
HX, HY = 470, 330                                  # head centre
# legs: single thick ink strokes, slightly bent (knees pushed apart), red sneakers
for s, pts, fx in [(1, [(410, 1030), (370, 1240), (330, 1520)], 330), (2, [(540, 1030), (600, 1240), (640, 1520)], 650)]:
    ink([(S(x), S(y)) for x, y in pts], S(21), seed=40 + s, taper=False)
    sh = blob(S(fx + (14 if s == 2 else -14)), S(1534), S(66), S(30), seed=42 + s, wob=0.05, flat_bottom=0.7)
    paint(sh, (218, 58, 48), (160, 34, 34), seed=44 + s, streak=0.5); ink(sh, S(7), seed=46 + s, closed=True, taper=False)
    ink([(S(fx - 52 + (14 if s == 2 else -14)), S(1552)), (S(fx + 76 + (14 if s == 2 else -14) - 30), S(1554))], S(6), seed=48 + s, col=(250, 246, 236), taper=False, repass=0)
soft(lambda dr: dr.ellipse((S(220), S(1520), S(780), S(1600)), fill=255), (70, 36, 30), S(22), 0.5)
# torso: green hoodie, crooked trapezoid leaning to the left (hunched), pouch, yellow collar + strings
torso = [(S(330), S(560)), (S(560), S(548)), (S(610), S(760)), (S(592), S(1040)), (S(372), S(1048)), (S(318), S(800))]
paint(torso, (60, 160, 84), (30, 104, 56), light=(-0.7, -0.7), seed=50, streak=1.0, edge=26); ink(torso, S(9), seed=51, closed=True, taper=False)
pouch = [(S(372), S(880)), (S(548), S(872)), (S(560), S(980)), (S(380), S(986))]
paint(pouch, (44, 130, 68), (26, 92, 50), seed=52, streak=0.8); ink(pouch, S(6), seed=53, closed=True, taper=False)
hood = [(S(330), S(560)), (S(440), S(612)), (S(560), S(548)), (S(520), S(530)), (S(440), S(560)), (S(370), S(536))]
paint(hood, (246, 200, 68), (210, 160, 40), seed=54, streak=0.5); ink(hood, S(6), seed=55, closed=True, taper=False)
for x0 in (420, 470): ink([(S(x0), S(600)), (S(x0 - 4), S(700))], S(6), seed=56 + x0, col=(250, 246, 236), repass=0); d.ellipse((S(x0 - 12), S(694), S(x0 + 4), S(712)), fill=(246, 200, 68))
# arms: the right one pushing the ceiling, the left one on the knee (single strokes out of the sleeves)
ink([(S(340), S(600)), (S(250), S(420)), (S(258), S(200))], S(18), seed=60)
d.ellipse((S(226), S(172), S(292), S(238)), fill=INK)
ink([(S(596), S(640)), (S(676), S(880)), (S(604), S(1196))], S(18), seed=61)
d.ellipse((S(570), S(1170), S(640), S(1236)), fill=INK)
# head: wide, flattened, tilted against the ceiling; lilac-pink lower shade; no neck
head = blob(S(HX), S(HY), S(250), S(176), seed=70, wob=0.025, flat_bottom=0.86, tilt=-0.10)
paint(head, (253, 251, 248), (240, 228, 236), light=(0.15, -1), seed=71, streak=0.25)
mh = Image.new('L', (CW, CH), 0); ImageDraw.Draw(mh).polygon(head, fill=255)
sh_ = Image.new('L', (CW, CH), 0); ImageDraw.Draw(sh_).ellipse((S(HX - 300), S(HY + 70), S(HX + 300), S(HY + 300)), fill=255)
sh_ = ImageChops.multiply(sh_.filter(ImageFilter.GaussianBlur(S(30))), mh).point(lambda v: int(v * 0.6))
canvas.paste(Image.new('RGB', (CW, CH), (206, 176, 214)), (0, 0), sh_)
# keep the shade inside the head: repaint outside with what was there is complex; instead clip with the mask
# (the soft shade above only spills inside because the head dominates the area; edge cleaned by the outline)
# curls: chunky black masses on top, squashed by the ceiling
for i, (cx, cy, rx, ry) in enumerate([(-200, -96, 70, 58), (-128, -150, 84, 62), (-30, -170, 92, 58), (70, -168, 88, 56), (160, -136, 78, 60), (222, -74, 54, 48)]):
    c = blob(S(HX + cx), S(HY + cy), S(rx), S(ry), seed=80 + i, wob=0.09, lumps=5)
    paint(c, (44, 34, 36), (22, 16, 20), seed=81 + i, streak=0.6); ink(c, S(6), seed=82 + i, closed=True, taper=False)
# fringe over the forehead
fr = [(S(HX - 210), S(HY - 60)), (S(HX - 120), S(HY - 120)), (S(HX + 20), S(HY - 132)), (S(HX + 170), S(HY - 106)), (S(HX + 228), S(HY - 50)), (S(HX + 140), S(HY - 78)), (S(HX + 60), S(HY - 70)), (S(HX - 30), S(HY - 92)), (S(HX - 120), S(HY - 70))]
paint(fr, (44, 34, 36), (24, 18, 22), seed=88, streak=0.5); ink(fr, S(6), seed=89, closed=True, taper=False)
ink(head, S(10), seed=72, closed=True, taper=False)
# face (shocked meme): heavy straight lids, pupils low and half hidden, thick uneven brows (left raised), tiny open mouth
for i, (ex, ey, s) in enumerate([(-92, 12, 1.0), (84, 4, 1.08)]):
    cx, cy = S(HX + ex), S(HY + ey)
    eye = blob(cx, cy + S(6), S(46 * s), S(36 * s), seed=90 + i, wob=0.04)
    d.polygon(eye, fill=(255, 255, 255)); ink(eye[36:] + eye[:1], S(5), seed=92 + i, taper=False, repass=0)
    d.ellipse((cx - S(20), cy - S(2), cx + S(20), cy + S(38)), fill=(30, 22, 26))
    d.ellipse((cx + S(2), cy + S(4), cx + S(10), cy + S(12)), fill=(255, 255, 255))
    ink([(cx - S(54 * s), cy - S(2)), (cx, cy - S(8)), (cx + S(54 * s), cy - S(4))], S(12), seed=94 + i, taper=False)          # heavy lid
    by = -64 - (26 if i == 0 else 0)
    ink([(cx - S(50), cy + S(by + (8 if i == 0 else -4))), (cx, cy + S(by - (14 if i == 0 else 0))), (cx + S(48), cy + S(by + 4))], S(13), seed=96 + i)  # brows
hatch(S(HX - 160), S(HY + 92), S(54), S(30), seed=98); hatch(S(HX + 152), S(HY + 84), S(50), S(28), seed=99)
mouth = blob(S(HX + 26), S(HY + 112), S(26), S(22), seed=100, wob=0.1, tilt=0.3)
paint(mouth, (150, 42, 56), (110, 28, 40), seed=101, streak=0.3); ink(mouth, S(6), seed=102, closed=True, taper=False)
d.polygon([(S(HX + 8), S(HY + 98)), (S(HX + 40), S(HY + 94)), (S(HX + 38), S(HY + 106)), (S(HX + 10), S(HY + 108))], fill=(250, 248, 240))
# sweat drops flying off
for i, (sx, sy, k) in enumerate([(-282, -16, 1.0), (-300, 46, 0.8), (276, -60, 0.9)]):
    x, y = S(HX + sx), S(HY + sy)
    dr = [(x, y - S(28 * k)), (x + S(16 * k), y + S(4)), (x, y + S(18 * k)), (x - S(16 * k), y + S(4))]
    paint(dr, (168, 218, 250), (110, 170, 220), seed=104 + i, streak=0.2); ink(dr, S(4), seed=106 + i, closed=True, taper=False)
# the ceiling fan hitting the curls + impact ticks
FX, FY = 760, 172
ink([(S(FX), S(FY)), (S(FX), S(236))], S(10), seed=110, taper=False)
for i, (dx, dy) in enumerate([(-236, 18), (220, -8)]):
    bl = [(S(FX), S(226)), (S(FX + dx), S(236 + dy)), (S(FX + dx * 1.03), S(266 + dy)), (S(FX), S(258))]
    paint(bl, (236, 228, 214), (196, 184, 168), seed=111 + i, streak=0.4); ink(bl, S(6), seed=113 + i, closed=True, taper=False)
hub = blob(S(FX), S(246), S(28), S(26), seed=115); paint(hub, (140, 128, 124), (100, 90, 88), seed=116); ink(hub, S(6), seed=117, closed=True, taper=False)
for i in range(4):
    a = math.radians(200 + i * 22); ink([(S(560 + math.cos(a) * 40), S(200 + math.sin(a) * 40)), (S(560 + math.cos(a) * 86), S(200 + math.sin(a) * 86))], S(6), seed=118 + i)
# ---------------------------------------------------------------- finish: warm window light, paper grain, vignette
soft(lambda dr: dr.ellipse((S(520), S(180), S(1240), S(1100)), fill=255), (255, 236, 188), S(140), 0.28)
img = canvas.resize((W, H), Image.LANCZOS)
arr = np.asarray(img).astype(np.float32)
grain = noise_field(W, H, 1, 77) - 0.5; fib = noise_field(W, H, 3, 78, stretch=(5, 1)) - 0.5
arr *= (1 + grain[..., None] * 0.05 + fib[..., None] * 0.04)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32); v = ((xx / W - 0.5) ** 2 * 1.2 + (yy / H - 0.48) ** 2) ** 0.5
arr *= (1 - np.clip(v - 0.42, 0, 1) * 0.55)[..., None]
img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
# caption (B6 profile: Archivo Black, white, dark outline, fixed baseline band), the day plate
import glob
FONT = (glob.glob('/root/.claude/skills/directing-stickman-videos/**/ArchivoBlack.ttf', recursive=True) or [None])[0]
dd = ImageDraw.Draw(img)
f = ImageFont.truetype(FONT, 70); txt = 'Eu não caibo na cama!'; tw = dd.textlength(txt, font=f)
dd.text(((W - tw) / 2, 1310), txt, font=f, fill=(255, 255, 255), stroke_width=6, stroke_fill=(23, 19, 25))
pf = ImageFont.truetype(FONT, 50)
dd.rounded_rectangle((316, 1640, 764, 1726), 28, fill=(30, 35, 80), outline=(23, 19, 25), width=5); dd.text((540, 1684), 'DIA 2  •  3,2 m', font=pf, fill=(246, 199, 68), anchor='mm')
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frame-b6-v3.png'); img.save(out); print(out)
