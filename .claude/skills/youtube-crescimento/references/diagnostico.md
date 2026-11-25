# Diagnóstico com os números do YouTube Studio

## As métricas (em linguagem simples)
| Métrica | O que é | Referência (compare com o próprio canal) |
|---|---|---|
| Impressões | Quantas vezes a capa foi mostrada | Depende do tamanho do canal |
| CTR (taxa de cliques) | % de quem viu a capa e clicou | Longo: 2–10%; 4–5% é bom para começar |
| Duração média da visualização | Quanto tempo, em média, as pessoas assistiram | — |
| % média visualizada (retenção) | Quanto do vídeo, em média | Longo de 10 min: 35–50% é bom; Shorts: 70–100%+ (replays passam de 100%) |
| Assistiram vs deslizaram (Shorts) | % que ficou em vez de pular | Acima de 60–70% é bom; o projeto passou de 50% |
| Inscritos por vídeo | Quantos se inscreveram a partir dele | Mostra se o vídeo promete uma série |
| Visualizações por espectador único | Quantos vídeos cada pessoa viu | Acima de 1,5 = maratona |

> As faixas variam por nicho e formato. Os números que mais importam são os do próprio canal: compare cada vídeo com a
> **mediana** dos seus últimos 10.

## Ordem de leitura
1. **Impressões baixas?** O problema está antes do clique: tema, público ou falta de sinal inicial.
2. **CTR baixo?** O problema está na capa e no título.
3. **Retenção baixa?** O problema está no gancho ou no meio do vídeo (curva de retenção).
4. **Tudo bom mas pouca escala?** O tema tem pouca demanda, ou falta série e continuação.

## Quando medir
- **48 h:** CTR, retenção e "deslizaram" dizem se a embalagem funcionou (troque título e capa se precisar).
- **7 dias:** fontes de tráfego (o feed pegou?).
- **28 dias:** comparar com a mediana do canal e decidir o próximo tema.

## Perguntas de diagnóstico para o usuário
- Qual vídeo foi melhor e qual foi pior, e o que mudou entre eles (tema, título, capa, duração, horário)?
- De onde vieram as views (Shorts, Início, Busca, Externo)?
- Onde a curva de retenção cai?

## Script
`python3 scripts/diagnostico.py export.csv` lê a exportação do Studio (Analytics → Modo avançado → Exportar → CSV) e
devolve um diagnóstico por vídeo, comparando com a mediana do canal.
