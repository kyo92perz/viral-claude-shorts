# LENDAS DO BRASIL, EP.12: A MATINTA PERERA (Short 9:16, 65 s)

Animação 2D no estilo "Brasil Z" (contorno grosso, cabeças redondas, céus em degradê), feita com `styles/flat2d/toon.ts`.
O gancho: o pássaro de olhos vermelhos aparece no primeiro quadro com o aviso "NÃO PROMETA NADA", e o assobio do fim emenda no começo, para o vídeo rodar em loop.

- **Vídeo:** `final.mp4` (gerado pelo render; vídeos finais não entram no git)
- **Capas para o Short:** [cover.jpg](cover.jpg) "ELA VEIO COBRAR" (recomendada) e [cover-b.jpg](cover-b.jpg) "NÃO PROMETA NADA"
- **Título, descrição, tags e comentário fixado:** [descricao-youtube.txt](descricao-youtube.txt)
- **Storyboard:** [storyboard.png](storyboard.png)

## Como refazer

Na pasta `viral-claude-shorts` (um vídeo de cada vez: o segundo comando espera o primeiro terminar):
```bash
CHATTERBOX_PY=<python com chatterbox-tts> python videos/turno-da-madrugada/tools/voices.py videos/lenda-matinta
python3 videos/lenda-matinta/tools/make-scenes.py && node core/scenes.ts videos/lenda-matinta
node core/world.ts videos/lenda-matinta          # teste do mundo; os planos cover-a e cover-b são as imagens das capas
node core/storyboard.ts videos/lenda-matinta
node core/render.ts videos/lenda-matinta
python3 core/cover.py videos/lenda-matinta videos/lenda-matinta/world/storyboard/pNN.png "NÃO PROMETA" "NADA" "#e23b2e" cover.jpg 230 "LENDAS DO BRASIL|EP.12"
```
| Arquivo | O que tem |
|---|---|
| `script.json` | o roteiro (falas atuadas com `emo`) |
| `world.ts` | personagens, cenários e as imagens das capas |
| `tools/make-scenes.py` | a lista de planos presa às falas |
| `visuals.ts` | câmera, poses, rostos e efeitos de cada plano |
