#!/usr/bin/env python3
"""WHAT IF EP.2: the Moon disappeared. Run from the repo root:  python3 videos/wi-moon/tools/make-scenes.py && node core/scenes.ts videos/wi-moon"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build
C, P, E, W, EP, T, Q, D = 'calm', 'playful', 'energetic', 'wonder', 'epic', 'tense', 'curious', 'dark'
SHOTS = [
 ('hook', 'n01', 0, None, Q, ['night'], [('g', 'n01', 6, 0, 'pop')]),
 ('dark', 'n02', 0, -0.2, D, ['night'], [('d', 'n02', 4, 0, 'off'), ('g', 'n02', 18, 0, 'hit')]),
 ('tides', 'n03', 0, -0.2, C, ['wind'], [('p', 'n03', 5, 0, 'whoosh'), ('s', 'n03', 16, 0, 'tick')]),
 ('turtles', 'n04', 0, -0.2, Q, ['night'], [('c', 'n04', 0, 0, 'shimmer'), ('t', 'n04', 13, 0, 'pop')]),
 ('owl', 'n05', 0, -0.2, T, ['night'], [('h', 'n05', 8, 0, 'hit')]),
 ('top', 'n06', 0, -0.2, W, [], [('t', 'n06', 17, 0, 'whoosh')]),
 ('wobble', 'n07', 0, -0.2, T, ['drone'], [('w', 'n07', 10, 0, 'riser'), ('i', 'n07', 17, 0, 'impact'), ('s', 'n07', 19, 0, 'impact')]),
 ('eclipse', 'n08', 0, -0.3, EP, [], [('e', 'n08', 2, 0, 'shimmer'), ('v', 'n08', 4, 0, 'hit')]),
 ('end', 'n09', 0, -0.2, W, ['night'], [('end', 'n09', 99, 0.25, 'shimmer')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'WHAT IF?', 'ep': 'EP.2'},
      'music': {'bpm': 96, 'key': 'A'},
      'notes': 'WHAT IF EP.2, English: the Moon disappears. Night beach and sea, the tide line dropping, baby turtles lost, an owl, Earth as a spinning top that starts to wobble, the last eclipse. Shot list in tools/make-scenes.py.'},
      talk='WM_LINES', visuals='visuals.ts')
