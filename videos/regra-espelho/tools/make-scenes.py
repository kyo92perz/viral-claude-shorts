#!/usr/bin/env python3
"""A REGRA DA VÓ Nº 1: O ESPELHO DAS TRÊS. The shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/regra-espelho/tools/make-scenes.py && node core/scenes.ts videos/regra-espelho"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, E, S0, SAD, Q = 'dark', 'tense', 'calm', 'energetic', 'silence', 'sad', 'curious'
N, RM, DR = ['night'], ['room'], ['drone']
SHOTS = [
 ('hook', 'n01', 0, None, D, DR, [('h', 'n01', 0, 0.2, 'sting')]),
 ('rule', 'n01', 5, None, T, RM, [('c', 'n01', 9, 0, 'whoosh')]),
 ('cloths', 'n02', 0, -0.2, C, RM, []),
 ('car', 'n02', 11, None, Q, N, [('c', 'n02', 13, 0, 'pop')]),
 ('awake', 'n03', 0, -0.2, C, RM, [('a', 'n03', 3, 0, 'hit')]),
 ('clock259', 'n04', 0, -0.3, T, RM, [('k', 'n04', 0, 0.3, 'tick')]),
 ('pull', 'n04', 5, None, T, RM, [('p', 'n04', 6, 0, 'whoosh')]),
 ('three', 'n05', 0, -0.3, D, [], [('k', 'n05', 0, 0.3, 'impact')]),
 ('blink', 'n05', 2, None, S0, DR, [('b', 'n05', 4, 0, 'sting')]),
 ('vo', 'v01', 0, -0.2, T, [], []),
 ('cover', 'n06', 0, -0.2, T, DR, [('t', 'n06', 1, 0, 'whoosh'), ('g', 'n06', 11, 0, 'sting')]),
 ('explain', 'n07', 0, -0.3, D, RM, []),
 ('swap', 'n07', 10, None, D, DR, [('s', 'n07', 11, 0, 'impact')]),
 ('diff', 'n08', 0, -0.3, Q, RM, []),
 ('lefthand', 'n08', 10, None, D, RM, [('l', 'n08', 15, 0, 'sting')]),
 ('knock', 'n09', 0, -0.3, D, DR, [('k', 'n09', 13, 0, 'knock')]),
 ('reveal', 'n09', 18, None, D, DR, [('r', 'n09', 18, 0, 'sting')]),
 ('ask', 'n10', 0, -0.2, D, [], [('end', 'n10', 99, 0.3, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'A REGRA DA VÓ', 'ep': 'Nº 1'},
      'music': {'bpm': 62, 'key': 'D'},
      'notes': 'A REGRA DA VÓ Nº 1, Brasil Z toon look: the grandmother covers every mirror at 3 a.m.; Davi pulls the cloth off the bathroom mirror at 2:59, his reflection blinks when he does not, smiles when he does not; the twist: the narrator is the reflection, and the real Davi knocks from inside the mirror. Shot list in tools/make-scenes.py.'},
      talk='RG_LINES', visuals='visuals.ts')
