#!/usr/bin/env python3
"""O Lobisomem: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-lobisomem/tools/make-scenes.py && node core/scenes.ts videos/lenda-lobisomem"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
N = ['night']
SHOTS = [
 ('hook', 'n01', 0, None, D, ['wind'], [('h', 'n01', 0, 0.1, 'howl')]),
 ('tonho', 'n01', 8, None, T, N, [('n', 'n01', 10, 0, 'hit')]),
 ('farm', 'n02', 0, None, Q, N, []),
 ('moon', 'n02', 8, None, T, ['wind'], []),
 ('sneak', 'n02', 14, None, T, N, []),
 ('ju', 'j01', 0, -0.2, T, N, []),
 ('hoje', 't01', 0, -0.1, D, N, []),
 ('follow', 'n03', 0, None, T, ['wind'], []),
 ('roll', 'n03', 6, None, D, ['wind'], []),
 ('change', 'n04', 0, None, D, ['drone'], [('k1', 'n04', 1, 0, 'crack'), ('k2', 'n04', 4, 0, 'crack'), ('k3', 'n04', 7, 0, 'crack'), ('k4', 'n04', 15, 0, 'impact')]),
 ('howl', 'n05', 0, None, D, ['wind'], [('u', 'n05', 2, 0, 'howl')]),
 ('dogs', 'n05', 5, None, T, N, []),
 ('hide', 'n05b', 0, None, T, ['heartbeat'], []),
 ('big', 'n05b', 7, None, D, ['drone'], [('g', 'n05b', 10, 0, 'growl')]),
 ('snap', 'n06', 0, None, S0, N, [('c', 'n06', 1, 0, 'crack')]),
 ('turn', 'n06', 4, None, D, ['drone'], []),
 ('eyes', 'n06', 8, None, D, ['drone'], [('e', 'n06', 10, 0, 'sting')]),
 ('run', 'n07', 0, None, E, ['steps'], [('slam', 'n07', 4, 0, 'thud')]),
 ('coop', 'n07', 7, None, D, ['drone'], [('g', 'n07', 10, 0, 'growl')]),
 ('dawn', 'n07', 12, None, C, ['forest'], []),
 ('kitchen', 'n08', 0, -0.3, Q, ['room'], []),
 ('scrap', 'n08', 9, None, D, ['room'], [('s', 'n08', 14, 0, 'sting')]),
 ('bomdia', 't02', 0, -0.2, D, ['room'], []),
 ('you', 'n09', 0, -0.2, D, ['wind'], [('end', 'n09', 99, 0.25, 'howl')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.5'},
      'music': {'bpm': 80, 'key': 'D'},
      'notes': 'O LOBISOMEM, Brasil Z toon look (styles/flat2d/toon.ts): a farm at night under a huge full moon, a dirt crossroads, a henhouse, a warm kitchen at dawn. Shot list in tools/make-scenes.py.'},
      talk='LO_LINES', visuals='visuals.ts')
