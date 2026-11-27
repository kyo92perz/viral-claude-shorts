#!/usr/bin/env python3
"""O Saci: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-saci/tools/make-scenes.py && node core/scenes.ts videos/lenda-saci"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
W, N, R = ['wind'], ['night'], ['room']
SHOTS = [
 ('hook', 'n01', 0, None, T, W, [('h', 'n01', 2, 0, 'whistle')]),
 ('title', 'n01', 10, None, D, W, [('t', 'n01', 12, 0, 'impact')]),
 ('farm', 'n02', 0, -0.3, C, W, [('v', 'n02', 7, 0, 'pop')]),
 ('wrong', 'n02', 13, None, Q, W, [('w', 'n02', 18, 0, 'hit')]),
 ('milk', 'n03', 0, -0.2, Q, R, [('s', 'n03', 4, 0, 'pop')]),
 ('mane', 'n03', 8, None, T, W, [('m', 'n03', 12, 0, 'neigh'), ('b', 'n03', 16, 0, 'sting')]),
 ('vo', 'v01', 0, -0.2, T, W, []),
 ('whirlsmall', 'v01', 6, None, D, W, [('r', 'v01', 10, 0, 'whoosh')]),
 ('teach', 'n04', 0, -0.2, C, R, [('p', 'n04', 5, 0, 'pop'), ('g', 'n04', 15, 0, 'pop')]),
 ('whirl', 'n05', 0, -0.2, T, W, [('r', 'n05', 4, 0, 'whoosh')]),
 ('throw', 'n05', 10, None, E, W, [('j', 'n05', 11, 0, 'whoosh'), ('x', 'n05', 13, 0, 'thud'), ('p', 'n05', 17, 0, 'off')]),
 ('under', 'n06', 0, -0.2, S0, [], [('l', 'n06', 8, 0, 'sting')]),
 ('cap', 'n06', 10, None, D, ['drone'], [('c', 'n06', 10, 0, 'impact'), ('r', 'n06', 15, 0, 'whistle')]),
 ('smoke', 'n07', 0, -0.2, E, W, [('s', 'n07', 2, 0, 'whoosh'), ('k', 'n07', 11, 0, 'pop')]),
 ('shelf', 'n07', 13, None, C, R, []),
 ('night', 'n08', 0, -0.3, D, N, [('a', 'n08', 6, 0, 'whistle')]),
 ('morning', 'n08', 8, None, T, R, [('c', 'n08', 12, 0, 'tick'), ('v', 'n08', 17, 0, 'sting')]),
 ('mirror', 'n09', 0, -0.2, T, R, [('m', 'n09', 7, 0, 'impact')]),
 ('braids', 'n09', 9, None, D, ['drone'], []),
 ('vo2', 'v02', 0, -0.3, D, N, [('n', 'v02', 5, 0, 'sting')]),
 ('end', 'n10', 0, -0.2, D, W, [('r', 'n10', 5, 0, 'whoosh'), ('end', 'n10', 99, 0.25, 'whistle')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.13'},
      'music': {'bpm': 70, 'key': 'D'},
      'notes': 'O SACI, Brasil Z toon look: a farm in Minas Gerais (red dirt yard, white house, mango tree, the mare), the kitchen, the dust whirlwind, the sieve, the bottle with the cork, Lia\'s room at night, the mirror. The only threat colour is the red cap. Shot list in tools/make-scenes.py.'},
      talk='SA_LINES', visuals='visuals.ts')
