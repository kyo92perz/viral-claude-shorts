# IMAGINA SÓ, EP.1: E se seu dinheiro DOBRASSE todo dia? (16:9, 8:04)

Animação 2D detalhada (estilo Brasil Z, `styles/flat2d/toon.ts`) do canal **IMAGINA SÓ** (@imaginasobr, ver `canal-imagina-so/`).
O Tuco começa com R$ 1 que dobra toda manhã: milionário no dia 21, bilionário no 31, mais rico que o mundo no 51. A placa
"DIA / SALDO" no topo é a assinatura do canal. Números reais (2ⁿ, PIB, inflação de 1993, lenda do xadrez).

- **Vídeo:** `final.mp4` (gerado pelo render; não entra no git)
- **Capas (1280×720):** [thumbnail.jpg](thumbnail.jpg) (DIA 1 | DIA 30, recomendada), [thumbnail-b.jpg](thumbnail-b.jpg), [thumbnail-c.jpg](thumbnail-c.jpg) — `python3 thumbnail/make-thumb.py`
- **Título, descrição com capítulos, tags:** [descricao-youtube.txt](descricao-youtube.txt)
- **Storyboard (88 planos):** [storyboard.png](storyboard.png)

## Como refazer
```bash
CHATTERBOX_PY=<python com chatterbox-tts> python videos/turno-da-madrugada/tools/voices.py videos/imagina-001-dinheiro
python3 videos/imagina-001-dinheiro/tools/make-scenes.py && node core/scenes.ts videos/imagina-001-dinheiro
node core/world.ts videos/imagina-001-dinheiro   # teste do mundo + placas da marca e das capas
node core/storyboard.ts videos/imagina-001-dinheiro
node core/render.ts videos/imagina-001-dinheiro
python3 videos/imagina-001-dinheiro/thumbnail/make-thumb.py
```
