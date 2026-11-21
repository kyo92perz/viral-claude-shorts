#!/usr/bin/env python3
"""O Boitatá: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-boitata/tools/make-scenes.py && node core/scenes.ts videos/lenda-boitata"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
F = ['forest']; N = ['night']
SHOTS = [
 ('hook', 'n01', 0, None, D, N, [('h', 'n01', 0, 0.1, 'sting')]),
 ('title', 'n01', 15, None, D, ['drone'], [('t', 'n01', 18, 0, 'impact')]),
 ('snake', 'n02', 0, None, Q, N, []),
 ('eyes', 'n02', 8, None, D, ['drone'], []),
 ('protect', 'n02', 14, None, C, F, []),
 ('zeca', 'n03', 0, None, T, N, [('n', 'n03', 2, 0, 'hit')]),
 ('order', 'n03', 5, None, T, N, []),
 ('lenda', 'z01', 0, -0.2, P, N, []),
 ('blaze', 'n04', 0, -0.3, E, ['crowd'], [('f', 'n04', 3, 0, 'boom')]),
 ('flee', 'n04', 6, None, E, ['steps'], []),
 ('flame', 'n05', 0, None, S0, [], []),
 ('crawl', 'n05', 6, None, D, ['drone'], []),
 ('long', 'n06', 0, None, D, ['drone'], []),
 ('toward', 'n06', 4, None, E, ['drone'], []),
 ('deus', 'z02', 0, -0.2, E, ['drone'], []),
 ('rise', 'n07', 0, None, D, ['drone'], [('r', 'n07', 2, 0, 'riser')]),
 ('fireeyes', 'n07', 5, None, D, ['drone'], []),
 ('look', 'n07', 11, None, D, [], [('w', 'n07', 15, 0, 'impact')]),
 ('morning', 'n08', 0, -0.5, SAD, F, []),
 ('blind', 'n08', 12, None, SAD, ['wind'], []),
 ('luz', 'z03', 0, -0.2, D, ['wind'], []),
 ('you', 'n09', 0, -0.2, D, N, [('end', 'n09', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.8'},
      'music': {'bpm': 86, 'key': 'G'},
      'notes': 'O BOITATÁ, Brasil Z toon look (styles/flat2d/toon.ts): a dark forest by a river, a wall of fire, a fire serpent with two huge eyes; dawn in orange. Shot list in tools/make-scenes.py.'},
      talk='BO_LINES', visuals='visuals.ts')
