# LENDAS DO BRASIL, EP.10: A IARA (Short 9:16, 86 s)

Animação 2D no estilo "Brasil Z" (contorno grosso, cabeças redondas, céus em degradê), feita com `styles/flat2d/toon.ts`.
O gancho: o rosto da Iara surge na água no primeiro quadro, com o aviso "NÃO RESPONDA", e a música do fim emenda no começo, para o vídeo rodar em loop. Versão "mais detalhada": mais planos, camadas de cenário com profundidade, partículas e falas atuadas.

- **Vídeo:** `final.mp4` (gerado pelo render; vídeos finais não entram no git)
- **Capas para o Short:** [cover.jpg](cover.jpg) (recomendada) e [cover-b.jpg](cover-b.jpg)
- **Título, descrição, tags e comentário fixado:** [descricao-youtube.txt](descricao-youtube.txt)
- **Storyboard:** [storyboard.png](storyboard.png)

## Como refazer

Na pasta `viral-claude-shorts` (um vídeo de cada vez: o segundo comando espera o primeiro terminar):
```bash
CHATTERBOX_PY=<python com chatterbox-tts> python videos/turno-da-madrugada/tools/voices.py videos/lenda-iara
python3 videos/lenda-iara/tools/make-scenes.py && node core/scenes.ts videos/lenda-iara
node core/world.ts videos/lenda-iara          # teste do mundo; os planos cover-a e cover-b são as imagens das capas
node core/storyboard.ts videos/lenda-iara
node core/render.ts videos/lenda-iara
python3 core/cover.py videos/lenda-iara videos/lenda-iara/world/storyboard/pNN.png "NÃO RESPONDA" "ELA TEM DENTES" "#5ee0c0" cover.jpg 230 "LENDAS DO BRASIL|EP.10"
```
| Arquivo | O que tem |
|---|---|
| `script.json` | o roteiro (falas atuadas com `emo`) |
| `world.ts` | personagens, cenários e as imagens das capas |
| `tools/make-scenes.py` | a lista de planos presa às falas |
| `visuals.ts` | câmera, poses, rostos e efeitos de cada plano |
