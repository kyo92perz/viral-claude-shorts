# Filmes estudados: medidos quadro a quadro

Cada filme foi assistido analiticamente com `scripts/analyze-film.py`. O script mede:

- os cortes e a duração de cada plano (ritmo);
- um quadro por plano (composição, em `sheet.jpg`);
- a loudness a cada 100 ms (silêncios e hits);
- o brilho e a saturação.

Todos os filmes são de domínio público ou CC, baixados do Internet Archive. O YouTube bloqueia download automático, então
vídeos de lá não foram usados.

## Tabela comparativa

| Filme | Duração | Planos | Média | Mediana | < 1 s | > 8 s | Quase-silêncio | Saturação |
|---|---|---|---|---|---|---|---|---|
| *Charge* (Blender, CC BY-ND), ação animada | 4:23 | 77 | 3,4 s | 1,8 s | 22% | 9% | 3,2% | 82 |
| *Sprite Fright* (Blender, CC BY), comédia → terror | 10:30 | 97 | 6,5 s | 3,0 s | 5% | 18% | 2,1% | 148 |
| *Superman: Mechanical Monsters* (1941), ação animada | 10:10 | 85 | 7,2 s | 3,7 s | 7% | 24% | 0,8% | 67 |
| *The Skeleton Dance* (1929), animação musical | 0:56 | 4 | 13,9 s | 15,1 s | n/a | 50% | 2,2% | 64 |
| *Nosferatu* (1922), terror mudo | 91:54 | 586 | 9,4 s | 6,6 s | 0,7% | 42% | 9,0% | P&B |
| *A Noite dos Mortos-Vivos* (1968), terror | 95:52 | 1022 | 5,6 s | 3,2 s | 4,6% | 19% | 12,8% | P&B |
| **Nosso** *Turno da Madrugada* ep. 1 | 1:56 | 32 | 3,6 s | 3,5 s | 3% | 3% | **0,3%** | 136 |
| **Nosso** *Motel Lua Vermelha* | 9:52 | 116 | 5,1 s | 4,9 s | 25%¹ | 27% | **0,1%** | **180** |

¹ Os flashes de impacto e os apagões contam como corte, o que infla o número.

## O que cada filme ensina

### Charge: ação animada

- **Curva de ritmo "▇█▁▃":** 28–29 cortes por minuto na infiltração e na luta, 5 no desfecho, depois planos de 11, 17
  e 26 s. **A calma depois da tempestade é tão importante quanto a tempestade.**
- Abre devagar, em closes de detalhe à luz de vela (o mundo antes da ação).
- **Código de cor:** herói quente, inimigo azul-petróleo, magenta na ameaça.
- O clímax tem planos de 0,4 a 1,9 s com faíscas, fumaça e luz piscando a cada golpe, e cada golpe ainda se lê.

### Sprite Fright: comédia que vira terror

- **Ato 1 (0–4 min):** os personagens são apresentados **pelos pés e sapatos**, em inserts antes do rosto: tênis,
  meia-arrastão e bota azul. É caracterização instantânea e barata.
- **Luz dourada e saturada no ato 1:** os cogumelos ainda são fofos. A heroína quieta e observadora é a única que
  repara nos detalhes, em close de reação.
- **A virada (medida em 246–259 s):**
  - a fogueira quente vira azul frio quando ela dorme (o roteiro de cor marca a troca de gênero);
  - ~2 s de quase-silêncio (−45 LUFS) e um barulho a −12 LUFS (+30 LU);
  - corte para close do rosto, depois a lanterna (luz motivada) varrendo a escuridão.
  - É a anatomia do susto em `direcao.md` §7, executada à risca.
- **POV das criaturas:** câmera baixa, entre folhas = "estão nos observando".
- **Ritmo "▃█▆▆▅▂ ▁▁▄":** comédia rápida, depois **3 minutos de pavor quase sem corte** (1–3 cortes/min) e por fim a
  explosão do clímax.

### Superman: Mechanical Monsters (1941)

- **A ameaça aparece primeiro como sombra** na parede, depois como corpo.
- **O vilão não tem rosto** até o clímax: só mãos no painel de controle.
- Muito contra-plongée e ângulo holandês nas máquinas; os robôs sempre filmados de baixo.
- **Montagem paralela:** o vilão nos controles × os robôs na rua.
- **Cor:** a heroína em amarelo num mundo azul (o olho a encontra sempre). O clímax é laranja: fogo, metal derretido.
- Ritmo calmo (2 cortes/min) por 2 minutos, depois sobe em degraus até 21 cortes/min no clímax.

### The Skeleton Dance (1929)

- Quatro planos em 56 s. **A animação sincronizada com a música carrega o vídeo sozinha**, sem corte.
- Lição: um plano longo funciona se *dentro* dele o movimento varia (entradas, saídas, mudanças de ritmo).

### Nosferatu (1922)

- **Mediana de 6,6 s e 42% dos planos acima de 8 s:** o pavor vem de *segurar*. Tem um plano de 2 min.
- **Orlok emoldurado em portais em arco**, centrado, imóvel, saindo do escuro: quadro dentro do quadro e status máximo
  pela imobilidade.
- **Íris (vinheta redonda)** em muitos planos: o mundo fecha em volta do assunto.
- **Inserts de natureza como metáfora:** planta carnívora, pólipo e ratos. O horror é mostrado em outra coisa antes de
  ser mostrado no vampiro.
- **Intertítulos que plantam a regra** ("ninguém escapa do destino", "só uma donzela pura…"): a bomba debaixo da mesa,
  escrita.
- O navio fantasma, a peste e a cidade vazia: **a ameaça se mede pelo efeito no mundo** (ruas vazias, caixões).

### A Noite dos Mortos-Vivos (1968)

- **O primeiro ataque vem aos 7 minutos (7% do filme)**, num lugar banal (cemitério, visita à mãe). Depois disso não
  há respiro.
- **Cerco:** um lugar e janelas sendo pregadas, então **a geografia da casa vira o relógio**. Cada tábua é um degrau.
- **Exposição por mídia dentro da história:** rádio e TV dão as regras (os mortos andam, fogo os detém). A informação
  chega sem narrador.
- **O conflito humano é o terror maior:** porão × andar de cima, os personagens brigam entre si mais do que com os
  mortos.
- **Câmera na mão, closes extremos, ângulos muito baixos e luz dura de cima** (rostos com olhos em sombra).
- **12,8% em quase-silêncio:** os momentos mais tensos têm só passos, respiração e madeira rangendo.
- **Final sem consolo:** o herói morre por engano, em fotos estáticas. O ferrão é social, não sobrenatural.

## Autocrítica medida dos nossos vídeos

1. **Faltou silêncio.** 0,1–0,3% de quase-silêncio contra 2–13% nas referências, e nenhum silêncio → hit detectado. A
   trilha e o ambiente nunca param.
   → **Antes de cada susto, 1,5–3 s de silêncio quase total.** O stinger entra no hit, e a música volta só depois.
2. **Ritmo sem variação.** A mediana fica em 3,5–4,9 s quase constante: o limite de 2–7 s por cena achatou a curva.
   Nosferatu e Sprite Fright alternam planos de 1 s com planos de 20–60 s.
   → **Holds de pavor de 8–15 s** (uma cena com câmera lenta, várias chaves dentro) e **lutas com sub-cortes de 0,4–1,5 s**.
3. **Noite saturada demais.** Saturação 180 no Motel contra 82–148 nas referências. A noite parece desenho infantil.
   → Dessaturar a noite e guardar a saturação só para o acento (lua vermelha, neon, sangue).
4. **A criatura apareceu inteira cedo.** As referências mostram sombra e partes antes.
   → Escada de revelação: sombra → mão → silhueta → rosto, e o rosto só no clímax.
5. **Pouco espaço negativo e poucos POVs da ameaça.**
   → Planos com porta escura atrás do personagem e câmera baixa "observando" entre objetos.
6. **O que funcionou:**
   - regra clara da ameaça, usada no clímax (faróis);
   - elenco com funções distintas e um personagem que paga caro (Kev);
   - cold open com mistério (1961);
   - ferrão final;
   - inserts de luz falhando;
   - código de cor da lua vermelha.

## Segunda rodada: movimento quadro a quadro

Mais oito animações livres foram assistidas pelo movimento: *Gertie the Dinosaur* (1914), *Betty Boop: Snow-White*
(1933), *As Aventuras do Príncipe Achmed* (1926), *Big Buck Bunny*, *Spring*, *Coffee Run*, *Cosmos Laundromat* e
*Agent 327*. As seis anteriores foram medidas de novo com `analyze-motion.py`. A tabela e as lições estão em
`animacao.md` §10. Em resumo:

- os mestres do desenho misturam 1s e 2s;
- personagem vivo nunca congela;
- sempre há uma camada ambiente em movimento;
- no pico de ação, o corpo atua (cortes de 2–4 quadros, borrão, faíscas);
- nos nossos picos, mexe mais a luz que os personagens.

## Como estudar um filme novo

```bash
python3 .claude/skills/diretor-de-terror/scripts/analyze-film.py filme.mp4 /tmp/estudo-filme 6   # 9 para filme antigo
python3 .claude/skills/diretor-de-terror/scripts/analyze-motion.py filme.mp4 /tmp/estudo-mov 15  # movimento
```

1. Leia o `summary.json` (ritmo, silêncio e cor).
2. Olhe o `sheet.jpg` (composição e luz por plano).
3. Para cada silêncio → hit, extraia quadros de 6 s antes até 6 s depois e anote a anatomia.

Use só filmes que você tem direito de baixar: domínio público, Creative Commons ou os seus próprios.
