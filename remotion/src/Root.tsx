import { Composition } from "remotion";
import { Edicao } from "./Edicao";
import { EditSchema, type Edit } from "./types";
const demo: Edit = { video: "final.mp4", width: 1920, height: 1080, fps: 24, duration: 10, words: [], captions: false, punches: [], stingers: [], chapters: [], subscribe: null };
export const Root: React.FC = () => (
  <Composition id="Edicao" component={Edicao} schema={EditSchema} defaultProps={demo}
    width={1920} height={1080} fps={24} durationInFrames={240}
    calculateMetadata={({ props }) => ({ width: props.width, height: props.height, fps: props.fps, durationInFrames: Math.round(props.duration * props.fps) })} />
);
