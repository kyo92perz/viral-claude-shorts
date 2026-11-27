#!/usr/bin/env python3
"""WHAT IF EP.5: the Earth stopped spinning. Run from the repo root:  python3 videos/wi-earthstop/tools/make-scenes.py && node core/scenes.ts videos/wi-earthstop"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build
C, P, E, W, EP, T, Q, D, S0 = 'calm', 'playful', 'energetic', 'wonder', 'epic', 'tense', 'curious', 'dark', 'silence'
SHOTS = [
 ('hook', 'n01', 0, None, T, [], [('s', 'n01', 5, 0, 'scratch')]),
 ('speed', 'n02', 0, -0.2, Q, ['wind'], [('m', 'n02', 13, 0, 'whoosh')]),
 ('fly', 'n03', 0, -0.2, E, ['wind'], [('s', 'n03', 3, 0, 'scratch'), ('f', 'n03', 11, 0, 'whoosh'), ('c', 'n03', 21, 0, 'boom')]),
 ('winds', 'n04', 0, -0.2, EP, ['wind'], [('w', 'n04', 4, 0, 'boom')]),
 ('poles', 'n05', 0, -0.3, W, [], [('o', 'n05', 9, 0, 'whoosh')]),
 ('belt', 'n06', 0, -0.2, EP, [], [('r', 'n06', 6, 0, 'riser')]),
 ('daynight', 'n07', 0, -0.2, T, ['wind'], [('d', 'n07', 11, 0, 'hit'), ('n', 'n07', 17, 0, 'hit')]),
 ('end', 'n08', 0, -0.2, P, [], [('end', 'n08', 99, 0.25, 'pop')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'WHAT IF?', 'ep': 'EP.5'},
      'music': {'bpm': 108, 'key': 'G'},
      'notes': 'WHAT IF EP.5, English: the Earth stops spinning. Spinning Earth that brakes, a 1,000 mph speedometer, the street flying east, supersonic winds, the oceans sliding to the poles, a new continent at the equator, half the planet in day and half in night. Shot list in tools/make-scenes.py.'},
      talk='WE_LINES', visuals='visuals.ts')
