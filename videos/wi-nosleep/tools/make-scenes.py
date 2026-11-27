#!/usr/bin/env python3
"""WHAT IF EP.4: you stopped sleeping. Run from the repo root:  python3 videos/wi-nosleep/tools/make-scenes.py && node core/scenes.ts videos/wi-nosleep"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build
C, P, E, W, EP, T, Q, D, S0 = 'calm', 'playful', 'energetic', 'wonder', 'epic', 'tense', 'curious', 'dark', 'silence'
SHOTS = [
 ('hook', 'n01', 0, None, Q, ['room'], [('g', 'n01', 4, 0, 'tick')]),
 ('drunk', 'n02', 0, -0.2, P, ['room'], [('d', 'n02', 18, 0, 'hit')]),
 ('naps', 'n03', 0, -0.2, Q, ['crowd'], [('n', 'n03', 6, 0, 'pop'), ('e', 'n03', 13, 0, 'click')]),
 ('halluc', 'n04', 0, -0.2, D, ['drone'], [('m', 'n04', 3, 0, 'whoosh'), ('b', 'n04', 14, 0, 'heart'), ('h', 'n04', 18, 0, 'sting')]),
 ('randy', 'n05', 0, -0.2, E, [], [('r', 'n05', 16, 0, 'impact')]),
 ('words', 'n06', 0, -0.2, T, ['drone'], [('w', 'n06', 6, 0, 'scratch')]),
 ('rats', 'n07', 0, -0.3, S0, [], [('d', 'n07', 12, 0, 'sting')]),
 ('trash', 'n08', 0, -0.2, P, [], [('t', 'n08', 8, 0, 'pop'), ('p', 'n08', 14, 0, 'thud')]),
 ('end', 'n09', 0, -0.2, P, ['room'], [('end', 'n09', 99, 0.25, 'tick')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'WHAT IF?', 'ep': 'EP.4'},
      'music': {'bpm': 100, 'key': 'F'},
      'notes': 'WHAT IF EP.4, English: you stop sleeping. The kid awake at 3 AM, wobbly like drunk, micro-naps in class, breathing walls, the 1964 newspaper (11 days awake), jumbled words, a lab rat, the brain taking out the trash. Shot list in tools/make-scenes.py.'},
      talk='WS_LINES', visuals='visuals.ts')
