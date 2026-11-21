---
name: diretor-de-terror
description: Manual de direção para vídeos animados de terror, suspense e ação (Shorts e vídeos longos do YouTube). Use ao criar, roteirizar, decupar, animar, dar voz, mixar ou embalar (título, thumbnail, descrição) uma história de terror ou suspense neste repo, ou quando pedirem "faz um vídeo de terror", "história de suspense", "cena de luta", "voz de monstro", "fala com emoção", "dublagem", "thumbnail que chame atenção", "prender o público". Também para estudar um filme (cortes, silêncios, cor, movimento quadro a quadro) e medir ou checar vozes com os scripts inclusos.
---

# Diretor de Terror

O que aprendemos estudando animação de todos os estilos, roteiro de terror e suspense, direção (câmera, luz, som,
montagem e luta), vozes (atuação, direção, vozes por IA, efeitos e mixagem) e o YouTube (embalagem e retenção). Também
assistimos e medimos 14 filmes de referência (cortes, silêncios, cor e movimento quadro a quadro), testamos motores de
voz e efeitos com números, e criticamos os nossos vídeos com as mesmas medidas. Este arquivo é o resumo operacional; os
detalhes ficam em `references/`.

## Como funciona

1. **Embalagem primeiro:** título + rascunho da thumbnail *antes* do roteiro (`references/youtube.md`).
2. **Roteiro pela estrutura:** cold open → mundo normal → incidente → escada de escalada → ponto médio (a regra) →
   tudo perdido → clímax usando a regra → ferrão (`references/roteiro-terror.md`).
3. **Mundo e linguagem visual no `plan.md`:** roteiro de cor, regras de luz, a escada de revelação da criatura e o mapa
   de silêncios (`references/direcao.md`, `references/animacao.md`).
4. **Decupagem no `scenes.json`** com a curva de ritmo planejada (holds de pavor e sub-cortes de luta), e não um plano
   de 4 s atrás do outro.
5. **Vozes:** falas-chave atuadas (`emo` no `script.json`), efeitos por tipo de voz e `check-speech.py` antes do render
   (`references/vozes.md`).
6. **Revisão no storyboard e no `report.md`**, e depois medir o `final.mp4` (`analyze-film.py`, `analyze-motion.py`) e
   comparar com as referências.
7. **Publicação com o checklist** de `references/youtube.md` §8.

## As 25 regras do diretor

**História**
1. **Bomba debaixo da mesa:** a plateia sabe de algo que o personagem não sabe. Suspense > surpresa.
2. **A ameaça tem uma regra** clara, justa e com custo; os heróis vencem *usando* a regra.
3. **Escada:** som → sinal → vislumbre → contato → ataque → perda. Não pule degraus.
4. **Menos é mais:** sombra → mão → silhueta → rosto. O rosto inteiro só no clímax.
5. **Cada personagem tem um querer, um precisar e um detalhe específico**, e alguém querido paga caro.
6. **Humor de personagem como válvula:** riso → silêncio → susto. Nunca debochar do susto real.
7. **Plante três vezes, pague uma.** O final responde à primeira imagem e deixa um ferrão.

**Imagem**

8. **Espaço negativo:** deixe escuro e vazio atrás do personagem; a plateia procura sozinha.
9. **Luz motivada** (lanterna, fogo, neon, farol). Quente = seguro, frio = perigo; **troque a temperatura na
   virada**.
10. **Noite dessaturada** com **uma cor de ameaça** reservada (lua vermelha, magenta, verde doente).
11. **Ângulos com significado:** a ameaça de baixo, a vítima de cima, o holandês quando a regra quebra, o POV baixo da
    criatura "observando".
12. **Quadro dentro do quadro:** portas, janelas, arcos e vinheta.

**Movimento**

13. **A criatura não antecipa:** parada → instantânea, ou devagar demais. Nunca no ritmo humano.
14. **Os olhos lideram, a cabeça segue, o corpo congela.** Toda reação começa no olhar.
15. **Golpe = antecipação + ação + reação**, com hitstop, flash de 1–3 quadros, tremor que decai, partículas e custo
    visível.
16. **Humano nunca congela, só a criatura:** respiração e micro-movimento sempre ligados (Gertie fica 0,7% parada; nós
    ficamos 8–11%). Poses em "2s" dão cara de desenho; no susto, 1s.
17. **Uma camada que nunca para** (poeira, mariposas, neon, neve) e **nunca duas poses iguais lado a lado**.

**Som e montagem**

18. **Silêncio antes do susto:** 1,5–3 s quase mudo e depois o hit (+25–30 LU). Medido em Sprite Fright; ausente nos
    nossos vídeos.
19. **Som antes da imagem:** ouvir a coisa antes de ver.
20. **Ritmo é contraste:** holds de 8–15 s no pavor e sub-cortes de 0,4–1,5 s na luta. Mediana constante = vídeo
    plano.
21. **Depois de todo susto, o close de reação**, e um rescaldo de 2–4 s.

**Voz**

22. **Voz = altura, ritmo, colocação e textura** diferentes por personagem; dirija com contexto e verbos ("esconder o
    medo da filha"), não com adjetivos ("triste").
23. **Fala-chave é atuada** (Chatterbox `emo` ≈ 0,7, `cfg` 0,3); o Kokoro não faz emoção nem pausa com "...". Pausa é
    silêncio de verdade (`pause`).
24. **Toda fala passa no ouvido do Whisper** (`check-speech.py`): fala-chave com WER > 0,15 é refeita. Criatura que
    conta o enredo precisa ser entendida.

**YouTube**

25. **A promessa da thumbnail aparece no 1º minuto**, com reganchos a cada 30–60 s e fim no ferrão + tela final,
    sem despedida. Ficção nunca se chama de "real".

## Aplicando no pipeline deste repo

| Ideia | Onde |
|---|---|
| silêncio antes do susto | cena curta de mood calmo + `sfx: "off"` no apagão; nenhuma `ambience` naquela cena; stinger (`sting`, `scream`, `boom`) na chave do hit |
| hold de pavor | uma cena de 8–15 s com push-in lento e ação secundária (respiração, luz piscando); sem trecho 100% parado > 3 s (o review acusa) |
| sub-cortes de luta | várias cenas de 0,8–2 s, cada uma com uma troca (antecipação/ação/reação) e chaves com `sfx` no contato |
| troca de temperatura | `lights`/`grade` diferentes antes e depois da virada (ex.: `lamp` → `night`/`blackout`) |
| criatura em partes | estados no mundo (`shadow`, só mãos, silhueta, rosto) testados no `world.png` antes das cenas |
| espaço negativo e POV | tomadas nomeadas no mundo (`CT.shots`): `porta-escura`, `pov-baixo` |
| fala atuada | `"emo": 0.7, "cfg": 0.3` na linha do `script.json` + `CHATTERBOX_PY=...` ao rodar `voices.py` |
| voz de criatura, rádio, fantasma | `bash .claude/skills/diretor-de-terror/scripts/voice-fx.sh <preset> in.wav out.wav` (ou a cadeia no `VOICES` do `voices.py`) |
| conferir as falas | `.venv/bin/python .claude/skills/diretor-de-terror/scripts/check-speech.py videos/<topic>` |
| medir o resultado | `analyze-film.py` (ritmo, silêncio, cor) e `analyze-motion.py` (movimento) no `final.mp4` |

## Usage

```bash
S=.claude/skills/diretor-de-terror/scripts
python3 $S/analyze-film.py <video.mp4> <pasta-saida> [limiar]          # cortes, silêncios, cor (sheet.jpg)
python3 $S/analyze-motion.py <video.mp4> <pasta-saida> [max_min] [início_s]   # desenhos/s, 1s-2s-3s, parado, picos (strips.jpg)
python3 $S/analyze-voice.py <audio-ou-video> [início_s] [duração_s]   # melodia, ritmo, pausas, dinâmica, brilho
.venv/bin/python $S/check-speech.py <fala.wav> "texto"  |  videos/<topic>   # inteligibilidade (Whisper)
bash $S/voice-fx.sh list | <preset> in.wav out.wav                     # 15 efeitos de voz a -20 LUFS
$CHATTERBOX_PY $S/chatterbox-batch.py jobs.json                        # falas atuadas (o voices.py chama sozinho)
```

**Arguments (analyze-film):**
- `video.mp4`: o filme ou o nosso `final.mp4`
- `pasta-saida`: onde gravar `summary.json`, `sheet.jpg`, `cuts.txt` e `loud.txt` (é criada)
- `limiar`: sensibilidade de corte; 6 para animação e vídeo digital limpo (padrão), 9 para filme antigo com tremor

**Examples:**
```bash
python3 $S/analyze-film.py videos/motel-lua-vermelha/final.mp4 /tmp/m 6
python3 $S/analyze-motion.py ~/filmes/gertie.mp4 /tmp/g 6 360        # pula o prólogo filmado
bash $S/voice-fx.sh sombra videos/x/voice/l12.wav /tmp/l12-sombra.wav
```

Requer ffmpeg/ffprobe e Python 3 com Pillow e numpy (`python3 -m pip install pillow numpy` se faltar; o `.venv` do repo
não traz Pillow). `check-speech.py` usa o `.venv` do repo (faster-whisper). Um filme de 90 min leva ~10–20 min sem GPU.

## Output

```json
{"file": "sprite.mp4", "duration_s": 629.9, "shots": 97, "avg_shot_s": 6.49, "median_shot_s": 3.0,
 "shots_under_1s_pct": 5.2, "shots_over_8s_pct": 17.5, "pacing": "▃█▆▆▅▂ ▁▁▄ ", "quiet_share_pct": 2.1,
 "silence_then_hit_s": [252.9], "mean_brightness": 58.4, "mean_saturation": 147.8}
```

- **`pacing`:** cortes por minuto em barras (curva de ritmo).
- **`quiet_share_pct`:** porcentagem do tempo abaixo de −40 LUFS.
- **`silence_then_hit_s`:** os instantes de silêncio seguido de hit (os sustos sonoros).
- **`analyze-motion`:** `new_drawings_per_s_median`, `timing_while_moving_pct` (`on_1s`, `on_2s`...), `held_share_pct`.
- **`analyze-voice`:** `pitch_range_st` / `pitch_move_st` (quanto a melodia se mexe), `syllables_per_s`, `pauses`.
- **`check-speech`:** `wer` (0 = perfeito; > 0,15 conferir; > 0,35 não se entende) e as palavras trocadas.

## Present Results to User

Ao estudar um filme ou medir um vídeo nosso, responda em linguagem simples:

```
🎬 <filme>: <duração>, <planos> planos (mediana <x> s)
Ritmo: <pacing> → <o que a curva conta, 1 linha>
Som: <quiet_share>% em silêncio; sustos sonoros em <tempos>
Cor/luz: brilho <b>, saturação <s> → <leitura>
Lição para nós: <1–3 bullets aplicáveis ao próximo vídeo>
```

Ao entregar um vídeo, inclua a medição do `final.mp4` comparada à tabela de `references/filmes-estudados.md`.

## Referências (leia só o que a tarefa pede)

- `references/roteiro-terror.md`: níveis do medo, Hitchcock, regras da ameaça, estruturas de 2 e de 10 min,
  personagens, humor, viradas, diálogo, lutas no roteiro, finais e ética.
- `references/direcao.md`: planos, ângulos, lente, luz, som, montagem (Murch), anatomia do susto, coreografia de luta
  e checklist de cena.
- `references/animacao.md`: os estilos de animação, os 12 princípios, tabela de timing (com caminhada e corrida),
  atuação, design de criatura, cor, lip-sync, impactos e o estudo de movimento medido em 14 filmes.
- `references/vozes.md`: atuação e direção de voz, narração de terror, dublagem, motores de voz e licenças, as
  medições (Kokoro × Chatterbox), falas atuadas no pipeline, os efeitos e a mixagem.
- `references/youtube.md`: algoritmo, thumbnail, título, gancho, retenção, formatos, Shorts e checklist de publicação.
- `references/filmes-estudados.md`: os filmes medidos (ritmo, som, cor), a lição de cada um e a autocrítica medida dos nossos
  vídeos.

## Troubleshooting

- **YouTube recusa o download ("confirm you're not a bot"):** não contorne. Use fontes legítimas: Internet Archive
  (domínio público e CC), Blender Studio (CC BY) ou os seus próprios vídeos.
- **Muitos cortes falsos em filme antigo (tremulação):** suba o limiar para 9–12.
- **Poucos cortes em animação com dissolves:** desça para 4–5; dissolves longos não são detectados como corte.
- **`saturation` 0:** o filme é preto e branco (normal).
- **`analyze-motion` diz "tudo em 1s" num filme antigo:** grão de película; a média de área já filtra a maior parte,
  mas fontes a 30 fps telecinadas embaralham 1s/2s. Compare só filmes com o mesmo fps.
- **Chatterbox: `'NoneType' object is not callable` no `perth`:** instale `setuptools<81` no venv dele.
- **Chatterbox lento:** ~18 s de CPU por segundo de fala. Atue só as falas-chave; com GPU (CUDA/MPS) ele usa sozinho.
- **Rodar de novo do zero:** apague a pasta de saída; o script reaproveita `cuts.txt`, `loud.txt` e os quadros
  existentes.
