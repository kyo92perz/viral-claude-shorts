#!/usr/bin/env python3
"""The shot list of EP1 -> scenes.json (word indices from words.json) and the speech windows for visuals3d.ts.
Each shot starts at a LINE of the script (its first word, or word +n), optionally shifted by `d` seconds to cut inside
a pause (action without dialogue). Keys work the same way. Run from the repo root:
  python3 videos/zona-de-silencio-ep1/tools/make-scenes.py && node core/scenes.ts videos/zona-de-silencio-ep1"""
import json, os, re, sys, unicodedata

V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
LINES = json.load(open(os.path.join(V, 'lines.json')))['lines']
# the words come from the script itself: every line's exact window (voices.py measured it), split among its words by
# their length. Speech recognition drops short lines and isolated words; the script never does.
W = []
for l in LINES:
    ws = l['text'].split(); wt = [len(re.sub(r'[^\w]', '', w)) + 1.5 for w in ws]; tot = sum(wt); t = l['t0']; d = l['t1'] - l['t0']
    for w, k in zip(ws, wt): W.append({'w': w, 't0': round(t, 3), 't1': round(t + d * k / tot - 0.02, 3)}); t += d * k / tot
words = json.load(open(os.path.join(V, 'words.json'))); words['words'] = W; words['text'] = ' '.join(l['text'] for l in LINES)
json.dump(words, open(os.path.join(V, 'words.json'), 'w'), ensure_ascii=False, indent=1)
LT = {l['id']: l for l in LINES}

def first_word(line_id, n=0):
    """index of word n of a line: the first transcribed word that starts inside the line's window"""
    l = LT[line_id]; idx = [i for i, w in enumerate(W) if w['t0'] >= l['t0'] - 0.001 and w['t0'] < l['t1']]
    return idx[min(n, len(idx) - 1)]

# (id, line, word offset, delay s, mood, ambience, keys, label, title)
#   keys: (id, line, word offset, dt s, sfx)
D, T, C, P, E, S0 = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence'
SHOTS = [
 # ---- cold open, 1979
 ('s01', 'v01', 0, -4.0, S0, ['wind', 'static'], [], 'PIKE RIDGE, VIRGÍNIA OCIDENTAL', '1979'),
 ('s02', 'r01', 0, None, T, ['hum'], [], None, None),
 ('s03', 'v01b', 0, None, T, ['hum'], [], None, None),
 ('s04', 'r01b', 0, None, 'curious', ['hum'], [], None, None),
 ('s05', 'v02', 0, None, T, ['hum', 'static'], [('wave', 'v02', 0, 0.9, 'static')], None, None),
 ('s06', 'v03', 0, None, T, ['hum', 'static'], [], None, None),
 ('s07', 'e01', 0, -0.3, D, ['static'], [('green', 'e01', 0, 0.0, 'buzz')], None, None),
 ('s08', 'r02', 0, None, T, ['hum'], [], None, None),
 ('s09', 'e02', 0, -0.2, D, ['drone'], [('heart', 'e02', 0, 0.2, 'heart')], None, None),
 ('s10', 'r03', 0, None, D, ['drone'], [], None, None),
 ('s11', 'v04', 0, None, T, ['static', 'hum'], [('knob', 'v04', 8, 0, 'riser')], None, None),
 ('s12', 'r04', 0, None, E, ['static'], [], None, None),
 ('s13', 'v05', 0, None, T, ['static'], [], None, None),
 ('s14', 'v05', 99, 0.6, S0, ['wind'], [('turn', 'v05', 99, 1.2, 'creak')], None, None),
 ('s15', 'r05', 0, -1.3, D, ['drone'], [('appear', 'r05', 0, -0.4, 'sting')], None, None),
 ('s16', 'r05', 99, 0.5, E, ['static'], [('grab', 'r05', 99, 0.7, 'thud')], None, None),
 ('s17', 'v06', 99, 0.4, E, [], [('axe', 'v06', 99, 1.0, None), ('chop', 'v06', 99, 2.4, 'chop'), ('dark', 'v06', 99, 2.6, 'off')], None, None),
 ('s18', 'r06', 0, -0.6, S0, ['wind'], [], None, None),
 ('s19', 'r06', 99, 1.0, S0, ['static'], [('hit', 'r06', 99, 1.1, 'impact')], 'EPISÓDIO 1 — ESTÁTICA', 'ZONA DE SILÊNCIO'),
 # ---- the town, 1994
 ('s20', 'm01', 0, -2.4, 'curious', ['night', 'wind'], [], 'MARLOW HOLLOW, VIRGÍNIA OCIDENTAL', 'Outubro de 1994'),
 ('s21', 'd00', 0, None, P, ['night'], [], None, None),
 ('s22', 'm02', 0, None, P, ['night'], [], None, None),
 # ---- the basement: Radio Porão
 ('s23', 't01', 0, -0.9, P, ['room'], [], None, None),
 ('s24', 'd01', 0, None, P, ['room'], [], None, None),
 ('s25', 'b01', 0, None, P, ['room'], [], None, None),
 ('s26', 't02', 0, None, P, ['room'], [], None, None),
 ('s27', 'b02', 0, None, P, ['room'], [], None, None),
 ('s28', 'd02', 0, None, P, ['room'], [], None, None),
 ('s29', 't03', 0, None, 'curious', ['room'], [], None, None),
 ('s30', 'd03', 0, None, 'curious', ['room'], [], None, None),
 ('s31', 't04', 0, None, P, ['room'], [], None, None),
 ('s32', 'd04', 0, None, P, ['room'], [], None, None),
 ('s33', 'b03a', 0, None, P, ['room'], [], None, None),
 ('s34', 't04b', 0, None, 'curious', ['room'], [], None, None),
 ('s35', 'd04b', 0, None, P, ['room'], [], None, None),
 ('s36', 't04c', 0, None, 'curious', ['room'], [], None, None),
 ('s37', 'b03b', 0, None, P, ['room'], [], None, None),
 ('s38', 't04d', 0, None, P, ['room'], [], None, None),
 ('s39', 'd04c', 0, None, P, ['room'], [], None, None),
 ('s40', 'b03', 0, None, T, ['room', 'static'], [('needle', 'b03', 2, 0.0, 'static')], None, None),
 ('s41', 'e03', 0, -0.4, D, ['static'], [], None, None),
 ('s42', 't05', 0, None, T, ['static'], [], None, None),
 ('s43', 'e04', 0, -0.3, D, ['static'], [('heart', 'e04', 0, 0.1, 'heart')], None, None),
 ('s44', 'b04', 0, None, D, ['static'], [], None, None),
 ('s45', 'e05', 0, -0.2, D, ['static'], [('pass', 'e05', 2, 0.2, 'whoosh')], None, None),
 ('s46', 'd05', 0, None, T, ['room'], [], None, None),
 ('s47', 't06', 0, None, T, ['room'], [('rec', 't06', 2, 0.0, 'click')], None, None),
 ('s48', 'b05', 0, None, S0, ['room'], [], None, None),
 ('s49', 't06b', 0, None, 'curious', ['room'], [], None, None),
 ('s50', 'b05b', 0, None, P, ['room'], [], None, None),
 ('s51', 'd05b', 0, None, P, ['room'], [], None, None),
 # ---- Coyle in the street
 ('s52', 'c01', 0, -0.9, T, ['night'], [], None, None),
 ('s53', 'z01', 0, None, T, ['night', 'static'], [], None, None),
 ('s54', 'c02', 0, None, T, ['night'], [], None, None),
 ('s55', 'c02b', 0, None, D, ['night', 'wind'], [], None, None),
 ('s56', 'z02', 0, None, T, ['night', 'static'], [], None, None),
 ('s57', 'c02c', 0, None, D, ['night'], [], None, None),
 # ---- Ray's shop
 ('s58', 'e06', 0, -2.0, S0, ['room'], [('on', 'e06', 0, -0.3, 'static')], None, None),
 ('s59', 'h01', 0, None, D, ['room', 'static'], [('plug', 'h01', 99, 0.6, 'click')], None, None),
 ('s60', 'h02', 0, -0.2, 'sad', ['room'], [], None, None),
 # ---- Rewind Video
 ('s61', 'k01', 0, -1.5, P, ['hum'], [], None, None),
 ('s62', 'j01', 0, None, P, ['hum'], [], None, None),
 ('s63', 'k02', 0, None, P, ['hum'], [], None, None),
 ('s64', 'j01b', 0, None, 'sad', ['hum'], [], None, None),
 ('s65', 'k02b', 0, None, P, ['hum'], [], None, None),
 ('s66', 'j01c', 0, None, P, ['hum'], [], None, None),
 ('s67', 'k03', 0, -1.1, T, ['hum', 'static'], [('tvs', 'k03', 0, -0.9, 'static')], None, None),
 ('s68', 'j02', 0, None, T, ['hum', 'static'], [], None, None),
 ('s69', 'k04', 0, -0.4, D, ['static'], [('figure', 'k04', 2, 0.0, 'sting')], None, None),
 ('s70', 'j03', 0, None, T, ['static'], [], None, None),
 ('s71', 't07', 0, None, T, ['room'], [], None, None),
 ('s72', 'j04', 0, None, T, ['static'], [], None, None),
 ('s73', 't08', 0, None, D, ['room'], [], None, None),
 # ---- the woods
 ('s74', 'b06', 0, -2.2, T, ['night', 'powerline'], [], None, None),
 ('s75', 'd06', 0, None, T, ['night', 'powerline'], [], None, None),
 ('s76', 't09', 0, None, T, ['night', 'powerline'], [], None, None),
 ('s77', 'b07', 0, None, T, ['night', 'powerline'], [], None, None),
 ('s78', 'b07b', 0, None, P, ['night', 'powerline'], [], None, None),
 ('s79', 'd06b', 0, None, P, ['night', 'powerline'], [], None, None),
 ('s80', 'b07c', 0, None, T, ['night', 'powerline'], [], None, None),
 ('s81', 'e07', 0, -1.6, S0, ['powerline'], [('crack', 'e07', 0, -1.2, 'crack')], None, None),
 ('s82', 'b08', 0, None, D, ['powerline'], [], None, None),
 ('s83', 't10', 0, None, D, ['powerline'], [('off', 't10', 99, 0.3, 'click')], None, None),
 ('s84', 't10', 99, 1.3, S0, [], [('pass', 't10', 99, 4.8, None), ('beep', 't10', 99, 9.8, 'beep')], None, None),
 ('s85', 'b09', 0, -0.4, E, [], [('snap', 'b09', 0, -0.2, 'sting')], None, None),
 ('s86', 'b10', 0, -1.6, E, ['night'], [], None, None),
 ('s87', 'b10', 99, 0.6, E, ['night'], [], None, None),
 # ---- the fight in the shop
 ('s88', 'h03', 0, -0.8, E, ['room'], [('door', 'h03', 0, -0.6, 'thud')], None, None),
 ('s89', 'b11', 0, None, E, ['room'], [], None, None),
 ('s90', 'e08', 0, -0.6, D, ['static'], [('all', 'e08', 0, -0.4, 'static')], None, None),
 ('s91', 'h04', 0, None, E, ['static'], [('axe', 'h04', 2, 0.0, None)], None, None),
 ('s92', 'h04', 99, 1.0, E, ['static'], [('glass', 'h04', 99, 1.3, 'glass')], None, None),
 ('s93', 'h04', 99, 3.6, D, ['static'], [('rise', 'h04', 99, 4.0, 'scream')], None, None),
 ('s94', 'h05', 0, -0.2, E, ['static'], [('chop', 'h05', 3, 0.0, 'chop')], None, None),
 ('s95', 'h05', 99, 0.7, E, ['static'], [('swipe', 'h05', 99, 1.0, 'whoosh'), ('thud', 'h05', 99, 1.4, 'thud')], None, None),
 ('s96', 'h05', 99, 3.4, D, ['static'], [], None, None),
 ('s97', 'h05b', 0, -0.3, E, ['static'], [], None, None),
 ('s98', 'h05b', 99, 0.9, E, ['static'], [('plug', 'h05b', 99, 1.6, 'off')], None, None),
 ('s99', 'b12', 0, -0.4, D, ['static'], [], None, None),
 ('s100', 'd07', 0, -1.0, E, ['static'], [('door', 'd07', 0, -0.8, 'thud')], None, None),
 ('s101', 'd07', 99, 0.4, E, ['static'], [('hit', 'd07', 99, 0.9, 'hit'), ('hiss', 'd07', 99, 1.5, 'scream')], None, None),
 ('s102', 't11', 0, -0.3, E, ['static'], [('play', 't11', 99, 0.4, 'click')], None, None),
 ('s103', 't11', 99, 1.4, D, [], [('fb', 't11', 99, 1.5, 'feedback'), ('spark', 't11', 99, 2.6, 'spark')], None, None),
 ('s104', 't11', 99, 4.6, D, [], [('out', 't11', 99, 5.2, 'spark'), ('dark', 't11', 99, 6.6, 'off')], None, None),
 # ---- aftermath
 ('s105', 'b13', 0, -1.0, 'sad', ['room'], [], None, None),
 ('s106', 'd08', 0, None, P, ['room'], [], None, None),
 ('s107', 't12', 0, None, 'sad', ['room'], [], None, None),
 ('s108', 'h06', 0, None, 'sad', ['room'], [], None, None),
 ('s109', 'd09', 0, None, 'sad', ['room'], [], None, None),
 ('s110', 'h07', 0, None, D, ['room'], [], None, None),
 ('s111', 't12b', 0, None, T, ['room'], [], None, None),
 ('s112', 'h08', 0, None, T, ['room'], [], None, None),
 ('s113', 'd10', 0, None, T, ['room'], [], None, None),
 ('s114', 'b14', 0, None, P, ['room'], [], None, None),
 ('s115', 'c03', 0, -1.2, D, ['night', 'wind'], [], None, None),
 ('s116', 'e09', 0, -1.6, S0, ['static'], [('glow', 'e09', 0, -0.6, 'static')], None, None),
 ('s117', 't13', 0, -0.3, D, ['static'], [], None, None),
 ('s118', 't13', 99, 0.6, D, ['static'], [('cut', 't13', 99, 4.2, 'sting')], 'CONTINUA NO EPISÓDIO 2', 'ZONA DE SILÊNCIO'),
]

scenes = []
for sid, line, woff, delay, mood, amb, keys, label, title in SHOTS:
    i = first_word(line, woff); sc = {'id': sid, 'from': i, 'type': 'closing' if sid == 's118' else 'object', 'mood': mood}
    if woff == 99:   # "after the line": anchor on the line's LAST word end, expressed as the next word minus a delay
        last = first_word(line, 999); sc['from'] = last; delay = (W[last]['t1'] - W[last]['t0']) + (delay or 0)
    if delay is not None: sc['delay'] = round(delay, 3)
    if amb: sc['ambience'] = amb
    if label: sc['label'] = label
    if title: sc['title'] = title
    ks = []
    for kid, kl, kw, dt, sfx in keys:
        j = first_word(kl, kw if kw != 99 else 999); d = dt + ((W[j]['t1'] - W[j]['t0']) if kw == 99 else 0)
        k = {'id': kid, 'at': j}
        if d: k['dt'] = round(d, 3)
        if sfx: k['sfx'] = sfx
        ks.append(k)
    if ks: sc['keys'] = ks
    scenes.append(sc)
scenes[0].pop('delay', None); scenes[0]['from'] = 0
plan = {'style': '3d', 'fps': 20, 'format': '16:9', 'renderScale': 0.6667, 'shadows': True, 'music': {'bpm': 76, 'key': 'D'},
        'notes': 'ZONA DE SILÊNCIO EP1: 3D horror, night, desaturated, phosphor green only for the threat. Shot list in tools/make-scenes.py.', 'scenes': scenes}
json.dump(plan, open(os.path.join(V, 'scenes.json'), 'w'), ensure_ascii=False, indent=1)
# speech windows for the faces (who speaks when; phone and radio voices belong to their person, echoes to nobody)
sp = [{'who': re.sub(r'_(phone|radio)$', '', l['who']), 't0': l['t0'], 't1': l['t1']} for l in LINES if not l['who'].startswith('eco') and l['who'] != 'central']
vis = os.path.join(V, 'visuals3d.ts'); src = open(vis).read() if os.path.exists(vis) else ''
block = '// <lines>\nconst ZS_LINES = ' + json.dumps(sp) + ';\n// </lines>'
src = re.sub(r'// <lines>.*?// </lines>', lambda m: block, src, flags=re.S) if '// <lines>' in src else block + '\n' + src
open(vis, 'w').write(src)
print(f'scenes.json: {len(scenes)} shots; speech windows: {len(sp)}')
