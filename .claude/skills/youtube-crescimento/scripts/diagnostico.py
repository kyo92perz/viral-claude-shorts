#!/usr/bin/env python3
"""Diagnose each video from a YouTube Studio export (Analytics -> Advanced mode -> Export -> CSV), comparing it with
the channel's own median. Column names in Portuguese or English are recognised; missing columns are skipped.

  usage: python3 diagnostico.py <Tabela.csv> [--json]
         python3 diagnostico.py --demo [--json]

Rules (see references/diagnostico.md): low impressions -> topic/demand; CTR < 4% (or < 70% of the channel median) ->
thumbnail/title; average percentage viewed below the median -> hook/middle; good numbers but few subscribers -> series.
Status messages go to stderr; the report (text or JSON) to stdout."""
import csv, io, json, statistics, sys

COLS = {   # our key -> accepted header names (lower case, accents kept)
    'title': ['título do vídeo', 'titulo do video', 'video title', 'título', 'title', 'conteúdo', 'content'],
    'views': ['visualizações', 'visualizacoes', 'views'],
    'impr': ['impressões', 'impressoes', 'impressions'],
    'ctr': ['taxa de cliques de impressões (%)', 'taxa de cliques das impressões (%)', 'impressions click-through rate (%)', 'ctr'],
    'avp': ['porcentagem visualizada média (%)', 'percentagem visualizada média (%)', 'average percentage viewed (%)', 'retenção', 'retencao'],
    'avd': ['duração média da visualização', 'average view duration'],
    'subs': ['inscritos', 'subscribers', 'inscrições'],
    'likes': ['marcações "gostei"', 'gostei', 'likes'],
    'comments': ['comentários adicionados', 'comentários', 'comments added', 'comments'],
    'stayed': ['assistiram (%)', 'stayed to watch (%)', 'continuaram assistindo (%)'],
    'dur': ['duração', 'duracao', 'duration', 'duração do vídeo'],
}
DEMO = """Título do vídeo,Duração,Visualizações,Impressões,Taxa de cliques de impressões (%),Porcentagem visualizada média (%),Inscritos,Comentários adicionados
Exemplo A: Meu primo era o SÉTIMO filho #shorts,67,18000,240000,6.9,92,410,14
Exemplo B: Ela senta no seu peito #shorts,70,2900,61000,4.1,81,40,0
Exemplo C: Ela deu a TERCEIRA descarga #shorts,74,1000,52000,1.8,64,6,0
Exemplo D: O Caso Varginha,720,820,39000,2.1,38,9,3
Exemplo E: Operação Prato,780,4100,61000,6.2,47,60,25
"""

def num(v):
    if v is None: return None
    s = str(v).strip().replace('%', '').replace(' ', '')
    if not s or s in ('-', '—'): return None
    if ':' in s:   # durations like 0:01:23
        p = [float(x) for x in s.split(':')]; return sum(x * 60 ** i for i, x in enumerate(reversed(p)))
    if s.count(',') == 1 and s.count('.') == 0: s = s.replace(',', '.')   # "4,1"
    s = s.replace(',', '')
    try: return float(s)
    except ValueError: return None

def load(text):
    rows = list(csv.reader(io.StringIO(text)))
    if not rows: sys.exit('empty CSV')
    head = [h.strip().lower() for h in rows[0]]
    idx = {}
    for k, names in COLS.items():
        for n in names:
            if n in head: idx[k] = head.index(n); break
    missing = [k for k in ('title', 'views') if k not in idx]
    if missing: sys.exit(f'the CSV has no column for: {", ".join(missing)} (headers: {rows[0]})')
    print('columns found: ' + ', '.join(sorted(idx)) + (' | missing: ' + ', '.join(sorted(set(COLS) - set(idx))) if set(COLS) - set(idx) else ''), file=sys.stderr)
    out = []
    for r in rows[1:]:
        if not r or not r[idx['title']].strip() or r[idx['title']].strip().lower() in ('total', 'totals'): continue
        out.append({'title': r[idx['title']].strip(), **{k: num(r[i]) if i < len(r) else None for k, i in idx.items() if k != 'title'}})
    return out

def median(vals):
    v = [x for x in vals if x is not None]
    return statistics.median(v) if v else None

def is_short(v):
    if v.get('dur') is not None: return v['dur'] <= 180
    return '#shorts' in v['title'].lower()

def diagnose(videos):
    groups = {'short': [v for v in videos if is_short(v)], 'longo': [v for v in videos if not is_short(v)]}
    meds = {g: {k: median([v.get(k) for v in vs]) for k in ('views', 'impr', 'ctr', 'avp', 'subs', 'comments')} for g, vs in groups.items() if vs}
    report = []
    for v in videos:
        fmt_ = 'short' if is_short(v) else 'longo'; med = meds[fmt_]
        tips, good = [], []
        ctr, avp, impr, views = v.get('ctr'), v.get('avp'), v.get('impr'), v.get('views')
        if impr is not None and med['impr'] and impr < 0.5 * med['impr']:
            tips.append('poucas impressões: tema com pouca busca ou sem sinal inicial; use tema mais buscado, título com a palavra que as pessoas digitam, série')
        if ctr is not None:
            low = (fmt_ == 'longo' and ctr < 4) or (med['ctr'] and ctr < 0.7 * med['ctr'])   # Shorts CTR matters little (the feed shows them without a click)
            if low: tips.append(f'CTR {pc(ctr)} baixo: troque capa ou título (teste 3 capas)')
            elif med['ctr'] and ctr > 1.3 * med['ctr']: good.append(f'CTR {pc(ctr)} acima da média: repita o estilo de capa e de título')
        if avp is not None and med['avp']:
            if avp < 0.8 * med['avp']: tips.append(f'retenção {avp:.0f}% abaixo da média dos {fmt_}s ({med["avp"]:.0f}%): gancho fraco ou meio parado; veja onde a curva cai')
            elif avp > 1.15 * med['avp']: good.append(f'retenção {avp:.0f}% acima da média: use os picos como Shorts')
        if v.get('stayed') is not None and v['stayed'] < 50: tips.append(f'só {v["stayed"]:.0f}% continuaram assistindo: primeiro segundo fraco (imagem + placa de gancho)')
        if views and med['views'] and views > 3 * med['views']:
            good.append(f'{views / med["views"]:.1f}x a mediana de views: faça a Parte 2 e mais vídeos com esta fórmula')
            if v.get('subs') is not None and med['subs'] and v['subs'] < med['subs']: tips.append('muitas views e poucos inscritos: prometa uma série (Parte 2, nome da série na capa)')
        if v.get('comments') is not None and views and views > 1000 and v['comments'] == 0:
            tips.append('nenhum comentário: termine com uma pergunta fácil sobre a vida de quem assiste e fixe-a nos comentários')
        level = 'FORTE' if good and not tips else 'FRACO' if len(tips) >= 2 else 'OK'
        report.append({'title': v['title'], 'formato': fmt_, 'level': level, 'views': views, 'ctr': ctr, 'avp': avp, 'good': good, 'tips': tips})
    report.sort(key=lambda r: -(r['views'] or 0))
    return {'channel_median': meds, 'videos': report}

def pc(x):
    return f'{x:.1f}%'.replace('.', ',')

def fmt(x, unit=''):
    return '–' if x is None else (f'{x:,.0f}'.replace(',', '.') if unit == '' else f'{x:.1f}{unit}'.replace('.', ','))

def main():
    a = sys.argv[1:]
    if not a or a[0] in ('-h', '--help'): print(__doc__, file=sys.stderr); sys.exit(2)
    text = DEMO if a[0] == '--demo' else open(a[0], encoding='utf-8-sig').read()
    res = diagnose(load(text))
    if '--json' in a: print(json.dumps(res, ensure_ascii=False, indent=1)); return
    if a[0] == '--demo': print('(DEMONSTRAÇÃO com números fictícios)\n')
    for g, m in res['channel_median'].items():
        print(f'Mediana dos {g}s: views {fmt(m["views"])}, CTR {fmt(m["ctr"], "%")}, retenção {fmt(m["avp"], "%")}')
    print()
    for r in res['videos']:
        print(f'[{r["level"]}] ({r["formato"]}) {r["title"]} (views {fmt(r["views"])}, CTR {fmt(r["ctr"], "%")}, retenção {fmt(r["avp"], "%")})')
        for g in r['good']: print(f'  + {g}')
        for t in r['tips']: print(f'  - {t}')
        print()

if __name__ == '__main__':
    main()
