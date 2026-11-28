#!/usr/bin/env python3
"""A Alamoa: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-alamoa/tools/make-scenes.py && node core/scenes.ts videos/lenda-alamoa"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
W, RN = ['wind'], ['rain', 'wind']
SHOTS = [
 ('hook', 'n01', 0, None, T, RN, [('h', 'n01', 14, 0, 'sting')]),
 ('title', 'n01', 21, None, D, RN, [('t', 'n01', 22, 0, 'boom')]),
 ('lore', 'n02', 0, -0.2, Q, RN, [('l', 'n02', 7, 0, 'boom'), ('p', 'n02', 16, 0, 'shimmer')]),
 ('tio', 't01', 0, -0.2, T, RN, []),
 ('boat', 'n03', 0, -0.2, T, RN, [('l', 'n03', 12, 0, 'shimmer')]),
 ('her', 'n04', 0, -0.2, S0, [], [('s', 'n04', 11, 0, 'shimmer')]),
 ('call', 'a01', 0, -0.2, D, ['drone'], []),
 ('climb', 'n05', 0, -0.2, T, RN, [('d', 'n05', 13, 0, 'creak')]),
 ('gold', 'n06', 0, -0.2, S0, ['drone'], [('o', 'n06', 3, 0, 'shimmer'), ('f', 'n06', 15, 0, 'sting')]),
 ('skull', 'n07', 0, -0.2, D, ['drone'], [('k', 'n07', 3, 0, 'impact'), ('c', 'n07', 7, 0, 'thud')]),
 ('fall', 'n08', 0, -0.2, E, RN, [('j', 'n08', 3, 0, 'whoosh'), ('w', 'n08', 15, 0, 'sting')]),
 ('end', 'n09', 0, -0.2, D, RN, [('end', 'n09', 99, 0.25, 'boom')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.17'},
      'music': {'bpm': 66, 'key': 'D'},
      'notes': 'A ALAMOA, Brasil Z toon look: Fernando de Noronha in a night storm (the rock needle of the Pico, black sea, lightning, a fishing boat), the blonde woman in white who becomes a skeleton, the rock door full of gold, the fisherman with white hair at dawn. Threat colour gold. Shot list in tools/make-scenes.py.'},
      talk='AL_LINES', visuals='visuals.ts')
