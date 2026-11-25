# Canal: IMAGINA SÓ (@imaginasobr)

Canal de vídeos longos (8–15 min, 16:9) no formato "E se…?": uma pergunta sobre **você**, um poder ou uma regra que cresce
**a cada dia**, contado dia a dia (DIA 1, DIA 7, DIA 30) com números reais. Mascote original: **o Tuco** (14 anos,
cabelo cacheado, jaqueta verde com zíper amarelo, tênis vermelho), o amigo **Biel** (boné vermelho) e a mãe, **Dona Cida**.
Tudo se passa no Brasil (escola, cantina, padaria, pelada de rua).

- **Foto de perfil:** [foto-perfil.png](foto-perfil.png) (balão de pensamento com "?", serve para todo tema) e a variante [foto-perfil-b.png](foto-perfil-b.png)
- **Banner:** [banner.png](banner.png) (2560×1440; o Tuco e o Biel sob balões de ideias, nome, slogan e @ na área do celular; plano `brand-banner2`)
- **Como refazer:** planos `brand-avatar` e `brand-banner` em `videos/imagina-001-dinheiro/world.ts`, depois
  `node core/world.ts videos/imagina-001-dinheiro` (quadros p13 e p14 em `world/storyboard/`)

## Identidade
- **Assinatura na tela:** a placa do topo com o dia e o saldo (`imHud` em `world.ts`); a cada vídeo ela mostra o que cresce.
- **Capa:** sempre "DIA 1 vs DIA N" (antes e depois), o Tuco grande, no máximo 3 palavras.
- **Título:** "E se seu/sua ___ dobrasse todo dia?" e variações; o "você" sempre na pergunta.
- **Final:** "em que dia você parava?" (comentário com número) + o tema do próximo episódio.

## Texto "Sobre" do canal
E se acontecesse com você? Aqui cada pergunta maluca vira uma história: um poder que dobra todo dia, uma regra impossível,
um mundo diferente. Com o Tuco, números de verdade e muita confusão no bairro.

🎬 Episódio novo toda semana.

## 30 temas (título • capa)
1. E se seu dinheiro dobrasse todo dia? • DIA 1 R$1 vs DIA 30 R$536 MI (EP.1, pronto)
2. E se você encolhesse pela metade todo dia? • Tuco normal vs do tamanho de uma formiga
3. E se você só pudesse falar a verdade por 30 dias? • "DIA 1" boca tapada vs "DIA 30" escola em choque
4. E se a gravidade caísse pela metade todo dia? • pulo normal vs flutuando sobre a cidade
5. E se você nunca mais precisasse dormir? • cama vs 3h da manhã de olheira
6. E se o Brasil ficasse 30 dias sem internet? • celular sem sinal vs fila no orelhão
7. E se sua força dobrasse todo dia? • Tuco carrega mochila vs carrega um ônibus
8. E se você ficasse 1 cm mais alto todo dia? • DIA 1 vs DIA 365 (3,6 m a mais)
9. E se você pudesse parar o tempo por 1 minuto por dia?
10. E se tudo que você tocasse virasse ouro?
11. E se você acordasse em outro país todo dia?
12. E se o seu QI caísse pela metade todo dia?
13. E se o dia tivesse só 12 horas?
14. E se você não sentisse dor?
15. E se a Terra parasse de girar por 1 segundo?
16. E se você vivesse 1.000 anos?
17. E se você pudesse ouvir o pensamento do cachorro?
18. E se a escola durasse 24 horas?
19. E se você ficasse invisível 1 hora por dia?
20. E se a Lua caísse no Brasil?
21. E se a sua sorte caísse pela metade todo dia?
22. E se você pudesse voltar 1 dia no tempo, toda noite?
23. E se não existisse dinheiro no Brasil?
24. E se você tivesse um clone que cresce todo dia?
25. E se você entendesse todas as línguas do mundo?
26. E se o mar subisse 1 metro por dia?
27. E se você não precisasse comer?
28. E se você pudesse ver 10 segundos do futuro?
29. E se todo mundo tivesse o mesmo rosto que você?
30. E se o sol apagasse por 1 dia?

## Postagem
1 episódio por semana (quarta ou quinta, 18:00 de Brasília). No mesmo dia, um Short com o melhor momento ("DIA 30!")
apontando para o vídeo longo.

## Capas: ilustração por IA + montagem
As capas usam ilustração pintada (gerada no ChatGPT/Gemini) e são montadas por `videos/<ep>/thumbnail/compose-ai.py`
(painéis lado a lado, "DIA 1 | DIA N", etiqueta de valor). Gere **duas imagens verticais** por episódio com o prompt base:

> Cartoon digital painting, YouTube thumbnail style, soft cel shading and dramatic lighting, highly detailed background.
> A 14-year-old Brazilian boy named Tuco with curly black hair and brown skin, green zip track jacket with a yellow stripe
> on the sleeves, black shorts, **unbranded** red sneakers. [CENA DO DIA 1 / DIA N]. Full body, dynamic pose, vertical
> composition, no text, no logos.

Na segunda imagem, escreva "mesmo personagem da imagem anterior". Peça tênis **sem marca** (logotipos de marcas na capa
podem dar problema).
