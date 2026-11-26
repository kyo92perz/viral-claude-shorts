#!/usr/bin/env python3
"""A REGRA DA VÓ Nº 2: A VOZ DA COZINHA. The shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/regra-cozinha/tools/make-scenes.py && node core/scenes.ts videos/regra-cozinha"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, E, S0, SAD, Q = 'dark', 'tense', 'calm', 'energetic', 'silence', 'sad', 'curious'
N, RM, DR = ['night'], ['room'], ['drone']
SHOTS = [
 ('hook', 'n01', 0, None, D, DR, [('h', 'n01', 0, 0.2, 'sting')]),
 ('rule', 'n01', 9, None, T, RM, [('n', 'n01', 17, 0, 'hit')]),
 ('why', 'n02', 0, -0.2, C, RM, []),
 ('sleep', 'v01', 0, -0.2, T, RM, []),
 ('coffee', 'n03', 0, -0.3, C, N, [('c', 'n03', 5, 0, 'whoosh')]),
 ('voice', 'n03', 8, None, T, DR, []),
 ('fake', 'f01', 0, -0.2, D, DR, [('b', 'f01', 8, 0, 'sting')]),
 ('getup', 'n04', 0, -0.2, T, RM, []),
 ('grab', 'n04', 9, None, D, [], [('g', 'n04', 10, 0, 'impact')]),
 ('real', 'n05', 0, -0.2, T, RM, [('d', 'n05', 13, 0, 'hit')]),
 ('heard', 'v02', 0, -0.2, S0, [], [('w', 'v02', 2, 0, 'sting')]),
 ('steps', 'n06', 0, -0.2, D, DR, [('c', 'n06', 10, 0, 'thud'), ('p', 'n06', 13, 0, 'thump')]),
 ('wardrobe', 'n07', 0, -0.3, D, DR, [('s', 'n07', 5, 0, 'thump')]),
 ('cups', 'n07', 10, None, Q, RM, [('d', 'n07', 13, 0, 'pop')]),
 ('dead', 'n08', 0, -0.4, SAD, RM, []),
 ('call', 'n08', 5, None, D, DR, [('c', 'n08', 11, 0, 'sting')]),
 ('ask', 'n09', 0, -0.2, D, DR, [('end', 'n09', 99, 0.3, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'A REGRA DA VÓ', 'ep': 'Nº 2'},
      'music': {'bpm': 60, 'key': 'C'},
      'notes': 'A REGRA DA VÓ Nº 2, Brasil Z toon look: the grandmother\'s voice calls from the kitchen at night; the real grandmother holds Davi back and whispers that she heard it too; a too-tall back-lit shape in the kitchen doorway; the wardrobe; two cups still warm in the morning; she died last year and called him again. Shot list in tools/make-scenes.py.'},
      talk='RG_LINES', visuals='visuals.ts')
