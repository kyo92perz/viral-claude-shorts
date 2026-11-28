#!/usr/bin/env python3
"""A Porca dos Sete Leitões: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-porca-sete-leitoes/tools/make-scenes.py && node core/scenes.ts videos/lenda-porca-sete-leitoes"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
N, CR = ['night'], ['crowd', 'night']
SHOTS = [
 ('hook', 'n01', 0, None, T, N, [('h', 'n01', 13, 0, 'grunt')]),
 ('title', 'n01', 14, None, D, ['drone'], [('t', 'n01', 14, 0.1, 'impact')]),
 ('lore', 'n02', 0, -0.2, Q, N, [('s', 'n02', 10, 0, 'pop'), ('o', 'n02', 15, 0, 'sting')]),
 ('vo', 'v01', 0, -0.2, D, ['room'], [('c', 'v01', 11, 0, 'grunt')]),
 ('party', 'n03', 0, -0.2, P, CR, [('m', 'n03', 7, 0, 'bell')]),
 ('road', 'n03', 10, None, T, N, []),
 ('sound', 'n04', 0, -0.3, S0, N, [('g', 'n04', 4, 0, 'grunt'), ('q', 'n04', 8, 0, 'whistle')]),
 ('reveal', 'n05', 0, -0.2, D, ['drone'], [('b', 'n05', 8, 0, 'impact'), ('l', 'n05', 11, 0, 'pop')]),
 ('chase', 'n06', 0, -0.2, E, ['steps'], [('c', 'n06', 4, 0, 'thud'), ('r', 'n06', 9, 0, 'whoosh')]),
 ('water', 'n07', 0, -0.2, T, ['wind'], [('j', 'n07', 1, 0, 'splash'), ('b', 'n07', 8, 0, 'grunt')]),
 ('rule', 'v02', 0, -0.3, D, ['drone'], []),
 ('count', 'n08', 0, -0.3, S0, [], [('a', 'n08', 2, 0, 'tick'), ('b', 'n08', 3, 0, 'tick'), ('c', 'n08', 4, 0, 'tick'), ('s', 'n08', 5, 0, 'tick'), ('o', 'n08', 6, 0, 'sting')]),
 ('cap', 'n09', 0, -0.2, D, ['drone'], [('z', 'n09', 6, 0, 'impact')]),
 ('end', 'n10', 0, -0.2, D, N, [('end', 'n10', 99, 0.25, 'grunt')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.18'},
      'music': {'bpm': 72, 'key': 'C'},
      'notes': 'A PORCA DOS SETE LEITÕES, Brasil Z toon look: a farm in Minas on São João night, the dirt road under the moon, the crossroads with a wooden cross, the huge black sow and her piglets with red eyes, the stream, the eighth piglet wearing the cousin\'s red cap. Threat colour red. Shot list in tools/make-scenes.py.'},
      talk='PS_LINES', visuals='visuals.ts')
