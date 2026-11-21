# LENDAS DO BRASIL, EP.1: A LOIRA DO BANHEIRO (Short 9:16, 74 s)

Animação 2D no estilo "Brasil Z" (contorno grosso, cabeças redondas, céus em degradê), feita com `styles/flat2d/toon.ts`.

- **Vídeo:** `final.mp4` (gerado pelo render; vídeos finais não entram no git)
- **Capas para o Short:** [cover.jpg](cover.jpg) (recomendada) e [cover-b.jpg](cover-b.jpg)
- **Título, descrição, tags e comentário fixado:** [descricao-youtube.txt](descricao-youtube.txt)
- **Storyboard:** [storyboard.png](storyboard.png)

## Como refazer

Na pasta `viral-claude-shorts` (um vídeo de cada vez: o segundo comando espera o primeiro terminar):
```bash
CHATTERBOX_PY=<python com chatterbox-tts> python videos/turno-da-madrugada/tools/voices.py videos/lenda-loira-do-banheiro
python3 videos/lenda-loira-do-banheiro/tools/make-scenes.py && node core/scenes.ts videos/lenda-loira-do-banheiro
node core/world.ts videos/lenda-loira-do-banheiro          # teste do mundo: personagens e cenários
node core/storyboard.ts videos/lenda-loira-do-banheiro
node core/render.ts videos/lenda-loira-do-banheiro
python3 core/cover.py videos/lenda-loira-do-banheiro <segundo> "LINHA 1" "LINHA 2" "#f6c744" cover.jpg <altura do texto>
```
| Arquivo | O que tem |
|---|---|
| `script.json` | o roteiro (falas atuadas com `emo`) |
| `world.ts` | personagens e cenários |
| `tools/make-scenes.py` | a lista de planos presa às falas |
| `visuals.ts` | câmera, poses, rostos e efeitos de cada plano |
