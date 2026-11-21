# Animação: estilos, princípios, timing e atuação

## 1. Os estilos e quando usar cada um

| Estilo | Como é feito | Força | Uso no terror | Neste repo |
|---|---|---|---|---|
| **Animação completa** (clássica de estúdio) | desenho a cada 1 ou 2 quadros, arcos suaves, squash & stretch | emoção fina, atuação | criatura que se move "errado" com fluidez demais | 2.5D com o `bodyRig` e muitas chaves |
| **Animação limitada** (TV dos anos 50–70) | poses fixas (holds), ciclos, só a boca e os olhos mexem, cenários reaproveitados | barato, legível, ritmo de diálogo | ótima para histórias narradas: a tensão vem do som e da composição | `2.5d_cartoon` e `flat2d`: poucas poses fortes > muitas fracas |
| **Anime** | holds longos + câmera que desliza, frames de impacto, smears, linhas de velocidade, picos de animação gastos nos momentos-chave | economia + explosões de energia | o susto é um "momento sakuga": 1–2 s de animação rica num vídeo de poses | guardar orçamento de chaves para o clímax |
| **Cutout / 2.5D** | peças recortadas e articuladas num mundo com profundidade | rápido, consistente, câmera com paralaxe | personagens planos num mundo 3D escuro = estranhamento natural | `styles/2.5d_cartoon` |
| **CG 3D** (estúdio, Blender) | modelos, rig, luz física | volume, luz e sombra reais | luz motivada (lanterna, fogo) vira linguagem | `styles/3d` |
| **Stop-motion** | objetos físicos fotografados em "2s" | textura, tremor orgânico | o leve tremor deixa tudo "vivo demais" (bom para coisas mortas) | simular: animar em 2s e jitter mínimo |
| **Silhueta / teatro de sombras** | figuras pretas contra fundo iluminado | leitura imediata da pose | **ideal para monstros**: forma sem detalhe = imaginação trabalha | a criatura-sombra do Motel; modo `shadow` do rig |
| **Rotoscopia** | desenho sobre filmagem | movimento humano real | movimento humano realista numa figura irreal = estranho | — |
| **Motion comic / explicativo** | ilustrações com movimento de câmera, textos | clareza, custo baixo | "histórias reais animadas" do YouTube vivem disso | `flat2d` |
| **Pixel art** | resolução baixa, paleta curta | nostalgia | terror de jogo antigo | skill `pixel-3d-shorts` |

**Regra:** escolha o estilo pelo que a história precisa *esconder*. Terror precisa de sombra, silhueta e fora-de-quadro:
estilos com luz e silhueta fortes (2.5D noturno, 3D com luz motivada, silhueta) assustam mais do que estilos claros e
chapados.

## 2. Os 12 princípios, na prática

1. **Squash & stretch**: volume constante. No susto, a vítima *estica* (pulo) e depois *achata* (encolhe de medo).
2. **Antecipação**: antes de toda ação rápida, um movimento contrário curto (4–8 quadros a 24 fps). **A criatura não
   antecipa**: é exatamente o que a torna assustadora (movimento sem aviso).
3. **Encenação (staging)**: uma ideia por plano, lida pela silhueta. Se a pose não se entende em preto puro, refaça.
4. **Direto vs. pose a pose**: pose a pose para atuação e lutas (controle); direto para fogo, fumaça, cabelo.
5. **Continuidade e sobreposição**: cabelo, roupa, cauda e braços terminam *depois* do corpo (3–6 quadros de atraso).
6. **Aceleração e desaceleração (ease)**: tudo que é vivo acelera e freia. Movimento linear = mecânico (bom para coisas
   possuídas).
7. **Arcos**: cabeças, mãos e golpes andam em arco. Linha reta = robótico.
8. **Ação secundária**: respiração, piscada, mão que treme. Dá vida a poses paradas, que no terror são muitas.
9. **Timing**: o número de quadros define peso e emoção (tabela abaixo).
10. **Exagero**: empurre a pose 20–30% além do real. Em tela de celular, sutileza some.
11. **Desenho sólido**: volume e perspectiva coerentes; no 2.5D, o personagem plano precisa de sombra no chão.
12. **Apelo**: personagens com formas claras e assimetria. Para o vilão, apelo = presença, não beleza.

## 3. Timing (em segundos, vale para 20 ou 24 fps)

| Ação | Duração |
|---|---|
| piscada | 0,12–0,25 s (piscar devagar = cansaço ou desconfiança) |
| virar a cabeça | 0,25–0,5 s; **devagar (1–2 s) quando ouve um barulho** |
| antecipação de um golpe | 0,15–0,3 s |
| impacto (hold no contato) | 0,08–0,25 s (hitstop) |
| assentar depois de uma ação | 0,25–0,5 s |
| ler uma pose nova | ≥ 0,5 s; uma emoção-chave fica ≥ 1 s |
| reação de susto (pulo) | 0,1 s de subida, 0,3 s de queda, hold de 1 s olhando |
| criatura que "aparece" | 0 s (corte) ou muito devagar (3–6 s); nunca no meio-termo |
| passo de caminhada normal (Richard Williams) | 12 quadros a 24 fps = 0,5 s por passo (2 passos/s) |
| caminhada "de desenho", saltitante | 8 quadros = 0,33 s por passo |
| corrida | 6 quadros por passo; corrida desesperada, 4 |
| andar furtivo / se esgueirando | ~16–24 quadros por passo (estimativa nossa, sem fonte), corpo baixo e paradas no meio |

**Espaçamento:** devagar → rápido → devagar = natural. **Parado → instantâneo** = sobrenatural. Use o segundo só para
a ameaça, e só quando você quer que a plateia pule.

## 4. Atuação (Ed Hooks, *Acting for Animators*)

- **Pensamento leva à emoção, que leva à ação.** Mostre o personagem *percebendo* (olhos) antes de reagir (corpo).
- **Os olhos lideram, a cabeça segue, o corpo vem por último** (linha de liderança). No terror: os olhos param, a
  cabeça vira devagar, o corpo congela.
- **Todo personagem quer algo e tem um obstáculo** em cada cena. Atuação = jogar uma ação para vencer o obstáculo.
- **Status:** quem ocupa espaço, olha nos olhos e se move pouco tem status alto. O monstro tem status máximo: imóvel.
- **Empatia > simpatia:** a plateia precisa entender por que o personagem age, não gostar dele.
- **Sem gêmeos:** braços e pernas nunca simétricos; uma mão faz algo diferente da outra.
- **Linha de ação:** a pose inteira segue uma curva (C ou S). Medo = corpo em C fechado para dentro; coragem = C aberto
  para frente.

## 5. Linguagem de formas e design de criaturas

- **Círculo** = amigável, seguro. **Quadrado** = estável, confiável (a heroína prática). **Triângulo** = perigo.
- **Criatura que dá medo de verdade:**
  - proporção *quase* humana com um erro: braços longos demais, articulações a mais, pescoço comprido, cabeça um pouco
    grande;
  - silhueta única, legível em preto;
  - poucos detalhes à luz e muitos na sombra: olhos que brilham, dentes, garras;
  - um traço "humano" (um sorriso, uma roupa) torna tudo pior (o estranho familiar);
  - fica **parada** quando outros se mexem e se mexe quando todos param.
- **Revele em partes:** sombra → mão → silhueta → rosto. Rosto completo, só no clímax.

## 6. Cor e valor

- **Roteiro de cor (color script):** cada ato tem uma paleta. Sprite Fright, medido: fogueira quente no ato 1 →
  azul frio no instante em que vira terror (veja `filmes-estudados.md`).
- **Quente = seguro, frio = perigo**, e **uma cor de acento só da ameaça** (vermelho, magenta ou verde doente). Charge:
  herói quente, inimigo azul-petróleo, magenta na ameaça.
- **Valor manda mais que cor:** o assunto é o ponto mais claro ou com mais contraste do quadro. Teste em escala de cinza.
- **Saturação baixa = medo; saturação alta = desenho infantil.** Os nossos vídeos medem saturação média 136–180, contra
  82 em Charge e 148 em Sprite Fright: a noite está colorida demais. Na noite, saturação baixa e só o acento forte.

## 7. Sincronia labial e fala

- **Formas de boca:** fechada (M, B, P), aberta (A), sorriso (E, I), redonda (O), bico (U, W), dentes no lábio (F, V),
  língua (L, T, D) e repouso.
- **Acerte M/B/P fechados no quadro exato**; o resto pode ser em 2s.
- A boca chega **1–2 quadros antes** do som (o olho espera a boca).
- Quem não fala reage: piscar, respirar, olhar para quem fala.
- No 2.5D: janelas de fala (`talk`) só enquanto aquela voz está no áudio; quem escuta fica com a boca fechada.

## 8. Impacto, smears e energia (lutas e sustos)

- **Frame de impacto:** 1–3 quadros com cor invertida, alto contraste ou fundo branco. Sem flash, um golpe parece um
  empurrão.
- **Hitstop:** congele os dois corpos 0,08–0,2 s no contato.
- **Tremor de câmera:** amplitude grande que decai em 0,3–0,5 s; nunca constante.
- **Smear:** no quadro mais rápido, estique o membro em direção ao movimento (ou faça um borrão).
- **Linhas de velocidade e partículas:** poeira no pé de apoio, faíscas e pedaços no impacto.
- **Peso:** quem apanha voa *depois* do contato (0,05 s), não junto.

## 9. Da escrita à tela (fluxo profissional)

roteiro → *thumbnail boards* (rabiscos) → storyboard → animatic (storyboard com voz e tempo) → layout (câmera e
cenário) → poses-chave → intermediários e polimento → luz e cor → som e mixagem.
Aqui: `plan.md` → `world.png` (teste do mundo) → `storyboard.png` (o animatic sem movimento) → render → `report.md`.
Revise **no storyboard**, onde mudar é barato.

## 10. Movimento medido: 14 filmes assistidos quadro a quadro

Medido com `scripts/analyze-motion.py`: conta quantos **desenhos novos por segundo** cada filme mostra, quanto tempo
cada desenho fica na tela enquanto há movimento (em 1s, 2s, 3s) e quanto do filme é pose parada. Depois mostra 8
quadros seguidos nos picos de ação.

| Filme | Técnica | Desenhos novos/s (mediana) | Em 1s / 2s / 3s+ | Parado |
|---|---|---|---|---|
| *Gertie the Dinosaur* (1914) | desenho à mão, cenário redesenhado a cada quadro | 17 | 59% / 22% / 19% | **0,7%** |
| *The Skeleton Dance* (1929) | desenho à mão, sincronizado à música | 22 | 70% / 24% / 6% | **0%** |
| *Betty Boop: Snow-White* (1933) | "rubber hose", metamorfoses | 25 (de 30) | 84% / 13% / 3% | 6,7% |
| *Superman: Mechanical Monsters* (1941) | desenho à mão de estúdio | 19 (de 30) | 70% / 23% / 7% | 2,4% |
| *As Aventuras do Príncipe Achmed* (1926) | silhuetas recortadas | 18 | 83% / 9% / 8% | 7,3% |
| *Sprite Fright* (2021) | CG estilizado | 14 | 65% / **30%** / 5% | 9,7% |
| *Charge* (2022) | CG cinematográfico | 16,5 | 86% / 7% / 7% | 10,6% |
| *Coffee Run*, *Spring*, *Cosmos Laundromat*, *Big Buck Bunny*, *Agent 327* | CG | 18–24 | 95–96% / 1–2% / 2–3% | 6–15% |
| **Nosso** *Motel Lua Vermelha* (20 fps) | 2.5D | 14 (de 20) | 82% / 8% / 10% | 8,5% |
| **Nosso** *Turno da Madrugada* ep. 1 | 2.5D | 16 | 87% / 5% / 8% | 11,4% |

(Fontes a 30 fps vieram de telecinagem, então o "1s × 2s" delas é aproximado. Em filme antigo, o grão foi filtrado pela
média de área.)

**O que os quadros mostraram:**

1. **Mestres do desenho misturam 1s e 2s.** Gertie fica perto de 60/20 e Betty Boop em 84/13. Sprite Fright, mesmo em
   CG, usa "2s" em 30% do movimento, o que dá cara de desenho. **Para nós:** a câmera e os efeitos ficam em 1s, e as
   poses dos personagens podem andar em 2s (segurar cada pose 2 quadros) para parecer desenhado. Num susto, 1s.
2. **Personagem vivo nunca congela:** Gertie fica 0,7% do tempo parada e o Skeleton Dance 0%. McCay mantém a dinossaura
   respirando e balançando o tempo todo, e o traço "treme" porque o cenário foi redesenhado a cada quadro. Os nossos
   ficam 8–11% totalmente parados e com pouca energia. **Regra:** respiração e micro-movimento sempre ligados nos
   humanos; **congelar de verdade é privilégio da criatura** (é isso que a torna estranha).
3. **Uma camada que nunca para:** a neve caindo em Betty Boop e os vagalumes e folhas em Sprite Fright mantêm o quadro
   vivo mesmo quando o personagem segura a pose. **Para nós:** sempre um loop ambiente (poeira, mariposas na lâmpada,
   neon piscando, areia).
4. **Pico de ação = atuação do corpo.** Nos picos de Charge e Agent 327 há cortes a cada 2–4 quadros, borrão de
   movimento, faíscas e flash. Nos picos do Motel, o que mais se move é a **luz e a câmera**, não os personagens. E
   Barb e Gary aparecem lado a lado em poses idênticas (gêmeos). **Para nós:** nas lutas e sustos, o corpo precisa fazer
   arco, antecipação e reação grandes; e nunca duas poses iguais lado a lado.
5. **Metamorfose e "rubber hose"** (Betty Boop): objetos que viram outros objetos e corpos de borracha cabem no
   pesadelo. Uma bola de neve que vira rosto, uma sombra que vira mão.
6. **Silhueta legível sempre** (Achmed): mesmo sem rosto, a pose conta tudo. Teste da silhueta em preto para cada pose
   da criatura.
