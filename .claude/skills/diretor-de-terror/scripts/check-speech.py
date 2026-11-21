#!/usr/bin/env python3
"""Can a listener understand this take? Transcribes a voice file with faster-whisper and compares it with the text it
should say: word error rate and the words that came out wrong. A cheap ear for TTS takes and voice effects (we cannot
listen, the recogniser can). Run it with the repo's .venv (it has faster-whisper).
  usage: .venv/bin/python check-speech.py take.wav "texto esperado" [lang]
         .venv/bin/python check-speech.py videos/<topic>       -> every line of voice/*.wav against its .txt
  Prints JSON on stdout. wer <= 0.15 reads fine; 0.15-0.35 check the listed words; > 0.35 the line is not understood
  (on purpose only for a beast that should not be understood)."""
import difflib, glob, json, os, re, subprocess, sys, unicodedata
import numpy as np
from faster_whisper import WhisperModel

def norm(t):
    t = unicodedata.normalize('NFKD', t.lower()); t = ''.join(c for c in t if not unicodedata.combining(c))
    return re.findall(r"[a-z0-9]+", t)

U = 'zero um dois tres quatro cinco seis sete oito nove dez onze doze treze quatorze quinze dezesseis dezessete dezoito dezenove'.split()
T = ' _ vinte trinta quarenta cinquenta sessenta setenta oitenta noventa'.split(' ')
C = ' cento duzentos trezentos quatrocentos quinhentos seiscentos setecentos oitocentos novecentos'.split(' ')

def extenso(n):
    """Portuguese words for 0..9999 (whisper writes numbers as digits, the script spells them)"""
    if n < 20: return U[n]
    if n < 100: return T[n // 10] + ('' if n % 10 == 0 else ' e ' + U[n % 10])
    if n == 100: return 'cem'
    if n < 1000: return C[n // 100] + ('' if n % 100 == 0 else ' e ' + extenso(n % 100))
    k, r = divmod(n, 1000); head = 'mil' if k == 1 else extenso(k) + ' mil'
    return head + ('' if r == 0 else (' e ' if r < 100 or r % 100 == 0 else ' ') + extenso(r))

def words(t):
    t = re.sub(r'\d+', lambda m: extenso(int(m.group())) if len(m.group()) <= 4 else ' '.join(extenso(int(c)) for c in m.group()), t)
    return norm(t)

def load(f):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32)

def score(text, heard):
    a, b = words(text), words(heard)
    sm = difflib.SequenceMatcher(a=a, b=b); errors = 0; wrong = []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op != 'equal':
            errors += max(i2 - i1, j2 - j1); wrong.append(f"{' '.join(a[i1:i2]) or '∅'} -> {' '.join(b[j1:j2]) or '∅'}")
    return round(errors / max(1, len(a)), 2), wrong

def check(model, f, texts, lang):
    """texts: the spellings the line may be written in (the script's text and its phonetic 'say'); the best one counts"""
    segs, _ = model.transcribe(load(f), language=lang, beam_size=5)
    heard = ' '.join(s.text.strip() for s in segs)
    wer, wrong = min((score(t, heard) for t in texts if t), key=lambda x: x[0])
    return {'file': os.path.basename(f), 'wer': wer, 'heard': heard, 'wrong': wrong}

if __name__ == '__main__':
    target = sys.argv[1]; lang = 'pt'
    model = WhisperModel('small', device='cpu', compute_type='int8')
    if os.path.isdir(target):
        if len(sys.argv) > 2: lang = sys.argv[2]
        out = []; sp = os.path.join(target, 'script.json')
        written = {L['id']: L['text'] for L in json.load(open(sp, encoding='utf-8'))['lines']} if os.path.exists(sp) else {}
        for f in sorted(glob.glob(os.path.join(target, 'voice', '*.wav'))):
            tf = f[:-4] + '.txt'
            if os.path.basename(f).startswith('_') or not os.path.exists(tf): continue
            said = open(tf, encoding='utf-8').read().split('|')[1].strip()
            r = check(model, f, [written.get(os.path.basename(f)[:-4]), said], lang); out.append(r)
            print(f"{r['file']}: wer {r['wer']}", file=sys.stderr)
        bad = [r for r in out if r['wer'] > 0.15]
        print(json.dumps({'lines': len(out), 'mean_wer': round(sum(r['wer'] for r in out) / max(1, len(out)), 3), 'to_check': bad}, ensure_ascii=False, indent=1))
    else:
        if len(sys.argv) > 3: lang = sys.argv[3]
        print(json.dumps(check(model, target, [sys.argv[2]], lang), ensure_ascii=False))
