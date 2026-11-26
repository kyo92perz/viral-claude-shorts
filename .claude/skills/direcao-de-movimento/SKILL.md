---
name: direcao-de-movimento
description: Direção de movimento, ritmo e som para vídeos animados e motion graphics (Shorts e vídeos longos). Use ao planejar ou revisar como uma cena se mexe, os cortes, as passagens de uma cena para outra, o ritmo, os efeitos sonoros e a música, ou quando pedirem "deixa mais dinâmico", "edição mais avançada", "tá parado", "tá com cara de PowerPoint", "mais fluido", "transição melhor". Destilado do openmotion-director (nexu-io/openmotion, Apache-2.0).
---

# Direção de movimento

Movimento bom não é ter mais coisas se mexendo: é mudança desenhada, com ritmo, que faz o público entender ou sentir algo. Esta skill dá o critério; o motor do vídeo (`core/`, HyperFrames) e a edição (`remotion/`) executam.

Base: o `openmotion-director` do nexu-io/openmotion (Apache-2.0). Os guias originais (em chinês) estão em `references/openmotion/`; leia o que for preciso:
- `motion-craft.md`: como transformar "mais dinâmico" em eventos visíveis (o principal);
- `motion-phrases.md`: exemplos certos e errados de frases de movimento;
- `action-script.md`: como escrever o roteiro de ação de cada trecho;
- `sound-narrative.md`: o papel do som antes de escolher sons;
- `examples.md`: exemplos completos.

## Como usar

1. **Escreva uma frase por trecho:** "o que o público vive aqui" (não o que o texto diz). Ex.: "o teto chega perto do Tuco até ele bater a cabeça", e não "mostrar que ele cresceu".
2. **Ache o evento visual do trecho**, que é próprio deste vídeo e fácil de reconhecer: o Tuco passando do prédio, a régua estourando, a Terra cabendo na mão. Um título entrando e parando não é evento.
3. **Faça o sujeito se mexer**, não a moldura. O movimento principal acontece no que carrega o sentido (o personagem, o objeto, o número). Card deslizando e esperando é o erro mais comum.
4. **Dê forma de tempo ao movimento principal:** preparação → movimento rápido → contato/virada → acompanhamento → pausa para ler. Nem todo movimento precisa de todas as fases.
5. **Planeje as passagens:** onde o olhar estava no fim do trecho e onde começa o próximo. A passagem pode continuar (o mesmo objeto segue), contrastar ou cortar seco. O que não pode é a câmera e o sujeito brigarem: se a câmera se afasta enquanto o detalhe muda, o público não vê o detalhe.
6. **Alterne rápido e parado:** trechos rápidos empurram, trechos parados deixam entender. Quando tudo já terminou e a tela só espera o próximo título, corte ou mude algo.
7. **Dê um papel ao som antes de escolher o som.** O som deve marcar o momento percebido (o contato, o "chegou", a revelação), não o início de cada animação. Um "pop" igual em toda mudança achata tudo. Silêncio antes de um susto ou revelação vale mais que efeito.

## Neste repositório

- **No motor** (`visuals*.ts` / `world*.ts`), por plano: o evento principal acontece no personagem ou objeto, com tempo próprio (pausa curta antes do impacto, tremida curta, depois quietude). A câmera chega mais perto de leve durante as pausas, nunca fica 100 % parada.
- **Na edição** (`remotion/`): o letreiro e o zoom de impacto entram no momento falado ("Dia 7"). Os sons de edição ficam baixos (`theme.sfxVolume`) e não cobrem a narração.
- **Ao revisar o vídeo:** assista em velocidade normal e anote os tempos. Para cada trecho principal, diga qual evento o público viu, onde o movimento acelerou e parou, e para onde o olhar foi no corte. Se o trecho for só "bloco entra e espera", refaça o evento antes de mexer em suavização ou efeitos.
- **Não invente regra fixa:** não existe número certo de planos, duração por plano, cota de transições ou de efeitos. Parado, plano longo, corte seco e transformação contínua podem funcionar, conforme o conteúdo.

## Checagem final

- Cada trecho principal tem um evento que o público reconhece e lembra.
- Dá para ler o resultado de cada movimento (o texto fica nítido quando para).
- Nenhum trecho fica só esperando o próximo título.
- As passagens entre trechos têm motivo.
- O som marca os momentos certos e respeita a voz.

Se não der para assistir com som, diga que o som não foi conferido de ouvido. Ter mais efeitos, código mais complexo ou mais cenas não prova qualidade.
