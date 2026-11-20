---
name: diretor-de-terror
description: Manual de direção para vídeos animados de terror, suspense e ação (Shorts e vídeos longos do YouTube). Use ao criar, roteirizar, decupar, animar, mixar ou embalar (título, thumbnail, descrição) uma história de terror ou suspense neste repo, ou quando pedirem "faz um vídeo de terror", "história de suspense", "cena de luta", "thumbnail que chame atenção", "prender o público", "como o fulano dirigiria isso". Também para estudar um filme (medir cortes, silêncios e cor) com o script incluso.
---

# Diretor de Terror

O que aprendemos estudando animação de todos os estilos, roteiro de terror e suspense, direção (câmera, luz, som,
montagem e luta) e o YouTube (embalagem e retenção). Também assistimos e medimos seis filmes de referência e criticamos
os nossos vídeos com os mesmos números. Este arquivo é o resumo operacional; os detalhes ficam em `references/`.

## Como funciona

1. **Embalagem primeiro:** título + rascunho da thumbnail *antes* do roteiro (`references/youtube.md`).
2. **Roteiro pela estrutura:** cold open → mundo normal → incidente → escada de escalada → ponto médio (a regra) →
   tudo perdido → clímax usando a regra → ferrão (`references/roteiro-terror.md`).
3. **Mundo e linguagem visual no `plan.md`:** roteiro de cor, regras de luz, a escada de revelação da criatura e o mapa
   de silêncios (`references/direcao.md`, `references/animacao.md`).
4. **Decupagem no `scenes.json`** com a curva de ritmo planejada (holds de pavor e sub-cortes de luta), e não um plano
   de 4 s atrás do outro.
5. **Revisão no storyboard e no `report.md`**, e depois medir o `final.mp4` com o script e comparar com as referências.
6. **Publicação com o checklist** de `references/youtube.md` §8.

## As 20 regras do diretor

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

**Som e montagem**

16. **Silêncio antes do susto:** 1,5–3 s quase mudo e depois o hit (+25–30 LU). Medido em Sprite Fright; ausente nos
    nossos vídeos.
17. **Som antes da imagem:** ouvir a coisa antes de ver.
18. **Ritmo é contraste:** holds de 8–15 s no pavor e sub-cortes de 0,4–1,5 s na luta. Mediana constante = vídeo
    plano.
19. **Depois de todo susto, o close de reação**, e um rescaldo de 2–4 s.

**YouTube**

20. **A promessa da thumbnail aparece no 1º minuto**, com reganchos a cada 30–60 s e fim no ferrão + tela final,
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
| medir o resultado | `python3 .claude/skills/diretor-de-terror/scripts/analyze-film.py videos/<topic>/final.mp4 /tmp/medida 6` |

## Usage

```bash
python3 .claude/skills/diretor-de-terror/scripts/analyze-film.py <video.mp4> <pasta-saida> [limiar]
```

**Arguments:**
- `video.mp4`: o filme ou o nosso `final.mp4`
- `pasta-saida`: onde gravar `summary.json`, `sheet.jpg`, `cuts.txt` e `loud.txt` (é criada)
- `limiar`: sensibilidade de corte; 6 para animação e vídeo digital limpo (padrão), 9 para filme antigo com tremor

**Examples:**
```bash
python3 .claude/skills/diretor-de-terror/scripts/analyze-film.py videos/motel-lua-vermelha/final.mp4 /tmp/m 6
python3 .claude/skills/diretor-de-terror/scripts/analyze-film.py ~/filmes/nosferatu.mp4 /tmp/n 9
```

Requer ffmpeg/ffprobe e Python 3 com Pillow (`python3 -m pip install pillow` se faltar; o `.venv` do repo não traz). Um filme de 90 min leva ~10–20 min sem GPU.

## Output

```json
{"file": "sprite.mp4", "duration_s": 629.9, "shots": 97, "avg_shot_s": 6.49, "median_shot_s": 3.0,
 "shots_under_1s_pct": 5.2, "shots_over_8s_pct": 17.5, "pacing": "▃█▆▆▅▂ ▁▁▄ ", "quiet_share_pct": 2.1,
 "silence_then_hit_s": [252.9], "mean_brightness": 58.4, "mean_saturation": 147.8}
```

- **`pacing`:** cortes por minuto em barras (curva de ritmo).
- **`quiet_share_pct`:** porcentagem do tempo abaixo de −40 LUFS.
- **`silence_then_hit_s`:** os instantes de silêncio seguido de hit (os sustos sonoros).

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
- `references/animacao.md`: os estilos de animação, os 12 princípios, tabela de timing, atuação, design de criatura,
  cor, lip-sync e impactos.
- `references/youtube.md`: algoritmo, thumbnail, título, gancho, retenção, formatos, Shorts e checklist de publicação.
- `references/filmes-estudados.md`: os seis filmes medidos, a lição de cada um e a autocrítica medida dos nossos
  vídeos.

## Troubleshooting

- **YouTube recusa o download ("confirm you're not a bot"):** não contorne. Use fontes legítimas: Internet Archive
  (domínio público e CC), Blender Studio (CC BY) ou os seus próprios vídeos.
- **Muitos cortes falsos em filme antigo (tremulação):** suba o limiar para 9–12.
- **Poucos cortes em animação com dissolves:** desça para 4–5; dissolves longos não são detectados como corte.
- **`saturation` 0:** o filme é preto e branco (normal).
- **Rodar de novo do zero:** apague a pasta de saída; o script reaproveita `cuts.txt`, `loud.txt` e os quadros
  existentes.
