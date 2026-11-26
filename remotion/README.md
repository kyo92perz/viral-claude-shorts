# Remotion: post-production pass

An optional editing pass over a finished `videos/<topic>/final.mp4`, built with [Remotion](https://github.com/remotion-dev/remotion) (React video). The video's own engine still makes the picture; this adds the editing layer on top.

What it adds automatically:
- a **"DIA N" stinger** with a punch zoom and a shake wherever the narration starts a sentence with "Dia N" (from `words.json`);
- a **chapter bar** at the bottom, with the chapter name for 3 s, read from the timestamps in `descricao-youtube.txt`;
- a **subscribe pop** at 30 % of the video (max 60 s);
- optional **word-by-word captions** (`--captions`), for videos whose engine did not burn captions in.

`videos/<topic>/edits.json` can replace or extend any of these: `{ "punches": [{ "t": 12.4, "scale": 1.15 }], "stingers": [{ "t": 30, "text": "DIA 1", "sub": "1,6 METRO" }], "chapters": [...], "subscribe": 45, "captions": false, "brand": "IMAGINA SÓ", "auto": false }`.

Every component follows the `remotion-motion-graphics` skill (`.claude/skills/remotion-motion-graphics/`, MIT, from haidrrrry/claude-remotion-skill): one theme (`src/theme.ts`), no linear easing, staggered spring entrances, faster exits, idle breathing, synthesized SFX (`node remotion/scripts/gen-sfx.mjs` → `public/sfx/`), and render → extract frames → look → fix before delivery.

## Setup (once)

```bash
cd remotion && npm install
```

## Usage

```bash
node remotion/render.mjs videos/<topic>                       # -> videos/<topic>/final-editado.mp4
node remotion/render.mjs videos/<topic> --from 26 --to 40 --out remotion/out/test.mp4   # a quick test range
cd remotion && npm run studio                                   # Remotion Studio (live preview in the browser)
```

It uses the pre-installed headless Chromium when present (`REMOTION_CHROME` overrides it); `REMOTION_CONCURRENCY` sets parallel frames (default 2).

## License

Remotion has its own license: free for individuals and companies of up to 3 people; larger companies need a company license (see remotion.dev/license). The caption font is Archivo Black (SIL Open Font License).
