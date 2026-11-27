#!/usr/bin/env python3
"""O Cabeça de Cuia: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-cabeca-de-cuia/tools/make-scenes.py && node core/scenes.ts videos/lenda-cabeca-de-cuia"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
W, N = ['wind'], ['night']
SHOTS = [
 ('hook', 'n01', 0, None, T, W, [('h', 'n01', 5, 0, 'sting')]),
 ('title', 'n01', 11, None, D, ['drone'], [('t', 'n01', 11, 0.1, 'impact')]),
 ('city', 'n02', 0, -0.3, C, W, [('m', 'n02', 19, 0, 'pop')]),
 ('vo', 'n03', 0, -0.2, T, N, [('c', 'n03', 6, 0, 'hit')]),
 ('crispim', 'n03', 9, None, D, ['drone'], [('b', 'n03', 11, 0, 'thud'), ('a', 'n03', 17, 0, 'sting')]),
 ('curse', 'v01', 0, -0.2, D, ['drone'], [('c', 'v01', 4, 0, 'impact'), ('n', 'v01', 15, 0, 'tick')]),
 ('laugh', 'n04', 0, -0.2, P, W, [('j', 'n04', 9, 0, 'splash')]),
 ('vem', 'm01', 0, -0.2, P, W, []),
 ('dome', 'n05', 0, -0.2, S0, [], [('d', 'n05', 8, 0, 'sting')]),
 ('spin', 'n05', 10, None, T, ['drone'], []),
 ('eyes', 'n06', 0, -0.2, D, ['drone'], [('v', 'n06', 2, 0, 'impact'), ('o', 'n06', 6, 0, 'sting')]),
 ('sink', 'n07', 0, -0.2, E, [], [('s', 'n07', 1, 0, 'splash'), ('j', 'n07', 7, 0, 'splash')]),
 ('under', 'n07', 10, None, E, ['drone'], [('p', 'n07', 15, 0, 'hit')]),
 ('sand', 'n08', 0, -0.3, SAD, W, []),
 ('marks', 'n08', 5, None, D, ['drone'], [('m', 'n08', 11, 0, 'sting')]),
 ('six', 'n09', 0, -0.3, D, ['drone'], [('u', 'n09', 9, 0, 'impact')]),
 ('end', 'n10', 0, -0.2, D, W, [('end', 'n10', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.15'},
      'music': {'bpm': 66, 'key': 'C'},
      'notes': 'O CABEÇA DE CUIA, Brasil Z toon look: the meeting of the Poti and the Parnaíba rivers in Teresina (sand bank, two water colours, carnaúba palms), the grandmother\'s porch, the floating gourd that turns out to be a head with yellow eyes, underwater, the five purple finger marks. The only threat colour is yellow. Shot list in tools/make-scenes.py.'},
      talk='CC_LINES', visuals='visuals.ts')
