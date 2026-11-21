# ZONA DE SILÊNCIO, Episódio 1: "Estática" (animação 3D, 16:9, 9 min)

Série original de terror em animação 3D. A bíblia (lugar, criatura, personagens e regras) está em [BIBLIA.md](BIBLIA.md).
O gênero foi estudado em `.claude/skills/diretor-de-terror/references/serie-ensemble.md`: só técnicas, nenhum
personagem ou trama de outra obra.

- **Vídeo:** `final.mp4` (gerado pelo render; vídeos finais não entram no git)
- **Storyboard:** [storyboard.png](storyboard.png), 118 planos numerados
- **Descrição, títulos e tags para o YouTube:** [descricao-youtube.txt](descricao-youtube.txt)
- **Legendas em português (SRT):** [legendas-pt.srt](legendas-pt.srt). Suba no YouTube Studio → Legendas.
- **Thumbnails:** pasta [thumbnail/](thumbnail/)

## Como foi feito

| Etapa | Arquivo |
|---|---|
| Roteiro (104 falas, 11 personagens) | `script.json` |
| Vozes: Kokoro e Piper, falas-chave atuadas com Chatterbox (`emo`) e efeitos | `../turno-da-madrugada/tools/voices.py` |
| Checagem de inteligibilidade (Whisper) | `.claude/skills/diretor-de-terror/scripts/check-speech.py` |
| Mundo 3D: personagens articulados com rosto, olhos, pálpebras, sobrancelhas, boca que fala, mãos; a criatura; 6 cenários | `world3d.ts` (teste em `world.png`) |
| Decupagem: 118 planos ligados às falas | `tools/make-scenes.py` → `scenes.json` |
| Câmera, atores, luz e efeitos por plano | `visuals3d.ts` |

## Como refazer

Na pasta `viral-claude-shorts`:
```bash
CHATTERBOX_PY=<python com chatterbox-tts> python videos/turno-da-madrugada/tools/voices.py videos/zona-de-silencio-ep1
python3 videos/zona-de-silencio-ep1/tools/make-scenes.py && node core/scenes.ts videos/zona-de-silencio-ep1
node core/storyboard.ts videos/zona-de-silencio-ep1
HF_SEGMENTED_CAPTURE=true HF_WORKERS=3 node core/render.ts videos/zona-de-silencio-ep1   # retoma de onde parou
```
O `scenes.json` usa `"format": "16:9"`, `"fps": 20`, `"renderScale": 0.6667` (1280×720 por dentro) e
`"shadows": true`. Sem placa de vídeo, o render leva cerca de 2 horas.
