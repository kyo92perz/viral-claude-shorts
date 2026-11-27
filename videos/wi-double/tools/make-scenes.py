#!/usr/bin/env python3
"""WHAT IF EP.1: you doubled in size every day. Shot list -> words.json, scenes.json, speech windows in visuals.ts.
Run from the repo root:  python3 videos/wi-double/tools/make-scenes.py && node core/scenes.ts videos/wi-double"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build
C, P, E, W, EP, T, Q = 'calm', 'playful', 'energetic', 'wonder', 'epic', 'tense', 'curious'
SHOTS = [
 ('hook', 'n01', 0, None, W, ['room'], [('g', 'n01', 5, 0, 'pop')]),
 ('day2', 'n02', 0, -0.2, P, ['room'], [('w', 'n02', 9, 0, 'thud'), ('b', 'n02', 20, 0, 'crack')]),
 ('day5', 'n03', 0, -0.2, T, ['wind'], [('c', 'n03', 7, 0, 'crack')]),
 ('day7', 'n04', 0, -0.2, E, ['wind'], [('s', 'n04', 9, 0, 'impact')]),
 ('day10', 'n05', 0, -0.2, EP, ['wind'], [('t', 'n05', 9, 0, 'hit')]),
 ('day14', 'n06', 0, -0.2, W, ['wind'], [('c', 'n06', 9, 0, 'whoosh'), ('e', 'n06', 12, 0, 'pop'), ('b', 'n06', 16, 0, 'hit')]),
 ('day17', 'n07', 0, -0.2, W, [], [('s', 'n07', 8, 0, 'riser')]),
 ('day27', 'n08', 0, -0.2, EP, [], [('b', 'n08', 8, 0, 'pop'), ('o', 'n08', 20, 0, 'whoosh')]),
 ('day32', 'n09', 0, -0.2, EP, ['drone'], [('c', 'n09', 5, 0, 'riser'), ('i', 'n09', 11, 0, 'impact')]),
 ('end', 'n10', 0, -0.2, P, ['room'], [('end', 'n10', 99, 0.25, 'pop')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'WHAT IF?', 'ep': 'EP.1'},
      'music': {'bpm': 112, 'key': 'C'},
      'notes': 'WHAT IF EP.1, English: you double in size every day. Bright Brazil Z toon look; the HUD (day + height) is the signature; the kid outgrows his room, the town, the statue, the tower, the sky, Earth, and becomes a star. Shot list in tools/make-scenes.py.'},
      talk='WD_LINES', visuals='visuals.ts')
