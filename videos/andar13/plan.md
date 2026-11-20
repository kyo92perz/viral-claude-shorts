# O 13º andar (3d, 9:16, 57 s, pt-BR, horror)

**Idea:** a building with no 13th floor; one night the elevator stops on it, a corridor identical to his calls his name with his own voice; he flees home, and at 3 a.m. his own voice knocks: "you entered the wrong apartment". Twist + loop: his door's plate reads **1302**, and the last frame cuts back to the building (frame 1).

Original story and original characters. Low-poly matte (simple) for people and furniture; textured heroes: the corridor carpet, the elevator steel and the wooden apartment door.

## Cast
- **The narrator** (`a13Person`, simple): a man of ~30, 1.80 m. Dark green hoodie, gray jeans, white sneakers, light-brown skin, short dark hair. A real skeleton with pivots at the neck, shoulders, elbows, wrists, waist, hips, knees and ankles. The limbs taper (thigh > shin, upper arm > forearm), the chest is wider than the waist, and the hands are mittens with a thumb. The feet are wedges pointing forward. Ranges: knees bend only backward (0 to 2.2 rad), elbows only forward (0 to −2.3), the neck within ±0.6.
  States (blended over 0.3 s unless said otherwise): `idle` (breathing), `walk` (cycle from t), `run` (lean 0.25, big strides, elbows at 90°), `press` (right arm forward to the panel, jabs from t), `scared` (leans back, hands up by the chest, eyes wide, mouth open), `listen` (leans toward the door, right hand on it), `lie` (on the bed, eyes `closed` or `open`, head turning toward the door). Face: eyes (open/wide/closed), brows (flat/raised), mouth (closed/open).
- **The double** (`a13Person({ dark: true })`): the same skeleton, all matte black `#07070a`, with two small glowing white eyes. States: `hidden` (only the eyes in the dark doorway), `stand` (stiff, arms down, head tilted 0.25 rad: wrong), `knock` (right forearm raised toward the door, three hits from t).

## Sets (one shared stage, `a13Init`)
- **Exterior** (far away, at z −300): a 21-storey block at night under a navy sky with stars and a pale moon; lit windows (seeded), the elevator-panel red accent. No fog.
- **Elevator** (origin): a steel cabin 2 × 2.2 × 2.4 m (brushed steel shader), a ceiling light panel, the button panel on the right wall (two columns, 1–20 **with no 13**, the lit button glows yellow), a floor display above the door (`12`, `13` in red, `14`), two sliding door leaves (state `open` 0 → 1 in 0.8 s).
- **Corridor** (z 1 → 21): 2.6 m wide, beige striped walls, a red patterned carpet (shader), six side doors with plates, ceiling light panels and three warm point lights. Modes: `home` (14th floor: steady warm light, plates 14xx) and `thirteen` (13th floor: cold, greenish light, fog, deterministic flicker, plates 13xx). The end door is the apartment door: hinge state `ajar` (0 → 0.35 rad) and, behind it in `thirteen`, a black void where the double hides.
- **Apartment** (behind the end door, z 21 → 26): a small dark bedroom lit by blue moonlight through a city window; bed, nightstand with a phone clock (`03:00`), and the inside of the front door with a warm strip of corridor light under it, where the shadows of two feet stop.

## Camera (named shots)
- `tiltUp`: low on the street, the lens tilts up the façade (hook).
- `panel`: close-up of the button panel from inside the cabin.
- `cabin`: wide inside the cabin, from the back corner, the narrator in the middle.
- `display`: close-up of the floor display above the door.
- `pov`: from inside the elevator, looking out through the doors down the corridor (slow push).
- `carpet` / `doors`: tilt down to the carpet, pan to the side doors.
- `endDoor`: a dolly toward the far door; `plate`: an extreme close-up of its plate.
- `face`: a close-up of the narrator's face (scared).
- `runBack`: tracking the narrator running to the cabin.
- `bed`: high angle of the bed in moonlight; `doorGap`: low, at the strip of light under the door; `peep`: the corridor through the peephole (wide lens + a round black mask); `reveal`: pull back from the outside of his door to its plate.
All subjects framed between y 600 and 1500 (titles on top, the app interface below).

## Visual language
- **Flicker**: the light intensity drops to 10 % on a seeded pattern (14 steps/s) in `thirteen` mode.
- **Scare hit**: the grade's `uRed` pulses (0 → 0.8 → 0 in 0.6 s) and the camera shakes (decaying, deterministic sines).
- **Knock**: three door hits 0.33 s apart, each a 1.5 cm door shake + camera shake.
- Titles: red highlight box instead of blue (horror), set per scene on its titles layer.

## Sound
- One tempo: 80 BPM, key D (minor feel from the moods).
- Curve: tense (hook, rules) → tense with rising energy (the stop) → **dark** at the 13 → tense in the corridor → dark (the voice) → energetic (the escape) → calm-ish relief at home (sad) → tense (3 a.m., steps) → dark (the whisper and the twist).
- Ambience: `room` in the interiors; nothing outside but `wind`.
- SFX: `thump` (the stop, the knocks), `hit` (the 13 lights up), `riser` (into the voice), `tick` (buttons, the elevator ding), `whoosh` (doors), `scratch` (the twist), `steps` ambience for the running.
