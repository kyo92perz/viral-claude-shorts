#!/usr/bin/env python3
"""O Papa-Figo: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-papa-figo/tools/make-scenes.py && node core/scenes.ts videos/lenda-papa-figo"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
W, N, R, CR = ['wind'], ['night'], ['room'], ['crowd']
SHOTS = [
 ('hook', 'n01', 0, None, T, W, [('h', 'n01', 11, 0, 'sting')]),
 ('title', 'n01', 15, None, D, ['drone'], [('t', 'n01', 16, -0.1, 'impact')]),
 ('street', 'n02', 0, -0.3, C, W, [('b', 'n02', 12, 0, 'pop')]),
 ('vo', 'v01', 0, -0.2, D, R, [('f', 'v01', 12, 0, 'sting')]),
 ('square', 'n03', 0, -0.2, Q, CR, [('s', 'n03', 18, 0, 'off')]),
 ('corner', 'n04', 0, -0.2, T, W, [('v', 'n04', 6, 0, 'hit'), ('c', 'n04', 18, 0, 'sting')]),
 ('offer', 'p01', 0, -0.2, D, ['drone'], []),
 ('close', 'n05', 0, -0.3, S0, [], [('a', 'n05', 6, 0, 'hit'), ('o', 'n05', 11, 0, 'hit'), ('m', 'n05', 16, 0, 'sting')]),
 ('run', 'n06', 0, -0.2, E, ['steps'], [('p', 'n06', 1, 0, 'whoosh')]),
 ('lock', 'n07', 0, -0.2, T, R, [('k', 'n07', 1, 0, 'click'), ('b', 'n07', 10, 0, 'whoosh')]),
 ('knock', 'n08', 0, -0.3, S0, R, [('k', 'n08', 2, 0, 'knock')]),
 ('voice', 'c01', 0, -0.2, D, ['drone'], []),
 ('under', 'n09', 0, -0.3, D, ['drone'], [('c', 'n09', 2, 0, 'sting'), ('t', 'n09', 10, 0, 'heart')]),
 ('end', 'n10', 0, -0.2, D, W, [('end', 'n10', 99, 0.25, 'knock')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.16'},
      'music': {'bpm': 70, 'key': 'E'},
      'notes': 'O PAPA-FIGO, Brasil Z toon look: an old Recife street at dusk (pastel colonial houses, church tower), the square, the old man in a black cape with sickly yellow skin and a moving sack, the grandmother\'s room, under the bed with the light under the door. Threat colour sickly yellow. Shot list in tools/make-scenes.py.'},
      talk='PF_LINES', visuals='visuals.ts')
