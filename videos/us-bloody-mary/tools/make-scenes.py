#!/usr/bin/env python3
"""Bloody Mary (AMERICAN LEGENDS EP.1): the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/us-bloody-mary/tools/make-scenes.py && node core/scenes.ts videos/us-bloody-mary"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad'
R, N = ['room'], ['night']
SHOTS = [
 ('hook', 'n01', 0, None, T, R, [('h', 'n01', 12, 0, 'sting')]),
 ('title', 'n01', 15, None, D, ['drone'], [('t', 'n01', 17, 0, 'impact')]),
 ('party', 'n02', 0, -0.3, P, R, [('d', 'n02', 12, 0, 'hit')]),
 ('dare', 'k01', 0, -0.2, P, R, [('o', 'k01', 1, 0, 'click')]),
 ('stand', 'n03', 0, -0.2, T, ['drone'], []),
 ('chant', 'n04', 0, -0.2, D, ['drone'], [('a', 'n04', 0, 0, 'heart'), ('b', 'n04', 2, 0, 'heart')]),
 ('out', 'n05', 0, -0.3, S0, [], [('o', 'n05', 11, 0, 'off')]),
 ('laugh', 'n06', 0, -0.2, P, R, []),
 ('lit', 'n06', 4, None, D, ['drone'], [('l', 'n06', 14, 0, 'sting')]),
 ('smile', 'n07', 0, -0.3, S0, [], [('s', 'n07', 3, 0, 'impact')]),
 ('again', 'm01', 0, -0.2, D, ['drone'], []),
 ('lights', 'n08', 0, -0.2, E, R, [('x', 'n08', 1, 0, 'scream'), ('c', 'n08', 6, 0, 'click')]),
 ('morning', 'n09', 0, -0.3, T, R, [('w', 'n09', 7, 0, 'sting')]),
 ('words', 'n09', 11, None, D, ['drone'], []),
 ('end', 'n10', 0, -0.2, D, ['drone'], [('end', 'n10', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'AMERICAN LEGENDS', 'ep': 'EP.1'},
      'music': {'bpm': 68, 'key': 'D'},
      'notes': 'BLOODY MARY, Brasil Z toon look, English: a 13th birthday sleepover, the dark bathroom mirror, the candle, the reflection that keeps the candle lit and smiles, Mary behind the glass, the words written from the other side. The only threat colour is red. Shot list in tools/make-scenes.py.'},
      talk='BM_LINES', visuals='visuals.ts')
