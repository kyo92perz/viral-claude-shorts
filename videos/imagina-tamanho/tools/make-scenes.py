#!/usr/bin/env python3
"""IMAGINA SÓ: "E se você DOBRASSE de tamanho todo dia?" -> words.json, scenes.json, speech windows in visuals.ts.
Run from the repo root:  python3 videos/imagina-tamanho/tools/make-scenes.py && node core/scenes.ts videos/imagina-tamanho"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

C, P, E, Q, W, EP, T, SAD, TR, D = 'calm', 'playful', 'energetic', 'curious', 'wonder', 'epic', 'tense', 'sad', 'triumphant', 'dark'
RM, ST, CR, N, DR, HM = ['room'], ['wind'], ['crowd'], ['night'], ['drone'], ['hum']
SHOTS = [
 ('hook', 'a01', 0, None, W, [], []),
 ('grow', 'a01', 11, None, P, ST, [('d', 'a01', 17, 0, 'pop')]),
 ('fun', 'a02', 0, -0.2, P, ST, []),
 ('building', 'a02', 17, None, E, CR, [('p', 'a02', 27, 0, 'impact')]),
 ('earthhand', 'a02', 28, None, W, [], [('e', 'a02', 34, 0, 'riser')]),
 ('real', 'a03', 0, -0.2, Q, [], []),
 ('guess', 'a04', 0, -0.2, P, [], [('g', 'a04', 14, 0, 'impact')]),
 # ---- day 1-2
 ('normal', 'b01', 0, -0.4, C, RM, [('z', 'b01', 15, 0, 'off')]),
 ('wake', 'b01', 17, None, E, RM, [('w', 'b01', 17, 0.2, 'impact')]),
 ('cama', 't01', 0, -0.2, E, RM, []),
 ('mae', 'm01', 0, -0.2, E, RM, []),
 ('surprise', 'b02', 0, -0.2, Q, [], [('o', 'b02', 18, 0, 'hit')]),
 ('cube', 'b03', 0, -0.2, Q, [], [('a', 'b03', 9, 0, 'pop'), ('l', 'b03', 13, 0, 'pop'), ('g', 'b03', 18, 0, 'pop'), ('o', 'b03', 24, 0, 'impact')]),
 ('door', 'b04', 0, -0.2, P, RM, [('c', 'b04', 7, 0, 'thud')]),
 ('food', 'b04', 10, None, P, RM, [('b', 'b04', 25, 0, 'whoosh')]),
 ('dunk', 'k01', 0, -0.2, E, ST, []),
 # ---- day 3
 ('elephant', 'c01', 0, -0.4, P, ST, [('e', 'c01', 15, 0, 'pop')]),
 ('bones', 'c02', 0, -0.2, Q, [], [('a', 'c02', 23, 0, 'tick'), ('b', 'c02', 30, 0, 'tick')]),
 ('crack', 'c03', 0, -0.2, T, [], [('c', 'c03', 12, 0, 'impact')]),
 ('deal', 'c03', 22, None, P, ST, [('k', 'c03', 32, 0, 'pop')]),
 ('voice', 'c04', 0, -0.2, Q, [], []),
 ('olhando', 't02', 0, -0.2, Q, CR, []),
 # ---- day 5
 ('day5', 'd01', 0, -0.4, E, ST, [('c', 'd01', 18, 0, 'pop')]),
 ('heat', 'd02', 0, -0.2, T, [], [('v', 'd02', 16, 0, 'hit')]),
 ('lake', 'd03', 0, -0.2, P, ST, []),
 ('infra', 'd04', 0, -0.2, Q, HM, [('n', 'd04', 28, 0, 'off')]),
 ('app', 'k02', 0, -0.2, P, ST, []),
 ('fome', 't03', 0, -0.2, P, ST, []),
 # ---- day 6-10
 ('cristo', 'e01', 0, -0.4, W, ST, []),
 ('day7', 'e01', 15, None, E, CR, [('d', 'e01', 15, 0.2, 'impact')]),
 ('steps', 'e02', 0, -0.2, T, CR, [('a', 'e02', 15, 0, 'siren')]),
 ('carrier', 'e05', 0, -0.3, E, ST, [('p', 'e05', 12, 0, 'hit')]),
 ('news', 'r01', 0, -0.2, T, CR, []),
 ('citymeal', 'e03', 0, -0.3, Q, ST, [('c', 'e03', 14, 0, 'pop')]),
 ('burj', 'e04', 0, -0.3, EP, ST, [('t', 'e04', 18, 0, 'impact')]),
 # ---- day 13-14
 ('tosea', 'f01', 0, -0.4, C, ST, []),
 ('ocean', 'f02', 0, -0.2, W, ST, [('p', 'f02', 13, 0, 'pop')]),
 ('clouds', 'f03', 0, -0.3, W, ST, [('n', 'f03', 9, 0, 'whoosh'), ('e', 'f03', 13, 0, 'hit'), ('a', 'f03', 16, 0, 'whoosh'), ('f', 'f03', 26, 0, 'sting')]),
 ('frio', 't04', 0, -0.2, SAD, ST, []),
 ('island', 'f04', 0, -0.3, C, N, []),
 ('science', 'f05', 0, -0.2, E, CR, []),
 # ---- day 17-21
 ('karman', 'g01', 0, -0.4, W, [], [('k', 'g01', 16, 0, 'riser')]),
 ('iss', 'g02', 0, -0.3, W, [], []),
 ('selfie', 'k03', 0, -0.2, P, ST, []),
 ('sink', 'g03', 0, -0.3, T, DR, [('p', 'g03', 10, 0, 'hit'), ('a', 'g03', 27, 0, 'thud')]),
 ('orbit', 'g04', 0, -0.3, W, [], [('l', 'g04', 27, 0, 'pop')]),
 # ---- day 23-27
 ('brazil', 'h01', 0, -0.4, W, [], []),
 ('maecall', 'm02', 0, -0.2, SAD, ST, []),
 ('pilates', 'h02', 0, -0.3, P, [], [('b', 'h02', 25, 0, 'pop')]),
 ('eye', 'h05', 0, -0.2, T, CR, [('s', 'h05', 23, 0, 'hit')]),
 ('soccer', 'h03', 0, -0.3, W, [], [('b', 'h03', 16, 0, 'pop')]),
 ('swap', 'h04', 0, -0.2, EP, [], [('g', 'h04', 18, 0, 'hit'), ('t', 'h04', 34, 0, 'whoosh')]),
 ('hand', 't05', 0, -0.2, W, [], []),
 # ---- day 29-32
 ('moon', 'i01', 0, -0.4, W, [], [('j', 'i01', 27, 0, 'pop')]),
 ('jupiter', 'i02', 0, -0.3, EP, [], [('j', 'i02', 16, 0, 'impact')]),
 ('ball', 'i03', 0, -0.2, T, DR, [('b', 'i03', 29, 0, 'hit')]),
 ('fusion', 'i04', 0, -0.4, EP, DR, [('f', 'i04', 32, 0, 'riser'), ('e', 'i04', 37, 0, 'impact')]),
 ('star', 'i05', 0, -0.3, TR, [], [('a', 'i05', 5, 0, 'impact')]),
 ('twosuns', 'i05', 9, None, W, [], []),
 ('chaos', 'i06', 0, -0.2, T, DR, []),
 # ---- the end
 ('reallife', 'z01', 0, -0.4, C, [], [('b', 'z01', 31, 0, 'whoosh'), ('a', 'z01', 37, 0, 'pop')]),
 ('ant', 'z02', 0, -0.2, P, ST, [('f', 'z02', 6, 0, 'pop'), ('e', 'z02', 14, 0, 'thud')]),
 ('ask', 'z03', 0, -0.2, Q, [], [('a', 'z03', 10, 0, 'pop'), ('b', 'z03', 20, 0, 'pop')]),
 ('sub', 'z04', 0, -0.2, P, [], [('i', 'z04', 9, 0, 'impact')]),
 ('endcard', 't06', 0, -0.2, P, RM, []),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '16:9', 'look': 'rich', 'captions': True, 'badge': {'title': 'IMAGINA SÓ'},
      'music': {'bpm': 104, 'key': 'G'},
      'notes': 'IMAGINA SÓ: what if you DOUBLED in size every day? Bright Brazil Z toon look in 16:9: Tuco grows from 1.60 m to bigger than the planet; the square-cube law (8x weight, bones), the deep voice, the heat, landmarks (statue, tower), the sea, space, the Earth in his hand, Jupiter, and he becomes a star. HUD: day + height. Shot list in tools/make-scenes.py.'},
      talk='IM_LINES', visuals='visuals.ts')
