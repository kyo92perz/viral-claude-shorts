#!/usr/bin/env python3
"""ARQUIVO PROIBIDO, Caso Nº 002: A Noite Oficial dos OVNIs -> words.json, scenes.json, speech windows in visuals.ts.
Run from the repo root:  python3 videos/arquivo-002-noite-ovnis/tools/make-scenes.py && node core/scenes.ts videos/arquivo-002-noite-ovnis"""
import os, sys
V = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, os.path.join(V, '..', '..', 'core'))
from shots import build

D, T, C, E, S0, Q, SAD, W, EP = 'dark', 'tense', 'calm', 'energetic', 'silence', 'curious', 'sad', 'wonder', 'epic'
N, DR, RM, ST, HM = ['night'], ['drone'], ['room'], ['static'], ['hum']
SHOTS = [
 # ---- cold open
 ('o-sky', 'a01', 0, None, W, N, [('d', 'a01', 0, 0.3, 'hit')]),
 ('o-radar', 'a02', 0, None, T, HM, [('n', 'a02', 8, 0, 'beep')]),
 ('o-jets', 'a02', 16, None, E, [], [('j', 'a02', 16, 0.15, 'whoosh')]),
 ('o-press', 'a03', 0, None, T, ['crowd'], []),
 ('o-quote', 'q01', 0, -0.2, S0, [], []),
 ('o-archive', 'a04', 0, None, Q, RM, []),
 ('o-docs', 'a04', 14, None, Q, RM, [('s', 'a04', 22, 0, 'thump')]),
 ('title', 'a05', 0, None, EP, [], [('t', 'a05', 3, 0, 'impact'), ('c', 'a05', 6, 0, 'hit')]),
 # ---- 1986: how the sky was watched
 ('cindacta', 'b01', 0, -0.3, C, HM, []),
 ('echo', 'b01', 7, None, Q, HM, [('a', 'b01', 7, 0.6, 'beep'), ('b', 'b01', 12, 0, 'beep')]),
 ('cmap', 'b02', 4, None, Q, HM, []),
 ('network', 'b02', 16, None, Q, HM, []),
 ('bases', 'b03', 0, None, T, [], [('s', 'b03', 12, 0, 'tick'), ('a', 'b03', 13, 0, 'tick')]),
 ('santacruz', 'b03', 18, None, T, ['wind'], []),
 ('f5photo', 'b03', 24, None, T, [], []),
 ('anapolis', 'b03', 29, None, T, [], []),
 ('miragephoto', 'b03', 36, None, T, [], []),
 # ---- 20h, São José dos Campos
 ('sjc', 'c01', 0, -0.4, C, ['wind'], [('h', 'c01', 0, 0.4, 'tick')]),
 ('tower', 'c01', 20, None, W, N, []),
 ('q-torre', 'q02', 0, -0.2, T, ST, []),
 ('colors', 'c02', 0, None, W, N, []),
 ('runway', 'c02', 16, None, D, N, [('o', 'c02', 17, 0, 'off'), ('b', 'c02', 30, 0, 'hit')]),
 ('gru', 'c03', 0, None, T, HM, []),
 ('atcscreen', 'c03', 18, None, D, HM, []),
 # ---- 21h08, Ozires Silva
 ('xingu', 'd01', 0, -0.4, C, ['wind'], [('h', 'd01', 0, 0.4, 'tick')]),
 ('ozires', 'd01', 17, None, Q, [], []),
 ('redstars', 'd02', 0, None, W, N, []),
 ('ozquote', 'd03', 0, None, Q, [], []),
 # ---- the alert
 ('alert', 'e01', 0, -0.4, T, HM, [('h', 'e01', 0, 0.4, 'siren')]),
 ('anaradar', 'e01', 15, None, T, HM, []),
 ('cerqueira', 'e02', 0, None, T, HM, [('i', 'e02', 15, 0, 'impact')]),
 # ---- Jambock 17
 ('jb17', 'f01', 0, -0.4, E, [], [('h', 'f01', 0, 0.4, 'tick')]),
 ('takeoff', 'f01', 28, None, E, [], [('t', 'f01', 28, 0.15, 'whoosh')]),
 ('chase1', 'f02', 0, None, E, [], [('v', 'f02', 6, 0, 'sting')]),
 ('machexp', 'f02', 19, None, Q, [], []),
 ('chase1b', 'f02', 27, None, E, [], []),
 ('sea', 'f03', 0, None, T, [], []),
 ('f5sea', 'f03', 5, None, T, ['wind'], []),
 ('q-pil1', 'q03', 0, -0.2, T, ST, []),
 ('africa', 'f04', 0, None, SAD, N, []),
 # ---- Jaguar 116
 ('jg116', 'g01', 0, -0.4, T, [], [('h', 'g01', 0, 0.4, 'tick')]),
 ('lock', 'g01', 20, None, T, HM, [('l', 'g01', 24, 0, 'beep')]),
 ('vanish', 'g02', 0, None, D, HM, [('v', 'g02', 12, 0, 'off')]),
 ('zip', 'g02', 24, None, E, [], [('z', 'g02', 36, 0, 'whoosh')]),
 ('mach15', 'g03', 0, None, EP, [], [('m', 'g03', 10, 0, 'impact')]),
 ('machcmp', 'g03', 13, None, EP, [], [('a', 'g03', 13, 0.5, 'tick'), ('b', 'g03', 13, 1.4, 'tick'), ('c', 'g03', 13, 2.3, 'tick'), ('d', 'g03', 19, 0, 'impact')]),
 ('noeye', 'g03', 25, None, D, N, []),
 # ---- Jambock 07
 ('jb07', 'h01', 0, -0.4, T, [], [('h', 'h01', 0, 0.4, 'tick')]),
 ('tail13', 'h01', 28, None, D, HM, [('t', 'h01', 38, 0, 'sting')]),
 ('turn', 'h02', 0, None, T, N, []),
 ('q-pil2', 'q04', 0, -0.2, T, ST, []),
 # ---- Jaguar 98
 ('jg98', 'i01', 0, -0.4, T, [], [('h', 'i01', 0, 0.4, 'tick')]),
 ('pattern', 'i01', 24, None, D, HM, []),
 ('q-ctrl', 'q05', 0, -0.2, D, ST, []),
 ('sixoclock', 'i02', 0, None, D, [], []),
 ('hangar', 'i03', 0, None, SAD, ['wind'], []),
 ('mechanics', 'i03', 7, None, SAD, N, []),
 # ---- the last Mirage
 ('last', 'j01', 0, -0.4, T, [], [('h', 'j01', 0, 0.4, 'tick')]),
 ('three', 'j01', 16, None, T, HM, [('a', 'j01', 17, 0, 'beep'), ('b', 'j01', 28, 0, 'beep'), ('c', 'j01', 36, 0, 'beep')]),
 ('landing', 'j02', 0, None, SAD, [], [('s', 'j02', 24, 0, 'hit')]),
 # ---- the press conference
 ('press', 'k01', 0, -0.4, T, ['crowd'], [('d', 'k01', 12, 0, 'hit')]),
 ('q-min', 'q06', 0, -0.2, T, ['crowd'], []),
 ('oficial', 'k02', 0, None, EP, [], [('s', 'k02', 24, 0, 'impact')]),
 ('nopaper', 'k03', 0, None, S0, RM, [('y', 'k03', 12, 0, 'hit')]),
 # ---- 2009: the report
 ('release', 'l01', 0, -0.4, Q, RM, [('d', 'l01', 1, 0, 'hit')]),
 ('report', 'l01', 28, None, T, RM, []),
 ('q-doc', 'q07', 0, -0.2, D, RM, [('s', 'q07', 9, 0, 'sting')]),
 ('solid', 'l02', 0, None, EP, [], [('a', 'l02', 0, 0, 'impact'), ('b', 'l02', 1, 0, 'impact'), ('c', 'l02', 3, 0, 'impact')]),
 ('list', 'l03', 0, None, Q, [], [('a', 'l03', 8, 0, 'tick'), ('b', 'l03', 20, 0, 'tick'), ('c', 'l03', 28, 0, 'tick'), ('d', 'l03', 40, 0, 'tick')]),
 ('audio', 'l04', 0, None, Q, ST, []),
 # ---- the explanations
 ('skradar', 'm01', 0, -0.4, C, HM, []),
 ('skeptic', 'm01', 10, None, C, [], []),
 ('planets', 'm01', 27, None, C, N, [('b', 'm01', 33, 0, 'pop')]),
 ('double', 'm02', 0, None, T, [], [('v', 'm02', 24, 0, 'hit')]),
 ('coast', 'm03', 0, None, W, N, []),
 ('open', 'm03', 13, None, W, RM, []),
 # ---- the end
 ('ask', 'n01', 0, -0.3, Q, [], [('a', 'n01', 13, 0, 'pop'), ('b', 'n01', 15, 0, 'pop'), ('c', 'n01', 18, 0, 'pop')]),
 ('next', 'n02', 0, None, D, DR, []),
 ('end', 'n03', 0, -0.2, D, DR, [('c', 'n03', 3, 0, 'impact'), ('z', 'n03', 99, 0.6, 'sting')]),
]
build(V, SHOTS, {'style': 'flat2d', 'fps': 30, 'format': '16:9', 'look': 'rich', 'captions': True, 'badge': {'title': 'ARQUIVO PROIBIDO', 'ep': 'CASO Nº 002'},
      'music': {'bpm': 72, 'key': 'E'},
      'notes': 'ARQUIVO PROIBIDO, Caso Nº 002: the Official UFO Night (19 May 1986). A documentary: real photos (Wikimedia Commons, credits in assets/CREDITOS.txt) with slow camera moves, an animated radar scope, the map of the bases and routes, time cards, the official report, the radio waveforms, and animated reconstructions of the jets at night (tagged). Shot list in tools/make-scenes.py.'},
      talk='OP_LINES', visuals='visuals.ts')
