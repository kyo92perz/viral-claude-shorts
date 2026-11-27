#!/usr/bin/env python3
"""O Boto: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-boto/tools/make-scenes.py && node core/scenes.ts videos/lenda-boto"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
N, CR = ['night'], ['crowd', 'night']
SHOTS = [
 ('hook', 'n01', 0, None, T, CR, [('h', 'n01', 13, 0, 'sting')]),
 ('title', 'n01', 17, None, D, N, [('t', 'n01', 17, 0, 'splash')]),
 ('party', 'n02', 0, -0.3, P, CR, [('r', 'n02', 15, 0, 'pop')]),
 ('arrive', 'n03', 0, -0.2, T, CR, [('a', 'n03', 3, 0, 'off'), ('s', 'n03', 15, 0, 'sting')]),
 ('ask', 'b01', 0, -0.2, D, N, []),
 ('dance', 'n04', 0, -0.2, P, CR, [('h', 'n04', 13, 0, 'hit'), ('s', 'n04', 18, 0, 'tick')]),
 ('rosa', 'r01', 0, -0.2, C, CR, []),
 ('follow', 'n05', 0, -0.2, T, N, [('w', 'n05', 9, 0, 'whoosh')]),
 ('hat', 'n05', 11, None, E, N, [('f', 'n05', 13, 0, 'whoosh')]),
 ('hole', 'n06', 0, -0.2, S0, ['drone'], [('h', 'n06', 7, 0, 'sting'), ('b', 'n06', 14, 0, 'heart')]),
 ('saw', 'n07', 0, -0.2, D, ['drone'], [('s', 'n07', 3, 0, 'sting')]),
 ('jump', 'n07', 4, None, E, N, [('j', 'n07', 6, 0, 'splash')]),
 ('fin', 'n07', 8, None, D, N, [('f', 'n07', 14, 0, 'shimmer')]),
 ('glazed', 'n08', 0, -0.3, SAD, N, []),
 ('moon', 'n08', 9, None, D, N, [('m', 'n08', 15, 0, 'sting')]),
 ('end', 'n09', 0, -0.2, D, CR, [('l', 'n09', 10, 0, 'impact'), ('end', 'n09', 99, 0.25, 'splash')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.14'},
      'music': {'bpm': 76, 'key': 'A'},
      'notes': 'O BOTO, Brasil Z toon look: the São João party in a riverside village of the Amazon at night (bonfire, little flags, lights), the stranger in white who never takes his hat off, the river bank under the full moon, the pink fin. The only threat colour is pink. Shot list in tools/make-scenes.py.'},
      talk='BT_LINES', visuals='visuals.ts')
