# Direção: câmera, luz, som, montagem e luta

## 1. Planos e o que dizem

| Plano | Diz | Uso no terror |
|---|---|---|
| grande geral / estabelecimento | onde estamos, isolamento | o motel minúsculo no deserto; a única janela acesa |
| geral | geografia, corpo inteiro | lutas, perseguições, a criatura de corpo inteiro ao longe |
| médio | ação + expressão | diálogo, maioria das cenas |
| close | emoção | reação ao susto (é o plano mais importante do susto) |
| close extremo / insert | um detalhe decide | a maçaneta girando, a lâmpada piscando, o olho |
| POV | estar no lugar de alguém | POV da criatura (baixo, entre folhas, respirando) = sentir-se observado |
| plano sobre o ombro | relação entre dois | quem está atrás de quem |

## 2. Ângulos e lente

- **Contra-plongée (de baixo):** poder e ameaça. A criatura vista de baixo.
- **Plongée (de cima):** vulnerável, preso. A vítima vista de cima.
- **Holandês (inclinado):** algo errado no mundo. Use quando a regra quebra, não o tempo todo. Superman (1941) usa nas
  máquinas.
- **Grande-angular:** espaço exagerado, distorção e isolamento.
- **Teleobjetiva:** fundo comprimido; alguém está *assistindo* de longe.
- **Espaço negativo:** deixe espaço vazio atrás do personagem, numa porta escura ou num corredor. A plateia vasculha o
  vazio sozinha; é o susto mais barato e mais eficaz.
- **Quadro dentro do quadro:** portas, janelas e arcos. Nosferatu emoldura Orlok em portais em arco, parado e centrado
  (medido, veja `filmes-estudados.md`).
- **Íris e vinheta:** escurecer as bordas foca e sufoca. Nosferatu usa íris redonda em boa parte dos planos.

## 3. Movimento de câmera

- **Parada** = observação, pavor. **Push-in lento** = percepção crescente ("ele entendeu"). **Pull-out** = revelação
  do que estava em volta (a sala cheia de sombras).
- **Câmera na mão (tremor leve)** = pânico e documental. Só na fuga e na luta.
- **Pan lento revelando** e voltando: a coisa está lá na volta (o clássico "olha de novo").
- Toda câmera que se move tem motivo (seguir, revelar, sufocar). Movimento sem motivo cansa.

## 4. Luz

- **Luz motivada:** cada luz tem uma fonte na história (lanterna, fogo, neon, farol, tela do celular). Sprite Fright
  vira de fogueira quente para noite azul e depois só lanterna (medido em 251–259 s).
- **Low key:** poucas áreas acesas e muito preto. O olho procura nas sombras.
- **Luz de baixo** = rosto monstruoso (lanterna sob o queixo). **Contraluz / silhueta** = forma sem identidade.
- **Temperatura:** quente = segurança e humanidade; frio = perigo, noite, morte. Mude no momento da virada.
- **Luz que falha:** piscar, apagar, gerador. Cada apagão é uma bomba debaixo da mesa.
- **Uma cor de ameaça:** a lua vermelha, o neon magenta, o verde doente. Reserve essa cor só para ela.
- **No motor 2.5D:** presets `night`, `store`, `blackout`, `emergency`, `blood`, `lamp`. O `grade` frio e
  dessaturado na noite; saturação alta só no acento.

## 5. Som: metade do medo

- **Silêncio antes do susto.** Medido em Sprite Fright (252,9 s): ~2 s em torno de −45 LUFS e depois salto para
  −12 LUFS (+30 LU) num barulho. Nosferatu mede 9% do filme em quase-silêncio; os nossos vídeos medem 0,1%: a trilha
  nunca respira. **Corrija primeiro isto.**
- **Som antes da imagem:** ouvir a coisa (arranhão, passos, respiração) antes de ver. O J-cut (som da próxima cena entra
  antes do corte) puxa a plateia.
- **Drone grave contínuo** sobe devagar na tensão e **corta seco** no susto (o silêncio é parte do hit).
- **Sons diegéticos sem explicação:** batida na porta, rádio ligando, telefone. Valem mais que música.
- **Stinger:** um hit curto no susto, um por susto, nunca dois seguidos.
- **A voz da criatura** processada (pitch abaixo, reverb, distorção, reverso). Pouca fala; respiração vale mais.
- **No motor:** `sfx` (knock, crack, glass, gun, sting, scream, buzz, off, siren, boom, heart), `ambience` (hum, drone,
  heartbeat) e moods de `core/score.ts`. Para silêncio, use mood calmo + `off` no apagão e deixe a voz sozinha.

## 6. Montagem

- **Regra dos Seis (Walter Murch), em ordem de peso:** emoção 51%, história 23%, ritmo 10%, direção do olhar 7%,
  plano 2D 5%, espaço 3D 4%. Se o corte acerta a emoção e erra a continuidade, mantenha.
- **Corte na ação** (o movimento esconde o corte) e **corte no olhar** (personagem olha, corte para o que vê).
- **Ritmo é contraste:** segure longo no pavor e corte rápido no caos. Medido: Charge faz 28–29 cortes/min na ação e
  1–5 no desfecho; Nosferatu tem mediana de 6,6 s e 42% dos planos acima de 8 s. Os nossos vídeos ficam em 3,5–4,9 s
  quase sem variar: falta segurar mais no pavor e cortar mais rápido na luta.
- **Regra dos 180°:** a câmera fica de um lado da linha entre dois personagens. Quebre **de propósito** quando o mundo
  vira (desorientação).
- **Montagem paralela:** causa e efeito em lugares diferentes (Superman: o vilão na sala de controle × as máquinas na
  rua). Duas linhas correndo para o mesmo ponto = suspense.
- **Inserts** curtos (0,5–1,5 s) de objetos-chave criam relógio e pistas.
- **Plano de reação:** depois de todo susto, o rosto. É o espelho da plateia.

## 7. Anatomia de um susto (em batidas)

1. **Normal:** a ação cotidiana. O som ambiente está presente.
2. **Isca:** um som ou um olhar puxa a atenção. O personagem para.
3. **Busca:** plano longo, espaço negativo e passos lentos. A música desce ou some.
4. **Falso alívio:** não era nada. O personagem relaxa (riso).
5. **Hit:** a ameaça no quadro, com corte seco + stinger + silêncio quebrado. Dura 0,3–1 s.
6. **Reação:** o close do rosto.
7. **Rescaldo:** hold de 2–4 s; a respiração; a pergunta nova.

No máximo um falso susto por vídeo. O segundo susto real vem quando a plateia acha que já passou.

## 8. Luta realista e detalhada

- **Geografia primeiro:** geral mostrando os dois e o espaço, depois aproxima.
- **Cada troca em 3 tempos:** antecipação (quem vai bater), ação (o golpe) e reação (o efeito). A plateia precisa ver
  os três.
- **Planos curtos, mas legíveis:** 0,4–1,9 s no clímax (medido em Charge). Nada de tremor que esconde o golpe.
- **Impacto = hitstop + flash de 1–3 quadros + tremor que decai + sfx + partículas.**
- **Vantagem que vira:** ganhando → perdendo → ideia (a regra) → virada.
- **O ambiente é arma:** extintor, cadeira, interruptor, farol de carro.
- **Custo visível:** respiração ofegante, mão enfaixada sangrando e o mancar nas cenas seguintes.
- **Movimentos de boxe reais para a Mari:** jab, direto, cruzado, gancho, esquiva lateral, clinch. Pés sempre
  plantados, quadril gira no golpe e a guarda volta ao rosto.
- **A criatura luta errado:** sem antecipação, articulações que dobram ao contrário e silêncio no golpe.

## 9. Checklist de cena

- [ ] Qual é a emoção desta cena (uma palavra)?
- [ ] O que a plateia sabe que o personagem não sabe?
- [ ] De onde vem a luz?
- [ ] Onde está o espaço negativo?
- [ ] Qual é o som antes da imagem?
- [ ] Onde é o silêncio?
- [ ] Este plano é mais longo ou mais curto que o anterior, e por quê?
