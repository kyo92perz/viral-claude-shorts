#!/usr/bin/env python3
"""Resurrection Mary (AMERICAN LEGENDS EP.3): the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/us-resurrection-mary/tools/make-scenes.py && node core/scenes.ts videos/us-resurrection-mary"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
W, N, CAR = ['wind'], ['night', 'wind'], ['hum']
SHOTS = [
 ('hook', 'n01', 0, None, T, N, [('h', 'n01', 12, 0, 'sting')]),
 ('title', 'n01', 15, None, D, N, [('t', 'n01', 17, 0, 'impact')]),
 ('drive', 'n02', 0, -0.3, C, CAR, []),
 ('see', 'n03', 0, -0.2, T, CAR, [('s', 'n03', 2, 0, 'hit'), ('g', 'n03', 13, 0, 'sting')]),
 ('ask', 'm01', 0, -0.2, D, N, []),
 ('cold', 'n04', 0, -0.2, T, CAR, [('c', 'n04', 9, 0, 'sting')]),
 ('smell', 'n05', 0, -0.2, S0, CAR, [('f', 'n05', 13, 0, 'shimmer')]),
 ('stop', 'm02', 0, -0.3, D, ['drone'], []),
 ('gates', 'n06', 0, -0.2, D, ['drone'], [('g', 'n06', 8, 0, 'impact')]),
 ('turn', 'n07', 0, -0.2, T, CAR, [('e', 'n07', 9, 0, 'sting')]),
 ('empty', 'n07', 12, None, S0, [], []),
 ('walk', 'n08', 0, -0.3, D, N, [('w', 'n08', 9, 0, 'shimmer')]),
 ('legend', 'n09', 0, -0.3, SAD, W, [('y', 'n09', 15, 0, 'hit')]),
 ('home', 'n09', 20, None, SAD, N, []),
 ('end', 'n10', 0, -0.2, D, N, [('w', 'n10', 6, 0, 'sting'), ('end', 'n10', 99, 0.25, 'impact')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'AMERICAN LEGENDS', 'ep': 'EP.3'},
      'music': {'bpm': 64, 'key': 'B'},
      'notes': 'RESURRECTION MARY, Brasil Z toon look, English: Archer Avenue in Chicago on a snowy night, a girl in a white dress at the roadside, the inside of the car, her ice-cold hand, the cemetery gates, the empty seat, the white dress walking between the graves. Threat colour cold pale blue. Shot list in tools/make-scenes.py.'},
      talk='RM_LINES', visuals='visuals.ts')
