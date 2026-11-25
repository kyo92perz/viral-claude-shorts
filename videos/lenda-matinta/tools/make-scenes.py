#!/usr/bin/env python3
"""A Matinta Perera: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-matinta/tools/make-scenes.py && node core/scenes.ts videos/lenda-matinta"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, E, S0, SAD = 'dark', 'tense', 'calm', 'energetic', 'silence', 'sad'
N = ['night']
SHOTS = [
 ('hook', 'n01', 0, None, D, N, [('h', 'n01', 4, 0, 'whistle')]),
 ('title', 'n01', 8, None, D, N, [('t', 'n01', 9, 0, 'impact')]),
 ('house', 'n02', 0, -0.3, C, N, [('c', 'n02', 8, 0, 'hit')]),
 ('rede', 'n02', 11, None, C, ['night', 'room'], []),
 ('woke', 'n03', 0, None, T, ['room'], [('w', 'n03', 5, 0, 'whistle')]),
 ('roof', 'n03', 8, None, D, N, [('r', 'n03', 10, 0, 'whistle')]),
 ('vo', 'n04', 0, -0.2, T, ['room'], []),
 ('quieto', 'v01', 0, -0.2, D, ['room'], [('m', 'v01', 2, 0, 'sting')]),
 ('closer', 'n05', 0, None, D, N, [('p', 'n05', 7, 0, 'whistle')]),
 ('gritei', 'n05', 9, None, T, ['room'], []),
 ('promise', 'e01', 0, -0.2, E, [], [('x', 'e01', 0, 0, 'hit')]),
 ('tapou', 'n06', 0, -0.2, T, ['room'], [('s', 'n06', 9, 0, 'off')]),
 ('silence', 'n06', 99, 0.1, S0, [], []),
 ('knock', 'n07', 0, None, T, [], [('k', 'n07', 3, 0, 'knock')]),
 ('velha', 'n07', 6, None, D, [], [('v', 'n07', 7, 0, 'sting')]),
 ('unha', 'n07', 13, None, D, [], []),
 ('cobrar', 'm01', 0, -0.2, D, [], []),
 ('pay', 'n08', 0, -0.2, T, [], []),
 ('smile', 'n08', 10, None, D, [], [('s', 'n08', 15, 0, 'sting')]),
 ('rule', 'n09', 0, -0.3, D, N, [('j', 'n09', 9, 0, 'sting')]),
 ('today', 'n10', 0, -0.3, T, ['room'], []),
 ('outside', 'n10', 7, None, D, N, [('o', 'n10', 10, 0, 'whistle'), ('end', 'n10', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.12'},
      'music': {'bpm': 64, 'key': 'E'},
      'notes': 'A MATINTA PERERA, Brasil Z toon look: a stilt house by a river in Pará at night (açaí palms, moon), the room with two hammocks and an oil lamp, the black bird with red eyes on the roof whistling, the old woman in a black shawl at the door in the morning. Shot list in tools/make-scenes.py.'},
      talk='MT_LINES', visuals='visuals.ts')
