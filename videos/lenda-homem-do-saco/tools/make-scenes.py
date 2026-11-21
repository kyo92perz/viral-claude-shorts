#!/usr/bin/env python3
"""O Homem do Saco: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-homem-do-saco/tools/make-scenes.py && node core/scenes.ts videos/lenda-homem-do-saco"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
# (id, line, word, delay s, mood, ambience, keys: (id, line, word, dt, sfx))
SHOTS = [
 ('sack', 'n01', 0, None, T, ['wind'], [('peek', 'n01', 5, 0, 'sting')]),
 ('title', 'n01', 9, None, D, ['wind', 'drone'], [('t', 'n01', 10, 0, 'impact')]),
 ('mom', 'n02', 0, None, P, ['crowd'], []),
 ('lucas', 'n02', 14, None, Q, ['crowd'], [('n', 'n02', 20, 0, 'pop')]),
 ('far', 'n03', 0, None, T, ['wind'], [('ap', 'n03', 12, 0, 'riser')]),
 ('nobody', 'n03b', 0, None, T, ['wind'], [('off', 'n03b', 3, 0, 'click')]),
 ('dogs', 'n03b', 5, None, T, ['night'], [('q', 'n03b', 11, 0, None)]),
 ('wobble', 'n04', 0, None, D, ['drone'], []),
 ('velho', 'v01', 0, -0.2, D, ['drone'], []),
 ('ask', 'l01', 0, -0.1, Q, ['wind'], []),
 ('closer', 'n04b', 0, None, T, ['wind'], []),
 ('untie', 'n04b', 5, None, D, ['drone'], [('p', 'n04b', 14, 0, 'heart')]),
 ('peek', 's01', 0, -0.2, E, ['drone'], [('o', 's01', 0, 0, 'sting')]),
 ('shout', 'n05', 0, None, E, ['wind'], []),
 ('turn', 'n05', 5, None, D, ['drone'], [('c', 'n05', 8, 0, 'creak'), ('g', 'n05', 18, 0, 'crack')]),
 ('mae', 'm01', 0, -0.2, E, [], []),
 ('run', 'n06', 0, None, E, ['steps'], []),
 ('smile', 'n06', 3, None, D, ['drone'], []),
 ('count', 'n06', 10, None, D, ['night'], []),
 ('numbers', 'v02', 0, -0.2, D, ['night'], [('g1', 'v02', 0, 0, 'knock'), ('g2', 'v02', 1, 0, 'knock'), ('g3', 'v02', 2, 0, 'knock'), ('bye', 'v02', 3, 0, None)]),
 ('awake', 'n06b', 0, -0.4, S0, ['night'], []),
 ('knock', 'n06b', 6, None, D, ['night'], [('k', 'n06b', 10, 0, 'knock')]),
 ('home', 'n07', 0, -0.3, SAD, ['wind'], [('shut', 'n07', 12, -0.4, 'thud')]),
 ('inside', 'n07', 14, None, T, ['night'], []),
 ('you', 'n08', 0, -0.2, D, ['night', 'drone'], [('hat', 'n08', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.3'},
      'music': {'bpm': 80, 'key': 'C'},
      'notes': 'O HOMEM DO SACO, Brasil Z toon look (styles/flat2d/toon.ts): a street of small houses with numbered gates at dusk (orange-purple), then night (navy). Shot list in tools/make-scenes.py.'},
      talk='HS_LINES', visuals='visuals.ts')
