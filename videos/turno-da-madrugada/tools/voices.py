#!/usr/bin/env python3
"""Script -> voiced audio for the night-shift series, with one voice per character.
Engines: Kokoro-82M (hexgrad/Kokoro-82M), the same model and Portuguese voices VoiceStudio ships (pf_dora, pm_alex,
pm_santa), and Piper pt_BR voices ("piper:cadu", "piper:faber", "piper:jeff"; the .onnx files in $PIPER_VOICES,
default ~/.piper-voices). Run it with a Python that has `kokoro`, `piper-tts` and `soundfile` installed.
  usage: python voices.py videos/<episode>
reads  videos/<episode>/script.json  ({ lead, tail, lines: [{ id, who, text, say?, pause, emo?, cfg? }] })
       emo (0.25-1.2, optional): ACT the line with Chatterbox Multilingual at that emotion intensity, cloning the
       character's own Kokoro voice (same timbre and effect chain), so acted and plain lines match. Needs the env var
       CHATTERBOX_PY pointing at a Python with chatterbox-tts (see .claude/skills/diretor-de-terror/references/vozes.md).
writes videos/<episode>/voice/<id>.wav (reused when the text did not change), audio.wav (48 kHz mono) and lines.json
       (each line's start and end in seconds), so scenes can be cut on the lines.
"""
import json, os, subprocess, sys, tempfile
import numpy as np
import soundfile as sf

SR = 48000
# who -> (Kokoro voice, speed, ffmpeg filter applied after synthesis)
OCO = ("asplit=2[a][b];[a]asetrate=48000*0.78,aresample=48000,aecho=0.8:0.75:70|140:0.35|0.2,volume=1.25[lo];"
       "[b]asetrate=48000*1.2,aresample=48000,highpass=f=1800,volume=0.35,aecho=0.6:0.5:40:0.4[hi];"
       "[lo][hi]amix=inputs=2:normalize=0,tremolo=f=7:d=0.25")
def st(n):
    """pitch shift by n semitones keeping the speed (asetrate + atempo, atempo chained inside 0.5..2)"""
    r = 2 ** (n / 12); t = 1 / r; parts = []
    while t < 0.5: parts.append("atempo=0.5"); t /= 0.5
    while t > 2: parts.append("atempo=2"); t /= 2
    parts.append(f"atempo={t:.5f}")
    return f"aresample=48000,asetrate=48000*{r:.5f},aresample=48000," + ",".join(parts)

WALKIE = "highpass=f=450,lowpass=f=2900,acrusher=bits=9:mode=log:aa=1,acompressor=threshold=0.05:ratio=8:makeup=4"
PHONE = "highpass=f=300,lowpass=f=3400,acompressor=threshold=0.1:ratio=4:makeup=2,acrusher=bits=12:mode=log:aa=1"
# the creature speaking with someone's voice: a little lower, doubled late, metallic, a radio band and a slow flutter
ECO = (st(-1) + ",highpass=f=200,lowpass=f=5000,flanger=delay=1.5:depth=1.5:speed=0.2:regen=10,"
       "aecho=0.8:0.5:240:0.18,acrusher=bits=13:mode=log:aa=1")

VOICES = {
    "lola": ("pf_dora", 1.0, None),
    "tobby": ("pm_alex", 1.1, None),
    "earl": ("pm_santa", 0.93, "asetrate=48000*0.94,aresample=48000,atempo=1.064"),
    "oco": ("pm_santa", 0.85, OCO),
    "oco_f": ("pm_alex", 0.82, OCO),
    "dale": ("pm_santa", 0.9, OCO.replace("0.78", "0.72")),
    "radio": ("pm_alex", 1.1, "highpass=f=380,lowpass=f=3100,acrusher=bits=10:mode=log:aa=1,volume=1.6"),
    # Motel Lua Vermelha
    "mari": ("pf_dora", 1.0, None),
    "kev": ("pm_alex", 1.12, None),
    "hank": ("pm_santa", 0.9, "asetrate=48000*0.92,aresample=48000,atempo=1.087"),
    "barb": ("pf_dora", 1.05, "asetrate=48000*1.08,aresample=48000,atempo=0.926"),
    "gary": ("pm_alex", 0.98, "asetrate=48000*0.9,aresample=48000,atempo=1.11"),
    "sofia": ("pf_dora", 1.08, "asetrate=48000*1.12,aresample=48000,atempo=0.893,highpass=f=250,lowpass=f=3600"),
    "sombra_kev": ("pm_alex", 0.9, OCO.replace("0.78", "0.86")),
    # Zona de Silencio (kids are adult voices shifted up: pitch and formants move together, like a younger throat)
    "theo": ("pm_alex", 1.04, st(3.5)),
    "theo_phone": ("pm_alex", 1.04, st(3.5) + "," + PHONE),
    "theo_radio": ("pm_alex", 1.04, st(3.5) + "," + WALKIE),
    "dani": ("pf_dora", 1.08, st(2.5) + ",equalizer=f=3200:t=q:w=1:g=2"),
    "dani_radio": ("pf_dora", 1.08, st(2.5) + "," + WALKIE),
    "bolacha": ("piper:cadu", 0.98, st(4)),
    "jess": ("pf_dora", 0.98, "equalizer=f=250:t=q:w=1:g=2"),
    "kyle": ("piper:faber", 0.9, st(1) + ",equalizer=f=2500:t=q:w=1:g=-2"),
    "ray_young": ("pm_alex", 1.0, st(-1.5)),
    "ray_old": ("piper:jeff", 0.95, st(-2.5) + ",acompressor=threshold=0.1:ratio=3:makeup=2,equalizer=f=180:t=q:w=1:g=3"),
    "vance": ("pm_santa", 0.97, None),
    "coyle": ("piper:faber", 0.97, st(-2) + ",equalizer=f=4000:t=q:w=1:g=-3"),
    "central": ("pf_dora", 1.05, WALKIE),
    "helen": ("pf_dora", 0.98, st(-1.5) + ",equalizer=f=300:t=q:w=1:g=2"),
    "eco_vance": ("pm_santa", 0.92, ECO),
    "eco_ray_young": ("pm_alex", 0.92, st(-1.5) + "," + ECO),
    "eco_theo": ("pm_alex", 0.95, st(3.5) + "," + ECO),
    "eco_bolacha": ("piper:cadu", 0.9, st(4) + "," + ECO),
    # Lendas brasileiras (Shorts)
    "lb_eu": ("pf_dora", 1.02, st(2) + ",equalizer=f=250:t=q:w=1:g=1.5"),
    "lb_bia": ("pf_dora", 1.08, st(3.5) + ",equalizer=f=3200:t=q:w=1:g=2.5"),
    "cs_narr": ("piper:cadu", 0.97, st(-1) + ",equalizer=f=150:t=q:w=1:g=2.5"),
    "cs_tiao": ("pm_santa", 0.92, st(-1.5) + ",acompressor=threshold=0.1:ratio=3:makeup=2"),
    "hs_eu": ("pf_dora", 1.0, st(1) + ",equalizer=f=200:t=q:w=1:g=1.5"),
    "hs_lucas": ("pm_alex", 1.08, st(6)),
    "hs_velho": ("pm_santa", 0.9, st(-3) + ",aecho=0.8:0.4:60:0.25,equalizer=f=120:t=q:w=1:g=3"),
    "hs_saco": ("pf_dora", 1.05, st(4) + ",lowpass=f=900,highpass=f=150,volume=0.9"),
    "hs_mae": ("pf_dora", 0.98, st(-1)),
}

PIPER_DIR = os.environ.get("PIPER_VOICES", os.path.expanduser("~/.piper-voices"))   # pt_BR-<name>-medium.onnx (+ .json)
_PIPERS = {}

class Pipe:
    """both engines behind one call: raw(text, voice, speed) -> (samples, sample_rate)"""
    def __init__(self): self.k = None
    def raw(self, text, voice, speed):
        if voice.startswith("piper:"):
            from piper import PiperVoice, SynthesisConfig
            name = voice.split(":", 1)[1]
            if name not in _PIPERS: _PIPERS[name] = PiperVoice.load(os.path.join(PIPER_DIR, f"pt_BR-{name}-medium.onnx"))
            v = _PIPERS[name]; cfg = SynthesisConfig(length_scale=1 / speed)
            audio = np.concatenate([c.audio_float_array for c in v.synthesize(text, syn_config=cfg)])
            return audio, v.config.sample_rate
        if self.k is None:
            from kokoro import KPipeline
            self.k = KPipeline(lang_code="p", repo_id="hexgrad/Kokoro-82M")
        return np.concatenate([np.asarray(a) for _, _, a in self.k(text, voice=voice, speed=speed)]), 24000

def load_pipe(): return Pipe()

def synth(pipe, text, who, out):
    voice, speed, fx = VOICES[who]
    audio, sr = pipe.raw(text, voice, speed)
    with tempfile.TemporaryDirectory() as d:
        raw = os.path.join(d, "raw.wav"); sf.write(raw, audio, sr); finish(raw, who, out)

HERE = os.path.dirname(os.path.abspath(__file__))
BATCH = os.path.join(HERE, "..", "..", "..", ".claude", "skills", "diretor-de-terror", "scripts", "chatterbox-batch.py")
REF_TEXT = "Boa noite. Eu trabalho aqui faz muito tempo, e conheço cada canto deste lugar, cada barulho e cada sombra."

def finish(raw, who, out):
    """resample, the character's effect chain and trim, shared by both engines"""
    fx = VOICES[who][2]
    af = "aresample=48000" + (f",{fx}" if fx else "")
    trim = "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-filter_complex", f"{af},{trim}", "-ac", "1", "-ar", str(SR), out], check=True)

def ref_for(pipe, who, vdir):
    """a 6-8 s plain Kokoro read in the character's voice (no effects), the timbre Chatterbox clones"""
    ref = os.path.join(vdir, f"_ref_{VOICES[who][0].replace(':', '-')}_{VOICES[who][1]}.wav")
    if not os.path.exists(ref):
        voice, speed, _ = VOICES[who]
        audio, sr = pipe.raw(REF_TEXT, voice, speed)
        sf.write(ref, audio, sr)
    return ref

def act(jobs):
    """run the Chatterbox batch (one model load) and finish every line"""
    py = os.environ.get("CHATTERBOX_PY")
    if not py: sys.exit("lines with 'emo' need CHATTERBOX_PY=<python with chatterbox-tts> (see references/vozes.md)")
    with tempfile.TemporaryDirectory() as d:
        for k, j in enumerate(jobs): j["raw"] = os.path.join(d, f"{k}.wav")
        spec = os.path.join(d, "jobs.json")
        json.dump([{"text": j["say"], "ref": j["ref"], "out": j["raw"], "exaggeration": j["emo"], "cfg": j["cfg"], "lang": "pt"} for j in jobs], open(spec, "w", encoding="utf8"), ensure_ascii=False)
        subprocess.run([py, BATCH, spec], check=True, stdout=subprocess.DEVNULL)
        for j in jobs:
            finish(j["raw"], j["who"], j["wav"]); open(j["txt"], "w", encoding="utf8").write(j["key"])

def main():
    root = os.path.abspath(sys.argv[1]); vdir = os.path.join(root, "voice"); os.makedirs(vdir, exist_ok=True)
    S = json.load(open(os.path.join(root, "script.json"), encoding="utf8"))
    pipe = None; acted = []
    parts, t, lines = [], S.get("lead", 0.5), []
    parts.append(np.zeros(int(t * SR), dtype=np.float32))
    for L in S["lines"]:
        say = L.get("say", L["text"]); wav = os.path.join(vdir, f"{L['id']}.wav"); txt = wav[:-4] + ".txt"
        emo = L.get("emo"); key = f"{L['who']}|{say}" + (f"|emo={emo}|cfg={L.get('cfg', 0.3)}" if emo is not None else "")
        if not (os.path.exists(wav) and os.path.exists(txt) and open(txt, encoding="utf8").read() == key):
            pipe = pipe or load_pipe()
            print(f"  {L['id']} ({L['who']}{', emo ' + str(emo) if emo is not None else ''}): {L['text'][:60]}", file=sys.stderr)
            if emo is None:
                synth(pipe, say, L["who"], wav); open(txt, "w", encoding="utf8").write(key)
            else:
                acted.append({"say": say, "who": L["who"], "emo": emo, "cfg": L.get("cfg", 0.3), "ref": ref_for(pipe, L["who"], vdir), "wav": wav, "txt": txt, "key": key})
    if acted: act(acted)
    for L in S["lines"]:
        wav = os.path.join(vdir, f"{L['id']}.wav")
        a, sr = sf.read(wav, dtype="float32"); assert sr == SR
        lines.append({"id": L["id"], "who": L["who"], "text": L["text"], "t0": round(t, 3), "t1": round(t + len(a) / SR, 3)})
        parts.append(a); t += len(a) / SR
        gap = L.get("pause", 0.35); parts.append(np.zeros(int(gap * SR), dtype=np.float32)); t += gap
    parts.append(np.zeros(int(S.get("tail", 1.2) * SR), dtype=np.float32))
    audio = np.concatenate(parts); peak = float(np.max(np.abs(audio))) or 1.0
    sf.write(os.path.join(root, "audio.wav"), audio * (0.89 / peak), SR, subtype="PCM_16")
    json.dump({"duration": round(len(audio) / SR, 3), "lines": lines}, open(os.path.join(root, "lines.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
    print(json.dumps({"episode": os.path.basename(root), "duration": round(len(audio) / SR, 2), "lines": len(lines)}))

if __name__ == "__main__":
    main()
