#!/usr/bin/env python3
"""A Pisadeira: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-pisadeira/tools/make-scenes.py && node core/scenes.ts videos/lenda-pisadeira"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
# (id, line, word, delay s, mood, ambience, keys: (id, line, word, dt, sfx))
SHOTS = [
 ('hook', 'n01', 0, None, D, ['drone'], [('h', 'n01', 0, 0.1, 'sting')]),
 ('bedhook', 'n01', 5, None, D, ['drone'], []),
 ('roof', 'n01', 10, None, D, ['wind'], []),
 ('land', 'n01', 14, None, D, ['drone'], [('l', 'n01', 15, 0, 'thud')]),
 ('title', 'n02', 0, None, D, ['drone'], [('t', 'n02', 5, 0, 'impact')]),
 ('nails', 'n02', 7, None, D, ['drone'], [('s', 'n02', 8, 0, 'scratch')]),
 ('laugh', 'n02', 10, None, D, ['drone'], []),
 ('vo', 'v01', 0, -0.2, Q, ['room'], []),
 ('feast', 'n03', 0, None, P, ['room'], [('p1', 'n03', 5, 0, 'pop'), ('p2', 'n03', 6, 0, 'pop'), ('p3', 'n03', 8, 0, 'pop')]),
 ('bed', 'n03', 9, None, C, ['night'], [('off', 'n03', 99, -0.15, 'click')]),
 ('clock', 'n04', 0, -0.3, S0, ['night'], [('c', 'n04', 2, 0, 'beep')]),
 ('frozen', 'n04', 5, None, T, ['heartbeat'], []),
 ('weight', 'n05', 0, None, D, ['heartbeat'], []),
 ('eyes', 'n06', 0, None, D, ['drone'], [('her', 'n06', 3, 0, 'sting')]),
 ('neck', 'n06', 8, None, D, ['drone'], [('s', 'n06', 11, 0, 'scratch')]),
 ('janta', 'p01', 0, -0.2, D, ['drone'], []),
 ('lembrei', 'n07', 0, -0.2, Q, ['room'], []),
 ('foot', 'n07', 14, None, T, ['heartbeat'], []),
 ('force', 'n08', 0, None, E, ['heartbeat'], []),
 ('toe', 'n08', 4, None, E, [], [('m', 'n08', 7, -0.1, 'hit')]),
 ('scream', 'n09', 0, None, E, [], [('g', 'n09', 1, 0, 'scream')]),
 ('window', 'n09', 4, None, E, ['wind'], [('j', 'n09', 4, 0.2, 'whoosh')]),
 ('gone', 'n09', 8, None, D, ['wind'], []),
 ('morning', 'n10', 0, -0.3, SAD, ['forest'], []),
 ('ceiling', 'n10', 10, None, D, ['drone'], []),
 ('you', 'n11', 0, -0.2, D, ['drone'], [('end', 'n11', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.4'},
      'music': {'bpm': 72, 'key': 'E'},
      'notes': 'A PISADEIRA, Brasil Z toon look (styles/flat2d/toon.ts): a blue bedroom at night, red clock, the roofs under a huge moon. Shot list in tools/make-scenes.py.'},
      talk='PI_LINES', visuals='visuals.ts')
