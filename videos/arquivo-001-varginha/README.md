# ARQUIVO PROIBIDO, Caso Nº 001: O ET de Varginha (vídeo longo 16:9, ~9 min)

Documentário animado no estilo "Brasil Z" dos Shorts (contorno grosso, cores chapadas), em 1920×1080, para o canal de vídeos longos
(ver `canal-longo/`). Conta o caso pelo lado das testemunhas e pelo inquérito do Exército divulgado em 2026, com etiquetas na tela:
**RELATO** (sem confirmação oficial), **DOCUMENTO OFICIAL** e **RECONSTITUIÇÃO** (falas encenadas).

- **Vídeo:** `final.mp4` (gerado pelo render; vídeos finais não entram no git)
- **Thumbnails (1280×720):** [thumbnail.jpg](thumbnail.jpg) (recomendada), [thumbnail-b.jpg](thumbnail-b.jpg), [thumbnail-c.jpg](thumbnail-c.jpg)
- **Título, descrição com capítulos, tags, comentário fixado:** [descricao-youtube.txt](descricao-youtube.txt)
- **Legendas para subir no YouTube:** [legendas-pt.srt](legendas-pt.srt)
- **Storyboard (101 planos):** [storyboard.png](storyboard.png)

## Como refazer

Na pasta `viral-claude-shorts` (um vídeo de cada vez):
```bash
CHATTERBOX_PY=<python com chatterbox-tts> python videos/turno-da-madrugada/tools/voices.py videos/arquivo-001-varginha
python3 videos/arquivo-001-varginha/tools/make-scenes.py && node core/scenes.ts videos/arquivo-001-varginha
node core/world.ts videos/arquivo-001-varginha        # teste do mundo; thumb-a e thumb-b são as imagens das thumbnails
node core/storyboard.ts videos/arquivo-001-varginha
node core/render.ts videos/arquivo-001-varginha
python3 videos/arquivo-001-varginha/thumbnail/make-thumb.py
```
| Arquivo | O que tem |
|---|---|
| `script.json` | o roteiro (narrador `ap_narr` atuado com `emo`; `say` é a leitura falada dos números) |
| `world.ts` | personagens, a criatura, os cenários (cidade, terreno, viatura, hospital, arquivo) e os planos das thumbnails |
| `tools/make-scenes.py` | os 101 planos presos às falas |
| `visuals.ts` | câmera, poses, etiquetas e efeitos de cada plano |
