# Vozes: atuação, direção, vozes por IA, efeitos e mixagem

Num vídeo narrado, a voz é metade da atuação; num canal sem rosto, é a marca. Este capítulo junta:

- o que pesquisamos sobre atuação e direção de voz;
- os motores de voz que temos (e as licenças);
- os testes que medimos com `scripts/analyze-voice.py` e `scripts/check-speech.py`;
- a biblioteca de efeitos `scripts/voice-fx.sh`.

## 1. Atuação de voz para animação

- **Os quatro botões de uma voz de personagem:**
  - **altura** (grave ↔ aguda);
  - **ritmo** (lento ↔ rápido);
  - **colocação**: onde a voz ressoa — nariz (anasalada, irritante, cômica), garganta (tensa, áspera, vilã), peito
    (grave, autoridade) ou máscara/rosto (clara, heroica);
  - **textura**: soprosa, rouca, cortante, chiada.

  Escolha altura e ritmo primeiro, depois a textura.
- **O corpo faz a voz:** postura curvada = voz apertada; peito aberto = voz cheia. A pose do personagem e a voz combinam.
- **Três leituras diferentes** de cada fala importante, depois escolha. Variedade dá opção na montagem.
- **Sustentável:** uma voz que machuca a garganta não dura uma série. Isso vale para pessoas; para IA, vale a
  consistência: o mesmo preset em toda a série.
- **Animação moderna puxa para o natural;** a voz "cartunesca" fica para o alívio cômico. No terror, natural assusta
  mais.
- **Efforts (esforços):** golpes, quedas, susto, respiração ofegante e grito são falas também. Grave ou gere separado
  e coloque na chave certa da luta.

## 2. Dirigir uma voz (pessoa ou IA)

- **Dê contexto, não resultado:**
  - ✗ "fala com medo";
  - ✓ "você acabou de ver a sombra do seu amigo se mexer sozinha; você não quer que ela perceba que você viu".
- **Use verbos de ação**, não adjetivos: convencer, avisar, ameaçar, esconder, implorar. "Triste" não se interpreta;
  "tentar não chorar na frente da filha" se interpreta.
- **A respiração é o combustível:** respiração antes da fala muda tudo (ofegante = perigo, presa = susto).
- **Pausas são atuação:** o silêncio antes da palavra-chave é onde o medo mora.
- **Dirigir uma IA = escrever o texto como direção:**
  - frases curtas;
  - um sentimento por linha (troca de emoção = linha nova);
  - palavras fáceis de pronunciar;
  - grafia fonética no campo `say` para nomes estrangeiros ("Gueri", "Quev").

## 3. Narração de terror

- **Controle, não voz "assustadora" o tempo todo.** Desacelerar, suavizar e pausar deixam uma frase comum
  arrepiante.
- **O ritmo segue a atenção do personagem:**
  - medido quando algo parece errado;
  - rápido no perigo imediato;
  - quase parado depois da descoberta.
- **Não grite o susto na narração.** A voz baixa antes do susto e o som faz o hit (regra do silêncio em
  `direcao.md`).
- **Sussurros em frases curtas e quebradas.** Sussurro longo cansa e perde inteligibilidade.
- **Proximidade:**
  - voz "colada no ouvido" (graves e ar, sem reverb) = intimidade e ameaça;
  - voz com sala = distância e testemunho.
- **Primeira pessoa e presente** ("eu tranco a porta. Aí a luz pisca.") prendem mais do que o passado distante.

## 4. Dublagem brasileira (a tradição que a gente fala)

- No Brasil a direção de dublagem é uma função própria (diretor + técnico + dublador), com escola forte.
- **Sincronia labial é bônus:** o português raramente espelha o original, e o objetivo é a "dublagem invisível", em
  que ninguém nota.
- Respiração e "musicalidade" da língua contam tanto quanto o texto. No nosso caso (animação própria), a boca segue a
  voz, então a sincronia é total por construção (janelas de fala).

## 5. Motores de voz que temos

| Motor | Licença | Português | Emoção | Velocidade aqui (CPU) | Uso |
|---|---|---|---|---|---|
| **Kokoro-82M** (o do VoiceStudio) | Apache-2.0 (comercial ok) | pf_dora, pm_alex, pm_santa | **nenhuma**; só velocidade | instantâneo | narração e falas neutras; padrão do repo |
| **Piper pt_BR** (cadu, faber, jeff) | MIT, confira o cartão de cada voz | sim | nenhuma | instantâneo | mais timbres masculinos |
| **Chatterbox Multilingual** (Resemble AI) | **MIT** (comercial ok); marca d'água inaudível | sim (23 línguas) | **`exaggeration`** + `cfg`; clona timbre de 5–10 s | ~18 s de CPU por segundo de fala | **falas atuadas**: medo, raiva, grito, sussurro tenso |
| **OmniVoice** (padrão do app VoiceStudio) | código Apache, **pesos CC-BY-NC** (não comercial) | sim (646 línguas) | tags `[laughter]` `[sigh]`, estilo `whisper` | precisa de GPU | **não usar em canal monetizado** |
| IndexTTS2 / CosyVoice 3 / VoxCPM2 (opcionais no VoiceStudio) | confira cada licença antes | varia | IndexTTS2: 8 emoções com intensidade; CosyVoice 3: `[breath]` e instrução escrita | GPU | estúdio com placa de vídeo |

**Regra de ouro do VoiceStudio:** "o clipe de referência é uma direção de atuação". Quem clona copia o *jeito* de
falar, não só o timbre. Referência plana gera fala plana.

**Clonagem só com consentimento:** nunca clone voz de pessoa real (famosos, conhecidos) sem permissão escrita. Vozes
de personagens saem dos motores ou de quem autorizou.

## 6. O que medimos

`analyze-voice.py` mede a melodia (`pitch_range_st`, `pitch_move_st`), o ritmo (sílabas/s), as pausas, a dinâmica e o
brilho. `check-speech.py` transcreve com Whisper e compara com o texto: é o nosso "ouvido" (não conseguimos escutar).

**Kokoro, pontuação e emoção** (a mesma frase, pf_dora):

| Versão | Duração | Movimento da melodia | Pausas detectadas |
|---|---|---|---|
| neutra "." | 2,7 s | 1,21 st | 0 |
| exclamação "!" | 2,8 s | 2,11 st | 0 |
| reticências "..." | 2,9 s | 2,04 st | **0** |
| velocidade 0,8 | 3,4 s | 1,83 st | 0 |

→ **No Kokoro, "..." não vira pausa.** A pausa precisa ser silêncio de verdade: quebre a fala em duas linhas e use
`pause` no `script.json`. A exclamação mexe um pouco na melodia; emoção de verdade não sai do Kokoro.

**Chatterbox com a voz da Dora clonada** ("Não acende a luz. Ela só existe onde tem luz... e está bem atrás de
você."):

| exaggeration / cfg | Duração | Pausas | Faixa dinâmica | Brilho | Inteligibilidade (WER) |
|---|---|---|---|---|---|
| 0,3 / 0,5 | 5,3 s | 1 (0,32 s) | 26,8 dB | 1862 Hz | 0,00 |
| **0,7 / 0,3** | 5,7 s | **2 (até 0,72 s nas reticências)** | **30,0 dB** | **1523 Hz (mais escura)** | 0,00 |
| 1,0 / 0,3 | 4,7 s | 1 | 20,2 dB | 1965 Hz | 0,00 |

→ **0,7 com cfg 0,3 foi a melhor leitura de terror:** respeita as reticências, fica mais escura e tem mais contraste
de volume. 1,0 acelera e achata. A movimentação melódica do Chatterbox (2,1–2,8 st) é ~2× a do Kokoro neutro
(1,2 st). Todas as três saíram 100% inteligíveis.

**No `voices.py`, "Tem alguém aí?" (Mari):** o Kokoro gera 0,9 s corrido, e o Whisper ouve "sem alguém a isso"
(WER 1,0). Com `emo` 0,8, o Chatterbox gera 1,9 s com a pergunta subindo (movimento de melodia 4,6 st) e o Whisper
entende perfeitamente (WER 0). **Falas curtas e emotivas são onde o Kokoro mais falha.**

**Auditoria do Motel Lua Vermelha (101 falas, Kokoro):** WER médio 0,105, com 13 falas acima de 0,15. Os problemas
reais encontrados:

- "sorria, sorria, sorria" virou "sojias" (as duas falas com essa palavra somem);
- "deixa o like" saiu irreconhecível;
- "Gary, tira…" foi ouvido como outra frase;
- "chat, ela…" virou "a chate";
- "Mari Delgado" soou "Marida Elgado" na primeira versão (a ligação engole o D).

O resto é "pra" → "para", gírias e nomes estrangeiros. **Rode o `check-speech.py` em todo vídeo antes do render** e
refaça as falas-chave marcadas (outra grafia no `say`, uma vírgula ou `emo`).

## 7. Usar fala atuada no pipeline

Em `script.json`, uma fala com `emo` é gerada pelo Chatterbox clonando a voz Kokoro do próprio personagem, com a
mesma cadeia de efeito. Assim, atuada e neutra combinam:

```json
{"id": "l12", "who": "mari", "text": "Tem alguém aí?", "emo": 0.7, "cfg": 0.3, "pause": 0.8}
```

```bash
CHATTERBOX_PY=<python do venv do chatterbox> python videos/turno-da-madrugada/tools/voices.py videos/<topic>
```

- `emo` 0,3–0,4: calma tensa. 0,5: neutro vivo. **0,7: medo/raiva.** 1,0+: grito, colapso (confira com o
  `check-speech`).
- Use `emo` só nas falas que precisam de atuação (10–30% do roteiro); o resto fica no Kokoro, que é instantâneo.
- **Instalar o Chatterbox (CPU, uma vez):**
  ```bash
  uv venv -p 3.11 ~/.chatterbox && VIRTUAL_ENV=~/.chatterbox uv pip install --index-strategy unsafe-best-match \
    --extra-index-url https://download.pytorch.org/whl/cpu "torch==2.6.0+cpu" "torchaudio==2.6.0+cpu" chatterbox-tts "setuptools<81"
  export CHATTERBOX_PY=~/.chatterbox/bin/python
  ```
  O primeiro uso baixa ~3,8 GB de modelo do Hugging Face. O `setuptools<81` é necessário para a marca d'água
  (`perth`) carregar.

## 8. Efeitos de voz (`scripts/voice-fx.sh`)

```bash
bash .claude/skills/diretor-de-terror/scripts/voice-fx.sh list
bash .claude/skills/diretor-de-terror/scripts/voice-fx.sh sombra entrada.wav saida.wav
```

Todos saem em −20 LUFS, então trocar de preset não exige remixar. Medido com Whisper na mesma fala:

| Preset | Para quê | WER (Whisper) |
|---|---|---|
| *(original Kokoro)* | referência | 0,06 |
| `limpa` | polimento de toda fala (corte de grave, de-esser, compressão, presença) | 0,11 |
| `sussurro` | sussurro íntimo, colado no ouvido | 0,11 |
| `pensamento` | voz interior | 0,11 |
| `distante` / `parede` | alguém longe / atrás da porta | 0,17 / 0,11 |
| `radio` / `telefone` / `tv` / `megafone` | vozes por aparelho | 0,06 / 0,06 / 0,00 / 0,11 |
| `monstro` | criatura grande que **fala o enredo** | 0,11 |
| `fera` | rugido com palavras que **não** devem ser entendidas | 1,00 (de propósito) |
| `possuido` | voz dupla: a pessoa + ela mesma 12 semitons abaixo | 0,06 |
| `fantasma` | camada aérea, coro, eco longo, "inspiração" invertida antes das palavras | 0,17 |
| `sombra` | −4 st, reverb invertido que **chega antes** de cada palavra, tremolo frio | 0,22 (frases curtas) |
| `crianca` | criança sinistra (+5 st, mais lenta) | 0,11 |

Medido na mesma fala de 18 palavras. Quase todo o "erro" é o Whisper escrevendo "1960 e um" em vez de "1961"; acima de
0,15 o efeito já come sílabas. Por isso use `sombra` e `fantasma` em frases curtas.

**Princípios do design de voz de criatura** (fontes de sound design de cinema e jogos):

- **Grave = grande e ameaçador; agudo = pequeno, rápido, inseto.** Desloque pouco a altura: deslocamento extremo
  vira "voz debaixo d'água". Nosso `monstro` foi reduzido de −7 para −6 st porque a 1ª versão saiu
  ininteligível.
- **Camadas:** um ruído simples tem 2–3 camadas; uma criatura principal tem 12 ou mais (o velociraptor de um filme
  famoso de dinossauros usou 20–30). Animal + humano + atrito (corrente, metal arrastando).
- **Atrito é seu amigo:** sons de fricção (corrente, papel, unha) fazem textura de criatura.
- **Variação:** a mesma frase/rugido repetido idêntico quebra a ilusão; varie altura ±1 st e timing.
- **Reverb invertido antes da fala** ("a voz chega antes da boca") é o truque clássico de assombração.

## 9. Mixagem da voz

1. **Ordem da cadeia:** limpar ruído → corte de grave (80–120 Hz) → de-esser → compressão leve (3:1) → EQ de
   presença (+2 dB em ~3 kHz) → nível. É o preset `limpa`.
2. **Mesmo espaço:** todas as falas de um cenário com o mesmo reverb curto, porque quarto pequeno soa diferente de
   estacionamento.
3. **Perspectiva:** quem está longe soa mais baixo, mais escuro e com mais sala (`distante`).
4. **Voz manda:** a música abaixa 10–15 dB enquanto alguém fala (ducking) e volta nos respiros.
5. **Entrega no YouTube:** −14 LUFS integrados, pico real ≤ −1 dBTP (o `report.md` mede). Diálogo é a âncora; tudo é
   nivelado em volta dele.
6. **Silêncio também é mixagem:** antes do susto, até a voz respira (veja `direcao.md` §5).

## 10. Checklist de vozes

- [ ] Cada personagem com altura, ritmo, colocação e textura diferentes (mesmo motor = preset de efeito diferente)
- [ ] Nomes estrangeiros com grafia fonética no `say`
- [ ] Uma emoção por linha; troca de emoção = linha nova com `pause`
- [ ] Falas-chave atuadas (`emo` 0,6–0,8) e as demais neutras
- [ ] `check-speech.py videos/<topic>`: nenhuma fala-chave com WER > 0,15
- [ ] Criatura que fala o enredo inteligível; a que só ruge, não
- [ ] Mesmo reverb por cenário; perspectiva coerente
- [ ] Clonagem só de vozes com consentimento; licença comercial dos motores conferida
