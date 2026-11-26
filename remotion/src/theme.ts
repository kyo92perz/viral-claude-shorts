// The single theme of the editing pass (remotion-motion-graphics skill rule 9): colors, easings, springs, fonts.
import { Easing } from "remotion";
export const theme = {
  colors: { hero: "#f6c744", ink: "#171319", text: "#ffffff", red: "#e0302a", done: "#8a8a92", panel: "rgba(23,19,25,.82)", track: "rgba(0,0,0,.35)" },
  fonts: { display: "Edit, 'Arial Black', sans-serif" },
  ease: { out: Easing.bezier(0.16, 1, 0.3, 1), inOut: Easing.bezier(0.83, 0, 0.17, 1), in: Easing.bezier(0.7, 0, 0.84, 0) },
  spring: { snappy: { damping: 14, stiffness: 160, mass: 0.6 }, smooth: { damping: 20, stiffness: 90, mass: 1 }, bouncy: { damping: 11, stiffness: 170, mass: 0.7 } },
  sfxVolume: 0.35,
} as const;
// eased, clamped interpolate (linear is forbidden)
import { interpolate } from "remotion";
export const ez = (x: number, a: [number, number], b: [number, number], e: (t: number) => number = theme.ease.out) =>
  interpolate(x, a, b, { easing: e, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
