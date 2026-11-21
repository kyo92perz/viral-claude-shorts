#!/usr/bin/env python3
"""O Corpo-Seco: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-corpo-seco/tools/make-scenes.py && node core/scenes.ts videos/lenda-corpo-seco"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
N = ['night']
# (id, line, word, delay s, mood, ambience, keys: (id, line, word, dt, sfx))
SHOTS = [
 ('open', 'n01', 0, None, D, ['wind'], [('eyes', 'n01', 6, 0, 'sting')]),
 ('minas', 'n02', 0, None, Q, N, []),
 ('title', 'n02', 9, None, D, ['wind', 'drone'], [('t', 'n02', 10, 0, 'impact')]),
 ('window', 'n03', 0, None, T, ['wind'], [('hit', 'n03', 9, 0, 'hit')]),
 ('grave', 'n03', 13, None, D, ['wind'], [('spit', 'n03', 17, 0, 'impact')]),
 ('three', 'n03', 22, -0.2, D, ['wind'], [('p1', 'n03', 22, 0, 'thud'), ('p2', 'n03', 22, 0.4, 'thud'), ('p3', 'n03', 23, 0, 'impact')]),
 ('nowhere', 'n04', 0, None, T, [], [('x1', 'n04', 1, 0, 'hit'), ('x2', 'n04', 4, 0, 'hit')]),
 ('dry', 'n04', 5, None, D, ['drone'], [('s', 'n04', 7, 0, 'crack')]),
 ('tree', 'n04', 12, None, D, ['wind', 'drone'], []),
 ('ride', 'n05', 0, None, C, N, []),
 ('snap', 'n05', 12, None, T, N, [('c', 'n05', 16, 0, 'crack')]),
 ('quem', 't01', 0, -0.2, T, N, []),
 ('quiet', 't01', 99, 0.15, S0, N, []),
 ('moving', 'n06', 2, None, D, ['wind'], []),
 ('arm', 'n06', 13, None, D, ['drone'], [('a', 'n06', 16, 0, 'creak')]),
 ('descend', 'n07', 0, None, D, ['drone'], [('k', 'n07', 9, 0, 'crack')]),
 ('sai', 't02', 0, -0.2, E, [], [('go', 't02', 0, 0, 'sting')]),
 ('chase', 'n08', 0, None, E, ['steps'], []),
 ('claws', 'n08', 5, None, E, ['steps'], [('sc', 'n08', 8, 0, 'scratch')]),
 ('gate', 'n09', 0, None, T, N, [('x', 'n09', 10, 0, 'shimmer')]),
 ('stop', 'n09', 13, None, D, N, [('h', 'n09', 17, 0, 'sting')]),
 ('dawn', 'n10', 0, -0.3, SAD, ['forest'], [('t', 'n10', 10, 0, 'pop')]),
 ('dead', 'n10', 12, None, SAD, ['wind'], []),
 ('you', 'n11', 0, -0.2, D, ['wind', 'drone'], [('eyes', 'n11', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.2'},
      'music': {'bpm': 78, 'key': 'D'},
      'notes': 'O CORPO-SECO, Brasil Z toon look (styles/flat2d/toon.ts): navy night on a dirt road in Minas, fog, a twisted tree; dawn in orange. Shot list in tools/make-scenes.py.'},
      talk='CS_LINES', visuals='visuals.ts')
