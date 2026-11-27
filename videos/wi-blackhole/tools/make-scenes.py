#!/usr/bin/env python3
"""WHAT IF EP.3: falling into a black hole. Run from the repo root:  python3 videos/wi-blackhole/tools/make-scenes.py && node core/scenes.ts videos/wi-blackhole"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build
C, P, E, W, EP, T, Q, D, S0 = 'calm', 'playful', 'energetic', 'wonder', 'epic', 'tense', 'curious', 'dark', 'silence'
SHOTS = [
 ('hook', 'n01', 0, None, W, ['drone'], [('g', 'n01', 6, 0, 'riser')]),
 ('small', 'n02', 0, -0.2, T, ['drone'], [('p', 'n02', 11, 0, 'whoosh'), ('s', 'n02', 23, 0, 'zip')]),
 ('noodle', 'n03', 0, -0.2, P, [], [('w', 'n03', 4, 0, 'pop')]),
 ('giant', 'n04', 0, -0.2, EP, ['drone'], [('g', 'n04', 4, 0, 'boom'), ('m', 'n04', 16, 0, 'hit')]),
 ('horizon', 'n05', 0, -0.2, S0, [], [('c', 'n05', 5, 0, 'shimmer')]),
 ('friend', 'n06', 0, -0.2, T, ['drone'], [('f', 'n06', 16, 0, 'sting')]),
 ('inside', 'n07', 0, -0.2, D, ['drone'], [('l', 'n07', 10, 0, 'off')]),
 ('timer', 'n08', 0, -0.2, T, ['drone'], [('t', 'n08', 5, 0, 'tick')]),
 ('center', 'n09', 0, -0.2, W, [], [('n', 'n09', 6, 0, 'hit')]),
 ('end', 'n10', 0, -0.2, W, ['drone'], [('end', 'n10', 99, 0.25, 'riser')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'WHAT IF?', 'ep': 'EP.3'},
      'music': {'bpm': 90, 'key': 'E'},
      'notes': 'WHAT IF EP.3, English: falling into a black hole. Deep space, a black hole with a glowing orange disk, the kid stretched like a noodle, the giant one at the galaxy center, the friend in a spaceship watching the kid freeze at the edge, a one-minute timer. Shot list in tools/make-scenes.py.'},
      talk='WB_LINES', visuals='visuals.ts')
