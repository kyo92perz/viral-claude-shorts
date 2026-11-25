// What the browser files (engine.ts, library.ts and each video's visuals.ts) see as globals.
// SCENES and WORDS are written inline in project/index.html by the adapter; gsap comes from gsap.min.js.
type Scene = import('../../core/types.ts').Scene;
declare const SCENES: import('../../core/types.ts').Plan;
declare const WORDS: import('../../core/types.ts').Word[];
// the frame size, written by the adapter from scenes.json "format": 1080 x 1920 (9:16) or 1920 x 1080 (16:9)
declare const FRAME: { w: number; h: number };

// a scene's art: background, title color, SVG and its animation on the shared timeline (absolute video times)
interface Visual {
  bg?: string;
  ink?: string;
  html(s: Scene): string;
  anim?(tl: gsap.core.Timeline, s: Scene, K: (key: string, fallback?: number) => number, $: (selector: string) => string): void;
}
