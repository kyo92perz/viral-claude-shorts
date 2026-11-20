# TURNO DA MADRUGADA: minissérie de terror (3 episódios)

Animação 2.5D vertical (1080×1920, 24 fps). Todos os personagens, criaturas e lugares são originais. A bíblia da
série (personagens, arcos e regras do monstro) está em [BIBLIA.md](BIBLIA.md).

| Ep. | Título | Duração | Vídeo | Thumbnail 16:9 | Capa vertical |
|---|---|---|---|---|---|
| 1 | Alguém Bateu no Vidro | 1:56 | `videos/turno-ep1/final.mp4` | [thumb-ep1.jpg](thumbnails/thumb-ep1.jpg) | [capa-vertical-ep1.jpg](thumbnails/capa-vertical-ep1.jpg) |
| 2 | Apagão | 1:52 | `videos/turno-ep2/final.mp4` | [thumb-ep2.jpg](thumbnails/thumb-ep2.jpg) | [capa-vertical-ep2.jpg](thumbnails/capa-vertical-ep2.jpg) |
| 3 | O Que Ficou na Mina | 1:48 | `videos/turno-ep3/final.mp4` | [thumb-ep3.jpg](thumbnails/thumb-ep3.jpg) | [capa-vertical-ep3.jpg](thumbnails/capa-vertical-ep3.jpg) |

## Para publicar

**Ep. 1: NÃO ABRA A PORTA 😱 | Turno da Madrugada #1**
> 3h07 da manhã, Black Hollow, Virgínia Ocidental. Lola, ex-soldada, trabalha no único posto 24h da Rota 9. Na noite do
> aniversário do desabamento da mina, alguém bate no vidro, com a voz do avô morto do Tobby.
> #terror #animação #historiadeterror #suspense #shorts

**Ep. 2: SE A LUZ APAGAR, VOCÊ MORRE | Turno da Madrugada #2**
> No apagão, Lola e o xerife Earl precisam chegar ao gerador, a 30 metros, no meio da neblina. Um Oco com uma picareta
> está esperando. E o Dale, amarrado com fita e um saco de batatinha na cabeça, pediu sabor churrasco.
> #terror #animação #luta #suspense #shorts

**Ep. 3: 2.000 LÚMENS CONTRA ELE | Turno da Madrugada #3 (final)**
> O xerife confessa o que fez em 1987. O Dale volta maior, com garras, e a última arma da Lola é o ring light do
> podcast do Tobby. Ao amanhecer, a montanha treme.
> #terror #animação #final #historiadeterror #shorts

## Como foi feito (tudo com os recursos dos repositórios)

- **Animação:** `viral-claude-shorts`, estilo 2.5D cartoon. O motor ganhou iluminação noturna (`night`, `store`,
  `blackout`, `emergency`) e um boneco articulado para luta (`CT.bodyRig`: joelhos, cotovelos, quadril, armas, sangue,
  a anatomia dos Ocos). Também ganhou uma opção `renderScale` para renderizar rápido sem GPU.
- **Vozes:** modelo Kokoro-82M, o mesmo motor e as mesmas vozes em português do VoiceStudio (`pf_dora` para a Lola,
  `pm_alex` para o Tobby, `pm_santa` para o Earl). Os Ocos usam voz distorcida com eco e sussurro
  ([tools/voices.py](tools/voices.py)).
- **Trilha e efeitos:** sintetizados em código (`core/music.ts`), com um kit de terror novo: batida no vidro, osso
  estalando, vidro quebrando, tiro, grito, sting, sirene, explosão, zumbido de lâmpada e coração.
- **Thumbnails:** quadros do próprio episódio em resolução cheia, mais o texto de gancho na fonte Anton (OFL)
  ([tools/thumbs.py](tools/thumbs.py)).

Para refazer um episódio (a partir da pasta `viral-claude-shorts`):
```bash
python videos/turno-da-madrugada/tools/voices.py videos/turno-ep1      # vozes -> audio.wav (precisa de kokoro)
.venv/bin/python core/transcribe.py videos/turno-ep1 --language pt
node core/storyboard.ts videos/turno-ep1
node core/render.ts videos/turno-ep1                                   # HF_WORKERS=3 para paralelizar
```
Os episódios 2 e 3 recebem o mundo compartilhado com `node videos/turno-da-madrugada/tools/share-world.mjs videos/turno-ep2 2`.
