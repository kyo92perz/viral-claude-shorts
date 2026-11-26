// 10 s preview: painted 3D bedroom (three.js) + the 2D Tuco card. Frame-exact: render(t) poses everything from t.
import * as THREE from 'three';
import { b6Tuco } from './tuco';
const W = 1280, H = 720;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H); renderer.setPixelRatio(1); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace; document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color('#1a1418');
const cam = new THREE.PerspectiveCamera(50, W / H, 0.05, 100);
const rng = (s: number) => () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
const tex = (w: number, h: number, fn: (g: CanvasRenderingContext2D, r: () => number) => void, rep = [1, 1]) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d')!, rng(w * 7 + h)); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); t.anisotropy = 4; return t; };
const plaster = (base: string, dark: string, rep = [1, 1]) => tex(512, 512, (g, r) => { g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 40; i++) { const x = r() * 512, y = r() * 512, R = 40 + r() * 110, gr = g.createRadialGradient(x, y, 0, x, y, R); gr.addColorStop(0, dark + '28'); gr.addColorStop(1, dark + '00'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512); }
  g.globalAlpha = 0.05; g.fillStyle = dark; for (let i = 0; i < 260; i++) g.fillRect(r() * 512, r() * 512, 2 + r() * 3, 30 + r() * 90); g.globalAlpha = 1; }, rep);
const planks = tex(512, 512, (g, r) => { for (let i = 0; i < 8; i++) { g.fillStyle = ['#c68a52', '#b97c46', '#d39a5f', '#bf8550'][i % 4]; g.fillRect(0, i * 64, 512, 64);
  g.strokeStyle = 'rgba(110,64,30,.35)'; g.lineWidth = 2; for (let k = 0; k < 3; k++) { const y = i * 64 + 10 + r() * 44; g.beginPath(); g.moveTo(0, y); g.bezierCurveTo(170, y + 5, 340, y - 5, 512, y); g.stroke(); }
  g.fillStyle = '#4a2f1c'; g.fillRect(0, i * 64, 512, 4); g.fillRect(r() * 512, i * 64, 4, 64); } }, [3, 3]);
const INK = new THREE.LineBasicMaterial({ color: '#1a1216' });
const mats: Record<string, THREE.Material> = {};
const mat = (c: string | THREE.Texture) => typeof c === 'string' ? (mats[c] ??= new THREE.MeshLambertMaterial({ color: c })) : new THREE.MeshLambertMaterial({ map: c });
function box(c: string | THREE.Texture, a: number[], b: number[], ink = true) {
  const g = new THREE.BoxGeometry(b[0] - a[0], b[1] - a[1], b[2] - a[2]); const m = new THREE.Mesh(g, mat(c));
  m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); m.castShadow = m.receiveShadow = true; scene.add(m);
  if (ink) { const e = new THREE.LineSegments(new THREE.EdgesGeometry(g), INK); m.add(e); } return m; }
// ---- the room
const wall = plaster('#f2dcb2', '#b88a5a', [2, 1]), wains = plaster('#8fb4a0', '#3e6a58', [3, 1]), ceil = plaster('#f8efe0', '#c8b090');
box(planks, [-3, -0.05, -2.2], [3, 0, 3.5], false);
box(wall, [-3, 0.9, -2.3], [3, 2.6, -2.2], false); box(wains, [-3, 0, -2.25], [3, 0.9, -2.15]);
box(wall, [-3.1, 0.9, -2.3], [-3, 2.6, 3.5], false); box(wains, [-3.05, 0, -2.3], [-2.95, 0.9, 3.5]);
box(wall, [3, 0.9, -2.3], [3.1, 2.6, 3.5], false); box(wains, [2.95, 0, -2.3], [3.05, 0.9, 3.5]);
box('#6a8a78', [-3, 0.88, -2.16], [3, 0.95, -2.1]); { const cm = box(ceil, [-3.1, 2.6, -2.3], [3.1, 2.7, 3.5], false); (cm.material as THREE.MeshLambertMaterial).emissive = new THREE.Color('#7a6a58'); } box('#fbf4e6', [-3, 2.52, -2.2], [3, 2.6, -2.12]);
const sky = tex(256, 256, (g) => { const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#6cb6ea'); gr.addColorStop(1, '#d8eef6'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  g.fillStyle = '#ffffff'; for (const [x, y, s] of [[60, 80, 30], [100, 70, 40], [150, 84, 28], [190, 150, 24], [220, 144, 32]]) { g.beginPath(); g.arc(x, y, s, 0, 7); g.fill(); } g.fillStyle = '#7aa860'; g.fillRect(0, 220, 256, 36); });
const skyM = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.15), new THREE.MeshBasicMaterial({ map: sky })); skyM.position.set(1.15, 1.575, -2.145); scene.add(skyM);
for (const [a, b] of [[[0.33, 0.96, -2.2], [1.97, 1.02, -2.1]], [[0.33, 2.13, -2.2], [1.97, 2.2, -2.12]], [[0.33, 0.96, -2.2], [0.4, 2.2, -2.12]], [[1.9, 0.96, -2.2], [1.97, 2.2, -2.12]], [[1.12, 1.0, -2.2], [1.18, 2.15, -2.13]], [[0.4, 1.55, -2.2], [1.9, 1.6, -2.13]]]) box('#fbf7ee', a, b);
box('#fbf7ee', [0.25, 0.92, -2.2], [2.05, 0.98, -2.0]);
const cur = plaster('#3e8a76', '#173e34'); box(cur, [0.02, 0.75, -2.12], [0.4, 2.45, -2.02]); box(cur, [1.9, 0.75, -2.12], [2.28, 2.45, -2.02]); box('#6a4a30', [-0.05, 2.42, -2.1], [2.35, 2.46, -2.06]);
const post = tex(256, 340, (g) => { g.fillStyle = '#2f5aa8'; g.fillRect(0, 0, 256, 340); g.fillStyle = '#fbf7ee'; g.beginPath(); g.arc(128, 150, 70, 0, 7); g.fill(); g.fillStyle = '#231a1e';
  const pent = (x: number, y: number, r: number) => { g.beginPath(); for (let k = 0; k < 5; k++) { const a = k * 1.2566 - 1.5708; g.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); } g.fill(); }; pent(128, 150, 22);
  for (let k = 0; k < 5; k++) { const a = k * 1.2566 - 1.5708; pent(128 + 58 * Math.cos(a), 150 + 58 * Math.sin(a), 13); }
  g.lineWidth = 6; g.strokeStyle = '#231a1e'; g.beginPath(); g.arc(128, 150, 70, 0, 7); g.stroke(); g.fillStyle = '#f6c744'; g.fillRect(40, 260, 176, 20); g.lineWidth = 10; g.strokeRect(5, 5, 246, 330); });
box(post, [-2.2, 1.3, -2.2], [-1.4, 2.35, -2.17]);
box('#8a5632', [-2.95, 0, -2.1], [-1.2, 0.4, 0.2]); box('#7a4a2a', [-2.95, 0, -2.15], [-1.2, 1.0, -2.05]); box('#f4efe4', [-2.92, 0.4, -2.05], [-1.23, 0.55, 0.17]);
const blank = tex(256, 256, (g) => { g.fillStyle = '#3f6aa8'; g.fillRect(0, 0, 256, 256); g.strokeStyle = '#f6c744'; g.lineWidth = 6; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(0, 30 + i * 44); g.lineTo(256, 30 + i * 44); g.stroke(); } });
box(blank, [-2.94, 0.55, -1.2], [-1.2, 0.64, 0.19]); box('#fbf7ef', [-2.7, 0.55, -2.0], [-1.45, 0.72, -1.55]);
box('#a8743e', [1.9, 0.72, -2.1], [2.95, 0.78, -1.45]); for (const x of [1.95, 2.85]) box('#7a5028', [x, 0, -2.05], [x + 0.06, 0.72, -1.5]);
box('#d03a30', [2.6, 0.78, -2.0], [2.72, 0.82, -1.9]); box('#2e2024', [2.64, 0.82, -1.97], [2.67, 1.15, -1.94]); box('#d03a30', [2.52, 1.12, -2.02], [2.72, 1.24, -1.86]);
[['#d03a30', 0], ['#2f5aa8', 0.07], ['#f6c744', 0.14]].forEach(([c, dx], i) => box(c as string, [2.0 + (dx as number), 0.78, -2.05], [2.06 + (dx as number), 1.02 - i * 0.03, -1.85]));
box('#8a5632', [-0.9, 1.85, -2.2], [-0.1, 1.9, -1.98]); box('#fbf7ee', [-0.8, 1.9, -2.15], [-0.62, 2.08, -2.0]); box('#f6c744', [-0.45, 1.9, -2.12], [-0.25, 2.2, -2.02]);
const rug = tex(256, 256, (g) => { g.fillStyle = '#d65a46'; g.fillRect(0, 0, 256, 256); g.strokeStyle = '#f6c744'; g.lineWidth = 12; g.strokeRect(18, 18, 220, 220); g.strokeStyle = '#fbf7ee'; g.lineWidth = 5; g.strokeRect(40, 40, 176, 176); });
box(rug, [-0.9, 0, -1.0], [1.5, 0.01, 1.2], false);
box('#f6c744', [-1.05, 0, -2.2], [-0.95, 2.4, -2.17]); for (let i = 0; i <= 12; i++) box('#2e2024', [-1.05, i * 0.2, -2.17], [-1.0 + (i % 5 ? 0 : 0.03), i * 0.2 + 0.015, -2.16], false);
box('#9a6038', [2.97, 0, -1.2], [3.0, 2.1, -0.2]); box('#f6c744', [2.93, 1.0, -1.1], [2.97, 1.06, -1.04]);
// fan
const fan = new THREE.Group(); fan.add(box('#5a4a44', [-0.025, 0, -0.025], [0.025, 0.25, 0.025])); const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.12, 16), mat('#8a7a74')); hub.add(new THREE.LineSegments(new THREE.EdgesGeometry(hub.geometry, 40), INK)); fan.add(hub);
for (let i = 0; i < 3; i++) { const bl = box('#efe6d6', [-0.45, -0.012, -0.1], [0.45, 0.012, 0.1]); const a = (i * Math.PI * 2) / 3; bl.position.set(Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5); bl.rotation.y = a; fan.add(bl); }
fan.position.set(0.75, 2.36, -0.45); scene.add(fan);
// light
scene.add(new THREE.HemisphereLight('#fff4e0', '#8a6a50', 1.5));
const sun = new THREE.DirectionalLight('#ffe8c0', 2.2); sun.position.set(1.4, 3.2, 3); sun.target.position.set(0, 1, -1); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 12 }); sun.shadow.bias = -0.0008; scene.add(sun, sun.target);
const lamp = new THREE.PointLight('#ffcf80', 3, 2.5); lamp.position.set(2.62, 1.05, -1.85); scene.add(lamp);
// ---- Tuco: a 2D card (2 drawings: eyes open / blink), floor shadow blob
const card = (blink: boolean) => { const c = document.createElement('canvas'); c.width = 600; c.height = 1000; b6Tuco(blink).draw({ g: c.getContext('2d') }); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const T = [card(false), card(true)], HC = 2.74;
const tuco = new THREE.Mesh(new THREE.PlaneGeometry(HC * 0.6, HC), new THREE.MeshBasicMaterial({ map: T[0], transparent: true, alphaTest: 0.02 }));
tuco.geometry.translate(0, HC * 0.475, 0); scene.add(tuco);
const blobT = tex(128, 128, (g) => { const gr = g.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(30,16,12,0.55)'); gr.addColorStop(1, 'rgba(30,16,12,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); });
const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.6), new THREE.MeshBasicMaterial({ map: blobT, transparent: true, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; shadow.position.set(0.05, 0.015, -0.55); scene.add(shadow);
// plaster dust after the bonk
const dustT = tex(64, 64, (g) => { g.fillStyle = '#fbf4e6'; g.beginPath(); g.arc(32, 32, 26, 0, 7); g.fill(); g.lineWidth = 6; g.strokeStyle = '#1a1216'; g.stroke(); });
const dust = Array.from({ length: 14 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: dustT, transparent: true })); s.scale.setScalar(0.035 + (i % 3) * 0.015); scene.add(s); return s; });
// impact star card
const starT = tex(256, 256, (g) => { g.translate(128, 128); g.beginPath(); for (let k = 0; k < 16; k++) { const r = k % 2 ? 50 : 118, a = (k / 16) * Math.PI * 2; g.lineTo(r * Math.cos(a), r * Math.sin(a)); } g.closePath(); g.fillStyle = '#ffe14a'; g.fill(); g.lineWidth = 10; g.strokeStyle = '#1a1216'; g.stroke(); });
const star = new THREE.Sprite(new THREE.SpriteMaterial({ map: starT, transparent: true, depthTest: false })); scene.add(star);
const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
(window as any).render = (t: number) => {
  // Tuco: crouched (squashed) until 1.6 s, springs up, bonks the ceiling at 2.0 s, then holds with a little breathing
  const up = t < 1.6 ? 0 : t < 2.0 ? ease((t - 1.6) / 0.4) : 1, bonk = t >= 2.0 ? Math.exp(-(t - 2.0) * 6) : 0;
  const sy = 0.86 + 0.14 * up - bonk * 0.08 * Math.cos((t - 2) * 40) + (t > 2.4 ? Math.sin(t * 2.4) * 0.006 : 0);
  tuco.scale.set(1 + (1 - sy) * 0.6, sy, 1); tuco.position.set(0.05 + bonk * 0.03 * Math.sin(t * 60), 0, -0.55);
  const blink = (t > 4.1 && t < 4.22) || (t > 7.4 && t < 7.52) || (t < 1.0 && t > 0.88); (tuco.material as THREE.MeshBasicMaterial).map = T[blink ? 1 : 0];
  fan.rotation.y = t * 8; fan.position.y = 2.36 + bonk * 0.02 * Math.sin(t * 70);
  dust.forEach((s, i) => { const tt = t - 2.0 - (i % 4) * 0.05; const r = Math.sin(i * 12.9) * 0.5 + 0.5, q = Math.sin(i * 7.1) * 0.5 + 0.5;
    s.visible = tt > 0 && tt < 0.9; s.position.set(-0.55 + r * 1.0, 2.56 - tt * (0.5 + q * 0.5) - 1.2 * tt * tt, -0.75 + q * 0.15); });
  star.visible = t > 2.0 && t < 2.45; const k = t - 2.0; star.scale.setScalar(0.25 + 0.25 * Math.min(1, k * 8)); star.position.set(-0.7, 2.52, -0.3); star.material.rotation = k * 3;
  // camera: wide push 0-2 s, shake on the bonk, then slow push-in to his face
  const p = ease((t - 2.4) / 7.6), sh = bonk * 0.06;
  cam.position.set(0.9 - p * 0.45 + sh * Math.sin(t * 91), 1.2 + p * 0.5 + sh * Math.cos(t * 77), 3.2 - t * 0.05 - p * 1.25);
  cam.lookAt(0.0, 1.45 + p * 0.75, -0.9); cam.rotateZ(-0.03 + p * 0.02); cam.fov = 52 - p * 6; cam.updateProjectionMatrix();
  renderer.render(scene, cam); return renderer.domElement.toDataURL('image/png');
};
(window as any).ready = true;
