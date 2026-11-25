#!/usr/bin/env python3
"""Check thumbnails the way a phone shows them: size and format, brightness, contrast, colour, clutter, the busy
bottom-right corner (where YouTube puts the duration), and a mock feed preview at real phone sizes in light and dark
mode, next to the other images given (e.g. competitors' thumbnails) so you can compare.

  usage: python3 thumb_check.py capa.jpg [outra.jpg ...] [--out previa.png] [--json]

Numbers are heuristics (see references/thumbnail.md), not a CTR prediction. Status goes to stderr; the report to stdout.
Needs Pillow."""
import json, sys
from PIL import Image, ImageDraw, ImageFilter, ImageStat

def analyse(path):
    im = Image.open(path); w, h = im.size; fmt = (im.format or '').upper()
    rgb = im.convert('RGB'); small = rgb.resize((320, max(1, round(320 * h / w))))
    L = small.convert('L'); st = ImageStat.Stat(L)
    bright, contrast = st.mean[0], st.stddev[0]
    hsv = small.convert('HSV'); sat = ImageStat.Stat(hsv).mean[1]
    edges = ImageStat.Stat(L.filter(ImageFilter.FIND_EDGES)).mean[0]   # clutter: how much detail at phone size
    # the bottom-right corner where the duration badge sits (last 22% x 18%)
    cw, ch = small.size; corner = L.crop((int(cw * 0.78), int(ch * 0.82), cw, ch))
    corner_edges = ImageStat.Stat(corner.filter(ImageFilter.FIND_EDGES)).mean[0]
    ratio = w / h; kind = 'longo (16:9)' if abs(ratio - 16 / 9) < 0.03 else 'short (9:16)' if abs(ratio - 9 / 16) < 0.03 else 'outro'
    notes, good = [], []
    if kind == 'longo (16:9)':
        if (w, h) != (1280, 720) and w < 1280: notes.append(f'tamanho {w}x{h}: use 1280x720')
        import os
        if os.path.getsize(path) > 2 * 1024 * 1024: notes.append('arquivo acima de 2 MB: o YouTube recusa; salve em JPG qualidade ~90')
        if fmt not in ('JPEG', 'PNG'): notes.append(f'formato {fmt}: use JPG ou PNG')
        if corner_edges > 1.4 * edges and corner_edges > 18: notes.append('canto inferior direito cheio: a duração do vídeo vai cobrir esse detalhe')
    elif kind == 'outro': notes.append(f'proporção {w}x{h} incomum: capas são 16:9 (longo) ou 9:16 (Short)')
    if bright < 55: notes.append(f'muito escura (brilho {bright:.0f}/255): ilumine o assunto, ou ela some no feed escuro')
    elif bright > 200: notes.append(f'muito clara (brilho {bright:.0f}/255): some no feed claro')
    else: good.append(f'brilho {bright:.0f}/255 ok')
    if contrast < 45: notes.append(f'contraste baixo ({contrast:.0f}): assunto e fundo parecidos; separe por cor e luz')
    elif contrast > 60: good.append(f'contraste alto ({contrast:.0f})')
    if sat < 70: notes.append(f'cores apagadas (saturação {sat:.0f}/255): dê uma cor forte ao assunto')
    elif sat > 110: good.append(f'cores vivas (saturação {sat:.0f}/255)')
    if edges > 32: notes.append(f'muito detalhe no tamanho do celular ({edges:.0f}): simplifique o fundo')
    elif edges < 6: notes.append(f'pouca informação ({edges:.0f}): o assunto está pequeno ou a capa está vazia')   # flat cartoon art is naturally low (~8-12)
    score = max(0, 10 - 2 * len(notes))
    return {'arquivo': path, 'tamanho': f'{w}x{h}', 'tipo': kind, 'brilho': round(bright), 'contraste': round(contrast),
            'saturacao': round(sat), 'detalhe': round(edges), 'nota': score, 'bom': good, 'melhorar': notes}

def preview(paths, out):
    """A mock phone feed: long-video thumbnails at 360 and 168 px wide, Shorts covers at 180 and 110 px, on the dark and the light feed."""
    rows = []
    for bg, fg in (('#0f0f0f', '#f1f1f1'), ('#ffffff', '#0f0f0f')):
        tiles = []
        for p in paths:
            im = Image.open(p).convert('RGB'); w, h = im.size
            for tw in ((360, 168) if w > h else (180, 110)):   # long videos vs Shorts as a phone shows them
                th = round(tw * h / w); t = im.resize((tw, th), Image.LANCZOS)
                card = Image.new('RGB', (tw + 24, th + 52), bg); card.paste(t, (12, 12))
                d = ImageDraw.Draw(card); d.rectangle((12, th + 22, 12 + int(tw * 0.8), th + 30), fill=fg); d.rectangle((12, th + 36, 12 + int(tw * 0.5), th + 42), fill='#808080')
                tiles.append(card)
        W = sum(t.width for t in tiles); H = max(t.height for t in tiles)
        row = Image.new('RGB', (W, H), bg); x = 0
        for t in tiles: row.paste(t, (x, 0)); x += t.width
        rows.append(row)
    W = max(r.width for r in rows); canvas = Image.new('RGB', (W, sum(r.height for r in rows)), '#808080'); y = 0
    for r in rows: canvas.paste(r, (0, y)); y += r.height
    canvas.save(out); print(f'prévia do feed: {out}', file=sys.stderr)

def main():
    a = sys.argv[1:]
    if not a or a[0] in ('-h', '--help'): print(__doc__, file=sys.stderr); sys.exit(2)
    out = a[a.index('--out') + 1] if '--out' in a else 'previa-feed.png'
    paths = [x for i, x in enumerate(a) if not x.startswith('--') and (i == 0 or a[i - 1] != '--out')]
    res = [analyse(p) for p in paths]
    preview(paths, out)
    if '--json' in a: print(json.dumps(res, ensure_ascii=False, indent=1)); return
    for r in res:
        print(f'{r["arquivo"]} ({r["tipo"]}, {r["tamanho"]}): nota {r["nota"]}/10')
        for g in r['bom']: print(f'  + {g}')
        for n in r['melhorar']: print(f'  - {n}')
        print()
    print(f'Olhe a prévia ({out}): entende a capa em 1 segundo no tamanho menor, no feed claro e no escuro?')

if __name__ == '__main__':
    main()
