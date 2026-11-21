#!/usr/bin/env python3
"""A Mulher de Branco: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-mulher-de-branco/tools/make-scenes.py && node core/scenes.ts videos/lenda-mulher-de-branco"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
R = ['wind', 'hum']
SHOTS = [
 ('hook', 'n01', 0, None, D, ['wind'], [('h', 'n01', 0, 0.1, 'sting')]),
 ('face', 'n01', 13, None, D, ['drone'], []),
 ('jair', 'n02', 0, None, Q, ['wind'], []),
 ('medo', 'n02', 9, None, T, ['wind'], []),
 ('rain', 'n03', 0, None, T, R, []),
 ('km', 'n03', 6, None, T, R, []),
 ('found', 'n03', 9, None, D, R, [('f', 'n03', 13, 0, 'sting')]),
 ('stop', 'n04', 0, None, T, R, [('b', 'n04', 1, -0.2, 'thud')]),
 ('cab', 'n04', 2, 0.1, D, ['hum'], [('in', 'n04', 3, 0, 'creak')]),
 ('radio', 'n04b', 0, None, D, ['static'], [('r', 'n04b', 4, 0, 'static')]),
 ('fog', 'n04b', 6, None, D, ['hum'], []),
 ('pergunta', 'j01', 0, -0.2, T, ['hum'], []),
 ('resposta', 'm01', 0, -0.2, D, ['hum'], []),
 ('mirror', 'n05', 0, None, S0, ['hum'], []),
 ('still', 'n05', 13, None, D, ['drone'], [('l', 'n05', 15, 0, 'sting')]),
 ('curve', 'n06', 0, None, T, R, []),
 ('cemetery', 'n06', 11, None, D, ['wind', 'drone'], [('c', 'n06', 13, 0, 'sting')]),
 ('atropelou', 'm02', 0, -0.3, D, ['drone'], []),
 ('brake', 'n07', 0, -0.4, E, [], [('b', 'n07', 1, 0, 'scratch')]),
 ('seat', 'n07', 4, None, S0, ['hum'], []),
 ('pai', 'n08', 0, -0.3, SAD, ['wind'], []),
 ('photo', 'n08', 5, None, D, ['drone'], [('j', 'n08', 19, 0, 'sting')]),
 ('you', 'n09', 0, -0.2, D, R, [('end', 'n09', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.7'},
      'music': {'bpm': 70, 'key': 'F'},
      'notes': 'A MULHER DE BRANCO, Brasil Z toon look (styles/flat2d/toon.ts): a highway at night in the rain, headlights, a red truck; the only white is her dress. Shot list in tools/make-scenes.py.'},
      talk='BR_LINES', visuals='visuals.ts')
