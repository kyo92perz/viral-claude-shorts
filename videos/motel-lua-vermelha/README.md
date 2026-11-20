# MOTEL LUA VERMELHA (vídeo longo para o YouTube, 16:9, 9min52)

Animação 2.5D no mesmo estilo de "Turno da Madrugada", agora em 1920×1080. A história, os personagens, a criatura e o
lugar são originais. A bíblia está em [BIBLIA.md](BIBLIA.md).

- **Vídeo:** `final.mp4` (gerado pelo render; os vídeos finais não entram no git)
- **Thumbnail:** [thumbnail/thumb-motel-lua-vermelha.jpg](thumbnail/thumb-motel-lua-vermelha.jpg)
- **Storyboard:** [storyboard.png](storyboard.png), um painel por cena (78 cenas)

## Para publicar

**Título:** NÃO ACENDA A LUZ: a noite em que as sombras se soltaram | Motel Lua Vermelha (animação de terror)

**Descrição:**
> Nevada, Rota 375, a Rodovia Extraterrestre. Na última lua de sangue, em 1961, o Motel Lua Vermelha amanheceu vazio,
> com onze sombras pintadas na parede. Hoje a lua fica vermelha de novo. Mari, ex-boxeadora e gerente do motel, tem
> quatro hóspedes: um streamer caçador de OVNIs, um veterano rabugento e um casal de Ohio de camisas combinando. Mas
> sombra só existe onde tem luz.
>
> 00:00 Prólogo: 1961
> 00:26 A gerente
> 01:19 O primeiro problema
> 02:25 O eclipse
> 02:36 A primeira sombra
> 03:10 A primeira luta
> 04:11 A regra
> 05:14 O plano
> 06:03 O truque dos faróis
> 07:09 A escolha do Kev
> 07:55 A luta no letreiro
> 08:58 Amanhecer
>
> #animação #terror #historiadeterror #luadesangue #suspense

## Como refazer
Na pasta `viral-claude-shorts`:
```bash
python videos/turno-da-madrugada/tools/voices.py videos/motel-lua-vermelha     # vozes (Kokoro, como no VoiceStudio)
.venv/bin/python core/transcribe.py videos/motel-lua-vermelha --language pt
node core/storyboard.ts videos/motel-lua-vermelha
HF_WORKERS=3 node core/render.ts videos/motel-lua-vermelha
```
O `scenes.json` usa `"format": "16:9"` (novo no motor), `"fps": 20` e `"renderScale": 0.5`, para renderizar sem GPU em
algumas horas.
