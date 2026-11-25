# Thumbnail (capa) chamativa: o guia completo

> Dados de 2026 vêm de blogs e estudos de ferramentas (vidIQ, TubeAnalytics, Thumbo, CTRpilot), com números que não
> batem entre si. Confie na **direção** (rosto, poucas palavras, contraste alto), não nas porcentagens exatas.
> Conferido em nov/2026.

## O que os dados mostram
| Elemento | Sinal | Fonte |
|---|---|---|
| **Um rosto dominante com emoção clara** | +18–32% de CTR | TubeAnalytics 2026 |
| Rosto presente | 69% de 500 vídeos que estouraram (jun/2026) tinham rosto; só ~5% com expressão exagerada | vidIQ |
| Rosto vs sem rosto | 6,8% vs 4,1% de CTR médio em 1.000 capas | Thumbo |
| **3–5 palavras grandes de alto contraste** | +11–22% de CTR vindo da **busca**; −4% no Início/sugeridos | TubeAnalytics |
| **Contraste alto** | 6,5% vs 4,7% de CTR (metodologia não verificada) | CTRpilot |
| Texto demais | Pior em Início e sugeridos | TubeAnalytics |

**Tradução:**
- Um rosto ou criatura grande com emoção forte, mas sem careta exagerada.
- Pouco texto. Mais texto quando o vídeo vive de busca (casos reais), quase nenhum quando vive do Início (lendas, histórias).
- Contraste alto sempre.

## As 12 regras
1. **Um assunto só, grande:** ocupa 40–60% da capa. Se tem 3 coisas importantes, não tem nenhuma.
2. **Rosto ou criatura com emoção:** medo, choque, ameaça. Olhos visíveis. Neste projeto, olhos que brilham (verde,
   vermelho, amarelo) funcionam como assinatura.
3. **Contraste de cor:** assunto quente (laranja, vermelho, amarelo) sobre fundo frio e escuro (azul-noite, verde-escuro),
   ou o contrário. Nada de assunto e fundo da mesma cor.
4. **Brilho:** a capa precisa se destacar no feed **claro e escuro** do YouTube. Evite capa toda escura: ilumine o
   assunto (rim light, brilho atrás).
5. **Texto: 0–4 palavras**, que **completam** o título, nunca repetem. Fonte grossa (Anton, Impact), contorno escuro e
   sombra. Mínimo ~10% da altura da capa.
6. **Terço vazio para o texto:** reserve uma área limpa; não escreva por cima do rosto.
7. **Curiosidade sem mentira:** mostre a situação, esconda a resposta (a mão saindo da água, o olho na fechadura).
   Tudo o que a capa promete aparece no vídeo, de preferência no 1º minuto.
8. **Fundo simples:** desfoque, escureça ou tire detalhes. Detalhe demais vira ruído no celular.
9. **Canto inferior direito livre:** o YouTube põe a **duração** ali. Não coloque texto importante nesse canto.
10. **Teste no tamanho real:** a capa aparece com ~168–360 px de largura no celular. Se não entende em 1 segundo
    nesse tamanho, refaça (o script `thumb_check.py` monta essa prévia).
11. **Identidade de série:** mesma fonte, mesmo selo e paleta parecida; o público reconhece antes de ler.
12. **Teste 3 capas:** no "Testar e comparar" (vídeo longo). Mude **uma coisa por vez** (o rosto, a cor ou o texto) e
    olhe o CTR **junto** com a retenção: capa que engana sobe o CTR e derruba a retenção.

## Especificações
| Formato | Tamanho | Observação |
|---|---|---|
| Vídeo longo | **1280×720** (16:9), JPG ou PNG, até 2 MB | Área segura: deixe 5% de margem; canto inferior direito tem a duração |
| Shorts | Capa 1080×1920 escolhida no app (quadro do vídeo ou imagem) | Aparece no perfil, nas buscas e no feed de "Shorts" do canal; o centro (≈1080×1080) é o que mais aparece recortado |

## Fórmulas de capa para terror, mistério e casos reais
| Fórmula | Exemplo | Quando usar |
|---|---|---|
| **Olho na escuridão** | Olhos brilhando no mato / na fechadura | Lenda, ameaça escondida |
| **A coisa errada** | Pegadas viradas pra trás; boca na barriga | O detalhe impossível da lenda |
| **Pessoa + ameaça atrás** | Personagem assustado, criatura desfocada atrás | História com vítima |
| **Antes/depois** | Menino → lobo (lado a lado) | Transformação |
| **Objeto-prova** | A espingarda amarrada de cipó, o véu molhado | Final misterioso (curiosidade pura) |
| **Documento + carimbo** | Pasta "CONFIDENCIAL", foto antiga, círculo vermelho | Casos reais (canal Arquivo Proibido) |
| **Mapa/lugar + data** | "VARGINHA 1996" sobre a cidade à noite | Casos reais buscados por lugar |

Elementos que puxam clique: **seta ou círculo vermelho** apontando o detalhe (com moderação), **número** ("3 VEZES"),
**contraste de tamanho** (algo enorme perto de algo pequeno).

## Checklist antes de publicar
- [ ] Um assunto só, grande, com emoção
- [ ] Contraste alto (assunto quente × fundo frio, ou o contrário)
- [ ] 0–4 palavras que completam o título, legíveis a 168 px
- [ ] Canto inferior direito livre
- [ ] Funciona no feed claro e no escuro (prévia do `thumb_check.py`)
- [ ] Parece da série (fonte, selo, paleta)
- [ ] O vídeo cumpre o que a capa mostra
- [ ] 3 versões prontas para "Testar e comparar"

## Como fazer neste projeto
- **Shorts:** `core/cover.py` com um quadro limpo do teste de mundo (planos `cover-a`/`cover-b` no `world.ts`).
- **Vídeo longo (16:9):** um plano de capa no mundo do vídeo, renderizado limpo, + texto e selo (ex.:
  `videos/zona-de-silencio-ep1/thumbnail/make-thumb.py`).
- **Conferir:** `python3 .claude/skills/youtube-crescimento/scripts/thumb_check.py capa.jpg [outras.jpg ...]`.
