#!/usr/bin/env python3
"""A Iara: the shot list -> words.json, scenes.json and the speech windows in visuals.ts.
Run from the repo root:  python3 videos/lenda-iara/tools/make-scenes.py && node core/scenes.ts videos/lenda-iara"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, P, E, S0, Q, SAD, W = 'dark', 'tense', 'calm', 'playful', 'energetic', 'silence', 'curious', 'sad', 'wonder'
N = ['night']; SG = ['night', 'song']
SHOTS = [
 ('hook', 'n01', 0, None, D, SG, [('h', 'n01', 0, 0.1, 'sting')]),
 ('title', 'n01', 11, None, D, SG, [('t', 'n01', 13, 0, 'impact')]),
 ('tiago', 'n02', 0, None, C, ['wind'], [('n', 'n02', 2, 0, 'hit')]),
 ('forte', 'n02', 10, None, P, ['wind'], []),
 ('night', 'n03', 0, None, C, N, []),
 ('pier', 'n03', 10, None, T, N, []),
 ('music', 'n04', 0, None, W, SG, []),
 ('voice', 'n04', 6, None, W, SG, []),
 ('below', 'n04', 16, None, D, SG, []),
 ('ouvindo', 't01', 0, -0.2, W, SG, []),
 ('shout', 'n05', 0, None, T, SG, []),
 ('rowing', 'n05', 5, None, D, SG, []),
 ('glazed', 'n05', 16, None, D, SG, [('s', 'n05', 20, 0, 'sting')]),
 ('hair', 'n06', 0, None, D, SG, []),
 ('eyes', 'n06', 10, None, D, SG, [('e', 'n06', 13, 0, 'sting')]),
 ('vem', 'i01', 0, -0.2, D, SG, []),
 ('lean', 'n07', 0, None, D, SG, []),
 ('grab', 'n07', 7, None, E, [], [('g', 'n07', 9, 0, 'splash')]),
 ('jump', 'n08', 0, None, E, [], [('j', 'n08', 1, 0, 'splash')]),
 ('pull', 'n08', 5, None, E, [], []),
 ('reveal', 'n08', 13, None, D, ['drone'], [('f', 'n08', 27, 0, 'sting')]),
 ('bank', 'n09', 0, -0.3, SAD, N, []),
 ('stare', 'n09', 14, None, SAD, ['night', 'song'], []),
 ('fish', 'n10', 0, None, SAD, ['room'], []),
 ('trapiche', 'n10', 10, None, D, SG, []),
 ('sing', 'n11', 0, None, D, SG, []),
 ('voz', 'n11', 11, None, D, SG, [('v', 'n11', 13, 0, 'sting')]),
 ('you', 'n12', 0, -0.2, D, SG, [('end', 'n12', 99, 0.25, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '9:16', 'captions': True, 'badge': {'title': 'LENDAS DO BRASIL', 'ep': 'EP.10'},
      'music': {'bpm': 66, 'key': 'A'},
      'notes': 'A IARA, detailed Brasil Z toon look: the black Rio Negro at night under a full moon, a trembling silver reflection, lily pads, mist, fireflies; under the water, green dark with rays and bubbles; her eyes are the only green light. Shot list in tools/make-scenes.py.'},
      talk='IA_LINES', visuals='visuals.ts')
