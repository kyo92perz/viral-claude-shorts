import { z } from "zod";
export const EditSchema = z.object({
  video: z.string(),                       // file name inside the public dir (the video folder): "final.mp4"
  width: z.number(), height: z.number(), fps: z.number(), duration: z.number(),
  font: z.string().optional(),             // file name of a .ttf in the public dir (Archivo Black by default)
  words: z.array(z.object({ w: z.string(), t0: z.number(), t1: z.number() })),
  captions: z.boolean(),                   // word-by-word captions (off when the engine already burned them in)
  punches: z.array(z.object({ t: z.number(), scale: z.number().optional(), dur: z.number().optional() })),
  stingers: z.array(z.object({ t: z.number(), text: z.string(), sub: z.string().optional(), dur: z.number().optional() })),
  chapters: z.array(z.object({ t: z.number(), title: z.string() })),
  subscribe: z.number().nullable(),        // time of the subscribe pop, or null
  brand: z.string().optional(),            // small channel tag, top-left
});
export type Edit = z.infer<typeof EditSchema>;
