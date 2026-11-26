#!/usr/bin/env python3
"""A REGRA DA VÓ Nº 3: O DEGRAU CATORZE. The shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/regra-escada/tools/make-scenes.py && node core/scenes.ts videos/regra-escada"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, E, S0, SAD, Q = 'dark', 'tense', 'calm', 'energetic', 'silence', 'sad', 'curious'
N, RM, DR = ['night'], ['room'], ['drone']
SHOTS = [
 ('hook', 'n01', 0, None, D, DR, [('h', 'n01', 0, 0.2, 'sting')]),
 ('rule', 'n01', 8, None, C, RM, [('c', 'n01', 15, 0, 'tick')]),
 ('thirteen', 'n02', 0, -0.2, Q, RM, [('t', 'n02', 1, 0, 'hit')]),
 ('warn', 'v01', 0, -0.2, T, RM, [('w', 'v01', 2, 0, 'sting')]),
 ('joke', 'n03', 0, -0.3, C, RM, [('l', 'n03', 12, 0, 'off')]),
 ('dark', 'n04', 0, -0.2, T, DR, [('a', 'n04', 10, 0, 'tick'), ('b', 'n04', 11, 0, 'tick'), ('c', 'n04', 12, 0, 'tick')]),
 ('count', 'n05', 0, -0.2, D, DR, [('a', 'n05', 0, 0, 'tick'), ('b', 'n05', 1, 0, 'tick'), ('c', 'n05', 2, 0, 'tick'), ('d', 'n05', 3, 0, 'sting')]),
 ('breath', 'n06', 0, -0.3, D, DR, [('r', 'n06', 14, 0, 'riser')]),
 ('sofa', 'n07', 0, -0.3, T, N, [('p', 'n07', 3, 0, 'whoosh')]),
 ('creak', 'n07', 15, None, D, DR, [('d', 'n07', 15, 0.2, 'thud')]),
 ('morning', 'n08', 0, -0.3, C, RM, []),
 ('rug', 'n08', 9, None, D, RM, [('f', 'n08', 17, 0, 'sting')]),
 ('building', 'n09', 0, -0.3, T, DR, [('s', 'n09', 17, 0, 'sting')]),
 ('ask', 'n10', 0, -0.2, D, DR, [('end', 'n10', 99, 0.3, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'A REGRA DA VÓ', 'ep': 'Nº 3'},
      'music': {'bpm': 64, 'key': 'E'},
      'notes': 'A REGRA DA VÓ Nº 3, Brasil Z toon look: counting the 13 steps of the grandmother\'s staircase every night; the power goes out, the phone flashlight, a 14th dark step that breathes; the sofa, the creaks coming down; wet three-toed footprints on the rug; years later, 17 steps in a 16-step stairwell. Shot list in tools/make-scenes.py.'},
      talk='RG_LINES', visuals='visuals.ts')
