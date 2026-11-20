#!/usr/bin/env python3
"""Script -> voiced audio for the night-shift series, with one voice per character.
Engine: Kokoro-82M (hexgrad/Kokoro-82M), the same model and Portuguese voices VoiceStudio ships (pf_dora, pm_alex,
pm_santa). Run it with a Python that has `kokoro` and `soundfile` installed.
  usage: python voices.py videos/<episode>
reads  videos/<episode>/script.json  ({ lead, tail, lines: [{ id, who, text, say?, pause }] })
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
}

def load_pipe():
    from kokoro import KPipeline
    return KPipeline(lang_code="p", repo_id="hexgrad/Kokoro-82M")

def synth(pipe, text, who, out):
    voice, speed, fx = VOICES[who]
    audio = np.concatenate([np.asarray(a) for _, _, a in pipe(text, voice=voice, speed=speed)])
    with tempfile.TemporaryDirectory() as d:
        raw = os.path.join(d, "raw.wav"); sf.write(raw, audio, 24000)
        af = "aresample=48000" + (f",{fx}" if fx else "")
        trim = "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-filter_complex", f"{af},{trim}", "-ac", "1", "-ar", str(SR), out], check=True)

def main():
    root = os.path.abspath(sys.argv[1]); vdir = os.path.join(root, "voice"); os.makedirs(vdir, exist_ok=True)
    S = json.load(open(os.path.join(root, "script.json"), encoding="utf8"))
    pipe = None
    parts, t, lines = [], S.get("lead", 0.5), []
    parts.append(np.zeros(int(t * SR), dtype=np.float32))
    for L in S["lines"]:
        say = L.get("say", L["text"]); wav = os.path.join(vdir, f"{L['id']}.wav"); txt = wav[:-4] + ".txt"
        key = f"{L['who']}|{say}"
        if not (os.path.exists(wav) and os.path.exists(txt) and open(txt, encoding="utf8").read() == key):
            pipe = pipe or load_pipe()
            print(f"  {L['id']} ({L['who']}): {L['text'][:60]}", file=sys.stderr)
            synth(pipe, say, L["who"], wav); open(txt, "w", encoding="utf8").write(key)
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
