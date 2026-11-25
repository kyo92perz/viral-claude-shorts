---
name: youtube-crescimento
description: "Estratégia para crescer, viralizar e monetizar canais do YouTube (Shorts e vídeos longos, qualquer nicho). Use ao planejar um canal novo, escolher nicho, criar thumbnail chamativa, escrever título, capa, gancho e descrição, montar calendário e horários de postagem, ler números do YouTube Studio (CTR, retenção, views), diagnosticar por que um vídeo não decolou, ligar um canal de Shorts a um de vídeos longos, ou planejar monetização (Programa de Parcerias, RPM, outras receitas) e evitar desmonetização. Gatilhos: viralizar, crescer o canal, monetizar, melhor horário pra postar, nicho, título, thumbnail, palavras-chave, analytics, por que não viralizou."
---

# YouTube: crescer, viralizar e monetizar

Um manual de decisão para qualquer canal do YouTube, com Shorts, vídeos longos ou os dois. Ele junta o que se sabe do
algoritmo, da embalagem (título + capa + gancho), da retenção, do calendário e da monetização. Também guarda os
**números reais dos canais deste projeto**, que pesam mais do que qualquer blog.

> **Datas importam.** Regras de monetização e do algoritmo mudam várias vezes por ano. Os fatos deste manual foram
> conferidos em **novembro de 2026**. Antes de afirmar números de monetização, requisitos ou políticas ao usuário,
> confira a página oficial (YouTube Help, "Programa de Parcerias do YouTube") ou uma busca recente, e diga a data.

## Como funciona

1. **Entender o pedido:** em qual destas situações o usuário está?
   - **Canal novo** → nicho, nome, identidade, plano das 4 primeiras semanas (§1, §6)
   - **Vídeo a lançar** → embalagem: título, capa, gancho, descrição, horário (§2, §3, §5)
   - **Capa/thumbnail** → `references/thumbnail.md` + `scripts/thumb_check.py` (prévia no feed do celular)
   - **"Por que não viralizou?" / números do Studio** → diagnóstico (§4; script `diagnostico.py`)
   - **Calendário / horários / frequência** → §5; script `calendario.py`
   - **Monetização / política / risco de desmonetizar** → §7
   - **Vários canais (Shorts + longo)** → §6
2. **Ler a referência certa** (lista no fim). Leia só o que a tarefa pede.
3. **Usar os dados do próprio canal primeiro:** `references/dados-dos-canais.md` e o que o usuário mostrar do Studio
   valem mais que médias da internet.
4. **Responder com decisões, não teoria:** o que fazer, em que ordem, e como medir se funcionou.
5. **Registrar o aprendizado:** se o usuário mostrar resultados novos (prints do Studio), adicione uma linha em
   `references/dados-dos-canais.md` com a data, o vídeo, os números e o que se aprendeu.

## As 20 regras

**O algoritmo** (detalhes: `references/algoritmo.md`)
1. **O YouTube recomenda o que deixa o espectador satisfeito:** clique + tempo assistido + sinais de satisfação
   (pesquisas, likes, "não recomendar"). Não existe palavra mágica que faça viralizar.
2. **Shorts e vídeos longos têm recomendações separadas.** Um Short que estoura não puxa sozinho o vídeo longo: a
   ligação precisa ser feita de propósito (link "vídeo relacionado", série, chamada no fim).
3. **Original vence reaproveitado.** Desde outubro de 2026 o feed de Shorts prioriza conteúdo original. Conteúdo feito
   em série, igual e repetitivo, é o que leva desmonetização ("conteúdo inautêntico").
4. **Os primeiros 1–3 dias testam o vídeo com uma amostra pequena.** Se o público-teste clica e assiste, o vídeo
   é mostrado para mais gente. Um vídeo pode "acordar" semanas depois.

**A embalagem** (detalhes: `references/embalagem.md`)
5. **A ideia é escolhida pela capa e pelo título, antes de existir roteiro.** Se não dá para fazer uma capa
   irresistível, a ideia é fraca.
6. **Título + capa contam uma história só.** A capa mostra, o título completa. Nunca repetir na capa o texto do título.
7. **Gancho pessoal vence aviso genérico** (dado do projeto: "Meu primo era o SÉTIMO filho" fez 18 mil views;
   avisos tipo "Não olhe" ficaram em 1–3 mil). Use a fórmula **parente/pessoa + regra + segredo**.
8. **O primeiro segundo é o gancho:** imagem forte + frase que abre uma pergunta. Nada de logo ou "olá pessoal".
9. **Capa que dá clique:** um assunto grande com emoção (rosto ou criatura, olhos visíveis), contraste alto (quente ×
   frio), 0–4 palavras que completam o título, canto inferior direito livre, legível com 168 px. Teste 3 capas no
   "Testar e comparar" e mude uma coisa por vez. Guia completo em `references/thumbnail.md`; confira com
   `scripts/thumb_check.py`.

**A retenção** (detalhes: `references/retencao.md`)
10. **Shorts:** gancho em 1 s, uma ideia só, corte a cada 1,5–3 s, final que emenda no começo (loop) e uma
    pergunta fácil de responder sobre a vida de quem assiste (gera comentários).
11. **Vídeo longo:** cumprir a promessa da capa no 1º minuto, novo gancho a cada 30–60 s, capítulos que não entregam o
    final, e nenhum trecho parado sem motivo. 8 min ou mais libera anúncios no meio do vídeo.
12. **Variedade de ritmo:** alternar cenas calmas e rápidas, porque ritmo constante faz as pessoas saírem aos poucos.

**Constância e calendário** (detalhes: `references/calendario.md`)
13. **Constância vence horário.** O próprio YouTube diz que o horário não decide o desempenho a longo prazo; ajuda
    só no começo. Poste quando seu público está online (Studio → Público).
14. **Ponto de partida no Brasil:** Shorts às 18h–21h em dias úteis; vídeos longos na sexta 17h–19h ou no sábado e
    domingo às 10h–12h (horário de Brasília). Depois ajuste com os dados do canal.
15. **Séries:** episódios numerados, playlists e séries de Shorts criam hábito e maratona.

**Diagnóstico** (detalhes: `references/diagnostico.md`; script `scripts/diagnostico.py`)
16. **Ler na ordem:** impressões → CTR → retenção → views de fontes externas. Cada problema tem uma causa diferente
    (tabela no §4).
17. **Compare o vídeo com a média do próprio canal**, não com outros canais.

**Monetização** (detalhes: `references/monetizacao.md`)
18. **Os caminhos do Programa de Parcerias (nov/2026):** 1.000 inscritos + 4.000 horas de vídeo longo em 12 meses
    **ou** 10 milhões de views de Shorts em 90 dias. Existe um nível inicial (500 inscritos) para recursos de fã.
    Blogs falam em regras mais duras a partir de 1º/fev/2027: confira antes de prometer.
19. **Shorts pagam pouco (RPM típico de US$ 0,03–0,10 por mil); vídeo longo paga 10–50× mais.** Use Shorts para
    crescer e o vídeo longo para ganhar.
20. **Proteja o canal:** nada de reupload de terceiros, música sem licença, enganação no título, ou centenas de vídeos
    iguais. Use IA como ferramenta e mostre trabalho humano evidente: roteiro próprio, personagens próprios, variação
    real. Marque "conteúdo alterado" quando algo realista parecer real.

## §4. Diagnóstico rápido (a tabela mais usada)

| Sintoma no Studio | Causa provável | O que fazer |
|---|---|---|
| Poucas impressões | O YouTube ainda não sabe para quem mostrar, ou o tema tem pouca demanda | Tema mais buscado, título com a palavra que as pessoas digitam, série |
| Impressões ok, CTR baixo (< 4% no longo) | Capa ou título fracos | Trocar capa/título; testar 3 capas |
| CTR ok, retenção cai nos primeiros 30 s | Gancho não cumpre a capa | Abrir com o momento da capa; cortar a introdução |
| Retenção cai no meio | Trecho sem novidade | Novo gancho a cada 30–60 s; cortar ~20% |
| Shorts: "deslizaram" > 50% | Primeiro segundo fraco | Imagem mais forte + placa de gancho + frase de aviso |
| Shorts: muitas views, poucos inscritos | O canal não promete uma série | Série numerada, chamada "Parte 2", nome da série na capa |
| Muitas views, pouco comentário | A pergunta final é difícil ou genérica | Pergunta sobre a vida da pessoa ("Quem é o sétimo filho na sua família?") |

Rode `python3 scripts/diagnostico.py <export.csv>` com a exportação do Studio para gerar este diagnóstico vídeo a vídeo.

## §6. Vários canais (Shorts → vídeo longo)

- **Canal de Shorts:** descoberta (volume, séries, perguntas que geram comentário).
- **Canal longo:** dinheiro e fã (casos completos, 10–15 min).
- **A ponte:** cada vídeo longo gera 3–5 cortes em Shorts com "vídeo relacionado" apontando para ele, mais post na
  comunidade e banner/link nos dois canais. Detalhes em `references/canais.md`.

## Usage

```bash
# diagnóstico vídeo a vídeo a partir da exportação do YouTube Studio (Analytics → Avançado → Exportar → CSV)
python3 .claude/skills/youtube-crescimento/scripts/diagnostico.py caminho/Tabela.csv
python3 .claude/skills/youtube-crescimento/scripts/diagnostico.py --demo        # exemplo com dados fictícios

# conferir capas: nota, problemas e prévia no feed do celular (claro e escuro), lado a lado com concorrentes
python3 .claude/skills/youtube-crescimento/scripts/thumb_check.py capa.jpg capa-b.jpg concorrente.jpg --out previa.png

# calendário das próximas semanas (horário de Brasília)
python3 .claude/skills/youtube-crescimento/scripts/calendario.py --shorts 5 --longos 1 --semanas 4
python3 .claude/skills/youtube-crescimento/scripts/calendario.py --shorts 7 --longos 0 --inicio 2026-12-01 --json
```

**Arguments:**
- `diagnostico.py`: o CSV exportado do Studio (colunas em português ou inglês) ou `--demo`; `--json` para saída de máquina.
- `thumb_check.py`: uma ou mais imagens; `--out` (prévia, padrão `previa-feed.png`), `--json`.
- `calendario.py`: `--shorts N` e `--longos N` por semana, `--semanas N` (padrão 4), `--inicio AAAA-MM-DD`
  (padrão: próxima segunda), `--json`.

## Output

`diagnostico.py` imprime um bloco por vídeo:
```
Mediana dos shorts: views 2.900, CTR 4,1%, retenção 81,0%
[FRACO] (short) Ela deu a TERCEIRA descarga #shorts (views 1.000, CTR 1,8%, retenção 64,0%)
  - CTR 1,8% baixo: troque capa ou título (teste 3 capas)
  - retenção 64% abaixo da média dos shorts (81%): gancho fraco ou meio parado; veja onde a curva cai
```
Shorts (até 180 s, ou "#shorts" no título quando não há coluna de duração) e vídeos longos são comparados cada um com a
mediana do próprio formato.
`calendario.py` imprime a semana com dia, hora e tipo (Short/longo) e, com `--json`, uma lista de objetos.

## Present Results to User

- Comece pela **decisão** ("faça isto agora"), depois o porquê em uma linha.
- Use tabela quando houver comparação (vídeos, horários, nichos).
- Separe **fato oficial** de **estimativa de blog**, e diga a data dos números de monetização.
- Termine com **como medir** (qual número do Studio olhar e quando: 48 h, 7 dias, 28 dias).
- Fale simples, em português, sem jargão; se usar um termo (CTR, RPM), explique em meia linha.

## Troubleshooting

- **"Não sei se a regra ainda vale":** faça uma busca recente ou abra a página oficial do YouTube Help antes de afirmar.
- **CSV do Studio com colunas diferentes:** `diagnostico.py` reconhece nomes em português e inglês; se faltar uma
  coluna, ele avisa qual e diagnostica com o que tiver.
- **O usuário quer "garantia de viralizar":** não existe. Prometa processo e teste, não resultado.
- **Canal desmonetizado ou com aviso:** leia `references/monetizacao.md` → "Se o canal for desmonetizado".

## Referências (leia só o que a tarefa pede)

- `references/algoritmo.md`: como a recomendação funciona, Shorts vs longo, originalidade, os primeiros dias.
- `references/embalagem.md`: fórmulas de título, capa, gancho, descrição, palavras-chave, hashtags, testes A/B.
- `references/thumbnail.md`: **capa chamativa**: dados de 2026, as 12 regras, fórmulas para terror e casos reais,
  especificações, checklist.
- `references/retencao.md`: estrutura de Shorts e de vídeo longo, reganchos, finais, loop.
- `references/calendario.md`: horários no Brasil, frequência, séries, como testar horários.
- `references/diagnostico.md`: métricas do Studio, valores de referência, perguntas de diagnóstico.
- `references/monetizacao.md`: Programa de Parcerias, RPM por nicho, outras receitas, políticas, riscos de IA.
- `references/nichos.md`: como avaliar um nicho, lista de nichos com sinais de 2026.
- `references/canais.md`: Shorts + longo, identidade de canal, primeiras 4 semanas, colaborações.
- `references/dados-dos-canais.md`: **resultados reais dos canais deste projeto** (atualize sempre).
