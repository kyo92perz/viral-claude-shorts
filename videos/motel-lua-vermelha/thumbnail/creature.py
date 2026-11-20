"""The shadow as a realistic creature for the thumbnail: an emaciated, hunched figure made of smoke on the wall, with
too-long jointed arms, clawed fingers curling over its victim, a red rim light for volume, glowing white eyes with slit
pupils and a torn mouth full of needle teeth. Drawn at 3x and scaled down (smooth edges). Deterministic (seeded).
  draw_creature(W, H, seed) -> RGBA image of W x H (transparent around the creature)"""
import math, random
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

S = 3   # supersampling


def _p(x, y): return (x * S, y * S)


def _taper(d, a, b, wa, wb, fill=255):
    """a limb segment from a (width wa) to b (width wb), rounded joints"""
    ax, ay = a; bx, by = b; dx, dy = bx - ax, by - ay; L = math.hypot(dx, dy) or 1; nx, ny = -dy / L, dx / L
    pts = [(ax + nx * wa / 2, ay + ny * wa / 2), (bx + nx * wb / 2, by + ny * wb / 2), (bx - nx * wb / 2, by - ny * wb / 2), (ax - nx * wa / 2, ay - ny * wa / 2)]
    d.polygon([_p(*q) for q in pts], fill=fill)
    for (cx, cy), w in ((a, wa), (b, wb)): d.ellipse([_p(cx - w / 2, cy - w / 2), _p(cx + w / 2, cy + w / 2)], fill=fill)


def _chain(d, pts, widths, fill=255):
    for i in range(len(pts) - 1): _taper(d, pts[i], pts[i + 1], widths[i], widths[i + 1], fill)


def _finger(base, ang, length, curl, segs=3):
    """a finger as points: starts at base along ang (radians), each joint bends by curl"""
    pts = [base]; x, y = base; a = ang
    for i in range(segs):
        l = length * (0.42 if i == 0 else 0.33 if i == 1 else 0.25)
        x, y = x + math.cos(a) * l, y + math.sin(a) * l; pts.append((x, y)); a += curl
    return pts, a


def _skull(cx, cy, w, h, rot):
    pts = []
    for i in range(64):
        t = i / 64 * 2 * math.pi; c, s = math.cos(t), math.sin(t)
        r = 1.0 - 0.18 * max(0, s) ** 2   # a narrower jaw
        x, y = c * w / 2 * r, s * h / 2
        pts.append((cx + x * math.cos(rot) - y * math.sin(rot), cy + x * math.sin(rot) + y * math.cos(rot)))
    return pts


def draw_creature(W, H, seed=7, head=(470, 250), lean=-0.2):
    rnd = random.Random(seed)
    big = (W * S, H * S)
    body = Image.new('L', big, 0); d = ImageDraw.Draw(body)
    hx, hy = head
    # ---- skeleton (thumbnail coordinates) ----
    neck = [(hx - 8, hy + 70), (hx - 20, hy + 150)]
    shL, shR = (hx - 108, hy + 168), (hx + 98, hy + 140)
    _chain(d, [neck[0], neck[1]], [40, 46])
    d.polygon([_p(*q) for q in [shL, (hx - 20, hy + 130), shR, (hx + 55, hy + 260), (hx + 30, hy + 400), (hx + 45, H + 60), (hx - 100, H + 60), (hx - 80, hy + 400), (hx - 90, hy + 260)]], fill=255)
    for q, r in ((shL, 22), (shR, 20)): d.ellipse([_p(q[0] - r, q[1] - r), _p(q[0] + r, q[1] + r)], fill=255)
    # left arm: up and out, the hand spread like a cage
    armL = [shL, (hx - 215, hy + 25), (hx - 185, hy - 105)]
    _chain(d, armL, [36, 22, 14])
    # right arm: over the victim's head, the fingers curling down at him
    armR = [shR, (hx + 190, hy + 60), (hx + 255, hy - 20)]
    _chain(d, armR, [34, 22, 14])
    claws = []
    for (wx, wy), base_a, spread, curl in ((armL[-1], -1.8, 0.3, -0.16), (armR[-1], 0.05, 0.3, 0.5)):
        for k in range(4):
            a = base_a + (k - 1.5) * spread
            fp, end_a = _finger((wx, wy), a, 92 + 18 * (k == 1 or k == 2), curl)
            _chain(d, fp, [15, 12, 9, 6])
            claws.append((fp[-1], end_a))
    head_pts = _skull(hx, hy, 120, 168, lean)
    d.polygon([_p(*q) for q in head_pts], fill=255)
    # ---- smoke: blobs that leak out of the outline and rise ----
    arr = np.array(body.resize((W // 2, H // 2)))
    ys, xs = np.nonzero(arr > 128)
    smoke = Image.new('L', big, 0); sd = ImageDraw.Draw(smoke)
    for _ in range(1700):
        i = rnd.randrange(len(xs)); x, y = xs[i] * 2, ys[i] * 2
        dx, dy = rnd.gauss(0, 30), rnd.gauss(-16, 30); r = rnd.uniform(6, 30)
        sd.ellipse([_p(x + dx - r, y + dy - r), _p(x + dx + r, y + dy + r)], fill=rnd.randint(60, 160))
    for _ in range(46):   # wisps rising off the head, the shoulders and the arms
        i = rnd.randrange(len(xs)); x, y = xs[i] * 2, ys[i] * 2
        if y > hy + 250: continue
        h = rnd.uniform(40, 120); w = rnd.uniform(6, 14)
        sd.ellipse([_p(x - w, y - h), _p(x + w, y)], fill=rnd.randint(70, 140))
    smoke = smoke.filter(ImageFilter.GaussianBlur(11 * S))
    alpha = ImageChops.lighter(body.filter(ImageFilter.GaussianBlur(1.2 * S)), smoke)
    # the lower body dissolves
    fade = Image.new('L', big, 255); fd = ImageDraw.Draw(fade)
    for y in range(int((hy + 330) * S), H * S, S):
        k = max(0.0, 1 - (y / S - (hy + 330)) / (H - hy - 330 + 1)); fd.line([(0, y), (W * S, y)], fill=int(255 * k ** 1.3))
    alpha = ImageChops.multiply(alpha, fade.filter(ImageFilter.GaussianBlur(20 * S)))
    # ---- colour: deep black with a little volume, ribs, a red rim on the lit side ----
    col = Image.new('RGBA', big, (7, 5, 9, 255))
    vol = Image.new('L', big, 0); ImageDraw.Draw(vol).ellipse([_p(hx - 120, hy + 140), _p(hx + 90, hy + 470)], fill=40)
    col = Image.composite(Image.new('RGBA', big, (28, 18, 24, 255)), col, vol.filter(ImageFilter.GaussianBlur(40 * S)))
    cd = ImageDraw.Draw(col)
    for k in range(6):
        y = hy + 205 + k * 30; w = 70 - k * 6
        cd.arc([_p(hx - 20 - w, y - 16), _p(hx - 20 + w, y + 16)], 200, 340, fill=(40, 26, 32, 255), width=4 * S)
    cd.line([_p(hx - 20, hy + 180), _p(hx - 15, hy + 400)], fill=(34, 22, 28, 255), width=5 * S)   # spine
    noise = Image.fromarray((np.random.default_rng(seed).random((H // 4, W // 4)) * 255).astype('uint8')).resize(big, Image.BICUBIC).filter(ImageFilter.GaussianBlur(3 * S))
    col = Image.composite(Image.new('RGBA', big, (34, 24, 30, 255)), col, noise.point(lambda v: max(0, v - 150)))
    rim = ImageChops.subtract(body, ImageChops.offset(body, -5 * S, 3 * S)).filter(ImageFilter.GaussianBlur(2 * S))
    col = Image.composite(Image.new('RGBA', big, (200, 25, 30, 255)), col, rim.point(lambda v: int(v * 0.5)))
    col.putalpha(alpha)
    # ---- eyes: glowing almonds with slit pupils ----
    glow = Image.new('L', big, 0); gd = ImageDraw.Draw(glow)
    eyes = [(hx - 30, hy - 10, -0.25), (hx + 28, hy - 18, 0.25)]
    for ex, ey, r in eyes: gd.ellipse([_p(ex - 26, ey - 15), _p(ex + 26, ey + 15)], fill=255)
    glow = glow.filter(ImageFilter.GaussianBlur(12 * S))
    col = Image.alpha_composite(col, _solid(big, (255, 240, 210), glow.point(lambda v: int(v * 0.75))))
    ed = ImageDraw.Draw(col)
    for ex, ey, r in eyes:
        pts = []
        for i in range(40):
            t = i / 40 * 2 * math.pi; x, y = math.cos(t) * 21, math.sin(t) * 9 * (1 if math.sin(t) > 0 else 1.25)
            pts.append(_p(ex + x * math.cos(r) - y * math.sin(r), ey + x * math.sin(r) + y * math.cos(r)))
        ed.polygon(pts, fill=(255, 252, 238, 255))
        ed.ellipse([_p(ex - 2.5, ey - 8), _p(ex + 2.5, ey + 8)], fill=(10, 0, 0, 255))
    # ---- the mouth: a torn crescent, red inside, needle teeth, drool ----
    mx0, mx1, my = hx - 58, hx + 52, hy + 42
    upper = [(mx0 + (mx1 - mx0) * i / 30, my - 6 + 12 * math.sin(math.pi * i / 30) * 0.3) for i in range(31)]
    lower = [(mx0 + (mx1 - mx0) * i / 30, my + 42 * math.sin(math.pi * i / 30)) for i in range(31)]
    ed.polygon([_p(*q) for q in upper + lower[::-1]], fill=(70, 0, 10, 255))
    inner = Image.new('L', big, 0); ImageDraw.Draw(inner).ellipse([_p(hx - 30, my + 5), _p(hx + 25, my + 34)], fill=200)
    col = Image.alpha_composite(col, _solid(big, (190, 10, 25), inner.filter(ImageFilter.GaussianBlur(10 * S))))
    ed = ImageDraw.Draw(col)
    for i in range(16):   # upper teeth, pointing down
        x = mx0 + 4 + (mx1 - mx0 - 8) * i / 15; y = upper[int(i * 30 / 15)][1]; L = 14 + 8 * math.sin(math.pi * i / 15) + rnd.uniform(-3, 3)
        ed.polygon([_p(x - 3.2, y), _p(x + 3.2, y), _p(x + rnd.uniform(-1, 1), y + L)], fill=(236, 230, 212, 255))
    for i in range(15):   # lower teeth, pointing up
        x = mx0 + 8 + (mx1 - mx0 - 16) * i / 14; y = lower[int(2 + i * 26 / 14)][1]; L = 12 + 9 * math.sin(math.pi * i / 14) + rnd.uniform(-3, 3)
        ed.polygon([_p(x - 3, y), _p(x + 3, y), _p(x + rnd.uniform(-1, 1), y - L)], fill=(220, 214, 196, 255))
    for x in (hx - 30, hx + 8, hx + 30):   # drool
        y0 = my + 30 + rnd.uniform(0, 8); y1 = y0 + rnd.uniform(25, 55)
        ed.line([_p(x, y0), _p(x + 2, y1)], fill=(210, 205, 190, 200), width=2 * S); ed.ellipse([_p(x - 3, y1 - 2), _p(x + 5, y1 + 6)], fill=(210, 205, 190, 220))
    # ---- claws: curved bone hooks at every fingertip ----
    for (fx, fy), a in claws:
        tip = (fx + math.cos(a) * 30, fy + math.sin(a) * 30); side = (math.cos(a + 1.57) * 6, math.sin(a + 1.57) * 6)
        ed.polygon([_p(fx + side[0], fy + side[1]), _p(*tip), _p(fx - side[0], fy - side[1])], fill=(214, 206, 188, 255))
    return col.resize((W, H), Image.LANCZOS)


def _solid(size, rgb, mask):
    s = Image.new('RGBA', size, rgb + (255,)); s.putalpha(mask); return s
