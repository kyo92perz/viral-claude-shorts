#!/usr/bin/env python3
"""A Loira do Banheiro: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-loira-do-banheiro/tools/make-scenes.py && node core/scenes.ts videos/lenda-loira-do-banheiro"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
# (id, line, word, delay s, mood, ambience, keys: (id, line, word, dt, sfx))
SHOTS = [
 # ---- the hook: the ritual in 3 beats, then her
 ('flush1', 'n01', 0, None, T, ['hum'], [('f', 'n01', 1, -0.1, 'flush')]),
 ('kick1', 'n01', 2, None, T, ['hum'], [('k', 'n01', 3, 0, 'thud')]),
 ('swear1', 'n01', 6, None, T, ['hum'], [('b', 'n01', 8, -0.2, 'pop')]),
 ('title', 'n01', 9, None, D, ['drone'], [('t', 'n01', 13, 0, 'sting')]),
 # ---- the school
 ('schools', 'n02', 0, None, Q, ['wind'], [('g', 'n02', 2, 0, 'pop')]),
 ('school', 'n02', 6, None, Q, ['crowd'], [('y', 'n02', 14, 0, 'hit')]),
 ('bia', 'n03', 0, None, P, ['crowd'], []),
 ('hall', 'n03', 6, None, P, ['room'], []),
 ('tape', 'n03', 16, None, T, ['room'], [('z', 'n03', 18, 0, 'hit')]),
 ('dare', 'b01', 0, -0.2, P, ['hum'], []),
 # ---- the ritual
 ('pull', 'n04', 0, None, T, ['hum'], []),
 ('flush3', 'n04', 4, -0.15, T, ['hum'], [('f1', 'n04', 4, 0, 'flush'), ('f2', 'n04', 6, 0, 'flush'), ('f3', 'n04', 7, 0, 'flush')]),
 ('wait', 'n04', 99, 0.4, S0, ['hum'], []),
 ('kick2', 'n05', 0, -0.2, T, ['hum'], [('k', 'n05', 1, 0, 'thud')]),
 ('swear2', 'n05', 6, None, T, ['hum'], [('b', 'n05', 8, -0.1, 'pop')]),
 ('nada', 'b02', 0, None, P, ['hum'], []),
 # ---- her
 ('flicker', 'n06', 0, -0.9, S0, ['hum'], [('off', 'n06', 4, 0, 'buzz')]),
 ('mirror', 'n06', 6, None, D, ['drone'], [('her', 'n06', 13, 0, 'sting')]),
 ('pale', 'n06', 18, None, D, ['drone'], []),
 ('cotton', 'n06', 21, None, D, ['drone'], []),
 ('red', 'n07', 0, -0.3, D, ['heartbeat'], [('r', 'n07', 4, 0, 'heart')]),
 ('corre', 'b03', 0, -0.2, E, [], [('run', 'b03', 0, 0, 'impact')]),
 ('door', 'n08', 0, None, E, ['drone'], [('o', 'n08', 2, 0, 'creak')]),
 ('taps', 'n08', 6, None, E, ['drone'], [('p', 'n08', 8, 0, 'pour')]),
 # ---- after
 ('run', 'n09', 0, None, E, ['steps'], []),
 ('back', 'n09', 4, None, D, ['room'], []),
 ('bag', 'n09', 10, None, D, ['drone'], [('slam', 'n09', 99, 0.25, 'thud')]),
 ('silent', 'n10', 0, -0.6, SAD, ['room'], []),
 ('twice', 'n10', 6, None, SAD, ['hum'], [('f1', 'n10', 14, 0, 'click'), ('f2', 'n10', 15, 0, 'click')]),
 ('you', 'n11', 0, -0.2, D, ['drone'], [('eyes', 'n11', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.1'},
      'music': {'bpm': 84, 'key': 'E'},
      'notes': 'A LOIRA DO BANHEIRO, Brasil Z toon look (styles/flat2d/toon.ts): flat 2D, thick outlines, school greens by day, the bathroom goes dark and red. Shot list in tools/make-scenes.py.'},
      talk='LB_LINES', visuals='visuals.ts')
