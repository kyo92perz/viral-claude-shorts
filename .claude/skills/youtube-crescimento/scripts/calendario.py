#!/usr/bin/env python3
"""Posting calendar for the next weeks (Brasília time), from the starting points in references/calendario.md:
Shorts on weekday evenings (18h–21h), Friday afternoon, weekend afternoons; long videos on Friday 18h (or Sunday 10h
when there are two a week). Adjust later with YouTube Studio -> Audience.

  usage: python3 calendario.py [--shorts N] [--longos N] [--semanas N] [--inicio AAAA-MM-DD] [--json]
Status goes to stderr; the calendar (text or JSON) to stdout."""
import argparse, datetime as dt, json, sys

DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']
# Shorts slots in order of preference (weekday index, hour)
SHORT_SLOTS = [(4, '18:00'), (1, '19:00'), (3, '19:00'), (6, '15:00'), (0, '19:00'), (2, '19:00'), (5, '15:00'),
               (4, '12:00'), (1, '12:00'), (3, '12:00'), (6, '19:00'), (0, '12:00'), (2, '12:00'), (5, '19:00')]
LONG_SLOTS = [(4, '18:00'), (6, '10:00')]

def main():
    p = argparse.ArgumentParser(description='posting calendar (Brasília time)')
    p.add_argument('--shorts', type=int, default=5); p.add_argument('--longos', type=int, default=1)
    p.add_argument('--semanas', type=int, default=4); p.add_argument('--inicio'); p.add_argument('--json', action='store_true')
    a = p.parse_args()
    if not (0 <= a.shorts <= 14 and 0 <= a.longos <= 2 and 1 <= a.semanas <= 52):
        sys.exit('limits: --shorts 0..14, --longos 0..2, --semanas 1..52 (more than 2 Shorts a day or 2 long videos a week risks repetitive content)')
    today = dt.date.today()
    start = dt.date.fromisoformat(a.inicio) if a.inicio else today + dt.timedelta(days=(7 - today.weekday()) % 7 or 7)
    start -= dt.timedelta(days=start.weekday())   # Monday of that week
    if a.shorts > 7: print('aviso: mais de 1 Short por dia só vale se cada vídeo for realmente diferente', file=sys.stderr)
    plan = []
    for w in range(a.semanas):
        monday = start + dt.timedelta(weeks=w)
        week = [{'tipo': 'longo', 'dia': d, 'hora': h} for d, h in LONG_SLOTS[:a.longos]]
        used = {(x['dia'], x['hora']) for x in week}
        for d, h in SHORT_SLOTS:
            if len([x for x in week if x['tipo'] == 'short']) >= a.shorts: break
            if (d, h) in used: continue
            week.append({'tipo': 'short', 'dia': d, 'hora': h}); used.add((d, h))
        for x in sorted(week, key=lambda x: (x['dia'], x['hora'])):
            day = monday + dt.timedelta(days=x['dia'])
            plan.append({'semana': w + 1, 'data': day.isoformat(), 'dia': DIAS[x['dia']], 'hora': x['hora'], 'tipo': x['tipo']})
    if a.json: print(json.dumps(plan, ensure_ascii=False, indent=1)); return
    print(f'Calendário (horário de Brasília) a partir de {start.isoformat()}: {a.shorts} Shorts + {a.longos} vídeo(s) longo(s) por semana\n')
    for w in range(1, a.semanas + 1):
        print(f'Semana {w}')
        for x in [x for x in plan if x['semana'] == w]:
            print(f'  {x["dia"]} {x["data"][8:]}/{x["data"][5:7]}  {x["hora"]}  {"VÍDEO LONGO" if x["tipo"] == "longo" else "Short"}')
        print()
    print('Publique 1–2 h antes do pico do seu público (Studio → Público) e teste uma janela nova por semana.')

if __name__ == '__main__':
    main()
