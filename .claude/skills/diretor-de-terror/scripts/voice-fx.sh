#!/bin/bash
# Voice effects for horror, from one clean take (any TTS or a recording). Each preset is an ffmpeg filter chain.
#   usage: bash voice-fx.sh <preset> in.wav out.wav        (bash voice-fx.sh list  -> the presets)
# Every output is 48 kHz mono at -20 LUFS (true peak <= -1.5 dBTP), so presets can be swapped without re-mixing. Pitch changes keep the duration (asetrate + atempo).
set -e
P="$1"; IN="$2"; OUT="$3"
# pitch shift by semitones keeping tempo: asetrate*r, aresample, atempo 1/r (atempo accepts 0.5..2, chained when needed)
ps() { python3 -c "
import sys; r = 2 ** (float(sys.argv[1]) / 12); t = 1 / r; parts = []
while t < 0.5: parts.append('atempo=0.5'); t /= 0.5
while t > 2: parts.append('atempo=2'); t /= 2
parts.append(f'atempo={t:.5f}'); print(f'asetrate=48000*{r:.5f},aresample=48000,' + ','.join(parts))" "$1"; }
END="loudnorm=I=-20:TP=-1.5:LRA=11,aresample=48000"   # every preset lands at the same dialogue level
PRE=""   # optional chain rendered first into a second input ([1:a]); used for reversed reverbs (a swell BEFORE the words)
case "$P" in
  list)
    cat >&2 <<'EOF'
limpa        dialogue polish: rumble cut, de-ess, gentle compression, presence (use on every line first)
sussurro     intimate close whisper feel: thin lows, airy highs, tight compression (for a whispered TTS take)
pensamento   inner voice: dry, close, slightly dark, a touch of short room
distante     someone far away in a room: dark, quieter, big early reflections
parede       through a wall or a door: only the low-mids survive
radio        walkie-talkie / police radio: band-limited, crushed, saturated
telefone     phone call: 300-3400 Hz band, light distortion
tv           old TV or VHS tape: band-limited, warble, hiss
megafone     megaphone / PA: narrow mid band, hard clip, slap echo
monstro      big creature that still must be understood: -6 st, a soft -18 st sub layer, grit, short cave
fera         pure beast, words NOT meant to be understood: -9 st, crushed, heavy sub, long cave
possuido     possessed double voice: the clean voice + the same line -12 st underneath, slightly late
fantasma     ghost: +3 st airy layer, chorus, long reverb, reversed swell before the words
sombra       the shadow that talks: -4 st, reversed reverb tail BEFORE each word, cold highs, tremolo
crianca      eerie child: +5 semitones, slower, small reverb (pair with a soft, slow read)
EOF
    exit 0;;
  limpa)      F="highpass=f=80,deesser=i=0.4,acompressor=threshold=0.1:ratio=3:attack=8:release=120:makeup=2,equalizer=f=3000:t=q:w=1.2:g=2,equalizer=f=250:t=q:w=1:g=-1.5";;
  sussurro)   F="highpass=f=220,equalizer=f=6500:t=q:w=1:g=4,deesser=i=0.5,acompressor=threshold=0.05:ratio=6:attack=3:release=80:makeup=4";;
  pensamento) F="highpass=f=120,lowpass=f=7000,acompressor=threshold=0.1:ratio=3:makeup=2,aecho=0.9:0.3:18:0.18";;
  distante)   F="lowpass=f=2600,highpass=f=200,volume=0.45,aecho=0.8:0.85:43|71|113:0.45|0.35|0.25";;
  parede)     F="lowpass=f=520,highpass=f=90,volume=0.7,aecho=0.8:0.6:14:0.3";;
  radio)      F="highpass=f=400,lowpass=f=3000,acrusher=bits=9:mode=log:aa=1,acompressor=threshold=0.05:ratio=8:makeup=4,volume=1.3";;
  telefone)   F="highpass=f=300,lowpass=f=3400,acompressor=threshold=0.1:ratio=4:makeup=2,acrusher=bits=12:mode=log:aa=1";;
  tv)         F="highpass=f=180,lowpass=f=5000,vibrato=f=0.8:d=0.04,acrusher=bits=11:mode=log:aa=1[v];anoisesrc=c=pink:a=0.012:r=48000,highpass=f=3000[n];[v][n]amix=inputs=2:duration=first:normalize=0";;
  megafone)   F="highpass=f=600,lowpass=f=3500,volume=3,asoftclip=type=hard,volume=0.5,aecho=0.8:0.4:120:0.35";;
  monstro)    F="asplit=2[a][b];[a]$(ps -6),equalizer=f=2500:t=q:w=1:g=3,volume=1.1[lo];[b]$(ps -18),lowpass=f=400,volume=0.45[sub];[lo][sub]amix=inputs=2:normalize=0,asoftclip=type=tanh,aecho=0.8:0.6:60|130:0.25|0.15";;
  fera)       F="asplit=2[a][b];[a]$(ps -9),acrusher=bits=8:mode=log:aa=1,volume=1.1[lo];[b]$(ps -21),lowpass=f=500,volume=0.9[sub];[lo][sub]amix=inputs=2:normalize=0,asoftclip=type=tanh,aecho=0.8:0.7:60|130|210:0.4|0.3|0.2";;
  possuido)   F="asplit=2[a][b];[b]$(ps -12),adelay=35,lowpass=f=1800,volume=0.8[d];[a][d]amix=inputs=2:normalize=0,aecho=0.8:0.6:40|90:0.3|0.2";;
  fantasma)   PRE="areverse,aecho=0.8:0.9:90|170|260|380:0.5|0.4|0.3|0.2,areverse"
              F="asplit=2[a][b];[b]$(ps 3),highpass=f=900,volume=0.3[air];[1:a]aformat=sample_rates=48000:channel_layouts=mono,highpass=f=400,volume=0.45[pre];[a][air][pre]amix=inputs=3:normalize=0,chorus=0.7:0.9:40|55:0.3|0.25:0.25|0.4:2|1.3,aecho=0.8:0.5:300:0.18";;
  sombra)     PRE="$(ps -4),areverse,aecho=0.8:0.9:70|150|240:0.6|0.45|0.3,areverse"
              F="$(ps -4)[m];[1:a]aformat=sample_rates=48000:channel_layouts=mono,highpass=f=1200,volume=0.6[pre];[m][pre]amix=inputs=2:normalize=0,tremolo=f=6:d=0.2,equalizer=f=8000:t=q:w=1:g=3";;
  crianca)    F="$(ps 5),atempo=0.94,aecho=0.8:0.5:35:0.25";;
  *) echo "unknown preset '$P' (bash voice-fx.sh list)" >&2; exit 1;;
esac
if [ -n "$PRE" ]; then
  TMP=$(mktemp --suffix=.wav); trap 'rm -f "$TMP"' EXIT
  ffmpeg -v error -y -i "$IN" -af "aformat=sample_rates=48000:channel_layouts=mono,$PRE" "$TMP"
  ffmpeg -v error -y -i "$IN" -i "$TMP" -filter_complex "[0:a]aformat=sample_rates=48000:channel_layouts=mono,$F,$END" -ac 1 "$OUT"
else
  ffmpeg -v error -y -i "$IN" -filter_complex "[0:a]aformat=sample_rates=48000:channel_layouts=mono,$F,$END" -ac 1 "$OUT"
fi
echo "$P -> $OUT" >&2
