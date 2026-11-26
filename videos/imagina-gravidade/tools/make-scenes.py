#!/usr/bin/env python3
"""IMAGINA SÓ: "E se a GRAVIDADE caísse pela metade todo dia?" -> words.json, scenes.json, speech windows in visuals.ts.
Run from the repo root:  python3 videos/imagina-gravidade/tools/make-scenes.py && node core/scenes.ts videos/imagina-gravidade"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

C, P, E, Q, W, EP, T, SAD, TR, D = 'calm', 'playful', 'energetic', 'curious', 'wonder', 'epic', 'tense', 'sad', 'triumphant', 'dark'
RM, ST, CR, N = ['room'], ['wind'], ['crowd'], ['night']
SHOTS = [
 ('hook', 'a01', 0, None, P, RM, []),
 ('fall', 'a01', 6, None, Q, [], [('g', 'a01', 10, 0, 'whoosh')]),
 ('again', 'a01', 13, None, Q, [], []),
 ('power', 'a02', 0, None, E, ST, []),
 ('dunk', 'a02', 11, None, E, ST, [('d', 'a02', 13, 0, 'impact')]),
 ('air', 'a02', 16, None, T, ['drone'], [('a', 'a02', 32, 0, 'sting')]),
 ('space', 'a03', 0, -0.2, W, [], []),
 ('real', 'a05', 0, None, Q, [], []),
 ('guess', 'a04', 0, None, P, [], []),
 ('go', 'a04', 16, None, E, [], [('d', 'a04', 17, 0, 'impact')]),
 # ---- day 1
 ('bed', 'b01', 0, -0.3, P, RM, [('h', 'b01', 6, 0, 'thud')]),
 ('voando', 't01', 0, -0.2, E, RM, []),
 ('mae', 'm01', 0, -0.2, P, RM, []),
 ('street', 'b02', 0, None, P, ST, []),
 ('dunk2', 'b02', 18, None, E, CR, [('d', 'b02', 24, 0, 'impact')]),
 ('strong', 'b06', 0, None, Q, [], []),
 ('fridge', 'b06', 21, None, P, CR, [('f', 'b06', 23, 0, 'whoosh')]),
 ('melhor', 'k01', 0, -0.2, E, CR, []),
 ('moon', 'b03', 0, -0.3, W, N, [('m', 'b03', 11, 0, 'sting')]),
 ('moonaway', 'b04', 0, None, Q, ['drone'], [('e', 'b04', 25, 0, 'riser')]),
 ('tides', 'b05', 0, None, SAD, N, []),
 ('brasil', 'b07', 0, -0.2, TR, CR, [('c', 'b07', 28, 0, 'impact')]),
 # ---- day 2
 ('wall', 'c01', 0, -0.3, E, ST, [('w', 'c01', 21, 0, 'whoosh')]),
 ('tired', 'c02', 0, None, T, [], []),
 ('respirar', 'k02', 0, -0.2, T, [], []),
 ('column', 'c03', 0, None, Q, [], []),
 ('everest', 'c04', 0, None, EP, ST, [('e', 'c04', 19, 0, 'impact')]),
 ('oxygen', 'c05', 0, None, T, ['hum'], []),
 ('planes', 'c06', 0, None, T, [], []),
 # ---- day 3
 ('kangaroo', 'd01', 0, -0.3, P, [], []),
 ('cup', 'd01', 17, None, Q, RM, []),
 ('masks', 'd02', 0, None, T, [], []),
 ('rain', 'd03', 0, None, W, ['rain'], []),
 ('mae2', 'm02', 0, -0.2, T, [], []),
 # ---- day 4
 ('boil100', 'e01', 0, -0.3, Q, [], []),
 ('boil37', 'e02', 0, None, D, ['drone'], [('b', 'e02', 13, 0, 'sting')]),
 ('armstrong', 'e03', 0, None, T, [], [('l', 'e03', 3, 0, 'hit')]),
 ('suits', 'e04', 0, None, W, [], []),
 ('coca', 'k05', 0, -0.2, P, [], []),
 ('voltar', 't05', 0, -0.2, SAD, [], []),
 # ---- day 7 to 14
 ('jump60', 'f01', 0, -0.3, W, ST, [('j', 'f01', 6, 0, 'whoosh')]),
 ('bairro', 't02', 0, -0.2, E, ST, []),
 ('darksky', 'f02', 0, -0.2, D, ['drone'], []),
 ('molecules', 'f03', 0, None, Q, [], []),
 ('bullet', 'f04', 0, -0.2, T, [], [('b', 'f04', 4, 0, 'gun')]),
 ('car', 'f05', 0, -0.3, E, [], [('c', 'f05', 14, 0, 'whoosh')]),
 # ---- day 18: the ball
 ('garage', 'g01', 0, -0.3, C, [], []),
 ('bora', 'k03', 0, -0.2, P, [], []),
 ('kick', 'g02', 0, None, E, [], [('k', 'g02', 1, 0, 'thump')]),
 ('up', 'g02', 29, None, W, [], []),
 ('chutei', 'k04', 0, -0.2, W, [], []),
 ('gol', 'g03', 0, -0.2, TR, CR, [('g', 'g03', 2, 0, 'impact')]),
 # ---- day 24
 ('d24', 'h01', 0, -0.3, T, [], []),
 ('jumpkid', 'h02', 0, None, Q, [], [('p', 'h02', 9, 0, 'pop')]),
 ('satellite', 'h03', 0, None, D, ['drone'], []),
 ('ninguem', 't03', 0, -0.2, E, [], []),
 ('ropes', 'h04', 0, -0.2, T, [], []),
 ('dot', 'h05', 0, -0.3, W, [], []),
 ('sunorbit', 'h05', 27, None, W, [], []),
 # ---- the end
 ('realife', 'z01', 0, -0.4, C, ST, []),
 ('holds', 'z02', 0, None, C, ST, []),
 ('question', 'z03', 0, None, Q, [], [('a', 'z03', 10, 0, 'pop'), ('b', 'z03', 17, 0, 'pop')]),
 ('comment', 'z04', 0, None, P, [], []),
 ('ball', 't04', 0, -0.2, P, ST, []),
 ('endcard', 't04', 99, 0.6, P, [], [('z', 't04', 99, 0.9, 'pop')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '16:9', 'captions': True, 'badge': {'title': 'IMAGINA SÓ'},
      'music': {'bpm': 104, 'key': 'D'},
      'notes': 'IMAGINA SÓ: what if gravity halved every day? Bright Brazil Z toon look in 16:9: Tuco and Biel jumping, the moon drifting away, oxygen masks, water boiling at 37°C, space suits, the sky turning black, the ball kicked into space, ropes on day 24. HUD: day + gravity %. Shot list in tools/make-scenes.py.'},
      talk='IM_LINES', visuals='visuals.ts')
