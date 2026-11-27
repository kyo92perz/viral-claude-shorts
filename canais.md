# Os canais

Cada pedido do usuário vai para um canal só. Antes de escrever, veja qual é o canal: o idioma, a pasta, o selo e as vozes vêm daqui.

| | Lendas Urbanas BR | Lendas Urbanas Estadunidense |
|---|---|---|
| Quando o usuário diz | "lenda", "lenda BR", "lendas do Brasil", "Saci", "Curupira"... | "lenda americana", "lenda dos EUA", "estadunidense", "canal em inglês", "Bloody Mary"... |
| Idioma do vídeo | português do Brasil | inglês (dos EUA); a conversa com o usuário continua em português |
| Selo no vídeo e na capa | `LENDAS DO BRASIL` + `EP.N` | `AMERICAN LEGENDS` + `EP.N` (nome provisório: troque aqui e no `badge` se o usuário escolher outro) |
| Pasta | `videos/lenda-<nome>` | `videos/us-<name>` (nome em inglês, kebab-case) |
| Episódios feitos | EP.1–15 (último: EP.15 O Cabeça de Cuia) | EP.1–3 (último: EP.3 Resurrection Mary) |
| Vozes (`videos/turno-da-madrugada/tools/voices.py`) | Kokoro `pf_`/`pm_` + Piper pt_BR, ids `<pref>_eu`, `<pref>_vo`... | Kokoro `af_`/`am_` (inglês dos EUA), ids `us_narr`, `us_narrf`, `us_kid`, `us_girl`, `us_man`, `us_woman`, `us_old`, `us_ghost` (ou novos `us_<ep>_<papel>`) |
| `script.json` | normal (`lang` é `pt` por padrão) | com `"lang": "en"` (a atuação do Chatterbox fala inglês) |
| Transcrição | `core/transcribe.py ... --language pt` | `core/transcribe.py ... --language en` |
| Descrição (`descricao-youtube.txt`) | em português, tags e hashtags em português | em inglês: title, description, tags, pinned comment; hashtags `#shorts #urbanlegends #scary #horror` |

O que é igual nos dois: Short 9:16 de 60 a 75 s no estilo `flat2d` (Brasil Z), personagens originais, a criatura revelada em partes, o perigo já no primeiro quadro, a última frase emendando no começo (loop), o manual `.claude/skills/diretor-de-terror/SKILL.md` e a mesma checagem (`check-speech.py`, storyboard, revisão dos quadros).

**Mudança (27/nov/2026):** as 3 lendas dos EUA ficaram em ~8 views; o canal em inglês passou a testar o nicho **WHAT IF?** (ciência animada: "What if you doubled in size every day?"). Pastas `videos/wi-<tema>`, selo `WHAT IF?` + `EP.N`, voz `us_wi`, kit de personagens e cenários compartilhado em `videos/wi-kit.ts` (o `world.ts` de cada episódio é gerado por `python3 videos/wi-build-world.py videos/wi-<tema>` a partir de `world-ep.ts`). Episódios prontos: EP.1–3 (dobrar de tamanho, Lua some, buraco negro); roteiros e cenas de "sem dormir" (wi-nosleep) e "Terra para" (wi-earthstop) prontos mas não renderizados. Quando o usuário pedir "what if" ou "canal em inglês", é este.

Lendas dos EUA: use as de domínio público e folclore (Bloody Mary, Jersey Devil, Resurrection Mary, Mothman, The Hook, Bell Witch, Pope Lick Monster, Goatman, Bunnyman...). Não use criações com dono (Slender Man, Creepypastas com autor) nem lendas sagradas de povos indígenas (Skinwalker, Wendigo).
