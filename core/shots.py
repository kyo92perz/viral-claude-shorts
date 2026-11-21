#!/usr/bin/env python3
"""A shot list tied to the script's lines -> words.json, scenes.json and the speech windows of a video.
Used by a video's tools/make-scenes.py (see videos/lenda-loira-do-banheiro/tools/make-scenes.py):

  from shots import build
  build(VIDEO_DIR, SHOTS, plan={...}, talk='LB_LINES', visuals='visuals.ts')

SHOTS: (id, line, word, delay, mood, ambience, keys)
  line + word: the shot starts at that word of the line (99 = after the line's last word);
  delay: seconds added to that moment (negative = cut inside the pause before the line);
  keys: (id, line, word, dt, sfx): moments inside the shot, same rules, dt in seconds.
The words come from the script itself (voices.py measured every line's window): each line's window is split among its
words by their length, so short lines and single words never get lost the way speech recognition loses them.
The speech windows (who talks when) are written into the visuals file between `// <lines>` and `// </lines>`."""
import json, os, re


def build(V, SHOTS, plan, talk='LINES', visuals='visuals.ts', silent_voices=()):
    lines = json.load(open(os.path.join(V, 'lines.json')))
    LINES = lines['lines']
    W = []
    for l in LINES:
        ws = l['text'].split(); wt = [len(re.sub(r'[^\w]', '', w)) + 1.5 for w in ws]; tot = sum(wt); t = l['t0']; d = l['t1'] - l['t0']
        for w, k in zip(ws, wt): W.append({'w': w, 't0': round(t, 3), 't1': round(t + d * k / tot - 0.02, 3)}); t += d * k / tot
    json.dump({'duration': lines['duration'], 'language': 'pt', 'text': ' '.join(l['text'] for l in LINES), 'words': W},
              open(os.path.join(V, 'words.json'), 'w'), ensure_ascii=False, indent=1)
    LT = {l['id']: l for l in LINES}

    def word(line_id, n=0):
        l = LT[line_id]; idx = [i for i, w in enumerate(W) if l['t0'] - 0.001 <= w['t0'] < l['t1']]
        return idx[min(n, len(idx) - 1)]

    scenes = []
    for sid, line, woff, delay, mood, amb, keys in SHOTS:
        i = word(line, 999 if woff == 99 else woff); sc = {'id': sid, 'from': i, 'type': 'object', 'mood': mood}
        if woff == 99: delay = (W[i]['t1'] - W[i]['t0']) + (delay or 0)
        if delay: sc['delay'] = round(delay, 3)
        if amb: sc['ambience'] = amb
        ks = []
        for kid, kl, kw, dt, sfx in keys:
            j = word(kl, 999 if kw == 99 else kw); d = (dt or 0) + ((W[j]['t1'] - W[j]['t0']) if kw == 99 else 0)
            k = {'id': kid, 'at': j}
            if d: k['dt'] = round(d, 3)
            if sfx: k['sfx'] = sfx
            ks.append(k)
        if ks: sc['keys'] = ks
        scenes.append(sc)
    scenes[0].pop('delay', None); scenes[0]['from'] = 0
    json.dump({**plan, 'scenes': scenes}, open(os.path.join(V, 'scenes.json'), 'w'), ensure_ascii=False, indent=1)
    sp = [{'who': l['who'], 't0': l['t0'], 't1': l['t1']} for l in LINES if l['who'] not in silent_voices]
    vis = os.path.join(V, visuals); src = open(vis).read() if os.path.exists(vis) else ''
    block = f'// <lines>\nconst {talk} = ' + json.dumps(sp) + ';\n// </lines>'
    src = re.sub(r'// <lines>.*?// </lines>', lambda m: block, src, flags=re.S) if '// <lines>' in src else block + '\n' + src
    open(vis, 'w').write(src)
    print(f'scenes.json: {len(scenes)} shots; speech windows: {len(sp)}')
