#!/usr/bin/env python3
"""Acted TTS lines with Chatterbox Multilingual (Resemble AI, MIT licence): Portuguese and 22 other languages, a voice
cloned from a short reference clip, and an emotion intensity knob (exaggeration). The model loads once for the batch.
Run it with the Python of a venv that has chatterbox-tts (see references/vozes.md, "Instalar o Chatterbox").
  usage: <chatterbox-python> chatterbox-batch.py jobs.json
  jobs.json: [{"text": "...", "ref": "ref.wav", "out": "line.wav", "exaggeration": 0.7, "cfg": 0.3, "lang": "pt"}, ...]
  exaggeration 0.25-0.4 calm, 0.5 neutral, 0.7 acted (fear, anger), 1.0+ extreme (screams, breakdown; check it).
  cfg (0.2-0.5): lower = slower and more deliberate delivery; use ~0.3 with high exaggeration.
Status on stderr; prints a JSON list of written files on stdout. The model adds an inaudible Perth watermark."""
import json, sys, time
import torch, torchaudio as ta
from chatterbox.mtl_tts import ChatterboxMultilingualTTS

jobs = json.load(open(sys.argv[1], encoding='utf-8'))
torch.set_num_threads(max(1, torch.get_num_threads()))
dev = 'cuda' if torch.cuda.is_available() else ('mps' if torch.backends.mps.is_available() else 'cpu')
t0 = time.time(); model = ChatterboxMultilingualTTS.from_pretrained(device=dev)
print(f'chatterbox loaded on {dev} in {time.time() - t0:.0f} s', file=sys.stderr)
done = []
for j in jobs:
    t0 = time.time()
    wav = model.generate(j['text'], language_id=j.get('lang', 'pt'), audio_prompt_path=j['ref'],
                         exaggeration=float(j.get('exaggeration', 0.5)), cfg_weight=float(j.get('cfg', 0.5)))
    ta.save(j['out'], wav, model.sr); done.append(j['out'])
    print(f"  {j['out'].split('/')[-1]}: {wav.shape[-1] / model.sr:.1f} s audio in {time.time() - t0:.0f} s", file=sys.stderr)
print(json.dumps(done))
