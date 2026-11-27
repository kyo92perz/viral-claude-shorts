#!/usr/bin/env python3
"""The Jersey Devil (AMERICAN LEGENDS EP.2): the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/us-jersey-devil/tools/make-scenes.py && node core/scenes.ts videos/us-jersey-devil"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
W, N, R = ['wind'], ['night', 'wind'], ['room']
SHOTS = [
 ('hook', 'n01', 0, None, T, N, [('h', 'n01', 5, 0, 'scream')]),
 ('title', 'n01', 15, None, D, ['drone'], [('t', 'n01', 17, 0, 'impact')]),
 ('cabin', 'n02', 0, -0.3, C, N, [('n', 'n02', 18, 0, 'pop')]),
 ('ray', 'r01', 0, -0.2, P, R, [('w', 'r01', 13, 0, 'whoosh')]),
 ('dog', 'n03', 0, -0.2, T, R, [('g', 'n03', 9, 0, 'growl')]),
 ('scream', 'n04', 0, -0.3, S0, N, [('s', 'n04', 5, 0, 'scream')]),
 ('flash', 'n05', 0, -0.2, T, N, [('c', 'n05', 4, 0, 'click')]),
 ('parts', 'n06', 0, -0.2, D, ['drone'], [('h', 'n06', 10, 0, 'thud'), ('t', 'n06', 14, 0, 'whoosh'), ('w', 'n06', 16, 0, 'whoosh')]),
 ('head', 'n07', 0, -0.3, S0, ['drone'], [('h', 'n07', 4, 0, 'sting'), ('e', 'n07', 9, 0, 'impact')]),
 ('inside', 'r02', 0, -0.1, E, N, [('l', 'r02', 3, 0, 'thud')]),
 ('fly', 'n08', 0, -0.2, E, N, [('j', 'n08', 1, 0, 'boom'), ('w', 'n08', 12, 0, 'whoosh')]),
 ('roof', 'n09', 0, -0.3, T, W, [('p', 'n09', 5, 0, 'tick'), ('c', 'n09', 17, 0, 'sting')]),
 ('end', 'n10', 0, -0.2, D, N, [('s', 'n10', 15, 0, 'scream'), ('end', 'n10', 99, 0.25, 'impact')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'AMERICAN LEGENDS', 'ep': 'EP.2'},
      'music': {'bpm': 72, 'key': 'E'},
      'notes': 'THE JERSEY DEVIL, Brasil Z toon look, English: a cabin in the snowy Pine Barrens at night, the dog growling at the window, a scream, the flashlight on the shed roof revealing hooves, tail, wings and a horse head with red eyes, hoof prints on the roof in the morning. Threat colour red. Shot list in tools/make-scenes.py.'},
      talk='JD_LINES', visuals='visuals.ts')
