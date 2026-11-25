#!/usr/bin/env python3
"""O Curupira: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-curupira/tools/make-scenes.py && node core/scenes.ts videos/lenda-curupira"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
F = ['forest']; N = ['night']
SHOTS = [
 ('hook', 'n01', 0, None, T, F, [('h', 'n01', 0, 0.1, 'whistle')]),
 ('eyes', 'n01', 11, None, D, ['drone'], [('e', 'n01', 11, 0, 'sting')]),
 ('title', 'n01', 13, None, D, F, [('t', 'n01', 15, 0, 'impact')]),
 ('bento', 'n02', 0, None, C, N, [('n', 'n02', 2, 0, 'hit')]),
 ('brave', 'n02', 9, None, P, N, []),
 ('lanterna', 'b01', 0, -0.2, P, N, []),
 ('enter', 'n03', 0, None, Q, ['night', 'forest'], []),
 ('mark', 'n03', 9, None, T, F, [('c1', 'n03', 15, 0, 'chop'), ('c2', 'n03', 16, 0, 'chop'), ('c3', 'n03', 17, 0, 'chop')]),
 ('hours', 'n04', 0, None, Q, F, []),
 ('prints', 'n04', 3, None, T, F, [('p', 'n04', 4, 0, 'thump')]),
 ('back', 'n04', 9, None, D, ['drone'], [('b', 'n04', 10, 0, 'sting')]),
 ('seguir', 'b02', 0, -0.2, T, F, []),
 ('follow', 'n05', 0, None, T, F, []),
 ('arrows', 'n05', 3, None, D, ['drone'], [('a', 'n05', 9, 0, 'whoosh')]),
 ('whistle', 'n06', 0, -0.3, S0, F, [('w1', 'n06', 3, 0, 'whistle'), ('w2', 'n06', 6, 0, 'whistle'), ('w3', 'n06', 10, 0, 'whistle')]),
 ('walk', 'n07', 0, None, T, F, []),
 ('same', 'n07', 6, None, D, ['drone'], [('s', 'n07', 14, 0, 'sting')]),
 ('naopode', 'b03', 0, -0.2, E, F, []),
 ('loop', 'n08', 0, None, D, ['drone'], [('l1', 'n08', 0, 0.2, 'hit'), ('l2', 'n08', 3, 0, 'hit'), ('l3', 'n08', 8, 0, 'impact')]),
 ('saw', 'n09', 0, -0.2, S0, F, []),
 ('rider', 'n09', 4, None, E, F, [('g', 'n09', 6, 0, 'grunt')]),
 ('kid', 'n09', 9, None, D, ['drone'], [('r', 'n09', 16, 0, 'whistle')]),
 ('feet', 'n09', 17, None, D, ['drone'], [('f', 'n09', 20, 0, 'sting')]),
 ('vo', 'n10', 0, None, C, ['room'], []),
 ('knot', 'n10', 6, None, T, F, []),
 ('untie', 'n10', 15, None, P, F, []),
 ('run', 'n11', 0, None, E, ['steps'], []),
 ('aim', 'n11', 6, None, D, ['drone'], [('w', 'n11', 15, 0, 'whistle')]),
 ('road', 'n12', 0, -0.3, SAD, ['wind'], []),
 ('never', 'n12', 7, None, SAD, ['wind'], []),
 ('gun', 'n12', 11, None, D, ['drone'], [('g', 'n12', 21, 0, 'sting')]),
 ('you', 'n13', 0, -0.2, D, F, [('end', 'n13', 99, 0.25, 'whistle')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.9'},
      'music': {'bpm': 84, 'key': 'E'},
      'notes': 'O CURUPIRA, detailed Brasil Z toon look: a layered Pará jungle (parallax, mist, light rays, falling leaves, fireflies before dawn); the only fire colour is his hair. Shot list in tools/make-scenes.py.'},
      talk='CU_LINES', visuals='visuals.ts')
