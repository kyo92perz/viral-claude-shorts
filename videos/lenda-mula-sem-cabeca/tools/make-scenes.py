#!/usr/bin/env python3
"""A Mula sem Cabeça: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-mula-sem-cabeca/tools/make-scenes.py && node core/scenes.ts videos/lenda-mula-sem-cabeca"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
N = ['night']
SHOTS = [
 ('hook', 'n01', 0, None, E, ['steps'], [('h', 'n01', 0, 0.1, 'neigh')]),
 ('fire', 'n01', 4, None, D, ['drone'], []),
 ('vilas', 'n01', 9, None, E, ['steps'], []),
 ('town', 'n02', 0, None, T, N, []),
 ('title', 'n02', 12, None, D, ['drone'], [('t', 'n02', 15, 0, 'impact')]),
 ('curse', 'n03', 0, None, D, ['wind'], [('v', 'n03', 15, 0, 'impact')]),
 ('boys', 'n04', 0, None, P, N, []),
 ('beto', 'b01', 0, -0.2, P, N, []),
 ('bell', 'n05', 0, None, S0, N, [('b', 'n05', 4, 0, 'bell')]),
 ('neigh', 'n05', 8, None, D, ['drone'], [('r', 'n05', 11, 0, 'neigh')]),
 ('street', 'n06', 0, None, E, ['steps'], [('sp', 'n06', 7, 0, 'spark')]),
 ('neck', 'n06', 10, None, E, ['drone'], []),
 ('vo', 'n07', 0, None, T, ['heartbeat'], []),
 ('lie', 'n07', 4, None, T, ['heartbeat'], [('d', 'n07', 4, 0, 'thud')]),
 ('notme', 'n08', 0, None, T, ['heartbeat'], []),
 ('pass', 'n09', 0, None, E, ['steps'], [('f', 'n09', 2, 0, 'whoosh'), ('g', 'n09', 10, 0, 'scream')]),
 ('silence', 'n09', 12, None, S0, [], []),
 ('empty', 'n10', 0, -0.4, SAD, ['wind'], []),
 ('prints', 'n10', 8, None, D, ['wind'], []),
 ('cap', 'n10', 16, None, D, ['wind'], [('c', 'n10', 18, 0, 'sting')]),
 ('you', 'n11', 0, -0.2, D, ['drone'], [('end', 'n11', 99, 0.25, 'neigh')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.6'},
      'music': {'bpm': 92, 'key': 'A'},
      'notes': 'A MULA SEM CABEÇA, Brasil Z toon look (styles/flat2d/toon.ts): a small town square at night, a white church with a bell, cobblestones; the only warm colour is her fire. Shot list in tools/make-scenes.py.'},
      talk='MU_LINES', visuals='visuals.ts')
