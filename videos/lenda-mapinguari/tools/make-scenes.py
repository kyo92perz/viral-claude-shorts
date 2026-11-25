#!/usr/bin/env python3
"""O Mapinguari: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-mapinguari/tools/make-scenes.py && node core/scenes.ts videos/lenda-mapinguari"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
N = ['night']; F = ['night', 'forest']
SHOTS = [
 ('hook', 'n01', 0, None, D, ['drone'], [('h', 'n01', 0, 0.1, 'roar')]),
 ('mouth', 'n01', 8, None, D, ['drone'], [('m', 'n01', 10, 0, 'sting')]),
 ('title', 'n01', 13, None, D, ['drone'], [('t', 'n01', 15, 0, 'impact')]),
 ('vo', 'n02', 0, None, SAD, ['room'], [('n', 'n02', 2, 0, 'hit')]),
 ('tear', 'n02', 10, None, SAD, ['room'], []),
 ('seringa', 'n03', 0, None, C, F, []),
 ('camp', 'n03', 8, None, Q, F, []),
 ('grito', 'n04', 0, -0.3, S0, N, [('g', 'n04', 4, 0, 'roar')]),
 ('monkeys', 'n04', 9, None, S0, [], []),
 ('quemta', 'c01', 0, -0.2, T, N, []),
 ('calaboca', 'v01', 0, -0.2, E, N, []),
 ('closer', 'n05', 0, None, T, N, [('g', 'n05', 7, 0, 'roar')]),
 ('smell', 'n06', 0, -0.3, D, ['drone'], []),
 ('trees', 'n06', 14, None, D, ['drone'], [('c', 'n06', 17, 0, 'crack')]),
 ('emerge', 'n07', 0, None, D, ['drone'], [('e', 'n07', 2, 0, 'impact')]),
 ('size', 'n07', 5, None, D, ['drone'], []),
 ('eye', 'n07', 11, None, D, ['drone'], [('o', 'n07', 13, 0, 'sting')]),
 ('shoot', 'n08', 0, None, E, [], [('b1', 'n08', 2, 0, 'gun'), ('b2', 'n08', 6, 0, 'gun')]),
 ('belly', 'n08', 13, None, D, ['drone'], [('m', 'n08', 18, 0, 'roar')]),
 ('dive', 'n09', 0, -0.2, E, [], [('d', 'n09', 3, 0, 'splash')]),
 ('under', 'n09', 7, None, S0, [], [('s', 'n09', 20, 0, 'scream')]),
 ('dawn', 'n10', 0, -0.5, SAD, ['forest'], []),
 ('prints', 'n10', 11, None, D, ['wind'], []),
 ('today', 'n11', 0, -0.3, C, N, []),
 ('again', 'n11', 11, None, D, N, [('g', 'n11', 16, 0, 'roar')]),
 ('hand', 'n12', 0, -0.2, S0, ['room'], []),
 ('voltou', 'v02', 0, -0.2, D, ['room'], []),
 ('you', 'n13', 0, -0.2, D, N, [('end', 'n13', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.11'},
      'music': {'bpm': 74, 'key': 'C'},
      'notes': 'O MAPINGUARI, detailed Brasil Z toon look: a dark Acre jungle at night, rubber trees with latex cups, hammocks, a campfire throwing embers, a stream; the giant\'s single eye is the only red. Shot list in tools/make-scenes.py.'},
      talk='MA_LINES', visuals='visuals.ts')
